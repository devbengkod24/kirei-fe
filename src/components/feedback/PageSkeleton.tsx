export interface PageSkeletonProps {
  /** Read by screen readers, e.g. "Memuat ruangan..." */
  label: string;
}

/** Generic loading block for list pages: a header row and one content card. */
export function PageSkeleton({ label }: PageSkeletonProps) {
  return (
    <div aria-busy="true" className="flex flex-col gap-3">
      <p className="sr-only" role="status">
        {label}
      </p>
      <div className="h-10 w-48 rounded-md bg-primary-soft" />
      <div className="h-[420px] rounded-md border border-border bg-surface" />
    </div>
  );
}
