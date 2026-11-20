import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { ProfilePage } from "@/shared/profile/ProfilePage";

export const metadata: Metadata = { title: "Profil" };

export default async function Page() {
  // Only ormawa and UKM have a profile (notulen 19/11/2026); dosen go back to their dashboard.
  const user = await requireRole(["organisasi"]);
  return <ProfilePage user={user} roleLabel="Ormawa" />;
}
