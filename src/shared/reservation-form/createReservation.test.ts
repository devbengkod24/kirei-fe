import { describe, expect, it } from "vitest";
import { toMockReservation, toSportsHallReservationRequest, toVehicleReservationRequest } from "./createReservation";

describe("reservation requests", () => {
  it("sends a vehicle trip as whole WIB days, ending at midnight after the last day", () => {
    const request = toVehicleReservationRequest({
      phone: "0857111211",
      destination: "Bali",
      participants: 12,
      activity: "Kunjungan studi",
      startDate: "2026-10-20",
      endDate: "2026-10-21",
      letter: null,
      intent: "draft",
    });
    expect(request).toMatchObject({
      type: "kendaraan",
      // 20 Oct 00:00 WIB and 22 Oct 00:00 WIB
      starts_at: "2026-10-19T17:00:00.000Z",
      ends_at: "2026-10-21T17:00:00.000Z",
      status: "draft",
    });
  });

  it("sends the GOR slot range in UTC with the hall id", () => {
    const request = toSportsHallReservationRequest(
      { date: "2026-10-20", startTime: "11:00", endTime: "13:00", activity: "Badminton", notes: "", letter: null, intent: "submit" },
      "gor-udinus",
    );
    expect(request).toMatchObject({
      type: "gor",
      hall_id: "gor-udinus",
      starts_at: "2026-10-20T04:00:00.000Z",
      ends_at: "2026-10-20T06:00:00.000Z",
      status: "menunggu_persetujuan",
    });
  });
});

describe("demo store listing", () => {
  const owner = { id: "usr-ormawa", name: "HMTI", email: "hmti@example.test", detail: "Organisasi" };

  it("lists a room request by room code and building, keeping only the letter's file name", () => {
    const letter = new File(["%PDF"], "surat.pdf", { type: "application/pdf" });
    const request = { ...toVehicleRequestBase(), type: "ruangan" as const, phone: "0812", purpose: "Rapat", letter };
    const reservation = toMockReservation(request, { owner, unitName: "H.5.2", buildingName: "Gedung H", purpose: "Rapat" }, new Date(0));
    expect(reservation).toMatchObject({
      type: "ruangan",
      status: "menunggu_persetujuan",
      roomName: "H.5.2",
      buildingName: "Gedung H",
      borrowerName: "HMTI",
      borrowerDetail: "Organisasi",
      phone: "0812",
      letterFileName: "surat.pdf",
      letterUrl: null,
      ownerId: "usr-ormawa",
    });
  });

  it("lists a vehicle trip without a vehicle, like the sample requests", () => {
    const request = toVehicleReservationRequest({
      phone: "0857111211",
      destination: "Kudus",
      participants: 8,
      activity: "Kunjungan industri",
      startDate: "2026-11-20",
      endDate: "2026-11-20",
      letter: null,
      intent: "submit",
    });
    const reservation = toMockReservation(request, { owner, unitName: "Kendaraan ke Kudus", purpose: "Kunjungan industri" });
    expect(reservation).toMatchObject({ roomName: "", buildingName: "Kendaraan", trip: { destination: "Kudus", participants: 8 } });
  });
});

function toVehicleRequestBase() {
  return {
    type: "kendaraan" as const,
    starts_at: "2026-11-20T02:00:00.000Z",
    ends_at: "2026-11-20T04:00:00.000Z",
    status: "menunggu_persetujuan",
    letter: null,
  };
}
