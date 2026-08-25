export type EnquiryErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export type EnquiryValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: EnquiryErrors }
  | { status: "sent"; name: string };

export const INITIAL_ENQUIRY_STATE: EnquiryState = { status: "idle" };

export const SUBJECTS = [
  "Private dining & banquets",
  "Large party (over 10)",
  "Press & photography",
  "Careers",
  "Something else",
] as const;

export function readEnquiry(formData: FormData): EnquiryValues {
  const read = (field: string) => String(formData.get(field) ?? "").trim();

  return {
    name: read("name"),
    email: read("email"),
    subject: read("subject"),
    message: read("message"),
  };
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (values.name.length < 2) errors.name = "Please give us a name.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "We reply to this address.";
  }

  if (values.message.length < 10) {
    errors.message = "A sentence or two about what you need.";
  }

  return errors;
}
