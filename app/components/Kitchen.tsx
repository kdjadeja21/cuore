"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap, useGSAP } from "./gsap";
import pestoBurrata from "@/public/images/food/pesto-burrata.jpg";
import redPenne from "@/public/images/food/red-penne.jpg";
import sunsetSipper from "@/public/images/food/sunset-sipper.jpg";
import nachos from "@/public/images/food/nachos.jpg";
import smokingSundaes from "@/public/images/food/smoking-sundaes.jpg";
import noodleBowl from "@/public/images/food/noodle-bowl.jpg";
import crocchette from "@/public/images/food/crocchette.jpg";
import pistachioTorta from "@/public/images/food/pistachio-torta.jpg";

type Dish = {
  title: string;
  note: string;
  image: StaticImageData;
  alt: string;
  wide?: boolean;
};

const DISHES: Dish[] = [
  {
    title: "the pesto burrata",
    note: "green penne under a full moon of burrata",
    image: pestoBurrata,
    alt: "Green pesto penne topped with burrata and an edible flower",
  },
  {
    title: "the red penne",
    note: "tomato-slicked, served in stone",
    image: redPenne,
    alt: "Penne in tomato sauce with basil, served in a stone bowl with a sunset drink",
  },
  {
    title: "the sunset sipper",
    note: "poured under the neon heart",
    image: sunsetSipper,
    alt: "Orange drink in a bag-shaped glass with the neon cuore sign glowing behind",
  },
  {
    title: "the loaded nachos",
    note: "corn, salsa, and no restraint",
    image: nachos,
    alt: "Nachos loaded with salsa, olives, herbs and cream",
  },
  {
    title: "the smoking sundaes",
    note: "three scoops, still breathing smoke",
    image: smokingSundaes,
    alt: "Three ice cream desserts on copper plates with smoke drifting across",
  },
  {
    title: "the garden bowl",
    note: "noodles, broth and a pile of greens",
    image: noodleBowl,
    alt: "Noodle bowl with broccoli, tofu and herbed broth",
    wide: true,
  },
  {
    title: "the crocchette",
    note: "golden, by the staircase",
    image: crocchette,
    alt: "Golden croquettes on a brass tray with the spiral staircase behind",
    wide: true,
  },
  {
    title: "the pistachio torta",
    note: "a soft finish, swept in green",
    image: pistachioTorta,
    alt: "White dessert on a crisp base beside a swept stroke of pistachio cream",
  },
];

export default function Kitchen() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motionOk: "(prefers-reduced-motion: no-preference)",
          wide: "(min-width: 768px)",
        },
        (ctx) => {
          const { motionOk, wide } = ctx.conditions as {
            motionOk: boolean;
            wide: boolean;
          };
          if (!motionOk) return;

          gsap.from(q(".kitchen-heading .line-inner"), {
            yPercent: 120,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: q(".kitchen-heading")[0],
              start: "top 80%",
              once: true,
            },
          });

          if (!wide) return;

          // Desktop: pin the chapter and drive the shelf horizontally
          const wrap = q(".kitchen-wrap")[0];
          const track = q(".kitchen-track")[0];
          if (!wrap || !track) return;

          const prevOverflow = wrap.style.overflowX;
          wrap.style.overflowX = "hidden";

          const distance = () => track.scrollWidth - wrap.clientWidth;

          const scrollTween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => "+=" + distance(),
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          gsap.to(q(".kitchen-progress"), {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => "+=" + distance(),
              scrub: 0.6,
            },
          });

          // Slight counter-drift inside each card as it crosses the screen
          q(".kitchen-card-img").forEach((img) => {
            gsap.fromTo(
              img,
              { xPercent: -6 },
              {
                xPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: img,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          });

          return () => {
            wrap.style.overflowX = prevOverflow;
          };
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative z-10 overflow-hidden bg-terracotta text-cream"
    >
      <div className="flex min-h-screen flex-col justify-center gap-10 py-16 sm:gap-14">
        <div className="px-6 sm:px-12">
          <p className="mb-6 text-[0.7rem] uppercase tracking-[0.4em] text-glow">
            03 · la cucina — the kitchen
          </p>
          <h2 className="kitchen-heading font-display text-[clamp(2.2rem,5vw,4.2rem)] font-medium leading-[1.05] tracking-tight">
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">From the kitchen,</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block text-glow">with heart.</span>
            </span>
          </h2>
        </div>

        <div className="kitchen-wrap overflow-x-auto overscroll-x-contain px-6 [scrollbar-width:none] [scroll-snap-type:x_mandatory] sm:px-12 [&::-webkit-scrollbar]:hidden">
          <ul className="kitchen-track flex w-max items-end gap-6 pr-6 will-change-transform sm:gap-10 sm:pr-12">
            {DISHES.map((dish, i) => (
              <li
                key={dish.title}
                className="shrink-0 [scroll-snap-align:start]"
              >
                <figure
                  className={
                    dish.wide
                      ? "w-[78vw] max-w-[34rem] sm:w-[44vw]"
                      : "w-[68vw] max-w-[24rem] sm:w-[30vw]"
                  }
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl ${
                      dish.wide ? "aspect-[4/3]" : "aspect-[3/4]"
                    }`}
                  >
                    <Image
                      src={dish.image}
                      alt={dish.alt}
                      fill
                      sizes="(min-width: 768px) 44vw, 78vw"
                      quality={72}
                      className="kitchen-card-img scale-[1.14] object-cover will-change-transform"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-baseline gap-3">
                    <span className="font-display text-sm text-glow">
                      0{i + 1}
                    </span>
                    <span>
                      <span className="block font-display text-xl font-medium tracking-tight sm:text-2xl">
                        {dish.title}
                      </span>
                      <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.25em] text-cream/70">
                        {dish.note}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 sm:px-12">
          <div className="h-px w-full bg-cream/25">
            <div className="kitchen-progress h-px w-full origin-left scale-x-0 bg-cream" />
          </div>
        </div>
      </div>
    </section>
  );
}
