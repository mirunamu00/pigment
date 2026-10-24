# Margin Notes 0.1.0-rc.2

Design system `margin-notes@0.1.0-rc.2`. Warm paper, near-black ink for every action, hairlines and a tightly tracked grotesk; the only color is a watercolor wash, tape and pencil notes kept to the margins. Suits products whose content should carry the color.

This document is the complete design specification. Use the values and rules here instead of your own defaults. Where something is not specified, choose the option most consistent with the rules below and say so in your report. Token values are also provided as `tokens.css` and `tokens.json` next to this file — copy them, do not retype them. Each token's CSS variable is its path with dots replaced by dashes and camelCase split by dashes: `color.text.onAction` → `--color-text-on-action`.

## Character

An artist's studio as a calm product UI: warm paper, near-black ink for text and every action, hairlines, a
tightly tracked grotesk. The only chroma is an ink-blue watercolor wash bleeding in from the page edge, with tape,
pencil notes and one serif italic word as marks in the margins.

Use `color.*`, `elevation.*`, `opacity.*` (they switch with the theme) and the primitives, never `palette.*`.
`space.14` = 14px. `elevation.x` = `shadow.x` (dark: `shadow.xNight`).

## The ten rules that define this look

1. **Warm paper, never gray.** Page `color.surface.default`, cards and controls `color.surface.raised`, wells `color.surface.subtle`. Why: warmth (R > G > B) separates paper from a default gray UI.
2. **Ink is the only action color.** Primary buttons, pressed chips, selection marks, tab underlines and focus use `color.action.primary` / `color.focus.ring` (paper in dark). One primary per region; `color.action.danger` is the only other filled button. Why: the ink button is the identity.
3. **One hue family, rationed.** Ink-blue appears only as the info status and in `color.decor.*`; never on links, buttons, selection or chart highlights. Why: rationing keeps the wash special.
4. **Hairlines before shadows.** Resting cards use `elevation.rest`. `elevation.pinned` on at most 2 objects per screen, plus open overlays. Why: lifted paper reads only when little else is lifted.
5. **Tight grotesk, three weights.** Sans at 400, 500, 600 only; tracking tightens with size. Body 15, UI 14, meta 13. Why: tracking, not weight, makes the voice.
6. **One serif italic word, inside a sans title.** Max 1 per screen, only in a title of 2 or more words on the per-app list (Studio details). One-word titles ("Overview", "Billing") stay sans. Why: one hand-set word is an accent; a serif title is a font switch.
7. **Mono for machine facts.** Mono with `tabular-nums`: IDs, SKUs, versions, codes, step numbers, eyebrows, and every number, amount, date or count in a table cell, spec row, key/value row or total line. Sans: headings, prose, stat-card values, prices on product cards and pages. Why: machine voice versus human voice, the same everywhere.
8. **Soft, nested corners; controls hold their height.** Radii by part (Spacing, shape and depth); inner = outer minus padding. Inputs, selects and search fields set `height` explicitly (`size.control`, toolbars `size.controlSm`) and never shrink in flex rows. Why: concentric corners, constant control rhythm.
9. **Selection is paper on a tray; every control answers.** Segmented control: raised segment on a `color.surface.subtle` track; tabs: 2px ink underline; chips invert to ink. Every interactive element ships hover, `:focus-visible`, disabled and (fields) error styles. Why: selection is material, not tint; a missing state breaks it.
10. **Studio marks live in the margins.** Per screen at most 1 bloom, 2 pencil notes, 2 taped items, 1 serif word; only at pauses (page header, empty state, pinned item); `aria-hidden`; never in data, forms, overlays or photos; never animated. Why: details mark moments, not data.

## Never

- Cool or pure grays; gradients on surfaces, buttons or text.
- A bloom with a straight edge, or a bloom behind anything but an h1 or display heading.
- A whole heading in serif; serif in body, buttons, labels, nav or numbers. Weight 700.
- Shadows on buttons, inputs, chips or rows.
- Scale, bounce, spring or parallax motion; skeleton shimmer.
- Emoji, clip-art, illustrated placeholders (mountains, suns); filled or colored icons.
- Horizontal page scroll at 390px; a nav that runs off-screen.
- An interactive element without a visible hover and focus-visible style.
- Zebra stripes, colored table headers, colored section backgrounds.
- Status by hue alone: always pair it with an icon or a word.

## Color use

- Surfaces stack `color.surface.default` → `raised` → `subtle`. `color.surface.inset` for light code and recessed wells; `color.surface.tray` for media placeholders only, never under text.
- Text: `color.text.primary` headings, labels, values; `body` running text and cells; `secondary` nav, descriptions, hints; `tertiary` meta, placeholders (the lightest text allowed).
- Status colors only on badges, callouts, field errors, toast wording and status series in charts; tinted grounds use `color.status.*Subtle`.
- Charts: series `color.text.primary`, `color.text.secondary`, `color.decor.bloomIndigo`, `color.status.info`; gridlines `color.border.default`.
- Text links: `color.text.primary`, 1px underline, 3px offset; hover `color.action.primaryHover`.

## Typography

Headings `font.weight.semibold`; the rest regular unless noted. Columns name `font.size.*`, `font.lineHeight.*`, `font.tracking.*`.

| Role | Size | Line height | Tracking |
| --- | --- | --- | --- |
| Display, max 1 per page | `display`, `clamp(40px, 5.5vw, 60px)` | `display` | `display` |
| Page h1: home, index, overview, collection | `h1`, `clamp(38px, 5vw, 56px)` | `display` | `display` |
| Object h1: product, project, post, record; settings | `h1Article`, `clamp(32px, 4vw, 44px)` | `heading` | `h1Article` |
| h2 / h3 | `h2` / `h3` | `title` | `h2` / `title` |
| Panel / card title | `panelTitle` / `cardTitle` | `card` | `title` |
| Lead / body | `lead` / `body` | `article` / `ui` (articles `article`) | `normal` |
| UI: buttons, nav, inputs (primary, current: medium) | `ui` | `ui` | `normal` |
| Small (chips, meta, cells) / caption | `small` / `caption` | `ui` | `normal` |
| Eyebrow, mono uppercase | `caption` | `ui` | `eyebrow` |
| Code, mono | `small` | `code` | `normal` |

One h1 per screen; never follow it with an h2 that repeats it ("Projects" then "All projects"). A status badge sits inline after the h1 or in the meta line below it, never alone at the far edge. Article measure 60 to 75 characters, max `size.article`; lead max 560px.

## Spacing, shape and depth

- 4px base, 2px half-steps inside controls. Card padding `space.24`, inner gaps `space.12` to `space.16`; between blocks `space.56` to `space.64`; between sections `space.96`; before the footer `space.120`. Under `breakpoint.md`: page top `space.40`, sections `space.56`, footer `space.72`, card padding `space.20`.
- Dense data screens: rows `size.row` or `size.rowCompact`, section gaps `space.32`.
- Radius by part: badge, segment, menu item, tooltip `radius.inner`; controls `radius.control`; 48px controls, thumbnails `radius.controlLg`; callout, toast `radius.callout`; media, code, menu sheet `radius.media`; card, dialog `radius.panel`; chips, pills, switch `radius.full`.
- Borders 1px; 2px only for focus, selected ring, active tab; 3px only for the callout bar.

## Motion

Color, border and background changes: `motion.duration.fast`, `motion.easing.standard`. Overlays (dialog, menu, toast) fade in with a 4px rise over `motion.duration.overlay` and fade out. Hover never moves or grows anything. Under `prefers-reduced-motion: reduce` every duration is `motion.duration.instant`.

## Layout adaptation

- Container max `size.container`, gutter `space.40` (`space.16` under `breakpoint.md`). Grid: 12 columns, `space.32` gaps from `breakpoint.lg`; 8 columns, `space.24` gaps from `breakpoint.md`; 4 columns, `space.16` gaps below.
- At 390px nothing scrolls sideways: `html, body { overflow-x: clip }`; grid or flex children holding text, tables or inputs get `min-width: 0`.
- Under `breakpoint.md`: navs with more than 3 links become a menu button (Navigation); forms are one column, controls full width; filter chips scroll in their own `overflow-x: auto` strip; tables follow Table, Mobile.
- The primary action moves to a sticky bottom bar (`color.surface.bar`, `elevation.actionBar`, padding `space.12`, 52px buttons, `radius.callout`; 76px tall); the page adds `padding-bottom: calc(76px + var(--space-16))`.

## Imagery and icons

Icons: 1.5px stroke outlines, `size.icon` or `size.iconLg`, round caps and joins, `color.text.secondary` at rest, `color.text.primary` active; an ISC or MIT outline set fits. Photos untreated; no photo: the Media frame "no asset" state.

## Shared component states

Required on every interactive component:
- **Hover:** color changes only, over `motion.duration.fast`.
- **Focus-visible:** `outline: 2px solid` `color.focus.ring`, `outline-offset: 2px`, following the element's radius. Never `outline: none` without this replacement.
- **Disabled:** `color.action.disabled` fill, `color.text.disabled` text, border unchanged, no hover, `cursor: not-allowed`; use focusable `aria-disabled="true"` when the reason needs explaining.
- **Loading:** keep size and label; 14px spinner in `currentColor`; `aria-busy="true"`. Placeholders are `color.surface.subtle` bars, `radius.inner`, no shimmer.
- **Error:** `color.status.danger` border; message `font.size.small` in `color.status.danger` with a 16px alert icon, `space.6` below.

## Studio details in a product

Details appear where a person pauses (arrival, emptiness, something pinned), never where they work.

| Detail | Allowed | Limit per screen | Never |
| --- | --- | --- | --- |
| Bloom | Page header band, page-level empty state | 1 | Dense data, editors, checkout, forms, dialogs; behind text other than the h1 |
| Tape | Pinned or featured item with `elevation.pinned` | 2 items, 2 strips each | Controls, rows, toasts, dialogs |
| Pencil note | Header margin, empty state; hidden under `breakpoint.md` | 2 | Sole carrier of information; validation; forms, tables |
| Serif word | Titles on the per-app list | 1; blogs add 1 pull-quote per article | Settings, forms, cart, checkout, product and record pages |
| Swash | Under the serif word of a landing masthead | 1 per app | App chrome |

Per app type; each gets at least one pencil note:
- **Dashboard:** bloom behind the overview header; serif word only if that title has 2 or more words; a note in the header margin pointing at the period or main action ("this month so far"); tape on user-pinned cards.
- **Store:** bloom and serif word on the home or collection header; a note pointing at the featured product ("new this week"); tape on up to 2 featured cards, never over photos; nothing on product, cart or checkout.
- **Blog:** bloom, serif word and swash on the masthead; serif word in article titles; a note pointing at the featured post ("start here"); tape on that post.
- **Settings:** no serif, no tape; bloom only on a page-level empty state; a note in the first page's header margin pointing at the section nav ("everything lives here").

### Recipe: shared filters, once at the app root

```html
<svg aria-hidden="true" width="0" height="0" style="position:absolute">
  <defs>
    <filter id="mn-wash" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="4" seed="11" result="warp"/>
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="70" xChannelSelector="R" yChannelSelector="G" result="shape"/>
      <feGaussianBlur in="shape" stdDeviation="2.5" result="soft"/>
      <feMorphology in="soft" operator="erode" radius="6" result="inner"/>
      <feComposite in="soft" in2="inner" operator="out" result="rim"/>
      <feGaussianBlur in="rim" stdDeviation="2" result="rimSoft"/>
      <feComponentTransfer in="soft" result="wash"><feFuncA type="linear" slope="0.48"/></feComponentTransfer>
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="4" result="grain"/>
      <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.8 0 0 0 1.2" result="grainA"/>
      <feMerge result="paint"><feMergeNode in="wash"/><feMergeNode in="rimSoft"/></feMerge>
      <feComposite in="paint" in2="grainA" operator="in"/>
    </filter>
    <filter id="mn-wash-night" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="4" seed="11" result="warp"/>
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="70" xChannelSelector="R" yChannelSelector="G" result="shape"/>
      <feGaussianBlur in="shape" stdDeviation="10"/>
    </filter>
    <filter id="mn-swash" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="5" result="warp"/>
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="12" xChannelSelector="R" yChannelSelector="G" result="shape"/>
      <feGaussianBlur in="shape" stdDeviation="0.6"/>
    </filter>
  </defs>
</svg>
```

### Recipe: bloom

Never clipped by a container or section bottom: no ancestor sets `overflow: hidden`, the mask feathers every edge, the box stays inside its band and may leave only through the viewport's right edge. Dark swaps to `mn-wash-night` (blurred, no grain or rim) with `opacity.bloom` 0.3: a glow lighter than `color.surface.default`, never a stain.

```html
<section class="bloom-band">  <!-- full-bleed, outside the container -->
  <svg class="bloom" aria-hidden="true" viewBox="0 0 560 360" preserveAspectRatio="none">
    <g class="bloom-paint">
      <ellipse cx="290" cy="180" rx="200" ry="130" fill="var(--color-decor-bloom-indigo)"/>
      <ellipse cx="200" cy="130" rx="120" ry="85" fill="var(--color-decor-bloom-blue)" opacity="0.7"/>
      <ellipse cx="380" cy="240" rx="95" ry="65" fill="var(--color-decor-bloom-violet)" opacity="0.55"/>
      <circle cx="130" cy="270" r="12" fill="var(--color-decor-bloom-indigo)"/>
      <circle cx="440" cy="80" r="8" fill="var(--color-decor-bloom-blue)"/>
    </g>
  </svg>
  <div class="container band-content"><h1>…</h1><p class="lead">…</p></div>
</section>
```

```css
.bloom-band { position: relative; overflow-x: clip; min-height: 320px; padding-top: var(--space-64); }
.band-content { position: relative; z-index: 1; }
.bloom { position: absolute; z-index: 0; pointer-events: none; top: 0; right: -120px; width: 500px; height: 320px;
  -webkit-mask-image: radial-gradient(closest-side, black 55%, transparent);
          mask-image: radial-gradient(closest-side, black 55%, transparent); }
.bloom-paint { filter: url(#mn-wash); opacity: var(--opacity-bloom); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .bloom-paint { filter: url(#mn-wash-night); } }
:root[data-theme="dark"] .bloom-paint { filter: url(#mn-wash-night); }
@media (max-width: 1199px) { /* behind the h1 only; ends above the lead */
  .bloom-band { min-height: 0; padding-top: var(--space-56); }
  .bloom { width: 176px; height: 112px; right: -48px; }
  .bloom-band .lead { margin-top: var(--space-20); }
}
```

Empty state: the wrapper gets `position: relative; padding-top: var(--space-56)`, no overflow; same SVG at `top: 0; right: max(-8px, calc(50% - 380px)); width: 280px; height: 180px`, behind the panel's top-right corner (panel `z-index: 1`); under `breakpoint.md` 176 x 112px.

### Recipe: tape

First child of the pinned card (`position: relative`): `<span class="tape" aria-hidden="true"></span>`; a second strip adds `tape--alt`.

```css
.tape { position: absolute; z-index: 2; pointer-events: none; width: 88px; height: 24px; top: -12px; left: 24px;
  transform: rotate(-4deg); background: var(--color-decor-tape); box-shadow: var(--shadow-tape);
  clip-path: polygon(2% 0, 98% 5%, 100% 32%, 97% 62%, 100% 100%, 3% 95%, 0 68%, 2% 34%); }
.tape--alt { transform: rotate(5deg); left: auto; right: 24px; }
```

### Recipe: pencil note

Two to six words whose meaning visible text nearby (eyebrow, lead, label) also carries. `position: absolute` in empty margin of the header band or empty-state wrapper, at least `space.24` from text, arrow toward its target (mirror with `scaleX(-1)`).

```html
<div class="note" aria-hidden="true"><span>start here</span>
  <svg viewBox="0 0 70 60" width="44" height="38"><path d="M64 8 C 40 6, 18 22, 14 52"/><path d="M7 43 L 14 53 L 21 44"/></svg></div>
```

```css
.note { position: absolute; z-index: 1; display: flex; gap: 4px; pointer-events: none; transform: rotate(-2deg);
  font-family: var(--font-family-hand); font-size: var(--font-size-h3); line-height: var(--font-line-height-hand);
  color: var(--color-decor-note); }
.note path { fill: none; stroke: var(--color-decor-pencil); stroke-width: 1.4; stroke-linecap: round; }
@media (max-width: 859px) { .note { display: none; } }
```

### Recipe: serif word and swash

One word, never the whole title; example words are placeholders.

```html
<h1>Orders, <em class="serif">today</em></h1>
<h1>Plan the <span class="swash"><em class="serif">week</em><svg aria-hidden="true" viewBox="0 0 200 40" preserveAspectRatio="none"><g filter="url(#mn-swash)"><path d="M6 24 C 50 14, 120 30, 194 16" fill="none" stroke="var(--color-decor-bloom-blue)" stroke-width="16" stroke-linecap="round" style="opacity: var(--opacity-swash)"/></g></svg></span></h1>
```

```css
.serif { font-family: var(--font-family-serif); font-style: italic; font-weight: 400; letter-spacing: var(--font-tracking-title); }
.swash { position: relative; isolation: isolate; }
.swash svg { position: absolute; left: -8px; bottom: -2px; width: calc(100% + 18px); height: 0.42em; z-index: -1; overflow: visible; }
```

## Accessibility

Text at least 4.5:1; `color.text.primary` on `color.surface.default` at least 7:1; control boundaries (switch track, checkbox, radio) at least 3:1. Touch targets at least `size.touch`. Dark mode ("night paper", derived) follows `prefers-color-scheme` unless the root has `data-theme="light"`; `data-theme="dark"` forces it.

## Semantic color tokens — light

| Token | Value |
| --- | --- |
| `color.surface.default` | `#faf9f6` |
| `color.surface.raised` | `#ffffff` |
| `color.surface.subtle` | `#efede7` |
| `color.surface.inset` | `#f4f2ec` |
| `color.surface.tray` | `#e9e6df` |
| `color.surface.bar` | `#faf9f6f0` |
| `color.surface.glass` | `#0e0e0cc7` |
| `color.surface.overlay` | `#0e0e0c66` |
| `color.text.primary` | `#0e0e0c` |
| `color.text.body` | `#3d3d39` |
| `color.text.secondary` | `#5a5a55` |
| `color.text.tertiary` | `#6b6b66` |
| `color.text.disabled` | `#6b6b66` |
| `color.text.onAction` | `#faf9f6` |
| `color.text.onGlass` | `#ffffff` |
| `color.border.default` | `#e6e4de` |
| `color.border.control` | `#e0ddd5` |
| `color.border.strong` | `#d6d3cb` |
| `color.action.primary` | `#0e0e0c` |
| `color.action.primaryHover` | `#2a2a27` |
| `color.action.primaryActive` | `#000000` |
| `color.action.secondary` | `#ffffff` |
| `color.action.danger` | `#c42b2b` |
| `color.action.dangerHover` | `#a52424` |
| `color.action.disabled` | `#efede7` |
| `color.focus.ring` | `#0e0e0c` |
| `color.status.success` | `#11713a` |
| `color.status.successSubtle` | `#e3f2e8` |
| `color.status.warning` | `#8b5d0f` |
| `color.status.warningSubtle` | `#f6ecd9` |
| `color.status.danger` | `#c42b2b` |
| `color.status.dangerSubtle` | `#f9e6e3` |
| `color.status.info` | `#1849f2` |
| `color.status.infoSubtle` | `#eef1fb` |
| `color.decor.bloomIndigo` | `#1e2a6b` |
| `color.decor.bloomBlue` | `#1849f2` |
| `color.decor.bloomViolet` | `#3a2f7a` |
| `color.decor.tape` | `#eee6d0db` |
| `color.decor.pencil` | `#6b6b66` |
| `color.decor.note` | `#5a5a55` |
| `color.code.bg` | `#0e0e0c` |
| `color.code.text` | `#e8e6e1` |
| `color.code.muted` | `#8b8983` |
| `color.code.string` | `#f0d9a8` |
| `color.code.ring` | `#0e0e0c` |

## Semantic color tokens — dark

| Token | Value |
| --- | --- |
| `color.surface.default` | `#151410` |
| `color.surface.raised` | `#1d1c18` |
| `color.surface.subtle` | `#24231f` |
| `color.surface.inset` | `#1d1c18` |
| `color.surface.tray` | `#2a2925` |
| `color.surface.bar` | `#151410f0` |
| `color.surface.glass` | `#0e0e0cc7` |
| `color.surface.overlay` | `#00000099` |
| `color.text.primary` | `#f2efe8` |
| `color.text.body` | `#d6d2c8` |
| `color.text.secondary` | `#a8a49a` |
| `color.text.tertiary` | `#8f8b81` |
| `color.text.disabled` | `#8f8b81` |
| `color.text.onAction` | `#151410` |
| `color.text.onGlass` | `#ffffff` |
| `color.border.default` | `#2e2d28` |
| `color.border.control` | `#3a3933` |
| `color.border.strong` | `#4a4840` |
| `color.action.primary` | `#f2efe8` |
| `color.action.primaryHover` | `#dcd8cf` |
| `color.action.primaryActive` | `#c9c4b9` |
| `color.action.secondary` | `#1d1c18` |
| `color.action.danger` | `#f07a6e` |
| `color.action.dangerHover` | `#e8958a` |
| `color.action.disabled` | `#24231f` |
| `color.focus.ring` | `#f2efe8` |
| `color.status.success` | `#5cc489` |
| `color.status.successSubtle` | `#1b2b20` |
| `color.status.warning` | `#e0a54a` |
| `color.status.warningSubtle` | `#302616` |
| `color.status.danger` | `#f07a6e` |
| `color.status.dangerSubtle` | `#36201c` |
| `color.status.info` | `#8ea8ff` |
| `color.status.infoSubtle` | `#1e2440` |
| `color.decor.bloomIndigo` | `#8ea8ff` |
| `color.decor.bloomBlue` | `#b7c3ff` |
| `color.decor.bloomViolet` | `#a99ce8` |
| `color.decor.tape` | `#4a4436e6` |
| `color.decor.pencil` | `#8f8b81` |
| `color.decor.note` | `#a8a49a` |
| `color.code.bg` | `#0e0e0c` |
| `color.code.text` | `#e8e6e1` |
| `color.code.muted` | `#8b8983` |
| `color.code.string` | `#f0d9a8` |
| `color.code.ring` | `#2e2d28` |

## Primitive tokens

| Token | Value |
| --- | --- |
| `font.family.sans` | `Geist, system-ui, -apple-system, "Segoe UI", Pretendard, "Noto Sans KR", sans-serif` |
| `font.family.mono` | `"Geist Mono", ui-monospace, SFMono-Regular, Menlo, D2Coding, "Noto Sans KR", monospace` |
| `font.family.serif` | `"Instrument Serif", Georgia, "Noto Serif KR", serif` |
| `font.family.hand` | `Caveat, "Nanum Pen Script", cursive` |
| `font.size.label` | `11px` |
| `font.size.caption` | `12px` |
| `font.size.small` | `13px` |
| `font.size.ui` | `14px` |
| `font.size.body` | `15px` |
| `font.size.lead` | `17px` |
| `font.size.cardTitle` | `19px` |
| `font.size.panelTitle` | `20px` |
| `font.size.h3` | `22px` |
| `font.size.h2` | `26px` |
| `font.size.sectionDisplay` | `40px` |
| `font.size.h1Article` | `44px` |
| `font.size.h1` | `56px` |
| `font.size.display` | `60px` |
| `font.weight.regular` | `400` |
| `font.weight.medium` | `500` |
| `font.weight.semibold` | `600` |
| `font.lineHeight.display` | `1` |
| `font.lineHeight.heading` | `1.05` |
| `font.lineHeight.hand` | `1.1` |
| `font.lineHeight.title` | `1.2` |
| `font.lineHeight.card` | `1.3` |
| `font.lineHeight.label` | `1.4` |
| `font.lineHeight.ui` | `1.55` |
| `font.lineHeight.article` | `1.65` |
| `font.lineHeight.code` | `1.8` |
| `font.tracking.display` | `-0.045em` |
| `font.tracking.h1Article` | `-0.04em` |
| `font.tracking.sectionDisplay` | `-0.035em` |
| `font.tracking.h2` | `-0.025em` |
| `font.tracking.title` | `-0.02em` |
| `font.tracking.normal` | `0em` |
| `font.tracking.eyebrow` | `0.08em` |

| Token | Value |
| --- | --- |
| `space.2` | `2px` |
| `space.4` | `4px` |
| `space.6` | `6px` |
| `space.8` | `8px` |
| `space.10` | `10px` |
| `space.12` | `12px` |
| `space.14` | `14px` |
| `space.16` | `16px` |
| `space.20` | `20px` |
| `space.24` | `24px` |
| `space.28` | `28px` |
| `space.32` | `32px` |
| `space.40` | `40px` |
| `space.48` | `48px` |
| `space.56` | `56px` |
| `space.64` | `64px` |
| `space.72` | `72px` |
| `space.96` | `96px` |
| `space.120` | `120px` |

| Token | Value |
| --- | --- |
| `size.container` | `1360px` |
| `size.article` | `720px` |
| `size.header` | `72px` |
| `size.headerMobile` | `60px` |
| `size.controlSm` | `32px` |
| `size.controlMd` | `36px` |
| `size.control` | `40px` |
| `size.controlLg` | `48px` |
| `size.touch` | `44px` |
| `size.rowCompact` | `36px` |
| `size.row` | `40px` |
| `size.dialog` | `560px` |
| `size.icon` | `16px` |
| `size.iconLg` | `20px` |

| Token | Value |
| --- | --- |
| `radius.swatch` | `5px` |
| `radius.inner` | `7px` |
| `radius.control` | `9px` |
| `radius.controlLg` | `10px` |
| `radius.callout` | `12px` |
| `radius.media` | `14px` |
| `radius.codePanel` | `16px` |
| `radius.panel` | `18px` |
| `radius.tray` | `20px` |
| `radius.full` | `999px` |

| Token | Value |
| --- | --- |
| `border.width.hairline` | `1px` |
| `border.width.strong` | `2px` |
| `border.width.bar` | `3px` |

| Token | Value |
| --- | --- |
| `shadow.rest` | `inset 0 0 0 1px #e6e4de` |
| `shadow.pinned` | `0 1px 2px rgba(14, 14, 12, 0.06), 0 24px 48px -24px rgba(14, 14, 12, 0.40), inset 0 0 0 1px #e6e4de` |
| `shadow.segment` | `0 1px 2px rgba(14, 14, 12, 0.12)` |
| `shadow.tape` | `0 1px 2px rgba(14, 14, 12, 0.10)` |
| `shadow.codePanel` | `0 30px 60px -24px rgba(14, 14, 12, 0.50)` |
| `shadow.actionBar` | `0 -1px 0 #e6e4de, 0 -12px 24px -12px rgba(14, 14, 12, 0.18)` |
| `shadow.restNight` | `inset 0 0 0 1px #2e2d28` |
| `shadow.pinnedNight` | `0 1px 2px rgba(0, 0, 0, 0.40), 0 24px 48px -24px rgba(0, 0, 0, 0.70), inset 0 0 0 1px #2e2d28` |
| `shadow.segmentNight` | `0 1px 2px rgba(0, 0, 0, 0.50)` |
| `shadow.actionBarNight` | `0 -1px 0 #2e2d28, 0 -12px 24px -12px rgba(0, 0, 0, 0.60)` |

| Token | Value |
| --- | --- |
| `motion.duration.instant` | `0ms` |
| `motion.duration.fast` | `120ms` |
| `motion.duration.overlay` | `180ms` |
| `motion.easing.standard` | `cubic-bezier(0.2, 0, 0, 1)` |

| Token | Value |
| --- | --- |
| `breakpoint.md` | `860px` |
| `breakpoint.lg` | `1200px` |
| `breakpoint.xl` | `1440px` |

## Components

### Button

**Use.** One primary per region; secondary for the rest; inline navigation is a text link.

**Anatomy.** Optional `size.icon` icon, label; gap `space.8`; `radius.control`, no shadow. Small `size.controlSm`, padding 0 `space.12`, `font.size.small`. Default `size.control`, padding 0 `space.16`, `font.size.ui`. Large `size.controlLg`, padding 0 `space.20`, `font.size.body`, `radius.controlLg`. Icon-only: square, `aria-label`.

**Variants.** Primary: `color.action.primary` fill, `color.text.onAction`, `font.weight.medium`. Secondary: `color.action.secondary` fill, 1px `color.border.control`, `color.text.primary`. Ghost: no fill, `color.text.secondary`. Danger: `color.action.danger` fill, `color.text.onAction`, only to confirm a destructive action.

**States.** Hover: primary `color.action.primaryHover`, secondary border `color.border.strong`, ghost `color.text.primary` on `color.surface.subtle`, danger `color.action.dangerHover`. Active: primary `color.action.primaryActive`, secondary `color.surface.subtle`; never scale. Loading, focus, disabled: shared; width locked.

**A11y.** Native `<button>`; Enter and Space.

### Text field

**Use.** Single-line input, including search. Textarea: same spec, min height 96px, padding `space.10` `space.12`, vertical resize.

**Anatomy.** Label above (`font.size.small`, `font.weight.medium`, `color.text.primary`), optional hint (`font.size.small`, `color.text.secondary`), input. Input: `height: var(--size-control)` (`size.controlSm` in toolbars), `box-sizing: border-box`, padding 0 `space.12`, `font.size.ui`, `radius.control`, `color.surface.raised` fill, 1px `color.border.control`, placeholder `color.text.tertiary`. Never size it by line-height. In a flex row: input `flex: 1 1 240px; min-width: 0`, row `align-items: center`, one height token for every control in the row. Gaps `space.6`; stacked fields `space.20` apart.

**States.** Hover: border `color.border.strong`. Read-only: `color.surface.subtle` fill. Error: border `color.status.danger` plus the shared error message; validate on blur and on submit. Focus, disabled: shared.

**A11y.** Visible `<label for>` always, never placeholder-only. Messages via `aria-describedby`; errors set `aria-invalid`; on submit, focus the first invalid field.

### Select

**Use.** One of 5 or more options. For 2 to 4 options, use the segmented control or radios.

**Anatomy.** Trigger identical to the text field, plus a 16px chevron in `color.text.secondary`. Menu: `color.surface.raised`, `radius.media`, `elevation.pinned`, padding `space.4`, max height 320px; options `size.controlMd`, padding 0 `space.10`, `radius.inner`.

**States.** Hover: trigger border `color.border.strong`; hovered and keyboard-active option `color.surface.subtle`. Selected option: `font.weight.medium`, trailing 16px check. Error, focus, disabled: shared.

**A11y.** Prefer a styled native `<select>`. Custom: `combobox` plus `listbox`; Arrows, Enter, Escape returns focus.

### Checkbox

**Use.** Independent options and row selection. One immediate on/off setting uses a switch.

**Anatomy.** 18px box, `radius.swatch`, 1px `color.text.tertiary` border (3:1) on `color.surface.raised`; check or dash glyph at 1.5px stroke; label `font.size.ui` at `space.10`. Hit area at least `size.controlSm` (`size.touch` on touch). Rows `space.12` apart. Radio: same with `radius.full` and an 8px dot.

**States.** Hover: border `color.text.secondary`. Selected and indeterminate: `color.action.primary` fill, glyph `color.text.onAction`. Error: border `color.status.danger`, group message below. Focus (ring around the box), disabled: shared.

**A11y.** Native input; Space toggles. Groups use `<fieldset>` and `<legend>`.

### Switch

**Use.** A setting that applies immediately. Settings that wait for Save use a checkbox.

**Anatomy.** Track 36 x 20px, `radius.full`; thumb 16px, 2px inset, `color.surface.raised`, `elevation.segment`. Settings rows: label left, switch right, min height `size.touch`, hairline dividers.

**States.** Off: track `color.surface.subtle` with 1px `color.text.tertiary` border (3:1 in both themes); hover: border `color.text.secondary`. On: track `color.action.primary`, no border, never green; thumb slides 16px over `motion.duration.fast`. Loading: 10px spinner in the thumb until saved; on failure revert and show an error toast. Focus (ring around the track), disabled: shared.

**A11y.** `role="switch"` with `aria-checked`; Space toggles; the visible label is the name.

### Tabs

**Use.** Sibling views of one object. Filtering the same data in 2 to 4 ways uses the segmented control.

**Anatomy.** Tab list over a full-width 1px `color.border.default` line; tabs `size.touch` tall, `space.24` apart, `font.size.ui`; panel `space.24` below. Overflow scrolls inside the list.

**States.** Default `color.text.secondary`. Hover `color.text.primary`. Selected: `color.text.primary`, `font.weight.semibold`, 2px underline as `inset 0 -2px 0` in `color.action.primary`. Focus (`radius.inner`), disabled: shared.

**A11y.** `tablist`, `tab` (`aria-selected`, `aria-controls`), `tabpanel`; Left and Right move.

### Segmented control

**Use.** 2 to 4 short modes of the same data (period, layout, theme).

**Anatomy.** Track `color.surface.subtle`, padding 3px, `radius.control`, height `size.control`. Segments `size.controlSm`, padding 0 `space.12`, `font.size.small`, `radius.inner`, `color.text.secondary`.

**States.** Hover `color.text.primary`. Selected: `color.surface.raised` segment, `elevation.segment`, `color.text.primary`, `font.weight.medium`. Focus, disabled: shared.

**A11y.** `radiogroup` with `radio` items; Arrows move the selection.

### Navigation

**Use.** Header for sections; sidebar from 6 sections; footer (hairline top, `font.size.small`) for the rest.

**Anatomy.** Header `size.header` (`size.headerMobile` under `breakpoint.md`), `color.surface.default`, 1px `color.border.default` bottom: product name as text only, no icon (`font.size.lead`, `font.weight.semibold`, `font.tracking.title`), links `font.size.ui` `color.text.secondary` `space.28` apart, one action at the right. Sidebar 220px: mono uppercase eyebrows (`font.size.caption`, `font.tracking.eyebrow`, `color.text.tertiary`), items `size.controlSm`, padding 0 `space.10`, `radius.inner`.

**Mobile (under `breakpoint.md`).** More than 3 links (header or sidebar): product name, at most 1 action, and a `size.touch` two-line menu button at the right opening a sheet below the header (`color.surface.raised`, `radius.media`, `elevation.pinned`, padding `space.8`, rows `size.touch`). Header search moves into the page. Links never overflow.

**States.** Hover `color.text.primary` (sidebar item also `color.surface.subtle`). Current: header link `color.text.primary` plus `font.weight.medium`, no pill or underline; sidebar item `color.surface.subtle`. Focus: shared.

**A11y.** `<nav aria-label>`, `aria-current="page"`; menu button `aria-expanded` and `aria-controls`; Escape closes the sheet.

### Chip

**Use.** Toggleable filters in a row. Static labels use badges.

**Anatomy.** `size.controlMd`, padding 0 `space.14`, `radius.full`, `font.size.small`, `color.surface.raised`, 1px `color.border.control`; optional icon or mono count. Chips `space.6` apart; the row scrolls in its own strip under `breakpoint.md`.

**States.** Hover: border `color.border.strong`. Selected: `color.action.primary` fill, `color.text.onAction`, no border. Focus, disabled: shared.

**A11y.** `<button aria-pressed>`; a removable chip has a separate "Remove {name}" button.

### Card

**Use.** One object or widget.

**Anatomy.** Optional mono eyebrow, title (`font.size.cardTitle` or `panelTitle`, `font.weight.semibold`, `font.tracking.title`), body `font.size.body` `color.text.body`, meta `font.size.small` `color.text.tertiary`, actions. Padding `space.24` (`space.20` under `breakpoint.md`), gap `space.12`, `radius.panel`.

**Variants.** Rest: `color.surface.raised`, `elevation.rest`. Pinned: `elevation.pinned`, may carry tape (max 2 per screen); spans grid columns, never a fixed width. Gallery item: a media frame, then text rows on the page ground, no container.

**States.** Hover (only if the whole card is a link): edge `inset 0 0 0 1px` in `color.border.strong`, no lift. Error: a danger callout inside. Loading, focus: shared.

**Rows.** Cards of different kinds (chart beside a list) use `align-items: start`; only same-kind cards share a height.

**A11y.** Linked card: one real link on the title heading, stretched with a pseudo-element.

### Media frame

**Use.** Photos, screenshots and their placeholders.

**Anatomy.** `radius.media`, `color.surface.tray` ground, `elevation.rest` (featured: `elevation.pinned`, counts toward the 2 lifted objects). Ratios 4:3 products, 16:10 screenshots, 3:2 posts. Optional label bottom-left at `space.10`: mono `font.size.label`, `color.text.onGlass` on `color.surface.glass`, padding `space.4` `space.8`, `radius.inner`. Thumbnails 64px, `radius.controlLg`. Hatch: `repeating-linear-gradient(135deg, var(--color-border-default) 0 1px, transparent 1px 14px)` on the tray.

**States.** No asset (identical in every app): tray, hatch, one centered `size.iconLg` outline image icon in `color.text.tertiary`; nothing else. Loading: tray and hatch, no icon, no shimmer. Error: hatch plus a 20px image-off icon and a `font.size.small` caption. Selected thumbnail: `0 0 0 2px` ring in `color.action.primary`. Focus: shared.

**A11y.** Meaningful `alt`, or empty `alt` when decorative; the no-asset icon is `aria-hidden`; thumbnails are buttons with `aria-pressed`. No tape or bloom over an image.

### Table

**Use.** Records compared by the same attributes. Key/value data uses spec rows: 180px mono key, value (mono when it is a number, date, amount or ID), hairline between rows, `space.14` vertical padding; under `breakpoint.md` the key stacks above the value.

**Anatomy.** Toolbar controls `size.controlSm`. Frame `color.surface.raised`, `elevation.rest`, `radius.panel`, clipped. Rows `size.row` (dense `size.rowCompact`), cells padding 0 `space.12`, `font.size.small` `color.text.body`. Header `font.size.caption`, `font.weight.medium`, `color.text.secondary`, hairline below. Row dividers `color.border.default`. Numbers, amounts, IDs, dates: mono, tabular, numbers right-aligned.

**Mobile (under `breakpoint.md`).** Up to 4 columns: the frame becomes `overflow-x: auto` (its grid or flex parents `min-width: 0`), first column at least 140px, primary text max 2 lines, trailing action column kept. 5 or more columns: stacked rows, one block per record: primary cell as a `font.size.ui` medium title, then 1 or 2 key values (status badge, amount) on one meta line, hairline between blocks; other columns move to the record's detail.

**States.** No zebra. Hover: `color-mix(in srgb, var(--color-surface-subtle) 50%, var(--color-surface-raised))`. Selected: `color.surface.subtle`, a 2px `color.action.primary` marker as `inset 2px 0 0` on the first cell. Loading: 5 skeleton rows. Error: a danger callout with retry. Empty: empty state without details. Focus (inset): shared.

**A11y.** Native `<table>`, `<th scope>`; sortable headers are buttons with `aria-sort`. A scrolling wrapper gets `tabindex="0"` and an `aria-label`.

### Badge

**Use.** Non-interactive status, version, count or category.

**Anatomy.** Height 22px, padding 0 `space.8`, `font.size.caption`, optional 6px dot or 12px icon at `space.6`, 1 to 2 words.

**Variants.** Status: `radius.full`, `color.status.{tone}Subtle` ground, `color.status.{tone}` text and dot. Neutral: `radius.full`, `color.surface.subtle`, `color.text.secondary`. Emphasis: `radius.full`, `color.action.primary`, `color.text.onAction`, max 1 per screen. Version or ID: mono, `radius.inner`, 1px `color.border.strong`, `color.text.secondary`, no fill.

**States.** Static: no hover, focus or disabled.

**A11y.** The status word is the label; counts get a hidden noun ("3 unread").

### Code block

**Use.** Code, commands, raw data. Inline code: mono `font.size.small` on `color.surface.subtle`, padding 0 `space.4`, `radius.swatch`.

**Anatomy.** Optional header (mono `font.size.caption` file name in `color.code.muted`, copy button). Body mono `font.size.small`, `font.lineHeight.code`, padding `space.16` `space.20`, `radius.media`, horizontal scroll.

**Variants.** Dark (default): `color.code.bg`, `color.code.text`, strings `color.code.string`, comments and prompt `color.code.muted`, 1px ring `color.code.ring`. Featured: `radius.codePanel`, `shadow.codePanel`, max 1 per screen. Light: `color.surface.inset`, `color.text.primary`, `elevation.rest`.

**States.** Copy button reads "Copied" for 2s. Focus on the dark ground: outline in `color.code.text`.

### Callout

**Use.** An inline message for a section or form: info, success, warning, danger.

**Anatomy.** 16px icon, optional title (`font.size.ui`, `font.weight.semibold`), body `font.size.small` `color.text.body`, optional text action. Padding `space.14` `space.16`, gap `space.10`, `radius.callout`, ground `color.status.{tone}Subtle`, a 3px bar as `inset 3px 0 0` plus icon in `color.status.{tone}`.

**States.** Static; a dismiss ghost icon button (`aria-label="Dismiss"`) when dismissible.

**A11y.** Danger callouts that appear after an action use `role="alert"`; the title or first word names the tone.

### Empty state

**Use.** Nothing to show yet; the main in-app place for details.

**Anatomy.** Centered panel, max 480px: `color.surface.raised`, `radius.panel`, `elevation.pinned`, padding `space.40` `space.32`. Title `font.size.h3` `font.weight.semibold`, sans; one sentence `font.size.body` `color.text.secondary` saying what will appear and how to start; one secondary button (primary only if creating is the page's job) `space.24` below; gaps `space.12`. No illustration or emoji.

**Details.** Page-level: 1 tape strip, the empty-state bloom (bloom recipe) behind the panel's top-right corner, and 1 pencil note beside the button repeating its label's intent ("add the first one"). Inside a table, widget, cart or form: no details, `elevation.rest`.

**States.** Failed to load: a danger callout with retry, no details.

### Dialog

**Use.** Confirm a consequential action or collect a short input.

**Anatomy.** Overlay `color.surface.overlay`; panel `color.surface.raised`, `radius.panel`, `elevation.pinned`, max width `size.dialog` (mobile: full width minus `space.32`), padding `space.24`. Title `font.size.h3`, `font.weight.semibold`; body `font.size.body` `color.text.body` at `space.8`; actions right-aligned (secondary, then primary) `space.24` below, `space.8` apart. Destructive: danger primary, title names the object.

**States.** Enter and exit per Motion. Loading: primary in loading state, other actions disabled. Error: a danger callout above the actions, focused.

**A11y.** `role="dialog"` (`alertdialog` when destructive), `aria-modal`, `aria-labelledby`. Focus the least destructive control, trap and return focus; Escape closes.

### Toast

**Use.** Confirms a finished action or a non-blocking failure.

**Anatomy.** Ground `color.action.primary`, text and 16px icon `color.text.onAction`, `elevation.segment`, `radius.callout`, min height `size.controlLg`, padding `space.12` `space.16`, gap `space.10`, max width 420px, `font.size.ui`. Bottom-right (mobile: bottom-center above the action bar), `space.8` apart, max 3.

**Variants.** Neutral, success, warning, danger, info differ only by icon and wording; the ground never changes.

**States.** Enter per Motion. Hover pauses dismissal. Focus: 2px outline in `color.text.onAction`, 2px offset.

**A11y.** `role="status"` (`alert` for danger). Auto-dismiss after 5s unless it has an action; Escape dismisses.

## Setup notes for this system

- **Fonts** (OFL): Geist 400/500/600, Geist Mono 400/500, Instrument Serif 400 italic, Caveat 400; `font-display: swap`.
- **Theme:** `tokens.css` handles light, dark via `prefers-color-scheme`, and `[data-theme]` on the root; a toggle only sets `data-theme`.
- **Root:** the shared filter SVG once in the root layout; `html, body { overflow-x: clip }`; global `:focus-visible` per Shared component states.
- **Base styles:** body `color.surface.default`, `color.text.body`, `font.size.body`, `font.lineHeight.ui`, `font.family.sans`; headings `color.text.primary`.

## New project

1. Inspect the framework and styling; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json` into the theme system). Do not retype values.
3. Set up the root per the setup notes; build the components with every specified state, then the studio-detail components from the recipes.
4. Create `design-system/` with `VERSION` (`margin-notes@0.1.0-rc.2`), the tokens and a `components.md` of your conventions, including which titles get the serif word and where details appear.
5. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, shared components, routes and tests.
2. Propose a migration plan, including which screens get studio details, and wait for approval.
3. Map the tokens onto existing variables, aliasing old names; any brand action color becomes `color.action.primary`.
4. Restyle one representative screen as a sample and wait for review; then go screen by screen, one commit each.
5. Preserve routes, business logic, API contracts, form fields and validation, test ids, labels used by tests, accessibility attributes.
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first. Use semantic tokens and existing components; never hard-code colors, sizes, radii or shadows.
- Before adding a studio detail, count the ones on the screen against rule 10.
- Uncovered needs: compose from tokens and note it in `design-system/components.md`; conflicting requests (a brand hue, weight 700): present options.

## Verification

Check at 1440px and 390px, light and dark. If you cannot render, check the code for each line:
- Build and tests pass; no raw colors, sizes or radii outside the token files.
- 390px: document `scrollWidth` equals the viewport; navs with more than 3 links use the menu button; tables wrap in `overflow-x: auto` or stack; flex and grid children holding text or inputs have `min-width: 0`; sticky bar pages have the bottom padding.
- Every input, select and search field has an explicit height of 32, 36 or 40px.
- Every interactive element has hover, `:focus-visible` and disabled styles; fields have the error style.
- Bloom: no `overflow: hidden` ancestor, mask set, dark filter switch present; at 390px nothing but the h1 overlaps it.
- Per screen: rule 10 limits, 2 pinned shadows, 1 primary per region, serif per the app list, mono per rule 7.
- Report files changed, anything you could not apply, and decisions you made yourself.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts and the filter SVG are one commit; reverting it last restores the previous look.
