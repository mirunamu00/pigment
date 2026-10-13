# Changelog

## 0.1.0-rc.2

Revision answering the first critic review of rc.1 (avg 3.25, polish 2.5; all automated gates passed).

- Bloom: new recipe in a full-bleed band (`overflow-x: clip`, never `overflow: hidden` on an ancestor), a feathered
  radial `mask-image` so no straight edge can appear, a 500 x 320 box inside a 320px-min band, and a separate
  geometry below 1200px (176 x 112, behind the h1 only, ending above the lead). Empty-state bloom placement.
- Dark bloom: new `mn-wash-night` filter (blurred, no grain or rim) switched by `prefers-color-scheme` and
  `[data-theme]`; dark `opacity.bloom` 0.22 → 0.3.
- Serif word: never a whole title, only in titles of 2 or more words, max 1 per screen, per-app list (none in
  settings, forms, cart, checkout, product and record pages). Added to Never.
- Mobile: no horizontal scroll at 390px (`overflow-x: clip` on root, `min-width: 0`), navs with more than 3 links
  collapse to a menu button, tables scroll in their own wrapper (up to 4 columns) or stack (5 or more), sticky-bar
  pages get bottom padding.
- Controls: explicit input, select and search heights that never shrink in flex rows (rule 8); switch off-track and
  checkbox borders use `color.text.tertiary` for 3:1.
- Media frame "no asset" state (tray, hatch, one 20px outline icon); illustrated placeholders added to Never.
- Object pages use the 44px `h1Article` size; no h2 repeating the h1; status badge next to the title.
- Mono rule 7 made explicit (tables, spec rows, key/value rows, totals; prices and stat values stay sans).
- Pencil notes: one concrete placement per app type.
- States: hover, focus-visible, disabled and error moved into rule 9 and the Never list; Verification gains
  code-checkable rules for agents that cannot render.
- Cards in mixed rows align to the top; featured cards span grid columns; product name as text, no icon.
- Trimmed for the 6,000-word budget: component Do/Don't lines folded into states or the Never list, swash filter
  without rim, removed the unavailable badge variant, the alternate pencil arrow and the second tape clip-path.

## 0.1.0-rc.1

First release candidate of Margin Notes, derived from the approved reference analysis (captured 2026-10-12; see `provenance` in the manifest).

- Tokens: warm paper neutrals, ink action and focus, deep status colors including a derived ochre warning and
  derived status tints, decor colors for the watercolor bloom and tape, code colors, radii 5 to 20 plus pill,
  a pixel-named spacing scale, a type scale with size-dependent tracking, weights 400/500/600, rest, pinned and
  segment elevation, motion 120/180ms on `cubic-bezier(0.2, 0, 0, 1)`, breakpoints 860/1200/1440.
- Dark mode "night paper" is derived (the reference is light only): action and focus invert to paper.
- Principles: the ten defining rules, a Never list, and "Studio details in a product" with placement limits,
  per-app guidance and copyable recipes for the bloom, tape, pencil note, serif word and swash.
- Components: the 12 required components specified with derived disabled, loading and error states, plus
  segmented control, chip, code block, callout, empty state and media frame.
