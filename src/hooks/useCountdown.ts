"use client";

import { useCallback, useSyncExternalStore } from "react";

export interface Countdown {
  remainingMs: number;
  expired: boolean;
  /** Whole hours left, not capped at 24. */
  hours: number;
  minutes: number;
  seconds: number;
}

type DeadlineInput = string | number | Date;

/** Time left until `deadline`, never negative. */
export function getCountdown(deadline: DeadlineInput, now: number): Countdown {
  const remainingMs = Math.max(0, new Date(deadline).getTime() - now);
  const totalSeconds = Math.floor(remainingMs / 1000);
  return {
    remainingMs,
    expired: remainingMs === 0,
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

/**
 * Live countdown to a deadline given by the caller (e.g. from the API). Returns null during
 * server rendering and hydration, so the server and client markup never disagree on the time.
 * Ticking stops once the deadline has passed.
 */
export function useCountdown(deadline: DeadlineInput, intervalMs = 1000): Countdown | null {
  const deadlineMs = new Date(deadline).getTime();

  const subscribe = useCallback(
    (onTick: () => void) => {
      if (Date.now() >= deadlineMs) return () => {};
      const id = setInterval(onTick, intervalMs);
      return () => clearInterval(id);
    },
    [deadlineMs, intervalMs],
  );

  // The current time floored to the interval: it only changes once per interval, which is what
  // triggers a re-render, and the count is at most one interval behind.
  const now = useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / intervalMs) * intervalMs,
    () => null,
  );

  return now === null ? null : getCountdown(deadlineMs, now);
}
