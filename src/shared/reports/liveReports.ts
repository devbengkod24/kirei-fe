"use client";

import { useMemo } from "react";
import { useLiveData } from "@/hooks/useLiveData";
import { readLive, writeLive } from "@/lib/data-mode/liveStorage";
import { LIVE_NAMES, reportsSchema } from "@/shared/live-data/liveSchemas";
import type { UserReport } from "@/types/report";

/** Keeps a borrower's report in this browser ("empty" data mode), newest first. Returns false when it could not be stored. */
export function addLiveReport(report: Omit<UserReport, "id" | "createdAt">, now: Date = new Date()): boolean {
  const stored = readLive(LIVE_NAMES.reports, reportsSchema) ?? [];
  const created: UserReport = { ...report, id: `rep-${now.getTime().toString(36)}`, createdAt: now.toISOString() };
  return writeLive(LIVE_NAMES.reports, [created, ...stored]);
}

/** The server's reports plus the ones sent in this browser in the "empty" data mode. */
export function useLiveReports(reports: UserReport[]): UserReport[] {
  const { value } = useLiveData(LIVE_NAMES.reports, reportsSchema);
  return useMemo(() => (value ? [...value, ...reports] : reports), [value, reports]);
}
