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

  switch (tipe) {
    case "ruangan": {
      // No scope: every building, university buildings included. The form's building picker narrows it.
      const options = await getRoomReservationOptions();
      return (
        <RoomReservationForm
          {...options}
          requester={requester}
          owner={owner}
          mode="internal"
          purposePlaceholder="Contoh: Rapat pimpinan universitas"
          links={links}
        />
      );
    }
    case "kendaraan": {
      const options = await getVehicleReservationOptions();
      return <VehicleReservationForm {...options} requester={requester} owner={owner} mode="internal" links={links} />;
    }
    case "gor": {
      const options = await getSportsHallReservationOptions();
      return <SportsHallReservationForm {...options} requester={requester} owner={owner} mode="internal" links={links} />;
    }
  }
}
