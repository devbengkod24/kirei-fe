import { toWibDateKey } from "@/lib/date";
import type { ReservationRequest, ReservationStatus } from "@/types/reservation";
import { wibDateTime } from "./time";

interface Row {
  days: number;
  start: string;
  end: string;
  borrowerName: string;
  borrowerDetail: string;
  roomName: string;
  purpose: string;
  status: ReservationStatus;
}

// Names and purposes are the sample rows from the Figma V3 mockup.
const ROWS: Row[] = [
  { days: 1, start: "08:00", end: "10:00", borrowerName: "Prof. Dr. Aris Marjuni, S.Si., M.Kom.", borrowerDetail: "Dosen • NPP: 19750312", roomName: "H.5.1", purpose: "Belajar mandiri", status: "menunggu_konfirmasi" },
  { days: 1, start: "10:30", end: "12:30", borrowerName: "Dr. Maria Lestari, M.Pd.", borrowerDetail: "Dosen • NPP: 19800521", roomName: "H.5.2", purpose: "Diskusi kelompok", status: "menunggu_konfirmasi" },
  { days: 2, start: "13:00", end: "15:00", borrowerName: "Ir. Budi Santoso, M.T.", borrowerDetail: "Dosen • NPP: 19781109", roomName: "H.5.3", purpose: "Praktikum", status: "menunggu_konfirmasi" },
  { days: 3, start: "15:30", end: "17:30", borrowerName: "Dr. Siti Nurhaliza, M.A.", borrowerDetail: "Dosen • NPP: 19850217", roomName: "H.5.4", purpose: "Presentasi proyek", status: "menunggu_konfirmasi" },
  { days: 3, start: "10:20", end: "12:00", borrowerName: "Dian Nuswantoro Computer Club", borrowerDetail: "Ormawa tingkat universitas", roomName: "H.7", purpose: "Rapat kerja", status: "menunggu_konfirmasi" },
  { days: 4, start: "09:00", end: "11:00", borrowerName: "Dr. Hendra Gunawan, S.Kom", borrowerDetail: "Dosen Pembimbing BEM • NPP: 19820411", roomName: "H.6.1", purpose: "Rapat kerja", status: "menunggu_konfirmasi" },
  { days: 0, start: "07:00", end: "09:00", borrowerName: "Erdin Purwa Putra", borrowerDetail: "Ormawa • HMTI", roomName: "H.5.3", purpose: "Belajar kelompok", status: "selesai" },
  { days: 0, start: "09:30", end: "11:30", borrowerName: "Juan Stevenson", borrowerDetail: "Ormawa • HMTI", roomName: "H.5.3", purpose: "Kegiatan organisasi", status: "disetujui" },
  { days: 0, start: "13:00", end: "15:00", borrowerName: "Mochamad Farhan Abdullah", borrowerDetail: "Ormawa • BEM", roomName: "H.5.6", purpose: "Belajar mandiri", status: "disetujui" },
  { days: 0, start: "15:00", end: "17:00", borrowerName: "Juan Stevenson", borrowerDetail: "Ormawa • HMTI", roomName: "H.7.2", purpose: "Penelitian", status: "disetujui" },
  { days: -2, start: "08:00", end: "10:00", borrowerName: "Prof. Dr. Aris Marjuni, S.Si., M.Kom.", borrowerDetail: "Dosen • NPP: 19750312", roomName: "H.5.1", purpose: "Belajar mandiri", status: "selesai" },
  { days: -3, start: "10:30", end: "12:30", borrowerName: "Dr. Rina Sari, M.Pd.", borrowerDetail: "Dosen • NPP: 19830704", roomName: "H.5.2", purpose: "Diskusi kelompok", status: "ditolak" },
  { days: -5, start: "13:00", end: "15:00", borrowerName: "Mr. Budi Santoso, S.T.", borrowerDetail: "Dosen • NPP: 19790123", roomName: "H.5.3", purpose: "Praktikum", status: "ditolak" },
  { days: -6, start: "09:00", end: "11:00", borrowerName: "Dr. Lisa Ananda, M.A.", borrowerDetail: "Dosen • NPP: 19870915", roomName: "H.5.4", purpose: "Presentasi proyek", status: "selesai" },
  { days: -8, start: "13:00", end: "14:00", borrowerName: "Erdin Purwa Putra", borrowerDetail: "Ormawa • HMTI", roomName: "H.6.1", purpose: "Rapat pengurus", status: "dibatalkan" },
];

export function buildReservationsMock(now: Date): ReservationRequest[] {
  const todayKey = toWibDateKey(now);
  return ROWS.map((row, index) => ({
    id: `res-${String(index + 1).padStart(3, "0")}`,
    ticketCode: `#${828374 + index * 17}`,
    startsAt: wibDateTime(todayKey, row.days, row.start),
    endsAt: wibDateTime(todayKey, row.days, row.end),
    buildingName: "Gedung H",
    roomName: row.roomName,
    status: row.status,
    borrowerName: row.borrowerName,
    borrowerDetail: row.borrowerDetail,
    purpose: row.purpose,
    letterFileName: index % 4 === 3 ? null : `Surat Peminjaman Ruang ${row.roomName}.pdf`,
  }));
}
