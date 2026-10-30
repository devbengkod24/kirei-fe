"use client";

import React from "react";
import { UserProfile, ReservationItem, AnnouncementItem } from "@/types/dashboard";
import { HeroBanner } from "./HeroBanner";
import { ReservationLogCalendar } from "./ReservationLogCalendar";
import { AccountStatusAlert } from "./AccountStatusAlert";
import { ReservationStatCards } from "./ReservationStatCards";
import { TodayReservationCard } from "./TodayReservationCard";
import { AnnouncementsCard } from "./AnnouncementsCard";

export interface DashboardViewProps {
  user: UserProfile;
  todayReservation?: ReservationItem | null;
  announcements: AnnouncementItem[];
  onViewReservationDetail?: (reservationId: string) => void;
  onViewAllAnnouncements?: () => void;
}

export function DashboardView({
  user,
  todayReservation,
  announcements,
  onViewReservationDetail,
  onViewAllAnnouncements,
}: DashboardViewProps) {
  return (
    <div className="space-y-6">
      {/* 1. Hero Banner */}
      <HeroBanner userName={user.name} />

      {/* 2. Three-column grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Calendar Log (4 cols on lg) */}
        <div className="lg:col-span-4">
          <ReservationLogCalendar />
        </div>

        {/* Middle Column: Alert, Stats & Today's Reservation (4 cols on lg) */}
        <div className="space-y-4 lg:col-span-4">
          <AccountStatusAlert
            isBlocked={user.isBlocked}
            blockedUntil={user.blockedUntil}
          />

          <ReservationStatCards
            totalReservations={user.totalReservations}
            totalPenalties={user.totalPenalties}
            maxPenalties={user.maxPenalties}
          />

          <TodayReservationCard
            reservation={todayReservation}
            onViewDetail={onViewReservationDetail}
          />
        </div>

        {/* Right Column: Announcements (4 cols on lg) */}
        <div className="md:col-span-2 lg:col-span-4">
          <AnnouncementsCard
            announcements={announcements}
            onViewAll={onViewAllAnnouncements}
          />
        </div>
      </div>
    </div>
  );
}

