## Character

Warm ink on cream paper, text-serif headings in sentence case, a quiet sans for everything functional and
almost no color: an unhurried, editorial calm. The voice lives in small hand-drawn ink pictograms, redrawn frame
by frame at 12 fps as they enter view, and in pastel stages that frame product UI. Everything else stays silent;
no gradients, bold type, shadows on controls, spinners or bright color.

Use `color.*` and the non-color primitives, never `palette.*`. `space.16` = 16px.

## The ten rules that define this look

1. **Warm paper, warm ink.** Page `color.surface.default`, text `color.text.primary`; `color.surface.raised` for cards, inputs, overlays and alternate bands; `color.surface.subtle` for bands, tracks, skeletons. Why: cool gray or pure black breaks the paper.
2. **Color is a whisper.** The warm accent appears only as the focus outline, a prompt's send square (`color.action.send`), the working glyph and one hero drawing fill per page; never on headers, links, main buttons, badges, icons or charts. Why: it is about 0.1% of a screen.
3. **Serif headings, quiet sans.** Headings `font.family.serif` at 400 (h1 and larger) or 500, sentence case, no trailing period; everything functional `font.family.sans` at `font.size.ui` to `body`; nothing above 500. Why: the serif is the editorial voice.
4. **Every section opens with a pictogram.** `size.pictoLg` centered above each content-page h2, `size.pictoMd` in feature and plan cards; a product screen gets one, `size.pictoSm` beside its h1, never one per panel. Why: the drawings carry the personality.
5. **Pictograms are cel-drawn ink.** Brush lines of uneven weight, one flat off-register fill, redrawn frame by frame (`motion.duration.frame`) when they enter view, played once, held. Why: the stepped redraw reads as drawn by hand.
6. **Product UI is staged.** Previews, featured media and one highlight panel per dense screen sit on a pastel stage (`color.stage.*`, `radius.stage`) with faint tone-on-tone wandering lines. Why: UI is never shown bare.
7. **Motion settles slowly.** Entrances `motion.duration.rise` to `motion.duration.reveal` on `motion.easing.settle`, rising `motion.distance.riseSm` to `motion.distance.rise`; headings fade in word by word; nothing bounces or scales up. Why: the slow settle is the tempo.
8. **Depth from rings and tone.** 1px rings (`color.border.default`, `color.border.control`) and tonal bands; hover thickens a ring to `border.width.ring`; card hover at most `shadow.hover`; only overlays get `shadow.overlay`. Why: shadows turn paper into plastic.
9. **Focus is warm, waiting is drawn.** Every focusable element shows a `border.width.ring` `color.focus.ring` outline at 2 to 4px offset; "working" is the written-loop glyph, a breathing dot or a caret, never a spinner. Why: even waiting stays hand-made.
10. **Leave room.** Content sections `space.96` apart, content max `size.container`, text max `size.measure`, headings max `size.measureHeading`, hairline-separated lists. Why: emptiness lets the drawings speak.

## Never

- Cool grays, pure black or white page grounds; gradients, textures, noise, blur, glass.
- The accent on buttons (send square excepted), links, nav, headings, badges, icons or chart series.
- Weights above 500; all-caps, title-case or italic headings; a heading ending in a period.
- Vector spot illustrations, emoji, 3D or isometric art, stock art, or any drawing traced or copied.
- A pictogram that tweens instead of stepping, loops after drawing (loading boil excepted), or sits in a cell, row, field, button, nav or badge.
- A star, asterisk, burst or spark shape anywhere.
- Spinners, progress rings, skeleton shimmer, bounce or overshoot easing, parallax, hover scale-up.
- Shadows on buttons, inputs, chips, rows or resting cards; borders over 2px.
- Pastel fills on buttons, badges, rows or the page; text or fields directly on a stage; two stages in one viewport of a dense screen.
- Browser-default chrome: blue focus glow, default select arrow, checkbox or radio, search clear button.
- Horizontal scroll at 390px; a status or row action pushed off-screen.
- Exclamation marks, hype words or title case in interface copy.

## Signature elements

What makes this system recognizable beyond its tokens. Each one is a recipe an agent rebuilds from scratch —
original artwork in this style, never copied — with where it goes and how much of it a screen takes.

Shared setup, once at the app root: three seeds of one brush filter.

```js
const brush = [3, 8, 14].map((seed, i) => `<filter id="inkleaf-brush-${i}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="${seed}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G"/></filter>`).join("");
document.body.insertAdjacentHTML("afterbegin", `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${brush}</defs></svg>`);
```

### Cel-drawn ink pictogram

**What.** One everyday object, often held, placed or pointed at by a simple hand, in brush-ink lines
(`color.pictogram.ink`) of uneven weight (±25%) with blunt round ends and slightly overshooting joins, plus one
flat fill under the lines, 2 to 3 units off-register (`color.pictogram.fill` or `fillAlt`; `color.pictogram.accent`
only on the page's one hero drawing). The object fills about 60% of a square box on empty paper: no ground line,
frame, shadow or background. Sizes `size.pictoXs` (toast) to `size.pictoHero`.

**Recipe.** In a 120 x 120 viewBox:
1. A new subject for each use (list under Where). Hands: a rounded palm, 3 or 4 curved "noodle" fingers without
   knuckles or nails, the thumb one stroke.
2. 5 to 14 strokes, each one open path of 1 to 3 cubic curves, no long straight runs. Widths 2.8, 3.4 or 4.0 units;
   some joins overshoot 1 to 2 units, others stop short.
3. One closed fill path roughly tracing the main body, under the lines; the CSS shifts it 3 right and 2 down.
4. Frames: strokes in drawing order (contour, details, hand), the fill after about 60% of them, then 3 "boil"
   frames of the finished drawing. Neighboring frames use different brush seeds, so each looks redrawn.
   12 to 24 frames = 1 to 2 seconds; the last uses seed 0 and holds.

```js
// Construction demo only: never ship this subject.
const demo = { fillAfter: 3, fill: "M35 53 C36 72 44 82 60 82 C76 82 84 72 85 53 Z", strokes: [
  ["M22 88 C40 94 80 94 98 86", 3.4], ["M34 50 C33 73 43 85 60 85 C77 85 87 73 86 49", 4.0],
  ["M31 51 C50 55 70 55 89 48", 2.8], ["M86 57 C101 54 103 71 84 73", 3.4],
  ["M55 41 C48 33 62 29 56 18", 2.8], ["M69 43 C64 36 73 32 68 25", 2.8] ] };
// Inner HTML of <svg class="picto" data-cel viewBox="0 0 120 120" aria-hidden="true">
function celFrames({ strokes, fill, fillAfter }, boil = 3) {
  const counts = strokes.map((_, i) => i + 1).concat(Array(boil).fill(strokes.length));
  return counts.map((n, k) => {
    const end = counts.length - 1 - k; // 0 = held final frame
    const cls = ["cel", end === 0 && "cel-last", end < boil && "cel-boil"].filter(Boolean).join(" ");
    const ink = strokes.slice(0, n).map(([d, w]) => `<path d="${d}" stroke-width="${w}"/>`).join("");
    const paint = n > fillAfter ? `<path class="picto-fill" d="${fill}"/>` : "";
    return `<g class="${cls}" style="--k:${k};--b:${end}" filter="url(#inkleaf-brush-${end % 3})">${paint}<g class="picto-ink">${ink}</g></g>`;
  }).join("");
}
// Unless reduced motion: add "is-ready" on mount, then "is-playing" once 30% is in view (IntersectionObserver,
// threshold 0.3, unobserve after). Without script or with reduced motion the final frame simply stays.
```

```css
.picto { display: block; width: var(--size-picto-lg); aspect-ratio: 1; overflow: visible; color: var(--color-pictogram-ink); }
.picto-ink { fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
.picto-fill { fill: var(--picto-fill, var(--color-pictogram-fill)); transform: translate(3px, 2px); }
.picto .cel { opacity: 0; }
.picto .cel-last { opacity: 1; }
.picto.is-ready .cel-last { opacity: 0; }
.picto.is-playing .cel { animation: cel-flash var(--motion-duration-frame) steps(1) calc(var(--k) * var(--motion-duration-frame)); }
.picto.is-playing .cel-last { animation: cel-hold 1ms calc(var(--k) * var(--motion-duration-frame)) forwards; }
.picto.is-boiling .cel { opacity: 0; animation: none; }
.picto.is-boiling .cel-boil { animation: cel-boil calc(3 * var(--motion-duration-frame)) steps(1) calc(var(--b) * -1 * var(--motion-duration-frame)) infinite; }
@keyframes cel-flash { from, to { opacity: 1; } }
@keyframes cel-hold { to { opacity: 1; } }
@keyframes cel-boil { 0% { opacity: 1; } 33.34%, 100% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .picto.is-boiling .cel-boil { animation: none; } .picto.is-boiling .cel-last { opacity: 1; } }
```

In a component framework, render the frames from the same data and toggle the classes from an effect. Hero:
`style="--picto-fill: var(--color-pictogram-accent)"`. A drawing that carries meaning gets `role="img"` and an
`aria-label`, and never carries it alone.

**Motion.** 30% in view (or already visible on mount): frames switch every `motion.duration.frame`, no
tweening, once; the final frame holds. Loading: `is-boiling` cycles the 3 boil frames for as long as the wait
lasts. Reduced motion: final frame only.

**Where.** Section openers (`size.pictoLg`, centered, `space.24` above the h2); hero (`size.pictoHero`, the
accent fill; `size.pictoXl` under `breakpoint.md`); feature, plan and onboarding cards (`size.pictoMd`, top-left); product page headers
(`size.pictoSm`, left of the h1, gap `space.16`; above it under `breakpoint.md`); empty states and success
confirmations (`size.pictoLg`); errors and not-found (`size.pictoXl`); full-screen loading (boil); FAQ openers.
Subjects that fit: empty search, a hand holding a magnifier; empty list, an open drawer; not found, a hand holding
a folded map; error, a tipped mug; success, a sealed envelope in a hand; dashboard, a watering can; settings, a
hand turning a dial; billing, a coin purse; security, a padlock; notifications, a hand-bell; profile, a hand
mirror; store, a paper bag; writing, a notebook and pen; FAQ, an open book.

**Limits.** One per section; at most one drawing of `size.pictoLg` or larger per viewport; one accent fill per
page. Never in cells, rows, fields, buttons, nav, badges or toast lists; never scattered, tiled or a background.
Avoid the subjects this style is best known for: a sprout in a mound, stacked or dropped blocks, a hand catching a
ball or globe, a toolbox, tiered plants, a gauge.

### Pastel stage with wandering lines

**What.** A clipped panel in one `color.stage.*` color, `radius.stage` (hero `radius.stageLg`), padding
`space.48` to `space.64`, crossed by 3 to 6 faint freehand lines (8px, a lighter tone of the stage) that run off its
edges. On it: product UI in a raised card with `shadow.float`, a screenshot, a pictogram or a ghosted skeleton;
optionally a tray behind the card (`radius.tile`, a second stage color, 90% wide, `space.16` higher). A **plate**
is the quiet sibling for grids: stage color and `radius.tile`, no lines.

**Recipe.**

```html
<figure class="stage" style="--stage: var(--color-stage-sage)">
  <svg class="stage-lines" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
    <path d="M-20 70 C60 30 120 120 210 80 S350 20 420 60"/>
    <path d="M-10 240 C80 200 150 280 260 230 S360 170 430 210"/>
    <path d="M300 -20 C280 60 360 110 330 180 S300 280 350 330"/>
    <path d="M90 320 C110 260 60 210 120 170"/>
  </svg>
  <div class="stage-content"><!-- raised card, screenshot or pictogram --></div>
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

**Where.** Hero showcases and previews; an article's featured image; a dashboard's main chart (sage); a product
detail image; a plan card header; a first-run empty state (lilac); behind the not-found drawing (apricot).
Plates: store grid images (color by category), blog card images, avatar tiles.

**Limits.** One stage per viewport on dense screens (dashboard, table, settings, cart); never the page background;
never behind fields or running text; no gradients; text only inside a raised card on it.

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

**Motion.** h1 on route load, h2 and empty-state titles at 30% in view; once. Each word opacity 0 → 1 over
`motion.duration.reveal`, `motion.easing.settle`, delayed by its index x `motion.duration.stagger`; the lede and
actions below rise `motion.distance.riseSm` over `motion.duration.rise`, 200ms later. Reduced motion: instant.

**Where.** The h1 of every screen, product screens included; content h2s; empty-state titles. Serif but static:
card, panel, dialog and settings-group titles, table group headers, plan names, FAQ questions, quotes, initials.

**Limits.** Only h1, h2 and empty-state titles, at most 12 words; never body, labels, numbers, buttons or tables.

### Written-loop working glyph

**What.** Three cursive loops, 16px high, in `color.accent.glyph`, writing themselves in 12 steps, holding 2 and
clearing in 2 (`motion.duration.glyph`), beside a gerund label ("Saving"). Companions: the breathing dot for
running items in lists and the caret for text being produced. When done: a 16px check-circle and "Saved".

**Recipe.**

```html
<span class="working" role="status"><svg class="glyph" viewBox="0 0 24 16" aria-hidden="true"><path pathLength="1"
  d="M2 12 C6 12 8 3 6 3 C3 3 5 13 10 12 C14 11 15 3 13 3 C10 3 12 13 17 12 C20 11 22 6 22 6"/></svg>Saving</span>
```

```css
.working { display: inline-flex; align-items: center; gap: var(--space-8); font-size: var(--font-size-small); color: var(--color-text-secondary); }
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
.caret { display: inline-block; width: 1px; height: 1.1em; vertical-align: text-bottom; background: var(--color-text-primary);
  animation: caret var(--motion-duration-reveal) steps(1) infinite; }
@keyframes caret { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .glyph path { animation: none; stroke-dashoffset: 0; } .dot-breathe, .caret { animation: none; } }
```

**Motion.** Infinite while the state lasts, stepped, never tweened or rotated; stops when the state ends.
Reduced motion: the full static line, a steady dot and caret.

**Where.** Loading buttons (before the label, width held); page and panel loading (centered, with the boiling
pictogram on full-screen waits); background-task toasts; a search field while results load (inside, right);
table status cells and dashboard job lists (breathing dot in the status color); streaming output (caret).

**Limits.** One glyph per screen, other running items use the dot; never decorative or idle; never a rotating
shape, star, asterisk, burst or spark.

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

**Where.** Every button, chip, input and select; header actions; table row actions (secondary,
`size.controlSm`); dialog, form and settings actions; filter chips (tertiary, selected ink). The send square
only ends a prompt or message field.

**Limits.** One ink primary per region (card, dialog, form, toolbar); no pastel or accent fills except the send
square; no shadows; rings at most `border.width.ring`.

## Color use

- Surfaces: ground → band or raised section → card with a `color.border.default` ring; two levels before an
  overlay. Content pages alternate bands with hairline seams and close on `color.surface.inverse` (text
  `color.text.inverse`, links `color.text.inverseMuted`); product screens do not.
- Text: `primary` for headings, body, values; `secondary` for ledes, descriptions, resting nav; `tertiary` for
  meta, placeholders, table heads; `disabled` only when disabled.
- Inline links: `color.text.primary`, 1px `color.border.strong` underline at 3px offset; hover underline ink.
- Status colors only as badge text with a dot, field errors and the danger button; never fills. Success is an
  ink check-circle plus words.
- Charts: bars `color.chart.rest`, current bar `color.chart.ink`, one series `color.chart.highlight`; lines 1.5px;
  at most 3 `color.border.default` gridlines, no frame; labels caption, tertiary, `tabular-nums`.
- Avatars: 40px `radius.tile` tile in a stage color hashed from the name, serif initials `font.size.h5`.

## Typography

Role: family weight, `font.size.*`, `font.lineHeight.*`.

- Hero h1: serif 400, `clamp(var(--font-size-h3), 6vw, var(--font-size-display))`, `tight`.
- Content h1 (about, pricing): serif 400, `clamp(var(--font-size-h3), 5vw, var(--font-size-h1))`, `tight`; article title `h2`.
- Product screen h1 (dashboard, list, settings, store, cart): serif 400, `h3` (`h4` under `breakpoint.md`), `heading`.
- Content h2: serif 500, `clamp(var(--font-size-plan), 5vw, var(--font-size-h2))`, `heading`. Panel h2, feature title: serif 500, `h4`. Card, group, FAQ titles: serif 500, `h5`. Plan names, pull quotes: serif 400, `plan`, `tight`.
- Lede: sans 400, `lede`, `lede`, `color.text.secondary`, max `size.measure`. Body: `body`, `body`; article prose `bodyLg`.
- Buttons, nav, inputs: `ui`; labels and buttons 500. Table cells, dense lists: `dense`, `title`. Hints, errors: `small`. Meta: `caption`, tracking `caption`. Table heads, eyebrows: `micro`, 500, uppercase, tracking `micro`, tertiary. Code: mono `small`.

One h1 per screen; no h2 or card title repeats it. Numbers are sans `tabular-nums`, never serif. Body lines 60
to 75 characters. Numbered trios label columns "01", "02", "03" in mono `font.size.caption`.

## Spacing and density

- 4px base. Content sections `space.96` apart (`space.128` from `breakpoint.xl`, `space.64` under
  `breakpoint.md`); landing hero top padding `space.128` (`space.64` mobile).
- Section opener: pictogram, `space.24`, h2, `space.16`, lede, `space.32`, actions (gap `space.12`).
- Cards padding `space.32` (`space.24` on product screens and mobile); grid gaps `space.24`, `space.32` from `breakpoint.xl`.
- Product screens: header padding `space.48` top, `space.32` bottom; panels `space.24` apart; rows `size.rowDense`.
- Forms: fields `space.24` apart, label to control `space.8`, hint `space.6`, actions `space.32` below.
- Dense never goes below `size.rowDense`, `font.size.dense` or `size.touch` targets.

## Shape and depth

- Radius: badge `radius.badge`; chip `radius.chip`; button, input, menu item `radius.control`; tab track, plate,
  avatar, toast `radius.tile`; card, image `radius.card`; stage, dialog `radius.stage`; hero stage
  `radius.stageLg`; dots, switches `radius.full`.
- Rings are `box-shadow`: `border.width.hairline` at rest, `border.width.ring` on hover or selection.
- Elevation: flat for everything at rest; `shadow.hover` on a hovered linked card; `shadow.float` for cards on a
  stage and sticky bars; `shadow.overlay` for dialogs, menus, toasts (dark: `shadow.overlayNight` plus a 1px
  `color.border.default` ring).

## Motion

- Header, first load: translateY -`motion.distance.rise` → 0 and opacity, `motion.duration.reveal`, `motion.easing.settle`.
- Block rise, 15% in view, once: opacity and translateY `motion.distance.riseSm` (text) or `rise` (cards, media) → 0, `motion.duration.rise`, `settle`; siblings +100ms, max 4.
- Connector draw (steps, timelines), in view: `stroke-dashoffset` 1 → 0 with `pathLength="1"`, `motion.duration.draw`, ease.
- Content swap on tab or step change: translateY `motion.distance.raise` → 0 and opacity, `motion.duration.raise`, `settle`.
- Disclosure and menu open: opacity and `grid-template-rows: 0fr → 1fr` (menus translateY -4px), `motion.duration.open`, `motion.easing.quart`; close 60% as long.
- Dialog: scrim fade; panel translateY `motion.distance.overlay` → 0, `motion.duration.open`, `quart`.
- Toast: rise `motion.distance.rise` over `motion.duration.raise`, `settle`; leave by fading over `motion.duration.open`.

Never animated: table rows, backgrounds, stage lines, layout widths, scroll position. On product screens block
rise runs on a route's first render only, never on filter, sort or page changes. Reduced motion, globally:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: var(--motion-duration-instant) !important; animation-delay: 0s !important;
    animation-iteration-count: 1 !important; transition-duration: var(--motion-duration-instant) !important; transition-delay: 0s !important; }
}
```

## Interaction

Focus-visible is always the warm outline (offset 4px on buttons and linked cards, 2px elsewhere, -2px on rows and menu items).

Durations: rings `motion.duration.hover`, colors and press `motion.duration.press`, on `motion.easing.hover`.

- Ink primary: hover adds an outer ring 0 → `border.width.ring`; press scales 0.985.
- Paper secondary: hover turns the label secondary → primary and the ring 1px `color.border.control` → 2px `color.border.strong`; press 0.985.
- Stone button, chip: hover `color.action.tertiary` → `tertiaryHover`; press 0.985; a selected chip is ink.
- Ghost on the inverse band: hover fill `color.surface.inverseRaised`.
- Text link: hover underline → `color.text.primary`. Nav link: secondary → primary over `motion.duration.nav`, `motion.easing.expo`; dropdown chevron rotates 180° on open.
- Linked card: hover `shadow.hover` and title underline; no press.
- Text field, select: hover ring `color.border.strong` → `color.border.check`; menus open per Motion.
- Checkbox, radio, switch: hover ring → `color.text.primary`; checking fills ink; the thumb slides on `motion.easing.settle`.
- Segmented tab: hover label → primary; the pill slides over `motion.duration.open`, `quart`.
- FAQ row: hover "+" → primary; open rotates it 45° and opens the answer per Motion.
- Table row, menu item: hover `color.surface.hover`; a selected row is `color.surface.subtle` with a 2px inset ink rule at the left.

Disabled: `color.text.disabled`, rings `color.border.default`, no hover or press, `cursor: not-allowed`.

## Layout adaptation

- One container: max `size.container`, centered, side padding `clamp(var(--space-20), 4vw, var(--space-64))`;
  12 columns from `breakpoint.lg`, 8 from `breakpoint.md`, 4 below; gaps `space.24` (`space.32` from `breakpoint.xl`).
- Header `size.header`, sticky; more than 3 links collapse into a menu below `breakpoint.lg`. Product shells: a
  `size.sidebar` side nav from `breakpoint.lg`.
- Narrow order: pictogram, h1, lede, primary action, content; stages below their text; form actions stack full
  width, primary first.
- `html, body { overflow-x: clip }`; grid and flex children `min-width: 0`.
- Tables under `breakpoint.md` stack (with status or actions) or scroll in their own wrapper (see Table).
- Card grids `align-items: start`; only same-kind rows (plans, products, stats) share a height.
- Forms one column, max `size.form`; short field pairs side by side from `breakpoint.md`. Targets `size.touch`.

## Applying the concept

Where the signature elements and patterns go, so every screen carries the concept. Dense screens get less,
never nothing.

| Context | What it uses | How strongly |
| --- | --- | --- |
| Landing hero | `size.pictoHero` accent drawing or a `radius.stageLg` stage with UI; h1 write-in | Full |
| Content section | Centered `size.pictoLg` drawing, h2 write-in, lede, one action | One per section |
| Product page header | `size.pictoSm` drawing beside the h1 (plays once per session, then static), h1 write-in | Small, every screen |
| Card grid | `size.pictoMd` in feature and plan cards; plates for product and post images | One per card |
| FAQ | `size.pictoLg` opener, serif questions, hairline rows with "+" | One drawing |
| Form | Header drawing; glyph on submit; success toast or `size.pictoLg` confirmation | Light |
| Settings | Header drawing per page, static serif group titles, glyph then toast on save; plan card on a lilac stage | Light |
| Dashboard | h1 write-in, `size.pictoSm` drawing; main chart on a sage stage; breathing dots for running jobs | One stage, one drawing |
| Data table | Nothing drawn inside; serif group rows, breathing-dot status; empty state when empty | Type and loops |
| Store | Header drawing; plates by category; detail image on a stage; cart and confirmation drawings | Plates, one stage |
| Article or blog | Masthead `size.pictoLg`, h1 write-in; featured image a stage with a `size.pictoXl` drawing; plates; serif pull quotes | One large, one stage |
| Empty state | `size.pictoLg` drawing, title write-in, one line, one button; first run on a lilac stage | Strong |
| Error, not found | `size.pictoXl` drawing of something lost or dropped, serif h1, two actions | Strong |
| Loading | Inline glyph; full screen boiling drawing + glyph label; static `color.surface.subtle` skeletons | One glyph |
| Toast | Glyph while running; optional `size.pictoXs` drawing on success | Small |
| Dialog | Static serif title, ring buttons | Minimal |

## Imagery and icons

- Icons: single-color outlines, 1.5px stroke, round caps, `size.icon` in dense UI, `size.iconLg` elsewhere,
  `currentColor`. Only filled icon: the 16px check-circle (ink circle, `color.surface.raised` tick); unavailable
  is a thin cross in `color.text.tertiary`.
- Illustration is only the pictogram. Photos: small, warm, `radius.card`, no filters. Screenshots and muted
  videos sit on stages; videos pause under reduced motion.
- A missing image is a plate, optionally with the product's own outline icon in `color.pictogram.ink`; never a gray box.

## Accessibility

- Body text 7:1, secondary and tertiary 4.5:1 on ground, band and card surfaces; checkbox, radio and switch outlines 3:1
  (`color.border.check`); fields keep visible labels; focus outlines never removed; targets `size.touch`.
- Drawings and stage lines `aria-hidden` unless meaningful; status changes `role="status"`, errors `role="alert"`.
