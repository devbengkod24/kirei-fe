const BLOCK = "rounded-md border border-border bg-surface";

export function DashboardSkeleton() {
  return (
    <div aria-busy="true" className="flex flex-col gap-3">
      <p className="sr-only" role="status">
        Memuat dashboard...
      </p>
      <div className="h-[152px] rounded-lg bg-primary-soft" />
      <div className="grid gap-2 lg:grid-cols-2 xl:grid-cols-[332fr_312fr_485fr]">
        <div className={`h-[411px] ${BLOCK}`} />
        <div className={`h-[411px] ${BLOCK}`} />
        <div className={`h-[411px] lg:col-span-2 xl:col-span-1 ${BLOCK}`} />
      </div>
    </div>
  );
}
