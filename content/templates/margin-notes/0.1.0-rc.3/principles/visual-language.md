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
