"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "./gsap";
import { ALLOW_MOTION, EASE, REDUCE_MOTION, WIDE } from "./motion";
import diningView from "@/public/images/dining-view.jpg";

const PERSPECTIVE = 1200;
const BACK_Z = -300;
const BACK_SCALE = (PERSPECTIVE - BACK_Z) / PERSPECTIVE + 0.05;

export default function Room() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // Pinning a full-height section is the wrong trade on a phone: it eats
      // the whole screen and fights the browser chrome. Narrow viewports get
      // the same content as a plain scrolling section instead.
      mm.add(`${ALLOW_MOTION} and ${WIDE}`, () => {
        const counter = { value: 0 };
        const counterEl = q(".room-count")[0];

        gsap.set(q(".room-plane-back"), { z: BACK_Z, scale: BACK_SCALE });
        gsap.set(q(".room-plane-glow"), { z: -120 });

        // The captions ship stacked and visible so they survive without
        // JavaScript. Only once we know we can cross-fade them do they get
        // stacked on top of each other.
        gsap.set(q(".room-caption"), { position: "absolute", top: 0, left: 0, right: 0 });
        gsap.set(q(".room-caption-b, .room-caption-c"), { autoAlpha: 0 });

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

        // The camera tilts up from the tables to the lantern canopy while the
        // three planes separate: the room comes forward, the light drifts
        // across it, and the copy rides just in front of both.
        tl.fromTo(
          q(".room-plane-back"),
          { yPercent: -22 },
          { yPercent: 6, z: -110, ease: EASE.linear, duration: 10 },
          0
        )
          .fromTo(
            q(".room-plane-glow"),
            { yPercent: 14, opacity: 0.85 },
            { yPercent: -16, z: 40, opacity: 0.3, ease: EASE.linear, duration: 10 },
            0
          )
          .fromTo(
            q(".room-plane-front"),
            { z: 0 },
            { z: 90, ease: EASE.linear, duration: 10 },
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
            { autoAlpha: 0, duration: 1.2, ease: EASE.linear },
            3.2
          )
          .fromTo(
            q(".room-caption-b"),
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1.2, ease: EASE.linear },
            4.4
          )
          .to(q(".room-caption-b"), { autoAlpha: 0, duration: 1.2, ease: EASE.linear }, 6.6)
          .fromTo(
            q(".room-caption-c"),
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1.2, ease: EASE.linear },
            7.8
          );
      });

      // Narrow, or motion turned down: no pin and no depth. The counter still
      // has to read 35 rather than the 0 it ships with, since nothing is going
      // to count it up.
      mm.add(`${REDUCE_MOTION}, (max-width: 767px)`, () => {
        const counterEl = q(".room-count")[0];
        if (counterEl) counterEl.textContent = "35";
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      aria-labelledby="room-heading"
      className="on-dark relative z-10 overflow-hidden bg-ink text-cream md:h-screen"
      style={{ perspective: `${PERSPECTIVE}px` }}
    >
      <div className="room-plane-back absolute inset-x-0 top-0 h-[150vh] will-change-transform">
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

      <div
        className="room-plane-glow absolute inset-0 will-change-transform"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 30%, rgba(255,201,126,0.4) 0%, rgba(230,126,34,0.14) 48%, transparent 74%)",
        }}
      />

      <div className="room-plane-front relative z-10 flex min-h-[85svh] flex-col justify-between px-6 py-24 will-change-transform sm:px-12 md:h-full md:py-20">
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

          <h2
            id="room-heading"
            className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.8rem)] leading-tight"
          >
            <span className="room-line block overflow-hidden pb-1">
              <span className="line-inner block">of sculpted air,</span>
            </span>
            <span className="room-line block overflow-hidden pb-1">
              <span className="line-inner block">floor to canopy.</span>
            </span>
          </h2>

          <div className="relative mt-8 flex min-h-[4rem] max-w-md flex-col gap-2 text-sm text-cream/75 sm:text-base">
            <p className="room-caption room-caption-a">
              Down here: stone tables, terracotta plates, golden light.
            </p>
            <p className="room-caption room-caption-b">
              Halfway up: plaster worked by hand, arch after arch after arch.
            </p>
            <p className="room-caption room-caption-c">
              Up there: a sky of woven lanterns, each one hung by hand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
