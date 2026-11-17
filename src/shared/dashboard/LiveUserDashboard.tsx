"use client";

import { useMemo } from "react";
import { useLiveData } from "@/hooks/useLiveData";
import { announcementsSchema, LIVE_NAMES } from "@/shared/live-data/liveSchemas";
import { ownReservationFigures } from "@/shared/reservation-store/liveDashboard";
import { useMockReservations } from "@/shared/reservation-store/useMockReservations";
import { UserDashboard, type UserDashboardProps } from "./UserDashboard";

const LATEST_ANNOUNCEMENTS = 3;

/**
 * The borrower's dashboard. In the "empty" data mode (`data.liveOwnerId` is set) the figures are
 * counted from what was made in this browser; otherwise the server's data is shown as is.
 */
export function LiveUserDashboard({ data, links }: UserDashboardProps) {
  const store = useMockReservations();
  const announcements = useLiveData(LIVE_NAMES.announcements, announcementsSchema).value;
  const { liveOwnerId, todayKey } = data;

  const live = useMemo(
    () =>
      liveOwnerId
        ? {
            ...data,
            ...ownReservationFigures(store, liveOwnerId, todayKey),
            announcements: (announcements ?? []).slice(0, LATEST_ANNOUNCEMENTS),
          }
        : data,
    [data, store, announcements, liveOwnerId, todayKey],
  );

  return <UserDashboard data={live} links={links} />;
}
