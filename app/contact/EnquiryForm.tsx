"use client";

import { useActionState } from "react";
import { buttonClass } from "@/app/components/button";
import { sendEnquiry } from "@/app/lib/actions";
import { INITIAL_ENQUIRY_STATE, SUBJECTS } from "@/app/lib/enquiry";

export default function EnquiryForm() {
  const [state, action, pending] = useActionState(
    sendEnquiry,
    INITIAL_ENQUIRY_STATE
  );

  const errors = state.status === "invalid" ? state.errors : {};

  if (state.status === "sent") {
    return (
      <div
        role="status"
        className="rounded-lg border border-ink/15 bg-cream/60 p-8 sm:p-10"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-rust">
          Sent
        </p>
        <h3 className="mt-4 font-display text-2xl font-medium tracking-tight sm:text-3xl">
          Thank you, {state.name}.
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Somebody reads this inbox every morning and most afternoons. You will
          hear back within a day.
        </p>
      </div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="flex flex-col gap-7 rounded-lg border border-ink/15 bg-cream/60 p-8 sm:p-10"
    >
      {state.status === "invalid" ? (
        <p
          role="alert"
          className="rounded-md border border-wine/40 bg-wine/10 px-4 py-3 text-sm text-wine"
        >
          A couple of fields need another look.
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="enquiry-name" className="field-label">
            Name
          </label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
            className="field"
          />
          {errors.name ? (
            <p id="enquiry-name-error" className="mt-2 text-xs text-wine">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="enquiry-email" className="field-label">
            Email
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            className="field"
          />
          {errors.email ? (
            <p id="enquiry-email-error" className="mt-2 text-xs text-wine">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="enquiry-subject" className="field-label">
          What is it about?
        </label>
        <select
          id="enquiry-subject"
          name="subject"
          defaultValue={SUBJECTS[0]}
          className="field"
        >
          {SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="enquiry-message" className="field-label">
          Message
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={5}
          required
          maxLength={1200}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "enquiry-message-error" : undefined}
          placeholder="Dates, numbers, and anything that would help us give you a straight answer."
          className="field resize-y"
        />
        {errors.message ? (
          <p id="enquiry-message-error" className="mt-2 text-xs text-wine">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={pending}
        className={buttonClass(
          "primary",
          "inline-flex items-center gap-3 self-start disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100"
        )}
      >
        {pending ? (
          <span
            aria-hidden="true"
            className="block h-3.5 w-3.5 animate-spin rounded-full border border-cream/40 border-t-cream"
          />
        ) : null}
        {pending ? "Sending" : "Send enquiry"}
      </button>
    </form>
  );
}
