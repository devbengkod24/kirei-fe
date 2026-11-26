// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { FloorPlanRoom, UnitBooking } from "@/types/facility";
import type { RoomStatus } from "./availability";
import { RoomBookingCalendar } from "./RoomBookingCalendar";

// 2026-11-26 in WIB: 07:00 WIB = 00:00Z
const wib = (time: string) => `2026-11-26T${String(Number(time.slice(0, 2)) - 7).padStart(2, "0")}:${time.slice(3)}:00.000Z`;

const ROOMS: FloorPlanRoom[] = [
  { id: "room-h-5-1", code: "H.5.1", category: "kelas", photoUrl: null, capacity: 40, x: 0, y: 0, width: 1, height: 1 },
  { id: "room-h-5-5", code: "H.5.5", category: "kelas", photoUrl: null, capacity: 40, x: 0, y: 0, width: 1, height: 1 },
];

const BOOKINGS: UnitBooking[] = [
  { unitId: "room-h-5-5", startsAt: wib("09:30"), endsAt: wib("12:00"), label: "jadwal kuliah Kecerdasan Buatan" },
];

const STATUSES = new Map<string, { status: RoomStatus; selectable: boolean }>([
  ["room-h-5-1", { status: "available", selectable: true }],
  ["room-h-5-5", { status: "available", selectable: true }],
]);

afterEach(cleanup);

describe("RoomBookingCalendar", () => {
  it("renders 15 SKS columns with sticky non-overlapping room headers and lets users pick SKS slots", () => {
    const onSelectRoom = vi.fn();
    const onPickGap = vi.fn();
    const onInspect = vi.fn();

    render(
      <RoomBookingCalendar
        rooms={ROOMS}
        bookings={BOOKINGS}
        dateKey="2026-11-26"
        startTime="15:30"
        endTime="17:10"
        statuses={STATUSES}
        selectedRoomId=""
        onSelectRoom={onSelectRoom}
        onPickGap={onPickGap}
        onInspect={onInspect}
      />,
    );

    const table = screen.getByRole("table");
    expect(table.className).toContain("border-separate");
    expect(screen.getByText("07.00 - 07.50")).toBeTruthy();
    expect(screen.getByText("12.30 - 13.20")).toBeTruthy();
    expect(screen.getByText("20.10 - 21.00")).toBeTruthy();
    expect(screen.queryByText("Denah")).toBeNull();

    // Sticky left room row header uses z-20 so cards never paint on top of the room code
    const h51Header = screen.getByRole("rowheader", { name: /H\.5\.1/ });
    expect(h51Header.className).toContain("sticky");
    expect(h51Header.className).toContain("left-0");
    expect(h51Header.className).toContain("z-20");

    // Clicking a free SKS slot selects the room + slot range
    fireEvent.click(screen.getByRole("button", { name: /Pilih H\.5\.1 slot 1 \(07\.00 - 07\.50 WIB\)/ }));
    expect(onPickGap).toHaveBeenCalledWith(ROOMS[0], "07:00", "07:50");

    // Clicking a booked lecture slot opens inspection
    fireEvent.click(screen.getByRole("button", { name: /H\.5\.5 slot 4 \(09\.30 - 10\.20 WIB\) terpakai/ }));
    expect(onInspect).toHaveBeenCalledWith(ROOMS[1]);
  });
});
