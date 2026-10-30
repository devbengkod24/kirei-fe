import Image from "next/image";
import { LineChart } from "@/components/charts/LineChart";
import { Card } from "@/components/ui/Card";
import type { AdminDashboardData } from "./getAdminDashboard";
import { LatestReportsCard } from "./LatestReportsCard";
import { StatTile } from "./StatTile";
import { TodayReservationsCard } from "./TodayReservationsCard";

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
  const { activeUsers, totalUsers } = data.userActivity;

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
        <Card as="section" aria-labelledby="user-activity-title" className="flex flex-col gap-4 p-3">
          <div>
            <h2 id="user-activity-title" className="text-sm font-medium">
              Distribusi Pengguna
            </h2>
            <p className="text-xs text-muted">Pengguna yang memesan ruangan bulan ini</p>
          </div>
          <dl className="flex items-center gap-2 rounded-md border border-border px-4 py-3">
            <span className="flex rounded-md bg-success-soft p-2">
              <Image src="/icons/admin/users-active.svg" alt="" width={24} height={24} />
            </span>
            <div className="flex flex-col-reverse">
              <dt className="text-[11px] text-success">Pengguna aktif</dt>
              <dd className="flex items-end gap-0.5">
                <span className="text-2xl leading-5 font-semibold text-success">{activeUsers}</span>
                <span className="text-[11px] leading-4 text-muted">/{totalUsers} terdaftar</span>
              </dd>
            </div>
          </dl>
        </Card>

        <LatestReportsCard reports={data.latestReports} allHref={links.reports} className="flex-1" />
      </div>
    </div>
  );
}
