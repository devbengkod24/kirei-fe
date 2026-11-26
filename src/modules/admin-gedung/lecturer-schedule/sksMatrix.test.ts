import { describe, expect, it } from "vitest";
import type { ReservationRecord } from "@/types/reservation";
import type { ClassSchedule } from "@/types/schedule";
import { buildSksMatrix } from "./sksMatrix";

// 2026-11-26 in WIB: 07:00 WIB = 00:00Z
const wib = (time: string) => `2026-11-26T${String(Number(time.slice(0, 2)) - 7).padStart(2, "0")}:${time.slice(3)}:00.000Z`;

const SCHEDULE: ClassSchedule = {
  id: "sia-1",
  unitName: "H.5.5",
  startsAt: wib("09:30"),
  endsAt: wib("12:00"),
  courseName: "Kecerdasan Buatan",
  lecturerName: "Prof. Dr. Aris Marjuni, M.Kom.",
  classGroup: "A11.4501",
  sksSlot: 4,
  sksCount: 3,
};

const RESERVATION: ReservationRecord = {
  id: "res-1",
  type: "ruangan",
  status: "disetujui",
  startsAt: wib("15:30"),
  endsAt: wib("17:10"),
  bookerName: "HMTI",
  bookerEmail: "hmti@dinus.ac.id",
  unitName: "H.5.5",
  purpose: "Rapat koordinasi kegiatan",
  cancellationReason: null,
  rejectionReason: null,
};

describe("buildSksMatrix", () => {
  it("places SKS lecture entries into each occupied slot and reservations into overlapping slots", () => {
    const matrix = buildSksMatrix(["H.5.1", "H.5.5"], "2026-11-26", [SCHEDULE], [RESERVATION]);
    const h51 = matrix.get("H.5.1") ?? [];
    const h55 = matrix.get("H.5.5") ?? [];

    expect(h51).toHaveLength(15);
    expect(h51.every((cell) => cell.length === 0)).toBe(true);

    // Slots 4, 5, 6 (indexes 3, 4, 5) hold Kecerdasan Buatan
    expect(h55[2]).toEqual([]);
    expect(h55[3]).toEqual([{ kind: "siadin", schedule: SCHEDULE }]);
    expect(h55[4]).toEqual([{ kind: "siadin", schedule: SCHEDULE }]);
    expect(h55[5]).toEqual([{ kind: "siadin", schedule: SCHEDULE }]);
    expect(h55[6]).toEqual([]);

    // Slots 10 and 11 (indexes 9, 10: 15:30-16:20 and 16:20-17:10) hold the reservation
    expect(h55[8]).toEqual([]);
    expect(h55[9]).toEqual([{ kind: "reservasi", reservation: RESERVATION }]);
    expect(h55[10]).toEqual([{ kind: "reservasi", reservation: RESERVATION }]);
    expect(h55[11]).toEqual([]);
  });
});
