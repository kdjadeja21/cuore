import Link from "next/link";
import { buttonClass } from "./components/button";
import { SITE } from "./lib/site";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col justify-center px-6 py-32 sm:px-12">
      <p className="mb-8 text-[0.7rem] uppercase tracking-[0.4em] text-rust">
        404 — nothing on this table
      </p>
      <h1 className="max-w-3xl font-display text-[clamp(2.2rem,6vw,4.5rem)] font-medium leading-[1.03] tracking-tight">
        This page is not on the menu.
      </h1>
      <p className="mt-8 max-w-md text-base leading-relaxed text-ink-soft">
        The one you wanted may have moved. The dining room has not — it is still{" "}
        {SITE.address.street.toLowerCase()}, open {SITE.hours.display}.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link href="/" className={buttonClass("primary")}>
          Back to the start
        </Link>
        <Link href="/menu" className={buttonClass("secondary")}>
          See the menu
        </Link>
      </div>
    </section>
  );
}
