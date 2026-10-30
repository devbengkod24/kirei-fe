"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LetterField } from "./LetterField";
import { PanelHeading } from "./PanelHeading";

export interface LetterPanelProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  /** Validates the first step and opens the summary. */
  onReview: () => void;
  className?: string;
}

/** Letter upload and the "Reservasi sekarang" button that close every booking form. */
export function LetterPanel({ file, onChange, error, onReview, className = "" }: LetterPanelProps) {
  return (
    <>
      <Card as="section" aria-labelledby="panel-letter" className={`flex flex-col gap-2 p-3 ${className}`}>
        <PanelHeading id="panel-letter" iconSrc="/icons/sticky-note.svg">
          Upload Surat Peminjaman
        </PanelHeading>
        <LetterField variant="dropzone" file={file} onChange={onChange} error={error} />
      </Card>

      {/* type="button": before hydration a submit button would send the fields as a GET query */}
      <Button onClick={onReview} className={`min-h-12 w-full text-base font-normal ${className}`}>
        Reservasi sekarang
      </Button>
    </>
  );
}
