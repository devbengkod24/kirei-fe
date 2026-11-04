import { describe, expect, it } from "vitest";
import type { ReservationRecord } from "@/types/reservation";
import type { ClassSchedule } from "@/types/schedule";
import { isAnchorVisible, placePopover, timelineDetail } from "./timelineDetail";

const RESERVATION: ReservationRecord = {
  id: "res-1",
  type: "ruangan",
  status: "disetujui",
  // 4 Nov 2026, 09.00 - 12.00 WIB
  startsAt: "2026-11-04T02:00:00.000Z",
  endsAt: "2026-11-04T05:00:00.000Z",
  bookerName: "Budiono Siregar",
  bookerEmail: "budiono@dinus.ac.id",
  unitName: "H.5.3",
  purpose: "Butuh kelas untuk mengajar",
  reschedule: null,
  cancellationReason: null,
};

const SCHEDULE: ClassSchedule = {
  id: "sia-1",
  unitName: "H.5.1",
  startsAt: "2026-11-04T00:30:00.000Z",
  endsAt: "2026-11-04T01:30:00.000Z",
  courseName: "Pemrograman Web",
  lecturerName: "Ir. Budi Santoso, M.T.",
};

describe("timelineDetail", () => {
  it("lists a reservation's booker, purpose, room, date, time, and status", () => {
    const detail = timelineDetail({ kind: "reservasi", reservation: RESERVATION });
    expect(detail.title).toBe("Detail Reservasi");
    expect(detail.subtitle).toBe("H.5.3 · Rabu, 4 November 2026");
    expect(detail.rows.map((row) => row.label)).toEqual(["Pemesan", "Keperluan", "Ruangan", "Tanggal", "Waktu", "Status"]);
    expect(detail.rows.find((row) => row.label === "Status")?.value).toBe("Disetujui");
  });

  it("lists a Siadin class with its lecturer and source", () => {
    const detail = timelineDetail({ kind: "siadin", schedule: SCHEDULE });
    expect(detail.title).toBe("Jadwal Siadin");
    expect(detail.rows).toEqual([
      { label: "Mata kuliah", value: "Pemrograman Web" },
      { label: "Dosen", value: "Ir. Budi Santoso, M.T." },
      { label: "Ruangan", value: "H.5.1" },
      { label: "Tanggal", value: "Rabu, 4 November 2026" },
      { label: "Waktu", value: detail.rows[4].value },
      { label: "Sumber", value: "Siadin" },
    ]);
    expect(detail.rows[4].value).toMatch(/^07\.30/);
  });
});

describe("placePopover", () => {
  const popover = { width: 300, height: 260 };
  const viewport = { width: 1200, height: 800 };

  it("opens to the right of the clip when it fits", () => {
    expect(placePopover({ left: 100, top: 200, width: 150, height: 60 }, popover, viewport)).toEqual({ left: 258, top: 200, side: "right" });
  });

  it("moves to the left when the right side has no room", () => {
    expect(placePopover({ left: 800, top: 200, width: 200, height: 60 }, popover, viewport)).toEqual({ left: 492, top: 200, side: "left" });
  });

  it("stays inside the viewport vertically", () => {
    expect(placePopover({ left: 100, top: 700, width: 150, height: 60 }, popover, viewport).top).toBe(528);
    expect(placePopover({ left: 100, top: -40, width: 150, height: 60 }, popover, viewport).top).toBe(12);
  });

  it("hugs the side with more room when neither fits", () => {
    const wide = { left: 100, top: 200, width: 900, height: 60 };
    expect(placePopover(wide, popover, viewport)).toEqual({ left: 888, top: 200, side: "right" });
  });
});

describe("isAnchorVisible", () => {
  const container = { left: 100, top: 100, width: 500, height: 300 };

  it("is true while part of the clip shows and false once it scrolls away", () => {
    expect(isAnchorVisible({ left: 550, top: 150, width: 100, height: 60 }, container)).toBe(true);
    expect(isAnchorVisible({ left: 620, top: 150, width: 100, height: 60 }, container)).toBe(false);
    expect(isAnchorVisible({ left: 0, top: 150, width: 90, height: 60 }, container)).toBe(false);
  });
});
