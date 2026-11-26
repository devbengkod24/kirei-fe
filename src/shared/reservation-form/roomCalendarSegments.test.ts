import { describe, expect, it } from "vitest";
import type { UnitBooking } from "@/types/facility";
import { buildRoomSksCells, pickSksSlotRange, slotInChosenRange } from "./roomCalendarSegments";

// 2026-11-26 in WIB: 07:00 WIB = 00:00Z
const wib = (time: string) => `2026-11-26T${String(Number(time.slice(0, 2)) - 7).padStart(2, "0")}:${time.slice(3)}:00.000Z`;

describe("buildRoomSksCells", () => {
  it("maps lecture schedules and reservations onto the 15 SKS slots", () => {
    const bookings: UnitBooking[] = [
      { unitId: "room-H.5.5", startsAt: wib("09:30"), endsAt: wib("12:00"), label: "jadwal kuliah Kecerdasan Buatan" },
      { unitId: "room-H.5.5", startsAt: wib("15:30"), endsAt: wib("17:10") },
      { unitId: "room-H.5.2", startsAt: wib("07:00"), endsAt: wib("08:40") },
    ];

    const cells = buildRoomSksCells("room-H.5.5", bookings, "2026-11-26");
    expect(cells).toHaveLength(15);
    expect(cells[2].booking).toBeNull();
    expect(cells[3].booking).toMatchObject({ isLecture: true, label: "jadwal kuliah Kecerdasan Buatan" });
    expect(cells[4].booking).toMatchObject({ isLecture: true });
    expect(cells[5].booking).toMatchObject({ isLecture: true });
    expect(cells[6].booking).toBeNull();
    expect(cells[9].booking).toMatchObject({ isLecture: false });
    expect(cells[10].booking).toMatchObject({ isLecture: false });
    expect(cells[11].booking).toBeNull();
  });
});

describe("pickSksSlotRange", () => {
  const bookings: UnitBooking[] = [
    { unitId: "room-H.5.1", startsAt: wib("09:30"), endsAt: wib("10:20"), label: "jadwal kuliah Basis Data" },
  ];
  const cells = buildRoomSksCells("room-H.5.1", bookings, "2026-11-26");

  it("picks a single SKS slot when switching rooms", () => {
    expect(pickSksSlotRange(cells, 0, false, "15:30", "17:10")).toEqual({
      startTime: "07:00",
      endTime: "07:50",
    });
  });

  it("extends across contiguous free SKS slots on the same room and resets when blocked", () => {
    // Extend slot 1 (07:00-07:50) to slot 3 (08:40-09:30): all free
    expect(pickSksSlotRange(cells, 2, true, "07:00", "07:50")).toEqual({
      startTime: "07:00",
      endTime: "09:30",
    });
    // Slot 4 (index 3, 09:30-10:20) is booked, so clicking slot 5 (index 4, 10:20-11:10) resets to slot 5
    expect(pickSksSlotRange(cells, 4, true, "07:00", "09:30")).toEqual({
      startTime: "10:20",
      endTime: "11:10",
    });
  });

  it("detects slots overlapping a chosen time range", () => {
    expect(slotInChosenRange(cells[0].slot, "07:00", "08:40")).toBe(true);
    expect(slotInChosenRange(cells[1].slot, "07:00", "08:40")).toBe(true);
    expect(slotInChosenRange(cells[2].slot, "07:00", "08:40")).toBe(false);
  });
});
