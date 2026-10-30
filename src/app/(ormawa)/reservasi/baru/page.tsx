import type { Metadata } from "next";
import { ComingSoon } from "@/components/feedback/ComingSoon";
import { ORMAWA_ROUTES } from "@/modules/ormawa/routes";

export const metadata: Metadata = { title: "Buat Reservasi" };

export default function Page() {
  return <ComingSoon title="Buat Reservasi" backHref={ORMAWA_ROUTES.dashboard} backLabel="Kembali ke Dashboard" />;
}
