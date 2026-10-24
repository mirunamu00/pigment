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
