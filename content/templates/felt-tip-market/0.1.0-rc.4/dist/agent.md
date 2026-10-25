# Felt-tip Market 0.1.0-rc.4

Design system `felt-tip-market@0.1.0-rc.4`. A cheerful storefront drawn in black felt-tip: ink hairlines on paper, flat poster-color bands, chunky sticker objects, one big grotesk. Buttons lift on a hard black shadow. Suits stores, creator tools and marketplaces.

This document is the complete design specification. Use the values and rules here instead of your own defaults. Where something is not specified, choose the option most consistent with the rules below and say so in your report. Token values are also provided as `tokens.css` and `tokens.json` next to this file — copy them, do not retype them. Each token's CSS variable is its path with dots replaced by dashes and camelCase split by dashes: `color.text.onAction` → `--color-text-on-action`.

## Character

A loud, cheerful storefront drawn with a black felt-tip: paper and white boxes held together by 1px pure-ink hairlines and 4px corners, flat poster-color fields meeting at hard seams, chunky ink-outlined sticker objects strewn around huge friendly grotesk headlines, and buttons that lift off the page on a hard black shadow and slam flat when pressed. No gradients, no blur, no soft shadows, nothing shaded.

## The ten rules that define this look

1. **Every line is 1px ink.** Every border, divider, seam and outline on a product surface is `border.width.hair` in `color.border.default` (pure ink in light). Selected and error states go to `border.width.thick`. Why: the drawn, printed feel lives in the black hairline; a grey border makes it any SaaS.
2. **Paper ground, white boxes.** Pages sit on `color.surface.default`; every card, panel, input, row, dialog and menu is `color.surface.raised` with an ink hairline and `radius.sm`. Pills (`radius.full`) mean only "where you are" (current nav, current tab) and chips. Why: the paper–white–ink triad is the chrome; everything else is color fields.
3. **Color comes as whole flat fields.** Bands, split bands, sticker fills, plates and the price flag are solid `color.band.*`, `color.plate.*` and `color.flag.fill`, with ink text on them (`color.text.onBand`). Band-colored text exists only as headings on a `color.surface.inverse` half; no colored text on paper or white. Why: it reads as a screen-printed poster.
4. **Each product area owns one band color.** Assign `color.band.lemon`, `periwinkle`, `teal`, `marigold` to the product's top-level areas in nav order and cycle; the area's header band uses it, so color means "where you are". A product screen shows one band color at most (sticker fills and item vignette grounds are art, not bands); marketing pages up to three plus `color.band.ink`. Why: color carries navigation instead of decoration.
5. **Pink is the one action color.** `color.action.primary` marks the primary button, `color.focus.halo`, `color.selected.border`, the price flag, `color.chart.line` and the closing band. A screen uses pink in at most three of these roles, with at most two pink buttons; repeats of one role (a flag on every card, the focus halo) count once. Why: one hot color makes the next step obvious on a loud page.
6. **Clickable things lift, then slam.** At rest no shadow; hover lifts the element `offset.lift` up-left over a hard `color.shadow.hard` shadow; press slams it flat. One CTA per screen lifts off the stacked plates. Why: the paper-cutout response is the brand's touch.
7. **Illustration is thick, flat ink drawing.** Stickers, die-cut word badges on an ink slab and circle vignettes: flat fills, an even `color.art.ink` outline, no shading, tilted and cropped. A sticker is a big, thick object: one solid swept straight down with a strip along its whole lower edge at least 10% of its rendered size (thin things drawn as thick board), never a single or doubled outline. They sit behind headlines, in empty, error, success and loading states and in the media slot of items without an image, never over text, controls or data. Why: chunky die-cut objects are the joy; a thin line drawing reads as clip art.
8. **One friendly grotesk, sentence case.** `font.family.sans` everywhere. Display at `font.size.hero`, `display` or `section`, weight `font.weight.medium`, `font.tracking.display`; UI at `font.size.body` / `font.lineHeight.body`, weight regular. No uppercase labels anywhere. Why: big plain words in a warm grotesk are the voice.
9. **Motion is physical and sparse.** Lift, slam, plate jump, scroll-linked sticker drift, a chevron turn, an occasional linear marquee. No fades, reveals, entrance animations, spinners or shimmer; under reduced motion everything is still. Why: things move like paper, never like a slide deck.
10. **Dark mode inverts only the chrome, and keeps depth the right way up.** The ground `color.surface.default` goes black and boxes `color.surface.raised` one step lighter with the 35% white `color.border.default`. Top bar (`color.surface.bar`) and footer (`color.surface.inverse`) stay black; black buttons and the current nav pill swap (`color.action.ink`, `color.nav.current`); the hard shadow goes white at 35%. Bands, stickers, plates, the flag and ink outlines stay as in light, anything on a band keeps its white `color.surface.onBand` fill and ink text, and stickers sit on a band or raised field, never on the black ground. Why: the poster colors are the identity in both modes, and depth that sinks in dark reads as a different system.

## Never

- Soft or blurred shadows, glows, `backdrop-filter`, glass; any shadow at rest on a control or card (dialogs, toasts and menus get the static hard shadow only).
- Grey or tinted borders on product components; borders thicker than `border.width.thick`.
- Gradients, textures, noise, tinted or semi-transparent versions of band colors, pastel backgrounds.
- `radius` above `radius.sm` on product components (pills and marketing showcase cards excepted); fully rounded buttons.
- Uppercase or letter-spaced labels, eyebrows or table heads; display weights above `font.weight.medium`.
- Colored text on paper or white; pink text anywhere; band-colored links.
- Hover that only changes background color on a button or card instead of lifting; scale-up on hover; lift on inputs, tabs, nav pills or table rows.
- Fades, slide-in reveals, staggered entrances, spinners, progress rings, skeleton shimmer, bounce easing.
- Shaded, gradient, isometric-rendered or photographic illustration, emoji, stock icon sets used as stickers, mascots or characters, letters or logos on stickers.
- A sticker that is one outline, a doubled outline, or a strip under 10% of its rendered size or only at its corners; a thin thing drawn flat; a sticker cropped at a corner or under 60% visible; a drawing cut by its media frame; the same object twice on one screen; an empty-state drawing that recolors another sticker on the page.
- A generic picture glyph (sun and mountains, a landscape, a photo icon) or a grey fill standing in for a missing image.
- In dark: boxes darker than the ground, or a white-filled control on a band turning black.
- A sticker over text, a control or data; stickers inside a table, form or list (an item's media vignette excepted); more than one plate stack per screen.
- Two adjacent bands of the same color; a band behind a data table or form fields; pink used as an area band.
- Zebra striping, row shading on hover in read-only tables, card-shaped rows with gaps instead of ink rules.

## Signature elements

Build these first, as reusable pieces. The CSS uses only the system's tokens.

### Lift-and-slam hard shadow (with the plate stack)

**What.** Clickable things behave like paper cutouts: at rest an ink hairline, `radius.sm`, no shadow; on hover they rise `offset.lift` up-left over a hard `color.shadow.hard` shadow; on press they slam flat. The **plate stack** is the hero version: two plates of the same size behind the primary CTA (`color.plate.a` over `color.plate.b`, each with an ink hairline); on hover the button jumps `offset.plate`, plate A `offset.lift`, so a lemon and a red edge fan out under it.

**Recipe.**

```css
.ft-lift {
  border: var(--border-width-hair) solid var(--color-art-ink);
  border-radius: var(--radius-sm);
  transition: translate var(--motion-duration-lift) var(--motion-easing-lift),
              box-shadow var(--motion-duration-lift) var(--motion-easing-lift);
}
@media (hover: hover) {
  .ft-lift:hover {
    translate: calc(var(--offset-lift) * -1) calc(var(--offset-lift) * -1);
    box-shadow: var(--offset-lift) var(--offset-lift) 0 0 var(--color-shadow-hard);
  }
}
.ft-lift:active { translate: 0 0; box-shadow: none; }

/* Plate stack: <span class="ft-plates"><span class="ft-plate ft-plate--b" aria-hidden="true"></span>
   <span class="ft-plate ft-plate--a" aria-hidden="true"></span><a class="ft-btn">Start</a></span>
   The button inside a plate stack never also takes .ft-lift. */
.ft-plates { position: relative; display: inline-block; isolation: isolate; }
.ft-plate {
  position: absolute; inset: 0; border-radius: var(--radius-sm);
  border: var(--border-width-hair) solid var(--color-art-ink);
  transition: translate var(--motion-duration-lift) var(--motion-easing-lift);
}
.ft-plate--a { background: var(--color-plate-a); z-index: -1; }
.ft-plate--b { background: var(--color-plate-b); z-index: -2; }
.ft-plates > .ft-btn { position: relative; display: inline-flex;
  transition: translate var(--motion-duration-lift) var(--motion-easing-lift); }
.ft-plates:hover > .ft-btn, .ft-plates:focus-within > .ft-btn {
  translate: calc(var(--offset-plate) * -1) calc(var(--offset-plate) * -1); }
.ft-plates:hover > .ft-plate--a, .ft-plates:focus-within > .ft-plate--a {
  translate: calc(var(--offset-lift) * -1) calc(var(--offset-lift) * -1); }
@media (prefers-reduced-motion: reduce) {
  .ft-lift, .ft-plate, .ft-plates > .ft-btn { transition: none; }
}

/* Hero action row: <div class="ft-hero-actions"><span class="ft-plates">…<a class="ft-btn ft-btn--ink ft-btn--hero">
   Start</a></span><form class="ft-hero-field" role="search"><input class="ft-field" aria-label="Search"></form></div> */
.ft-hero-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-4);
  margin-block-start: var(--space-8); }
.ft-hero-actions > * { height: var(--size-control-hero); }
.ft-btn--hero { height: 100%; padding: 0 var(--space-8); font-size: var(--font-size-lead); }
.ft-hero-field { display: flex; flex: 0 1 400px; }
.ft-hero-field .ft-field { height: 100%; width: 100%; font-size: var(--font-size-lead); }
@media (max-width: 767px) {
  .ft-hero-actions { flex-direction: column; }
  .ft-hero-actions > *, .ft-hero-actions .ft-btn { width: 100%; flex: none; height: var(--size-control); }
  .ft-btn--hero, .ft-hero-field .ft-field { font-size: var(--font-size-body); }
}
```

**Hero action row.** Under a hero headline the action is always a pair at one shared height, `size.controlHero` on desktop: the plate-stack CTA as a large block button (Button ink variant: black in light, pink in dark) and beside it a bordered input that fits the product (search, email signup, a lookup) in the on-band Text field style, at least as wide as the CTA; with no natural input, an outline button of the same height. Never a lone default-size button or a text link. Below `breakpoint.md` the pair stacks full width, CTA first, at `size.control`.

**Motion.** Hover (and `:focus-within` on the plate stack): `translate` + `box-shadow` over `motion.duration.lift` / `motion.easing.lift`, once; press returns to 0 the same way; the plate-stack button stays lifted while pressed. Reduced motion: the lifted state swaps in instantly.

**Where.** Every button, linked card, link tile, option card, toolbar and row action, icon button. Plate stack: the single main CTA of a hero (in the hero action row), an empty state's create action, an error page's recovery action, a success screen's next step. Dialogs, toasts and menus carry the lifted shadow statically, as if already picked up.

**Limits.** One plate stack per screen. Never on text inputs, selects, tabs, nav pills, table rows or plain text links. Never a blur radius. Plates are only `color.plate.a` and `color.plate.b`, never pink.

### Ink-outlined sticker objects

**What.** Big, flat, chunky drawings of everyday objects from the product's own domain (a ticket, a key, a cup, a parcel, a token), each a **thick object** die-cut from heavy card: one flat band-color fill (or `color.art.white`), an even `color.art.ink` outline, a deep solid strip along its lower edge, 1–3 inner edges; rotated 15–60°, cropped by one edge, ringed around a headline and large enough to weigh against it. Two more registers: **die-cut word badges** (a starburst, blob or rounded rectangle in one band color holding one tall-condensed word in a second band color with its own ink outline, on an ink slab offset `offset.slab`) and **circle vignettes** (a circle-cropped still life in 3–4 band colors, captioned by a white pill with an ink hairline overlapping its bottom edge by half).

**Recipe.** Original inline SVG only, built with one reusable builder (below). A sticker is its face silhouette swept straight down on screen into one solid:

1. **Silhouette.** The face outline once, its tilt included, as a definition with a unique id and no fill or stroke; the object fills 75–90% of a square viewBox.
2. **Depth.** Measured in screen pixels, the strip is at least 10% of the object's larger rendered side, aim 12–15% (18px on a 180px object, 30px on a 300px one). In viewBox units: 0.13 × the object's larger side (24 units for 180 across). It is a plain `y` offset outside the tilt, never inside a rotated group, so the strip runs straight down along the whole lower edge, not only at the corners; it scales with the drawing, never capped in pixels.
3. **Solid.** Paint the silhouette every half unit from the depth up to 0 twice: stroke-only in ink at twice the outline width, then fill-only. The first pass leaves one outline around the whole solid, the second hides every inner line, so there is never a doubled outline or a visible back edge. Wider steps leave dotted corners. Works for any silhouette: box, disc, garment, bag, tool.
4. **Face.** The silhouette at 0 with fill and outline; its lower edge is the one line between face and strip.
5. **Inner strokes.** 1–3 in `<g class="ft-inner">`, same tilt: a rim, fold, seam, perforation, ruled line or one solid ink glyph. None runs along the lower edge closer than the depth, so a hem or rim never reads as the strip.

**Thin things are thick board.** A sheet, pad, note, envelope, card, clipboard, ticket, receipt or page gets the same 12–15% strip as a box: a pad shows a page stack (2–3 ink lines along its strip), an envelope is a padded mailer with rounded corners, a card or clipboard a slab. Never a flat sheet with a sliver under it.

Outline `border.width.art` (`border.width.artLg` via `--ft-outline` in media boxes wider than 320px; inner strokes stay `border.width.art`), round joins, `vector-effect="non-scaling-stroke"` on the silhouette. Fill differs from the band it sits on; never the same object twice on one screen.

```js
// Port to the project's component model; the output is plain SVG.
// shape/inner carry their own rotate(); depth in viewBox units (step 2).
// A vignette cluster: one ftSticker per object, layered in the box.
function ftSticker({ id, shape, inner, fill, depth = 24, size = 'lg' }) {
  const ys = []; for (let y = depth; y > 0; y -= 0.5) ys.push(y); ys.push(0);
  const copies = ys.map((y) => `<use href="#${id}" y="${y}"/>`).join('');
  const w = 'var(--ft-outline, var(--border-width-art))';
  return `<svg class="ft-sticker ft-sticker--${size}" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
  <defs><g id="${id}">${shape}</g></defs><g stroke-linejoin="round" stroke-linecap="round">
  <g style="fill:none; stroke:var(--color-art-ink); stroke-width:calc(${w} * 2)">${copies}</g>
  <g style="fill:${fill}; stroke:none">${copies}</g>
  <use href="#${id}" style="fill:${fill}; stroke:var(--color-art-ink); stroke-width:${w}"/>
  <g class="ft-inner" style="fill:none; stroke:var(--color-art-ink); stroke-width:var(--border-width-art)">${inner}</g></g></svg>`;
}
// Disc token, ~152 units across after the tilt, depth 24 (16%).
ftSticker({ id: 'st-disc', fill: 'var(--color-band-lemon)',
  shape: '<g transform="rotate(-28 100 86)"><ellipse cx="100" cy="86" rx="82" ry="50" vector-effect="non-scaling-stroke"/></g>',
  inner: '<g transform="rotate(-28 100 86)"><ellipse cx="100" cy="86" rx="56" ry="26"/><path d="M86 74 L114 74 L100 98 Z" style="fill:var(--color-art-ink)"/></g>' });
// Ticket drawn as board, ~180 units across after the tilt, depth 24 (13%).
ftSticker({ id: 'st-ticket', fill: 'var(--color-art-white)', size: 'md',
  shape: '<g transform="rotate(22 100 88)"><path vector-effect="non-scaling-stroke" d="M20 46 H180 V76 A12 12 0 0 0 180 100 V130 H20 V100 A12 12 0 0 0 20 76 Z"/></g>',
  inner: '<g transform="rotate(22 100 88)"><path d="M140 52 V100" stroke-dasharray="6 6"/><path d="M38 64 H118 M38 80 H102"/></g>' });
```

```html
<!-- Die-cut badge: ink slab, shape, condensed word with its own outline -->
<svg class="ft-badge" viewBox="0 0 230 150" aria-hidden="true" focusable="false">
  <defs><path id="ft-b1" d="M20 30 Q110 0 200 30 Q215 70 200 110 Q110 140 20 110 Q5 70 20 30Z"/></defs>
  <use href="#ft-b1" x="8" y="8" style="fill: var(--color-art-ink)"/>
  <use href="#ft-b1" stroke-width="2" style="fill: var(--color-band-teal); stroke: var(--color-art-ink)"/>
  <text x="110" y="92" text-anchor="middle" transform="translate(110 0) scale(0.72 1) translate(-110 0)"
        font-weight="700" font-size="64" stroke-width="2" paint-order="stroke"
        style="font-family: var(--font-family-sans); fill: var(--color-band-lemon); stroke: var(--color-art-ink)">done</text>
</svg>
```

```css
.ft-sticker-layer { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.ft-sticker-layer > svg { position: absolute; }
/* 1440px: lg 256px, md 158px. 1280px: lg 230px. 390px: both 120px. */
.ft-sticker--lg { width: clamp(var(--size-sticker-sm), 18vw, var(--size-sticker-hero)); }
.ft-sticker--md { width: clamp(var(--size-sticker-sm), 11vw, var(--size-sticker-md)); }
.ft-sticker *, .ft-badge * { vector-effect: non-scaling-stroke; }

/* Header-band sticker; raise --ft-s (up to size.stickerHero) if the title block plus lead is taller. */
.ft-band--with-sticker { --ft-s: clamp(var(--size-sticker-sm), 14vw, var(--size-sticker-band));
  overflow: hidden; min-height: calc(var(--ft-s) + var(--space-6) * 2);
  padding-inline-end: calc(var(--ft-s) * 0.75 + var(--space-6)); }
.ft-band__sticker { position: absolute; inset-inline-end: 0; inset-block-start: 50%;
  width: var(--ft-s); height: var(--ft-s); translate: 25% -50%; pointer-events: none; z-index: 0; }

@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .ft-sticker-layer > svg { animation: ft-drift linear both; animation-timeline: scroll(root); }
  }
}
@keyframes ft-drift { from { translate: 0 0; } to { translate: 0 -50%; } }
@keyframes ft-rock { 0% { rotate: -8deg; } 50% { rotate: 8deg; } }
.ft-sticker--loading { animation: ft-rock calc(var(--motion-duration-rock) * 2) steps(1, end) infinite; }
@media (prefers-reduced-motion: reduce) { .ft-sticker--loading { animation: none; } }
```

Paper objects are white; one end may curl back as a half-cylinder (a 180° arc, radius 12–16 units) with 3–6 ruled lines on the face. Vignettes: `<clipPath>` circle, band-color ground, 2–4 flat objects, no people.

**Placement.**
- **Hero.** The first screen of a front page (a publication, store, product or marketing home) is a hero band, never a compact header band: `font.size.hero` headline, lead, the hero action row, and 4–6 different stickers in an `aria-hidden` layer behind them, at least half `.ft-sticker--lg`, the rest `--md`, none under `size.stickerSm`. Outer ones run 20–40% off one side edge or the bottom seam, never cropped at a corner, each showing at least 60%; none overlaps the headline, lead or actions. Phones: 3–4 of them, at least `size.stickerSm`.
- **Header band.** One sticker, at least as tall as the title block plus lead (`size.stickerBand` on desktop, never under `size.stickerSm`), centred at the trailing edge, cropped by that side only, never by a seam, at least 60% visible; the band reserves room so it never sits under a title, search or button.
- **Empty state.** One `size.stickerMd` drawing of the missing thing itself (an empty inbox: an open envelope), never a recolored copy of another sticker.
- **Media box.** A full thick sticker at any size (Imagery → drawn vignette).

**Measure before you finish.** At 1440px and 390px, in screen pixels: each sticker's width against the sizes above, at least 60% showing, and its strip measured straight down from the face's lower edge (at least 10% of the object's larger rendered side, along the whole lower edge). Compare the largest drawing on each screen with the smallest card vignette; if the big one shows a smaller share of strip, deepen it. A flat outline with a sliver, or a doubled outline, is rebuilt with the five steps.

**Motion.** Hero stickers drift on scroll (`ft-drift`, 0 → −50% of their height, linear, scroll-bound); others stay still. Loading sticker: `ft-rock`, two stepped poses ±8°, `motion.duration.rock` each, infinite. Reduced motion or no scroll timeline: static; the loading sticker holds at 0° and its "Loading" text stays.

**Where.** Heroes; the color half of split bands (a cluster, a badge, or a drawn mockup on a slab); header bands of overview and dashboard screens; empty states; error pages (two tumbling objects); success and onboarding (one word badge); whole-screen loading (one rocking sticker in a dashed raised box); pricing bands; the media slot of an item with no image.

**Limits.** At most 6 per hero, 1–2 on a product screen (item media vignettes not counted). Never over text, controls or data; never inside tables, forms, lists or toasts; inside a card only as its media vignette. Always the thick construction; no letters, logos, people or a currency symbol alone.

### Hard-seamed poster bands

**What.** Sections are flat saturated fields (`color.band.*` or `color.band.ink`) running edge to edge and meeting at 1px ink seams. Marketing pages stack them: a sticker-strewn hero band, a white intro, **checkerboard split bands** (50/50: one half a band color holding art, the other `color.surface.inverse` with 2–3 items, each a band-color heading at `font.size.title`–`font.size.section` over `color.text.inverse` text; the black side swaps each row), a FAQ, a pink closing band (`color.band.pink`, centered `font.size.display` headline, one white button) and the black footer. Product screens open on a **header band** in their area's color with title, breadcrumb, search and pill tabs, over a paper body.

**Recipe.**

```css
.ft-band { position: relative; background: var(--ft-band, var(--color-band-lemon)); color: var(--color-text-on-band);
  border-block-end: var(--border-width-hair) solid var(--color-art-ink);
  padding-block: clamp(var(--space-16), 9vw, var(--space-32)); }
.ft-band--header { padding-block: var(--space-6) var(--space-8); }      /* product screens */
.ft-band > .ft-band__inner { position: relative; z-index: 1; max-width: var(--size-content-marketing);
  margin-inline: auto; padding-inline: var(--space-6); }
.ft-split { display: grid; grid-template-columns: 1fr; border-block-end: var(--border-width-hair) solid var(--color-art-ink); }
@media (min-width: 768px) { .ft-split { grid-template-columns: 1fr 1fr; }
  .ft-split > * + * { border-inline-start: var(--border-width-hair) solid var(--color-art-ink); } }
.ft-split__ink { background: var(--color-surface-inverse); color: var(--color-text-inverse); padding: var(--space-16) var(--space-12); }
.ft-split__ink h3 { color: var(--ft-band); font-weight: var(--font-weight-medium); letter-spacing: var(--font-tracking-display); }
.ft-split--flip > :first-child { order: 2; }                              /* checkerboard: alternate rows */
/* Anything on a band or the footer keeps its light-mode look in both modes: white fill, ink text, ink outline */
.ft-band :is(input, select, .ft-btn--outline, .ft-status) { background: var(--color-surface-on-band);
  color: var(--color-text-on-band); border-color: var(--color-art-ink); }
.ft-band .ft-pill { color: var(--color-text-on-band); }
.ft-band .ft-pill:hover, .ft-band .ft-pill[aria-selected="true"] { border-color: var(--color-art-ink); }
```

Set `--ft-band` per section to one `var(--color-band-…)`. Product areas map to bands in nav order: lemon, periwinkle, teal, marigold, then repeat.

**Motion.** Static. Bands never fade, slide or parallax; only their stickers drift.

**Where.** Product screen headers; marketing hero; pricing (split band, one figure per half); feature or onboarding tours (checkerboard rows); the end of long pages (pink closing band); full-screen error and 404 (one band); a dashboard's two headline numbers (one split band). Footer on every page: `color.surface.inverse`, a `font.size.section` headline left, link columns right, a `color.surface.onBand` input with a square pink arrow button.

**Limits.** One band color per product screen (plus the black footer), up to three plus black on marketing; never two same-color bands adjacent; no band behind tables, forms or long text; pink only as the closing band; unchanged in dark.

### Ink hairline frame with pill markers

**What.** Structure is drawn, never shaded. White boxes with a 1px ink border and `radius.sm` sit on paper; groups are one box divided by 1px ink rules (`size.row` rows), never floating cards. Pills mark position: the current primary nav item is a filled `color.nav.current` pill, the current tab or chip a pill with a 1px ink outline, other pills a transparent border so nothing shifts. Empty containers are a `1px dashed` ink box.

**Recipe.**

```css
.ft-box { background: var(--color-surface-raised); border: var(--border-width-hair) solid var(--color-border-default);
  border-radius: var(--radius-sm); }
.ft-group > * + * { border-block-start: var(--border-width-hair) solid var(--color-border-default); }
.ft-group > * { min-height: var(--size-row); display: flex; align-items: center; padding-inline: var(--space-4); }
.ft-pill { height: var(--size-control-sm); padding-inline: var(--space-4); border-radius: var(--radius-full);
  border: var(--border-width-hair) solid transparent; display: inline-flex; align-items: center; }
.ft-pill:hover, .ft-pill[aria-selected="true"] { border-color: var(--color-border-default); }
.ft-pill[aria-current="page"] { background: var(--color-nav-current); color: var(--color-nav-on-current); }
.ft-empty { border: var(--border-width-hair) dashed var(--color-border-default); border-radius: var(--radius-sm);
  background: var(--color-surface-raised); padding: var(--space-12) var(--space-6); text-align: center; }
```

**Motion.** Pill outline appears on hover in `motion.duration.instant`. Disclosure chevrons rotate 90° (plus glyphs 45°) over `motion.duration.open` with `motion.easing.open`. Reduced motion: chevrons swap instantly.

**Where.** Every product surface: panels, filter stacks, settings groups, help or link tiles (`size.tile` tall, centered `font.size.cardTitle` text), data tables, the header's bottom rule, tabs and nav.

**Limits.** Pills only for position and chips, never for buttons.

### Notched price flag

**What.** A `color.flag.fill` label `size.flag` tall with a 1px ink outline and a swallowtail notch `size.notch` deep cut into its right end, holding a `font.size.body` amount in tabular figures (an old amount struck through first). It sits bottom-left on item cards with a rating or count opposite, and marks the headline money figure wherever money shows.

**Recipe.**

```css
.ft-flag { position: relative; isolation: isolate; display: inline-flex; align-items: center; gap: var(--space-2);
  height: var(--size-flag); padding: 0 calc(var(--size-notch) + var(--space-2)) 0 var(--space-2);
  font: var(--font-weight-regular) var(--font-size-body)/1 var(--font-family-sans);
  font-variant-numeric: tabular-nums; color: var(--color-flag-text); background: var(--color-art-ink);
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--size-notch)) 50%, 100% 100%, 0 100%); }
.ft-flag::before { content: ""; position: absolute; inset: var(--border-width-hair); z-index: -1;
  background: var(--color-flag-fill);
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--size-notch) + 2px) 50%, 100% 100%, 0 100%); }
.ft-flag s { text-decoration-thickness: var(--border-width-hair); }
```

**Motion.** Static.

**Where.** Item or plan cards (the price); one key amount cell per table row; a dashboard's headline money or count; the live total of checkout forms; billing; a toast for a payment or something new.

**Limits.** One per card, row or tile. Only for money, counts or "new". Same in dark mode.

## Color use

- Chrome is `color.surface.default`, `color.surface.raised` and ink. Color arrives only as whole fields: bands, split halves, sticker fills, plates, the flag, the selected border, a status dot.
- Dark (rule 10): a white fill on a band or the footer (status pill, outline button, chip, input) is `color.surface.onBand` in both modes, never `color.surface.raised`.
- Pink (`color.action.primary`) in at most three roles per screen (rule 5) and on at most two buttons. Secondary actions are `color.action.ink` (black) or outline.
- Text on bands and pink is `color.text.onBand` / `color.text.onAction`; on `color.surface.inverse` `color.text.inverse` (headings may take a band color).
- A marigold highlighter (`color.highlight.marker` background, ink text, 0 4px padding, no radius) may sit behind one bold phrase in a quote or testimonial, once per block.
- Status colors are fills, never text: a 8px dot with a 1px ink outline inside an outline pill, a chip fill with ink text, a 2px border. `color.status.danger` is the error border and icon; the error message itself is `color.text.primary`.
- Charts: `color.chart.bar` bars with a 2px `color.chart.cap` top edge, one `color.chart.line` series (2px line, 8px dots filled pink with ink outline), other series `color.chart.muted` or `color.chart.cap`; legends are 8px round dots before `font.size.meta` labels. No gridlines except a 1px ink baseline.

## Typography

| Role | Size | Line height | Weight | Tracking |
| --- | --- | --- | --- | --- |
| Giant figure (one per marketing page) | `font.size.mega` | `font.lineHeight.mega` | medium | `font.tracking.display` |
| Hero headline | `font.size.hero` (≤767px `heroMobile`) | `font.lineHeight.mega` | medium | display |
| Section display, closing band | `font.size.display` (≤767px `displayMobile`) | `font.lineHeight.display` | medium | display |
| Section heading, product h1 in a header band, dashboard number | `font.size.section` (≤767px `sectionMobile`) | `font.lineHeight.heading` | medium | display |
| Statement, ink-half heading | `font.size.statement` | `font.lineHeight.heading` | medium | display |
| FAQ question, dialog title, fee figure | `font.size.title` | `font.lineHeight.title` | regular | display |
| Article or doc title | `font.size.title` | `font.lineHeight.title` | bold | normal |
| Lead, compact page title | `font.size.lead` | `font.lineHeight.lead` | regular | display |
| Card title, eyebrow | `font.size.cardTitle` | `font.lineHeight.title` | regular (group heading semibold) | normal |
| UI body, labels, buttons | `font.size.body` | `font.lineHeight.body` | regular | normal |
| Long-form prose | `font.size.body` | `font.lineHeight.prose` | regular | normal |
| Meta, helper, captions | `font.size.meta` | `font.lineHeight.lead` | regular | normal |
| Code, ids, keys | `font.size.meta`, `font.family.mono` | `font.lineHeight.body` | regular | normal |

- Sentence case everywhere. Eyebrows are plain `font.size.cardTitle` words above a heading, no caps, no color.
- One hero or display headline per screen; product screens top out at `font.size.section`.
- Table header labels and bold phrases use bold; nothing else is bold. Display weights never exceed medium.
- Prose measure `size.measure`; hero leads 2–3 lines centered, max 720px.

## Spacing and density

- Base unit 4px (`space.1`); use the scale only.
- Controls `size.control`, compact controls and pills `size.controlSm`, rows `size.row`, hero action row `size.controlHero`.
- Component padding: buttons 0 `space.6`; panels `space.6` (`space.4` below 640px); cards `space.6`; showcase cards `space.8`.
- Gaps: fields `space.6`, grid gutters `space.6` (`space.4` mobile), between panels `space.6`, between page sections on paper `space.16`.
- Bands: `space.24`–`space.32` block padding on marketing (`space.16` on mobile), `space.6`–`space.8` on product header bands.
- Dense screens keep 48px controls and 56px rows; tighten by removing panels, never by shrinking type below `font.size.meta` or rows below `size.control`.

## Shape and depth

- `radius.sm` on every product component; `radius.full` on pills, switch tracks, status pills and caption bubbles; `radius.lg` only on large marketing showcase cards and speech bubbles (one square corner toward the speaker); `radius.md` on secondary marketing tiles.
- Depth has exactly three forms: none (rest), the hard lift shadow (hover; dialogs, menus and toasts statically), and the ink slab under drawn art and mockups (`offset.slab`, `color.art.ink`, static).

## Motion

| Pattern | Trigger | From → to | Duration / easing | Iterations | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| Lift | hover | translate 0 → −`offset.lift` both axes, shadow none → hard | `motion.duration.lift`, `motion.easing.lift` | once | instant swap |
| Slam | press | lifted → 0, shadow off | same | once | instant |
| Plate jump | hover / focus-within on the plate stack | button −`offset.plate`, plate A −`offset.lift` | same | once | instant |
| Sticker drift | page scroll | translateY 0 → −50% | scroll timeline, linear | scroll-bound | static |
| Disclosure | open / close | chevron 0 → 90°, plus 0 → 45°, panel height auto | `motion.duration.open`, `motion.easing.open` | once | instant |
| Pill outline | hover | transparent → ink border | `motion.duration.instant` | — | same |
| Toast, dialog arrive | open | translate 8px → 0 (toast up, dialog down) | `motion.duration.lift`, `motion.easing.lift` | once | appears in place |
| Loading sticker | while loading | −8° ⇄ +8°, stepped | `motion.duration.rock` per pose | infinite | still at 0° |
| Tag marquee (marketing only) | always | translateX 0 → −50% of a duplicated row | `motion.duration.marquee` (`marqueeMobile` ≤767px), linear | infinite, pauses on hover | removed, row wraps |

Never animate opacity, color, size, blur or layout on content. Nothing animates on page load.

## Interaction

| Element | Hover | Focus-visible | Press | Open / selected |
| --- | --- | --- | --- | --- |
| Buttons, icon buttons | lift (`offset.lift` + hard shadow), `motion.duration.lift` | 2px `color.focus.ring` outline, 2px offset | slam flat | loading: rocking 16px glyph, `aria-busy` |
| Plate-stack CTA | button −`offset.plate`, plate A −`offset.lift` | ring + plates fan out | stays lifted | — |
| Linked cards, tiles, option cards | lift | ring on the card | slam | selected: `border.width.thick` `color.selected.border` + pink check disc |
| Text links | underline stays; muted links go `color.text.secondary` → `color.text.primary` | ring | — | current page: no underline, ink |
| Inputs, selects | none | border stays ink, 2px `color.focus.halo` band outside it, then 2px `color.focus.ring` outline outside the band | — | error: `border.width.thick` `color.status.danger` |
| Tabs, nav pills | 1px ink outline appears instantly | ring | navigates | current: outline pill (tabs) or filled `color.nav.current` (primary nav) |
| Disclosures, filter rows, FAQ | none | ring | toggles | chevron 90° or plus 45° over `motion.duration.open`; answer at the question's indent |
| Table rows | none (read-only); clickable rows get `color.surface.default` instantly | ring inset on the row | opens | selected: 2px pink left edge, `aria-selected` |
| Menu rows | `color.surface.default` instantly | same as hover + ring | activates | checked: 16px ink check |

## Layout adaptation

- 12-column grid, gutter `space.6` (`space.4` below 640px), outer margin `space.8` desktop, `space.4` mobile.
- Content widths: `size.contentMarketing` for marketing, `size.contentApp` for product screens, `size.contentWide` for docs and help with a 1/4 link sidebar, `size.contentNarrow` for articles, forms and single tables. Bands are full-bleed; their content uses these widths.
- Breakpoints `breakpoint.sm` … `breakpoint.2xl`. Below `breakpoint.md`: split bands stack (text half first, art half below), sidebars collapse to a pill row or a top disclosure, card grids go to one column, tables scroll horizontally inside their box with the first column sticky (or become a ruled list of label–value rows when under 4 columns).
- Header: pill links on desktop; below `breakpoint.lg` a menu button opens a full-screen panel (Navigation).
- Priority on narrow screens: title and primary action first, then data, then stickers (kept at `size.stickerSm` or more, cropped by one side edge, never dropped from a hero or header band).
- Touch targets ≥44px (pills extend their hit area).

## Applying the concept

| Context | What it uses | How strongly |
| --- | --- | --- |
| Page header (product) | Area header band with title, breadcrumb, search, pill tabs; 1px ink seam; one sticker on overview and dashboard screens (sticker recipe → Placement) | band always; sticker on overviews |
| Front page, hero or landing section | Hero band on the first screen of any front page: `font.size.hero` headline, the hero action row, 4–6 different drifting stickers ringing it (sticker recipe → Placement) | full |
| Section break | A seam into a new band, a checkerboard split band, or a white intro with eyebrow + display heading | one per section |
| Card grid | White ink-framed cards, lift on hover, price flag on money, media separated by a 1px rule; an item without an image gets its own drawn vignette or a dashed glyph box (Imagery) | medium |
| FAQ or help | White ruled list: plus glyph left, `font.size.title` questions; or `size.tile` link tiles; area band on top | medium |
| Form or checkout | Narrow title band, fields in one white panel, pink submit with lift, flag for the live total | light |
| Settings | Quiet header band, underlined section links left, ruled panels right, option cards with pink selected border, switches | light |
| Dashboard | Header band with one sticker, stat tiles with `font.size.section` numbers and dot legends, a flag on the headline money figure, pink line over grey bars in a framed panel | medium |
| Data table | Ink-framed table, paper header row, ruled rows, pink flag in one amount cell, lifting toolbar buttons; no band or sticker inside | light, never none |
| Empty state | Dashed box, one `size.stickerMd` sticker of the missing thing (a 20px solid glyph inside small panels), one sentence, one action (plate stack if it is the screen's main action) | medium |
| Error | Full-viewport band, 72–96px sentence, two stickers, plate-stack recovery; inline errors are a white panel with a 2px danger border and an outline "Try again" | full / light |
| Loading | One rocking sticker inside a dashed raised box for a whole screen; dashed `color.surface.raised` placeholder boxes in the final layout for parts; visible "Loading" text | light |
| Toast or confirmation | White ink panel with static hard shadow, status dot or flag, one action; success screens get one word badge on its slab | light |
| Dialog or menu | White ink panel with static hard shadow over `color.surface.overlay`, 1px ruled header and footer | light |
| Footer | Black band, big headline, link columns, `color.surface.onBand` input with pink square arrow; pink closing band above it on long pages | always |

## Imagery and icons

- Icons: solid ink glyphs or 2px round-cap line icons at 16, 20 or 24px on a 24px grid, `color.text.primary`; never thin 1px outline sets. Lists may use 20px check discs (pink fill or ink fill, ink outline).
- Stickers, badges and vignettes are original, drawn for the product's own nouns.
- Drawn UI mockups (marketing): a white ink-framed window, a 24px top bar with three 6px band-color dots, flat contents, on an `offset.slab` ink slab.
- Photos: inside a 1px ink frame with `radius.sm`, never filtered; a portrait cut-out may sit on a flat band-color blob with an ink outline.
- User content (covers, avatars) is shown as-is inside ink frames.
- **An item with no image of its own** never gets a generic picture glyph or a grey fill; use one of two, the same for every item in a set:
  - **Drawn vignette** (card grids, item pages, article figures): a band-color art ground (cycle lemon, periwinkle, teal, marigold by item order) with 1–3 objects of the item's own topic or kind (an audio item: headphones and a disc), different for each item. At every box size it is a full thick sticker with the same share of strip as on a card (30px on a 300px object), spanning 55–70% of the box width, centred, at least 8% clear ground on every side so the frame never cuts it; in boxes wider than 320px the outer outline is `border.width.artLg`.
  - **Glyph box** (dense lists, small thumbnails, placeholders before upload): `color.surface.raised` with a 1px dashed ink border and one small solid ink glyph of the item's type, 24–32px, centred.

```css
.ft-media { aspect-ratio: 4 / 3; overflow: hidden; container-type: inline-size;
  border-block-end: var(--border-width-hair) solid var(--color-border-default); }
.ft-media--drawn { background: var(--ft-band); display: grid; place-items: center; }
/* <svg class="ft-sticker"> with no size class; square viewBox leaves 11% clear ground at 4:3 */
.ft-media--drawn > svg { width: 58%; max-height: 84%; }
@container (min-width: 321px) { .ft-media--drawn > svg { --ft-outline: var(--border-width-art-lg); } }
.ft-media--glyph { display: grid; place-items: center; background: var(--color-surface-raised);
  border: var(--border-width-hair) dashed var(--color-border-default); border-radius: var(--radius-sm); }
.ft-media--glyph svg { width: calc(var(--size-icon) * 1.5); height: calc(var(--size-icon) * 1.5); fill: var(--color-text-primary); }
```

## Writing

Sentence case; plain, upbeat second person; short headlines that name the outcome, often with a number. Buttons are 1–2 word verbs; an arrow-only button uses a text arrow and an `aria-label`. Empty and error text is one short sentence plus one action. No exclamation runs, no jargon.

## Accessibility

Text contrast at least 4.5:1 (7:1 for body text on the default surface); ink on every band and on pink passes. Focus is always visible: a 2px `color.focus.ring` outline at 2px offset, plus the `color.focus.halo` band on text inputs. Selected states never rely on pink alone (add the check disc or the filled pill). Touch targets ≥44px. Stickers, plates and slabs are `aria-hidden`; vignettes that carry meaning get a text alternative. Under `prefers-reduced-motion: reduce` drift, rocking and the marquee stop and lifts swap instantly; content stays readable and complete.

## Semantic color tokens — light

| Token | Value |
| --- | --- |
| `color.ink.700` | `#4a4a47` |
| `color.ink.800` | `#3a3a38` |
| `color.ink.900` | `#242423` |
| `color.ink.1000` | `#000000` |
| `color.paper.0` | `#ffffff` |
| `color.paper.50` | `#f4f4f0` |
| `color.grey.well` | `#dddddd` |
| `color.grey.bar` | `#e5e5e5` |
| `color.grey.hairline` | `#919191` |
| `color.grey.muted` | `#6b6b66` |
| `color.grey.mutedNight` | `#a3a39e` |
| `color.grey.controlNight` | `#8a8a86` |
| `color.grey.lineNight` | `#dddddd59` |
| `color.grey.shadowNight` | `#ffffff59` |
| `color.poster.pink` | `#ff90e8` |
| `color.poster.lemon` | `#f1f333` |
| `color.poster.marigold` | `#ffc900` |
| `color.poster.periwinkle` | `#90a8ed` |
| `color.poster.teal` | `#23a094` |
| `color.poster.red` | `#dc341e` |
| `color.signal.danger` | `#c42a12` |
| `color.signal.dangerNight` | `#ff6b52` |
| `color.scrim.day` | `#00000066` |
| `color.scrim.night` | `#000000a3` |
| `color.surface.default` | `#f4f4f0` |
| `color.surface.raised` | `#ffffff` |
| `color.surface.subtle` | `#dddddd` |
| `color.surface.inverse` | `#000000` |
| `color.surface.bar` | `#ffffff` |
| `color.surface.onBand` | `#ffffff` |
| `color.surface.overlay` | `#00000066` |
| `color.text.primary` | `#000000` |
| `color.text.secondary` | `#6b6b66` |
| `color.text.onAction` | `#000000` |
| `color.text.inverse` | `#ffffff` |
| `color.text.onBand` | `#000000` |
| `color.border.default` | `#000000` |
| `color.border.strong` | `#000000` |
| `color.border.soft` | `#919191` |
| `color.action.primary` | `#ff90e8` |
| `color.action.primaryHover` | `#ff90e8` |
| `color.action.ink` | `#000000` |
| `color.action.onInk` | `#ffffff` |
| `color.focus.ring` | `#000000` |
| `color.focus.halo` | `#ff90e8` |
| `color.selected.border` | `#ff90e8` |
| `color.nav.current` | `#000000` |
| `color.nav.onCurrent` | `#ffffff` |
| `color.shadow.hard` | `#000000` |
| `color.band.pink` | `#ff90e8` |
| `color.band.lemon` | `#f1f333` |
| `color.band.marigold` | `#ffc900` |
| `color.band.periwinkle` | `#90a8ed` |
| `color.band.teal` | `#23a094` |
| `color.band.ink` | `#000000` |
| `color.plate.a` | `#f1f333` |
| `color.plate.b` | `#dc341e` |
| `color.art.ink` | `#000000` |
| `color.art.white` | `#ffffff` |
| `color.art.red` | `#dc341e` |
| `color.flag.fill` | `#ff90e8` |
| `color.flag.text` | `#000000` |
| `color.highlight.marker` | `#ffc900` |
| `color.chart.line` | `#ff90e8` |
| `color.chart.bar` | `#e5e5e5` |
| `color.chart.cap` | `#000000` |
| `color.chart.muted` | `#919191` |
| `color.status.success` | `#23a094` |
| `color.status.warning` | `#ffc900` |
| `color.status.danger` | `#c42a12` |
| `color.status.info` | `#90a8ed` |

## Semantic color tokens — dark

| Token | Value |
| --- | --- |
| `color.ink.700` | `#4a4a47` |
| `color.ink.800` | `#3a3a38` |
| `color.ink.900` | `#242423` |
| `color.ink.1000` | `#000000` |
| `color.paper.0` | `#ffffff` |
| `color.paper.50` | `#f4f4f0` |
| `color.grey.well` | `#dddddd` |
| `color.grey.bar` | `#e5e5e5` |
| `color.grey.hairline` | `#919191` |
| `color.grey.muted` | `#6b6b66` |
| `color.grey.mutedNight` | `#a3a39e` |
| `color.grey.controlNight` | `#8a8a86` |
| `color.grey.lineNight` | `#dddddd59` |
| `color.grey.shadowNight` | `#ffffff59` |
| `color.poster.pink` | `#ff90e8` |
| `color.poster.lemon` | `#f1f333` |
| `color.poster.marigold` | `#ffc900` |
| `color.poster.periwinkle` | `#90a8ed` |
| `color.poster.teal` | `#23a094` |
| `color.poster.red` | `#dc341e` |
| `color.signal.danger` | `#c42a12` |
| `color.signal.dangerNight` | `#ff6b52` |
| `color.scrim.day` | `#00000066` |
| `color.scrim.night` | `#000000a3` |
| `color.surface.default` | `#000000` |
| `color.surface.raised` | `#242423` |
| `color.surface.subtle` | `#3a3a38` |
| `color.surface.inverse` | `#000000` |
| `color.surface.bar` | `#000000` |
| `color.surface.onBand` | `#ffffff` |
| `color.surface.overlay` | `#000000a3` |
| `color.text.primary` | `#dddddd` |
| `color.text.secondary` | `#a3a39e` |
| `color.text.onAction` | `#000000` |
| `color.text.inverse` | `#ffffff` |
| `color.text.onBand` | `#000000` |
| `color.border.default` | `#dddddd59` |
| `color.border.strong` | `#8a8a86` |
| `color.border.soft` | `#dddddd59` |
| `color.action.primary` | `#ff90e8` |
| `color.action.primaryHover` | `#ff90e8` |
| `color.action.ink` | `#ff90e8` |
| `color.action.onInk` | `#000000` |
| `color.focus.ring` | `#ffffff` |
| `color.focus.halo` | `#ff90e8` |
| `color.selected.border` | `#ff90e8` |
| `color.nav.current` | `#ffffff` |
| `color.nav.onCurrent` | `#000000` |
| `color.shadow.hard` | `#ffffff59` |
| `color.band.pink` | `#ff90e8` |
| `color.band.lemon` | `#f1f333` |
| `color.band.marigold` | `#ffc900` |
| `color.band.periwinkle` | `#90a8ed` |
| `color.band.teal` | `#23a094` |
| `color.band.ink` | `#000000` |
| `color.plate.a` | `#f1f333` |
| `color.plate.b` | `#dc341e` |
| `color.art.ink` | `#000000` |
| `color.art.white` | `#ffffff` |
| `color.art.red` | `#dc341e` |
| `color.flag.fill` | `#ff90e8` |
| `color.flag.text` | `#000000` |
| `color.highlight.marker` | `#ffc900` |
| `color.chart.line` | `#ff90e8` |
| `color.chart.bar` | `#4a4a47` |
| `color.chart.cap` | `#dddddd` |
| `color.chart.muted` | `#919191` |
| `color.status.success` | `#23a094` |
| `color.status.warning` | `#ffc900` |
| `color.status.danger` | `#ff6b52` |
| `color.status.info` | `#90a8ed` |

## Primitive tokens

| Token | Value |
| --- | --- |
| `font.family.sans` | `"Space Grotesk", "DM Sans", system-ui, -apple-system, "Segoe UI", Pretendard, "Noto Sans KR", sans-serif` |
| `font.family.mono` | `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, D2Coding, monospace` |
| `font.size.mega` | `192px` |
| `font.size.hero` | `96px` |
| `font.size.display` | `72px` |
| `font.size.section` | `48px` |
| `font.size.statement` | `36px` |
| `font.size.title` | `30px` |
| `font.size.lead` | `24px` |
| `font.size.cardTitle` | `20px` |
| `font.size.body` | `16px` |
| `font.size.meta` | `14px` |
| `font.size.heroMobile` | `48px` |
| `font.size.displayMobile` | `40px` |
| `font.size.sectionMobile` | `32px` |
| `font.weight.regular` | `400` |
| `font.weight.medium` | `500` |
| `font.weight.semibold` | `600` |
| `font.weight.bold` | `700` |
| `font.lineHeight.mega` | `0.9` |
| `font.lineHeight.display` | `1` |
| `font.lineHeight.heading` | `1.1` |
| `font.lineHeight.title` | `1.2` |
| `font.lineHeight.lead` | `1.33` |
| `font.lineHeight.body` | `1.375` |
| `font.lineHeight.prose` | `1.75` |
| `font.tracking.display` | `-0.4px` |
| `font.tracking.normal` | `0px` |

| Token | Value |
| --- | --- |
| `space.0` | `0px` |
| `space.1` | `4px` |
| `space.2` | `8px` |
| `space.3` | `12px` |
| `space.4` | `16px` |
| `space.5` | `20px` |
| `space.6` | `24px` |
| `space.8` | `32px` |
| `space.12` | `48px` |
| `space.16` | `64px` |
| `space.24` | `96px` |
| `space.32` | `128px` |

| Token | Value |
| --- | --- |
| `size.control` | `48px` |
| `size.controlSm` | `40px` |
| `size.controlHero` | `60px` |
| `size.row` | `56px` |
| `size.flag` | `28px` |
| `size.notch` | `12px` |
| `size.icon` | `20px` |
| `size.tile` | `160px` |
| `size.stickerHero` | `256px` |
| `size.stickerLg` | `180px` |
| `size.stickerMd` | `160px` |
| `size.stickerBand` | `200px` |
| `size.stickerSm` | `120px` |
| `size.contentMarketing` | `1152px` |
| `size.contentApp` | `1312px` |
| `size.contentWide` | `1376px` |
| `size.contentNarrow` | `1024px` |
| `size.measure` | `68ch` |

| Token | Value |
| --- | --- |
| `offset.lift` | `4px` |
| `offset.plate` | `8px` |
| `offset.slab` | `8px` |

| Token | Value |
| --- | --- |
| `radius.none` | `0px` |
| `radius.sm` | `4px` |
| `radius.md` | `16px` |
| `radius.lg` | `24px` |
| `radius.full` | `9999px` |

| Token | Value |
| --- | --- |
| `border.width.hair` | `1px` |
| `border.width.thick` | `2px` |
| `border.width.art` | `2px` |
| `border.width.artLg` | `3px` |

| Token | Value |
| --- | --- |
| `shadow.none` | `none` |
| `shadow.lift` | `4px 4px 0 0 #000000` |
| `shadow.slab` | `8px 8px 0 0 #000000` |

| Token | Value |
| --- | --- |
| `motion.duration.instant` | `0ms` |
| `motion.duration.lift` | `150ms` |
| `motion.duration.open` | `200ms` |
| `motion.duration.rock` | `600ms` |
| `motion.duration.marquee` | `60000ms` |
| `motion.duration.marqueeMobile` | `20000ms` |
| `motion.easing.lift` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `motion.easing.open` | `cubic-bezier(0, 0, 0.2, 1)` |
| `motion.easing.linear` | `cubic-bezier(0, 0, 1, 1)` |

| Token | Value |
| --- | --- |
| `breakpoint.sm` | `640px` |
| `breakpoint.md` | `768px` |
| `breakpoint.lg` | `1024px` |
| `breakpoint.xl` | `1280px` |
| `breakpoint.2xl` | `1536px` |

## Components

### Button

**Purpose.** Triggers an action or navigation that looks like an action. Use a text link for navigation inside prose.

**Anatomy.** Box (fill, 1px border, `radius.sm`) → optional 20px leading icon → label → optional trailing text arrow.

**Sizes.** Default height `size.control`, padding 0 `space.6`, gap `space.2`, `font.size.body` regular. Compact `size.controlSm`, padding 0 `space.4` (toolbars, table rows, headers). Icon-only: square `size.control` or `size.controlSm`, 20px glyph. Full width below `breakpoint.sm` in forms and dialogs. Hero (`.ft-btn--hero`, hero action row only): `size.controlHero`, padding 0 `space.8`, `font.size.lead`, ink variant in the plate stack (Lift-and-slam → Hero action row).

**Variants.**
- Primary: `color.action.primary` fill, `color.text.onAction`, ink border (`color.art.ink`). One or two per screen.
- Ink: `color.action.ink` fill, `color.action.onInk` label, ink border. The strong secondary action; becomes pink in dark mode.
- Outline: transparent (on paper) or `color.surface.raised` fill, `color.border.strong` border, `color.text.primary`. Everything else, including "Cancel".
- On a band or the footer: outline with `color.surface.onBand` fill, `color.art.ink` border, `color.text.onBand` label, unchanged in dark (the closing band's button).
- Danger (confirm a destructive action only): outline with a `border.width.thick` `color.status.danger` border and ink label.
- Plate stack: the screen's one main CTA, wrapped as in the signature recipe.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | no shadow, translate 0 |
| hover | translate −`offset.lift` both axes, shadow `offset.lift offset.lift 0 0 color.shadow.hard`, `motion.duration.lift` `motion.easing.lift`; fill unchanged |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| active | slam: translate 0, shadow none |
| disabled | `color.surface.subtle` fill, `color.text.secondary` label, border kept, no lift, `cursor: not-allowed` |
| loading | label kept, leading icon replaced by a 16px rocking ink glyph (`ft-rock`), width locked, no lift, `aria-busy="true"` |

**Token mapping.** Fill `color.action.primary` / `color.action.ink` / `color.surface.raised` (on a band `color.surface.onBand`); label `color.text.onAction` / `color.action.onInk` / `color.text.primary`; border `border.width.hair` `color.art.ink` (outline: `color.border.strong`); radius `radius.sm`; shadow color `color.shadow.hard`; motion `motion.duration.lift`, `motion.easing.lift`.

**Keyboard and screen readers.** Native `<button>` (or `<a>` for navigation); Enter and Space activate. Icon-only buttons need `aria-label`. Loading sets `aria-busy` and keeps the accessible name.

**Do / Don't.** Do pair one pink button with an outline "Cancel", and the hero CTA with an input or outline button of its height. Don't give buttons `radius.full`, a hover color change or a soft shadow.

### Text field

**Purpose.** Single-line text, search, email, numbers; textarea for multi-line.

**Anatomy.** Label (above) → box → optional leading 20px icon or trailing icon button → helper or error line.

**Sizes.** Box height `size.control`, padding 0 `space.4`, `font.size.body`; textarea min 4 lines, padding `space.3` `space.4`. Label `font.size.body` regular, `space.2` above the box. Helper and error `font.size.meta`, `space.2` below. Search in a header band or an input in the footer: same box with `color.surface.onBand` fill, `color.art.ink` border and `color.text.onBand` text in both modes, leading magnifier icon. Hero input (hero action row only): the on-band box at `size.controlHero`, `font.size.lead`, never narrower than the CTA beside it.

**Variants.** Default; search (leading icon, optional trailing square icon button inside the box at `space.2` inset); with inline action (input + pink square arrow button joined, as in the footer); code (`font.family.mono`, `color.surface.subtle` fill, read-only).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.surface.raised` fill, `border.width.hair` `color.border.strong`, `radius.sm`, placeholder `color.text.secondary` |
| hover | none (inputs never lift) |
| focus-visible | border unchanged; `box-shadow: 0 0 0 2px color.focus.halo`; outline 2px `color.focus.ring` at 2px offset |
| disabled | `color.surface.subtle` fill, `color.text.secondary` text, border kept |
| error | `border.width.thick` `color.status.danger` (inset 1px so height holds); message in `color.text.primary` with a 16px danger-filled, ink-outlined "!" disc; `aria-invalid` |
| success (after async check) | a lemon chip (`color.band.lemon`, 1px ink, `radius.full`, `font.size.meta`) after the helper line |

**Token mapping.** Fill `color.surface.raised`; text `color.text.primary`; border `color.border.strong`; focus `color.focus.halo` + `color.focus.ring`; error `color.status.danger`; radius `radius.sm`.

**Keyboard and screen readers.** `<label for>` always visible (no placeholder-only labels); helper and error tied with `aria-describedby`; errors announced on submit via a summary with links to fields.

**Do / Don't.** Do validate on blur and on submit, keeping the typed value. Don't put a band color or a shadow on an input.

### Select

**Purpose.** Pick one option from 5 or more; for 2–4 visible choices use option cards or outline pills.

**Anatomy.** Label → box with value and a 20px chevron at the right → popover menu.

**Sizes.** Same box as Text field (`size.control`, padding 0 `space.4`). Menu: `color.surface.raised`, `border.width.hair` `color.border.default`, `radius.sm`, static hard shadow (`offset.lift`, `color.shadow.hard`), rows `size.controlSm`, padding 0 `space.4`, max height 320px, scroll inside; rows divided by nothing, the menu by its frame.

**Variants.** Native `<select>` styled box (default, mobile); custom listbox when options need icons or descriptions; filter row (a `size.row` ruled row in a group with label left and chevron right, opening a disclosure panel).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | as Text field |
| hover | none on the box; menu row hover `color.surface.default`, `motion.duration.instant` |
| focus-visible | halo + ring as Text field; active menu row also gets the paper fill |
| open | chevron rotates 180° over `motion.duration.open` `motion.easing.open`; menu drops 8px → 0 over `motion.duration.lift` |
| disabled | `color.surface.subtle`, `color.text.secondary` |
| error | as Text field |

**Token mapping.** Box like Text field; menu `color.surface.raised`, `color.border.default`, `color.shadow.hard`; selected row 16px ink check at the right.

**Keyboard and screen readers.** Native select when possible. Custom: `role="combobox"` + `listbox`, arrows move, Enter selects, Escape closes and returns focus, type-ahead.

**Do / Don't.** Do keep the menu the trigger's width or wider. Don't use a soft-shadow floating menu.

### Checkbox and radio

**Purpose.** Checkbox for independent on/off choices and multi-select; radio for one of 2–5. For rich choices use option cards (Card → option).

**Anatomy.** 20px box (checkbox `radius.sm`, radio `radius.full`) → label `font.size.body` at `space.3` gap → optional helper `font.size.meta`.

**Sizes.** Control 20px; whole row is the hit target, min 44px tall. Group gap `space.3`.

**Variants.** Checkbox, radio, indeterminate (2px ink bar).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.surface.raised` fill, `border.width.hair` `color.border.strong` |
| hover | none |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected | fill `color.action.primary`, ink border, 2px ink check (radio: 8px ink dot); no motion beyond `motion.duration.instant` |
| disabled | `color.surface.subtle` fill, label `color.text.secondary` |
| error | `border.width.thick` `color.status.danger` on the control, message as Text field |

**Token mapping.** Fill `color.surface.raised` → `color.action.primary`; mark `color.art.ink`; border `color.border.strong`.

**Keyboard and screen readers.** Native inputs with `<label>`; Space toggles; radios in a `fieldset` with `legend`, arrows move.

**Do / Don't.** Do keep the ink check on pink so state doesn't rely on color. Don't use a colored check or rounded-square 8px corners.

### Switch

**Purpose.** An instant on/off setting that takes effect without a save button. Inside a form that is submitted, use a checkbox.

**Anatomy.** Track (36 × 20px, `radius.full`, 1px border) → knob (14px circle) → label at `space.3` gap.

**Sizes.** Track 36 × 20px; knob 14px with 2px inset; row min 44px.

**Variants.** Default only. Label to the right; in a settings row, label left and switch right.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default (off) | track `color.surface.raised`, border `color.border.strong`, knob `color.text.primary` at the left |
| hover | none |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected (on) | track `color.action.primary`, ink border, knob `color.art.ink` slides right, `motion.duration.lift` `motion.easing.lift` (instant under reduced motion) |
| disabled | track `color.surface.subtle`, knob `color.text.secondary` |

**Token mapping.** Track `color.surface.raised` / `color.action.primary`; border `color.border.strong`; knob `color.text.primary` / `color.art.ink`.

**Keyboard and screen readers.** `<button role="switch" aria-checked>` or a checkbox with `role="switch"`; Space toggles; label names the setting, not the state.

**Do / Don't.** Do show the saved result right away (a toast on failure). Don't color the off track grey-filled.

### Tabs

**Purpose.** Switch between views of the same subject or sort/filter modes. Different destinations use Navigation.

**Anatomy.** A row of outline pills, `space.2` apart, left-aligned under a heading (or right-aligned opposite a section title).

**Sizes.** Pill height `size.controlSm`, padding 0 `space.4`, `font.size.body` regular; 2px invisible hit extension to 44px.

**Variants.** Pill tabs (default); pill tabs inside a header band (`color.text.onBand` text, `color.art.ink` outline on hover and selected, in both modes); scrolling row below `breakpoint.md` (horizontal scroll, no wrap, edge fade not allowed — crop at the padding).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | transparent fill, `border.width.hair` transparent, `color.text.primary` |
| hover | border becomes `color.border.default`, `motion.duration.instant` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected | border `color.border.default` (outline pill), fill unchanged |

**Token mapping.** Text `color.text.primary`; border `color.border.default`; radius `radius.full`.

**Keyboard and screen readers.** `role="tablist"`, `tab` with `aria-selected`, `tabpanel`; arrows move, Home/End jump; links to separate pages use `aria-current` instead.

**Do / Don't.** Do keep tabs flat (no lift). Don't fill the selected tab or underline it.

### Navigation

**Purpose.** Moving between areas and pages: top bar, area header band, sidebar, breadcrumb, footer.

**Anatomy.**
- Top bar: `color.surface.bar`, 80px tall (64px below `breakpoint.lg`), 1px ink rule below; mark left, pill links, and at the right edge full-height blocks split by 1px ink rules: secondary (raised, ink text) and primary (`color.action.ink` / `color.action.onInk`), padding 0 `space.6`.
- Area header band: see the bands signature (title, breadcrumb, search, pill tabs).
- Sidebar (apps with many areas): 240px on `color.surface.default`, 1px ink rule on its edge, pill links stacked `space.1` apart, group labels `font.size.meta` `color.text.secondary`.
- Breadcrumb: underlined ink links, " / " separators, current item plain; `font.size.cardTitle` in a header band, `font.size.body` elsewhere.
- Footer: black band (bands signature).

**Sizes.** Pills `size.controlSm`, padding 0 `space.4`; top-bar blocks full height; menu button 40px with two 2px ink lines 24px wide.

**Variants.** Marketing top bar; product top bar inside the area band (band color, search box, ink CTA); sidebar; mobile full-screen panel (`color.surface.raised`, `size.row` rows ruled in ink, current row with a filled pill).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | pill transparent border, `color.text.primary` |
| hover | pill: 1px ink outline appears instantly; edge blocks: lift |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected | primary nav: `color.nav.current` fill, `color.nav.onCurrent` text (white pill in dark); sidebar same; `aria-current="page"` |

**Token mapping.** Bar `color.surface.bar`, rules `color.border.default`, current `color.nav.current` / `color.nav.onCurrent`, edge CTA `color.action.ink` / `color.action.onInk`.

**Keyboard and screen readers.** `<nav aria-label>`; skip link first; mobile menu button has `aria-expanded`, traps focus in the open panel, Escape closes.

**Do / Don't.** Do mark exactly one current item per nav. Don't underline nav pills or use a colored current state.

### Card

**Purpose.** A white ink-framed box for one item, one stat, one link or one choice. Lists of similar rows use a ruled group, not stacked cards.

**Anatomy.** Frame (`color.surface.raised`, `border.width.hair` `color.border.default`, `radius.sm`) → optional media separated by a 1px ink rule (full bleed inside the frame) → body: title, description, meta → footer row.

**Sizes.** Padding `space.6` (`space.4` below 640px); title `font.size.cardTitle`; description `font.size.body` `color.text.secondary`, clamp 3 lines; grid gap `space.6`.

**Variants.**
- Item card: media on top (or left half on wide cards; without an image, see Imagery), title, description, underlined author or source link, footer with the price flag left and a rating or count right.
- Stat tile: label `font.size.meta` with an 8px dot legend, number `font.size.section` medium, optional flag on the money figure, optional trend in `font.size.meta`.
- Link tile: min height `size.tile`, centered `font.size.cardTitle` text, the whole tile is the link.
- Option card: icon + bold-free title + one-line description; selection state below.
- Panel: a titled section of a form or settings page (title `font.size.lead`, ruled sub-rows).
- Showcase card (marketing only): `radius.lg`, `color.border.soft`, padding `space.8`, title `font.size.section`, a drawn mockup on an ink slab.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | no shadow |
| hover | linked or selectable cards lift (`offset.lift` + `color.shadow.hard`, `motion.duration.lift`); static panels don't |
| focus-visible | 2px `color.focus.ring` outline, 2px offset, on the card |
| active | slam flat |
| selected | `border.width.thick` `color.selected.border` + 20px pink check disc with ink outline top-right; `aria-checked` or `aria-pressed` |
| disabled | content `color.text.secondary`, no lift |

**Token mapping.** Frame `color.surface.raised`, `color.border.default`, `radius.sm`; shadow `color.shadow.hard`; selected `color.selected.border`.

**Keyboard and screen readers.** A linked card has one real link (the title) stretched over the card; option cards are radios or checkboxes styled as cards.

**Do / Don't.** Do keep every card the same white with an ink frame. Don't color a card with a band color or add a shadow at rest.

### Table

**Purpose.** Compare many records by several attributes. Under 4 columns or on phones, prefer a ruled list of label–value rows.

**Anatomy.** Optional toolbar (search, filters as outline pills, compact buttons) → one frame (`color.surface.raised`, 1px ink, `radius.sm`, `overflow: hidden`) → header row on `color.surface.default` → body rows divided by 1px ink rules → optional footer (pagination with compact outline buttons).

**Sizes.** Header row `size.row`, labels `font.size.body` bold; body rows `size.row` (compact `size.control`), cell padding 0 `space.4`, `font.size.body`; key or id column `font.family.mono` `font.size.meta`; inline code chips `color.surface.subtle`, `radius.sm`, padding 0 `space.1`.

**Variants.** Read-only; interactive (clickable rows); selectable (checkbox column first); with one money column showing the price flag in each row's key amount (other amounts plain, right-aligned, tabular).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | white rows, ink rules, no zebra |
| hover | read-only: none; clickable rows: `color.surface.default` fill, `motion.duration.instant` |
| focus-visible | 2px `color.focus.ring` outline inset −2px on the row or cell |
| selected | inset 2px `color.selected.border` left edge + checked checkbox; `aria-selected="true"` |
| loading | the frame and header stay; body rows are dashed placeholder boxes (`color.surface.raised`, 1px dashed `color.border.default`) at final size; "Loading" text for screen readers |
| empty | one full-width row with the dashed empty-state box and one action |
| error | one row: ink message, 16px danger "!" disc, outline "Try again" |

**Token mapping.** Frame and rules `color.border.default`; header `color.surface.default`; rows `color.surface.raised`; numbers right-aligned `font-variant-numeric: tabular-nums`; status cells use status pills (Badge).

**Keyboard and screen readers.** Real `<table>` with `<th scope>`; sortable headers are buttons with `aria-sort`; row actions are reachable by Tab; horizontal scroll container is focusable with a label.

**Do / Don't.** Do keep the header row paper and every rule ink. Don't put stickers, band colors or a lift on rows.

### Badge

**Purpose.** Short status, category or count labels. Money, counts that matter and "new" use the price flag instead.

**Anatomy.** Status pill: outline pill → 8px dot (status or band color, 1px ink outline) → label. Chip: filled band color, ink text. Count: ink circle.

**Sizes.** Pill height 28px, padding 0 `space.3`, `font.size.meta`, `radius.full`, gap `space.2`. Count min 20px, `font.size.meta`.

**Variants.**
- Status pill: `color.surface.raised`, `border.width.hair` `color.border.default`, dot `color.status.*`. On a band or the footer: `color.surface.onBand` fill, `color.art.ink` border, `color.text.onBand` text, in both modes.
- Chip (category, success): `color.band.*` fill, 1px ink, ink text.
- Count: `color.action.ink` fill, `color.action.onInk` text.
- Removable chip: chip + 16px ink × button.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | as variant; static (removable chips lift on hover like buttons) |

**Token mapping.** Fill `color.surface.raised` (on a band `color.surface.onBand`); border `color.border.default` (on a band `color.art.ink`); dot `color.status.success` / `warning` / `danger` / `info`; chip `color.band.*` + `color.text.onBand`; count `color.action.ink` + `color.action.onInk`.

**Keyboard and screen readers.** The label text carries the meaning (never the dot alone); counts get context ("3 unread").

**Do / Don't.** Do use the dot for status and keep text ink. Don't write status text in a status color or use uppercase.

### Dialog

**Purpose.** A focused task or confirmation that blocks the page. Short notices use a toast; long tasks use a page.

**Anatomy.** Scrim `color.surface.overlay` → panel (`color.surface.raised`, 1px ink, `radius.sm`, static hard shadow `offset.lift offset.lift 0 0 color.shadow.hard`) → header (title `font.size.title`, close icon button) → body → footer (actions right, primary last), header and footer divided by 1px ink rules.

**Sizes.** Width 480px (confirm) or 640px (form), max 100vw − `space.8`; header and footer padding `space.4` `space.6`, body `space.6`. Below `breakpoint.sm`: full width at the bottom, top corners `radius.sm`.

**Variants.** Confirm (one sentence, outline Cancel + primary or danger button); form; destructive confirm.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default (open) | panel drops from 8px above to 0 over `motion.duration.lift` `motion.easing.lift`; scrim appears instantly; no opacity animation |
| focus-visible | 2px `color.focus.ring` on the focused control |

**Token mapping.** Panel `color.surface.raised`, `color.border.default`, `radius.sm`; shadow `color.shadow.hard`; scrim `color.surface.overlay`.

**Keyboard and screen readers.** `role="dialog"` `aria-modal` `aria-labelledby`; focus moves to the first field (or the safe action), is trapped, Escape closes, focus returns to the trigger.

**Do / Don't.** Do keep one primary action. Don't put stickers or bands in a dialog.

### Toast

**Purpose.** Brief confirmation or failure after an action. Errors that block work stay inline.

**Anatomy.** Panel (`color.surface.raised`, 1px ink, `radius.sm`, static hard shadow `offset.lift`) → status dot or 20px glyph (or a price flag for money/"New") → one sentence → optional compact outline action → close icon button.

**Sizes.** Width 360px (full width − `space.8` on phones), min height `size.row`, padding `space.3` `space.4`, gap `space.3`; stack `space.2` apart at bottom-right, `space.6` from the edges (bottom-center on phones).

**Variants.** Success (teal dot), info (periwinkle dot), warning (marigold dot), error (danger "!" disc; stays until dismissed), money or new (flag).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | slides up 8px → 0 over `motion.duration.lift` `motion.easing.lift`; leaves by sliding 8px down; auto-dismiss after 5s (paused on hover and focus) except errors. Reduced motion: appears and leaves in place |

**Token mapping.** Panel `color.surface.raised`, `color.border.default`, `color.shadow.hard`; dots `color.status.*`; text `color.text.primary`.

**Keyboard and screen readers.** Region `role="status"` (`role="alert"` for errors), `aria-live` polite; actions reachable by keyboard; never the only place an outcome is shown.

**Do / Don't.** Do keep it to one sentence. Don't color the whole toast with a band.

## New project

1. Inspect the framework, styling approach and component structure. Propose an installation plan and wait for approval.
2. Install the tokens: copy `dist/tokens.css` into the project's global styles (or map `dist/tokens.json` into the theme system the project already uses). Do not retype values. Dark mode follows `prefers-color-scheme`; `data-theme="dark"` or `"light"` on the root forces a mode.
3. Load Space Grotesk (400, 500, 600, 700) and JetBrains Mono (400) with their fallbacks, including the CJK fallback. Set `font.family.sans` on the body and the paper ground `color.surface.default` on the page.
4. Build the signature elements first, as reusable pieces: the lift class and the plate-stack wrapper; the band, split band, header band and black footer; the ink box, ruled group, pill and dashed empty box; the price flag; the hero action row; and a sticker kit of 4–6 original objects of this product's own nouns made with the sticker builder, the header-band placement, the media vignette and glyph box, one word badge and the loading sticker. Then the interaction states from Interaction.
5. Build the base components in the order of the component list, each with every specified state. Assign each top-level area its band color (rule 4) and place the signature elements as Applying the concept says.
6. Create `design-system/` with `VERSION` (the system id and update date the spec states, e.g. `felt-tip-market, updated 2026-01-31`), the tokens, and a short `components.md` of your conventions: the area-to-band map, the sticker subjects, where each signature element is used and how to reuse it.
7. Add one line to `AGENTS.md` and `CLAUDE.md` (create them if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit: styling approach, global styles, shared components, routes, tests. List what the change would touch and what must be preserved.
2. Propose a migration plan, including the area-to-band map and the sticker subjects, and wait for approval.
3. Map the tokens onto the project's existing variables or theme. Keep existing variable names working (alias them) so nothing breaks mid-migration.
4. Build the signature elements as reusable pieces, then restyle one representative screen as a sample (header band, ink frames, lift, the flag on money, a sticker where Applying the concept places one) and wait for review.
5. Continue screen by screen, one commit per screen. Adapt to the existing information structure; never force a layout from a reference image.
6. Preserve: routes, business logic, API contracts, form fields and validation, test ids, labels used by tests, accessibility attributes.
7. Finish with the `design-system/` folder and the `AGENTS.md` / `CLAUDE.md` pointer described under New project.

## Ongoing development

- Before building UI, read `design-system/`. Use semantic tokens and existing components; do not hard-code colors, sizes, radii or shadows.
- Every new screen gets the signature elements its context calls for in Applying the concept — a new screen without them is unfinished. A new area gets the next band color in the map.
- New stickers are drawn with the same recipe and stroke; reuse the kit before drawing more.
- If a need is not covered by the system, compose from existing tokens, then note it in `design-system/components.md`.
- If a request conflicts with the system, present the options instead of deciding silently.

## Verification

- The project builds and its tests pass.
- Every screen was checked at 1440px and 390px wide, in light and dark.
- Every border on a product surface is 1px ink (2px only for selected or error); no soft shadow, blur or gradient exists anywhere; nothing at rest has a shadow except dialogs, menus, toasts and art slabs.
- Pink fills at most three roles and two buttons per screen; at most one plate stack per screen; one band color per product screen; no two same-color bands touch.
- Every hero ends on a pair at one shared 60px height: the plate-stack CTA beside a bordered input that fits the product (or an outline button), stacked full width on phones; never a lone default-size button.
- Hovering a button or linked card lifts it with the hard shadow and pressing slams it flat; inputs, tabs, pills and rows never lift.
- Stickers are original drawings of the product's own subjects, never over text, controls or data; no object repeats on a screen.
- Measure every sticker as it renders (1440px and 390px). Hero: 4–6 stickers, on desktop at least half 180–256px and none under 120px, on phones the largest at least 120px. Header band: one sticker as tall as the title block plus lead, cropped by the trailing side only, at least 60% visible; nothing cropped at a corner.
- Every sticker and drawing is one solid swept straight down on screen with one outer outline; its strip is at least 10% of the object's larger rendered side (30px on a 300px object) along the whole lower edge; thin things are thick board. The largest drawing on a screen shows no less strip than the smallest vignette.
- A media-box drawing spans 55–70% of the box width, is never cut by the frame, and has a 3px outer outline in boxes wider than 320px.
- No item without an image shows a picture glyph or a grey fill: it has its own drawn vignette or a dashed glyph box.
- Dark mode: black ground, boxes one step lighter, black top bar and footer, bands, stickers, plates and flag unchanged, white fills on bands kept, black buttons pink, current nav pill white, hard shadows visible.
- Focus is visible on every interactive element; text meets the contrast rules in this document.
- With reduced motion, drift, rocking and marquees are still, lifts swap instantly, and every screen stays readable.
- No raw color, size or radius values were introduced outside the token files.
- Report: files changed, anything in this document you could not apply, decisions you made yourself.

## Rollback

- Each screen is its own commit, so any step can be reverted alone.
- Token installation is a separate commit; reverting it restores the previous look once the screen commits are reverted.
- The sticker kit lives in its own folder and commit; removing it leaves screens working (stickers are decorative and `aria-hidden`).
