import { Card } from "@/components/ui/Card";
import { formatDateLongWIB, formatDayRangeWIB, formatTimeRangeWIB } from "@/lib/date";
import type { ReservationRecord } from "@/types/reservation";
import { ReservationStatusBadge } from "@/shared/reservation/ReservationStatusBadge";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import { tripText } from "@/shared/reservation/vehicleTrip";

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex min-w-0 flex-col gap-1 ${className}`}>
      <dt className="text-primary">{label}</dt>
      <dd className="break-words">{children}</dd>
    </div>
  );
}

/** The driver shows once a trip is approved; until the admin assigns one it says so. */
export const hasDriverInfo = (reservation: ReservationRecord) =>
  reservation.type === "kendaraan" && (reservation.status === "disetujui" || reservation.status === "selesai");

export function ActiveReservationCard({ reservation }: { reservation: ReservationRecord }) {
  return (
    <Card as="article" className="flex flex-col gap-2 p-3">
      <div className="flex flex-wrap items-start gap-2">
        <ReservationStatusBadge status={reservation.status} size="sm" />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs sm:grid-cols-[1fr_1fr_auto]">
        <div className="flex flex-col gap-3">
          <Field label="Email">{reservation.bookerEmail}</Field>
          <Field label="Nama Pemesan">{reservation.bookerName}</Field>
        </div>
        <div className="flex flex-col gap-3">
          <Field label="Waktu Reservasi">
            {/* Vehicles are booked by whole days, so only the dates are shown. */}
            {reservation.type === "kendaraan" ? (
              formatDayRangeWIB(reservation.startsAt, reservation.endsAt)
            ) : (
              <>
                {formatDateLongWIB(reservation.startsAt)}
                <br />
                {formatTimeRangeWIB(reservation.startsAt, reservation.endsAt)}
              </>
            )}
          </Field>
          <Field label="Tipe Reservasi">{RESERVATION_TYPE_LABEL[reservation.type]}</Field>
        </div>
        {/* There is only one GOR, so naming it adds nothing. The empty column keeps the others where they sit on every card. */}
        {reservation.type === "gor" ? (
          <div aria-hidden="true" className="invisible hidden sm:block">
            Dipinjam
          </div>
        ) : (
          <Field label="Dipinjam">{reservation.unitName}</Field>
        )}
        {reservation.trip && (
          <>
            <Field label="Tujuan" className="col-span-2">
              {reservation.trip.destination}
            </Field>
            <Field label="Perjalanan">{tripText(reservation.trip)}</Field>
          </>
        )}
        {hasDriverInfo(reservation) && (
          <>
            <Field label="Nama Sopir" className="col-span-2">
              {reservation.driver?.name ?? "Belum ditentukan"}
            </Field>
            <Field label="No HP Sopir">
              {reservation.driver ? (
                <a href={`tel:${reservation.driver.phone}`} className="text-primary underline-offset-2 hover:underline">
                  {reservation.driver.phone}
                </a>
              ) : (
                "Belum ditentukan"
              )}
            </Field>
          </>
        )}
      </dl>
    </Card>
  );
}
