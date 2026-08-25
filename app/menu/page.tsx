import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import FadeUp from "../components/FadeUp";
import { buttonClass } from "../components/button";
import MenuBoard from "./MenuBoard";
import PrintButton from "./PrintButton";
import { KITCHEN_NOTE, TASTING_MENU } from "../lib/menu";
import { jsonLd, menuSchema } from "../lib/structured-data";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "A vegetarian kitchen in Rajkot: small plates, a tandoor that stays lit, wood-fired pizza, eleven-hour dal, and a seven-course tasting menu.",
  openGraph: {
    title: "Menu — Cuore by Masala Diaries",
    description:
      "Small plates, the tandoor, mains, breads and rice, desserts and drinks. Vegetarian throughout.",
    images: ["/images/dish-paneer-tikka.jpg"],
  },
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="il menu — the menu"
        lines={["Everything here", "is vegetarian.", "Nothing here is timid."]}
        lede={KITCHEN_NOTE}
      />

      <FadeUp className="mb-20 grid grid-cols-1 gap-10 px-6 sm:px-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl rounded-lg border border-ink/15 bg-cream/50 p-8 sm:p-10">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-rust">
            Chef&apos;s tasting menu
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            {TASTING_MENU.name}
            <span className="ml-4 align-middle text-lg text-ink-soft">
              ₹{TASTING_MENU.price} per guest
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
            {TASTING_MENU.description}
          </p>
          <Link
            href="/reservations"
            className={buttonClass("primary", "mt-8 px-7 py-3 text-xs")}
          >
            Book the tasting menu
          </Link>
        </div>

        <PrintButton />
      </FadeUp>

      <MenuBoard />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(menuSchema()) }}
      />
    </>
  );
}
