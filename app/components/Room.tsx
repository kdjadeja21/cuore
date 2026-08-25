"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "./gsap";
import diningView from "@/public/images/dining-view.jpg";

export default function Room() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { value: 0 };
        const counterEl = q(".room-count")[0];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        // The camera tilts up: from the tables to the lantern canopy.
        tl.fromTo(
          q(".room-img"),
          { yPercent: -30 },
          { yPercent: 0, ease: "none", duration: 10 },
          0
        )
          .to(
            counter,
            {
              value: 35,
              duration: 5,
              ease: "power1.inOut",
              onUpdate: () => {
                if (counterEl)
                  counterEl.textContent = String(Math.round(counter.value));
              },
            },
            0
          )
          .from(
            q(".room-line .line-inner"),
            { yPercent: 120, stagger: 0.4, duration: 1.6, ease: "power2.out" },
            0.4
          )
          .fromTo(
            q(".room-caption-a"),
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 1.5, ease: "none" },
            4
          )
          .fromTo(
            q(".room-caption-b"),
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1.5, ease: "none" },
            5.5
          );
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative z-10 h-screen overflow-hidden bg-ink text-cream"
    >
      {/* Oversized image that pans as you scroll */}
      <div className="room-img absolute inset-x-0 top-0 h-[150vh] will-change-transform">
        <Image
          src={diningView}
          alt="Looking across the Cuore dining room — arched windows, sculpted columns and a field of woven lanterns"
          fill
          sizes="100vw"
          quality={72}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/50" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-20 sm:px-12">
        <p className="text-[0.7rem] uppercase tracking-[0.4em] text-glow">
          02 · la sala — the room
        </p>

        <div>
          <div className="flex items-end gap-4">
            <span className="room-count font-display text-[clamp(5rem,16vw,12rem)] font-semibold leading-none tracking-tight">
              0
            </span>
            <span className="pb-3 font-display text-2xl text-cream/80 sm:pb-6 sm:text-4xl">
              feet
            </span>
          </div>

          <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.8rem)] leading-tight">
            <span className="room-line block overflow-hidden pb-1">
              <span className="line-inner block">of sculpted air,</span>
            </span>
            <span className="room-line block overflow-hidden pb-1">
              <span className="line-inner block">floor to canopy.</span>
            </span>
          </h2>

          <div className="relative mt-8 h-6 max-w-md text-sm text-cream/75 sm:text-base">
            <p className="room-caption-a absolute inset-0">
              Down here: stone tables, terracotta plates, golden light.
            </p>
            <p className="room-caption-b absolute inset-0" style={{ visibility: "hidden" }}>
              Up there: a sky of woven lanterns, each one hung by hand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
