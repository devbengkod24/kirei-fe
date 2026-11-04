"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { MaskIcon } from "@/components/ui/MaskIcon";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { isAnchorVisible, itemKey, placePopover, timelineDetail, type TimelineItem } from "./timelineDetail";

export interface TimelineDetailPopoverProps {
  item: TimelineItem;
  /** The clip that was clicked; the popover sits beside it. */
  anchor: HTMLElement;
  /** The timeline's scroll area; the popover hides while the clip is scrolled out of it. */
  container: HTMLElement;
  onClose: () => void;
}

type Position = { left: number; top: number } | "hidden" | null;

const rectOf = (element: HTMLElement) => {
  const { left, top, width, height } = element.getBoundingClientRect();
  return { left, top, width, height };
};

/**
 * Read-only details of a timeline clip, like the floating card of a week calendar. On tablets and
 * up it floats beside the clip; on phones it is a sheet along the bottom of the screen.
 */
export function TimelineDetailPopover({ item, anchor, container, onClose }: TimelineDetailPopoverProps) {
  const floating = useMediaQuery("(min-width: 768px)");
  const panelRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [position, setPosition] = useState<Position>(null);
  const detail = timelineDetail(item);
  const key = itemKey(item);

  useEffect(() => headingRef.current?.focus(), [key]);

  // Follow the clip while the timeline scrolls sideways or the window resizes.
  useLayoutEffect(() => {
    if (!floating) return;
    const place = () => {
      const panel = panelRef.current;
      if (!panel) return;
      const clip = rectOf(anchor);
      if (!anchor.isConnected || !isAnchorVisible(clip, rectOf(container))) return setPosition("hidden");
      const { left, top } = placePopover(
        clip,
        { width: panel.offsetWidth, height: panel.offsetHeight },
        { width: window.innerWidth, height: window.innerHeight },
      );
      setPosition({ left, top });
    };
    place();
    const resize = new ResizeObserver(place);
    if (panelRef.current) resize.observe(panelRef.current);
    container.addEventListener("scroll", place, { passive: true });
    window.addEventListener("scroll", place, { passive: true, capture: true });
    window.addEventListener("resize", place);
    return () => {
      resize.disconnect();
      container.removeEventListener("scroll", place);
      window.removeEventListener("scroll", place, { capture: true });
      window.removeEventListener("resize", place);
    };
  }, [floating, anchor, container, key]);

  // Esc and a click outside close it.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !anchor.contains(target)) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [anchor, onClose]);

  const placement = floating
    ? {
        className: "fixed z-40 w-80 rounded-xl shadow-lg",
        style:
          position && position !== "hidden"
            ? { left: position.left, top: position.top }
            : // measured off-screen first, so it never flashes in the wrong place
              { left: -9999, top: 0, visibility: position === "hidden" ? ("hidden" as const) : undefined },
      }
    : {
        className: "fixed inset-x-0 bottom-0 z-40 max-h-[75vh] overflow-y-auto rounded-t-xl pb-[max(1rem,env(safe-area-inset-bottom))] shadow-lg",
        style: undefined,
      };

  return createPortal(
    <section
      ref={panelRef}
      role="dialog"
      aria-labelledby="timeline-detail-title"
      aria-describedby="timeline-detail-subtitle"
      className={`flex flex-col gap-4 border border-border bg-surface p-4 ${placement.className}`}
      style={placement.style}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
            item.kind === "siadin" ? "bg-warning-soft text-warning" : "bg-primary-soft text-primary"
          }`}
        >
          <MaskIcon src={item.kind === "siadin" ? "/icons/notes.svg" : "/icons/calendar-clock.svg"} size={18} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 id="timeline-detail-title" ref={headingRef} tabIndex={-1} className="text-sm font-semibold">
            {detail.title}
          </h3>
          <p id="timeline-detail-subtitle" className="truncate text-xs text-muted">
            {detail.subtitle}
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-2.5 text-xs">
        {detail.rows.map((row) => (
          <div key={row.label} className="contents">
            <dt className="text-muted">{row.label}</dt>
            <dd className="min-w-0 font-medium break-words">{row.value}</dd>
          </div>
        ))}
      </dl>

      {item.kind === "siadin" && (
        <p className="rounded-md bg-warning-soft px-3 py-2 text-xs text-warning">
          Jadwal dari Siadin, tidak bisa diubah atau dihapus di KIREI.
        </p>
      )}
      <div className="flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Tutup
        </Button>
      </div>
    </section>,
    document.body,
  );
}
