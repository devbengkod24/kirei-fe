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

const ARROW_BUTTON =
  "flex size-11 items-center justify-center rounded-md hover:bg-primary-soft disabled:opacity-40 disabled:hover:bg-transparent";

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
            className="min-h-11 appearance-none rounded-md bg-primary-soft py-1 pr-6 pl-2 text-xs"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <Image
            src="/icons/admin/page-size-chevron.svg"
            alt=""
            width={16}
            height={16}
            className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2"
          />
        </div>
        <label htmlFor={sizeId}>per halaman</label>
      </div>

      <nav aria-label="Halaman" className="flex items-center gap-1">
        <span className="flex min-w-[26px] justify-center rounded-sm bg-primary-soft p-1" aria-current="page">
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
          <Image src="/icons/admin/page-prev.svg" alt="" width={20} height={20} />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
          aria-label="Halaman berikutnya"
          className={`${ARROW_BUTTON} -ml-2`}
        >
          <Image src="/icons/admin/page-next.svg" alt="" width={20} height={20} />
        </button>
      </nav>
    </div>
  );
}
