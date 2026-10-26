# Morning Shapes 0.1.0-rc.1

Design system `morning-shapes@0.1.0-rc.1`. Sunny and toy-like: warm cream pages, flat saturated fields with arched edges, crescent-shaded geometric shapes, slowly breathing glyphs and chunky pills that sink onto a 2px ledge. Suits wellness, learning and habit apps.

This document is the complete design specification. Use the values and rules here instead of your own defaults. Where something is not specified, choose the option most consistent with the rules below and say so in your report. Token values are also provided as `tokens.css` and `tokens.json` next to this file — copy them, do not retype them. Each token's CSS variable is its path with dots replaced by dashes and camelCase split by dashes: `color.text.onAction` → `--color-text-on-action`.

## Character

A sunny, toy-like language: warm white and cream pages broken by whole fields of full-strength color — yolk yellow, bright blue, tangerine, leaf green, night navy — whose edges bulge like a horizon, each product area owning one hue. Flat geometric shapes shaded with one darker crescent scatter as confetti and sit as pictograms in round plates; small glyphs breathe on slow loops. Everything you touch is a chunky pill on a hard 2px ledge that sinks when pressed, in one friendly bold grotesque. No pastels, gradients, outlines, faces or soft shadows.

## The ten rules that define this look

1. **Warm white and cream carry the page; color comes as whole flat fields.** The page is `color.surface.default`, cards and panels `color.surface.subtle`; saturated color appears only as a full-strength `color.field.*` band, panel or tile, at most one large field (a band, or a panel wider than half the content) per viewport. Never a tint, wash or gradient of a hue. Why: full-strength color next to warm white is the confidence; pastel washes make it generic.
2. **Every area of the product owns one hue, everywhere.** Map top-level areas, in navigation order, to `color.category.1`–`6`, then repeat; utility areas (settings, account, help, legal) take `color.field.cream`. The hue is the area's header band, nav dot, tags, empty-state panel and glyph. Why: color means "where you are", so a screen is recognizable at a glance.
3. **Bands bulge at their edges.** A full-bleed field never ends in a straight line: a band below the top bar ends in an arc that sags `size.arc` at the center (`size.arcSm` on compact header bands and phones); a band near the end of a page and the footer start with an arc that rises into the white above; a night band uses a soft wave. Contained panels are `radius.xl` rectangles, never arched. Why: the curved horizon is the most recognizable silhouette of the system.
4. **Every action is a pill or a circle on a ledge.** `radius.full`, bold label at `font.tracking.tight`, a hard `shadow.ledge` 2px below, one step darker on hover, and on press it moves down 2px while the ledge disappears (`motion.duration.snap`, `motion.easing.snap`). Why: the chunky physical press is the tactile signature.
5. **Ink does the work, blue converts, cream supports.** `color.action.primary` (ink) is every main action; `color.action.accent` (blue) marks the single conversion action of a region (sign up, buy, start, create the first item); `color.action.secondary` (cream) is everything secondary. The selected tab or filter is an ink pill with a `size.dot` white dot before its label. Why: one blue pill per region makes the next step obvious on a colorful page.
6. **Illustrate only with flat primitives.** Discs, crescents, rounded blobs, flat-bottomed clouds, hexagons, pills, four-point sparkles and dots; flat fills, at most three hues per piece, volume from one darker crescent of the same hue (`color.art.*Shade`), optionally one fat round-cap stroke in `color.art.stroke`. No outlines, no gradients, no faces. Why: the crescent-shaded flat primitive is the look; outlines read as clip art, gradients as 3D blobs.
7. **Shapes frame content and never touch it.** 4–6 confetti shapes around a section opener, a spot plate beside a feature or settings group, one composition in an empty state; always at least `space.6` from text and never over text, data, inputs or tables. Why: sunny only while the content stays fully legible.
8. **Small glyphs breathe.** Glyphs of `size.glyphSm`–`size.glyphLg` loop on slow scale-and-rotate cycles of `motion.duration.breathe`–`motion.duration.breatheSlow` with `motion.easing.breathe`, each a different length, at most six looping on screen, still under reduced motion. Why: slow breathing reads as calm; faster or bouncing motion reads as noise.
9. **Depth by tone, not shadow.** Cream on white, white on cream, a field as its own layer. The only shadows are the pill ledge, `shadow.header` on the scrolled top bar and `shadow.float` on menus, toasts and floating chips. Cards have no border and no shadow. Why: flat stacked tones keep it toy-like and printed.
10. **One friendly bold grotesque.** `font.family.sans` everywhere; headings `font.weight.bold` at `font.tracking.tight`; body `font.size.body`–`font.size.title` regular; labels medium; sentence case; buttons 1–3 words, verb first. Why: the bold, tightly tracked round grotesque is the system's voice.

## Never

- Pastel tints, transparent washes, gradients or color-mix of a field hue behind content; cool greys; pure black.
- Two saturated fields touching, or more than one large saturated field in a viewport; a field behind a table, form fields or more than three lines of body text.
- Square or slightly rounded buttons; blurred button shadows; scale, lift or glow on hover; more than one blue pill in a region.
- Outlines or strokes on shapes or icons (the one fat round-cap gesture excepted); gradients, highlights, 3D or glossy shading on shapes; drawn faces, eyes or smiles on any shape; characters or mascots.
- A single colored dot used as a logo or brand mark.
- Shapes or glyphs over text, data, inputs or table cells; confetti inside tables, forms, dialogs or toasts.
- Bounce, overshoot, parallax, long slides, fast loops, spinners, shimmer gradients.
- Borders or shadows on cards; zebra stripes in saturated colors; colored body text (links and status text excepted).
- Uppercase anywhere except the 14px eyebrow; title case; headings lighter than bold.
- Device mockups, stock illustration sets or emoji as illustration on product screens.

## Signature elements

Build these first, as reusable pieces. The code uses only the system's tokens; class names are a suggestion, the structure and values are the rule.

### Sunny color fields with bulging edges

**What.** Whole sections in one flat `color.field.*` hue with its paired `color.onField.*` text. Three forms: a full-bleed **band**, a compact **header band** that opens product screens, and a contained **panel** (`radius.xl`). A band's edge bulges out into the white page (rule 3). Inside a field: on-field text, white or cream cards, on-field pills, flat shapes in other hues.

**Recipe.**

```html
<!-- Band below the top bar: the arc hangs from its bottom edge -->
<section class="ms-field ms-field--sag ms-hue--yellow">
  <div class="ms-field__inner">…heading, lead, pills…</div>
  <svg class="ms-arch" viewBox="0 0 1440 72" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path d="M0 0H1440V12Q720 132 0 12Z"/></svg>
</section>
<!-- Closing band or footer: the arc rises from its top edge -->
<section class="ms-field ms-field--rise ms-hue--cream">
  <svg class="ms-arch" viewBox="0 0 1440 72" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path d="M0 72V60Q720 -60 1440 60V72Z"/></svg>
  <div class="ms-field__inner">…</div>
</section>
<!-- Night band edge: a soft wave instead of the arc -->
<path d="M0 0H1440V36C1200 72 960 72 720 36S240 0 0 36Z"/>
```

```css
.ms-hue--yellow { --ms-field: var(--color-field-yellow); --ms-on-field: var(--color-on-field-yellow); }
.ms-hue--orange { --ms-field: var(--color-field-orange); --ms-on-field: var(--color-on-field-orange); }
.ms-hue--pink   { --ms-field: var(--color-field-pink);   --ms-on-field: var(--color-on-field-pink); }
.ms-hue--cream  { --ms-field: var(--color-field-cream);  --ms-on-field: var(--color-on-field-cream); }
.ms-hue--blue   { --ms-field: var(--color-field-blue);   --ms-on-field: var(--color-on-field-blue); }
.ms-hue--green  { --ms-field: var(--color-field-green);  --ms-on-field: var(--color-on-field-green); }
.ms-hue--violet { --ms-field: var(--color-field-violet); --ms-on-field: var(--color-on-field-violet); }
.ms-hue--night  { --ms-field: var(--color-field-night);  --ms-on-field: var(--color-on-field-night); }
.ms-hue--blue, .ms-hue--green, .ms-hue--violet, .ms-hue--night { --ms-ring: var(--color-focus-ring-on-field); }

.ms-field { --ms-arc: var(--size-arc); position: relative; isolation: isolate;
  background: var(--ms-field); color: var(--ms-on-field); padding-block: var(--space-24); }
.ms-field__inner { position: relative; z-index: 1; max-width: var(--size-container); margin-inline: auto;
  padding-inline: var(--space-12); }
.ms-arch { position: absolute; inset-inline: 0; width: 100%; height: var(--ms-arc); fill: var(--ms-field); }
.ms-field--sag  { margin-block-end: var(--ms-arc); }
.ms-field--sag  > .ms-arch { top: 100%; }
.ms-field--rise { margin-block-start: var(--ms-arc); }
.ms-field--rise > .ms-arch { bottom: 100%; }
.ms-field--header { --ms-arc: var(--size-arc-sm); padding-block: var(--space-10) var(--space-8); }
/* Header-band shapes: 2-3 shapes of 24-96px in an aria-hidden layer over the trailing third; text stays left of it */
.ms-field__art { position: absolute; inset-block: 0; inset-inline-end: 0; width: 33%; pointer-events: none; overflow: clip; }
.ms-field--header .ms-field__inner { padding-inline-end: 33%; }
.ms-panel { background: var(--ms-field); color: var(--ms-on-field); border-radius: var(--radius-xl);
  padding: var(--space-12); position: relative; overflow: clip; }
.ms-field :focus-visible, .ms-panel :focus-visible { outline-color: var(--ms-ring, var(--color-focus-ring)); }
@media (max-width: 767px) {
  .ms-field { --ms-arc: var(--size-arc-sm); padding-block: var(--space-16); }
  .ms-field__inner, .ms-field--header .ms-field__inner { padding-inline: var(--space-6); }
  .ms-field__art { width: 40%; } .ms-field__art > :nth-child(n+2) { display: none; }
  .ms-panel { padding: var(--space-8) var(--space-6); }
}
```

Assign each area one `ms-hue--*` class on its header band, empty-state panel and nav dot (rule 2). Secondary text on a field is the on-field color itself; never a grey on a hue.

**Motion.** Static. Content inside a marketing band fades in on first view (Motion → Reveal); product header bands appear instantly.

**Where.** Front-page hero (band, sag); every product screen except dashboards (header band in the area hue); dashboard stat tiles; closing call to action (band, rise, one mega pill); footer (cream, rise); empty states and onboarding steps (panel); pricing (night band, selected plan `color.field.violet`).

**Limits.** One large field per viewport; two saturated fields never touch (white or cream between; a cream footer may follow a saturated closing band). Never behind a table, form fields or more than three lines of body text. Arcs only on full-bleed bands. White text only on fields whose `color.onField.*` is white; yellow, orange, pink and cream take ink.

### Flat shape kit: crescent shading, sparkles, spot plates

**What.** Original flat shapes (rule 6): discs 32–128px, sparkles 16–40px, crescents, blobs, clouds, hexagons, pills, dots. **Two-color discs**: a second hue covers 50–70% of a disc. **Spot plates**: a `size.plate` (or `size.plateSm`) circle in `color.art.cream` (or a field hue on white) holding a pictogram of 2–3 primitives at 60–70% of its width. **Confetti**: 4–6 shapes around a heading. Optional: one ink round-cap stroke, 10–15% of the piece's width.

**Recipe.**

```html
<!-- Disc with crescent: base hue, darker shade showing at the lower right. Ids unique per instance. -->
<svg class="ms-shape" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
  <clipPath id="d1"><circle cx="50" cy="50" r="48"/></clipPath>
  <g clip-path="url(#d1)">
    <rect width="100" height="100" style="fill: var(--color-art-orange-shade)"/>
    <circle cx="42" cy="42" r="48" style="fill: var(--color-field-orange)"/></g></svg>
<!-- Two-color disc: hue B covers 50-70% of hue A -->
<svg class="ms-shape" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
  <clipPath id="d2"><circle cx="50" cy="50" r="48"/></clipPath>
  <g clip-path="url(#d2)"><rect width="100" height="100" style="fill: var(--color-field-pink)"/>
    <rect x="38" y="-20" width="90" height="140" rx="24" transform="rotate(18 50 50)" style="fill: var(--color-field-violet)"/></g></svg>
<!-- Four-point sparkle (rotate 0-20deg) -->
<svg class="ms-sparkle" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path d="M12 0Q12 12 24 12Q12 12 12 24Q12 12 0 12Q12 12 12 0Z" style="fill: var(--color-field-pink)"/></svg>
<!-- Flat-bottomed cloud: three circles on a pill; a lighter second cloud may overlap it -->
<svg class="ms-shape" viewBox="0 0 100 64" aria-hidden="true" focusable="false"><g style="fill: var(--color-art-white)">
  <rect x="6" y="36" width="88" height="28" rx="14"/><circle cx="32" cy="38" r="18"/>
  <circle cx="56" cy="30" r="24"/><circle cx="78" cy="44" r="14"/></g></svg>
<!-- Spot plate: plate + 2-3 primitive pictogram (here a sun rising over a hill) -->
<svg class="ms-plate" viewBox="0 0 112 112" aria-hidden="true" focusable="false">
  <circle cx="56" cy="56" r="56" style="fill: var(--color-art-cream)"/>
  <circle cx="56" cy="54" r="20" style="fill: var(--color-field-yellow)"/>
  <path d="M20 78Q56 50 92 78V80H20Z" style="fill: var(--color-field-green)"/></svg>
<!-- Optional ink gesture: one round-cap stroke, 10-15% of the piece width -->
<path d="M18 70Q50 40 82 70" fill="none" stroke-width="12" stroke-linecap="round" style="stroke: var(--color-art-stroke)"/>
```

```css
.ms-confetti { position: relative; padding-block: var(--space-16); padding-inline: clamp(var(--space-6), 10vw, var(--space-32)); text-align: center; }
.ms-confetti__art { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
.ms-confetti__art > svg { position: absolute; }
.ms-confetti > :not(.ms-confetti__art) { position: relative; z-index: 1; }
/* 5 shapes placed in the side gutters and the corners, never across the text box */
.ms-confetti__art > :nth-child(1) { inset: 8% auto auto 2%;  width: 96px; }
.ms-confetti__art > :nth-child(2) { inset: 4% 6% auto auto;  width: 28px; rotate: 12deg; }
.ms-confetti__art > :nth-child(3) { inset: auto auto 6% 10%; width: 24px; }
.ms-confetti__art > :nth-child(4) { inset: auto 2% 10% auto; width: 112px; }
.ms-confetti__art > :nth-child(5) { inset: 46% auto auto 14%; width: 16px; }
@media (max-width: 767px) { .ms-confetti__art > :nth-child(n+4) { display: none; }
  .ms-confetti__art > :nth-child(1) { width: 56px; } }
```

Building an original piece: at most three hues plus the optional stroke, each different from the ground; crescent offset 12–18% of the radius toward the upper left (shade covers 25–35% at the lower right), shade = the base hue's `color.art.*Shade` partner. Compose asymmetrically: one large shape, one or two medium, the rest sparkles and dots. Pictograms show the subject of the item they sit next to (a feature, a setting group, a category) built from primitives: a sun and hill, a moon and dot, a cloud and drop, a stack of pills, a ring and dot.

**Motion.** Entry: confetti and plates fade in once on first view, `motion.duration.reveal`, `motion.easing.reveal`, delays in steps of `motion.duration.stagger` in reading order. Optional idle drift on at most one shape per screen: ±4px and ±10° over `motion.duration.breatheSlow`, `motion.easing.breathe`, alternate, infinite. Reduced motion: shapes appear at rest, no drift.

**Where.** Marketing section openers (4–6 confetti); header bands (2–3 shapes, trailing side); feature grids, settings groups, list items (spot plates); empty states (one `size.art` composition); error pages (a `color.art.stone` disc with a `color.art.lavender` crescent and a cloud with three round-cap drops); stat tiles (one `size.plateSm` plate); avatars without a photo; onboarding.

**Limits.** Max 6 confetti shapes per heading, one composition per card or panel, shapes in a header band only in its trailing third. Never over text, data or inputs; never inside tables, forms, dialogs or toasts (a 24px sparkle icon in a toast excepted). No outlines, no gradients, no faces.

### Breathing glyphs

**What.** Small glyphs (`size.glyphSm`–`size.glyphLg`) looping on slow cycles: a fat zigzag, a crescent with a sparkle, a spiral, a dot in a ring, two overlapping bubbles, three dots. Stroke glyphs: one path, stroke width 15% of the box, round caps and joins, one hue. Fill glyphs: 2–3 flat shapes from the kit. Each has its own cycle length, so a set never moves in step.

**Recipe.**

```html
<svg class="ms-glyph" viewBox="0 0 56 56" aria-hidden="true" focusable="false">
  <path class="ms-glyph__part" d="M8 36L18 20L28 36L38 20L48 36" fill="none" stroke-width="8.4"
        stroke-linecap="round" stroke-linejoin="round" style="stroke: var(--color-field-blue)"/></svg>
```

```css
.ms-glyph { width: var(--size-glyph); height: var(--size-glyph); flex: none; }
.ms-glyph__part { transform-box: fill-box; transform-origin: center;
  animation: ms-breathe var(--ms-breath, var(--motion-duration-breathe)) var(--motion-easing-breathe) infinite; }
@keyframes ms-breathe {
  0%, 50%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(0.87) rotate(15deg); }
  75% { transform: scale(0.87) rotate(-35deg); } }
@keyframes ms-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.48); } }   /* front bubble, motion.duration.breatheSlow */
@keyframes ms-orbit { 0% { transform: rotate(0deg); } 60%, 100% { transform: rotate(360deg); } } /* sparkle around a crescent */
@keyframes ms-pop { 0%, 100% { transform: scale(0); } 50% { transform: scale(1); } }
.ms-glyph--orbit .ms-glyph__part { animation: ms-orbit calc(var(--motion-duration-orbit) * 3) var(--motion-easing-breathe) infinite;
  transform-origin: 28px 28px; transform-box: view-box; }
.ms-glyph--pulse .ms-glyph__part { animation-name: ms-pulse; }
/* Give each glyph on a screen a different cycle */
.ms-glyph:nth-of-type(4n+2) { --ms-breath: var(--motion-duration-breathe-slow); }
.ms-glyph:nth-of-type(4n+3) { --ms-breath: calc(var(--motion-duration-breathe) * 0.85); }
.ms-glyph:nth-of-type(4n+4) { --ms-breath: calc(var(--motion-duration-breathe) * 1.22); }
.ms-glyph.is-offscreen .ms-glyph__part { animation-play-state: paused; }
.ms-glyph--still .ms-glyph__part { animation: none; }
/* Choice row or option tile: bordered, glyph still until hovered, focused or selected */
.ms-choice { display: flex; align-items: center; gap: var(--space-4); min-height: var(--size-list-row);
  padding: 0 var(--space-5); background: var(--color-surface-raised); border-radius: var(--radius-sm);
  border: var(--border-width-thick) solid var(--color-border-default); font-weight: var(--font-weight-bold);
  transition: border-color var(--motion-duration-ease) var(--motion-easing-snap); }
.ms-choice:hover { border-color: var(--color-border-strong); }
.ms-choice[aria-checked="true"], .ms-choice[aria-selected="true"] { border-color: var(--color-action-primary); }
.ms-choice .ms-glyph { width: var(--size-glyph-sm); height: var(--size-glyph-sm); }
.ms-choice:not(:hover, :focus-visible, [aria-checked="true"], [aria-selected="true"]) .ms-glyph__part { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .ms-glyph__part { animation: none; } }
```

Pause glyphs outside the viewport (an intersection observer toggles `is-offscreen`). The pop-dots loader is a glyph of three `size.dot` dots, each `ms-pop` over `motion.duration.pop`, delays of 0, 1 and 2 × `motion.duration.popStagger`.

**Motion.** Infinite loops: `ms-breathe` over `motion.duration.breathe` (variants `breatheSlow`, ×0.85, ×1.22), `motion.easing.breathe`; `ms-pulse` over `motion.duration.breatheSlow`; `ms-orbit` 360° in the first 60% of three `motion.duration.orbit`s, then rest. Reduced motion: every glyph holds its rest frame (scale 1, 0°); the pop-dots loader shows three static dots plus its "Loading" text.

**Where.** Choice lists, navigation cards and category rows (one per row, in the row's area hue); a dashboard's greeting card (one); empty states (`size.glyphLg`); loading (pop dots or a breathing disc, never a spinner); option tiles in forms (still until hovered, focused or selected); settings section icons (still, `size.glyphSm`).

**Limits.** At most six looping at once and never larger than `size.glyphLg`. Never in tables, inputs, next to changing numbers, or behind text.

### Chunky pills on a ledge

**What.** Every action is a pill or circle (rule 4), `size.controlSm`/`control`/`controlLg` tall, with a 2px transparent border so outline variants keep their size. Press: the pill sinks 2px onto its ledge. Selected tabs and filters are ink pills with a white `size.dot` dot.

**Recipe.**

```css
.ms-pill { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2);
  height: var(--size-control); padding: 0 var(--space-6); border-radius: var(--radius-full);
  border: var(--border-width-thick) solid transparent;
  font: var(--font-weight-bold) var(--font-size-body)/var(--font-line-height-control) var(--font-family-sans);
  letter-spacing: var(--font-tracking-tight); white-space: nowrap; cursor: pointer;
  background: var(--color-action-primary); color: var(--color-text-on-action); box-shadow: var(--shadow-ledge);
  transition-property: background-color, color, border-color, box-shadow, transform;
  transition-duration: var(--motion-duration-snap); transition-timing-function: var(--motion-easing-snap); }
.ms-pill:hover { background: var(--color-action-primary-hover); }
.ms-pill:active { transform: translateY(2px); box-shadow: var(--shadow-ledge-gone); }
.ms-pill:focus-visible { outline: var(--border-width-thick) solid var(--ms-ring, var(--color-focus-ring)); outline-offset: 2px; }
.ms-pill--accent { background: var(--color-action-accent); color: var(--color-text-on-accent); }
.ms-pill--accent:hover { background: var(--color-action-accent-hover); }
.ms-pill--cream { background: var(--color-action-secondary); color: var(--color-text-on-secondary); }
.ms-pill--cream:hover { background: var(--color-action-secondary-hover); }
.ms-pill--cream:active { background: var(--color-action-secondary-pressed); }
.ms-pill--outline { background: transparent; color: currentColor; border-color: currentColor; box-shadow: none; }
.ms-pill--outline:hover { background: var(--color-surface-hover); }
.ms-field .ms-pill { box-shadow: var(--shadow-ledge-on-field); }
.ms-pill--on-field { background: var(--color-action-on-field); color: var(--color-text-on-field-action); }
.ms-pill--on-field:hover { background: var(--color-action-on-field-hover); }
.ms-pill--sm { height: var(--size-control-sm); padding: 0 var(--space-5); }
.ms-pill--lg { height: var(--size-control-lg); padding: 0 var(--space-8); font-size: var(--font-size-body-lg); }
.ms-pill--mega { height: auto; padding: var(--space-4) var(--space-12); font-size: var(--font-size-mega);
  line-height: var(--font-line-height-mega); }
.ms-circle { width: var(--size-control); padding: 0; }
.ms-circle--sm { width: var(--size-circle-sm); height: var(--size-circle-sm); }
.ms-pill:disabled, .ms-pill[aria-disabled="true"] { background: var(--color-surface-hover);
  color: var(--color-text-secondary); box-shadow: none; transform: none; cursor: not-allowed; }
/* Tab or filter pill: <button class="ms-pill ms-pill--cream ms-tab" role="tab" aria-selected="false"> */
.ms-tab[aria-selected="true"], .ms-tab[aria-pressed="true"] { background: var(--color-action-primary); color: var(--color-text-on-action); }
.ms-tab[aria-selected="true"]::before, .ms-tab[aria-pressed="true"]::before { content: ""; width: var(--size-dot);
  height: var(--size-dot); border-radius: var(--radius-full); background: currentColor; }
@media (prefers-reduced-motion: reduce) { .ms-pill { transition: none; } }
@media (max-width: 639px) { .ms-pill--mega { font-size: var(--font-size-mega-mobile); } }
```

**Motion.** Hover and press: `motion.duration.snap`, `motion.easing.snap`, once. Reduced motion: the same states, swapped instantly (the 2px press offset stays — it is feedback, not decoration).

**Where.** Every button, tab, filter, segmented control, pagination (`size.control` circles, current ink), carousel arrows, table row actions (`size.circleSm` cream circles), the switch track, dialog footers, the closing band (one mega pill).

**Limits.** One blue pill per region (a band, a card, a dialog, a toolbar). No square buttons anywhere; no blurred shadow, glow, scale or lift on hover. Labels 1–3 words, sentence case.

### Product vignettes on color

**What.** Legible fragments of the product's own interface — a message bubble and a reply, a search pill being typed into, a progress card, a glass chip with an avatar, a name and a check — floating over a `radius.xl` color panel or a framed photo, offset diagonally with 10–20% overlap, building one after another when they come into view. They show what the product does, at real size.

**Recipe.**

```css
/* <figure class="ms-vignette ms-panel ms-hue--blue" aria-label="…"> holding .ms-vignette__card items, each style="--ms-i: n" */
.ms-vignette { display: grid; gap: var(--space-4); align-content: center; min-height: 360px; }
.ms-vignette__card { background: var(--color-surface-raised); color: var(--color-text-primary); border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5); max-width: 78%; font-size: var(--font-size-body); box-shadow: var(--shadow-float); }
.ms-vignette__card:nth-child(even) { justify-self: end; margin-block-start: calc(var(--space-4) * -1); }
.ms-vignette__card b { font-size: var(--font-size-label); font-weight: var(--font-weight-bold); }
.ms-dot { display: inline-block; width: var(--size-dot); height: var(--size-dot); border-radius: var(--radius-full);
  margin-inline-end: var(--space-2); }
.ms-dot--person { background: var(--color-field-blue); } .ms-dot--system { background: var(--color-field-orange); }
.ms-vignette.is-in .ms-vignette__card { animation: ms-build var(--motion-duration-vignette) var(--motion-easing-vignette) both;
  animation-delay: calc(var(--ms-i, 0) * var(--motion-duration-reveal)); }
@keyframes ms-build { 0% { opacity: 0; transform: translateY(8px); } 40% { opacity: 0.4; } 100% { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .ms-vignette.is-in .ms-vignette__card { animation: none; } }
```

Glass chip (photos only): `radius.full`, `color.surface.glass` with `backdrop-filter: blur(8px)`, `color.text.inverse`, 32px avatar, `font.size.label` bold name, a small check badge, `shadow.float`. Only cards that have not built yet are hidden: start the animation from a class added by the intersection observer, so without script the vignette is complete. Typed text in a search pill appears at 60–80ms per character, once.

**Motion.** Once on first view: each fragment `ms-build` (opacity 0 → 0.4 → 1, translateY 8px → 0) over `motion.duration.vignette`, `motion.easing.vignette`, starting `motion.duration.reveal` after the previous one. Reduced motion: the finished state, immediately.

**Where.** Hero and feature sections of front pages, onboarding and feature tours; an empty state as a 40%-opacity preview of the filled screen; a bubble holding the pop-dots glyph while an answer loads; a dashboard activity card.

**Limits.** One vignette per screen. Text inside at real size (≥ `font.size.label`). No device mockups or phone frames on product screens. The glass chip only sits on a photo.

## Color use

- Surfaces stack: `color.surface.default` page → `color.surface.subtle` card or panel → `color.surface.raised` input or card inside the cream; a field is its own layer.
- One large field per viewport (rule 1). Marketing screens give it 15–35% of the area; reading and product screens drop to the header band plus small hue accents (dots, tags, plates) under 5%.
- Hue accents mark the area's category (rule 2): a `size.dot` dot, a filled tag with on-field text, a plate or glyph. Up to four different hues on a product screen, all meaning categories.
- Status colors are dots, ticks, borders and short status text: `color.status.success` (green tick, "Saved"), `color.status.danger` (error border, message, alert glyph), `color.status.warning` (yellow fill or dot with ink text, never yellow text), `color.status.info` (blue dot or link text).
- Links inside text: `color.text.link`, underlined 1px with 3px offset; hover thickens the underline to 2px.
- Charts: `color.category.*` in order, flat fills, 3px lines with round caps, bars with `radius.sm` top corners, no gradients, only 1px `color.border.default` baselines, legends as `size.dot` dots before `font.size.label` labels.
- Dark (night): navy page, indigo panels; ink pills turn white with ink labels, blue keeps its role; fields and shapes keep their hues; `color.field.night` turns purple.

## Typography

| Role | Size | Line height | Weight | Tracking |
| --- | --- | --- | --- | --- |
| Mega pill label (one closing band) | `font.size.mega` (phones `megaMobile`) | `font.lineHeight.mega` | bold | tight |
| Hero headline | `font.size.display` (phones `displayMobile`) | `font.lineHeight.display` | bold | tight |
| Section heading; product page title | `font.size.h2` (phones `h2Mobile`) | `font.lineHeight.heading` | bold | tight |
| Sub-section, dashboard stat number | `font.size.h3` | `font.lineHeight.heading` | bold | tight |
| Card, panel, dialog, empty-state title | `font.size.h4` | `font.lineHeight.title` | bold | tight |
| Item title, FAQ question | `font.size.title` | `font.lineHeight.heading` | bold | tight |
| Lead, article body | `font.size.title` | `font.lineHeight.body` | regular | snug |
| Feature copy | `font.size.bodyLg` | `font.lineHeight.body` | medium | snug |
| Body, table cells, inputs | `font.size.body` | `font.lineHeight.body` | regular | normal |
| Buttons, tabs, nav | `font.size.body` (large `bodyLg`) | `font.lineHeight.control` | bold | tight |
| Labels, meta, table head | `font.size.label` | `font.lineHeight.label` | medium (table head bold) | snug |
| Eyebrow (optional, above a section heading) | `font.size.label`, uppercase | `font.lineHeight.label` | bold | eyebrow |
| Fine print, footer links, tags (codes: `font.family.mono` at `font.size.label`) | `font.size.fine` | `font.lineHeight.label` | medium | snug |

- One hero headline per screen; product screens top out at `font.size.h2`. Long headings break into two balanced lines (`text-wrap: balance`), centered on section openers, left-aligned in two-column heroes and header bands.
- Line length: prose `size.prose` (about 75 characters at the lead size), FAQ and forms `size.reading`, hero leads 480px max.

## Spacing and density

- Base 4px; use `space.*` only.
- Marketing sections `space.24` block padding (phones `space.16`); product body `space.12` below the header band, `space.8` between panels.
- Cards: `space.8` padding (phones `space.6`), grid gap `space.6`, rows of 3 or 4.
- Forms: `space.6` between fields, `space.2` label to input, `space.2` input to helper; sections `space.12` apart.
- Density is regular. Dense data screens keep `size.row` rows, `size.controlLg` inputs and `font.size.body`; they get denser by removing decoration (no confetti, no glyph loops), never by shrinking type below `font.size.label` or rows below `size.control`.

## Shape and depth

- Radius by size: `radius.full` pills, circles, toasts, switches, tags; `radius.xl` color panels, dialogs, empty-state panels; `radius.lg` cards and images; `radius.md` inputs, selects, menus, plan cards; `radius.sm` choice rows, stat tiles, skeleton lines; `radius.check` checkboxes.
- Borders: 2px `color.border.strong` on form controls; 2px `color.border.default` on choice rows; 1px `color.border.rule` between FAQ items and sections; 1px `color.border.default` between table rows. Cards never have borders.
- Depth (rule 9): tone first. Shadows exist only as `shadow.ledge`/`ledgeOnField` (pills), `shadow.header` (top bar after 8px of scroll) and `shadow.float` (menus, popovers, toasts, vignette cards and chips). Dialogs sit on `color.surface.overlay` without a shadow.

## Motion

UI is quick (`motion.duration.snap`, 2px; hover and press in Interaction), illustration slow (fades of `motion.duration.reveal`, breaths of 5–9s). Nothing bounces or overshoots; travel never exceeds 8px.

| Pattern | Trigger | From → to | Duration / easing | Iterations | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| Reveal | first view (marketing sections, confetti, card groups) | opacity 0 → 1 | `motion.duration.reveal`, `motion.easing.reveal`, delay `motion.duration.stagger` × index | once | shown at once |
| Breathing glyph | always while visible | scale 1 → 0.87, rotate +15° → 0 → −35° | `motion.duration.breathe`–`breatheSlow`, `motion.easing.breathe` | infinite, paused off-screen | rest frame |
| Vignette build | first view | opacity 0 → 0.4 → 1, translateY 8px → 0 | `motion.duration.vignette`, `motion.easing.vignette` | once | final state |
| Pop-dots loader | while loading | each dot scale 0 → 1 → 0 | `motion.duration.pop`, delay `motion.duration.popStagger` × index | infinite | three static dots + text |
| Skeleton | while loading | opacity 0.6 → 1 → 0.6 | `motion.duration.pulse`, `motion.easing.breathe` | infinite | static at 1 |
| Dialog, menu, toast enter | open | opacity 0 → 1, translateY 8px → 0 | `motion.duration.snap`, `motion.easing.snap` | once | appears in place |
| Disclosure | open / close | panel height 0 → auto, plus icon rotates 45° | `motion.duration.ease`, `motion.easing.snap` | once | instant |

Data, text and form fields on product screens appear immediately: no reveal on tables, lists, forms or numbers. Only content that is visible without script may be animated in, and only by a class added at runtime.

## Interaction

| Element | Hover | Focus-visible | Press | Open / selected |
| --- | --- | --- | --- | --- |
| Pills and circle buttons | fill one step darker (`action.*Hover`), `motion.duration.snap` | 2px `color.focus.ring` outline, 2px offset (`ringOnField` on blue, green, violet, night) | sink 2px, ledge gone | loading: pop-dots glyph, width kept |
| Tabs, filters, segmented | cream → `color.action.secondaryHover` | ring | sink 2px | selected: ink pill + white `size.dot` dot |
| Text links | underline 1px → 2px | ring around the text | — | current page: `color.text.primary`, no underline, bold |
| Nav links (top bar) | weight medium → bold, instant (reserve the bold width) | ring 2px offset | — | current: bold + `size.dot` dot in the area hue before the label |
| Linked cards | fill one step darker, title underlined | ring on the card | — | selected: 2px ink inset border + check disc |
| Choice rows, option tiles | border → `color.border.strong`, glyph breathes | ring | — | selected: 2px ink border + check disc |
| Inputs, selects | border → `color.text.secondary` | border → 2px `color.focus.ring` (the focus indicator; no outline, no glow) | — | error: 2px `color.status.danger` border |
| Disclosure rows (FAQ) | none | ring | toggles | plus turns 45° into ×, answer opens |
| Table rows | clickable rows only: `color.surface.subtle` | ring inset −2px | opens | selected: `color.surface.hover` + checked box |

Hover styles apply only under `@media (hover: hover)`. Touch press shows the same sink.

## Layout adaptation

- 12-column grid, max `size.container`, gutters `space.6`, side margins `space.12` desktop, `space.6` tablet, `space.4` phones. Two-column heroes and feature splits in `size.split`; reading, FAQ, forms and settings columns `size.reading`; prose `size.prose`.
- App shells: `size.header` white top bar, optional `size.sidebar` cream sidebar, white body.
- Below `breakpoint.md`: bands stack to one column, hero text centers, arcs drop to `size.arcSm`, confetti to three shapes, card grids to one column (two below `breakpoint.lg`), tables scroll in their frame with a sticky first column, pills keep their height and go full width in forms and dialogs.
- Priority on narrow screens: title and primary action first, data next, art last — art shrinks (plates to `size.plateSm`, compositions to 140px) but a header band keeps its hue and arc.
- Touch targets ≥ 44px; `size.circleSm` row actions get a 44px hit area.

## Applying the concept

| Context | What it uses | How strongly |
| --- | --- | --- |
| Product page header | Compact header band in the area hue with `size.arcSm` sag, `font.size.h2` title, one line, on-field pills, 2–3 shapes in its trailing third | always (not dashboards) |
| Front page, hero or landing | Full band with sag arc, display headline, lead, one blue + one on-field pill, a shape composition or vignette beside it, confetti | full |
| Section break | White ↔ cream alternation; confetti heading (4–6 shapes) opening each marketing section; never two fields touching | one per section |
| Card grid | Cream cards, no border; media `radius.lg`; items without an image get a cover (Imagery) | medium |
| FAQ or help | Header band; `size.reading` column of 1px-ruled rows with plus glyphs; filter pills | medium |
| Form | Header band; fields on white in `size.reading`; choice tiles with glyphs; ink submit, cream cancel, blue only if it converts | light |
| Settings | Cream header band; groups as cream panels, a `size.plateSm` plate or still glyph by each group title; switches; ink save; danger as a cream pill with a danger label | light |
| Dashboard | White header with a greeting and one breathing glyph; a row of 3–4 stat tiles in category hues (Card) as the screen's field; charts in category hues; cream panels | medium |
| Data table | Header band above; filter pills with the dot; category dots or tags in cells; cream circle row actions; nothing decorative inside | light, never none |
| Empty state | Panel in the area hue (cream if a field is in view), one `size.art` composition or `size.glyphLg` glyph, `font.size.h4` title, one line, one ink pill | medium |
| Error | Page errors: cream band with rise arc, stone disc + lavender crescent + rain cloud, plain heading, ink pill home. Inline errors: danger border and message, no art | full / light |
| Loading | Pop-dots glyph or a breathing disc for a whole region; cream skeletons (`radius.md`–`radius.lg`) with the opacity pulse for parts; visible "Loading" text | light |
| Toast or confirmation | Ink pill toast with a 24px sparkle or tick, one action; success screens get one composition and an orbiting sparkle | light |
| Dialog | White, `radius.xl`, cream footer with cream cancel + ink confirm; no art inside | light |
| Onboarding | One panel per step in the chosen area's hue, full composition or vignette, stepper of `size.circleSm` circles | full |
| Footer | Cream band with rise arc, link columns, a signup field + ink pill; `surface.inverse` bottom bar with round icon buttons | always |

## Imagery and icons

- Icons: solid filled glyphs with rounded terminals, one color (`color.text.icon` or on-field), `size.iconSm` in controls and `size.icon` elsewhere, on a 24px grid; never thin outline icon sets. Checkmarks are solid `color.status.success` ticks; list bullets may be `size.dot` dots in the area hue.
- Illustration: original shape-kit pieces only; subjects are the product's own things as primitives (a message as two bubbles, a goal as a ring and dot).
- **An item without an image** (a list, card or detail with no media) never gets a grey box or a generic picture icon: it gets a cover — a field in its category hue holding one composition of 2–3 shapes, centered, 50–65% of the box width, varied per item (rotate the pictogram, swap the second hue, move the crescent) so no two neighbours match.
- Photos: warm natural light, framed by color — a disc on a field-hue disc with a second-hue crescent peeking out, a `radius.lg` rectangle, or a blob; never edge-to-edge in a band. User uploads show as-is in a circle or `radius.lg` frame.
- Avatars without a photo: bold initials on a crescent disc in a category hue.

## Writing

Sentence case; warm, plain, second person; reassuring, never clinical. Headings are short phrases without a final period; questions work as section headings. Benefits as lists with green ticks. Empty and error text: one short sentence and one action.

## Accessibility

Text contrast at least 4.5:1 (7:1 for body text on the default surface); every `color.onField.*` passes on its field. Focus is always visible (Interaction). Form controls have 3:1 borders (`color.border.strong`). Touch targets ≥ 44px. Shapes, glyphs and confetti are `aria-hidden`; a vignette that carries meaning gets an `aria-label`. Selected states never rely on color alone (the dot, the check or the bold weight). Under `prefers-reduced-motion: reduce` loops stop at their rest frame, reveals and builds show the final state, and pills keep their color change and press offset without transition.

## Semantic color tokens — light

| Token | Value |
| --- | --- |
| `color.paper.white` | `#ffffff` |
| `color.paper.cream` | `#f9f4f2` |
| `color.paper.stone200` | `#e2ded9` |
| `color.paper.stone300` | `#c6c1b9` |
| `color.paper.stone350` | `#d6d1cb` |
| `color.paper.stone400` | `#969089` |
| `color.paper.stone600` | `#5f5a55` |
| `color.ink.600` | `#44423f` |
| `color.ink.700` | `#2d2c2b` |
| `color.ink.900` | `#141313` |
| `color.hue.yellow` | `#ffce00` |
| `color.hue.yellowShade` | `#ebb400` |
| `color.hue.yellowLight` | `#ffe14f` |
| `color.hue.blue` | `#0061ef` |
| `color.hue.blueShade` | `#0050c8` |
| `color.hue.blueFocus` | `#0040ea` |
| `color.hue.sky` | `#00a4ff` |
| `color.hue.skyShade` | `#008fe0` |
| `color.hue.orange` | `#ff7300` |
| `color.hue.orangeShade` | `#e05f00` |
| `color.hue.green` | `#02873e` |
| `color.hue.greenShade` | `#016b31` |
| `color.hue.pink` | `#ffa1cc` |
| `color.hue.pinkShade` | `#f283b5` |
| `color.hue.lavender` | `#ad85d1` |
| `color.hue.lavenderShade` | `#946bbb` |
| `color.hue.violet` | `#5432a5` |
| `color.hue.violetShade` | `#45288a` |
| `color.hue.red` | `#c8321e` |
| `color.hue.redNight` | `#ff8a73` |
| `color.hue.greenNight` | `#3ccf7e` |
| `color.hue.stoneDisc` | `#d9d4ce` |
| `color.hue.stoneDiscShade` | `#c4beb7` |
| `color.night.navy` | `#050726` |
| `color.night.indigo` | `#201f52` |
| `color.night.card` | `#2a2966` |
| `color.night.purple` | `#3b197f` |
| `color.night.muted` | `#c9c6e0` |
| `color.night.line` | `#ffffff29` |
| `color.night.control` | `#7c79a8` |
| `color.night.hover` | `#34337a` |
| `color.scrim.day` | `#14131366` |
| `color.scrim.night` | `#000000a3` |
| `color.scrim.glass` | `#14131373` |
| `color.surface.default` | `#ffffff` |
| `color.surface.subtle` | `#f9f4f2` |
| `color.surface.raised` | `#ffffff` |
| `color.surface.hover` | `#e2ded9` |
| `color.surface.pressed` | `#d6d1cb` |
| `color.surface.inverse` | `#2d2c2b` |
| `color.surface.overlay` | `#14131366` |
| `color.surface.glass` | `#14131373` |
| `color.text.primary` | `#2d2c2b` |
| `color.text.secondary` | `#5f5a55` |
| `color.text.onAction` | `#ffffff` |
| `color.text.onAccent` | `#ffffff` |
| `color.text.onSecondary` | `#2d2c2b` |
| `color.text.inverse` | `#ffffff` |
| `color.text.link` | `#0061ef` |
| `color.text.icon` | `#44423f` |
| `color.text.onFieldAction` | `#2d2c2b` |
| `color.border.default` | `#e2ded9` |
| `color.border.rule` | `#c6c1b9` |
| `color.border.strong` | `#969089` |
| `color.action.primary` | `#2d2c2b` |
| `color.action.primaryHover` | `#141313` |
| `color.action.accent` | `#0061ef` |
| `color.action.accentHover` | `#0050c8` |
| `color.action.secondary` | `#f9f4f2` |
| `color.action.secondaryHover` | `#e2ded9` |
| `color.action.secondaryPressed` | `#d6d1cb` |
| `color.action.onField` | `#ffffff` |
| `color.action.onFieldHover` | `#f9f4f2` |
| `color.focus.ring` | `#0040ea` |
| `color.focus.ringOnField` | `#ffffff` |
| `color.field.yellow` | `#ffce00` |
| `color.field.blue` | `#0061ef` |
| `color.field.orange` | `#ff7300` |
| `color.field.green` | `#02873e` |
| `color.field.pink` | `#ffa1cc` |
| `color.field.violet` | `#5432a5` |
| `color.field.night` | `#050726` |
| `color.field.cream` | `#f9f4f2` |
| `color.onField.yellow` | `#2d2c2b` |
| `color.onField.blue` | `#ffffff` |
| `color.onField.orange` | `#2d2c2b` |
| `color.onField.green` | `#ffffff` |
| `color.onField.pink` | `#2d2c2b` |
| `color.onField.violet` | `#ffffff` |
| `color.onField.night` | `#ffffff` |
| `color.onField.cream` | `#2d2c2b` |
| `color.category.1` | `#ffce00` |
| `color.category.2` | `#0061ef` |
| `color.category.3` | `#02873e` |
| `color.category.4` | `#ff7300` |
| `color.category.5` | `#5432a5` |
| `color.category.6` | `#ffa1cc` |
| `color.art.yellowShade` | `#ebb400` |
| `color.art.blueShade` | `#0050c8` |
| `color.art.sky` | `#00a4ff` |
| `color.art.skyShade` | `#008fe0` |
| `color.art.orangeShade` | `#e05f00` |
| `color.art.greenShade` | `#016b31` |
| `color.art.pinkShade` | `#f283b5` |
| `color.art.lavender` | `#ad85d1` |
| `color.art.lavenderShade` | `#946bbb` |
| `color.art.violetShade` | `#45288a` |
| `color.art.white` | `#ffffff` |
| `color.art.cream` | `#f9f4f2` |
| `color.art.stone` | `#d9d4ce` |
| `color.art.stoneShade` | `#c4beb7` |
| `color.art.stroke` | `#141313` |
| `color.status.success` | `#02873e` |
| `color.status.warning` | `#ffce00` |
| `color.status.danger` | `#c8321e` |
| `color.status.info` | `#0061ef` |

## Semantic color tokens — dark

| Token | Value |
| --- | --- |
| `color.paper.white` | `#ffffff` |
| `color.paper.cream` | `#f9f4f2` |
| `color.paper.stone200` | `#e2ded9` |
| `color.paper.stone300` | `#c6c1b9` |
| `color.paper.stone350` | `#d6d1cb` |
| `color.paper.stone400` | `#969089` |
| `color.paper.stone600` | `#5f5a55` |
| `color.ink.600` | `#44423f` |
| `color.ink.700` | `#2d2c2b` |
| `color.ink.900` | `#141313` |
| `color.hue.yellow` | `#ffce00` |
| `color.hue.yellowShade` | `#ebb400` |
| `color.hue.yellowLight` | `#ffe14f` |
| `color.hue.blue` | `#0061ef` |
| `color.hue.blueShade` | `#0050c8` |
| `color.hue.blueFocus` | `#0040ea` |
| `color.hue.sky` | `#00a4ff` |
| `color.hue.skyShade` | `#008fe0` |
| `color.hue.orange` | `#ff7300` |
| `color.hue.orangeShade` | `#e05f00` |
| `color.hue.green` | `#02873e` |
| `color.hue.greenShade` | `#016b31` |
| `color.hue.pink` | `#ffa1cc` |
| `color.hue.pinkShade` | `#f283b5` |
| `color.hue.lavender` | `#ad85d1` |
| `color.hue.lavenderShade` | `#946bbb` |
| `color.hue.violet` | `#5432a5` |
| `color.hue.violetShade` | `#45288a` |
| `color.hue.red` | `#c8321e` |
| `color.hue.redNight` | `#ff8a73` |
| `color.hue.greenNight` | `#3ccf7e` |
| `color.hue.stoneDisc` | `#d9d4ce` |
| `color.hue.stoneDiscShade` | `#c4beb7` |
| `color.night.navy` | `#050726` |
| `color.night.indigo` | `#201f52` |
| `color.night.card` | `#2a2966` |
| `color.night.purple` | `#3b197f` |
| `color.night.muted` | `#c9c6e0` |
| `color.night.line` | `#ffffff29` |
| `color.night.control` | `#7c79a8` |
| `color.night.hover` | `#34337a` |
| `color.scrim.day` | `#14131366` |
| `color.scrim.night` | `#000000a3` |
| `color.scrim.glass` | `#14131373` |
| `color.surface.default` | `#050726` |
| `color.surface.subtle` | `#201f52` |
| `color.surface.raised` | `#2a2966` |
| `color.surface.hover` | `#34337a` |
| `color.surface.pressed` | `#201f52` |
| `color.surface.inverse` | `#ffffff` |
| `color.surface.overlay` | `#000000a3` |
| `color.surface.glass` | `#14131373` |
| `color.text.primary` | `#ffffff` |
| `color.text.secondary` | `#c9c6e0` |
| `color.text.onAction` | `#2d2c2b` |
| `color.text.onAccent` | `#ffffff` |
| `color.text.onSecondary` | `#ffffff` |
| `color.text.inverse` | `#2d2c2b` |
| `color.text.link` | `#00a4ff` |
| `color.text.icon` | `#c9c6e0` |
| `color.text.onFieldAction` | `#2d2c2b` |
| `color.border.default` | `#ffffff29` |
| `color.border.rule` | `#ffffff29` |
| `color.border.strong` | `#7c79a8` |
| `color.action.primary` | `#ffffff` |
| `color.action.primaryHover` | `#f9f4f2` |
| `color.action.accent` | `#0061ef` |
| `color.action.accentHover` | `#0050c8` |
| `color.action.secondary` | `#2a2966` |
| `color.action.secondaryHover` | `#34337a` |
| `color.action.secondaryPressed` | `#201f52` |
| `color.action.onField` | `#ffffff` |
| `color.action.onFieldHover` | `#f9f4f2` |
| `color.focus.ring` | `#ffe14f` |
| `color.focus.ringOnField` | `#ffffff` |
| `color.field.yellow` | `#ffce00` |
| `color.field.blue` | `#0061ef` |
| `color.field.orange` | `#ff7300` |
| `color.field.green` | `#02873e` |
| `color.field.pink` | `#ffa1cc` |
| `color.field.violet` | `#5432a5` |
| `color.field.night` | `#3b197f` |
| `color.field.cream` | `#201f52` |
| `color.onField.yellow` | `#2d2c2b` |
| `color.onField.blue` | `#ffffff` |
| `color.onField.orange` | `#2d2c2b` |
| `color.onField.green` | `#ffffff` |
| `color.onField.pink` | `#2d2c2b` |
| `color.onField.violet` | `#ffffff` |
| `color.onField.night` | `#ffffff` |
| `color.onField.cream` | `#ffffff` |
| `color.category.1` | `#ffce00` |
| `color.category.2` | `#0061ef` |
| `color.category.3` | `#02873e` |
| `color.category.4` | `#ff7300` |
| `color.category.5` | `#5432a5` |
| `color.category.6` | `#ffa1cc` |
| `color.art.yellowShade` | `#ebb400` |
| `color.art.blueShade` | `#0050c8` |
| `color.art.sky` | `#00a4ff` |
| `color.art.skyShade` | `#008fe0` |
| `color.art.orangeShade` | `#e05f00` |
| `color.art.greenShade` | `#016b31` |
| `color.art.pinkShade` | `#f283b5` |
| `color.art.lavender` | `#ad85d1` |
| `color.art.lavenderShade` | `#946bbb` |
| `color.art.violetShade` | `#45288a` |
| `color.art.white` | `#ffffff` |
| `color.art.cream` | `#f9f4f2` |
| `color.art.stone` | `#d9d4ce` |
| `color.art.stoneShade` | `#c4beb7` |
| `color.art.stroke` | `#141313` |
| `color.status.success` | `#3ccf7e` |
| `color.status.warning` | `#ffce00` |
| `color.status.danger` | `#ff8a73` |
| `color.status.info` | `#00a4ff` |

## Primitive tokens

| Token | Value |
| --- | --- |
| `font.family.sans` | `Figtree, "DM Sans", system-ui, -apple-system, "Segoe UI", Pretendard, "Noto Sans KR", sans-serif` |
| `font.family.mono` | `"DM Mono", ui-monospace, SFMono-Regular, Menlo, D2Coding, monospace` |
| `font.size.mega` | `80px` |
| `font.size.display` | `64px` |
| `font.size.h2` | `40px` |
| `font.size.h3` | `32px` |
| `font.size.h4` | `24px` |
| `font.size.title` | `20px` |
| `font.size.bodyLg` | `18px` |
| `font.size.body` | `16px` |
| `font.size.label` | `14px` |
| `font.size.fine` | `12px` |
| `font.size.megaMobile` | `48px` |
| `font.size.displayMobile` | `40px` |
| `font.size.h2Mobile` | `32px` |
| `font.weight.regular` | `400` |
| `font.weight.medium` | `500` |
| `font.weight.bold` | `700` |
| `font.lineHeight.mega` | `1` |
| `font.lineHeight.display` | `1.12` |
| `font.lineHeight.heading` | `1.2` |
| `font.lineHeight.title` | `1.33` |
| `font.lineHeight.control` | `1.15` |
| `font.lineHeight.body` | `1.5` |
| `font.lineHeight.label` | `1.29` |
| `font.tracking.tight` | `-0.03em` |
| `font.tracking.snug` | `-0.01em` |
| `font.tracking.normal` | `0em` |
| `font.tracking.eyebrow` | `0.18em` |

| Token | Value |
| --- | --- |
| `space.1` | `4px` |
| `space.2` | `8px` |
| `space.3` | `12px` |
| `space.4` | `16px` |
| `space.5` | `20px` |
| `space.6` | `24px` |
| `space.8` | `32px` |
| `space.10` | `40px` |
| `space.12` | `48px` |
| `space.16` | `64px` |
| `space.20` | `80px` |
| `space.24` | `96px` |
| `space.32` | `128px` |

| Token | Value |
| --- | --- |
| `size.controlSm` | `40px` |
| `size.control` | `48px` |
| `size.controlLg` | `56px` |
| `size.circleSm` | `32px` |
| `size.row` | `52px` |
| `size.listRow` | `76px` |
| `size.header` | `80px` |
| `size.dot` | `10px` |
| `size.icon` | `24px` |
| `size.iconSm` | `16px` |
| `size.glyph` | `56px` |
| `size.glyphSm` | `40px` |
| `size.glyphLg` | `64px` |
| `size.plate` | `112px` |
| `size.plateSm` | `56px` |
| `size.art` | `200px` |
| `size.artLg` | `360px` |
| `size.arc` | `72px` |
| `size.arcSm` | `32px` |
| `size.container` | `1360px` |
| `size.split` | `1160px` |
| `size.reading` | `888px` |
| `size.prose` | `780px` |
| `size.sidebar` | `264px` |

| Token | Value |
| --- | --- |
| `radius.sm` | `8px` |
| `radius.md` | `12px` |
| `radius.lg` | `16px` |
| `radius.xl` | `24px` |
| `radius.check` | `6px` |
| `radius.full` | `9999px` |

| Token | Value |
| --- | --- |
| `border.width.hair` | `1px` |
| `border.width.thick` | `2px` |

| Token | Value |
| --- | --- |
| `shadow.ledge` | `0 2px 0 0 rgba(65, 61, 69, 0.2)` |
| `shadow.ledgeOnField` | `0 2px 0 0 rgba(26, 25, 25, 0.2)` |
| `shadow.ledgeGone` | `0 2px 0 0 rgba(65, 61, 69, 0)` |
| `shadow.header` | `0 5px 10px 0 rgba(0, 0, 0, 0.07)` |
| `shadow.float` | `0 2px 4px 0 rgba(20, 19, 19, 0.2)` |

| Token | Value |
| --- | --- |
| `motion.duration.snap` | `150ms` |
| `motion.duration.ease` | `300ms` |
| `motion.duration.reveal` | `500ms` |
| `motion.duration.stagger` | `100ms` |
| `motion.duration.vignette` | `750ms` |
| `motion.duration.pop` | `1000ms` |
| `motion.duration.popStagger` | `67ms` |
| `motion.duration.pulse` | `1200ms` |
| `motion.duration.orbit` | `1700ms` |
| `motion.duration.breathe` | `6000ms` |
| `motion.duration.breatheSlow` | `8000ms` |
| `motion.easing.snap` | `cubic-bezier(0.32, 0.94, 0.6, 1)` |
| `motion.easing.reveal` | `cubic-bezier(0, 0, 0.58, 1)` |
| `motion.easing.breathe` | `cubic-bezier(0.75, 0, 0.25, 1)` |
| `motion.easing.vignette` | `cubic-bezier(0.48, 0.04, 0.52, 0.96)` |

| Token | Value |
| --- | --- |
| `breakpoint.sm` | `640px` |
| `breakpoint.md` | `768px` |
| `breakpoint.lg` | `1024px` |
| `breakpoint.xl` | `1440px` |

## Components

### Button

**Purpose.** Triggers an action, or navigation that reads as an action. Inside running text use a link.

**Anatomy.** Pill → optional `size.iconSm` solid leading icon → label → optional trailing chevron. Circles hold one icon.

**Sizes.** Small `size.controlSm`, padding 0 `space.5`; default `size.control`, padding 0 `space.6`; large `size.controlLg`, padding 0 `space.8`, `font.size.bodyLg`. Label `font.size.body` bold, `font.tracking.tight`, gap `space.2`. Circles: `size.control` (pagination, carousel, media), `size.circleSm` (table row actions, 44px hit area). Mega: one per page, closing band only. Full width below `breakpoint.sm` in forms and dialogs.

**Variants.**
- Ink (default): `color.action.primary`, `color.text.onAction`. Every main action.
- Blue: `color.action.accent`, `color.text.onAccent`. The one conversion action of a region.
- Cream: `color.action.secondary`, `color.text.onSecondary`. Secondary actions, cancel, circle buttons.
- On-field: `color.action.onField`, `color.text.onFieldAction`, `shadow.ledgeOnField`. Any secondary pill on a field; a blue pill may sit on any field except blue.
- Outline: transparent, 2px `currentColor` border, no ledge. Tertiary actions on fields.
- Danger: cream pill with a `color.status.danger` label. Confirming a destructive action in a dialog uses the ink pill with a leading danger-colored alert glyph and a label naming the action.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | fill per variant, `shadow.ledge` |
| hover | fill one step darker: `color.action.primaryHover` / `accentHover` / `secondaryHover` / `onFieldHover`; `motion.duration.snap`, `motion.easing.snap` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset (`color.focus.ringOnField` on blue, green, violet and night fields) |
| active | translateY 2px, `shadow.ledgeGone`; cream → `color.action.secondaryPressed` |
| disabled | `color.surface.hover` fill, `color.text.secondary` label, no ledge, no press, `cursor: not-allowed` |
| loading | label hidden visually (kept for screen readers), the pop-dots glyph in the label color centered, width locked, `aria-busy="true"` |

**Token mapping.** As in Variants and States; radius `radius.full`, border `border.width.thick`.

**Keyboard and screen readers.** Native `<button>` (`<a>` for navigation); Enter and Space activate. Icon-only and circle buttons need `aria-label`. Loading keeps the accessible name and sets `aria-busy`.

**Do / Don't.** Do pair one ink or blue pill with a cream one. Don't square the corners, blur the ledge, scale on hover or put two blue pills in one region.

### Text field

**Purpose.** Single-line text, email, search, numbers; textarea for multi-line.

**Anatomy.** Label above → box → optional leading `size.iconSm` icon or trailing circle button → helper or error line.

**Sizes.** Box `size.controlLg` tall, padding 0 `space.4`, `font.size.body`, `radius.md`; textarea min 4 lines, padding `space.3` `space.4`. Label `font.size.body` medium, `space.2` above. Helper and error `font.size.label`, `space.2` below. Search variant is a pill: `radius.full`, leading icon, padding-inline `space.5`.

**Variants.** Default; search pill; with inline action (field + ink pill, gap `space.2`, as in a signup row); read-only code (`font.family.mono`, `color.surface.subtle` fill).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.surface.raised` fill, 2px `color.border.strong`, placeholder `color.text.secondary` |
| hover | border → `color.text.secondary`, `motion.duration.snap` |
| focus-visible | border → 2px `color.focus.ring`; no glow, no outline |
| disabled | `color.surface.subtle` fill, `color.text.secondary` text, border `color.border.default` |
| error | border 2px `color.status.danger`; message `color.status.danger`, `font.size.label` medium, after a 16px solid alert glyph; `aria-invalid="true"` |
| success (after an async check) | a 16px solid `color.status.success` tick and short text after the helper line |

**Token mapping.** As in States; text `color.text.primary`; radius `radius.md` (search `radius.full`).

**Keyboard and screen readers.** Visible `<label for>` always (never placeholder-only); helper and error linked with `aria-describedby`; on submit, focus moves to the first invalid field and a summary lists the errors.

**Do / Don't.** Do validate on blur and on submit and keep the typed value. Don't place inputs on a saturated field (white and cream only) or give them a shadow.

### Select

**Purpose.** Choose one option from a list of more than five. Five or fewer: choice tiles or a segmented pill row.

**Anatomy.** Label → box with value and a 16px solid chevron at the trailing edge → listbox menu.

**Sizes and tokens.** Box like Text field: `size.controlLg`, `radius.md`, padding 0 `space.12` 0 `space.4`. Menu: `color.surface.raised`, `radius.md`, `shadow.float`, padding `space.2`; options `size.control` tall, `radius.sm`, padding 0 `space.3`.

**Variants.** Native select styled as the box (preferred on phones); custom listbox; compact pill select in toolbars and filters (`size.controlSm`, `radius.full`, cream fill, ledge).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.surface.raised`, 2px `color.border.strong`, chevron `color.text.icon` |
| hover | border → `color.text.secondary` |
| focus-visible | border → 2px `color.focus.ring` |
| open | chevron rotates 180° over `motion.duration.snap`; menu enters opacity 0 → 1, translateY 8px → 0, `motion.duration.snap`, `motion.easing.snap` |
| option hover / active | `color.surface.subtle` fill |
| selected (option) | bold label + 16px solid ink tick at the trailing edge |
| disabled | `color.surface.subtle` fill, `color.text.secondary` |
| error | 2px `color.status.danger` border + message as Text field |

**Keyboard and screen readers.** Native `<select>` or the listbox pattern: Enter, Space or Alt+Down open, arrows move, typing jumps, Escape closes and returns focus; `aria-expanded`, `aria-activedescendant`.

**Do / Don't.** Do keep the label above. Don't use a select for two or three choices.

### Checkbox

**Purpose.** Turn one option on or off inside a form or list; several independent choices. Radios share this spec (circle with an ink inner dot).

**Anatomy.** 24px box (`radius.check`) → label `font.size.body` → optional helper `font.size.label` `color.text.secondary`. Radio: 24px circle with a `size.dot` inner dot.

**Sizes.** Box 24px with a 2px border; gap `space.3`; row min height 44px.

**Variants.** Plain; inside a choice row (the whole row is the hit area); indeterminate (ink bar 12×3px, `radius.full`).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.surface.raised` fill, 2px `color.border.strong` |
| hover | border → `color.text.secondary` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected | `color.action.primary` fill and border, solid tick in `color.text.onAction`; radio: ink border, ink inner dot; `motion.duration.snap` |
| disabled | `color.surface.subtle` fill, `color.border.default`, label `color.text.secondary` |
| error | 2px `color.status.danger` border + message below the group |

**Token mapping.** As in States; radius `radius.check` (radio `radius.full`).

**Keyboard and screen readers.** Native `<input type="checkbox">` or `radio` with a `<label>`; Space toggles; groups in a `<fieldset>` with a `<legend>`.

**Do / Don't.** Do use ink for checked. Don't use blue or a category hue for checked.

### Switch

**Purpose.** An immediate on/off setting that takes effect without saving. In forms that are submitted, use a checkbox.

**Anatomy.** Pill track 48×28px (`radius.full`) on `shadow.ledge` → 22px knob (`radius.full`) → label to the left, optional helper below.

**Sizes.** Track 48×28, knob 22px inset 3px, travel 20px; row min height `size.control`; label `font.size.body` medium.

**Variants.** Default (on = ink); area (on = the area's `color.category.*` when the setting belongs to one area; the knob stays white).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default (off) | track `color.surface.hover`, knob `color.art.white`, `shadow.ledge` |
| hover | off track → `color.surface.pressed`; on track → `color.action.primaryHover` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset around the track |
| selected (on) | track `color.action.primary` (in dark: white track, knob `color.text.onAction`), knob slides 20px over `motion.duration.snap`, `motion.easing.snap` |
| active | track sinks 2px, `shadow.ledgeGone` |
| disabled | track `color.surface.subtle`, knob `color.border.default`, label `color.text.secondary`, no ledge |

**Token mapping.** As in States.

**Keyboard and screen readers.** `<button role="switch" aria-checked>` or `<input type="checkbox" role="switch">`; Space toggles; the label names the setting, not the state.

**Do / Don't.** Do put the switch at the trailing edge of a settings row. Don't write on/off inside the track.

### Tabs

**Purpose.** Switch between views of the same content, or filter a list. Also covers segmented controls and filter chips.

**Anatomy.** Row of pills with `space.2` gap → optional `size.iconSm` icon or category dot → label. The selected pill gets a white `size.dot` dot before its label.

**Sizes.** `size.control` tall (`size.controlSm` in toolbars and above tables), padding 0 `space.5`, `font.size.body` bold, `font.tracking.tight`. A row that overflows scrolls horizontally.

**Variants.** Pill tabs (default); filter chips (multi-select, `aria-pressed`); segmented control (pills inside a cream track, `radius.full`, padding `space.1`, inner pills without a ledge).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.action.secondary` fill, `color.text.onSecondary`, `shadow.ledge` |
| hover | `color.action.secondaryHover`, `motion.duration.snap` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| active | sink 2px, `shadow.ledgeGone` |
| selected | `color.action.primary` fill, `color.text.onAction`, white `size.dot` dot before the label |
| disabled | `color.text.secondary`, no ledge |

**Token mapping.** As in States; radius `radius.full`.

**Keyboard and screen readers.** `role="tablist"`, `tab`, `tabpanel`, `aria-selected`; arrow keys move between tabs, Home and End jump. Filter chips are toggle buttons with `aria-pressed`.

**Do / Don't.** Do show the selected dot. Don't underline tabs or make the selected tab blue.

### Navigation

**Purpose.** Top bar, sidebar and mobile menu: where the user is and where they can go.

**Anatomy.** Top bar (`size.header`, `color.surface.default`): the product's own name as a wordmark in `font.size.title` bold (never a single-dot mark) → links → actions (one blue or ink pill, avatar). Optional sidebar (`size.sidebar`, `color.surface.subtle`): items each with a `size.dot` dot in its area's hue. Footer: see Applying the concept.

**Sizes.** Top-bar links `font.size.body` medium, gap `space.8`; actions `size.control` pills. Sidebar items `size.control` tall, `radius.full`, padding 0 `space.4`, gap `space.1`; group labels `font.size.label` bold `color.text.secondary`. Phones: top bar 64px; the menu button is a cream `size.control` circle.

**Variants.** Marketing top bar (links + blue pill); app top bar (area links or search pill + avatar); sidebar shell; mobile full-screen menu (`font.size.h4` bold links in `size.listRow` rows, 1px `color.border.rule`, pills at the bottom).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | links `color.text.primary`, medium |
| hover | top bar: weight → bold instantly (reserve the bold width with a hidden bold copy of the label); sidebar: `color.surface.hover` pill |
| focus-visible | 2px `color.focus.ring` outline, 2px offset (inset in the sidebar) |
| selected | top bar: bold + `size.dot` area-hue dot before the label, `aria-current="page"`; sidebar: ink pill (`color.action.primary`), white label and white dot |
| scrolled | top bar gets `shadow.header` after 8px of scroll |

**Token mapping.** As above; area dots `color.category.*`.

**Keyboard and screen readers.** `<nav aria-label>`, `aria-current="page"`, a skip link first; the mobile menu button has `aria-expanded`, the open menu traps focus and closes on Escape.

**Do / Don't.** Do color each area's dot with its hue. Don't fill the top bar with a field color.

### Card

**Purpose.** Group one item's content: an item in a grid, a feature, a quote, a stat, a plan, a group of settings.

**Anatomy.** Optional media (photo framed `radius.lg`, or a cover in the item's category hue with one shape composition) → optional category tag → title → body → meta or actions.

**Sizes.** Padding `space.8` (`space.12` for quote cards, `space.6` on phones); gap `space.4`; title `font.size.h4` or `font.size.title`; grid gap `space.6`; media 4:3 or 16:9.

**Variants and tokens.**
- Cream card (default): `color.surface.subtle`, `radius.lg`, no border, no shadow, on a white page.
- White card: `color.surface.raised` on cream or on a field.
- Stat tile: a small field in a category hue (`radius.sm`, padding `space.6`): label `font.size.label` bold, number `font.size.h3` bold, caption `font.size.body`, all in that hue's `color.onField.*`; optional `size.plateSm` plate.
- Plan card: white, `radius.md`, 2px `color.border.default`; selected: `color.field.violet`, white text and check disc.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | as variant |
| hover (linked cards) | fill one step darker (`color.surface.subtle` → `color.surface.hover`; white → `color.surface.subtle`), title underlined, `motion.duration.snap` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset, around the whole card |
| active | fill `color.surface.pressed` |
| selected | 2px `color.action.primary` inset border + ink check disc (plan cards: violet field) |
| disabled | content `color.text.secondary`, no hover |
| loading | cream skeleton blocks (`radius.md`) for media, title and two lines, with the opacity pulse |

**Keyboard and screen readers.** A linked card is one link (stretched from the title over the card); other buttons inside sit above it. Covers and shapes are `aria-hidden`.

**Do / Don't.** Do separate cards from the page by tone. Don't add borders or shadows, or lift cards on hover.

### Table

**Purpose.** Compare many records by several attributes. Under four columns, or on phones, use stacked label–value rows.

**Anatomy.** Optional toolbar (search pill, filter pills with the selected dot, compact pills) → frame (`color.surface.default`, `radius.lg`, `overflow: hidden`, 1px `color.border.default` outline) → head row on `color.surface.subtle` → body rows separated by 1px `color.border.default` → optional footer with pagination circles.

**Sizes.** Head row 44px, `font.size.label` bold `color.text.icon`, sentence case; body rows `size.row`, cell padding 0 `space.4`, `font.size.body`; compact mode `size.control` rows with `font.size.label`. Row actions `size.circleSm` cream circles. Numbers right-aligned, tabular.

**Variants.** Read-only; clickable rows; selectable (checkbox column first); with a category column (`size.dot` dot + label, or a filled tag in the category hue with its on-field text, `font.size.fine` bold).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | white rows, 1px rules, no zebra |
| hover | clickable rows only: `color.surface.subtle`, `motion.duration.snap` |
| focus-visible | 2px `color.focus.ring` outline inset −2px on the row or cell |
| selected | `color.surface.hover` fill + checked box, `aria-selected="true"` |
| loading | head stays; five body rows of cream skeleton bars (`radius.sm`, 12px tall, 40–80% of the cell) with the opacity pulse |
| empty | one full-width row holding the empty state (glyph `size.glyph`, one sentence, one ink pill) |
| error | one row: `color.status.danger` alert glyph + message in `color.text.primary` + cream "Try again" pill |

**Token mapping.** As in Anatomy and States; meta text `color.text.secondary`.

**Keyboard and screen readers.** Real `<table>` with `<th scope>`; sortable heads are buttons with `aria-sort` and a 16px chevron; the scroll container is focusable with an `aria-label`.

**Do / Don't.** Do show categories with a dot or tag. Don't put shapes, glyphs or a field behind or inside the table.

### Badge

**Purpose.** A short label for status, category or count. Not interactive (use filter pills for that).

**Anatomy.** Pill (`radius.full`) → optional `size.dot` dot or 12px solid icon → label.

**Sizes.** Height 24px, padding 0 `space.3`, `font.size.fine` bold, `font.tracking.snug`; count badge min-width 20px, height 20px.

**Variants.**
- Category tag: filled in the category hue (`color.category.*`) with its on-field text color (ink on yellow, orange and pink; white on blue, green and violet).
- Status: `color.surface.subtle` fill, `color.text.primary` label, leading dot in `color.status.success` / `warning` / `danger` / `info`.
- Highlight (an offer, "new"): `color.field.yellow` fill, ink label; one per card.
- On a field: `color.surface.raised` fill, ink label. On a photo: the glass chip.
- Count: `color.action.primary` fill, `color.text.onAction`.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | as variant; static |

**Token mapping.** As in Variants; radius `radius.full`.

**Keyboard and screen readers.** Plain text; the status meaning is in the label, never only in the dot color. Counts get a visually hidden noun.

**Do / Don't.** Do keep labels to one or two words. Don't show more than four category hues in one view.

### Dialog

**Purpose.** A short task or confirmation that blocks the page. Long tasks get their own screen.

**Anatomy.** Scrim (`color.surface.overlay`) → panel (`color.surface.default`, `radius.xl`, max-width 560px) → title `font.size.h4` bold → body `font.size.body` → footer (`color.surface.subtle`, actions right-aligned) → close circle (`size.circleSm`, cream, top right).

**Sizes.** Panel padding `space.8` (`space.6` on phones); footer padding `space.6` `space.8`, gap `space.3`. On phones the dialog is a bottom sheet with `radius.xl` top corners and full-width stacked pills.

**Variants.** Confirm (cream cancel + ink confirm); destructive (cream cancel + ink pill with a leading `color.status.danger` alert glyph and a label naming the action); form dialog (fields on white, ink submit).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default (open) | scrim and panel enter: opacity 0 → 1, panel translateY 8px → 0, `motion.duration.snap`, `motion.easing.snap`; no shadow |
| focus-visible | focus moves to the first field or the least destructive action; 2px `color.focus.ring` |
| closing | the reverse over `motion.duration.snap`; reduced motion: instant |

**Token mapping.** As in Anatomy.

**Keyboard and screen readers.** `role="dialog"` (`alertdialog` for destructive), `aria-modal`, `aria-labelledby`; focus trapped; Escape and the close circle close it; focus returns to the trigger.

**Do / Don't.** Do keep it to one decision. Don't put shapes, glyphs or a field inside a dialog.

### Toast

**Purpose.** Brief confirmation of something that already happened, with at most one action (undo, view).

**Anatomy.** Pill (`color.surface.inverse`, `radius.full`, `shadow.float`) → 24px leading mark (a sparkle from the shape kit for success, a solid `color.status.danger` alert glyph for failure, a `color.status.info` dot otherwise) → text `font.size.body` medium → optional text action, bold, underlined.

**Sizes.** Height 48px, padding 0 `space.5`, gap `space.3`, max-width 480px; bottom center, `space.6` from the edge; up to three stacked, gap `space.2`.

**Variants.** Success, info, error (error toasts stay until dismissed and add a close circle).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | enters opacity 0 → 1, translateY 8px → 0 over `motion.duration.snap`, `motion.easing.snap`; the success sparkle turns once (`ms-orbit`); stays 5s, pauses on hover and focus; leaves opacity 1 → 0 over `motion.duration.snap` |

**Token mapping.** As in Anatomy; text `color.text.inverse`, sparkle `color.field.yellow`.

**Keyboard and screen readers.** Container `role="status"` (`role="alert"` for errors), `aria-live="polite"`; the action is reachable by keyboard; a toast is never the only report of a form error.

**Do / Don't.** Do keep it to one line. Don't stack more than three or use it for errors the user must fix in a form.

## New project

1. Inspect the framework, styling approach and component structure. Propose an installation plan, including the area-to-hue map (rule 2), and wait for approval.
2. Install the tokens: copy `dist/tokens.css` into the project's global styles (or map `dist/tokens.json` into the theme system the project already uses). Do not retype values. Dark mode follows `prefers-color-scheme`; `data-theme="dark"` or `"light"` on the root forces a mode.
3. Load Figtree (400, 500, 700) and DM Mono (400) with their fallbacks, including the CJK fallback. Set `font.family.sans` and `color.text.primary` on the body and `color.surface.default` on the page.
4. Build the signature elements first, as reusable pieces: hue classes and field bands (sag, rise, header band, panel, night wave); the shape kit (crescent disc, two-color disc, sparkle, cloud, spot plate, confetti, item cover) with 6–10 original pictograms of this product's own subjects; breathing glyphs, the pop-dots loader and the choice row; every pill variant, tab pill and circle; the vignette; the reveal helper. Then the interaction states from Interaction.
5. Build the base components in the order of the component list, each with every specified state. Place the signature elements as Applying the concept says.
6. Create `design-system/` in the repository with `VERSION` (the system id and update date the spec states, e.g. `morning-shapes, updated 2026-01-31`), the tokens, and a short `components.md` of the conventions you established: the area-to-hue map, the pictogram subjects, where each signature element is used and how to reuse it.
7. Add one line to `AGENTS.md` and `CLAUDE.md` (create them if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit: styling approach, global styles, shared components, routes, tests. List what the change would touch and what must be preserved.
2. Propose a migration plan, including the area-to-hue map, and wait for approval.
3. Map the tokens onto the project's existing variables or theme. Keep existing variable names working (alias them) so nothing breaks mid-migration.
4. Build the signature elements as reusable pieces, then restyle one representative screen as a sample (area header band with its arc, pills on the ledge, shapes or a glyph as Applying the concept places them) and wait for review.
5. Continue screen by screen, one commit per screen. Adapt to the existing information structure; never force a layout from a reference image.
6. Preserve: routes, business logic, API contracts, form fields and validation, test ids, labels used by tests, accessibility attributes.
7. Finish with the `design-system/` folder and the `AGENTS.md` / `CLAUDE.md` pointer described under New project.

## Ongoing development

- Before building UI, read `design-system/`. Use semantic tokens and existing components; do not hard-code colors, sizes, radii or shadows.
- Every new screen gets the signature elements its context calls for in Applying the concept — a new screen without them is unfinished. A new top-level area takes the next hue in the map.
- New pictograms and compositions follow the shape-kit rules (flat, at most three hues, one crescent, no outlines, no faces); reuse the kit before drawing more.
- If a need is not covered by the system, compose from existing tokens, then note it in `design-system/components.md`.
- If a request conflicts with the system, present the options instead of deciding silently.

## Verification

- The project builds and its tests pass.
- Every screen was checked at 1440px and 390px wide, in light and dark.
- Each viewport holds at most one large field; no two fields touch; no field sits behind a table, form fields or long text; every field's text uses its `color.onField.*` token (no white on yellow, orange or pink).
- Every full-bleed band has its arc (sag below a top band, rise above a closing band or footer, wave on night); panels are `radius.xl` and unarched.
- Every product screen except dashboards opens with a header band in its area's hue; the same hue marks that area's nav dot, tags and empty state.
- Every button, tab and filter is a pill or circle on the ledge that darkens on hover and sinks 2px on press; one blue pill per region at most; the selected tab is ink with a white dot.
- Shapes are flat (three hues, one crescent, no outlines, gradients or faces), never over text, data or inputs, never inside tables, forms, dialogs or toasts.
- At most six glyphs loop at once, each on a different cycle, none larger than `size.glyphLg`, none in tables or next to changing numbers; they pause off-screen.
- No item without an image shows a grey box or a picture icon: it has a cover in its category hue.
- Cards have no borders or shadows.
- Focus is visible on every interactive element; text meets the contrast rules in this document.
- With reduced motion, glyphs hold their rest frame, reveals and vignettes show their final state, and every screen stays readable.
- No raw color, size or radius values were introduced outside the token files.
- Report: files changed, anything in this document you could not apply, decisions you made yourself.

## Rollback

- Each screen is its own commit, so any step can be reverted alone.
- Token installation is a separate commit; reverting it restores the previous look once the screen commits are reverted.
- The shape kit and glyphs are their own commit; they are `aria-hidden`, so removing them leaves every screen working.
