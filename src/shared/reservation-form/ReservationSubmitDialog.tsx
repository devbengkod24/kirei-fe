"use client";

import Link from "next/link";
import { useFormContext, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LetterField } from "./LetterField";
import type { ReservationIntent } from "./schema";
import { SUMMARY_LABEL } from "./summaryParts";

/** Fields every reservation form has, whatever its type. */
type SubmissionFields = { letter: File | null; intent: ReservationIntent };

export interface ReservationSubmitDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Names the reservation in the result message, e.g. "Reservasi H.5.1". */
  subject: string;
  /** Faculty whose admin approves, when it is not the borrower's own. */
  approver: string | null;
  submitting: boolean;
  onSubmit: (intent: ReservationIntent) => void;
  /** Set after the API accepted the reservation. */
  result: ReservationIntent | null;
  links: { history: string; drafts: string };
  onCreateAnother: () => void;
  /** Type-specific summary and inputs, shown above the letter field. */
  children: React.ReactNode;
}

/**
 * Last step of every booking form: summary, loan letter, and the choice between sending
 * and saving a draft, followed by the outcome.
 */
export function ReservationSubmitDialog({
  open,
  onClose,
  title,
  subject,
  approver,
  submitting,
  onSubmit,
  result,
  links,
  onCreateAnother,
  children,
}: ReservationSubmitDialogProps) {
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext<SubmissionFields>();
  const letter = useWatch({ control, name: "letter" });

  if (result) {
    const submitted = result === "submit";
    return (
      <Modal open={open} onClose={onClose} title={submitted ? "Reservasi terkirim" : "Draft tersimpan"}>
        <p role="status" className="text-sm">
          {submitted
            ? `${subject} sedang menunggu konfirmasi admin${approver ? ` ${approver}` : ""}. Statusnya bisa dipantau di Reservasi & Riwayat.`
            : `${subject} disimpan sebagai draft. Unggah surat peminjaman di Draft Reservasi sebelum tenggatnya berakhir.`}
        </p>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" onClick={onCreateAnother}>
            Buat reservasi lain
          </Button>
          <Link
            href={submitted ? links.history : links.drafts}
            // start over first, so going back shows a fresh form instead of this result
            onClick={onCreateAnother}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-on-primary hover:bg-primary-hover"
          >
            {submitted ? "Lihat Reservasi & Riwayat" : "Buka Draft Reservasi"}
          </Link>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="flex flex-col gap-3">
        {children}

        <div className="flex flex-col gap-1">
          <p className={SUMMARY_LABEL}>Surat Peminjaman</p>
          <LetterField
            variant="inline"
            file={letter ?? null}
            onChange={(file) => setValue("letter", file, { shouldValidate: true })}
            error={errors.letter?.message}
          />
        </div>

        {approver && (
          <p className="rounded-md bg-primary-soft px-3 py-2 text-xs text-primary">
            Ruangan ini milik {approver}. Reservasi akan disetujui admin {approver}, tanpa surat tambahan.
          </p>
        )}

        {errors.root?.server && (
          <p role="alert" className="rounded-md bg-danger-soft px-3 py-2 text-xs text-danger">
            {errors.root.server.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="danger-outline" onClick={onClose} disabled={submitting}>
          Kembali
        </Button>
        <Button variant="success-outline" onClick={() => onSubmit("draft")} disabled={submitting}>
          Simpan Draft
        </Button>
        <Button variant="primary-outline" onClick={() => onSubmit("submit")} disabled={submitting}>
          {submitting ? "Mengirim..." : "Pesan"}
        </Button>
      </div>
    </Modal>
  );
}
