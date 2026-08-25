"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "./gsap";
import facade from "@/public/images/facade.jpg";

export default function Heart() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        tl.from(q(".heart-line .line-inner"), {
          yPercent: 120,
          stagger: 0.25,
          duration: 1,
          ease: "power2.out",
        })
          .from(
            q(".heart-arch"),
            { yPercent: 60, duration: 2, ease: "power1.out" },
            0
          )
          .from(
            q(".heart-arch-img"),
            { yPercent: -25, scale: 1.25, duration: 2, ease: "power1.out" },
            0
          )
          .from(
            q(".heart-para"),
            { opacity: 0, y: 40, duration: 1, ease: "power2.out" },
            1
          );
      });

      // Reduced motion: content is simply visible; no pin, no scrub.
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative z-10 overflow-hidden bg-parchment text-ink"
    >
      <div className="grid min-h-screen grid-cols-1 items-center gap-10 px-6 py-24 sm:px-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="mb-8 text-[0.7rem] uppercase tracking-[0.4em] text-rust">
            01 · il cuore — the heart
          </p>
          <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.6rem)] font-medium leading-[1.02] tracking-tight">
            <span className="heart-line block overflow-hidden pb-1">
              <span className="line-inner block">Cuore is Italian</span>
            </span>
            <span className="heart-line block overflow-hidden pb-1">
              <span className="line-inner block">for heart.</span>
            </span>
            <span className="heart-line block overflow-hidden pb-1">
              <span className="line-inner block text-terracotta">
                This one beats in Rajkot.
              </span>
            </span>
          </h2>
          <p className="heart-para mt-10 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
            A sand-coloured drum of a building rising off the 150 Ft Ring Road —
            round windows punched into hand-textured plaster, built by Masala
            Diaries for long lunches and longer celebrations.
          </p>
        </div>

        <div className="heart-arch relative mx-auto w-full max-w-md overflow-hidden rounded-t-full will-change-transform">
          <div className="relative aspect-[3/4]">
            <Image
              src={facade}
              alt="The circular sand-coloured facade of Cuore with round windows and the cuore sign"
              fill
              sizes="(min-width: 768px) 28rem, 90vw"
              quality={72}
              className="heart-arch-img object-cover will-change-transform"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
