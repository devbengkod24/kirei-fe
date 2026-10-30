export interface Page<T> {
  items: T[];
  /** 1-based, clamped to the available pages */
  page: number;
  pageCount: number;
}

/** Client-side paging for lists that are already fully loaded. */
export function paginate<T>(items: T[], page: number, pageSize: number): Page<T> {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = (current - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), page: current, pageCount };
}
