import type { BookingMode } from "@/shared/reservation-form/bookingMode";
import type { UserRole } from "@/types/user";
import { ORMAWA_ROUTES } from "./routes";

/** Dosen book without a loan letter, so they also have no drafts; ormawa send a letter or save a draft. */
export function borrowerBooking(role: UserRole): { mode: BookingMode; links: { history: string; drafts?: string } } {
  if (role === "dosen") return { mode: "request_without_letter", links: { history: ORMAWA_ROUTES.reservationHistory } };
  return { mode: "request", links: { history: ORMAWA_ROUTES.reservationHistory, drafts: ORMAWA_ROUTES.draftReservation } };
}

export const hasDrafts = (role: UserRole) => role !== "dosen";
