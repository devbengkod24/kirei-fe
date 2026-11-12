"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/config/site";
import { CAMPUS_ADDRESS, LOGIN_HREF, NAV_ITEMS, SECTION_IDS } from "./content";
import { scrollToSection } from "./scrollToSection";

const LINK = "inline-flex min-h-8 items-center text-sm text-on-primary/80 transition-colors duration-300 hover:text-on-primary";
const FACILITY_LINKS = ["Ruangan", "GOR", "Kendaraan"];

function SectionLink({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <a
      href={`#${id}`}
      onClick={(event) => {
        event.preventDefault();
        scrollToSection(id);
      }}
      className={LINK}
    >
      {children}
    </a>
  );
}

const reveal = (delay: number, from: { x?: number; y?: number }) => ({
  initial: { opacity: 0, ...from },
  whileInView: { opacity: 1, x: 0, y: 0 },
  transition: { duration: 0.8, delay },
  viewport: { once: true },
});

export function LandingFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-linear-to-br from-primary to-hero-end text-on-primary">
      <div className="relative px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div {...reveal(0.1, { x: -30 })} className="space-y-4">
              <div className="flex items-center gap-2.5">
                <Image src={SITE.logoSrc} alt="" width={40} height={40} className="rounded-full bg-surface" />
                <p className="font-brand text-xl font-bold">{SITE.name}</p>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-primary-tint">Sistem Reservasi Fasilitas Kampus</h2>
                <p className="text-sm leading-relaxed text-on-primary/80">
                  Satu tempat untuk memesan ruangan, GOR, dan kendaraan operasional Universitas Dian Nuswantoro.
                </p>
              </div>
            </motion.div>

            <motion.div {...reveal(0.2, { y: 30 })} className="space-y-4">
              <h2 className="text-lg font-semibold">Fasilitas</h2>
              <ul className="space-y-2">
                {FACILITY_LINKS.map((label) => (
                  <li key={label}>
                    <SectionLink id={SECTION_IDS.facilities}>{label}</SectionLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...reveal(0.3, { y: 30 })} className="space-y-4">
              <h2 className="text-lg font-semibold">Informasi</h2>
              <ul className="space-y-2">
                {NAV_ITEMS.filter((item) => item.id !== SECTION_IDS.home).map((item) => (
                  <li key={item.id}>
                    <SectionLink id={item.id}>{item.label}</SectionLink>
                  </li>
                ))}
                <li>
                  <Link href={LOGIN_HREF} className={LINK}>
                    Masuk
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div {...reveal(0.4, { x: 30 })} className="space-y-4">
              <h2 className="text-lg font-semibold">Alamat</h2>
              <address className="text-sm leading-relaxed text-on-primary/80 not-italic">
                {CAMPUS_ADDRESS.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            </motion.div>
          </div>

          <div className="mb-6 border-t border-on-primary/15" />

          <motion.p {...reveal(0.5, { y: 20 })} className="text-center text-sm text-on-primary/80 md:text-left">
            © {SITE.name}, Universitas Dian Nuswantoro.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
