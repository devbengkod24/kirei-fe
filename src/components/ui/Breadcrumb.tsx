import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  /** Left out for the current page, which is shown as plain text. */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Accessible name of the trail. */
  label?: string;
}

/** Trail from a parent page to the current one; the last item is the current page. */
export function Breadcrumb({ items, label = "Lokasi halaman" }: BreadcrumbProps) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-x-1 text-xs">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="text-muted">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
                </svg>
              )}
              {item.href && !current ? (
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-sm text-muted underline-offset-4 hover:text-primary hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={current ? "page" : undefined} className="inline-flex min-h-11 items-center font-medium text-primary">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
