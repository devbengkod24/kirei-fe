"use client";

import type { ReservationOwner } from "@/shared/reservation-store/reservationStore";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { ResultDialog } from "@/components/feedback/ResultDialog";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { formatDateLongWIB, formatTimeRangeWIB } from "@/lib/date";
import {
  draftsSnapshot,
  parseDrafts,
  subscribeDrafts,
  type StoredDraft,
} from "@/shared/reservation-draft/draftStorage";
import { cancelDraft, type DraftActionResult } from "./draftActions";
import { DraftCard } from "./DraftCard";
import { DraftsSkeleton } from "./DraftsSkeleton";

export interface DraftListProps {
  booker: ReservationOwner;
  links: { history: string; create: string };
}

type Outcome = { tone: "success" | "failure"; title: string; body: React.ReactNode };

// Drafts are read from this browser, so the server renders the loading state.
const serverSnapshot = () => null;
const clientSnapshot = () => draftsSnapshot();

export function DraftList({ booker, links }: DraftListProps) {
  const raw = useSyncExternalStore(subscribeDrafts, clientSnapshot, serverSnapshot);
  const drafts = useMemo(() => (raw === null ? null : parseDrafts(raw)), [raw]);
  const [cancelTarget, setCancelTarget] = useState<StoredDraft | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const handleSubmitted = (draft: StoredDraft, result: DraftActionResult) => {
    if (result.ok) {
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

  const confirmCancel = () => {
    if (!cancelTarget) return;
    const result = cancelDraft(cancelTarget.id);
    setCancelTarget(null);
    if (result.ok) {
      setOutcome({ tone: "success", title: "Draft dibatalkan", body: `Draft reservasi ${cancelTarget.unitName} sudah dihapus.` });
    } else {
      setOutcome({ tone: "failure", title: "Draft gagal dibatalkan", body: `${result.message} Silakan coba lagi.` });
    }
  };

  if (drafts === null) return <DraftsSkeleton />;

  return (
    <>
      {drafts.length === 0 ? (
        <Card className="mx-auto flex max-w-md flex-col items-center gap-1 px-6 py-12 text-center">
          <p className="text-sm font-medium">Tidak ada draft reservasi.</p>
          <p className="text-xs text-muted">
            Reservasi yang disimpan tanpa surat peminjaman muncul di sini. Draft hanya tersimpan di browser ini.
          </p>
          <Link href={links.create} className="mt-1 inline-flex min-h-11 items-center text-xs font-medium text-primary underline-offset-4 hover:underline">
            Buat reservasi
          </Link>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          {drafts.map((draft) => (
            <DraftCard key={draft.id} draft={draft} booker={booker} onSubmitted={handleSubmitted} onRequestCancel={setCancelTarget} />
          ))}
        </div>
      )}

      <Modal open={cancelTarget !== null} onClose={() => setCancelTarget(null)} title="Batalkan draft?">
        {cancelTarget && (
          <p className="text-sm">
            Draft reservasi {cancelTarget.unitName} pada {formatDateLongWIB(cancelTarget.startsAt)},{" "}
            {formatTimeRangeWIB(cancelTarget.startsAt, cancelTarget.endsAt)} akan dihapus.
          </p>
        )}
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" onClick={() => setCancelTarget(null)}>
            Kembali
          </Button>
          <Button variant="danger-outline" onClick={confirmCancel}>
            Ya, batalkan
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
