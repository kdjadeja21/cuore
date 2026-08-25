import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import StoryText from "../components/StoryText";
import MaskedLines from "../components/MaskedLines";
import FadeUp from "../components/FadeUp";
import Timeline from "../components/Timeline";
import ArcGallery from "../components/ArcGallery";
import { buttonClass } from "../components/button";
import { SITE } from "../lib/site";
import kitchen from "@/public/images/kitchen-tandoor.jpg";

export const metadata: Metadata = {
  title: "About us",
  description:
    "From a twenty-four seat kitchen off Kalawad Road to a 35-foot dining room on the 150 Ft Ring Road. The story of Cuore, by Masala Diaries.",
  openGraph: {
    title: "About us — Cuore by Masala Diaries",
    description:
      "Nine years, six plasterers from Bhuj, twelve hundred lanterns, and a dal that starts the night before.",
    images: ["/images/facade.jpg"],
  },
};

const SOURCING = [
  {
    label: "Paneer",
    body: "Set every morning in the kitchen from milk that arrives at five. Never bought in, never frozen.",
  },
  {
    label: "Vegetables",
    body: "From the Gondal market three times a week, and from two farms outside Jasdan that we have used since 2016.",
  },
  {
    label: "Spice",
    body: "Whole, roasted and ground in-house on Mondays and Thursdays. You can usually smell which one from the car park.",
  },
  {
    label: "Flour",
    body: "Stone-milled in Rajkot. The sourdough starter is four years old and has its own shelf.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="la storia — the story"
        lines={["Cuore means heart.", "It took nine years", "to build this one."]}
      />

      <section className="mx-auto max-w-3xl px-6 pb-28 sm:px-12 sm:pb-36">
        <StoryText className="font-display text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.45] tracking-tight">
          Masala Diaries began with four tables and a blackboard. It grew the way
          restaurants in this city actually grow — slowly, on the strength of
          people telling other people, until the room we had was plainly the
          wrong size for the number of people who wanted to sit in it. So we
          built a bigger one, on a corner of the Ring Road where you can see it
          coming from either direction, and we gave it the only name that made
          sense.
        </StoryText>
      </section>

      <Timeline />

      <ArcGallery />

      <section
        aria-labelledby="craft-heading"
        className="grid grid-cols-1 items-center gap-16 bg-parchment px-6 py-28 sm:px-12 sm:py-36 lg:grid-cols-2 lg:gap-24"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={kitchen}
            alt="A chef lifting skewers of charred paneer from a glowing tandoor oven, sparks catching the light"
            fill
            sizes="(min-width: 1024px) 45vw, 88vw"
            quality={72}
            className="object-cover"
          />
        </div>

        <div>
          <p className="mb-8 text-[0.7rem] uppercase tracking-[0.4em] text-rust">
            la cucina — the kitchen
          </p>
          <h2
            id="craft-heading"
            className="font-display text-[clamp(1.9rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-tight"
          >
            <MaskedLines
              lines={[
                "Twenty-two people,",
                <span key="line-2" className="text-terracotta">
                  one clay oven.
                </span>,
              ]}
            />
          </h2>

          <FadeUp className="mt-10 flex flex-col gap-7">
            <p className="max-w-lg text-base leading-relaxed text-ink-soft">
              The kitchen is run by Chef Hetal Vyas, who trained in Mumbai,
              cooked in Bologna for three years, and came home with strong
              opinions about both. Half the menu is what her grandmother made.
              The other half is what she learned to miss.
            </p>
            {SOURCING.map((entry) => (
              <div key={entry.label} className="border-t border-ink/15 pt-4">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-rust">
                  {entry.label}
                </p>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
                  {entry.body}
                </p>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      <section className="bg-sand px-6 py-24 text-center sm:px-12 sm:py-28">
        <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-tight tracking-tight">
          The shortest version: come in, sit down, order too much.
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/reservations" className={buttonClass("primary")}>
            Reserve a table
          </Link>
          <a href={SITE.phone.href} className={buttonClass("secondary")}>
            {SITE.phone.display}
          </a>
        </div>
      </section>
    </>
  );
}
