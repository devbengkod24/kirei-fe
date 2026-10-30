import type { Floor, FloorPlanRoom } from "@/types/facility";
import type { RoomStatus } from "./availability";
import { ROOM_CATEGORY_SHORT, ROOM_STATUS_LABEL } from "./labels";

export interface FloorPlanProps {
  floor: Floor;
  statuses: Map<string, { status: RoomStatus; selectable: boolean }>;
  onSelect: (room: FloorPlanRoom) => void;
  /** id of the element that describes the room states (the legend) */
  legendId: string;
}

const STATUS_STYLES: Record<RoomStatus, string> = {
  selected: "bg-plan-selected text-on-primary",
  booked: "bg-plan-booked text-on-primary",
  available: "bg-plan-available text-ink hover:bg-border",
  filtered: "bg-plan-filtered text-on-primary",
};

/**
 * Read-only floor plan. Rooms are placed by percentage so the plan scales with its container,
 * and label sizes follow the container width (cqw) to stay inside the rooms.
 */
export function FloorPlan({ floor, statuses, onSelect, legendId }: FloorPlanProps) {
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
          return (
            <button
              key={room.id}
              type="button"
              disabled={!selectable}
              aria-pressed={status === "selected"}
              aria-label={`${room.code}, ${ROOM_CATEGORY_SHORT[room.category]}, ${ROOM_STATUS_LABEL[status]}`}
              onClick={() => onSelect(room)}
              className={`absolute flex flex-col items-center justify-center overflow-hidden rounded-inner border border-ink leading-tight transition-colors disabled:cursor-not-allowed ${STATUS_STYLES[status]}`}
              style={{
                left: `${(room.x / floor.planWidth) * 100}%`,
                top: `${(room.y / floor.planHeight) * 100}%`,
                width: `${(room.width / floor.planWidth) * 100}%`,
                height: `${(room.height / floor.planHeight) * 100}%`,
              }}
            >
              <span className="text-[max(9px,2.8cqw)] whitespace-nowrap">{room.code}</span>
              <span className="text-[max(7px,1.9cqw)] whitespace-nowrap">{ROOM_CATEGORY_SHORT[room.category]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
