"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isLaravelValidationError, type LaravelValidationError } from "@/lib/api/form-errors";
import { findMockAccount, findMockUserById } from "@/mocks/user";
import type { CurrentUser } from "@/types/user";
import { callLaravel, forwardCookies, parseApiUser, requestCookies, type LaravelCookie } from "./laravel";
import { loginSchema, type LoginValues } from "./loginSchema";
import { authMode } from "./mode";
import { homeFor, LOGIN_PATH, SESSION_COOKIE } from "./session";

/** `validation` carries field errors in Laravel's 422 shape, so the form can show them under the fields. */
export type LoginResult = { error: string; validation?: LaravelValidationError };

const WRONG_CREDENTIALS = "Email atau kata sandi salah.";
const onEmail = (message: string): LoginResult => ({ error: message, validation: { message, errors: { email: [message] } } });

/** Signs in and redirects to the role's home page; returns an error message otherwise. */
export async function login(values: LoginValues): Promise<LoginResult> {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) return { error: "Periksa kembali email dan kata sandi." };

  if (authMode() === "api") {
    const outcome = await loginWithLaravel(parsed.data);
    // redirect() works by throwing, so it stays outside loginWithLaravel's try/catch
    if (typeof outcome === "string") redirect(outcome);
    return outcome;
  }
  const user = findMockAccount(parsed.data.email, parsed.data.password);
  if (!user || !homeFor(user.role)) return onEmail(WRONG_CREDENTIALS);
  return startSession(user);
}

/** Sanctum SPA flow: GET /sanctum/csrf-cookie, then POST /login with the XSRF token. Returns the home path on success. */
async function loginWithLaravel(values: LoginValues): Promise<LoginResult | string> {
  try {
    const csrf = await callLaravel("/sanctum/csrf-cookie");
    const jar = new Map<string, LaravelCookie>(csrf.setCookies.map((cookie) => [cookie.name, cookie]));
    const sent = () => Object.fromEntries([...jar].map(([name, cookie]) => [name, cookie.value]));

    const response = await callLaravel("/login", { method: "POST", body: values, cookies: sent() });
    if (response.status === 422 && isLaravelValidationError(response.body)) {
      return { error: response.body.message, validation: response.body };
    }
    if (response.status === 401) return onEmail(WRONG_CREDENTIALS);
    if (response.status === 419) return { error: "Sesi kedaluwarsa. Muat ulang halaman lalu coba lagi." };
    if (response.status === 429) return { error: "Terlalu banyak percobaan. Coba lagi sebentar." };
    if (response.status >= 400) return { error: "Server sedang bermasalah. Coba lagi nanti." };

    // Laravel regenerates the session on login, so its new cookies replace the ones from the CSRF call.
    for (const cookie of response.setCookies) jar.set(cookie.name, cookie);
    const me = await callLaravel("/api/user", { cookies: sent() });
    const user = me.status === 200 ? parseApiUser(me.body) : null;
    const home = user && homeFor(user.role);
    if (!home) return { error: "Akun Anda belum bisa masuk ke aplikasi. Hubungi admin." };

    await forwardCookies([...jar.values()]);
    return home;
  } catch {
    return { error: "Server tidak dapat dihubungi. Coba lagi nanti." };
  }
}

/** One-click login as a demo account, in mock mode only. TODO: remove together with the mock accounts. */
export async function quickLogin(userId: string): Promise<void> {
  const user = authMode() === "mock" ? findMockUserById(userId) : null;
  if (!user || !homeFor(user.role)) redirect(LOGIN_PATH);
  await startSession(user);
}

async function startSession(user: CurrentUser): Promise<never> {
  (await cookies()).set(SESSION_COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  redirect(homeFor(user.role) ?? LOGIN_PATH);
}

export async function logout() {
  if (authMode() === "api") {
    try {
      // Laravel answers with expired or regenerated cookies; copying them ends the session in the browser too.
      const response = await callLaravel("/logout", { method: "POST", cookies: await requestCookies() });
      await forwardCookies(response.setCookies);
    } catch {
      // Laravel is unreachable: the user still leaves, the session simply expires on its own
    }
  }
  (await cookies()).delete(SESSION_COOKIE);
  redirect(LOGIN_PATH);
}
