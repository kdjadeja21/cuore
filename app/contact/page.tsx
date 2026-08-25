import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import FadeUp from "../components/FadeUp";
import MaskedLines from "../components/MaskedLines";
import { buttonClass } from "../components/button";
import EnquiryForm from "./EnquiryForm";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact & visit",
  description: `Cuore by Masala Diaries — ${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.region}. Open daily ${SITE.hours.display}. Call ${SITE.phone.display}.`,
  openGraph: {
    title: "Contact & visit — Cuore by Masala Diaries",
    description: `${SITE.address.street}, ${SITE.address.locality}. Open daily, ${SITE.hours.display}.`,
    images: ["/images/facade.jpg"],
  },
};

const DAYS = [
  { label: "Monday – Thursday", value: "11:00 am – 11:00 pm" },
  { label: "Friday – Sunday", value: "11:00 am – 11:00 pm" },
  { label: "Kitchen last orders", value: "10:30 pm" },
  { label: "Banquet wing", value: "By arrangement" },
];

const PRACTICALITIES = [
  {
    label: "Parking",
    body: "Forty covered spaces under the building, free while you are eating, plus overflow on the service road. Valet on Friday and Saturday evenings.",
  },
  {
    label: "Accessibility",
    body: "Step-free from the car park to every table in the dining room and the banquet hall. Accessible WC on the ground floor. A lift reaches the mezzanine.",
  },
  {
    label: "Children",
    body: "High chairs, a shorter menu, and nobody minds the noise. The lanterns are, apparently, very good from a pushchair.",
  },
  {
    label: "Getting here",
    body: "Two minutes off the 150 Ft Ring Road. Look for the round sand-coloured building — you can see it from either direction.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="il contatto — find us"
        lines={["Round building.", "Ring Road.", "You cannot miss it."]}
        lede={`${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.region}. ${SITE.hours.label}, ${SITE.hours.display}.`}
      />

      <section className="grid grid-cols-1 gap-12 px-6 pb-24 sm:px-12 lg:grid-cols-3">
        <FadeUp className="flex flex-col gap-3 border-t border-ink/20 pt-6">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-rust">
            Address
          </p>
          <p className="text-base leading-relaxed">
            {SITE.address.street}
            <br />
            {SITE.address.locality}, {SITE.address.region}
          </p>
          <a
            href={SITE.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-wipe self-start text-sm text-rust"
          >
            Get directions
          </a>
        </FadeUp>

        <FadeUp className="flex flex-col gap-3 border-t border-ink/20 pt-6">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-rust">
            Talk to us
          </p>
          <a
            href={SITE.phone.href}
            className="link-wipe self-start text-base"
          >
            {SITE.phone.display}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="link-wipe self-start text-base"
          >
            {SITE.email}
          </a>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-wipe self-start text-sm text-rust"
          >
            Instagram
          </a>
        </FadeUp>

        <FadeUp className="flex flex-col gap-3 border-t border-ink/20 pt-6">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-rust">
            Hours
          </p>
          <dl className="flex flex-col gap-2 text-sm">
            {DAYS.map((day) => (
              <div key={day.label} className="flex justify-between gap-4">
                <dt className="text-ink-soft">{day.label}</dt>
                <dd className="shrink-0 text-right">{day.value}</dd>
              </div>
            ))}
          </dl>
        </FadeUp>
      </section>

      <section aria-label="Map" className="px-6 pb-24 sm:px-12">
        <div className="overflow-hidden rounded-lg border border-ink/15">
          <iframe
            title={`Map showing ${SITE.fullName} on the 150 Ft Ring Road, ${SITE.address.locality}`}
            src={SITE.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[380px] w-full sm:h-[460px]"
          />
        </div>
        <p className="mt-4 text-sm text-ink-soft">
          Map not loading?{" "}
          <a
            href={SITE.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-wipe text-rust"
          >
            Open directions in a new tab
          </a>
          .
        </p>
      </section>

      <section
        aria-labelledby="practical-heading"
        className="bg-sand px-6 py-24 sm:px-12 sm:py-28"
      >
        <h2
          id="practical-heading"
          className="mb-14 max-w-2xl font-display text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.05] tracking-tight"
        >
          <MaskedLines lines={["The practical", "answers."]} />
        </h2>

        <FadeUp
          className="grid grid-cols-1 gap-10 sm:grid-cols-2"
          stagger={0.1}
        >
          {PRACTICALITIES.map((entry) => (
            <div key={entry.label} className="border-t border-ink/20 pt-5">
              {/* Wine, not rust: this band is sand, where rust drops to 4.24:1 */}
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-wine">
                {entry.label}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                {entry.body}
              </p>
            </div>
          ))}
        </FadeUp>
      </section>

      <section
        aria-labelledby="enquiry-heading"
        className="grid grid-cols-1 gap-14 px-6 py-28 sm:px-12 sm:py-36 lg:grid-cols-[1fr_1.2fr] lg:gap-20"
      >
        <div>
          <p className="mb-8 text-[0.7rem] uppercase tracking-[0.4em] text-rust">
            l&apos;invito — send a note
          </p>
          <h2
            id="enquiry-heading"
            className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.05] tracking-tight"
          >
            <MaskedLines
              lines={[
                "Weddings, press,",
                <span key="line-2" className="text-terracotta">
                  and job applications.
                </span>,
              ]}
            />
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-ink-soft">
            For an ordinary table, the{" "}
            <Link href="/reservations" className="link-wipe text-rust">
              booking form
            </Link>{" "}
            is faster. This one is for everything else.
          </p>
          <Link
            href="/reservations"
            className={buttonClass("secondary", "mt-8 px-7 py-3 text-xs")}
          >
            Book a table instead
          </Link>
        </div>

        <EnquiryForm />
      </section>
    </>
  );
}
