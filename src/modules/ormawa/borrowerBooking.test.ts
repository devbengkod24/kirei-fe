import { describe, expect, it } from "vitest";
import { BOOKING_MODES } from "@/shared/reservation-form/bookingMode";
import { borrowerBooking } from "./borrowerBooking";

describe("borrowerBooking", () => {
  it("asks a dosen for a letter only when booking a vehicle, never with a draft", () => {
    for (const tipe of ["ruangan", "gor"] as const) {
      const { mode, links } = borrowerBooking("dosen", tipe);
      expect(BOOKING_MODES[mode]).toMatchObject({ withLetter: false, withDraft: false });
      expect(links.drafts).toBeUndefined();
    }
    const vehicle = borrowerBooking("dosen", "kendaraan");
    expect(BOOKING_MODES[vehicle.mode]).toMatchObject({ withLetter: true, withDraft: false });
    expect(vehicle.links.drafts).toBeUndefined();
  });

  it("gives organisasi (ormawa and UKM) the letter and drafts for every type", () => {
    for (const tipe of ["ruangan", "gor", "kendaraan"] as const) {
      const { mode, links } = borrowerBooking("organisasi", tipe);
      expect(BOOKING_MODES[mode]).toMatchObject({ withLetter: true, withDraft: true });
      expect(links.drafts).toBe("/reservasi/draft");
    }
  });
});
