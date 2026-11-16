"use client";

import { useEffect, useRef, useState } from "react";
import { TIME_PARTS, clampTime, formatPart, joinTime, parseTypedPart, splitTime, stepPart } from "./timeParts";

export interface TimeWheelProps {
  /** id of the hour input, so a <label htmlFor> focuses it. */
  id: string;
  /** e.g. "mulai", read out as "Jam mulai" and "Menit mulai". */
  label: string;
  /** "HH:MM" */
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  invalid?: boolean;
  /** Earliest and latest "HH:MM" the wheel offers, e.g. opening hours. Both or neither. */
  min?: string;
  max?: string;
}

// Pixels of wheel or drag that move the column by one step.
const WHEEL_STEP = 40;
const DRAG_STEP = 24;

/** Hour and minute wheels: scroll, drag, arrow keys, or type straight into the middle number. */
export function TimeWheel({ id, label, value, onChange, onBlur, invalid, min, max }: TimeWheelProps) {
  const { hour, minute } = splitTime(value);
  const hours = min && max ? { min: splitTime(min).hour, max: splitTime(max).hour } : undefined;
  const bounded = (time: string) => (min && max ? clampTime(time, min, max) : time);
  const hourRange = hours ?? { min: 0, max: TIME_PARTS.hour.count - TIME_PARTS.hour.step };
  return (
    <div
      className={`flex items-center justify-center gap-1 rounded-inner bg-primary-tint px-1 text-primary ${invalid ? "outline outline-danger-strong" : ""}`}
    >
      <WheelColumn
        id={id}
        label={`Jam ${label}`}
        value={hour}
        min={hourRange.min}
        max={hourRange.max}
        stepBy={(steps) => stepPart("hour", hour, steps, hours)}
        parse={(raw) => parseTypedPart("hour", raw, hours)}
        onChange={(next) => onChange(bounded(joinTime(next, minute)))}
        onBlur={onBlur}
      />
      <span aria-hidden="true" className="text-sm">
        :
      </span>
      <WheelColumn
        id={`${id}-minute`}
        label={`Menit ${label}`}
        value={minute}
        min={0}
        max={TIME_PARTS.minute.count - TIME_PARTS.minute.step}
        // In the closing hour the minutes stay at the closing minute.
        stepBy={(steps) => splitTime(bounded(joinTime(hour, stepPart("minute", minute, steps)))).minute}
        parse={(raw) => parseTypedPart("minute", raw)}
        onChange={(next) => onChange(bounded(joinTime(hour, next)))}
        onBlur={onBlur}
      />
    </div>
  );
}

interface WheelColumnProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  /** The value this many steps away, wrapping inside the column's range. */
  stepBy: (steps: number) => number;
  /** A typed number fitted to the column; null when it is not a number. */
  parse: (raw: string) => number | null;
  onChange: (value: number) => void;
  onBlur?: () => void;
}

function WheelColumn({ id, label, value, min, max, stepBy, parse, onChange, onBlur }: WheelColumnProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ y: number } | null>(null);
  // The wheel listener is attached once; it reads the latest value and handler from here.
  const latest = useRef({ stepBy, onChange });
  useEffect(() => {
    latest.current = { stepBy, onChange };
  });

  const step = (steps: number) => onChange(stepBy(steps));

  // React's onWheel is passive, so it cannot stop the page from scrolling under the wheel.
  useEffect(() => {
    const column = columnRef.current;
    if (!column) return;
    let pending = 0;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      pending += event.deltaY;
      if (Math.abs(pending) < WHEEL_STEP) return;
      const { stepBy: move, onChange: change } = latest.current;
      change(move(Math.sign(pending)));
      pending = 0;
    };
    column.addEventListener("wheel", onWheel, { passive: false });
    return () => column.removeEventListener("wheel", onWheel);
  }, []);

  const commit = () => {
    if (draft === null) return;
    const parsed = parse(draft);
    if (parsed !== null) onChange(parsed);
    setDraft(null);
  };

  const neighbour = (offset: number) => formatPart(stepBy(offset));

  return (
    <div
      ref={columnRef}
      className="flex w-9 touch-none flex-col items-center select-none"
      onPointerDown={(event) => {
        drag.current = { y: event.clientY };
      }}
      onPointerMove={(event) => {
        if (!drag.current || event.buttons === 0) return;
        const distance = event.clientY - drag.current.y;
        if (Math.abs(distance) < DRAG_STEP) return;
        // Dragging down pulls the earlier value into the middle, like a physical wheel.
        step(-Math.sign(distance));
        drag.current = { y: event.clientY };
      }}
      onPointerUp={() => {
        drag.current = null;
      }}
      onPointerCancel={() => {
        drag.current = null;
      }}
    >
      <button type="button" tabIndex={-1} aria-hidden="true" onClick={() => step(-1)} className="h-5 w-full text-[10px] text-muted">
        {neighbour(-1)}
      </button>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        maxLength={2}
        role="spinbutton"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={formatPart(value)}
        value={draft ?? formatPart(value)}
        onFocus={(event) => event.currentTarget.select()}
        onChange={(event) => setDraft(event.target.value.replace(/\D/g, ""))}
        onBlur={() => {
          commit();
          onBlur?.();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            setDraft(null);
            step(event.key === "ArrowUp" ? 1 : -1);
          } else if (event.key === "Enter") {
            event.preventDefault();
            commit();
          }
        }}
        className="h-7 w-full rounded-inner bg-transparent text-center text-sm font-medium tabular-nums outline-none focus-visible:bg-surface"
      />
      <button type="button" tabIndex={-1} aria-hidden="true" onClick={() => step(1)} className="h-5 w-full text-[10px] text-muted">
        {neighbour(1)}
      </button>
    </div>
  );
}
