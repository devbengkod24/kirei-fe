"use client";

import { useState, useTransition } from "react";
import { Field, INPUT_CLASS } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatDateLongWIB, formatDateTimeShortWIB, wibToIso } from "@/lib/date";
import type { LecturerSchedule } from "@/types/schedule";
import { saveLecturerSchedule } from "./actions";
import { DAY_LABEL, parseScheduleCsv, SCHEDULE_COLUMNS, semesterSchema, type ParsedSchedule } from "./scheduleCsv";

export interface LecturerScheduleUploadProps {
  schedule: LecturerSchedule | null;
  roomCodes: string[];
  templateHref: string;
}

const CSV_MAX_SIZE_KB = 512;

const dayText = (dateKey: string) => formatDateLongWIB(wibToIso(dateKey, "12:00"));
const timeText = (time: string) => time.replace(":", ".");

type Picked = { fileName: string; result: ParsedSchedule };

export function LecturerScheduleUpload({ schedule: initial, roomCodes, templateHref }: LecturerScheduleUploadProps) {
  const [schedule, setSchedule] = useState(initial);
  const [semester, setSemester] = useState({ startDate: initial?.semester.startDate ?? "", endDate: initial?.semester.endDate ?? "" });
  const [picked, setPicked] = useState<Picked | null>(null);
  const [fileError, setFileError] = useState<string>();
  const [semesterErrors, setSemesterErrors] = useState<Partial<Record<"startDate" | "endDate", string>>>({});
  const [outcome, setOutcome] = useState<{ tone: "success" | "danger"; text: string } | null>(null);
  const [saving, startSaving] = useTransition();

  const pickFile = async (file: File | undefined) => {
    setOutcome(null);
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
    const parsedSemester = semesterSchema.safeParse(semester);
    if (!parsedSemester.success) {
      setSemesterErrors(
        Object.fromEntries(parsedSemester.error.issues.map((issue) => [String(issue.path[0]), issue.message])),
      );
      return;
    }
    setSemesterErrors({});
    startSaving(async () => {
      const result = await saveLecturerSchedule({ semester: parsedSemester.data, entries });
      if (result.ok) {
        setSchedule(result.schedule);
        setPicked(null);
        setOutcome({
          tone: "success",
          text: `${result.schedule.entries.length} jadwal disimpan. Ruangannya kini tidak tersedia pada jam kuliah di denah dan form reservasi.`,
        });
      } else {
        setOutcome({ tone: "danger", text: result.message });
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card as="section" aria-labelledby="upload-title" className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-1">
          <h2 id="upload-title" className="text-base font-semibold">
            Unggah Jadwal Dosen
          </h2>
          <p className="text-xs text-muted">
            Tiap baris menutup ruangan itu setiap minggu pada hari dan jam kuliahnya, selama semester yang dipilih.
            Unggahan baru menggantikan seluruh jadwal sebelumnya.
          </p>
        </div>

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
          Kolom: <code className="break-words">{SCHEDULE_COLUMNS.join(", ")}</code>. Hari ditulis Senin sampai Minggu, jam
          dalam WIB seperti 07:30. Pemisah koma atau titik koma.{" "}
          <a href={templateHref} download className="font-medium text-primary underline-offset-2 hover:underline">
            Unduh contoh CSV
          </a>
        </p>

        {picked && errors.length > 0 && (
          <div role="alert" className="flex flex-col gap-2 rounded-md bg-danger-soft px-3 py-2 text-xs text-danger">
            <p className="font-semibold">
              {errors.length} baris di {picked.fileName} perlu diperbaiki. Perbaiki berkasnya, lalu pilih ulang.
            </p>
            <ul className="flex max-h-64 flex-col gap-1 overflow-y-auto">
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
        {outcome && (
          <p
            role={outcome.tone === "danger" ? "alert" : "status"}
            className={`rounded-md px-3 py-2 text-xs ${outcome.tone === "danger" ? "bg-danger-soft text-danger" : "bg-success-soft text-success"}`}
          >
            {outcome.text}
          </p>
        )}

        <div className="flex justify-end">
          <Button onClick={save} disabled={!canSave}>
            {saving ? "Menyimpan..." : "Simpan Jadwal"}
          </Button>
        </div>
      </Card>

      <Card as="section" aria-labelledby="current-title" className="flex flex-col gap-3 p-4">
        <h2 id="current-title" className="text-base font-semibold">
          Jadwal Berlaku
        </h2>
        {schedule ? (
          <>
            <p className="text-xs text-muted">
              {dayText(schedule.semester.startDate)} sampai {dayText(schedule.semester.endDate)} · {schedule.entries.length}{" "}
              jadwal · diunggah {formatDateTimeShortWIB(schedule.uploadedAt)}
            </p>
            <ul className="flex flex-col">
              {schedule.entries.map((entry, index) => (
                <li
                  key={`${entry.day}-${entry.roomCode}-${entry.startTime}-${index}`}
                  className="grid gap-x-4 gap-y-0.5 border-b border-border py-2 text-xs last:border-b-0 sm:grid-cols-[7rem_8rem_5rem_1fr]"
                >
                  <span className="font-medium">{DAY_LABEL[entry.day]}</span>
                  <span>
                    {timeText(entry.startTime)} - {timeText(entry.endTime)} WIB
                  </span>
                  <span>{entry.roomCode}</span>
                  <span className="min-w-0 break-words text-muted">
                    {entry.courseName}, {entry.lecturerName}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="py-6 text-center text-sm text-muted">Belum ada jadwal dosen untuk fakultas ini.</p>
        )}
      </Card>
    </div>
  );
}
