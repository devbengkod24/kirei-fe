import { describe, expect, it } from "vitest";
import type { Announcement } from "@/types/announcement";
import { DEFAULT_ANNOUNCEMENT_FILTER, filterAnnouncements } from "./filterAnnouncements";

const announcement = (id: string, publishedAt: string, extra: Partial<Announcement> = {}): Announcement => ({
  id,
  publishedAt,
  title: "",
  body: "",
  category: "informasi",
  authorName: "Tim Operator",
  ...extra,
});

describe("filterAnnouncements", () => {
  const now = "2026-10-30T05:00:00Z";
  const list = [
    announcement("a", "2026-10-30T02:00:00Z", { category: "pemberitahuan" }),
    announcement("b", "2026-10-28T02:00:00Z", { authorName: "Sistem" }),
    announcement("c", "2026-10-01T02:00:00Z", { category: "pemeliharaan" }),
  ];
  const ids = (items: Announcement[]) => items.map((item) => item.id);

  it("returns everything newest first by default", () => {
    expect(ids(filterAnnouncements(list, DEFAULT_ANNOUNCEMENT_FILTER, now))).toEqual(["a", "b", "c"]);
  });

  it("filters by week, category and author", () => {
    expect(ids(filterAnnouncements(list, { ...DEFAULT_ANNOUNCEMENT_FILTER, period: "minggu_ini" }, now))).toEqual(["a", "b"]);
    expect(ids(filterAnnouncements(list, { ...DEFAULT_ANNOUNCEMENT_FILTER, categories: ["pemeliharaan"] }, now))).toEqual(["c"]);
    expect(ids(filterAnnouncements(list, { ...DEFAULT_ANNOUNCEMENT_FILTER, authors: ["Sistem"], sort: "terlama" }, now))).toEqual([
      "b",
    ]);
  });
});

describe("filterAnnouncements ordering", () => {
  it("compares instants, not strings with different offsets", () => {
    const list = [
      announcement("wib", "2026-10-30T08:00:00+07:00"),
      announcement("utc", "2026-10-30T02:00:00Z"),
    ];
    // 08:00 WIB is 01:00 UTC, so the UTC one is newer
    expect(filterAnnouncements(list, DEFAULT_ANNOUNCEMENT_FILTER, "2026-10-30T05:00:00Z").map((item) => item.id)).toEqual([
      "utc",
      "wib",
    ]);
  });
});
