import type { ReservationRequest, ReservationType } from "@/types/reservation";

export interface TypeColumn {
  header: string;
  cell: (reservation: ReservationRequest) => React.ReactNode;
  nowrap?: boolean;
}

/** Columns between "Nama Pemesan" and "Waktu" that depend on what is reserved. */
export const TYPE_COLUMNS: Record<ReservationType, TypeColumn[]> = {
  ruangan: [{ header: "Ruangan", cell: (reservation) => reservation.roomName }],
  kendaraan: [
    // The vehicle type asked for, when the request has one; the admin assigns the actual units.
    {
      header: "Tujuan",
      cell: (reservation) =>
        reservation.trip ? (
          <span className="flex flex-col">
            {reservation.trip.destination}
            <span className="text-muted">
              {reservation.trip.participants} orang
              {reservation.trip.vehicle && `, ${reservation.trip.vehicle.name} ${reservation.trip.vehicle.units} unit`}
            </span>
          </span>
        ) : (
          "-"
        ),
    },
  ],
  // One venue, so the sport takes the unit column's place.
  gor: [{ header: "Kegiatan", cell: (reservation) => reservation.activity ?? "-" }],
};
