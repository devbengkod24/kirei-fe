const HEADER_HEIGHT = 80;

/** Scrolls to a landing section below the fixed header and keeps the hash in the address bar. */
export function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: section.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT,
    behavior: reduceMotion ? "auto" : "smooth",
  });
  window.history.replaceState(null, "", `#${id}`);
}
