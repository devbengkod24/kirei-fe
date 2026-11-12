import Image from "next/image";
import { SITE } from "@/config/site";

export function AppBrand() {
  return (
    <div className="flex items-center gap-2.5">
      {/* The brand always sits in the header, above the fold, so it is never lazy-loaded. */}
      <Image src={SITE.logoSrc} alt="" width={40} height={40} loading="eager" className="shrink-0" />
      <div className="font-brand whitespace-nowrap">
        <p className="text-xl leading-6 font-bold text-ink">{SITE.name}</p>
        <p className="text-xs leading-[14px] font-medium text-muted">{SITE.tagline}</p>
      </div>
    </div>
  );
}
