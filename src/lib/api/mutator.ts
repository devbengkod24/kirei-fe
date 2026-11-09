/**
 * Every client in `src/lib/api/generated/` sends its requests through `customFetch`.
 *
 * Orval types each response as `{ data, status, headers }`, with error statuses
 * (e.g. 422) in the same union, so HTTP errors are returned, not thrown. Check
 * `status` before reading `data`. Only network failures throw.
 */

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/+$/, "");

// Sanctum checks the CSRF token on these methods.
const CSRF_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function toApiUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Sanctum's `XSRF-TOKEN` cookie, readable only in the browser. */
function readXsrfToken(): string | null {
  if (typeof document === "undefined") return null;
  const entry = document.cookie.split("; ").find((cookie) => cookie.startsWith("XSRF-TOKEN="));
  return entry ? decodeURIComponent(entry.slice("XSRF-TOKEN=".length)) : null;
}

async function readBody(response: Response): Promise<unknown> {
  if (response.status === 204 || response.status === 205) return undefined;

  const type = response.headers.get("Content-Type") ?? "";
  if (type.includes("json")) {
    const text = await response.text();
    return text ? JSON.parse(text) : undefined;
  }
  if (type.startsWith("text/")) return response.text();
  // e.g. an uploaded loan letter (PDF)
  return response.blob();
}

export async function customFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method ?? "GET").toUpperCase();
  const headers = new Headers(options.headers);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  const xsrfToken = CSRF_METHODS.has(method) ? readXsrfToken() : null;
  if (xsrfToken && !headers.has("X-XSRF-TOKEN")) headers.set("X-XSRF-TOKEN", xsrfToken);

  const init: RequestInit = { ...options, method, headers, credentials: "include" };
  // Reservation data changes often (AGENTS.md rule 15). Next.js ignores both options
  // when `cache` and `next.revalidate` are set together, so only default when neither is.
  if (init.cache === undefined && init.next?.revalidate === undefined) init.cache = "no-store";

  const response = await fetch(toApiUrl(url), init);
  const data = await readBody(response);

  return { data, status: response.status, headers: response.headers } as T;
}
