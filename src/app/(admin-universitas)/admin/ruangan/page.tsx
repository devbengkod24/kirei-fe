import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { getRooms } from "@/shared/rooms/getRooms";
import { RoomManager } from "@/shared/rooms/RoomManager";

export const metadata: Metadata = { title: "Kelola Ruangan" };

export default async function Page() {
  await requireRole(["admin_universitas"]);
  // All buildings: admin universitas is not limited to one faculty.
  const { buildings, rooms } = await getRooms({ fakultasId: null });

  return <RoomManager buildings={buildings} rooms={rooms} canChangeManager />;
}
