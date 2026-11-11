import type { ReservationRecord } from "@/types/reservation";
import { groupActiveReservations, type HistoryQuery } from "./query";

const ACTIVE_STATUSES = new Set<ReservationRecord["status"]>(["menunggu_persetujuan", "disetujui"]);

export type ReservationHistoryResult =
  | { view: "aktif"; today: ReservationRecord[]; upcoming: ReservationRecord[] }
  | { view: "riwayat"; items: ReservationRecord[]; page: number; totalPages: number };

/**
 * Active reservations grouped by day, or one page of past ones, newest first. Laravel will filter
 * and paginate; until then this imitates it, on the server and again in the browser when the demo
 * store adds the borrower's own requests.
 */
export function buildHistoryResult(records: ReservationRecord[], query: HistoryQuery, now: Date): ReservationHistoryResult {
  const ofType = records.filter((record) => record.type === query.tipe);

  if (query.view === "aktif") {
    return { view: "aktif", ...groupActiveReservations(ofType.filter((record) => ACTIVE_STATUSES.has(record.status)), now) };
  }

  const past = ofType
    // drafts live on their own page until the letter is uploaded
    .filter((record) => !ACTIVE_STATUSES.has(record.status) && record.status !== "draft")
    .sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt));
  const totalPages = Math.max(1, Math.ceil(past.length / query.perPage));
  const page = Math.min(query.page, totalPages);

  return {
    view: "riwayat",
    items: past.slice((page - 1) * query.perPage, page * query.perPage),
    page,
    totalPages,
  };
}
