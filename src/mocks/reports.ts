import { toWibDateKey } from "@/lib/date";
import type { ReportCategory, UserReport } from "@/types/report";
import { wibDateTime } from "./time";

const ROWS: { days: number; time: string; category: ReportCategory; body: string; roomCode: string | null; authorName: string }[] = [
  { days: 0, time: "08:15", category: "kesalahan_sistem", body: "Ada bug untuk reservasi tidak bisa diklik jam nya", roomCode: null, authorName: "Juan Stevenson" },
  { days: 0, time: "07:20", category: "kerusakan_alat", body: "Proyektor mati di H.5.6", roomCode: "H.5.6", authorName: "Erdin Purwa Putra" },
  { days: -1, time: "15:05", category: "kerusakan_alat", body: "AC di H.5.2 tidak dingin sejak pagi", roomCode: "H.5.2", authorName: "Dr. Maria Lestari, M.Pd." },
  { days: -2, time: "09:10", category: "kesalahan_sistem", body: "Kode QR tiket tidak muncul setelah reservasi disetujui", roomCode: null, authorName: "Mochamad Farhan Abdullah" },
  { days: -4, time: "16:30", category: "lainnya", body: "Kunci lemari kabel di H.7 hilang", roomCode: "H.7", authorName: "Juan Stevenson" },
  { days: -9, time: "10:00", category: "kerusakan_alat", body: "Dua kursi di H.5.4 patah", roomCode: "H.5.4", authorName: "Dr. Siti Nurhaliza, M.A." },
  { days: -20, time: "08:40", category: "kesalahan_sistem", body: "Unggah surat peminjaman gagal untuk berkas di atas 2 MB", roomCode: null, authorName: "Erdin Purwa Putra" },
];

export function buildReportsMock(now: Date): UserReport[] {
  const todayKey = toWibDateKey(now);
  return ROWS.map((row, index) => ({
    id: `rep-${index + 1}`,
    category: row.category,
    body: row.body,
    roomCode: row.roomCode,
    authorName: row.authorName,
    createdAt: wibDateTime(todayKey, row.days, row.time),
  }));
}
