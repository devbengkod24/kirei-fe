import { Card } from "@/components/ui/Card";
import { formatLongDateWIB, formatTimeRangeWIB } from "@/lib/date";
import type { ReservationRecord } from "@/types/reservation";
import { ReservationStatusBadge } from "@/shared/reservation/ReservationStatusBadge";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <dt className="text-primary">{label}</dt>
      <dd className="break-words">{children}</dd>
    </div>
  );
}

export function ActiveReservationCard({ reservation }: { reservation: ReservationRecord }) {
  const { reschedule } = reservation;

  return (
    <Card as="article" className="flex flex-col gap-2 p-3">
      <div className="flex flex-wrap items-start gap-2">
        <ReservationStatusBadge status={reservation.status} />
        {reschedule && (
          <p className="rounded-sm bg-primary-soft px-2 py-1 text-[11px] text-primary italic">
            Jadwal dipindah admin dari {formatLongDateWIB(reschedule.previousStartsAt)},{" "}
            {formatTimeRangeWIB(reschedule.previousStartsAt, reschedule.previousEndsAt)}. Alasan: {reschedule.reason}
          </p>
        )}
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs sm:grid-cols-[1fr_1fr_auto]">
        <div className="flex flex-col gap-3">
          <Field label="Email">{reservation.bookerEmail}</Field>
          <Field label="Nama Pemesan">{reservation.bookerName}</Field>
        </div>
        <div className="flex flex-col gap-3">
          <Field label="Waktu Reservasi">
            {formatLongDateWIB(reservation.startsAt)}
            <br />
            {formatTimeRangeWIB(reservation.startsAt, reservation.endsAt)}
          </Field>
          <Field label="Tipe Reservasi">{RESERVATION_TYPE_LABEL[reservation.type]}</Field>
        </div>
        <Field label="Dipinjam">{reservation.unitName}</Field>
      </dl>
    </Card>
  );
}
