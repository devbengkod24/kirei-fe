import type { Metadata } from "next";
import { Suspense } from "react";
import { PublicDamageReportForm } from "@/shared/reports/PublicDamageReportForm";

export const metadata: Metadata = {
  title: "Formulir Pengaduan",
  description: "Formulir pengaduan fasilitas ruangan dan kelas KIREI tanpa login melalui QR code.",
};

async function LaporContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawRoom = Array.isArray(params.ruangan) ? params.ruangan[0] : params.ruangan;
  return <PublicDamageReportForm initialRoomCode={rawRoom?.trim() ?? ""} />;
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-screen w-full max-w-xl items-center justify-center px-4 py-6 text-sm text-muted">
          Memuat formulir pengaduan...
        </main>
      }
    >
      <LaporContent searchParams={searchParams} />
    </Suspense>
  );
}
