"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { formatDateLongWIB, formatTimeWIB } from "@/lib/date";
import type { ReservationRequest } from "@/types/reservation";

export interface ReservationDetailDialogProps {
  reservation: ReservationRequest;
  onClose: () => void;
}

const READONLY_BOX = "flex min-h-10 items-center rounded-md border border-border px-2 py-2 text-xs tracking-[0.05em]";

export function ReservationDetailDialog({ reservation, onClose }: ReservationDetailDialogProps) {
  return (
    <Dialog
      open
      onClose={onClose}
      title="Detail Reservasi"
      footer={
        <Button variant="danger-outline" onClick={onClose}>
          Kembali
        </Button>
      }
    >
      <dl className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <dt className="text-[10px] tracking-[0.05em] text-primary uppercase">Nama pemesan</dt>
          <dd className="rounded-xl border border-border px-4 py-3">
            <p className="text-xs font-medium">{reservation.borrowerName}</p>
            <p className="text-[11px] text-muted">{reservation.borrowerDetail}</p>
          </dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-[10px] tracking-[0.05em] text-primary uppercase">Waktu peminjaman</dt>
          <dd className="flex flex-col text-xs">
            <span className="flex min-h-[30px] items-center gap-2">
              <Image src="/icons/admin/detail-date.svg" alt="" width={16} height={16} />
              {formatDateLongWIB(reservation.startsAt)}
            </span>
            <span className="flex min-h-[30px] flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <span className="flex items-center gap-2">
                <Image src="/icons/admin/detail-time.svg" alt="" width={16} height={16} />
                {formatTimeWIB(reservation.startsAt)} WIB
                <Image src="/icons/admin/detail-arrow.svg" alt="sampai" width={18} height={18} />
                {formatTimeWIB(reservation.endsAt)} WIB
              </span>
              <span className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1">
                  <Image src="/icons/admin/detail-building.svg" alt="Gedung" width={13} height={15} />
                  {reservation.buildingName}
                </span>
                <span className="flex items-center gap-1">
                  <Image src="/icons/admin/detail-room.svg" alt="Ruangan" width={19} height={19} />
                  {reservation.roomName}
                </span>
              </span>
            </span>
          </dd>
        </div>

        <div className="flex flex-col gap-1">
          <dt className="text-[10px] tracking-[0.05em] text-primary uppercase">Keperluan</dt>
          <dd className={READONLY_BOX}>{reservation.purpose}</dd>
        </div>

        <div className="flex flex-col gap-1">
          <dt className="text-[10px] tracking-[0.05em] text-primary uppercase">Surat peminjaman</dt>
          <dd className={READONLY_BOX}>
            {/* TODO: link to the signed file URL from the API once uploads exist. */}
            {reservation.letterFileName ?? <span className="text-muted">Belum ada surat yang diunggah.</span>}
          </dd>
        </div>

        <div className="flex flex-col gap-1">
          <dt className="text-[10px] tracking-[0.05em] text-primary uppercase">Kode tiket</dt>
          <dd className="text-xs">{reservation.ticketCode}</dd>
        </div>
      </dl>
    </Dialog>
  );
}
