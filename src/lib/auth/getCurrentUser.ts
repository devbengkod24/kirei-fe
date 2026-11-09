import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import type { CurrentUser } from "@/types/user";
import { fetchApiUser, requestCookies } from "./laravel";
import { authMode } from "./mode";
import { LOGIN_PATH, SESSION_COOKIE, userFromSession } from "./session";

/**
 * Who is signed in, or null. In mock mode that is the demo user named by the cookie; in api mode it
 * is whoever Laravel's session belongs to. Cached per request, so a layout and its page share one call.
 */
export const getSessionUser = cache(async (): Promise<CurrentUser | null> => {
  if (authMode() === "api") return fetchApiUser(await requestCookies());
  return userFromSession((await cookies()).get(SESSION_COOKIE)?.value);
});

/** The signed-in user. Without a session it redirects to the login page. */
export async function getCurrentUser(): Promise<CurrentUser> {
  const user = await getSessionUser();
  if (!user) redirect(LOGIN_PATH);
  return user;
}
