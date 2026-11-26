/** Hours step by 1, minutes by 10, matching the 10-minute slots the API accepts. */
export const TIME_PARTS = {
  hour: { count: 24, step: 1 },
  minute: { count: 60, step: 10 },
} as const;

export type TimePart = keyof typeof TIME_PARTS;

const pad = (value: number) => String(value).padStart(2, "0");

/** "HH:MM" split into numbers; 00:00 when empty or malformed. */
export function splitTime(value: string): { hour: number; minute: number } {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  return match ? { hour: Number(match[1]), minute: Number(match[2]) } : { hour: 0, minute: 0 };
}

export const joinTime = (hour: number, minute: number) => `${pad(hour)}:${pad(minute)}`;

/** Hours the wheel may show, both ends included. */
export interface HourRange {
  min: number;
  max: number;
}

/**
 * Moves a part by whole steps, wrapping around: 23 -> 00, 50 -> 00. Minutes never carry into the hour.
 * With an hour range the hours wrap inside it instead: 21 -> 07 for 07-21.
 */
export function stepPart(part: TimePart, value: number, steps: number, hours?: HourRange): number {
  if (part === "hour" && hours) {
    const count = hours.max - hours.min + 1;
    const offset = Math.min(Math.max(value, hours.min), hours.max) - hours.min;
    return ((((offset + steps) % count) + count) % count) + hours.min;
  }
  const { count, step } = TIME_PARTS[part];
  return (((value + steps * step) % count) + count) % count;
}

/** A typed part, rounded to its step and clamped to the range; null when it is not a number. */
export function parseTypedPart(part: TimePart, raw: string, hours?: HourRange): number | null {
  if (!/^\d{1,2}$/.test(raw.trim())) return null;
  const { count, step } = TIME_PARTS[part];
  const rounded = Math.round(Number(raw) / step) * step;
  if (part === "hour" && hours) return Math.min(Math.max(rounded, hours.min), hours.max);
  return Math.min(rounded, count - step);
}

/** Keeps "HH:MM" between two times, so the last hour of a range stops at its closing minute. */
export function clampTime(value: string, min: string, max: string): string {
  if (value < min) return min;
  return value > max ? max : value;
}

export const formatPart = pad;
