import { toWibDateKey } from "@/lib/date";
import type { Announcement } from "@/types/announcement";
import type { ReservationSummary } from "@/types/reservation";
import { MOCK_CURRENT_USER } from "./user";

/** "2026-10-30" shifted by `days`, as a WIB wall-clock ISO string at `time`. */
function wibDateTime(todayKey: string, days: number, time: string) {
  const [year, month, day] = todayKey.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  return `${shifted.toISOString().slice(0, 10)}T${time}:00+07:00`;
}

// Sample data shaped after the Figma V3 mockup. Dates are relative to `now`
// so the calendar always has something to show in the current month.
export function buildDashboardMock(now: Date) {
  const todayKey = toWibDateKey(now);

  const todayReservation: ReservationSummary = {
    id: "res-01827",
    ticketCode: "#828374",
    startsAt: wibDateTime(todayKey, 0, "09:30"),
    endsAt: wibDateTime(todayKey, 0, "10:20"),
    buildingName: "Gedung H",
    roomName: "H.3.7",
    status: "disetujui",
  };

  const announcements: Announcement[] = [
    {
      id: "ann-01",
      title: "Ini judul pengumumannya",
      category: "informasi",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales.",
      authorName: "Adhitya Nugraha S.Kom, M.CS",
      publishedAt: wibDateTime(todayKey, -2, "13:45"),
    },
    {
      id: "ann-02",
      title: "Ini judul pengumumannya",
      category: "pemberitahuan",
      body: "Halo, reservasi kamu terpaksa kami batalkan karena alasan berikut:",
      quote: "Meja-K01 akan dipakai untuk keperluan prodi pada pukul 08.00 WIB - selesai. Untuk berjaga-jaga, ...",
      authorName: "Adhitya Nugraha S.Kom, M.CS",
      publishedAt: wibDateTime(todayKey, -3, "13:45"),
    },
    {
      id: "ann-03",
      title: "Ini judul pengumumannya",
      category: "informasi",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales.",
      authorName: "Adhitya Nugraha S.Kom, M.CS",
      publishedAt: wibDateTime(todayKey, -5, "13:45"),
    },
  ];

  return {
    userName: MOCK_CURRENT_USER.name,
    todayKey,
    blockedUntil: wibDateTime(todayKey, 5, "00:00"),
    totalReservations: 12,
    penaltyCount: 2,
    penaltyLimit: 3,
    todayReservation,
    reservationStarts: [-10, -8, -7, 0, 1, 2].map((days) => wibDateTime(todayKey, days, "09:30")),
    announcements,
  };
}
