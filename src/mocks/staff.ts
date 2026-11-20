import type { Staff } from "@/types/staff";

// shortcut: sample drivers until Kelola Staf (Admin Universitas) manages them; switch to its data then.
export const MOCK_STAFF: Staff[] = [
  { id: "staff-1", name: "Slamet Riyadi", phone: "081234500011", licenseNumber: "1234-5678-000011", licenseExpiresOn: "2028-03-14", role: "sopir" },
  { id: "staff-2", name: "Agus Santoso", phone: "081234500012", licenseNumber: "1234-5678-000012", licenseExpiresOn: "2027-08-02", role: "sopir" },
  { id: "staff-3", name: "Bambang Wijaya", phone: "081234500013", licenseNumber: "1234-5678-000013", licenseExpiresOn: "2029-01-20", role: "sopir" },
  { id: "staff-4", name: "Dedi Kurniawan", phone: "081234500014", licenseNumber: "1234-5678-000014", licenseExpiresOn: "2027-11-30", role: "co_sopir" },
  { id: "staff-5", name: "Joko Prasetyo", phone: "081234500015", licenseNumber: "1234-5678-000015", licenseExpiresOn: "2028-06-09", role: "co_sopir" },
];
