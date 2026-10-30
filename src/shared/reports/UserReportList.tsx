"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { Popover } from "@/components/ui/Popover";
import { usePagination } from "@/hooks/usePagination";
import { formatRelativeDayWIB, formatTimeWIB } from "@/lib/date";
import type { UserReport } from "@/types/report";
import { DEFAULT_REPORT_FILTER, filterReports, isDefaultReportFilter } from "./filterReports";
import { ReportFilterForm } from "./ReportFilterForm";
import { REPORT_CATEGORY_LABEL } from "./report-labels";

export interface UserReportListProps {
  reports: UserReport[];
  /** ISO time the list was loaded, so "Hari ini" matches the server's day. */
  loadedAt: string;
}

export const FILTER_BUTTON =
  "flex min-h-11 items-center gap-1 rounded-md bg-primary px-4 text-xs font-medium text-on-primary hover:bg-primary-hover";

export function UserReportList({ reports, loadedAt }: UserReportListProps) {
  const [filter, setFilter] = useState(DEFAULT_REPORT_FILTER);
  const [filterOpen, setFilterOpen] = useState(false);
  const visible = filterReports(reports, filter, loadedAt);
  const paging = usePagination(visible, 10);
  const filtered = !isDefaultReportFilter(filter);

  return (
    <Card as="section" aria-labelledby="reports-title" className="flex flex-col gap-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="reports-title" className="text-base font-semibold tracking-[0.05em]">
          Laporan Pengguna
        </h2>
        <Popover
          open={filterOpen}
          onOpenChange={setFilterOpen}
          label="Filter laporan"
          triggerClassName={FILTER_BUTTON}
          trigger={
            <>
              <Image src="/icons/admin/filter.svg" alt="" width={14} height={14} />
              Filter{filtered && <span className="sr-only"> (aktif)</span>}
              {filtered && <span aria-hidden="true" className="ml-1 rounded-sm bg-surface px-1 text-[10px] text-primary">aktif</span>}
            </>
          }
        >
          <ReportFilterForm
            value={filter}
            onApply={(next) => {
              setFilter(next);
              paging.setPage(1);
              setFilterOpen(false);
            }}
          />
        </Popover>
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-center">
          <p className="text-sm text-muted">
            {reports.length === 0 ? "Belum ada laporan dari peminjam." : "Tidak ada laporan yang cocok dengan filter."}
          </p>
          {filtered && (
            <Button variant="outline" onClick={() => setFilter(DEFAULT_REPORT_FILTER)}>
              Hapus filter
            </Button>
          )}
        </div>
      ) : (
        <ul className="flex flex-col gap-6">
          {paging.items.map((report) => (
            <li key={report.id} className="flex gap-4">
              <p className="flex w-[88px] shrink-0 flex-col border-r border-border pr-4 text-[10px] font-medium text-muted">
                <span>{formatRelativeDayWIB(report.createdAt, loadedAt)}</span>
                <time dateTime={report.createdAt}>{formatTimeWIB(report.createdAt)} WIB</time>
              </p>
              <article className="flex min-w-0 flex-col gap-1">
                <h3 className="text-xs font-semibold text-primary">{REPORT_CATEGORY_LABEL[report.category]}</h3>
                <p className="text-xs text-muted">{report.body}</p>
                <p className="text-[10px] text-muted">
                  Oleh <span className="font-semibold">{report.authorName}</span>
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}

      <Pagination
        page={paging.page}
        pageCount={paging.pageCount}
        pageSize={paging.pageSize}
        onPageChange={paging.setPage}
        onPageSizeChange={paging.setPageSize}
      />
    </Card>
  );
}
