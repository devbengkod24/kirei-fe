import { describe, expect, it } from "vitest";
import type { ReservationRecord } from "@/types/reservation";
import { defaultHourFilter, filterSlots, slotReservation } from "./slots";

const reservation = (unitName: string, startsAt: string, endsAt: string) =>
  ({ id: unitName, unitName, startsAt, endsAt }) as ReservationRecord;

describe("filterSlots", () => {
  it("splits the filtered hours into 10-minute slots", () => {
    const slots = filterSlots("07:00", "08:00");
    expect(slots).toHaveLength(6);
    expect(slots[0]).toEqual({ start: "07:00", end: "07:10" });
    expect(slots[5]).toEqual({ start: "07:50", end: "08:00" });
  });

  it("returns nothing for an empty or reversed range", () => {
    expect(filterSlots("09:00", "09:00")).toEqual([]);
    expect(filterSlots("10:00", "08:00")).toEqual([]);
  });
});

describe("slotReservation", () => {
  // 08:40 - 10:20 WIB
  const booked = reservation("H.5.1", "2026-10-31T01:40:00.000Z", "2026-10-31T03:20:00.000Z");

  it("finds the reservation of the same room that overlaps the slot", () => {
    expect(slotReservation("2026-10-31", { start: "08:40", end: "08:50" }, "H.5.1", [booked])).toBe(booked);
    expect(slotReservation("2026-10-31", { start: "10:10", end: "10:20" }, "H.5.1", [booked])).toBe(booked);
  });

  it("treats touching ranges and other rooms as free", () => {
    expect(slotReservation("2026-10-31", { start: "08:30", end: "08:40" }, "H.5.1", [booked])).toBeNull();
    expect(slotReservation("2026-10-31", { start: "10:20", end: "10:30" }, "H.5.1", [booked])).toBeNull();
    expect(slotReservation("2026-10-31", { start: "09:00", end: "09:10" }, "H.5.2", [booked])).toBeNull();
  });
});

describe("defaultHourFilter", () => {
  it("starts at the current WIB hour", () => {
    expect(defaultHourFilter(new Date("2026-10-31T02:25:00Z"))).toEqual({ from: "09:00", to: "11:00" });
  });

  it("stays inside opening hours early and late in the day", () => {
    expect(defaultHourFilter(new Date("2026-10-30T22:00:00Z"))).toEqual({ from: "07:00", to: "09:00" });
    expect(defaultHourFilter(new Date("2026-10-31T14:30:00Z"))).toEqual({ from: "19:00", to: "21:00" });
  });
});
