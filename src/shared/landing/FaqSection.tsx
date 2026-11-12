"use client";

import { motion } from "framer-motion";
import { SECTION_IDS } from "./content";
import { FaqAccordion } from "./FaqAccordion";
import { SectionHeading } from "./SectionHeading";

export function FaqSection() {
  return (
    <section
      id={SECTION_IDS.faq}
      aria-labelledby="faq-title"
      className="relative min-h-screen overflow-hidden bg-[url('/landing/bg-faq-landing.png')] bg-cover bg-center bg-no-repeat px-4 py-20 md:bg-fixed"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-ink/50" />

      <div className="relative mx-auto max-w-4xl">
        <SectionHeading
          id="faq-title"
          title="FAQ"
          tone="dark"
          description="Hai Dinusian! Berikut pertanyaan yang sering diajukan seputar akun dan reservasi fasilitas kampus."
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-surface/50 bg-surface p-4 shadow-2xl md:p-8"
        >
          <FaqAccordion />
        </motion.div>
      </div>
    </section>
  );
}
