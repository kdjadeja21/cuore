"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "./gsap";
import { ALLOW_MOTION, DUR, EASE, REVEAL_START, STAGGER } from "./motion";

/**
 * Display type that rises out of a clipping mask, one line at a time. The
 * caller owns the heading element and its type styles; this owns the masking
 * and the reveal, so every heading on the site arrives the same way.
 *
 * For headings that sit above the fold on first paint, use PageHeader instead —
 * it guards against the flash of final-position text before hydration.
 */
export default function MaskedLines({
  lines,
  className = "",
}: {
  lines: ReactNode[];
  className?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(ALLOW_MOTION, () => {
        gsap.from(gsap.utils.selector(root)(".line-inner"), {
          yPercent: 120,
          duration: DUR.statement,
          stagger: STAGGER.loose,
          ease: EASE.enter,
          scrollTrigger: {
            trigger: root.current,
            start: REVEAL_START,
            once: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <span ref={root} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-1">
          <span className="line-inner block">{line}</span>
        </span>
      ))}
    </span>
  );
}
