"use client";

import { useMemo } from "react";
import { mergeOwnHistory } from "@/shared/reservation-store/reservationStore";
import { useMockReservations } from "@/shared/reservation-store/useMockReservations";
import type { ReservationRecord } from "@/types/reservation";
import { ActiveReservationList } from "./ActiveReservationList";
import { buildHistoryResult } from "./historyResult";
import { DEFAULT_HISTORY_QUERY, historyHref, historySearchParams, type HistoryQuery } from "./query";
import { ReservationHistoryTable } from "./ReservationHistoryTable";

export interface ReservationHistoryViewProps {
  query: HistoryQuery;
  records: ReservationRecord[];
  /** ISO 8601 server time */
  now: string;
  /** The borrower whose requests from the demo store join the list; unset for lists that are not their own. */
  ownerId?: string;
  basePath: string;
  showTypeTabs: boolean;
  createHref?: string;
}

/** The list part of the history page. A client component so requests sent in this browser show up too. */
export function ReservationHistoryView({ query, records, now, ownerId, basePath, showTypeTabs, createHref }: ReservationHistoryViewProps) {
  const store = useMockReservations();
  const result = useMemo(() => {
    const all = ownerId ? mergeOwnHistory(records, store, query.tipe, ownerId) : records;
    return buildHistoryResult(all, query, new Date(now));
  }, [records, store, query, ownerId, now]);
  const href = (next: Partial<HistoryQuery>) => historyHref(basePath, { ...query, ...next }, showTypeTabs);

  if (result.view === "aktif") {
    return <ActiveReservationList tipe={query.tipe} today={result.today} upcoming={result.upcoming} createHref={createHref} />;
  }
  return (
    <ReservationHistoryTable
      tipe={query.tipe}
      items={result.items}
      page={result.page}
      perPage={query.perPage}
      totalPages={result.totalPages}
      prevHref={result.page > 1 ? href({ page: result.page - 1 }) : null}
      nextHref={result.page < result.totalPages ? href({ page: result.page + 1 }) : null}
      baseParams={historySearchParams({ ...query, page: 1, perPage: DEFAULT_HISTORY_QUERY.perPage }, showTypeTabs)}
    />
  );
}
