"use client";

import { motion } from "framer-motion";

export interface TabSwitcherItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface TabSwitcherProps {
  /** Accessible name of the tab list. */
  label: string;
  /** Prefix for the tab ids, so each tab can label the panel (`${idPrefix}-tab-${id}`). */
  idPrefix: string;
  panelId: string;
  tabs: readonly TabSwitcherItem[];
  activeIndex: number;
  onChange: (index: number) => void;
}

/* Pill-shaped tab bar used by the Peraturan and Panduan sections. */
export function TabSwitcher({ label, idPrefix, panelId, tabs, activeIndex, onChange }: TabSwitcherProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="mb-12 flex justify-center"
    >
      <div role="tablist" aria-label={label} className="flex gap-1 rounded-xl border border-border bg-surface p-1 shadow-lg">
        {tabs.map((tab, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={panelId}
              onClick={() => onChange(index)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition-colors duration-300 sm:px-8 ${
                selected ? "bg-primary text-on-primary shadow-lg" : "text-muted hover:bg-page hover:text-ink"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
