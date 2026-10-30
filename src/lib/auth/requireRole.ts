import { connection } from "next/server";
import { mockUserFor } from "@/mocks/user";
import type { CurrentUser, UserRole } from "@/types/user";

/**
 * Layout guard for a role's route group. UX only: Laravel enforces the real access rules.
 */
export async function requireRole(roles: UserRole[]): Promise<CurrentUser> {
  await connection();
  // TODO: once the Sanctum session exists, load it with getCurrentUser() and
  // redirect("/login") when there is no session or its role is not in `roles`.
  return mockUserFor(roles[0]);
}
