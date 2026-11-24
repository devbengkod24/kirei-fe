import type { Vehicle } from "@/types/facility";

type Shape = "car" | "van" | "bus";

/** Vehicle types carry no category, so the seat count picks the drawing. */
const shapeOf = (vehicle: Vehicle): Shape => (vehicle.capacity >= 20 ? "bus" : vehicle.capacity >= 10 ? "van" : "car");

const BODY: Record<Shape, string> = {
  car: "M5 15V11.5L7 7h10l2 4.5V15z",
  van: "M3 15V7.5A1.5 1.5 0 0 1 4.5 6H15l4 4.5V15z",
  bus: "M2.5 15V6.5A1.5 1.5 0 0 1 4 5h16a1.5 1.5 0 0 1 1.5 1.5V15z",
};

const WINDOWS: Record<Shape, string> = {
  car: "M8 8h8l1.2 3H6.8z",
  van: "M5 8h4v2.5H5zM10.5 8H14l2.2 2.5h-5.7z",
  bus: "M4 7h3.5v3H4zM9 7h3.5v3H9zM14 7h3.5v3H14zM19 7h1v3h-1z",
};

/** Simple outline of a car, van, or bus in the current text color. */
export function VehicleIcon({ vehicle, className = "" }: { vehicle: Vehicle; className?: string }) {
  const shape = shapeOf(vehicle);
  return (
    <svg viewBox="0 0 24 20" aria-hidden="true" className={className}>
      <path d={BODY[shape]} fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d={WINDOWS[shape]} fill="currentColor" opacity="0.55" />
      <circle cx={shape === "car" ? 8 : 7} cy="15.5" r="2" fill="currentColor" />
      <circle cx={shape === "car" ? 16 : 17} cy="15.5" r="2" fill="currentColor" />
    </svg>
  );
}
