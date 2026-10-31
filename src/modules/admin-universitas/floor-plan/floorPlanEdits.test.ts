import { describe, expect, it } from "vitest";
import type { Floor, FloorPlanRoom } from "@/types/facility";
import { MOCK_BUILDINGS } from "@/mocks/facilities";
import { GRID, fitRoom, gridSize, newRoom, roomCodeErrors, suggestRoomCode } from "./floorPlanEdits";

const room = (code: string, x = 0, y = 0, width = 50, height = 50): FloorPlanRoom => ({
  id: `room-${code}`,
  code,
  category: "kelas",
  photoUrl: null,
  x,
  y,
  width,
  height,
});

// A plan a little wider than its whole cells: still 18 columns and 12 rows of 25.
const floor = (rooms: FloorPlanRoom[]): Floor => ({ id: "f", number: 5, planWidth: 467, planHeight: 300, rooms });

describe("fitRoom", () => {
  it("snaps position and size to whole grid cells", () => {
    expect(fitRoom({ x: 37, y: 12, width: 101, height: 49 }, floor([]))).toEqual({ x: 25, y: 0, width: 100, height: 50 });
  });

  it("keeps at least one cell and stays within the whole cells of the floor", () => {
    expect(gridSize(floor([]))).toEqual({ columns: 18, rows: 12 });
    expect(fitRoom({ x: 0, y: 0, width: 3, height: 999 }, floor([]))).toEqual({ x: 0, y: 0, width: GRID, height: 300 });
    expect(fitRoom({ x: 460, y: 290, width: 50, height: 50 }, floor([]))).toEqual({ x: 400, y: 250, width: 50, height: 50 });
  });
});

describe("sample floor plans", () => {
  it("are laid on the grid, so the editor opens them unchanged", () => {
    for (const building of MOCK_BUILDINGS) {
      for (const level of building.floors) {
        expect(level.planWidth % GRID).toBe(0);
        expect(level.planHeight % GRID).toBe(0);
        for (const item of level.rooms) {
          const { x, y, width, height } = item;
          expect(fitRoom(item, level), `${item.code}`).toEqual({ x, y, width, height });
        }
      }
    }
  });
});

describe("suggestRoomCode", () => {
  it("continues the floor's numbering", () => {
    expect(suggestRoomCode(floor([room("H.5.2"), room("H.5.14"), room("H.5.3")]))).toBe("H.5.15");
  });

  it("leaves the code empty when there is no pattern", () => {
    expect(suggestRoomCode(floor([]))).toBe("");
    expect(suggestRoomCode(floor([room("Aula")]))).toBe("");
  });
});

describe("newRoom", () => {
  it("takes the first free 2 × 2 spot on the grid", () => {
    expect(newRoom(floor([]), "room-new")).toMatchObject({ x: 0, y: 0, width: 50, height: 50, code: "" });
    const added = newRoom(floor([room("H.5.1", 0, 0, 50, 50)]), "room-new");
    expect(added).toMatchObject({ id: "room-new", code: "H.5.2", x: 50, y: 0 });
  });
});

describe("roomCodeErrors", () => {
  it("flags empty and duplicate codes, ignoring case and spaces", () => {
    const errors = roomCodeErrors(floor([room("H.5.1"), { ...room("h.5.1 "), id: "dup" }, { ...room(""), id: "empty" }]));
    expect(errors.get("dup")).toBe("Kode h.5.1 sudah dipakai di lantai ini.");
    expect(errors.get("empty")).toBe("Isi kode ruangan.");
    expect(errors.has("room-H.5.1")).toBe(false);
  });
});
