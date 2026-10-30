// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCountdown, useCountdown } from "./useCountdown";

const NOW = Date.parse("2026-10-30T03:00:00Z");

describe("getCountdown", () => {
  it("splits the time left into hours, minutes, and seconds", () => {
    expect(getCountdown(NOW + (23 * 3600 + 59 * 60 + 5) * 1000, NOW)).toEqual({
      remainingMs: 86_345_000,
      expired: false,
      hours: 23,
      minutes: 59,
      seconds: 5,
    });
  });

  it("does not cap hours at a day", () => {
    expect(getCountdown(NOW + 50 * 3600 * 1000, NOW).hours).toBe(50);
  });

  it("stops at zero once the deadline has passed", () => {
    expect(getCountdown(NOW - 1000, NOW)).toMatchObject({ remainingMs: 0, expired: true, hours: 0, minutes: 0, seconds: 0 });
    expect(getCountdown(new Date(NOW).toISOString(), NOW).expired).toBe(true);
  });
});

describe("useCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });
  afterEach(() => vi.useRealTimers());

  it("ticks every second", () => {
    const { result } = renderHook(() => useCountdown(new Date(NOW + 65_000).toISOString()));
    expect(result.current).toMatchObject({ minutes: 1, seconds: 5 });

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current).toMatchObject({ minutes: 1, seconds: 4 });

    act(() => vi.advanceTimersByTime(4000));
    expect(result.current).toMatchObject({ minutes: 1, seconds: 0 });
  });

  it("reports expiry when the deadline is reached", () => {
    const { result } = renderHook(() => useCountdown(NOW + 2000));
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current).toMatchObject({ expired: true, remainingMs: 0 });
  });

  it("does not start a timer for a deadline that has already passed", () => {
    const { result } = renderHook(() => useCountdown(NOW - 5000));
    expect(result.current?.expired).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });
});
