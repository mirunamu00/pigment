# Changelog

## 0.1.0-rc.3

Header-band art becomes a large, varied composition; one saturated field per viewport is enforced between header bands and item covers; phone header bands stay compact; empty states never show sample records.

- Color fields: header-band cluster from one lead disc + second shape + sparkle in the trailing third -> 3-5 shapes (large lead shape chosen for the area's subject, overlapping second shape, sparkles in two sizes including a 32-64px four-point star), trailing 40-50% of the band, at least `size.art` tall on desktop, no two areas sharing a lead shape and layout; recipe now a hexagon + pill + two sparkles.
- Color fields Limits: two fields never share a hue and are separated by at least `space.8` of white or cream; a detail screen whose item cover is wider than a third of the content gets a cream (indigo at night) header band.
- Layout adaptation and Navigation: below `breakpoint.md` the header band is no taller than its text + `space.8` above and below + the arc, its cluster 72-96px in the top corner, never its own row; top bar one row (wordmark, primary pill, menu circle).
- Vignettes: no longer used as a faded preview in empty states; Empty state row: never sample records, names, prices or totals; one shape-kit composition of the area's subject or a large glyph.
- Verification: checks for the above. Wording tightened elsewhere to stay within budget; no rule removed.

## 0.1.0-rc.2

Pictograms, covers and header-band art read as their subjects and compose like the reference; real data is never staged as a vignette; item images stay up front on phones.

- Shape kit: new Pictograms rule (name the subject in one noun, build its outline from 2-3 crescent-shaded primitives, 60-70% of plate or cover, dots never the whole pictogram, neighbours differ in silhouette not only hue); item covers 50-65% composition -> one subject pictogram at 60-70%; two-color discs limited to confetti.
- Color fields: header-band art changes from 2-3 shapes in the trailing third to one overlapping cluster (lead crescent disc, second shape overlapping 10-20%, tucked sparkle, fully inside the band, layout varied per area), with a recipe.
- Vignettes: no longer placed in dashboard cards; real records render at once with no build; dashboard panels other than the stat tiles are cream and sized to their content.
- Layout adaptation: an image that pictures the item is content and stays after the title on narrow screens; only decoration moves last.
- Breathing glyphs: a row's glyph is chosen for its label.

## 0.1.0-rc.1

First candidate: a sunny, toy-like language of warm white and cream pages, flat saturated fields with bulging arched edges, crescent-shaded geometric shapes, slowly breathing glyphs and chunky pills that sink onto a 2px ledge.

- Tokens: white page, cream surfaces, warm ink text, ink and blue action pills, eight field hues with paired on-field text colors, six category hues, shape shades for crescents, a night palette for dark, the pill ledge, Figtree with DM Mono.
- Five signature recipes: sunny color fields with arched edges, the flat shape kit (crescent discs, sparkles, clouds, spot plates, confetti, item covers), breathing glyphs with the pop-dots loader, chunky pills on a ledge with the dot tab, product vignettes on color.
- Twelve components specified with every state, plus the Applying the concept map for product screens.
