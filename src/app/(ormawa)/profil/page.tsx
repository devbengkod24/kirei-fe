import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { ProfilePage } from "@/shared/profile/ProfilePage";

export const metadata: Metadata = { title: "Profil" };

export default async function Page() {
  const user = await getCurrentUser();
  // Ormawa and dosen share this screen.
  return <ProfilePage user={user} roleLabel={user.role === "dosen" ? "Dosen" : "Ormawa"} />;
}
