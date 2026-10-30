const BLOCK = "rounded-md border border-border bg-surface";

export default function Loading() {
  return (
    <div aria-busy="true" className="mx-auto flex w-full max-w-[34rem] flex-col gap-2">
      <p className="sr-only" role="status">
        Memuat formulir...
      </p>
      <div className={`h-[250px] ${BLOCK}`} />
      <div className={`h-[112px] ${BLOCK}`} />
      <div className={`h-[113px] ${BLOCK}`} />
      <div className="h-12 rounded-md bg-primary-soft" />
    </div>
  );
}
