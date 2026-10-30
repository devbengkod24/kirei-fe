import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { ADMIN_FAKULTAS_ROUTES } from "@/modules/admin-fakultas/routes";
import { getRoomReservationOptions } from "@/shared/reservation-form/getReservationOptions";
import { RoomReservationForm } from "@/shared/reservation-form/RoomReservationForm";

export const metadata: Metadata = { title: "Reservasi Internal" };

// Same room form as the borrower's, set up for an admin booking for the faculty:
// no phone, no loan letter or draft, and only the faculty's buildings.
export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  const options = await getRoomReservationOptions({ fakultasId: user.fakultasId });

  return (
    <RoomReservationForm
      {...options}
      requester={{ name: user.name, fakultasId: user.fakultasId }}
      requesterLabel="Pemesan"
      askPhone={false}
      withLetter={false}
      purposePlaceholder="Contoh: Rapat dosen prodi"
      submittedText="sudah dibuat."
      links={{ history: ADMIN_FAKULTAS_ROUTES.reservationHistory, historyLabel: "Buka Kelola Reservasi" }}
    />
  );
}
