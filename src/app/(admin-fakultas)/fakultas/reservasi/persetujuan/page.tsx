import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { RESERVATION_TAB_LINKS } from "@/modules/admin-fakultas/reservation-tabs";
import { getReservationRequests } from "@/shared/reservation-management/getReservationRequests";
import { ReservationManagement } from "@/shared/reservation-management/ReservationManagement";

export const metadata: Metadata = { title: "Persetujuan Reservasi" };

export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  const reservations = await getReservationRequests({ fakultasId: user.fakultasId }, "persetujuan");

  return <ReservationManagement tipe="ruangan" tab="persetujuan" links={RESERVATION_TAB_LINKS} reservations={reservations} />;
}
