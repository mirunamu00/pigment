## Character

An unhurried, editorial calm: ink on paper, the voice in cel-drawn pictograms and pastel stages, everything else silent.

## The ten rules that define this look

1. **Warm paper, warm ink.** Page `color.surface.default`, text `color.text.primary`; `color.surface.raised` for cards, inputs, overlays; `color.surface.subtle` for bands, tracks, skeletons. Why: cool gray or pure black breaks the paper.
2. **Color is a whisper.** The warm accent is only the focus outline, a prompt's send square, the working glyph and one hero drawing fill per page. Why: it is about 0.1% of a screen.
3. **Serif headings, quiet sans.** Headings `font.family.serif` at 400 (h1 and larger) or 500, sentence case, no trailing period; everything functional `font.family.sans`; nothing above 500. Why: the serif is the editorial voice.
4. **Prose sections open with a pictogram.** Prose sections (landing, about, features) open with a `size.pictoLg` drawing, list sections (more posts, related, archive) with the h2 alone; a second opener in one viewport is `size.pictoMd`. Feature and plan cards `size.pictoMd`; a product screen one `size.pictoSm` beside the h1, never one per panel. Why: the drawings carry the personality.
5. **Pictograms are cel-drawn ink.** Brush lines of uneven weight, one off-register fill, redrawn frame by frame (`motion.duration.frame`) as one stepped animation on entering view, once, held. Why: the stepped redraw reads as drawn by hand.
6. **Product UI is staged.** Charts, media, previews, plan cards and one highlight panel per dense screen sit on a pastel stage (`color.stage.*`, `radius.stage`, 16:9 to 1:1) with faint wandering lines; text summaries never do. Why: UI is never shown bare.
7. **Motion settles slowly.** Entrances `motion.duration.rise` to `motion.duration.reveal` on `motion.easing.settle`; headings fade in word by word; nothing bounces. Why: the slow settle is the tempo.
8. **Depth from rings and tone.** 1px rings and tonal bands; hover thickens a ring to `border.width.ring`; only overlays get `shadow.overlay`. Why: shadows turn paper into plastic.
9. **Focus is warm, waiting is drawn.** Focus is a `border.width.ring` `color.focus.ring` outline at 2 to 4px offset; "working" is the written-loop glyph inside the control that started it, only while a real request is pending; never a spinner. Why: waiting stays hand-made and honest.
10. **Leave room.** Wide section gaps (Spacing), text max `size.measure`, headings `size.measureHeading`. Why: emptiness lets the drawings speak.

## Never

- Cool grays, pure black or white page grounds; gradients, textures, noise, blur, glass.
- All-caps, title-case or italic headings.
- Other illustration styles, emoji, 3D, stock art, or any drawing traced or copied.
- A pictogram that tweens, shows a blank frame, loops after drawing (boil excepted), or sits in a cell, row, field, button, nav, badge or toast.
- Detecting automation or screenshots (`navigator.webdriver`, headless flags) to change any animation.
- Artificial delays to show a working state; a glyph beside a button instead of inside it; a second `role="status"` region next to an existing one.
- A star, asterisk, burst or spark shape anywhere.
- Spinners, progress rings, skeleton shimmer, bounce or overshoot easing, parallax, hover scale-up.
- Shadows on controls, rows or resting cards; borders over 2px.
- Pastel fills on buttons, badges, rows or the page; a stage that breaks its Limits.
- A plate or stage holding only an icon or nothing (a flat color block); a stage flatter than 16:9; a drawing under 45% of its stage's or plate's width.
- Horizontal scroll at 390px; a row action pushed off-screen; exclamation marks or hype words in copy.

## Signature elements

Once at the app root: three seeds of one brush filter.

```js
const brush = [3, 8, 14].map((seed, i) => `<filter id="inkleaf-brush-${i}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="${seed}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G"/></filter>`).join("");
document.body.insertAdjacentHTML("afterbegin", `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${brush}</defs></svg>`);
```

### Cel-drawn ink pictogram

**What.** One everyday object in brush-ink lines (`color.pictogram.ink`) of uneven weight plus one flat
off-register fill (`color.pictogram.fill` or `fillAlt`; `color.pictogram.accent` only on the hero), filling about 60% of a square
box on empty paper: no ground line, frame or background.

**Recipe.** 120 x 120 viewBox:
1. Subject: write the screen's task as a verb (find, pay, invite, file), list three things a person holds to do
   it off-screen in this app's domain, and take the clearest silhouette the app has not drawn yet. Never vehicles or
   toys (boat, kite, balloon), never a subject this spec names. At least half of each app's drawings, headers
   included, show a hand gripping, placing or pointing at the object: rounded palm, 3 or 4 curved "noodle"
   fingers without knuckles or nails, the thumb one stroke.
2. Draw the defining feature first, slightly oversized, so it names the subject at 48px (a watering can's spout
   and rose, a coin purse's kiss-lock clasp, a tote's two strap loops rising from its top). 5 to 14 strokes, each
   one open path of 1 to 3 cubic curves; widths 2.8, 3.4 or 4.0 units; some joins overshoot 1 to 2 units, others
   stop short. No straight run over 15 units: a rectangular body is 2
   to 4 bowed strokes with one overshooting corner, never one rectangle path.
3. One closed fill path roughly tracing the main body, under the lines, shifted 3 right and 2 down.
4. At `size.pictoSm` draw a simpler version: 5 to 7 strokes, widths 4.0 to 5.0, fill shifted 6 and 5 (the
   `picto--sm` class), so the brush weight and the off-register edge (at least 2px) survive at 48px. Silhouette
   test: view every drawing at 48px and name it in one word; if the word is not the subject (a mirror read as a
   lollipop, a purse as a pot), enlarge the defining feature and redraw.
5. Frames: strokes in drawing order (contour, details, hand), fill from about 60% on, then 3 "boil" frames on
   alternating brush seeds; 12 to 24 frames. They sit in one strip (frame k at x = k x 120); one stepped animation
   slides it, so exactly one frame ever shows.

```js
// Hand construction demo (object, palm, thumb, fingers, wrist); never ship this subject.
const handWithEgg = { fillAfter: 2, fill: "M60 22 C74 22 82 40 82 52 C82 64 72 70 60 70 C48 70 38 64 38 52 C38 40 46 22 60 22 Z", strokes: [
  ["M61 21 C47 21 37 40 38 53 C39 64 48 70 58 70", 3.4], ["M60 22 C73 23 82 39 82 51 C82 60 77 66 70 69", 4.0],
  ["M28 66 C30 84 44 96 64 95 C80 94 90 86 94 74", 4.0], ["M28 66 C24 58 30 52 36 57 C40 61 41 66 44 70", 3.4],
  ["M94 74 C100 70 101 62 94 61 C88 60 84 66 80 68", 2.8], ["M93 84 C100 82 102 74 95 72", 2.8],
  ["M88 93 C95 92 97 85 91 82", 2.8], ["M48 95 C46 102 44 108 41 114", 3.4], ["M76 93 C78 101 80 107 83 113", 3.4] ] };
// Inner HTML of <svg class="picto" viewBox="0 0 120 120" aria-hidden="true">
function celStrip({ strokes, fill, fillAfter }, boil = 3) {
  const counts = strokes.map((_, i) => i + 1).concat(Array(boil).fill(strokes.length));
  const n = counts.length;
  const frames = counts.map((c, k) => {
    const ink = strokes.slice(0, c).map(([d, w]) => `<path d="${d}" stroke-width="${w}"/>`).join("");
    const paint = c > fillAfter ? `<path class="picto-fill" d="${fill}"/>` : "";
    return `<g transform="translate(${k * 120} 0)" filter="url(#inkleaf-brush-${(n - 1 - k) % 3})">${paint}<g class="picto-ink">${ink}</g></g>`;
  });
  return `<g class="cel-strip" style="--n:${n}">${frames.join("")}</g>`;
}
// Unless reduced motion: add "is-ready" on mount; add "is-playing" at once if 30% is already in view, otherwise
// when it gets there (IntersectionObserver, threshold 0.3, unobserve after). Never check for automation.
```

```css
.picto { display: block; width: var(--size-picto-lg); aspect-ratio: 1; overflow: hidden; color: var(--color-pictogram-ink); }
.picto-ink { fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
.picto-fill { fill: var(--picto-fill, var(--color-pictogram-fill)); transform: translate(3px, 2px); }
.picto--sm { width: var(--size-picto-sm); } .picto--sm .picto-fill { transform: translate(6px, 5px); }
.cel-strip { transform: translateX(calc((1 - var(--n)) * 120px)); } /* final frame: no script, reduced motion */
.picto.is-ready .cel-strip { transform: translateX(0); } /* first stroke, never blank */
.picto.is-playing .cel-strip { animation: cel-run calc(var(--n) * var(--motion-duration-frame)) steps(var(--n), jump-none) forwards; }
.picto.is-boiling .cel-strip { animation: cel-boil calc(3 * var(--motion-duration-frame)) steps(3, jump-none) infinite; }
@keyframes cel-run { from { transform: translateX(0); } to { transform: translateX(calc((1 - var(--n)) * 120px)); } }
@keyframes cel-boil { from { transform: translateX(calc((3 - var(--n)) * 120px)); } to { transform: translateX(calc((1 - var(--n)) * 120px)); } }
@media (prefers-reduced-motion: reduce) {
  .picto:is(.is-ready, .is-playing, .is-boiling) .cel-strip { animation: none; transform: translateX(calc((1 - var(--n)) * 120px)); } }
```

Frameworks: render the strip from the same data, toggle classes in an effect. Hero:
`style="--picto-fill: var(--color-pictogram-accent)"`.

**Motion.** The strip steps once and holds (CSS above); boil only while real work is pending; reduced motion: final frame.

**Where.** Section openers (rule 4; centered, `space.24` above the h2); hero (`size.pictoHero`, the accent fill;
`size.pictoXl` under `breakpoint.md`); feature, plan and onboarding cards (`size.pictoMd`, top-left); product
page headers (`size.pictoSm`, see Spacing); empty states and success confirmations (`size.pictoLg`); errors and
not-found (`size.pictoXl`); in place of a missing image, on a drawing stage or plate (50% of its width, see Pastel
stage); full-screen loading (boil).

**Limits.** One per section, except a category's drawing repeated on its plates in a grid (final frame: no
state classes); per-viewport openers per rule 4; one accent fill per page. Never scattered, tiled or a background.
Avoid the subjects this style is best known for: a sprout in a mound, stacked or dropped blocks, a hand catching a ball or globe, a toolbox, tiered plants, a gauge.

### Pastel stage with wandering lines

**What.** A clipped panel in one `color.stage.*` color, `radius.stage` (hero `radius.stageLg`), padding
`space.48` to `space.64`, crossed by 3 to 6 faint freehand lines that run off its edges; cards on it get
`shadow.float`, optionally over a tray (`radius.tile`, a second stage color, 90% wide, `space.16` higher). Proportion 16:9 to 1:1, never a banner. A **drawing stage** (featured
post, article or product without an image) is 4:3, its drawing centered at 50% of the inner width. A **plate** is
the quiet sibling for grid images: stage color, `radius.tile`, no lines, 4:3, holding the photo or, without one,
its category's drawing at 50% width.

**Recipe.**

```html
<figure class="stage" style="--stage: var(--color-stage-sage)">
  <svg class="stage-lines" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
    <path d="M-20 70 C60 30 120 120 210 80 S350 20 420 60"/>
    <path d="M-10 240 C80 200 150 280 260 230 S360 170 430 210"/>
    <path d="M300 -20 C280 60 360 110 330 180 S300 280 350 330"/>
  </svg>
  <div class="stage-content"><!-- chart, raised card, screenshot or pictogram --></div>
</figure>
```

```css
.stage { position: relative; isolation: isolate; overflow: hidden; display: grid; align-items: center; aspect-ratio: 16 / 9; /* content may grow it to 1:1 */
  margin: 0; padding: var(--space-48); border-radius: var(--radius-stage); background: var(--stage); }
.stage-lines { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
.stage-lines path { fill: none; stroke: color-mix(in srgb, var(--stage) 70%, var(--color-stage-line-mix)); stroke-width: 8; stroke-linecap: round; vector-effect: non-scaling-stroke; opacity: var(--opacity-stage-line); }
.stage-content > .card { box-shadow: var(--shadow-float); }
.stage--drawing { aspect-ratio: 4 / 3; }
.stage--drawing .stage-content, .plate { display: grid; place-items: center; }
.stage--drawing .picto, .plate .picto { width: 50%; }
.plate { aspect-ratio: 4 / 3; overflow: hidden; border-radius: var(--radius-tile); background: var(--stage); }
.plate img { display: block; width: 100%; height: 100%; object-fit: cover; }
@media (max-width: 833px) { .stage { padding: var(--space-24); border-radius: var(--radius-card); } }
```

Each line starts outside the box and leaves through another edge or ends in a free tail; smooth curves, 1 to 3
gentle bumps, no corners or closed shapes, at most one crossing; a new set per stage. Colors rotate down a page:
sage, lilac, apricot, lake; neighbors never match; `color.stage.lake` only behind a card or drawing.

**Motion.** Block rise (Motion); trays 100ms later. On a tab or step change the inner card rises `motion.distance.raise`
over `motion.duration.raise`. Lines never move. Reduced motion: no rise.

**Where.** Hero previews; the blog home featured post and an article's featured image (drawing stage without an
image); a dashboard's main chart (sage); a product detail image (drawing stage without one); plan cards (lilac); a
first-run empty state (lilac); the not-found drawing (apricot). Plates: card-grid images (products, posts).

**Limits.** A stage holds a chart, media, a pictogram, plan cards or a ghosted preview, never a text-only
description, a key-value summary, an order summary or a form. Its content fills it: a raised card spans at least
60% of the inner width, charts or media 100%, a drawing 45 to 60%; never an icon alone. One stage per viewport on
dense screens (dashboard, table, settings, cart); never the page background; no gradients.

### Serif headline that writes itself in

**What.** h1 and h2 in `font.family.serif`, `text-wrap: balance`, max `size.measureHeading`, sentence case,
fading in word by word.

**Recipe.**

```js
function writeIn(h) {
  const words = h.textContent.trim().split(/\s+/);
  h.setAttribute("aria-label", words.join(" "));
  h.replaceChildren(...words.flatMap((w, i) => {
    const s = document.createElement("span");
    s.className = "w"; s.ariaHidden = "true"; s.style.setProperty("--i", i); s.textContent = w;
    return i ? [" ", s] : [s];
  }));
  h.classList.add("write-in");
  requestAnimationFrame(() => requestAnimationFrame(() => h.classList.add("is-in")));
}
```

```css
.write-in .w { opacity: 0; transition: opacity var(--motion-duration-reveal) var(--motion-easing-settle) calc(var(--i) * var(--motion-duration-stagger)); }
.write-in.is-in .w { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .write-in .w { opacity: 1; transition: none; } }
```

Frameworks: render the spans directly. Text, id and accessible name stay identical so anchors and tests match;
headings with links or markup stay static.

**Motion.** h1 on route load, h2 and empty-state titles at 30% in view; once; word delay = index x
`motion.duration.stagger`. The lede and actions rise `motion.distance.riseSm`, 200ms later. Reduced motion: instant.

**Where.** The h1 of every screen; content h2s; empty-state titles. Other serif titles stay static.

**Limits.** At most 12 words; never body, labels, numbers or buttons.

### Written-loop working glyph

**What.** Three cursive loops, 16px high, in `color.accent.glyph`, writing themselves in 12 steps, holding 2 and
clearing in 2 (`motion.duration.glyph`), with a gerund ("Saving"). Companion: the breathing dot for running list
items. Done: a 16px check-circle and "Saved".

**Recipe.**

```html
<span class="working"><svg class="glyph" viewBox="0 0 24 16" aria-hidden="true"><path pathLength="1"
  d="M2 12 C6 12 8 3 6 3 C3 3 5 13 10 12 C14 11 15 3 13 3 C10 3 12 13 17 12 C20 11 22 6 22 6"/></svg>Saving</span>
```

```css
.working { display: inline-flex; align-items: center; gap: var(--space-8); font-size: var(--font-size-small); color: var(--color-text-secondary); }
.btn .working { font-size: inherit; color: inherit; }
.glyph { width: calc(var(--size-icon) * 1.5); height: var(--size-icon); overflow: visible; }
.glyph path { fill: none; stroke: var(--color-accent-glyph); stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round;
  stroke-dasharray: 1; stroke-dashoffset: 1; animation: glyph-write var(--motion-duration-glyph) linear infinite; }
@keyframes glyph-write {
  0% { stroke-dashoffset: 1; animation-timing-function: steps(12, jump-start); }
  75%, 87.5% { stroke-dashoffset: 0; animation-timing-function: steps(2, jump-start); }
  100% { stroke-dashoffset: -1; } }
.dot-breathe { display: inline-block; width: var(--space-6); height: var(--space-6); border-radius: var(--radius-full); background: currentColor;
  animation: breathe var(--motion-duration-breathe) var(--motion-easing-hover) infinite; }
@keyframes breathe { 0%, 100% { opacity: var(--opacity-breathe-low); } 50% { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .glyph path { animation: none; stroke-dashoffset: 0; } .dot-breathe { animation: none; } }
```

**Motion.** Stepped, never tweened or rotated, only while the request is pending. Reduced motion: static line, steady dot.

**Where.** Inside the submitting button (Button, Loading); page and panel loading, centered; background-task
toasts; inside a loading search field, right; breathing dots in status cells and job lists. Announce in the
screen's one `role="status"`.

**Limits.** One glyph per screen, other running items use the dot; never decorative or idle; a synchronous action goes straight to its result.

### Ink-and-paper ring controls

**What.** Ink, paper and stone controls drawn with box-shadow rings instead of borders, so hover thickens a ring
without moving anything; press scales to 0.985; focus-visible is the warm outline.

**Recipe.**

```css
.btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-8); height: var(--size-control); padding: 0 var(--space-16);
  border: 0; border-radius: var(--radius-control); font: var(--font-weight-medium) var(--font-size-ui)/1 var(--font-family-sans); white-space: nowrap;
  transition: box-shadow var(--motion-duration-hover) var(--motion-easing-hover), color var(--motion-duration-press) var(--motion-easing-hover),
    background-color var(--motion-duration-press) var(--motion-easing-hover), transform var(--motion-duration-press) var(--motion-easing-hover); }
.btn--primary { background: var(--color-action-primary); color: var(--color-text-on-action); box-shadow: 0 0 0 0 var(--color-action-primary-hover); }
.btn--primary:hover { box-shadow: 0 0 0 var(--border-width-ring) var(--color-action-primary-hover); }
.btn--secondary { background: var(--color-action-secondary); color: var(--color-text-secondary); box-shadow: inset 0 0 0 var(--border-width-hairline) var(--color-border-control); }
.btn--secondary:hover { color: var(--color-text-primary); box-shadow: inset 0 0 0 var(--border-width-ring) var(--color-border-strong); }
.btn--tertiary { background: var(--color-action-tertiary); color: var(--color-text-primary); }
.btn--tertiary:hover { background: var(--color-action-tertiary-hover); }
.btn:active:not(:disabled) { transform: scale(0.985); }
:focus-visible { outline: var(--border-width-ring) solid var(--color-focus-ring); outline-offset: 2px; }
.btn:focus-visible { outline-offset: 4px; }
.send { width: var(--size-control); padding: 0; background: var(--color-action-send); color: var(--color-text-inverse); }
```

**Motion.** Per Interaction. Reduced motion: no scale.

**Where.** Every button, chip, input and select; row actions secondary `size.controlSm`; filter chips tertiary,
selected ink; the send square only ends a prompt field.

**Limits.** One ink primary per region (card, dialog, form, toolbar).

## Color use

- Text: `primary` headings, body, values; `secondary` ledes, descriptions, resting nav; `tertiary` meta,
  placeholders, table heads.
- Inline links: `color.text.primary`, 1px `color.border.strong` underline at 3px offset; hover underline ink.
- Status colors only as badge text with a dot, field errors, stat changes and the danger button; never fills.
  Success is an ink check-circle plus words.
- Charts: bars `color.chart.rest`, current bar `color.chart.ink`, one series `color.chart.highlight`; lines 1.5px;
  at most 3 `color.border.default` gridlines, no frame; labels caption, tertiary, `tabular-nums`.

## Typography

- h1, serif 400, `tight`: hero `clamp(var(--font-size-h3), 6vw, var(--font-size-display))`; content pages
  `clamp(var(--font-size-h3), 5vw, var(--font-size-h1))`; article title `h2`.
- Product screen h1 (dashboard, list, settings, store, cart): serif 400, `h3` (`h4` under `breakpoint.md`), `heading`, identical in every app. Its lede: sans 400 `body`, `color.text.secondary`, `space.8` below.
- Content h2: serif 500, `clamp(var(--font-size-plan), 5vw, var(--font-size-h2))`, `heading`. Article prose h2 `h4`, h3 `h5`. Panel h2, feature title: 500 `h4`. Card, group, FAQ titles: 500 `h5`. Plan names, pull quotes: 400 `plan`, `tight`.
- Content lede: sans 400, `lede`, `color.text.secondary`, max `size.measure`. Body `body`; article prose `bodyLg`.
- Controls `ui` (labels 500); table cells `dense`, `title`; hints `small`; meta `caption`; table heads, eyebrows `micro`, 500, uppercase, tracking `micro`, tertiary; code mono `small`.

One h1 per screen. Numbers are sans `tabular-nums`, never serif.

## Spacing and density

- Content sections `space.96` apart (`space.128` from `breakpoint.xl`, `space.64` under
  `breakpoint.md`); landing hero top padding `space.128` (`space.64` mobile).
- Section opener: pictogram, `space.24`, h2, `space.16`, lede, `space.32`, actions (gap `space.12`).
- Product screen header, same in every app: padding `space.48` top, `space.32` bottom;
  `grid-template-columns: var(--size-picto-sm) 1fr auto`, gap `space.16`; row one drawing, h1, actions; the lede
  `grid-column: 1 / -1`, starting at the drawing's left edge (the content edge), never under the h1 text. Under
  `breakpoint.md`: one column, drawing above the h1.
- Panels `space.24` apart; rows `size.rowDense`.
- Forms: fields `space.24` apart, label to control `space.8`, hint `space.6`, actions `space.32` below.
- Dense never goes below `size.rowDense`, `font.size.dense` or `size.touch` targets.

## Shape and depth

- Radius grows with the surface: `radius.badge` badge, `chip`, `control` button and input, `tile` plate and toast,
  `card`, `stage` stage and dialog, `stageLg` hero stage.
- Elevation: flat at rest; `shadow.hover` hovered linked card; `shadow.float` cards on a stage, sticky bars;
  `shadow.overlay` dialogs, menus, toasts (dark: `shadow.overlayNight` plus a 1px `color.border.default` ring).

## Motion

- Site header, first load: translateY -`motion.distance.rise` → 0 and fade, `motion.duration.reveal`, `settle`.
- Block rise, 15% in view, once: opacity and translateY `motion.distance.riseSm` (text) or `rise` (cards, media) → 0, `motion.duration.rise`, `settle`; siblings +100ms, max 4.
- Content swap on tab or step change: translateY `motion.distance.raise` → 0 and opacity, `motion.duration.raise`, `settle`.
- Disclosure and menu open: opacity and `grid-template-rows: 0fr → 1fr` (menus translateY -4px), `motion.duration.open`, `motion.easing.quart`; close 60% as long.
- Dialog: scrim fade; panel translateY `motion.distance.overlay` → 0, `motion.duration.open`, `quart`.
- Toast: rise `motion.distance.rise` over `motion.duration.raise`, `settle`; leave by fading over `motion.duration.open`.

Below-the-fold blocks start hidden (opacity 0, translated) and rise when 15% enters view; anything in view on load
plays at once; the observer fires on entry, so nothing stays hidden after it scrolls in. Never start blocks in their
final state, never special-case screenshots; only reduced motion renders final states at once. Never animated:
rows, backgrounds, stage lines, widths, scroll. Product screens: block rise on a route's first render only.
Reduced motion, globally:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: var(--motion-duration-instant) !important; animation-delay: 0s !important;
    animation-iteration-count: 1 !important; transition-duration: var(--motion-duration-instant) !important; transition-delay: 0s !important; }
}
```

## Interaction

Focus-visible is always the warm outline (offset 4px on buttons and linked cards, 2px elsewhere, -2px on rows and
menu items), instant. Rings `motion.duration.hover`, colors and press `motion.duration.press`, on `motion.easing.hover`.

- Buttons, chips: the ring-controls recipe; press 0.985; a selected chip is ink. Ghost on the inverse band: hover
  fill `color.surface.inverseRaised`.
- Nav link: secondary → primary over `motion.duration.nav`, `motion.easing.expo`; dropdown chevron rotates 180° on open.
- Linked card: hover `shadow.hover` and title underline; no press. Fields, toggles: per component.
- Segmented tab pill slides `motion.duration.open`, `quart`; FAQ "+" rotates 45° open.
- Table row, menu item: hover `color.surface.hover` (on `color.surface.raised`, `color.surface.subtle`, so it
  shows); a selected row is `color.surface.subtle` with a 2px inset ink rule at the left.

Disabled: `color.text.disabled`, rings `color.border.default`, no hover or press, `cursor: not-allowed`.

## Layout adaptation

- One container: max `size.container`, centered, side padding `clamp(var(--space-20), 4vw, var(--space-64))`;
  12 columns from `breakpoint.lg`, 8 from `breakpoint.md`, 4 below; gaps `space.24` (`space.32` from `breakpoint.xl`).
- `html, body { overflow-x: clip }`; grid and flex children `min-width: 0`.
- Card grids `align-items: start`; same-kind rows (plans, products, stats) share a height.
- Product-screen panel rows: `align-items: stretch`, each title inside its own card (on a stage, inside the raised
  card), so neighbors share edges.
- Forms one column, max `size.form`; short pairs side by side from `breakpoint.md`; below it actions stack full
  width, primary first.
- Cart and checkout: items, then the form (max `size.form`), in the main column; the summary a plain card in a
  side column (4 of 12) from `breakpoint.lg`, sticky at `size.header` + `space.24`; below, after the items.
- Store grid: 3 or 4 columns, 2 under `breakpoint.md` with card body padding `space.12`.
- Blog home featured post: a drawing stage (never a plate) with the post's drawing, beside the text from
  `breakpoint.lg` (stage 7 of 12 columns); below that the stage comes first; post cards follow as media cards.
- Article: the featured stage spans the text column; table of contents in a side column from `breakpoint.lg`;
  below it, a collapsed "On this page" disclosure after the lede and featured stage, never above the h1. A
  figure with no image is omitted; diagrams and screenshots sit on a stage; never a placeholder plate in prose.

## Applying the concept

Dense screens get less, never nothing.

| Context | What it uses | How strongly |
| --- | --- | --- |
| Landing hero | `size.pictoHero` accent drawing or a hero stage with UI | Full |
| Content section | Prose: centered `size.pictoLg` drawing, h2 write-in, lede, one action; lists: h2 alone | Rule 4 |
| Product page header | `size.pictoSm` drawing (once per session), h1 write-in | Small, every screen |
| Card grid | `size.pictoMd` in feature and plan cards; plates with photos or category drawings | One per card |
| Form | Header drawing; glyph in the pending submit; `size.pictoLg` confirmation | Light |
| Settings | Header drawing, serif group titles, glyph in save, "Saved" in the status region; plans on a lilac stage | Light |
| Dashboard | Header drawing; main chart on a sage stage; breathing dots for running jobs | One stage |
| Data table | Nothing drawn inside; serif group rows, breathing dots | Type and loops |
| Store | Header drawing; plates; detail on a stage; empty-cart and confirmation drawings | Plates, one stage |
| Article or blog | Masthead `size.pictoLg`; featured post or image on a stage (a drawing stage without an image); plates; serif pull quotes | One stage |
| Empty state | `size.pictoLg` drawing, title write-in, one line, one button | Strong |
| Error, not found | `size.pictoXl` drawing of something lost, serif h1, two actions | Strong |
| Loading | Inline glyph; full screen boiling drawing; static skeletons | One glyph |

## Imagery and icons

- Icons: outlines, 1.5px stroke, round caps, `currentColor`, `size.icon` dense, `size.iconLg` elsewhere. Only filled icon: the 16px check-circle (ink circle, `color.surface.raised` tick); unavailable
  is a thin cross in `color.text.tertiary`.
- Illustration is only the pictogram. Photos warm, unfiltered; screenshots and videos sit on stages.
- Missing images: a plate with the category's drawing (one per category, repeated within it) or a drawing stage
  (Pastel stage); a grid without categories drops the media slot. Never an icon on a plate or a gray box.

## Accessibility

- Text 4.5:1 or more (body 7:1); control outlines 3:1 (`color.border.check`); visible labels; targets `size.touch`.
- Drawings `aria-hidden` unless meaningful (then `role="img"`, `aria-label`); one `role="status"` region per screen (reuse an existing one); errors
  `role="alert"`.
