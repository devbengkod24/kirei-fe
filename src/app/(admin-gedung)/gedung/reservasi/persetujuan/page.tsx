import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { RESERVATION_TAB_LINKS } from "@/modules/admin-gedung/reservation-tabs";
import { getReservationCandidates } from "@/shared/reservation-management/getReservationRequests";
import { ReservationManagement } from "@/shared/reservation-management/ReservationManagement";

export const metadata: Metadata = { title: "Persetujuan Reservasi" };

export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  const candidates = await getReservationCandidates({ fakultasId: user.fakultasId });

  return <ReservationManagement tipe="ruangan" tab="persetujuan" links={RESERVATION_TAB_LINKS} {...candidates} />;
}
