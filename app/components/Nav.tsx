"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, INTRO_DONE_EVENT } from "./gsap";

export default function Nav() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const nav = root.current;
      if (!nav) return;

      gsap.set(nav, { y: -24, autoAlpha: 0 });

      const reveal = () => {
        gsap.to(nav, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" });
      };
      window.addEventListener(INTRO_DONE_EVENT, reveal, { once: true });

      // Hide when scrolling down, return when scrolling up
      const showAnim = gsap
        .from(nav, { yPercent: -130, paused: true, duration: 0.35, ease: "power2.out" })
        .progress(1);

      ScrollTrigger.create({
        start: "top top-=1",
        end: "max",
        onUpdate: (self) => {
          if (self.direction === -1) showAnim.play();
          else showAnim.reverse();
          nav.classList.toggle("nav-scrolled", self.scroll() > window.innerHeight * 0.8);
        },
      });

      return () => window.removeEventListener(INTRO_DONE_EVENT, reveal);
    },
    { scope: root }
  );

  return (
    <nav
      ref={root}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300 sm:px-12 [&.nav-scrolled]:bg-parchment/85 [&.nav-scrolled]:text-ink [&.nav-scrolled]:backdrop-blur-md text-cream"
    >
      <a href="#top" className="font-display text-2xl font-semibold tracking-tight">
        cuore
      </a>
      <div className="flex items-center gap-6 text-sm">
        <a
          href="https://share.google/XkVfOSEDBZnbFkhmu"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden uppercase tracking-[0.2em] underline-offset-4 hover:underline sm:block"
        >
          Directions
        </a>
        <a
          href="tel:+919099031031"
          className="rounded-full bg-terracotta px-5 py-2.5 font-medium text-cream transition-transform hover:scale-[1.04] active:scale-95"
        >
          Reserve a table
        </a>
      </div>
    </nav>
  );
}
