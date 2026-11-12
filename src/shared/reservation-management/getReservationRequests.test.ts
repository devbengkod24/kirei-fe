import { describe, expect, it, vi } from "vitest";

vi.mock("next/server", () => ({ connection: async () => {} }));

const { getReservationCandidates, getReservationRequests } = await import("./getReservationRequests");

describe("getReservationCandidates", () => {
  it("scopes browser-made requests by every room the booking form offers", async () => {
    const fik = (await getReservationCandidates({ fakultasId: "fik" })).roomCodes;
    expect(fik).toEqual(expect.arrayContaining(["H.5.1", "H.5.13", "H.5.14", "H.7"]));
    expect(fik).not.toContain("E.2.1");
    expect(fik).not.toContain("R.1.1");

    const university = (await getReservationCandidates({ fakultasId: null })).roomCodes;
    expect(university).toEqual(expect.arrayContaining(["H.5.13", "E.2.1", "R.1.1"]));
  });
});

describe("getReservationRequests", () => {
  it("keeps rooms as the default type, for the admin fakultas pages", async () => {
    const rooms = await getReservationRequests({ fakultasId: "fik" }, "persetujuan");
    expect(rooms.length).toBeGreaterThan(0);
    expect(rooms.every((reservation) => reservation.type === "ruangan")).toBe(true);
  });

  it("returns only the requested type", async () => {
    for (const tipe of ["gor", "kendaraan"] as const) {
      const requests = await getReservationRequests({ fakultasId: null }, "riwayat", tipe);
      expect(requests.length).toBeGreaterThan(0);
      expect(requests.every((reservation) => reservation.type === tipe)).toBe(true);
    }
  });

  it("lets the faculty scope narrow rooms but not GOR or vehicles", async () => {
    // The sample rooms all belong to FIK.
    expect(await getReservationRequests({ fakultasId: "feb" }, "persetujuan", "ruangan")).toEqual([]);
    const gorAll = await getReservationRequests({ fakultasId: null }, "persetujuan", "gor");
    expect(await getReservationRequests({ fakultasId: "feb" }, "persetujuan", "gor")).toEqual(gorAll);
  });

  it("leaves pending vehicle requests without a vehicle", async () => {
    const pending = await getReservationRequests({ fakultasId: null }, "persetujuan", "kendaraan");
    expect(pending.every((reservation) => reservation.roomName === "" && reservation.trip)).toBe(true);
  });
});
