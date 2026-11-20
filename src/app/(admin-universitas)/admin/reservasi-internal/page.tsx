import type { Metadata } from "next";
import { internalReservationRoute } from "@/modules/admin-universitas/routes";
import { ReservationTypePicker } from "@/shared/reservation-form/ReservationTypePicker";

export const metadata: Metadata = { title: "Reservasi Internal" };

// Same three cards as the borrower's Buat Reservasi, leading to the internal form of each type.
export default function Page() {
  return (
    <ReservationTypePicker
      hrefs={{
        ruangan: internalReservationRoute("ruangan"),
        kendaraan: internalReservationRoute("kendaraan"),
        gor: internalReservationRoute("gor"),
      }}
    />
  );
}
