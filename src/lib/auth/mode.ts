/*
 * Where sign-in is decided. "mock" keeps the demo accounts and Quick Login working without a
 * backend; "api" signs in against Laravel Sanctum. Read on the server only, so none of these
 * are NEXT_PUBLIC variables.
 */
export type AuthMode = "mock" | "api";

export const authMode = (): AuthMode => (process.env.AUTH_MODE === "api" ? "api" : "mock");

const trimSlash = (value: string) => value.replace(/\/+$/, "");

export const apiUrl = () => trimSlash(process.env.API_URL ?? "http://localhost:8000");

/** Sent as Origin and Referer so Sanctum treats the request as coming from the SPA. */
export const frontendUrl = () => trimSlash(process.env.FRONTEND_URL ?? "http://localhost:3000");

/** Laravel's session cookie; its presence is the only thing proxy.ts can check without calling the API. */
export const laravelSessionCookie = () => process.env.SESSION_COOKIE_NAME ?? "kirei_session";
