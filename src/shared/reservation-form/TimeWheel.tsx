"use client";

import { useEffect, useRef, useState } from "react";
import { TIME_PARTS, formatPart, joinTime, parseTypedPart, splitTime, stepPart, type TimePart } from "./timeParts";

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
}

// Pixels of wheel or drag that move the column by one step.
const WHEEL_STEP = 40;
const DRAG_STEP = 24;

/** Hour and minute wheels: scroll, drag, arrow keys, or type straight into the middle number. */
export function TimeWheel({ id, label, value, onChange, onBlur, invalid }: TimeWheelProps) {
  const { hour, minute } = splitTime(value);
  return (
    <div
      className={`flex items-center justify-center gap-1 rounded-inner bg-primary-tint px-1 text-primary ${invalid ? "outline outline-danger-strong" : ""}`}
    >
      <WheelColumn id={id} part="hour" label={`Jam ${label}`} value={hour} onChange={(next) => onChange(joinTime(next, minute))} onBlur={onBlur} />
      <span aria-hidden="true" className="text-sm">
        :
      </span>
      <WheelColumn id={`${id}-minute`} part="minute" label={`Menit ${label}`} value={minute} onChange={(next) => onChange(joinTime(hour, next))} onBlur={onBlur} />
    </div>
  );
}

interface WheelColumnProps {
  id: string;
  part: TimePart;
  label: string;
  value: number;
  onChange: (value: number) => void;
  onBlur?: () => void;
}

function WheelColumn({ id, part, label, value, onChange, onBlur }: WheelColumnProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ y: number } | null>(null);
  // The wheel listener is attached once; it reads the latest value and handler from here.
  const latest = useRef({ value, onChange });
  useEffect(() => {
    latest.current = { value, onChange };
  });

  const step = (steps: number) => onChange(stepPart(part, value, steps));

  // React's onWheel is passive, so it cannot stop the page from scrolling under the wheel.
  useEffect(() => {
    const column = columnRef.current;
    if (!column) return;
    let pending = 0;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      pending += event.deltaY;
      if (Math.abs(pending) < WHEEL_STEP) return;
      const { value: current, onChange: change } = latest.current;
      change(stepPart(part, current, Math.sign(pending)));
      pending = 0;
    };
    column.addEventListener("wheel", onWheel, { passive: false });
    return () => column.removeEventListener("wheel", onWheel);
  }, [part]);

  const commit = () => {
    if (draft === null) return;
    const parsed = parseTypedPart(part, draft);
    if (parsed !== null) onChange(parsed);
    setDraft(null);
  };

  const { count, step: size } = TIME_PARTS[part];
  const neighbour = (offset: number) => formatPart(stepPart(part, value, offset));

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
        aria-valuemin={0}
        aria-valuemax={count - size}
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
