"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, INTRO_DONE_EVENT } from "./gsap";
import CuoreWord from "./CuoreWord";
import diningRoom from "@/public/images/dining-room.jpg";

const SEEN_KEY = "cuore-intro-seen";

export default function Opening() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const html = document.documentElement;

      const finishIntro = () => {
        html.style.overflow = "";
        window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      };

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { reduced } = ctx.conditions as { reduced: boolean };
          let seen = false;
          try {
            seen = sessionStorage.getItem(SEEN_KEY) === "1";
            sessionStorage.setItem(SEEN_KEY, "1");
          } catch {
            /* storage unavailable — play the full intro */
          }

          gsap.set(q(".opening-root"), { visibility: "visible" });

          if (reduced) {
            gsap.set(q(".preloader"), { display: "none" });
            finishIntro();
            return;
          }

          html.style.overflow = "hidden";

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            onComplete: finishIntro,
          });

          if (!seen) {
            // Full first-visit ritual
            tl.from(q(".preloader .letter"), {
              yPercent: 140,
              duration: 0.85,
              stagger: 0.09,
              ease: "back.out(1.5)",
            })
              .to(
                q(".preloader .letter-o"),
                {
                  keyframes: [
                    { scale: 1.22, duration: 0.14, ease: "power2.out" },
                    { scale: 1, duration: 0.12, ease: "power2.in" },
                    { scale: 1.14, duration: 0.12, ease: "power2.out" },
                    { scale: 1, duration: 0.16, ease: "power2.inOut" },
                  ],
                  transformOrigin: "50% 50%",
                },
                "-=0.1"
              )
              .from(
                q(".preloader-byline"),
                { opacity: 0, y: 14, duration: 0.5 },
                "-=0.25"
              )
              .to(q(".preloader"), {
                yPercent: -100,
                duration: 1.05,
                ease: "power4.inOut",
                delay: 0.35,
              })
              .set(q(".preloader"), { display: "none" });
          } else {
            // Returning visitor: get them in fast
            tl.to(q(".preloader"), {
              autoAlpha: 0,
              duration: 0.4,
              ease: "power2.out",
            }).set(q(".preloader"), { display: "none" });
          }

          tl.from(
            q(".hero-img"),
            {
              scale: seen ? 1.06 : 1.16,
              duration: seen ? 1 : 1.6,
              ease: "power2.out",
            },
            seen ? "-=0.2" : "-=1.0"
          )
            .from(
              q(".hero-word .letter"),
              {
                yPercent: 140,
                duration: 0.8,
                stagger: 0.07,
                ease: "back.out(1.4)",
              },
              "-=1.1"
            )
            .from(
              q(".hero-line .line-inner"),
              { yPercent: 120, duration: 0.7, stagger: 0.1 },
              "-=0.55"
            )
            .from(
              q(".hero-cue"),
              { opacity: 0, y: 10, duration: 0.5 },
              "-=0.3"
            );

          // Quiet heartbeat on the hero "o", every few seconds
          gsap.to(q(".hero-word .letter-o"), {
            keyframes: [
              { scale: 1.14, duration: 0.14, ease: "power2.out" },
              { scale: 1, duration: 0.12, ease: "power2.in" },
              { scale: 1.09, duration: 0.12, ease: "power2.out" },
              { scale: 1, duration: 0.16, ease: "power2.inOut" },
            ],
            transformOrigin: "50% 50%",
            repeat: -1,
            repeatDelay: 4.5,
            delay: seen ? 2 : 4,
          });

          // Gentle parallax as the first chapter slides over the hero
          gsap.to(q(".hero-img"), {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: q(".hero")[0],
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          return () => {
            html.style.overflow = "";
          };
        }
      );
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <div className="opening-root gsap-vis-hidden">
        {/* Preloader */}
        <div className="preloader fixed inset-0 z-[90] flex flex-col items-center justify-center bg-sand text-ink">
          <CuoreWord className="text-[clamp(4rem,16vw,11rem)]" />
          <p className="preloader-byline mt-6 text-xs uppercase tracking-[0.45em] text-ink-soft sm:text-sm">
            by masala diaries
          </p>
        </div>

        {/* Hero */}
        <header className="hero relative h-[100svh] overflow-hidden bg-ink">
          <div className="hero-img absolute inset-0 will-change-transform">
            <Image
              src={diningRoom}
              alt="The main dining room at Cuore — woven lanterns hanging from a 35-foot sculpted ceiling"
              fill
              priority
              placeholder="blur"
              sizes="100vw"
              quality={72}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-ink/30" />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 sm:px-12 sm:pb-16">
            <p className="hero-line mb-4 overflow-hidden text-[0.7rem] uppercase tracking-[0.4em] text-glow sm:text-xs">
              <span className="line-inner inline-block">
                rajkot · gujarat · est. by masala diaries
              </span>
            </p>
            <h1 className="hero-word text-cream">
              <CuoreWord className="text-[clamp(5rem,20vw,15rem)]" />
            </h1>
            <p className="hero-line mt-6 max-w-xl overflow-hidden font-display text-xl text-cream/90 sm:text-2xl">
              <span className="line-inner inline-block">
                Dining that begins in the heart.
              </span>
            </p>
          </div>

          <div className="hero-cue absolute bottom-14 right-6 z-10 hidden text-right text-cream/70 sm:right-12 sm:block">
            <span className="text-[0.65rem] uppercase tracking-[0.35em]">
              scroll
            </span>
            <span className="mt-2 ml-auto block h-12 w-px bg-cream/50" />
          </div>
        </header>
      </div>
    </div>
  );
}
