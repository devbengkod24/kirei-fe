"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { formatDateShortWIB, formatTimeWIB } from "@/lib/date";
import { ReservationDetailDialog } from "@/shared/reservation/ReservationDetailDialog";
import { ReservationStatusBadge } from "@/shared/reservation/ReservationStatusBadge";
import type { ReservationRequest } from "@/types/reservation";
import type { ReservationKind, ReservationTab } from "./getReservationRequests";
import { RejectReservationDialog } from "./RejectReservationDialog";

export interface ReservationTableProps {
  tipe: ReservationKind;
  tab: ReservationTab;
  reservations: ReservationRequest[];
}

const TH = "px-4 py-2 text-xs font-semibold tracking-[0.05em] whitespace-nowrap first:pl-6";
const TD = "px-4 py-2 text-xs tracking-[0.05em] first:pl-6";
const ICON_BUTTON = "flex h-11 w-11 items-center justify-center rounded-md border transition-colors";

const EMPTY_TEXT: Record<ReservationTab, string> = {
  persetujuan: "Tidak ada reservasi yang menunggu persetujuan.",
  riwayat: "Belum ada reservasi yang selesai, ditolak, atau dibatalkan.",
};

/** Reservations table for both tabs: approval actions on "persetujuan", status on "riwayat". */
export function ReservationTable({ tipe, tab, reservations: initial }: ReservationTableProps) {
  const [reservations, setReservations] = useState(initial);
  const [viewing, setViewing] = useState<ReservationRequest | null>(null);
  const [rejecting, setRejecting] = useState<ReservationRequest | null>(null);
  const [notice, setNotice] = useState("");
  const paging = usePagination(reservations, 10);
  const isApproval = tab === "persetujuan";

  const resolve = (reservation: ReservationRequest, message: string) => {
    // TODO: POST approve/reject through the orval client, then refetch; this only updates the local list.
    setReservations((current) => current.filter((item) => item.id !== reservation.id));
    setNotice(message);
  };

  return (
    <Card className="flex flex-col gap-6 p-4">
      <p role="status" className={notice ? "text-sm text-success" : "sr-only"}>
        {notice}
      </p>

      {reservations.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted">{EMPTY_TEXT[tab]}</p>
      ) : (
        <div role="region" aria-label={`Tabel reservasi ${tipe}`} tabIndex={0} className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className={TH}>Tanggal</th>
                <th scope="col" className={TH}>Nama Pemesan</th>
                <th scope="col" className={TH}>Ruangan</th>
                <th scope="col" className={TH}>Waktu</th>
                <th scope="col" className={TH}>Keperluan</th>
                {!isApproval && <th scope="col" className={TH}>Status</th>}
                <th scope="col" className={TH}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paging.items.map((reservation) => (
                <tr key={reservation.id} className="border-b border-border">
                  <td className={`${TD} whitespace-nowrap`}>{formatDateShortWIB(reservation.startsAt)}</td>
                  <td className={TD}>{reservation.borrowerName}</td>
                  <td className={TD}>{reservation.roomName}</td>
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
                    <div className="flex items-center gap-2">
                      {isApproval && (
                        <>
                          <button
                            type="button"
                            onClick={() => resolve(reservation, `Reservasi ${reservation.borrowerName} disetujui.`)}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        page={paging.page}
        pageCount={paging.pageCount}
        pageSize={paging.pageSize}
        onPageChange={paging.setPage}
        onPageSizeChange={paging.setPageSize}
      />

      {viewing && <ReservationDetailDialog reservation={viewing} onClose={() => setViewing(null)} />}
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
