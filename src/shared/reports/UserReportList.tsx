"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { Popover } from "@/components/ui/Popover";
import { TABLE, TABLE_CELL, TABLE_HEAD_CELL, TABLE_ROW } from "@/components/ui/table";
import { usePagination } from "@/hooks/usePagination";
import { formatRelativeDayWIB, formatTimeWIB } from "@/lib/date";
import type { UserReport } from "@/types/report";
import { DEFAULT_REPORT_FILTER, filterReports, isDefaultReportFilter } from "./filterReports";
import { ReportFilterForm } from "./ReportFilterForm";
import { REPORT_CATEGORY_LABEL } from "./report-labels";
import { ReportDetailDialog } from "./ReportDetailDialog";

export interface UserReportListProps {
  reports: UserReport[];
  /** ISO time the list was loaded, so "Hari ini" matches the server's day. */
  loadedAt: string;
}

export const FILTER_BUTTON =
  "flex min-h-11 items-center gap-1 rounded-md bg-primary px-4 text-xs font-medium text-on-primary hover:bg-primary-hover";

const TH = `${TABLE_HEAD_CELL} text-left`;
const TD = TABLE_CELL;
const VIEW_BUTTON = "flex h-11 w-11 items-center justify-center rounded-md border border-border transition-colors hover:bg-page";

export function UserReportList({ reports, loadedAt }: UserReportListProps) {
  const [filter, setFilter] = useState(DEFAULT_REPORT_FILTER);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewing, setViewing] = useState<UserReport | null>(null);
  const visible = filterReports(reports, filter, loadedAt);
  const paging = usePagination(visible, 10);
  const filtered = !isDefaultReportFilter(filter);

  const renderViewButton = (report: UserReport) => (
    <button
      type="button"
      onClick={() => setViewing(report)}
      aria-label={`Lihat detail laporan ${report.authorName}`}
      className={VIEW_BUTTON}
    >
      <Image src="/icons/admin/view.svg" alt="" width={14} height={11} />
    </button>
  );

  return (
    <Card as="section" aria-labelledby="reports-title" className="flex flex-col gap-6 p-4 md:p-6">
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
        <>
          <table className={`hidden ${TABLE} text-left lg:table`}>
            <caption className="sr-only">Tabel laporan pengguna</caption>
            <thead>
              <tr className={TABLE_ROW}>
                <th scope="col" className={TH}>Tanggal</th>
                <th scope="col" className={TH}>Waktu</th>
                <th scope="col" className={TH}>Pelapor</th>
                <th scope="col" className={TH}>Kategori</th>
                <th scope="col" className={TH}>Ruangan</th>
                <th scope="col" className={TH}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paging.items.map((report) => (
                <tr key={report.id} className={TABLE_ROW}>
                  <td className={`${TD} whitespace-nowrap`}>{formatRelativeDayWIB(report.createdAt, loadedAt)}</td>
                  <td className={`${TD} whitespace-nowrap`}>
                    <time dateTime={report.createdAt}>{formatTimeWIB(report.createdAt)} WIB</time>
                  </td>
                  <td className={TD}>{report.authorName}</td>
                  <td className={`${TD} whitespace-nowrap font-medium text-primary`}>{REPORT_CATEGORY_LABEL[report.category]}</td>
                  <td className={`${TD} whitespace-nowrap`}>{report.roomCode ?? "-"}</td>
                  <td className={TD}>{renderViewButton(report)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Below lg the table becomes a list, like the reservation tables. */}
          <ul className="flex flex-col lg:hidden">
            {paging.items.map((report) => (
              <li key={report.id} className="border-b border-border py-3 first:pt-0">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <span className="text-sm font-medium text-primary">{REPORT_CATEGORY_LABEL[report.category]}</span>
                  <span className="shrink-0 text-right text-xs text-muted">
                    {formatRelativeDayWIB(report.createdAt, loadedAt)},{" "}
                    <time dateTime={report.createdAt}>{formatTimeWIB(report.createdAt)} WIB</time>
                  </span>
                </div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                  <dt className="text-primary">Pelapor</dt>
                  <dd className="break-words">{report.authorName}</dd>
                  <dt className="text-primary">Ruangan</dt>
                  <dd>{report.roomCode ?? "-"}</dd>
                </dl>
                <div className="mt-2 flex justify-end">{renderViewButton(report)}</div>
              </li>
            ))}
          </ul>
        </>
      )}

      <Pagination
        page={paging.page}
        pageCount={paging.pageCount}
        pageSize={paging.pageSize}
        onPageChange={paging.setPage}
        onPageSizeChange={paging.setPageSize}
      />

      {viewing && <ReportDetailDialog report={viewing} onClose={() => setViewing(null)} />}
    </Card>
  );
}
