import Image from "next/image";
import Link from "next/link";
import { STAT_TONES } from "@/shared/admin-dashboard/StatTile";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import type { TypeSummary } from "./getUniversityDashboard";

export interface TypeSummaryCardProps {
  summary: TypeSummary;
  /** Shown after the type, e.g. "FIK" when the faculty filter is on, or "Universitas". */
  scopeLabel: string;
  href: string;
  tone: keyof typeof STAT_TONES;
}

/** One reservation type at a glance; the whole card links to its Kelola Reservasi. */
export function TypeSummaryCard({ summary, scopeLabel, href, tone }: TypeSummaryCardProps) {
  const label = RESERVATION_TYPE_LABEL[summary.type];

  return (
    <Link
      href={href}
      aria-label={`${label}, ${scopeLabel}: ${summary.today} reservasi hari ini, ${summary.pending} menunggu persetujuan. Buka Kelola Reservasi ${label}.`}
      className={`group flex flex-col gap-3 rounded-md p-3 transition-shadow hover:shadow-[inset_0_0_0_1px_currentColor] ${STAT_TONES[tone]}`}
    >
      <span className="flex items-center justify-between gap-2 text-xs font-medium">
        <span>
          {label} <span className="font-normal opacity-80">· {scopeLabel}</span>
        </span>
        <Image src="/icons/chevron-right-all.svg" alt="" width={5} height={8} className="opacity-60 group-hover:opacity-100" />
      </span>
      <dl aria-hidden="true" className="grid grid-cols-3 gap-2">
        <div className="flex flex-col-reverse gap-1">
          <dt className="text-[11px]">Hari ini</dt>
          <dd className="text-2xl leading-6 font-semibold">{summary.today}</dd>
        </div>
        <div className="flex flex-col-reverse gap-1">
          <dt className="text-[11px]">Menunggu</dt>
          <dd className="text-2xl leading-6 font-semibold">{summary.pending}</dd>
        </div>
        <div className="flex flex-col-reverse gap-1">
          <dt className="text-[11px]">Tersedia</dt>
          <dd className="flex items-end gap-0.5">
            <span className="text-2xl leading-6 font-semibold">{summary.activeUnits}</span>
            <span className="text-[11px] leading-4 opacity-80">/{summary.totalUnits}</span>
          </dd>
        </div>
      </dl>
    </Link>
  );
}
