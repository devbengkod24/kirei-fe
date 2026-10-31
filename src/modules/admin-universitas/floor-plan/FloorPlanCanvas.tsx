"use client";

import { useId, useRef } from "react";
import { ROOM_CATEGORY_SHORT } from "@/shared/reservation-form/labels";
import type { Floor } from "@/types/facility";
import { GRID, fitRoom, gridSize, type RoomRect } from "./floorPlanEdits";

export interface FloorPlanCanvasProps {
  floor: Floor;
  selectedId: string | null;
  onSelect: (roomId: string) => void;
  onChange: (roomId: string, rect: RoomRect) => void;
  /** id of the text that explains mouse and keyboard controls */
  helpId: string;
}

/** Size of the resize handle at the selected room's bottom-right corner, in plan units. */
const HANDLE = 10;

type Drag = { roomId: string; mode: "move" | "resize"; startX: number; startY: number; start: RoomRect };

/**
 * Editable floor plan drawn in SVG, in the floor's own plan units, so what it saves is what the
 * booking form's FloorPlan shows. Rooms snap to the grid: drag a room to move it a cell at a
 * time, drag the corner handle to resize it by whole cells. A focused room moves with the arrow
 * keys and grows or shrinks with Shift + arrow.
 */
export function FloorPlanCanvas({ floor, selectedId, onSelect, onChange, helpId }: FloorPlanCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<Drag | null>(null);
  const patternId = useId();
  const selectedRoom = floor.rooms.find((room) => room.id === selectedId);
  const { columns, rows } = gridSize(floor);

  const toPlan = (event: React.PointerEvent) => {
    const matrix = svgRef.current?.getScreenCTM()?.inverse();
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix);
    return { x: point.x, y: point.y };
  };

  const startDrag = (event: React.PointerEvent, roomId: string, mode: Drag["mode"]) => {
    const room = floor.rooms.find((item) => item.id === roomId);
    if (!room || event.button !== 0) return;
    event.stopPropagation();
    onSelect(roomId);
    const { x, y } = toPlan(event);
    drag.current = { roomId, mode, startX: x, startY: y, start: { x: room.x, y: room.y, width: room.width, height: room.height } };
    svgRef.current?.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: React.PointerEvent) => {
    const current = drag.current;
    if (!current) return;
    const { x, y } = toPlan(event);
    const dx = x - current.startX;
    const dy = y - current.startY;
    const { start } = current;
    const rect =
      current.mode === "move"
        ? { ...start, x: start.x + dx, y: start.y + dy }
        : { ...start, width: start.width + dx, height: start.height + dy };
    onChange(current.roomId, fitRoom(rect, floor));
  };

  const endDrag = (event: React.PointerEvent) => {
    if (!drag.current) return;
    drag.current = null;
    svgRef.current?.releasePointerCapture(event.pointerId);
  };

  const nudge = (event: React.KeyboardEvent, roomId: string) => {
    const room = floor.rooms.find((item) => item.id === roomId);
    if (!room) return;
    const offsets: Record<string, [number, number]> = {
      ArrowLeft: [-GRID, 0],
      ArrowRight: [GRID, 0],
      ArrowUp: [0, -GRID],
      ArrowDown: [0, GRID],
    };
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(roomId);
      return;
    }
    const offset = offsets[event.key];
    if (!offset) return;
    event.preventDefault();
    onSelect(roomId);
    const [dx, dy] = offset;
    const rect = event.shiftKey
      ? { ...room, width: room.width + dx, height: room.height + dy }
      : { ...room, x: room.x + dx, y: room.y + dy };
    onChange(roomId, fitRoom(rect, floor));
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${columns * GRID} ${rows * GRID}`}
      role="group"
      aria-label={`Denah lantai ${floor.number}`}
      aria-describedby={helpId}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      // On large screens the plan is also capped by the window height (minus header and help text), so it fits without scrolling.
      style={{ "--plan-ratio": columns / rows } as React.CSSProperties}
      className="mx-auto block h-auto w-full touch-none rounded-md border border-ink bg-surface select-none lg:w-[min(100%,calc((100dvh-14.5rem)*var(--plan-ratio)))]"
    >
      <defs>
        <pattern id={patternId} width={GRID} height={GRID} patternUnits="userSpaceOnUse">
          <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" className="stroke-border" strokeWidth={0.5} />
        </pattern>
      </defs>
      {/* Only whole cells hold rooms, so the canvas ends at the last whole cell. */}
      <rect width={columns * GRID} height={rows * GRID} fill={`url(#${patternId})`} />

      {floor.rooms.map((room) => {
        const selected = room.id === selectedId;
        return (
          <g
            key={room.id}
            tabIndex={0}
            role="button"
            aria-pressed={selected}
            aria-label={`${room.code || "Tanpa kode"}, ${ROOM_CATEGORY_SHORT[room.category]}, kolom ${room.x / GRID + 1}, baris ${room.y / GRID + 1}, ${room.width / GRID} kali ${room.height / GRID} kotak`}
            onPointerDown={(event) => startDrag(event, room.id, "move")}
            onKeyDown={(event) => nudge(event, room.id)}
            className="group cursor-move outline-none"
          >
            <rect
              x={room.x}
              y={room.y}
              width={room.width}
              height={room.height}
              rx={4}
              strokeWidth={selected ? 2 : 1}
              className={`${selected ? "fill-plan-selected stroke-primary" : "fill-plan-available stroke-ink"} group-focus-visible:stroke-border-focus group-focus-visible:[stroke-width:3]`}
            />
            <text
              x={room.x + room.width / 2}
              y={room.y + room.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={Math.min(12, room.width / 4.5)}
              className={`pointer-events-none ${selected ? "fill-on-primary" : "fill-ink"}`}
            >
              {room.code || "?"}
            </text>
          </g>
        );
      })}

      {/* The selected room again, drawn last so it sits above overlapping rooms. Focus stays on the copy above. */}
      {selectedRoom && (
        <g aria-hidden="true" className="cursor-move">
          <rect
            x={selectedRoom.x}
            y={selectedRoom.y}
            width={selectedRoom.width}
            height={selectedRoom.height}
            rx={4}
            strokeWidth={2}
            onPointerDown={(event) => startDrag(event, selectedRoom.id, "move")}
            className="fill-plan-selected stroke-primary"
          />
          <text
            x={selectedRoom.x + selectedRoom.width / 2}
            y={selectedRoom.y + selectedRoom.height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={Math.min(12, selectedRoom.width / 4.5)}
            className="pointer-events-none fill-on-primary"
          >
            {selectedRoom.code || "?"}
          </text>
          <rect
            x={selectedRoom.x + selectedRoom.width - HANDLE}
            y={selectedRoom.y + selectedRoom.height - HANDLE}
            width={HANDLE}
            height={HANDLE}
            rx={2}
            onPointerDown={(event) => startDrag(event, selectedRoom.id, "resize")}
            className="cursor-nwse-resize fill-surface stroke-primary"
            strokeWidth={1.5}
          />
        </g>
      )}
    </svg>
  );
}
