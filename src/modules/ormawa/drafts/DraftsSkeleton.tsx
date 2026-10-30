const BLOCK = "rounded-md border border-border bg-surface";

export function DraftsSkeleton() {
  return (
    <div aria-busy="true" className="flex flex-col gap-6">
      <p className="sr-only" role="status">
        Memuat draft reservasi...
      </p>
      {[0, 1].map((index) => (
        <div key={index} className="grid gap-4 lg:grid-cols-[minmax(0,724fr)_minmax(0,394fr)] lg:gap-6">
          <div className={`h-[260px] ${BLOCK}`} />
          <div className={`h-[260px] ${BLOCK}`} />
        </div>
      ))}
    </div>
  );
}
