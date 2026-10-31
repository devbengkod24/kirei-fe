import { connection } from "next/server";
import { toWibDateKey } from "@/lib/date";
import { MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_WEEKLY_TREND_BY_TYPE } from "@/mocks/admin-dashboard";
import { MOCK_VEHICLES } from "@/mocks/facilities";
import { buildReportsMock } from "@/mocks/reports";
import { buildFacilityRequestsMock, buildReservationsMock } from "@/mocks/reservations";
import { mockRoomsInScope } from "@/mocks/rooms";
import type { AdminScope } from "@/shared/admin-scope";
import { RESERVATION_TYPES, type ReservationRequest, type ReservationType } from "@/types/reservation";
import type { UserReport } from "@/types/report";

export interface TypeSummary {
  type: ReservationType;
  /** Approved or finished reservations that start today. */
  today: number;
  /** Requests still waiting for a decision, any date. */
  pending: number;
  activeUnits: number;
  totalUnits: number;
}

export interface WeeklyCounts {
  succeeded: number[];
  cancelled: number[];
}

export interface UniversityDashboardData {
  summaries: TypeSummary[];
  weeklyTrend: { labels: string[]; byType: Record<ReservationType, WeeklyCounts> };
  todayReservations: ReservationRequest[];
  userActivity: { activeUsers: number; totalUsers: number };
  latestReports: UserReport[];
}

/**
 * Everything admin universitas oversees. The faculty filter narrows only the room figures:
 * GOR and vehicles belong to the university, not to a faculty.
 */
export async function getUniversityDashboard(scope: AdminScope): Promise<UniversityDashboardData> {
  await connection();
  // TODO: replace with the orval client for the admin universitas dashboard (no-store, filtered by scope).
  const now = new Date();
  const todayKey = toWibDateKey(now);
  const rooms = mockRoomsInScope(scope.fakultasId);
  const roomCodes = new Set(rooms.map((room) => room.code));
  const requests = [
    ...buildReservationsMock(now).filter((request) => roomCodes.has(request.roomName)),
    ...buildFacilityRequestsMock(now),
  ];
  const ofType = (type: ReservationType) => requests.filter((request) => request.type === type);
  const isToday = (request: ReservationRequest) =>
    toWibDateKey(request.startsAt) === todayKey && (request.status === "disetujui" || request.status === "selesai");

  const units: Record<ReservationType, { active: number; total: number }> = {
    ruangan: { active: rooms.filter((room) => room.isActive).length, total: rooms.length },
    gor: { active: 1, total: 1 },
    kendaraan: {
      active: MOCK_VEHICLES.filter((vehicle) => vehicle.isActive).reduce((sum, vehicle) => sum + vehicle.unitCount, 0),
      total: MOCK_VEHICLES.reduce((sum, vehicle) => sum + vehicle.unitCount, 0),
    },
  };

  // The mock has one trend for all rooms; a faculty without rooms gets none.
  const roomTrend = rooms.length > 0 ? MOCK_WEEKLY_TREND_BY_TYPE.ruangan : { succeeded: [0, 0, 0, 0], cancelled: [0, 0, 0, 0] };

  return {
    summaries: RESERVATION_TYPES.map((type) => ({
      type,
      today: ofType(type).filter(isToday).length,
      pending: ofType(type).filter((request) => request.status === "menunggu_konfirmasi").length,
      activeUnits: units[type].active,
      totalUnits: units[type].total,
    })),
    weeklyTrend: {
      labels: MOCK_WEEKLY_TREND_BY_TYPE.labels,
      byType: { ruangan: roomTrend, gor: MOCK_WEEKLY_TREND_BY_TYPE.gor, kendaraan: MOCK_WEEKLY_TREND_BY_TYPE.kendaraan },
    },
    todayReservations: requests.filter(isToday).sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)),
    userActivity: MOCK_UNIVERSITY_USER_ACTIVITY,
    latestReports: buildReportsMock(now)
      .filter((report) => report.roomCode === null || roomCodes.has(report.roomCode))
      .slice(0, 4),
  };
}
