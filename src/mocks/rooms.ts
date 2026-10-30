import type { Building, PlanRect, Room, RoomType } from "@/types/room";

// Sample rooms shaped after the Figma V3 mockup (Gedung H, owned by the sample faculty).
export const MOCK_BUILDINGS: Building[] = [{ id: "gedung-h", name: "Gedung H", fakultasId: "fik", floors: [5, 6, 7] }];

const PHOTO = "/images/rooms/sample-room.png";

function room(code: string, type: RoomType, floor: number, plan: PlanRect, extra: Partial<Room> = {}): Room {
  return {
    id: `room-${code.toLowerCase().replaceAll(".", "-")}`,
    code,
    type,
    buildingId: "gedung-h",
    floor,
    isActive: true,
    photoUrl: PHOTO,
    plan,
    ...extra,
  };
}

/** Classrooms in a 4-wide grid, like the floor plan in the mockup. */
function classroomRow(floor: number, numbers: number[], row: number) {
  return numbers.map((number, column) =>
    room(`H.${floor}.${number}`, "ruang_kelas", floor, { x: 2 + column * 24.5, y: 2 + row * 24.5, width: 23, height: 23 }),
  );
}

export const MOCK_ROOMS: Room[] = [
  ...classroomRow(5, [1, 2, 3, 4], 0),
  ...classroomRow(5, [5, 6, 7, 8], 1),
  ...classroomRow(5, [9, 10, 11, 12], 2),
  room("H.6.1", "meeting_room", 6, { x: 2, y: 2, width: 30, height: 30 }),
  room("H.6.2", "meeting_room", 6, { x: 34, y: 2, width: 30, height: 30 }, { isActive: false }),
  room("H.6.3", "gallery", 6, { x: 2, y: 40, width: 62, height: 40 }, { photoUrl: null }),
  room("H.7.1", "ruang_kelas", 7, { x: 2, y: 2, width: 12, height: 28 }),
  room("H.7.2", "ruang_kelas", 7, { x: 14, y: 2, width: 12, height: 28 }),
  room("H.7.3", "ruang_kelas", 7, { x: 26, y: 2, width: 12, height: 28 }),
  room("H.7.4", "ruang_kelas", 7, { x: 38, y: 2, width: 12, height: 28 }),
  room("H.7", "auditorium", 7, { x: 50, y: 2, width: 47, height: 70 }),
];

/** Mock stand-in for the API's faculty filter: null means every building. */
export function mockRoomsInScope(fakultasId: string | null): Room[] {
  const buildingIds = new Set(
    MOCK_BUILDINGS.filter((building) => fakultasId === null || building.fakultasId === fakultasId).map((building) => building.id),
  );
  return MOCK_ROOMS.filter((room) => buildingIds.has(room.buildingId));
}
