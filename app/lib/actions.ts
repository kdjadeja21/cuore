"use server";

import {
  readValues,
  reference,
  validate,
  type ReservationState,
} from "./reservation";
import {
  readEnquiry,
  validateEnquiry,
  type EnquiryState,
} from "./enquiry";

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

  console.info("[reservation]", { reference: bookingReference, ...values });

  return { status: "confirmed", reference: bookingReference, values };
}

/**
 * The general enquiry form behind Contact: private dining, large parties,
 * press and careers. Same caveat as above — validated and logged, not yet
 * delivered anywhere.
 */
export async function sendEnquiry(
  _previous: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const values = readEnquiry(formData);
  const errors = validateEnquiry(values);

  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors };
  }

  console.info("[enquiry]", values);

  return { status: "sent", name: values.name };
}
