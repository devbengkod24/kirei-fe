"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { writeBrowserDataMode, type DataMode } from "@/lib/data-mode/dataMode";
import { ResetMockReservationsButton } from "@/shared/reservation-store/ResetMockReservationsButton";

const MODES: { value: DataMode; label: string; description: string }[] = [
  {
    value: "sample",
    label: "Dengan data dummy",
    description: "Daftar reservasi, pengumuman, dan laporan sudah berisi data contoh. Yang Anda buat ditambahkan ke data itu.",
  },
  {
    value: "empty",
    label: "Tanpa data dummy",
    description:
      "Semua daftar mulai kosong. Akun demo, gedung, denah, GOR, dan kendaraan tetap ada. Yang Anda buat tersimpan di browser ini, juga setelah halaman dimuat ulang atau ganti akun.",
  },
];

export interface DataModeSwitchProps {
  /** The mode the server read from the cookie, so the first render already shows it. */
  mode: DataMode;
}

/** Picks which data the demo runs on. The choice is a cookie, so server and browser pages follow it. */
export function DataModeSwitch({ mode: initial }: DataModeSwitchProps) {
  const router = useRouter();
  const [mode, setMode] = useState(initial);
  const [blocked, setBlocked] = useState(false);
  const active = MODES.find((item) => item.value === mode) ?? MODES[0];

  const choose = (next: DataMode) => {
    if (next === mode) return;
    if (!writeBrowserDataMode(next)) {
      setBlocked(true);
      return;
    }
    setBlocked(false);
    setMode(next);
    // Server Components read the cookie, so the pages are fetched again.
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2">
      <div role="group" aria-label="Data aplikasi" className="grid grid-cols-2 gap-1 rounded-md border border-border p-1">
        {MODES.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={item.value === mode}
            onClick={() => choose(item.value)}
            className={`min-h-11 rounded-sm px-2 text-xs font-medium transition-colors ${
              item.value === mode ? "bg-primary text-on-primary" : "text-primary hover:bg-primary-soft"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p role="status" className="text-center text-[11px] text-muted">
        {blocked ? "Browser ini menolak cookie, jadi pilihan data tidak bisa diganti." : active.description}
      </p>
      {/* Remounts per mode, so a result message of the other mode does not linger. */}
      <ResetMockReservationsButton key={mode} mode={mode} />
    </div>
  );
}
