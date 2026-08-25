"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "./gsap";
import { ALLOW_MOTION, DUR, EASE, REVEAL_START, RISE, STAGGER } from "./motion";

/**
 * Fades its direct children up into place, staggered, once. Used for body copy
 * and card grids — anything that should arrive without drawing attention to the
 * arrival itself.
 */
export default function FadeUp({
  children,
  className = "",
  stagger = STAGGER.normal,
  start = REVEAL_START,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  start?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(ALLOW_MOTION, () => {
        const targets = root.current ? Array.from(root.current.children) : [];
        if (targets.length === 0) return;

        gsap.from(targets, {
          opacity: 0,
          y: RISE,
          duration: DUR.enter,
          stagger,
          ease: EASE.enter,
          scrollTrigger: { trigger: root.current, start, once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
