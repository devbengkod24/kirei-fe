import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { CONTACT } from "@/config/contact";
import { ComplaintForm } from "./ComplaintForm";

const CHANNEL = "flex gap-3 rounded-md border border-border bg-surface p-4";
const CHANNEL_LINK = `${CHANNEL} hover:border-primary/50 focus-visible:border-primary`;
const CHANNEL_TITLE = "text-sm font-semibold tracking-[0.075em] text-muted uppercase";

function ChannelIcon({ src, width, height }: { src: string; width: number; height: number }) {
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary">
      <Image src={src} alt="" width={width} height={height} />
    </span>
  );
}

/** Complaint form for the admin, next to the Sarpras contact channels. */
export function ContactPage() {
  return (
    <Card className="flex flex-col gap-10 p-6 md:p-10 lg:flex-row lg:justify-between">
      <ComplaintForm />

      <section aria-label="Kontak Sarpras" className="flex w-full flex-col gap-3 lg:max-w-[326px]">
        <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className={`${CHANNEL_LINK} items-center`}>
          <ChannelIcon src="/icons/contact-chat.svg" width={20} height={20} />
          <span className="flex flex-col">
            <span className={CHANNEL_TITLE}>WhatsApp</span>
            <span className="text-xs leading-6">{CONTACT.whatsapp.display}</span>
          </span>
        </a>
        <a href={`mailto:${CONTACT.email}`} className={`${CHANNEL_LINK} items-center`}>
          <ChannelIcon src="/icons/contact-mail.svg" width={20} height={16} />
          <span className="flex min-w-0 flex-col">
            <span className={CHANNEL_TITLE}>Email Support</span>
            <span className="text-xs leading-6 break-all">{CONTACT.email}</span>
          </span>
        </a>
        <div className={`${CHANNEL} flex-col`}>
          <div className="flex items-center gap-3">
            <ChannelIcon src="/icons/contact-location.svg" width={27} height={21} />
            <p className="flex flex-col">
              <span className={CHANNEL_TITLE}>Alamat Kantor</span>
              <span className="text-xs leading-6">{CONTACT.office.name}</span>
            </p>
          </div>
          <address className="text-xs leading-[18px] text-muted not-italic">{CONTACT.office.address}</address>
        </div>
      </section>
    </Card>
  );
}
