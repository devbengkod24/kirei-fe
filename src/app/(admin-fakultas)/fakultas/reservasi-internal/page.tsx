import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { getRoomBookingData } from "@/shared/room-booking/getRoomBookingData";
import { RoomBookingForm } from "@/shared/room-booking/RoomBookingForm";

export const metadata: Metadata = { title: "Reservasi Internal" };

export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  const data = await getRoomBookingData({ fakultasId: user.fakultasId });

  return <RoomBookingForm data={data} bookerName={user.name} />;
}
