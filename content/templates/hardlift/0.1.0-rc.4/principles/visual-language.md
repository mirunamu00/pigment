## Character

A flat, ink-outlined, bubblegum-pink maker's marketplace: every control is a 1px ink rectangle with a 4px corner that physically lifts off the page on hover and leaves a hard offset shadow behind it. Warm paper, pure ink and one loud pink carry the interface; section headers flood with a single saturated color and illustration is flat sticker art. It is for storefronts, creator tools, dashboards and landing pages that want a confident, playful voice, and it refuses blur, gradient, translucency and bold type.

Use `color.*` semantic tokens and the primitives, never `color.neutral.*`, `color.pink.*` or `color.band.*` directly in components. Spacing tokens are named by pixels: `space.16` = 16px. Hard shadows are `box-shadow: var(--shadow-md) var(--color-shadow-hard)` (the shadow tokens hold the offset only; the color flips by theme).

## The ten rules that define this look

1. **Paper, ink, white.** Page `color.surface.default`; text and borders `color.text.primary` / `color.border.default`; `color.surface.raised` only for cards, inputs, dialogs and toasts; dark is a `color.surface.default` ground with `color.surface.raised` cards. Why: the warm ground plus pure ink is the identity.
2. **Everything is outlined.** Every control and card has a `border.width.thin` solid `color.border.default`; buttons, inputs, toasts `radius.sm`, cards and dialogs `radius.md`, pills `radius.full`. Why: the outline makes flat fills read as objects.
3. **Flat, with one exception.** No blurred shadow, gradient, translucency or glow anywhere; the only shadow is the hard offset (`shadow.*`, blur 0) that appears on hover, on toasts and on dialogs. Why: softness turns this into generic SaaS.
4. **Hover lifts.** A button translates -4px -4px and shows `shadow.md` in `motion.duration.base` with `motion.easing.standard`; press returns it flush; a hero CTA lifts 8px over an ink plate. Why: the lift is the brand's handshake.
5. **One loud pink.** `color.action.primary` is the main CTA, price tags and, as `color.accent.halo`, the input focus halo: at most one pink action per viewport plus small tags. Why: loudness only works when rationed.
6. **Sections own a color.** Each section or workspace owns one `color.band.*` that floods only its header band; ink text, one band color per screen, never on cards or body. Why: wayfinding by color without decorating content.
7. **One grotesk, regular weight.** `font.family.body` at `font.weight.regular` for everything (headings included), `font.tracking.display` from `font.size.lg` up, sentence case, body `font.size.md` on `font.lineHeight.ui`. Why: tight, plain type is the confident voice.
8. **Pills navigate.** Navigation, filters and choices are pills that show their outline only on hover and fill with `color.surface.raised` when selected. Why: quiet at rest, loud on demand.
9. **Flat sticker art.** Illustration is flat shapes with a heavy `color.text.primary` outline, an extruded rim for coins, no gradient; hero shapes are oversized, tilted, cropped and drift; dense screens carry one small sticker; a missing photo is a different sticker object per item, never a generic image glyph. Why: the sticker is the playful half of the system.
10. **Mechanical motion.** `motion.duration.base` lifts and flips, `motion.duration.slow` disclosures, slow linear loops only for decoration; no bounce, spring, scale or fade-in; everything off under reduced motion. Why: a machine part snapping into place, not a bouncing toy.

## Never

- Blurred shadows, glows, gradients, translucent panels, glassmorphism, `backdrop-filter`.
- Bold headings or buttons (`font.weight.bold` only for table totals and inline emphasis); uppercase text; serif type.
- Radius above `radius.md` on a control; pill-shaped primary buttons; round avatars with soft shadows.
- A lift on inputs, table cells, whole table rows, sticky bars or more than one element per hover.
- Two visible pink actions (count component-owned buttons too); a pink open-menu trigger, selected control or toggle; a generic image glyph (mountains and sun, picture frame) as placeholder or figure; the same drawing on two items or figures; pink or band color as card, table or body background; a band color paired with another band color on one screen.
- Spinners, skeleton shimmer, scale or bounce easing, fade-in on scroll, load choreography.
- Emoji or filled stock icons; photos with filters, rounded corners above `radius.md` or shadows.
- Raw hex, px shadows or radii in components; light-mode shadows reused on dark ground.
- Status by color alone; a toast colored by status.
- Secondary, muted, link or disabled-looking text on a band, pink or other colored fill; any text below 4.5:1 against the fill directly behind it.

## Signature elements

### Hard-lift buttons

**What.** Every button, row action and linked card is a flat fill with `border.width.thin` ink border and `radius.sm`. On hover it translates -4px -4px and a solid `shadow.md` appears at the lower-right, whose far corner lands exactly on the element's original corner, so the object looks lifted off the page. Press snaps it back flush.

**Recipe.**

```css
.lift {
  border: var(--border-width-thin) solid var(--color-border-default);
  border-radius: var(--radius-sm);
  padding: var(--space-12) var(--space-16);
  font: var(--font-size-md)/var(--font-line-height-ui) var(--font-family-body);
  background: var(--color-action-primary);
  color: var(--color-text-on-action);
  transition: translate var(--motion-duration-base) var(--motion-easing-standard),
              box-shadow var(--motion-duration-base) var(--motion-easing-standard),
              background-color var(--motion-duration-base) var(--motion-easing-standard);
}
@media (hover: hover) {
  .lift:hover { translate: -4px -4px; box-shadow: var(--shadow-md) var(--color-shadow-hard); }
}
.lift:active { translate: 0 0; box-shadow: none; }
.lift--ink  { background: var(--color-action-inverse); color: var(--color-text-on-inverse); }
.lift--ghost { background: transparent; color: var(--color-text-primary); }
.lift--ghost:hover:not([aria-haspopup], [aria-expanded]) { background: var(--color-action-primary); }   /* plain outline buttons flip to pink; triggers never do */
.lift--ghost[aria-haspopup]:hover, .lift--ghost[aria-expanded]:hover { background: transparent; }   /* trigger hover: lift and ink border only */
/* open trigger: wins over every hover rule above */
.lift[aria-expanded="true"], .lift--ghost[aria-expanded="true"]:hover, .lift[aria-expanded="true"]:hover {
  background: var(--color-surface-raised); color: var(--color-text-primary); border-color: var(--color-border-default);
}
.lift--ink[aria-expanded="true"], .lift--ink[aria-expanded="true"]:hover { background: var(--color-action-inverse); color: var(--color-text-on-inverse); }
/* linked card: the outermost bordered element that receives the pointer */
.lift-card { border: var(--border-width-thin) solid var(--color-border-default); border-radius: var(--radius-md);
  transition: translate var(--motion-duration-base) var(--motion-easing-standard), box-shadow var(--motion-duration-base) var(--motion-easing-standard); }
@media (hover: hover) { .lift-card:hover { translate: -4px -4px; box-shadow: var(--shadow-md) var(--color-shadow-hard); } }
.lift-card:active { translate: 0 0; box-shadow: none; }
.lift--icon:hover { translate: -2px -2px; box-shadow: var(--shadow-sm) var(--color-shadow-hard); }
/* hero CTA: the plate stays put, the button lifts 8px off it */
.lift-hero { position: relative; display: inline-block; }
.lift-hero::before { content: ""; position: absolute; inset: 0; border-radius: var(--radius-sm); background: var(--color-shadow-hard); }
.lift-hero > .lift { position: relative; }
.lift-hero > .lift:hover { translate: -8px -8px; box-shadow: none; }
@media (prefers-reduced-motion: reduce) {
  .lift { transition: background-color var(--motion-duration-fast) linear; }
  .lift:hover, .lift:active, .lift-card:hover, .lift-card:active { translate: none; box-shadow: none; }
  .lift:hover { background: var(--color-action-primary-hover); }
}
```

**Motion.** Hover out and press back both `motion.duration.base`, `motion.easing.standard`, one-shot on pointer enter/leave. Touch: no lift (`hover: hover` guard); press shows the fill flip. Reduced motion: no translate, no shadow, color change only.

**Where.** Every CTA, form submit and cancel, toolbar icon button (2px), settings save row, data-table row action (2px), empty-state and error buttons, landing hero CTA (8px plate), and whole linked cards in a grid (4px).

**Linked cards.** The lift goes on the card's outer bordered box: the anchor itself, or the element that wraps it and receives the pointer, never an inner image or title. Put the `.lift-card` class (or its exact hover rule: translate -4px -4px plus `shadow.md` in `color.shadow.hard`) on that element. The lift is the card's hover; a fill change never replaces it, and a background tint is optional and only comes together with the lift. Hover one card and check that it moves off the page with the offset shadow behind it, in light and dark.

**Limits.** One lifted element per hover; never on inputs, table cells, whole rows or sticky bars; keep 8px of clearance around a lifting element so the shadow is not clipped by `overflow: hidden`.

### Sticker illustration

**What.** Flat shapes in `color.action.primary` and `color.band.*` with a heavy ink outline (3px at 32px, 3px at 160px, 4px at 250px): coins with an extruded rim, tags, stars, arrows, face-less blobs. No gradient, no inner shadow; the sticker's own contour may carry a `shadow.md` offset in `color.shadow.hard`.

**Recipe.** Inline SVG, `aria-hidden="true"`, `stroke="currentColor"` with `color: var(--color-text-primary)` and fills from semantic tokens only. A coin is a face ellipse plus a copy offset 12px (large) or 3px (small) down-right as the rim, joined by two ink lines tangent to both; one heavy glyph on the face; tilt 8-20 degrees.

```html
<svg viewBox="0 0 160 160" width="160" height="160" aria-hidden="true" style="color:var(--color-text-primary)">
  <ellipse cx="88" cy="84" rx="62" ry="62" fill="var(--color-band-yellow)" stroke="currentColor" stroke-width="4"/>
  <ellipse cx="76" cy="72" rx="62" ry="62" fill="var(--color-action-primary)" stroke="currentColor" stroke-width="4"/>
  <line x1="28" y1="102" x2="40" y2="114" stroke="currentColor" stroke-width="4"/>
  <path d="M60 72h32M76 56v32" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
</svg>
```

```css
.parallax { animation: drift linear both; animation-timeline: view(); }
@keyframes drift { from { translate: 0 0; } to { translate: 0 -50%; } }
.tagwall { display: flex; width: max-content; animation: wall var(--motion-duration-marquee) linear infinite; }
@keyframes wall { from { translate: 0 0; } to { translate: -50% 0; } }   /* list rendered twice */
.coin-load { animation: turn var(--motion-duration-coin) linear infinite; }
@keyframes turn { 0%,100% { scale: 1 1; } 50% { scale: .15 1; } }
.draw path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw var(--motion-duration-draw) linear forwards; }
@keyframes draw { to { stroke-dashoffset: 0; } }   /* give each path pathLength="1" */
@media (prefers-reduced-motion: reduce) {
  .parallax, .tagwall, .coin-load { animation: none; }
  .draw path { animation: none; stroke-dashoffset: 0; }
}
```

**Motion.** Hero shapes: scroll-bound `drift` (translateY 0 to -50%), linear, each shape a different speed via its own `animation-range`. Tag wall: `motion.duration.marquee` linear infinite. Loading coin: `motion.duration.coin` linear infinite. Outline draw-on: `motion.duration.draw` once on load, fills fade in after. Reduced motion: all static, final frame.

**Where.** Landing hero (3-5 large shapes, 200-250px, tilted, cropped by the edge); empty and error states (one `size.stickerLg` sticker); loading (coin turn); onboarding steps; tag lists (`size.sticker`); a dashboard tile or settings header (one `size.sticker`).

**Limits.** Hero scale once per page and never behind data, tables or forms; at most 5 large shapes; dense screens one `size.sticker` or none; never photographic, never a brand mark of the reference, always original shapes.

### Category color-flood bands

**What.** A full-width header band filled with one `color.band.*`, a `border.width.thin` ink rule under it, ink text, a `color.surface.raised` search field and pill tabs whose selected pill is `color.surface.raised`. Parent and child pages of one section share the color.

**Recipe.**

```css
.band { background: var(--color-band-teal); border-bottom: var(--border-width-thin) solid var(--color-border-default);
  padding: var(--space-32) var(--space-64); color: var(--color-text-primary); }
.band > * { max-width: var(--size-container); margin-inline: auto; }
.band h1 { font-size: var(--font-size-3xl); line-height: var(--font-line-height-h1); letter-spacing: var(--font-tracking-display); font-weight: 400; }
.band .search { height: var(--size-control); background: var(--color-surface-raised); }
@media (max-width: 767px) { .band { padding: var(--space-24) var(--space-16); } }
```


**Motion.** Static.

**Where.** Page header of a section, workspace, settings area, wizard step, data-table page, empty state (band above the sticker) and detail page; error pages use `color.band.red`. Mobile: a collapsed band with the title, then a horizontally scrolling pill strip.

**Limits.** One band color per screen; every text node inside the band (title, meta, count, tab label, link) is `color.text.onBand`, set on `.band` so children inherit, never secondary or link gray; never on cards, table headers or body; maximum 5 colors per product, assigned to sections, not to states; the red band is reserved for error screens and destructive areas.

### Outline-on-demand pills

**What.** Tabs, nav links, filters and choices are `radius.full` pills with a transparent 1px border at rest, an ink border on hover, `color.surface.raised` fill when selected, and an ink-filled pill for the current page in the top header.

**Recipe.**

```css
.pill { padding: var(--space-8) var(--space-12); border: var(--border-width-thin) solid transparent; border-radius: var(--radius-full);
  color: var(--color-text-primary); background: transparent;
  transition: border-color var(--motion-duration-fast) linear; }
.pill:hover { border-color: var(--color-border-default); }
.pill[aria-selected="true"], .pill[aria-pressed="true"] { background: var(--color-surface-raised); border-color: var(--color-border-default); }
.pill[aria-current="page"] { background: var(--color-action-inverse); color: var(--color-text-on-inverse); }
```

**Motion.** Instant to `motion.duration.fast` border change; no sliding indicator.

**Where.** Primary navigation, table filter bar, settings sub-nav, option choice, time-range selector, empty-state suggestions, status pill (selected look, non-interactive).

**Limits.** Navigation, filters and tags only, never a primary action; at most about 12 per row, then scroll the strip; never nested inside another pill.

## Color use

- Surfaces stack ground, then raised card with a 1px ink border. Never two raised layers inside each other; inside a card use `color.surface.subtle` wells or `color.border.hairline` rules.
- Pink (`color.action.primary`): one main action per viewport, price or count tags, selected-dot accents. Second actions use `lift--ink` or `lift--ghost`. Some components bring their own pink button (empty state, form, dialog, newsletter signup): before placing one, look at what pink is already in view, decide which action matters most right now, and give every other one `lift--ink` or `lift--ghost`, so exactly one pink action is visible. Open menu triggers, selected controls (checkbox, switch, pill, option) and toggled states use `color.surface.raised` or `color.action.inverse`, never pink. Links are `color.text.secondary` underlined, `color.text.primary` on hover.
- Band colors: header bands only (rule 6). Status colors (`color.status.*`) appear as text and 16px icons next to a word, never as fills larger than a badge.
- Dark: ground `color.surface.default`, pink replaces ink as the primary fill, ink buttons become paper-filled (`color.action.inverse`), hard shadows are 35% white, borders `color.border.default`.

## Typography

Everything is `font.family.body` at `font.weight.regular`; `font.tracking.display` from `font.size.lg` up; sentence case, never uppercase.

| Role | Size | Line height |
| --- | --- | --- |
| Hero display (landing only, once) | `font.size.5xl` / `font.size.4xl` | `font.lineHeight.display` |
| Page h1 / band title | `font.size.3xl` | `font.lineHeight.h1` |
| h2 | `font.size.2xl` | `font.lineHeight.heading` |
| h3 | `font.size.xl` | `font.lineHeight.title` |
| Lead, card title | `font.size.lg` | `font.lineHeight.ui` |
| Body, buttons, inputs | `font.size.md` | `font.lineHeight.ui` |
| Caption, table cell, small button | `font.size.sm` | `font.lineHeight.caption` |

One h1 per screen; at most one hero display per page. Paragraph line length 60-75 characters (`60ch`); the landing lead is centered, max 740px. Under `breakpoint.md` drop each display step one row (h1 `font.size.2xl`, hero `font.size.3xl`). Numbers in tables use `font-variant-numeric: tabular-nums`; totals may use `font.weight.bold`.

## Spacing and density

Base 4px; the scale is `space.4` to `space.96`. Button padding `space.12` `space.16`; card padding `space.16` (dense `space.12`), `space.24` on marketing cards; gap between cards `space.24`; section padding `space.64` (marketing banded `space.96`, mobile `space.48`); form field gap `space.16`, label to input `space.8`. Marketplace and product screens are dense (`space.16`-`space.24` between blocks), marketing is airy (`space.64`-`space.96`). Dense data screens: row height 44px, cell padding `space.8` `space.12`, `font.size.sm`, no sticker, band only for identity.

## Shape and depth

Radius: buttons, inputs, selects, toasts `radius.sm`; cards, dialogs, image frames `radius.md`; panels `radius.lg` (landing only); pills, chips, switch `radius.full`; checkboxes `radius.sm`. Depth is the border; elevation is only the hard offset: `shadow.sm` for icon and row-action buttons, `shadow.md` for lifted buttons, linked cards and toasts, `shadow.lg` for dialogs. Rest state has no shadow, except toast and dialog which always carry theirs. Border `border.width.thin`; `border.width.thick` only for the selected checkbox/switch outline, focus and the sticky table rule.

## Motion

| Interaction | Duration | Easing |
| --- | --- | --- |
| Lift out / press back, fill flip | `motion.duration.base` | `motion.easing.standard` |
| Link darken, pill border | `motion.duration.fast` | linear |
| Disclosure open (height and chevron 180deg), dialog and toast enter | `motion.duration.slow` / `base` | `motion.easing.out` |
| Tag wall, loading coin, draw-on | `motion.duration.marquee` / `coin` / `draw` | `motion.easing.linear` |
| Hero drift | scroll-bound | linear |

Toast enters by sliding 16px up from the bottom-left in `motion.duration.base` (no fade); dialog enters scale-free: the panel and its `shadow.lg` appear with a 200ms opacity-free translate of 8px up. Never animate on scroll except hero drift; no stagger. Reduced motion: remove translate, shadow growth, marquee, drift, coin and draw-on; keep color and border changes; toasts and dialogs appear instantly.

## Interaction

| Element | Hover | Focus-visible | Press | Open / selected |
| --- | --- | --- | --- | --- |
| Button (solid) | translate -4px -4px + `shadow.md`, `motion.duration.base` | 2px `color.focus.ring` outline, 2px offset, follows radius | translate 0, shadow none | n/a |
| Outline button | as solid, fill flips to `color.action.primary` | same | same | n/a |
| Icon / row action | -2px + `shadow.sm` | same | flush | n/a |
| Linked card | lift, as buttons: outer bordered box -4px -4px + `shadow.md` in `color.shadow.hard` (`.lift-card`); a fill change alone never counts | same outline on the card | flush | n/a |
| Open trigger (menu, popover, select, disclosure) | ink border and lift only, never pink | same outline | flush | `[aria-expanded="true"]`: `color.surface.raised` fill with ink border (solid trigger: `color.action.inverse`), wins over hover, never pink |
| Link | `color.text.secondary` to `color.text.primary`, underline stays, `motion.duration.fast` | outline 2px, offset 2px | none | n/a |
| Input, select | none (border already ink) | border ink, 2px `color.accent.halo` box-shadow ring flush outside it, plus 2px `color.focus.ring` outline at 2px offset | n/a | open menu: raised panel `radius.md`, `shadow.md` |
| Checkbox, switch | border thick | outline as buttons | n/a | selected: `color.action.primary` fill with ink check / knob |
| Pill, tab | ink border appears instantly | outline | n/a | selected: `color.surface.raised` fill |
| Disclosure | summary underline | outline | n/a | content opens over `motion.duration.slow`, chevron rotates 180deg |
| Table row | `color.surface.subtle` fill, no lift | row actions focusable, outline | n/a | selected: `color.surface.subtle` fill + 2px ink left rule |

## Layout adaptation

12-column grid; content max `size.container` (marketplace, tools) or `size.containerNarrow` (marketing, articles) with 64px side padding (`space.16` under `breakpoint.md`); gaps `space.24`. Product grids: 4 columns from `breakpoint.xl`, 3 from `breakpoint.lg`, 2 from `breakpoint.sm`, 1 below; an optional 312px filter column collapses into a pill strip then a dialog under `breakpoint.lg`. Dashboards: a stat row, then cards on the same grid; tables scroll inside their bordered box, never the page. Under `breakpoint.md`: the band collapses to title plus a scrolling pill strip; forms are one column; primary action stays in the flow (no fixed bars); touch targets at least `size.hit` (extend small buttons' hit area with an invisible 4px inset pseudo-element). Nothing scrolls sideways at 390px.

## Applying the concept

| Context | What it uses | How strongly |
| --- | --- | --- |
| Page header | color band with title, search, pills; breadcrumb above | Band always; no sticker |
| Hero or landing section | sticker hero (3-5 coins, drift), hero CTA with plate, display type | Full, once per page |
| Section break | 1px ink rule; on marketing, full-bleed blocks alternating paper, raised, one band color, ink | One band color per page; rule on product screens |
| Card grid | hard-lift whole cards, pink price tag, outlined cards | Lift on every card, one sticker at most |
| FAQ or help | disclosure rows with 1px rules, pill category tabs, a small sticker beside the heading | Light |
| Form | outlined inputs with pink halo focus, one pink submit with lift, ghost cancel, error borders | Lift on 2 buttons, no art |
| Settings | band for the area, pill sub-nav, outlined cards, save row with lift | Band and lift only |
| Dashboard | identity band for the workspace, outlined stat cards, pills for time range, 2px icon buttons | One band, one optional 32px sticker, no hero |
| Data table | bordered box, ink sticky rule, pill filters, 2px row-action lifts | Lift on actions only; no art |
| Empty state | band above, one 160px sticker, one sentence, one pink lift button | Full for its size |
| Error | `color.band.red` header, one sticker, one sentence, return button | Full for its size |
| Loading | turning coin or outline draw-on, text "Loading..." | Replaces spinner; one per region |
| Toast or confirmation | raised card, ink border, `shadow.md`, bottom-left | Always the hard shadow |

## Imagery and icons

Icons: 24px (`size.icon`) outline, 2px stroke, round joins, `currentColor`, no fills except small social glyphs of 14-25px. Illustration: flat vector sticker art as above, drawn from basic shapes (ellipse, rounded rect, star, arrow, coin, tag), outline 3-4px, fills only from `color.action.primary`, `color.band.*`, `color.surface.raised` and ink; make original characters and objects relevant to the product's domain, never copy a mascot or logo. Photos and product images: square or fixed ratio, untreated, inside a 1px ink frame with `radius.md`, no overlays, no shadows; use sticker-color placeholders instead of gray boxes. Never draw a generic image glyph (mountains and sun, a picture frame) as a placeholder or illustration. A placeholder for a photo to be supplied later is a square filled with a `color.band.*` holding one sticker object (ellipse, rounded rect, tag, coin, star, arrow, built from basic shapes with the heavy ink outline) that hints at that item's own kind, e.g. a bag for apparel, a tag for a price, a coin for money, a speech shape for a note; vary band color and object across a grid, and two items never share one drawing. A figure that stands for an idea (article figure, onboarding, feature explanation) is an original sticker scene that shows that figure's subject, composed of 2-4 shapes with its caption still in text; two figures never share one drawing. Mark all of it `aria-hidden` and keep alt text on real photos.

## Accessibility

Text contrast at least 4.5:1 (7:1 for body text on the default surface); ink text on every band color passes 4.5:1. Contrast is checked against the fill directly behind each text node, not the page: inside a band, a pink area or any colored fill, every text node (titles, meta lines, captions, links, tab labels, counts) uses `color.text.onBand` (or `color.text.onAction` on pink), never `color.text.secondary`, `color.text.disabled` or the default link color; set this once on the band container so children inherit it, and underline links there. Light-gray text is only for paper and raised surfaces. Before finishing, scan every route for text on colored fills. Visible focus: `color.focus.ring` 2px outline with 2px offset on every interactive element, never removed; inputs add the `color.accent.halo` ring. Touch targets at least `size.hit`. Status never by color alone: pair with an icon and a word. Information shown only on hover (tooltips, row actions) is also shown on focus. Reduced motion removes translate, shadow growth, loops and parallax; content stays readable. Under `forced-colors: active` keep borders and use system colors for fills.
