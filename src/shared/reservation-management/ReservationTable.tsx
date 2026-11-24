"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { TABLE, TABLE_CELL, TABLE_HEAD_CELL, TABLE_ROW } from "@/components/ui/table";
import { usePagination } from "@/hooks/usePagination";
import { formatTimeWIB, toWibDateKey } from "@/lib/date";
import { ReservationDetailDialog } from "@/shared/reservation/ReservationDetailDialog";
import { ReservationStatusBadge } from "@/shared/reservation/ReservationStatusBadge";
import { isWholeDayType, reservationDateShort } from "@/shared/reservation/reservationTime";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import { decideMockReservation, mergeAdminRequests, type MockDecision } from "@/shared/reservation-store/reservationStore";
import { useMockReservations } from "@/shared/reservation-store/useMockReservations";
import { useStaff } from "@/shared/staff/useStaff";
import type { ReservationRequest, ReservationType } from "@/types/reservation";
import type { Staff } from "@/types/staff";
import { requestsForTab, type ReservationTab } from "./requestTabs";
import { ApproveReservationDialog } from "./ApproveReservationDialog";
import { RejectReservationDialog } from "./RejectReservationDialog";
import { TYPE_COLUMNS } from "./typeColumns";
import { VehicleCrewPanel } from "./VehicleCrewPanel";
import { vehicleHistoryCsv } from "./vehicleReport";

export interface ReservationTableProps {
  tipe: ReservationType;
  tab: ReservationTab;
  /** Every request in the admin's scope for this type, whatever its status; the table picks the tab's rows. */
  reservations: ReservationRequest[];
  /** Room codes in the admin's scope, for requests created in this browser; null for GOR and vehicles. */
  roomCodes: string[] | null;
  /** Buildings in the admin's scope, so a room added later in Kelola Denah still counts. */
  buildingNames?: string[];
  /**
   * Drivers for vehicle requests. When set, the detail of a vehicle request shows the Sopir and Uang
   * cards, and the vehicle history gets an "Ekspor Laporan" button.
   */
  staff?: Staff[];
}

const TH = `${TABLE_HEAD_CELL} text-left`;
const TD = TABLE_CELL;
const ICON_BUTTON = "flex h-11 w-11 items-center justify-center rounded-md border transition-colors";

const DEFAULT_LAYOUT = { table: "hidden lg:block", list: "flex flex-col lg:hidden" };
const WIDE_LAYOUT = { table: "hidden overflow-x-auto xl:block", list: "flex flex-col xl:hidden" };

/** Only a rejected reservation has a reason; other rows show "-" so the column stays aligned. */
const rejectionText = (reservation: ReservationRequest) =>
  reservation.status === "ditolak" ? (reservation.rejectionReason ?? "Alasan belum dicatat.") : "-";

const EMPTY_TEXT: Record<ReservationTab, string> = {
  persetujuan: "Tidak ada reservasi yang menunggu persetujuan.",
  riwayat: "Belum ada reservasi yang disetujui, selesai, atau ditolak.",
};

/** Reservations table for both tabs: approval actions on "persetujuan", status on "riwayat". */
export function ReservationTable({ tipe, tab, reservations: seeded, roomCodes, buildingNames, staff }: ReservationTableProps) {
  const store = useMockReservations();
  // Decisions this browser could not store (e.g. private mode) still apply until the page reloads.
  const [unsaved, setUnsaved] = useState<Record<string, MockDecision>>({});
  const reservations = useMemo(
    () =>
      requestsForTab(
        mergeAdminRequests(seeded, { ...store, decisions: { ...store.decisions, ...unsaved } }, tipe, roomCodes, buildingNames),
        tab,
      ),
    [seeded, store, unsaved, tipe, roomCodes, buildingNames, tab],
  );
  const [viewing, setViewing] = useState<ReservationRequest | null>(null);
  const [approving, setApproving] = useState<ReservationRequest | null>(null);
  const [rejecting, setRejecting] = useState<ReservationRequest | null>(null);
  const [notice, setNotice] = useState("");
  const paging = usePagination(reservations, 10);
  const isApproval = tab === "persetujuan";
  // Vehicles are booked by whole days: the date column shows the range and there is no time column.
  const wholeDays = isWholeDayType(tipe);
  const columns = TYPE_COLUMNS[tipe];
  // Extra type columns need more room, so the card list stays on until xl.
  const layout = columns.length > 1 ? WIDE_LAYOUT : DEFAULT_LAYOUT;

  // Drivers as this browser has them, so ones added in Kelola Staf show up in the Sopir card and the report.
  const [browserStaff] = useStaff(staff ?? []);
  const vehicleCrew = tipe === "kendaraan" && staff ? browserStaff : null;

  // Sopir and Uang beside every vehicle request the admin opens; a rejected trip needs no drivers or costs.
  const crewPanel = (reservation: ReservationRequest) =>
    vehicleCrew && reservation.status !== "ditolak" ? <VehicleCrewPanel reservation={reservation} staff={vehicleCrew} /> : undefined;

  const exportReport = () => {
    if (!vehicleCrew) return;
    const csv = vehicleHistoryCsv(reservations, store.assignments ?? {}, vehicleCrew);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = `riwayat-kendaraan-${toWibDateKey(new Date())}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    setNotice(`Laporan ${reservations.length} reservasi kendaraan diunduh.`);
  };

  const resolve = (reservation: ReservationRequest, decision: Omit<MockDecision, "decidedAt">, message: string) => {
    // TODO: POST approve/reject through the orval client, then refetch. Until then the demo store keeps it.
    if (!decideMockReservation(reservation.id, decision)) {
      setUnsaved((current) => ({ ...current, [reservation.id]: { ...decision, decidedAt: new Date().toISOString() } }));
    }
    setNotice(message);
  };

  // History rows have one action, shaped like the decision: a check opens the details, a cross opens
  // them with the rejection reason.
  const renderHistoryAction = (reservation: ReservationRequest) => {
    const rejected = reservation.status === "ditolak";
    return (
      <button
        type="button"
        onClick={() => setViewing(reservation)}
        aria-label={`${rejected ? "Lihat alasan penolakan" : "Lihat detail"} reservasi ${reservation.borrowerName}`}
        className={`${ICON_BUTTON} ${
          rejected
            ? "border-danger-soft hover:border-danger-strong hover:bg-danger-soft"
            : "border-transparent bg-success-soft hover:border-success"
        }`}
      >
        {rejected ? (
          <Image src="/icons/admin/reject.svg" alt="" width={7} height={7} />
        ) : (
          <Image src="/icons/admin/approve.svg" alt="" width={10} height={7} />
        )}
      </button>
    );
  };

  const renderApprovalActions = (reservation: ReservationRequest) => (
    <div className="flex items-center gap-2">
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
    </div>
  );

  const renderActions = (reservation: ReservationRequest) =>
    isApproval ? renderApprovalActions(reservation) : renderHistoryAction(reservation);

  return (
    <Card className="flex flex-col gap-6 p-4">
      {/* Read out to screen readers only; the row leaving the list shows the result. */}
      <p role="status" className="sr-only">
        {notice}
      </p>

      {vehicleCrew && !isApproval && reservations.length > 0 && (
        <div className="flex justify-end">
          <Button variant="primary-outline" onClick={exportReport}>
            Ekspor Laporan
          </Button>
        </div>
      )}

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
                {!wholeDays && <th scope="col" className={TH}>Waktu</th>}
                <th scope="col" className={TH}>Keperluan</th>
                {!isApproval && <th scope="col" className={TH}>Alasan Ditolak</th>}
                {!isApproval && <th scope="col" className={TH}>Status</th>}
                <th scope="col" className={TH}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paging.items.map((reservation) => (
                <tr key={reservation.id} className={TABLE_ROW}>
                  <td className={`${TD} whitespace-nowrap`}>{reservationDateShort(reservation)}</td>
                  <td className={TD}>{reservation.borrowerName}</td>
                  {columns.map((column) => (
                    <td key={column.header} className={column.nowrap ? `${TD} whitespace-nowrap` : TD}>
                      {column.cell(reservation)}
                    </td>
                  ))}
                  {!wholeDays && (
                    <td className={`${TD} whitespace-nowrap`}>
                      {formatTimeWIB(reservation.startsAt)} - {formatTimeWIB(reservation.endsAt)}
                    </td>
                  )}
                  <td className={TD}>{reservation.purpose}</td>
                  {!isApproval && (
                    <td className={`${TD} max-w-56 ${reservation.status === "ditolak" ? "text-danger" : "text-muted"}`}>
                      {rejectionText(reservation)}
                    </td>
                  )}
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
                  <span className="text-sm font-medium">{reservationDateShort(reservation)}</span>
                  {!wholeDays && (
                    <span className="text-xs text-muted">
                      {formatTimeWIB(reservation.startsAt)} - {formatTimeWIB(reservation.endsAt)} WIB
                    </span>
                  )}
                </div>
                {!isApproval && <ReservationStatusBadge status={reservation.status} size="sm" />}
              </div>
              {!isApproval && reservation.status === "ditolak" && (
                <p className="mb-2 rounded-md bg-danger-soft px-2 py-1 text-xs text-danger">
                  <span className="font-semibold">Alasan ditolak:</span> {rejectionText(reservation)}
                </p>
              )}
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

      {viewing && (
        <ReservationDetailDialog
          reservation={viewing}
          onClose={() => setViewing(null)}
          aside={crewPanel(viewing)}
        />
      )}
      {approving && (
        <ApproveReservationDialog
          reservation={approving}
          aside={crewPanel(approving)}
          onClose={() => setApproving(null)}
          onApprove={() => {
            resolve(approving, { status: "disetujui", rejectionReason: null }, `Reservasi ${approving.borrowerName} disetujui.`);
            setApproving(null);
          }}
        />
      )}
      {rejecting && (
        <RejectReservationDialog
          reservation={rejecting}
          aside={crewPanel(rejecting)}
          onClose={() => setRejecting(null)}
          onReject={(reason) => {
            resolve(
              rejecting,
              { status: "ditolak", rejectionReason: reason },
              `Reservasi ${rejecting.borrowerName} ditolak. Alasan dikirim ke pemesan.`,
            );
            setRejecting(null);
          }}
        />
      )}
    </Card>
  );
}
