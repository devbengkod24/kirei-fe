import { LineChart } from "@/components/charts/LineChart";
import { Card } from "@/components/ui/Card";
import type { AdminDashboardData } from "./getAdminDashboard";
import { LatestReportsCard } from "./LatestReportsCard";
import { StatTile } from "./StatTile";
import { TodayReservationsCard } from "./TodayReservationsCard";
import { UserActivityCard } from "./UserActivityCard";

export interface AdminDashboardLinks {
  reservations: string;
  reports: string;
}

export interface AdminDashboardProps {
  data: AdminDashboardData;
  links: AdminDashboardLinks;
}

/** Dashboard for admins (faculty and university): today's load, the month's trend, and new reports. */
export function AdminDashboard({ data, links }: AdminDashboardProps) {
  return (
    <div className="grid gap-2 xl:grid-cols-[750fr_384fr]">
      <div className="flex min-w-0 flex-col gap-2">
        <div className="grid gap-2 sm:grid-cols-3">
          <StatTile label="Total Reservasi Hari Ini" value={data.todayReservations.length} iconSrc="/icons/admin/stat-today.svg" tone="violet" />
          <StatTile label="Total Check-in Hari Ini" value={data.checkedInToday} iconSrc="/icons/admin/stat-checkin.svg" tone="teal" />
          <StatTile label="Total Ruangan Aktif" value={data.activeRooms} iconSrc="/icons/admin/stat-rooms.svg" tone="orange" />
        </div>

        <Card as="section" aria-labelledby="reservation-trend-title" className="flex flex-col gap-2 p-3">
          <div>
            <h2 id="reservation-trend-title" className="text-sm font-medium">
              Distribusi Reservasi
            </h2>
            <p className="text-xs text-muted">Reservasi berhasil dan dibatalkan per minggu, bulan ini</p>
          </div>
          <LineChart
            caption="Jumlah reservasi berhasil dan dibatalkan per minggu bulan ini"
            labels={data.weeklyTrend.labels}
            series={[
              { name: "Reservasi Berhasil", color: "var(--color-info)", values: data.weeklyTrend.succeeded },
              { name: "Reservasi Dibatalkan", color: "var(--color-danger-strong)", values: data.weeklyTrend.cancelled },
            ]}
          />
        </Card>

        <TodayReservationsCard reservations={data.todayReservations} allHref={links.reservations} className="flex-1" />
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <UserActivityCard
          activeUsers={data.userActivity.activeUsers}
          totalUsers={data.userActivity.totalUsers}
          description="Pengguna yang memesan ruangan bulan ini"
        />

        <LatestReportsCard reports={data.latestReports} allHref={links.reports} className="flex-1" />
      </div>
    </div>
  );
}
