import { connection } from "next/server";
import {
  MOCK_BUILDINGS,
  MOCK_ROOM_RULES,
  MOCK_SPORTS_HALL,
  MOCK_VEHICLES,
  buildRoomBookingsMock,
  buildSportsHallBookingsMock,
} from "@/mocks/facilities";
import { getDataMode } from "@/lib/data-mode/getDataMode";
import { getMockLecturerSchedules } from "@/mocks/lecturerSchedules";
import { buildFacilityRequestsMock } from "@/mocks/reservations";
import { toWibDateKey } from "@/lib/date";
import type { Building, SportsHall, UnitBooking, Vehicle } from "@/types/facility";
import { lecturerScheduleBookings } from "./lecturerScheduleBookings";
import { vehicleBookings, type VehicleBooking } from "./vehicleAvailability";

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
  // The lecture schedule uploaded by each admin fakultas blocks its rooms for the whole semester.
  const lectures = lecturerScheduleBookings(getMockLecturerSchedules(), MOCK_BUILDINGS, toWibDateKey(now));
  // The "empty" data mode has no sample bookings or lectures; the form adds what was made in the browser.
  const seeded = (await getDataMode()) === "sample";
  return {
    buildings,
    bookings: seeded ? [...buildRoomBookingsMock(now), ...lectures] : [],
    now: now.toISOString(),
    rules: MOCK_ROOM_RULES,
  };
}

export async function getSportsHallReservationOptions(): Promise<SportsHallReservationOptions> {
  await connection();
  const now = new Date();
  // TODO: replace with the orval clients for the GOR and its bookings (no-store).
  const seeded = (await getDataMode()) === "sample";
  return { hall: MOCK_SPORTS_HALL, bookings: seeded ? buildSportsHallBookingsMock(now) : [], now: now.toISOString() };
}

export interface VehicleReservationOptions {
  /** Every vehicle type; the form offers only the active ones. */
  vehicles: Vehicle[];
  /** Units already held by waiting or approved requests, to tell which types are free on the chosen days. */
  bookings: VehicleBooking[];
  now: string;
}

/** Vehicle types and the units already taken. The borrower picks a type; the admin still assigns the units. */
export async function getVehicleReservationOptions(): Promise<VehicleReservationOptions> {
  await connection();
  const now = new Date();
  // TODO: replace with the orval clients for vehicles and their availability (no-store).
  const seeded = (await getDataMode()) === "sample";
  return {
    vehicles: MOCK_VEHICLES,
    bookings: seeded ? vehicleBookings(buildFacilityRequestsMock(now), MOCK_VEHICLES) : [],
    now: now.toISOString(),
  };
}
