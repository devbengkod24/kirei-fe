"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { TABLE, TABLE_CELL, TABLE_HEAD_CELL, TABLE_ROW } from "@/components/ui/table";
import { usePagination } from "@/hooks/usePagination";
import { formatDateShortWIB, formatTimeWIB } from "@/lib/date";
import { ReservationDetailDialog } from "@/shared/reservation/ReservationDetailDialog";
import { ReservationStatusBadge } from "@/shared/reservation/ReservationStatusBadge";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import type { ReservationRequest, ReservationType } from "@/types/reservation";
import type { ReservationTab } from "./getReservationRequests";
import { ApproveReservationDialog } from "./ApproveReservationDialog";
import { RejectReservationDialog } from "./RejectReservationDialog";
import { TYPE_COLUMNS } from "./typeColumns";

export interface ReservationTableProps {
  tipe: ReservationType;
  tab: ReservationTab;
  reservations: ReservationRequest[];
}

const TH = `${TABLE_HEAD_CELL} text-left`;
const TD = TABLE_CELL;
const ICON_BUTTON = "flex h-11 w-11 items-center justify-center rounded-md border transition-colors";

const DEFAULT_LAYOUT = { table: "hidden lg:block", list: "flex flex-col lg:hidden" };
const WIDE_LAYOUT = { table: "hidden overflow-x-auto xl:block", list: "flex flex-col xl:hidden" };

const EMPTY_TEXT: Record<ReservationTab, string> = {
  persetujuan: "Tidak ada reservasi yang menunggu persetujuan.",
  riwayat: "Belum ada reservasi yang selesai, ditolak, atau dibatalkan.",
};

/** Reservations table for both tabs: approval actions on "persetujuan", status on "riwayat". */
export function ReservationTable({ tipe, tab, reservations: initial }: ReservationTableProps) {
  const [reservations, setReservations] = useState(initial);
  const [viewing, setViewing] = useState<ReservationRequest | null>(null);
  const [approving, setApproving] = useState<ReservationRequest | null>(null);
  const [rejecting, setRejecting] = useState<ReservationRequest | null>(null);
  const [notice, setNotice] = useState("");
  const paging = usePagination(reservations, 10);
  const isApproval = tab === "persetujuan";
  const columns = TYPE_COLUMNS[tipe];
  // Extra type columns need more room, so the card list stays on until xl.
  const layout = columns.length > 1 ? WIDE_LAYOUT : DEFAULT_LAYOUT;

  const resolve = (reservation: ReservationRequest, message: string) => {
    // TODO: POST approve/reject through the orval client, then refetch; this only updates the local list.
    setReservations((current) => current.filter((item) => item.id !== reservation.id));
    setNotice(message);
  };


  const renderActions = (reservation: ReservationRequest) => (
    <div className="flex items-center gap-2">
      {isApproval && (
        <>
          <button
            type="button"
            onClick={() => setApproving(reservation)}
            aria-label={`Setujui reservasi ${reservation.borrowerName}`}
            className={`${ICON_BUTTON} border-transparent bg-success-soft hover:border-success`}
          >
            <Image src="/icons/admin/approve.svg" alt="" width={10} height={7} />
          </button>
          <button
            type="button"
            onClick={() => setRejecting(reservation)}
            aria-label={`Tolak reservasi ${reservation.borrowerName}`}
            className={`${ICON_BUTTON} border-danger-soft hover:border-danger-strong hover:bg-danger-soft`}
          >
            <Image src="/icons/admin/reject.svg" alt="" width={7} height={7} />
          </button>
        </>
      )}
      <button
        type="button"
        onClick={() => setViewing(reservation)}
        aria-label={`Lihat detail reservasi ${reservation.borrowerName}`}
        className={`${ICON_BUTTON} border-border hover:bg-page`}
      >
        <Image src="/icons/admin/view.svg" alt="" width={14} height={11} />
      </button>
    </div>
  );

  return (
    <Card className="flex flex-col gap-6 p-4">
      {/* Read out to screen readers only; the row leaving the list shows the result. */}
      <p role="status" className="sr-only">
        {notice}
      </p>

      {reservations.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted">{EMPTY_TEXT[tab]}</p>
      ) : (
        <>
        {/* The wide layout scrolls sideways rather than push the page wider. */}
        <div className={layout.table}>
        <table className={`${TABLE} text-left`}>
          <caption className="sr-only">Tabel reservasi {RESERVATION_TYPE_LABEL[tipe].toLowerCase()}</caption>
            <thead>
              <tr className={TABLE_ROW}>
                <th scope="col" className={TH}>Tanggal</th>
                <th scope="col" className={TH}>Nama Pemesan</th>
                {columns.map((column) => (
                  <th key={column.header} scope="col" className={TH}>{column.header}</th>
                ))}
                <th scope="col" className={TH}>Waktu</th>
                <th scope="col" className={TH}>Keperluan</th>
                {!isApproval && <th scope="col" className={TH}>Status</th>}
                <th scope="col" className={TH}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paging.items.map((reservation) => (
                <tr key={reservation.id} className={TABLE_ROW}>
                  <td className={`${TD} whitespace-nowrap`}>{formatDateShortWIB(reservation.startsAt)}</td>
                  <td className={TD}>{reservation.borrowerName}</td>
                  {columns.map((column) => (
                    <td key={column.header} className={column.nowrap ? `${TD} whitespace-nowrap` : TD}>
                      {column.cell(reservation)}
                    </td>
                  ))}
                  <td className={`${TD} whitespace-nowrap`}>
                    {formatTimeWIB(reservation.startsAt)} - {formatTimeWIB(reservation.endsAt)}
                  </td>
                  <td className={TD}>{reservation.purpose}</td>
                  {!isApproval && (
                    <td className={TD}>
                      <ReservationStatusBadge status={reservation.status} />
                    </td>
                  )}
                  <td className={TD}>
                    {renderActions(reservation)}
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
        </div>

        {/* On narrow screens the table becomes a list, like the borrower's history. */}
        <ul className={layout.list}>
          {paging.items.map((reservation) => (
            <li key={reservation.id} className="border-b border-border py-3 first:pt-0">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{formatDateShortWIB(reservation.startsAt)}</span>
                  <span className="text-xs text-muted">
                    {formatTimeWIB(reservation.startsAt)} - {formatTimeWIB(reservation.endsAt)} WIB
                  </span>
                </div>
                {!isApproval && <ReservationStatusBadge status={reservation.status} size="sm" />}
              </div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                <dt className="text-primary">Pemesan</dt>
                <dd className="break-words">{reservation.borrowerName}</dd>
                {columns.map((column) => (
                  <div key={column.header} className="contents">
                    <dt className="text-primary">{column.header}</dt>
                    <dd className="break-words">{column.cell(reservation)}</dd>
                  </div>
                ))}
                <dt className="text-primary">Keperluan</dt>
                <dd className="break-words">{reservation.purpose}</dd>
              </dl>
              <div className="mt-2 flex justify-end">
                {renderActions(reservation)}
              </div>
            </li>
          ))}
        </ul>
        </>
      )}

      <Pagination
        page={paging.page}
        pageCount={paging.pageCount}
        pageSize={paging.pageSize}
        onPageChange={paging.setPage}
        onPageSizeChange={paging.setPageSize}
      />

      {viewing && <ReservationDetailDialog reservation={viewing} onClose={() => setViewing(null)} />}
      {approving && (
        <ApproveReservationDialog
          reservation={approving}
          onClose={() => setApproving(null)}
          onApprove={() => {
            resolve(approving, `Reservasi ${approving.borrowerName} disetujui.`);
            setApproving(null);
          }}
        />
      )}
      {rejecting && (
        <RejectReservationDialog
          reservation={rejecting}
          onClose={() => setRejecting(null)}
          onReject={() => {
            resolve(rejecting, `Reservasi ${rejecting.borrowerName} ditolak. Alasan dikirim ke pemesan.`);
            setRejecting(null);
          }}
        />
      )}
    </Card>
  );
}
