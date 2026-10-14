# Inkleaf 0.1.0-rc.1

Design system `inkleaf@0.1.0-rc.1`. Warm ink on cream paper, a text serif for headings and a quiet sans for the rest, almost no color. Hand-drawn ink pictograms redrawn at 12 fps and pastel stages carry the voice. Suits calm products, tools and publications.

This document is the complete design specification. Use the values and rules here instead of your own defaults. Where something is not specified, choose the option most consistent with the rules below and say so in your report. Token values are also provided as `tokens.css` and `tokens.json` next to this file — copy them, do not retype them. Each token's CSS variable is its path with dots replaced by dashes and camelCase split by dashes: `color.text.onAction` → `--color-text-on-action`.

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

## Semantic color tokens — light

| Token | Value |
| --- | --- |
| `color.surface.default` | `#faf9f5` |
| `color.surface.raised` | `#ffffff` |
| `color.surface.subtle` | `#f0eee6` |
| `color.surface.hover` | `#f5f4ed` |
| `color.surface.inverse` | `#141413` |
| `color.surface.inverseRaised` | `#262624` |
| `color.surface.overlay` | `#14141366` |
| `color.text.primary` | `#141413` |
| `color.text.secondary` | `#5e5d59` |
| `color.text.tertiary` | `#6b6a64` |
| `color.text.disabled` | `#87867f` |
| `color.text.onAction` | `#faf9f5` |
| `color.text.inverse` | `#faf9f5` |
| `color.text.inverseMuted` | `#b0aea5` |
| `color.border.default` | `#e8e6dc` |
| `color.border.control` | `#d1cfc5` |
| `color.border.strong` | `#b0aea5` |
| `color.border.check` | `#87867f` |
| `color.border.inverse` | `#30302e` |
| `color.action.primary` | `#141413` |
| `color.action.primaryHover` | `#141413` |
| `color.action.secondary` | `#ffffff` |
| `color.action.tertiary` | `#e8e6dc` |
| `color.action.tertiaryHover` | `#d1cfc5` |
| `color.action.send` | `#c6613f` |
| `color.action.danger` | `#bf4d43` |
| `color.focus.ring` | `#c46849` |
| `color.accent.glyph` | `#c6613f` |
| `color.pictogram.ink` | `#141413` |
| `color.pictogram.fill` | `#e3dacc` |
| `color.pictogram.fillAlt` | `#dedcd1` |
| `color.pictogram.accent` | `#d97757` |
| `color.stage.sage` | `#bcd1ca` |
| `color.stage.lilac` | `#cbcadb` |
| `color.stage.apricot` | `#ebc9b7` |
| `color.stage.lake` | `#6a9bcc` |
| `color.stage.lineMix` | `#ffffff` |
| `color.chart.ink` | `#141413` |
| `color.chart.highlight` | `#629987` |
| `color.chart.rest` | `#b0aea5` |
| `color.status.success` | `#4f7a5f` |
| `color.status.warning` | `#8a6116` |
| `color.status.danger` | `#bf4d43` |
| `color.status.info` | `#3f6f9e` |

## Semantic color tokens — dark

| Token | Value |
| --- | --- |
| `color.surface.default` | `#141413` |
| `color.surface.raised` | `#262624` |
| `color.surface.subtle` | `#1f1e1d` |
| `color.surface.hover` | `#30302e` |
| `color.surface.inverse` | `#1f1e1d` |
| `color.surface.inverseRaised` | `#30302e` |
| `color.surface.overlay` | `#000000a3` |
| `color.text.primary` | `#faf9f5` |
| `color.text.secondary` | `#b0aea5` |
| `color.text.tertiary` | `#9a9890` |
| `color.text.disabled` | `#5e5d59` |
| `color.text.onAction` | `#141413` |
| `color.text.inverse` | `#faf9f5` |
| `color.text.inverseMuted` | `#b0aea5` |
| `color.border.default` | `#30302e` |
| `color.border.control` | `#4d4c48` |
| `color.border.strong` | `#5e5d59` |
| `color.border.check` | `#87867f` |
| `color.border.inverse` | `#30302e` |
| `color.action.primary` | `#faf9f5` |
| `color.action.primaryHover` | `#faf9f5` |
| `color.action.secondary` | `#262624` |
| `color.action.tertiary` | `#30302e` |
| `color.action.tertiaryHover` | `#4d4c48` |
| `color.action.send` | `#c6613f` |
| `color.action.danger` | `#e5867a` |
| `color.focus.ring` | `#c46849` |
| `color.accent.glyph` | `#d97757` |
| `color.pictogram.ink` | `#faf9f5` |
| `color.pictogram.fill` | `#5e5d59` |
| `color.pictogram.fillAlt` | `#4d4c48` |
| `color.pictogram.accent` | `#d97757` |
| `color.stage.sage` | `#3a4b45` |
| `color.stage.lilac` | `#403f55` |
| `color.stage.apricot` | `#56423a` |
| `color.stage.lake` | `#31495f` |
| `color.stage.lineMix` | `#87867f` |
| `color.chart.ink` | `#faf9f5` |
| `color.chart.highlight` | `#8fbcab` |
| `color.chart.rest` | `#5e5d59` |
| `color.status.success` | `#8fb89c` |
| `color.status.warning` | `#d9a95a` |
| `color.status.danger` | `#e5867a` |
| `color.status.info` | `#8ab3dc` |

## Primitive tokens

| Token | Value |
| --- | --- |
| `font.family.serif` | `"Source Serif 4", Georgia, "Noto Serif KR", serif` |
| `font.family.sans` | `"Instrument Sans", system-ui, -apple-system, "Segoe UI", Pretendard, "Noto Sans KR", sans-serif` |
| `font.family.mono` | `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, D2Coding, monospace` |
| `font.size.display` | `72px` |
| `font.size.h1` | `64px` |
| `font.size.h2` | `52px` |
| `font.size.h3` | `36px` |
| `font.size.plan` | `32px` |
| `font.size.h4` | `25px` |
| `font.size.lede` | `23px` |
| `font.size.bodyLg` | `20px` |
| `font.size.h5` | `19px` |
| `font.size.body` | `17px` |
| `font.size.ui` | `15px` |
| `font.size.dense` | `14px` |
| `font.size.small` | `13px` |
| `font.size.caption` | `12px` |
| `font.size.micro` | `11px` |
| `font.weight.regular` | `400` |
| `font.weight.medium` | `500` |
| `font.lineHeight.tight` | `1.1` |
| `font.lineHeight.heading` | `1.2` |
| `font.lineHeight.title` | `1.3` |
| `font.lineHeight.lede` | `1.5` |
| `font.lineHeight.body` | `1.6` |
| `font.tracking.caption` | `0.01em` |
| `font.tracking.micro` | `0.06em` |

| Token | Value |
| --- | --- |
| `space.4` | `4px` |
| `space.6` | `6px` |
| `space.8` | `8px` |
| `space.12` | `12px` |
| `space.16` | `16px` |
| `space.20` | `20px` |
| `space.24` | `24px` |
| `space.32` | `32px` |
| `space.40` | `40px` |
| `space.48` | `48px` |
| `space.64` | `64px` |
| `space.96` | `96px` |
| `space.128` | `128px` |

| Token | Value |
| --- | --- |
| `radius.badge` | `4px` |
| `radius.chip` | `6px` |
| `radius.control` | `8px` |
| `radius.tile` | `12px` |
| `radius.card` | `16px` |
| `radius.stage` | `24px` |
| `radius.stageLg` | `32px` |
| `radius.full` | `9999px` |

| Token | Value |
| --- | --- |
| `border.width.hairline` | `1px` |
| `border.width.ring` | `2px` |

| Token | Value |
| --- | --- |
| `shadow.hover` | `0 4px 20px #0000000a` |
| `shadow.float` | `0 4px 24px #0000000d` |
| `shadow.overlay` | `0 12px 32px #00000029` |
| `shadow.overlayNight` | `0 12px 32px #00000080` |

| Token | Value |
| --- | --- |
| `size.controlSm` | `32px` |
| `size.control` | `40px` |
| `size.controlLg` | `48px` |
| `size.touch` | `44px` |
| `size.row` | `52px` |
| `size.rowDense` | `44px` |
| `size.icon` | `16px` |
| `size.iconLg` | `20px` |
| `size.pictoXs` | `24px` |
| `size.pictoSm` | `48px` |
| `size.pictoMd` | `64px` |
| `size.pictoLg` | `96px` |
| `size.pictoXl` | `128px` |
| `size.pictoHero` | `416px` |
| `size.header` | `72px` |
| `size.sidebar` | `240px` |
| `size.dialog` | `480px` |
| `size.form` | `560px` |
| `size.container` | `1312px` |
| `size.measure` | `60ch` |
| `size.measureHeading` | `30ch` |

| Token | Value |
| --- | --- |
| `motion.duration.instant` | `0.01ms` |
| `motion.duration.stagger` | `35ms` |
| `motion.duration.frame` | `83ms` |
| `motion.duration.press` | `100ms` |
| `motion.duration.hover` | `200ms` |
| `motion.duration.open` | `250ms` |
| `motion.duration.raise` | `400ms` |
| `motion.duration.nav` | `500ms` |
| `motion.duration.rise` | `750ms` |
| `motion.duration.draw` | `900ms` |
| `motion.duration.reveal` | `1000ms` |
| `motion.duration.breathe` | `1200ms` |
| `motion.duration.glyph` | `1328ms` |
| `motion.easing.settle` | `cubic-bezier(0.25, 1, 0.5, 1)` |
| `motion.easing.quart` | `cubic-bezier(0.165, 0.84, 0.44, 1)` |
| `motion.easing.expo` | `cubic-bezier(0.19, 1, 0.22, 1)` |
| `motion.easing.hover` | `cubic-bezier(0.42, 0, 0.58, 1)` |
| `motion.distance.rise` | `20px` |
| `motion.distance.riseSm` | `10px` |
| `motion.distance.raise` | `16px` |
| `motion.distance.overlay` | `8px` |

| Token | Value |
| --- | --- |
| `opacity.stageLine` | `0.6` |
| `opacity.breatheLow` | `0.3` |

| Token | Value |
| --- | --- |
| `breakpoint.md` | `834px` |
| `breakpoint.lg` | `992px` |
| `breakpoint.xl` | `1200px` |

## Components

### Button

**Use.** One ink primary per region; paper secondary for the rest; stone tertiary for small utility actions;
danger only to confirm a destructive action; the send square only ends a prompt field.

**Anatomy.** The ring-controls recipe. Small `size.controlSm`, padding 0 `space.12`, `font.size.small`; default
`size.control`, 0 `space.16`; large `size.controlLg`, 0 `space.24`, `font.size.body`. Optional `size.icon` icon,
gap `space.8`; icon-only is square with `aria-label`. Labels 500, verb first, 1 to 3 words. On
`color.surface.inverse`: primary fill `color.text.inverse`, label `color.surface.inverse`; ghost transparent,
`color.text.inverse`, 1px `color.border.inverse` ring.

**States.** Hover, focus-visible, active: Interaction. Disabled: `color.surface.subtle`, `color.text.disabled`.
Loading: glyph plus gerund label, width held, `aria-busy="true"`. Danger: `color.action.danger`,
`color.text.onAction`, hover ring in the same color.

### Text field

**Anatomy.** Label above (`font.size.ui`, 500), `space.8`; control `size.control` high (never shrinks in a flex
row), `radius.control`, `color.surface.raised`, inset 1px `color.border.strong` ring, padding 0 `space.12`,
placeholder `color.text.tertiary`; hint `space.6` below, `font.size.small`, `color.text.secondary`. Search: 16px
icon at `space.12`, text from `space.40`, browser clear button hidden (`appearance: none` on
`::-webkit-search-cancel-button`), own 16px clear button. Textarea: min 3 rows, padding `space.12`. Prompt field:
`radius.tile`, send square at the right.

**States.** Hover: ring `color.border.check`. Focus-visible: outline, ring unchanged. Disabled:
`color.surface.subtle`, `color.text.disabled`. Error: ring `color.status.danger`; the message replaces the hint in
`color.status.danger`, `aria-invalid`, `aria-describedby`; no red fill. A failed submit adds one line above the
actions ("2 fields need attention", `role="alert"`) and focuses the first invalid field. Loading: glyph inside, right.

### Select

**Anatomy.** Text field's box, label, hint and error, `appearance: none`, a 16px chevron in
`color.text.secondary` at `space.12` from the right, text stopping at `space.40`. Prefer native `<select>`. Custom
menu: `color.surface.raised`, `radius.tile`, `shadow.overlay`, padding `space.6`, max height 320px; options
`size.control`, `radius.control`, padding 0 `space.12`; selected option 500 with a 16px check.

**States.** Hover, focus-visible, disabled, error: as Text field. Open: chevron rotates 180°, menu per Motion.
Option hover and keyboard-active: `color.surface.hover`.

**A11y.** Custom menus: `role="listbox"`, `aria-expanded`, arrows, Home/End, typeahead, Escape returns focus.

### Checkbox and radio

**Anatomy.** The native `<input>` with `appearance: none` is the visible control and takes every click:
`size.iconLg` square, `radius.badge` (radio `radius.full`), `color.surface.raised`, inset 1px `color.border.check`
ring. The tick is a sibling 12px SVG (1.75px stroke, `color.text.onAction`) over the box with
`pointer-events: none`; the radio dot is an inset 5px `color.action.primary` ring on a `color.text.onAction` fill.
Label `font.size.ui` at `space.8`; rows at least `size.touch`; groups in a `<fieldset>` with `<legend>`.

**States.** Hover: ring `color.text.primary`. Focus-visible: outline. Selected: `color.action.primary` fill,
`motion.duration.press`. Disabled: `color.surface.subtle`, ring `color.border.default`, label
`color.text.disabled`. Error: ring `color.status.danger`, message under the group.

### Switch

**Anatomy.** `<input type="checkbox" role="switch">` with `appearance: none` is the track: `size.control` x
`space.24`, `radius.full`, `color.surface.subtle`, inset 1px `color.border.check` ring. Thumb: sibling span,
`space.16` circle, `color.surface.raised`, `pointer-events: none`, `space.4` inset. Settings rows: label left,
description below in `font.size.small`, `color.text.secondary`, row at least `size.touch`, hairline below.

**States.** Hover: ring `color.text.primary`. Focus-visible: outline on the track. Selected: track
`color.action.primary`, thumb `color.text.onAction`, moved `space.16` over `motion.duration.hover`,
`motion.easing.settle`. Disabled: ring `color.border.default`, label `color.text.disabled`. Loading: the glyph
replaces the description until saved. Applies immediately, never behind a Save button.

### Tabs

**Variants.** Segmented (views of one thing, up to 5): track `color.surface.subtle`, `radius.tile`, padding
`space.4`; segments `size.controlSm`, padding 0 `space.16`, `radius.control`, `color.text.secondary`; selected: a
`color.surface.raised` pill with 1px `color.border.default` ring, `color.text.primary`, 500. Underline (page
sections): tabs `size.control`, gap `space.24`, hairline below; selected `color.text.primary`, 500, 2px
`color.action.primary` rule.

**States.** Hover, focus-visible, selected: Interaction. Disabled: `color.text.disabled`, skipped by arrows.
Mobile: underline tabs scroll in their own strip; segmented go full width.

**A11y.** `tablist`, `tab`, `tabpanel`, `aria-selected`, arrows, Home/End. Filter chips are `aria-pressed` buttons.

### Navigation

**Header.** `size.header`, sticky, `color.surface.default`, 1px `color.border.default` bottom ring. Product name
as serif `font.size.h5` text (no invented logo). Links `font.size.ui`, `color.text.secondary`, padded boxes
`size.controlSm` high, gap `space.16`; current `color.text.primary`, 500, `aria-current="page"`. Right: small
secondary, then small primary. Below `breakpoint.lg`, more than 3 links become a `size.touch` menu button opening
a full-width sheet of `size.touch` rows with hairlines.

**Sidebar** (from `breakpoint.lg`). `size.sidebar`, right hairline, padding `space.16`; items `size.control`,
`radius.control`, padding 0 `space.12`, 16px icon; current `color.surface.subtle`, `color.text.primary`, 500; group
labels `font.size.micro` uppercase `color.text.tertiary`.

**Breadcrumb.** `font.size.small`, `color.text.secondary`, "/" in `color.text.tertiary`, `space.16` below.

**Footer.** Content sites: `color.surface.inverse` band, padding `space.96` 0, `font.size.caption` link columns
in `color.text.inverseMuted`. Product apps: one hairline-topped caption line.

**A11y.** `<nav aria-label>`, a skip link, Escape closes menus.

### Card

**Anatomy.** `color.surface.raised`, `radius.card`, inset 1px `color.border.default` ring, padding `space.32`
(`space.24` on product screens and mobile), no resting shadow. Title serif `font.size.h5`, 500; body
`font.size.ui`, `color.text.secondary`; meta `font.size.caption`, `color.text.tertiary`.

**Variants.** Feature or plan: `size.pictoMd` drawing top-left; plan name serif `font.size.plan`; price sans
`font.size.h3`; full-width primary; checklist with 16px check-circles. Media: a 4:3 plate on top, clipped, body
padding `space.20`. Stat: label `font.size.small`; value sans `font.size.h3`, `tabular-nums`; change
`font.size.caption` in a status color. Numbered trio: no card, a hairline top rule, mono "01", serif title.

**States.** Linked hover and focus-visible: Interaction; one stretched title link. Selected: 2px inset
`color.action.primary` ring. Loading: static `color.surface.subtle` skeleton bars. Error: a `color.status.danger`
line and a secondary "Retry".

### Table

**Anatomy.** In a clipped card or bare. Head row `size.rowDense`, `font.size.micro` uppercase 500, tracking
`micro`, `color.text.tertiary`. Rows `size.rowDense` (comparison `size.row`), `font.size.dense`, hairlines only, no
zebra; cells padding 0 `space.16`; first column `color.text.primary`, others secondary; numbers right,
`tabular-nums`. `table-layout: fixed` with `<col>` widths so filtering moves no column. Group rows: serif
`font.size.h5`. Booleans: check-circle or thin cross. Status: badge, running ones breathe. Row actions last:
small secondary buttons or a `size.controlSm` menu button.

**States.** Hover, focus-visible, selected: Interaction. Sortable header: a button, `aria-sort`, sorted column
`color.text.primary` with a 12px arrow. Loading: 5 static skeleton rows. Empty: the empty state with a
`size.pictoMd` drawing. Error: danger line and "Retry".

**Mobile** (under `breakpoint.md`): tables with status or actions stack; others scroll in a labelled
`role="region"` wrapper with `tabindex="0"`.

```css
@media (max-width: 833px) {
  .table--stack thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  .table--stack, .table--stack :is(tbody, tr, td) { display: block; }
  .table--stack tr { padding: var(--space-12) var(--space-16); box-shadow: inset 0 -1px 0 var(--color-border-default); }
  .table--stack td { display: grid; grid-template-columns: minmax(96px, 38%) 1fr; gap: var(--space-12); padding: var(--space-4) 0; text-align: left; }
  .table--stack td::before { content: attr(data-label); font-size: var(--font-size-caption); color: var(--color-text-tertiary); }
}
```

Keep the `<table>` with explicit `role`s and a `data-label` per cell; `<th scope>`.

### Badge

**Anatomy.** Height `space.24`, padding 0 `space.8`, `radius.badge`, `font.size.caption`, 500, gap `space.6`.

**Variants.** Outline: inset 1px `color.border.control` ring, `color.text.secondary`. Stone:
`color.action.tertiary`, `color.text.primary`. Status: outline plus a `space.6` dot and text in `color.status.*`;
running dots breathe; never a filled status color or pastel. Count: `radius.full`, `space.20` min, ink fill,
`color.text.onAction`, `aria-label` ("3 items in cart"). A state marker ("Current plan") is a badge, never ink.

### Dialog

**Anatomy.** Native `<dialog>` with `showModal()`. `color.surface.raised`, `radius.stage`, padding `space.32`,
width `min(var(--size-dialog), 100% - 2 * var(--space-16))`, centered, `shadow.overlay` (dark per Shape and
depth); backdrop `color.surface.overlay`. Title serif `font.size.h4`, 500, static; body `font.size.ui`,
`color.text.secondary`; actions right, `space.32` below, gap `space.12`: cancel secondary, confirm primary or
danger; stacked full width under `breakpoint.md`. Close: `size.controlSm` icon button, top-right.

**States.** Open and close per Motion. Focus-visible on open: first field, or cancel for destructive confirms.
Loading: glyph in confirm, others disabled. Error: `color.status.danger` line above actions, `role="alert"`.
Escape closes; focus returns to the trigger.

### Toast

**Anatomy.** Bottom-right at `space.24` (mobile: bottom, full width minus `space.16`). `color.surface.raised`,
`radius.tile`, inset 1px `color.border.default` ring, `shadow.overlay`, padding `space.12` `space.16`, max width
`size.dialog`, `font.size.ui`. Leading: the glyph while running, a 16px check-circle or a static `size.pictoXs`
drawing on success. Optional text-link action, 16px close button. Error: 2px inset `color.status.danger` left rule.

**States.** Enter and leave per Motion; at most 3, gap `space.8`. Success dismisses after 5s, paused on hover or
focus; errors stay. Focus-visible on action and close. `role="status"`, errors `role="alert"`.

### Empty state

**Anatomy.** Centered, max width `size.dialog`, padding `space.64` `space.24`: a `size.pictoLg` drawing
(`size.pictoMd` in cards and tables) that plays once, `space.24`, serif `font.size.h4` title written in, `space.8`,
one `color.text.secondary` line, `space.24`, one action (primary to create, secondary "Clear filters"). First
run: on a small lilac stage over a ghosted skeleton (raised cards at 60% opacity, no text).

**Variants.** Filtered-empty: a hand with a magnifier. Not found and error: `size.pictoXl`, serif h1, two actions.

## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json` into the existing theme); never retype values. Dark follows `prefers-color-scheme` unless `[data-theme]` overrides it.
3. Load Source Serif 4 400/500, Instrument Sans 400/500, JetBrains Mono 400 (`font-display: swap`). Root: the brush filters, global `:focus-visible`, the reduced-motion block, `html, body { overflow-x: clip }`, body in `color.surface.default`, `color.text.primary`, sans `font.size.body`.
4. Build the signature elements first, as reusable pieces: pictogram (frames from stroke data, play once, boil), stage and plate, write-in heading, working glyph with dot and caret, ring-control classes.
5. Build the components in list order with every state; place the signature elements as Applying the concept says, drawing an original subject for every pictogram.
6. Create `design-system/` with `VERSION` (system id and the update date the spec states, e.g. `inkleaf, updated 2026-01-31`), the tokens, and `components.md`: conventions, where each signature element is used, and the pictogram subjects already drawn.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, global styles, shared components, routes and tests; list what changes and what must be preserved.
2. Propose a migration plan and wait for approval.
3. Map the tokens onto existing variables, aliasing old names; a brand action color becomes `color.action.primary`, never the accent.
4. Build the signature elements, then restyle one representative screen as a sample — header pictogram, written-in h1 and, where Applying the concept allows, its stage — and wait for review.
5. Continue screen by screen, one commit each. Keep the information structure. Placeholder images become plates; spinners become the glyph.
6. Preserve routes, business logic, API contracts, form fields and validation, test ids, text used by tests (split headings keep their exact text), accessibility attributes. Restyle existing markup; never replace native inputs.
7. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; use semantic tokens and existing components, never hard-coded values.
- Every new screen gets the signature elements its context calls for; a screen without them is unfinished. New pictograms get new subjects.
- Uncovered needs: compose from tokens and note it in `components.md`. Conflicting requests (a bright brand color, a spinner, bold headings): present options.

## Verification

- Build and tests pass; no raw colors, sizes or radii outside the token files.
- Each screen at 1440px and 390px, light and dark: no sideways scroll; statuses and row actions visible.
- Tab through every screen: focus visible everywhere. Click every checkbox, radio and switch: each toggles.
- Pictograms are original, step in on entering view and hold; at most one large per viewport, one accent fill per page; at most one stage per viewport on dense screens; h1s write in once; the glyph runs only while working.
- Reduced motion: final frames, whole headings, still loops, everything readable.
- Walk the ten rules and the Never list. Report files changed, what you could not apply, and decisions you made.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and signature pieces are separate commits; revert them last to restore the previous look.
