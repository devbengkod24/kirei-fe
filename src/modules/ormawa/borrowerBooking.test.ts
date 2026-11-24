import { describe, expect, it } from "vitest";
import { BOOKING_MODES } from "@/shared/reservation-form/bookingMode";
import { borrowerBooking } from "./borrowerBooking";

describe("borrowerBooking", () => {
  it("never asks a dosen for a letter or offers a draft, for any type", () => {
    const { mode, links } = borrowerBooking("dosen");
    expect(BOOKING_MODES[mode]).toMatchObject({ withLetter: false, withDraft: false });
    expect(links.drafts).toBeUndefined();
  });

  it("gives organisasi (ormawa and UKM) the letter and drafts for every type", () => {
    const { mode, links } = borrowerBooking("organisasi");
    expect(BOOKING_MODES[mode]).toMatchObject({ withLetter: true, withDraft: true });
    expect(links.drafts).toBe("/reservasi/draft");
  });
});
