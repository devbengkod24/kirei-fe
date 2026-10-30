import { describe, expect, it } from "vitest";
import type { ReservationRecord } from "@/types/reservation";
import { DEFAULT_HISTORY_QUERY, groupActiveReservations, historyHref, parseHistoryQuery } from "./query";

describe("parseHistoryQuery", () => {
  it("reads every param", () => {
    expect(parseHistoryQuery({ tipe: "gor", tampilan: "riwayat", halaman: "3", per: "25" })).toEqual({
      tipe: "gor",
      view: "riwayat",
      page: 3,
      perPage: 25,
    });
  });

  it("falls back to the defaults for missing or malformed values", () => {
    expect(parseHistoryQuery({})).toEqual(DEFAULT_HISTORY_QUERY);
    expect(parseHistoryQuery({ tipe: "pesawat", tampilan: "semua", halaman: "-1", per: "7" })).toEqual(
      DEFAULT_HISTORY_QUERY,
    );
    expect(parseHistoryQuery({ halaman: "2.5" }).page).toBe(1);
  });

  it("takes the first value of a repeated param", () => {
    expect(parseHistoryQuery({ tipe: ["kendaraan", "gor"] }).tipe).toBe("kendaraan");
  });
});

describe("historyHref", () => {
  const base = "/reservasi/riwayat";

  it("leaves out default values", () => {
    expect(historyHref(base, DEFAULT_HISTORY_QUERY)).toBe(base);
    expect(historyHref(base, { ...DEFAULT_HISTORY_QUERY, tipe: "gor" })).toBe(`${base}?tipe=gor`);
  });

  it("only carries page and page size on the history view", () => {
    expect(historyHref(base, { tipe: "ruangan", view: "aktif", page: 4, perPage: 50 })).toBe(base);
    expect(historyHref(base, { tipe: "ruangan", view: "riwayat", page: 4, perPage: 50 })).toBe(
      `${base}?tampilan=riwayat&halaman=4&per=50`,
    );
  });

  it("can leave the type out when the route already has it", () => {
    expect(historyHref("/admin/gor/riwayat", { ...DEFAULT_HISTORY_QUERY, tipe: "gor", view: "riwayat" }, false)).toBe(
      "/admin/gor/riwayat?tampilan=riwayat",
    );
  });
});

describe("groupActiveReservations", () => {
  const reservation = (id: string, startsAt: string): ReservationRecord => ({
    id,
    type: "kendaraan",
    status: "disetujui",
    startsAt,
    endsAt: startsAt,
    bookerName: "",
    bookerEmail: "",
    unitName: "",
    purpose: "",
    reschedule: null,
    cancellationReason: null,
  });

  // 30 Oct 2026, 10:00 WIB
  const now = new Date("2026-10-30T03:00:00Z");

  it("splits by the WIB calendar day and sorts by start time", () => {
    const { today, upcoming } = groupActiveReservations(
      [
        reservation("tomorrow", "2026-10-31T01:00:00Z"),
        reservation("late-today", "2026-10-30T09:00:00Z"),
        reservation("early-today", "2026-10-30T01:00:00Z"),
        // 30 Oct 23:30 UTC is already 31 Oct in WIB
        reservation("utc-today-wib-tomorrow", "2026-10-30T17:30:00Z"),
      ],
      now,
    );

    expect(today.map((r) => r.id)).toEqual(["early-today", "late-today"]);
    expect(upcoming.map((r) => r.id)).toEqual(["utc-today-wib-tomorrow", "tomorrow"]);
  });

  it("counts a reservation that started on an earlier day as in progress today", () => {
    const { today } = groupActiveReservations([reservation("trip", "2026-10-28T01:00:00Z")], now);
    expect(today.map((r) => r.id)).toEqual(["trip"]);
  });
});
