export type UserRole = "organisasi" | "dosen" | "admin_fakultas" | "admin_universitas" | "operator";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  /** null for admin_universitas; dosen carry their faculty. */
  fakultasId: string | null;
  avatarUrl?: string;
}
