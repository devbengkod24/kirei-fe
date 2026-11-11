import type { ReservationRequest, ReservationStatus } from "@/types/reservation";

export type ReservationTab = "persetujuan" | "riwayat";

/** Decided or finished requests; an approved one leaves the approval queue for history. */
const HISTORY_STATUSES = new Set<ReservationStatus>(["disetujui", "selesai", "ditolak"]);

/** Pending requests for "persetujuan" (soonest first), decided ones for "riwayat" (newest first). */
export function requestsForTab(reservations: ReservationRequest[], tab: ReservationTab): ReservationRequest[] {
  if (tab === "persetujuan") {
    return reservations
      .filter((reservation) => reservation.status === "menunggu_persetujuan")
      .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  }
  return reservations
    .filter((reservation) => HISTORY_STATUSES.has(reservation.status))
    .sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt));
}
