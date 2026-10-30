import Link from "next/link";

export interface SegmentedLink {
  href: string;
  label: string;
}

export interface SegmentedLinksProps {
  label: string;
  links: SegmentedLink[];
  activeHref: string;
}

/** Segmented control whose segments are pages, so each tab has its own URL. */
export function SegmentedLinks({ label, links, activeHref }: SegmentedLinksProps) {
  return (
    <nav aria-label={label} className="inline-flex rounded-md border border-border bg-surface p-1">
      {links.map((link) => {
        const active = link.href === activeHref;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-11 min-w-32 items-center justify-center rounded-md px-6 text-xs transition-colors ${
              active ? "bg-primary font-medium text-on-primary" : "text-ink hover:bg-primary-soft hover:text-primary"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
