import type { LaravelValidationError } from "@/lib/api/form-errors";
import { wibToIso } from "@/lib/date";
import type { ReservationIntent, RoomReservationValues } from "./schema";

export type CreateReservationResult =
  | { ok: true; intent: ReservationIntent }
  | { ok: false; validation: LaravelValidationError }
  | { ok: false; message: string };

/** Request body in API terms. The letter goes as multipart form data. */
export function toRoomReservationRequest(values: RoomReservationValues) {
  return {
    building_id: values.buildingId,
    room_id: values.roomId,
    starts_at: wibToIso(values.date, values.startTime),
    ends_at: wibToIso(values.date, values.endTime),
    phone: values.phone,
    purpose: values.purpose,
    status: values.intent === "draft" ? "draft" : "menunggu_konfirmasi",
    letter: values.letter,
  };
}

export async function createRoomReservation(values: RoomReservationValues): Promise<CreateReservationResult> {
  const request = toRoomReservationRequest(values);
  // TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to { validation }
  // and other failures to { message }. Until then the request is simulated as accepted.
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { ok: true, intent: request.status === "draft" ? "draft" : "submit" };
}
