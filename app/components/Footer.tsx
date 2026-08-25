"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "./gsap";
import { ALLOW_MOTION, DUR, EASE, REVEAL_START, STAGGER } from "./motion";
import { buttonClass } from "./button";
import CuoreWord from "./CuoreWord";
import { SITE } from "@/app/lib/site";

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(ALLOW_MOTION, () => {
        // Endless marquee — one transform, cheap forever
        gsap.to(q(".marquee-track"), {
          xPercent: -50,
          duration: 26,
          ease: EASE.linear,
          repeat: -1,
        });

        // The sign flickers on as the footer scrolls into view
        gsap.from(q(".finale-word .letter"), {
          yPercent: 140,
          duration: DUR.statement,
          stagger: STAGGER.normal,
          ease: EASE.land,
          scrollTrigger: {
            trigger: q(".finale-word")[0],
            start: REVEAL_START,
            once: true,
          },
        });

        // Heartbeat on the neon "o"
        gsap.to(q(".finale-word .letter-o"), {
          keyframes: [
            { scale: 1.16, duration: 0.14, ease: "power2.out" },
            { scale: 1, duration: 0.12, ease: "power2.in" },
            { scale: 1.1, duration: 0.12, ease: "power2.out" },
            { scale: 1, duration: 0.16, ease: EASE.state },
          ],
          transformOrigin: "50% 50%",
          repeat: -1,
          repeatDelay: 3.5,
          delay: 2,
        });

        // Each letter wiggles when hovered or tapped — the sign is alive
        const letters = q(".finale-word .letter");
        const handlers = letters.map((letter) => {
          const fn = () => {
            gsap.to(letter, {
              rotate: `+=${gsap.utils.random(-14, 14)}`,
              yPercent: gsap.utils.random(-12, 12),
              duration: 0.25,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(letter, {
                  rotate: 0,
                  yPercent: 0,
                  duration: DUR.statement,
                  ease: EASE.recover,
                });
              },
            });
          };
          letter.addEventListener("mouseenter", fn);
          letter.addEventListener("pointerdown", fn);
          return fn;
        });

        return () => {
          letters.forEach((letter, i) => {
            letter.removeEventListener("mouseenter", handlers[i]);
            letter.removeEventListener("pointerdown", handlers[i]);
          });
        };
      });
    },
    { scope: root }
  );

  return (
    <footer
      ref={root}
      className="no-print on-dark relative z-10 overflow-hidden bg-ink text-cream"
    >
      <div className="tribal-strip opacity-40" />

      <div className="overflow-hidden border-b border-cream/10 py-5">
        <div
          className="marquee-track flex w-max whitespace-nowrap font-display text-lg text-cream/60 will-change-transform"
          aria-hidden="true"
        >
          <span>{SITE.marquee.repeat(6)}</span>
          <span>{SITE.marquee.repeat(6)}</span>
        </div>
      </div>

      <div className="flex flex-col items-center px-6 py-24 text-center sm:py-32">
        <p className="mb-10 text-[0.7rem] uppercase tracking-[0.4em] text-glow">
          find the heart
        </p>

        <div className="finale-word cursor-default">
          <CuoreWord neon className="text-[clamp(4.5rem,18vw,14rem)]" />
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.45em] text-cream/70 sm:text-sm">
          {SITE.parent}
        </p>

        <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-10 text-sm sm:grid-cols-3">
          <div>
            <p className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-cream/50">
              Where
            </p>
            <a
              href={SITE.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-wipe leading-relaxed text-cream/90"
            >
              {SITE.address.street},
              <br />
              {SITE.address.locality}, {SITE.address.region}
            </a>
          </div>
          <div>
            <p className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-cream/50">
              When
            </p>
            <p className="leading-relaxed text-cream/90">
              {SITE.hours.label}
              <br />
              {SITE.hours.display}
            </p>
          </div>
          <div>
            <p className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-cream/50">
              Reserve
            </p>
            <a
              href={SITE.phone.href}
              className="link-wipe leading-relaxed text-cream/90"
            >
              {SITE.phone.display}
            </a>
          </div>
        </div>

        <Link href="/reservations" className={buttonClass("primary", "mt-16")}>
          Reserve a table
        </Link>

        <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.25em] text-cream/60">
          <li>
            <Link href="/menu" className="link-wipe">
              Menu
            </Link>
          </li>
          <li>
            <Link href="/about" className="link-wipe">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="link-wipe">
              Contact
            </Link>
          </li>
          <li>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-wipe"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t border-cream/10 px-6 py-6 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} {SITE.name} {SITE.parent} ·{" "}
        {SITE.address.locality.toLowerCase()}
      </div>
    </footer>
  );
}
