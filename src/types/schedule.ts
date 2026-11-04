// TODO: match this shape to the Laravel OpenAPI spec once the Siadin schedule endpoint exists.

/** A class meeting taken from Siadin (academic system). Read-only in KIREI; it blocks the room like a reservation does. */
export interface ClassSchedule {
  id: string;
  /** Room code, e.g. "H.5.1" */
  unitName: string;
  /** ISO 8601 (UTC) */
  startsAt: string;
  /** ISO 8601 (UTC) */
  endsAt: string;
  courseName: string;
  lecturerName: string;
}

/** ISO weekday: 1 is Senin, 7 is Minggu. */
export type Weekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** One weekly lecture from the schedule CSV an admin fakultas uploads. */
export interface LecturerScheduleEntry {
  day: Weekday;
  /** WIB wall-clock "HH:mm" */
  startTime: string;
  endTime: string;
  /** Room code, e.g. "H.5.1" */
  roomCode: string;
  courseName: string;
  lecturerName: string;
}

/** A faculty's weekly lecture schedule. Every entry blocks its room each week of the semester. */
export interface LecturerSchedule {
  fakultasId: string;
  /** "YYYY-MM-DD" in WIB, both days included */
  semester: { startDate: string; endDate: string };
  entries: LecturerScheduleEntry[];
  /** ISO 8601 (UTC) */
  uploadedAt: string;
}
