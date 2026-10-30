import { connection } from "next/server";
import { toWibDateKey } from "@/lib/date";
import { buildReservationsMock } from "@/mocks/reservations";
import { MOCK_BUILDINGS, mockRoomsInScope } from "@/mocks/rooms";
import type { AdminScope } from "@/shared/admin-scope";
import type { Building, Room } from "@/types/room";
import type { BookedSlot } from "./booking";

export interface RoomBookingData {
  todayKey: string;
  buildings: Building[];
  rooms: Room[];
  bookedSlots: BookedSlot[];
  rules: string[];
}

// Rules from the Figma V3 "Peraturan Reservasi" box, without the penalty items (penalties were dropped).
const MOCK_RULES = [
  "Satu pemesan hanya dapat meminjam ruangan yang sama 1 kali dalam 1 hari.",
  "Jika tidak hadir dalam 1 jam dari waktu reservasi, reservasi akan hangus.",
  "Dilarang membawa makanan berbau menyengat yang dapat mengganggu pengguna lainnya.",
];

export async function getRoomBookingData(scope: AdminScope): Promise<RoomBookingData> {
  await connection();
  // TODO: replace with the orval client: rooms with floor plans, booked slots and rules (no-store).
  const now = new Date();
  const rooms = mockRoomsInScope(scope.fakultasId);
  const buildingIds = new Set(rooms.map((room) => room.buildingId));
  const bookedSlots = buildReservationsMock(now)
    .filter((reservation) => reservation.status === "menunggu_konfirmasi" || reservation.status === "disetujui")
    .map(({ roomName, startsAt, endsAt }) => ({ roomCode: roomName, startsAt, endsAt }));

  return {
    todayKey: toWibDateKey(now),
    buildings: MOCK_BUILDINGS.filter((building) => buildingIds.has(building.id)),
    rooms,
    bookedSlots,
    rules: MOCK_RULES,
  };
}
