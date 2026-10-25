# Changelog

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
