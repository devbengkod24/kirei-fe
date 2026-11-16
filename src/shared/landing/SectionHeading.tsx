"use client";

import { motion } from "framer-motion";

export interface SectionHeadingProps {
  id: string;
  title: string;
  /** Last word of the heading, shown in the accent color. */
  accent?: string;
  description: string;
  tone?: "light" | "dark";
}

/* Centered heading used by every content section, as on the reservasi-fe landing page. */
export function SectionHeading({ id, title, accent, description, tone = "light" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-12 text-center lg:mb-16"
    >
      <h2
        id={id}
        className={`mb-2 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl ${dark ? "text-on-primary" : "text-ink"}`}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className={dark ? "text-primary-tint" : "text-primary"}>{accent}</span>
          </>
        )}
      </h2>
      <p
        className={`mx-auto max-w-3xl text-sm leading-relaxed md:text-base ${dark ? "text-on-primary" : "text-muted"}`}
      >
        {description}
      </p>
    </motion.div>
  );
}
