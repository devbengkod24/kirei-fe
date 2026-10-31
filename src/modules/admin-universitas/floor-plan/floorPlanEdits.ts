import type { Floor, FloorPlanRoom, RoomCategory } from "@/types/facility";

/** Size of one grid cell, in plan units. Rooms always start on a grid line and span whole cells. */
export const GRID = 25;

export type RoomRect = Pick<FloorPlanRoom, "x" | "y" | "width" | "height">;
type PlanSize = Pick<Floor, "planWidth" | "planHeight">;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Whole cells that fit across and down the floor. */
export function gridSize(floor: PlanSize) {
  return { columns: Math.max(1, Math.floor(floor.planWidth / GRID)), rows: Math.max(1, Math.floor(floor.planHeight / GRID)) };
}

/**
 * Snaps a room to the grid and keeps it on the floor: it starts on a grid line, spans at least
 * one whole cell, and never goes past the last whole cell. Size wins over position, so a room
 * grown past the edge is pulled back in.
 */
export function fitRoom(rect: RoomRect, floor: PlanSize): RoomRect {
  const { columns, rows } = gridSize(floor);
  const widthCells = clamp(Math.round(rect.width / GRID), 1, columns);
  const heightCells = clamp(Math.round(rect.height / GRID), 1, rows);
  return {
    x: clamp(Math.round(rect.x / GRID), 0, columns - widthCells) * GRID,
    y: clamp(Math.round(rect.y / GRID), 0, rows - heightCells) * GRID,
    width: widthCells * GRID,
    height: heightCells * GRID,
  };
}

/** Allowed floor size, in cells, for both columns and rows. */
export const FLOOR_CELLS = { min: 4, max: 60 };

/**
 * Sets the floor to whole cells. Growing always works; shrinking is refused while a room would be
 * cut off, naming those rooms, so the plan never changes behind the admin's back.
 */
export function resizeFloor(floor: Floor, columns: number, rows: number): { floor: Floor } | { error: string } {
  const { min, max } = FLOOR_CELLS;
  if (![columns, rows].every((value) => Number.isInteger(value) && value >= min && value <= max)) {
    return { error: `Ukuran lantai harus bilangan bulat ${min}–${max} kotak.` };
  }
  const planWidth = columns * GRID;
  const planHeight = rows * GRID;
  const cut = floor.rooms.filter((room) => room.x + room.width > planWidth || room.y + room.height > planHeight);
  if (cut.length > 0) {
    const codes = cut.map((room) => room.code.trim() || "tanpa kode").join(", ");
    return { error: `Ruangan ${codes} berada di luar ukuran baru. Pindahkan atau kecilkan dulu.` };
  }
  return { floor: { ...floor, planWidth, planHeight } };
}

/** Next code on the floor from its existing pattern, e.g. "H.5.14" → "H.5.15". Empty when there is no pattern. */
export function suggestRoomCode(floor: Floor): string {
  let prefix = "";
  let highest = 0;
  for (const room of floor.rooms) {
    const match = /^(.*\.)(\d+)$/.exec(room.code);
    if (!match) continue;
    const number = Number(match[2]);
    if (number > highest) {
      highest = number;
      prefix = match[1];
    }
  }
  return prefix ? `${prefix}${highest + 1}` : "";
}

const overlaps = (a: RoomRect, b: RoomRect) => a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;

/** The first other room on the floor that the rect would cover, if any. Rooms may touch, not overlap. */
export function collidingRoom(floor: Floor, roomId: string, rect: RoomRect): FloorPlanRoom | undefined {
  return floor.rooms.find((room) => room.id !== roomId && overlaps(room, rect));
}

/** A new 2 × 2 room in the first free spot, scanning row by row; the top-left corner when the floor is full. */
export function newRoom(floor: Floor, id: string, category: RoomCategory = "kelas"): FloorPlanRoom {
  const { columns, rows } = gridSize(floor);
  const size = { width: Math.min(2, columns) * GRID, height: Math.min(2, rows) * GRID };
  let spot = { x: 0, y: 0 };
  search: for (let row = 0; row * GRID + size.height <= rows * GRID; row++) {
    for (let column = 0; column * GRID + size.width <= columns * GRID; column++) {
      const candidate = { x: column * GRID, y: row * GRID, ...size };
      if (!floor.rooms.some((room) => overlaps(room, candidate))) {
        spot = candidate;
        break search;
      }
    }
  }
  return { id, code: suggestRoomCode(floor), category, photoUrl: null, ...fitRoom({ ...spot, ...size }, floor) };
}

/** Problems that block saving, per room id. Codes must be filled in and unique on the floor. */
export function roomCodeErrors(floor: Floor): Map<string, string> {
  const errors = new Map<string, string>();
  const seen = new Map<string, string>();
  for (const room of floor.rooms) {
    const code = room.code.trim().toUpperCase();
    if (!code) {
      errors.set(room.id, "Isi kode ruangan.");
    } else if (seen.has(code)) {
      errors.set(room.id, `Kode ${room.code.trim()} sudah dipakai di lantai ini.`);
    } else {
      seen.set(code, room.id);
    }
  }
  return errors;
}
