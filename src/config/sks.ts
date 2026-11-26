import { ROOM_CLOSE_TIME } from "./reservation";

/** Duration of 1 SKS in minutes, starting at 07:00 WIB. */
export const SKS_DURATION_MINUTES = 50;
export const SKS_START_TIME = "07:00";

export type SksSession = "Pagi" | "Siang" | "Sore" | "Malam";

export interface SksBreak {
  start: string;
  end: string;
}

/**
 * Official 30-minute break windows between SKS sessions (15 slots total, 07:00-21:00 WIB).
 * TODO: kirei-api: sinkronkan daftar jeda istirahat ini dengan konfigurasi akademik Laravel.
 */
export const SKS_BREAKS: readonly SksBreak[] = [
  { start: "12:00", end: "12:30" },
  { start: "15:00", end: "15:30" },
  { start: "18:00", end: "18:30" },
];

export interface SksSlot {
  slot: number;
  start: string;
  end: string;
  session: SksSession;
  /** True when a campus break immediately precedes this slot. */
  afterBreak: boolean;
  label: string;
}

const toMinutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
const pad = (value: number) => String(value).padStart(2, "0");
const formatMinutes = (total: number) => `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;

function sessionForStart(startMinutes: number): SksSession {
  if (startMinutes < toMinutes("12:00")) return "Pagi";
  if (startMinutes < toMinutes("15:00")) return "Siang";
  if (startMinutes < toMinutes("18:00")) return "Sore";
  return "Malam";
}

function buildSksSlots(): SksSlot[] {
  const slots: SksSlot[] = [];
  const closeMinutes = toMinutes(ROOM_CLOSE_TIME);
  const breaks = SKS_BREAKS.map((item) => ({ start: toMinutes(item.start), end: toMinutes(item.end) }));
  let cursor = toMinutes(SKS_START_TIME);
  let slotNumber = 1;

  while (cursor + SKS_DURATION_MINUTES <= closeMinutes) {
    let afterBreak = false;
    const hit = breaks.find((item) => cursor >= item.start && cursor < item.end);
    if (hit) {
      cursor = hit.end;
      afterBreak = true;
      if (cursor + SKS_DURATION_MINUTES > closeMinutes) break;
    }

    const start = formatMinutes(cursor);
    const end = formatMinutes(cursor + SKS_DURATION_MINUTES);
    slots.push({
      slot: slotNumber,
      start,
      end,
      session: sessionForStart(cursor),
      afterBreak,
      label: `Slot ${slotNumber} (${start.replace(":", ".")} - ${end.replace(":", ".")})`,
    });
    cursor += SKS_DURATION_MINUTES;
    slotNumber += 1;
  }

  return slots;
}

export const SKS_SLOTS: readonly SksSlot[] = buildSksSlots();

/** Converts a starting SKS slot and SKS count into WIB "HH:mm" start and end times; null when out of range. */
export function sksRangeToTimes(startSlot: number, sksCount: number): { startTime: string; endTime: string } | null {
  if (!Number.isInteger(startSlot) || !Number.isInteger(sksCount) || startSlot < 1 || sksCount < 1) {
    return null;
  }
  const endSlot = startSlot + sksCount - 1;
  if (endSlot > SKS_SLOTS.length) return null;
  return {
    startTime: SKS_SLOTS[startSlot - 1].start,
    endTime: SKS_SLOTS[endSlot - 1].end,
  };
}

/** Human-readable SKS slot summary, e.g. "Slot 1-3 (3 SKS)". */
export function formatSksSlotRange(startSlot: number, sksCount: number): string {
  if (sksCount <= 1) return `Slot ${startSlot} (${sksCount} SKS)`;
  return `Slot ${startSlot}-${startSlot + sksCount - 1} (${sksCount} SKS)`;
}

/** Lists every SKS slot number occupied by an entry. */
export function sksSlotNumbersForEntry(startSlot: number, sksCount: number): number[] {
  return Array.from({ length: Math.max(0, sksCount) }, (_, index) => startSlot + index);
}
