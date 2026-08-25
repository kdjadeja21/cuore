# Prompt: Build a complete modern restaurant website

Copy everything below the divider into an AI builder (Cursor, v0, Lovable, Claude, Bolt, etc.).

The **Brand foundation** block is filled in with the real details for Cuore by Masala Diaries so the
prompt is usable as-is in this repository. To build a site for a different restaurant, replace only
the values inside that block and leave the rest of the prompt intact.

---

You are a senior front-end engineer and art director. Build a complete, production-ready marketing
website for a restaurant. Optimise for a site that feels crafted and cinematic rather than a
template — the motion is a core part of the design, not decoration bolted on at the end.

## 1. Tech stack and constraints

- Next.js (App Router) with TypeScript in strict mode, and Tailwind CSS for styling.
- GSAP with ScrollTrigger for all scroll choreography, driven through `@gsap/react`'s `useGSAP` hook
  so every animation is scoped to its component and cleaned up on unmount.
- No animation library soup. Do not add Framer Motion, AOS, Locomotive Scroll, or a WebGL/Three.js
  dependency. All "3D" is CSS 3D transforms (`perspective`, `rotateX/Y`, `translateZ`) driven by
  GSAP. This keeps the bundle small and the site debuggable.
- Server Components by default; add `"use client"` only to components that own animation or
  interaction.
- Real semantic HTML: one `<h1>` per page, `<section>` with accessible labels, `<nav>`, `<footer>`,
  and forms built from real `<label>`/`<input>` pairs.
- Images through `next/image` with explicit dimensions so nothing shifts as the page loads.
- No placeholder lorem ipsum. Write finished, appetising copy in the brand voice described below.

## 2. Brand foundation (keep this identical on every page and section)

**Name:** Cuore, by Masala Diaries. Always set in lowercase as `cuore`, never capitalised or
all-caps. *Cuore* means *heart* in Italian, and every piece of copy should be traceable to that idea.

**Tagline:** "Dining that begins in the heart." Supporting line: *dal cuore · from the heart*.

**Location and details, which must be identical everywhere they appear:**

| Field | Value |
| --- | --- |
| Address | Near 150 Ft Ring Road, Rajkot, Gujarat |
| Hours | Open daily, 11 AM – 11 PM |
| Reservations | +91 90990 31031 |
| Offering | Restaurant and banquets |

**Wordmark:** the five letters of `cuore` are set individually, each with its own slight rotation
(roughly −7°, +4°, −3°, +6°, −5°) and a small vertical offset, so the logo reads like a
hand-assembled physical sign rather than typed text. The letters keep that tilt at rest. In the
footer the wordmark gets a warm neon treatment: cream letters with layered amber glow, and the `o`
pulses like a heartbeat every few seconds.

**Palette** — a warm, earthen, candlelit range. Use these as design tokens, not raw hex scattered
through the markup:

| Token | Hex | Role |
| --- | --- | --- |
| `parchment` | `#efe2bd` | Default page background |
| `cream` | `#f4ead2` | Text on dark grounds, light surfaces |
| `sand` | `#e2cb96` | Secondary surfaces, cards |
| `sand-deep` | `#d3b678` | Borders, dividers, subtle depth |
| `ink` | `#241c10` | Primary text, dark sections |
| `ink-soft` | `#4a3b26` | Body copy, captions |
| `terracotta` | `#b95c2d` | Primary buttons and calls to action |
| `rust` | `#96431f` | Hover and pressed states |
| `wine` | `#6f2f24` | Deep accent, dividers |
| `glow` | `#ffc97e` | Eyebrow labels, neon glow, highlights |

**Typography:** Fraunces (variable, with the `SOFT`, `WONK` and `opsz` axes enabled) for all display
type — warm, slightly wonky, high-contrast serif. Instrument Sans for body copy, navigation, labels
and forms. Small eyebrow labels are uppercase, around 0.7rem, with wide `0.3em`–0.45em letter
spacing. Display headings run tight: `letter-spacing: -0.03em` and line height near `0.9`.

**Texture:** a fixed, non-animated SVG film grain overlay at about 5% opacity across the whole site,
plus a repeating geometric "mud-cloth" divider strip used to separate major movements of the page.

**Voice:** unhurried, sensory, specific. Short declarative sentences. Talk about plaster, lantern
light, charcoal and cardamom rather than "culinary excellence" or "a unique dining experience."

## 3. Site structure

Build a multi-page site. Every page shares the fixed navigation and the footer.

### Global navigation

Fixed to the top, transparent over the hero with cream text. It hides on scroll-down and slides back
on scroll-up. Once past roughly 80% of the viewport height it gains a `parchment` background at 85%
opacity with a backdrop blur and switches to ink text. Left side: the `cuore` wordmark linking home.
Right side: Menu, About, Reservations, Contact, then a `terracotta` pill button reading "Reserve a
table" that is always visible, including on mobile. Below `md`, the links collapse into a full-screen
overlay menu whose items stagger in from below.

### Home

1. **Hero.** Full-viewport, edge-to-edge photograph of the dining room, darkened just enough for the
   type to hold. The `cuore` wordmark animates in letter by letter, each rising from behind a
   clipping mask. Tagline and a "Reserve a table" button follow. A small scroll cue sits at the
   bottom and fades away on first scroll.
2. **The heart.** A short statement of intent — what *cuore* means and why the room exists. Set in
   large display type on `parchment`.
3. **The room.** The 35-foot-high dining room: sculpted plaster, woven lanterns, hand-drawn pattern.
   A pinned section where imagery moves at a different rate to the copy.
4. **Signature dishes.** Three or four hero dishes as a preview, each linking through to the full
   menu.
5. **Private dining and occasions.** Banquets, celebrations, and large-format bookings, with a
   capacity summary and a link to enquire.
6. **Testimonials.** Three short quotes with names, on the `ink` ground for contrast.
7. **Closing call to action.** Hours, address, phone, and the reserve button.

### Menu

Grouped into Small plates, From the tandoor, Mains, Breads and rice, Desserts, and Drinks. Each item
shows name, a one-line description, price, and dietary markers (vegetarian, vegan, contains nuts,
spice level). A sticky category rail on the left tracks scroll position and highlights the section
currently in view; clicking a category smooth-scrolls to it. Include a downloadable PDF link and a
clearly marked chef's tasting menu callout.

### About us

The Masala Diaries story told as a vertical timeline: founding, the move to 150 Ft Ring Road, the
building of the room, today. Alongside it, a note on sourcing and the people in the kitchen, with
portraits. This is the most typographically driven page on the site — let the words carry it.

### Reservations

A real, validated booking form: date, time, party size, name, phone, email, occasion (optional), and
a notes field for allergies and access needs. Show inline validation messages, a submit state that
disables and shows a spinner, and a confirmation panel on success. Beside the form, restate hours, the
large-party policy (parties above 10 go through the banquet enquiry), and the phone number for people
who would simply rather call. The phone number must be a tappable `tel:` link.

### Contact and visit

Address with a "Get directions" link that opens the map in a new tab, phone, email, hours table,
parking and accessibility notes, social links, and an embedded map. Add a separate short enquiry form
for press, events and careers.

### Footer

Shared across all pages. A slow, endless horizontal marquee reading *dal cuore · from the heart ·*
above the neon `cuore` wordmark, then "by masala diaries", then a three-column block of Where / When
/ Reserve, the reserve button, and a copyright line with the current year.

## 4. Motion system

Define these once as shared tokens and reuse them, so the whole site moves with one hand.

- **Easing:** `power3.out` for entrances, `power2.inOut` for state changes, `back.out(1.4)` for
  anything that should land with character, `elastic.out(1, 0.35)` for playful recoveries.
- **Duration:** 0.6–0.9s for entrances, 0.2–0.35s for hover and interface feedback. Nothing that
  blocks reading should run longer than 1s.
- **Stagger:** 0.06–0.1s between siblings.
- **Trigger point:** elements begin animating at `start: "top 80%"` and, unless the effect is
  explicitly reversible, run `once: true` so scrolling back up does not replay everything.
- Animate only `transform` and `opacity`. Set `will-change: transform` on elements under continuous
  scroll control and nowhere else.
- Use GSAP's `matchMedia` to register motion inside
  `(prefers-reduced-motion: no-preference)` and to swap heavy pinned effects for simple fades below
  `768px`.
- Guard against flash-of-unstyled-content: elements that JavaScript will position start
  `visibility: hidden` via a utility class, and that class resolves to visible under
  `prefers-reduced-motion: reduce` so nothing is ever permanently invisible.

**Entrance and scroll effects:**

- Section headings rise from behind an `overflow: hidden` mask, one line at a time.
- Body paragraphs fade up 24px with a per-line stagger.
- Long-form copy on About reveals word by word, tied to scroll progress via `scrub: true`, so the
  history writes itself as the reader moves down the page.
- Hero and section photographs sit inside a fixed frame and translate 15–20% slower than the page for
  a parallax offset. Nothing should ever reveal an edge or gap.
- Numbers (years on the timeline, seat counts) count up on entry.
- The mud-cloth divider strips draw in horizontally with `scaleX` from `transformOrigin: "left"`.

**Hover and pointer effects:**

- Buttons scale to 1.04 on hover and 0.95 on press.
- Menu items shift 8px right, their price slides in from the right, and the row's dividing rule wipes
  in from the left.
- On hover-capable pointers at `768px` and above, hovering a menu item or gallery caption shows a
  photograph that follows the cursor with an eased lag. Key this on `(hover: hover)` rather than
  width alone, and render plain inline images for touch and hover-incapable devices.
- Each letter of the footer wordmark wiggles and springs back on hover or tap.
- Links use an animated underline that wipes in from the left.

## 5. Three-dimensional scroll effects

These are the signature moments. Use CSS 3D transforms under GSAP control, with `perspective` around
`1000px` on the parent and `transform-style: preserve-3d` on the moving children.

1. **Hero depth pull.** The hero is layered into background photograph, mid-ground lanterns and
   foreground wordmark at different `translateZ` depths. As the page scrolls the camera appears to
   push into the room: the background scales up slightly, the mid-ground drifts, and the wordmark
   lifts toward the viewer and fades. Scrubbed to scroll progress.
2. **Dish plate rotation.** Each signature dish photograph is a circular plate that enters tilted
   away at `rotateX(55deg)` and `scale(0.8)`, then rotates flat to `rotateX(0deg)` and up to
   `scale(1)` as it scrolls into view, as though the plate is being set down on the table in front of
   you. Adjacent plates are staggered so they land in sequence.
3. **Menu card flip.** Menu category headers are cards that rotate on `rotateY` from −70° to 0° as
   they enter, hinged on their left edge, like a printed menu opening.
4. **The room, pinned.** Pin the "room" section for roughly 150% of viewport height. While pinned,
   three layers of the dining room photograph move on separate `translateZ` and parallax speeds while
   the copy advances through two or three statements. Unpin cleanly with no jump.
5. **Gallery carousel in depth.** Gallery images are arranged on a shallow arc, each one rotated
   slightly on `rotateY` and pushed back on `translateZ` by its distance from centre. Scroll rotates
   the whole arc so images swing forward into focus, gaining scale and losing blur, and recede again.
6. **Timeline tilt.** About page timeline entries arrive from alternating sides with a slight
   `rotateY` of ±12° that resolves to flat, so each milestone appears to swing into the plane of the
   page.
7. **Reservation card lift.** The booking form sits on a card that responds to pointer position with
   a subtle `rotateX`/`rotateY` tilt of no more than 6°, with a soft shadow that shifts to match, and
   returns to rest when the pointer leaves. Disable this on touch.

Every one of these must have a defined fallback: under `prefers-reduced-motion: reduce`, and on
viewports below `768px` for the pinned and arc effects, replace the 3D transform with a plain
opacity-and-translate fade to the element's final state. Never leave content unreachable because an
effect did not run.

## 6. Layout, imagery and additional design guidelines

- **Layout:** a 12-column grid with generous margins. Deliberately break the grid — full-bleed
  photographs against narrow measured text columns, asymmetric two-column splits, occasional single
  centred statements with a great deal of surrounding space. Body text stays between 60 and 75
  characters per line.
- **Rhythm:** alternate light `parchment` sections with dark `ink` sections so the page breathes and
  each movement feels distinct. Section padding runs from `6rem` on mobile to `10rem` on desktop.
- **Corners and shape:** buttons and pills are fully rounded; image frames and cards use a small
  4–8px radius. No heavy drop shadows — depth comes from motion, layering and warm tone, not from
  blur.
- **Imagery:** warm, low-key, shallow depth of field, all of it graded to the same amber warmth so no
  single photograph looks borrowed from another site. Food shot close and at an angle; rooms shot
  wide and symmetrical.
- **Iconography:** thin-stroke line icons only, used sparingly for dietary markers and contact
  details.
- **Buttons:** primary is a filled `terracotta` pill with `cream` uppercase wide-tracked text;
  secondary is an `ink` outline that fills on hover; tertiary is a text link with an animated
  underline.

## 7. Responsive, accessible and fast

- Design mobile-first and verify at 375px, 768px, 1280px and 1920px. Nothing may scroll horizontally
  at any width — clip overflow on the `body`.
- Honour `prefers-reduced-motion: reduce` throughout: no parallax, no pinning, no scrubbed motion,
  no infinite loops. Content appears in its final state.
- Colour contrast meets WCAG AA. Check `ink-soft` on `parchment` and `cream` on `terracotta`
  specifically.
- Full keyboard operability with visible focus rings that suit the palette. Pinned sections must not
  trap focus, and a skip-to-content link comes first in the DOM.
- Decorative imagery is `aria-hidden`; meaningful imagery has descriptive alt text.
- Targets: Lighthouse performance above 90 on mobile, cumulative layout shift under 0.1, and smooth
  60fps scrolling. Lazy-load below-the-fold imagery, preload the hero image, and subset the fonts.
- Per-page metadata and Open Graph tags, plus `Restaurant` and `Menu` JSON-LD structured data
  carrying the name, address, hours, phone and price range.

## 8. Before you call it done

- [ ] Home, Menu, About us, Reservations, and Contact all exist with finished copy and imagery.
- [ ] Navigation and footer are shared, and the brand details match everywhere they appear.
- [ ] All seven 3D scroll effects are implemented, each with a reduced-motion and small-screen
      fallback.
- [ ] The reservation form validates, shows a loading state, and confirms on success.
- [ ] Nothing scrolls horizontally; no element is left invisible after its animation.
- [ ] Type checks and lints clean, and the production build succeeds.

## 9. Avoid

Generic stock-photo hero collages. Purple-to-blue gradients. Bouncing arrows and pulsing badges.
Autoplaying audio or video with sound. Animation that delays reading — if a visitor has to wait for
an effect to finish before they can find the phone number, the effect is wrong. More than three type
sizes in one section. Scroll-jacking that fights the native scroll position.
