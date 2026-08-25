"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Mobile browser chrome collapsing/expanding fires resize storms;
// ignoring them keeps pinned sections from jumping mid-scroll.
if (typeof window !== "undefined") {
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const INTRO_DONE_EVENT = "cuore:intro-done";

export { gsap, ScrollTrigger, SplitText, useGSAP };
