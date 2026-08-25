export type ButtonVariant = "primary" | "secondary" | "onDark";

const BASE =
  "inline-block rounded-full text-sm font-medium uppercase tracking-[0.2em] transition-transform duration-200 hover:scale-[1.04] active:scale-95";

/**
 * The site has exactly three button treatments. Returning class strings rather
 * than wrapping an element keeps `Link`, `a` and `button` all usable at the
 * call site without a polymorphic wrapper component.
 */
export function buttonClass(variant: ButtonVariant, extra = ""): string {
  switch (variant) {
    case "primary":
      return `${BASE} bg-terracotta px-8 py-4 text-cream hover:bg-rust ${extra}`;
    case "secondary":
      return `${BASE} border border-ink/30 px-8 py-4 text-ink hover:bg-ink hover:text-cream ${extra}`;
    case "onDark":
      return `${BASE} border border-cream/40 px-8 py-4 text-cream hover:bg-cream hover:text-ink ${extra}`;
    default: {
      const exhaustive: never = variant;
      throw new Error(`Unhandled button variant: ${String(exhaustive)}`);
    }
  }
}
