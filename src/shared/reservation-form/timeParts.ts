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

/** Moves a part by whole steps, wrapping around: 23 → 00, 50 → 00. Minutes never carry into the hour. */
export function stepPart(part: TimePart, value: number, steps: number): number {
  const { count, step } = TIME_PARTS[part];
  return (((value + steps * step) % count) + count) % count;
}

/** A typed part, rounded to its step and clamped to the range; null when it is not a number. */
export function parseTypedPart(part: TimePart, raw: string): number | null {
  if (!/^\d{1,2}$/.test(raw.trim())) return null;
  const { count, step } = TIME_PARTS[part];
  const rounded = Math.round(Number(raw) / step) * step;
  return Math.min(rounded, count - step);
}

export const formatPart = pad;
