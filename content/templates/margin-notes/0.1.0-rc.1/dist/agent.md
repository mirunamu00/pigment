# Margin Notes 0.1.0-rc.1

Design system `margin-notes@0.1.0-rc.1`. Warm paper, near-black ink for every action, hairlines and a tightly tracked grotesk; the only color is a watercolor wash, tape and pencil notes kept to the margins. Suits products whose content should carry the color.

This document is the complete design specification. Use the values and rules here instead of your own defaults. Where something is not specified, choose the option most consistent with the rules below and say so in your report. Token values are also provided as `tokens.css` and `tokens.json` next to this file — copy them, do not retype them. Each token's CSS variable is its path with dots replaced by dashes and camelCase split by dashes: `color.text.onAction` → `--color-text-on-action`.

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

**Use.** One primary per view region (page header, card, dialog); secondary for the rest; inline navigation is a text link.

**Anatomy.** Optional `size.icon` leading icon, label, optional trailing arrow glyph; icon gap `space.8`; `radius.control`, no shadow. Small `size.controlSm`, padding 0 `space.12`, `font.size.small`. Default `size.control`, padding 0 `space.16`, `font.size.ui`. Large `size.controlLg`, padding 0 `space.20`, `font.size.body`, `radius.controlLg`. Icon-only: square, `aria-label`.

**Variants.** Primary: `color.action.primary` fill, `color.text.onAction`, `font.weight.medium`. Secondary: `color.action.secondary` fill, 1px `color.border.control`, `color.text.primary`. Ghost: no fill, `color.text.secondary`. Danger: `color.action.danger` fill, `color.text.onAction`, only to confirm a destructive action. Command: mono `font.size.small`, 44px, a `color.code.muted` "$" prefix.

**States.** Hover: primary `color.action.primaryHover`, secondary border `color.border.strong`, ghost `color.text.primary` on `color.surface.subtle`, danger `color.action.dangerHover`. Active: primary `color.action.primaryActive`, secondary `color.surface.subtle`; never scale. Loading: label kept, 14px spinner replaces the leading icon, width locked. Focus, disabled: shared.

**A11y.** Native `<button>`; Enter and Space.

**Do / Don't.** Do pair one ink primary with secondaries. Don't add a colored, gradient or shadowed button.

### Text field

**Use.** Single-line input. Textarea: same spec, min height 96px, padding `space.10` `space.12`, vertical resize.

**Anatomy.** Label above (`font.size.small`, `font.weight.medium`, `color.text.primary`), optional hint (`font.size.small`, `color.text.secondary`), input, message line. Input `size.control` (`size.controlSm` in toolbars), padding 0 `space.12`, `font.size.ui`, `radius.control`, `color.surface.raised` fill, 1px `color.border.control`, placeholder `color.text.tertiary`. Gaps `space.6`; stacked fields `space.20` apart. Optional leading icon (`color.text.tertiary`) or mono suffix for units.

**States.** Hover: border `color.border.strong`. Read-only: `color.surface.subtle` fill. Error: border `color.status.danger` plus the shared error message. Focus, disabled: shared.

**A11y.** Visible `<label for>` always, never placeholder-only. Messages via `aria-describedby`; errors set `aria-invalid="true"`; on submit, focus the first invalid field.

**Do / Don't.** Do validate on blur and on submit. Don't place any studio detail in a form.

### Select

**Use.** One of 5 or more options. For 2 to 4 options, use the segmented control or radios.

**Anatomy.** Trigger identical to the text field, plus a 16px chevron in `color.text.secondary`. Menu: `color.surface.raised`, `radius.media`, `elevation.pinned`, padding `space.4`, max height 320px; options `size.controlMd`, padding 0 `space.10`, `radius.inner`.

**States.** Hover: trigger border `color.border.strong`; option `color.surface.subtle`. Keyboard-active option: `color.surface.subtle`. Selected option: `font.weight.medium` plus a trailing 16px check. Menu enters like an overlay. Error, focus, disabled: shared.

**A11y.** Prefer a styled native `<select>`. Custom: `combobox` plus `listbox` roles; Arrows move, Enter selects, Escape closes and returns focus, typing jumps.

**Do / Don't.** Do keep the native element in forms. Don't tint the selected option with a hue.

### Checkbox

**Use.** Independent options and row selection. One immediate on/off setting uses a switch.

**Anatomy.** 18px box, `radius.swatch`, 1px `color.border.strong` on `color.surface.raised`; check or dash glyph at 1.5px stroke; label `font.size.ui` at `space.10`; optional description `font.size.small` `color.text.secondary`. Hit area at least `size.controlSm` (`size.touch` on touch). Rows `space.12` apart. Radio: same with `radius.full` and an 8px dot.

**States.** Hover: border `color.text.tertiary`. Selected and indeterminate: `color.action.primary` fill, glyph `color.text.onAction`. Error: border `color.status.danger`, group message below. Focus (ring around the box), disabled: shared.

**A11y.** Native input; Space toggles. Groups use `<fieldset>` and `<legend>`; indeterminate is exposed as mixed.

**Do / Don't.** Do let the whole label row toggle. Don't use a colored check fill.

### Switch

**Use.** A setting that applies immediately. Settings that wait for Save use a checkbox.

**Anatomy.** Track 36 x 20px, `radius.full`, `color.surface.subtle` with 1px `color.border.strong`; thumb 16px, 2px inset, `color.surface.raised`, `elevation.segment`. Settings rows: label left, switch right, min height `size.touch`, hairline dividers.

**States.** Hover: track border `color.text.tertiary`. On: track `color.action.primary`, no border; thumb slides 16px over `motion.duration.fast`. Loading: 10px spinner in the thumb until saved. Focus (ring around the track), disabled: shared.

**A11y.** `role="switch"` with `aria-checked`; Space toggles; the visible label is the name.

**Do / Don't.** Do revert and show an error toast if saving fails. Don't use a green track for on.

### Tabs

**Use.** Sibling views of one object. Filtering the same data in 2 to 4 ways uses the segmented control.

**Anatomy.** Tab list over a full-width 1px `color.border.default` line; tabs `size.touch` tall, `space.24` apart, `font.size.ui`, optional mono count in `font.size.caption` `color.text.tertiary`; panel `space.24` below. Overflow scrolls horizontally.

**States.** Default `color.text.secondary`. Hover `color.text.primary`. Selected: `color.text.primary`, `font.weight.semibold`, 2px underline as `inset 0 -2px 0` in `color.action.primary`; the underline does not slide. Focus (`radius.inner`), disabled: shared.

**A11y.** `tablist`, `tab` (`aria-selected`, `aria-controls`), `tabpanel`; Left and Right move and activate, Home and End jump.

**Do / Don't.** Do keep labels to 1 or 2 words. Don't use pill or boxed tabs.

### Segmented control

**Use.** 2 to 4 short modes of the same data (period, layout, theme).

**Anatomy.** Track `color.surface.subtle`, padding 3px (the one off-grid constant), `radius.control`, height `size.control`. Segments `size.controlSm`, padding 0 `space.12`, `font.size.small`, `radius.inner`, `color.text.secondary`.

**States.** Hover `color.text.primary`. Selected: `color.surface.raised` segment, `elevation.segment`, `color.text.primary`, `font.weight.medium`. Focus, disabled: shared.

**A11y.** `radiogroup` with `radio` items; Arrows move the selection.

**Do / Don't.** Do use it in toolbars and card headers. Don't fill the selected segment with ink or a hue.

### Navigation

**Use.** Header for sections; sidebar from 6 sections; footer (hairline top, `font.size.small` links) for the rest.

**Anatomy.** Header `size.header` (`size.headerMobile` under `breakpoint.md`), `color.surface.default`, 1px `color.border.default` bottom: product name as text (`font.size.lead`, `font.weight.semibold`, `font.tracking.title`; no logo is provided), links `font.size.ui` `color.text.secondary` `space.28` apart, one action at the right. Sidebar 220px: mono uppercase eyebrows (`font.size.caption`, `font.tracking.eyebrow`, `color.text.tertiary`), items `size.controlSm`, padding 0 `space.10`, `radius.inner`. Mobile: a two-line menu icon opens a sheet (`color.surface.raised`, `radius.media`, `elevation.pinned`, rows `size.touch`).

**States.** Hover `color.text.primary` (sidebar item also `color.surface.subtle`). Current: header link `color.text.primary` plus `font.weight.medium`, no pill or underline; sidebar item `color.surface.subtle`. Focus: shared.

**A11y.** `<nav aria-label>`, `aria-current="page"`; menu button `aria-expanded`; Escape closes the sheet.

**Do / Don't.** Do keep a single header action. Don't put a detail inside the header bar.

### Chip

**Use.** Toggleable filters in a row. Static labels use badges.

**Anatomy.** `size.controlMd`, padding 0 `space.14`, `radius.full`, `font.size.small`, `color.surface.raised`, 1px `color.border.control`; optional icon or mono count. Chips `space.6` apart; a 1px x 24px `color.border.default` divider between groups; the row scrolls horizontally under `breakpoint.md`.

**States.** Hover: border `color.border.strong`. Selected: `color.action.primary` fill, `color.text.onAction`, no border. Focus, disabled: shared.

**A11y.** `<button aria-pressed>`; a removable chip has a separate "Remove {name}" button.

**Do / Don't.** Do invert to ink when pressed. Don't tint a selected chip.

### Card

**Use.** One object or widget; many similar objects go in a table or gallery.

**Anatomy.** Optional mono eyebrow, title (`font.size.cardTitle` or `panelTitle`, `font.weight.semibold`, `font.tracking.title`), body `font.size.body` `color.text.body`, meta `font.size.small` `color.text.tertiary`, actions. Padding `space.24` (`space.20` under `breakpoint.md`), gap `space.12`, `radius.panel`.

**Variants.** Rest: `color.surface.raised`, `elevation.rest`. Pinned: `elevation.pinned`, may carry tape (max 2 per screen). Gallery item: a media frame, then text rows on the page ground, no container. Well: `color.surface.subtle`, no edge, for grouping inside a card.

**States.** Hover (only if the whole card is a link): edge `inset 0 0 0 1px` in `color.border.strong`, no lift. Loading: skeleton lines. Error: a danger callout inside; frame unchanged. Focus (follows `radius.panel`): shared.

**A11y.** Linked card: one real link on the title heading, stretched with a pseudo-element.

**Do / Don't.** Do let most cards rest on a hairline. Don't give every card a drop shadow.

### Media frame

**Use.** Product photos, screenshots, post images.

**Anatomy.** `radius.media`, `color.surface.tray` ground, `elevation.rest` (featured: `elevation.pinned`, counts toward the 2 lifted objects). Ratios 4:3 products, 16:10 screenshots, 3:2 posts. Optional label bottom-left at `space.10`: mono `font.size.label`, `color.text.onGlass` on `color.surface.glass`, padding `space.4` `space.8`, `radius.inner`. Thumbnails 64px, `radius.controlLg`, `space.8` apart.

**States.** Loading: hatch `repeating-linear-gradient(135deg, var(--color-border-default) 0 1px, transparent 1px 14px)` on the tray; no shimmer. Error: hatch plus a 20px image-off icon in `color.text.tertiary` and a caption. Selected thumbnail: `0 0 0 2px` ring in `color.action.primary`. Focus: shared.

**A11y.** Meaningful `alt`, or empty `alt` when decorative; thumbnails are buttons with `aria-pressed`.

**Do / Don't.** Do show photos untouched. Don't place tape or bloom over an image.

### Table

**Use.** Many records compared by the same attributes. Key/value data uses spec rows: 180px mono key, value, hairline between rows, `space.14` vertical padding.

**Anatomy.** Toolbar controls `size.controlSm`. Frame `color.surface.raised`, `elevation.rest`, `radius.panel`, clipped. Rows `size.row` (dense `size.rowCompact`), cells padding 0 `space.12`, `font.size.small` `color.text.body`. Header `font.size.caption`, `font.weight.medium`, `color.text.secondary`, hairline below. Row dividers `color.border.default`. Numbers, IDs, dates: mono, tabular, right-aligned. Selectable: a 40px checkbox column.

**States.** No zebra. Hover: `color-mix(in srgb, var(--color-surface-subtle) 50%, var(--color-surface-raised))`. Selected: `color.surface.subtle`, a 2px `color.action.primary` marker as `inset 2px 0 0` on the first cell. Loading: 5 skeleton rows. Error: a danger callout with retry replaces the rows. Empty: the empty-state component without details. Focus (inset): shared.

**A11y.** Native `<table>`, `<th scope>`; sortable headers are buttons with `aria-sort`.

**Do / Don't.** Do right-align numbers in mono. Don't put a detail or a colored header in or behind a table.

### Badge

**Use.** Non-interactive status, version, count or category. Filters use chips.

**Anatomy.** Height 22px, padding 0 `space.8`, `font.size.caption`, optional 6px dot or 12px icon at `space.6`, 1 to 2 words.

**Variants.** Status: `radius.full`, `color.status.{tone}Subtle` ground, `color.status.{tone}` text and dot. Neutral: `radius.full`, `color.surface.subtle`, `color.text.secondary`. Emphasis: `radius.full`, `color.action.primary`, `color.text.onAction`, max 1 per screen. Version or ID: mono, `radius.inner`, 1px `color.border.strong`, `color.text.secondary`, no fill. Unavailable: `radius.full`, 1px dashed `color.border.strong`, `color.text.tertiary`.

**States.** Static: no hover, focus or disabled.

**A11y.** The status word is the label; counts get a hidden noun ("3 unread").

**Do / Don't.** Do write the status as a word ("Paid"). Don't use saturated fills or a dot alone.

### Code block

**Use.** Code, commands, raw data. Inline code: mono `font.size.small` on `color.surface.subtle`, padding 0 `space.4`, `radius.swatch`.

**Anatomy.** Optional header (mono `font.size.caption` file name in `color.code.muted`, copy button). Body mono `font.size.small`, `font.lineHeight.code`, padding `space.16` `space.20`, `radius.media`, horizontal scroll.

**Variants.** Dark (default): `color.code.bg`, `color.code.text`, strings `color.code.string`, comments and prompt `color.code.muted`, 1px ring `color.code.ring`. Featured panel: plus `radius.codePanel` and `shadow.codePanel`, max 1 per screen. Light: `color.surface.inset`, `color.text.primary`, `elevation.rest`.

**States.** Copy: a ghost button in `color.code.text`; reads "Copied" for 2s. Focus on the dark ground: outline in `color.code.text`.

**Do / Don't.** Do limit syntax colors to the 4 code tokens. Don't use a rainbow theme.

### Callout

**Use.** An inline message for a section or form: info, success, warning, danger.

**Anatomy.** 16px icon, optional title (`font.size.ui`, `font.weight.semibold`), body `font.size.small` `color.text.body`, optional text action. Padding `space.14` `space.16`, gap `space.10`, `radius.callout`, ground `color.status.{tone}Subtle`, a 3px bar as `inset 3px 0 0` plus icon in `color.status.{tone}`. Info is the only functional use of the hue family.

**States.** Static; a dismiss ghost icon button (`aria-label="Dismiss"`) when dismissible.

**A11y.** Danger callouts that appear after an action use `role="alert"`; the title or first word names the tone.

**Do / Don't.** Do keep it to 1 to 3 lines. Don't stack 2 callouts in one section.

### Empty state

**Use.** Nothing to show yet; the main in-app place for details.

**Anatomy.** Centered panel, max 480px: `color.surface.raised`, `radius.panel`, `elevation.pinned`, padding `space.40` `space.32`. Optional mono eyebrow; title `font.size.h3` `font.weight.semibold`; one sentence `font.size.body` `color.text.secondary`; one secondary button (primary only if creating is the page's job) `space.24` below; gaps `space.12`.

**Details.** Page-level: 1 tape strip, the bloom behind the panel's top-right corner, optionally 1 pencil note at the button. Inside a table or widget: no details, `elevation.rest`.

**States.** Failed to load: a danger callout with retry, no details.

**Do / Don't.** Do say what will appear and how to start. Don't replace the text with an illustration or emoji.

### Dialog

**Use.** Confirm a consequential action or collect a short input. Long forms get a page.

**Anatomy.** Overlay `color.surface.overlay`; panel `color.surface.raised`, `radius.panel`, `elevation.pinned`, max width `size.dialog` (mobile: full width minus `space.32`), padding `space.24`. Title `font.size.h3`, `font.weight.semibold`; body `font.size.body` `color.text.body` at `space.8`; actions right-aligned (secondary, then primary) `space.24` below, `space.8` apart. Destructive: danger primary, title names the object.

**States.** Enter: fade plus 4px rise over `motion.duration.overlay`; exit: fade. Loading: primary in loading state, other actions disabled. Error: a danger callout above the actions, focused.

**A11y.** `role="dialog"` (`alertdialog` when destructive), `aria-modal`, `aria-labelledby`. Focus the least destructive control, trap it, return it on close; Escape closes unless busy.

**Do / Don't.** Do keep it to one decision. Don't put any detail in a dialog.

### Toast

**Use.** Confirms a finished action or a non-blocking failure.

**Anatomy.** Ground `color.action.primary`, text and 16px icon `color.text.onAction`, `elevation.segment`, `radius.callout`, min height `size.controlLg`, padding `space.12` `space.16`, gap `space.10`, max width 420px, `font.size.ui`. Bottom-right (mobile: bottom-center above the action bar), `space.8` apart, max 3.

**Variants.** Neutral, success, warning, danger, info differ only by icon shape (check, triangle, cross, info circle) and wording; the ground never changes color.

**States.** Enter: fade plus 4px rise, `motion.duration.overlay`. Hover pauses dismissal. Focus: 2px outline in `color.text.onAction`, 2px offset.

**A11y.** `role="status"` (`alert` for danger). Auto-dismiss after 5s unless it has an action; Escape dismisses.

**Do / Don't.** Do say what happened ("Invoice sent"). Don't color the toast by status.

## Setup notes for this system

- **Fonts** (all OFL): Geist 400/500/600, Geist Mono 400/500, Instrument Serif 400 italic only, Caveat 400. Use the `font.family.*` stacks (they include the CJK fallbacks), `font-display: swap`, no synthesized bold or italic.
- **Theme:** `tokens.css` handles light, dark via `prefers-color-scheme`, and `[data-theme]` on the root. A toggle only sets `data-theme`.
- **Filters:** render the shared filter SVG once in the root layout.
- **Studio details:** small `aria-hidden` components built from the recipes; enforce rule 10 and the placement table.
- **Base styles:** body `color.surface.default`, `color.text.body`, `font.size.body`, `font.lineHeight.ui`, `font.family.sans`; headings `color.text.primary`; global `:focus-visible` per Shared component states.

## New project

1. Inspect the framework, styling and component structure; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json` into the existing theme system). Do not retype values.
3. Load the fonts, base styles and filter SVG per the setup notes.
4. Build the components in list order with every specified state, then the studio-detail components.
5. Create `design-system/` with `VERSION` (`margin-notes@0.1.0-rc.1`), the tokens and a short `components.md` of your conventions, including where this product allows studio details.
6. Add one line to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, global styles, shared components, routes and tests; list what changes and what must be preserved.
2. Propose a migration plan, including which screens get studio details, and wait for approval.
3. Map the tokens onto existing variables, aliasing old names so nothing breaks mid-migration. Any brand color used for actions becomes `color.action.primary`.
4. Restyle one representative screen as a sample and wait for review.
5. Continue screen by screen, one commit each, adapting to the existing information structure.
6. Preserve routes, business logic, API contracts, form fields and validation, test ids, labels used by tests, accessibility attributes.
7. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` before building UI. Use semantic tokens and existing components; never hard-code colors, sizes, radii or shadows.
- Before adding a studio detail, count the ones already on the screen against rule 10.
- Uncovered needs: compose from existing tokens and note it in `design-system/components.md`.
- If a request conflicts with the system (a brand hue, weight 700, shadows on every card), present options instead of deciding silently.

## Verification

- The project builds and its tests pass.
- Every screen checked at 1440px and 390px, light and dark.
- Focus visible everywhere; contrast rules met; no raw color, size or radius values outside the token files.
- Per screen: detail limits from rule 10, at most 2 pinned shadows, 1 primary button per region, no detail inside data, forms or overlays.
- Interface color is only ink, paper and status; ink-blue only for info and decoration.
- Report files changed, anything you could not apply, and decisions you made yourself.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts and the filter SVG are one separate commit; reverting it after the screen commits restores the previous look.
