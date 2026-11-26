import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { ContactPage } from "@/shared/contact/ContactPage";

export const metadata: Metadata = { title: "Hubungi Kami" };

export default async function Page() {
  const user = await getCurrentUser();

  return <ContactPage authorName={user.name} reporterType={user.role === "dosen" ? "staf" : "mahasiswa"} />;
}
