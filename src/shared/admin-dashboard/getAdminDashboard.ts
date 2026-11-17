import { connection } from "next/server";
import { getDataMode } from "@/lib/data-mode/getDataMode";
import { toWibDateKey } from "@/lib/date";
import { MOCK_BUILDINGS } from "@/mocks/facilities";
import { MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND } from "@/mocks/admin-dashboard";
import { buildReportsMock } from "@/mocks/reports";
import { buildReservationsMock } from "@/mocks/reservations";
import { MOCK_ACCOUNTS } from "@/mocks/user";
import { mockRoomsInScope } from "@/mocks/rooms";
import type { AdminScope } from "@/shared/admin-scope";
import type { LiveRoomScope } from "@/shared/reservation-store/liveDashboard";
import type { ReservationRequest } from "@/types/reservation";
import type { UserReport } from "@/types/report";

/** Demo accounts that can book: the "total pengguna" of the "empty" data mode. */
export const BORROWER_ACCOUNTS = MOCK_ACCOUNTS.filter((user) => user.role === "organisasi" || user.role === "dosen").length;

/** Set in the "empty" data mode: the dashboard then counts the requests made in the browser. */
export interface LiveDashboardScope {
  /** ISO 8601 server time, so server and browser agree on "today". */
  now: string;
  rooms: LiveRoomScope;
}

/** Rooms of the booking form's floor plans in the scope, where browser-made requests come from. */
export function liveDashboardScope(scope: AdminScope, now: Date): LiveDashboardScope {
  const buildings = MOCK_BUILDINGS.filter((building) => scope.fakultasId === null || building.fakultasId === scope.fakultasId);
  return {
    now: now.toISOString(),
    rooms: {
      roomCodes: buildings.flatMap((building) => building.floors.flatMap((floor) => floor.rooms.map((room) => room.code))),
      buildingNames: buildings.map((building) => building.name),
    },
  };
}

export interface AdminDashboardData {
  todayReservations: ReservationRequest[];
  checkedInToday: number;
  activeRooms: number;
  weeklyTrend: { labels: string[]; succeeded: number[]; cancelled: number[] };
  userActivity: { activeUsers: number; totalUsers: number };
  latestReports: UserReport[];
  live?: LiveDashboardScope;
}

export async function getAdminDashboard(scope: AdminScope): Promise<AdminDashboardData> {
  await connection();
  // TODO: replace with the orval client for the admin dashboard endpoint (no-store, filtered by scope).
  const now = new Date();
  const todayKey = toWibDateKey(now);
  const rooms = mockRoomsInScope(scope.fakultasId);
  const roomCodes = new Set(rooms.map((room) => room.code));
  // The "empty" data mode starts from zero; the dashboard then counts what was made in the browser.
  if ((await getDataMode()) === "empty") {
    return {
      todayReservations: [],
      checkedInToday: 0,
      activeRooms: rooms.filter((room) => room.isActive).length,
      weeklyTrend: { labels: MOCK_WEEKLY_TREND.labels, succeeded: [0, 0, 0, 0], cancelled: [0, 0, 0, 0] },
      userActivity: { activeUsers: 0, totalUsers: BORROWER_ACCOUNTS },
      latestReports: [],
      live: liveDashboardScope(scope, now),
    };
  }
  const todayReservations = buildReservationsMock(now).filter(
    (reservation) =>
      roomCodes.has(reservation.roomName) &&
      toWibDateKey(reservation.startsAt) === todayKey &&
      reservation.status !== "menunggu_persetujuan",
  );

  return {
    todayReservations,
    // The vault has no check-in; the mock counts finished reservations.
    checkedInToday: todayReservations.filter((reservation) => reservation.status === "selesai").length,
    activeRooms: rooms.filter((room) => room.isActive).length,
    weeklyTrend: MOCK_WEEKLY_TREND,
    userActivity: MOCK_USER_ACTIVITY,
    latestReports: buildReportsMock(now)
      .filter((report) => report.roomCode === null || roomCodes.has(report.roomCode))
      .slice(0, 4),
  };
}
