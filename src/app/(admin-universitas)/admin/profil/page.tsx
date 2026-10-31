import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { ProfilePage } from "@/shared/profile/ProfilePage";

export const metadata: Metadata = { title: "Profil" };

export default async function Page() {
  const user = await requireRole(["admin_universitas"]);
  return <ProfilePage user={user} roleLabel="Admin Universitas" />;
}
