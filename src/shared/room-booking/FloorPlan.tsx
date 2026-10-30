"use client";

import type { Room } from "@/types/room";
import { ROOM_TYPE_LABEL, ROOM_TYPE_PREFIX } from "@/shared/rooms/room-labels";

export type PlanRoomState = "selected" | "unavailable" | "available" | "filtered-out";

export interface FloorPlanProps {
  /** Rooms on this floor that have a position on the plan. */
  rooms: Room[];
  stateOf: (room: Room) => PlanRoomState;
  onSelect: (room: Room) => void;
  label: string;
}

const STATE_STYLES: Record<PlanRoomState, string> = {
  selected: "border-info bg-info text-on-primary",
  unavailable: "cursor-not-allowed border-danger-strong bg-danger-soft text-danger",
  available: "border-ink bg-calendar-past text-ink hover:bg-primary-soft",
  "filtered-out": "cursor-not-allowed border-border bg-surface text-muted",
};

const STATE_LABEL: Record<PlanRoomState, string> = {
  selected: "dipilih",
  unavailable: "tidak tersedia",
  available: "tersedia",
  "filtered-out": "tipe lain",
};

/** Floor plan drawn from each room's plan rectangle; available rooms are buttons. */
export function FloorPlan({ rooms, stateOf, onSelect, label }: FloorPlanProps) {
  return (
    <div role="group" aria-label={label} className="relative aspect-[471/296] w-full min-w-[320px]">
      {rooms.map((room) => {
        const state = stateOf(room);
        const disabled = state === "unavailable" || state === "filtered-out";
        const plan = room.plan!;
        return (
          <button
            key={room.id}
            type="button"
            disabled={disabled}
            aria-pressed={state === "selected"}
            aria-label={`${room.code}, ${ROOM_TYPE_LABEL[room.type]}, ${STATE_LABEL[state]}`}
            onClick={() => onSelect(room)}
            className={`absolute flex flex-col items-center justify-center rounded-md border text-center leading-tight transition-colors ${STATE_STYLES[state]}`}
            style={{ left: `${plan.x}%`, top: `${plan.y}%`, width: `${plan.width}%`, height: `${plan.height}%` }}
          >
            <span className="text-xs">{room.code}</span>
            <span aria-hidden="true" className="text-[10px]">
              {ROOM_TYPE_PREFIX[room.type]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
