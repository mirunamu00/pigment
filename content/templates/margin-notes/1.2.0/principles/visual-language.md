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
