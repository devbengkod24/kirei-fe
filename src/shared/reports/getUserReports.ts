import { connection } from "next/server";
import { buildReportsMock } from "@/mocks/reports";
import { mockRoomsInScope } from "@/mocks/rooms";
import type { AdminScope } from "@/shared/admin-scope";
import type { UserReport } from "@/types/report";

export async function getUserReports(scope: AdminScope): Promise<UserReport[]> {
  await connection();
  // TODO: replace with the orval client for user reports (no-store, filtered by scope).
  const roomCodes = new Set(mockRoomsInScope(scope.fakultasId).map((room) => room.code));
  return buildReportsMock(new Date()).filter((report) => report.roomCode === null || roomCodes.has(report.roomCode));
}
