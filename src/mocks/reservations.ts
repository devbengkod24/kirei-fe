import { toWibDateKey } from "@/lib/date";
import type { ReservationRecord, ReservationRequest, ReservationStatus, ReservationType } from "@/types/reservation";
import { wibDateTime } from "./time";

/* ---------- Borrower: own reservations and history ---------- */

const BOOKER = { bookerName: "Dian Nuswantoro Computer Club", bookerEmail: "nurudin911@gmail.com" };

const UNITS: Record<ReservationType, string[]> = {
  ruangan: ["H.5.2", "H.4.6", "H.2.12", "H.6.7", "H.3.7"],
  kendaraan: ["Hiace", "Bus", "Mobil"],
  gor: ["GOR Udinus"],
};

const PURPOSES = ["Rapat Pengurus", "Seminar", "Latihan Rutin", "Workshop", "Kunjungan Industri"];
const PAST_STATUSES: ReservationStatus[] = ["selesai", "selesai", "ditolak", "selesai", "dibatalkan"];

let sequence = 0;

function record(
  type: ReservationType,
  todayKey: string,
  days: number,
  [start, end]: [string, string],
  status: ReservationStatus,
  extra: Partial<ReservationRecord> = {},
): ReservationRecord {
  sequence += 1;
  return {
    id: `res-${type}-${sequence}`,
    type,
    status,
    startsAt: wibDateTime(todayKey, days, start),
    endsAt: wibDateTime(todayKey, days, end),
    ...BOOKER,
    unitName: UNITS[type][sequence % UNITS[type].length],
    purpose: PURPOSES[sequence % PURPOSES.length],
    reschedule: null,
    cancellationReason: status === "dibatalkan" ? "Tidak ada slot pengganti saat ruangan dipakai ujian susulan." : null,
    ...extra,
  };
}

function pastRecords(type: ReservationType, todayKey: string, count: number) {
  return Array.from({ length: count }, (_, index) =>
    record(type, todayKey, -(index * 3 + 2), ["08:00", "10:00"], PAST_STATUSES[index % PAST_STATUSES.length]),
  );
}

// Sample data shaped after the Figma V3 mockup. Dates are relative to `now` so the
// "Hari ini" group is never empty. Kendaraan has no active reservation on purpose,
// to show the empty state.
export function buildReservationHistoryMock(now: Date): ReservationRecord[] {
  sequence = 0;
  const todayKey = toWibDateKey(now);

  return [
    record("ruangan", todayKey, 0, ["08:00", "10:00"], "disetujui"),
    record("ruangan", todayKey, 1, ["13:00", "15:00"], "disetujui", {
      reschedule: {
        previousStartsAt: wibDateTime(todayKey, 1, "08:00"),
        previousEndsAt: wibDateTime(todayKey, 1, "10:00"),
        reason: "Ruangan dipakai rapat senat fakultas.",
      },
    }),
    record("ruangan", todayKey, 2, ["09:00", "11:00"], "menunggu_konfirmasi"),
    record("ruangan", todayKey, 5, ["10:30", "12:30"], "disetujui"),
    record("gor", todayKey, 3, ["15:00", "17:00"], "menunggu_konfirmasi"),
    ...pastRecords("ruangan", todayKey, 23),
    ...pastRecords("kendaraan", todayKey, 4),
    ...pastRecords("gor", todayKey, 6),
  ];
}

/* ---------- Admin: incoming reservation requests ---------- */

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
  { days: 3, start: "10:20", end: "12:00", borrowerName: "Dian Nuswantoro Computer Club", borrowerDetail: "Ormawa", roomName: "H.7", purpose: "Rapat kerja", status: "menunggu_konfirmasi" },
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
    type: "ruangan",
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

// GOR and vehicle requests, for the admin universitas pages.
type FacilityRow = Row & {
  type: "gor" | "kendaraan";
  buildingName: string;
  activity?: string;
  trip?: { destination: string; participants: number };
};

// A pending vehicle request has no vehicle yet (roomName ""): the approving admin assigns one.
const FACILITY_ROWS: FacilityRow[] = [
  { type: "gor", buildingName: "GOR Udinus", roomName: "GOR Udinus", days: 0, start: "16:00", end: "18:00", borrowerName: "UKM Bulu Tangkis", borrowerDetail: "Ormawa", purpose: "Latihan rutin badminton", activity: "Badminton", status: "disetujui" },
  { type: "gor", buildingName: "GOR Udinus", roomName: "GOR Udinus", days: 0, start: "08:00", end: "09:00", borrowerName: "UKM Futsal", borrowerDetail: "Ormawa", purpose: "Latihan futsal", activity: "Futsal", status: "selesai" },
  { type: "gor", buildingName: "GOR Udinus", roomName: "GOR Udinus", days: 2, start: "15:00", end: "17:00", borrowerName: "HMTI", borrowerDetail: "Ormawa • HMTI", purpose: "Turnamen voli antar angkatan", activity: "Voli", status: "menunggu_konfirmasi" },
  { type: "gor", buildingName: "GOR Udinus", roomName: "GOR Udinus", days: 4, start: "19:00", end: "21:00", borrowerName: "UKM Basket", borrowerDetail: "Ormawa", purpose: "Persiapan liga mahasiswa", activity: "Basket", status: "menunggu_konfirmasi" },
  { type: "gor", buildingName: "GOR Udinus", roomName: "GOR Udinus", days: -3, start: "16:00", end: "18:00", borrowerName: "UKM Bulu Tangkis", borrowerDetail: "Ormawa", purpose: "Latihan rutin badminton", activity: "Badminton", status: "selesai" },
  { type: "kendaraan", buildingName: "Kendaraan", roomName: "Toyota Hiace", days: 0, start: "06:00", end: "18:00", borrowerName: "BEM Universitas", borrowerDetail: "Ormawa", purpose: "Kunjungan industri ke Kudus", trip: { destination: "Kudus", participants: 14 }, status: "disetujui" },
  { type: "kendaraan", buildingName: "Kendaraan", roomName: "", days: 3, start: "05:00", end: "20:00", borrowerName: "Dr. Hendra Gunawan, S.Kom", borrowerDetail: "Dosen Pembimbing BEM • NPP: 19820411", purpose: "Studi banding ke Yogyakarta", trip: { destination: "Yogyakarta", participants: 35 }, status: "menunggu_konfirmasi" },
  { type: "kendaraan", buildingName: "Kendaraan", roomName: "", days: 1, start: "08:00", end: "15:00", borrowerName: "Dr. Maria Lestari, M.Pd.", borrowerDetail: "Dosen • NPP: 19800521", purpose: "Pendampingan lomba", trip: { destination: "Salatiga", participants: 6 }, status: "menunggu_konfirmasi" },
  { type: "kendaraan", buildingName: "Kendaraan", roomName: "Toyota Hiace", days: -6, start: "07:00", end: "17:00", borrowerName: "HMTI", borrowerDetail: "Ormawa • HMTI", purpose: "Bakti sosial", trip: { destination: "Demak", participants: 12 }, status: "selesai" },
  { type: "gor", buildingName: "GOR Udinus", roomName: "GOR Udinus", days: -7, start: "19:00", end: "21:00", borrowerName: "HMTI", borrowerDetail: "Ormawa • HMTI", purpose: "Futsal antar angkatan", activity: "Futsal", status: "ditolak" },
  { type: "kendaraan", buildingName: "Kendaraan", roomName: "", days: -10, start: "06:00", end: "19:00", borrowerName: "Erdin Purwa Putra", borrowerDetail: "Ormawa • HMTI", purpose: "Rekreasi pengurus", trip: { destination: "Bandungan", participants: 20 }, status: "ditolak" },
];

export function buildFacilityRequestsMock(now: Date): ReservationRequest[] {
  const todayKey = toWibDateKey(now);
  return FACILITY_ROWS.map((row, index) => ({
    id: `res-${row.type}-${String(index + 1).padStart(3, "0")}`,
    ticketCode: `#${829100 + index * 13}`,
    type: row.type,
    startsAt: wibDateTime(todayKey, row.days, row.start),
    endsAt: wibDateTime(todayKey, row.days, row.end),
    buildingName: row.buildingName,
    roomName: row.roomName,
    status: row.status,
    borrowerName: row.borrowerName,
    borrowerDetail: row.borrowerDetail,
    purpose: row.purpose,
    letterFileName: `Surat Peminjaman ${row.type === "gor" ? row.roomName : "Kendaraan"}.pdf`,
    activity: row.activity,
    trip: row.trip,
  }));
}
