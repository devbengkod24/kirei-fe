import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard - Bengkel Koding Coworking Space",
  description: "Sistem reservasi coworking space dan fasilitas kampus Bengkel Koding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[var(--surface-page)] text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}

