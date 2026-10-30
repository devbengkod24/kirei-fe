import { connection } from "next/server";
import { buildReservationHistoryMock } from "@/mocks/reservations";
import type { ReservationRecord, ReservationScope } from "@/types/reservation";
import { groupActiveReservations, type HistoryQuery } from "./query";

const ACTIVE_STATUSES = new Set<ReservationRecord["status"]>(["menunggu_konfirmasi", "disetujui"]);

export type ReservationHistoryResult =
  | { view: "aktif"; today: ReservationRecord[]; upcoming: ReservationRecord[] }
  | { view: "riwayat"; items: ReservationRecord[]; page: number; totalPages: number };

export async function getReservationHistory(
  query: HistoryQuery,
  // TODO: send as the API filter once the orval client exists ({ mine } -> own reservations, { fakultasId } -> admin list).
  scope: ReservationScope, // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<ReservationHistoryResult> {
  await connection();
  const now = new Date();
  // TODO: replace with the orval client for the reservation list endpoint (no-store). Laravel does the
  // filtering and pagination; the mock below only imitates it.
  const ofType = buildReservationHistoryMock(now).filter((record) => record.type === query.tipe);

  if (query.view === "aktif") {
    return { view: "aktif", ...groupActiveReservations(ofType.filter((r) => ACTIVE_STATUSES.has(r.status)), now) };
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
