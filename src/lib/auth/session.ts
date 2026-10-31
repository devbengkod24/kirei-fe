import { findMockUserById, MOCK_ACCOUNTS } from "@/mocks/user";
import type { CurrentUser, UserRole } from "@/types/user";

/*
 * Mock session: an httpOnly cookie holding the user id. It only exists so routes and roles can be
 * tried before the API is ready; anyone can forge it. Once Sanctum is wired up, the cookie becomes
 * Laravel's session cookie and the user comes from GET /api/user.
 */
export const SESSION_COOKIE = "kirei_session";

export const LOGIN_PATH = "/login";

// Kept in step with modules/<role>/routes.ts; lib may not import from modules.
const ROLE_HOME: Partial<Record<UserRole, string>> = {
  ormawa: "/dashboard",
  dosen: "/dashboard",
  admin_fakultas: "/fakultas/dashboard",
  operator: "/operator",
};

/** First page after login, or null for roles without screens yet. */
export function homeFor(role: UserRole): string | null {
  return ROLE_HOME[role] ?? null;
}

/** Demo accounts offered for quick login, limited to roles that have screens. */
export function getDemoAccounts(): CurrentUser[] {
  return MOCK_ACCOUNTS.filter((user) => homeFor(user.role) !== null);
}

export function userFromSession(value: string | undefined): CurrentUser | null {
  // TODO: replace with GET /api/user through the orval client.
  return findMockUserById(value);
}
