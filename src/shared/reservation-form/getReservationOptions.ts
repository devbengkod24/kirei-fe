import { connection } from "next/server";
import { MOCK_BUILDINGS, MOCK_SPORTS_HALL, buildRoomBookingsMock, buildSportsHallBookingsMock } from "@/mocks/facilities";
import type { Building, SportsHall, UnitBooking } from "@/types/facility";

export interface RoomReservationOptions {
  buildings: Building[];
  bookings: UnitBooking[];
  /** ISO 8601, the server time used for the defaults so server and client render the same values */
  now: string;
}

export interface SportsHallReservationOptions {
  hall: SportsHall;
  bookings: UnitBooking[];
  now: string;
}

export async function getRoomReservationOptions(): Promise<RoomReservationOptions> {
  await connection();
  const now = new Date();
  // TODO: replace with the orval clients for buildings/floor plans and room availability (no-store).
  // Availability should become a query per date once TanStack Query is set up, instead of a week of bookings.
  return { buildings: MOCK_BUILDINGS, bookings: buildRoomBookingsMock(now), now: now.toISOString() };
}

export async function getSportsHallReservationOptions(): Promise<SportsHallReservationOptions> {
  await connection();
  const now = new Date();
  // TODO: replace with the orval clients for the GOR and its bookings (no-store).
  return { hall: MOCK_SPORTS_HALL, bookings: buildSportsHallBookingsMock(now), now: now.toISOString() };
}

/** Vehicles are assigned by the admin, so the form only needs the server time for its defaults. */
export async function getVehicleReservationOptions(): Promise<{ now: string }> {
  await connection();
  return { now: new Date().toISOString() };
}
