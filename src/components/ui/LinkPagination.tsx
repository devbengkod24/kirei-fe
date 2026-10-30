import Image from "next/image";
import Link from "next/link";

export interface LinkPaginationProps {
  page: number;
  totalPages: number;
  /** null on the first page */
  prevHref: string | null;
  /** null on the last page */
  nextHref: string | null;
}

function PageLink({ href, label, iconSrc }: { href: string | null; label: string; iconSrc: string }) {
  const icon = <Image src={iconSrc} alt="" width={20} height={20} />;
  const className = "flex size-11 items-center justify-center rounded-md";

  if (!href) {
    return (
      <span aria-disabled="true" aria-label={label} role="link" className={`${className} opacity-30`}>
        {icon}
      </span>
    );
  }

  return (
    <Link href={href} scroll={false} aria-label={label} className={`${className} hover:bg-primary-soft active:bg-border`}>
      {icon}
    </Link>
  );
}

export function LinkPagination({ page, totalPages, prevHref, nextHref }: LinkPaginationProps) {
  return (
    <nav aria-label="Halaman" className="flex items-center gap-1 text-xs">
      <span className="rounded-sm bg-primary-soft px-2 py-1" aria-current="page">
        {page}
      </span>
      <span>dari {totalPages} halaman</span>
      <span className="-mr-3 flex">
        <PageLink href={prevHref} label="Halaman sebelumnya" iconSrc="/icons/page-prev.svg" />
        <PageLink href={nextHref} label="Halaman berikutnya" iconSrc="/icons/page-next.svg" />
      </span>
    </nav>
  );
}
