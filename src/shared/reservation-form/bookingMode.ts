/**
 * Who a booking form is for:
 * - "request": a borrower asks; needs a phone number and loan letter (or a draft), then waits
 *   for the admin of the building's faculty.
 * - "request_without_letter": a borrower who needs no loan letter; still waits for approval, and
 *   has no draft, since a draft only waits for the letter.
 * - "request_without_draft": a borrower who must send the loan letter with the request but has no
 *   drafts, e.g. a dosen booking a vehicle.
 * - "internal": an admin books for the campus (Reservasi Internal); no phone, letter, draft, or
 *   approval, the reservation is created right away.
 */
export type BookingMode = "request" | "request_without_letter" | "request_without_draft" | "internal";

export interface BookingModeSettings {
  askPhone: boolean;
  withLetter: boolean;
  /** Whether "Simpan Draft" is offered; only a borrower who has a draft list gets it. */
  withDraft: boolean;
  /** Whether another faculty's admin approves; internal bookings need no approval. */
  needsApproval: boolean;
  requesterLabel: string;
  /** Replaces the default "waiting for approval" text in the result, or undefined to keep it. */
  submittedText?: string;
}

export const BOOKING_MODES: Record<BookingMode, BookingModeSettings> = {
  request: { askPhone: true, withLetter: true, withDraft: true, needsApproval: true, requesterLabel: "Peminjam" },
  request_without_letter: { askPhone: true, withLetter: false, withDraft: false, needsApproval: true, requesterLabel: "Peminjam" },
  request_without_draft: { askPhone: true, withLetter: true, withDraft: false, needsApproval: true, requesterLabel: "Peminjam" },
  internal: {
    askPhone: false,
    withLetter: false,
    withDraft: false,
    needsApproval: false,
    requesterLabel: "Pemesan",
    submittedText: "sudah dibuat.",
  },
};
