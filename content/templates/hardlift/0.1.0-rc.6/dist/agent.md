# Hardlift 0.1.0-rc.6

Design system `hardlift@0.1.0-rc.6`. Warm paper, pure ink outlines and one loud pink: every control is a 1px ink box that lifts on hover and leaves a hard offset shadow. Suits marketplaces, creator tools and playful dashboards.

This document is the complete design specification. Use the values and rules here instead of your own defaults. Where something is not specified, choose the option most consistent with the rules below and say so in your report. Token values are also provided as `tokens.css` and `tokens.json` next to this file — copy them, do not retype them. Each token's CSS variable is its path with dots replaced by dashes and camelCase split by dashes: `color.text.onAction` → `--color-text-on-action`.

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
- A busy or disabled control on a band or colored fill that turns gray; a toast that covers a control; a drifting shape over text or a control.
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

**Limits.** Drifting or decorative shapes never cover text or controls at any scroll position or width: place each so its whole drift path (start to end of its `animation-range`) stays in empty hero space or past the hero edge, keep them below text and controls in stacking order (lower `z-index`, `pointer-events: none`), and under `breakpoint.md` either shrink them to the hero edges or render them static below the content; check at 390px at the top, middle and end of the hero that every label is fully visible. Hero scale once per page and never behind data, tables or forms; at most 5 large shapes; dense screens one `size.sticker` or none; never photographic, never a brand mark of the reference, always original shapes.

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
- Pink (`color.action.primary`): one main action per viewport, price or count tags, selected-dot accents. Second actions use `lift--ink` or `lift--ghost`. Choose pink per state, not per component: an action that stays on screen in a page header, band or toolbar (refresh, export, share, settings) is always `lift--ink` or `lift--ghost`, whatever state the page is in; pink goes only to the one action the current state is about (form submit, empty-state or error recovery, dialog confirm, the page's main CTA). A component that brings its own button (empty state, error panel, toast) makes it pink only when no other pink button can be in the same viewport. Some components bring their own pink button (empty state, form, dialog, newsletter signup): before placing one, look at what pink is already in view, decide which action matters most right now, and give every other one `lift--ink` or `lift--ghost`, so exactly one pink action is visible. Open menu triggers, selected controls (checkbox, switch, pill, option) and toggled states use `color.surface.raised` or `color.action.inverse`, never pink. Links are `color.text.secondary` underlined, `color.text.primary` on hover.
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

Toast enters by sliding 16px up from its bottom corner in `motion.duration.base` (no fade); dialog enters scale-free: the panel and its `shadow.lg` appear with a 200ms opacity-free translate of 8px up. Never animate on scroll except hero drift; no stagger. Reduced motion: remove translate, shadow growth, marquee, drift, coin and draw-on; keep color and border changes; toasts and dialogs appear instantly.

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

12-column grid; content max `size.container` (marketplace, tools) or `size.containerNarrow` (marketing, articles) with 64px side padding (`space.16` under `breakpoint.md`); gaps `space.24`. Product grids: 4 columns from `breakpoint.xl`, 3 from `breakpoint.lg`, 2 from `breakpoint.sm`, 1 below; an optional 312px filter column collapses into a pill strip then a dialog under `breakpoint.lg`. Dashboards: a stat row, then cards on the same grid; tables stay inside their bordered box and never scroll the page; under `breakpoint.md` they reflow to stacked row blocks (Table, Phone width). Under `breakpoint.md`: the band collapses to title plus a scrolling pill strip; forms are one column; primary action stays in the flow (no fixed bars); touch targets at least `size.hit` (extend small buttons' hit area with an invisible 4px inset pseudo-element). Nothing scrolls the page sideways at 390px.

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
| Toast or confirmation | raised card, ink border, `shadow.md`, bottom corner outside the content, never over a control (inline beside the action where it would be); ghost or ink buttons | Always the hard shadow |

## Imagery and icons

Icons: 24px (`size.icon`) outline, 2px stroke, round joins, `currentColor`, no fills except small social glyphs of 14-25px. Illustration: flat vector sticker art as above, drawn from basic shapes (ellipse, rounded rect, star, arrow, coin, tag), outline 3-4px, fills only from `color.action.primary`, `color.band.*`, `color.surface.raised` and ink; make original characters and objects relevant to the product's domain, never copy a mascot or logo. Photos and product images: square or fixed ratio, untreated, inside a 1px ink frame with `radius.md`, no overlays, no shadows; use sticker-color placeholders instead of gray boxes. Never draw a generic image glyph (mountains and sun, a picture frame) as a placeholder or illustration. A placeholder for a photo to be supplied later is a square filled with a `color.band.*` holding one sticker object (ellipse, rounded rect, tag, coin, star, arrow, built from basic shapes with the heavy ink outline) that hints at that item's own kind, e.g. a bag for apparel, a tag for a price, a coin for money, a speech shape for a note; vary band color and object across a grid, and two items never share one drawing. A figure that stands for an idea (article figure, onboarding, feature explanation) is an original sticker scene that shows that figure's subject, composed of 2-4 shapes with its caption still in text; two figures never share one drawing. Mark all of it `aria-hidden` and keep alt text on real photos.

## Accessibility

Text contrast at least 4.5:1 (7:1 for body text on the default surface); ink text on every band color passes 4.5:1. Contrast is checked against the fill directly behind each text node, not the page: inside a band, a pink area or any colored fill, every text node (titles, meta lines, captions, links, tab labels, counts) uses `color.text.onBand` (or `color.text.onAction` on pink), never `color.text.secondary`, `color.text.disabled` or the default link color; set this once on the band container so children inherit it, and underline links there. Light-gray text is only for paper and raised surfaces. Before finishing, scan every route for text on colored fills. Visible focus: `color.focus.ring` 2px outline with 2px offset on every interactive element, never removed; inputs add the `color.accent.halo` ring. Touch targets at least `size.hit`. Status never by color alone: pair with an icon and a word. Information shown only on hover (tooltips, row actions) is also shown on focus. Reduced motion removes translate, shadow growth, loops and parallax; content stays readable. Under `forced-colors: active` keep borders and use system colors for fills.

## Semantic color tokens — light

| Token | Value |
| --- | --- |
| `color.neutral.0` | `#ffffff` |
| `color.neutral.50` | `#f4f4f0` |
| `color.neutral.100` | `#ebebe5` |
| `color.neutral.200` | `#dddddd` |
| `color.neutral.400` | `#b3b3af` |
| `color.neutral.500` | `#8a8a86` |
| `color.neutral.600` | `#666666` |
| `color.neutral.700` | `#4d4d4b` |
| `color.neutral.800` | `#242423` |
| `color.neutral.900` | `#111111` |
| `color.neutral.950` | `#000000` |
| `color.pink.400` | `#ff7ccf` |
| `color.pink.500` | `#ff62c3` |
| `color.flood.teal` | `#23a094` |
| `color.flood.yellow` | `#ffc900` |
| `color.flood.periwinkle` | `#90a8ed` |
| `color.flood.lime` | `#f1f333` |
| `color.flood.red` | `#dc341e` |
| `color.green.400` | `#4fd186` |
| `color.green.600` | `#167a3e` |
| `color.amber.400` | `#f2b84b` |
| `color.amber.600` | `#8a5300` |
| `color.red.400` | `#ff6b57` |
| `color.red.600` | `#c22a16` |
| `color.blue.400` | `#7fb0ff` |
| `color.blue.600` | `#1d5fbf` |
| `color.alpha.scrim` | `#00000080` |
| `color.alpha.shadowLight` | `#ffffff59` |
| `color.surface.default` | `#f4f4f0` |
| `color.surface.subtle` | `#ebebe5` |
| `color.surface.raised` | `#ffffff` |
| `color.text.primary` | `#000000` |
| `color.text.secondary` | `#666666` |
| `color.text.disabled` | `#8a8a86` |
| `color.text.onAction` | `#000000` |
| `color.text.onBand` | `#000000` |
| `color.text.onInverse` | `#ffffff` |
| `color.border.default` | `#000000` |
| `color.border.strong` | `#000000` |
| `color.border.hairline` | `#dddddd` |
| `color.action.primary` | `#ff7ccf` |
| `color.action.primaryHover` | `#ff62c3` |
| `color.action.inverse` | `#000000` |
| `color.accent.halo` | `#ff7ccf` |
| `color.focus.ring` | `#000000` |
| `color.shadow.hard` | `#000000` |
| `color.scrim` | `#00000080` |
| `color.band.teal` | `#23a094` |
| `color.band.yellow` | `#ffc900` |
| `color.band.periwinkle` | `#90a8ed` |
| `color.band.lime` | `#f1f333` |
| `color.band.red` | `#dc341e` |
| `color.status.success` | `#167a3e` |
| `color.status.warning` | `#8a5300` |
| `color.status.danger` | `#c22a16` |
| `color.status.info` | `#1d5fbf` |

## Semantic color tokens — dark

| Token | Value |
| --- | --- |
| `color.neutral.0` | `#ffffff` |
| `color.neutral.50` | `#f4f4f0` |
| `color.neutral.100` | `#ebebe5` |
| `color.neutral.200` | `#dddddd` |
| `color.neutral.400` | `#b3b3af` |
| `color.neutral.500` | `#8a8a86` |
| `color.neutral.600` | `#666666` |
| `color.neutral.700` | `#4d4d4b` |
| `color.neutral.800` | `#242423` |
| `color.neutral.900` | `#111111` |
| `color.neutral.950` | `#000000` |
| `color.pink.400` | `#ff7ccf` |
| `color.pink.500` | `#ff62c3` |
| `color.flood.teal` | `#23a094` |
| `color.flood.yellow` | `#ffc900` |
| `color.flood.periwinkle` | `#90a8ed` |
| `color.flood.lime` | `#f1f333` |
| `color.flood.red` | `#dc341e` |
| `color.green.400` | `#4fd186` |
| `color.green.600` | `#167a3e` |
| `color.amber.400` | `#f2b84b` |
| `color.amber.600` | `#8a5300` |
| `color.red.400` | `#ff6b57` |
| `color.red.600` | `#c22a16` |
| `color.blue.400` | `#7fb0ff` |
| `color.blue.600` | `#1d5fbf` |
| `color.alpha.scrim` | `#00000080` |
| `color.alpha.shadowLight` | `#ffffff59` |
| `color.surface.default` | `#000000` |
| `color.surface.subtle` | `#111111` |
| `color.surface.raised` | `#242423` |
| `color.text.primary` | `#f4f4f0` |
| `color.text.secondary` | `#b3b3af` |
| `color.text.disabled` | `#8a8a86` |
| `color.text.onAction` | `#000000` |
| `color.text.onBand` | `#000000` |
| `color.text.onInverse` | `#000000` |
| `color.border.default` | `#dddddd` |
| `color.border.strong` | `#ffffff` |
| `color.border.hairline` | `#4d4d4b` |
| `color.action.primary` | `#ff7ccf` |
| `color.action.primaryHover` | `#ff62c3` |
| `color.action.inverse` | `#f4f4f0` |
| `color.accent.halo` | `#ff7ccf` |
| `color.focus.ring` | `#ff7ccf` |
| `color.shadow.hard` | `#ffffff59` |
| `color.scrim` | `#00000080` |
| `color.band.teal` | `#23a094` |
| `color.band.yellow` | `#ffc900` |
| `color.band.periwinkle` | `#90a8ed` |
| `color.band.lime` | `#f1f333` |
| `color.band.red` | `#dc341e` |
| `color.status.success` | `#4fd186` |
| `color.status.warning` | `#f2b84b` |
| `color.status.danger` | `#ff6b57` |
| `color.status.info` | `#7fb0ff` |

## Primitive tokens

| Token | Value |
| --- | --- |
| `font.family.body` | `"DM Sans", system-ui, -apple-system, "Segoe UI", Pretendard, "Noto Sans KR", sans-serif` |
| `font.family.mono` | `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, D2Coding, monospace` |
| `font.size.sm` | `14px` |
| `font.size.md` | `16px` |
| `font.size.lg` | `20px` |
| `font.size.xl` | `24px` |
| `font.size.2xl` | `30px` |
| `font.size.3xl` | `48px` |
| `font.size.4xl` | `72px` |
| `font.size.5xl` | `96px` |
| `font.weight.regular` | `400` |
| `font.weight.bold` | `700` |
| `font.lineHeight.display` | `1` |
| `font.lineHeight.h1` | `1.25` |
| `font.lineHeight.heading` | `1.2` |
| `font.lineHeight.title` | `1.33` |
| `font.lineHeight.ui` | `1.375` |
| `font.lineHeight.caption` | `1.3` |
| `font.tracking.display` | `-0.4px` |
| `font.tracking.body` | `0px` |

| Token | Value |
| --- | --- |
| `space.4` | `4px` |
| `space.8` | `8px` |
| `space.12` | `12px` |
| `space.16` | `16px` |
| `space.24` | `24px` |
| `space.32` | `32px` |
| `space.48` | `48px` |
| `space.64` | `64px` |
| `space.96` | `96px` |

| Token | Value |
| --- | --- |
| `size.controlSm` | `36px` |
| `size.control` | `48px` |
| `size.hit` | `44px` |
| `size.icon` | `24px` |
| `size.sticker` | `32px` |
| `size.stickerLg` | `160px` |
| `size.container` | `1312px` |
| `size.containerNarrow` | `1152px` |

| Token | Value |
| --- | --- |
| `radius.sm` | `4px` |
| `radius.md` | `8px` |
| `radius.lg` | `16px` |
| `radius.full` | `9999px` |

| Token | Value |
| --- | --- |
| `border.width.thin` | `1px` |
| `border.width.thick` | `2px` |

| Token | Value |
| --- | --- |
| `shadow.sm` | `2px 2px 0 0` |
| `shadow.md` | `4px 4px 0 0` |
| `shadow.lg` | `8px 8px 0 0` |

| Token | Value |
| --- | --- |
| `motion.duration.fast` | `100ms` |
| `motion.duration.base` | `150ms` |
| `motion.duration.slow` | `200ms` |
| `motion.duration.coin` | `1200ms` |
| `motion.duration.marquee` | `60000ms` |
| `motion.duration.draw` | `8000ms` |
| `motion.easing.standard` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `motion.easing.out` | `cubic-bezier(0, 0, 0.2, 1)` |
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

**Purpose.** Starts an action. Use a link for navigation to another page; use a pill for filters and tabs, never a button.

**Anatomy.** Optional 24px icon (`size.icon`) + label, in a 1px `color.border.default` box. Gap `space.8`.

**Sizes.** Default height `size.control` (48px): padding `space.12` `space.16`, `font.size.md` on `font.lineHeight.ui`. Small `size.controlSm` (36px): padding `space.8` `space.12`, `font.size.sm`, hit area extended to `size.hit`. Icon-only: square at the same height.

**Variants.** Pink (`color.action.primary`, label `color.text.onAction`): the one main action per viewport. Ink (`color.action.inverse`, label `color.text.onInverse`): second action. Ghost (transparent, label `color.text.primary`): cancel, tertiary; hover fills pink, except on a menu, popover, select or disclosure trigger (`aria-haspopup` / `aria-expanded`), whose hover shows the ink border and lift only and whose open state is `color.surface.raised` with the ink border. Hero: pink in a `lift-hero` plate wrapper, landing only. All `radius.sm`.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | fill by variant, 1px `color.border.default`, no shadow |
| hover | translate -4px -4px (hero -8px, icon -2px), `shadow.md` (icon `shadow.sm`) in `color.shadow.hard`, `motion.duration.base` `motion.easing.standard`; ghost also fills `color.action.primary` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| active | translate 0, shadow none |
| disabled | on paper or raised surfaces only: fill `color.surface.subtle`, label `color.text.disabled`, border `color.border.hairline`, no lift, `cursor: not-allowed`. On a band, pink or any colored fill: keep the variant's normal fill, label and `color.border.default`, drop the lift, set `aria-disabled="true"` |
| loading | busy is not disabled: keeps the variant's fill, `color.border.default` and full-contrast label, shows the 16px turning coin (`motion.duration.coin`) beside a changed label ("Refreshing..."), `aria-busy="true"`, no lift; never the gray disabled recipe |

**Token mapping.** Fill/label/border per variant above; radius `radius.sm`; shadow `shadow.md`/`shadow.sm` + `color.shadow.hard`; motion `motion.duration.base`, `motion.easing.standard`. Reduced motion: color flip to `color.action.primaryHover` only.

**Keyboard and screen readers.** Native `<button>`; Enter/Space activate; icon-only needs `aria-label`; loading sets `aria-busy` and keeps the label text in the accessible name.

**Do / Don't.** Every state of a control meets 4.5:1 against the fill directly behind it. In a stacked table row or any narrow slot a button keeps its intrinsic width (`flex: none`, `width: max-content`, `white-space: nowrap`), standard padding and at least `size.hit` height; it never inherits a column width. Do make persistent header, band and toolbar actions (refresh, export, share, settings) `lift--ink` or `lift--ghost` in every state; pink is for the one action the current state is about. Do keep 8px clearance so the lift shadow is not clipped. Don't put two pink buttons in one viewport: a component that ships its own pink button (empty state, form, dialog, newsletter) gives it `lift--ink` or `lift--ghost` when a screen-level pink action is already visible, and the trigger of an open menu, popover or disclosure stays raised or ink, never pink; also don't put two pink buttons in one viewport or lift a button inside a sticky bar.

### Text field

**Purpose.** Single- and multi-line text entry (also search, email, number). Use select for fixed options.

**Anatomy.** Label above (`font.size.md`, `space.8` gap), box, optional hint or error line below (`space.8`, `font.size.sm`).

**Sizes.** Height `size.control` (48px), padding `space.12` `space.16`, `radius.sm`, `font.size.md`; textarea min 96px high. Search adds a 48px square icon button at the end, joined by a shared border.

**Variants.** Default; search (placeholder "Search...", 24px icon button); textarea.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.surface.raised` fill, 1px `color.border.default`, placeholder `color.text.secondary` |
| hover | no change (no lift on inputs) |
| focus-visible | border stays ink, 2px `color.accent.halo` box-shadow ring flush outside the border, plus 2px `color.focus.ring` outline at 2px offset; `motion.duration.fast` |
| disabled | `color.surface.subtle` fill, `color.text.disabled`, border `color.border.hairline` |
| error | border `color.status.danger`; below: 16px alert icon + message in `color.text.primary`, icon `color.status.danger`; `aria-invalid="true"`, `aria-describedby` |

**Token mapping.** As above; helper text `color.text.secondary`; success after validation: 16px ink check on a `color.action.primary` circle beside the field.

**Keyboard and screen readers.** Native `<input>` with a visible `<label for>`; errors announced by `aria-describedby` and `role="alert"` on submit; a submit with errors focuses the first invalid field and shows one summary line at the form top.

**Do / Don't.** Do write errors as what to do ("Enter an email like name@site.com"). Don't signal an error with color alone or lift the field.

### Select

**Purpose.** Choose one value from 5 or more options; use pills or radios for fewer.

**Anatomy.** Label, box with value and a 24px chevron at the end, option panel.

**Sizes.** Same as text field: `size.control`, `radius.sm`, padding `space.12` `space.16`.

**Variants.** Native select styled as the field (`appearance: none` plus chevron); custom listbox only when options need rich content.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.surface.raised`, 1px `color.border.default`, chevron `color.text.primary` |
| focus-visible | same ring recipe as text field |
| open | panel `color.surface.raised`, 1px border, `radius.md`, `shadow.md` in `color.shadow.hard`, `space.4` below the box; highlighted option `color.surface.subtle`, selected option `color.surface.subtle` fill with a 16px ink check (open trigger stays raised, never pink) |
| disabled | as text field |
| error | border `color.status.danger` + message line as text field |

**Token mapping.** Panel `shadow.md`, options padding `space.8` `space.12`, `font.size.md`.

**Keyboard and screen readers.** Native `<select>` preferred; custom: `role="listbox"`, Arrow keys move, Enter selects, Escape closes and returns focus, type-ahead.

**Do / Don't.** Do use the native element on touch. Don't lift the box or add a blur to the panel.

### Checkbox

**Purpose.** Independent yes/no choices and multi-select; use a switch for instant settings.

**Anatomy.** 24px box (`size.icon`), label `font.size.md` at `space.12` gap; the whole row is the hit area (`size.hit` high).

**Sizes.** Box 24px, `radius.sm`, 1px `color.border.default`, `color.surface.raised` fill.

**Variants.** Single, group (fieldset with legend), indeterminate (ink dash).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | empty box |
| hover | border becomes `border.width.thick` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected | fill `color.action.inverse`, 2px check in `color.text.onInverse` (never pink: selection is not an action) |
| disabled | `color.surface.subtle` fill, `color.border.hairline`, label `color.text.disabled` |

**Token mapping.** `radius.sm`, `border.width.thin`/`thick`, `motion.duration.fast` (instant fill).

**Keyboard and screen readers.** Native `<input type="checkbox">`; Space toggles; groups use `<fieldset><legend>`; indeterminate set by property.

**Do / Don't.** Do make the label clickable. Don't animate the check or use a round box.

### Switch

**Purpose.** An on/off setting that applies immediately; use a checkbox when a save step follows.

**Anatomy.** Track 48x28px with a 20px knob, label at `space.12`.

**Sizes.** Track `radius.full`, 1px `color.border.default`; knob a circle with 1px ink border, inset `space.4`.

**Variants.** Single only.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default (off) | track `color.surface.raised`, knob `color.surface.subtle` at the start |
| hover | track border `border.width.thick` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected (on) | track `color.action.inverse`, knob `color.surface.raised` slid to the end, `motion.duration.base` `motion.easing.standard` |
| disabled | `color.surface.subtle`, `color.border.hairline`, label `color.text.disabled` |

**Token mapping.** As states; reduced motion: knob jumps.

**Keyboard and screen readers.** `<button role="switch" aria-checked>` or a checkbox with `role="switch"`; Space toggles; label names the setting, not the state.

**Do / Don't.** Do show the state in text nearby ("On"). Don't use the switch for destructive actions.

### Tabs

**Purpose.** Switch between peer views in the same page; use navigation for pages. The same pill is used for filters and single-choice options.

**Anatomy.** A row of pills (`role="tablist"`), then the panel.

**Sizes.** Pill padding `space.8` `space.12`, `font.size.md`, `radius.full`, gap `space.4`; about 12 per row, then the strip scrolls.

**Variants.** Tabs (one selected), filter chips (`aria-pressed`, multi), sort tabs. On a band the selected pill is `color.surface.raised`.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | transparent 1px border, `color.text.primary` |
| hover | 1px `color.border.default` border appears, `motion.duration.fast` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected | `color.surface.raised` fill with ink border |

**Token mapping.** `radius.full`, `border.width.thin`, no shadow, no sliding indicator.

**Keyboard and screen readers.** Arrow keys move, Home/End jump, Enter/Space select (automatic activation for tabs); `aria-selected`, `aria-controls`, panel `role="tabpanel"`.

**Do / Don't.** Do keep labels 1-2 words. Don't use a pill as a primary action.

### Navigation

**Purpose.** Moves between pages and sections: top header, section pill row, sub-nav, breadcrumb.

**Anatomy.** Header 80px high on `color.surface.raised` with a 1px bottom border: wordmark slot, pill links, a 1px vertical rule, secondary link, optional full-height `color.action.inverse` block. Section pages add the color band with the pill row. Breadcrumb: text links separated by 16px chevrons, current item `color.text.primary`.

**Sizes.** Links are pills (`space.8` `space.12`, `font.size.md`); header padding `space.16` `space.64` (mobile `space.16`).

**Variants.** Top header; band nav (pills on a `color.band.*`); settings sub-nav (vertical list of pills); mobile: header shows the wordmark and a menu button that opens a dialog list.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | transparent pill border |
| hover | ink border, `motion.duration.fast` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected | current page: `color.action.inverse` fill, `color.text.onInverse`, `aria-current="page"` |

**Token mapping.** Pills as Tabs; the full-height header block has no shadow and no lift.

**Keyboard and screen readers.** `<nav aria-label>`; links are anchors; mobile menu is a dialog with focus trap and Escape; breadcrumb `<nav aria-label="Breadcrumb">` with `<ol>`.

**Do / Don't.** Do mark the current page with `aria-current`. Don't use a sliding underline or a sticky header taller than 80px.

### Card

**Purpose.** Groups one item or topic (product, project, stat, plan). Not for decoration or to wrap page sections.

**Anatomy.** `color.surface.raised` box, 1px `color.border.default`, `radius.md`; media on top (a band-color square holding a sticker object when no photo is supplied; see Imagery and icons; 1:1 or fixed ratio, square corners inside the border), title (`font.size.lg`), meta (`font.size.sm`, `color.text.secondary`), optional price tag (`color.action.primary` pill, ink text) and footer row.

**Sizes.** Padding `space.16` (dense `space.12`, marketing `space.24`); gap inside `space.8`-`space.12`; grid gap `space.24`.

**Variants.** Static (stat, form container); linked (whole card is one anchor and lifts); selectable (outline thickens when selected).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | no shadow |
| hover (linked) | the card's outer bordered box (the anchor itself, or the element that wraps it and receives the pointer) translates -4px -4px and gets `shadow.md` in `color.shadow.hard`, `motion.duration.base` `motion.easing.standard`; never an inner element; static cards do nothing |
| focus-visible | 2px `color.focus.ring` outline on the card, 2px offset |
| selected | `border.width.thick` ink border |

Use the `.lift-card` class from Hard-lift buttons; a fill change never replaces the lift. Put the lift on the same element that carries the border and radius, with `transition: translate, box-shadow` and `@media (hover: hover)`, and keep 8px of clearance so no ancestor's `overflow` clips the shadow (grid gap `space.24` and no `overflow: hidden` on the grid or its wrappers). Verify: hover one card in each theme and confirm its position and shadow changed; a color change alone fails.

**Token mapping.** As anatomy; no band color or pink on the card body.

**Keyboard and screen readers.** One stretched link with the title as its accessible name; nested buttons stay separate focus stops.

**Do / Don't.** Do keep all cards of a grid the same height only when they hold the same kind of data. Don't nest cards or fill them with band colors.

### Table

**Purpose.** Compare many records by columns. Derived from the character; not shown in the reference.

**Anatomy.** One bordered box (1px `color.border.default`, `radius.md`, overflow clipped): header row on `color.surface.subtle`, body rows on `color.surface.raised` separated by 1px `color.border.hairline`, no zebra, no vertical rules. A toolbar above holds a search field, pill filters and the one pink action.

**Sizes.** Row height 44px; cell padding `space.8` `space.12`; header `font.size.sm`, sentence case, regular weight, `color.text.secondary`; cells `font.size.sm`; numbers right-aligned with tabular figures; totals `font.weight.bold`.

**Variants.** Sortable (header is a button with a 16px arrow), selectable (leading checkbox column), sticky header (2px `color.border.default` bottom rule). Dense is the default. Row actions are 2px-lift icon buttons in the last column.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | as anatomy |
| hover | row fill `color.surface.subtle`; the row never lifts |
| selected | `color.surface.subtle` fill + 2px ink rule on the left edge |
| loading | rows replaced by the turning coin centered in the box, `aria-busy` |
| empty | in-box empty state: one `size.sticker` sticker, one sentence, one button |
| error | in-box message with `color.status.danger` icon and a retry button |
| focus-visible | 2px `color.focus.ring` outline on the focused control, offset -2px |

**Token mapping.** As above; pagination is pills below the box; below `breakpoint.md` see Phone width.

**Phone width.** Part of building the table, not an afterthought: below `breakpoint.md` a table never silently hides columns. If any row has an action or the table has more than three columns, reflow each row into a stacked block inside the same bordered box: the primary cell is the block's title (`font.weight.bold`), every other cell becomes a label/value line (label `color.text.secondary`, value `color.text.primary`), and the row action sits visible at the end of the block on its own line or in a right-aligned slot, at least `size.hit` tall, with `flex: none`, `width: max-content`, `white-space: nowrap` and standard button padding so it never inherits the fixed or shrinking desktop column width; check at 390px in each theme that every button label sits fully inside its border. Blocks keep `space.12` padding and the hairline separator. Sideways scroll inside the box is allowed only for a read-only table of three or four short columns; size the columns so the last visible one is cut part-way at the right edge (the cue that more exists), and keep `space.12` of padding between cell text and the border.

**Keyboard and screen readers.** Native `<table>` with `<th scope>`; sortable headers expose `aria-sort`; row selection via checkbox; caption or `aria-label` names the table.

**Do / Don't.** Do keep one pink action in the toolbar, and only when no other pink action is in view. Don't lift rows or cells, color header cells, or add zebra stripes.

### Badge

**Purpose.** Labels a status, category or count. Not clickable (if clickable, it is a pill).

**Anatomy.** Pill with 1px `color.border.default`, optional 12px dot or 16px icon, label `font.size.sm`.

**Sizes.** Height 24px, padding `space.4` `space.8`, `radius.full`.

**Variants.** Neutral (`color.surface.raised`), accent (`color.action.primary` fill, ink text: price or "new"), status (neutral fill with a 16px icon in `color.status.success`, `color.status.warning`, `color.status.danger` or `color.status.info` plus the word). Never filled by status color.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | as variant; no hover, no lift |

**Token mapping.** `radius.full`, `border.width.thin`, text `color.text.primary`.

**Keyboard and screen readers.** Plain text, not focusable; status meaning is in the word and icon, not hue.

**Do / Don't.** Do pair an icon and a word. Don't use more than one accent badge per card.

### Dialog

**Purpose.** A blocking task or confirmation. Derived from the character; not shown in the reference. Prefer inline editing and toasts for non-blocking work.

**Anatomy.** Scrim (`color.scrim`) + panel: `color.surface.raised`, 1px `color.border.default`, `radius.md`, `shadow.lg` in `color.shadow.hard`. Title `font.size.xl`, body, footer row (ghost cancel, one action: pink only when no other pink action is visible behind the scrim; otherwise `lift--ink`) right-aligned; close icon button top right.

**Sizes.** Width 480px (form 640px), max `100vw - 32px`; padding `space.24`; gap `space.16`. Under `breakpoint.md` full width with `space.16` margins.

**Variants.** Confirm, form, destructive (confirm button is ink with a `color.status.danger` icon beside the title; never a red fill).

**States.**

| State | What changes (tokens) |
| --- | --- |
| open | panel translates up 8px into place over `motion.duration.slow` `motion.easing.out`, scrim appears instantly; no scale, no fade |
| focus-visible | 2px `color.focus.ring` outline, 2px offset, on every control |
| closing | instant |

**Token mapping.** As anatomy; reduced motion: appears in place.

**Keyboard and screen readers.** `role="dialog"` + `aria-modal`, labelled by the title; focus moves into the dialog and is trapped; Escape closes; focus returns to the trigger; scrim click closes unless a form is dirty.

**Do / Don't.** Do keep the title a verb phrase. Don't stack dialogs or blur the scrim.

### Toast

**Purpose.** Confirms a finished action or a non-blocking failure. Derived from the character; not shown in the reference.

**Anatomy.** `color.surface.raised` card, 1px `color.border.default`, `radius.sm`, `shadow.md` in `color.shadow.hard` always on; 24px icon (check on a pink circle for success, ink glyph otherwise), message `font.size.md`, optional text action, close button. The action and close button are `lift--ghost` or `lift--ink`, never pink (pink is reserved for the one main action of the screen).

**Sizes.** Min height `size.control`, padding `space.12` `space.16`, max width 420px; fixed to a viewport bottom corner (bottom-right by default) `space.24` from the edges, outside the content column when the viewport is wider than the column; under `breakpoint.md` `space.16` from the edges, full width. A toast never covers content or controls: while any toast is shown, the page gets bottom padding equal to the toast stack height plus `space.16` so the last content can scroll clear of it, and a confirmation for a form or row action (Saved, Copied) is shown inline beside the control that triggered it (check icon + message, `role="status"`) instead of as a toast whenever the toast would land on that control. Stack `space.8`, max 3, newest at the bottom.

**Variants.** Neutral, success, warning, danger, info differ by icon and wording only; the card never changes color.

**States.**

| State | What changes (tokens) |
| --- | --- |
| enter | slides up 16px in `motion.duration.base` `motion.easing.out`, no fade |
| hover | pauses auto-dismiss |
| focus-visible | 2px `color.focus.ring` outline on the action or close button |
| exit | instant |

**Token mapping.** As anatomy; reduced motion: appears in place.

**Keyboard and screen readers.** `role="status"` (`role="alert"` for danger); auto-dismiss after 5s unless it has an action; Escape dismisses.

**Do / Don't.** Do state what happened ("Saved"), and after it appears check in each theme and at 390px that the control which triggered it is still fully visible. Don't place it over a form action row, sticky bar or primary button. Don't color the toast by status or stack more than 3.

## New project

1. Inspect the framework, styling approach and component structure. Propose an installation plan and wait for approval.
2. Install the tokens: copy `dist/tokens.css` into the project's global styles (or map `dist/tokens.json` into the theme system the project already uses). Do not retype values.
3. Load the fonts listed in the manifest with their fallbacks, including the CJK fallback.
4. Build the signature elements first, as reusable pieces (components, CSS classes, keyframes) that follow their recipes, and the interaction states from Interaction.
5. Build the base components in the order of the component list, each with every specified state. Place the signature elements as Applying the concept says.
6. Create `design-system/` in the repository with `VERSION` (the system id and update date the spec states, e.g. `hardlift, updated 2026-01-31`), the tokens, and a short `components.md` describing the conventions you established — including where each signature element is used and how to reuse it.
7. Add one line to `AGENTS.md` and `CLAUDE.md` (create them if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit: styling approach, global styles, shared components, routes, tests. List what the change would touch and what must be preserved.
2. Propose a migration plan and wait for approval.
3. Map the tokens onto the project's existing variables or theme. Keep existing variable names working (alias them) so nothing breaks mid-migration.
4. Build the signature elements as reusable pieces, then restyle one representative screen as a sample — with the signature elements placed as Applying the concept says — and wait for review.
5. Continue screen by screen, one commit per screen. Adapt to the existing information structure; never force a layout from a reference image.
6. Preserve: routes, business logic, API contracts, form fields and validation, test ids, labels used by tests, accessibility attributes.
7. Finish with the `design-system/` folder and the `AGENTS.md` / `CLAUDE.md` pointer described under New project.

## Ongoing development

- Before building UI, read `design-system/`. Use semantic tokens and existing components; do not hard-code colors, sizes, radii or shadows.
- Every new screen gets the signature elements its context calls for in Applying the concept — a new screen without them is unfinished.
- If a need is not covered by the system, compose from existing tokens, then note it in `design-system/components.md`.
- If a request conflicts with the system, present the options instead of deciding silently.

## Verification

- The project builds and its tests pass.
- Every screen was checked at 1440px and 390px wide, in light and dark if both are defined.
- At 390px, in each theme: every table row action is on screen without scrolling the table, every column's data is visible or clearly cut off at the edge, and no cell text touches the border. If any check fails, the build is not done.
- Render every captured state (default, empty, error, loading, open) at desktop width in each theme and count pink-filled buttons: at most one, not counting small price or status tags. Persistent header, band and toolbar actions are never pink. If any state shows two, the build is not done.
- At 390px and 1440px, in each theme, after a toast or inline confirmation appears and while a control is busy: the triggering control is fully visible, busy controls keep their fill and a readable label, table row buttons keep their intrinsic width, and scrolled to the top, middle and end of a hero no drifting shape covers a label or control.
- Focus is visible on every interactive element; text meets the contrast rules in this document.
- The signature elements appear where Applying the concept places them and move as specified; with reduced motion they are still and still readable.
- No raw color, size or radius values were introduced outside the token files.
- Report: files changed, anything in this document you could not apply, decisions you made yourself.

## Rollback

- Each screen is its own commit, so any step can be reverted alone.
- Token installation is a separate commit; reverting it restores the previous look once the screen commits are reverted.
