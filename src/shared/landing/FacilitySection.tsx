"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MaskIcon } from "@/components/ui/MaskIcon";
import { FACILITY_ITEMS, SECTION_IDS } from "./content";
import { SectionHeading } from "./SectionHeading";

export function FacilitySection() {
  return (
    <section
      id={SECTION_IDS.facilities}
      aria-labelledby="facilities-title"
      className="relative overflow-hidden bg-linear-to-br from-page via-surface to-primary-soft px-4 py-20"
    >
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          id="facilities-title"
          title="Fasilitas"
          accent="Kampus"
          description="Pesan ruangan, GOR, dan kendaraan operasional Udinus dari satu sistem, lengkap dengan kalender ketersediaannya."
        />

        <div className="grid items-center lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 mb-12 lg:order-1 lg:mb-0"
          >
            <div className="group overflow-hidden rounded-3xl bg-linear-to-br from-surface to-primary-tint p-2 shadow-xl">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/rooms/sample-room.png"
                  alt="Ruangan kampus Udinus yang dapat dipesan"
                  width={504}
                  height={378}
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="h-auto w-full transition-transform duration-700 md:group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 space-y-3 lg:order-2"
          >
            {FACILITY_ITEMS.map((item, index) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group relative transition-transform duration-300 md:hover:translate-x-2"
              >
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-shadow duration-300 md:group-hover:shadow-lg">
                  <span className="rounded-xl bg-primary p-3 text-on-primary shadow-lg transition-transform duration-300 md:group-hover:scale-110">
                    <MaskIcon src={item.iconSrc} size={24} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-muted">{item.description}</p>
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute right-4 bottom-0 left-4 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-500 md:group-hover:scale-x-100"
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
