"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppBrand } from "@/components/brand/AppBrand";
import { LOGIN_HREF as LOGIN_PATH, NAV_ITEMS, SECTION_IDS } from "./content";
import { CloseIcon, MenuIcon } from "./LandingIcons";
import { scrollToSection } from "./scrollToSection";
import { useActiveSection } from "./useActiveSection";

const SECTION_LIST = NAV_ITEMS.map((item) => item.id);

// No display class here: each use sets its own, so `hidden lg:inline-flex` is not overridden.
const LOGIN_BUTTON =
  "min-h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-on-primary shadow-lg transition-colors hover:bg-primary-hover active:bg-primary";

export function LandingHeader() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_LIST);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // At the top the header sits over the hero; past 50px it sticks, in between it slides away.
  const position =
    scrollY === 0
      ? "absolute shadow-none"
      : scrollY > 50
        ? "fixed translate-y-0 border-b border-border shadow-lg"
        : "fixed -translate-y-full shadow-lg";

  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`top-0 left-0 z-50 w-full bg-surface/95 backdrop-blur-md transition-[translate,box-shadow,border-color] duration-300 ease-in-out ${position}`}
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            <Link href={`#${SECTION_IDS.home}`} onClick={(event) => goTo(event, SECTION_IDS.home)} aria-label="Ke beranda">
              <AppBrand />
            </Link>

            <nav aria-label="Bagian halaman" className="hidden lg:block">
              <ul className="flex items-center gap-2">
                {NAV_ITEMS.map((item) => {
                  const active = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => goTo(event, item.id)}
                        aria-current={active ? "location" : undefined}
                        className={`relative inline-flex min-h-11 items-center rounded-lg px-4 text-sm transition-colors ${
                          active ? "font-semibold text-primary" : "font-medium text-muted hover:bg-page hover:text-ink"
                        }`}
                      >
                        <span className="relative z-10">{item.label}</span>
                        {active && (
                          <motion.span
                            layoutId="landing-active-section"
                            className="absolute inset-0 rounded-lg bg-primary-soft"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Link href={LOGIN_PATH} className={`hidden lg:inline-flex ${LOGIN_BUTTON}`}>
              Masuk
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="landing-mobile-menu"
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              className="relative z-50 inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface shadow-lg transition-colors hover:bg-page active:bg-border lg:hidden"
            >
              {menuOpen ? <CloseIcon className="size-5 text-primary" /> : <MenuIcon className="size-5 text-primary" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="landing-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div aria-hidden="true" className="absolute inset-0 bg-ink/60" onClick={() => setMenuOpen(false)} />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu navigasi"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute top-0 right-0 left-0 border-b border-border bg-surface shadow-2xl"
            >
              <div className="flex h-16 items-center border-b border-border px-4">
                <AppBrand />
              </div>

              <div className="space-y-6 px-4 py-6">
                <div className="space-y-2">
                  <p className="mb-3 text-sm font-semibold text-muted">Navigasi</p>
                  <ul className="space-y-1">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(event) => goTo(event, item.id)}
                          className="block rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-primary-soft hover:text-primary active:bg-primary-tint"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border" />

                <div className="space-y-4">
                  <p className="text-sm font-semibold text-muted">Aksi cepat</p>
                  <Link href={LOGIN_PATH} className={`flex w-full py-4 text-base ${LOGIN_BUTTON}`}>
                    Masuk
                  </Link>
                </div>

                <p className="border-t border-border pt-4 text-center text-xs text-muted">
                  Reservasi fasilitas kampus Universitas Dian Nuswantoro
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
