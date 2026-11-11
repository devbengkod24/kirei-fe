import type { BookingMode } from "@/shared/reservation-form/bookingMode";
import type { ReservationOwner } from "@/shared/reservation-store/reservationStore";
import type { ReservationType } from "@/types/reservation";
import type { CurrentUser, UserRole } from "@/types/user";
import { ORMAWA_ROUTES } from "./routes";

/**
 * Ormawa send a letter or save a draft. Dosen have no drafts: they book rooms and the GOR without a
 * letter, but a vehicle still needs one. TODO: kirei-api must require the letter for dosen vehicles too.
 */
export function borrowerBooking(
  role: UserRole,
  tipe: ReservationType,
): { mode: BookingMode; links: { history: string; drafts?: string } } {
  if (role === "dosen") {
    const mode = tipe === "kendaraan" ? "request_without_draft" : "request_without_letter";
    return { mode, links: { history: ORMAWA_ROUTES.reservationHistory } };
  }
  return { mode: "request", links: { history: ORMAWA_ROUTES.reservationHistory, drafts: ORMAWA_ROUTES.draftReservation } };
}

export const hasDrafts = (role: UserRole) => role !== "dosen";

/** The borrower as the admin sees them on a request. */
export function borrowerOwner(user: CurrentUser): ReservationOwner {
  return { id: user.id, name: user.name, email: user.email, detail: user.role === "dosen" ? "Dosen" : "Organisasi" };
}
