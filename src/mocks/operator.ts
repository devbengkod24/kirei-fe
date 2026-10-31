import { toWibDateKey } from "@/lib/date";
import type { ReservationRecord } from "@/types/reservation";
import type { ClassSchedule } from "@/types/schedule";
import { wibDateTime } from "./time";

/** Floor the sample operator looks after; the API will return the operator's own floor. */
export const MOCK_OPERATOR_FLOOR = { buildingId: "gedung-h", floorNumber: 5 };

/** Approved reservations on that floor today. Booker and purpose come from the Figma V3 operator frames. */
export function buildOperatorReservationsMock(now: Date): ReservationRecord[] {
  const todayKey = toWibDateKey(now);
  const reservation = (id: string, roomCode: string, start: string, end: string, bookerName: string, purpose: string): ReservationRecord => ({
    id,
    type: "ruangan",
    status: "disetujui",
    startsAt: new Date(wibDateTime(todayKey, 0, start)).toISOString(),
    endsAt: new Date(wibDateTime(todayKey, 0, end)).toISOString(),
    bookerName,
    bookerEmail: "",
    unitName: roomCode,
    purpose,
    reschedule: null,
    cancellationReason: null,
  });

  return [
    reservation("rsv-op-1", "H.5.1", "07:10", "07:30", "Budiono Siregar", "Butuh kelas untuk mengajar"),
    reservation("rsv-op-2", "H.5.1", "08:40", "10:20", "Budiono Siregar", "Butuh kelas untuk mengajar"),
    reservation("rsv-op-3", "H.5.3", "09:00", "12:00", "Budiono Siregar", "Butuh kelas untuk mengajar"),
    reservation("rsv-op-4", "H.5.1", "13:00", "15:30", "Budiono Siregar", "Butuh kelas untuk mengajar"),
  ];
}

/** Sample Siadin class schedule for today. Course and lecturer names are placeholders until the API exists. */
export function buildClassSchedulesMock(now: Date): ClassSchedule[] {
  const todayKey = toWibDateKey(now);
  const meeting = (id: string, roomCode: string, start: string, end: string, courseName: string, lecturerName: string): ClassSchedule => ({
    id,
    unitName: roomCode,
    startsAt: new Date(wibDateTime(todayKey, 0, start)).toISOString(),
    endsAt: new Date(wibDateTime(todayKey, 0, end)).toISOString(),
    courseName,
    lecturerName,
  });

  return [
    meeting("sia-1", "H.5.1", "07:30", "08:30", "Pemrograman Web", "Ir. Budi Santoso, M.T."),
    meeting("sia-2", "H.5.1", "10:30", "12:00", "Basis Data", "Dr. Maria Lestari, M.Pd."),
    meeting("sia-3", "H.5.1", "15:30", "17:10", "Jaringan Komputer", "Dr. Siti Nurhaliza, M.A."),
    meeting("sia-4", "H.5.2", "07:00", "09:30", "Struktur Data", "Dr. Hendra Gunawan, S.Kom"),
    meeting("sia-5", "H.5.3", "13:00", "14:40", "Sistem Operasi", "Prof. Dr. Aris Marjuni, S.Si., M.Kom."),
  ];
}
