import { describe, expect, it } from "vitest";
import { activeBorrowers, ownReservationFigures, roomRequestsInScope, todaysReservations, weeklyCounts } from "./liveDashboard";
import type { MockReservation, MockReservationState } from "./reservationStore";

const TODAY = "2026-11-16";

function request(id: string, dateKey: string, extra: Partial<MockReservation> = {}): MockReservation {
  return {
    id,
    type: "ruangan",
    status: "menunggu_persetujuan",
    startsAt: `${dateKey}T02:00:00.000Z`,
    endsAt: `${dateKey}T04:00:00.000Z`,
    buildingName: "Gedung H",
    roomName: "H.5.1",
    borrowerName: "HMTI",
    borrowerDetail: "Ormawa",
    phone: null,
    purpose: "Rapat",
    letterFileName: null,
    letterUrl: null,
    rejectionReason: null,
    ownerId: "usr-1",
    ownerEmail: "hmti@dinus.ac.id",
    createdAt: "2026-11-10T00:00:00.000Z",
    ...extra,
  };
}

const STATE: MockReservationState = {
  created: [
    request("a", TODAY),
    request("b", TODAY, { roomName: "H.5.2" }),
    request("c", "2026-11-03", { borrowerName: "BEM", ownerId: "usr-2" }),
    request("d", "2026-11-25", { buildingName: "Gedung E", roomName: "E.2.1" }),
    request("e", "2026-12-01"),
  ],
  decisions: {
    a: { status: "disetujui", rejectionReason: null, decidedAt: "2026-11-11T00:00:00.000Z" },
    c: { status: "ditolak", rejectionReason: "Bentrok", decidedAt: "2026-11-11T00:00:00.000Z" },
  },
};

const FIK = { roomCodes: ["H.5.1", "H.5.2"], buildingNames: ["Gedung H"] };

describe("live dashboard figures", () => {
  it("counts only rooms in the admin's scope, with decisions applied", () => {
    const requests = roomRequestsInScope(STATE, FIK);
    expect(requests.map((item) => item.id)).toEqual(["a", "b", "c", "e"]);
    expect(requests[0].status).toBe("disetujui");
  });

  it("lists today's approved reservations and leaves pending ones out", () => {
    expect(todaysReservations(roomRequestsInScope(STATE, FIK), TODAY).map((item) => item.id)).toEqual(["a"]);
  });

  it("puts this month's outcomes in their week", () => {
    expect(weeklyCounts(roomRequestsInScope(STATE, FIK), TODAY)).toEqual({ succeeded: [0, 0, 1, 0], cancelled: [1, 0, 0, 0] });
  });

  it("counts borrowers with a request this month", () => {
    expect(activeBorrowers(roomRequestsInScope(STATE, FIK), TODAY)).toBe(2);
  });

  it("gives a borrower their own totals and today's reservation", () => {
    const own = ownReservationFigures(STATE, "usr-1", TODAY);
    expect(own.totalReservations).toBe(4);
    expect(own.todayReservation).toMatchObject({ id: "a", roomName: "H.5.1", status: "disetujui" });
    expect(own.reservationStarts).toHaveLength(4);
    // A rejected request no longer holds a day on the calendar.
    expect(ownReservationFigures(STATE, "usr-2", TODAY)).toEqual({ totalReservations: 1, todayReservation: null, reservationStarts: [] });
  });
});
