import type { BookingMode } from "@/shared/reservation-form/bookingMode";
import type { ReservationOwner } from "@/shared/reservation-store/reservationStore";
import type { CurrentUser, UserRole } from "@/types/user";
import { ORMAWA_ROUTES } from "./routes";

/** Ormawa send a letter or save a draft. Dosen book every type without a letter and have no drafts. */
export function borrowerBooking(role: UserRole): { mode: BookingMode; links: { history: string; drafts?: string } } {
  if (role === "dosen") {
    return { mode: "request_without_letter", links: { history: ORMAWA_ROUTES.reservationHistory } };
  }
  return { mode: "request", links: { history: ORMAWA_ROUTES.reservationHistory, drafts: ORMAWA_ROUTES.draftReservation } };
}

export const hasDrafts = (role: UserRole) => role !== "dosen";

/** The borrower as the admin sees them on a request. */
export function borrowerOwner(user: CurrentUser): ReservationOwner {
  return { id: user.id, name: user.name, email: user.email, detail: user.role === "dosen" ? "Dosen" : "Organisasi" };
}
