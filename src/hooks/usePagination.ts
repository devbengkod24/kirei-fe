"use client";

import { useState } from "react";
import { paginate } from "@/lib/paginate";

export function usePagination<T>(items: T[], initialPageSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const current = paginate(items, page, pageSize);

  return {
    ...current,
    pageSize,
    setPage,
    setPageSize: (size: number) => {
      setPageSize(size);
      setPage(1);
    },
  };
}
