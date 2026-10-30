import type { Metadata } from "next";
import { createReservationFor } from "@/modules/ormawa/routes";
import { ReservationTypePicker } from "@/shared/reservation-form/ReservationTypePicker";

export const metadata: Metadata = { title: "Buat Reservasi" };

export default function Page() {
  return (
    <ReservationTypePicker
      hrefs={{
        ruangan: createReservationFor("ruangan"),
        kendaraan: createReservationFor("kendaraan"),
        gor: createReservationFor("gor"),
      }}
    />
  );
}
