import { sksRangeToTimes } from "@/config/sks";
import type { LecturerSchedule, LecturerScheduleEntry } from "@/types/schedule";

function entry(
  day: LecturerScheduleEntry["day"],
  sksSlot: number,
  sksCount: number,
  roomCode: string,
  courseName: string,
  lecturerName: string,
  classGroup: string,
): LecturerScheduleEntry {
  const range = sksRangeToTimes(sksSlot, sksCount) ?? { startTime: "07:00", endTime: "07:50" };
  return { day, sksSlot, sksCount, ...range, roomCode, courseName, lecturerName, classGroup };
}

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
        entry(1, 1, 3, "H.5.3", "Basis Data", "Dr. Rina Sari, M.Kom.", "A11.4301"),
        entry(2, 7, 3, "H.5.4", "Jaringan Komputer", "Ir. Budi Santoso, M.T.", "A11.4302"),
        entry(3, 7, 3, "H.5.4", "Pemrograman Web", "Dr. Maria Lestari, M.Kom.", "A11.4303"),
        entry(4, 1, 2, "H.5.1", "Proyek Aplikasi Mobile", "Dr. Rina Sari, M.Kom.", "A11.4502"),
        entry(4, 3, 2, "H.5.2", "Pemrograman Sisi Klien", "Dr. Maria Lestari, M.Kom.", "A11.4304"),
        entry(4, 4, 3, "H.5.5", "Kecerdasan Buatan", "Prof. Dr. Aris Marjuni, M.Kom.", "A11.4501"),
        entry(4, 7, 3, "H.5.2", "Sistem Operasi", "Ir. Budi Santoso, M.T.", "A11.4305"),
        entry(4, 10, 2, "H.5.5", "Desain Konten Digital", "Dr. Hendra Gunawan, S.Kom.", "A11.4701"),
        entry(5, 1, 3, "H.7.1", "Algoritma dan Pemrograman", "Dr. Hendra Gunawan, S.Kom.", "A11.4101"),
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
