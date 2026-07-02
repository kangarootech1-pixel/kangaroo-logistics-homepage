// Shared POST to an n8n webhook with a timeout. Used by the Support and
// Careers forms and the chat widget so the abort/timeout handling lives in
// one place. Throws on network failure, timeout, or a non-2xx response;
// callers surface their own error UI.
export const WEBHOOK_TIMEOUT_MS = 10_000;

export async function postToWebhook(
  url: string,
  payload: unknown,
  timeoutMs: number = WEBHOOK_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    return res;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
