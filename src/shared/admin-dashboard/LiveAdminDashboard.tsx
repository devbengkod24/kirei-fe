"use client";

import { useMemo } from "react";
import { toWibDateKey } from "@/lib/date";
import { useLiveReports } from "@/shared/reports/liveReports";
import { activeBorrowers, roomRequestsInScope, todaysReservations, weeklyCounts } from "@/shared/reservation-store/liveDashboard";
import { useMockReservations } from "@/shared/reservation-store/useMockReservations";
import { AdminDashboard, type AdminDashboardProps } from "./AdminDashboard";

const LATEST_REPORTS = 4;

/**
 * The admin dashboard. In the "empty" data mode (`data.live` is set) the figures are counted from
 * what was made in this browser; otherwise the server's data is shown as is.
 */
export function LiveAdminDashboard({ data, links }: AdminDashboardProps) {
  const store = useMockReservations();
  const reports = useLiveReports(data.latestReports);
  const { live } = data;

  const shown = useMemo(() => {
    if (!live) return data;
    const todayKey = toWibDateKey(live.now);
    const requests = roomRequestsInScope(store, live.rooms);
    const todayReservations = todaysReservations(requests, todayKey);
    return {
      ...data,
      todayReservations,
      // The vault has no check-in; like the sample data, this counts finished reservations.
      checkedInToday: todayReservations.filter((reservation) => reservation.status === "selesai").length,
      weeklyTrend: { labels: data.weeklyTrend.labels, ...weeklyCounts(requests, todayKey) },
      userActivity: { ...data.userActivity, activeUsers: Math.min(activeBorrowers(requests, todayKey), data.userActivity.totalUsers) },
      latestReports: reports.slice(0, LATEST_REPORTS),
    };
  }, [data, live, store, reports]);

  return <AdminDashboard data={shown} links={links} />;
}
