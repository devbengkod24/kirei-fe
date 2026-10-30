"use client";

import { useId } from "react";

export interface LetterFieldProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  /** `dropzone` in the side panel, `inline` in the summary dialog. */
  variant: "dropzone" | "inline";
}

const FOCUS_WITHIN = "has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-border-focus";

/** PDF picker for the loan letter. The visible label is the control; the input stays reachable by keyboard. */
export function LetterField({ file, onChange, error, variant }: LetterFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  const input = (
    <input
      id={id}
      type="file"
      accept="application/pdf,.pdf"
      aria-label="Surat peminjaman (PDF)"
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
      onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      className="sr-only"
    />
  );

  return (
    <div className="flex flex-col gap-1">
      {variant === "dropzone" ? (
        <label
          htmlFor={id}
          className={`flex min-h-15 flex-col items-center justify-center gap-0.5 rounded-md border border-dashed border-primary-tint-border bg-primary-tint px-2 py-2 text-center text-primary hover:bg-primary-soft ${FOCUS_WITHIN}`}
        >
          {input}
          <span className="text-[13px] font-medium">{file ? "Ganti berkas" : "Upload Berkas"}</span>
          <span className="max-w-full truncate text-[11px]">{file ? file.name : "PDF, opsional saat menyimpan draft"}</span>
        </label>
      ) : (
        <div className="flex min-h-11 items-center justify-between gap-2 rounded-md border border-border px-2 py-1">
          <span className={`min-w-0 truncate text-sm ${file ? "" : "text-muted"}`}>{file ? file.name : "Belum ada surat"}</span>
          <label
            htmlFor={id}
            className={`inline-flex min-h-11 shrink-0 items-center rounded-sm px-2 text-[11px] font-medium text-primary hover:bg-primary-soft ${FOCUS_WITHIN}`}
          >
            {input}
            {file ? "Unggah ulang" : "Pilih berkas"}
          </label>
        </div>
      )}
      {error && (
        <p id={errorId} className="text-[11px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
