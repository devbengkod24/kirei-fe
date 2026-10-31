import Image from "next/image";
import Link from "next/link";
import { RESERVATION_TYPES, type ReservationType } from "@/types/reservation";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import { ReservationTypeIllustration } from "./ReservationTypeIllustration";

const DESCRIPTION: Record<ReservationType, string> = {
  ruangan: "Ruang kelas, ruang rapat, aula, dan galeri di gedung fakultas maupun gedung universitas.",
  kendaraan: "Kendaraan kampus untuk kegiatan organisasi dan perkuliahan di luar kampus.",
  gor: "Gedung olahraga kampus untuk latihan, pertandingan, dan acara.",
};

export interface ReservationTypePickerProps {
  /** Form link per type. A type without a link is shown as not available yet. */
  hrefs: Partial<Record<ReservationType, string>>;
}

export function ReservationTypePicker({ hrefs }: ReservationTypePickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <header className="flex flex-col gap-1 rounded-md bg-primary-soft px-3 py-2.5">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Image src="/icons/reservation-steps.svg" alt="" width={20} height={20} />
          Kategori Reservasi Fasilitas
        </h2>
        <p className="text-xs text-muted">Pilih jenis fasilitas yang ingin kamu pesan.</p>
      </header>

      <ul className="grid gap-3 md:grid-cols-3">
        {RESERVATION_TYPES.map((type) => {
          const href = hrefs[type];
          const label = RESERVATION_TYPE_LABEL[type];
          return (
            <li key={type} className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5">
              <ReservationTypeIllustration type={type} />
              <h3 className="text-lg font-semibold">{label}</h3>
              <p className="flex-1 text-sm text-muted">{DESCRIPTION[type]}</p>
              {href ? (
                <Link
                  href={href}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-on-primary hover:bg-primary-hover"
                >
                  Pilih &amp; Reservasi {label}
                </Link>
              ) : (
                <p className="inline-flex min-h-12 items-center justify-center rounded-lg bg-chip px-4 text-sm font-medium text-muted">
                  Segera hadir
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
