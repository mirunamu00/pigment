## Character

A sunny, toy-like language: warm white and cream pages broken by whole fields of full-strength color — yolk yellow, bright blue, tangerine, leaf green, night navy — whose edges bulge like a horizon, each product area owning one hue. Flat shapes shaded with one darker crescent scatter as confetti and sit as pictograms in round plates; small glyphs breathe slowly. Everything you touch is a chunky pill on a hard 2px ledge that sinks when pressed, in one bold grotesque. No pastels, gradients, outlines, faces or soft shadows.

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

Build these first, as reusable pieces. Class names are a suggestion; structure and values are the rule.

### Sunny color fields with bulging edges

**What.** Whole sections in one flat `color.field.*` hue with its `color.onField.*` text. Three forms: a full-bleed **band**, a compact **header band** opening product screens, and a contained **panel** (`radius.xl`). Bands bulge into the white page (rule 3). Inside: on-field text, white or cream cards, on-field pills, shapes in other hues.

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
/* Header-band art: one cluster (below) centered in the trailing third; text stays left of it */
.ms-field__art { position: absolute; inset-block: var(--space-4); inset-inline-end: var(--space-6); width: 33%;
  display: grid; place-items: center; pointer-events: none; }
.ms-field__art > svg { height: 100%; max-width: 100%; }
.ms-field--header .ms-field__inner { padding-inline-end: 33%; }
.ms-panel { background: var(--ms-field); color: var(--ms-on-field); border-radius: var(--radius-xl);
  padding: var(--space-12); position: relative; overflow: clip; }
.ms-field :focus-visible, .ms-panel :focus-visible { outline-color: var(--ms-ring, var(--color-focus-ring)); }
@media (max-width: 767px) {
  .ms-field { --ms-arc: var(--size-arc-sm); padding-block: var(--space-16); }
  .ms-field__inner, .ms-field--header .ms-field__inner { padding-inline: var(--space-6); }
  .ms-field__art { width: 40%; }
  .ms-panel { padding: var(--space-8) var(--space-6); }
}
```

```html
<!-- Header-band cluster: lead disc, overlapping cloud, tucked sparkle -->
<svg viewBox="0 0 160 120" aria-hidden="true" focusable="false">
  <clipPath id="c1"><circle cx="62" cy="64" r="48"/></clipPath>
  <g clip-path="url(#c1)"><rect width="160" height="120" style="fill: var(--color-art-orange-shade)"/>
    <circle cx="54" cy="56" r="48" style="fill: var(--color-field-orange)"/></g>
  <g style="fill: var(--color-art-white)"><rect x="100" y="78" width="56" height="22" rx="11"/>
    <circle cx="118" cy="80" r="14"/><circle cx="138" cy="78" r="12"/></g>
  <path d="M30 4Q30 16 42 16Q30 16 30 28Q30 16 18 16Q30 16 30 4Z" style="fill: var(--color-field-pink)"/></svg>
```

**Header-band cluster.** A band's shapes form one tight cluster, never stickers spread across it: one large crescent-shaded disc or blob (60–80% of the art box height); a medium second shape (a cloud, a blob or a pill) in a second hue overlapping its edge by 10–20% of its width; a sparkle or dot within 8–16px of the cluster. Every piece stays fully inside the band. Vary per area which shape leads, which side the second shape overlaps and where the sparkle sits, so no two bands share a layout.

Assign each area one `ms-hue--*` class on its header band, empty-state panel and nav dot (rule 2). Secondary text on a field is the on-field color itself; never a grey on a hue.

**Motion.** Static. Marketing band content fades in on first view (Reveal); product header bands appear instantly.

**Where.** Front-page hero (band, sag); every product screen except dashboards (header band in the area hue); dashboard stat tiles; closing call to action (band, rise, one mega pill); footer (cream, rise); empty states and onboarding steps (panel); pricing (night band, selected plan `color.field.violet`).

**Limits.** One large field per viewport; two saturated fields never touch (a cream footer may follow a saturated closing band). Never behind a table, form fields or over three lines of body text. Arcs only on full-bleed bands. Text always in the field's `color.onField.*` (ink on yellow, orange, pink, cream).

### Flat shape kit: crescent shading, sparkles, spot plates

**What.** Original flat shapes (rule 6): discs 32–128px, sparkles 16–40px, crescents, blobs, clouds, hexagons, pills, dots. **Two-color discs** (confetti only): a second hue covers 50–70% of a disc. **Spot plates**: a `size.plate` (or `size.plateSm`) circle in `color.art.cream` (or a field hue on white) holding a pictogram. **Confetti**: 4–6 shapes around a heading. Optional: one ink round-cap stroke, 10–15% of the piece's width.

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

Building an original piece: at most three hues plus the optional stroke, each different from the ground; crescent offset 12–18% of the radius toward the upper left (shade covers 25–35% at the lower right), shade = the base hue's `color.art.*Shade` partner — one hue and its own darker crescent, never two flat halves. Compose asymmetrically: one large shape, one or two medium, the rest sparkles and dots.

**Pictograms (plates, covers, empty states).** First name the subject in one noun, taken from the item, feature, setting group or category it sits beside. Build that noun's own outline from 2–3 crescent-shaded primitives, so a stranger could guess the subject without the title (a sun over a hill, a moon and a star, a cloud with drops, a padlock, an envelope, a calendar page). Dots, rings and plain discs are accents, never the whole pictogram. The pictogram fills 60–70% of its plate or cover, with one sparkle tucked within 8px of it. Compare neighbours: if two share the same main shape and layout, change the silhouette, the pose or the supporting shape — a hue swap alone is not a new drawing. An empty state gets a full composition or a `size.glyphLg` glyph, never a lone pair of dots.

**Motion.** Confetti and plates fade in once on first view (Reveal, staggered in reading order). Optional idle drift on at most one shape per screen: ±4px and ±10° over `motion.duration.breatheSlow`, `motion.easing.breathe`, alternate, infinite. Reduced motion: at rest, no drift.

**Where.** Marketing section openers (4–6 confetti); header bands (one cluster, trailing third); feature grids, settings groups, list items (spot plates); empty states (one `size.art` composition); error pages (a `color.art.stone` disc with a `color.art.lavender` crescent and a cloud with three round-cap drops); stat tiles (one `size.plateSm` plate); avatars without a photo; onboarding.

**Limits.** Max 6 confetti shapes per heading, one composition per card or panel, a header band's shapes one cluster in its trailing third. Never over text, data or inputs; never inside tables, forms, dialogs or toasts (a 24px sparkle icon in a toast excepted). No outlines, no gradients, no faces.

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

**Motion.** Infinite loops as in the recipe. Reduced motion: every glyph holds its rest frame (scale 1, 0°); the pop-dots loader shows three static dots plus its "Loading" text.

**Where.** Choice lists, navigation cards and category rows (one per row, in the row's area hue, its form chosen for the row's label); a dashboard's greeting card (one); empty states (`size.glyphLg`); loading (pop dots or a breathing disc, never a spinner); option tiles in forms (still until hovered, focused or selected); settings section icons (still, `size.glyphSm`).

**Limits.** At most six looping at once and never larger than `size.glyphLg`. Never in tables, inputs, next to changing numbers, or behind text.

### Chunky pills on a ledge

**What.** Every action is a pill or circle (rule 4), `size.controlSm`/`control`/`controlLg` tall; a 2px transparent border keeps outline variants the same size.

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

**Motion.** Hover and press: `motion.duration.snap`, `motion.easing.snap`. Reduced motion: states swap instantly; the 2px press offset stays (it is feedback).

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

Glass chip (photos only): `radius.full`, `color.surface.glass` with `backdrop-filter: blur(8px)`, `color.text.inverse`, 32px avatar, `font.size.label` bold name, check badge, `shadow.float`. Start the build from a class added by an intersection observer, so without script the vignette is complete. Typed text in a search pill: 60–80ms per character, once.

**Motion.** Once on first view, fragments build one after another as in the recipe. Reduced motion: the finished state, immediately.

**Where.** Hero and feature sections of front pages, onboarding and feature tours; an empty state as a 40%-opacity preview of the filled screen; a bubble holding the pop-dots glyph while an answer loads.

**Limits.** A vignette is an illustrative fragment, never the product's real data: a live feed, list or table of real records renders at once and in full, with no build. One vignette per screen. Text inside at real size (≥ `font.size.label`). No device mockups or phone frames on product screens. The glass chip only sits on a photo.

## Color use

- Surfaces stack: `color.surface.default` page → `color.surface.subtle` card or panel → `color.surface.raised` input or card inside the cream; a field is its own layer.
- Marketing screens give the one field 15–35% of the area; reading and product screens the header band plus hue accents (dots, tags, plates) under 5%.
- Hue accents mark the area's category (rule 2): a `size.dot` dot, a filled tag with on-field text, a plate or glyph. Up to four different hues on a product screen, all meaning categories.
- Status colors are dots, ticks, borders and short status text: `color.status.success` (green tick, "Saved"), `color.status.danger` (error border, message, alert glyph), `color.status.warning` (yellow fill or dot with ink text, never yellow text), `color.status.info` (blue dot or link text).
- Links inside text: `color.text.link`, 1px underline, 3px offset (2px on hover).
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

- One hero headline per screen; product screens top out at `font.size.h2`. Long headings `text-wrap: balance`, centered on section openers, left-aligned in two-column heroes and header bands.
- Line length: prose `size.prose` (about 75 characters at the lead size), FAQ and forms `size.reading`, hero leads 480px max.

## Spacing and density

- Base 4px; use `space.*` only.
- Marketing sections `space.24` block padding (phones `space.16`); product body `space.12` below the header band, `space.8` between panels.
- Cards: `space.8` padding (phones `space.6`), grid gap `space.6`, rows of 3 or 4.
- Forms: `space.6` between fields, `space.2` label to input, `space.2` input to helper; sections `space.12` apart.
- Dense data screens keep `size.row` rows, `size.controlLg` inputs and `font.size.body`; they get denser by removing decoration (no confetti, no glyph loops), never by shrinking type below `font.size.label` or rows below `size.control`.

## Shape and depth

- Radius by size: `radius.full` pills, circles, toasts, switches, tags; `radius.xl` color panels, dialogs, empty-state panels; `radius.lg` cards and images; `radius.md` inputs, selects, menus, plan cards; `radius.sm` choice rows, stat tiles, skeleton lines; `radius.check` checkboxes.
- Borders: 2px `color.border.strong` on form controls; 2px `color.border.default` on choice rows; 1px `color.border.rule` between FAQ items and sections; 1px `color.border.default` between table rows. Cards never have borders.
- Depth (rule 9): tone first. Shadows exist only as `shadow.ledge`/`ledgeOnField` (pills), `shadow.header` (top bar after 8px of scroll) and `shadow.float` (menus, popovers, toasts, vignette cards and chips). Dialogs sit on `color.surface.overlay` without a shadow.

## Motion

UI is quick (`motion.duration.snap`), illustration slow. Nothing bounces or overshoots; travel never exceeds 8px.

| Pattern | Trigger | From → to | Duration / easing | Iterations | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| Reveal | first view (marketing sections, confetti, card groups) | opacity 0 → 1 | `motion.duration.reveal`, `motion.easing.reveal`, delay `motion.duration.stagger` × index | once | shown at once |
| Breathing glyph | always while visible | scale 1 → 0.87, rotate +15° → 0 → −35° | `motion.duration.breathe`–`breatheSlow`, `motion.easing.breathe` | infinite, paused off-screen | rest frame |
| Vignette build | first view | opacity 0 → 0.4 → 1, translateY 8px → 0 | `motion.duration.vignette`, `motion.easing.vignette` | once | final state |
| Pop-dots loader | while loading | each dot scale 0 → 1 → 0 | `motion.duration.pop`, delay `motion.duration.popStagger` × index | infinite | three static dots + text |
| Skeleton | while loading | opacity 0.6 → 1 → 0.6 | `motion.duration.pulse`, `motion.easing.breathe` | infinite | static at 1 |
| Dialog, menu, toast enter | open | opacity 0 → 1, translateY 8px → 0 | `motion.duration.snap`, `motion.easing.snap` | once | appears in place |
| Disclosure | open / close | panel height 0 → auto, plus icon rotates 45° | `motion.duration.ease`, `motion.easing.snap` | once | instant |

Data, text and form fields on product screens appear immediately: no reveal or build on tables, lists, feeds, forms or numbers. Only content that is visible without script may be animated in, and only by a class added at runtime.

## Interaction

| Element | Hover | Focus-visible | Press | Open / selected |
| --- | --- | --- | --- | --- |
| Pills and circle buttons | fill one step darker (`action.*Hover`) | 2px `color.focus.ring` outline, 2px offset (`ringOnField` on blue, green, violet, night) | sink 2px, ledge gone | loading: pop-dots, width kept |
| Tabs, filters, segmented | cream → `color.action.secondaryHover` | ring | sink 2px | selected: ink pill + white `size.dot` dot |
| Text links | underline 1px → 2px | ring around the text | — | current page: `color.text.primary`, no underline, bold |
| Nav links (top bar) | medium → bold, instant (reserve the bold width) | ring | — | current: bold + area-hue `size.dot` dot |
| Linked cards | fill one step darker, title underlined | ring on the card | — | selected: 2px ink inset border + check disc |
| Choice rows, option tiles | border → `color.border.strong`, glyph breathes | ring | — | selected: 2px ink border + check disc |
| Inputs, selects | border → `color.text.secondary` | border → 2px `color.focus.ring` (the focus indicator; no outline, no glow) | — | error: 2px `color.status.danger` border |
| Disclosure rows (FAQ) | none | ring | toggles | plus turns 45° into ×, answer opens |
| Table rows | clickable rows only: `color.surface.subtle` | ring inset −2px | opens | selected: `color.surface.hover` + checked box |

Hover only under `@media (hover: hover)`; touch press shows the same sink.

## Layout adaptation

- 12-column grid, max `size.container`, gutters `space.6`, side margins `space.12` desktop, `space.6` tablet, `space.4` phones. Two-column heroes and feature splits in `size.split`; reading, FAQ, forms and settings columns `size.reading`; prose `size.prose`.
- App shells: `size.header` white top bar, optional `size.sidebar` cream sidebar, white body.
- Below `breakpoint.md`: bands stack to one column, hero text centers, arcs drop to `size.arcSm`, confetti to three shapes, card grids to one column (two below `breakpoint.lg`), tables scroll in their frame with a sticky first column, pills keep their height and go full width in forms and dialogs.
- Priority on narrow screens: title and primary action first, data next, decoration last. An image or cover that pictures the item itself (a product, a listing, a profile, a document) is content: it stays directly after the title, scaled down if needed. Only decorative shapes, confetti and compositions move last; they shrink (plates to `size.plateSm`, compositions to 140px), and a header band keeps its hue and arc.
- Touch targets ≥ 44px; `size.circleSm` row actions get a 44px hit area.

## Applying the concept

| Context | What it uses | How strongly |
| --- | --- | --- |
| Product page header | Compact header band in the area hue with `size.arcSm` sag, `font.size.h2` title, one line, on-field pills, one shape cluster in its trailing third | always (not dashboards) |
| Front page, hero or landing | Full band with sag arc, display headline, lead, one blue + one on-field pill, a shape composition or vignette beside it, confetti | full |
| Section break | White ↔ cream alternation; a confetti heading opens each marketing section | one per section |
| Card grid | Cream cards, no border; media `radius.lg`; items without an image get a cover (Imagery) | medium |
| FAQ or help | Header band; `size.reading` column of 1px-ruled rows with plus glyphs; filter pills | medium |
| Form | Header band; fields on white in `size.reading`; choice tiles with glyphs; ink submit, cream cancel, blue only if it converts | light |
| Settings | Cream header band; groups as cream panels, a `size.plateSm` plate or still glyph by each group title; switches; ink save; danger as a cream pill, danger label | light |
| Dashboard | White header with a greeting and one breathing glyph; a row of 3–4 stat tiles in category hues (Card) is the screen's one saturated field; charts in category hues; every other panel cream (indigo at night), as tall as its content | medium |
| Data table | Header band above; filter pills with the dot; category dots or tags in cells; cream circle row actions; nothing decorative inside | light, never none |
| Empty state | Panel in the area hue (cream if a field is in view), one `size.art` composition or `size.glyphLg` glyph, `font.size.h4` title, one line, one ink pill | medium |
| Error | Page: cream band with rise arc, the error composition (Shape kit), plain heading, ink pill home. Inline: danger border and message, no art | full / light |
| Loading | Pop-dots glyph or a breathing disc for a whole region; cream skeletons (`radius.md`–`radius.lg`) with the opacity pulse for parts; visible "Loading" text | light |
| Toast or confirmation | Ink pill toast with a 24px sparkle or tick, one action; success screens get one composition and an orbiting sparkle | light |
| Dialog | White, `radius.xl`, cream footer with cream cancel + ink confirm; no art inside | light |
| Onboarding | One panel per step in the chosen area's hue, full composition or vignette, stepper of `size.circleSm` circles | full |
| Footer | Cream band with rise arc, link columns, a signup field + ink pill; `surface.inverse` bottom bar with round icon buttons | always |

## Imagery and icons

- Icons: solid filled glyphs with rounded terminals, one color (`color.text.icon` or on-field), `size.iconSm` in controls and `size.icon` elsewhere, on a 24px grid; never thin outline icon sets. Checkmarks are solid `color.status.success` ticks; list bullets may be `size.dot` dots in the area hue.
- Illustration: original shape-kit pieces only; subjects are the product's own things as primitives (a message as two bubbles, a goal as a ring and dot).
- **An item without an image** (a list, card or detail with no media) never gets a grey box or a generic picture icon: it gets a cover — a field in its category hue holding one pictogram of its subject (Pictograms), centered, 60–70% of the box.
- Photos: warm natural light, framed by color — a disc on a field-hue disc with a second-hue crescent peeking out, a `radius.lg` rectangle, or a blob; never edge-to-edge in a band. User uploads show as-is in a circle or `radius.lg` frame.
- Avatars without a photo: bold initials on a crescent disc in a category hue.

## Writing

Sentence case; warm, plain, second person; reassuring, never clinical. Headings are short phrases without a final period; questions work as section headings. Benefits as lists with green ticks. Empty and error text: one short sentence and one action.

## Accessibility

Text contrast at least 4.5:1 (7:1 for body text on the default surface); every `color.onField.*` passes on its field. Focus always visible. Form controls have 3:1 borders (`color.border.strong`). Touch targets ≥ 44px. Shapes, glyphs and confetti are `aria-hidden`; a meaningful vignette gets an `aria-label`. Selected states never rely on color alone (dot, check or bold). Reduced motion: loops rest, reveals and builds show the final state, pills change without transition.
