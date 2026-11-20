import type { Staff } from "@/types/staff";

// Sample drivers for Kelola Staf and the Sopir card. One is inactive to show the status.
export const MOCK_STAFF: Staff[] = [
  { id: "staff-1", name: "Slamet Riyadi", phone: "081234500011", licenseNumber: "1234-5678-000011", licenseExpiresOn: "2028-03-14", role: "sopir", isActive: true },
  { id: "staff-2", name: "Agus Santoso", phone: "081234500012", licenseNumber: "1234-5678-000012", licenseExpiresOn: "2027-08-02", role: "sopir", isActive: true },
  { id: "staff-3", name: "Bambang Wijaya", phone: "081234500013", licenseNumber: "1234-5678-000013", licenseExpiresOn: "2029-01-20", role: "sopir", isActive: true },
  { id: "staff-4", name: "Dedi Kurniawan", phone: "081234500014", licenseNumber: "1234-5678-000014", licenseExpiresOn: "2027-11-30", role: "co_sopir", isActive: true },
  { id: "staff-5", name: "Joko Prasetyo", phone: "081234500015", licenseNumber: "1234-5678-000015", licenseExpiresOn: "2028-06-09", role: "co_sopir", isActive: true },
  { id: "staff-6", name: "Hendro Saputro", phone: "081234500016", licenseNumber: "1234-5678-000016", licenseExpiresOn: "2026-02-01", role: "sopir", isActive: false },
];
