import type { Staff } from "@/types/staff";

// Sample drivers for Kelola Staf and the Sopir card. One is inactive to show the status.
export const MOCK_STAFF: Staff[] = [
  { id: "staff-1", name: "Slamet Riyadi", phone: "081234500011", licenseClass: "B1 Umum", role: "sopir", isActive: true },
  { id: "staff-2", name: "Agus Santoso", phone: "081234500012", licenseClass: "B2 Umum", role: "sopir", isActive: true },
  { id: "staff-3", name: "Bambang Wijaya", phone: "081234500013", licenseClass: "A Umum", role: "sopir", isActive: true },
  { id: "staff-4", name: "Dedi Kurniawan", phone: "081234500014", licenseClass: "A", role: "co_sopir", isActive: true },
  { id: "staff-5", name: "Joko Prasetyo", phone: "081234500015", licenseClass: "C", role: "co_sopir", isActive: true },
  { id: "staff-6", name: "Hendro Saputro", phone: "081234500016", licenseClass: "B1", role: "sopir", isActive: false },
];
