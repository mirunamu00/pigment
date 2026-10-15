# Changelog

## 1.0.0

First release of Night Cartridge: a 16-bit console booted as a product. A night-blue ground, cream pixel type
that sets Hangul and Latin on one bitmap grid, hard-edged game windows, an RPG menu marker, and small living
pixel scenes that move only in stepped frames. A derived parchment "day" theme comes with it.

- Ten defining rules and a Never list: everything on the pixel grid (radius 0, 2px and 4px borders, hard
  shadows), quantized colors, one pixel typeface at weight 400, and gold reserved for the one primary action,
  the marker and the focus ring.
- Pixel scenes built by recipe: layered sky, haze and ridges, a focal group with clustered props, a
  hand-placed detail pass (lit windows, signs, textures, stars, small life) and a review at twice the size
  before they ship. Heroes, banners, strips, figures and empty-state vignettes each have their own sizes.
- Stepped motion only: loops live in the art and status lights, controls respond instantly and press down 2
  to 4px, and reduced motion or the animation switch freezes every scene on its first frame.
- Game-window chrome: framed windows, dithered heading rules, dotted separators and block meters for real
  counts and limits.
- Pixel type with Hangul rules (no breaks inside words, 28px prose leading) and a switch to a readable body
  face, all openly licensed.
- 13 specified components with designed states, and layout rules for dashboards, stores, articles and
  settings.

## 0.1.0-rc.6

Scene subjects are bigger and gather in clusters with open ground between them. The hero stands on a hill with a path and grass. A scene never shows the same prop twice.

- Pixel stage step 4: the focal group's lead sprite goes from 28 to 40 units to 48 to 64 units tall (38 to 50% of the height; hero 40 to 52; strip unchanged at 20 to 26) and stands 4+ units taller than any other prop. Supporting props go from 12 to 24 to 20 to 36 units (strip unchanged at 12 to 18). In a hero or banner, 2+ of them are tall verticals (a tree, tower or mast, at most 8 units wide and up to 44 tall) that top the far ridge by 4+ units.
- Pixel stage step 4 spacing: "gaps 4 to 60 units, 40+ beside the focal group" is now clusters. The focal group plus 1 or 2 clusters of 2 to 4 supporting props, 2 to 10 units apart inside a cluster, clusters 60 to 160 units apart with only details between them, and no three consecutive gaps within 4 units of each other.
- Hero: the near ground is a landform. A rise 8 to 16 units high under the focal group (new `rise()` helper), a path of 2-unit steps up to the group, and 25+ hand-placed tufts and stones, counted in the 120 detail entries. Under `breakpoint.lg` the stage shows y 48 to 128, so walls and figures stay below y 48.
- Pixel stage step 8: in place, a banner lead is at least 96px; props sitting only in the bottom third get scaled up; outside the hero Window, every quarter of the width has a prop, pole or fence; a strip at 1x in dark shows every prop's outline and a lit point.
- Never: evenly spaced props and two identical props in one scene.
- Verification: each scene reports the lead's height, the gaps between props left to right, the tall verticals and the hero's rise and path. It also includes a required variant table (`variant | x positions | what differs`); a scene that repeats a variant without the table fails.
- Shorter wording to make room. Button and Card states point to Interaction. The marker's Where list and the Applying rows for dashboard, store and empty state drop their repeated details. The meter `dl` example shows only the `dd`. Verification drops lines that repeat Spacing and the ground-strip paragraph. Fewer code comments.

## 0.1.0-rc.5

Scenes are composed instead of listed: one focal group leads, smaller props step down around it, the background stacks graded ridges, and walls darken at night so only lights glow. Empty-state art becomes a small scene, and product detail columns stay balanced.

- Pixel stage composition: a `row()` of 6 to 12 evenly strung props → props placed by hand with a new `put()`: a focal group of 2 to 4 sprites, 28 to 40 units tall (strip 20 to 26), in front and 60 to 100 units off the scene centre; 4 to 8 supporting props 12 to 24 units tall (strip 3 to 6, 12 to 18), at least 4 units shorter than the focal group, in three or more heights, with a 40-unit gap on each side of the focal group; at most 12 props (strip 5 to 9).
- Pixel stage layers: one far ridge → a haze ridge (new `.haze`, `color.art.far` mixed 50% into `color.art.sky6`, tops y 36 to 46), a far ridge (tops y 66 to 76) and the near ground (tops y 100 to 106, was 108 to 112); no flat tone over 25% of a scene's height; new `at()` helper reads the ground height under a prop.
- Night tone: prop walls in the dark theme mix `--base` 55% into `color.art.sky1` (new `--wall` in the scene CSS; `.hi` and `.shade` follow the toned wall); lights, signs, stars and the moon stay full; the light theme keeps full hues.
- Hero: only sky, ridges and ground under the text Window; props start 16 units right of its edge.
- Strip props: benches, stalls and counters stand upright with an awning, sign, shelf or person above; at most twice as wide as tall.
- Vignette and Empty state: one object and a light → a small scene with sky, ridge, ground, a focal pair spanning half the width and 2 or 3 details.
- Store: on product detail the picture window is sticky or as tall as the purchase column, or Details spans both columns; no column ends more than 160px above its neighbour.
- Review step: squint at the render; props of one height or even spacing are recomposed.
- Verification: per-scene report of prop count, focal lead, duplicate variants and their differences, strip prop proportions and the tallest flat tone; the tallest ground-strip sprite measured at 20 to 24 units with poles and lamps excluded; no prop under the hero Window; toned walls at night.
- Shorter wording in rules 2, 3, 4, 6, 7 and 9, the Never list (the chip, panel-title and placeholder line moved to Verification and component specs), the Applying table, Navigation, Button, Badge and Verification.

## 0.1.0-rc.4

Skylines are irregular and always meet the sky, buildings carry facade detail, moons are round, and gold stays out of the header. Meters only show real maxima and sit in valid list markup, dashboards keep their section titles, and menus open with an option highlighted.

- Pixel stage: `sky()` takes a bottom edge (the far ridge's largest top y + 2) instead of a band height, so no background shows between sky and ridge; far tops y 40 to 52 → 28 to 36% of the height (y 36 to 46 at 128 units; strip 14 to 20 → 14 to 18); new `rng()`, `tops()` (runs 4 to 16, steps 2 to 8, a new seed per scene), `edge()` (checkered top 2 units on the far ridge and the near ground), `disc()` and `moon()` (an optional round stepped moon with craters and a checkered ring halo; square moons are in Never).
- Pixel stage objects: walls wider than 12 units carry window grids, doors, signs, siding or trim; shopfronts have a door, a lit window and an awning or sign; strip props 10 to 20 → 12 to 20 units tall, at most twice as wide as tall, half of them taller than wide; new Figure placement (inline prose scenes fill their frame).
- Ground strip sprites: 12 to 24 units each → one 20 to 24 units tall, the others 14 to 24.
- Rule 4 and Button: gold is the page content's main commit; the header, search and navigation never use gold, and a screen without a content commit has none.
- Block meter: only against a real limit, target or count; inside `dd`, `td` or `li` (as `span` where only phrasing content is allowed), never directly in a `dl` group.
- Dashboard and Card: every group of panels gets a 32/40 h2 on the dither rule outside the panels; KPI tiles show a meter only with a real maximum.
- Navigation and Select: menus open with the current or first option focused and highlighted (marker, `color.surface.hover`).
- Verification: axe scan with no list violations, sky-to-ridge gap, ridge reuse, facade detail, gold placement, dashboard titles and open-menu checks.
- Pixel type: the Galmuri alternative sentence removed; NeoDunggeunmo stays the only pixel face named.
- Pixel stage: new step 6, a hand-placed detail pass drawn with a new `dot()` helper (1-unit pixels or 2 to 6-unit runs, never generated): at least 120 entries in a hero, 60 in a banner, 30 in a strip or figure, 15 in a vignette, with stars at three brightness levels (new `.star-dim`), lit window pixels and sign glyphs, texture runs, edge highlights and shades, and 1 to 3 bits of small life; every prop gets 3 or more, repeated variants differ by 4 or more units.
- Pixel stage: the fill check becomes step 7, a review by eye: each scene rendered alone at 2× or more, three differences from the recipe listed and fixed, at least two rounds, then checked in place at 1440px and 390px; Verification asks for each scene's detail count.
- Typography roles as prose instead of a table; Button use folded into its variants; component keyboard sections titled Accessibility.

## 0.1.0-rc.3

Scenes on product screens read full instead of mostly sky, lights are big enough to see, the ground strip spreads its sprites, and a few layout and marker gaps are closed.

- Pixel stage: sky bands at most 40% of a banner or strip; middle-row props at least 4 units wide and 16 to 32 units tall in a banner (10 to 20 in a strip); focal group 24 to 40 units; poles and cables no longer count as props; demo sprite is now a 10×16 kiosk on 8-unit sky bands.
- Lights: single units → at least 2×2 units (4×4px at `size.unit`, 8×8px at the hero), drawn with a new `light()` helper; stars no longer count toward the 3 to 8.
- Ground strip: sprites at least 6 units wide and spread one per quarter, 120 units apart; `.ground` clips its own overflow, and `html, body{overflow-x:clip}` is removed from the root setup (now in Never).
- Rule 9: n-of-m progress is a block meter; bare "2 of 6 complete" is unfinished.
- Navigation: the contents list marks its first heading on load; the Animation and Pixel body switches share one transparent `.tool` rule (Button tool variant no longer tint-filled).
- Layout: side-by-side panels match height by sizing content, never by stretching an empty window; shell sidebars run to the ground strip; an h2 after a window sits `space.48` to `space.64` below it.
- Component Do / Don't lines removed where they repeated the rules.

## 0.1.0-rc.2

Chunkier type, fuller scenes and a ground strip that reads at full width; tighter rules for cards, dashboards and menus.

- `font.family.pixel`: Galmuri11 → NeoDunggeunmo (16px grid); `font.family.pixelMono`: GalmuriMono11 → NeoDunggeunmo Code; Galmuri is now the alternative; font smoothing off on the root.
- Rules 1, 3 and 8: every drawn object has an outline, a top-left highlight and a bottom-right shade; the pixel face is a 16px-grid face; every stage has 3 depth layers, 6 to 12 varied props and 3 to 8 lights.
- Pixel stage recipe: three-layer construction, a `row()` helper for uneven prop rows, `.base`, `.hi` and `.shade` classes for object shading, lights on props, a fill check; focal subject never one lone building.
- Ground strip: `color.art.groundHi` raised one step lighter and laid over the whole band, new `color.art.edgeHi` dotted edge row, new `size.groundSprite` (48px) layer with sprites 24 to 48px tall.
- Card: the marker hangs in the left padding; titles stay flush with icon and meta. Dashboard panels: titles outside, bullet captions inside, equal heights; n-of-m progress as a block meter.
- Navigation: dropdowns are marker menus; search placeholders never clip. Badge: the selected chip's marker replaces its bullet.
- Game-window limits: inline figures and the newsletter use 2px frames. Never: a single centred building in the hero; marker plus bullet; a 32px title inside a panel. Verification: stem, scene, light, ground-strip and frame counts.

## 0.1.0-rc.1

First candidate of the night-console pixel system: night ground and parchment day appearance, one pixel typeface for Hangul and Latin, game-window chrome, the RPG marker, and pixel scenes that move in stepped frames.

- Tokens: night and day semantic colours, 12-bit scene colours (`color.art.*`), eight identity hues (`color.hue.*`), the 12/16/32/48 type scale at weight 400, 2px and 4px borders, `radius.none`, `shadow.hard`, stepped motion durations and easings.
- Signature elements: pixel stage, stepped motion, RPG marker with instant physical response, game-window chrome, pixel type with a readable-body switch.
- Components: button, text field, select, checkbox and radio, switch, tabs, navigation, card, table, badge, dialog, toast, empty state.
