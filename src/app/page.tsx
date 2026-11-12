import type { Metadata } from "next";
import { LandingPage } from "@/shared/landing/LandingPage";

export const metadata: Metadata = { title: "Reservasi Fasilitas Kampus" };

export default function Page() {
  return <LandingPage />;
}
