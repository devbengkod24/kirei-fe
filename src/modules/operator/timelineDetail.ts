import { formatDateLongWIB, formatTimeRangeWIB } from "@/lib/date";
import { reservationStatusLabel } from "@/shared/reservation/ReservationStatusBadge";
import type { ReservationRecord } from "@/types/reservation";
import type { ClassSchedule } from "@/types/schedule";

/** A clip on the timeline that opens the detail popover. Free gaps open the create form instead. */
export type TimelineItem = { kind: "reservasi"; reservation: ReservationRecord } | { kind: "siadin"; schedule: ClassSchedule };

export const itemKey = (item: TimelineItem) =>
  item.kind === "reservasi" ? `reservasi-${item.reservation.id}` : `siadin-${item.schedule.id}`;

export interface DetailRow {
  label: string;
  value: string;
}

export interface TimelineDetail {
  title: string;
  /** e.g. "H.5.1 · Rabu, 4 November 2026" */
  subtitle: string;
  rows: DetailRow[];
}

/** Read-only content of the popover for one clip. */
export function timelineDetail(item: TimelineItem): TimelineDetail {
  if (item.kind === "reservasi") {
    const { reservation } = item;
    const date = formatDateLongWIB(reservation.startsAt);
    return {
      title: "Detail Reservasi",
      subtitle: `${reservation.unitName} · ${date}`,
      rows: [
        { label: "Pemesan", value: reservation.bookerName },
        { label: "Keperluan", value: reservation.purpose },
        { label: "Ruangan", value: reservation.unitName },
        { label: "Tanggal", value: date },
        { label: "Waktu", value: `${formatTimeRangeWIB(reservation.startsAt, reservation.endsAt)}` },
        { label: "Status", value: reservationStatusLabel(reservation.status) },
      ],
    };
  }

  const { schedule } = item;
  const date = formatDateLongWIB(schedule.startsAt);
  return {
    title: "Jadwal Siadin",
    subtitle: `${schedule.unitName} · ${date}`,
    rows: [
      { label: "Mata kuliah", value: schedule.courseName },
      { label: "Dosen", value: schedule.lecturerName },
      { label: "Ruangan", value: schedule.unitName },
      { label: "Tanggal", value: date },
      { label: "Waktu", value: `${formatTimeRangeWIB(schedule.startsAt, schedule.endsAt)}` },
      { label: "Sumber", value: "Siadin" },
    ],
  };
}

export interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface PopoverPlacement {
  left: number;
  top: number;
  side: "right" | "left";
}

/**
 * Where the popover goes next to its clip, in viewport pixels: to the right of the clip, or to
 * the left when it would not fit, never over the clip. When neither side fits it hugs the side
 * with more room. Vertically it lines up with the clip and stays inside the viewport.
 */
export function placePopover(
  anchor: Box,
  popover: { width: number; height: number },
  viewport: { width: number; height: number },
  gap = 8,
  margin = 12,
): PopoverPlacement {
  const rightLeft = anchor.left + anchor.width + gap;
  const leftLeft = anchor.left - gap - popover.width;
  const fitsRight = rightLeft + popover.width <= viewport.width - margin;
  const fitsLeft = leftLeft >= margin;
  const roomRight = viewport.width - (anchor.left + anchor.width);
  const side = fitsRight || (!fitsLeft && roomRight >= anchor.left) ? "right" : "left";

  const left =
    side === "right"
      ? Math.min(rightLeft, viewport.width - margin - popover.width)
      : Math.max(leftLeft, margin);
  const top = Math.min(Math.max(anchor.top, margin), Math.max(margin, viewport.height - margin - popover.height));
  return { left, top, side };
}

/** Whether any part of the clip is inside the timeline's visible area. */
export function isAnchorVisible(anchor: Box, container: Box) {
  return (
    anchor.left + anchor.width > container.left &&
    anchor.left < container.left + container.width &&
    anchor.top + anchor.height > container.top &&
    anchor.top < container.top + container.height
  );
}
