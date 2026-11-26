import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { ContactPage } from "@/shared/contact/ContactPage";
import { getUserReports } from "@/shared/reports/getUserReports";
import { UserReportList } from "@/shared/reports/UserReportList";

export const metadata: Metadata = { title: "Laporan Pengguna" };

export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  const reports = await getUserReports({ fakultasId: user.fakultasId });

  return (
    <div className="flex flex-col gap-6">
      <UserReportList reports={reports} loadedAt={new Date().toISOString()} />
      <ContactPage authorName={user.name} reporterType="staf" />
    </div>
  );
}
