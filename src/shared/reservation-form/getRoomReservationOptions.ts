import { connection } from "next/server";
import { MOCK_BUILDINGS, buildRoomBookingsMock } from "@/mocks/facilities";
import type { Building, RoomBooking } from "@/types/facility";

export interface RoomReservationOptions {
  buildings: Building[];
  bookings: RoomBooking[];
  /** ISO 8601, the server time used for the defaults so server and client render the same values */
  now: string;
}

export async function getRoomReservationOptions(): Promise<RoomReservationOptions> {
  await connection();
  const now = new Date();
  // TODO: replace with the orval clients for buildings/floor plans and room availability (no-store).
  // Availability should become a query per date once TanStack Query is set up, instead of a week of bookings.
  return { buildings: MOCK_BUILDINGS, bookings: buildRoomBookingsMock(now), now: now.toISOString() };
}
