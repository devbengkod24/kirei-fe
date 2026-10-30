import { describe, expect, it } from "vitest";
import type { UnitBooking } from "@/types/facility";
import { buildSlots, slotStatus, toggleSlot, upcomingDays, type SlotStatus } from "./sportsHallSlots";

describe("buildSlots", () => {
  it("splits opening hours into fixed slots", () => {
    const slots = buildSlots("08:00", "22:00", 60);
    expect(slots).toHaveLength(14);
    expect(slots[0]).toEqual({ start: "08:00", end: "09:00" });
    expect(slots.at(-1)).toEqual({ start: "21:00", end: "22:00" });
  });

  it("drops a last slot that would run past closing", () => {
    expect(buildSlots("08:00", "10:30", 60).map((slot) => slot.start)).toEqual(["08:00", "09:00"]);
    expect(buildSlots("08:00", "09:30", 30)).toHaveLength(3);
  });
});

describe("slotStatus", () => {
  // 30 Oct 2026, 10:30 WIB
  const now = new Date("2026-10-30T03:30:00Z");
  // GOR taken 16:00-18:00 WIB on 30 Oct
  const bookings: UnitBooking[] = [{ unitId: "gor", startsAt: "2026-10-30T09:00:00Z", endsAt: "2026-10-30T11:00:00Z" }];

  it("marks slots that started already as past", () => {
    expect(slotStatus("2026-10-30", { start: "10:00", end: "11:00" }, bookings, now)).toBe("past");
    expect(slotStatus("2026-10-30", { start: "11:00", end: "12:00" }, bookings, now)).toBe("available");
  });

  it("marks slots overlapping a booking, but not the ones touching it", () => {
    expect(slotStatus("2026-10-30", { start: "16:00", end: "17:00" }, bookings, now)).toBe("booked");
    expect(slotStatus("2026-10-30", { start: "17:00", end: "18:00" }, bookings, now)).toBe("booked");
    expect(slotStatus("2026-10-30", { start: "15:00", end: "16:00" }, bookings, now)).toBe("available");
    expect(slotStatus("2026-10-30", { start: "18:00", end: "19:00" }, bookings, now)).toBe("available");
  });

  it("only applies bookings to their own day", () => {
    expect(slotStatus("2026-10-31", { start: "16:00", end: "17:00" }, bookings, now)).toBe("available");
  });
});

describe("toggleSlot", () => {
  //               0            1            2           3            4
  const statuses: SlotStatus[] = ["available", "available", "booked", "available", "available"];

  it("starts a selection on a free slot and ignores taken ones", () => {
    expect(toggleSlot(null, 1, statuses)).toEqual({ from: 1, to: 1 });
    expect(toggleSlot(null, 2, statuses)).toBeNull();
    expect(toggleSlot({ from: 3, to: 3 }, 2, statuses)).toEqual({ from: 3, to: 3 });
  });

  it("extends with a neighbouring slot and shrinks from either end", () => {
    expect(toggleSlot({ from: 3, to: 3 }, 4, statuses)).toEqual({ from: 3, to: 4 });
    expect(toggleSlot({ from: 0, to: 0 }, 1, statuses)).toEqual({ from: 0, to: 1 });
    expect(toggleSlot({ from: 3, to: 4 }, 3, statuses)).toEqual({ from: 4, to: 4 });
    expect(toggleSlot({ from: 3, to: 4 }, 4, statuses)).toEqual({ from: 3, to: 3 });
  });

  it("clears a single selected slot and restarts elsewhere instead of jumping a gap", () => {
    expect(toggleSlot({ from: 1, to: 1 }, 1, statuses)).toBeNull();
    // 0 and 3 are not adjacent, so the selection does not cross the booked slot 2
    expect(toggleSlot({ from: 0, to: 1 }, 3, statuses)).toEqual({ from: 3, to: 3 });
  });
});

describe("upcomingDays", () => {
  it("lists consecutive days across a month end with Indonesian weekday names", () => {
    const days = upcomingDays("2026-10-30", 3);
    expect(days.map((day) => day.dateKey)).toEqual(["2026-10-30", "2026-10-31", "2026-11-01"]);
    expect(days.map((day) => day.day)).toEqual([30, 31, 1]);
    expect(days[0].weekday).toBe("Jum");
  });
});
