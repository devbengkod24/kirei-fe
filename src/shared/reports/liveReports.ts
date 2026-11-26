"use client";

import { useMemo } from "react";
import { useLiveData } from "@/hooks/useLiveData";
import { readLive, writeLive } from "@/lib/data-mode/liveStorage";
import { LIVE_NAMES, reportsSchema } from "@/shared/live-data/liveSchemas";
import type { UserReport } from "@/types/report";

/** Keeps a user/QR report in this browser, newest first. Returns false when storage fails. */
export function addLiveReport(report: Omit<UserReport, "id" | "createdAt">, now: Date = new Date()): boolean {
  const stored = readLive(LIVE_NAMES.reports, reportsSchema) ?? [];
  const created: UserReport = { ...report, id: `rep-${now.getTime().toString(36)}`, createdAt: now.toISOString() };
  return writeLive(LIVE_NAMES.reports, [created, ...stored]);
}

/** Merges server reports with browser-submitted reports (including public QR reports), deduplicated by id. */
export function useLiveReports(reports: UserReport[]): UserReport[] {
  const { value } = useLiveData(LIVE_NAMES.reports, reportsSchema);
  return useMemo(() => {
    if (!value || value.length === 0) return reports;
    const seen = new Set(value.map((item) => item.id));
    return [...value, ...reports.filter((item) => !seen.has(item.id))];
  }, [value, reports]);
}
