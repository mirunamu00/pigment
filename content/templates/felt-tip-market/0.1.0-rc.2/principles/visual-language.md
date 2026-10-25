## Character

A loud, cheerful storefront drawn with a black felt-tip: paper and white boxes held together by 1px pure-ink hairlines and 4px corners, flat poster-color fields meeting at hard seams, chunky ink-outlined sticker objects strewn around huge friendly grotesk headlines, and buttons that lift off the page on a hard black shadow and slam flat when pressed. No gradients, no blur, no soft shadows, nothing shaded.

## The ten rules that define this look

1. **Every line is 1px ink.** Every border, divider, seam and outline on a product surface is `border.width.hair` in `color.border.default` (pure ink in light). Only large marketing showcase cards use `color.border.soft`. Selected and error states go to `border.width.thick`. Why: the drawn, printed feel lives in the black hairline; a grey border makes it any SaaS.
2. **Paper ground, white boxes.** Pages sit on `color.surface.default`; every card, panel, input, row, dialog and menu is `color.surface.raised` with an ink hairline and `radius.sm`. Raised is always one step lighter than the ground, in both modes (in dark: black ground, boxes a step lighter). Pills (`radius.full`) mean only "where you are" (current nav, current tab) and chips. Why: the paper–white–ink triad is the chrome; everything else is color fields.
3. **Color comes as whole flat fields.** Bands, split bands, sticker fills, plates and the price flag are solid `color.band.*`, `color.plate.*` and `color.flag.fill`, with ink text on them (`color.text.onBand`). Band-colored text exists only as headings on a `color.surface.inverse` half; no colored text on paper or white. Never a gradient, tint, transparency or pastel of a band color. Why: it reads as a screen-printed poster.
4. **Each product area owns one band color.** Assign `color.band.lemon`, `periwinkle`, `teal`, `marigold` to the product's top-level areas in nav order and cycle; the area's header band uses it, so color means "where you are". A product screen shows one band color at most (sticker fills and item vignette grounds are art, not bands); marketing pages up to three plus `color.band.ink`. Why: color carries navigation instead of decoration.
5. **Pink is the one action color.** `color.action.primary` marks the primary button, `color.focus.halo`, `color.selected.border`, the price flag, `color.chart.line` and the closing band. A screen uses pink in at most three of these roles, with at most two pink buttons; repeats of one role (a flag on every card, the focus halo) count once. Why: one hot color makes the next step obvious on a loud page.
6. **Clickable things lift, then slam.** At rest no shadow; hover moves the element `offset.lift` up-left and shows a hard `offset.lift` shadow in `color.shadow.hard` over `motion.duration.lift` / `motion.easing.lift`; press returns it flat. One primary CTA per screen may lift on the stacked plates. Why: the paper-cutout response is the brand's touch.
7. **Illustration is thick, flat ink drawing.** Stickers, die-cut word badges on an ink slab, and circle vignettes: one flat fill per shape, an even `color.art.ink` outline, no shading, tilted and cropped. A sticker is a thick object: face, a back 10–15% of its height lower, and a solid side band joining them, never a single outline. They sit behind headlines, in empty, error, success and loading states and in the media slot of items without an image, never over text, controls or data. Why: chunky die-cut objects are the joy; a thin line drawing reads as a clip-art icon.
8. **One friendly grotesk, sentence case.** `font.family.sans` everywhere. Display at `font.size.hero`, `display` or `section`, weight `font.weight.medium`, `font.tracking.display`; UI at `font.size.body` / `font.lineHeight.body`, weight regular. No uppercase labels anywhere. Why: big plain words in a warm grotesk are the voice.
9. **Motion is physical and sparse.** Lift, slam, plate jump, scroll-linked sticker drift, a chevron turn, an occasional linear marquee. No fades, reveals, entrance animations, spinners or shimmer; under reduced motion everything is still. Why: things move like paper, never like a slide deck.
10. **Dark mode inverts only the chrome, and keeps depth the right way up.** The page ground `color.surface.default` goes black and raised boxes `color.surface.raised` one step lighter, edged with the 35% white `color.border.default`, so boxes rise from the ground as white boxes do from paper. The top bar (`color.surface.bar`) and footer (`color.surface.inverse`) stay black fields. Black buttons and the current nav pill swap (`color.action.ink`, `color.nav.current`); the hard shadow goes white at 35%, and dialogs, menus and toasts stay on the raised tone with that shadow visible. Bands, stickers, plates, the flag and ink outlines stay exactly as in light, and anything on a band (status pill, outline button, chip, search box) keeps its white `color.surface.onBand` fill and ink text. A sticker always sits on a band or a raised field, never directly on the black ground, so its ink outline shows. Why: the poster colors are the identity in both modes, and depth that sinks in dark reads as a different system.

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
- A sticker drawn as one outline with a hairline edge; the same object twice on one screen; an empty-state drawing that is a recolored copy of another sticker on the page.
- A generic picture glyph (sun and mountains, a landscape, a photo icon) or a grey fill standing in for a missing image.
- In dark: boxes darker than the ground, or a white-filled control on a band turning black.
- A sticker over text, a control or data; stickers inside a table, form or list (an item's media vignette excepted); more than one plate stack per screen.
- Two adjacent bands of the same color; a band behind a data table or form fields; pink used as an area band.
- Zebra striping, row shading on hover in read-only tables, card-shaped rows with gaps instead of ink rules.

## Signature elements

Build these first, as reusable pieces. The CSS uses only the system's tokens.

### Lift-and-slam hard shadow (with the plate stack)

**What.** Clickable things behave like paper cutouts. At rest: `border.width.hair` ink border, `radius.sm`, no shadow. Hover: the element moves `offset.lift` up and left and a hard `offset.lift offset.lift 0 0` shadow in `color.shadow.hard` appears underneath, so the box seems to rise off the page. Press: it slams back to 0 with no shadow. The **plate stack** is the one hero version: behind the primary CTA sit two plates of the same size and radius, each with an ink hairline: plate A `color.plate.a` and plate B `color.plate.b`. On hover the button jumps `offset.plate` up-left, plate A `offset.lift`, plate B stays, so a lemon and a red edge fan out under it.

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
```

**Motion.** Trigger hover (and `:focus-within` for the plate stack); `translate` + `box-shadow` over `motion.duration.lift` with `motion.easing.lift`; press returns to 0 over the same duration; the plate-stack button stays lifted while pressed. Once per interaction, no loop. Reduced motion: no transition, the lifted state swaps in instantly (the shadow still appears, so the state stays readable).

**Where.** Every button, linked card, link tile, option card, toolbar and row action, icon button. Plate stack: the single main CTA of a hero, an empty state's create action, an error page's recovery action, a success screen's next step. Dialogs, toasts and menus carry the lifted shadow statically, as if already picked up.

**Limits.** One plate stack per screen. Never on text inputs, selects, tabs, nav pills, table rows or plain text links. Never a blur radius. Plates are only `color.plate.a` and `color.plate.b`, never pink.

### Ink-outlined sticker objects

**What.** Big, flat, chunky drawings of everyday objects from the product's own domain (a ticket, a key, a cup, a calendar page, a parcel, a disc-shaped token, a curled paper slip), each a **thick object**, as if die-cut from heavy card: a face, a back, and a solid band of side edge between them, all in one flat band-color fill (or `color.art.white`) with an even `color.art.ink` outline that also draws 1–3 inner edges. They are large (on a desktop hero at least half are 160–240px wide), rotated 15–60°, partly cropped by the band or viewport edge, and ringed around a headline. Two more registers share the same drawing: **die-cut word badges** (a starburst, blob or rounded rectangle in one band color, holding one short tall-condensed word filled in a second band color with its own ink outline, sitting on a solid ink slab offset `offset.slab` down-right) and **circle vignettes** (a circle-cropped flat still life in 3–4 band colors with ink outlines, captioned by a white `radius.full` pill with an ink hairline that overlaps the circle's bottom edge by half its height).

**Recipe.** Original inline SVG only. Every sticker is built in four steps, painted in this order:

1. **Back.** The face shape, shifted down by 10–15% of the object's drawn height (12–24 units on a 120–160-unit object), same fill, ink outline.
2. **Side.** Join face and back with the side silhouette so a solid band of edge shows: for a rounded face, a filled rectangle from the face's leftmost to its rightmost point down to the back, with ink lines only on its two outer edges; for a face whose lowest edge is straight, the back alone already shows the band.
3. **Face.** The object's front outline, flat fill, ink outline, on top.
4. **Inner strokes.** 1–3 on the face: a rim, a fold, a seam, a perforation, a ruled line, or one solid ink glyph of the object's kind.

A shape with one outline and a hairline edge is not a sticker; neither is a line icon scaled up. Stroke `border.width.art`, round joins and caps, `vector-effect: non-scaling-stroke`. Fill differs from the band it sits on. Never draw the same object twice on one screen: each sticker is a different noun (or a clearly different pose of one).

```html
<!-- Disc token, viewBox 220 x 200. Face height 100, back 14 lower (12%). Colors go in style
     (var() does not work in SVG attributes). Rotate the whole group. -->
<svg class="ft-sticker ft-sticker--lg" viewBox="0 0 220 200" aria-hidden="true" focusable="false">
  <g transform="rotate(-28 110 99)" style="fill: var(--color-band-lemon); stroke: var(--color-art-ink)"
     stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <ellipse cx="110" cy="106" rx="80" ry="50"/>                           <!-- 1 back -->
    <path d="M30 92 V106 H190 V92 Z" style="stroke: none"/>               <!-- 2 side fill -->
    <path d="M30 92 V106 M190 92 V106" style="fill: none"/>               <!--   side edges -->
    <ellipse cx="110" cy="92" rx="80" ry="50"/>                            <!-- 3 face -->
    <ellipse cx="110" cy="92" rx="62" ry="37" style="fill: none"/>         <!-- 4 rim -->
    <path d="M96 80 L124 80 L110 104 Z" style="fill: var(--color-art-ink)"/> <!--   glyph -->
  </g>
</svg>
<!-- Straight-edged object (a ticket), viewBox 220 x 200. Face height 84, back 12 lower (13% of 96). -->
<svg class="ft-sticker ft-sticker--md" viewBox="0 0 220 200" aria-hidden="true" focusable="false">
  <g transform="rotate(22 110 100)" style="fill: var(--color-art-white); stroke: var(--color-art-ink)"
     stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path transform="translate(0 12)" d="M30 50 H190 V80 A12 12 0 0 0 190 104 V134 H30 V104 A12 12 0 0 0 30 80 Z"/>
    <path d="M30 50 H190 V80 A12 12 0 0 0 190 104 V134 H30 V104 A12 12 0 0 0 30 80 Z"/>
    <path d="M150 56 V128" stroke-dasharray="6 6" style="fill: none"/>
    <path d="M48 76 H128 M48 92 H112 M48 108 H120" style="fill: none"/>
  </g>
</svg>
<!-- Die-cut badge: ink slab, shape, condensed word with its own outline -->
<svg class="ft-badge" viewBox="0 0 230 150" aria-hidden="true" focusable="false">
  <path d="M20 30 Q110 0 200 30 Q215 70 200 110 Q110 140 20 110 Q5 70 20 30Z" transform="translate(8 8)"
        style="fill: var(--color-art-ink)"/>
  <path d="M20 30 Q110 0 200 30 Q215 70 200 110 Q110 140 20 110 Q5 70 20 30Z" stroke-width="2"
        style="fill: var(--color-band-teal); stroke: var(--color-art-ink)"/>
  <text x="110" y="92" text-anchor="middle" transform="translate(110 0) scale(0.72 1) translate(-110 0)"
        font-weight="700" font-size="64" stroke-width="2" paint-order="stroke"
        style="font-family: var(--font-family-sans); fill: var(--color-band-lemon); stroke: var(--color-art-ink)">done</text>
</svg>
```

```css
.ft-sticker-layer { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.ft-sticker-layer > svg { position: absolute; }
.ft-sticker--lg { width: clamp(var(--size-sticker-band), 15vw, var(--size-sticker-hero)); }
.ft-sticker--md { width: clamp(var(--size-sticker-sm), 10vw, var(--size-sticker-md)); }
.ft-sticker *, .ft-badge * { vector-effect: non-scaling-stroke; }

/* Header-band sticker: vertically centred at the trailing edge, cropped by that side only,
   75% visible, never touching the band's top or bottom seam, never under content. */
.ft-band--with-sticker { --ft-s: clamp(var(--size-sticker-sm), 10vw, var(--size-sticker-band));
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

Paper objects (slips, tickets, pages) are white, built the same way, and one end may curl back as a half-cylinder (a 180° arc of radius 12–16 units) with 3–6 ruled ink lines on the face. Vignettes: `<clipPath>` circle, band-color ground, 2–4 flat objects, no people or faces.

**Placement.**
- **Hero.** The first screen of a front page (the home of a publication, a store, a product or a marketing site) is a hero band, never a compact header band: a `font.size.hero` headline, lead and plate-stack CTA, ringed by 4–6 different stickers in an `aria-hidden` layer behind the content. At least half are `.ft-sticker--lg`; 20–40% of the outer ones run off the band or viewport edge, so each shows at least 60% of itself; none overlaps the headline, lead or CTA.
- **Header band.** One sticker per band, at least as tall as the band's title block (never under 96px on desktop, 64px on phones), vertically centred at the band's trailing edge and cropped by that side only, never by the band's top or bottom seam, showing at least 60% of itself on every viewport. The band reserves room for it so it never sits under a title, search or button. When the band is too short, shrink the sticker to its minimum or move it inward; never let a seam cut it.
- **Empty state.** One `size.stickerMd` drawing of the missing thing itself, in its own silhouette and pose (an empty inbox: an open envelope; no results: an empty magnifier lens), never a recolored copy of another sticker on the page.
- **Dark mode.** Stickers sit on a band or a raised field, never directly on the black ground.

**Motion.** Scroll-linked drift only: `ft-drift`, translateY 0 → −50% of the sticker's own height across the root scroll, linear, no iteration (hero layers only; header-band and empty-state stickers stay still). Loading sticker: `ft-rock`, two stepped poses ±8°, `motion.duration.rock` each, infinite while loading. Reduced motion or no scroll-timeline support: static at its rotation; the loading sticker holds at 0° and the visible "Loading" text stays.

**Where.** Heroes (4–6 objects ringing the headline); the color half of split bands (a cluster, a badge, or a drawn mockup on a slab); header bands of overview and dashboard screens (one object, placed as above); empty states; error pages (two tumbling objects); success and onboarding steps (one word badge); loading of a whole screen (one rocking sticker inside a dashed raised box); pricing bands (token-shaped objects around the price); the media slot of an item with no image of its own (a vignette, see Imagery).

**Limits.** At most 6 per hero, 1–2 on a product screen (item media vignettes not counted). Never over text, controls or data; never inside tables, forms, lists or toasts; inside a card only as its media vignette. Always the four-step thick construction, an ink outline and a flat fill. Subjects are the product's own nouns: no letters, logos, currency symbols as the only subject, people or mascots.

### Hard-seamed poster bands

**What.** Sections are single flat saturated fields (`color.band.*` or `color.band.ink`) running edge to edge and meeting at 1px ink seams. Marketing pages stack them: a sticker-strewn hero band, a white intro, **checkerboard split bands** (a 50/50 grid: one half a band color holding art, the other `color.surface.inverse` holding 2–3 stacked items, each a heading in a band color at `font.size.title`–`font.size.section` over `font.size.body`–`font.size.lead` text in `color.text.inverse`; the black side swaps on every row), a FAQ, a pink closing band (`color.band.pink`, centered `font.size.display` headline, one white button with an ink hairline) and the black footer. Product screens open on a **header band** in their area's color carrying the title, breadcrumb, search and pill tabs, over a paper body.

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

**Where.** Product screen header (area band); marketing hero; pricing (split band with one figure per half); feature or onboarding tours (checkerboard rows); end of long pages (pink closing band, then black footer); full-screen error and 404 (one band filling the viewport); a dashboard may add one split band for two headline numbers. Footer on every page: `color.surface.inverse`, a `font.size.section` headline left, link columns right, a `color.surface.onBand` input with a square pink arrow button.

**Limits.** One band color per product screen (plus the black footer); up to three plus black on marketing. Never two same-color bands adjacent. No band behind tables, forms or long text bodies (those sit on paper). Pink only as the closing band. Band-colored text only as headings on the ink half. Dark mode leaves bands, and everything on them, unchanged.

### Ink hairline frame with pill markers

**What.** Structure is drawn, never shaded. White boxes with a 1px ink border and `radius.sm` sit on paper; groups are one box divided by 1px ink rules (`size.row` rows), never separate floating cards. Position is marked with pills: the primary nav's current item is a filled `color.nav.current` pill with `color.nav.onCurrent` text; the current tab or chip is a transparent pill with a 1px ink outline; other pills have a transparent border so nothing shifts. Empty containers are a `1px dashed` ink box.

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

**Limits.** Borders are always 1px ink (2px only for selected and error). Product radius never above `radius.sm`. No shadows at rest. Pills only for position and chips, never for buttons.

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

**Where.** Item or plan cards (the price); one amount cell per table row (the row's key money figure); a dashboard's headline revenue or count; checkout and order forms (the live total); billing (the plan price); a toast confirming a payment or announcing something new ("New").

**Limits.** One per card, row or tile. Only for money, counts or "new". Same in dark mode.

## Color use

- Chrome is `color.surface.default`, `color.surface.raised` and ink. Color arrives only as whole fields: bands, split halves, sticker fills, plates, the flag, the selected border, a status dot.
- Dark: ground `color.surface.default` is black, every box `color.surface.raised` one step lighter, top bar `color.surface.bar` and footer `color.surface.inverse` black. A white fill that sits on a band or the footer (status pill, outline button, chip, input) is `color.surface.onBand` in both modes, never `color.surface.raised`.
- Pink (`color.action.primary`) in at most three roles per screen (rule 5) and on at most two buttons. Secondary actions are `color.action.ink` (black) or outline.
- Text on any band or pink fill is `color.text.onBand` / `color.text.onAction`; on `color.surface.inverse` it is `color.text.inverse`, with headings optionally in a band color.
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
- Controls `size.control` (48px), compact controls and pills `size.controlSm`, list and table rows `size.row`.
- Component padding: buttons 0 `space.6`; panels `space.6` (`space.4` below 640px); cards `space.6`; showcase cards `space.8`.
- Gaps: fields `space.6`, grid gutters `space.6` (`space.4` mobile), between panels `space.6`, between page sections on paper `space.16`.
- Bands: `space.24`–`space.32` block padding on marketing (`space.16` on mobile), `space.6`–`space.8` on product header bands.
- Dense screens keep 48px controls and 56px rows; tighten by removing panels, never by shrinking type below `font.size.meta` or rows below `size.control`.

## Shape and depth

- `radius.sm` on every product component; `radius.full` on pills, switch tracks, status pills and caption bubbles; `radius.lg` only on large marketing showcase cards and speech bubbles (one square corner toward the speaker); `radius.md` on secondary marketing tiles.
- Depth has exactly three forms: none (rest), the hard lift shadow (hover; dialogs, menus and toasts statically), and the ink slab under drawn art and mockups (`offset.slab`, `color.art.ink`, static).
- Separation is always a 1px ink border or rule, never a shadow or a tone change.

## Motion

| Pattern | Trigger | From → to | Duration / easing | Iterations | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| Lift | hover | translate 0 → −`offset.lift` both axes, shadow none → hard | `motion.duration.lift`, `motion.easing.lift` | once | instant swap |
| Slam | press | lifted → 0, shadow off | same | once | instant |
| Plate jump | hover / focus-within on the plate stack | button −`offset.plate`, plate A −`offset.lift` | same | once | instant |
| Sticker drift | page scroll | translateY 0 → −50% | scroll timeline, linear | scroll-bound | static |
| Disclosure | open / close | chevron 0 → 90°, plus 0 → 45°, panel height auto | `motion.duration.open`, `motion.easing.open` | once | instant |
| Pill outline | hover | transparent → ink border | `motion.duration.instant` | — | same |
| Toast, dialog arrive | open | translate 8px → 0 (toast up, dialog down), no opacity change | `motion.duration.lift`, `motion.easing.lift` | once | appears in place |
| Loading sticker | while loading | −8° ⇄ +8°, stepped | `motion.duration.rock` per pose | infinite | still at 0° |
| Tag marquee (marketing only) | always | translateX 0 → −50% of a duplicated row | `motion.duration.marquee` (`marqueeMobile` ≤767px), linear | infinite, pauses on hover | removed, row wraps |

Never animate opacity, color, size, blur or layout on content. Nothing animates on page load.

## Interaction

| Element | Hover | Focus-visible | Press | Open / selected |
| --- | --- | --- | --- | --- |
| Buttons, icon buttons | lift (`offset.lift` + hard shadow), `motion.duration.lift` | 2px `color.focus.ring` outline, 2px offset | slam flat | loading: label stays, a 16px rocking glyph replaces the icon, `aria-busy` |
| Plate-stack CTA | button −`offset.plate`, plate A −`offset.lift` | ring + plates fan out | stays lifted | — |
| Linked cards, tiles, option cards | lift | ring on the card | slam | selected: `border.width.thick` `color.selected.border` + a 20px pink check disc with ink outline in the top-right |
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
- Header: desktop shows pill links; below `breakpoint.lg` a 40px two-line menu button opens a full-screen white panel of `size.row` rows divided by ink rules.
- Priority on narrow screens: title and primary action first, then data, then stickers (hero stickers shrink to `size.stickerSm`–`size.stickerBand`, the header-band sticker to no less than `size.stickerSm`; each still shows at least 60% of itself; never drop the header band or its sticker).
- Touch targets ≥44px: pills keep a 40px visual with a 2px invisible hit-area extension.

## Applying the concept

| Context | What it uses | How strongly |
| --- | --- | --- |
| Page header (product) | Area header band with title, breadcrumb, search, pill tabs; 1px ink seam; on overview and dashboard screens one sticker at least as tall as the title block, centred at the trailing edge (sticker recipe → Placement) | band always; sticker on overviews |
| Front page, hero or landing section | Hero band (never a compact header band) on the first screen of any front page: `font.size.hero` headline, 4–6 different drifting stickers ringing it, at least half `.ft-sticker--lg` (160–240px on desktop), no object drawn twice, plate-stack CTA + bordered input | full |
| Section break | A seam into a new band, a checkerboard split band, or a white intro with eyebrow + display heading | one per section |
| Card grid | White ink-framed cards, lift on hover, price flag on money, media separated by a 1px rule; an item without an image gets its own drawn vignette or a dashed glyph box (Imagery) | medium |
| FAQ or help | White ruled list: plus glyph left, `font.size.title` questions; or `size.tile` link tiles; area band on top | medium |
| Form or checkout | Narrow title band, fields in one white panel, pink submit with lift, flag for the live total | light |
| Settings | Quiet header band, underlined section links left, ruled panels right, option cards with pink selected border, switches | light |
| Dashboard | Header band with one sticker (as Page header), stat tiles with 48px numbers and dot legends, one flag on the headline money figure, pink-line-over-grey-bars chart in a framed panel | medium |
| Data table | Ink-framed table, paper header row, ruled rows, pink flag in one amount cell, lifting toolbar buttons; no band or sticker inside | light, never none |
| Empty state | Dashed box, one `size.stickerMd` sticker drawing the missing thing in its own silhouette and pose, never a recolored copy of a sticker already on the page (a 20px solid glyph inside small panels), one sentence, one action (plate stack if it is the screen's main action) | medium |
| Error | Full-viewport band, 72–96px sentence, two stickers, plate-stack recovery; inline errors are a white panel with a 2px danger border and an outline "Try again" | full / light |
| Loading | One rocking sticker inside a dashed raised box for a whole screen; dashed `color.surface.raised` placeholder boxes in the final layout for parts; visible "Loading" text | light |
| Toast or confirmation | White ink panel with static hard shadow, status dot or flag, one action; success screens get one word badge on its slab | light |
| Dialog or menu | White ink panel with static hard shadow over `color.surface.overlay`, 1px ruled header and footer | light |
| Footer | Black band, big headline, link columns, `color.surface.onBand` input with pink square arrow; pink closing band above it on long pages | always |

## Imagery and icons

- Icons: solid ink glyphs or 2px round-cap line icons at 16, 20 or 24px on a 24px grid, `color.text.primary`; never thin 1px outline sets. Lists may use 20px check discs (pink fill or ink fill, ink outline).
- Stickers, badges and vignettes follow their recipe; every piece is original and drawn for the product's own nouns.
- Drawn UI mockups (for marketing): a white window with a 1px ink frame, a 24px top bar with three 6px dots in band colors, flat contents, sitting on an `offset.slab` ink slab.
- Photos and people's images: inside a 1px ink frame with `radius.sm`, never rounded further, never filtered; a portrait cut-out may sit on a flat band-color blob with an ink outline.
- User content (covers, avatars) is shown as-is inside ink frames; the system's color comes from the chrome around it.
- **An item with no image of its own** (a cover, a product photo, an article figure, a thumbnail) never gets a generic picture glyph (sun and mountains, a landscape, a photo icon) and never a grey fill. Do one of two things, the same way for every item in a set:
  - **Drawn vignette** (content-heavy screens: card grids, item pages, article figures): a band-color ground (cycle lemon, periwinkle, teal, marigold by item order; these are art grounds, not area bands) with 1–3 flat ink-outlined objects built with the sticker recipe and named by the item's own topic or kind (an audio item: headphones and a disc; a travel guide: a suitcase and a ticket). Different objects for each item; two items never share one drawing.
  - **Glyph box** (dense lists, small thumbnails, placeholders before upload): `color.surface.raised` with a 1px dashed ink border and one small solid ink glyph of the item's type, 24–32px, centred.

```css
.ft-media { aspect-ratio: 4 / 3; overflow: hidden; border-block-end: var(--border-width-hair) solid var(--color-border-default); }
.ft-media--drawn { background: var(--ft-band); position: relative; }        /* objects are .ft-sticker--md, cropped by the frame */
.ft-media--glyph { display: grid; place-items: center; background: var(--color-surface-raised);
  border: var(--border-width-hair) dashed var(--color-border-default); border-radius: var(--radius-sm); }
.ft-media--glyph svg { width: calc(var(--size-icon) * 1.5); height: calc(var(--size-icon) * 1.5); fill: var(--color-text-primary); }
```

## Writing

Sentence case; plain, upbeat second person; short headlines that name the outcome, often with a number. Buttons are 1–2 word verbs; an arrow-only button uses a text arrow and an `aria-label`. Empty and error text is one short sentence plus one action. No exclamation runs, no jargon.

## Accessibility

Text contrast at least 4.5:1 (7:1 for body text on the default surface); ink on every band and on pink passes. Focus is always visible: a 2px `color.focus.ring` outline at 2px offset, plus the `color.focus.halo` band on text inputs. Selected states never rely on pink alone (add the check disc or the filled pill). Touch targets ≥44px. Stickers, plates and slabs are `aria-hidden`; vignettes that carry meaning get a text alternative. Under `prefers-reduced-motion: reduce` drift, rocking and the marquee stop and lifts swap instantly; content stays readable and complete.
