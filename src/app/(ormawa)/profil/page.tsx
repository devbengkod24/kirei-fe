import type { Metadata } from "next";
import { ComingSoon } from "@/components/feedback/ComingSoon";
import { ORMAWA_ROUTES } from "@/modules/ormawa/routes";

export const metadata: Metadata = { title: "Profil" };

export default function Page() {
  return <ComingSoon title="Profil" backHref={ORMAWA_ROUTES.dashboard} backLabel="Kembali ke Dashboard" />;
}
