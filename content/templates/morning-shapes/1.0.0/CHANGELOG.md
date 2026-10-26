# Changelog

## 1.0.0

First release of Morning Shapes: a sunny, toy-like system. Warm white and cream pages, flat saturated color fields
with curved edges, flat geometric shapes with crescent shading, small glyphs that breathe slowly, and chunky pills
that sink onto a 2px ledge when pressed. A night theme comes with it.

- Ten defining rules and a Never list: color only as whole flat fields, one field per screen, one hue per product
  area, no outlines, gradients or faces on shapes, and depth by tone instead of shadow.
- Color fields for page headers and closing sections, as tall as their text, with an arched edge and one composed
  shape scene fitted inside.
- A shape kit built by recipe: crescent-shaded discs, clouds, four-point sparkles and round pictogram plates, each
  picturing its own subject. Items without an image get a cover in their area's color, never a grey box.
- Pill and circle buttons with a one-step darker hover and a 2px press; the selected tab is an ink pill with a dot.
- Product scenes on color: one anchor with a few UI fragments overlapping it, built once on entry.
- Tone-on-tone cards, option cards with big figures, colored stat tiles, and empty states with one composition and
  one action, never sample data.
- A night theme on deep navy with indigo panels, where fields and shapes keep their hues.

## 0.1.0-rc.5

Header bands are as tall as their text again, with the art fitted inside; the hero vignette becomes one composed scene around an anchor; phone heroes and stat tiles stay within a screen.

- Color fields: header band `min-height` from its art (`size.bandArt`) -> none, height = text + `space.10`/`space.8` (about 200-260px desktop, at most a third of the first screen); art box width-sized `min(42%, size.bandArt)` -> trailing 40%, `height: 100%; width: auto`, viewBox 400x240 -> 400x200 (samples redrawn); token `size.bandArt` removed. Limits: a band's height comes from its content; only a front-page hero grows around its art; below `breakpoint.md` no field exceeds one screen.
- Product vignettes: stacked white cards -> one anchor (device frame, cover tile or blob-cut panel with an offset second-hue edge, about 60% of the box), at most two chips overlapping its edge, a 48px+ star and a cloud touching it; no lone dots under 16px, never more than two same-shaped cards; phones: one piece of at most 140px or 2-3 confetti, never its own column.
- Card: stat tiles have no min-height; below `breakpoint.md` they stay one group (2x2 or a sideways row) in half the first screen.
- Layout adaptation: on action screens the first control, primary action and its feedback sit in the first desktop viewport.
- Pictograms: on one screen each spot pictures its own noun.
- Verification: checks for the above. Decorative SVGs get `aria-hidden` once in the intro instead of per sample; wording tightened elsewhere; no rule removed.

## 0.1.0-rc.4

Header-band art becomes a wide scene that pictures the screen's subject; option cards follow the borderless card rule; the night band stays navy in dark and highlights never sit on a neighbouring hue.

- Color fields: header-band art box 45% with a `size.art` min-height -> `min(42%, size.bandArt)` sized by width (new `size.bandArt` 640px, SVG `width: 100%; height: auto`, viewBox 400x240); cluster 3-5 shapes -> 4-5 pieces whose lead pictures the screen's subject in one noun, plus a second-hue shape, a 48-64px star, a sparkle, optional cloud; front pages prefer a product vignette; one hexagon sample -> three structure-only samples with different silhouettes, reuse counts as a copy.
- Card: plan card (white, `radius.md`, 2px border, violet selected) -> option card (`color.surface.subtle`, `radius.lg`, no border, figure at `font.size.h2`, selected is the one saturated field in a hue clearly apart from the ground).
- Tokens: dark `color.field.night` purple -> deep navy `palette.night.band`; raw primitive colors moved from `color.*` to `palette.*` (semantic tokens unchanged).
- Color use and Never: a highlight on a field takes a clearly different hue in both appearances; never a saturated panel on a neighbouring hue.
- Breathing glyphs and Applying the concept: pop dots mean loading only; no-results states show a pictogram of what was searched and a clear pill; a glyph pictures its label and a repeated control keeps one glyph.
- Verification: checks for the above.

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
