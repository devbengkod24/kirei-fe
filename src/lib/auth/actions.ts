"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findMockAccount, findMockUserById } from "@/mocks/user";
import type { CurrentUser } from "@/types/user";
import { loginSchema, type LoginValues } from "./loginSchema";
import { homeFor, LOGIN_PATH, SESSION_COOKIE } from "./session";

export type LoginResult = { error: string };

/** Signs in and redirects to the role's home page; returns an error message otherwise. */
export async function login(values: LoginValues): Promise<LoginResult> {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) return { error: "Periksa kembali email dan kata sandi." };

  // TODO: GET /sanctum/csrf-cookie, then POST /login to Laravel; map 422 and 429 to messages.
  const user = findMockAccount(parsed.data.email, parsed.data.password);
  if (!user || !homeFor(user.role)) return { error: "Email atau kata sandi salah." };
  return startSession(user);
}

/** One-click login as a demo account. TODO: remove together with the mock accounts. */
export async function quickLogin(userId: string): Promise<void> {
  const user = findMockUserById(userId);
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
  // TODO: POST /logout to Laravel.
  (await cookies()).delete(SESSION_COOKIE);
  redirect(LOGIN_PATH);
}
