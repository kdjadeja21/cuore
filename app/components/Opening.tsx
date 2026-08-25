"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP, INTRO_DONE_EVENT } from "./gsap";
import { DUR, EASE, STAGGER } from "./motion";
import { buttonClass } from "./button";
import CuoreWord from "./CuoreWord";
import { SITE } from "@/app/lib/site";
import diningRoom from "@/public/images/dining-room.jpg";

const SEEN_KEY = "cuore-intro-seen";

/** Perspective on .hero, in px. The depth maths below depends on it. */
const PERSPECTIVE = 1000;
/** How far back the room sits before the camera starts moving in. */
const BACK_Z = -240;
/**
 * Perspective shrinks a plane at negative z by PERSPECTIVE / (PERSPECTIVE - z),
 * so the room is pre-scaled by the inverse to still cover the viewport at its
 * furthest point, plus a margin. It only ever grows from there, so no edge can
 * come into view.
 */
const BACK_SCALE = (PERSPECTIVE - BACK_Z) / PERSPECTIVE + 0.05;

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
            defaults: { ease: EASE.enter },
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
                    { scale: 1, duration: 0.16, ease: EASE.state },
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
                stagger: STAGGER.tight,
                ease: EASE.land,
              },
              "-=1.1"
            )
            .from(
              q(".hero-line .line-inner"),
              { yPercent: 120, duration: DUR.enter, stagger: STAGGER.loose },
              "-=0.55"
            )
            .from(
              q(".hero-cta"),
              { opacity: 0, y: 18, duration: DUR.enter },
              "-=0.4"
            )
            .from(q(".hero-cue"), { opacity: 0, y: 10, duration: 0.5 }, "-=0.35");

          // Quiet heartbeat on the hero "o", every few seconds
          gsap.to(q(".hero-word .letter-o"), {
            keyframes: [
              { scale: 1.14, duration: 0.14, ease: "power2.out" },
              { scale: 1, duration: 0.12, ease: "power2.in" },
              { scale: 1.09, duration: 0.12, ease: "power2.out" },
              { scale: 1, duration: 0.16, ease: EASE.state },
            ],
            transformOrigin: "50% 50%",
            repeat: -1,
            repeatDelay: 4.5,
            delay: seen ? 2 : 4,
          });

          // The camera pushes into the room. Three planes at different depths:
          // the room enlarges as it comes toward you, the lantern glow drifts
          // across, and the wordmark lifts past the lens and fades out.
          gsap.set(q(".hero-plane-room"), { z: BACK_Z, scale: BACK_SCALE });

          gsap
            .timeline({
              defaults: { ease: EASE.linear },
              scrollTrigger: {
                trigger: q(".hero")[0],
                start: "top top",
                end: "bottom top",
                scrub: 0.4,
              },
            })
            .to(q(".hero-plane-room"), { z: -60 }, 0)
            .to(q(".hero-img"), { yPercent: 12 }, 0)
            .to(q(".hero-plane-glow"), { z: 80, yPercent: 20, opacity: 0.1 }, 0)
            .to(q(".hero-copy"), { z: 220, yPercent: -8, opacity: 0 }, 0)
            .to(q(".hero-cue"), { opacity: 0, duration: 0.2 }, 0);

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
            {SITE.parent}
          </p>
        </div>

        {/* Hero. Perspective lives here; each direct child is its own depth
            plane, which is why none of them use preserve-3d. */}
        <header
          className="hero on-dark relative h-[100svh] overflow-hidden bg-ink"
          style={{ perspective: `${PERSPECTIVE}px` }}
        >
          <div className="hero-plane-room absolute inset-0 will-change-transform">
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
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-ink/30" />
          </div>

          <div
            className="hero-plane-glow absolute inset-0 will-change-transform"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(60% 45% at 50% 22%, rgba(255,201,126,0.34) 0%, rgba(255,176,92,0.12) 45%, transparent 72%)",
            }}
          />

          <div className="hero-copy relative z-10 flex h-full flex-col justify-end px-6 pb-14 will-change-transform sm:px-12 sm:pb-16">
            <p className="hero-line mb-4 overflow-hidden text-[0.7rem] uppercase tracking-[0.4em] text-glow sm:text-xs">
              <span className="line-inner inline-block">
                rajkot · gujarat · est. by masala diaries
              </span>
            </p>
            <h1 className="hero-word text-cream">
              <CuoreWord className="text-[clamp(5rem,20vw,15rem)]" />
            </h1>
            <p className="hero-line mt-6 max-w-xl overflow-hidden font-display text-xl text-cream/90 sm:text-2xl">
              <span className="line-inner inline-block">{SITE.tagline}</span>
            </p>
            <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
              <Link href="/reservations" className={buttonClass("primary")}>
                Reserve a table
              </Link>
              <Link href="/menu" className={buttonClass("onDark")}>
                See the menu
              </Link>
            </div>
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
