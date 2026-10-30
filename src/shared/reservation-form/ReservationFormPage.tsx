import { notFound } from "next/navigation";
import type { ReservationType } from "@/types/reservation";
import { getRoomReservationOptions } from "./getRoomReservationOptions";
import { RoomReservationForm } from "./RoomReservationForm";

export interface ReservationFormPageProps {
  tipe: ReservationType;
  requester: { name: string; fakultasId: string | null };
  /** For admins later: allows picking a booked slot. */
  canUseBookedSlot?: boolean;
  links: { history: string; drafts: string };
}

/** Booking form for one reservation type. Only `ruangan` is built so far. */
export async function ReservationFormPage({ tipe, requester, canUseBookedSlot = false, links }: ReservationFormPageProps) {
  if (tipe !== "ruangan") notFound();

  const options = await getRoomReservationOptions();
  return <RoomReservationForm {...options} requester={requester} canUseBookedSlot={canUseBookedSlot} links={links} />;
}
