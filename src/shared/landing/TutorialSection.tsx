"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { LOGIN_HREF, SECTION_IDS, TUTORIALS } from "./content";
import { ArrowRightIcon, GroupIcon, PersonIcon } from "./LandingIcons";
import { SectionHeading } from "./SectionHeading";
import { TabSwitcher } from "./TabSwitcher";
import { TutorialCarousel } from "./TutorialCarousel";

const TAB_ICONS = { organisasi: GroupIcon, dosen: PersonIcon } as const;

export function TutorialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tutorial = TUTORIALS[activeIndex];
  const TutorialIcon = TAB_ICONS[tutorial.id];

  return (
    <section
      id={SECTION_IDS.tutorial}
      aria-labelledby="tutorial-title"
      className="relative min-h-screen overflow-hidden px-4 py-20"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-br from-primary-tint via-primary-soft to-surface" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          id="tutorial-title"
          title="Panduan"
          accent="Reservasi"
          description="Hai Dinusian! Ikuti panduan langkah demi langkah untuk memesan fasilitas kampus dengan mudah."
        />

        <TabSwitcher
          label="Jenis pemohon"
          idPrefix="tutorial"
          panelId="tutorial-panel"
          tabs={TUTORIALS.map((item) => {
            const Icon = TAB_ICONS[item.id];
            return { id: item.id, label: item.label, icon: <Icon className="size-4" /> };
          })}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          id="tutorial-panel"
          role="tabpanel"
          aria-labelledby={`tutorial-tab-${tutorial.id}`}
          className="rounded-2xl border border-border bg-surface p-4 shadow-xl sm:p-8"
        >
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, x: activeIndex === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-on-primary">
                  <TutorialIcon className="size-4" />
                </span>
                <h3 className="text-lg font-bold text-ink">{tutorial.heading}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted">{tutorial.intro}</p>
            </div>
            <TutorialCarousel label={tutorial.heading} steps={tutorial.steps} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href={LOGIN_HREF}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-on-primary shadow-xl transition-all duration-300 hover:bg-primary-hover md:hover:scale-105 active:scale-[0.98]"
          >
            Mulai Reservasi Sekarang
            <ArrowRightIcon className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
