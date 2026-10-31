import {
  getActiveVehicles,
  getRoomReservationOptions,
  getSportsHallReservationOptions,
  getVehicleReservationOptions,
} from "@/shared/reservation-form/getReservationOptions";
import { RoomReservationForm } from "@/shared/reservation-form/RoomReservationForm";
import { SportsHallReservationForm } from "@/shared/reservation-form/SportsHallReservationForm";
import { VehicleReservationForm } from "@/shared/reservation-form/VehicleReservationForm";
import type { ReservationType } from "@/types/reservation";
import { reservationsRoute } from "../routes";

export interface InternalReservationFormProps {
  tipe: ReservationType;
  requesterName: string;
}

/** Admin universitas books for the campus: any building, the GOR, or a vehicle it picks itself. */
export async function InternalReservationForm({ tipe, requesterName }: InternalReservationFormProps) {
  // The admin belongs to no faculty, so no cross-faculty approval applies.
  const requester = { name: requesterName, fakultasId: null };
  const links = { history: reservationsRoute(tipe, "riwayat"), historyLabel: "Buka Kelola Reservasi" };

  switch (tipe) {
    case "ruangan": {
      // No scope: every building, university buildings included. The form's building picker narrows it.
      const options = await getRoomReservationOptions();
      return (
        <RoomReservationForm
          {...options}
          requester={requester}
          mode="internal"
          purposePlaceholder="Contoh: Rapat pimpinan universitas"
          links={links}
        />
      );
    }
    case "kendaraan": {
      const [options, vehicles] = await Promise.all([getVehicleReservationOptions(), getActiveVehicles()]);
      return <VehicleReservationForm {...options} requester={requester} mode="internal" vehicles={vehicles} links={links} />;
    }
    case "gor": {
      const options = await getSportsHallReservationOptions();
      return <SportsHallReservationForm {...options} requester={requester} mode="internal" links={links} />;
    }
  }
}
