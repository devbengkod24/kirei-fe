import { connection } from "next/server";
import { buildDashboardMock } from "@/mocks/dashboard";
import type { UserDashboardData } from "./UserDashboard";

export async function getUserDashboard(): Promise<UserDashboardData> {
  await connection();
  // TODO: replace with the orval client for the dashboard endpoint (no-store) once it is in the OpenAPI spec.
  return buildDashboardMock(new Date());
}
