"use server";

import {
  readValues,
  reference,
  validate,
  type FieldErrors,
  type ReservationValues,
} from "./reservation";

export type ReservationState =
  | { status: "idle" }
  | { status: "invalid"; errors: FieldErrors; values: ReservationValues }
  | {
      status: "confirmed";
      reference: string;
      values: ReservationValues;
    };

export const INITIAL_RESERVATION_STATE: ReservationState = { status: "idle" };

/**
 * Validates a booking request and confirms it.
 *
 * There is no booking system or mail provider wired up to this deployment, so a
 * valid request is acknowledged and logged rather than stored. Connecting it
 * means replacing the log line below with the real write and confirmation
 * email; nothing else about the flow needs to change.
 */
export async function requestReservation(
  _previous: ReservationState,
  formData: FormData
): Promise<ReservationState> {
  const values = readValues(formData);
  const errors = validate(values);

  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values };
  }

  const bookingReference = reference();

  console.info("[reservation]", {
    reference: bookingReference,
    date: values.date,
    time: values.time,
    party: values.party,
    name: values.name,
    phone: values.phone,
    email: values.email,
    occasion: values.occasion,
    notes: values.notes,
  });

  return { status: "confirmed", reference: bookingReference, values };
}

export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: Record<string, string> }
  | { status: "sent"; name: string };

export const INITIAL_ENQUIRY_STATE: EnquiryState = { status: "idle" };

/**
 * The general enquiry form behind Contact: press, events, careers and large
 * parties. Same caveat as above — validated and logged, not yet delivered.
 */
export async function sendEnquiry(
  _previous: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please give us a name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "We reply to this address.";
  if (message.length < 10)
    errors.message = "A sentence or two about what you need.";

  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors };
  }

  console.info("[enquiry]", { name, email, subject, message });

  return { status: "sent", name };
}
