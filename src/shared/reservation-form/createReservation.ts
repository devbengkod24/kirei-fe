import type { LaravelValidationError } from "@/lib/api/form-errors";
import { wibToIso } from "@/lib/date";
import { addMockReservation, type MockReservation, type ReservationOwner } from "@/shared/reservation-store/reservationStore";
import type { Vehicle } from "@/types/facility";
import type { ReservationType, TripKind, VehicleTrip } from "@/types/reservation";
import type {
  ReservationIntent,
  RoomReservationValues,
  SportsHallReservationValues,
  VehicleReservationValues,
} from "./schema";
import { tripRange } from "./vehicleAvailability";

export type CreateReservationResult =
  | { ok: true; intent: ReservationIntent }
  | { ok: false; validation: LaravelValidationError }
  | { ok: false; message: string };

// Request bodies in API terms; the letter goes as multipart form data.
// TODO: match the request keys and the status field to the OpenAPI spec.

// TODO: kirei-api: backend wajib memverifikasi role admin_universitas / sekretariat sebelum menerima status "disetujui" langsung tanpa alur persetujuan biasa.
const status = (intent: ReservationIntent, approved = false) =>
  intent === "draft" ? "draft" : approved ? "disetujui" : "menunggu_persetujuan";

export function toRoomReservationRequest(values: RoomReservationValues, approved = false) {
  return {
    type: "ruangan" as const,
    building_id: values.buildingId,
    room_id: values.roomId,
    starts_at: wibToIso(values.date, values.startTime),
    ends_at: wibToIso(values.date, values.endTime),
    phone: values.phone,
    purpose: values.purpose,
    status: status(values.intent, approved),
    letter: values.letter,
  };
}

export function toSportsHallReservationRequest(values: SportsHallReservationValues, hallId: string, approved = false) {
  return {
    type: "gor" as const,
    hall_id: hallId,
    starts_at: wibToIso(values.date, values.startTime),
    ends_at: wibToIso(values.date, values.endTime),
    activity: values.activity,
    notes: values.notes,
    status: status(values.intent, approved),
    letter: values.letter,
  };
}

/** Whole days: from 00:00 WIB on the first day to 00:00 WIB after the last day. `vehicles` gives the chosen type's name. */
export function toVehicleReservationRequest(values: VehicleReservationValues, vehicles: Vehicle[] = [], approved = false) {
  // The schema has already rejected reversed dates.
  const range = tripRange(values.startDate, values.endDate) ?? { startsAt: "", endsAt: "" };
  const vehicle = vehicles.find((item) => item.id === values.vehicleId);
  const destinations = values.destinations.map((item) => item.name);
  return {
    type: "kendaraan" as const,
    starts_at: range.startsAt,
    ends_at: range.endsAt,
    phone: values.phone,
    vehicle_id: values.vehicleId,
    // shortcut: the name rides along only for the demo store; drop it once the API returns the reservation
    vehicle_name: vehicle?.name ?? "",
    units: values.units,
    trip_kind: values.tripKind,
    destinations,
    destination: destinations.join(", "),
    participants: values.participants,
    activity: values.activity,
    status: status(values.intent, approved),
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
  /** A booking that needs no approval (Reservasi Internal) is stored as approved right away. */
  approved?: boolean;
}

const text = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : null);

const TRIP_KINDS: TripKind[] = ["menginap", "antar_jemput"];

/** The vehicle part of a sent request; nothing when the request has no destination or group size. */
function withTrip(request: ReservationRequest): { trip?: VehicleTrip } {
  const destinations = Array.isArray(request.destinations)
    ? request.destinations.map(text).filter((name): name is string => name !== null)
    : [];
  const destination = destinations.length ? destinations.join(", ") : text(request.destination);
  const participants = typeof request.participants === "number" ? request.participants : null;
  if (!destination || participants === null) return {};
  const vehicleId = text(request.vehicle_id);
  const vehicleName = text(request.vehicle_name);
  const units = typeof request.units === "number" ? request.units : 1;
  const kind = TRIP_KINDS.find((item) => item === request.trip_kind);
  return {
    trip: {
      destination,
      participants,
      ...(destinations.length ? { destinations } : {}),
      ...(vehicleId && vehicleName ? { vehicle: { id: vehicleId, name: vehicleName, units } } : {}),
      ...(kind ? { kind } : {}),
    },
  };
}

/** The request as the admin queue shows it. The letter keeps only its file name: a PDF does not fit in localStorage. */
export function toMockReservation(request: ReservationRequest, listing: ReservationListing, now: Date = new Date()): MockReservation {
  const activity = text(request.activity);
  return {
    id: `mock-${now.getTime().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    type: request.type,
    status: listing.approved ? "disetujui" : "menunggu_persetujuan",
    startsAt: request.starts_at,
    endsAt: request.ends_at,
    buildingName: listing.buildingName ?? (request.type === "kendaraan" ? "Kendaraan" : listing.unitName),
    // The borrower asks for a vehicle type (trip.vehicle); the admin assigns the actual units, so roomName stays empty.
    roomName: request.type === "kendaraan" ? "" : listing.unitName,
    borrowerName: listing.owner.name,
    borrowerDetail: listing.owner.detail,
    phone: text(request.phone),
    purpose: listing.purpose,
    letterFileName: request.letter?.name ?? null,
    letterUrl: null,
    ...(request.type === "kendaraan" ? withTrip(request) : {}),
    ...(request.type === "gor" && activity ? { activity } : {}),
    rejectionReason: null,
    hardCopySubmitted: false,
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
