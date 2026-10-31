import type { ReservationType } from "@/types/reservation";

/* Simple line drawings in the theme colors (stroke-primary on the soft tint), so they follow dark mode too. */

function Room() {
  return (
    <>
      {/* building with a row of windows and a door */}
      <rect x="34" y="18" width="92" height="68" rx="4" className="fill-surface" />
      <path d="M30 22 80 6l50 16" />
      {[48, 72, 96].map((x) => (
        <rect key={x} x={x} y="32" width="16" height="14" rx="2" className="fill-primary-tint" />
      ))}
      <rect x="48" y="56" width="16" height="14" rx="2" className="fill-primary-tint" />
      <rect x="96" y="56" width="16" height="14" rx="2" className="fill-primary-tint" />
      <path d="M72 86V60h16v26" className="fill-primary-tint" />
      <path d="M22 86h116" />
    </>
  );
}

function Vehicle() {
  return (
    <>
      {/* minibus seen from the side */}
      <path d="M24 70V40a8 8 0 0 1 8-8h72l20 18h6a6 6 0 0 1 6 6v14H24Z" className="fill-surface" />
      <path d="M36 40h20v14H36zM64 40h22v14H64zM94 40h8l12 14H94z" className="fill-primary-tint" />
      <circle cx="48" cy="72" r="9" className="fill-surface" />
      <circle cx="112" cy="72" r="9" className="fill-surface" />
      <circle cx="48" cy="72" r="3" />
      <circle cx="112" cy="72" r="3" />
      <path d="M14 86h132" />
    </>
  );
}

function SportsHall() {
  return (
    <>
      {/* hall roof over a court with a net and a shuttlecock */}
      <path d="M26 86V40c18-22 90-22 108 0v46" className="fill-surface" />
      <rect x="40" y="56" width="80" height="30" className="fill-primary-tint" />
      <path d="M80 56v30M40 71h80" />
      <path d="M80 46v-8" />
      <path d="M100 22l8 10M108 22l-8 10" />
      <circle cx="104" cy="34" r="3" className="fill-surface" />
      <path d="M18 86h124" />
    </>
  );
}

const DRAWINGS: Record<ReservationType, () => React.JSX.Element> = {
  ruangan: Room,
  kendaraan: Vehicle,
  gor: SportsHall,
};

/** Decorative picture for a reservation type card. */
export function ReservationTypeIllustration({ type }: { type: ReservationType }) {
  const Drawing = DRAWINGS[type];
  return (
    <div aria-hidden="true" className="flex h-32 items-center justify-center rounded-md bg-primary-soft">
      <svg
        viewBox="0 0 160 96"
        className="h-24 w-auto fill-none stroke-primary"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Drawing />
      </svg>
    </div>
  );
}
