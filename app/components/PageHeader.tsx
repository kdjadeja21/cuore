"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "./gsap";
import { ALLOW_MOTION, DUR, EASE, RISE, STAGGER } from "./motion";

/**
 * The masthead every interior page opens with. Because it is above the fold on
 * first paint it starts hidden and is unhidden by the animation, which avoids
 * the jump you would otherwise get when hydration drops the type back down to
 * its start position. Reduced-motion users, and anyone without JavaScript, get
 * it visible from CSS instead (see .gsap-vis-hidden in globals.css).
 */
export default function PageHeader({
  eyebrow,
  lines,
  lede,
}: {
  eyebrow: string;
  lines: ReactNode[];
  lede?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(ALLOW_MOTION, () => {
        gsap.set(root.current, { visibility: "visible" });

        gsap
          .timeline({ defaults: { ease: EASE.enter } })
          .from(q(".page-eyebrow"), { opacity: 0, y: 12, duration: DUR.enter })
          .from(
            q(".page-heading .line-inner"),
            {
              yPercent: 120,
              duration: DUR.statement,
              stagger: STAGGER.loose,
            },
            "-=0.45"
          )
          .from(
            q(".page-lede"),
            { opacity: 0, y: RISE, duration: DUR.enter },
            "-=0.5"
          );
      });
    },
    { scope: root }
  );

  return (
    <header
      ref={root}
      className="gsap-vis-hidden px-6 pb-16 pt-32 sm:px-12 sm:pb-20 sm:pt-40"
    >
      <p className="page-eyebrow mb-8 text-[0.7rem] uppercase tracking-[0.4em] text-rust">
        {eyebrow}
      </p>

      <h1 className="page-heading max-w-4xl font-display text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[1.02] tracking-tight">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-1">
            <span className="line-inner block">{line}</span>
          </span>
        ))}
      </h1>

      {lede ? (
        <p className="page-lede mt-10 max-w-[38rem] text-base leading-relaxed text-ink-soft sm:text-lg">
          {lede}
        </p>
      ) : null}
    </header>
  );
}
