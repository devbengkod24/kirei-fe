import { describe, expect, it } from "vitest";
import type { UserReport } from "@/types/report";
import { DEFAULT_REPORT_FILTER, filterReports } from "./filterReports";

const report = (id: string, createdAt: string, extra: Partial<UserReport> = {}): UserReport => ({
  id,
  createdAt,
  category: "kesalahan_sistem",
  body: "",
  roomCode: null,
  authorName: "",
  ...extra,
});

describe("filterReports", () => {
  const now = "2026-10-30T05:00:00Z";
  const reports = [
    report("today", "2026-10-30T03:00:00Z", { category: "kerusakan_alat", roomCode: "H.5.6" }),
    report("older", "2026-10-12T03:00:00Z"),
    report("last-month", "2026-09-20T03:00:00Z", { category: "lainnya", roomCode: "H.7" }),
  ];
  const ids = (list: UserReport[]) => list.map((item) => item.id);

  it("sorts newest first by default and can flip", () => {
    expect(ids(filterReports(reports, DEFAULT_REPORT_FILTER, now))).toEqual(["today", "older", "last-month"]);
    expect(ids(filterReports(reports, { ...DEFAULT_REPORT_FILTER, sort: "terlama" }, now))).toEqual([
      "last-month",
      "older",
      "today",
    ]);
  });

  it("combines period, category and room filters", () => {
    expect(ids(filterReports(reports, { ...DEFAULT_REPORT_FILTER, period: "bulan_ini" }, now))).toEqual(["today", "older"]);
    expect(ids(filterReports(reports, { ...DEFAULT_REPORT_FILTER, categories: ["lainnya"] }, now))).toEqual(["last-month"]);
    expect(ids(filterReports(reports, { ...DEFAULT_REPORT_FILTER, room: " h.5 " }, now))).toEqual(["today"]);
  });
});
