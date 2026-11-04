import type { Floor, FloorPlanRoom } from "@/types/facility";
import type { RoomStatus } from "./availability";
import { ROOM_CATEGORY_SHORT, ROOM_STATUS_LABEL } from "./labels";

export interface FloorPlanProps {
  floor: Floor;
  statuses: Map<string, { status: RoomStatus; selectable: boolean }>;
  onSelect: (room: FloorPlanRoom) => void;
  /** Called for a room that cannot be picked, so the form can say why. */
  onInspect: (room: FloorPlanRoom) => void;
  /** Room whose reason is currently shown, outlined on the plan. */
  inspectedRoomId?: string | null;
  /** id of the element that describes the room states (the legend) */
  legendId: string;
}

const STATUS_STYLES: Record<RoomStatus, string> = {
  selected: "bg-plan-selected text-on-primary",
  booked: "bg-plan-booked text-on-primary",
  available: "bg-plan-available text-ink hover:bg-border",
  filtered: "bg-plan-filtered text-muted",
};

/** Short state printed inside a room that cannot be picked, so the plan does not rely on colour alone. */
const BLOCKED_MARK: Partial<Record<RoomStatus, string>> = {
  booked: "Dipesan",
  filtered: "Difilter",
};

/**
 * Read-only floor plan. Rooms are placed by percentage so the plan scales with its container,
 * and label sizes follow the container width (cqw) to stay inside the rooms.
 * Rooms that cannot be picked stay focusable and clickable: they open the reason instead.
 */
export function FloorPlan({ floor, statuses, onSelect, onInspect, inspectedRoomId = null, legendId }: FloorPlanProps) {
  return (
    <div className="@container w-full">
      <div
        role="group"
        aria-label={`Denah lantai ${floor.number}`}
        aria-describedby={legendId}
        className="relative w-full"
        style={{ aspectRatio: `${floor.planWidth} / ${floor.planHeight}` }}
      >
        {floor.rooms.map((room) => {
          const { status, selectable } = statuses.get(room.id) ?? { status: "available" as const, selectable: true };
          const mark = selectable ? undefined : BLOCKED_MARK[status];
          const inspected = room.id === inspectedRoomId;
          return (
            <button
              key={room.id}
              type="button"
              aria-disabled={selectable ? undefined : true}
              aria-pressed={selectable ? status === "selected" : undefined}
              aria-expanded={selectable ? undefined : inspected}
              aria-label={`${room.code}, ${ROOM_CATEGORY_SHORT[room.category]}, ${ROOM_STATUS_LABEL[status]}${selectable ? "" : ". Lihat alasan"}`}
              onClick={() => (selectable ? onSelect(room) : onInspect(room))}
              className={`absolute flex flex-col items-center justify-center overflow-hidden rounded-inner border leading-tight transition-colors ${
                inspected ? "z-10 border-2 border-ink ring-2 ring-primary" : status === "filtered" ? "border-muted" : "border-ink"
              } ${selectable ? "" : "cursor-help"} ${STATUS_STYLES[status]} ${
                // rooms outside the type filter fade back so the matching rooms stand out; the inspected one stays readable
                status === "filtered" && !inspected ? "opacity-40" : ""
              }`}
              style={{
                left: `${(room.x / floor.planWidth) * 100}%`,
                top: `${(room.y / floor.planHeight) * 100}%`,
                width: `${(room.width / floor.planWidth) * 100}%`,
                height: `${(room.height / floor.planHeight) * 100}%`,
              }}
            >
              <span className="text-[max(9px,2.8cqw)] whitespace-nowrap">{room.code}</span>
              <span className="text-[max(7px,1.9cqw)] whitespace-nowrap">{mark ?? ROOM_CATEGORY_SHORT[room.category]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
