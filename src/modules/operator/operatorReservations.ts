import type { LaravelValidationError } from "@/lib/api/form-errors";
import { wibToIso } from "@/lib/date";
import type { ReservationRecord } from "@/types/reservation";
import type { OperatorReservationValues } from "./operatorReservationSchema";

export type CreateOperatorReservationResult =
  | { ok: true; reservation: ReservationRecord }
  | { ok: false; validation: LaravelValidationError }
  | { ok: false; message: string };

export type DeleteReservationResult = { ok: true } | { ok: false; message: string };

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
      reschedule: null,
      cancellationReason: null,
    },
  };
}

export async function deleteReservation(id: string): Promise<DeleteReservationResult> {
  // TODO: DELETE with the orval client; the API checks whether this operator may delete it.
  void id;
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ok: true };
}
