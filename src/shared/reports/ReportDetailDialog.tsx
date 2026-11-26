"use client";

import { CAPS_LABEL_CLASS } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatDateLongWIB, formatTimeWIB } from "@/lib/date";
import type { UserReport } from "@/types/report";
import { REPORT_CATEGORY_LABEL, REPORTER_TYPE_LABEL } from "./report-labels";

export interface ReportDetailDialogProps {
  report: UserReport;
  onClose: () => void;
}

const READONLY_BOX = "rounded-md border border-border px-2 py-2 text-xs tracking-[0.05em] break-words whitespace-pre-line";

export function ReportDetailDialog({ report, onClose }: ReportDetailDialogProps) {
  return (
    <Modal
      open
      onClose={onClose}
      title="Detail Laporan"
      footer={
        <Button variant="danger-outline" onClick={onClose}>
          Kembali
        </Button>
      }
    >
      <dl className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <dt className={CAPS_LABEL_CLASS}>Pelapor</dt>
          <dd className="text-xs font-medium">{report.authorName}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className={CAPS_LABEL_CLASS}>Jenis pelapor</dt>
          <dd className="text-xs">{report.reporterType ? REPORTER_TYPE_LABEL[report.reporterType] : "-"}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className={CAPS_LABEL_CLASS}>Kategori</dt>
          <dd className="text-xs font-medium text-primary">{REPORT_CATEGORY_LABEL[report.category]}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className={CAPS_LABEL_CLASS}>Ruangan</dt>
          <dd className="text-xs">{report.roomCode ?? "-"}</dd>
        </div>
        <div className="col-span-2 flex flex-col gap-1">
          <dt className={CAPS_LABEL_CLASS}>Dikirim</dt>
          <dd className="text-xs">
            <time dateTime={report.createdAt}>
              {formatDateLongWIB(report.createdAt)}, {formatTimeWIB(report.createdAt)} WIB
            </time>
          </dd>
        </div>
        <div className="col-span-2 flex flex-col gap-1">
          <dt className={CAPS_LABEL_CLASS}>Deskripsi</dt>
          <dd className={READONLY_BOX}>{report.body}</dd>
        </div>
        {report.photoUrl && (
          <div className="col-span-2 flex flex-col gap-1.5">
            <dt className={CAPS_LABEL_CLASS}>Foto kerusakan</dt>
            <dd className="flex flex-col gap-1.5">
              <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-page">
                {/* eslint-disable-next-line @next/next/no-img-element -- displays both local data URLs and API photo URLs */}
                <img
                  src={report.photoUrl}
                  alt={`Foto kerusakan laporan dari ${report.authorName}`}
                  className="h-full w-full object-contain"
                />
              </div>
              <a
                href={report.photoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start text-xs font-medium text-primary underline-offset-2 hover:underline"
              >
                Buka foto ukuran penuh<span className="sr-only"> (membuka tab baru)</span>
              </a>
            </dd>
          </div>
        )}
      </dl>
    </Modal>
  );
}
