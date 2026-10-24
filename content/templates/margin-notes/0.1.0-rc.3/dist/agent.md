# Margin Notes 0.1.0-rc.3

Design system `margin-notes@0.1.0-rc.3`. Warm paper, near-black ink for every action, hairlines and a tightly tracked grotesk; the only color is a watercolor wash, tape and pencil notes kept to the margins. Suits products whose content should carry the color.

This document is the complete design specification. Use the values and rules here instead of your own defaults. Where something is not specified, choose the option most consistent with the rules below and say so in your report. Token values are also provided as `tokens.css` and `tokens.json` next to this file — copy them, do not retype them. Each token's CSS variable is its path with dots replaced by dashes and camelCase split by dashes: `color.text.onAction` → `--color-text-on-action`.

## Character

An artist's studio as a calm product UI: warm paper, near-black ink for text and every action, hairlines, a
tightly tracked grotesk. The only chroma is an ink-blue watercolor wash bleeding in from the page edge; tape,
pencil notes and one serif italic word mark the margins.

Use `color.*`, `elevation.*`, `opacity.*` (they switch with the theme) and the primitives, never `palette.*`.
`space.14` = 14px. `elevation.x` = `shadow.x` (dark: `shadow.xNight`).

## The ten rules that define this look

1. **Warm paper, never gray.** Page `color.surface.default`, cards and controls `color.surface.raised`, wells `color.surface.subtle`. Why: warmth (R > G > B) is the paper.
2. **Ink is the only action color.** Primary buttons, pressed chips, selection, tab underlines and focus use `color.action.primary` / `color.focus.ring` (paper in dark). One primary per region; `color.action.danger` is the only other filled button. Why: the ink button is the identity.
3. **One hue family, rationed.** Ink-blue appears only as the info status, a third chart series and `color.decor.*`; never on links, buttons or selection. Why: rationing keeps the wash special.
4. **Hairlines before shadows.** Resting cards `elevation.rest`. `elevation.pinned` on at most 2 objects per screen plus overlays, always on `color.surface.lifted` (in dark the lighter tone and ring carry the lift). Why: lifted paper reads only when little else is lifted.
5. **Tight grotesk, three weights.** Sans 400, 500, 600 only; tracking tightens with size. Why: tracking, not weight, makes the voice.
6. **One serif italic word, inside a sans title.** Max 1 per screen, only in a title of 2 or more words on the per-app list (Studio details). Why: one hand-set word is an accent; a serif title is a font switch.
7. **Mono for machine facts** (`font.family.mono`, `tabular-nums`), exactly: IDs, SKUs, codes, versions, eyebrows; every number, amount, date or dimension ("40 × 35 × 15 cm") in a table cell, spec row, total or chart label; in mixed values only the digits ("2 of 6 complete": 2 and 6 mono, words sans). Always sans: headings, table headers, labels, prose, stat values, product prices, relative times. Why: machine voice versus human voice.
8. **Soft, nested corners; controls hold their height.** Radii by part; inner = outer minus padding. Inputs, selects and search fields set `height` (`size.control`, toolbars `size.controlSm`) and never shrink in flex rows. Why: constant rhythm.
9. **Selection is paper on a tray; every control answers.** Segmented: raised segment on a `color.surface.subtle` track; tabs: 2px ink underline; chips invert to ink. Every interactive element ships the Shared component states. Why: selection is material, not tint.
10. **Studio marks live in the margins.** Per screen at most 1 bloom, 2 pencil notes, 2 taped items, 1 serif word; only at pauses (page header, empty state, pinned item); `aria-hidden`; never in data, forms, overlays or photos; never animated. Why: details mark moments, not data.

## Never

- Cool grays; gradients on surfaces, buttons or text.
- A bloom with a straight edge, outside the h1 band, or empty paper reserved for it.
- A whole heading in serif; serif in body, buttons, labels, nav or numbers. Weight 700.
- Shadows on buttons, inputs, chips or rows.
- Scale, bounce, spring or parallax motion; skeleton shimmer.
- Emoji, clip-art, illustrated placeholders; filled or colored icons.
- Horizontal page scroll at 390px; a nav, status or row action pushed off-screen.
- A pencil arrow ending on empty paper; chart ink heavier than the numbers above it.
- Zebra stripes, colored table headers or section backgrounds; status by hue alone.

## Color use

- Surfaces: `default` → `raised` → `subtle`; `lifted` pinned objects, dialogs, menus; `tray` media placeholders only.
- Text: `primary` headings, labels, values; `body` running text, cells; `secondary` nav, descriptions, hints; `tertiary` meta, placeholders, disabled (the lightest allowed).
- Links: `color.text.primary`, 1px underline, 3px offset; hover `color.action.primaryHover`.
- **Charts weigh less than their numbers.** Bars max 28px wide, gaps at least 1.5x the bar, top corners `radius.inner`. Past periods `color.text.primary` at `opacity.chartRest`; the current period full `color.text.primary`. Lines 1.5px `color.text.secondary`, current point a 6px ink dot. Labels mono `font.size.caption` `color.text.tertiary` (current: `color.text.primary`). Gridlines `color.border.default`, max 4, no frame. More series: `color.text.tertiary`, `color.decor.bloomIndigo`.

## Typography

Headings `font.weight.semibold`; the rest regular unless noted. Columns name `font.size.*`, `font.lineHeight.*`, `font.tracking.*`.

| Role | Size | Line height | Tracking |
| --- | --- | --- | --- |
| Page h1: home, index, overview, collection | `h1`, `clamp(38px, 5vw, 56px)` | `display` | `display` |
| Object h1: product, project, post, record; settings | `h1Article`, `clamp(32px, 4vw, 44px)` | `heading` | `h1Article` |
| h2 / h3 | `h2` / `h3` | `title` | `h2` / `title` |
| Panel / card title | `panelTitle` / `cardTitle` | `card` | `title` |
| Lead / body | `lead` / `body` | `article` / `ui` (articles `article`) | `normal` |
| UI: buttons, nav, inputs (primary, current: medium) | `ui` | `ui` | `normal` |
| Small (chips, meta, cells) / caption | `small` / `caption` | `ui` | `normal` (mono uppercase eyebrow: `eyebrow`) |

One h1 per screen, never followed by an h2 repeating it; a status badge sits inline after it or in its meta line. Lead max 560px, `space.16` below the h1. Article prose: 60 to 75 characters, max `size.article`; paragraphs `space.16` apart; h2 `space.48` above, `space.12` below; figures, code, quotes, tables, callouts `space.24` above and below.

## Spacing, shape and depth

- 4px base, 2px half-steps inside controls. Card padding `space.24`, inner gaps `space.12` to `space.16`; between blocks `space.56` to `space.64`; between sections `space.96`; before the footer `space.120`. Under `breakpoint.md`: sections `space.56`, card padding `space.20`.
- Page header (with or without bloom): padding `space.64` top (`space.40` under `breakpoint.md`), `space.40` bottom, no min-height; content follows directly (lead to first content at most `space.64`).
- Dense data: section gaps `space.32`.
- Radius by part: badge, segment, menu item `radius.inner`; controls `radius.control`; 48px controls, thumbnails `radius.controlLg`; callout, toast `radius.callout`; media, code, menu sheet `radius.media`; card, dialog `radius.panel`; chips, switch `radius.full`.
- Borders 1px; 2px only for focus, selected ring, active tab; 3px only for the callout bar.

## Motion

Color changes `motion.duration.fast`, `motion.easing.standard`; overlays fade with a 4px rise over `motion.duration.overlay`; hover never moves anything; reduced motion `motion.duration.instant`.

## Layout adaptation

- One container in every app, header included: max `size.container`, gutter `space.40` (`space.16` under `breakpoint.md`), so at 1440px content starts at 40px. Narrower content aligns left with the h1: prose max `size.article`; settings forms max 8 columns. Grid: 12 columns, `space.32` gaps from `breakpoint.lg`; 8 columns, `space.24` from `breakpoint.md`; 4 columns, `space.16` below.
- At 390px nothing scrolls sideways: `html, body { overflow-x: clip }`; grid and flex children holding text, tables or inputs get `min-width: 0`.
- Under `breakpoint.md`: navs with more than 3 links use the menu button; global search lives in the menu sheet, never between header and h1; forms one column; filter chips scroll in their own strip; tables per Table, Mobile.
- Same-kind cards in a row share a height; mixed kinds align to the top.
- Mobile primary action: sticky bottom bar (`color.surface.bar`, `elevation.actionBar`, padding `space.12`, 52px buttons, `radius.callout`, 76px tall); the page adds `padding-bottom: calc(76px + var(--space-16))`.

## Imagery and icons

Icons: 1.5px stroke outlines, `size.icon` or `size.iconLg`, `color.text.secondary`, active `color.text.primary`. Photos untreated.

## Shared component states

Every interactive component, both themes:
- **Hover:** color changes only, `motion.duration.fast`.
- **Focus-visible:** `outline: 2px solid var(--color-focus-ring); outline-offset: 2px`, following the radius. Linked cards: `.card:has(a:focus-visible)` gets it.
- **Disabled:** `color.action.disabled` fill, `color.text.tertiary` text, no hover, `cursor: not-allowed`.
- **Loading:** keep size; 14px `currentColor` spinner; `aria-busy`; skeletons `color.surface.subtle`.
- **Error:** border `color.status.danger` (kept on hover and focus); at `space.6` below, replacing the hint: 16px alert icon plus message, `font.size.small`, `color.status.danger`; `aria-invalid`, `aria-describedby`. A submit with errors adds a danger callout at the form top ("2 fields need attention") and focuses the first invalid field.

## Studio details in a product

| Detail | Allowed | Per screen | Never |
| --- | --- | --- | --- |
| Bloom | Page header band, page-level empty state | 1 | Data, forms, checkout, dialogs |
| Tape | Pinned item with `elevation.pinned` | 2 items, 2 strips each | Controls, rows, overlays |
| Pencil note | On a named target, from `breakpoint.lg` | 2 | Sole carrier of information; forms |
| Serif word | Titles on the per-app list | 1; blogs add 1 pull-quote per article | Settings, forms, cart, checkout, object pages |
| Swash | Under a landing masthead's serif word | 1 per app | App chrome |

Per app, each with one note on this target:
- **Dashboard:** bloom behind the overview header; tape on user-pinned cards. Note `.note--beside` on the period words in the lead (`<span class="note-anchor">October 2026</span>`): "this month so far".
- **Store:** bloom and serif word on the home or collection header; tape on up to 2 featured cards. Note `.note--beside` on the lead (`class="lead note-anchor"`, `width: fit-content`) or a featured card: "new this week".
- **Blog:** bloom, serif word and swash on the masthead; serif word in article titles; the featured post card spans columns 1 to 8, taped. Note `.note--beside` on that card: "start here".
- **Settings:** no serif or tape. Note `.note--below` on the section nav list, `--note-x: calc(100% - 32px)`: "everything lives here".
- **Empty state:** note `.note--beside` on its button.

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
      <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="7" result="bleed"/>
      <feDisplacementMap in="shape" in2="bleed" scale="12" xChannelSelector="R" yChannelSelector="G" result="ragged"/>
      <feGaussianBlur in="ragged" stdDeviation="2.5" result="soft"/>
      <feMorphology in="soft" operator="erode" radius="5" result="inner"/>
      <feComposite in="soft" in2="inner" operator="out" result="rim"/>
      <feGaussianBlur in="rim" stdDeviation="1.5" result="rimSoft"/>
      <feColorMatrix in="rimSoft" type="matrix" values="0.8 0 0 0 0  0 0.8 0 0 0  0 0 0.85 0 0  0 0 0 0.7 0" result="rimDense"/>
      <feComponentTransfer in="soft" result="wash"><feFuncA type="linear" slope="0.5"/></feComponentTransfer>
      <feMerge><feMergeNode in="wash"/><feMergeNode in="rimDense"/></feMerge>
    </filter>
    <filter id="mn-swash" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="5" result="warp"/>
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="12" xChannelSelector="R" yChannelSelector="G" result="shape"/>
      <feGaussianBlur in="shape" stdDeviation="0.6"/>
    </filter>
  </defs>
</svg>
```

`mn-wash-night` adds a ragged second displacement, a half-alpha wash and a slightly darker rim at 1.4x the wash alpha, so paint pools at the edge; never an out-of-focus ellipse.

### Recipe: bloom

The band is as tall as its content; the bloom fills its height at the top right and leaves only through the viewport's right edge. No ancestor sets `overflow: hidden`.

```html
<section class="bloom-band">  <!-- full-bleed, outside the container -->
  <svg class="bloom" aria-hidden="true" viewBox="0 0 560 360" preserveAspectRatio="none">
    <g class="bloom-paint">
      <ellipse cx="290" cy="180" rx="200" ry="130" fill="var(--color-decor-bloom-indigo)"/>
      <ellipse cx="200" cy="130" rx="120" ry="85" fill="var(--color-decor-bloom-blue)" opacity="0.7"/>
      <ellipse cx="380" cy="240" rx="95" ry="65" fill="var(--color-decor-bloom-violet)" opacity="0.55"/>
    </g>
  </svg>
  <div class="container band-content"><h1>…</h1><p class="lead">…</p></div>
</section>
```

```css
.bloom-band { position: relative; overflow-x: clip; padding: var(--space-64) 0 var(--space-40); }
.band-content { position: relative; z-index: 1; }
.bloom { position: absolute; z-index: 0; pointer-events: none; top: 0; right: -120px; width: 520px; height: 100%; min-height: 200px;
  mask-image: radial-gradient(closest-side at 50% 45%, black 50%, transparent); }
.bloom-paint { filter: url(#mn-wash); opacity: var(--opacity-bloom); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .bloom-paint { filter: url(#mn-wash-night); } }
:root[data-theme="dark"] .bloom-paint { filter: url(#mn-wash-night); }
@media (max-width: 1199px) { .bloom { width: 176px; height: 96px; min-height: 0; right: -48px; } .bloom-band .lead { margin-top: var(--space-20); } }
@media (max-width: 859px) { .bloom-band { padding-top: var(--space-40); } }
```

Empty state: wrapper `position: relative; max-width: 480px; padding-top: var(--space-56)`; same SVG at `top: 0; right: -140px`, 280 x 180px, behind the panel's top-right corner (panel `z-index: 1`); under `breakpoint.md` `right: -16px`, 176 x 96px.

### Recipe: tape

First child of the pinned card (`position: relative`): `<span class="tape" aria-hidden="true"></span>`; a second strip adds `tape--alt`.

```css
.tape { position: absolute; z-index: 2; pointer-events: none; width: 88px; height: 24px; top: -12px; left: 24px;
  transform: rotate(-4deg); background: var(--color-decor-tape); box-shadow: var(--shadow-tape);
  clip-path: polygon(2% 0, 98% 5%, 100% 32%, 97% 62%, 100% 100%, 3% 95%, 0 68%, 2% 34%); }
.tape--alt { transform: rotate(5deg); left: auto; right: 24px; }
```

### Recipe: pencil note

Two to six words that nearby text also carries. The note is a child of its target or of a `.note-anchor` around it; the arrow tip is the note's bottom-left corner (`--below`: top-left), 6 to 12px from the target. It overlaps no text, control or viewport edge; without 220 x 48px free there, use another placement.

```html
<span class="note-anchor">October 2026<span class="note note--beside" aria-hidden="true"><svg viewBox="0 0 44 38" width="44" height="38"><path d="M42 3 C 28 3, 10 12, 3 35"/><path d="M0 27 L 3 36 L 10 30"/></svg><span>this month so far</span></span></span>
```

```css
.note-anchor { position: relative; }
.note { position: absolute; z-index: 1; display: flex; gap: 2px; white-space: nowrap; pointer-events: none;
  transform: rotate(-2deg); transform-origin: 0 100%; font: 400 var(--font-size-h3)/var(--font-line-height-hand) var(--font-family-hand);
  color: var(--color-decor-pencil); }
.note path { fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; }
.note--beside { left: calc(100% + 12px); bottom: 50%; }
.note--above { left: var(--note-x, 24px); bottom: calc(100% + 6px); }
.note--below { left: var(--note-x, 24px); top: calc(100% + 6px); align-items: flex-end; transform-origin: 0 0; }
.note--below svg { transform: scaleY(-1); }
@media (max-width: 1199px) { .note { display: none; } }
```

### Recipe: serif word and swash

One word, never the whole title; example words are placeholders.

```html
<h1>Plan the <span class="swash"><em class="serif">week</em><svg aria-hidden="true" viewBox="0 0 200 40" preserveAspectRatio="none"><g filter="url(#mn-swash)"><path d="M6 24 C 50 14, 120 30, 194 16" fill="none" stroke="var(--color-decor-bloom-blue)" stroke-width="16" stroke-linecap="round" style="opacity: var(--opacity-swash)"/></g></svg></span></h1>
```

```css
.serif { font-family: var(--font-family-serif); font-style: italic; font-weight: 400; letter-spacing: var(--font-tracking-title); }
.swash { position: relative; isolation: isolate; }
.swash svg { position: absolute; left: -8px; bottom: -2px; width: calc(100% + 18px); height: 0.42em; z-index: -1; overflow: visible; }
```

## Accessibility

Text at least 4.5:1; control boundaries and switch thumbs at least 3:1; touch targets at least `size.touch`. Dark ("night paper") follows `prefers-color-scheme` unless `data-theme` overrides it.

## Semantic color tokens — light

| Token | Value |
| --- | --- |
| `color.surface.default` | `#faf9f6` |
| `color.surface.raised` | `#ffffff` |
| `color.surface.lifted` | `#ffffff` |
| `color.surface.subtle` | `#efede7` |
| `color.surface.tray` | `#e9e6df` |
| `color.surface.bar` | `#faf9f6f0` |
| `color.surface.overlay` | `#0e0e0c66` |
| `color.text.primary` | `#0e0e0c` |
| `color.text.body` | `#3d3d39` |
| `color.text.secondary` | `#5a5a55` |
| `color.text.tertiary` | `#6b6b66` |
| `color.text.onAction` | `#faf9f6` |
| `color.border.default` | `#e6e4de` |
| `color.border.control` | `#e0ddd5` |
| `color.border.strong` | `#d6d3cb` |
| `color.action.primary` | `#0e0e0c` |
| `color.action.primaryHover` | `#2a2a27` |
| `color.action.primaryActive` | `#000000` |
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
| `color.decor.hatch` | `#c2bcb0` |
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
| `color.surface.lifted` | `#24231f` |
| `color.surface.subtle` | `#24231f` |
| `color.surface.tray` | `#2a2925` |
| `color.surface.bar` | `#151410f0` |
| `color.surface.overlay` | `#00000099` |
| `color.text.primary` | `#f2efe8` |
| `color.text.body` | `#d6d2c8` |
| `color.text.secondary` | `#a8a49a` |
| `color.text.tertiary` | `#8f8b81` |
| `color.text.onAction` | `#151410` |
| `color.border.default` | `#2e2d28` |
| `color.border.control` | `#3a3933` |
| `color.border.strong` | `#4a4840` |
| `color.action.primary` | `#f2efe8` |
| `color.action.primaryHover` | `#dcd8cf` |
| `color.action.primaryActive` | `#c9c4b9` |
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
| `color.decor.hatch` | `#4a4840` |
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
| `font.size.caption` | `12px` |
| `font.size.small` | `13px` |
| `font.size.ui` | `14px` |
| `font.size.body` | `15px` |
| `font.size.lead` | `17px` |
| `font.size.cardTitle` | `19px` |
| `font.size.panelTitle` | `20px` |
| `font.size.h3` | `22px` |
| `font.size.h2` | `26px` |
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
| `font.lineHeight.ui` | `1.55` |
| `font.lineHeight.article` | `1.65` |
| `font.lineHeight.code` | `1.8` |
| `font.tracking.display` | `-0.045em` |
| `font.tracking.h1Article` | `-0.04em` |
| `font.tracking.h2` | `-0.025em` |
| `font.tracking.title` | `-0.02em` |
| `font.tracking.normal` | `0em` |
| `font.tracking.eyebrow` | `0.08em` |

| Token | Value |
| --- | --- |
| `space.4` | `4px` |
| `space.6` | `6px` |
| `space.8` | `8px` |
| `space.10` | `10px` |
| `space.12` | `12px` |
| `space.14` | `14px` |
| `space.16` | `16px` |
| `space.20` | `20px` |
| `space.24` | `24px` |
| `space.32` | `32px` |
| `space.40` | `40px` |
| `space.48` | `48px` |
| `space.56` | `56px` |
| `space.64` | `64px` |
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
| `radius.panel` | `18px` |
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
| `shadow.actionBar` | `0 -1px 0 #e6e4de, 0 -12px 24px -12px rgba(14, 14, 12, 0.18)` |
| `shadow.restNight` | `inset 0 0 0 1px #2e2d28` |
| `shadow.pinnedNight` | `0 1px 2px rgba(0, 0, 0, 0.50), 0 24px 48px -24px rgba(0, 0, 0, 0.80), inset 0 1px 0 rgba(242, 239, 232, 0.06), inset 0 0 0 1px #4a4840` |
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

## Components

### Button

**Use.** One primary per region; secondary for the rest; inline navigation is a text link.

**Anatomy.** Optional `size.icon` icon, label, gap `space.8`, `radius.control`, no shadow. Small `size.controlSm`, padding 0 `space.12`, `font.size.small`. Default `size.control`, padding 0 `space.16`, `font.size.ui`. Large `size.controlLg`, padding 0 `space.20`, `radius.controlLg`. Icon-only: square, `aria-label`.

**Variants.** Primary: `color.action.primary`, `color.text.onAction`, `font.weight.medium`. Secondary: `color.surface.raised`, 1px `color.border.control`, `color.text.primary`. Ghost: no fill, `color.text.secondary`. Danger: `color.action.danger`, `color.text.onAction`, only to confirm a destructive action.

**States.** Hover: primary `color.action.primaryHover`, secondary border `color.border.strong`, ghost `color.text.primary` on `color.surface.subtle`, danger `color.action.dangerHover`. Active: primary `color.action.primaryActive`, secondary `color.surface.subtle`. Loading (width locked), focus, disabled: shared.

**A11y.** Native `<button>`.

### Text field

**Use.** Single-line input, including search. Textarea: min height 96px, padding `space.10` `space.12`, vertical resize.

**Anatomy.** Label above (`font.size.small`, `font.weight.medium`, `color.text.primary`), optional hint (`font.size.small`, `color.text.secondary`), input: `height: var(--size-control)` (toolbars `size.controlSm`), `box-sizing: border-box`, padding 0 `space.12`, `font.size.ui`, `radius.control`, `color.surface.raised`, 1px `color.border.control`, placeholder `color.text.tertiary`. In a flex row: `flex: 1 1 240px; min-width: 0`, one height for every control. Gaps `space.6`; fields `space.20` apart.

**States.** Hover: border `color.border.strong`. Read-only: `color.surface.subtle`. Error, focus, disabled: shared.

**A11y.** Visible `<label for>`, never placeholder-only.

### Select

**Use.** One of 5 or more options; 2 to 4 use the segmented control or radios.

**Anatomy.** Trigger as Text field plus a 16px chevron `color.text.secondary`. Menu: `color.surface.lifted`, `radius.media`, `elevation.pinned`, padding `space.4`, max height 320px; options `size.controlMd`, padding 0 `space.10`, `radius.inner`.

**States.** Hover: trigger border `color.border.strong`; active option `color.surface.subtle`. Selected option: `font.weight.medium`, trailing check. Error, focus, disabled: shared.

**A11y.** Prefer a styled native `<select>`; custom: `combobox` plus `listbox`.

### Checkbox

**Use.** Independent options and row selection; an immediate setting uses a switch.

**Anatomy.** 18px box, `radius.swatch`, 1px `color.text.tertiary` border on `color.surface.raised`; 1.5px check or dash; label `font.size.ui` at `space.10`; hit area at least `size.controlSm` (touch `size.touch`); rows `space.12` apart. Radio: `radius.full`, 8px dot.

**States.** Hover: border `color.text.secondary`. Selected, indeterminate: `color.action.primary` fill, glyph `color.text.onAction`. Error: border `color.status.danger`, group message below. Focus (ring around the box), disabled: shared.

**A11y.** Native input; groups use `<fieldset>` and `<legend>`.

### Switch

**Use.** A setting that applies immediately. Settings that wait for Save use a checkbox.

**Anatomy.** Track 36 x 20px, `radius.full`; 16px thumb, 2px inset. Rows: label left, switch right, min height `size.touch`.

**States.** Off: track `color.surface.subtle` with 1px `color.text.tertiary` border; thumb `color.text.tertiary`, no shadow (4.6:1 on the track in both themes). Hover: border and thumb `color.text.secondary`. On: track `color.action.primary`, no border, never green; thumb `color.text.onAction` with `elevation.segment`; it slides 16px over `motion.duration.fast`. Loading: 10px spinner in the thumb until saved; on failure revert and show a danger toast. Focus (ring around the track), disabled: shared.

**A11y.** `role="switch"` with `aria-checked`; Space toggles; the visible label is the name.

### Tabs

**Use.** Sibling views of one object; filtering one dataset uses the segmented control.

**Anatomy.** Tab list over a 1px `color.border.default` line; tabs `size.touch` tall, `space.24` apart, `font.size.ui`; panel `space.24` below; overflow scrolls inside the list.

**States.** Default `color.text.secondary`; hover `color.text.primary`. Selected: `color.text.primary`, `font.weight.semibold`, underline `inset 0 -2px 0` `color.action.primary`. Focus, disabled: shared.

**A11y.** `tablist`, `tab` with `aria-selected`, `tabpanel`; Left and Right move.

### Segmented control

**Use.** 2 to 4 short modes of the same data (period, layout, status filter).

**Anatomy.** Track `color.surface.subtle`, padding 3px, `radius.control`, height `size.control`. Segments `size.controlSm`, padding 0 `space.12`, `font.size.small`, `radius.inner`, `color.text.secondary`.

**States.** Hover `color.text.primary`. Selected: `color.surface.raised`, `elevation.segment`, `color.text.primary`, `font.weight.medium`. Focus, disabled: shared.

**A11y.** `radiogroup` of `radio`; Arrows move.

### Navigation

**Use.** Header for sections; sidebar from 6 sections.

**Anatomy.** Header `size.header` (`size.headerMobile` under `breakpoint.md`), `color.surface.default`, 1px `color.border.default` bottom, inner width `size.container`, never `overflow: hidden`: product name as text only (`font.size.lead`, `font.weight.semibold`, `font.tracking.title`), links `font.size.ui` `color.text.secondary` `space.24` apart, search (`size.controlSm`) and one action at the right. Sidebar 220px: mono eyebrows, items `size.controlSm`, padding 0 `space.10`, `radius.inner`.

**Mobile (under `breakpoint.md`).** More than 3 links: product name, at most 1 action, and a `size.touch` two-line menu button at the right opening a sheet below the header (`color.surface.lifted`, `radius.media`, `elevation.pinned`, padding `space.8`, rows `size.touch`; global search first, `size.control`, full width). Links never overflow.

**States.** Hover `color.text.primary` (sidebar item also `color.surface.subtle`). Current: header link `color.text.primary` plus `font.weight.medium`, no pill or underline; sidebar item `color.surface.subtle`. Focus: shared.

**A11y.** `<nav aria-label>`, `aria-current="page"`; menu button `aria-expanded` and `aria-controls`; Escape closes the sheet.

### Chip

**Use.** Toggleable filters in a row. Static labels use badges.

**Anatomy.** `size.controlMd`, padding 0 `space.14`, `radius.full`, `font.size.small`, `color.surface.raised`, 1px `color.border.control`; optional icon or mono count; `space.6` apart.

**States.** Hover: border `color.border.strong`. Selected: `color.action.primary` fill, `color.text.onAction`, no border. Focus, disabled: shared.

**A11y.** `<button aria-pressed>`.

### Card

**Use.** One object or widget.

**Anatomy.** Optional mono eyebrow, title (`font.size.cardTitle` or `panelTitle`), body `color.text.body`, meta `font.size.small` `color.text.tertiary`, actions. Padding `space.24` (`space.20` under `breakpoint.md`), gap `space.12`, `radius.panel`.

**Variants.** Rest: `color.surface.raised`, `elevation.rest`. Pinned: `color.surface.lifted`, `elevation.pinned`, may carry tape; spans grid columns, never a fixed width. Stat: eyebrow on one line (ellipsis, full text in `title`), value sans `clamp(28px, 3vw, 40px)` semibold, `font.tracking.h1Article`, delta `font.size.small` `color.text.secondary` with a 12px arrow; a row of stats shares one height.

**States.** Hover (whole card is a link): ring `inset 0 0 0 1px` `color.border.strong`, no lift. Focus: shared (outline on the card). Error: a danger callout inside. Loading: shared.

**A11y.** Linked card: one link on the title, stretched with a pseudo-element.

### Media frame

**Use.** Photos, screenshots and their placeholders.

**Anatomy.** `radius.media`, `color.surface.tray` ground, `elevation.rest` (featured: `elevation.pinned`). Ratios 4:3 products, 16:10 screenshots, 3:2 posts. Thumbnails 64px, `radius.controlLg`. Hatch: `repeating-linear-gradient(135deg, var(--color-decor-hatch) 0 1px, transparent 1px 12px)` over the tray (at least 1.5:1 in both themes).

**States.** No asset (identical in every app): tray, hatch, one centered `size.iconLg` outline image icon in `color.text.tertiary`; nothing else. Loading: tray and hatch, no icon, no shimmer. Error: hatch plus a 20px image-off icon and a `font.size.small` caption. Selected thumbnail: `0 0 0 2px` ring in `color.action.primary`. Focus: shared.

**A11y.** Meaningful `alt`, or empty `alt` when decorative; the icon is `aria-hidden`; thumbnails are buttons with `aria-pressed`.

### Table

**Use.** Records compared by the same attributes. Key/value data: spec rows, 180px key `color.text.secondary`, value, hairlines, `space.14` vertical padding; key above value under `breakpoint.md`.

**Anatomy.** Toolbar controls `size.controlSm`. Frame `color.surface.raised`, `elevation.rest`, `radius.panel`, clipped. Rows `size.row` (dense `size.rowCompact`), cells padding 0 `space.12`, `font.size.small` `color.text.body`. Header sans `font.size.caption`, `font.weight.medium`, `color.text.secondary`, hairline below. Numbers right-aligned. Row actions are the last column, right-aligned to the cell padding edge.

**Mobile (under `breakpoint.md`): stack.** Any table with a status column, an action column or more than 4 columns becomes one block per row. Keep the `<table>`, add `role` `table`/`rowgroup`/`row`/`columnheader`/`cell` so semantics survive `display: block`, and give each `<td>` a `data-label`. Every column stays a label/value pair (max 6; status, actions and the active sort key are never dropped); sort chips list only keys shown in the block.

```css
@media (max-width: 859px) {
  .table--stack thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  .table--stack, .table--stack tbody, .table--stack tr, .table--stack td { display: block; }
  .table--stack tr { padding: var(--space-14) var(--space-16); border-bottom: 1px solid var(--color-border-default); }
  .table--stack td { display: grid; grid-template-columns: minmax(96px, 38%) 1fr; gap: var(--space-12); padding: var(--space-4) 0; text-align: left; }
  .table--stack td::before { content: attr(data-label); font-size: var(--font-size-caption); color: var(--color-text-tertiary); }
  .table--stack .cell-primary { display: block; font-size: var(--font-size-ui); font-weight: var(--font-weight-medium); padding-bottom: var(--space-6); }
  .table--stack .cell-primary::before, .table--stack .cell-actions::before { content: none; }
  .table--stack .cell-actions { display: flex; gap: var(--space-8); padding-top: var(--space-12); }
  .table--stack .cell-actions > * { flex: 1; height: var(--size-touch); }
}
```

**Mobile: scroll.** Other tables scroll in `<div class="table-scroll" role="region" tabindex="0" aria-label="{name}, scrolls sideways">`, the next column cut mid-cell. A script sets `data-overflow` (`scrollWidth > clientWidth`) and `data-at-end`; while content is off-screen the edge fades and a "Scroll sideways" hint (`font.size.caption`, `color.text.tertiary`) sits right-aligned above.

```css
.table-scroll { overflow-x: auto; min-width: 0; }
.table-scroll[data-overflow]:not([data-at-end]) { mask-image: linear-gradient(to left, transparent, black 32px); }
```

**States.** No zebra. Hover: `color.surface.subtle` at 50%. Selected: `color.surface.subtle` plus `inset 2px 0 0` `color.action.primary` on the first cell. Sorted header: `color.text.primary` and a 12px arrow. Loading: 5 skeleton rows. Error: danger callout with retry. Empty: empty state, no details. Focus (inset): shared.

**A11y.** `<th scope>`; sortable headers are buttons with `aria-sort`.

### Badge

**Use.** Non-interactive status, version, count or category.

**Anatomy.** Height 22px, padding 0 `space.8`, `font.size.caption`, `radius.full`, optional 6px dot or 12px icon at `space.6`, 1 to 2 words.

**Variants.** Status: `color.status.{tone}Subtle` ground, `color.status.{tone}` text and dot. Neutral: `color.surface.subtle`, `color.text.secondary`. Emphasis (max 1 per screen): `color.action.primary`, `color.text.onAction`. Version or ID: mono, `radius.inner`, 1px `color.border.strong`, no fill.

**States.** Static. **A11y.** The word is the label; counts get a hidden noun ("3 unread").

### Code block

**Use.** Code, commands, raw data. Inline code: mono `font.size.small` on `color.surface.subtle`, padding 0 `space.4`, `radius.swatch`.

**Anatomy.** Optional header (mono `font.size.caption` file name in `color.code.muted`, copy button). Body mono `font.size.small`, `font.lineHeight.code`, padding `space.16` `space.20`, `radius.media`, scrolls sideways inside itself. In prose: `space.24` above and below.

**Colors.** `color.code.bg`, `color.code.text`, strings `color.code.string`, comments and prompt `color.code.muted`, 1px ring `color.code.ring`.

**States.** Copy button reads "Copied" for 2s. Focus on the dark ground: outline in `color.code.text`.

### Callout

**Use.** Inline message for a section or form: info, success, warning, danger.

**Anatomy.** 16px icon, optional title (`font.size.ui`, `font.weight.semibold`), body `font.size.small` `color.text.body`, optional text action. Padding `space.14` `space.16`, gap `space.10`, `radius.callout`, ground `color.status.{tone}Subtle`, bar `inset 3px 0 0` and icon `color.status.{tone}`.

**States.** Static; dismissible ones get a ghost icon button (`aria-label="Dismiss"`).

**A11y.** Danger after an action: `role="alert"`; the title names the tone.

### Empty state

**Use.** Nothing to show yet; the main in-app place for details.

**Anatomy.** Panel max 480px on the page h1's axis: at the content column's left edge under a left-aligned h1, centered only on a page without an h1. `color.surface.lifted`, `radius.panel`, `elevation.pinned`, padding `space.40` `space.32`, text left-aligned. Title `font.size.h3` `font.weight.semibold`, sans; one sentence `color.text.secondary` saying what will appear and how to start; one secondary button (primary only if creating is the page's job) `space.24` below; gaps `space.12`.

**Details.** Page-level: 1 tape strip, the empty-state bloom (bloom recipe), and a `.note--beside` note on the button repeating its intent ("add the first one"). Inside a table, widget, cart or form: no details, `color.surface.raised`, `elevation.rest`.

**States.** Failed to load: a danger callout with retry, no details.

### Dialog

**Use.** Confirm a consequential action or collect a short input.

**Anatomy.** Scrim: fixed, full screen, `color.surface.overlay`. Panel: `color.surface.lifted`, `radius.panel`, `elevation.pinned`, width `size.dialog` (under `breakpoint.md` full width minus `space.32`), padding `space.24`, centered. Title `font.size.h3` semibold; body `font.size.body` `color.text.body` `space.8` below. Actions `space.24` below, right-aligned, `space.8` apart: secondary then primary (mobile: full width, primary on top). A `size.controlSm` ghost close button top right. Destructive: danger primary; the title names the object.

**States.** Enter and exit per Motion; the scrim only fades. Loading: primary in loading state, other actions disabled. Error: a danger callout above the actions, focused. Focus: shared.

**A11y.** `role="dialog"` (`alertdialog` when destructive), `aria-modal`, `aria-labelledby`. Focus the least destructive control, trap and return focus; Escape and a scrim click close it (not while loading).

### Toast

**Use.** Confirms a finished action or a non-blocking failure.

**Anatomy.** Ground `color.action.primary`, text and 16px icon `color.text.onAction`, `elevation.segment`, `radius.callout`, min height `size.controlLg`, padding `space.12` `space.16`, gap `space.10`, max width 420px, `font.size.ui`. Optional action: underlined text button, `color.text.onAction`, `font.weight.medium`. Fixed `space.24` from the bottom right; under `breakpoint.md` `space.16` from the sides, above the action bar. Stack `space.8` apart, max 3, newest at the bottom.

**Variants.** Tones differ only by icon and wording; the ground never changes.

**States.** Enter per Motion. Hover pauses dismissal. Focus: 2px outline in `color.text.onAction`, 2px offset.

**A11y.** `role="status"` (`alert` for danger). Auto-dismiss after 5s unless it has an action; Escape dismisses.

## Setup notes for this system

- **Fonts** (OFL): Geist 400/500/600, Geist Mono 400/500, Instrument Serif 400 italic, Caveat 400; `font-display: swap`.
- **Theme:** `tokens.css` handles `prefers-color-scheme` and `[data-theme]`; a toggle only sets `data-theme`.
- **Root:** the filter SVG once; `html, body { overflow-x: clip }`; global `:focus-visible`.
- **Base styles:** body `color.surface.default`, `color.text.body`, `font.size.body`, `font.lineHeight.ui`, `font.family.sans`; headings `color.text.primary`.

## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json`); never retype values.
3. Set up the root; build components with every state, then the studio details.
4. Create `design-system/` with `VERSION` (`margin-notes@0.1.0-rc.3`), the tokens and `components.md` (serif titles, details, note targets).
5. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, shared components, routes and tests.
2. Propose a migration plan, including which screens get studio details, and wait for approval.
3. Map the tokens onto existing variables, aliasing old names; any brand action color becomes `color.action.primary`.
4. Restyle one representative screen as a sample and wait for review; then go screen by screen, one commit each.
5. Preserve routes, business logic, API contracts, form fields and validation, test ids, labels used by tests, accessibility attributes. Stacked tables restyle the same markup.
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first. Use semantic tokens and existing components; never hard-code colors, sizes, radii or shadows.
- Before adding a studio detail, count the ones on the screen against rule 10.
- Uncovered needs: compose from tokens, note it in `components.md`; conflicting requests (a brand hue, weight 700): present options.

## Verification

Check 1440px and 390px, light and dark, plus focus (Tab), hover, a submitted empty form, an open dialog and a toast. If you cannot render, check the code:
- Build and tests pass; no raw colors, sizes or radii outside the token files.
- 1440px: content starts at 40px in every app; lead to first content at most `space.64`.
- 390px: `scrollWidth` equals the viewport; global search not above the h1; every status and row action visible without sideways scrolling; scrolling tables show fade and hint; stat values share a baseline.
- Fields have explicit 32, 36 or 40px heights, hover, focus ring, disabled and the error message.
- Light: hatch visible on no-asset frames. Dark: off switch thumb visible; pinned objects on `color.surface.lifted`; bloom on `mn-wash-night`.
- Each note's arrow tip is within 12px of its named target; past chart bars at `opacity.chartRest`.
- Per screen: rule 10 limits, 1 primary per region, serif per the app list, mono per rule 7.
- Report files changed, what you could not apply, and decisions you made.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts and the filter SVG are one commit; reverting it last restores the previous look.
