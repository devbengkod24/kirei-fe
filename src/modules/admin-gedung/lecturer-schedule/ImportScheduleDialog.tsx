"use client";

import { useState, useTransition } from "react";
import { Field, INPUT_CLASS } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { LecturerSchedule } from "@/types/schedule";
import { saveLecturerSchedule } from "./actions";
import { parseScheduleCsv, SCHEDULE_COLUMNS, semesterSchema, type ParsedSchedule } from "./scheduleCsv";

export interface ImportScheduleDialogProps {
  /** Rooms on the admin's floor plans, to check the CSV against. */
  roomCodes: string[];
  /** The current schedule's semester, so a new import usually only needs the file. */
  semester: { startDate: string; endDate: string } | null;
  templateHref: string;
  onClose: () => void;
  onSaved: (schedule: LecturerSchedule) => void;
}

const CSV_MAX_SIZE_KB = 512;

type Picked = { fileName: string; result: ParsedSchedule };

/** "Import Jadwal (CSV)": semester dates and the file, checked row by row before it replaces the schedule. */
export function ImportScheduleDialog({ roomCodes, semester: current, templateHref, onClose, onSaved }: ImportScheduleDialogProps) {
  const [semester, setSemester] = useState(current ?? { startDate: "", endDate: "" });
  const [picked, setPicked] = useState<Picked | null>(null);
  const [fileError, setFileError] = useState<string>();
  const [semesterErrors, setSemesterErrors] = useState<Partial<Record<"startDate" | "endDate", string>>>({});
  const [saveError, setSaveError] = useState<string>();
  const [saving, startSaving] = useTransition();

  const pickFile = async (file: File | undefined) => {
    setSaveError(undefined);
    setPicked(null);
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv")) return setFileError("Berkas harus berformat CSV.");
    if (file.size > CSV_MAX_SIZE_KB * 1024) return setFileError(`Ukuran berkas maksimal ${CSV_MAX_SIZE_KB} KB.`);
    setFileError(undefined);
    setPicked({ fileName: file.name, result: parseScheduleCsv(await file.text(), roomCodes) });
  };

  const errors = picked?.result.errors ?? [];
  const entries = picked?.result.entries ?? [];
  const canSave = picked !== null && errors.length === 0 && entries.length > 0 && !saving;

  const save = () => {
    if (!picked) return setFileError("Pilih berkas CSV jadwal.");
    const parsedSemester = semesterSchema.safeParse(semester);
    if (!parsedSemester.success) {
      setSemesterErrors(Object.fromEntries(parsedSemester.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setSemesterErrors({});
    startSaving(async () => {
      const result = await saveLecturerSchedule({ semester: parsedSemester.data, entries });
      if (result.ok) onSaved(result.schedule);
      else setSaveError(result.message);
    });
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Import Jadwal (CSV)"
      footer={
        <>
          <Button variant="danger-outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={save} disabled={picked !== null && !canSave}>
            {saving ? "Menyimpan..." : "Simpan Jadwal"}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <p className="text-xs text-muted">
          Tiap baris menutup ruangan itu setiap minggu pada hari dan jam kuliahnya, selama semester yang dipilih. Import baru
          menggantikan seluruh jadwal sebelumnya.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Mulai semester" htmlFor="semester-start" error={semesterErrors.startDate}>
            <input
              id="semester-start"
              type="date"
              value={semester.startDate}
              onChange={(event) => setSemester({ ...semester, startDate: event.target.value })}
              aria-invalid={semesterErrors.startDate ? true : undefined}
              aria-describedby={semesterErrors.startDate ? "semester-start-error" : undefined}
              className={INPUT_CLASS}
            />
          </Field>
          <Field label="Selesai semester" htmlFor="semester-end" error={semesterErrors.endDate}>
            <input
              id="semester-end"
              type="date"
              value={semester.endDate}
              onChange={(event) => setSemester({ ...semester, endDate: event.target.value })}
              aria-invalid={semesterErrors.endDate ? true : undefined}
              aria-describedby={semesterErrors.endDate ? "semester-end-error" : undefined}
              className={INPUT_CLASS}
            />
          </Field>
        </div>

        <Field label="Berkas CSV" htmlFor="schedule-file" error={fileError}>
          <input
            id="schedule-file"
            type="file"
            accept=".csv,text/csv"
            onChange={(event) => void pickFile(event.target.files?.[0])}
            aria-invalid={fileError ? true : undefined}
            aria-describedby={fileError ? "schedule-file-error schedule-format" : "schedule-format"}
            className={`${INPUT_CLASS} file:mr-3 file:rounded-md file:border-0 file:bg-primary-soft file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary`}
          />
        </Field>
        <p id="schedule-format" className="text-[11px] text-muted">
          Kolom: <code className="break-words">{SCHEDULE_COLUMNS.join(", ")}</code>. Hari ditulis Senin sampai Minggu, jam dalam
          WIB seperti 07:30. Pemisah koma atau titik koma.{" "}
          <a href={templateHref} download className="font-medium text-primary underline-offset-2 hover:underline">
            Unduh contoh CSV
          </a>
        </p>

        {picked && errors.length > 0 && (
          <div role="alert" className="flex flex-col gap-2 rounded-md bg-danger-soft px-3 py-2 text-xs text-danger">
            <p className="font-semibold">
              {errors.length} baris di {picked.fileName} perlu diperbaiki. Perbaiki berkasnya, lalu pilih ulang.
            </p>
            <ul className="flex max-h-48 flex-col gap-1 overflow-y-auto">
              {errors.map((error) => (
                <li key={error.row}>
                  <span className="font-semibold">Baris {error.row}:</span> {error.messages.join(" ")}
                </li>
              ))}
            </ul>
          </div>
        )}
        {picked && errors.length === 0 && (
          <p role="status" className="rounded-md bg-primary-soft px-3 py-2 text-xs text-primary">
            {entries.length} jadwal dari {picked.fileName} siap disimpan.
          </p>
        )}
        {saveError && (
          <p role="alert" className="rounded-md bg-danger-soft px-3 py-2 text-xs text-danger">
            {saveError}
          </p>
        )}
      </div>
    </Modal>
  );
}
