"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "./content";
import { PlusIcon } from "./LandingIcons";

/* One answer open at a time, as in the reservasi-fe FAQ. */
export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul className="w-full space-y-2">
      {FAQ_ITEMS.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        return (
          <li key={item.question} className={index < FAQ_ITEMS.length - 1 ? "border-b-2 border-border pb-2" : ""}>
            <div className={`rounded-lg p-2 transition-colors duration-200 lg:p-4 ${open ? "bg-primary-soft" : ""}`}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="flex min-h-11 w-full items-center justify-between gap-2 text-left text-sm font-bold text-primary lg:text-base"
                >
                  {item.question}
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 lg:size-8 ${
                      open ? "rotate-45 bg-primary text-on-primary" : "text-ink"
                    }`}
                  >
                    <PlusIcon className="size-5" />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                hidden={!open}
                className="mt-1.5 text-sm leading-relaxed text-ink lg:mt-2.5"
              >
                {item.answer}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
