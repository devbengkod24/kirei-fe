const BLOCK = "rounded-md border border-border bg-surface";

export function ReservationHistorySkeleton() {
  return (
    <div aria-busy="true" className="flex flex-col gap-4">
      <p className="sr-only" role="status">
        Memuat reservasi...
      </p>
      <div className="flex flex-col gap-3.5">
        <div className={`h-12 w-full sm:w-[400px] ${BLOCK}`} />
        <div className={`h-12 w-full sm:w-[268px] ${BLOCK}`} />
      </div>
      <div className="grid gap-3.5 xl:grid-cols-2">
        <div className={`h-[170px] ${BLOCK}`} />
        <div className={`h-[170px] ${BLOCK}`} />
        <div className={`h-[170px] ${BLOCK}`} />
      </div>
    </div>
  );
}
