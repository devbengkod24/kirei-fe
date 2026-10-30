import { redirect } from "next/navigation";
import type { CurrentUser, UserRole } from "@/types/user";
import { getCurrentUser } from "./getCurrentUser";
import { homeFor, LOGIN_PATH } from "./session";

/**
 * Guard for a role's screens: other roles go back to their own home page. UX only, Laravel
 * enforces the real access rules.
 */
export async function requireRole(roles: UserRole[]): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!roles.includes(user.role)) redirect(homeFor(user.role) ?? LOGIN_PATH);
  return user;
}
