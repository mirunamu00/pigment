# pigment-study

Reference: our own platform site, captured 2026-10-12 at `http://localhost:3100` (5 pages, desktop 1440 and
mobile 390, light only). Evidence keys: `S:` = `reference/styles.json` path, `shot:` = `reference/screenshots/`,
`crop:` = `reference/components/`, `src:` = `apps/web/src/...`. Contrast ratios are computed with WCAG 2.x
relative luminance.

**Noise excluded throughout:** the detail page (`shot: p2-*`) shows the *fixture* system's swatches and type
samples (Inter, blue `#1f55e0`, `#1a45b8`, `#2f6bff`, `#1d5fbf`, green `#167a3e`, amber `#8a5300`, grays
`#18181b`/`#55555e`/`#c4c4ca`/`#dedee2`/`#f7f7f8`). They are content on display, not this design, and appear in no
role below. `rgb(247,247,248)` at 4.18% of area in `S: backgroundArea` is the fixture's screenshot background
fed through `--shot-bg`.

## Character

An artist's studio rendered as a calm product UI: warm off-white paper, near-black ink for text and every
action, hairline borders, and a tight grotesk with negative tracking. Color is withheld from the interface
itself; the only chroma is an ink-blue watercolor wash that bleeds in from the page edge, with masking tape,
pencil notes and one serif italic word acting as studio marks at the margins. The working area stays strictly
quiet and monochrome so whatever content sits on it carries the color.

Keywords: ink-and-paper, warm-neutral, monochrome-action, hairline, serif-accent, watercolor-wash,
margin-notes, studio. Tone tag: **editorial**.

What you would lose by changing one thing:
- Give the primary button a hue and it becomes a generic SaaS kit; the ink button *is* the brand (`crop: p1-light-button-1.png`).
- Cool the neutrals to gray and the paper reads as a default; the warmth is in 3-6 units of R>G>B.
- Move the bloom into the content column and it turns into a stock "blob" background (`src: components/details.tsx` header: "one bloom per screen, tape only on pinned things, at most two pencil notes per screen").

## Color

Measured roles (light). Area shares from `S: backgroundArea`, `S: textColor`, `S: borderColor`; names from `S: cssVariables`.

| Role | Hex | Evidence | Contrast |
| --- | --- | --- | --- |
| surface.default (paper) | `#faf9f6` | 71.58% of bg area; `--paper`; `src: app/globals.css` body | - |
| surface.raised (panel, control) | `#ffffff` | 11.29%; `--surface` | - |
| surface.subtle (well) | `#efede7` | `--well`; segmented track (`crop: p1-light-badge-1.png`), docs nav current | ink 16.51:1 |
| surface.inset (light code, tray well) | `#f4f2ec` | 3.72%; `--tin-well`; `shot: p3-desktop-light.png` | ink 17.26:1 |
| surface.tray (tin, media placeholder) | `#e9e6df` | 2.68%; `--tin` | ink 15.50:1 |
| text.primary / action.primary / focus.ring (ink) | `#0e0e0c` | 40.32% of text; 4.53% of bg (buttons, code); `--ink` | 18.35:1 on paper |
| text.body (ink-2) | `#3d3d39` | 26.96% of text; article body | 10.36:1 |
| text.secondary (ink-3) | `#5a5a55` | 9.98%; nav links, muted | 6.59:1 |
| text.tertiary (ink-4) | `#6b6b66` | 12.51%; meta, step numbers, pencil strokes | 5.09:1 |
| text.onAction | `#faf9f6` | `--on-ink` | 18.35:1 on ink |
| action.primaryHover | `#2a2a27` | `src: globals.css .btn--primary:hover` (raw, off-token) | 13.67:1 vs paper |
| border.default (hairline) | `#e6e4de` | 53.46% of borders; `--line`; `--shadow-rest` | 1.21:1 (decorative) |
| border.control | `#e0ddd5` | `--line-2`; button/chip/input | - |
| border.strong | `#d6d3cb` | `--line-3`; hover outline, version badge | 1.42:1 |
| status.success | `#11713a` | `--ok`; `.status-pill--specified` | 5.79:1; 5.26:1 on `#e3f2e8` |
| status.danger | `#c42b2b` | `--err` | 5.35:1; 5.63:1 on white |
| status.info | `#1849f2` | `--bloom-blue` as the callout bar (`src: app/pages.css .callout`, `shot: p4-desktop-light.png`) | 6.09:1; 5.68:1 on `#eef1fb` |
| status.infoSubtle | `#eef1fb` | `.callout` background; 0.48% of area | - |
| decor.bloom indigo / blue / violet | `#1e2a6b` / `#1849f2` / `#3a2f7a` | `--bloom-indigo`, `--bloom-blue`, `src: components/details.tsx` Bloom (group opacity 0.42) | decorative |
| decor.tape | `#eee6d0` @ 86% | `--tape` | decorative |
| code bg / text / muted / string | `#0e0e0c` / `#e8e6e1` / `#8b8983` / `#f0d9a8` | `--code-*`; `S: textColor` 7.55% and 0.65% | - |

**Derived (not on the site), flagged:** status.warning `#8b5d0f` (ochre in the ink family, 5.43:1 on paper;
4.88:1 on its tint `#f6ecd9`), status.dangerSubtle `#f9e6e3` (danger text 4.68:1 on it). The amber
`rgb(138,83,0)` in `S: backgroundArea` belongs to the fixture and was deliberately not used.

Off-token raw values found in source: `#2a2a27` (primary hover, code-panel divider), `#eeece6` (tool and package
dividers, `S: borderColor` 7.45%), `#9a9892` (code-panel tab text, 2.74:1, decorative only), `#7be3ae`
(screenshot-label dot). The template folds `#eeece6` into border.default and drops the mint dot.

**Strategy.** No brand color. Ink is the only action color: primary button, pressed chip, selected thumbnail
ring, active tab underline and focus outline are all `#0e0e0c` (`crop: p1-light-button-focus.png`,
`p3-light-tab-1.png`). The single chromatic family is ink-blue/indigo; it appears decoratively (bloom, swash)
and in exactly one functional role, the info callout. Status colors are deep, desaturated and all pass 4.5:1 on
paper, white and their own tints.

## Typography

Families (`S: fontFamily`, `S: fontsLoaded`, `src: app/layout.tsx`): Geist 61.6% (sans: UI, headings, body),
Geist Mono 35.5% across two stacks (code, versions, eyebrows, step numbers), Instrument Serif 400 *italic only*
1.5% (one accent word per title, footer sign-off), Caveat 400 0.6% (pencil notes). Inter 0.8% is fixture noise.
All four are SIL OFL 1.1 and are kept.

Weights (`S: fontWeight`): 400 90.5%, 600 5.4%, 500 4.1%. No 700 anywhere.

Scale (from `S: fontSize`, `S: lineHeight`, `S: letterSpacing`, confirmed against `src: app/pages.css`):

| Role | Size | Line height | Weight | Tracking |
| --- | --- | --- | --- | --- |
| display (hero, clamp 40-60) | 60 | 1.0 | 600 | -0.045em |
| h1 page (clamp 38-56) | 56 | 1.0 | 600 | -0.045em |
| h1 article | 44 | 1.05 | 600 | -0.04em |
| section display | 40 | 1.05 | 600 | -0.035em |
| h2 article | 26 | 1.2* | 600 | -0.025em |
| h2 section / empty-state title | 22-24 | 1.2* | 600 | -0.02em |
| panel title | 20 | 1.3 | 600 | -0.02em |
| card title | 19 | 1.3 | 600 | -0.02em |
| lead | 17 | 1.65 | 400 | normal |
| body | 15 | 1.55 (article 1.65) | 400 | normal |
| ui (buttons, nav, inputs) | 14 | 1.55 | 400 (primary/current 500) | normal |
| small (chips, meta, footer) | 13 | 1.55 | 400 | normal |
| caption | 12 (12.5 measured) | 1.55 | 400 | normal |
| code | 13 mono | 1.8 | 400 | normal |
| eyebrow | 12 mono uppercase | 1.55 | 400 | +0.08em |
| media label | 11-11.5 mono | 1.4 | 400 | normal |
| serif accent | inherits heading | inherits | 400 italic | -0.02em |
| hand note | 22 Caveat | 1.1 | 400 | normal |

\* Measured h2 line heights are inconsistent (22px/24.2px = 1.1 and 26px/40.3px = 1.55 inherited); the template
standardizes 1.2. Tracking tightens with size: about -0.02em at 19-26px, -0.035 to -0.04em at 40-44px, -0.045em at
56-60px. Ratio: the UI band runs 12-13-14-15-17 (roughly 1.1), headings 19-22-26-(30)-40-44-56 (roughly 1.18); the
template names it a minor-third-ish 1.18 heading scale over a 15px body. Half-pixel sizes (11.5, 12.5, 13.5) are
rounded to 11/12/13 or 14.

## Spacing and layout

`S: spacing` top values: 8 (13.8%), 10 (13.5%), 12 (11.9%), 16 (7.6%), 2 (6.8%), 14 (5.9%), 24, 3, 20, 6.
**Base 4px with 2px half-steps** inside controls (10 and 14 are frequent and kept). Scale: 2, 4, 6, 8, 10, 12,
14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 72, 96, 120. Odd values (3, 5, 7, 9, 13, 15, 18, 22) are
component-internal and rounded, except the 3px segmented-track padding, kept as a component constant.

Rhythm: card internals 18-24px; between blocks 56-64; detail sections 96 (`.detail-main gap`); home sections and
footer offset 120-128, rounded to 120. Mobile roughly halves: 36 page top, 56 section gap, 72 footer offset.

Layout (`S: cssVariables --page-max 1360px, --gutter 40px`; `S: mediaQueries (max-width: 860px)`): one container,
max 1360 with 40px gutters (16 under 860). Header 72px (60 mobile). Gallery grid `minmax(520px,1fr)`, gaps
56/32. Detail: main + 360px aside. Docs: 220 sidebar + 720 article + 200 TOC; sidebars hidden on mobile. Mobile
adds horizontally scrolling chips, 2-column 44px action grids and a sticky bottom action bar
(`shot: p2-mobile-light.png`). Density: **regular** (compact 32-40px controls, airy section spacing).

## Shape and depth

Radii (`S: radius`): 7 (18.7%), 9 (17.0%), 14 (16.3%), 999 (13.8%), 8 (10.0%), 10 (9.0%), 18 (5.5%), 5, 12, 16,
20. Named: `--r-seg 7`, `--r-ctl 10`, `--r-shot 14`, `--r-panel 18`. Set for the template: **5 swatch, 7 inner
segment and badge, 9-10 control, 12 callout, 14 media and code, 18 panel, 20 tray, pill for chips and status**.
8 is a stray, folded into 7. Nesting rule from source: inner = outer minus padding (10 track, 3 padding, 7
segment). Corners tag: **soft**.

Borders: 1px (79.5% of `S: borderWidth`); 2px only for focus outline, selected-thumbnail ring and active-tab
underline. Hairlines are often drawn as inset shadows (`--shadow-rest`).

Elevation is mostly tone and hairline, with one theatrical shadow (`S: shadow`, `src: app/globals.css`):

- rest: `inset 0 0 0 1px #e6e4de`, no drop
- pinned: `0 1px 2px rgba(14,14,12,.06), 0 24px 48px -24px rgba(14,14,12,.40)` + hairline. A long, soft, low
  shadow that reads as paper lifted off the desk. Used on the media frame, featured panel, empty state and menu
  sheet (`shot: p3-desktop-light.png` "Remote server" vs. the two rest panels below it)
- segment selected: `0 1px 2px rgba(14,14,12,.12)`
- code panel: `0 30px 60px -24px rgba(14,14,12,.5)`, the heaviest
- tray bevel `inset 0 1px 0 rgba(255,255,255,.6), inset 0 -1px 0 rgba(14,14,12,.06)`; recessed well `inset 0 2px 4px rgba(14,14,12,.08)`

## Motion

**Measured: none.** `S: transition` is empty; the only motion rule is `prefers-reduced-motion: reduce`, which
kills all transitions (`src: globals.css`). Hover is an instant color swap. **Derived:** 120ms for
color/border/background, 180ms for overlays (fade plus 4px translate), easing `cubic-bezier(0.2,0,0,1)`, no
scale, bounce or parallax; studio details never animate; 0ms under reduced motion.

## Components

Every crop in `reference/components/` was reviewed. Characteristic anatomy:

- **Header / nav** (`crop: p1-light-nav-1.png`, `p4-light-nav-2.png`): 72px, hairline bottom; 14px ink-3 links with a 28px gap; current = ink + 500, with no pill or underline; one action at the right. Mobile: hamburger opens a white sheet (14 radius, pinned shadow).
- **Button** (`crop: p1-light-button-1.png`, `p2-light-button-1/2.png`): 40px, 0 16px padding, 9px radius, 14px. Secondary = white with a `#e0ddd5` border, hover `#d6d3cb`. Primary = ink fill, paper text, 500, hover `#2a2a27`. Large 48/20/10 radius/15px. Command variant: mono 13px with a muted `$`.
- **Filter chip** (`crop: p1-light-button-hover.png`, `p1-light-button-focus.png`): 36px pill, white with a hairline; pressed inverts to ink. Focus = 2px ink outline, 2px offset.
- **Segmented control** (`crop: p1-light-badge-1.png`, `p2-light-button-focus.png`): well track, 3px padding; the selected segment is a white chip with a 1px-2px shadow, like a slip of paper on the tray.
- **Line tabs** (`crop: p3-light-tab-1.png`): 44px, ink-3 text; selected = ink 600 plus a 2px ink underline over a full-width hairline.
- **Badges** (`crop: p3-light-badge-1.png`, `p2-light-badge-2.png`): mono version badge (7 radius, strong border); dark ink pill for a single emphasis; status pill on well (success tint `#e3f2e8`); dashed pill for "unavailable".
- **Panel / card** (`shot: p3-desktop-light.png`, `crop: p1-light-card-1.png`): white, 18 radius, 24 padding, hairline at rest; the pinned variant gets the long shadow and may carry tape. Gallery cards are unframed: a media frame, then text rows on paper.
- **Media frame**: 14 radius, tray color with a 135deg 1px hatch every 14px; a mono label on 78% ink glass; thumbnails selected by a 2px ink ring.
- **Code block / panel** (`shot: p1-desktop-light.png`, `p4-desktop-light.png`): ink background, mono 13/1.8, warm string color `#f0d9a8`; the light variant is on `#f4f2ec`.
- **Callout** (`shot: p4-desktop-light.png`): 12 radius, `#eef1fb` with a 3px ink-blue bar. The one functional blue.
- **Numbered steps, spec rows**: mono "01" numbers in ink-4, rows split by hairlines with 14-22px padding. Spec rows (180px mono key + value) are the site's only table-like structure (`shot: p2-desktop-light.png`).
- **Docs sidebar / TOC**: mono uppercase eyebrows; current item on well with 7 radius.
- **Tray (tin)**: a warm bevelled tray with recessed wells that groups samples like a paint box (structure only; the swatches in it are fixture content).
- **Empty state** (`shot: p5-desktop-light.png`): centered pinned white panel, one tape strip, 24px/600 title, one secondary button, bloom off-center behind.
- **Footer**: hairline top, serif italic sign-off left, 13px links right. **Mobile action bar**: paper at 94%, 52px buttons, 12 radius.
- **Text input**: CSS only (`.input`: 40px, 9 radius, `#e0ddd5` border). No states captured.

States captured: default, hover (chips), focus-visible (chips, segments), selected/pressed. Not captured:
active, disabled, loading, error.

## Imagery and icons

- Icons: almost none (glyph arrows, a two-line hamburger, a 6px dot). Derived: 1.5px outline, 16/20px, round caps, ink-3 default and ink when active, never filled or colored (Lucide, ISC, fits the 1.4px pencil arrows).
- Illustration: only the procedural studio details (`src: components/details.tsx`). **Bloom**: turbulence-displaced indigo/blue/violet pools at 0.42 opacity with a darker pigment rim and paper grain, bleeding off the right edge. **Tape**: 24x88px, rotated -4deg, torn polygon clip. **Pencil note**: Caveat 22px ink-3, rotated -2deg, with a hand-drawn 1.4px ink-4 arrow; hidden under 860px. **Swash**: a blue brush stroke at 0.32 under the single serif italic word. All are `aria-hidden`, and the information is repeated as real text.
- Photography: none. Derived: photos sit in 14px media frames, with the hatch as the loading placeholder; no tints or duotones.

## What the reference does not show

All of the following are **derived** and must be flagged as derived in the template:

1. **Dark mode ("night paper")** (`S: supportsDark: false`). Surface `#151410`, raised `#1d1c18`, subtle `#24231f`; text paper `#f2efe8` (16.05:1), secondary `#a8a49a` (7.41:1; 6.32:1 on subtle); border `#2e2d28` / strong `#4a4840`. Action inverts: primary = paper `#f2efe8` with `#151410` label (16.05:1), hover `#dcd8cf`; focus ring paper. Status: success `#5cc489` 8.52:1, warning `#e0a54a` 8.47:1, danger `#f07a6e` 6.77:1, info `#8ea8ff` 8.07:1. Pinned shadow becomes `0 24px 48px -24px rgba(0,0,0,.7)` plus a hairline. Bloom: lighter tints (`#8ea8ff`/`#b7c3ff`) at at most 0.22 opacity with no grain darkening. Tape: kraft `#4a4436` at 90%. Dark code blocks get a 1px `#2e2d28` ring so they separate from the surface.
2. **Warning status** and the danger/warning tints (see Color).
3. **Form controls**: select, checkbox, radio, switch, textarea; input focus (2px ink outline, 2px offset), error (danger border plus a 13px danger message with an icon), disabled (well fill, ink-4 text, no border change).
4. **Dense tables**: 40px rows (36 compact), 13px text, mono numerals right-aligned, hairline row dividers, header 12px ink-3 at 500 on paper, selected row in well, no zebra striping, no bloom or tape.
5. **Dialog**: white, 18 radius, pinned shadow, overlay `rgba(14,14,12,.4)`, max 560px. **Toast**: ink background with paper text (like the dark pill), 12 radius, status shown by a leading icon. **Tooltip**: ink, 7 radius, 12px.
6. **Button states**: active (`#000` / 1px inset darker), disabled (well fill, ink-4 text), loading (label kept, 14px spinner in currentColor).
7. **Motion values** (see Motion), **data-viz palette** (ink, ink-3, the blue/indigo pair and status hues; no rainbow), **icons**, **pagination, avatars, skeletons** (well color, no shimmer).

## Must not carry over

- The brand term **"Pigment"** in any form: template id, name, description, prose, tokens, examples, URLs (`mcp.pigment.dev`) or package names (`@pigment/mcp`).
- The blot logomark beside the wordmark (`shot: p1-desktop-light.png` header). The template ships no logo.
- Platform copy: the headlines ("Give your agent a palette, not a prompt.", "Mix once. Paint forever.", "Connect an agent once.", "Compare, side by side."), the sign-off "No happy accidents.", and all pencil-note texts.
- Fixture-system content (Inter, the `#1f55e0` blue family, swatches).
- Fonts: nothing to substitute; Geist, Geist Mono, Instrument Serif and Caveat are all SIL OFL 1.1.
- Because the reference is our own site, there is no third-party IP risk; nothing else is restricted.

## Proposed template

**Name candidates** (none contains the brand term):
1. **Margin Notes** (`margin-notes`), recommended. It names the core rule: quiet work area, studio marks only in the margins.
2. **Ink Wash** (`ink-wash`): ink and paper plus one watercolor wash.
3. **Studio Paper** (`studio-paper`): the desk-and-paper metaphor.

**Tags:** tone `editorial` · corners `soft` · density `regular` · appearance `light`, `dark` (dark derived) ·
keywords: ink-and-paper, warm-neutral, monochrome-action, hairline, serif-accent, watercolor-wash, margin-notes.

### The translation problem: studio details in an ordinary product

On the platform, the details live at the edges and color is withheld because the *content* (other systems) must
carry the color. In a template applied to a dashboard, store, blog or settings page, the product's own content
takes that place. Rule of thumb: **the details mark moments, not data.** They appear where a person pauses
(arrival, emptiness, a first run, something pinned) and never where a person works (reading data, filling
forms, making decisions).

| Detail | Allowed in | Frequency | Never in |
| --- | --- | --- | --- |
| Bloom (watercolor wash) | Behind a page header/hero, or behind an empty state; bleeds from the right or top edge with 40-60% of its area off-canvas | Max **1 per screen**; none on dense data screens (tables over 10 rows, editors, checkout) | Behind body or secondary text, tables, forms, charts, dialogs, product photos |
| Masking tape | On a *pinned/featured* item: a pinned report card, a "featured" product, a pinned post, an empty-state panel | Max **2 strips per item**, max **2 taped items per screen**; the item must also carry the pinned shadow | On buttons, inputs, list rows, toasts, dialogs, or as a status marker |
| Pencil note + arrow | Onboarding hints, first-run tips, empty states, docs-style explainers | Max **2 per screen**; dismiss after first use in app chrome; hidden under 860px | As the only carrier of information (always duplicated in real text, `aria-hidden`); validation messages, settings forms |
| Serif italic word | Page title (h1 or display) | **1 word per page title**; optional footer/sign-off line; blog may add **one** serif pull-quote per article (derived extension) | Body, buttons, nav, labels, table headers, numbers |
| Brush swash | Under the serif word of a landing/hero or welcome screen | Max **1 per product** surface family (e.g. the marketing home, the onboarding welcome) | App chrome, repeated titles |
| Pinned (long) shadow | Featured or lifted objects, dialogs, menus | Max **2 lifted objects per screen**, plus overlays | Every card. Rest cards use the hairline |

Per app:
- **Ops dashboard**: the bloom only behind the overview page header or an empty widget state; tape only on a user-pinned card; no notes after onboarding; serif word in the overview title only ("Orders, *today*"); tables and charts stay pure ink and paper.
- **Store**: the bloom behind the collection header or hero; tape on at most two "featured" products per screen; never over a product photo; checkout and cart have no details at all.
- **Blog**: a serif word in the article title, an optional single serif pull-quote, the bloom behind the masthead only, tape on a pinned post in the index.
- **Account settings**: no bloom except on an empty state, no tape, no notes except a first-visit hint; the serif word in the page title is optional.

**Action and status strategy.** Primary action = ink `#0e0e0c` (night: paper `#f2efe8`); secondary = white
with a hairline; tertiary = text link with underline. Selection, focus and active tab are all ink. There is
one primary button per view region. The single hue family, ink-blue, is reserved for **info** and decoration;
it is never a link or button color. Status hues are deep and desaturated: success `#11713a`, warning `#8b5d0f`
(derived), danger `#c42b2b`, info `#1849f2`. Each passes at least 4.5:1 on paper, white and its own tint
(4.68-5.79:1), and each is always paired with an icon or a text label so it stays distinguishable without hue.
Destructive primary actions use a danger-filled button (`#c42b2b` with paper text, 5.35:1); that is the one
filled non-ink button. Dark-mode equivalents are listed under the derived gaps.

### The 10 defining rules

1. **Warm paper, never gray.** Page `#faf9f6`, panels `#ffffff`, wells `#efede7`, trays `#e9e6df`. Every neutral is warm (R>G>B); no cool or pure grays.
2. **Ink is the only action color.** Primary button, pressed chip, selected segment ring, active tab underline and focus outline are `#0e0e0c` (paper in dark). No brand hue.
3. **One hue family, rationed.** Ink-blue/indigo appears only as the info status (callout bar `3px`, tint `#eef1fb`) and in decoration (bloom, swash). It is never used for links or buttons.
4. **Hairlines before shadows.** Rest elevation is a 1px `#e6e4de` hairline. The long pinned shadow (`0 24px 48px -24px` at 40% ink) is reserved for at most two lifted objects per screen, plus overlays.
5. **Tight grotesk, three weights.** Sans at 400/500/600 only; headings tracked from -0.02em (19-26px) to -0.045em (56-60px); body 15/1.55, UI 14, meta 13.
6. **One serif italic word per page title.** Instrument Serif italic at 400, same size as the heading, -0.02em; nowhere else except one sign-off line.
7. **Mono for machine facts.** Versions, IDs, counts, step numbers ("01"), code and uppercase eyebrows (+0.08em) use the mono; code blocks are ink with a warm string color.
8. **Soft, nested corners.** 7 inner, 9-10 control, 14 media/code, 18 panel, pill for chips and status; inner radius = outer minus padding.
9. **Selection is paper on a tray.** Segmented controls are a well with a white, slightly lifted segment; tabs are a 2px ink underline; filter chips invert to ink. Controls are 32/36/40px on a 4px grid with 2px half-steps.
10. **Studio marks live in the margins.** At most 1 bloom, 2 pencil notes and 2 taped items per screen, only at moments of pause (headers, empty states, onboarding, pinned items). They are always `aria-hidden`, never inside tables, forms, charts, dialogs, toasts or photos, and they never animate.
