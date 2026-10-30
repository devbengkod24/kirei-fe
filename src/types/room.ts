export type RoomType = "ruang_kelas" | "meeting_room" | "auditorium" | "gallery";

export interface Building {
  id: string;
  name: string;
  /** null for university buildings */
  fakultasId: string | null;
  floors: number[];
}

/** Position on the floor plan, in percent of the plan's width and height. */
export interface PlanRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Room {
  id: string;
  /** e.g. "H.5.1" */
  code: string;
  type: RoomType;
  buildingId: string;
  floor: number;
  isActive: boolean;
  photoUrl: string | null;
  /** null until the room is placed on the floor plan */
  plan: PlanRect | null;
}
