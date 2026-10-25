# gumroad-study — iteration log

One entry per authoring iteration: what changed in the package, why, and which gate or critic note it answers.

## 0.1.0-rc.1

First package from the approved analysis: five signature recipes (lift-and-slam with plate stack, sticker objects with badges and vignettes, hard-seamed bands, ink hairline frame with pills, notched price flag), the ten rules, Never list, Applying-the-concept map for product screens, twelve specified components.

Departures from the analysis, all for accessibility or generality:
- Focus ring is ink (white in dark), 2px at 2px offset; the pink stays as a 2px halo band on text inputs (pink alone is 2:1 on white).
- Helper text darkened from ink at 50% to a solid muted grey (4.5:1 on paper); error border and icon use a deeper red than the plate red (4.5:1 on paper); dark-mode form-control outlines raised to 3:1 while other dark hairlines stay at 35%.
- Selected option cards add a pink check disc with an ink outline so selection does not rely on pink alone.
- Vignettes are still lifes without people or characters, so no character style is carried over.
- "Pink 1–3 times per screen" restated as "at most three pink roles and two pink buttons", so a flag on every card stays legal.

## 0.1.0-rc.2

Answers author brief 2 (evaluation 2 of rc.1): signature 3 (needs 4); three majors.

1. **Sticker language (signature, major, 3 of 3).** Rule written: every sticker is built in four painted steps (back 10–15% of its height lower in the same fill, a side band joining it to the face, the face, 1–3 inner strokes); a single outline with a hairline edge is not a sticker. The recipe now has a rounded and a straight-edged worked example and size classes on new tokens (`size.stickerHero` 224, `stickerMd` 144, `stickerBand` 128, `stickerSm` 64). Placement rules: the first screen of any front page is a hero band with a hero headline and 4–6 different stickers, at least half 160–240px on desktop, no object drawn twice; a header-band sticker is as tall as the title block (min 96 desktop / 64 phone), vertically centred at the trailing edge, cropped by that side only, at least 60% visible, with the band reserving room for it (`.ft-band--with-sticker`); an empty-state drawing is the missing thing in its own silhouette, never a recolored copy. Why it holds beyond the demos: every product with a front page, an overview header or an empty state meets these, whatever its nouns are; the rules are about construction and placement, not subjects.
2. **Dark depth reversed (referenceFidelity, major, spec-caused).** Dark `color.surface.default` now black and `color.surface.raised` the dark grey (was the reverse), matching the reference's black ground with lighter boxes. New `color.surface.bar` keeps the top bar a black field in dark; new `color.surface.onBand` (white in both modes) fills anything placed on a band or the footer, so status pills, outline buttons, tabs and inputs on bands no longer turn black. Rule 10, Color use, Never, Badge, Button, Tabs, Text field, Navigation and Verification updated; stickers never sit directly on the black ground. Why: it is a token-level fix of how depth and on-band controls map in dark, true for any screen.
3. **Stock picture glyphs for missing images (polish, major, 3 of 3).** Rule written in Imagery (plus Card, Applying the concept, Never, Verification): an item with no image of its own gets either a drawn vignette (band-color art ground, 1–3 sticker-recipe objects of the item's own topic, different per item) or a dashed raised glyph box with a small solid glyph of its type; never a picture glyph or grey fill. `.ft-media` recipe added. Why: every catalog, feed, library or CRM has items without images; the rule names kinds, not instances.

Left alone: the 5 other findings outside the brief.

## 0.1.0-rc.3

Answers author brief 1 (evaluation 1 of rc.2): signature 3 (needs 4); two majors, one minor.

1. **Sticker scale and depth (signature, major).** Rule written: on a desktop hero at least half the stickers are `size.stickerLg`–`size.stickerHero` (180–256px) and none is under `size.stickerSm` (120px); phones keep 3–4 hero stickers of at least 120px instead of shrinking them; a header-band sticker is at least as tall as the band's title block plus lead (`size.stickerBand` 200px desktop); every sticker is cropped by one edge only, never at a corner, at least 60% visible; the back is shifted 11–15% of a square viewBox the object fills 75–90% of, so the side strip renders at least 10% of the sticker's size (18px at 180px); a sticker reading as a flat outline with a sliver is redrawn with the back lower and the object larger. Worked examples redrawn to those numbers; size classes retuned; a "Measure before you finish" step added to the recipe and Verification; Never extended. Why it holds beyond the demos: it is about the construction, size and cropping of the drawn object relative to the viewport and the headline, true for any product's hero, overview header or vignette, whatever the nouns are.
2. **Drawings in large media boxes (signature, major).** Rule written in Imagery, the sticker Placement and Verification: a drawing in any media box is a full four-step sticker at every size, spans 55–70% of the box width, centred, with at least 8% clear ground on every side so the frame never cuts it (the old `.ft-media--drawn` comment that let the frame crop objects is replaced); in boxes wider than 320px the outer outline is the new `border.width.artLg` (3px) while inner strokes stay 2px. Why: any item page, detail view, article figure or large thumbnail in any product scales the same drawing up; the rule is about box size, not a page.
3. **Hero ring rhythm and hero action size (signature, minor).** No principle given in the brief and minors are not a reason for a change: logged as variance, package unchanged.

Left alone: the 10 other findings outside the brief.

## 0.1.0-rc.4

Answers author brief 1 (evaluation 1 of rc.3): signature 3 (needs 4); two majors.

1. **Drawing depth on large and flat objects (signature, major).** Rule written: a sticker is its face silhouette swept straight down on screen, built by painting the silhouette every half unit (tested in a browser: wider steps leave dotted edges at corners) from the depth to 0 twice (stroke-only at double outline width, then fill-only) under the face; the offset is a plain `y` outside the tilt, so the strip runs straight down and shows along the whole lower edge, and any silhouette (garment, bag, tool) becomes one solid with one outer outline, never a doubled outline or a back edge reading as a hem; inner strokes keep the depth clear of the lower edge. Depth is measured in rendered pixels, at least 10% (aim 12–15%) of the object's larger rendered side, recomputed for each size it renders at. Thin things (sheet, pad, envelope, card, clipboard, ticket) are thick board with the same strip. 3px outer outline in media boxes wider than 320px kept and tied to the builder. Measure step adds a comparison of the largest drawing on each screen against the smallest card vignette. Reusable `ftSticker` builder with two worked calls replaces the literal examples; Rule 7, Never, Placement, Imagery, Limits and Verification updated. Why it holds beyond the demos: it is about how any drawn object is constructed and scaled, whatever the product's nouns and wherever the drawing appears (hero, header band, item image, empty state).
2. **Hero action row (signature, major, spec-caused).** Rule written: under every hero headline the action is a pair at one shared height (new `size.controlHero` 60px): the plate-stack CTA in the ink variant (black in light, pink in dark) beside a bordered input that fits the product (search, email signup, a lookup), at least as wide as the CTA, or an outline button of the same height when there is no natural input; never a lone default-size button; stacked full width on phones at `size.control`. Recipe CSS added under Lift-and-slam; Hero placement, the concept table, Button, Text field and Verification point to it. Why: the spec named the pair only in a table cell; every product with a front page (store, publication, booking flow, SaaS) has a primary action and either a natural input or a secondary action to pair it with.

Also: agent.md had grown past the 20,000-token budget (rc.3 was already at about 20,700), so duplicated statements across rules, Never, signature Limits/Where, Applying the concept, Verification and a few components were condensed to fit (now just under 20,000); the builder was rendered in a browser to check the solid, the single outline and the 3px media outline.

Left alone: the 9 other findings outside the brief.
