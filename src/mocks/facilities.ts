import { toWibDateKey } from "@/lib/date";
import type { Building, FloorPlanRoom, SportsHall, UnitBooking, Vehicle } from "@/types/facility";
import { wibDateTime } from "./time";

const SAMPLE_PHOTO = "/images/sample-room.jpg";

function room(code: string, category: FloorPlanRoom["category"], x: number, y: number, width: number, height: number) {
  return { id: `room-${code}`, code, category, photoUrl: category === "kelas" ? SAMPLE_PHOTO : null, x, y, width, height };
}

// Floor plans after the Figma V3 "buat pesan" frames, laid on the Kelola Denah grid: 25 plan units
// per cell, 18 × 12 cells per floor, so every room starts on a grid line and spans whole cells.
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
        planWidth: 450,
        planHeight: 300,
        rooms: [
          room("H.5.1", "kelas", 25, 25, 100, 50),
          room("H.5.2", "kelas", 125, 25, 100, 50),
          room("H.5.3", "kelas", 225, 25, 50, 50),
          room("H.5.4", "kelas", 275, 25, 50, 50),
          room("H.5.5", "kelas", 325, 25, 50, 50),
          room("H.5.6", "kelas", 375, 25, 50, 50),
          room("H.5.11", "meeting", 175, 75, 50, 75),
          room("H.5.10", "meeting", 225, 75, 50, 75),
          room("H.5.9", "meeting", 275, 75, 50, 75),
          room("H.5.8", "meeting", 325, 75, 50, 75),
          room("H.5.7", "galeri", 375, 75, 75, 75),
          room("H.5.12", "kelas", 50, 150, 75, 50),
          room("H.5.13", "kelas", 50, 200, 75, 50),
          room("H.5.14", "kelas", 50, 250, 75, 50),
        ],
      },
      {
        id: "gedung-h-7",
        number: 7,
        planWidth: 450,
        planHeight: 300,
        rooms: [
          room("H.7.1", "kelas", 25, 25, 50, 75),
          room("H.7.2", "kelas", 75, 25, 50, 75),
          room("H.7.3", "kelas", 125, 25, 50, 75),
          room("H.7.4", "kelas", 175, 25, 50, 75),
          room("H.7", "auditorium", 225, 25, 225, 175),
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
        planWidth: 450,
        planHeight: 300,
        rooms: [
          room("E.2.1", "kelas", 25, 25, 125, 75),
          room("E.2.2", "kelas", 150, 25, 125, 75),
          room("E.2.3", "meeting", 275, 25, 100, 75),
          room("E.2.4", "kelas", 25, 175, 150, 100),
        ],
      },
      { id: "gedung-e-3", number: 3, planWidth: 450, planHeight: 300, rooms: [] },
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
        planWidth: 450,
        planHeight: 300,
        rooms: [room("R.1.1", "auditorium", 50, 50, 250, 200), room("R.1.2", "meeting", 325, 50, 100, 100)],
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

export const MOCK_VEHICLES: Vehicle[] = [
  { id: "vehicle-hiace", name: "Toyota Hiace", capacity: 15, unitCount: 3, isActive: true },
  { id: "vehicle-bus", name: "Bus Udinus", capacity: 40, unitCount: 2, isActive: true },
  { id: "vehicle-innova", name: "Toyota Innova", capacity: 7, unitCount: 4, isActive: true },
  { id: "vehicle-elf", name: "Isuzu Elf", capacity: 19, unitCount: 1, isActive: false },
];
