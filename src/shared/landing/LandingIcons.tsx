/* Small stroke icons used only on the landing page. They inherit the text color. */

interface IconProps {
  className?: string;
}

function Stroke({ className = "", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M17 8l4 4m0 0-4 4m4-4H3" />
    </Stroke>
  );
}

export function ChevronIcon({ className, direction }: IconProps & { direction: "left" | "right" }) {
  return (
    <Stroke className={className}>
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </Stroke>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M12 5v14M5 12h14" />
    </Stroke>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Stroke>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Stroke>
  );
}

export function PersonIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" />
    </Stroke>
  );
}

export function GroupIcon({ className }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M17 20h5v-2a3 3 0 0 0-5.36-1.86M17 20H7m10 0v-2c0-.66-.13-1.28-.36-1.86M7 20H2v-2a3 3 0 0 1 5.36-1.86M7 20v-2c0-.66.13-1.28.36-1.86m0 0a5 5 0 0 1 9.28 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </Stroke>
  );
}
