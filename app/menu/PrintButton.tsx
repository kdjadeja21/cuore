"use client";

import { buttonClass } from "@/app/components/button";

/**
 * Deliberately a print action rather than a link to a PDF: the browser's own
 * "save as PDF" produces the same takeaway document without a second copy of
 * the menu to keep in sync. Print styles live in globals.css.
 */
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={buttonClass("secondary", "no-print px-7 py-3 text-xs")}
    >
      Print this menu
    </button>
  );
}
