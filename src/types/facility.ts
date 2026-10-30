// TODO: match these shapes to the Laravel OpenAPI spec once the facility endpoints exist.

export type RoomCategory = "kelas" | "meeting" | "auditorium" | "galeri";

export interface FloorPlanRoom {
  id: string;
  /** e.g. "H.5.1" */
  code: string;
  category: RoomCategory;
  photoUrl: string | null;
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

/** A time range in which a room is already taken. */
export interface RoomBooking {
  roomId: string;
  /** ISO 8601 (UTC) */
  startsAt: string;
  /** ISO 8601 (UTC) */
  endsAt: string;
}
