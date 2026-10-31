import { LatestReportsCard } from "@/shared/admin-dashboard/LatestReportsCard";
import type { STAT_TONES } from "@/shared/admin-dashboard/StatTile";
import { TodayReservationsCard } from "@/shared/admin-dashboard/TodayReservationsCard";
import { UserActivityCard } from "@/shared/admin-dashboard/UserActivityCard";
import { FakultasFilter } from "@/shared/fakultas-filter/FakultasFilter";
import type { Fakultas } from "@/types/fakultas";
import type { ReservationType } from "@/types/reservation";
import { ADMIN_UNIVERSITAS_ROUTES, reservationsRoute } from "../routes";
import type { UniversityDashboardData } from "./getUniversityDashboard";
import { ReservationTrendCard } from "./ReservationTrendCard";
import { TypeSummaryCard } from "./TypeSummaryCard";

const TONE: Record<ReservationType, keyof typeof STAT_TONES> = {
  ruangan: "violet",
  gor: "teal",
  kendaraan: "orange",
};

export interface UniversityDashboardProps {
  data: UniversityDashboardData;
  fakultasOptions: Fakultas[];
  /** The faculty picked in the filter, or null for all faculties. */
  fakultas: Fakultas | null;
}

/** One dashboard for rooms, GOR, and vehicles. The faculty filter narrows only the room figures. */
export function UniversityDashboard({ data, fakultasOptions, fakultas }: UniversityDashboardProps) {
  const scopeLabel = (type: ReservationType) => (type === "ruangan" ? (fakultas?.shortName ?? "Semua fakultas") : "Universitas");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-xs text-muted">
          {fakultas
            ? `Angka ruangan hanya untuk ${fakultas.name}. GOR dan kendaraan milik universitas, jadi tidak ikut tersaring.`
            : "Filter fakultas hanya menyaring data ruangan. GOR dan kendaraan milik universitas."}
        </p>
        <FakultasFilter options={fakultasOptions} value={fakultas?.id ?? null} />
      </div>

      <div className="grid gap-2 xl:grid-cols-[750fr_384fr]">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="grid gap-2 sm:grid-cols-3">
            {data.summaries.map((summary) => (
              <TypeSummaryCard
                key={summary.type}
                summary={summary}
                scopeLabel={scopeLabel(summary.type)}
                href={reservationsRoute(summary.type, "persetujuan")}
                tone={TONE[summary.type]}
              />
            ))}
          </div>

          <ReservationTrendCard
            labels={data.weeklyTrend.labels}
            byType={data.weeklyTrend.byType}
            fakultasLabel={fakultas?.shortName ?? null}
          />

          <TodayReservationsCard
            reservations={data.todayReservations}
            allHref={reservationsRoute("ruangan", "riwayat")}
            showType
            className="flex-1"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <UserActivityCard
            activeUsers={data.userActivity.activeUsers}
            totalUsers={data.userActivity.totalUsers}
            description="Pengguna yang memesan ruangan, GOR, atau kendaraan bulan ini"
          />
          <LatestReportsCard reports={data.latestReports} allHref={ADMIN_UNIVERSITAS_ROUTES.reports} className="flex-1" />
        </div>
      </div>
    </div>
  );
}
