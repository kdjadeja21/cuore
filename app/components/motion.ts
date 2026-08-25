/**
 * One motion vocabulary for the whole site. Sections import these instead of
 * inventing their own easings and durations, so unrelated parts of the page
 * still feel like they were animated by the same hand.
 */
export const EASE = {
  /** Things arriving on screen. */
  enter: "power3.out",
  /** Changing between two states that both already exist. */
  state: "power2.inOut",
  /** Arrivals that should land with a bit of character. */
  land: "back.out(1.4)",
  /** Springing back after being knocked out of place. */
  recover: "elastic.out(1, 0.35)",
  /** Anything tied directly to scroll position. */
  linear: "none",
} as const;

export const DUR = {
  /** Interface feedback: hover, focus, press. */
  quick: 0.28,
  /** Standard entrance. */
  enter: 0.7,
  /** Entrance for large display type. */
  statement: 0.9,
} as const;

/** Gap between siblings in a staggered group. */
export const STAGGER = {
  tight: 0.06,
  normal: 0.08,
  loose: 0.12,
} as const;

/** Where an element starts animating as it scrolls up the viewport. */
export const REVEAL_START = "top 80%";

/** Distance a fading element travels, in pixels. */
export const RISE = 24;

export const REDUCE_MOTION = "(prefers-reduced-motion: reduce)";
export const ALLOW_MOTION = "(prefers-reduced-motion: no-preference)";

/** The breakpoint below which pinned and 3D effects fall back to plain fades. */
export const WIDE = "(min-width: 768px)";
export const CAN_HOVER = "(hover: hover)";
