import { toWibDateKey } from "@/lib/date";
import type { ReservationDraft } from "@/types/reservation";
import { wibDateTime } from "./time";

const HOUR = 60 * 60 * 1000;

// Sample drafts shaped after the Figma V3 "draft reservasi" frame. Deadlines are relative to
// `now`: one with almost a day left, one urgent, and one already past.
export function buildDraftsMock(now: Date): ReservationDraft[] {
  const todayKey = toWibDateKey(now);
  const base = {
    status: "draft" as const,
    bookerName: "Dian Nuswantoro Computer Club",
    bookerEmail: "ukmdncc123@gmail.com",
    reschedule: null,
    cancellationReason: null,
  };

  return [
    {
      ...base,
      id: "draft-1",
      type: "ruangan",
      startsAt: wibDateTime(todayKey, 3, "08:00"),
      endsAt: wibDateTime(todayKey, 3, "10:00"),
      unitName: "H.5.1",
      purpose: "Rapat pengurus",
      letterDeadline: new Date(now.getTime() + 24 * HOUR - 60_000).toISOString(),
    },
    {
      ...base,
      id: "draft-2",
      type: "ruangan",
      startsAt: wibDateTime(todayKey, 1, "13:00"),
      endsAt: wibDateTime(todayKey, 1, "15:00"),
      unitName: "E.2.1",
      purpose: "Seminar kewirausahaan",
      letterDeadline: new Date(now.getTime() + 0.5 * HOUR).toISOString(),
    },
    {
      ...base,
      id: "draft-3",
      type: "ruangan",
      startsAt: wibDateTime(todayKey, 2, "09:00"),
      endsAt: wibDateTime(todayKey, 2, "11:00"),
      unitName: "H.7",
      purpose: "Latihan paduan suara",
      letterDeadline: new Date(now.getTime() - HOUR).toISOString(),
    },
  ];
}
