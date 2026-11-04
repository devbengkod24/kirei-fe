import { Card } from "@/components/ui/Card";
import { LinkPagination } from "@/components/ui/LinkPagination";
import { PerPageSelect } from "@/components/ui/PerPageSelect";
import { TABLE, TABLE_CELL, TABLE_HEAD_CELL, TABLE_ROW } from "@/components/ui/table";
import { formatDateShortWIB, formatTimeSpanWIB } from "@/lib/date";
import type { ReservationRecord, ReservationType } from "@/types/reservation";
import { ReservationStatusBadge } from "@/shared/reservation/ReservationStatusBadge";
import { RESERVATION_TYPE_LABEL, RESERVATION_UNIT_LABEL } from "@/shared/reservation/reservationTypes";
import { HISTORY_PARAMS, PER_PAGE_OPTIONS } from "./query";

export interface ReservationHistoryTableProps {
  tipe: ReservationType;
  items: ReservationRecord[];
  page: number;
  perPage: number;
  totalPages: number;
  prevHref: string | null;
  nextHref: string | null;
  /** Search params to keep when the page size changes (without page and page size). */
  baseParams: Record<string, string>;
}

const TH = `${TABLE_HEAD_CELL} text-left`;
const TD = TABLE_CELL;

/** Only a rejected reservation has a reason; other rows show "-" so the column stays aligned. */
const rejectionText = (reservation: ReservationRecord) =>
  reservation.status === "ditolak" ? (reservation.rejectionReason ?? "Alasan belum dicatat.") : "-";

function Purpose({ reservation }: { reservation: ReservationRecord }) {
  const rejected = reservation.status === "ditolak";
  const reason = rejected ? reservation.rejectionReason : reservation.cancellationReason;
  return (
    <>
      {reservation.purpose}
      {reason && (
        <span className="mt-1 block rounded-inner bg-danger-soft px-2 py-1 text-[11px] text-danger">
          <span className="font-semibold">{rejected ? "Alasan ditolak" : "Alasan dibatalkan"}:</span> {reason}
        </span>
      )}
    </>
  );
}

export function ReservationHistoryTable({
  tipe,
  items,
  page,
  perPage,
  totalPages,
  prevHref,
  nextHref,
  baseParams,
}: ReservationHistoryTableProps) {
  const unitLabel = RESERVATION_UNIT_LABEL[tipe];
  const title = `Riwayat Reservasi ${RESERVATION_TYPE_LABEL[tipe]}`;

  return (
    <Card as="section" aria-labelledby="history-title" className="flex flex-1 flex-col gap-6 p-4">
      <h2 id="history-title" className="text-base font-semibold tracking-wide">
        {title}
      </h2>

      {items.length === 0 ? (
        <p className="flex flex-1 items-center justify-center py-8 text-center text-sm text-muted">Belum ada riwayat reservasi {RESERVATION_TYPE_LABEL[tipe]}.</p>
      ) : (
        <>
          <table className={`hidden ${TABLE} lg:table`}>
            <caption className="sr-only">{title}, halaman {page} dari {totalPages}</caption>
            <thead>
              <tr className={TABLE_ROW}>
                <th scope="col" className={TH}>Tanggal</th>
                <th scope="col" className={TH}>Nama Pemesan</th>
                {unitLabel && <th scope="col" className={TH}>{unitLabel}</th>}
                <th scope="col" className={TH}>Waktu (WIB)</th>
                <th scope="col" className={TH}>Keperluan</th>
                <th scope="col" className={TH}>Alasan Ditolak</th>
                <th scope="col" className={`${TABLE_HEAD_CELL} text-center`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((reservation) => (
                <tr key={reservation.id} className={TABLE_ROW}>
                  <td className={`${TD} whitespace-nowrap`}>{formatDateShortWIB(reservation.startsAt)}</td>
                  <td className={TD}>{reservation.bookerName}</td>
                  {unitLabel && <td className={TD}>{reservation.unitName}</td>}
                  <td className={`${TD} whitespace-nowrap`}>{formatTimeSpanWIB(reservation.startsAt, reservation.endsAt)}</td>
                  <td className={TD}>
                    <Purpose reservation={reservation} />
                  </td>
                  <td className={`${TD} max-w-56 ${reservation.status === "ditolak" ? "text-danger" : "text-muted"}`}>
                    {rejectionText(reservation)}
                  </td>
                  <td className={`${TD} text-center`}>
                    <ReservationStatusBadge status={reservation.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ul className="flex flex-col lg:hidden">
            {items.map((reservation) => (
              <li key={reservation.id} className="border-b border-border py-3 first:pt-0">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{formatDateShortWIB(reservation.startsAt)}</span>
                    <span className="text-xs text-muted">{formatTimeSpanWIB(reservation.startsAt, reservation.endsAt)} WIB</span>
                  </div>
                  <ReservationStatusBadge status={reservation.status} size="sm" />
                </div>
                {reservation.status === "ditolak" && (
                  <p className="mb-2 rounded-md bg-danger-soft px-2 py-1 text-xs text-danger">
                    <span className="font-semibold">Alasan ditolak:</span> {rejectionText(reservation)}
                  </p>
                )}
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                  <dt className="text-primary">Pemesan</dt>
                  <dd className="break-words">{reservation.bookerName}</dd>
                  {unitLabel && (
                    <>
                      <dt className="text-primary">{unitLabel}</dt>
                      <dd>{reservation.unitName}</dd>
                    </>
                  )}
                  <dt className="text-primary">Keperluan</dt>
                  <dd className="break-words">
                    <Purpose reservation={reservation} />
                  </dd>
                </dl>
              </li>
            ))}
          </ul>
        </>
      )}

      {items.length > 0 && (
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
          <PerPageSelect value={perPage} options={PER_PAGE_OPTIONS} baseParams={baseParams} paramName={HISTORY_PARAMS.perPage} />
          <LinkPagination page={page} totalPages={totalPages} prevHref={prevHref} nextHref={nextHref} />
        </div>
      )}
    </Card>
  );
}
