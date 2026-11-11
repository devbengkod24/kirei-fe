import { describe, expect, it } from "vitest";
import type { ReservationRecord, ReservationRequest } from "@/types/reservation";
import {
  addMockReservation,
  decideMockReservation,
  MOCK_RESERVATIONS_KEY,
  mergeAdminRequests,
  mergeOwnHistory,
  parseState,
  readSnapshot,
  resetMockReservations,
  type MockReservation,
} from "./reservationStore";

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    removeItem: (key: string) => void data.delete(key),
  };
}

const SEEDED: ReservationRequest = {
  id: "res-seed-1",
  type: "ruangan",
  status: "menunggu_persetujuan",
  startsAt: "2026-11-20T02:00:00.000Z",
  endsAt: "2026-11-20T04:00:00.000Z",
  buildingName: "Gedung H",
  roomName: "H.5.2",
  borrowerName: "HMTI",
  borrowerDetail: "Organisasi",
  phone: null,
  purpose: "Rapat",
  letterFileName: null,
  letterUrl: null,
  rejectionReason: null,
};

const created = (overrides: Partial<MockReservation> = {}): MockReservation => ({
  ...SEEDED,
  id: "mock-1",
  roomName: "H.5.3",
  ownerId: "usr-ormawa",
  ownerEmail: "hmti@example.test",
  createdAt: "2026-11-11T03:00:00.000Z",
  ...overrides,
});

describe("reservation store", () => {
  it("reads missing or foreign data as an empty store", () => {
    expect(parseState(null)).toEqual({ created: [], decisions: {} });
    expect(parseState("not json")).toEqual({ created: [], decisions: {} });
    expect(parseState(JSON.stringify({ created: [{ id: 1 }], decisions: {} }))).toEqual({ created: [], decisions: {} });
  });

  it("keeps created requests and decisions under one key, and forgets both on reset", () => {
    const storage = memoryStorage();
    expect(addMockReservation(created(), storage)).toBe(true);
    expect(decideMockReservation("res-seed-1", { status: "ditolak", rejectionReason: "Bentrok" }, new Date(0), storage)).toBe(true);

    const state = parseState(storage.getItem(MOCK_RESERVATIONS_KEY));
    expect(state.created.map((reservation) => reservation.id)).toEqual(["mock-1"]);
    expect(state.decisions["res-seed-1"]).toEqual({ status: "ditolak", rejectionReason: "Bentrok", decidedAt: "1970-01-01T00:00:00.000Z" });

    expect(resetMockReservations(storage)).toBe(true);
    expect(readSnapshot(storage)).toBe("");
  });

  it("reports when the browser cannot store anything", () => {
    expect(addMockReservation(created(), null)).toBe(false);
    expect(resetMockReservations(null)).toBe(false);
  });
});

describe("admin list", () => {
  it("adds this browser's requests only for the type and the rooms in scope", () => {
    const state = {
      created: [created(), created({ id: "mock-feb", roomName: "E.1" }), created({ id: "mock-gor", type: "gor", roomName: "GOR Udinus" })],
      decisions: {},
    };
    const ids = mergeAdminRequests([SEEDED], state, "ruangan", ["H.5.2", "H.5.3"]).map((reservation) => reservation.id);
    expect(ids).toEqual(["res-seed-1", "mock-1"]);
    expect(mergeAdminRequests([], state, "gor", null).map((reservation) => reservation.id)).toEqual(["mock-gor"]);
  });

  it("applies decisions to sample and created requests", () => {
    const state = {
      created: [created()],
      decisions: {
        "res-seed-1": { status: "disetujui" as const, rejectionReason: null, decidedAt: "" },
        "mock-1": { status: "ditolak" as const, rejectionReason: "Ruangan dipakai ujian.", decidedAt: "" },
      },
    };
    const [seed, mine] = mergeAdminRequests([SEEDED], state, "ruangan", null);
    expect(seed.status).toBe("disetujui");
    expect(mine).toMatchObject({ status: "ditolak", rejectionReason: "Ruangan dipakai ujian." });
  });
});

describe("borrower history", () => {
  const sample = { id: "res-history-1", type: "ruangan" } as ReservationRecord;

  it("adds only the borrower's own requests, with the admin's decision", () => {
    const state = {
      created: [created(), created({ id: "mock-other", ownerId: "usr-other" })],
      decisions: { "mock-1": { status: "ditolak" as const, rejectionReason: "Bentrok", decidedAt: "" } },
    };
    const records = mergeOwnHistory([sample], state, "ruangan", "usr-ormawa");
    expect(records.map((record) => record.id)).toEqual(["res-history-1", "mock-1"]);
    expect(records[1]).toMatchObject({
      status: "ditolak",
      rejectionReason: "Bentrok",
      unitName: "H.5.3",
      bookerEmail: "hmti@example.test",
    });
  });

  it("names a vehicle trip by its destination", () => {
    const trip = created({ id: "mock-trip", type: "kendaraan", roomName: "", trip: { destination: "Kudus", participants: 8 } });
    const [record] = mergeOwnHistory([], { created: [trip], decisions: {} }, "kendaraan", "usr-ormawa");
    expect(record.unitName).toBe("Kendaraan ke Kudus");
  });
});
