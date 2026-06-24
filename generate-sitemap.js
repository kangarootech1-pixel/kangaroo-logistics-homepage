/**
 * Sitemap generator for the Kangaroo Logistics SPA (Vite + react-router-dom).
 *
 * Since this is a client-rendered SPA, the sitemap must be a static file.
 * This script writes public/sitemap.xml (Vite copies public/ verbatim into
 * dist/ on build, so the file ends up at https://kangaroopro.com/sitemap.xml).
 *
 * Run manually:  node generate-sitemap.js
 * Runs automatically before every build via the "prebuild" npm script.
 *
 * To add a new page: add it to STATIC_ROUTES below. Service detail pages
 * (/services/:slug) are discovered automatically from src/i18n/translations.ts,
 * so new services need no change here.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://kangaroopro.com";

// Static routes mirrored from src/App.tsx. Add new pages here.
// priority: Home = 1.0, all others between 0.7 and 0.9 (Google hint only).
const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/about", priority: 0.8, changefreq: "monthly" },
  { path: "/support", priority: 0.8, changefreq: "monthly" },
  { path: "/careers", priority: 0.7, changefreq: "monthly" },
  { path: "/policies", priority: 0.7, changefreq: "yearly" },
];

// Discover service detail slugs (/services/:slug) from translations.
function getServiceSlugs() {
  const file = resolve(__dirname, "src/i18n/translations.ts");
  const src = readFileSync(file, "utf8");
  const slugs = new Set();
  for (const m of src.matchAll(/slug:\s*["']([^"']+)["']/g)) {
    slugs.add(m[1]);
  }
  return [...slugs];
}

function buildUrls() {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const urls = STATIC_ROUTES.map((r) => ({
    loc: `${BASE_URL}${r.path}`,
    lastmod: today,
    changefreq: r.changefreq,
    priority: r.priority.toFixed(1),
  }));

  for (const slug of getServiceSlugs()) {
    urls.push({
      loc: `${BASE_URL}/services/${slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.8",
    });
  }
  return urls;
}

function toXml(urls) {
  const body = urls
    .map(
      (u) =>
        `  <url>\n` +
        `    <loc>${u.loc}</loc>\n` +
        `    <lastmod>${u.lastmod}</lastmod>\n` +
        `    <changefreq>${u.changefreq}</changefreq>\n` +
        `    <priority>${u.priority}</priority>\n` +
        `  </url>`
    )
    .join("\n");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${body}\n` +
    `</urlset>\n`
  );
}

const urls = buildUrls();
const out = resolve(__dirname, "public/sitemap.xml");
writeFileSync(out, toXml(urls), "utf8");
console.log(`✓ Wrote ${urls.length} URLs to public/sitemap.xml`);
