import type { Room, RoomType } from "@/types/room";

export const ROOM_TYPE_LABEL: Record<RoomType, string> = {
  ruang_kelas: "Ruang Kelas",
  meeting_room: "Meeting Room",
  auditorium: "Aula / Auditorium",
  gallery: "Gallery",
};

/** Short prefix shown on room tiles, e.g. "Kelas H.5.1". */
export const ROOM_TYPE_PREFIX: Record<RoomType, string> = {
  ruang_kelas: "Kelas",
  meeting_room: "Meeting",
  auditorium: "Auditorium",
  gallery: "Gallery",
};

export function roomTitle(room: Pick<Room, "type" | "code">) {
  return `${ROOM_TYPE_PREFIX[room.type]} ${room.code}`;
}
