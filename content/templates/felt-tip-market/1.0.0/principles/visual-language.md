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
