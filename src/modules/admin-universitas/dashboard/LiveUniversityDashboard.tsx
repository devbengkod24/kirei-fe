"use client";

import { useMemo } from "react";
import { toWibDateKey } from "@/lib/date";
import { activeBorrowers, roomRequestsInScope, todaysReservations, weeklyCounts } from "@/shared/reservation-store/liveDashboard";
import { mergeAdminRequests } from "@/shared/reservation-store/reservationStore";
import { useMockReservations } from "@/shared/reservation-store/useMockReservations";
import type { ReservationRequest, ReservationType } from "@/types/reservation";
import { UniversityDashboard, type UniversityDashboardProps } from "./UniversityDashboard";

/**
 * Admin universitas dashboard. In the "empty" data mode (`data.live` is set) the figures are
 * counted from what was made in this browser; otherwise the server's data is shown as is.
 */
export function LiveUniversityDashboard({ data, ...rest }: UniversityDashboardProps) {
  const store = useMockReservations();
  const { live } = data;

  const shown = useMemo(() => {
    if (!live) return data;
    const todayKey = toWibDateKey(live.now);
    const byType: Record<ReservationType, ReservationRequest[]> = {
      ruangan: roomRequestsInScope(store, live.rooms),
      gor: mergeAdminRequests([], store, "gor", null),
      kendaraan: mergeAdminRequests([], store, "kendaraan", null),
    };
    const all = Object.values(byType).flat();
    return {
      ...data,
      summaries: data.summaries.map((summary) => ({
        ...summary,
        today: todaysReservations(byType[summary.type], todayKey).length,
        pending: byType[summary.type].filter((request) => request.status === "menunggu_persetujuan").length,
      })),
      weeklyTrend: {
        labels: data.weeklyTrend.labels,
        byType: {
          ruangan: weeklyCounts(byType.ruangan, todayKey),
          gor: weeklyCounts(byType.gor, todayKey),
          kendaraan: weeklyCounts(byType.kendaraan, todayKey),
        },
      },
      todayReservations: todaysReservations(all, todayKey),
      userActivity: { ...data.userActivity, activeUsers: Math.min(activeBorrowers(all, todayKey), data.userActivity.totalUsers) },
    };
  }, [data, live, store]);

  return <UniversityDashboard data={shown} {...rest} />;
}
