import Image from "next/image";

const STEPS = [
  { label: "Pilih lokasi & tanggal", icon: "/icons/calendar-outline.svg", size: 16 },
  { label: "Pilih waktu reservasi", icon: "/icons/clock-outline.svg", size: 16 },
  { label: "Pilih ruangan yang tersedia pada denah", icon: "/icons/classroom.svg", size: 19 },
  { label: "Upload berkas", icon: "/icons/sticky-note.svg", size: 16 },
];

/** Static guide above the floor plan; the steps themselves are the fields on the page. */
export function ReservationSteps() {
  return (
    <section aria-labelledby="reservation-steps-title" className="flex flex-col gap-1 rounded-md bg-primary-soft p-3">
      <div className="flex items-center gap-2">
        <Image src="/icons/reservation-steps.svg" alt="" width={20} height={20} />
        <h2 id="reservation-steps-title" className="text-sm font-semibold tracking-wide">
          Tahapan Reservasi
        </h2>
      </div>
      <ol className="flex flex-col gap-x-2 gap-y-1 text-xs leading-5 sm:flex-row sm:flex-wrap sm:items-center">
        {STEPS.map((step, index) => (
          <li key={step.label} className="flex items-center gap-2">
            {index > 0 && <Image src="/icons/step-arrow.svg" alt="" width={18} height={18} className="hidden sm:block" />}
            <Image src={step.icon} alt="" width={step.size} height={step.size} />
            <span>{step.label}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
