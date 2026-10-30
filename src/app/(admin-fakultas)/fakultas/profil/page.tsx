import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { ProfilePage } from "@/shared/profile/ProfilePage";

export const metadata: Metadata = { title: "Profil" };

export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  return <ProfilePage user={user} roleLabel="Admin Fakultas" />;
}
