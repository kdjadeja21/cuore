"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, useGSAP);

export function scrollToTop() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.to(window, {
    scrollTo: { y: 0, autoKill: true },
    duration: reduced ? 0 : 1.35,
    ease: "power3.inOut",
    overwrite: true,
  });
}

// Mobile browser chrome collapsing/expanding fires resize storms;
// ignoring them keeps pinned sections from jumping mid-scroll.
if (typeof window !== "undefined") {
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const INTRO_DONE_EVENT = "cuore:intro-done";

export { gsap, ScrollTrigger, SplitText, useGSAP };
