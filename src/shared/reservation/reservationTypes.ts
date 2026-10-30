import type { ReservationType } from "@/types/reservation";

export const RESERVATION_TYPE_LABEL: Record<ReservationType, string> = {
  ruangan: "Ruangan",
  kendaraan: "Kendaraan",
  gor: "GOR",
};

/** Column header for the booked unit. GOR has a single venue, so the column is left out. */
export const RESERVATION_UNIT_LABEL: Record<ReservationType, string | null> = {
  ruangan: "Ruangan",
  kendaraan: "Kendaraan",
  gor: null,
};
