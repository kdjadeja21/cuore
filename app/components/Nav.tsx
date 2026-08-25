"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, INTRO_DONE_EVENT } from "./gsap";
import { DUR, EASE, STAGGER } from "./motion";
import { buttonClass } from "./button";
import { NAV_LINKS, SITE } from "@/app/lib/site";

export default function Nav() {
  const root = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // The overlay remembers which route it was opened on, so any navigation —
  // including the back button — closes it without an effect to synchronise.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (next: boolean) => setOpenedOn(next ? pathname : null);

  // Only the home page has a hero for the nav to sit transparently over; every
  // other route starts with the solid treatment so the links stay readable.
  const overHero = pathname === "/";

  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenedOn(null);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      html.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useGSAP(
    () => {
      // Every transform goes on the inner bar, never on <nav> itself. A
      // transformed ancestor becomes the containing block for its fixed
      // descendants, which would collapse the full-screen overlay below down
      // to the height of the bar.
      const bar = root.current?.querySelector<HTMLElement>(".nav-bar");
      if (!bar) return;

      gsap.set(bar, { y: -24, autoAlpha: 0 });

      const reveal = () => {
        gsap.to(bar, {
          y: 0,
          autoAlpha: 1,
          duration: DUR.enter,
          ease: EASE.enter,
          overwrite: "auto",
        });
      };

      // The home preloader owns the first moment of the page, so wait for it to
      // hand over. The delayed call is a safety net: if that event never
      // arrives the nav must still appear.
      let safety: gsap.core.Tween | undefined;
      if (overHero) {
        window.addEventListener(INTRO_DONE_EVENT, reveal, { once: true });
        safety = gsap.delayedCall(3, reveal);
      } else {
        reveal();
      }

      const showAnim = gsap
        .from(bar, { yPercent: -130, paused: true, duration: 0.35, ease: EASE.state })
        .progress(1);

      const trigger = ScrollTrigger.create({
        start: "top top-=1",
        end: "max",
        onUpdate: (self) => {
          if (self.direction === -1 || open) showAnim.play();
          else showAnim.reverse();
          bar.classList.toggle(
            "nav-scrolled",
            self.scroll() > window.innerHeight * 0.8
          );
        },
      });

      return () => {
        window.removeEventListener(INTRO_DONE_EVENT, reveal);
        safety?.kill();
        trigger.kill();
      };
    },
    { scope: root, dependencies: [overHero] }
  );

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const overlay = q(".nav-overlay")[0];
      if (!overlay) return;

      if (open) {
        gsap.to(overlay, { autoAlpha: 1, duration: DUR.quick, ease: EASE.state });
        gsap.fromTo(
          q(".nav-overlay-item"),
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.55,
            stagger: STAGGER.normal,
            ease: EASE.enter,
            delay: 0.08,
          }
        );
      } else {
        gsap.to(overlay, { autoAlpha: 0, duration: DUR.quick, ease: EASE.state });
      }
    },
    { scope: root, dependencies: [open] }
  );

  return (
    <nav ref={root} aria-label="Primary" className="no-print fixed inset-x-0 top-0 z-50">
      <div
        className={`nav-bar relative z-10 flex items-center justify-between px-6 py-4 transition-colors duration-300 sm:px-12 [&.nav-scrolled]:bg-parchment/85 [&.nav-scrolled]:text-ink [&.nav-scrolled]:backdrop-blur-md ${
          overHero ? "text-cream" : "bg-parchment/85 text-ink backdrop-blur-md"
        }`}
      >
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight"
        >
          {SITE.name}
        </Link>

        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 text-sm md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`link-wipe uppercase tracking-[0.2em] ${
                      active ? "opacity-100" : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/reservations"
            className={buttonClass("primary", "px-5 py-2.5 text-xs sm:text-sm")}
          >
            Reserve a table
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="nav-overlay"
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span
              className={`block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        id="nav-overlay"
        // Keeps the closed overlay's links out of the tab order
        inert={!open}
        aria-hidden={!open}
        className="nav-overlay invisible fixed inset-0 z-0 flex flex-col justify-center gap-2 bg-ink px-8 text-cream opacity-0 md:hidden"
      >
        {NAV_LINKS.map((link) => (
          <span key={link.href} className="block overflow-hidden py-1">
            <Link
              href={link.href}
              onClick={() => setOpen(false)}
              className="nav-overlay-item block font-display text-[clamp(2.4rem,12vw,4rem)] leading-tight tracking-tight"
            >
              {link.label}
            </Link>
          </span>
        ))}

        <span className="block overflow-hidden pt-8">
          <a
            href={SITE.phone.href}
            className="nav-overlay-item block text-sm uppercase tracking-[0.25em] text-glow"
          >
            {SITE.phone.display}
          </a>
        </span>
      </div>
    </nav>
  );
}
