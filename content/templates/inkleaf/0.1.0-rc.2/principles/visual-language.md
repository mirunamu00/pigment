## Character

An unhurried, editorial calm: ink on paper, the voice in cel-drawn pictograms and pastel stages, everything else silent.

Use `color.*` and the non-color primitives, never `palette.*`. `space.16` = 16px.

## The ten rules that define this look

1. **Warm paper, warm ink.** Page `color.surface.default`, text `color.text.primary`; `color.surface.raised` for cards, inputs, overlays; `color.surface.subtle` for bands, tracks, skeletons. Why: cool gray or pure black breaks the paper.
2. **Color is a whisper.** The warm accent appears only as the focus outline, a prompt's send square (`color.action.send`), the working glyph and one hero drawing fill per page; never on headers, links, main buttons, badges, icons or charts. Why: it is about 0.1% of a screen.
3. **Serif headings, quiet sans.** Headings `font.family.serif` at 400 (h1 and larger) or 500, sentence case, no trailing period; everything functional `font.family.sans`; nothing above 500. Why: the serif is the editorial voice.
4. **Every section opens with a pictogram.** `size.pictoLg` above each content-page h2, `size.pictoMd` in feature and plan cards; a product screen gets one, `size.pictoSm` beside its h1, never one per panel. Why: the drawings carry the personality.
5. **Pictograms are cel-drawn ink.** Brush lines of uneven weight, one off-register fill, redrawn frame by frame (`motion.duration.frame`) as one stepped animation on entering view, once, held. Why: the stepped redraw reads as drawn by hand.
6. **Product UI is staged.** Charts, media, previews, plan cards and one highlight panel per dense screen sit on a pastel stage (`color.stage.*`, `radius.stage`) with faint wandering lines; text summaries never do. Why: UI is never shown bare.
7. **Motion settles slowly.** Entrances `motion.duration.rise` to `motion.duration.reveal` on `motion.easing.settle`; headings fade in word by word; nothing bounces or scales up. Why: the slow settle is the tempo.
8. **Depth from rings and tone.** 1px rings and tonal bands; hover thickens a ring to `border.width.ring`; card hover at most `shadow.hover`; only overlays get `shadow.overlay`. Why: shadows turn paper into plastic.
9. **Focus is warm, waiting is drawn.** Focus is a `border.width.ring` `color.focus.ring` outline at 2 to 4px offset; "working" is the written-loop glyph inside the control that started it, only while a real request is pending; never a spinner. Why: waiting stays hand-made and honest.
10. **Leave room.** Content sections `space.96` apart, content max `size.container`, text max `size.measure`, headings max `size.measureHeading`. Why: emptiness lets the drawings speak.

## Never

- Cool grays, pure black or white page grounds; gradients, textures, noise, blur, glass.
- All-caps, title-case or italic headings.
- Other illustration styles, emoji, 3D, stock art, or any drawing traced or copied.
- A pictogram that tweens, animates per frame element instead of as one strip, shows a blank frame, loops after drawing (loading boil excepted), or sits in a cell, row, field, button, nav or badge.
- Detecting automation or screenshots (`navigator.webdriver`, user agent, headless flags) to skip, shorten or change any animation.
- Artificial delays to show a working state; a glyph beside a button instead of inside it; a second `role="status"` region next to an existing one.
- A star, asterisk, burst or spark shape anywhere.
- Spinners, progress rings, skeleton shimmer, bounce or overshoot easing, parallax, hover scale-up.
- Shadows on buttons, inputs, chips, rows or resting cards; borders over 2px.
- Pastel fills on buttons, badges, rows or the page; text, fields, key-value or order summaries on a stage; a small card adrift in a big stage; two stages in one viewport of a dense screen.
- A grid of one centered icon repeated as image placeholders.
- Browser-default chrome: blue focus glow, default select arrow, checkbox or radio, search clear button.
- Horizontal scroll at 390px; a row action pushed off-screen; exclamation marks or hype words in copy.

## Signature elements

Shared setup, once at the app root: three seeds of one brush filter.

```js
const brush = [3, 8, 14].map((seed, i) => `<filter id="inkleaf-brush-${i}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="${seed}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G"/></filter>`).join("");
document.body.insertAdjacentHTML("afterbegin", `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${brush}</defs></svg>`);
```

### Cel-drawn ink pictogram

**What.** One everyday object, often held, placed or pointed at by a simple hand, in brush-ink lines
(`color.pictogram.ink`) of uneven weight, plus one flat off-register fill (`color.pictogram.fill` or `fillAlt`;
`color.pictogram.accent` only on the page's hero drawing). It fills about 60% of a square box on empty paper: no
ground line, frame or background.

**Recipe.** In a 120 x 120 viewBox:
1. A new subject for each use (list under Where). Hands: a rounded palm, 3 or 4 curved "noodle" fingers without
   knuckles or nails, the thumb one stroke.
2. 5 to 14 strokes, each one open path of 1 to 3 cubic curves; widths 2.8, 3.4 or 4.0 units; some joins overshoot
   1 to 2 units, others stop short. No straight segment longer than 15 units: boxy subjects (notebook, box, card,
   tag, bag) get bowed edges and one corner that overshoots.
3. One closed fill path roughly tracing the main body, under the lines, shifted 3 right and 2 down.
4. At `size.pictoSm` draw a simpler version: 5 to 7 strokes, widths 4.0 to 5.0, fill shifted 6 and 5 (the
   `picto--sm` class), so the brush weight and the off-register edge (at least 2px) survive at 48px.
5. Frames: strokes in drawing order (contour, details, hand), the fill from about 60% on, then 3 "boil" frames of
   the finished drawing, neighbors on different brush seeds; 12 to 24 frames = 1 to 2 seconds; the last uses seed 0.
6. Frames sit side by side in one strip (frame k at x = k x 120) in the clipped svg; one stepped animation slides
   it, so exactly one frame ever shows.

```js
// Construction demo: object, palm, thumb, noodle fingers, wrist. Never ship this subject.
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

In a framework, render the strip from the same data and toggle classes from an effect. Hero:
`style="--picto-fill: var(--color-pictogram-accent)"`. A meaningful drawing gets `role="img"` and an `aria-label`.

**Motion.** One animation per drawing: the strip steps one frame every `motion.duration.frame`, no tweening,
once, `forwards`; the final frame holds. Loading: `is-boiling` cycles the 3 boil frames while real work is
pending. Reduced motion: final frame, no animation.

**Where.** Section openers (`size.pictoLg`, centered, `space.24` above the h2); hero (`size.pictoHero`, the
accent fill; `size.pictoXl` under `breakpoint.md`); feature, plan and onboarding cards (`size.pictoMd`, top-left);
product page headers (`size.pictoSm`, see Spacing); empty states and success confirmations (`size.pictoLg`);
errors and not-found (`size.pictoXl`); a product detail without an image (`size.pictoXl`, directly on the stage);
full-screen loading (boil). Subjects: empty search, a hand with a magnifier; empty list, an open drawer; not found,
a hand with a folded map; error, a tipped mug; success, an envelope in a hand; dashboard, a watering can;
settings, a hand turning a dial; billing, a coin purse; profile, a hand mirror; store, a paper bag.

**Limits.** One per section; at most one drawing of `size.pictoLg` or larger per viewport; one accent fill per
page. Never in cells, rows, fields, buttons, nav, badges or toast lists; never scattered, tiled or a background.
Avoid the subjects this style is best known for: a sprout in a mound, stacked or dropped blocks, a hand catching a
ball or globe, a toolbox, tiered plants, a gauge.

### Pastel stage with wandering lines

**What.** A clipped panel in one `color.stage.*` color, `radius.stage` (hero `radius.stageLg`), padding
`space.48` to `space.64`, crossed by 3 to 6 faint freehand lines (8px, a lighter tone of the stage) that run off its
edges; content per Limits, cards with `shadow.float`; optionally a tray behind the card (`radius.tile`, a second
stage color, 90% wide, `space.16` higher). A **plate** is the quiet sibling for grids: stage color and `radius.tile`, no lines.

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
.stage { position: relative; isolation: isolate; overflow: hidden; margin: 0; padding: var(--space-48); border-radius: var(--radius-stage); background: var(--stage); }
.stage-lines { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
.stage-lines path { fill: none; stroke: color-mix(in srgb, var(--stage) 70%, var(--color-stage-line-mix)); stroke-width: 8; stroke-linecap: round; vector-effect: non-scaling-stroke; opacity: var(--opacity-stage-line); }
.stage-content > .card { box-shadow: var(--shadow-float); }
.plate { border-radius: var(--radius-tile); background: var(--stage); }
@media (max-width: 833px) { .stage { padding: var(--space-24); border-radius: var(--radius-card); } }
```

Each line starts outside the box and leaves through another edge or ends in a free tail; smooth curves, 1 to 3
gentle bumps, no corners or closed shapes, at most one crossing; a new set per stage. Colors rotate down a page:
sage, lilac, apricot, lake; neighbors never match; `color.stage.lake` only behind a card or drawing.

**Motion.** 15% in view, once: opacity 0 → 1, translateY `motion.distance.rise` → 0, `motion.duration.rise`,
`motion.easing.settle`; trays 100ms later. On a tab or step change the inner card rises `motion.distance.raise`
over `motion.duration.raise`. Lines never move. Reduced motion: no rise.

**Where.** Hero previews; an article's featured image; a dashboard's main chart (sage); a product detail image;
plan cards (lilac); a first-run empty state (lilac); the not-found drawing (apricot). Plates: grid images, avatars.

**Limits.** A stage holds a chart, media, a pictogram, plan cards or a ghosted preview, never a text-only
description, a key-value summary, an order summary or a form. Its content fills it: a raised card spans at least
60% of the inner width and charts or media 100%; no small card adrift in a big stage. One stage per viewport on
dense screens (dashboard, table, settings, cart); never the page background; no gradients.

### Serif headline that writes itself in

**What.** h1 and h2 in `font.family.serif`, `text-wrap: balance`, max `size.measureHeading`, sentence case,
fading in word by word.

**Recipe.**

```js
// Enhancement only: without script the heading is simply visible.
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

In a framework, render the spans directly. Text content, id and accessible name stay identical to the plain text
so anchors and tests still match; headings containing links or markup stay static.

**Motion.** h1 on route load, h2 and empty-state titles at 30% in view; once; word delay = index x
`motion.duration.stagger`. The lede and actions rise `motion.distance.riseSm`, 200ms later. Reduced motion: instant.

**Where.** The h1 of every screen; content h2s; empty-state titles. Serif but static: card, panel, dialog and
group titles, plan names, FAQ questions, quotes.

**Limits.** Only h1, h2 and empty-state titles, at most 12 words; never body, labels, numbers, buttons or tables.

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

**Motion.** Infinite while the request is pending, stepped, never tweened or rotated; removed the moment it
settles. Reduced motion: the full static line, a steady dot.

**Where.** Submitting buttons: glyph and gerund replace the label inside the button, width held, `aria-busy`;
page and panel loading (centered); background-task toasts; a search field while results load (inside, right);
status cells and job lists (breathing dot). Announce in the screen's one `role="status"`.

**Limits.** One glyph per screen, other running items use the dot; never decorative or idle. Never add a delay to
show it: a synchronous action goes straight to its result. Never a rotating shape, star, asterisk, burst or spark.

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

**Motion.** Ring `motion.duration.hover`, color and fill `motion.duration.press`, both `motion.easing.hover`;
press scale `motion.duration.press`; focus outline instant. Reduced motion: no scale.

**Where.** Every button, chip, input and select; header, table-row (secondary, `size.controlSm`), dialog, form
and settings actions; filter chips (tertiary, selected ink). The send square only ends a prompt or message field.

**Limits.** One ink primary per region (card, dialog, form, toolbar); no pastel or accent fills except the send
square; no shadows; rings at most `border.width.ring`.

## Color use

- Surfaces: ground → band or raised section → ringed card; two levels before an overlay.
- Text: `primary` headings, body, values; `secondary` ledes, descriptions, resting nav; `tertiary` meta,
  placeholders, table heads.
- Inline links: `color.text.primary`, 1px `color.border.strong` underline at 3px offset; hover underline ink.
- Status colors only as badge text with a dot, field errors, stat changes and the danger button; never fills.
  Success is an ink check-circle plus words.
- Charts: bars `color.chart.rest`, current bar `color.chart.ink`, one series `color.chart.highlight`; lines 1.5px;
  at most 3 `color.border.default` gridlines, no frame; labels caption, tertiary, `tabular-nums`.

## Typography

Role: family weight, `font.size.*`, `font.lineHeight.*`.

- Hero h1: serif 400, `clamp(var(--font-size-h3), 6vw, var(--font-size-display))`, `tight`.
- Content h1 (about, pricing): serif 400, `clamp(var(--font-size-h3), 5vw, var(--font-size-h1))`, `tight`; article title `h2`.
- Product screen h1 (dashboard, list, settings, store, cart): serif 400, `h3` (`h4` under `breakpoint.md`), `heading`, identical in every app. Its lede: sans 400 `body`, `color.text.secondary`, `space.8` below.
- Content h2: serif 500, `clamp(var(--font-size-plan), 5vw, var(--font-size-h2))`, `heading`. Article prose: h2 `h4`, h3 `h5`, every h2 of an article the same size. Panel h2, feature title: serif 500, `h4`. Card, group, FAQ titles: serif 500, `h5`. Plan names, pull quotes: serif 400, `plan`, `tight`.
- Content lede: sans 400, `lede`, `color.text.secondary`, max `size.measure`. Body `body`; article prose `bodyLg`.
- Controls `ui` (labels 500); table cells `dense`, `title`; hints `small`; meta `caption`; table heads, eyebrows `micro`, 500, uppercase, tracking `micro`, tertiary; code mono `small`.

One h1 per screen. Numbers are sans `tabular-nums`, never serif. Numbered trios: mono `font.size.caption` "01".

## Spacing and density

- 4px base. Content sections `space.96` apart (`space.128` from `breakpoint.xl`, `space.64` under
  `breakpoint.md`); landing hero top padding `space.128` (`space.64` mobile).
- Section opener: pictogram, `space.24`, h2, `space.16`, lede, `space.32`, actions (gap `space.12`).
- Cards padding `space.32` (`space.24` on product screens and mobile); grid gaps `space.24`, `space.32` from `breakpoint.xl`.
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
- Elevation: flat at rest; `shadow.hover` on a hovered linked card; `shadow.float` for cards on a stage and
  sticky bars; `shadow.overlay` for dialogs, menus, toasts (dark: `shadow.overlayNight` plus a 1px
  `color.border.default` ring).

## Motion

- Header, first load: translateY -`motion.distance.rise` → 0, fading in, `motion.duration.reveal`, `settle`.
- Block rise, 15% in view, once: opacity and translateY `motion.distance.riseSm` (text) or `rise` (cards, media) → 0, `motion.duration.rise`, `settle`; siblings +100ms, max 4.
- Connector draw, in view: `stroke-dashoffset` 1 → 0, `motion.duration.draw`.
- Content swap on tab or step change: translateY `motion.distance.raise` → 0 and opacity, `motion.duration.raise`, `settle`.
- Disclosure and menu open: opacity and `grid-template-rows: 0fr → 1fr` (menus translateY -4px), `motion.duration.open`, `motion.easing.quart`; close 60% as long.
- Dialog: scrim fade; panel translateY `motion.distance.overlay` → 0, `motion.duration.open`, `quart`.
- Toast: rise `motion.distance.rise` over `motion.duration.raise`, `settle`; leave by fading over `motion.duration.open`.

Entrances wait for the viewport, but anything in view on load plays immediately, and nothing stays hidden more
than one frame after it scrolls into view; never special-case screenshots. Under reduced motion no entrance
hides anything: content renders in its final state without waiting for the viewport. Never animated: rows,
backgrounds, stage lines, widths, scroll. On product screens block rise runs on a route's first render only.
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
- Text link: hover underline → `color.text.primary`. Nav link: secondary → primary over `motion.duration.nav`, `motion.easing.expo`; dropdown chevron rotates 180° on open.
- Linked card: hover `shadow.hover` and title underline; no press.
- Text field, select: hover ring `color.border.strong` → `color.border.check`.
- Checkbox, radio, switch: hover ring → `color.text.primary`; checking fills ink; the thumb slides on `motion.easing.settle`.
- Segmented tab: the pill slides over `motion.duration.open`, `quart`. FAQ row: open rotates "+" 45°.
- Table row, menu item: hover `color.surface.hover` (on `color.surface.raised`, `color.surface.subtle`, so it
  shows); a selected row is `color.surface.subtle` with a 2px inset ink rule at the left.

Disabled: `color.text.disabled`, rings `color.border.default`, no hover or press, `cursor: not-allowed`.

## Layout adaptation

- One container: max `size.container`, centered, side padding `clamp(var(--space-20), 4vw, var(--space-64))`;
  12 columns from `breakpoint.lg`, 8 from `breakpoint.md`, 4 below; gaps `space.24` (`space.32` from `breakpoint.xl`).
- Narrow order: pictogram, h1, lede, action, content; form actions stack full width, primary first.
- `html, body { overflow-x: clip }`; grid and flex children `min-width: 0`.
- Content card grids `align-items: start`; only same-kind rows (plans, products, stats) share a height.
- Panel rows on product screens: `align-items: stretch`, each panel's title inside its own card (a staged panel's
  title inside the raised card on the stage), so neighbors share top and bottom edges.
- Forms one column, max `size.form`; short pairs side by side from `breakpoint.md`.
- Cart and checkout: items, then the checkout form (max `size.form`), in the main column; the order summary in a
  side column (4 of 12) from `breakpoint.lg`, plain card, sticky at `size.header` + `space.24`; below
  `breakpoint.lg` the summary follows the items.
- Store grid: 3 or 4 columns, 2 under `breakpoint.md` with 1:1 plates and card body padding `space.12`.
- Article: table of contents in a side column from `breakpoint.lg`; below it, a collapsed "On this page"
  disclosure after the lede and featured stage, never above the h1.

## Applying the concept

Dense screens get less, never nothing.

| Context | What it uses | How strongly |
| --- | --- | --- |
| Landing hero | `size.pictoHero` accent drawing or a hero stage with UI; h1 write-in | Full |
| Content section | Centered `size.pictoLg` drawing, h2 write-in, lede, one action | One per section |
| Product page header | `size.pictoSm` drawing (once per session), h1 write-in | Small, every screen |
| Card grid | `size.pictoMd` in feature and plan cards; plates for product and post images | One per card |
| Form | Header drawing; glyph in the pending submit button; success message or `size.pictoLg` confirmation | Light |
| Settings | Header drawing, serif group titles, glyph in the save button, "Saved" in the status region; plans on a lilac stage | Light |
| Dashboard | Header drawing; main chart on a sage stage; breathing dots for running jobs | One stage |
| Data table | Nothing drawn inside; serif group rows, breathing dots; empty state | Type and loops |
| Store | Header drawing; plates by category; detail image or drawing on a stage; empty-cart and confirmation drawings | Plates, one stage |
| Article or blog | Masthead `size.pictoLg`; featured stage with a `size.pictoXl` drawing; plates; serif pull quotes | One large, one stage |
| Empty state | `size.pictoLg` drawing, title write-in, one line, one button | Strong |
| Error, not found | `size.pictoXl` drawing of something lost, serif h1, two actions | Strong |
| Loading | Inline glyph; full screen boiling drawing; static skeletons | One glyph |

## Imagery and icons

- Icons: outlines, 1.5px stroke, round caps, `currentColor`, `size.icon` dense, `size.iconLg` elsewhere. Only filled icon: the 16px check-circle (ink circle, `color.surface.raised` tick); unavailable
  is a thin cross in `color.text.tertiary`.
- Illustration is only the pictogram. Photos: warm, `radius.card`, no filters; screenshots and videos sit on stages.
- A missing image in a grid is its plate with the category's outline icon at `size.iconLg` in
  `color.pictogram.ink`, bottom-left at `space.16`, never centered or enlarged; never a gray box. A missing detail
  image is a `size.pictoXl` drawing of the product directly on the stage.

## Accessibility

- Text 4.5:1 or more (body 7:1); control outlines 3:1 (`color.border.check`); visible labels; targets `size.touch`.
- Drawings `aria-hidden` unless meaningful; one `role="status"` region per screen (reuse an existing one); errors
  `role="alert"`.
