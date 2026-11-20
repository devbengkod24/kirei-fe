import type { Building, Room, RoomManagedBy, RoomType } from "@/types/room";

export const ROOM_TYPE_LABEL: Record<RoomType, string> = {
  ruang_kelas: "Ruang Kelas",
  lab: "Laboratorium",
  meeting_room: "Meeting Room",
  auditorium: "Aula / Auditorium",
  gallery: "Gallery",
};

/** Short prefix shown on room tiles, e.g. "Kelas H.5.1". */
export const ROOM_TYPE_PREFIX: Record<RoomType, string> = {
  ruang_kelas: "Kelas",
  lab: "Lab",
  meeting_room: "Meeting",
  auditorium: "Auditorium",
  gallery: "Gallery",
};

export function roomTitle(room: Pick<Room, "type" | "code">) {
  return `${ROOM_TYPE_PREFIX[room.type]} ${room.code}`;
}

/** Rooms in a faculty building start with that building's admin; rooms in a university building with admin universitas. */
export function roomManagedBy(room: Pick<Room, "managedBy">, building: Pick<Building, "fakultasId"> | undefined): RoomManagedBy {
  return room.managedBy ?? (building?.fakultasId ? "gedung" : "universitas");
}

/** e.g. "Admin Gedung H" or "Admin Universitas". */
export function managedByLabel(managedBy: RoomManagedBy, buildingName: string) {
  return managedBy === "gedung" ? `Admin ${buildingName}` : "Admin Universitas";
}
