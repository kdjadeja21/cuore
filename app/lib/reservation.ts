import { SITE } from "./site";

export const FIELDS = [
  "date",
  "time",
  "party",
  "name",
  "phone",
  "email",
  "occasion",
  "notes",
] as const;

export type FieldName = (typeof FIELDS)[number];
export type ReservationValues = Record<FieldName, string>;
export type FieldErrors = Partial<Record<FieldName, string>>;

export const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Business",
  "Family lunch",
  "Just dinner",
] as const;

/** How far ahead the online form takes bookings. */
export const BOOKING_WINDOW_DAYS = 90;

/** Last table goes out half an hour before the kitchen closes. */
const LAST_SEATING_MINUTES = 22 * 60 + 30;

function toMinutes(time: string): number | null {
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function openingMinutes(): number {
  return toMinutes(SITE.hours.opens) ?? 11 * 60;
}

/** Every half hour the room actually seats, as HH:mm. */
export function timeSlots(): string[] {
  const slots: string[] = [];
  for (let m = openingMinutes(); m <= LAST_SEATING_MINUTES; m += 30) {
    const hours = String(Math.floor(m / 60)).padStart(2, "0");
    const minutes = String(m % 60).padStart(2, "0");
    slots.push(`${hours}:${minutes}`);
  }
  return slots;
}

export function formatTime(time: string): string {
  const minutes = toMinutes(time);
  if (minutes === null) return time;

  const hour24 = Math.floor(minutes / 60);
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const suffix = hour24 < 12 ? "am" : "pm";
  const mm = String(minutes % 60).padStart(2, "0");
  return `${hour12}:${mm} ${suffix}`;
}

export function formatDate(date: string): string {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Midnight today, so "today" is still bookable but yesterday is not. */
function startOfToday(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

export function isoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function bookingWindow(): { min: string; max: string } {
  const min = startOfToday();
  const max = new Date(min);
  max.setDate(max.getDate() + BOOKING_WINDOW_DAYS);
  return { min: isoDate(min), max: isoDate(max) };
}

export function readValues(formData: FormData): ReservationValues {
  const values = {} as ReservationValues;
  for (const field of FIELDS) {
    const raw = formData.get(field);
    values[field] = typeof raw === "string" ? raw.trim() : "";
  }
  return values;
}

/**
 * The only validation authority. The browser's own required/min/max attributes
 * are a convenience on top of this, not a substitute for it — a Server Action
 * can be POSTed to directly.
 */
export function validate(values: ReservationValues): FieldErrors {
  const errors: FieldErrors = {};

  if (values.name.length < 2) {
    errors.name = "Please tell us the name the table is under.";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) {
    errors.phone = "A ten-digit mobile number, so we can call if plans change.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "We send the confirmation here.";
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) {
    errors.date = "Pick a date.";
  } else {
    const { min, max } = bookingWindow();
    if (values.date < min) errors.date = "That date has already passed.";
    else if (values.date > max)
      errors.date = `We take bookings up to ${BOOKING_WINDOW_DAYS} days ahead. Call us for anything further out.`;
  }

  if (!timeSlots().includes(values.time)) {
    errors.time = "Choose a seating time.";
  }

  const party = Number(values.party);
  if (!Number.isInteger(party) || party < 1) {
    errors.party = "How many of you?";
  } else if (party > SITE.maxTableParty) {
    errors.party = `Tables go up to ${SITE.maxTableParty}. For anything larger the banquet team will look after you.`;
  }

  if (values.notes.length > 500) {
    errors.notes = "Please keep this under 500 characters.";
  }

  return errors;
}

/** A short, human-readable booking reference. */
export function reference(): string {
  return `CU-${Date.now().toString(36).slice(-4).toUpperCase()}${Math.floor(
    Math.random() * 36
  )
    .toString(36)
    .toUpperCase()}`;
}
