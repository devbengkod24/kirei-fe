"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/** How long each slide or page stays before a landing carousel moves on by itself. */
export const AUTOPLAY_DELAY_MS = 5000;

/**
 * Timer for a carousel that advances by itself. It stops while the pointer or keyboard focus is
 * inside (spread `regionProps` on the carousel), when the visitor pauses it, and for reduced
 * motion. A change of `position` restarts the countdown, so a manual move gets the full delay.
 */
export function useAutoplay(canPlay: boolean, advance: () => void, position: number) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const playing = canPlay && !paused && !reduceMotion;

  const advanceRef = useRef(advance);
  useEffect(() => {
    advanceRef.current = advance;
  });

  useEffect(() => {
    if (!playing || hovered || focused) return;
    const timer = window.setTimeout(() => advanceRef.current(), AUTOPLAY_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, hovered, focused, position]);

  return {
    /** Whether the carousel advances by itself; also drives aria-live ("off" while playing). */
    playing,
    paused,
    /** The pause control only makes sense when autoplay can run at all. */
    showToggle: canPlay && !reduceMotion,
    reduceMotion,
    togglePaused: () => setPaused((value) => !value),
    regionProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: (event: React.FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      },
    },
  };
}
