"use client";

import MaskedLines from "./MaskedLines";
import FadeUp from "./FadeUp";

const VOICES = [
  {
    quote:
      "We came for a wedding lunch and stayed until the lanterns came on. Nobody asked us to leave.",
    name: "Ankita & Ronak M.",
    context: "Banquet, February",
  },
  {
    quote:
      "The dal tastes like somebody's grandmother is still in the kitchen. Eleven hours, they told me. I believe them.",
    name: "Devang S.",
    context: "Regular, Thursday lunch",
  },
  {
    quote:
      "I have eaten risotto in Milan and I have eaten it here. This one holds its own, and the naan is better.",
    name: "Priya T.",
    context: "First visit, November",
  },
];

export default function Voices() {
  return (
    <section
      aria-labelledby="voices-heading"
      className="on-dark relative z-10 bg-ink px-6 py-28 text-cream sm:px-12 sm:py-36"
    >
      <p className="mb-8 text-[0.7rem] uppercase tracking-[0.4em] text-glow">
        06 · le voci — the voices
      </p>

      <h2
        id="voices-heading"
        className="mb-16 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-tight sm:mb-24"
      >
        <MaskedLines
          lines={["What people say", "on the way out."]}
        />
      </h2>

      <FadeUp
        className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10"
        stagger={0.12}
      >
        {VOICES.map((voice) => (
          <figure
            key={voice.name}
            className="flex flex-col gap-6 border-t border-cream/20 pt-8"
          >
            <blockquote className="font-display text-xl leading-snug text-cream/95 sm:text-2xl">
              “{voice.quote}”
            </blockquote>
            <figcaption className="mt-auto">
              <span className="block text-sm text-cream/90">{voice.name}</span>
              <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.3em] text-cream/50">
                {voice.context}
              </span>
            </figcaption>
          </figure>
        ))}
      </FadeUp>
    </section>
  );
}
