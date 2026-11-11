import type { ReservationOwner } from "@/shared/reservation-store/reservationStore";
import type { ReservationType } from "@/types/reservation";
import type { BookingMode } from "./bookingMode";
import { getRoomReservationOptions, getSportsHallReservationOptions, getVehicleReservationOptions } from "./getReservationOptions";
import { RoomReservationForm } from "./RoomReservationForm";
import { SportsHallReservationForm } from "./SportsHallReservationForm";
import { VehicleReservationForm } from "./VehicleReservationForm";

export interface ReservationFormPageProps {
  tipe: ReservationType;
  requester: { name: string; fakultasId: string | null };
  /** The signed-in borrower. When set and the request needs approval, a sent request is kept in the demo store. */
  owner?: ReservationOwner;
  /** For admins later: allows picking a booked room. Only applies to `ruangan`. */
  canUseBookedSlot?: boolean;
  /** "request_without_letter": no letter step and no drafts; "request_without_draft": letter required, no drafts. */
  mode?: BookingMode;
  links: { history: string; drafts?: string };
}

/**
 * Booking form for one reservation type. Each type has its own layout from Figma; they share
 * the summary dialog, letter upload, validation pieces, and submit flow.
 */
export async function ReservationFormPage({ tipe, requester, owner, canUseBookedSlot = false, mode, links }: ReservationFormPageProps) {
  switch (tipe) {
    case "ruangan": {
      const options = await getRoomReservationOptions();
      return <RoomReservationForm {...options} requester={requester} owner={owner} canUseBookedSlot={canUseBookedSlot} mode={mode} links={links} />;
    }
    case "gor": {
      const options = await getSportsHallReservationOptions();
      return <SportsHallReservationForm {...options} requester={requester} owner={owner} mode={mode} links={links} />;
    }
    case "kendaraan": {
      const options = await getVehicleReservationOptions();
      return <VehicleReservationForm {...options} requester={requester} owner={owner} mode={mode} links={links} />;
    }
  }
}
