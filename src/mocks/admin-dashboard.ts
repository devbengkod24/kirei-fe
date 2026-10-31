// Sample numbers from the Figma V3 admin dashboard ("Distribusi Reservasi" and "Distribusi Pengguna").
export const MOCK_WEEKLY_TREND = {
  labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
  succeeded: [70, 130, 25, 195],
  cancelled: [20, 40, 60, 85],
};

export const MOCK_USER_ACTIVITY = { activeUsers: 275, totalUsers: 300 };

// Combined dashboard for admin universitas. Sample numbers, not from Figma.
export const MOCK_WEEKLY_TREND_BY_TYPE = {
  labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
  ruangan: { succeeded: [210, 340, 180, 420], cancelled: [35, 60, 72, 90] },
  gor: { succeeded: [28, 34, 22, 40], cancelled: [4, 6, 3, 8] },
  kendaraan: { succeeded: [9, 12, 7, 15], cancelled: [2, 1, 3, 2] },
};

export const MOCK_UNIVERSITY_USER_ACTIVITY = { activeUsers: 1240, totalUsers: 1500 };
