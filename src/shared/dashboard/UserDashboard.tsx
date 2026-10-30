import { Card } from "@/components/ui/Card";
import type { Announcement } from "@/types/announcement";
import type { ReservationSummary } from "@/types/reservation";
import { DashboardHero } from "./DashboardHero";
import { LatestAnnouncementsCard } from "./LatestAnnouncementsCard";
import { ReservationLogCalendar } from "./ReservationLogCalendar";
import { ReservationTotal } from "./ReservationTotal";
import { TodayReservationCard } from "./TodayReservationCard";

export interface UserDashboardData {
  userName: string;
  /** "YYYY-MM-DD" in WIB */
  todayKey: string;
  totalReservations: number;
  todayReservation: ReservationSummary | null;
  reservationStarts: string[];
  announcements: Announcement[];
}

export interface UserDashboardLinks {
  reservationDetail: string;
  createReservation: string;
  announcements: string;
}

export interface UserDashboardProps {
  data: UserDashboardData;
  links: UserDashboardLinks;
}

/** Dashboard for borrowers (ormawa and dosen share this screen). */
export function UserDashboard({ data, links }: UserDashboardProps) {
  return (
    <div className="flex flex-col gap-3">
      <DashboardHero userName={data.userName} />

      <div className="grid gap-2 lg:grid-cols-2 xl:grid-cols-[332fr_312fr_485fr]">
        <ReservationLogCalendar todayKey={data.todayKey} reservationStarts={data.reservationStarts} />

        <div className="flex flex-col gap-2">
          <Card className="p-3">
            <ReservationTotal totalReservations={data.totalReservations} />
          </Card>
          <TodayReservationCard
            reservation={data.todayReservation}
            detailHref={links.reservationDetail}
            createHref={links.createReservation}
            className="flex-1"
          />
        </div>

        <LatestAnnouncementsCard
          announcements={data.announcements}
          allHref={links.announcements}
          className="lg:col-span-2 xl:col-span-1"
        />
      </div>
    </div>
  );
}
