const BLOCK = "rounded-md border border-border bg-surface";

export function ReservationFormSkeleton() {
  return (
    <div aria-busy="true" className="flex flex-col gap-2 lg:grid lg:grid-cols-[minmax(0,1fr)_16rem]">
      <p className="sr-only" role="status">
        Memuat denah dan jadwal...
      </p>
      <div className={`h-[580px] ${BLOCK}`} />
      <div className="flex flex-col gap-2">
        <div className={`h-[138px] ${BLOCK}`} />
        <div className={`h-[97px] ${BLOCK}`} />
        <div className={`h-[140px] ${BLOCK}`} />
        <div className={`h-[113px] ${BLOCK}`} />
        <div className="h-12 rounded-md bg-primary-soft" />
      </div>
    </div>
  );
}
