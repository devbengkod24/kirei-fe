import { describe, expect, it } from "vitest";
import type { Building } from "@/types/facility";
import type { LecturerSchedule } from "@/types/schedule";
import { lecturerScheduleBookings } from "./lecturerScheduleBookings";

const room = (code: string) => ({ id: `room-${code}`, code, category: "kelas" as const, photoUrl: null, capacity: null, x: 0, y: 0, width: 1, height: 1 });

const BUILDINGS: Building[] = [
  { id: "h", name: "Gedung H", fakultasId: "fik", fakultasName: "FIK", floors: [{ id: "h-5", number: 5, planWidth: 10, planHeight: 10, rooms: [room("H.5.1")] }] },
  { id: "e", name: "Gedung E", fakultasId: "feb", fakultasName: "FEB", floors: [{ id: "e-2", number: 2, planWidth: 10, planHeight: 10, rooms: [room("E.2.1")] }] },
];

const schedule = (entries: LecturerSchedule["entries"]): LecturerSchedule => ({
  fakultasId: "fik",
  // 2026-11-02 is a Monday
  semester: { startDate: "2026-11-02", endDate: "2026-11-16" },
  uploadedAt: "2026-11-01T00:00:00.000Z",
  entries,
});

describe("lecturerScheduleBookings", () => {
  it("books the room on that weekday every week of the semester, in WIB", () => {
    const bookings = lecturerScheduleBookings(
      [schedule([{ day: 1, startTime: "08:00", endTime: "10:00", roomCode: "H.5.1", courseName: "Basis Data", lecturerName: "Rina" }])],
      BUILDINGS,
      "2026-10-01",
    );

    expect(bookings.map((booking) => booking.startsAt)).toEqual([
      "2026-11-02T01:00:00.000Z",
      "2026-11-09T01:00:00.000Z",
      "2026-11-16T01:00:00.000Z",
    ]);
    expect(bookings[0]).toMatchObject({ unitId: "room-H.5.1", endsAt: "2026-11-02T03:00:00.000Z", label: "jadwal kuliah Basis Data" });
  });

  it("starts from the given day and skips rooms outside the faculty", () => {
    const bookings = lecturerScheduleBookings(
      [
        schedule([
          { day: 7, startTime: "08:00", endTime: "10:00", roomCode: "H.5.1", courseName: "Seminar", lecturerName: "Rina" },
          { day: 1, startTime: "08:00", endTime: "10:00", roomCode: "E.2.1", courseName: "Akuntansi", lecturerName: "Budi" },
        ]),
      ],
      BUILDINGS,
      "2026-11-09",
    );

    // only Sunday 15 November is left after 9 November; E.2.1 belongs to another faculty
    expect(bookings.map((booking) => booking.startsAt)).toEqual(["2026-11-15T01:00:00.000Z"]);
  });
});
