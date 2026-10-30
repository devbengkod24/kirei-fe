import { describe, expect, it } from "vitest";
import { toSportsHallReservationRequest, toVehicleReservationRequest } from "./createReservation";

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
      status: "menunggu_konfirmasi",
    });
  });
});
