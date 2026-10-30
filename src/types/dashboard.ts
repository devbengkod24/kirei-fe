export type UserRole =
  | "ormawa"
  | "dosen"
  | "admin_fakultas"
  | "admin_universitas"
  | "superadmin"
  | "operator";

export type ReservationStatus =
  | "menunggu_konfirmasi"
  | "disetujui"
  | "ditolak"
  | "selesai"
  | "dibatalkan";

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  isBlocked: boolean;
  blockedUntil?: string;
  totalReservations: number;
  totalPenalties: number;
  maxPenalties: number;
}

export interface ReservationItem {
  id: string;
  ticketCode: string;
  dateLabel: string;
  timeRangeLabel: string;
  buildingName: string;
  roomName: string;
  status: ReservationStatus;
}

export type AnnouncementCategory = "informasi" | "pemberitahuan";

export interface AnnouncementItem {
  id: string;
  title: string;
  category: AnnouncementCategory;
  categoryLabel: string;
  content: string;
  cancellationReason?: string;
  authorName: string;
  publishedAt: string;
}

export interface CalendarDayItem {
  dateNumber: number;
  isCurrentMonth: boolean;
  hasActivity?: boolean;
  hasPenalty?: boolean;
  isSelected?: boolean;
  isUpcoming?: boolean;
}

