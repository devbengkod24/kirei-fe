/** Largest loan letter accepted. TODO: match the upload rule in kirei-api once it is documented. */
export const LETTER_MAX_SIZE_MB = 5;

/**
 * GOR booking limits: today plus the next 13 days, at most 2 hours per reservation, always the
 * whole court. TODO: kirei-api must enforce the same limits; these only guide the form.
 */
export const SPORTS_HALL_BOOKING_DAYS = 14;
export const SPORTS_HALL_MAX_MINUTES = 120;

/** A draft's loan letter is due this many hours after the draft was saved. TODO: confirm with kirei-api. */
export const DRAFT_LETTER_HOURS = 24;

/**
 * Rooms can be booked from 07:00 to 20:00 WIB (KONTEKS-DASAR section 6). GOR keeps its own hours on
 * the hall data. TODO: kirei-api must enforce the same window.
 */
export const ROOM_OPEN_TIME = "07:00";
export const ROOM_CLOSE_TIME = "20:00";

/** Ormawa and UKM may not book for today or tomorrow (H-0, H-1), so the earliest day is the one after. */
export const ORGANISATION_MIN_DAYS_AHEAD = 2;

/** Largest room photo accepted. TODO: match the upload rule in kirei-api once it is documented. */
export const ROOM_PHOTO_MAX_SIZE_MB = 2;
