import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { CurrentUser } from "@/types/user";
import { LOGIN_PATH, SESSION_COOKIE, userFromSession } from "./session";

/** The signed-in user. Without a session it redirects to the login page. */
export async function getCurrentUser(): Promise<CurrentUser> {
  const user = userFromSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!user) redirect(LOGIN_PATH);
  return user;
}
