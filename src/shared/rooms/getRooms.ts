import { connection } from "next/server";
import { MOCK_BUILDINGS, mockRoomsInScope } from "@/mocks/rooms";
import type { AdminScope } from "@/shared/admin-scope";
import type { Building, Room } from "@/types/room";

export interface RoomsData {
  buildings: Building[];
  rooms: Room[];
}

export async function getRooms(scope: AdminScope): Promise<RoomsData> {
  await connection();
  // TODO: replace with the orval client for buildings and rooms (no-store, filtered by scope).
  const rooms = mockRoomsInScope(scope.fakultasId);
  const buildingIds = new Set(rooms.map((room) => room.buildingId));
  return { buildings: MOCK_BUILDINGS.filter((building) => buildingIds.has(building.id)), rooms };
}
