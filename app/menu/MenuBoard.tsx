"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/app/components/gsap";
import {
  ALLOW_MOTION,
  DUR,
  EASE,
  REVEAL_START,
  RISE,
  STAGGER,
  WIDE,
} from "@/app/components/motion";
import { MENU, type MenuItem } from "@/app/lib/menu";

/** Roughly the height of the fixed nav, so anchored sections are not hidden. */
const SCROLL_OFFSET = 88;

function SpiceMarker({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span
      className="inline-flex items-center gap-[3px] align-middle"
      title={`Spice ${level} of 3`}
    >
      <span className="sr-only">Spice {level} of 3</span>
      {[1, 2, 3].map((step) => (
        <span
          key={step}
          aria-hidden="true"
          className={`block h-[5px] w-[5px] rounded-full ${
            step <= level ? "bg-rust" : "bg-ink/20"
          }`}
        />
      ))}
    </span>
  );
}

function Markers({ item }: { item: MenuItem }) {
  const pills: string[] = [];
  if (item.vegan) pills.push("Vegan");
  if (item.nuts) pills.push("Contains nuts");

  if (pills.length === 0 && item.spice === undefined) return null;

  return (
    <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
      {pills.map((pill) => (
        <li
          key={pill}
          className="rounded-full border border-ink/20 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-ink-soft"
        >
          {pill}
        </li>
      ))}
      {item.spice !== undefined ? (
        <li>
          <SpiceMarker level={item.spice} />
        </li>
      ) : null}
    </ul>
  );
}

export default function MenuBoard() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(MENU[0].id);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // The rail follows the reader regardless of motion preference — it is
      // navigation state, not decoration.
      MENU.forEach((section) => {
        ScrollTrigger.create({
          trigger: `#${section.id}`,
          start: "top 40%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) setActive(section.id);
          },
        });
      });

      mm.add(`${ALLOW_MOTION} and ${WIDE}`, () => {
        // Category headers hinge open on their left edge, like the cover of a
        // printed menu being turned.
        q(".menu-heading").forEach((heading) => {
          gsap.from(heading, {
            rotateY: -70,
            opacity: 0,
            duration: DUR.statement,
            ease: EASE.enter,
            transformOrigin: "left center",
            scrollTrigger: { trigger: heading, start: REVEAL_START, once: true },
          });
        });
      });

      mm.add(`${ALLOW_MOTION} and (max-width: 767px)`, () => {
        q(".menu-heading").forEach((heading) => {
          gsap.from(heading, {
            opacity: 0,
            y: RISE,
            duration: DUR.enter,
            ease: EASE.enter,
            scrollTrigger: { trigger: heading, start: REVEAL_START, once: true },
          });
        });
      });

      mm.add(ALLOW_MOTION, () => {
        q(".menu-section").forEach((section) => {
          gsap.from(section.querySelectorAll(".menu-item"), {
            opacity: 0,
            y: RISE,
            duration: DUR.enter,
            stagger: STAGGER.tight,
            ease: EASE.enter,
            scrollTrigger: { trigger: section, start: REVEAL_START, once: true },
          });
        });
      });
    },
    { scope: root }
  );

  const jumpTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <div
      ref={root}
      className="print-plain grid grid-cols-1 gap-16 px-6 pb-32 sm:px-12 lg:grid-cols-[14rem_1fr] lg:gap-20"
    >
      <nav
        aria-label="Menu sections"
        className="no-print h-max lg:sticky lg:top-28"
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-3 border-t border-ink/15 pt-6 lg:flex-col lg:gap-y-4">
          {MENU.map((section) => {
            const current = active === section.id;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(section.id)}
                  aria-current={current ? "true" : undefined}
                  className={`text-left text-[0.7rem] uppercase tracking-[0.25em] transition-colors duration-200 ${
                    current
                      ? "text-terracotta"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mr-3 inline-block h-px w-4 align-middle transition-all duration-300 ${
                      current ? "w-8 bg-terracotta" : "bg-ink/30"
                    }`}
                  />
                  {section.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="max-w-3xl">
        {MENU.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="menu-section scroll-mt-28 pb-20 sm:pb-28"
          >
            <div className="scene">
              <div className="menu-heading will-change-transform">
                <div className="flex items-baseline justify-between gap-6 border-b border-ink/25 pb-4">
                  <h2
                    id={`${section.id}-heading`}
                    className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium leading-none tracking-tight"
                  >
                    {section.name}
                  </h2>
                  <span className="shrink-0 font-display text-sm italic text-rust">
                    {section.italian}
                  </span>
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
                  {section.note}
                </p>
              </div>
            </div>

            <ul className="mt-10">
              {section.items.map((item) => (
                <li
                  key={item.name}
                  className="menu-item group relative border-b border-ink/10 py-7"
                >
                  <div className="transition-transform duration-300 ease-out group-hover:translate-x-2">
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="font-display text-xl font-medium leading-tight tracking-tight transition-colors duration-300 group-hover:text-terracotta sm:text-2xl">
                        {item.name}
                        {item.signature ? (
                          <span className="ml-3 align-middle text-[0.6rem] uppercase tracking-[0.25em] text-rust">
                            signature
                          </span>
                        ) : null}
                      </h3>
                      <span className="shrink-0 font-display text-lg text-ink-soft transition-all duration-300 group-hover:-translate-x-1 group-hover:text-ink">
                        ₹{item.price}
                      </span>
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                    <Markers item={item} />
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
