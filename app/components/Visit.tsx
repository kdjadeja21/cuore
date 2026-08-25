"use client";

import Link from "next/link";
import MaskedLines from "./MaskedLines";
import FadeUp from "./FadeUp";
import { buttonClass } from "./button";
import { SITE } from "@/app/lib/site";

export default function Visit() {
  return (
    <section
      aria-labelledby="visit-heading"
      className="relative z-10 bg-sand px-6 py-28 text-ink sm:px-12 sm:py-36"
    >
      <div className="tribal-strip mb-16 opacity-25 sm:mb-20" />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
        <div>
          <h2
            id="visit-heading"
            className="font-display text-[clamp(2.2rem,5.5vw,4.4rem)] font-medium leading-[1.03] tracking-tight"
          >
            <MaskedLines
              lines={[
                "The table is already",
                <span key="line-2" className="text-terracotta">
                  set. Come and sit.
                </span>,
              ]}
            />
          </h2>

          <FadeUp className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/reservations" className={buttonClass("primary")}>
              Reserve a table
            </Link>
            <a href={SITE.phone.href} className={buttonClass("secondary")}>
              {SITE.phone.display}
            </a>
          </FadeUp>
        </div>

        <FadeUp className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2 lg:grid-cols-1">
          <div className="border-t border-ink/20 pt-5">
            <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft">
              Where
            </p>
            <a
              href={SITE.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-wipe leading-relaxed"
            >
              {SITE.address.street}, {SITE.address.locality},{" "}
              {SITE.address.region}
            </a>
          </div>

          <div className="border-t border-ink/20 pt-5">
            <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft">
              When
            </p>
            <p className="leading-relaxed">
              {SITE.hours.label}, {SITE.hours.display}
            </p>
          </div>

          <div className="border-t border-ink/20 pt-5">
            <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft">
              Larger tables
            </p>
            <p className="leading-relaxed">
              Parties over {SITE.maxTableParty} go through the banquet team.{" "}
              <Link href="/contact" className="link-wipe text-rust">
                Send an enquiry
              </Link>
              .
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
