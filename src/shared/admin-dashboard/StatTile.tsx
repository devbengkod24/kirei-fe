import Image from "next/image";

const TONES = {
  violet: "bg-stat-violet-soft text-stat-violet",
  teal: "bg-stat-teal-soft text-stat-teal",
  orange: "bg-warning-soft text-warning",
} as const;

export interface StatTileProps {
  label: string;
  value: number;
  iconSrc: string;
  tone: keyof typeof TONES;
}

export function StatTile({ label, value, iconSrc, tone }: StatTileProps) {
  return (
    <dl className={`flex flex-col gap-2 rounded-md p-2 ${TONES[tone]}`}>
      <dt className="flex items-center gap-1 p-1 text-xs font-medium">
        <Image src={iconSrc} alt="" width={18} height={18} />
        {label}
      </dt>
      <dd className="px-6 text-[32px] leading-[25px] font-semibold">{value}</dd>
    </dl>
  );
}
