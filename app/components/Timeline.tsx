"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { ALLOW_MOTION, DUR, EASE, RISE, WIDE } from "./motion";

type Entry = {
  year: string;
  title: string;
  body: string;
};

const ENTRIES: Entry[] = [
  {
    year: "2016",
    title: "A twenty-four seat kitchen",
    body: "Masala Diaries opens in a rented room off Kalawad Road with four tables, one cook and a menu written on a blackboard every morning. It runs out of dal by nine most nights.",
  },
  {
    year: "2019",
    title: "The plot on the Ring Road",
    body: "A corner of scrub land near the 150 Ft Ring Road, chosen because you can see it from both directions. The family argues about it for a year before signing.",
  },
  {
    year: "2021",
    title: "Thirty-five feet of scaffolding",
    body: "The room goes up as a drum. Every square metre of plaster is worked by hand by six people from Bhuj, who leave their thumbprints in the arches on purpose.",
  },
  {
    year: "2023",
    title: "Cuore opens",
    body: "Twelve hundred woven lanterns, hung one at a time over nine days. The first table sits down on a Thursday and does not get up until the lights go on.",
  },
  {
    year: "Today",
    title: "A hundred and eighty covers",
    body: "Plus a banquet wing that takes four hundred, a tandoor that is lit at ten every morning, and a dal that still starts the night before.",
  },
];

export default function Timeline() {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(`${ALLOW_MOTION} and ${WIDE}`, () => {
        q(".timeline-entry").forEach((entry, i) => {
          // Alternating sides swing into the plane of the page, so each
          // milestone reads as a card being turned to face the reader.
          gsap.from(entry, {
            rotateY: i % 2 === 0 ? -12 : 12,
            x: i % 2 === 0 ? -40 : 40,
            opacity: 0,
            duration: 1,
            ease: EASE.enter,
            transformOrigin: i % 2 === 0 ? "left center" : "right center",
            scrollTrigger: { trigger: entry, start: "top 82%", once: true },
          });
        });

        gsap.from(q(".timeline-rule"), {
          scaleY: 0,
          transformOrigin: "top center",
          ease: EASE.linear,
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        });
      });

      mm.add(`${ALLOW_MOTION} and (max-width: 767px)`, () => {
        q(".timeline-entry").forEach((entry) => {
          gsap.from(entry, {
            opacity: 0,
            y: RISE,
            duration: DUR.enter,
            ease: EASE.enter,
            scrollTrigger: { trigger: entry, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <ol
      ref={root}
      className="scene relative mx-auto max-w-4xl px-6 pb-28 sm:px-12 sm:pb-36"
    >
      <span
        aria-hidden="true"
        className="timeline-rule absolute bottom-32 left-6 top-2 w-px bg-ink/20 sm:left-1/2 sm:-translate-x-px"
      />

      {ENTRIES.map((entry, i) => (
        <li
          key={entry.year}
          className={`timeline-entry relative mb-16 pl-12 will-change-transform sm:mb-24 sm:w-1/2 sm:pl-0 ${
            i % 2 === 0
              ? "sm:pr-14 sm:text-right"
              : "sm:ml-auto sm:pl-14 sm:text-left"
          }`}
        >
          <span
            aria-hidden="true"
            className={`absolute left-6 top-3 h-2 w-2 -translate-x-1/2 rounded-full bg-terracotta ${
              i % 2 === 0
                ? "sm:left-auto sm:right-0 sm:translate-x-1/2"
                : "sm:left-0 sm:-translate-x-1/2"
            }`}
          />

          <p className="font-display text-3xl font-semibold leading-none tracking-tight text-terracotta sm:text-4xl">
            {entry.year}
          </p>
          <h3 className="mt-3 font-display text-xl font-medium tracking-tight sm:text-2xl">
            {entry.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {entry.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
