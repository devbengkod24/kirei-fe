import type { LaravelValidationError } from "@/lib/api/form-errors";
import { wibToIso } from "@/lib/date";
import type { ReservationType } from "@/types/reservation";
import type {
  ReservationIntent,
  RoomReservationValues,
  SportsHallReservationValues,
  VehicleReservationValues,
} from "./schema";

export type CreateReservationResult =
  | { ok: true; intent: ReservationIntent }
  | { ok: false; validation: LaravelValidationError }
  | { ok: false; message: string };

// Request bodies in API terms; the letter goes as multipart form data.
// TODO: match the request keys and the status field to the OpenAPI spec.

const status = (intent: ReservationIntent) => (intent === "draft" ? "draft" : "menunggu_konfirmasi");

export function toRoomReservationRequest(values: RoomReservationValues) {
  return {
    type: "ruangan" as const,
    building_id: values.buildingId,
    room_id: values.roomId,
    starts_at: wibToIso(values.date, values.startTime),
    ends_at: wibToIso(values.date, values.endTime),
    phone: values.phone,
    purpose: values.purpose,
    status: status(values.intent),
    letter: values.letter,
  };
}

export function toSportsHallReservationRequest(values: SportsHallReservationValues, hallId: string) {
  return {
    type: "gor" as const,
    hall_id: hallId,
    starts_at: wibToIso(values.date, values.startTime),
    ends_at: wibToIso(values.date, values.endTime),
    activity: values.activity,
    notes: values.notes,
    status: status(values.intent),
    letter: values.letter,
  };
}

/** Whole days: from 00:00 WIB on the first day to 00:00 WIB after the last day. */
export function toVehicleReservationRequest(values: VehicleReservationValues) {
  const end = new Date(wibToIso(values.endDate, "00:00"));
  end.setUTCDate(end.getUTCDate() + 1);
  return {
    type: "kendaraan" as const,
    starts_at: wibToIso(values.startDate, "00:00"),
    ends_at: end.toISOString(),
    phone: values.phone,
    vehicle_id: values.vehicleId || null,
    destination: values.destination,
    participants: values.participants,
    activity: values.activity,
    status: status(values.intent),
    letter: values.letter,
  };
}

type ReservationRequest = { type: ReservationType; status: string; letter: File | null };

export async function createReservation(request: ReservationRequest): Promise<CreateReservationResult> {
  // TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to { validation }
  // and other failures to { message }. Until then the request is simulated as accepted.
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { ok: true, intent: request.status === "draft" ? "draft" : "submit" };
}
