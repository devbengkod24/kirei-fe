import { z } from "zod";
import type { ReservationRecord, ReservationRequest, ReservationType } from "@/types/reservation";

/*
 * Demo-only reservation store for running the whole flow without kirei-api: a borrower's request,
 * the admin queue, the decision, and the borrower's history. It lives in this browser's
 * localStorage, so a tester plays every role in one browser, and other testers never see it.
 * Remove it together with the mock data once the API is wired up.
 *
 * Two kinds of data are kept:
 * - `created`: requests sent from the booking forms in this browser;
 * - `decisions`: approve/reject results, for created requests and for the seeded sample ones.
 */

export const MOCK_RESERVATIONS_KEY = "kirei:mock-reservations";

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

export interface MockReservationState {
  created: MockReservation[];
  decisions: Record<string, MockDecision>;
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
  trip: z.object({ destination: z.string(), participants: z.number() }).optional(),
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
    return storage?.getItem(MOCK_RESERVATIONS_KEY) ?? "";
  } catch {
    return "";
  }
}

const listeners = new Set<() => void>();

/** For useSyncExternalStore: fires on changes from this tab and from other tabs. */
export function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === MOCK_RESERVATIONS_KEY || event.key === null) listener();
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
    storage.setItem(MOCK_RESERVATIONS_KEY, JSON.stringify(state));
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

/** Back to the seeded sample data: forgets created requests and every decision. */
export function resetMockReservations(storage: Storage | null = browserStorage()): boolean {
  if (!storage) return false;
  try {
    storage.removeItem(MOCK_RESERVATIONS_KEY);
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
 * type and, for rooms, only rooms in the admin's scope (`roomCodes`; null means no room filter).
 */
export function mergeAdminRequests(
  seeded: ReservationRequest[],
  state: MockReservationState,
  tipe: ReservationType,
  roomCodes: string[] | null,
): ReservationRequest[] {
  const inScope = new Set(roomCodes ?? []);
  const created = state.created.filter(
    (reservation) => reservation.type === tipe && (roomCodes === null || inScope.has(reservation.roomName)),
  );
  return [...seeded, ...created].map((reservation) => withDecision(reservation, state.decisions));
}

/** What the borrower's history shows for a request they created. */
export function toHistoryRecord(reservation: MockReservation): ReservationRecord {
  return {
    id: reservation.id,
    type: reservation.type,
    status: reservation.status,
    startsAt: reservation.startsAt,
    endsAt: reservation.endsAt,
    bookerName: reservation.borrowerName,
    bookerEmail: reservation.ownerEmail,
    unitName: reservation.type === "kendaraan" && reservation.trip ? `Kendaraan ke ${reservation.trip.destination}` : reservation.roomName,
    purpose: reservation.purpose,
    cancellationReason: null,
    rejectionReason: reservation.rejectionReason,
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
