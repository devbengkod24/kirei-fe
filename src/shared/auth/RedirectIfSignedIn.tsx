import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/getCurrentUser";
import { homeFor } from "@/lib/auth/session";

/**
 * Sends someone who is already signed in to their home page. proxy.ts does this itself for the demo
 * session, but with a Laravel session it cannot tell the role, so the login page asks.
 * Read inside Suspense, because it reads cookies.
 */
export async function RedirectIfSignedIn() {
  const user = await getSessionUser();
  const home = user && homeFor(user.role);
  if (home) redirect(home);
  return null;
}
