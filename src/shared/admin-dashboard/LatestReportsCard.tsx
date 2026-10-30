import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { MaskIcon } from "@/components/ui/MaskIcon";
import { formatDateTimeShortWIB } from "@/lib/date";
import { REPORT_CATEGORY_LABEL } from "@/shared/reports/report-labels";
import type { UserReport } from "@/types/report";

export interface LatestReportsCardProps {
  reports: UserReport[];
  allHref: string;
  className?: string;
}

export function LatestReportsCard({ reports, allHref, className = "" }: LatestReportsCardProps) {
  return (
    <Card as="section" aria-labelledby="latest-reports-title" className={`flex flex-col gap-2 p-3 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MaskIcon src="/icons/nav/user-reports.svg" size={20} />
          <h2 id="latest-reports-title" className="text-sm font-medium">
            Laporan Pengguna
          </h2>
        </div>
        <Link
          href={allHref}
          className="-my-3 inline-flex min-h-11 items-center gap-1.5 text-[11px] text-primary underline-offset-4 hover:underline"
        >
          Lihat semua
          <Image src="/icons/chevron-right-all.svg" alt="" width={4} height={6} />
        </Link>
      </div>

      {reports.length === 0 ? (
        <p className="py-8 text-center text-xs text-muted">Belum ada laporan. Laporan dari peminjam akan muncul di sini.</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report.id} className="border-b border-border p-1.5 last:border-b-0">
              <article className="flex flex-col gap-1.5">
                <h3 className="text-xs leading-[14px] font-medium text-primary">{REPORT_CATEGORY_LABEL[report.category]}</h3>
                <p className="line-clamp-3 text-xs">{report.body}</p>
                <p className="flex flex-wrap justify-between gap-x-4 text-[11px] tracking-[0.06em] text-muted">
                  <span>
                    Oleh <span className="font-semibold">{report.authorName}</span>
                  </span>
                  <time dateTime={report.createdAt}>{formatDateTimeShortWIB(report.createdAt)}</time>
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
