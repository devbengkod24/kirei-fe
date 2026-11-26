// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { Building, Room } from "@/types/room";
import { RoomManager } from "./RoomManager";

const BUILDINGS: Building[] = [{ id: "gedung-h", name: "Gedung H", fakultasId: "fik", floors: [5] }];
const ROOMS: Room[] = [
  {
    id: "room-h-5-1",
    code: "H.5.1",
    type: "ruang_kelas",
    buildingId: "gedung-h",
    floor: 5,
    isActive: true,
    photoUrl: null,
    plan: null,
  },
];

afterEach(cleanup);

describe("RoomManager", () => {
  it("shows room details without a per-room QR button", () => {
    render(<RoomManager buildings={BUILDINGS} rooms={ROOMS} canChangeManager={false} />);

    expect(screen.getByRole("heading", { name: "Kelas H.5.1" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: /QR/i })).toBeNull();
  });
});
