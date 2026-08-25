"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import CuoreWord from "./CuoreWord";

const MARQUEE = "dal cuore · from the heart · ";

export default function Finale() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Endless marquee — one transform, cheap forever
        gsap.to(q(".marquee-track"), {
          xPercent: -50,
          duration: 26,
          ease: "none",
          repeat: -1,
        });

        // The sign flickers on as the finale scrolls into view
        gsap.from(q(".finale-word .letter"), {
          yPercent: 140,
          duration: 0.9,
          stagger: 0.08,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: q(".finale-word")[0],
            start: "top 80%",
            once: true,
          },
        });

        // Heartbeat on the neon "o"
        gsap.to(q(".finale-word .letter-o"), {
          keyframes: [
            { scale: 1.16, duration: 0.14, ease: "power2.out" },
            { scale: 1, duration: 0.12, ease: "power2.in" },
            { scale: 1.1, duration: 0.12, ease: "power2.out" },
            { scale: 1, duration: 0.16, ease: "power2.inOut" },
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
                  duration: 0.9,
                  ease: "elastic.out(1, 0.35)",
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
    <footer ref={root} className="relative z-10 overflow-hidden bg-ink text-cream">
      <div className="tribal-strip opacity-40" />

      {/* Marquee */}
      <div className="overflow-hidden border-b border-cream/10 py-5">
        <div className="marquee-track flex w-max whitespace-nowrap font-display text-lg text-cream/60 will-change-transform">
          <span>{MARQUEE.repeat(6)}</span>
          <span>{MARQUEE.repeat(6)}</span>
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
          by masala diaries
        </p>

        <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-10 text-sm sm:grid-cols-3">
          <div>
            <p className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-cream/50">
              Where
            </p>
            <a
              href="https://share.google/XkVfOSEDBZnbFkhmu"
              target="_blank"
              rel="noopener noreferrer"
              className="leading-relaxed text-cream/90 underline-offset-4 hover:underline"
            >
              Near 150 Ft Ring Road,
              <br />
              Rajkot, Gujarat
            </a>
          </div>
          <div>
            <p className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-cream/50">
              When
            </p>
            <p className="leading-relaxed text-cream/90">
              Open daily
              <br />
              11 am – 11 pm
            </p>
          </div>
          <div>
            <p className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-cream/50">
              Reserve
            </p>
            <a
              href="tel:+919099031031"
              className="leading-relaxed text-cream/90 underline-offset-4 hover:underline"
            >
              +91 90990 31031
            </a>
          </div>
        </div>

        <a
          href="tel:+919099031031"
          className="mt-16 rounded-full bg-terracotta px-10 py-4 text-sm font-medium uppercase tracking-[0.2em] text-cream transition-transform hover:scale-[1.04] active:scale-95"
        >
          Reserve a table
        </a>
      </div>

      <div className="border-t border-cream/10 px-6 py-6 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} cuore by masala diaries · rajkot
      </div>
    </footer>
  );
}
