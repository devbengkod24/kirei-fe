export type ReportCategory = "kesalahan_sistem" | "kerusakan_alat" | "lainnya";

export type ReporterType = "staf" | "mahasiswa";

/** A problem report sent by a borrower or public QR reporter to the admin. */
export interface UserReport {
  id: string;
  category: ReportCategory;
  body: string;
  /** Room the report is about, if any (e.g. "H.5.6"). */
  roomCode: string | null;
  authorName: string;
  reporterType?: ReporterType;
  photoUrl?: string | null;
  /** ISO 8601 (UTC) */
  createdAt: string;
}
