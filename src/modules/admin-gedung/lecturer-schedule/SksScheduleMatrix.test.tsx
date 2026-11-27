// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ADMIN_GEDUNG_NAV } from "../nav";
import type { ReservationRecord } from "@/types/reservation";
import type { ClassSchedule } from "@/types/schedule";
import { SksScheduleMatrix } from "./SksScheduleMatrix";

// 2026-11-26 in WIB: 07:00 WIB = 00:00Z
const wib = (time: string) => `2026-11-26T${String(Number(time.slice(0, 2)) - 7).padStart(2, "0")}:${time.slice(3)}:00.000Z`;

const SCHEDULE: ClassSchedule = {
  id: "sia-1",
  unitName: "H.5.5",
  startsAt: wib("09:30"),
  endsAt: wib("12:00"),
  courseName: "Kecerdasan Buatan",
  lecturerName: "Prof. Dr. Aris Marjuni, M.Kom.",
  classGroup: "A11.4501",
  sksSlot: 4,
  sksCount: 3,
};

const RESERVATION: ReservationRecord = {
  id: "res-1",
  type: "ruangan",
  status: "disetujui",
  startsAt: wib("15:30"),
  endsAt: wib("16:20"),
  bookerName: "HMTI",
  bookerEmail: "hmti@dinus.ac.id",
  unitName: "H.5.1",
  purpose: "Rapat persiapan seminar",
  cancellationReason: null,
  rejectionReason: null,
};

afterEach(cleanup);

describe("SksScheduleMatrix and Admin Gedung nav", () => {
  it("renders all 15 SKS slot columns, empty dashes, lecture/reservation cards, and opens detail on click", () => {
    const onOpen = vi.fn();

    render(
      <SksScheduleMatrix
        rooms={[
          { id: "r1", code: "H.5.1", category: "kelas" },
          { id: "r5", code: "H.5.5", category: "lab" },
        ]}
        dateKey="2026-11-26"
        schedules={[SCHEDULE]}
        reservations={[RESERVATION]}
        activeKey={null}
        onOpen={onOpen}
      />,
    );

    expect(screen.getByText("07.00 - 07.50")).toBeTruthy();
    expect(screen.getByText("12.30 - 13.20")).toBeTruthy();
    expect(screen.getByText("20.10 - 21.00")).toBeTruthy();

    // Each row shows the room type under its code, as in the booking calendar
    expect(screen.getByRole("rowheader", { name: "H.5.1 Kelas" })).toBeTruthy();
    expect(screen.getByRole("rowheader", { name: "H.5.5 Lab" })).toBeTruthy();

    // 3 SKS lecture appears in slots 4, 5, and 6
    const lectureCards = screen.getAllByText("Kecerdasan Buatan");
    expect(lectureCards).toHaveLength(3);
    expect(screen.getAllByText("A11.4501")).toHaveLength(3);

    // Clicking a card triggers the detail popover callback with the timeline scroller container
    fireEvent.click(screen.getByRole("button", { name: /H\.5\.5 slot 4.*Kecerdasan Buatan/ }));
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onOpen.mock.calls[0][0]).toEqual({ kind: "siadin", schedule: SCHEDULE });
    expect((onOpen.mock.calls[0][2] as HTMLElement).hasAttribute("data-timeline-scroller")).toBe(true);

    // Reservation card renders cleanly in slot 10
    fireEvent.click(screen.getByRole("button", { name: /H\.5\.1 slot 10.*HMTI/ }));
    expect(onOpen).toHaveBeenCalledTimes(2);
    expect(onOpen.mock.calls[1][0]).toEqual({ kind: "reservasi", reservation: RESERVATION });
  });

  it("no longer includes Kelola Denah in Admin Gedung navigation", () => {
    const labels = ADMIN_GEDUNG_NAV.flat().map((item) => item.label);
    expect(labels).not.toContain("Kelola Denah");
    expect(labels).toContain("Kelola Jadwal");
    expect(labels).toContain("Laporan Pengguna");
  });
});
