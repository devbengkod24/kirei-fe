"use client";

import Image from "next/image";
import { useId } from "react";

export const PAGE_SIZE_OPTIONS = [5, 10, 20] as const;

export interface PaginationProps {
  page: number;
  pageCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

/** Callback-driven pagination for client lists; looks the same as LinkPagination, which uses URLs. */
const ARROW_BUTTON =
  "flex size-11 items-center justify-center rounded-md hover:bg-primary-soft active:bg-border disabled:opacity-30 disabled:hover:bg-transparent";

export function Pagination({ page, pageCount, pageSize, onPageChange, onPageSizeChange }: PaginationProps) {
  const sizeId = useId();

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs">
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            id={sizeId}
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="min-h-11 appearance-none rounded-inner bg-primary-soft py-1 pr-6 pl-2 text-xs hover:bg-border"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <Image
            src="/icons/chevron-down-small.svg"
            alt=""
            width={16}
            height={16}
            className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2"
          />
        </div>
        <label htmlFor={sizeId}>per halaman</label>
      </div>

      <nav aria-label="Halaman" className="flex items-center gap-1">
        <span className="rounded-sm bg-primary-soft px-2 py-1" aria-current="page">
          {page}
        </span>
        <span>dari {pageCount} halaman</span>
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Halaman sebelumnya"
          className={ARROW_BUTTON}
        >
          <Image src="/icons/page-prev.svg" alt="" width={20} height={20} />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
          aria-label="Halaman berikutnya"
          className={`${ARROW_BUTTON} -ml-2`}
        >
          <Image src="/icons/page-next.svg" alt="" width={20} height={20} />
        </button>
      </nav>
    </div>
  );
}
