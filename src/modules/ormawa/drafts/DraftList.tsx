"use client";

import Link from "next/link";
import { useState } from "react";
import { ResultDialog } from "@/components/feedback/ResultDialog";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { formatDateLongWIB, formatTimeRangeWIB } from "@/lib/date";
import type { ReservationDraft } from "@/types/reservation";
import { cancelDraft, type DraftActionResult } from "./draftActions";
import { DraftCard } from "./DraftCard";

export interface DraftListProps {
  drafts: ReservationDraft[];
  links: { history: string; create: string };
}

type Outcome = { tone: "success" | "failure"; title: string; body: React.ReactNode };

export function DraftList({ drafts, links }: DraftListProps) {
  // TODO: refetch the list instead once drafts come from TanStack Query.
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());
  const [cancelTarget, setCancelTarget] = useState<ReservationDraft | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const visible = drafts.filter((draft) => !removedIds.has(draft.id));
  const remove = (id: string) => setRemovedIds((current) => new Set(current).add(id));

  const handleSubmitted = (draft: ReservationDraft, result: DraftActionResult) => {
    if (result.ok) {
      remove(draft.id);
      setOutcome({
        tone: "success",
        title: "Reservasi berhasil dibuat!",
        body: (
          <>
            Selamat! Reservasi {draft.unitName} sudah diajukan dan bisa dipantau di bagian{" "}
            <Link href={links.history} onClick={() => setOutcome(null)} className="font-bold underline-offset-2 hover:underline">
              “Reservasi &amp; Riwayat”
            </Link>
            .
          </>
        ),
      });
    } else {
      setOutcome({ tone: "failure", title: "Surat Gagal Diunggah", body: `${result.message} Silakan coba lagi.` });
    }
  };

  const confirmCancel = async () => {
    if (!cancelTarget) return;
    setCancelling(true);
    const result = await cancelDraft(cancelTarget.id);
    setCancelling(false);
    setCancelTarget(null);
    if (result.ok) {
      remove(cancelTarget.id);
      setOutcome({ tone: "success", title: "Draft dibatalkan", body: `Draft reservasi ${cancelTarget.unitName} sudah dihapus.` });
    } else {
      setOutcome({ tone: "failure", title: "Draft gagal dibatalkan", body: `${result.message} Silakan coba lagi.` });
    }
  };

  return (
    <>
      {visible.length === 0 ? (
        <Card className="mx-auto flex max-w-md flex-col items-center gap-1 px-6 py-12 text-center">
          <p className="text-sm font-medium">Tidak ada draft reservasi.</p>
          <p className="text-xs text-muted">Reservasi yang disimpan tanpa surat peminjaman akan muncul di sini sampai suratnya diunggah.</p>
          <Link href={links.create} className="mt-1 inline-flex min-h-11 items-center text-xs font-medium text-primary underline-offset-4 hover:underline">
            Buat reservasi
          </Link>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          {visible.map((draft) => (
            <DraftCard key={draft.id} draft={draft} onSubmitted={handleSubmitted} onRequestCancel={setCancelTarget} />
          ))}
        </div>
      )}

      <Modal open={cancelTarget !== null} onClose={() => !cancelling && setCancelTarget(null)} title="Batalkan draft?">
        {cancelTarget && (
          <p className="text-sm">
            Draft reservasi {cancelTarget.unitName} pada {formatDateLongWIB(cancelTarget.startsAt)},{" "}
            {formatTimeRangeWIB(cancelTarget.startsAt, cancelTarget.endsAt)} akan dihapus.
          </p>
        )}
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" onClick={() => setCancelTarget(null)} disabled={cancelling}>
            Kembali
          </Button>
          <Button variant="danger-outline" onClick={() => void confirmCancel()} disabled={cancelling}>
            {cancelling ? "Membatalkan..." : "Ya, batalkan"}
          </Button>
        </div>
      </Modal>

      <ResultDialog
        open={outcome !== null}
        onClose={() => setOutcome(null)}
        tone={outcome?.tone ?? "success"}
        title={outcome?.title ?? ""}
      >
        {outcome?.body}
      </ResultDialog>
    </>
  );
}
