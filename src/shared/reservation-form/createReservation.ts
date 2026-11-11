import type { LaravelValidationError } from "@/lib/api/form-errors";
import { wibToIso } from "@/lib/date";
import { addMockReservation, type MockReservation, type ReservationOwner } from "@/shared/reservation-store/reservationStore";
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

const status = (intent: ReservationIntent) => (intent === "draft" ? "draft" : "menunggu_persetujuan");

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
    destination: values.destination,
    participants: values.participants,
    activity: values.activity,
    status: status(values.intent),
    letter: values.letter,
  };
}

type ReservationRequest = {
  type: ReservationType;
  starts_at: string;
  ends_at: string;
  status: string;
  letter: File | null;
} & Record<string, unknown>;

/** How a sent request is listed for the admin and in the borrower's history (demo store only). */
export interface ReservationListing {
  owner: ReservationOwner;
  /** Room code, GOR name, or the vehicle trip, as on the draft. */
  unitName: string;
  purpose: string;
  /** Rooms only; GOR and vehicles fall back to their unit name. */
  buildingName?: string;
}

const text = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : null);

/** The request as the admin queue shows it. The letter keeps only its file name: a PDF does not fit in localStorage. */
export function toMockReservation(request: ReservationRequest, listing: ReservationListing, now: Date = new Date()): MockReservation {
  const destination = text(request.destination);
  const participants = typeof request.participants === "number" ? request.participants : null;
  const activity = text(request.activity);
  return {
    id: `mock-${now.getTime().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    type: request.type,
    status: "menunggu_persetujuan",
    startsAt: request.starts_at,
    endsAt: request.ends_at,
    buildingName: listing.buildingName ?? (request.type === "kendaraan" ? "Kendaraan" : listing.unitName),
    // A vehicle is assigned outside the app, so a new trip has none yet, like the sample data.
    roomName: request.type === "kendaraan" ? "" : listing.unitName,
    borrowerName: listing.owner.name,
    borrowerDetail: listing.owner.detail,
    phone: text(request.phone),
    purpose: listing.purpose,
    letterFileName: request.letter?.name ?? null,
    letterUrl: null,
    ...(request.type === "kendaraan" && destination && participants !== null
      ? { trip: { destination, participants } }
      : {}),
    ...(request.type === "gor" && activity ? { activity } : {}),
    rejectionReason: null,
    ownerId: listing.owner.id,
    ownerEmail: listing.owner.email,
    createdAt: now.toISOString(),
  };
}

/**
 * Sends a reservation. With a `listing`, a sent request (not a draft) is also kept in the demo
 * store so it reaches the admin queue and the borrower's history.
 */
export async function createReservation(request: ReservationRequest, listing?: ReservationListing): Promise<CreateReservationResult> {
  // TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to { validation }
  // and other failures to { message }. Until then the request is simulated as accepted.
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (request.status === "draft") return { ok: true, intent: "draft" };
  if (listing && !addMockReservation(toMockReservation(request, listing))) {
    return { ok: false, message: "Browser ini tidak bisa menyimpan data simulasi. Coba browser lain atau matikan mode privat." };
  }
  return { ok: true, intent: "submit" };
}
