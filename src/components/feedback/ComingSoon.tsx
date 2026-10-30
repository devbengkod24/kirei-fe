import Link from "next/link";

export interface ComingSoonProps {
  title: string;
  backHref: string;
  backLabel: string;
}

export function ComingSoon({ title, backHref, backLabel }: ComingSoonProps) {
  return (
    <section className="mx-auto flex max-w-md flex-col items-center gap-2 rounded-md border border-border bg-surface px-6 py-12 text-center">
      <h2 className="text-base font-semibold text-primary">{title}</h2>
      <p className="text-sm text-muted">Halaman ini sedang dibangun dan belum bisa dipakai.</p>
      <Link href={backHref} className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline">
        {backLabel}
      </Link>
    </section>
  );
}
