import type { ReservationType } from "@/types/reservation";
import { getRoomReservationOptions, getSportsHallReservationOptions, getVehicleReservationOptions } from "./getReservationOptions";
import { RoomReservationForm } from "./RoomReservationForm";
import { SportsHallReservationForm } from "./SportsHallReservationForm";
import { VehicleReservationForm } from "./VehicleReservationForm";

export interface ReservationFormPageProps {
  tipe: ReservationType;
  requester: { name: string; fakultasId: string | null };
  /** For admins later: allows picking a booked room. Only applies to `ruangan`. */
  canUseBookedSlot?: boolean;
  links: { history: string; drafts: string };
}

/**
 * Booking form for one reservation type. Each type has its own layout from Figma; they share
 * the summary dialog, letter upload, validation pieces, and submit flow.
 */
export async function ReservationFormPage({ tipe, requester, canUseBookedSlot = false, links }: ReservationFormPageProps) {
  switch (tipe) {
    case "ruangan": {
      const options = await getRoomReservationOptions();
      return <RoomReservationForm {...options} requester={requester} canUseBookedSlot={canUseBookedSlot} links={links} />;
    }
    case "gor": {
      const options = await getSportsHallReservationOptions();
      return <SportsHallReservationForm {...options} requester={requester} links={links} />;
    }
    case "kendaraan": {
      const options = await getVehicleReservationOptions();
      return <VehicleReservationForm {...options} requester={requester} links={links} />;
    }
  }
}
