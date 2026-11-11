import { findMockUserById, MOCK_ACCOUNTS } from "@/mocks/user";
import type { CurrentUser, UserRole } from "@/types/user";

/*
 * Demo session (AUTH_MODE=mock): an httpOnly cookie holding the user id. It only exists so routes
 * and roles can be tried without the API; anyone can forge it. With AUTH_MODE=api the session is
 * Laravel's own cookie and the user comes from GET /api/user (see laravel.ts). The name differs from
 * Laravel's default "kirei_session" so the two never overwrite each other.
 */
export const SESSION_COOKIE = "kirei_demo_session";

export const LOGIN_PATH = "/login";

// Kept in step with modules/<role>/routes.ts; lib may not import from modules.
const ROLE_HOME: Partial<Record<UserRole, string>> = {
  organisasi: "/dashboard",
  dosen: "/dashboard",
  admin_fakultas: "/fakultas/dashboard",
  admin_universitas: "/admin/dashboard",
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

/** The demo user a mock-mode cookie value names. */
export function userFromSession(value: string | undefined): CurrentUser | null {
  return findMockUserById(value);
}
