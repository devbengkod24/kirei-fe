"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ResultDialog } from "@/components/feedback/ResultDialog";
import { Field, INPUT_CLASS, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CONTACT } from "@/config/contact";
import { REPORT_PHOTO_MAX_SIZE_MB } from "@/config/reservation";
import type { LaravelValidationError } from "@/lib/api/form-errors";
import { applyFormErrors } from "@/lib/api/form-errors";
import {
  DAMAGE_REPORT_FIELD_MAP,
  damageReportSchema,
  type DamageReportInput,
  type DamageReportValues,
} from "@/shared/reports/damageReportSchema";
import { addLiveReport } from "@/shared/reports/liveReports";
import { REPORT_CATEGORY_LABEL } from "@/shared/reports/report-labels";
import { REPORT_PHOTO_ACCEPT, toReportPhotoUrl } from "@/shared/reports/reportPhoto";

export interface PublicDamageReportFormProps {
  /** Optional room code prefilled from query string (?ruangan=H.5.1). */
  initialRoomCode?: string;
}

type SubmitOutcome = "sent" | "failed" | null;

const CHANNEL = "flex gap-3 rounded-md border border-border bg-surface p-4";
const CHANNEL_LINK = `${CHANNEL} hover:border-primary/50 focus-visible:border-primary`;
const CHANNEL_TITLE = "text-sm font-semibold tracking-[0.075em] text-muted uppercase";

function ChannelIcon({ src, width, height }: { src: string; width: number; height: number }) {
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary">
      <Image src={src} alt="" width={width} height={height} />
    </span>
  );
}

/** Public Formulir Pengaduan page reached via QR code (/lapor), usable without signing in. */
export function PublicDamageReportForm({ initialRoomCode = "" }: PublicDamageReportFormProps) {
  const [outcome, setOutcome] = useState<SubmitOutcome>(null);
  const [storageError, setStorageError] = useState<string>();

  const defaults = useMemo<DamageReportInput>(
    () => ({
      reporterName: "",
      roomCode: initialRoomCode,
      category: "" as DamageReportInput["category"],
      body: "",
      photo: null,
    }),
    [initialRoomCode],
  );

  const form = useForm<DamageReportInput, unknown, DamageReportValues>({
    resolver: zodResolver(damageReportSchema),
    defaultValues: defaults,
  });

  const { errors, isSubmitting } = form.formState;
  const selectedCategory = useWatch({ control: form.control, name: "category" });
  const selectedPhoto = useWatch({ control: form.control, name: "photo" });

  const previewUrl = useMemo(() => (selectedPhoto ? URL.createObjectURL(selectedPhoto) : null), [selectedPhoto]);
  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const submit = form.handleSubmit(async (values) => {
    setStorageError(undefined);
    // TODO: kirei-api POST /api/public/reports (multipart/form-data, tanpa login + rate limit backend).
    // Map 422 response via applyFormErrors(validation, form.setError, DAMAGE_REPORT_FIELD_MAP).
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      const photoUrl = values.photo ? await toReportPhotoUrl(values.photo) : null;
      const saved = addLiveReport({
        category: values.category,
        body: values.body,
        roomCode: values.roomCode,
        authorName: values.reporterName,
        photoUrl,
      });
      if (!saved) {
        setStorageError("Browser ini tidak bisa menyimpan laporan simulasi.");
        setOutcome("failed");
        return;
      }
      form.reset(defaults);
      setOutcome("sent");
    } catch (error) {
      if (error && typeof error === "object" && "errors" in error) {
        applyFormErrors(error as LaravelValidationError, form.setError, DAMAGE_REPORT_FIELD_MAP);
        return;
      }
      setOutcome("failed");
    }
  });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-4 px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">KIREI Udinus</p>
          <h1 className="text-xl font-semibold">Formulir Pengaduan</h1>
        </div>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-md border border-border bg-surface px-3 text-xs font-medium text-ink hover:bg-primary-soft hover:text-primary"
        >
          Beranda KIREI
        </Link>
      </div>

      <Card className="flex flex-col gap-8 p-5 md:p-8 lg:flex-row lg:justify-between">
        <section aria-labelledby="public-complaint-title" className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="border-b border-border pb-2">
            <h2 id="public-complaint-title" className="text-lg font-semibold tracking-[0.03em]">
              Formulir Pengaduan
            </h2>
            <p className="mt-1 text-xs text-muted">
              Dapat diisi langsung tanpa login. Pengaduan Anda akan diteruskan ke admin gedung.
            </p>
          </div>

          <form onSubmit={submit} noValidate className="flex flex-1 flex-col gap-4">
            <Field label="Nama Pengadu" htmlFor="lapor-name" error={errors.reporterName?.message}>
              <input
                id="lapor-name"
                type="text"
                placeholder="Masukkan nama Anda"
                {...form.register("reporterName")}
                aria-invalid={errors.reporterName ? true : undefined}
                aria-describedby={errors.reporterName ? "lapor-name-error" : undefined}
                className={INPUT_CLASS}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Kelas / Ruangan" htmlFor="lapor-room" error={errors.roomCode?.message}>
                <input
                  id="lapor-room"
                  type="text"
                  placeholder="Contoh: H.5.1 atau Lab D.2.A"
                  {...form.register("roomCode")}
                  aria-invalid={errors.roomCode ? true : undefined}
                  aria-describedby={errors.roomCode ? "lapor-room-error" : undefined}
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Kategori Pengaduan" htmlFor="lapor-category" error={errors.category?.message}>
                <SelectInput
                  id="lapor-category"
                  {...form.register("category")}
                  aria-invalid={errors.category ? true : undefined}
                  aria-describedby={errors.category ? "lapor-category-error" : undefined}
                  className={selectedCategory ? "" : "text-muted"}
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  {Object.entries(REPORT_CATEGORY_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </SelectInput>
              </Field>
            </div>

            <Field label="Keterangan" htmlFor="lapor-body" error={errors.body?.message}>
              <textarea
                id="lapor-body"
                rows={4}
                placeholder="Masukkan keterangan masalah atau kerusakan di kelas ini..."
                {...form.register("body")}
                aria-invalid={errors.body ? true : undefined}
                aria-describedby={errors.body ? "lapor-body-error" : undefined}
                className={`${INPUT_CLASS} max-h-60`}
              />
            </Field>

            <Field label="Foto Pendukung (Opsional)" htmlFor="lapor-photo" error={errors.photo?.message}>
              <input
                id="lapor-photo"
                type="file"
                accept={REPORT_PHOTO_ACCEPT}
                aria-invalid={errors.photo ? true : undefined}
                aria-describedby={errors.photo ? "lapor-photo-error lapor-photo-hint" : "lapor-photo-hint"}
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  form.setValue("photo", file, { shouldValidate: true });
                }}
                className={`${INPUT_CLASS} file:mr-3 file:rounded-md file:border-0 file:bg-primary-soft file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary`}
              />
              <p id="lapor-photo-hint" className="text-[11px] text-muted">
                Format JPG, PNG, atau WebP. Maksimal {REPORT_PHOTO_MAX_SIZE_MB} MB.
              </p>
            </Field>

            {previewUrl && (
              <div className="flex flex-col gap-2 rounded-md border border-border bg-page p-2">
                <div className="relative aspect-video overflow-hidden rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local file preview before upload */}
                  <img
                    src={previewUrl}
                    alt="Pratinjau foto pengaduan"
                    className="h-full w-full object-contain"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => form.setValue("photo", null, { shouldValidate: true })}
                  className="self-start"
                >
                  Hapus foto
                </Button>
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="self-start">
              {isSubmitting ? "Mengirim..." : "Kirim Pengaduan"}
            </Button>
          </form>
        </section>

        <section aria-label="Kontak Sarpras" className="flex w-full flex-col gap-3 lg:max-w-[300px]">
          <a
            href={CONTACT.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${CHANNEL_LINK} items-center`}
          >
            <ChannelIcon src="/icons/contact-chat.svg" width={20} height={20} />
            <span className="flex flex-col">
              <span className={CHANNEL_TITLE}>WhatsApp</span>
              <span className="text-xs leading-6">{CONTACT.whatsapp.display}</span>
            </span>
          </a>
          <a href={`mailto:${CONTACT.email}`} className={`${CHANNEL_LINK} items-center`}>
            <ChannelIcon src="/icons/contact-mail.svg" width={20} height={16} />
            <span className="flex min-w-0 flex-col">
              <span className={CHANNEL_TITLE}>Email Support</span>
              <span className="text-xs leading-6 break-all">{CONTACT.email}</span>
            </span>
          </a>
          <div className={`${CHANNEL} flex-col`}>
            <div className="flex items-center gap-3">
              <ChannelIcon src="/icons/contact-location.svg" width={27} height={21} />
              <p className="flex flex-col">
                <span className={CHANNEL_TITLE}>Alamat Kantor</span>
                <span className="text-xs leading-6">{CONTACT.office.name}</span>
              </p>
            </div>
            <address className="text-xs leading-[18px] text-muted not-italic">{CONTACT.office.address}</address>
          </div>
        </section>
      </Card>

      <ResultDialog
        open={outcome !== null}
        onClose={() => setOutcome(null)}
        tone={outcome === "failed" ? "failure" : "success"}
        title={outcome === "failed" ? "Pengaduan Gagal Terkirim" : "Pengaduan Terkirim"}
      >
        {outcome === "failed"
          ? (storageError ?? "Terjadi kesalahan saat mengirim pengaduan. Silakan coba lagi.")
          : "Terima kasih. Admin gedung akan meninjau pengaduan Anda."}
      </ResultDialog>
    </main>
  );
}
