const BLOCK = "rounded-md border border-border bg-surface";

export function AdminDashboardSkeleton() {
  return (
    <div aria-busy="true" className="grid gap-2 xl:grid-cols-[750fr_384fr]">
      <p className="sr-only" role="status">
        Memuat dashboard...
      </p>
      <div className="flex flex-col gap-2">
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="h-[86px] rounded-md bg-primary-soft" />
          <div className="h-[86px] rounded-md bg-primary-soft" />
          <div className="h-[86px] rounded-md bg-primary-soft" />
        </div>
        <div className={`h-[230px] ${BLOCK}`} />
        <div className={`h-[240px] ${BLOCK}`} />
      </div>
      <div className="flex flex-col gap-2">
        <div className={`h-[150px] ${BLOCK}`} />
        <div className={`h-[420px] ${BLOCK}`} />
      </div>
    </div>
  );
}
