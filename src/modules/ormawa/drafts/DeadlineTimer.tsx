import { Card } from "@/components/ui/Card";
import type { Countdown } from "@/hooks/useCountdown";
import { formatDateLongWIB, formatTimeWIB } from "@/lib/date";

export interface DeadlineTimerProps {
  id: string;
  deadline: string;
  /** null until the client has mounted */
  countdown: Countdown | null;
}

const pad = (value: number) => String(value).padStart(2, "0");

function display(countdown: Countdown | null) {
  if (!countdown) return { left: "--", right: "--", units: ["jam", "menit"], spoken: "Menghitung sisa waktu" };
  // Under an hour, show seconds so the last minute is not stuck at 00 : 00.
  if (countdown.hours === 0) {
    return {
      left: pad(countdown.minutes),
      right: pad(countdown.seconds),
      units: ["menit", "detik"],
      spoken: `Sisa waktu ${countdown.minutes} menit ${countdown.seconds} detik`,
    };
  }
  return {
    left: pad(countdown.hours),
    right: pad(countdown.minutes),
    units: ["jam", "menit"],
    spoken: `Sisa waktu ${countdown.hours} jam ${countdown.minutes} menit`,
  };
}

/** Big countdown to the letter upload deadline, with the deadline itself in WIB underneath. */
export function DeadlineTimer({ id, deadline, countdown }: DeadlineTimerProps) {
  const { left, right, units, spoken } = display(countdown);
  const expired = countdown?.expired ?? false;
  const urgent = countdown !== null && !expired && countdown.hours === 0;

  return (
    <Card as="section" aria-labelledby={id} className="flex flex-col items-center justify-center gap-4 px-4 py-8 text-center lg:py-10">
      <h3 id={id} className="text-xs font-semibold tracking-wide">
        Tenggat Waktu
      </h3>
      <div
        role="timer"
        aria-label={expired ? "Tenggat sudah lewat" : spoken}
        className={`flex items-start gap-4 font-semibold tabular-nums ${
          expired ? "text-muted" : urgent ? "text-danger-strong" : "text-primary"
        }`}
      >
        {[left, right].map((value, index) => (
          <div key={units[index]} aria-hidden="true" className="flex items-start gap-4">
            {index === 1 && <span className="text-[clamp(3.5rem,14vw,6rem)] leading-[1.4]">:</span>}
            <span className="flex flex-col items-center">
              <span className="text-[clamp(3.5rem,14vw,6rem)] leading-[1.4]">{value}</span>
              <span className="text-[11px] font-normal text-muted">{units[index]}</span>
            </span>
          </div>
        ))}
      </div>
      <p className={`text-xs ${expired ? "font-medium text-danger" : "text-muted"}`}>
        {expired ? "Tenggat sudah lewat: " : "Batas unggah surat: "}
        {formatDateLongWIB(deadline)}, {formatTimeWIB(deadline)} WIB
      </p>
    </Card>
  );
}
