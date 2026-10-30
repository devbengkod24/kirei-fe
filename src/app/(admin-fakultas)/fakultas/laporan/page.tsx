import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { getUserReports } from "@/shared/reports/getUserReports";
import { UserReportList } from "@/shared/reports/UserReportList";

export const metadata: Metadata = { title: "Laporan Pengguna" };

export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  const reports = await getUserReports({ fakultasId: user.fakultasId });

  return <UserReportList reports={reports} loadedAt={new Date().toISOString()} />;
}
