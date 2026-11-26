import type { ReservationRequest } from "@/types/reservation";

/** Defaults to false for older mock records created before hard copy tracking existed. */
export const isHardCopySubmitted = (reservation: Pick<ReservationRequest, "hardCopySubmitted">) =>
  Boolean(reservation.hardCopySubmitted);

export const hardCopyLabel = (submitted: boolean) => (submitted ? "Sudah" : "Belum");
