import { Card } from "@/components/ui/Card";
import { FAQ_ITEMS } from "./faq-items";

/** Questions as native disclosure widgets, so they open with keyboard and without JS. */
export function FaqPage() {
  return (
    <Card as="section" aria-label="Pertanyaan yang sering diajukan" className="p-4 md:p-6">
      <ul className="flex flex-col divide-y divide-border">
        {FAQ_ITEMS.map((item) => (
          <li key={item.question}>
            <details className="group">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 rounded-md p-4 text-sm leading-[1.2] font-bold text-primary hover:bg-page [&::-webkit-details-marker]:hidden">
                <span className="flex-1">{item.question}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  className="shrink-0 transition-transform group-open:rotate-45 motion-reduce:transition-none"
                >
                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="px-4 pb-4 text-sm leading-relaxed text-muted">{item.answer}</p>
            </details>
          </li>
        ))}
      </ul>
    </Card>
  );
}
