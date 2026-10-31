import type { Metadata } from "next";
import { ComingSoon } from "@/components/feedback/ComingSoon";
import { ADMIN_UNIVERSITAS_ROUTES } from "@/modules/admin-universitas/routes";

export const metadata: Metadata = { title: "Kelola Denah" };

export default function Page() {
  return <ComingSoon title="Kelola Denah" backHref={ADMIN_UNIVERSITAS_ROUTES.dashboard} backLabel="Kembali ke Dashboard" />;
}
