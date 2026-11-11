import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { borrowerBooking, borrowerOwner } from "@/modules/ormawa/borrowerBooking";
import { ReservationFormPage } from "@/shared/reservation-form/ReservationFormPage";

export const metadata: Metadata = { title: "Buat Reservasi Kendaraan" };

export default async function Page() {
  const user = await getCurrentUser();

  return (
    <ReservationFormPage
      tipe="kendaraan"
      requester={{ name: user.name, fakultasId: user.fakultasId }}
      owner={borrowerOwner(user)}
      {...borrowerBooking(user.role, "kendaraan")}
    />
  );
}
