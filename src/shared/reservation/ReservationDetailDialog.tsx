"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatDateLongWIB, formatTimeWIB } from "@/lib/date";
import type { ReservationRequest, ReservationType } from "@/types/reservation";
import { CAPS_LABEL_CLASS } from "@/components/form/Field";

export interface ReservationDetailDialogProps {
  reservation: ReservationRequest;
  onClose: () => void;
  /** Defaults to "Detail Reservasi". */
  title?: string;
  /** Replaces the "Kembali" button, e.g. with approve actions. */
  footer?: React.ReactNode;
  /** Shown above the details, e.g. a confirmation question. */
  intro?: React.ReactNode;
}

const READONLY_BOX = "flex min-h-10 items-center rounded-md border border-border px-2 py-2 text-xs tracking-[0.05em]";

/** Details that depend on what is reserved, shown under the time. Rooms show their place inline instead. */
const TYPE_DETAILS: Record<ReservationType, (reservation: ReservationRequest) => { label: string; value: string }[]> = {
  ruangan: () => [],
  kendaraan: (reservation) => [
    { label: "Tujuan", value: reservation.trip?.destination ?? "-" },
    { label: "Jumlah peserta", value: reservation.trip ? `${reservation.trip.participants} orang` : "-" },
  ],
  gor: (reservation) => [
    { label: "Tempat", value: reservation.roomName },
    { label: "Jenis kegiatan", value: reservation.activity ?? "-" },
  ],
};

export function ReservationDetailDialog({ reservation, onClose, title = "Detail Reservasi", footer, intro }: ReservationDetailDialogProps) {
  const details = TYPE_DETAILS[reservation.type](reservation);

  return (
    <Modal
      open
      onClose={onClose}
      title={title}
      footer={
        footer ?? (
          <Button variant="danger-outline" onClick={onClose}>
            Kembali
          </Button>
        )
      }
    >
      {intro}
      <dl className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <dt className={CAPS_LABEL_CLASS}>Nama pemesan</dt>
          <dd className="rounded-xl border border-border px-4 py-3">
            <p className="text-xs font-medium">{reservation.borrowerName}</p>
            <p className="text-[11px] text-muted">{reservation.borrowerDetail}</p>
          </dd>
        </div>

        <div className="flex flex-col">
          <dt className={CAPS_LABEL_CLASS}>Waktu peminjaman</dt>
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
              {reservation.type === "ruangan" && (
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
              )}
            </span>
          </dd>
        </div>

        {details.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {details.map((detail) => (
              <div key={detail.label} className="flex flex-col gap-1">
                <dt className={CAPS_LABEL_CLASS}>{detail.label}</dt>
                <dd className="text-xs">{detail.value}</dd>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <dt className={CAPS_LABEL_CLASS}>Keperluan</dt>
          <dd className={READONLY_BOX}>{reservation.purpose}</dd>
        </div>

        <div className="flex flex-col gap-1">
          <dt className={CAPS_LABEL_CLASS}>Surat peminjaman</dt>
          <dd className={READONLY_BOX}>
            {/* TODO: letterUrl becomes a short-lived signed URL from the API. */}
            {reservation.letterFileName && reservation.letterUrl ? (
              <span className="flex w-full flex-wrap items-center justify-between gap-2">
                <span className="break-all">{reservation.letterFileName}</span>
                <a
                  href={reservation.letterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  Lihat surat<span className="sr-only"> (membuka tab baru)</span>
                </a>
              </span>
            ) : (
              <span className="text-muted">Belum ada surat yang diunggah.</span>
            )}
          </dd>
        </div>
      </dl>
    </Modal>
  );
}
