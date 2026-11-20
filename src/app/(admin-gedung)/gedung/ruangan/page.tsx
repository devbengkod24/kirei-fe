import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { getRooms } from "@/shared/rooms/getRooms";
import { RoomManager } from "@/shared/rooms/RoomManager";

export const metadata: Metadata = { title: "Kelola Ruangan" };

export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  const { buildings, rooms } = await getRooms({ fakultasId: user.fakultasId });

  return <RoomManager buildings={buildings} rooms={rooms} />;
}
