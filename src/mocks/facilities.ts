import { toWibDateKey } from "@/lib/date";
import type { Building, FloorPlanRoom, SportsHall, UnitBooking } from "@/types/facility";
import { wibDateTime } from "./time";

const SAMPLE_PHOTO = "/images/sample-room.jpg";

function room(code: string, category: FloorPlanRoom["category"], x: number, y: number, width: number, height: number) {
  return { id: `room-${code}`, code, category, photoUrl: category === "kelas" ? SAMPLE_PHOTO : null, x, y, width, height };
}

// Floor plans traced from the Figma V3 "buat pesan" frames (plan units are Figma pixels).
// Gedung E belongs to another faculty and Gedung Rektorat to the university, to exercise the
// cross-faculty approval notice. Lantai 3 of Gedung E has no plan yet, to show the empty state.
export const MOCK_BUILDINGS: Building[] = [
  {
    id: "gedung-h",
    name: "Gedung H",
    fakultasId: "fik",
    fakultasName: "Fakultas Ilmu Komputer",
    floors: [
      {
        id: "gedung-h-5",
        number: 5,
        planWidth: 467,
        planHeight: 300,
        rooms: [
          room("H.5.1", "kelas", 20, 13, 101, 49),
          room("H.5.2", "kelas", 121, 13, 100, 49),
          room("H.5.3", "kelas", 221, 13, 48, 49),
          room("H.5.4", "kelas", 269, 13, 50, 49),
          room("H.5.5", "kelas", 319, 13, 50, 49),
          room("H.5.6", "kelas", 369, 13, 50, 49),
          room("H.5.11", "meeting", 170, 82, 49, 73),
          room("H.5.10", "meeting", 219, 82, 49, 73),
          room("H.5.9", "meeting", 268, 82, 49, 73),
          room("H.5.8", "meeting", 317, 82, 50, 73),
          room("H.5.7", "galeri", 367, 82, 80, 73),
          room("H.5.12", "kelas", 50, 153, 72, 48),
          room("H.5.13", "kelas", 50, 201, 72, 48),
          room("H.5.14", "kelas", 50, 249, 72, 48),
        ],
      },
      {
        id: "gedung-h-7",
        number: 7,
        planWidth: 467,
        planHeight: 300,
        rooms: [
          room("H.7.1", "kelas", 22, 22, 51, 66),
          room("H.7.2", "kelas", 73, 22, 51, 66),
          room("H.7.3", "kelas", 124, 22, 51, 66),
          room("H.7.4", "kelas", 175, 22, 51, 66),
          room("H.7", "auditorium", 226, 22, 220, 170),
        ],
      },
    ],
  },
  {
    id: "gedung-e",
    name: "Gedung E",
    fakultasId: "feb",
    fakultasName: "Fakultas Ekonomi dan Bisnis",
    floors: [
      {
        id: "gedung-e-2",
        number: 2,
        planWidth: 467,
        planHeight: 300,
        rooms: [
          room("E.2.1", "kelas", 30, 30, 120, 80),
          room("E.2.2", "kelas", 150, 30, 120, 80),
          room("E.2.3", "meeting", 270, 30, 90, 80),
          room("E.2.4", "kelas", 30, 180, 160, 90),
        ],
      },
      { id: "gedung-e-3", number: 3, planWidth: 467, planHeight: 300, rooms: [] },
    ],
  },
  {
    id: "gedung-rektorat",
    name: "Gedung Rektorat",
    fakultasId: null,
    fakultasName: null,
    floors: [
      {
        id: "gedung-rektorat-1",
        number: 1,
        planWidth: 467,
        planHeight: 300,
        rooms: [room("R.1.1", "auditorium", 40, 40, 260, 200), room("R.1.2", "meeting", 320, 40, 110, 100)],
      },
    ],
  },
];

/** Bookings over the next days so the plan shows some taken rooms. */
export function buildRoomBookingsMock(now: Date): UnitBooking[] {
  const todayKey = toWibDateKey(now);
  const booking = (code: string, days: number, start: string, end: string): UnitBooking => ({
    unitId: `room-${code}`,
    startsAt: new Date(wibDateTime(todayKey, days, start)).toISOString(),
    endsAt: new Date(wibDateTime(todayKey, days, end)).toISOString(),
  });

  return [0, 1, 2, 3, 4, 5, 6].flatMap((days) => [
    booking("H.5.2", days, "07:00", "21:00"),
    booking("H.5.11", days, "07:00", "21:00"),
    booking("H.5.9", days, "08:00", "12:00"),
    booking("H.5.9", days, "13:00", "17:00"),
    booking("H.7", days, "09:00", "11:00"),
    booking("E.2.2", days, "10:00", "15:00"),
  ]);
}

// Rules from the Figma V3 "Peraturan Reservasi" box, without the penalty items (penalties were dropped).
export const MOCK_ROOM_RULES = [
  "Satu pemesan hanya dapat meminjam ruangan yang sama 1 kali dalam 1 hari.",
  "Jika tidak hadir dalam 1 jam dari waktu reservasi, reservasi akan hangus.",
  "Dilarang membawa makanan berbau menyengat yang dapat mengganggu pengguna lainnya.",
];

export const MOCK_SPORTS_HALL: SportsHall = {
  id: "gor-udinus",
  name: "GOR Udinus",
  openTime: "08:00",
  closeTime: "22:00",
  slotMinutes: 60,
  activities: ["Badminton", "Futsal", "Basket", "Voli"],
};

/** GOR bookings over the next week; tomorrow is fully booked to show a day with no free slot. */
export function buildSportsHallBookingsMock(now: Date): UnitBooking[] {
  const todayKey = toWibDateKey(now);
  const booking = (days: number, start: string, end: string): UnitBooking => ({
    unitId: MOCK_SPORTS_HALL.id,
    startsAt: new Date(wibDateTime(todayKey, days, start)).toISOString(),
    endsAt: new Date(wibDateTime(todayKey, days, end)).toISOString(),
  });

  return [
    booking(1, "08:00", "22:00"),
    ...[0, 2, 3, 4, 5, 6].flatMap((days) => [booking(days, "08:00", "09:00"), booking(days, "16:00", "18:00")]),
  ];
}
