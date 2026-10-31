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
