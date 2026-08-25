"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap, useGSAP } from "./gsap";
import { ALLOW_MOTION, EASE, WIDE } from "./motion";
import MaskedLines from "./MaskedLines";
import facade from "@/public/images/facade.jpg";
import diningRoom from "@/public/images/dining-room.jpg";
import diningView from "@/public/images/dining-view.jpg";
import banquet from "@/public/images/banquet.jpg";
import kitchen from "@/public/images/kitchen-tandoor.jpg";

type Frame = {
  title: string;
  note: string;
  image: StaticImageData;
  alt: string;
};

const FRAMES: Frame[] = [
  {
    title: "The drum",
    note: "sand-coloured, round-windowed, visible from both directions",
    image: facade,
    alt: "The circular sand-coloured facade of Cuore with round windows and the cuore sign",
  },
  {
    title: "The canopy",
    note: "twelve hundred lanterns, hung one at a time",
    image: diningRoom,
    alt: "Woven lanterns filling the 35-foot ceiling above the Cuore dining room",
  },
  {
    title: "The long view",
    note: "the whole room in one glance from the stairs",
    image: diningView,
    alt: "The Cuore dining room seen from the spiral staircase, arched windows along one wall",
  },
  {
    title: "The tandoor",
    note: "lit at ten, not allowed to go out until close",
    image: kitchen,
    alt: "A chef lifting skewers of charred paneer from a glowing tandoor oven",
  },
  {
    title: "The banquet wing",
    note: "four hundred guests, one sitting",
    image: banquet,
    alt: "The banquet hall at Cuore dressed for a large event",
  },
];

/** Degrees between neighbouring frames on the cylinder. */
const STEP = 34;
/** Radius of the cylinder the frames sit on, in px. */
const RADIUS = 620;
/** How far past the first and last frame the sweep runs, in degrees. */
const OVERSHOOT = STEP * 0.7;

export default function ArcGallery() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(`${ALLOW_MOTION} and ${WIDE}`, () => {
        const track = q(".arc-track")[0];
        const items = q(".arc-item");
        if (!track || items.length === 0) return;

        // Each frame is rotated about a point one radius behind itself, which
        // lays the whole set out on a cylinder without any per-item maths.
        items.forEach((item, i) => {
          gsap.set(item, {
            position: "absolute",
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            rotateY: i * STEP,
            transformOrigin: `50% 50% ${-RADIUS}px`,
          });
        });

        // Frames lose focus the further they are turned away from the viewer,
        // recomputed from the track's live rotation so it always agrees with
        // what is actually on screen.
        const focus = () => {
          const current = Number(gsap.getProperty(track, "rotateY"));
          items.forEach((item, i) => {
            const away = Math.min(Math.abs(i * STEP + current) / 72, 1);
            gsap.set(item, {
              opacity: 1 - away * 0.72,
              scale: 1 - away * 0.16,
              filter: `blur(${(away * 3).toFixed(1)}px)`,
              zIndex: 100 - Math.round(away * 100),
            });
          });
        };

        focus();

        gsap.fromTo(
          track,
          { rotateY: OVERSHOOT },
          {
            rotateY: -(STEP * (items.length - 1)) - OVERSHOOT,
            ease: EASE.linear,
            onUpdate: focus,
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      aria-labelledby="arc-heading"
      className="on-dark relative z-10 overflow-hidden bg-ink py-28 text-cream sm:py-36"
    >
      <div className="px-6 sm:px-12">
        <p className="mb-8 text-[0.7rem] uppercase tracking-[0.4em] text-glow">
          la stanza — the room in pictures
        </p>
        <h2
          id="arc-heading"
          className="mb-6 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-tight"
        >
          <MaskedLines lines={["Five ways to look", "at the same room."]} />
        </h2>
      </div>

      {/* The turning arc, for pointer-sized screens where motion is welcome.
          Exactly one of the two variants below is ever display:block, so only
          one set of frames is in the accessibility tree at a time. */}
      <div className="arc-stage relative mt-12 h-[62vh] min-h-[26rem]">
        <div className="scene absolute inset-0">
          <div className="arc-track depth-layer absolute inset-0">
            {FRAMES.map((frame) => (
              <figure
                key={frame.title}
                className="arc-item w-[clamp(19rem,30vw,27rem)] will-change-transform"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl shadow-ink/60">
                  <Image
                    src={frame.image}
                    alt={frame.alt}
                    fill
                    sizes="27rem"
                    quality={72}
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-5 text-center">
                  <span className="block font-display text-xl tracking-tight">
                    {frame.title}
                  </span>
                  <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.25em] text-cream/60">
                    {frame.note}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* Everywhere else: the same five frames, stacked and still. */}
      <ul className="arc-grid mt-12 grid grid-cols-1 gap-10 px-6 sm:grid-cols-2 sm:px-12">
        {FRAMES.map((frame) => (
          <li key={frame.title}>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={frame.image}
                  alt={frame.alt}
                  fill
                  sizes="(min-width: 640px) 45vw, 88vw"
                  quality={72}
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4">
                <span className="block font-display text-lg tracking-tight">
                  {frame.title}
                </span>
                <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.25em] text-cream/60">
                  {frame.note}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
