import { ORGANISATION_MIN_DAYS_AHEAD } from "@/config/reservation";

/**
 * Who a booking form is for:
 * - "request": a borrower asks; needs a phone number and loan letter (or a draft), then waits
 *   for the admin of the building's faculty.
 * - "request_without_letter": a borrower who needs no loan letter; still waits for approval, and
 *   has no draft, since a draft only waits for the letter.
 * - "internal": an admin books for the campus (Reservasi Internal); no phone, letter, draft, or
 *   approval, the reservation is created right away.
 */
export type BookingMode = "request" | "request_without_letter" | "internal";

export interface BookingModeSettings {
  askPhone: boolean;
  withLetter: boolean;
  /** Whether another faculty's admin approves; internal bookings need no approval. */
  needsApproval: boolean;
  requesterLabel: string;
  /** Days from today before the first bookable room or GOR day; 2 bars ormawa and UKM from H-0 and H-1. */
  minDaysAhead: number;
  /** Replaces the default "waiting for approval" text in the result, or undefined to keep it. */
  submittedText?: string;
}

export const BOOKING_MODES: Record<BookingMode, BookingModeSettings> = {
  // Only ormawa and UKM book with the "request" mode, so the H-0/H-1 rule lives here.
  request: {
    askPhone: true,
    withLetter: true,
    needsApproval: true,
    requesterLabel: "Peminjam",
    minDaysAhead: ORGANISATION_MIN_DAYS_AHEAD,
  },
  request_without_letter: { askPhone: true, withLetter: false, needsApproval: true, requesterLabel: "Peminjam", minDaysAhead: 0 },
  internal: {
    askPhone: false,
    withLetter: false,
    needsApproval: false,
    minDaysAhead: 0,
    requesterLabel: "Pemesan",
    submittedText: "sudah dibuat.",
  },
};
