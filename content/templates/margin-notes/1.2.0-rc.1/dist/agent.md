# Pigment Margin Notes 1.2.0-rc.1

Design system `margin-notes@1.2.0-rc.1`. Warm paper, near-black ink for every action, hairlines and a tightly tracked grotesk; the only color is a watercolor wash, tape and pencil notes kept to the margins. Suits products whose content carries the color.

This document is the complete design specification. Use the values and rules here instead of your own defaults. Where something is not specified, choose the option most consistent with the rules below and say so in your report. Token values are also provided as `tokens.css` and `tokens.json` next to this file — copy them, do not retype them. Each token's CSS variable is its path with dots replaced by dashes and camelCase split by dashes: `color.text.onAction` → `--color-text-on-action`.

## Character

An artist's studio as a calm product UI: warm paper, near-black ink for text and every action, hairlines, a
tightly tracked grotesk. The only chroma is an ink-blue watercolor wash bleeding in from the page edge; tape,
pencil notes and one serif italic word mark the margins.

Use `color.*`, `elevation.*`, `opacity.*` (themed) and the primitives, never `palette.*`.
`space.14` = 14px. `elevation.x` = `shadow.x` (dark: `shadow.xNight`).

## The ten rules that define this look

1. **Warm paper, never gray.** Page `color.surface.default`, cards and controls `color.surface.raised`, wells `color.surface.subtle`. Why: warmth (R > G > B) is the paper.
2. **Ink is the only action color.** Primary buttons, pressed chips, selection and focus use `color.action.primary` / `color.focus.ring` (paper in dark). One primary per region; `color.action.danger` is the only other filled button. A button-sized ink fill is always clickable; a state marker (it tags the current or selected item next to its name) is a neutral badge. Why: the ink button is the identity.
3. **One hue family, rationed.** Ink-blue only as info status, a third chart series and `color.decor.*`, never on links or controls. Why: rationing keeps the wash special.
4. **Hairlines before shadows.** Resting cards `elevation.rest`; `elevation.pinned` on at most 2 objects per screen plus overlays. Why: lift reads only when rare.
5. **Tight grotesk, three weights.** Sans 400, 500, 600 only; tracking tightens with size. Why: tracking, not weight, makes the voice.
6. **One serif italic word, inside a sans title.** Max 1 per screen, in a page h1 of 2 or more words on a home, index or collection screen, or in an editorial title; never on settings, form, checkout or record-detail screens. Why: one hand-set word is an accent.
7. **Mono for machine facts** (`font.family.mono`, `tabular-nums`): IDs, codes, versions, eyebrows, and numbers, dates and dimensions in table cells, spec rows, totals and chart labels (mixed cells: digits only). Sans: headings, table headers, labels, stat values, prices, relative times, numbers in sentences (a result count in a sentence). Why: machine voice versus human voice.
8. **Soft, nested corners; controls hold their height.** Inner radius = outer minus padding. Inputs, selects and search fields set `height` (`size.control`, toolbars `size.controlSm`), never shrinking in flex rows. Why: constant rhythm.
9. **Selection is paper on a tray; every control answers.** Segmented: a ringed `color.surface.selected` segment, lighter than its track in both themes; tabs: 2px ink underline; chips invert to ink. Every interactive element ships the Shared states. Why: selection is material, not tint.
10. **Studio marks live in the margins.** Per screen at most 1 bloom, 2 pencil notes, 2 taped items, 1 serif word; only at pauses (page header, empty state, pinned item); `aria-hidden`, static; never in data, forms, overlays or photos. Why: details mark moments, not data.

## Never

- Cool grays; gradients; weight 700; a whole heading in serif, or serif in body, controls, nav or numbers.
- A bloom with a straight edge, outside the h1 band, or empty paper reserved for it.
- Shadows on buttons, inputs, chips or rows; scale, bounce or parallax; skeleton shimmer.
- Emoji, clip-art, illustrated placeholders, filled or colored icons.
- Horizontal page scroll at 390px; a nav, status or row action pushed off-screen.
- A pencil arrow ending on empty paper; chart ink heavier than its numbers; hatch louder than text.
- Zebra stripes, colored table headers or section backgrounds; status by hue alone.
- A decorative layer that intercepts clicks on a native control.
- Browser-default chrome: blue search clear button, default select arrow, default focus glow.
- An h2, card title or lead repeating the h1 ("Orders" then "All orders").
- Success as a bare colored word; a marker shaped like a button; a card more than 30% empty.

## Color use

- Surfaces: `lifted` for pinned objects, dialogs, menus; `tray` for media placeholders only.
- Text: `primary` headings, labels, values; `body` prose, cells; `secondary` nav, hints; `tertiary` meta, placeholders, disabled.
- Links: `color.text.primary`, 1px underline, 3px offset; hover `color.action.primaryHover`.
- **Charts weigh less than their numbers.** Bars max 28px, gaps at least 1.5x the bar, top corners `radius.inner`; the emphasized mark (current or selected) is full `color.text.primary`, the others rest at `opacity.chartRest`, in any chart. Lines 1.5px `color.text.secondary`, current point a 6px ink dot. Labels mono caption `color.text.tertiary`. Max 4 `color.border.default` gridlines, no frame. More series: `color.text.tertiary`, `color.decor.bloomIndigo`.

## Typography

Headings `font.weight.semibold`, `text-wrap: balance`; the rest regular. Columns name `font.size.*`, `font.lineHeight.*`, `font.tracking.*`.

| Role | Size | Line height | Tracking |
| --- | --- | --- | --- |
| Page h1: home, index, overview, collection | `h1`, `clamp(38px, 5vw, 56px)` | `display` | `display` |
| Object h1: record detail (one item, person, order or article); settings | `h1Article`, `clamp(32px, 4vw, 44px)` | `heading` | `h1Article` |
| h2 / h3 | `h2` / `h3` | `title` | `h2` / `title` |
| Panel / card title | `panelTitle` / `cardTitle` | `card` | `title` |
| Lead / body | `lead` / `body` | `article` / `ui` (articles `article`) | 0 |
| UI: buttons, nav, inputs (primary, current: medium) | `ui` | `ui` | 0 |
| Small (chips, meta, cells) / caption | `small` / `caption` | `ui` | 0 (mono eyebrow: uppercase, `eyebrow`) |

One h1 per screen; an index page's table card has no title or a functional one ("{n} items"); a status badge follows the h1 inline. Lead max 560px, `space.16` below the h1. Article prose: 60 to 75 characters, max `size.article`; paragraphs `space.16` apart; h2 `space.48` above, `space.12` below; figures, code, quotes, tables, callouts `space.24` above and below.

## Spacing, shape and depth

- 4px base. Card inner gaps `space.12` to `space.16`; between blocks `space.56` to `space.64`; sections `space.96` (mobile `space.56`); before the footer `space.120`; dense data `space.32`.
- Page header: padding `space.64` top (`space.40` under `breakpoint.md`), `space.40` bottom, no min-height; lead to first content at most `space.64`.
- Radius: badge, segment, menu item `radius.inner`; controls `radius.control`; 48px controls, thumbnails `radius.controlLg`; callout, toast `radius.callout`; media, code, menu sheet `radius.media`; card, dialog `radius.panel`; chips, switch `radius.full`.
- Borders 1px; 2px only for focus, selected ring, active tab; 3px only for the callout bar.

## Motion

Color changes `motion.duration.fast`, `motion.easing.standard`; overlays fade with a 4px rise over `motion.duration.overlay`; hover never moves anything; reduced motion `motion.duration.instant`.

## Layout adaptation

- One container on every screen, header included: max `size.container`, gutter `space.40` (`space.16` under `breakpoint.md`): at 1440px content starts at 40px. Narrower content aligns left with the h1: prose max `size.article`; settings forms max 8 columns. Grid: 12 columns, `space.32` gaps from `breakpoint.lg`; 8 columns, `space.24` from `breakpoint.md`; 4 columns, `space.16` below.
- At 390px nothing scrolls sideways: `html, body { overflow-x: clip }`; grid and flex children get `min-width: 0`.
- Under `breakpoint.md`: nothing sits between breadcrumb or header and the h1 (search goes in the menu sheet); forms one column; filter chips scroll in their own strip.
- Cards size to content: card grids `align-items: start`; only a row of same-kind cards (catalog items, stats, pricing tiers) shares a height. A card spans only the columns its content fills: forms in a card use 2 field columns from `breakpoint.md` or the card shrinks to the form; spec rows and tables span the card.
- Article: table of contents as a right rail from `breakpoint.lg`; below, a closed `<details>` "On this page" after the meta line. Breadcrumbs get `space.16` below.
- Mobile primary action: a bar `position: fixed; left: 0; right: 0; bottom: 0`, never sticky inside a card, which reserves no space for it: `color.surface.bar`, `elevation.actionBar`, padding `space.12`, 52px buttons, `radius.callout`, 76px tall; the page adds `padding-bottom: calc(76px + var(--space-16))`.

## Imagery and icons

Icons: 1.5px stroke outlines, `size.icon` or `size.iconLg`, `color.text.secondary`. Photos untreated.

## Shared component states

Every interactive element, both themes:
- **Hover:** color changes only, `motion.duration.fast`.
- **Focus-visible:** `outline: 2px solid var(--color-focus-ring); outline-offset: 2px`, following the radius, never touching glyphs: nav links are padded boxes; inline text links add `padding: 0 2px; outline-offset: 3px`. Linked cards: `.card:has(a:focus-visible)`.
- **Disabled:** `color.surface.subtle` fill, `color.text.tertiary` text, no hover, `cursor: not-allowed`.
- **Loading:** same size; 14px `currentColor` spinner; `aria-busy`; skeletons `color.surface.subtle`.
- **Error:** border `color.status.danger`; at `space.6` below, replacing the hint: 16px alert icon plus message, `font.size.small`, `color.status.danger`; `aria-invalid`, `aria-describedby`. A submit with errors adds a danger callout at the form top ("2 fields need attention") and focuses the first invalid field.
- **Success:** a save or submit is confirmed by a toast; status text the product renders in place (a saved or sent confirmation) becomes a success badge with a 12px check, `space.12` after the form actions, `role="status"`.

## Studio details in a product

| Detail | Allowed | Per screen | Never |
| --- | --- | --- | --- |
| Bloom | Page header band of a home, index or collection screen; page-level empty state | 1 | Data, forms, checkout, dialogs |
| Tape | Pinned or featured item with `elevation.pinned` | 2 items, 2 strips each | Controls, rows, overlays |
| Pencil note | On a named target, from `breakpoint.lg` | 2 (default 1) | Sole carrier of information; form fields |
| Serif word | A page h1 of 2 or more words on a home, index or collection screen, or an editorial title | 1; a long-form article may add 1 serif pull-quote | Settings, form, checkout and record-detail screens |

Place them by screen moment, in any product. Each note's words restate its target in 2 to 4 words, never a new fact:
- **Home, index or collection screen** (an overview, a list, a catalog, a feed): bloom behind the page header; the serif word in the h1. The swash appears once per product, under the serif word of the top-level home header. Note `.note--beside` on the lead (`class="lead note-anchor"`, `width: fit-content`), summing it up, or on a period or scope phrase inside the lead (recipe).
- **Pinned or featured item** (a card the person pinned, an item the page features): tape (1 or 2 strips) plus `elevation.pinned`; it spans the columns its content needs, never a fixed span. If the screen has no lead note, the note `.note--beside` goes on this item, echoing its eyebrow.
- **Editorial title** (an article, story or announcement, in its list and on its own page): the serif word is allowed; record-detail rules otherwise.
- **Settings and form screens:** no bloom, serif or tape. If the screen has a section navigation list, one note `.note--below` on it, restating it; `--note-x: var(--space-16)` keeps it inside a narrow navigation column.
- **Record-detail, checkout and data-dense screens:** no details; the page-level empty state keeps its own.

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
      <feColorMatrix in="grain" type="matrix" values="0,0,0,0,0 0,0,0,0,0 0,0,0,0,0 -0.8,0,0,0,1.2" result="grainA"/>
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
      <feColorMatrix in="rimSoft" type="matrix" values="0.8,0,0,0,0 0,0.8,0,0,0 0,0,0.85,0,0 0,0,0,0.7,0" result="rimDense"/>
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

### Recipe: bloom

The band sizes to its content; the bloom fills its height at the top right, leaving only through the viewport's right edge. No ancestor sets `overflow: hidden`.

```html
<section class="bloom-band">  <!-- full-bleed -->
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

Empty state: wrapper `position: relative; padding-top: var(--space-56)`; the SVG 280 x 180px at `top: 0; right: -140px` behind the panel (`z-index: 1`); mobile 176 x 96px at `right: -16px`.

### Recipe: tape

First child of the pinned card (`position: relative`): `<span class="tape" aria-hidden="true"></span>`; a second strip adds `tape--alt`.

```css
.tape { position: absolute; z-index: 2; pointer-events: none; width: 88px; height: 24px; top: -12px; left: 24px;
  transform: rotate(-4deg); background: var(--color-decor-tape); box-shadow: var(--shadow-tape);
  clip-path: polygon(2% 0, 98% 5%, 100% 32%, 97% 62%, 100% 100%, 3% 95%, 0 68%, 2% 34%); }
.tape--alt { transform: rotate(5deg); left: auto; right: 24px; }
```

### Recipe: pencil note

Two to four words restating whatever the target says; never new facts (dates, counts, offers). The note is a child of its target or of a `.note-anchor` around it; the arrow tip (bottom-left; `--below`: top-left) lands 6 to 12px from the target. It overlaps no text, control or viewport edge (needs 220 x 48px free).

```html
<span class="note-anchor">{target phrase}<span class="note note--beside" aria-hidden="true"><svg viewBox="0 0 44 38" width="44" height="38"><path d="M42 3 C 28 3, 10 12, 3 35"/><path d="M0 27 L 3 36 L 10 30"/></svg><span>{2 to 4 words restating it}</span></span></span>
```

```css
.note-anchor { position: relative; }
.note { position: absolute; z-index: 1; display: flex; gap: 2px; white-space: nowrap; pointer-events: none;
  transform: rotate(-2deg); transform-origin: 0 100%; font: 400 var(--font-size-h3)/var(--font-line-height-hand) var(--font-family-hand);
  color: var(--color-decor-pencil); }
.note path { fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; }
.note--beside { left: calc(100% + 12px); bottom: 50%; }
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

Text at least 4.5:1; control boundaries and switch thumbs at least 3:1; touch targets at least `size.touch`.

## Semantic color tokens — light

| Token | Value |
| --- | --- |
| `color.surface.default` | `#faf9f6` |
| `color.surface.raised` | `#ffffff` |
| `color.surface.lifted` | `#ffffff` |
| `color.surface.subtle` | `#efede7` |
| `color.surface.selected` | `#ffffff` |
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
| `color.border.selected` | `#e0ddd5` |
| `color.action.primary` | `#0e0e0c` |
| `color.action.primaryHover` | `#2a2a27` |
| `color.action.primaryActive` | `#000000` |
| `color.action.danger` | `#c42b2b` |
| `color.action.dangerHover` | `#a52424` |
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
| `color.decor.hatch` | `#d4cfc4` |
| `color.code.bg` | `#0e0e0c` |
| `color.code.text` | `#e8e6e1` |
| `color.code.muted` | `#8b8983` |
| `color.code.string` | `#f0d9a8` |

## Semantic color tokens — dark

| Token | Value |
| --- | --- |
| `color.surface.default` | `#151410` |
| `color.surface.raised` | `#1d1c18` |
| `color.surface.lifted` | `#24231f` |
| `color.surface.subtle` | `#24231f` |
| `color.surface.selected` | `#38362f` |
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
| `color.border.selected` | `#8f8b81` |
| `color.action.primary` | `#f2efe8` |
| `color.action.primaryHover` | `#dcd8cf` |
| `color.action.primaryActive` | `#c9c4b9` |
| `color.action.danger` | `#f07a6e` |
| `color.action.dangerHover` | `#e8958a` |
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
| `color.decor.hatch` | `#3f3d37` |
| `color.code.bg` | `#0e0e0c` |
| `color.code.text` | `#e8e6e1` |
| `color.code.muted` | `#8b8983` |
| `color.code.string` | `#f0d9a8` |

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
| `shadow.pinned` | `0 1px 2px #0e0e0c0f, 0 24px 48px -24px #0e0e0c66, inset 0 0 0 1px #e6e4de` |
| `shadow.segment` | `0 1px 2px #0e0e0c1f` |
| `shadow.tape` | `0 1px 2px #0e0e0c1a` |
| `shadow.actionBar` | `0 -1px 0 #e6e4de, 0 -12px 24px -12px #0e0e0c2e` |
| `shadow.restNight` | `inset 0 0 0 1px #2e2d28` |
| `shadow.pinnedNight` | `0 1px 2px #00000080, 0 24px 48px -24px #000000cc, inset 0 1px 0 #f2efe80f, inset 0 0 0 1px #4a4840` |
| `shadow.segmentNight` | `0 1px 2px #00000080` |
| `shadow.actionBarNight` | `0 -1px 0 #2e2d28, 0 -12px 24px -12px #00000099` |

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

**Use.** Secondary for most actions; inline navigation is a text link.

**Anatomy.** Optional `size.icon` icon, gap `space.8`, `radius.control`, no shadow. Small `size.controlSm`, padding 0 `space.12`, `font.size.small`. Default `size.control`, padding 0 `space.16`, `font.size.ui`. Large `size.controlLg`, padding 0 `space.20`, `radius.controlLg`. Icon-only: square, `aria-label`.

**Variants.** Primary: `color.action.primary`, `color.text.onAction`, medium. Secondary: `color.surface.raised`, 1px `color.border.control`, `color.text.primary`. Ghost: `color.text.secondary`. Danger: `color.action.danger`, `color.text.onAction`, only to confirm a destructive action.

**States.** Hover: primary `color.action.primaryHover`, secondary border `color.border.strong`, ghost `color.text.primary` on `color.surface.subtle`, danger `color.action.dangerHover`. Active: primary `color.action.primaryActive`, secondary `color.surface.subtle`. Loading keeps the width.

**A11y.** Native `<button>`.

### Text field

**Use.** Single-line input, including search. Textarea: min height 96px, padding `space.10` `space.12`, vertical resize.

**Anatomy.** Label above (`font.size.small`, medium, `color.text.primary`), optional hint (`font.size.small`, `color.text.secondary`). Input height per rule 8, `box-sizing: border-box`, padding 0 `space.12`, `font.size.ui`, `radius.control`, `color.surface.raised`, 1px `color.border.control`, placeholder `color.text.tertiary`; in a flex row `flex: 1 1 240px; min-width: 0`. Gaps `space.6`; fields `space.20` apart.

**Search.** `input::-webkit-search-cancel-button, input::-webkit-search-decoration { -webkit-appearance: none }`. A clear control, if the app has one: 24px ghost icon button in the right padding (input `padding-right: space.32`), 16px x `color.text.secondary`, `aria-label="Clear search"`, only with a value.

**States.** Hover: border `color.border.strong`. Read-only: `color.surface.subtle`.

**A11y.** Visible `<label for>`, never placeholder-only.

### Select

**Use.** One of 5 or more options; 2 to 4 use the segmented control or radios.

**Anatomy.** Trigger as Text field with `appearance: none`, `padding-right: space.32` and a 16px chevron `color.text.secondary` at `space.12` from the right. Menu: `color.surface.lifted`, `radius.media`, `elevation.pinned`, padding `space.4`, max height 320px; options `size.controlMd`, padding 0 `space.10`, `radius.inner`.

**States.** Hover: trigger border `color.border.strong`; active option `color.surface.subtle`. Selected option: `font.weight.medium`, trailing check.

**A11y.** Prefer a native `<select>`; custom: `combobox` plus `listbox`.

### Checkbox

**Use.** Independent options and row selection; an immediate setting uses a switch.

**Anatomy.** The native input, with class `check`, is the visible 18px box, so it takes every click; nothing sits above it. Label `font.size.ui` at `space.10`; hit area at least `size.controlSm`; rows `space.12` apart. Existing markup with a drawn box: the input covers it (`position: absolute; inset: 0; opacity: 0; z-index: 1`), the box gets `pointer-events: none`.

```css
.check { appearance: none; box-sizing: border-box; margin: 0; flex: none; width: 18px; height: 18px;
  display: inline-grid; place-content: center; border: 1px solid var(--color-text-tertiary); border-radius: var(--radius-swatch);
  background: var(--color-surface-raised); cursor: pointer; }
.check[type="radio"] { border-radius: var(--radius-full); }
.check:is(:checked, :indeterminate) { background: var(--color-action-primary); border-color: var(--color-action-primary); }
.check[type="checkbox"]:checked::before { content: ""; width: 9px; height: 5px; border: solid var(--color-text-on-action);
  border-width: 0 0 1.5px 1.5px; transform: translateY(-1px) rotate(-45deg); }
.check:indeterminate::before { content: ""; width: 8px; height: 1.5px; background: var(--color-text-on-action); }
.check[type="radio"]:checked::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--color-text-on-action); }
```

**States.** Hover: border `color.text.secondary`. Error: border `color.status.danger`, group message below.

**A11y.** Groups use `<fieldset>` and `<legend>`.

### Switch

**Use.** A setting that applies immediately; settings that wait for Save use a checkbox.

**Anatomy.** The control itself is the track and takes every click: `<input type="checkbox" role="switch">` (or an existing `<button role="switch">`) with `appearance: none; box-sizing: border-box; margin: 0; padding: 0; position: relative`, 36 x 20px, `radius.full`, 1px `color.text.tertiary` border, `color.surface.subtle`. Thumb: its `::before`, 16px circle at `top: 1px; left: 1px`, `color.text.tertiary` (4.6:1 on the track); a thumb span gets `pointer-events: none`. Rows: label left, switch right, min height `size.touch`.

**States.** Hover: border and off thumb `color.text.secondary`. On (`:checked`, `[aria-checked="true"]`): track and border `color.action.primary`; thumb `translate: 16px 0` over `motion.duration.fast`, `color.text.onAction`, `elevation.segment`; never green. Loading: 10px spinner in the thumb; on failure revert and show a danger toast.

**A11y.** `aria-checked`; Space toggles; the visible label is the name.

### Tabs

**Use.** Sibling views of one object; filtering one dataset uses the segmented control.

**Anatomy.** Tab list over a 1px `color.border.default` line; tabs `size.touch` tall, `space.24` apart, `font.size.ui`; panel `space.24` below; overflow scrolls inside the list.

**States.** Default `color.text.secondary`; hover `color.text.primary`. Selected: `color.text.primary`, semibold, underline `inset 0 -2px 0` `color.action.primary`.

**A11y.** `tablist`, `tab` with `aria-selected`, `tabpanel`; Left and Right move.

### Segmented control

**Use.** 2 to 4 short modes of the same data.

**Anatomy.** Track `color.surface.subtle`, padding 3px, `radius.control`, height `size.control`. Segments `size.controlSm`, padding 0 `space.12`, `font.size.small`, `radius.inner`, `color.text.secondary`.

**States.** Hover `color.text.primary`. Selected: `color.surface.selected`, `box-shadow: var(--elevation-segment), inset 0 0 0 1px var(--color-border-selected)` (dark ring 4.6:1 on the track), `color.text.primary`, medium.

**A11y.** `radiogroup` of `radio`; Arrows move.

### Navigation

**Use.** Header for sections; sidebar from 6 sections.

**Anatomy.** Header `size.header` (mobile `size.headerMobile`), `color.surface.default`, 1px `color.border.default` bottom, the page container, never `overflow: hidden`. Product name as text (`font.size.lead`, semibold, `font.tracking.title`). Links `font.size.ui` `color.text.secondary`, each a `size.controlSm` box, padding 0 `space.8`, `radius.inner`, `space.8` apart; the focus outline follows the box. Search (`size.controlSm`) and one action at the right. Sidebar 220px: mono eyebrows, items `size.controlSm`, padding 0 `space.10`, `radius.inner`.

**Mobile.** More than 3 links: product name, at most 1 action, a `size.touch` menu button opening a sheet below the header (styled as the Select menu, rows `size.touch`, global search first at full width).

**States.** Hover `color.text.primary` (sidebar item also `color.surface.subtle`). Current: header link `color.text.primary`, medium, no pill or underline; sidebar item `color.surface.subtle`.

**A11y.** `<nav aria-label>`, `aria-current="page"`; menu button `aria-expanded`; Escape closes the sheet.

### Chip

**Use.** Toggleable filters in a row.

**Anatomy.** `size.controlMd`, padding 0 `space.14`, `radius.full`, `font.size.small`, `color.surface.raised`, 1px `color.border.control`; optional icon or mono count; `space.6` apart. A scrolling strip scrolls the selected chip into view on load (`scrollIntoView({ inline: "nearest" })`) and fades its edge over 24px while chips are off-screen.

**States.** Hover: border `color.border.strong`. Selected: `color.action.primary` fill, `color.text.onAction`, no border.

**A11y.** `<button aria-pressed>`.

### Card

**Use.** One object or widget.

**Anatomy.** Optional mono eyebrow, title (`font.size.cardTitle` or `panelTitle`), body, meta `font.size.small` `color.text.tertiary`, actions. Padding `space.24` (`space.20` under `breakpoint.md`), gap `space.12`, `radius.panel`; sized to content (Layout adaptation).

**Variants.** Rest: `color.surface.raised`, `elevation.rest`. Pinned: `color.surface.lifted`, `elevation.pinned`, may carry tape; spans grid columns, never a fixed width. Stat: one-line eyebrow (ellipsis, full text in `title`), value sans `clamp(28px, 3vw, 40px)` semibold, `font.tracking.h1Article`, delta `font.size.small` `color.text.secondary` with a 12px arrow.

**States.** Hover (linked card): ring `inset 0 0 0 1px` `color.text.tertiary` (pinned: after `elevation.pinned`), title underlined; no lift. Focus: on the card. Error: a danger callout inside.

**A11y.** One link on the title, stretched with a pseudo-element.

### Media frame

**Use.** Photos, screenshots and their placeholders.

**Anatomy.** `radius.media`, `color.surface.tray`, `elevation.rest` (featured: `elevation.pinned`). Default ratios by image kind: 4:3 object photos, 16:10 screenshots and interface captures, 3:2 cover and editorial images; 3:2 in any grid of 3 or more asset-less frames. Thumbnails 64px, `radius.controlLg`. Hatch over the tray: `repeating-linear-gradient(135deg, var(--color-decor-hatch) 0 1px, transparent 1px 10px)`, 1.15:1 to 1.35:1, quieter than any text.

**States.** No asset (same in every product): tray, hatch, one centered `size.iconLg` outline image icon `color.text.tertiary`. Loading: tray and hatch only. Error: a 20px image-off icon and a `font.size.small` caption. Selected thumbnail: `0 0 0 2px` `color.action.primary` ring.

**A11y.** Meaningful `alt` (empty when decorative); thumbnails are buttons with `aria-pressed`.

### Table

**Use.** Records compared by the same attributes. Key/value data: spec rows (180px key `color.text.secondary`, hairlines, `space.14` vertical padding; key above value on mobile).

**Anatomy.** Frame `color.surface.raised`, `elevation.rest`, `radius.panel`, clipped. Rows `size.row`, cells padding 0 `space.12`, `font.size.small`. Header sans caption, medium, `color.text.secondary`, hairline below. `table-layout: fixed` with `<col>` widths: numbers and dates sized to their longest value, status 120px, actions to their buttons, the primary column takes the rest, so filtering moves no column. Numbers right-aligned; row actions last, right-aligned.

**Mobile (under `breakpoint.md`): stack.** A table with a status or action column or more than 4 columns becomes one block per row. Keep the `<table>`, add `role` `table`/`rowgroup`/`row`/`columnheader`/`cell`, and a `data-label` per `<td>`. Columns become label/value pairs (max 6; never drop status, actions or the active sort key); sort chips list only shown keys.

```css
@media (max-width: 859px) {
  .table--stack thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  .table--stack, .table--stack :is(tbody, tr, td) { display: block; }
  .table--stack tr { padding: var(--space-14) var(--space-16); border-bottom: 1px solid var(--color-border-default); }
  .table--stack td { display: grid; grid-template-columns: minmax(96px, 38%) 1fr; gap: var(--space-12); padding: var(--space-4) 0; text-align: left; }
  .table--stack td:not(.cell-primary, .cell-actions)::before { content: attr(data-label); font-size: var(--font-size-caption); color: var(--color-text-tertiary); }
  .table--stack .cell-primary { display: block; font-size: var(--font-size-ui); font-weight: var(--font-weight-medium); padding-bottom: var(--space-6); }
  .table--stack .cell-actions { display: flex; gap: var(--space-8); padding-top: var(--space-12); }
  .table--stack .cell-actions > * { flex: 1; height: var(--size-touch); }
}
```

**Mobile: scroll.** Other tables scroll in `<div class="table-scroll" role="region" tabindex="0" aria-label="{name}, scrolls sideways">`, a column cut mid-cell. A script sets `data-overflow` and `data-at-end`; while content is off-screen the edge fades and a caption "Scroll sideways" hint sits right-aligned above.

```css
.table-scroll { overflow-x: auto; min-width: 0; }
.table-scroll[data-overflow]:not([data-at-end]) { mask-image: linear-gradient(to left, transparent, black 32px); }
```

**States.** Hover: `color.surface.subtle` at 50%. Selected: `color.surface.subtle` plus `inset 2px 0 0` `color.action.primary` on the first cell. Sorted header: `color.text.primary`, 12px arrow. Loading: 5 skeleton rows. Error: danger callout with retry. Empty: empty state without details. Focus: inset.

**A11y.** `<th scope>`; sortable headers are buttons with `aria-sort`.

### Badge

**Use.** Non-interactive status, version, count, category or marker.

**Anatomy.** 22px tall, padding 0 `space.8`, `font.size.caption`, `radius.full`, optional 6px dot or 12px icon at `space.6`, 1 to 2 words. After inline text: `margin-left: space.8; vertical-align: middle`.

**Variants.** Status: `color.status.{tone}Subtle` ground, `color.status.{tone}` text and dot. Neutral: `color.surface.subtle`, `color.text.secondary`; also markers, which tag the current or selected item next to its name. Count (max 1 per screen, e.g. unread items): `color.action.primary`, `color.text.onAction`. Version or ID: mono, `radius.inner`, 1px `color.border.strong`. A marker rendered as a `<button>` keeps the element, styled as this badge.

**A11y.** Counts get a hidden noun ("3 unread").

### Code block

**Use.** Code, commands, raw data. Inline code: mono `font.size.small` on `color.surface.subtle`, padding 0 `space.4`, `radius.swatch`.

**Anatomy.** Optional header (mono caption file name `color.code.muted`, copy button). Body mono `font.size.small`, `font.lineHeight.code`, padding `space.16` `space.20`, `radius.media`, scrolls inside itself.

**Colors.** `color.code.bg`, `color.code.text`, strings `color.code.string`, comments `color.code.muted`; dark theme adds a 1px `color.border.default` ring.

**States.** Copy button reads "Copied" for 2s. Focus on the dark ground: outline in `color.code.text`.

### Callout

**Use.** Inline message: info, success, warning, danger.

**Anatomy.** 16px icon, optional title (`font.size.ui`, semibold), body `font.size.small`, optional text action. Padding `space.14` `space.16`, gap `space.10`, `radius.callout`, ground `color.status.{tone}Subtle`, bar `inset 3px 0 0` and icon `color.status.{tone}`.

**States.** Static; dismissible ones get a ghost icon button (`aria-label="Dismiss"`).

**A11y.** Danger after an action: `role="alert"`.

### Empty state

**Use.** Nothing to show yet.

**Anatomy.** Panel max 480px at the content column's left edge under a left-aligned h1 (centered only without an h1). `color.surface.lifted`, `radius.panel`, `elevation.pinned`, padding `space.40` `space.32`, left-aligned. Title `font.size.h3` semibold; one `color.text.secondary` sentence on what will appear; one secondary button (primary if creating is the page's job) `space.24` below; gaps `space.12`.

**Details.** Page-level: 1 tape strip, the empty-state bloom and a `.note--beside` note on the button restating it ("add the first one"). Inside a table, widget, list or form: none, `color.surface.raised`, `elevation.rest`.

**States.** Failed to load: danger callout with retry.

### Dialog

**Use.** Confirm a consequential action or collect short input.

**Anatomy.** Centered on both axes at every width; never top-aligned or a bottom sheet. Native `<dialog>`: `position: fixed; inset: 0; margin: auto; height: fit-content; width: min(var(--size-dialog), 100vw - var(--space-32)); max-height: calc(100dvh - var(--space-64)); overflow: auto`, `::backdrop` `color.surface.overlay`; a custom scrim is fixed, `display: grid; place-items: center; padding: var(--space-16)`. Panel `color.surface.lifted`, `radius.panel`, `elevation.pinned`, padding `space.24`. Title `font.size.h3` semibold, body `space.8` below, actions `space.24` below: right-aligned, `space.8` apart, secondary then primary (mobile: full width, primary on top). Ghost close button top right. Destructive: danger primary.

**States.** The scrim only fades. Loading: primary loading, others disabled. Error: danger callout above the actions.

**A11y.** `role="dialog"` (`alertdialog` when destructive), `aria-modal`, `aria-labelledby`. Focus the least destructive control with its ring showing (`focus({ focusVisible: true })`); trap and return focus; Escape and a scrim click close it (not while loading).

### Toast

**Use.** Confirms every save or submit, or a non-blocking failure.

**Anatomy.** Ground `color.action.primary`, text and 16px icon `color.text.onAction`, `elevation.segment`, `radius.callout`, min height `size.controlLg`, padding `space.12` `space.16`, gap `space.10`, max width 420px, `font.size.ui`. Optional action: underlined medium text button. Fixed `space.24` from the bottom right; under `breakpoint.md` `space.16` from the sides, above the action bar. Max 3, `space.8` apart, newest at the bottom. Tones differ only by icon and wording.

**States.** Hover pauses dismissal. Focus: 2px `color.text.onAction` outline, 2px offset.

**A11y.** `role="status"` (`alert` for danger). Auto-dismiss after 5s unless it has an action; Escape dismisses.

## Setup notes for this system

- **Fonts** (OFL): Geist 400/500/600, Geist Mono 400/500, Instrument Serif 400 italic, Caveat 400; `font-display: swap`.
- **Theme:** dark follows `prefers-color-scheme` unless `[data-theme]` overrides it, both handled by `tokens.css`; a toggle only sets `data-theme`.
- **Root:** the filter SVG once; `html, body { overflow-x: clip }`; global `:focus-visible`. Body `color.surface.default`, `color.text.body`, `font.size.body`, `font.lineHeight.ui`, `font.family.sans`.

## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json`); never retype values.
3. Set up the root; build components with every state, then the studio details.
4. Create `design-system/` with `VERSION` (`margin-notes, updated <the spec's update date>`), the tokens and `components.md`: conventions and where each studio detail sits, by screen moment.
5. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, shared components, routes and tests.
2. Propose a migration plan and wait for approval.
3. Map the tokens onto existing variables, aliasing old names; a brand action color becomes `color.action.primary`.
4. Restyle one representative screen and wait for review; then go screen by screen, one commit each.
5. Preserve routes, business logic, API contracts, form fields and validation, test ids, text used by tests, accessibility attributes. Restyle existing markup; add classes, never replace elements.
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; use semantic tokens and existing components, never hard-coded values.
- Uncovered needs: compose from tokens, note it in `components.md`; conflicting requests (a brand hue): present options.

## Verification

Check 1440px and 390px, light and dark: Tab focus, hover, empty and successful submits of each form, an open dialog. If you cannot render, check the code:
- Build and tests pass; no raw colors, sizes or radii outside the token files.
- Click every checkbox, radio and switch with the mouse: it toggles.
- 1440px: content starts at 40px; lead to first content at most `space.64`; no half-empty card; filtering moves no column.
- 390px: `scrollWidth` equals the viewport; statuses and row actions visible; the action bar fixed, full width.
- Light: hatch quieter than text. Dark: selected segment ringed and lighter than its track; off switch thumb visible; bloom on `mn-wash-night`. Both: linked-card hover visible.
- Dialog centered with the initial focus ring; every success shown by a toast or success badge.
- Walk the ten rules and the Never list on every screen; note arrows land within 12px of their target.
- Report files changed, what you could not apply, and decisions you made.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts and the filter SVG are one commit; reverting it last restores the previous look.
