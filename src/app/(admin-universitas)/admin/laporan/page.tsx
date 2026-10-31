import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { getUserReports } from "@/shared/reports/getUserReports";
import { UserReportList } from "@/shared/reports/UserReportList";

export const metadata: Metadata = { title: "Laporan Pengguna" };

export default async function Page() {
  await requireRole(["admin_universitas"]);
  // All faculties plus university buildings.
  const reports = await getUserReports({ fakultasId: null });

  return <UserReportList reports={reports} loadedAt={new Date().toISOString()} />;
}
