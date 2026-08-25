"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";
import diningRoom from "@/public/images/dining-room.jpg";
import diningView from "@/public/images/dining-view.jpg";
import banquet from "@/public/images/banquet.jpg";
import facade from "@/public/images/facade.jpg";

type Row = {
  title: string;
  note: string;
  image: StaticImageData;
  alt: string;
};

const ROWS: Row[] = [
  {
    title: "The copper bar",
    note: "an island under a sky of lanterns",
    image: diningRoom,
    alt: "The copper bar at the centre of the Cuore dining room",
  },
  {
    title: "From the stairs",
    note: "the whole room in one glance",
    image: diningView,
    alt: "The Cuore dining room seen from the spiral staircase",
  },
  {
    title: "The banquet hall",
    note: "a celebration in one sitting",
    image: banquet,
    alt: "The banquet hall at Cuore set for a large event",
  },
  {
    title: "The drum",
    note: "you can spot it from the road",
    image: facade,
    alt: "The circular exterior of Cuore by Masala Diaries",
  },
];

export default function Table() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // Touch / small screens: inline images wipe open once as they arrive
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          q(".table-inline").forEach((fig) => {
            gsap.fromTo(
              fig,
              { clipPath: "inset(0 100% 0 0)" },
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.1,
                ease: "power3.inOut",
                scrollTrigger: { trigger: fig, start: "top 78%", once: true },
              }
            );
          });
        }
      );

      // Desktop with a real cursor: floating preview follows the mouse
      mm.add(
        "(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)",
        () => {
          const preview = q(".table-preview")[0];
          const imgs = q(".table-preview-img");
          const rows = q(".table-row");
          if (!preview) return;

          gsap.set(preview, { autoAlpha: 0, scale: 0.85, rotate: -4 });
          gsap.set(imgs, { autoAlpha: 0 });

          const xTo = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3" });
          const yTo = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3" });

          const move = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
          };

          const enterRow = (i: number) => {
            gsap.to(preview, {
              autoAlpha: 1,
              scale: 1,
              rotate: gsap.utils.random(-3, 3),
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });
            imgs.forEach((img, j) => {
              gsap.to(img, {
                autoAlpha: j === i ? 1 : 0,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
              if (j === i)
                gsap.fromTo(
                  img,
                  { scale: 1.15 },
                  { scale: 1, duration: 0.7, ease: "power3.out", overwrite: "auto" }
                );
            });
            rows.forEach((row, j) => {
              gsap.to(row, {
                opacity: j === i ? 1 : 0.35,
                duration: 0.35,
                overwrite: "auto",
              });
              gsap.to(row.querySelector(".table-row-title"), {
                x: j === i ? 20 : 0,
                color: j === i ? "#b95c2d" : "#241c10",
                duration: 0.45,
                ease: "power3.out",
                overwrite: "auto",
              });
            });
          };

          const leaveList = () => {
            gsap.to(preview, {
              autoAlpha: 0,
              scale: 0.85,
              duration: 0.35,
              ease: "power2.in",
              overwrite: "auto",
            });
            rows.forEach((row) => {
              gsap.to(row, { opacity: 1, duration: 0.35, overwrite: "auto" });
              gsap.to(row.querySelector(".table-row-title"), {
                x: 0,
                color: "#241c10",
                duration: 0.45,
                ease: "power3.out",
                overwrite: "auto",
              });
            });
          };

          const list = q(".table-list")[0];
          const rowHandlers = rows.map((row, i) => {
            const fn = () => enterRow(i);
            row.addEventListener("mouseenter", fn);
            return fn;
          });
          list?.addEventListener("mouseleave", leaveList);
          window.addEventListener("mousemove", move, { passive: true });

          return () => {
            rows.forEach((row, i) =>
              row.removeEventListener("mouseenter", rowHandlers[i])
            );
            list?.removeEventListener("mouseleave", leaveList);
            window.removeEventListener("mousemove", move);
          };
        }
      );

      // Title reveal on arrival (wipe via mask, not a fade)
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q(".table-heading .line-inner"), {
          yPercent: 120,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: q(".table-heading")[0], start: "top 80%", once: true },
        });
        ScrollTrigger.refresh();
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative z-10 bg-parchment px-6 py-28 text-ink sm:px-12 sm:py-36"
    >
      <p className="mb-8 text-[0.7rem] uppercase tracking-[0.4em] text-rust">
        03 · la tavola — the table
      </p>

      <h2 className="table-heading mb-16 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-medium leading-[1.05] tracking-tight sm:mb-20">
        <span className="block overflow-hidden pb-1">
          <span className="line-inner block">Walk the room</span>
        </span>
        <span className="block overflow-hidden pb-1">
          <span className="line-inner block text-terracotta">
            before you arrive.
          </span>
        </span>
      </h2>

      <ul className="table-list border-t border-ink/15">
        {ROWS.map((row, i) => (
          <li key={row.title} className="table-row border-b border-ink/15">
            <div className="flex items-baseline gap-6 py-8 sm:py-10">
              <span className="font-display text-sm text-rust">
                0{i + 1}
              </span>
              <div className="flex-1">
                <h3 className="table-row-title font-display text-[clamp(1.8rem,4.5vw,3.4rem)] font-medium leading-none tracking-tight will-change-transform">
                  {row.title}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-ink-soft">
                  {row.note}
                </p>
              </div>
            </div>
            {/* Inline image for touch screens */}
            <figure className="table-inline mb-8 overflow-hidden rounded-xl md:hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={row.image}
                  alt={row.alt}
                  fill
                  sizes="90vw"
                  quality={72}
                  className="object-cover"
                />
              </div>
            </figure>
          </li>
        ))}
      </ul>

      {/* Floating preview — desktop only */}
      <div
        className="table-preview pointer-events-none fixed left-0 top-0 z-30 hidden h-[19rem] w-[26rem] -translate-x-1/2 -translate-y-[55%] overflow-hidden rounded-2xl shadow-2xl shadow-ink/30 md:block"
        aria-hidden="true"
      >
        {ROWS.map((row) => (
          <div key={row.title} className="table-preview-img absolute inset-0">
            <Image
              src={row.image}
              alt=""
              fill
              sizes="26rem"
              quality={72}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
