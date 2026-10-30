// TODO: match these values to the Laravel OpenAPI spec once the reservation endpoints exist.
export type ReservationStatus =
  | "menunggu_konfirmasi"
  | "disetujui"
  | "ditolak"
  | "selesai"
  | "dibatalkan";

export type ReservationType = "ruangan" | "gor" | "kendaraan";

export const RESERVATION_TYPES: readonly ReservationType[] = ["ruangan", "kendaraan", "gor"];

/**
 * Which reservations a list may show. Laravel enforces the actual restriction;
 * this is only the filter the frontend sends.
 * - `{ mine: true }`: the signed-in borrower's own reservations
 * - `{ fakultasId }`: an admin view, `null` meaning all faculties
 */
export type ReservationScope = { mine: true } | { fakultasId: string | null };

export interface ReservationSummary {
  id: string;
  ticketCode: string;
  /** ISO 8601 (UTC) */
  startsAt: string;
  /** ISO 8601 (UTC) */
  endsAt: string;
  buildingName: string;
  roomName: string;
  status: ReservationStatus;
}

/** Set when an admin took the original slot and moved this reservation. */
export interface ReservationReschedule {
  /** ISO 8601 (UTC) */
  previousStartsAt: string;
  /** ISO 8601 (UTC) */
  previousEndsAt: string;
  reason: string;
}

export interface ReservationRecord {
  id: string;
  type: ReservationType;
  status: ReservationStatus;
  /** ISO 8601 (UTC) */
  startsAt: string;
  /** ISO 8601 (UTC) */
  endsAt: string;
  bookerName: string;
  bookerEmail: string;
  /** Room code, vehicle name, or GOR name. */
  unitName: string;
  purpose: string;
  reschedule: ReservationReschedule | null;
  /** Filled when the reservation was cancelled, e.g. no replacement slot was available. */
  cancellationReason: string | null;
}
