import { connection } from "next/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { buildDashboardMock } from "@/mocks/dashboard";
import type { UserDashboardData } from "./UserDashboard";

export async function getUserDashboard(): Promise<UserDashboardData> {
  await connection();
  // An ormawa account is the organisation itself, so its name is the ormawa name, not a person's.
  const user = await getCurrentUser();
  // TODO: replace with the orval client for the dashboard endpoint (no-store) once it is in the OpenAPI spec.
  return { ...buildDashboardMock(new Date()), userName: user.name };
}
