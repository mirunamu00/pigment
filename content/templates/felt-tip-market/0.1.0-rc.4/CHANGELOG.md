# Changelog

## 0.1.0-rc.4

Drawings get real depth at every size, and every hero ends on a weighty action pair.

- Sticker construction: the face silhouette is swept straight down on screen (offset outside the tilt) by painting it every half unit twice, stroke-only at double width then fill-only, under the face, so one solid with one outer outline and a strip along the whole lower edge (was a back shifted along the object's own axis plus a side rectangle). Depth measured in rendered pixels, at least 10% of the object's larger rendered side, recomputed per render size; a reusable `ftSticker` builder replaces the two literal examples; inner strokes keep the depth clear of the lower edge.
- Thin things (sheets, pads, envelopes, cards, clipboards, tickets) are drawn as thick board with the same strip; a pad shows a page stack, an envelope is a padded mailer.
- Measure step: compare the largest drawing on each screen with the smallest card vignette and deepen the big one if it shows less strip; Never and Verification extended.
- Hero action row: new `size.controlHero` 60px; the plate-stack CTA in the ink variant (black in light, pink in dark) beside a bordered input that fits the product, at least as wide as the CTA (or an outline button of the same height), stacked full width below `breakpoint.md` at `size.control`; `.ft-hero-actions`, `.ft-btn--hero`, `.ft-hero-field`; Button and Text field gain the hero size (was "plate-stack CTA + bordered input" in the concept table only).
- Media boxes: the 3px outer outline is set through `--ft-outline` on the drawing (was a stroke-width override on its group, which the builder's inline widths would ignore).
- Prose tightened across the principles, components and instructions so the bundle fits its budget; statements that repeated another section were cut, no rule was dropped.

## 0.1.0-rc.3

Stickers get the reference's scale and heft: bigger on heroes, header bands and phones, a deep solid side strip, one-edge cropping, and media-box drawings that stay whole and heavy.

- Sizes: `size.stickerHero` 224px → 256px, new `size.stickerLg` 180px, `size.stickerMd` 144px → 160px, `size.stickerBand` 128px → 200px, `size.stickerSm` 64px → 120px; `.ft-sticker--lg` now `clamp(stickerSm, 18vw, stickerHero)`, `--md` `clamp(stickerSm, 11vw, stickerMd)`, header band `clamp(stickerSm, 14vw, stickerBand)`. Desktop hero: at least half 180–256px, none under 120px; phones keep 3–4 hero stickers of at least 120px instead of shrinking them.
- Depth: back shifted 11–15% of a square viewBox (was 10–15% of the object's height) with the object filling 75–90% of it, so the side strip renders at least 10% of the sticker's size; both worked examples redrawn; inner strokes grouped in `.ft-inner`.
- Cropping: one band or viewport edge only, never at a corner, at least 60% visible; header-band sticker at least as tall as the title block plus lead.
- Media boxes: the drawing is a full four-step sticker spanning 55–70% of the box width, centred, at least 8% clear ground, never cut by the frame (was cropped by the frame); new `border.width.artLg` 3px outer outline in boxes wider than 320px.
- Verification: measure every sticker as it renders at 1440px and 390px.

## 0.1.0-rc.2

Stickers become thick die-cut objects with a fixed placement, dark mode keeps boxes lighter than the ground, and items without an image get their own drawing instead of a stock glyph.

- Sticker recipe: four-step construction (back 10–15% of the height lower, side band, face, 1–3 inner strokes) with a rounded and a straight-edged example; new tokens `size.stickerHero`, `size.stickerMd`, `size.stickerBand`, `size.stickerSm`; size classes `.ft-sticker--lg` and `--md`.
- Placement rules: a front page opens on a hero band with 4–6 different stickers, at least half 160–240px; header-band sticker as tall as the title block, centred at the trailing edge, cropped by that side only, at least 60% visible (`.ft-band--with-sticker`); empty-state drawings are the missing thing, never a recolored copy; no object drawn twice.
- Dark tokens: `color.surface.default` from the dark grey to black, `color.surface.raised` from black to the dark grey; new `color.surface.bar` (top bar, black in dark) and `color.surface.onBand` (white in both modes) for status pills, outline buttons, tabs and inputs on bands and the footer. Rule 10 rewritten; stickers never sit directly on the black ground.
- Imagery: an item with no image gets a drawn vignette (band ground, 1–3 objects of its own topic) or a dashed glyph box (`.ft-media`); generic picture glyphs and grey fills added to Never.

## 0.1.0-rc.1

First candidate: a cheerful storefront language of 1px ink hairlines on paper, flat poster-color bands, ink-outlined sticker objects, a notched pink price flag and buttons that lift on a hard black shadow.

- Tokens: paper ground, white surfaces, pure-ink borders, pink action color, five poster band colors, lift and plate offsets, Space Grotesk with JetBrains Mono.
- Five signature recipes: lift-and-slam with the plate stack, sticker objects (with word badges and vignettes), hard-seamed bands, ink hairline frame with pill markers, price flag.
- Twelve components specified with every state, plus the Applying the concept map for product screens.
