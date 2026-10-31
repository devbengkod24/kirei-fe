import type { Metadata } from "next";
import { ComingSoon } from "@/components/feedback/ComingSoon";
import { ADMIN_UNIVERSITAS_ROUTES } from "@/modules/admin-universitas/routes";

export const metadata: Metadata = { title: "Laporan Pengguna" };

export default function Page() {
  return <ComingSoon title="Laporan Pengguna" backHref={ADMIN_UNIVERSITAS_ROUTES.dashboard} backLabel="Kembali ke Dashboard" />;
}
