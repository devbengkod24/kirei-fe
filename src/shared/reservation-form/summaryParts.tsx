import Image from "next/image";
import { CAPS_LABEL_CLASS, INPUT_CLASS } from "@/components/form/Field";

/** Small building blocks shared by the summary dialogs of every reservation type. */

// Same field styling as components/form/Field, used by every role's forms.
export const SUMMARY_LABEL = CAPS_LABEL_CLASS;
export const SUMMARY_INPUT = INPUT_CLASS;

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-[11px] text-danger">
      {message}
    </p>
  );
}

/** Read-only value in a boxed field, e.g. the borrower's name. */
export function SummaryValue({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className={SUMMARY_LABEL}>{label}</p>
      <p className="flex min-h-11 items-center rounded-md border border-border bg-page px-3 text-sm">{children}</p>
    </div>
  );
}

export interface SummaryWhenProps {
  /** e.g. "Selasa, 20 Oktober 2026" */
  date: string;
  /** "HH:mm" WIB */
  startTime: string;
  endTime: string;
  /** Where, e.g. [{ icon, label }] for building and room */
  places: { iconSrc: string; iconWidth?: number; iconHeight?: number; label: string }[];
}

export function SummaryWhen({ date, startTime, endTime, places }: SummaryWhenProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className={SUMMARY_LABEL}>Waktu Peminjaman</p>
      <div className="flex flex-col gap-1.5 text-sm">
        <p className="flex items-center gap-2">
          <Image src="/icons/calendar-outline.svg" alt="" width={16} height={16} />
          {date}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <p className="flex items-center gap-2">
            <Image src="/icons/clock-outline.svg" alt="" width={16} height={16} />
            {startTime.replace(":", ".")} WIB
            <Image src="/icons/step-arrow.svg" alt="sampai" width={18} height={18} />
            {endTime.replace(":", ".")} WIB
          </p>
          <p className="flex items-center gap-3 text-xs">
            {places.map((place) => (
              <span key={place.label} className="flex items-center gap-1">
                <Image src={place.iconSrc} alt="" width={place.iconWidth ?? 16} height={place.iconHeight ?? 16} />
                {place.label}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Label on the left, value on the right; used by the vehicle summary. */
export function SummaryRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-6 text-sm">
      <dt className="shrink-0">{label}</dt>
      <dd className="text-right break-words">{children}</dd>
    </div>
  );
}
