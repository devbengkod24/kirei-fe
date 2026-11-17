import { connection } from "next/server";
import { getDataMode } from "@/lib/data-mode/getDataMode";
import { buildReservationHistoryMock } from "@/mocks/reservations";
import type { ReservationRecord, ReservationScope, ReservationType } from "@/types/reservation";

export interface HistoryRecords {
  /** Every reservation of this type for the scope, before grouping or paging. */
  records: ReservationRecord[];
  /** ISO 8601 server time, so the browser groups "today" the same way during hydration. */
  now: string;
}

export async function getHistoryRecords(
  tipe: ReservationType,
  // TODO: send as the API filter once the orval client exists ({ mine } -> own reservations, { fakultasId } -> admin list).
  scope: ReservationScope, // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<HistoryRecords> {
  await connection();
  const now = new Date();
  // TODO: replace with the orval client for the reservation list endpoint (no-store). Laravel does the
  // filtering and pagination; buildHistoryResult only imitates it.
  // The "empty" data mode has no sample history; the view adds what was made in the browser.
  const records = (await getDataMode()) === "sample" ? buildReservationHistoryMock(now).filter((record) => record.type === tipe) : [];
  return { records, now: now.toISOString() };
}
