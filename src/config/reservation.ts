/** Largest loan letter accepted. TODO: match the upload rule in kirei-api once it is documented. */
export const LETTER_MAX_SIZE_MB = 5;

/**
 * GOR booking limits: today plus the next 13 days, at most 2 hours per reservation, always the
 * whole court. TODO: kirei-api must enforce the same limits; these only guide the form.
 */
export const SPORTS_HALL_BOOKING_DAYS = 14;
export const SPORTS_HALL_MAX_MINUTES = 120;

/** Largest room photo accepted. TODO: match the upload rule in kirei-api once it is documented. */
export const ROOM_PHOTO_MAX_SIZE_MB = 2;
