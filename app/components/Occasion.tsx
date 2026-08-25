"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "./gsap";
import { buttonClass } from "./button";
import { SITE } from "@/app/lib/site";
import banquet from "@/public/images/banquet.jpg";

export default function Occasion() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The hall opens like doors as the section arrives
        gsap.fromTo(
          q(".occasion-img-wrap"),
          { clipPath: "inset(8% 12% 8% 12% round 24px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 85%",
              end: "top 15%",
              scrub: 0.5,
            },
          }
        );

        gsap.fromTo(
          q(".occasion-img"),
          { yPercent: -10, scale: 1.15 },
          {
            yPercent: 8,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.from(q(".occasion-line .line-inner"), {
          yPercent: 120,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: q(".occasion-copy")[0],
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="on-dark relative z-10 bg-ink text-cream">
      <div className="occasion-img-wrap relative h-[85vh] overflow-hidden will-change-[clip-path] sm:h-screen">
        <div className="occasion-img absolute -inset-y-[10%] inset-x-0 will-change-transform">
          <Image
            src={banquet}
            alt="The Cuore banquet hall dressed in red and black for a large event"
            fill
            sizes="100vw"
            quality={72}
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-ink/40" />

        <div className="occasion-copy absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-12 sm:pb-20">
          <p className="mb-6 text-[0.7rem] uppercase tracking-[0.4em] text-glow">
            05 · l&apos;occasione — the occasion
          </p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.4rem)] font-medium leading-[1.05] tracking-tight">
            <span className="occasion-line block overflow-hidden pb-1">
              <span className="line-inner block">One hall.</span>
            </span>
            <span className="occasion-line block overflow-hidden pb-1">
              <span className="line-inner block">A thousand-watt evening.</span>
            </span>
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-cream/80 sm:text-base">
            Weddings, corporate nights, live performances — the banquet wing
            turns up when you do, then dims back to dinner by eleven.
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 text-sm">
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-cream/50">
                Banquet
              </dt>
              <dd className="mt-1 font-display text-xl">
                up to {SITE.banquetCapacity} guests
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-cream/50">
                Dining room
              </dt>
              <dd className="mt-1 font-display text-xl">
                {SITE.diningCovers} covers
              </dd>
            </div>
          </dl>
          <Link href="/contact" className={buttonClass("onDark", "mt-8 px-7 py-3")}>
            Plan an occasion
          </Link>
        </div>
      </div>
    </section>
  );
}
