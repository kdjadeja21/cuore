import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import FadeUp from "../components/FadeUp";
import ReservationForm from "./ReservationForm";
import { SITE } from "../lib/site";
import { BOOKING_WINDOW_DAYS } from "../lib/reservation";

export const metadata: Metadata = {
  title: "Reservations",
  description: `Book a table at Cuore by Masala Diaries, Rajkot. Open daily ${SITE.hours.display}. Parties over ${SITE.maxTableParty} are looked after by the banquet team.`,
  openGraph: {
    title: "Reservations — Cuore by Masala Diaries",
    description: `Book a table in the 35-foot dining room. Open daily, ${SITE.hours.display}.`,
    images: ["/images/dining-view.jpg"],
  },
};

export default function ReservationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="la prenotazione — the booking"
        lines={["Tell us when,", "and how many."]}
        lede="Tables are held for fifteen minutes past the booking time, which is longer than it sounds when the room is full. If you are running late, call — we would rather know."
      />

      <div className="grid grid-cols-1 gap-16 px-6 pb-32 sm:px-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <ReservationForm />

        <FadeUp className="flex flex-col gap-10 text-sm lg:pt-4">
          <div className="border-t border-ink/20 pt-5">
            <p className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-rust">
              Hours
            </p>
            <p className="leading-relaxed text-ink-soft">
              {SITE.hours.label}, {SITE.hours.display}. Last seating at 10:30 pm.
              Lunch is quieter and the light is better.
            </p>
          </div>

          <div className="border-t border-ink/20 pt-5">
            <p className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-rust">
              Large parties
            </p>
            <p className="leading-relaxed text-ink-soft">
              The form takes tables up to {SITE.maxTableParty}. Anything bigger —
              a wedding lunch, a company dinner, all of both families — goes
              through the banquet team, who will hold a{" "}
              {SITE.banquetCapacity}-guest hall if that is what you need.{" "}
              <Link href="/contact" className="link-wipe text-rust">
                Send them an enquiry
              </Link>
              .
            </p>
          </div>

          <div className="border-t border-ink/20 pt-5">
            <p className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-rust">
              Rather just call?
            </p>
            <p className="leading-relaxed text-ink-soft">
              Entirely reasonable.{" "}
              <a href={SITE.phone.href} className="link-wipe text-rust">
                {SITE.phone.display}
              </a>
              , any time we are open.
            </p>
          </div>

          <div className="border-t border-ink/20 pt-5">
            <p className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-rust">
              Good to know
            </p>
            <ul className="flex flex-col gap-2 leading-relaxed text-ink-soft">
              <li>The kitchen is entirely vegetarian.</li>
              <li>No alcohol — Gujarat. The kokum cooler is the answer.</li>
              <li>Step-free from the car park to every table.</li>
              <li>
                Online bookings run {BOOKING_WINDOW_DAYS} days ahead; call for
                anything further out.
              </li>
            </ul>
          </div>
        </FadeUp>
      </div>
    </>
  );
}
