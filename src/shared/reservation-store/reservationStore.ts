import { z } from "zod";
import { readBrowserDataMode } from "@/lib/data-mode/dataMode";
import { liveKey } from "@/lib/data-mode/liveStorage";
import { toWibDateKey } from "@/lib/date";
import { vehicleText } from "@/shared/reservation/vehicleTrip";
import type { UnitBooking } from "@/types/facility";
import type { ReservationRecord, ReservationRequest, ReservationStatus, ReservationType } from "@/types/reservation";
import type { Staff } from "@/types/staff";

/*
 * Demo-only reservation store for running the whole flow without kirei-api: a borrower's request,
 * the admin queue, the decision, and the borrower's history. It lives in this browser's
 * localStorage, so a tester plays every role in one browser, and other testers never see it.
 * Remove it together with the mock data once the API is wired up.
 *
 * Two kinds of data are kept:
 * - `created`: requests sent from the booking forms in this browser;
 * - `decisions`: approve/reject results, for created requests and for the seeded sample ones;
 * - `assignments`: the drivers and costs an admin sets on a vehicle request.
 */

export const MOCK_RESERVATIONS_KEY = "kirei:mock-reservations";

/** Each data mode keeps its own requests, so switching modes never mixes them. */
export function reservationsKey(): string {
  return readBrowserDataMode() === "empty" ? liveKey("reservations") : MOCK_RESERVATIONS_KEY;
}

/** Who sent a request, so it shows up in their own history. */
export interface ReservationOwner {
  id: string;
  name: string;
  email: string;
  /** Shown under the name in the admin's detail dialog, e.g. "Ormawa" or "Dosen". */
  detail: string;
}

export interface MockReservation extends ReservationRequest {
  ownerId: string;
  ownerEmail: string;
  /** ISO 8601 (UTC) */
  createdAt: string;
}

export interface MockDecision {
  status: "disetujui" | "ditolak";
  rejectionReason: string | null;
  /** ISO 8601 (UTC) */
  decidedAt: string;
}

/** Who drives a vehicle request and what the trip costs, set by the admin. Amounts in rupiah. */
export interface VehicleAssignment {
  driverId: string | null;
  coDriverId: string | null;
  travelAllowance: number;
  fuelAndToll: number;
  driverFee: number;
}

export interface MockReservationState {
  created: MockReservation[];
  decisions: Record<string, MockDecision>;
  /** Missing in stores written before drivers and costs could be set. */
  assignments?: Record<string, VehicleAssignment>;
}

export const EMPTY_STATE: MockReservationState = { created: [], decisions: {} };

const reservationSchema = z.object({
  id: z.string(),
  type: z.enum(["ruangan", "gor", "kendaraan"]),
  status: z.enum(["draft", "menunggu_persetujuan", "disetujui", "ditolak", "selesai", "batal", "override_bium"]),
  startsAt: z.string(),
  endsAt: z.string(),
  buildingName: z.string(),
  roomName: z.string(),
  borrowerName: z.string(),
  borrowerDetail: z.string(),
  phone: z.string().nullable(),
  purpose: z.string(),
  letterFileName: z.string().nullable(),
  letterUrl: z.string().nullable(),
  // Requests stored before destinations, vehicle, and kind existed have only destination and participants.
  trip: z
    .object({
      destination: z.string(),
      participants: z.number(),
      destinations: z.array(z.string()).optional(),
      vehicle: z.object({ id: z.string(), name: z.string(), units: z.number() }).optional(),
      kind: z.enum(["menginap", "antar_jemput"]).optional(),
    })
    .optional(),
  activity: z.string().optional(),
  rejectionReason: z.string().nullable(),
  ownerId: z.string(),
  ownerEmail: z.string(),
  createdAt: z.string(),
});

const stateSchema = z.object({
  created: z.array(reservationSchema),
  decisions: z.record(
    z.string(),
    z.object({
      status: z.enum(["disetujui", "ditolak"]),
      rejectionReason: z.string().nullable(),
      decidedAt: z.string(),
    }),
  ),
  assignments: z
    .record(
      z.string(),
      z.object({
        driverId: z.string().nullable(),
        coDriverId: z.string().nullable(),
        travelAllowance: z.number(),
        fuelAndToll: z.number(),
        driverFee: z.number(),
      }),
    )
    .optional(),
});

/** Broken or foreign data reads as an empty store instead of crashing the page. */
export function parseState(raw: string | null): MockReservationState {
  if (!raw) return EMPTY_STATE;
  try {
    const parsed = stateSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : EMPTY_STATE;
  } catch {
    return EMPTY_STATE;
  }
}

type Storage = Pick<globalThis.Storage, "getItem" | "setItem" | "removeItem">;

function browserStorage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** The stored JSON as is, or "" when there is none. A string, so React can compare snapshots cheaply. */
export function readSnapshot(storage: Storage | null = browserStorage()): string {
  try {
    return storage?.getItem(reservationsKey()) ?? "";
  } catch {
    return "";
  }
}

const listeners = new Set<() => void>();

/** For useSyncExternalStore: fires on changes from this tab and from other tabs. */
export function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === reservationsKey() || event.key === null) listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function notify() {
  listeners.forEach((listener) => listener());
}

function write(state: MockReservationState, storage: Storage | null): boolean {
  if (!storage) return false;
  try {
    storage.setItem(reservationsKey(), JSON.stringify(state));
  } catch {
    return false;
  }
  notify();
  return true;
}

/** Returns false when the browser would not store it. */
export function addMockReservation(reservation: MockReservation, storage: Storage | null = browserStorage()): boolean {
  const state = parseState(readSnapshot(storage));
  return write({ ...state, created: [...state.created, reservation] }, storage);
}

export function decideMockReservation(
  id: string,
  decision: Omit<MockDecision, "decidedAt">,
  now: Date = new Date(),
  storage: Storage | null = browserStorage(),
): boolean {
  const state = parseState(readSnapshot(storage));
  return write({ ...state, decisions: { ...state.decisions, [id]: { ...decision, decidedAt: now.toISOString() } } }, storage);
}

/** Saves the drivers and costs of a vehicle request, replacing any earlier ones. */
export function assignVehicleCrew(
  id: string,
  assignment: VehicleAssignment,
  storage: Storage | null = browserStorage(),
): boolean {
  const state = parseState(readSnapshot(storage));
  return write({ ...state, assignments: { ...state.assignments, [id]: assignment } }, storage);
}

/** Back to the seeded sample data: forgets created requests and every decision. */
export function resetMockReservations(storage: Storage | null = browserStorage()): boolean {
  if (!storage) return false;
  try {
    storage.removeItem(reservationsKey());
  } catch {
    return false;
  }
  notify();
  return true;
}

/** Status and rejection reason after the admin's decision, if any. */
export function withDecision<T extends { id: string; status: string; rejectionReason: string | null }>(
  reservation: T,
  decisions: MockReservationState["decisions"],
): T {
  const decision = decisions[reservation.id];
  return decision ? ({ ...reservation, status: decision.status, rejectionReason: decision.rejectionReason } as T) : reservation;
}

/**
 * The admin's list: the server's sample requests plus requests created in this browser for this
 * type and, for rooms, only rooms in the admin's scope (`roomCodes` or a building in
 * `buildingNames`; null `roomCodes` means no room filter).
 */
export function mergeAdminRequests(
  seeded: ReservationRequest[],
  state: MockReservationState,
  tipe: ReservationType,
  roomCodes: string[] | null,
  buildingNames: string[] = [],
): ReservationRequest[] {
  const inScope = new Set(roomCodes ?? []);
  // A room added in Kelola Denah after the page loaded is not in `roomCodes`, but its building is known.
  const buildings = new Set(buildingNames);
  const created = state.created.filter(
    (reservation) =>
      reservation.type === tipe &&
      (roomCodes === null || inScope.has(reservation.roomName) || buildings.has(reservation.buildingName)),
  );
  return [...seeded, ...created].map((reservation) => withDecision(reservation, state.decisions));
}

/** What the borrower's history shows for a request they created. */
/**
 * Vehicle trips get the main driver the admin assigned (demo store), by reservation id; other
 * records pass through. A trip without an assignment, or whose driver is gone, gets null.
 */
export function withDrivers(
  records: ReservationRecord[],
  assignments: Record<string, VehicleAssignment>,
  staff: Pick<Staff, "id" | "name" | "phone">[],
): ReservationRecord[] {
  return records.map((record) => {
    if (record.type !== "kendaraan" || record.driver !== undefined) return record;
    const driver = staff.find((member) => member.id === assignments[record.id]?.driverId);
    return { ...record, driver: driver ? { name: driver.name, phone: driver.phone } : null };
  });
}

export function toHistoryRecord(reservation: MockReservation): ReservationRecord {
  return {
    id: reservation.id,
    type: reservation.type,
    status: reservation.status,
    startsAt: reservation.startsAt,
    endsAt: reservation.endsAt,
    bookerName: reservation.borrowerName,
    bookerEmail: reservation.ownerEmail,
    unitName:
      reservation.type === "kendaraan" && reservation.trip
        ? (vehicleText(reservation.trip) ?? `Kendaraan ke ${reservation.trip.destination}`)
        : reservation.roomName,
    purpose: reservation.purpose,
    cancellationReason: null,
    rejectionReason: reservation.rejectionReason,
    ...(reservation.trip ? { trip: reservation.trip } : {}),
  };
}

/** The borrower's records: the server's sample history plus their own created requests of this type. */
export function mergeOwnHistory(
  seeded: ReservationRecord[],
  state: MockReservationState,
  tipe: ReservationType,
  ownerId: string,
): ReservationRecord[] {
  const own = state.created
    .filter((reservation) => reservation.ownerId === ownerId && reservation.type === tipe)
    .map((reservation) => toHistoryRecord(withDecision(reservation, state.decisions)));
  return [...seeded, ...own];
}

/** A request waiting for approval already holds its slot, like an approved one (KONTEKS-DASAR §7). */
const SLOT_HOLDING_STATUSES = new Set<ReservationStatus>(["menunggu_persetujuan", "disetujui"]);

/**
 * Requests made in this browser that still hold their slot, as bookings for the booking forms.
 * `unitIds` maps the stored unit name (room code or GOR name) to the form's unit id; units the
 * form does not show are left out.
 */
export function heldBookings(
  state: MockReservationState,
  tipe: Exclude<ReservationType, "kendaraan">,
  unitIds: ReadonlyMap<string, string>,
): UnitBooking[] {
  return state.created.flatMap((created) => {
    const reservation = withDecision(created, state.decisions);
    const unitId = unitIds.get(reservation.roomName);
    return reservation.type === tipe && unitId && SLOT_HOLDING_STATUSES.has(reservation.status)
      ? [{ unitId, startsAt: reservation.startsAt, endsAt: reservation.endsAt }]
      : [];
  });
}

/**
 * Approved room bookings made in this browser (borrowers' requests and Reservasi Internal) for the
 * given rooms on one WIB day, as the operator's timeline shows them.
 */
export function approvedRoomBookings(state: MockReservationState, roomCodes: string[], dateKey: string): ReservationRecord[] {
  const rooms = new Set(roomCodes);
  return state.created
    .map((reservation) => withDecision(reservation, state.decisions))
    .filter(
      (reservation) =>
        reservation.type === "ruangan" &&
        reservation.status === "disetujui" &&
        rooms.has(reservation.roomName) &&
        toWibDateKey(reservation.startsAt) === dateKey,
    )
    .map(toHistoryRecord);
}
