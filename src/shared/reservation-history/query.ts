import { toWibDateKey } from "@/lib/date";
import { RESERVATION_TYPES, type ReservationRecord, type ReservationType } from "@/types/reservation";

export type HistoryView = "aktif" | "riwayat";

export const PER_PAGE_OPTIONS = [10, 25, 50] as const;

export interface HistoryQuery {
  tipe: ReservationType;
  view: HistoryView;
  page: number;
  perPage: number;
}

export const DEFAULT_HISTORY_QUERY: HistoryQuery = { tipe: "ruangan", view: "aktif", page: 1, perPage: 10 };

/** Search param names, in Indonesian because they show up in the URL. */
export const HISTORY_PARAMS = { tipe: "tipe", view: "tampilan", page: "halaman", perPage: "per" } as const;

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

/** Reads the URL into a query. Unknown or malformed values fall back to the defaults. */
export function parseHistoryQuery(searchParams: SearchParams): HistoryQuery {
  const tipe = first(searchParams[HISTORY_PARAMS.tipe]);
  const view = first(searchParams[HISTORY_PARAMS.view]);
  const page = Number(first(searchParams[HISTORY_PARAMS.page]));
  const perPage = Number(first(searchParams[HISTORY_PARAMS.perPage]));

  return {
    tipe: RESERVATION_TYPES.includes(tipe as ReservationType) ? (tipe as ReservationType) : DEFAULT_HISTORY_QUERY.tipe,
    view: view === "riwayat" ? "riwayat" : "aktif",
    page: Number.isInteger(page) && page >= 1 ? page : DEFAULT_HISTORY_QUERY.page,
    perPage: (PER_PAGE_OPTIONS as readonly number[]).includes(perPage) ? perPage : DEFAULT_HISTORY_QUERY.perPage,
  };
}

/**
 * Search params for a query, leaving out values equal to the defaults so URLs stay short.
 * `withType: false` is for routes where the type is already in the path.
 */
export function historySearchParams(query: HistoryQuery, withType = true): Record<string, string> {
  const params: Record<string, string> = {};
  if (withType && query.tipe !== DEFAULT_HISTORY_QUERY.tipe) params[HISTORY_PARAMS.tipe] = query.tipe;
  if (query.view !== DEFAULT_HISTORY_QUERY.view) params[HISTORY_PARAMS.view] = query.view;
  if (query.view === "riwayat") {
    if (query.page !== DEFAULT_HISTORY_QUERY.page) params[HISTORY_PARAMS.page] = String(query.page);
    if (query.perPage !== DEFAULT_HISTORY_QUERY.perPage) params[HISTORY_PARAMS.perPage] = String(query.perPage);
  }
  return params;
}

export function historyHref(basePath: string, query: HistoryQuery, withType = true): string {
  const search = new URLSearchParams(historySearchParams(query, withType)).toString();
  return search ? `${basePath}?${search}` : basePath;
}

/**
 * Splits active reservations for display. A reservation that started on an earlier day and is
 * still active (e.g. a multi-day vehicle trip) counts as today, since it is in progress.
 */
export function groupActiveReservations(records: ReservationRecord[], now: Date) {
  const todayKey = toWibDateKey(now);
  const sorted = [...records].sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));

  return {
    today: sorted.filter((record) => toWibDateKey(record.startsAt) <= todayKey),
    upcoming: sorted.filter((record) => toWibDateKey(record.startsAt) > todayKey),
  };
}
