// TODO: match these shapes to the Laravel OpenAPI spec once the facility endpoints exist.

export type RoomCategory = "kelas" | "meeting" | "auditorium" | "galeri";

export interface FloorPlanRoom {
  id: string;
  /** e.g. "H.5.1" */
  code: string;
  category: RoomCategory;
  photoUrl: string | null;
  /** Seats, set by admin universitas in Kelola Denah; null until filled in. */
  capacity: number | null;
  /** Position and size on the floor plan, in the floor's plan units. */
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Floor {
  id: string;
  number: number;
  /** Size of the floor plan in plan units; rooms are placed relative to it. */
  planWidth: number;
  planHeight: number;
  rooms: FloorPlanRoom[];
}

export interface Building {
  id: string;
  name: string;
  /** null for university buildings */
  fakultasId: string | null;
  fakultasName: string | null;
  floors: Floor[];
}

/** The university sports hall. It has no faculty and is booked in fixed slots. */
export interface SportsHall {
  id: string;
  name: string;
  /** WIB wall-clock "HH:mm" */
  openTime: string;
  closeTime: string;
  slotMinutes: number;
  /** Activity types the hall can be booked for, e.g. "Badminton". */
  activities: string[];
}

/** A time range in which a unit (room, GOR) is already taken. */
export interface UnitBooking {
  unitId: string;
  /** ISO 8601 (UTC) */
  startsAt: string;
  /** ISO 8601 (UTC) */
  endsAt: string;
}

/**
 * A kind of campus vehicle and how many units the campus has of it. Borrowers ask for a trip;
 * the admin assigns one or more units, possibly several of the same kind.
 */
export interface Vehicle {
  id: string;
  name: string;
  /** Seats per unit, driver included. */
  capacity: number;
  /** Units the campus owns of this kind. */
  unitCount: number;
  isActive: boolean;
}
