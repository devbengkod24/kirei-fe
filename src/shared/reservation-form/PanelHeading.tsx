import Image from "next/image";

export interface PanelHeadingProps {
  id: string;
  iconSrc: string;
  iconWidth?: number;
  iconHeight?: number;
  children: React.ReactNode;
}

/** Tinted heading strip at the top of each side panel. */
export function PanelHeading({ id, iconSrc, iconWidth = 16, iconHeight = 16, children }: PanelHeadingProps) {
  return (
    <h2 id={id} className="flex min-h-[25px] items-center gap-1 rounded-inner bg-primary-soft px-2 py-1 text-xs font-semibold tracking-wide text-primary">
      <Image src={iconSrc} alt="" width={iconWidth} height={iconHeight} />
      {children}
    </h2>
  );
}
