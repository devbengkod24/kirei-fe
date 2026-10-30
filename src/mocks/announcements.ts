import { toWibDateKey } from "@/lib/date";
import type { Announcement } from "@/types/announcement";
import { wibDateTime } from "./time";

export function buildAnnouncementsMock(now: Date): Announcement[] {
  const todayKey = toWibDateKey(now);
  return [
    {
      id: "ann-f-01",
      title: "Reservasi Anda dibatalkan",
      category: "pemberitahuan",
      body: "Halo, reservasi Anda terpaksa kami batalkan karena alasan berikut:",
      quote:
        "H.5.3 akan dipakai untuk keperluan prodi pada pukul 08.00 WIB - selesai. Untuk berjaga-jaga, seluruh reservasi di ruangan tersebut hari ini kami batalkan.",
      authorName: "Tim Operator",
      publishedAt: wibDateTime(todayKey, 0, "07:45"),
    },
    {
      id: "ann-f-02",
      title: "Perbaikan AC lantai 5",
      category: "pemeliharaan",
      body: "AC di seluruh ruang kelas lantai 5 Gedung H diperbaiki hari Sabtu pukul 08.00 - 12.00 WIB. Ruangan tidak bisa dipesan selama perbaikan.",
      authorName: "Adhitya Nugraha S.Kom, M.CS",
      publishedAt: wibDateTime(todayKey, -1, "10:15"),
    },
    {
      id: "ann-f-03",
      title: "Surat peminjaman wajib PDF",
      category: "informasi",
      body: "Mulai bulan ini surat peminjaman hanya diterima dalam format PDF. Unggah surat sebelum tenggat yang tertera di halaman reservasi.",
      authorName: "Adhitya Nugraha S.Kom, M.CS",
      publishedAt: wibDateTime(todayKey, -6, "09:00"),
    },
    {
      id: "ann-f-04",
      title: "Gangguan sistem reservasi",
      category: "pemberitahuan",
      body: "Halaman pemilihan jam sempat tidak bisa diklik pada Senin pagi. Masalah sudah diperbaiki. Reservasi yang gagal bisa dibuat ulang.",
      authorName: "Sistem",
      publishedAt: wibDateTime(todayKey, -12, "07:30"),
    },
  ];
}
