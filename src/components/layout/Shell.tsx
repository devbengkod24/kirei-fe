"use client";

import React, { useState, useEffect } from "react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

export interface ShellProps {
  brandLogo: React.ReactNode;
  brandTitle: string;
  brandSubtitle?: string;
  navItems: NavItem[];
  secondaryNavItems?: NavItem[];
  bottomAction?: React.ReactNode;
  userAvatar?: React.ReactNode;
  currentPageTitle: string;
  children: React.ReactNode;
}

export function Shell({
  brandLogo,
  brandTitle,
  brandSubtitle,
  navItems,
  secondaryNavItems = [],
  bottomAction,
  userAvatar,
  currentPageTitle,
  children,
}: ShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const renderNavList = (items: NavItem[]) => (
    <ul className="space-y-1.5 list-none p-0 m-0">
      {items.map((item) => {
        const activeClass = item.isActive
          ? "bg-[var(--brand-primary)] text-white shadow-sm font-semibold"
          : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] font-medium";

        return (
          <li key={item.id}>
            <a
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-2.5 rounded-[var(--radius-md)] text-sm transition-colors min-h-[44px] ${activeClass}`}
            >
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="min-h-screen bg-[var(--surface-page)] flex flex-col md:flex-row">
      {/* Mobile Top Navigation Bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[var(--surface-card)] border-b border-[var(--border-subtle)] sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Buka menu navigasi"
            className="p-2 -ml-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-[var(--radius-md)] focus-visible:outline-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            {brandLogo}
            <div>
              <div className="font-bold text-sm text-[var(--text-primary)] leading-tight">{brandTitle}</div>
              {brandSubtitle && (
                <div className="text-[10px] text-[var(--text-muted)] leading-tight">{brandSubtitle}</div>
              )}
            </div>
          </div>
        </div>
        {userAvatar && <div>{userAvatar}</div>}
      </header>

      {/* Mobile Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigasi"
          className="fixed inset-0 z-50 md:hidden flex"
        >
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[80vw] bg-[var(--surface-card)] h-full p-5 flex flex-col shadow-xl z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-5 border-b border-[var(--border-subtle)] mb-5">
              <div className="flex items-center gap-3">
                {brandLogo}
                <div>
                  <div className="font-bold text-sm text-[var(--text-primary)]">{brandTitle}</div>
                  {brandSubtitle && (
                    <div className="text-[10px] text-[var(--text-muted)]">{brandSubtitle}</div>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Tutup menu navigasi"
                className="p-2 -mr-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-[var(--radius-md)]"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav aria-label="Navigasi Utama" className="flex-1 space-y-6">
              {renderNavList(navItems)}
              {secondaryNavItems.length > 0 && (
                <div className="pt-4 border-t border-[var(--border-subtle)]">
                  {renderNavList(secondaryNavItems)}
                </div>
              )}
            </nav>

            {bottomAction && <div className="pt-4 border-t border-[var(--border-subtle)] mt-auto">{bottomAction}</div>}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside
        aria-label="Navigasi Samping"
        className="hidden md:flex flex-col w-64 lg:w-72 bg-[var(--surface-card)] border-r border-[var(--border-subtle)] p-6 min-h-screen flex-shrink-0"
      >
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-8">
          {brandLogo}
          <div>
            <h1 className="font-bold text-base text-[var(--text-primary)] leading-tight tracking-tight">
              {brandTitle}
            </h1>
            {brandSubtitle && (
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{brandSubtitle}</p>
            )}
          </div>
        </div>

        {/* Primary and Secondary Navigation */}
        <nav aria-label="Menu Aplikasi" className="flex-1 space-y-6">
          {renderNavList(navItems)}
          {secondaryNavItems.length > 0 && (
            <div className="pt-5 border-t border-[var(--border-subtle)]">
              {renderNavList(secondaryNavItems)}
            </div>
          )}
        </nav>

        {/* Bottom Action (e.g. Logout button) */}
        {bottomAction && <div className="pt-6 mt-auto">{bottomAction}</div>}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-5 border-b border-[var(--border-subtle)] bg-[var(--surface-card)]">
          <h2 className="text-sm font-semibold text-[var(--brand-primary)]">{currentPageTitle}</h2>
          {userAvatar && <div className="flex items-center gap-3">{userAvatar}</div>}
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

