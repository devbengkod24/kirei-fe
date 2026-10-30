import type { Metadata } from "next";
import { ContactPage } from "@/modules/ormawa/contact/ContactPage";

export const metadata: Metadata = { title: "Hubungi Kami" };

export default function Page() {
  return <ContactPage />;
}
