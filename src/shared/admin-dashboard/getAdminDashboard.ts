import { connection } from "next/server";
import { toWibDateKey } from "@/lib/date";
import { MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND } from "@/mocks/admin-dashboard";
import { buildReportsMock } from "@/mocks/reports";
import { buildReservationsMock } from "@/mocks/reservations";
import { mockRoomsInScope } from "@/mocks/rooms";
import type { AdminScope } from "@/shared/admin-scope";
import type { ReservationRequest } from "@/types/reservation";
import type { UserReport } from "@/types/report";

export interface AdminDashboardData {
  todayReservations: ReservationRequest[];
  checkedInToday: number;
  activeRooms: number;
  weeklyTrend: { labels: string[]; succeeded: number[]; cancelled: number[] };
  userActivity: { activeUsers: number; totalUsers: number };
  latestReports: UserReport[];
}

export async function getAdminDashboard(scope: AdminScope): Promise<AdminDashboardData> {
  await connection();
  // TODO: replace with the orval client for the admin dashboard endpoint (no-store, filtered by scope).
  const now = new Date();
  const todayKey = toWibDateKey(now);
  const rooms = mockRoomsInScope(scope.fakultasId);
  const roomCodes = new Set(rooms.map((room) => room.code));
  const todayReservations = buildReservationsMock(now).filter(
    (reservation) =>
      roomCodes.has(reservation.roomName) &&
      toWibDateKey(reservation.startsAt) === todayKey &&
      reservation.status !== "menunggu_konfirmasi",
  );

  return {
    todayReservations,
    // TODO: check-in comes from the operator's QR scan; the mock counts finished reservations.
    checkedInToday: todayReservations.filter((reservation) => reservation.status === "selesai").length,
    activeRooms: rooms.filter((room) => room.isActive).length,
    weeklyTrend: MOCK_WEEKLY_TREND,
    userActivity: MOCK_USER_ACTIVITY,
    latestReports: buildReportsMock(now)
      .filter((report) => report.roomCode === null || roomCodes.has(report.roomCode))
      .slice(0, 4),
  };
}
