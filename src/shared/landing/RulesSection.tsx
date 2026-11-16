"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MaskIcon } from "@/components/ui/MaskIcon";
import { RULE_TABS, SECTION_IDS } from "./content";
import { SectionHeading } from "./SectionHeading";
import { TabSwitcher } from "./TabSwitcher";

export function RulesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = RULE_TABS[activeIndex];

  return (
    <section
      id={SECTION_IDS.rules}
      aria-labelledby="rules-title"
      className="relative min-h-screen overflow-hidden px-4 py-20"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-br from-surface via-primary-soft to-page" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/landing/bg-section_third_mobile.png')] bg-cover bg-center bg-no-repeat opacity-10 md:bg-[url('/landing/bg-section_third.png')]"
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          id="rules-title"
          title="Peraturan"
          accent="Peminjaman"
          description="Hai Dinusian! Perhatikan aturan berikut supaya permohonan reservasimu tidak tertahan."
        />

        <TabSwitcher
          label="Jenis fasilitas"
          idPrefix="rules"
          panelId="rules-panel"
          tabs={RULE_TABS.map((tab) => ({ id: tab.id, label: tab.label, icon: <MaskIcon src={tab.iconSrc} size={16} /> }))}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
        />

        {/* Keyed on the tab so the cards animate in again after switching. */}
        <ul
          key={activeTab.id}
          id="rules-panel"
          role="tabpanel"
          aria-labelledby={`rules-tab-${activeTab.id}`}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {activeTab.rules.map((rule, index) => (
            <motion.li
              key={rule.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl border border-primary-tint-border bg-linear-to-br from-primary-soft to-primary-tint p-6 shadow-lg transition-shadow duration-500 hover:shadow-xl"
              >
                <span aria-hidden="true" className="absolute top-0 right-0 size-32 translate-x-16 -translate-y-16 rounded-full bg-surface/40" />
                <span aria-hidden="true" className="absolute bottom-0 left-0 size-24 -translate-x-12 translate-y-12 rounded-full bg-surface/40" />

                <span className="relative mb-4 inline-flex size-14 items-center justify-center self-start rounded-2xl bg-surface text-primary shadow-md transition-transform duration-300 group-hover:scale-110">
                  <MaskIcon src={rule.iconSrc} size={30} />
                </span>
                <h3 className="relative mb-3 text-lg leading-tight font-bold text-primary">{rule.title}</h3>
                <p className="relative text-sm leading-relaxed font-medium text-muted">{rule.description}</p>
              </motion.div>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center text-sm font-medium text-muted"
        >
          Setiap permohonan menunggu persetujuan admin sebelum fasilitas dapat dipakai.
        </motion.p>
      </div>
    </section>
  );
}
