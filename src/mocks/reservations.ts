import { toWibDateKey } from "@/lib/date";
import type { ReservationRecord, ReservationStatus, ReservationType } from "@/types/reservation";
import { wibDateTime } from "./time";

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
