import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { ADMIN_GEDUNG_ROUTES } from "@/modules/admin-gedung/routes";
import { LiveAdminDashboard } from "@/shared/admin-dashboard/LiveAdminDashboard";
import { getAdminDashboard } from "@/shared/admin-dashboard/getAdminDashboard";

export const metadata: Metadata = { title: "Dashboard Admin Gedung" };

export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  const data = await getAdminDashboard({ fakultasId: user.fakultasId });

  return (
    <LiveAdminDashboard
      data={data}
      links={{ reservations: ADMIN_GEDUNG_ROUTES.reservationHistory, reports: ADMIN_GEDUNG_ROUTES.reports }}
    />
  );
}
