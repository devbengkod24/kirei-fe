import { MaskIcon } from "@/components/ui/MaskIcon";
import { SKS_SLOTS } from "@/config/sks";
import { ROOM_CATEGORY_SHORT } from "@/shared/reservation-form/labels";
import type { RoomCategory } from "@/types/facility";

/**
 * Headers shared by every room-by-time grid: the booking calendar (Reservasi Internal and the
 * borrower forms), Kelola Jadwal, and the operator timeline. Change a label here and all of them follow.
 */

const displayTime = (time: string) => time.replace(":", ".");

/** "Ruang" with the classroom icon, the title of the room column. */
export function RoomColumnLabel() {
  return (
    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
      <MaskIcon src="/icons/classroom.svg" size={14} />
      Ruang
    </span>
  );
}

/** Top-left cell of an SKS table: sticky on both axes. */
export function RoomColumnHeader() {
  return (
    <th
      scope="col"
      className="sticky top-0 left-0 z-30 w-28 min-w-28 border-r border-b border-border bg-page px-3 py-2.5 text-left"
    >
      <RoomColumnLabel />
    </th>
  );
}

/** One header cell per SKS slot, showing its time range. */
export function SksSlotHeaders({ widthClassName }: { widthClassName: string }) {
  return SKS_SLOTS.map((slot) => (
    <th
      key={slot.slot}
      scope="col"
      className={`sticky top-0 z-20 ${widthClassName} border-r border-b border-border bg-page px-2 py-2 text-center align-middle last:border-r-0 ${
        slot.afterBreak ? "border-l-2 border-l-border" : ""
      }`}
    >
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink tabular-nums">
        <MaskIcon src="/icons/clock-outline.svg" size={12} className="text-primary" />
        {displayTime(slot.start)} - {displayTime(slot.end)}
      </span>
    </th>
  ));
}

export interface RoomLabelProps {
  code: string;
  category: RoomCategory;
  /** On a selected (blue) row the type is light instead of muted. */
  selected?: boolean;
}

/** Room code with its type under it. The code takes the parent's text color. */
export function RoomLabel({ code, category, selected = false }: RoomLabelProps) {
  return (
    <span className="flex min-w-0 flex-col">
      <span className="truncate text-xs leading-tight font-semibold">{code}</span>
      <span className={`truncate text-[10px] leading-tight font-normal ${selected ? "text-on-primary/90" : "text-muted"}`}>
        {ROOM_CATEGORY_SHORT[category]}
      </span>
    </span>
  );
}
