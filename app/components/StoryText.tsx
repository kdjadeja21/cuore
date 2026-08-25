"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "./gsap";
import { ALLOW_MOTION, EASE } from "./motion";

/**
 * Long-form copy that writes itself as you scroll: words start dim and come up
 * to full weight tied to scroll progress, so the reader sets the pace. Falls
 * back to ordinary static text when motion is turned down.
 */
export default function StoryText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(ALLOW_MOTION, () => {
        const target = root.current;
        if (!target) return;

        // "auto" leaves the original sentence on the parent as an aria-label
        // and hides the per-word spans, so assistive tech reads prose rather
        // than a stream of single words.
        const split = SplitText.create(target, {
          type: "words",
          wordsClass: "story-word",
          aria: "auto",
        });

        gsap.from(split.words, {
          opacity: 0.18,
          stagger: 0.35,
          ease: EASE.linear,
          scrollTrigger: {
            trigger: target,
            start: "top 78%",
            end: "bottom 60%",
            scrub: true,
          },
        });

        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <p ref={root} className={className}>
      {children}
    </p>
  );
}
