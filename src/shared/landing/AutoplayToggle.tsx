import { PauseIcon, PlayIcon } from "./LandingIcons";

export interface AutoplayToggleProps {
  paused: boolean;
  onToggle: () => void;
  className?: string;
}

/** Pause and resume control required for any carousel that moves by itself. */
export function AutoplayToggle({ paused, onToggle, className = "" }: AutoplayToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? "Putar otomatis" : "Jeda putar otomatis"}
      className={`inline-flex size-11 items-center justify-center rounded-full border transition-colors ${className}`}
    >
      {paused ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
    </button>
  );
}
