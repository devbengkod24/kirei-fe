import { connection } from "next/server";
import {
  MOCK_BUILDINGS,
  MOCK_ROOM_RULES,
  MOCK_SPORTS_HALL,
  MOCK_VEHICLES,
  buildRoomBookingsMock,
  buildSportsHallBookingsMock,
} from "@/mocks/facilities";
import type { Building, SportsHall, UnitBooking, Vehicle } from "@/types/facility";

export interface RoomReservationOptions {
  buildings: Building[];
  bookings: UnitBooking[];
  /** ISO 8601, the server time used for the defaults so server and client render the same values */
  now: string;
  rules: string[];
}

export interface SportsHallReservationOptions {
  hall: SportsHall;
  bookings: UnitBooking[];
  now: string;
}

/**
 * Buildings, bookings, and rules for the room form. Borrowers see every building; an admin
 * fakultas passes `{ fakultasId }` to see only the faculty's buildings (Laravel enforces it).
 */
export async function getRoomReservationOptions(scope?: { fakultasId: string | null }): Promise<RoomReservationOptions> {
  await connection();
  const now = new Date();
  // TODO: replace with the orval clients for buildings/floor plans, room availability, and rules (no-store).
  // Availability should become a query per date once TanStack Query is set up, instead of a week of bookings.
  const buildings = scope ? MOCK_BUILDINGS.filter((building) => building.fakultasId === scope.fakultasId) : MOCK_BUILDINGS;
  return { buildings, bookings: buildRoomBookingsMock(now), now: now.toISOString(), rules: MOCK_ROOM_RULES };
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

/** Active vehicles, for an admin who assigns one while booking (Reservasi Internal). */
export async function getActiveVehicles(): Promise<Vehicle[]> {
  await connection();
  // TODO: replace with the orval client for vehicles, filtered to active ones and free on the chosen dates.
  return MOCK_VEHICLES.filter((vehicle) => vehicle.isActive);
}
