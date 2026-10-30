import type { Metadata } from "next";
import { createReservationFor } from "@/modules/ormawa/routes";
import { ReservationTypePicker } from "@/shared/reservation-form/ReservationTypePicker";

export const metadata: Metadata = { title: "Buat Reservasi" };

export default function Page() {
  // Kendaraan and GOR forms are not built yet, so they get no link.
  return <ReservationTypePicker hrefs={{ ruangan: createReservationFor("ruangan") }} />;
}
