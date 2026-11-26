import type { Metadata } from "next";
import { internalReservationRoute } from "@/modules/admin-universitas/routes";
import { ReservationTypePicker } from "@/shared/reservation-form/ReservationTypePicker";

export const metadata: Metadata = { title: "Reservasi Internal" };

// Same three cards as the borrower's Buat Reservasi, leading to the internal form of each type.
export default function Page() {
  return (
    <div className="flex flex-col gap-3">
      <p className="rounded-md border border-primary-tint-border bg-primary-soft px-4 py-3 text-xs text-primary">
        Reservasi pihak universitas diproses langsung oleh sekretariat. Pemesanan dari halaman ini langsung berstatus
        Disetujui tanpa alur persetujuan biasa.
      </p>
      <ReservationTypePicker
        hrefs={{
          ruangan: internalReservationRoute("ruangan"),
          kendaraan: internalReservationRoute("kendaraan"),
          gor: internalReservationRoute("gor"),
        }}
      />
    </div>
  );
}
