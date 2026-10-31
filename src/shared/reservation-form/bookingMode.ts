/**
 * Who a booking form is for:
 * - "request": a borrower asks; needs a phone number and loan letter (or a draft), then waits
 *   for the admin of the building's faculty.
 * - "internal": an admin books for the campus (Reservasi Internal); no phone, letter, draft, or
 *   approval, the reservation is created right away.
 */
export type BookingMode = "request" | "internal";

export interface BookingModeSettings {
  askPhone: boolean;
  withLetter: boolean;
  /** Whether another faculty's admin approves; internal bookings need no approval. */
  needsApproval: boolean;
  requesterLabel: string;
  /** Replaces the default "waiting for approval" text in the result, or undefined to keep it. */
  submittedText?: string;
}

export const BOOKING_MODES: Record<BookingMode, BookingModeSettings> = {
  request: { askPhone: true, withLetter: true, needsApproval: true, requesterLabel: "Peminjam" },
  internal: {
    askPhone: false,
    withLetter: false,
    needsApproval: false,
    requesterLabel: "Pemesan",
    submittedText: "sudah dibuat.",
  },
};
