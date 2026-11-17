import { connection } from "next/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getDataMode } from "@/lib/data-mode/getDataMode";
import { toWibDateKey } from "@/lib/date";
import { buildDashboardMock } from "@/mocks/dashboard";
import type { UserDashboardData } from "./UserDashboard";

export async function getUserDashboard(): Promise<UserDashboardData> {
  await connection();
  // An ormawa account is the organisation itself, so its name is the ormawa name, not a person's.
  const user = await getCurrentUser();
  // TODO: replace with the orval client for the dashboard endpoint (no-store) once it is in the OpenAPI spec.
  const now = new Date();
  // The "empty" data mode starts from zero; the dashboard then counts what was made in the browser.
  if ((await getDataMode()) === "empty") {
    return { userName: user.name, todayKey: toWibDateKey(now), totalReservations: 0, todayReservation: null, reservationStarts: [], announcements: [], liveOwnerId: user.id };
  }
  return { ...buildDashboardMock(now), userName: user.name };
}
