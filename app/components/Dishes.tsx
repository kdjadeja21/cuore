"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "./gsap";
import { ALLOW_MOTION, EASE } from "./motion";
import { buttonClass } from "./button";
import MaskedLines from "./MaskedLines";
import { MENU } from "@/app/lib/menu";
import paneerTikka from "@/public/images/dish-paneer-tikka.jpg";
import dalMakhani from "@/public/images/dish-dal-makhani.jpg";
import pizza from "@/public/images/dish-pizza.jpg";
import risotto from "@/public/images/dish-risotto.jpg";
import kulfi from "@/public/images/dish-kulfi.jpg";

type Plate = { name: string; image: StaticImageData; alt: string };

const PLATES: Plate[] = [
  {
    name: "Paneer tikka Cuore",
    image: paneerTikka,
    alt: "Char-blistered cubes of paneer with onion and pepper on a dark terracotta plate, beside a smear of mint chutney",
  },
  {
    name: "Dal Cuore",
    image: dalMakhani,
    alt: "Black lentils in a hammered copper bowl, swirled with cream and topped with a curl of butter",
  },
  {
    name: "Margherita del forno",
    image: pizza,
    alt: "A wood-fired margherita pizza with a leopard-spotted crust, melted mozzarella and fresh basil",
  },
  {
    name: "Wild mushroom risotto",
    image: risotto,
    alt: "Creamy saffron-tinted risotto with roasted wild mushrooms and shaved parmesan in a dark bowl",
  },
  {
    name: "Kesar pista kulfi",
    image: kulfi,
    alt: "Three slices of saffron pistachio kulfi fanned on a terracotta plate, dusted with crushed pistachio and rose petals",
  },
];

const ALL_ITEMS = MENU.flatMap((section) => section.items);

/** Names are resolved against the menu so the price and description on the
 *  home page can never disagree with the menu page. */
const DISHES = PLATES.flatMap((plate) => {
  const item = ALL_ITEMS.find((candidate) => candidate.name === plate.name);
  return item ? [{ ...plate, item }] : [];
});

export default function Dishes() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(ALLOW_MOTION, () => {
        q(".dish").forEach((dish, i) => {
          const plate = dish.querySelector(".dish-plate");
          const shadow = dish.querySelector(".dish-shadow");
          const copy = dish.querySelector(".dish-copy");

          // Each plate arrives tilted away and rotates flat, the way a plate
          // is set down on the table in front of you. Neighbours in the same
          // row are offset so they land one after another.
          const tl = gsap.timeline({
            defaults: { ease: EASE.enter },
            delay: (i % 3) * 0.12,
            scrollTrigger: { trigger: dish, start: "top 85%", once: true },
          });

          tl.from(plate, {
            rotateX: 55,
            scale: 0.8,
            y: -30,
            opacity: 0,
            duration: 1.1,
          })
            .from(shadow, { opacity: 0, scale: 0.6, duration: 0.9 }, 0.25)
            .from(copy, { opacity: 0, y: 20, duration: 0.6 }, 0.35);
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      aria-labelledby="dishes-heading"
      className="relative z-10 bg-parchment px-6 py-28 text-ink sm:px-12 sm:py-36"
    >
      <p className="mb-8 text-[0.7rem] uppercase tracking-[0.4em] text-rust">
        03 · il piatto — the plate
      </p>

      <div className="mb-16 flex flex-col gap-10 sm:mb-24 lg:flex-row lg:items-end lg:justify-between">
        <h2
          id="dishes-heading"
          className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-medium leading-[1.05] tracking-tight"
        >
          <MaskedLines
            lines={[
              "Five things we would",
              <span key="line-2" className="text-terracotta">
                order for you.
              </span>,
            ]}
          />
        </h2>
        <p className="max-w-sm text-base leading-relaxed text-ink-soft">
          The kitchen is vegetarian, the tandoor is lit at ten in the morning,
          and the dal has been going since the night before.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
        {DISHES.map((dish) => (
          <li key={dish.name} className="dish">
            {/* Perspective per plate, so each one rotates about its own
                centre instead of skewing toward the middle of the grid. */}
            <div className="dish-scene scene-close relative">
              <div className="dish-plate relative will-change-transform">
                <div className="relative aspect-square overflow-hidden rounded-full ring-1 ring-ink/10">
                  <Image
                    src={dish.image}
                    alt={dish.alt}
                    fill
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 40vw, 85vw"
                    quality={72}
                    className="object-cover"
                  />
                </div>
              </div>
              <div
                className="dish-shadow pointer-events-none absolute inset-x-8 -bottom-3 h-6 rounded-[50%] bg-ink/25 blur-lg"
                aria-hidden="true"
              />
            </div>

            <div className="dish-copy mt-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl font-medium leading-tight tracking-tight">
                  {dish.name}
                </h3>
                <span className="shrink-0 font-display text-lg text-rust">
                  ₹{dish.item.price}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {dish.item.description}
              </p>
            </div>
          </li>
        ))}

        <li className="flex flex-col justify-center gap-6 border-t border-ink/15 pt-10 sm:border-t-0 sm:pt-0">
          <p className="font-display text-2xl leading-tight tracking-tight">
            Forty-one more, and a seven-course tasting menu.
          </p>
          <Link href="/menu" className={buttonClass("secondary", "self-start")}>
            See the full menu
          </Link>
        </li>
      </ul>
    </section>
  );
}
