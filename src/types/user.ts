export type UserRole =
  | "ormawa"
  | "dosen"
  | "admin_fakultas"
  | "admin_universitas"
  | "superadmin"
  | "operator";

export interface CurrentUser {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}
