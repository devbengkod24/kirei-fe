import {
  getRoomReservationOptions,
  getSportsHallReservationOptions,
  getVehicleReservationOptions,
} from "@/shared/reservation-form/getReservationOptions";
import { RoomReservationForm } from "@/shared/reservation-form/RoomReservationForm";
import { SportsHallReservationForm } from "@/shared/reservation-form/SportsHallReservationForm";
import { VehicleReservationForm } from "@/shared/reservation-form/VehicleReservationForm";
import type { ReservationOwner } from "@/shared/reservation-store/reservationStore";
import type { ReservationType } from "@/types/reservation";
import { reservationsRoute } from "../routes";

export interface InternalReservationFormProps {
  tipe: ReservationType;
  /** The signed-in admin; the booking is kept in the demo store as approved. */
  owner: ReservationOwner;
}

/** Admin universitas books for the campus: any building, the GOR, or a vehicle trip. */
export async function InternalReservationForm({ tipe, owner }: InternalReservationFormProps) {
  // The admin belongs to no faculty, so no cross-faculty approval applies.
  const requester = { name: owner.name, fakultasId: null };
  const links = { history: reservationsRoute(tipe, "riwayat"), historyLabel: "Buka Kelola Reservasi" };

  const notice = (
    <p className="rounded-md border border-primary-tint-border bg-primary-soft px-4 py-3 text-xs text-primary">
      Reservasi pihak universitas diproses langsung oleh sekretariat. Pemesanan dari halaman ini langsung berstatus
      Disetujui tanpa alur persetujuan biasa.
    </p>
  );

  switch (tipe) {
    case "ruangan": {
      // No scope: every building, university buildings included. The form's building picker narrows it.
      const options = await getRoomReservationOptions();
      return (
        <div className="flex flex-col gap-3">
          {notice}
          <RoomReservationForm
            {...options}
            requester={requester}
            owner={owner}
            mode="internal"
            purposePlaceholder="Contoh: Rapat pimpinan universitas"
            links={links}
            // the breadcrumb and the notice above take about 6.6rem more than the admin gedung page
            fitClassName="lg:h-[calc(100dvh-14rem)]"
          />
        </div>
      );
    }
    case "kendaraan": {
      const options = await getVehicleReservationOptions();
      return (
        <div className="flex flex-col gap-3">
          {notice}
          <VehicleReservationForm {...options} requester={requester} owner={owner} mode="internal" links={links} />
        </div>
      );
    }
    case "gor": {
      const options = await getSportsHallReservationOptions();
      return (
        <div className="flex flex-col gap-3">
          {notice}
          <SportsHallReservationForm {...options} requester={requester} owner={owner} mode="internal" links={links} />
        </div>
      );
    }
  }
}
