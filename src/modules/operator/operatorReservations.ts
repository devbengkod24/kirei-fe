import type { LaravelValidationError } from "@/lib/api/form-errors";
import { wibToIso } from "@/lib/date";
import type { MockReservation } from "@/shared/reservation-store/reservationStore";
import type { ReservationRecord } from "@/types/reservation";
import type { OperatorReservationValues } from "./operatorReservationSchema";

export type CreateOperatorReservationResult =
  | { ok: true; reservation: ReservationRecord }
  | { ok: false; validation: LaravelValidationError }
  | { ok: false; message: string };

/** An operator's booking as the browser store keeps it in the "empty" data mode: approved, like the booking itself. */
export function toStoredOperatorBooking(reservation: ReservationRecord, buildingName: string, now: Date = new Date()): MockReservation {
  return {
    id: reservation.id,
    type: "ruangan",
    status: "disetujui",
    startsAt: reservation.startsAt,
    endsAt: reservation.endsAt,
    buildingName,
    roomName: reservation.unitName,
    borrowerName: reservation.bookerName,
    borrowerDetail: "Dicatat operator",
    phone: null,
    purpose: reservation.purpose,
    letterFileName: null,
    letterUrl: null,
    rejectionReason: null,
    ownerId: "operator",
    ownerEmail: "",
    createdAt: now.toISOString(),
  };
}

/** Books a room on the operator's floor for today. */
export async function createOperatorReservation(
  room: { id: string; code: string },
  dateKey: string,
  values: OperatorReservationValues,
): Promise<CreateOperatorReservationResult> {
  // TODO: POST with the orval client (room_id, booker_name, purpose, starts_at, ends_at). Map 422
  // bodies to { validation } and other failures to { message }. Until then the request is simulated.
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    ok: true,
    reservation: {
      id: `rsv-local-${Date.now()}`,
      type: "ruangan",
      status: "disetujui",
      startsAt: wibToIso(dateKey, values.startTime),
      endsAt: wibToIso(dateKey, values.endTime),
      bookerName: values.bookerName,
      bookerEmail: "",
      unitName: room.code,
      purpose: values.purpose,
      cancellationReason: null,
      rejectionReason: null,
    },
  };
}
