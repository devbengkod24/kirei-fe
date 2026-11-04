import type { LecturerSchedule } from "@/types/schedule";

// One schedule per faculty, kept in server memory so an upload shows up in the reservation form
// until the dev server restarts. The sample covers the odd semester of 2026/2027.
const schedules = new Map<string, LecturerSchedule>([
  [
    "fik",
    {
      fakultasId: "fik",
      semester: { startDate: "2026-09-01", endDate: "2027-01-31" },
      uploadedAt: "2026-08-25T03:00:00.000Z",
      entries: [
        { day: 1, startTime: "07:00", endTime: "09:30", roomCode: "H.5.3", courseName: "Basis Data", lecturerName: "Dr. Rina Sari, M.Kom." },
        { day: 2, startTime: "13:00", endTime: "15:30", roomCode: "H.5.4", courseName: "Jaringan Komputer", lecturerName: "Ir. Budi Santoso, M.T." },
        { day: 3, startTime: "13:00", endTime: "15:30", roomCode: "H.5.4", courseName: "Pemrograman Web", lecturerName: "Dr. Maria Lestari, M.Kom." },
        { day: 4, startTime: "09:30", endTime: "12:00", roomCode: "H.5.5", courseName: "Kecerdasan Buatan", lecturerName: "Prof. Dr. Aris Marjuni, M.Kom." },
        { day: 5, startTime: "07:00", endTime: "09:30", roomCode: "H.7.1", courseName: "Algoritma dan Pemrograman", lecturerName: "Dr. Hendra Gunawan, S.Kom." },
      ],
    },
  ],
]);

export function getMockLecturerSchedules(): LecturerSchedule[] {
  return [...schedules.values()];
}

export function getMockLecturerSchedule(fakultasId: string): LecturerSchedule | null {
  return schedules.get(fakultasId) ?? null;
}

/** Replaces the faculty's schedule, as a new upload does. */
export function setMockLecturerSchedule(schedule: LecturerSchedule) {
  schedules.set(schedule.fakultasId, schedule);
}
