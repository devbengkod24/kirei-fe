import type { Metadata } from "next";
import { ComingSoon } from "@/components/feedback/ComingSoon";
import { ORMAWA_ROUTES } from "@/modules/ormawa/routes";

export const metadata: Metadata = { title: "Pengumuman" };

export default function Page() {
  return <ComingSoon title="Pengumuman" backHref={ORMAWA_ROUTES.dashboard} backLabel="Kembali ke Dashboard" />;
}
