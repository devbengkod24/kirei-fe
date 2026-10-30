import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { ADMIN_FAKULTAS_ROUTES } from "@/modules/admin-fakultas/routes";
import { AdminDashboard } from "@/shared/admin-dashboard/AdminDashboard";
import { getAdminDashboard } from "@/shared/admin-dashboard/getAdminDashboard";

export const metadata: Metadata = { title: "Dashboard Admin Fakultas" };

export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  const data = await getAdminDashboard({ fakultasId: user.fakultasId });

  return (
    <AdminDashboard
      data={data}
      links={{ reservations: ADMIN_FAKULTAS_ROUTES.reservationHistory, reports: ADMIN_FAKULTAS_ROUTES.reports }}
    />
  );
}
