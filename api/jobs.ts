// Vercel serverless function (Node runtime).
//
// Proxies a Notion database query SERVER-SIDE so the integration token is
// never shipped to the browser. The client only ever calls `/api/jobs` and
// receives clean JSON. NOTION_TOKEN / NOTION_DATABASE_ID are read from Vercel
// environment variables (set in the dashboard, or in a gitignored .env for
// `vercel dev`) and are intentionally NOT prefixed with VITE_, which would
// inline them into the public client bundle.

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

// Arabic property names exactly as they appear in the Notion database.
const PROP = {
  title: "اسم الوظيفة",
  city: "المدينة",
  type: "نوع الوظيفة",
  description: "الوصف",
  formUrl: "رابط الفورم",
  published: "منشورة",
  publishedDate: "تاريخ النشر",
} as const;

// Minimal Vercel request/response shapes — typed locally so we depend on no
// extra package. (`@vercel/node` is not installed; the platform supplies these
// objects at runtime.)
interface ApiRequest {
  method?: string;
}
interface ApiResponse {
  status(code: number): ApiResponse;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
}

// Subset of the Notion query response we actually read.
interface NotionText {
  plain_text?: string;
}
interface NotionProperty {
  title?: NotionText[];
  rich_text?: NotionText[];
  select?: { name?: string } | null;
  url?: string | null;
  date?: { start?: string } | null;
}
interface NotionPage {
  properties?: Record<string, NotionProperty | undefined>;
}
interface NotionQueryResponse {
  results?: NotionPage[];
}

interface Job {
  title: string;
  city: string | null;
  type: string | null;
  description: string;
  formUrl: string | null;
  publishedDate: string | null;
}

const plainText = (parts?: NotionText[]): string =>
  (parts ?? []).map((p) => p.plain_text ?? "").join("");

const mapPage = (page: NotionPage): Job => {
  const props = page.properties ?? {};
  return {
    title: plainText(props[PROP.title]?.title),
    city: props[PROP.city]?.select?.name ?? null,
    type: props[PROP.type]?.select?.name ?? null,
    description: plainText(props[PROP.description]?.rich_text),
    formUrl: props[PROP.formUrl]?.url ?? null,
    publishedDate: props[PROP.publishedDate]?.date?.start ?? null,
  };
};

export default async function handler(
  req: ApiRequest,
  res: ApiResponse,
): Promise<void> {
  if (req.method && req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!token || !databaseId) {
    res.status(500).json({ error: "Notion env vars are not configured" });
    return;
  }

  try {
    const notionRes = await fetch(
      `${NOTION_API}/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": NOTION_VERSION,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: PROP.published,
            checkbox: { equals: true },
          },
          sorts: [{ property: PROP.publishedDate, direction: "descending" }],
        }),
      },
    );

    if (!notionRes.ok) {
      const detail = await notionRes.text();
      // Full detail goes to the Vercel function logs (server-side only).
      console.error(`Notion query failed: ${notionRes.status} ${detail}`);
      // Notion's `code` (e.g. "object_not_found", "unauthorized") is safe and
      // useful to surface so the failure is diagnosable from the browser.
      let notionCode: string | null = null;
      try {
        notionCode = (JSON.parse(detail) as { code?: string }).code ?? null;
      } catch {
        // Body was not JSON; leave notionCode null.
      }
      res.status(502).json({
        error: "Failed to load jobs from Notion",
        notionStatus: notionRes.status,
        notionCode,
      });
      return;
    }

    const data = (await notionRes.json()) as NotionQueryResponse;
    const jobs = (data.results ?? [])
      .map(mapPage)
      .filter((job) => job.title.trim().length > 0);

    // Short edge cache; jobs change rarely.
    res.setHeader(
      "Cache-Control",
      "s-maxage=300, stale-while-revalidate=600",
    );
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Notion request threw:", err);
    res.status(502).json({ error: "Failed to load jobs from Notion" });
  }
}
