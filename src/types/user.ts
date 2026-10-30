export type UserRole = "ormawa" | "dosen" | "admin_fakultas" | "admin_universitas" | "operator";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  /** null for university-level ormawa (BEM, UKM) and admin_universitas */
  fakultasId: string | null;
  avatarUrl?: string;
}
