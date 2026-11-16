import { toWibDateKey } from "@/lib/date";
import type { ReservationRequest, ReservationStatus, ReservationSummary } from "@/types/reservation";
import { mergeAdminRequests, withDecision, type MockReservationState } from "./reservationStore";

/*
 * Dashboard figures for the "empty" data mode, counted from the requests made in this browser.
 * The server sends zeros there; these functions fill them in on the client.
 */

/** Rooms an admin oversees, as getReservationCandidates describes them. */
export interface LiveRoomScope {
  roomCodes: string[];
  buildingNames: string[];
}

export interface WeeklyCounts {
  succeeded: number[];
  cancelled: number[];
}

const SUCCEEDED = new Set<ReservationStatus>(["disetujui", "selesai"]);
const CANCELLED = new Set<ReservationStatus>(["ditolak", "batal"]);
const HOLDS_SLOT = new Set<ReservationStatus>(["menunggu_persetujuan", "disetujui"]);

const WEEKS = 4;

/** Week of the month, 0 to 3; days 22 and later all count as week 4, like the chart's four labels. */
const weekOf = (dateKey: string) => Math.min(WEEKS - 1, Math.floor((Number(dateKey.slice(8, 10)) - 1) / 7));

/** Requests that start in the month of `todayKey`, counted per week by outcome. */
export function weeklyCounts(requests: Pick<ReservationRequest, "startsAt" | "status">[], todayKey: string): WeeklyCounts {
  const counts: WeeklyCounts = { succeeded: Array(WEEKS).fill(0), cancelled: Array(WEEKS).fill(0) };
  for (const request of requests) {
    const dateKey = toWibDateKey(request.startsAt);
    if (dateKey.slice(0, 7) !== todayKey.slice(0, 7)) continue;
    if (SUCCEEDED.has(request.status)) counts.succeeded[weekOf(dateKey)] += 1;
    if (CANCELLED.has(request.status)) counts.cancelled[weekOf(dateKey)] += 1;
  }
  return counts;
}

/** Room requests in the admin's scope, with the decisions applied. */
export function roomRequestsInScope(state: MockReservationState, scope: LiveRoomScope): ReservationRequest[] {
  return mergeAdminRequests([], state, "ruangan", scope.roomCodes, scope.buildingNames);
}

/** Approved or finished requests that start today, soonest first. */
export function todaysReservations(requests: ReservationRequest[], todayKey: string): ReservationRequest[] {
  return requests
    .filter((request) => toWibDateKey(request.startsAt) === todayKey && SUCCEEDED.has(request.status))
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
}

/** Borrowers with a request that starts in the month of `todayKey`. */
export function activeBorrowers(requests: ReservationRequest[], todayKey: string): number {
  return new Set(
    requests.filter((request) => toWibDateKey(request.startsAt).slice(0, 7) === todayKey.slice(0, 7)).map((request) => request.borrowerName),
  ).size;
}

export interface OwnReservationFigures {
  totalReservations: number;
  todayReservation: ReservationSummary | null;
  reservationStarts: string[];
}

/** What the borrower's dashboard shows about their own requests. */
export function ownReservationFigures(state: MockReservationState, ownerId: string, todayKey: string): OwnReservationFigures {
  const own = state.created
    .filter((reservation) => reservation.ownerId === ownerId)
    .map((reservation) => withDecision(reservation, state.decisions))
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  const held = own.filter((reservation) => HOLDS_SLOT.has(reservation.status));
  const today = held.find((reservation) => toWibDateKey(reservation.startsAt) === todayKey);
  return {
    totalReservations: own.length,
    todayReservation: today
      ? {
          id: today.id,
          startsAt: today.startsAt,
          endsAt: today.endsAt,
          buildingName: today.buildingName,
          // A vehicle trip has no unit until the admin assigns one.
          roomName: today.roomName || today.trip?.destination || today.buildingName,
          status: today.status,
        }
      : null,
    reservationStarts: held.map((reservation) => reservation.startsAt),
  };
}
