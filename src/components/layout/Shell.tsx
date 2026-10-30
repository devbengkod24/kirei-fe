"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export interface ShellProps {
  brand: React.ReactNode;
  /** Each group is separated by a divider line. */
  navGroups: NavItem[][];
  sidebarFooter?: React.ReactNode;
  headerEnd?: React.ReactNode;
  children: React.ReactNode;
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavList({
  groups,
  pathname,
  onNavigate,
}: {
  groups: NavItem[][];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {groups.map((group, index) => (
        <ul key={index} className={`flex flex-col ${index > 0 ? "mx-4 mt-2 border-t border-border pt-2" : ""}`}>
          {group.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href} className={`py-0.5 ${index > 0 ? "" : "px-4"}`}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-2 rounded-md px-4 text-sm transition-colors ${
                    active ? "bg-primary text-on-primary" : "text-ink hover:bg-primary-soft hover:text-primary"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      ))}
    </>
  );
}

export function Shell({ brand, navGroups, sidebarFooter, headerEnd, children }: ShellProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const pageTitle = navGroups.flat().find((item) => isActive(pathname, item.href))?.label ?? "";

  useEffect(() => {
    if (!drawerOpen) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";
    const menuButton = menuButtonRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      menuButton?.focus();
    };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="min-h-screen md:flex">
      <aside
        aria-label="Navigasi samping"
        className="sticky top-0 hidden h-screen w-[250px] shrink-0 flex-col justify-between border-r border-border bg-surface pb-8 md:flex"
      >
        <div className="flex flex-col gap-10 overflow-y-auto py-5">
          <div className="py-2 pr-2 pl-6">{brand}</div>
          <nav aria-label="Menu utama">
            <NavList groups={navGroups} pathname={pathname} />
          </nav>
        </div>
        {sidebarFooter && <div className="px-4">{sidebarFooter}</div>}
      </aside>

      {drawerOpen && (
        <div role="dialog" aria-modal="true" aria-label="Menu navigasi" className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-ink/40" onClick={closeDrawer} aria-hidden="true" />
          <div className="relative flex h-full w-72 max-w-[85vw] flex-col justify-between overflow-y-auto bg-surface pb-6">
            <div className="flex flex-col gap-6 py-4">
              <div className="flex items-center justify-between pr-2 pl-6">
                {brand}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Tutup menu"
                  className="flex size-11 items-center justify-center rounded-md text-ink hover:bg-primary-soft"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav aria-label="Menu utama">
                <NavList groups={navGroups} pathname={pathname} onNavigate={closeDrawer} />
              </nav>
            </div>
            {sidebarFooter && <div className="px-4">{sidebarFooter}</div>}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-[69px] items-center justify-between gap-3 bg-surface px-4 md:static md:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Buka menu"
              aria-expanded={drawerOpen}
              className="-ml-2 flex size-11 items-center justify-center rounded-md text-ink hover:bg-primary-soft md:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="truncate text-xs leading-6 font-medium text-primary">{pageTitle}</h1>
          </div>
          {headerEnd}
        </header>

        <main className="flex-1 px-4 pt-5 pb-6 md:px-6">{children}</main>
      </div>
    </div>
  );
}
