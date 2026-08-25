"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/app/components/gsap";
import { ALLOW_MOTION, CAN_HOVER, DUR, EASE } from "@/app/components/motion";
import { buttonClass } from "@/app/components/button";
import {
  INITIAL_RESERVATION_STATE,
  requestReservation,
} from "@/app/lib/actions";
import {
  OCCASIONS,
  bookingWindow,
  formatDate,
  formatTime,
  timeSlots,
  type FieldErrors,
  type FieldName,
  type ReservationValues,
} from "@/app/lib/reservation";
import { SITE } from "@/app/lib/site";

/** Maximum tilt of the card in either axis, in degrees. */
const MAX_TILT = 6;

const SLOTS = timeSlots();
const PARTY_SIZES = Array.from({ length: SITE.maxTableParty }, (_, i) => i + 1);

function fieldProps(
  name: FieldName,
  errors: FieldErrors
): { id: string; name: string; "aria-invalid"?: "true"; "aria-describedby"?: string } {
  const invalid = errors[name] !== undefined;
  return {
    id: name,
    name,
    ...(invalid
      ? { "aria-invalid": "true" as const, "aria-describedby": `${name}-error` }
      : {}),
  };
}

function FieldError({
  name,
  errors,
}: {
  name: FieldName;
  errors: FieldErrors;
}) {
  const message = errors[name];
  if (message === undefined) return null;

  return (
    <p id={`${name}-error`} className="mt-2 text-xs leading-relaxed text-wine">
      {message}
    </p>
  );
}

export default function ReservationForm() {
  const root = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [state, action, pending] = useActionState(
    requestReservation,
    INITIAL_RESERVATION_STATE
  );

  // Set the bookable range after mount rather than during render: this page is
  // prerendered, so a build-time "today" would go stale the next day.
  useEffect(() => {
    const input = dateRef.current;
    if (!input) return;

    const { min, max } = bookingWindow();
    input.min = min;
    input.max = max;
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // Only where there is a real pointer to track. On touch the card would
      // never come back to rest, and tilting under a thumb is nobody's idea of
      // a good time.
      mm.add(`${ALLOW_MOTION} and ${CAN_HOVER} and (pointer: fine)`, () => {
        const card = root.current?.querySelector<HTMLElement>(".reserve-card");
        const glow = q(".reserve-glow")[0];
        if (!card) return;

        const settings = { duration: 0.5, ease: "power3" };
        const tiltX = gsap.quickTo(card, "rotationX", settings);
        const tiltY = gsap.quickTo(card, "rotationY", settings);
        const glowX = gsap.quickTo(glow, "x", settings);
        const glowY = gsap.quickTo(glow, "y", settings);

        const rest = () => {
          tiltX(0);
          tiltY(0);
          glowX(0);
          glowY(0);
        };

        const onMove = (event: PointerEvent) => {
          // Typing on a moving surface is unpleasant, so the card holds still
          // for as long as anything inside it has focus.
          if (card.contains(document.activeElement)) {
            rest();
            return;
          }

          const box = card.getBoundingClientRect();
          const fromCentreX = (event.clientX - box.left) / box.width - 0.5;
          const fromCentreY = (event.clientY - box.top) / box.height - 0.5;

          tiltY(fromCentreX * MAX_TILT * 2);
          tiltX(-fromCentreY * MAX_TILT * 2);
          glowX(-fromCentreX * 26);
          glowY(-fromCentreY * 26);
        };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", rest);
        card.addEventListener("focusin", rest);

        return () => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", rest);
          card.removeEventListener("focusin", rest);
        };
      });

      mm.add(ALLOW_MOTION, () => {
        gsap.from(q(".reserve-card"), {
          opacity: 0,
          y: 28,
          duration: DUR.statement,
          ease: EASE.enter,
        });
      });
    },
    { scope: root, dependencies: [state.status] }
  );

  const errors: FieldErrors = state.status === "invalid" ? state.errors : {};
  const previous: Partial<ReservationValues> =
    state.status === "invalid" ? state.values : {};

  return (
    <div ref={root} className="scene-close">
      <div className="relative">
        <div
          aria-hidden="true"
          className="reserve-glow absolute inset-6 -z-10 rounded-2xl bg-ink/20 blur-2xl"
        />

        <div className="reserve-card rounded-2xl border border-ink/15 bg-cream/70 p-8 will-change-transform sm:p-12">
          {state.status === "confirmed" ? (
            <div role="status">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-rust">
                Table held
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                We will see you then.
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft">
                A confirmation is on its way to {state.values.email}. Your
                reference is{" "}
                <span className="font-display text-base text-ink">
                  {state.reference}
                </span>
                .
              </p>

              <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-ink/15 pt-8 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft">
                    When
                  </dt>
                  <dd className="mt-2 font-display text-lg">
                    {formatDate(state.values.date)}
                    <br />
                    {formatTime(state.values.time)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft">
                    Who
                  </dt>
                  <dd className="mt-2 font-display text-lg">
                    {state.values.name}
                    <br />
                    {state.values.party}{" "}
                    {state.values.party === "1" ? "guest" : "guests"}
                  </dd>
                </div>
              </dl>

              <p className="mt-10 text-sm leading-relaxed text-ink-soft">
                Plans changed? Call us on{" "}
                <a href={SITE.phone.href} className="link-wipe text-rust">
                  {SITE.phone.display}
                </a>{" "}
                and we will move it.
              </p>
            </div>
          ) : (
            <form action={action} noValidate className="flex flex-col gap-7">
              {state.status === "invalid" ? (
                <p
                  role="alert"
                  className="rounded-md border border-wine/40 bg-wine/10 px-4 py-3 text-sm text-wine"
                >
                  Almost — a few things need another look below.
                </p>
              ) : null}

              <div className="grid grid-cols-1 gap-7 sm:grid-cols-3">
                <div>
                  <label htmlFor="date" className="field-label">
                    Date
                  </label>
                  <input
                    {...fieldProps("date", errors)}
                    ref={dateRef}
                    type="date"
                    required
                    defaultValue={previous.date}
                    className="field"
                  />
                  <FieldError name="date" errors={errors} />
                </div>

                <div>
                  <label htmlFor="time" className="field-label">
                    Time
                  </label>
                  <select
                    {...fieldProps("time", errors)}
                    required
                    defaultValue={previous.time ?? "20:00"}
                    className="field"
                  >
                    {SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {formatTime(slot)}
                      </option>
                    ))}
                  </select>
                  <FieldError name="time" errors={errors} />
                </div>

                <div>
                  <label htmlFor="party" className="field-label">
                    Guests
                  </label>
                  <select
                    {...fieldProps("party", errors)}
                    required
                    defaultValue={previous.party ?? "2"}
                    className="field"
                  >
                    {PARTY_SIZES.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <FieldError name="party" errors={errors} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="field-label">
                    Name
                  </label>
                  <input
                    {...fieldProps("name", errors)}
                    type="text"
                    required
                    autoComplete="name"
                    defaultValue={previous.name}
                    className="field"
                  />
                  <FieldError name="name" errors={errors} />
                </div>

                <div>
                  <label htmlFor="phone" className="field-label">
                    Phone
                  </label>
                  <input
                    {...fieldProps("phone", errors)}
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="90990 31031"
                    defaultValue={previous.phone}
                    className="field"
                  />
                  <FieldError name="phone" errors={errors} />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="field-label">
                  Email
                </label>
                <input
                  {...fieldProps("email", errors)}
                  type="email"
                  required
                  autoComplete="email"
                  defaultValue={previous.email}
                  className="field"
                />
                <FieldError name="email" errors={errors} />
              </div>

              <div>
                <label htmlFor="occasion" className="field-label">
                  Occasion <span className="lowercase tracking-normal">(optional)</span>
                </label>
                <select
                  {...fieldProps("occasion", errors)}
                  defaultValue={previous.occasion ?? ""}
                  className="field"
                >
                  <option value="">No occasion, just hungry</option>
                  {OCCASIONS.map((occasion) => (
                    <option key={occasion} value={occasion}>
                      {occasion}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="field-label">
                  Allergies, access needs, anything else
                </label>
                <textarea
                  {...fieldProps("notes", errors)}
                  rows={4}
                  maxLength={500}
                  placeholder="Wheelchair at the table, no nuts, a quiet corner — tell us and we will sort it."
                  defaultValue={previous.notes}
                  className="field resize-y"
                />
                <FieldError name="notes" errors={errors} />
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={pending}
                  className={buttonClass(
                    "primary",
                    "inline-flex items-center gap-3 disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100"
                  )}
                >
                  {pending ? (
                    <span
                      aria-hidden="true"
                      className="block h-3.5 w-3.5 animate-spin rounded-full border border-cream/40 border-t-cream"
                    />
                  ) : null}
                  {pending ? "Holding the table" : "Request the table"}
                </button>

                <p className="text-xs leading-relaxed text-ink-soft">
                  Parties over {SITE.maxTableParty}?{" "}
                  <Link href="/contact" className="link-wipe text-rust">
                    Talk to the banquet team
                  </Link>
                  .
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
