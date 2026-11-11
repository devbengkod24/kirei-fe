import { cookies } from "next/headers";
import { z } from "zod";
import type { CurrentUser } from "@/types/user";
import { apiUrl, frontendUrl, laravelSessionCookie } from "./mode";

/*
 * Server-side calls to Laravel for the Sanctum SPA flow. Server Actions and server components run
 * on the Next server, so the browser never sees Laravel's responses: its Set-Cookie headers have
 * to be copied onto the Next response (`forwardCookies`) and the browser's cookies copied onto each
 * request (`callLaravel`). TODO: confirm the /login and /api/user response shapes against kirei-be.
 */

export interface LaravelCookie {
  name: string;
  value: string;
  options: { path?: string; expires?: Date; maxAge?: number; httpOnly?: boolean; secure?: boolean; sameSite?: "lax" | "strict" | "none" };
}

export interface LaravelResponse {
  status: number;
  body: unknown;
  setCookies: LaravelCookie[];
}

const decode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

/** One `Set-Cookie` header as the name, decoded value, and options `cookies().set` takes. */
export function parseSetCookie(header: string): LaravelCookie {
  const [pair, ...attributes] = header.split(";").map((part) => part.trim());
  const separator = pair.indexOf("=");
  const cookie: LaravelCookie = { name: pair.slice(0, separator), value: decode(pair.slice(separator + 1)), options: {} };

  for (const attribute of attributes) {
    const [rawKey, ...rest] = attribute.split("=");
    const key = rawKey.toLowerCase();
    const value = rest.join("=");
    if (key === "path") cookie.options.path = value;
    else if (key === "expires") cookie.options.expires = new Date(value);
    else if (key === "max-age") cookie.options.maxAge = Number(value);
    else if (key === "httponly") cookie.options.httpOnly = true;
    else if (key === "secure") cookie.options.secure = true;
    else if (key === "samesite") cookie.options.sameSite = value.toLowerCase() as "lax" | "strict" | "none";
    // "Domain" is left out on purpose: the cookie belongs to this app's host, not Laravel's.
  }
  return cookie;
}

/** Calls Laravel with the given cookies; HTTP errors are returned, only network failures throw. */
export async function callLaravel(
  path: string,
  { method = "GET", body, cookies: sent = {} }: { method?: string; body?: unknown; cookies?: Record<string, string> } = {},
): Promise<LaravelResponse> {
  const headers = new Headers({ Accept: "application/json", Origin: frontendUrl(), Referer: `${frontendUrl()}/` });
  const cookieHeader = Object.entries(sent).map(([name, value]) => `${name}=${encodeURIComponent(value)}`).join("; ");
  if (cookieHeader) headers.set("Cookie", cookieHeader);
  // Sanctum checks the XSRF-TOKEN cookie against this header on every write.
  if (method !== "GET" && sent["XSRF-TOKEN"]) headers.set("X-XSRF-TOKEN", sent["XSRF-TOKEN"]);
  if (body !== undefined) headers.set("Content-Type", "application/json");

  const response = await fetch(`${apiUrl()}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  const text = await response.text();
  let parsed: unknown = undefined;
  try {
    parsed = text ? JSON.parse(text) : undefined;
  } catch {
    // an HTML error page or empty body: callers read the status
  }
  return { status: response.status, body: parsed, setCookies: response.headers.getSetCookie().map(parseSetCookie) };
}

/** The browser's cookies as a name-to-value map, for `callLaravel`. */
export async function requestCookies(): Promise<Record<string, string>> {
  return Object.fromEntries((await cookies()).getAll().map((cookie) => [cookie.name, cookie.value]));
}

/** Copies Laravel's cookies onto this response, so the browser holds the Sanctum session. */
export async function forwardCookies(setCookies: LaravelCookie[]) {
  const store = await cookies();
  for (const { name, value, options } of setCookies) store.set(name, value, options);
}

const userSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  name: z.string(),
  email: z.string(),
  role: z.enum(["organisasi", "dosen", "admin_fakultas", "admin_universitas", "operator"]),
  faculty_id: z.union([z.string(), z.number()]).nullish().transform((value) => (value == null ? null : String(value))),
  avatar_url: z.string().nullish(),
});

/** Laravel's user as the app's `CurrentUser`; accepts the standard ApiResponse envelope or a bare user. */
export function parseApiUser(body: unknown): CurrentUser | null {
  const data = typeof body === "object" && body !== null && "data" in body ? (body as { data: unknown }).data : body;
  const parsed = userSchema.safeParse(data);
  if (!parsed.success) return null;
  const { faculty_id, avatar_url, ...user } = parsed.data;
  return { ...user, fakultasId: faculty_id, ...(avatar_url ? { avatarUrl: avatar_url } : {}) };
}

/** Who the Sanctum session belongs to, or null when there is no session or Laravel cannot be reached. */
export async function fetchApiUser(sent: Record<string, string>): Promise<CurrentUser | null> {
  if (!sent[laravelSessionCookie()]) return null;
  try {
    const response = await callLaravel("/api/user", { cookies: sent });
    return response.status === 200 ? parseApiUser(response.body) : null;
  } catch {
    return null;
  }
}
