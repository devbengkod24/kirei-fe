import Link from "next/link";

export interface SegmentedNavItem {
  label: string;
  href: string;
  active: boolean;
}

export interface SegmentedNavProps {
  /** Accessible name of the group, e.g. "Jenis reservasi". */
  label: string;
  items: SegmentedNavItem[];
}

/** Segmented picker whose options are links, so the choice lives in the URL. */
export function SegmentedNav({ label, items }: SegmentedNavProps) {
  return (
    <nav aria-label={label}>
      <ul className="flex w-full gap-0.5 rounded-md border border-border bg-surface p-0.5 sm:inline-flex sm:w-auto">
        {items.map((item) => (
          <li key={item.href} className="flex-1 sm:flex-none">
            <Link
              href={item.href}
              scroll={false}
              aria-current={item.active ? "page" : undefined}
              className={`flex min-h-11 items-center justify-center rounded-inner px-4 text-xs whitespace-nowrap transition-colors sm:min-w-32 ${
                item.active ? "bg-primary font-medium text-on-primary" : "text-ink hover:bg-primary-soft hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
