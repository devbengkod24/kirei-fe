import { describe, expect, it } from "vitest";
import type { Room } from "@/types/room";
import { managedByLabel, roomManagedBy } from "./room-labels";
import { applyRoomEdits, editManyRooms } from "./roomEdits";

const room = (id: string, extra: Partial<Room> = {}): Room => ({
  id,
  code: id.toUpperCase(),
  type: "ruang_kelas",
  buildingId: "gedung-h",
  floor: 5,
  isActive: true,
  photoUrl: null,
  plan: null,
  ...extra,
});

describe("editManyRooms", () => {
  const rooms = [room("a"), room("b"), room("c")];

  it("changes only the chosen rooms", () => {
    const edits = editManyRooms(rooms, {}, new Set(["a", "c"]), { photoUrl: "/foto.jpg" });
    expect(applyRoomEdits(rooms, edits).map((item) => item.photoUrl)).toEqual(["/foto.jpg", null, "/foto.jpg"]);
  });

  it("keeps earlier edits of a room and adds the new change on top", () => {
    const earlier = { a: room("a", { code: "A-BARU", isActive: false }) };
    const edits = editManyRooms(rooms, earlier, new Set(["a"]), { managedBy: "universitas" });
    expect(edits.a).toMatchObject({ code: "A-BARU", isActive: false, managedBy: "universitas" });
  });
});

describe("roomManagedBy", () => {
  it("defaults to the building admin in a faculty building and to admin universitas elsewhere", () => {
    expect(roomManagedBy(room("a"), { fakultasId: "fik" })).toBe("gedung");
    expect(roomManagedBy(room("a"), { fakultasId: null })).toBe("universitas");
    expect(roomManagedBy(room("a", { managedBy: "universitas" }), { fakultasId: "fik" })).toBe("universitas");
  });

  it("reads as the building's admin or admin universitas", () => {
    expect(managedByLabel("gedung", "Gedung H")).toBe("Admin Gedung H");
    expect(managedByLabel("universitas", "Gedung H")).toBe("Admin Universitas");
  });
});
