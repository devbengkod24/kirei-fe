import { hardCopyLabel } from "./hardCopy";

export interface HardCopyBadgeProps {
  submitted: boolean;
}

/** Shows whether the borrower's physical loan letter has been handed in (Sudah / Belum). */
export function HardCopyBadge({ submitted }: HardCopyBadgeProps) {
  return (
    <span
      className={`inline-block rounded-inner px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${
        submitted ? "bg-success-soft text-success" : "bg-neutral-soft text-ink"
      }`}
    >
      {hardCopyLabel(submitted)}
    </span>
  );
}
