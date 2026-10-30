"use client";

import { Button } from "@/components/ui/Button";

export interface RouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Body of a route segment's error.tsx. */
export function RouteError({ reset }: RouteErrorProps) {
  return (
    <section role="alert" className="mx-auto flex max-w-md flex-col items-center gap-2 rounded-md border border-border bg-surface px-6 py-12 text-center">
      <h2 className="text-base font-semibold text-danger">Halaman gagal dimuat</h2>
      <p className="text-sm text-muted">Server tidak merespons atau koneksi terputus. Coba muat ulang sebentar lagi.</p>
      <Button onClick={reset} className="mt-2">
        Coba lagi
      </Button>
    </section>
  );
}
