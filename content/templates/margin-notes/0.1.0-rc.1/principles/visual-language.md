## Character

An artist's studio rendered as a calm product UI: warm off-white paper, near-black ink for text and every
action, hairlines, and a tight grotesk with negative tracking. The interface withholds color; the only chroma is
an ink-blue watercolor wash bleeding in from the page edge, with masking tape, pencil notes and one serif italic
word as studio marks in the margins.

Components use `color.*`, `elevation.*`, `opacity.*` (they switch with the theme)
and the primitives; never `palette.*`. Spacing tokens are named by pixel value (`space.14` = 14px). Size tokens
(px): `size.container` 1360, `size.article` 720, `size.header` 72, `size.headerMobile` 60, `size.controlSm` 32,
`size.controlMd` 36, `size.control` 40, `size.controlLg` 48, `size.touch` 44, `size.row` 40, `size.rowCompact` 36,
`size.dialog` 560, `size.icon` 16, `size.iconLg` 20. `elevation.rest`, `elevation.pinned`, `elevation.segment`,
`elevation.actionBar` resolve to the `shadow.*` primitive of the same name (dark: the `…Night` variant).

## The ten rules that define this look

1. **Warm paper, never gray.** Page `color.surface.default`, cards and controls `color.surface.raised`, wells `color.surface.subtle`, trays `color.surface.tray`. Why: warmth (R > G > B) separates paper from a default gray UI.
2. **Ink is the only action color.** Primary buttons, pressed chips, selection marks, tab underlines and focus use `color.action.primary` / `color.focus.ring` (ink in light, paper in dark). One primary per region (page header, card, dialog); `color.action.danger` is the only other filled button. Why: the ink button is the identity.
3. **One hue family, rationed.** Ink-blue appears only as the info status and in decoration (`color.decor.*`); never on links, buttons, selection or chart highlights. Why: one rationed hue keeps the wash special.
4. **Hairlines before shadows.** Resting cards use `elevation.rest` (1px inset hairline). `elevation.pinned` goes on at most 2 lifted objects per screen, plus open overlays. Why: lifted paper reads only when little else is lifted.
5. **Tight grotesk, three weights.** Sans at 400, 500, 600 only; tracking tightens with size (see Typography). Body 15, UI 14, meta 13. Why: tracking, not weight, makes the voice.
6. **One serif italic word per page title.** `font.family.serif`, italic, 400, heading size, `font.tracking.title`. Why: one hand-set word is an accent; two is a font pairing.
7. **Mono for machine facts.** Versions, IDs, SKUs, table numbers, step numbers ("01"), code, uppercase eyebrows (`font.tracking.eyebrow`). Why: machine voice versus human voice.
8. **Soft, nested corners.** `radius.inner` 7, `radius.control` 9 (`controlLg` 10), `radius.media` 14, `radius.panel` 18, `radius.full` for chips and status; inner = outer minus padding. Why: concentric corners.
9. **Selection is paper on a tray.** Segmented control: `color.surface.raised` segment with `elevation.segment` on a `color.surface.subtle` track; tabs: 2px ink underline; chips invert to ink. Why: selection is shown by material, not a tint.
10. **Studio marks live in the margins.** Per screen at most 1 bloom, 2 pencil notes, 2 taped items, 1 serif word per title; only at moments of pause (page header, empty state, onboarding, pinned item); `aria-hidden`; never in data, forms, overlays, code or photos; never animated. Why: details mark moments, not data.

## Never

- Cool or pure grays, or any neutral not in the tokens.
- Gradients on surfaces, buttons or text (the bloom is the only soft color field; the media hatch the only pattern).
- Shadows on buttons, inputs, chips or rows.
- Scale, bounce, spring or parallax motion; skeleton shimmer.
- Emoji, clip-art, stock illustration, filled or colored icons.
- Weight 700; serif for body, buttons, labels, nav or numbers.
- Zebra stripes, colored table headers, colored section backgrounds.
- Square and pill controls mixed in one group.
- Status by hue alone: always pair it with an icon or a word.

## Color use

- Surfaces stack `color.surface.default` → `raised` → `subtle`. `color.surface.inset` for light code and recessed wells; `color.surface.tray` for media placeholders only, never under text.
- Text: `color.text.primary` headings, labels, values; `body` running text and cells; `secondary` nav, descriptions, hints; `tertiary` meta, placeholders (the lightest text allowed).
- Status colors only on badges, callouts, field errors, toast wording and status series in charts; tinted grounds use `color.status.*Subtle`.
- Charts: series `color.text.primary`, `color.text.secondary`, `color.decor.bloomIndigo`, `color.status.info`, in that order; gridlines `color.border.default`; beyond 4 series use small multiples.
- Text links: `color.text.primary`, 1px underline, 3px offset; hover `color.action.primaryHover`.

## Typography

Headings `font.weight.semibold`; the rest regular unless noted. Columns name `font.size.*`, `font.lineHeight.*`, `font.tracking.*`.

| Role | Size | Line height | Tracking |
| --- | --- | --- | --- |
| Display, max 1 per page | `display`, `clamp(40px, 5.5vw, 60px)` | `display` | `display` |
| Page h1 | `h1`, `clamp(38px, 5vw, 56px)` | `display` | `display` |
| Article h1 / section display | `h1Article` / `sectionDisplay` | `heading` | same name |
| h2 / h3 | `h2` / `h3` | `title` | `h2` / `title` |
| Panel / card title | `panelTitle` / `cardTitle` | `card` | `title` |
| Lead / body | `lead` / `body` | `article` / `ui` (articles `article`) | `normal` |
| UI: buttons, nav, inputs (primary, current: medium) | `ui` | `ui` | `normal` |
| Small (chips, meta, cells) / caption | `small` / `caption` | `ui` | `normal` |
| Eyebrow, mono uppercase | `caption` | `ui` | `eyebrow` |
| Code, mono | `small` | `code` | `normal` |
| Media label, mono | `label` | `label` | `normal` |

One h1 per screen. Article measure 60 to 75 characters, max `size.article`. Table numbers: mono, `tabular-nums`, right-aligned.

## Spacing, shape and depth

- 4px base, 2px half-steps inside controls. Card padding `space.24`, inner gaps `space.12` to `space.16`; between blocks `space.56` to `space.64`; between sections `space.96`; before the footer `space.120`. Under `breakpoint.md`: page top `space.40`, sections `space.56`, footer `space.72`, card padding `space.20`.
- Dense data screens (tables over 10 rows): rows `size.row` or `size.rowCompact`, section gaps `space.32`; nothing below `size.controlSm`.
- Radius by part: badge, segment, menu item, tooltip `radius.inner`; controls `radius.control`; 48px controls, thumbnails `radius.controlLg`; callout, toast `radius.callout`; media, code, menu sheet `radius.media`; card, dialog `radius.panel`; chips, pills, switch `radius.full`.
- Borders 1px; 2px only for focus, selected ring, active tab; 3px only for the callout bar.

## Motion

Color, border and background changes: `motion.duration.fast`, `motion.easing.standard`. Overlays (dialog, menu, toast) fade in with a 4px rise over `motion.duration.overlay` and fade out. Hover never moves or grows anything. Under `prefers-reduced-motion: reduce` every duration is `motion.duration.instant`.

## Layout adaptation

- Container max `size.container`, gutter `space.40` (`space.16` under `breakpoint.md`). Grid: 12 columns, `space.32` gaps from `breakpoint.lg`; 8 columns, `space.24` gaps from `breakpoint.md`; 4 columns, `space.16` gaps below.
- Narrow screens: content first; the page's primary action moves to a sticky bottom bar (`color.surface.bar`, `elevation.actionBar`, 52px buttons, `radius.callout`); filters become a scrolling chip row; secondary actions a 2-column grid of `size.touch` buttons. Pencil notes hide; the bloom shrinks to 360px.

## Imagery and icons

Icons: 1.5px stroke outlines, `size.icon` or `size.iconLg`, round caps and joins, `color.text.secondary` at rest, `color.text.primary` active; an ISC or MIT outline set fits. Photos sit untreated in media frames. No illustration beyond the studio details.

## Shared component states

Apply unless a spec says otherwise:
- **Hover:** color changes only, over `motion.duration.fast`.
- **Focus-visible:** `outline: 2px solid` `color.focus.ring`, `outline-offset: 2px`, following the element's radius.
- **Disabled:** `color.action.disabled` fill, `color.text.disabled` text, border unchanged, no hover, `cursor: not-allowed`; use focusable `aria-disabled="true"` when the reason needs explaining.
- **Loading:** keep size and label; 14px spinner in `currentColor`; `aria-busy="true"`. Placeholders are `color.surface.subtle` bars, `radius.inner`, no shimmer.
- **Error:** `color.status.danger` border; message `font.size.small` in `color.status.danger` with a 16px alert icon, `space.6` below.

## Studio details in a product

Details appear where a person pauses (arrival, emptiness, first run, something pinned), never where they work.

| Detail | Allowed in | Frequency | Never in |
| --- | --- | --- | --- |
| Bloom | Behind a page header, hero or empty state; 40 to 60% off the right or top edge | 1 per screen; none on dense data screens, editors, checkout | Behind body or secondary text, tables, forms, charts, dialogs, photos |
| Tape | A pinned or featured item with `elevation.pinned` | 2 strips per item, 2 taped items per screen | Buttons, inputs, rows, toasts, dialogs; as a status |
| Pencil note | Onboarding, first-run tips, empty states, explainers | 2 per screen; dismissed after first use in app chrome; hidden under `breakpoint.md` | Sole carrier of information; validation; settings forms |
| Serif word | Page title | 1 per title; optional footer sign-off; blogs: 1 serif pull-quote per article | Body, buttons, nav, labels, headers, numbers |
| Swash | Under the serif word of a landing hero or welcome screen | 1 per surface family | App chrome, repeated titles |
| Pinned shadow | Featured objects, dialogs, menus | 2 lifted objects per screen, plus overlays | Every card |

- **Dashboard:** bloom behind the overview header or an empty widget; tape on user-pinned cards; serif word in the overview title only; tables and charts stay plain.
- **Store:** bloom behind the collection header; tape on up to 2 featured product cards, never over photos; no details in cart or checkout.
- **Blog:** serif word in article titles, one optional pull-quote, bloom behind the masthead, tape on a pinned post.
- **Settings:** no tape; bloom only on an empty state; notes only as a first-visit hint.

Only an h1 or display heading may overlap the bloom.

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
    <filter id="mn-swash" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="5" result="warp"/>
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="12" xChannelSelector="R" yChannelSelector="G" result="shape"/>
      <feGaussianBlur in="shape" stdDeviation="0.6" result="soft"/>
      <feMorphology in="soft" operator="erode" radius="2" result="inner"/>
      <feComposite in="soft" in2="inner" operator="out" result="rim"/>
      <feComponentTransfer in="soft" result="wash"><feFuncA type="linear" slope="0.62"/></feComponentTransfer>
      <feMerge><feMergeNode in="wash"/><feMergeNode in="rim"/></feMerge>
    </filter>
  </defs>
</svg>
```

### Recipe: bloom

Inside the header or empty-state section (`position: relative; overflow: hidden`), content at `z-index: 1`. Mobile: 360 x 288px, `top: -60px; right: -140px`. `opacity.bloom` is 0.42 light, 0.22 dark; `opacity.swash` 0.32 light, 0.2 dark.

```html
<svg aria-hidden="true" viewBox="0 0 700 560"
     style="position:absolute; top:-120px; right:-280px; width:700px; height:560px; z-index:0; pointer-events:none; overflow:visible">
  <g filter="url(#mn-wash)" style="opacity: var(--opacity-bloom)">
    <ellipse cx="370" cy="290" rx="260" ry="190" fill="var(--color-decor-bloom-indigo)"/>
    <ellipse cx="250" cy="200" rx="150" ry="118" fill="var(--color-decor-bloom-blue)" opacity="0.7"/>
    <ellipse cx="490" cy="400" rx="120" ry="88" fill="var(--color-decor-bloom-violet)" opacity="0.55"/>
    <circle cx="96" cy="480" r="18" fill="var(--color-decor-bloom-indigo)"/>
    <circle cx="610" cy="110" r="10" fill="var(--color-decor-bloom-blue)"/>
  </g>
</svg>
```

### Recipe: tape

First child of the pinned card (`position: relative`): `<span class="tape" aria-hidden="true"></span>`. Width 72 to 96px, rotation within ±6 degrees.

```css
.tape { position: absolute; z-index: 2; pointer-events: none; width: 88px; height: 24px; top: -12px; left: 24px;
  transform: rotate(-4deg); background: var(--color-decor-tape); box-shadow: var(--shadow-tape);
  clip-path: polygon(2% 0, 98% 5%, 100% 32%, 97% 62%, 100% 100%, 3% 95%, 0 68%, 2% 34%); }
.tape--alt { transform: rotate(5deg); left: auto; right: 24px;
  clip-path: polygon(0 6%, 97% 0, 100% 40%, 98% 72%, 100% 96%, 2% 100%, 0 64%, 3% 30%); }
```

### Recipe: pencil note

The arrow below points down-left; for up-right use viewBox `0 0 60 50`, paths `M6 44 C 20 40, 40 30, 44 6` and `M37 13 L 44 4 L 50 14`. The hint must also exist as real text nearby.

```html
<div class="note" aria-hidden="true"><span>two to six words</span>
  <svg viewBox="0 0 70 60" width="44" height="38"><path d="M64 8 C 40 6, 18 22, 14 52"/><path d="M7 43 L 14 53 L 21 44"/></svg></div>
```

```css
.note { position: absolute; display: flex; gap: 4px; pointer-events: none; transform: rotate(-2deg);
  font-family: var(--font-family-hand); font-size: var(--font-size-h3); line-height: var(--font-line-height-hand);
  color: var(--color-decor-note); }
.note path { fill: none; stroke: var(--color-decor-pencil); stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }
@media (max-width: 859px) { .note { display: none; } }
```

### Recipe: serif word and swash

Example words are placeholders.

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

Text at least 4.5:1; `color.text.primary` on `color.surface.default` at least 7:1. Touch targets at least `size.touch`. Dark mode ("night paper", derived) follows `prefers-color-scheme` unless the root has `data-theme="light"`; `data-theme="dark"` forces it.
