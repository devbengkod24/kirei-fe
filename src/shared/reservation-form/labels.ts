import type { RoomCategory } from "@/types/facility";
import type { RoomStatus } from "./availability";

export const ROOM_CATEGORY_LABEL: Record<RoomCategory, string> = {
  kelas: "Ruang Kelas",
  meeting: "Meeting Room",
  auditorium: "Aula / Auditorium",
  galeri: "Gallery",
};

/** Short label printed inside the room on the floor plan. */
export const ROOM_CATEGORY_SHORT: Record<RoomCategory, string> = {
  kelas: "Kelas",
  meeting: "Meeting",
  auditorium: "Auditorium",
  galeri: "Gallery",
};

export const ROOM_STATUS_LABEL: Record<RoomStatus, string> = {
  selected: "Dipilih",
  booked: "Tidak tersedia",
  available: "Tersedia",
  filtered: "Di luar filter",
};
