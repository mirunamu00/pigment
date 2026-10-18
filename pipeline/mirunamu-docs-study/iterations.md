# mirunamu-docs-study — iteration log

One entry per authoring iteration: what changed in the package, why, and which gate or critic note it answers.

## 0.1.0-rc.1 (2026-10-14)

First package, written from the approved analysis (five signature elements, ten rules, derived day theme, exclusions).

- Tokens: UI palette kept on the observed 15-bit values (night) and the derived parchment day palette; the day `lineUi` darkened to 3.6:1 and day muted text to 5.8:1 so control frames and hovered-row meta pass. New 12-bit scene ramps (cool night teal-blue, day sky) instead of the reference's dusk ramp; day hues darkened to about 4:1 on parchment. Added `color.action.primaryEdge` so the gold button keeps a visible edge on parchment (gold on parchment is 1.66:1).
- Fonts: Galmuri11 / GalmuriMono11 (family name confirmed from the CDN stylesheet) default; NeoDunggeunmo / DungGeunMo allowed as a crisp 16px-grid swap; Pretendard + Geist Mono for the Pixel body switch. Hangul: `keep-all`, `line-break: strict`, 28px prose leading. Kept the reference's 16/32/48 scale; Galmuri's 12px grid noted (12 and 48 exact).
- Pixel stage recipe: `sky`/`dither`/`ridge`/`sprite` helpers, four placements (hero 4×, banner 2×, strip 2× for product screens, vignette) plus a CSS ground strip; "one world per app" so the four base apps get original, domain-specific scenes (server yard, market street, writing room, workshop). Scenes crop instead of scaling, focal sprite inside the central band for 390px.
- Motion: every keyframe stepped, the 4px-per-step rule, global `transition:none`, reduced-motion and `data-motion="off"` remove all animation; resting styles are frame 1 (harness shoots with reduced motion). Never list bans automation detection, artificial delays and script-gated content.
- Marker: mask-based ▶ ◀ ▼ ▲ from 1-unit path data with the bevel layer; placement that never shifts labels.
- Applying the concept: 14 contexts mapped to the four base apps' screens (dashboard strip + meters, store strip + sprite product images, blog hero/banner, settings strip + marker menu).
- Never: reference artwork subjects (cabin under a moon, single tall tree motif, snowy ridge, capped seated figure, walking footer character, coins) and downloaded animated sprites.

## 0.1.0-rc.2 (2026-10-14)

Answers critic-1 on rc.1 (fidelity 3, consistency 4, hierarchy 4, spacing 4, states 4, polish 3, signature 3); every promptFix applied.

- Type (fidelity, spec gap): `font.family.pixel` → NeoDunggeunmo, `pixelMono` → NeoDunggeunmo Code (OFL, 16px grid; family names confirmed from the webfont stylesheets); Galmuri11 / GalmuriMono11 demoted to the alternative. `-webkit-font-smoothing:none; font-smooth:never` on html. Rule 3 names the 16px-grid face; Verification checks for solid 2px stems at 1440px. Manifest fonts and provenance note updated (the reference uses the same OFL face; the lighter substitute lost the chunky voice).
- Scene density (signature): rule 8 now requires 3 depth layers, 6 to 12 varied props and 3 to 8 lights. Pixel stage recipe rewritten as back / middle / front layers, a `row()` helper (uneven gaps, no variant three times running), lights on props, and a "half the width bare = add props" check.
- Object shading (signature): highlight / shade / outline moved into rule 1; recipe gives `--base` per sprite and `.base`, `.hi`, `.shade` classes so the rule is buildable; demo lamp uses them; Verification zooms to 200%.
- Ground strip (signature + token): dark and light `color.art.groundHi` #66bb55 → #88cc44 and checker over the whole grass band (8px tiles); new `color.art.edgeHi` dotted row in the dirt edge; new `size.groundSprite` 48px layer, sprites 12 to 24 units (24 to 48px) as a hard minimum; CSS positions and crops the sprite svg; in Verification.
- Strip lights: Dashboard and Settings rows ask for 3+ lit units on props plus stars; Verification counts lights 3 to 8.
- Card marker (polish): `.card-title` hangs the marker in the left padding; only `.item` rows reserve the slot; Card spec and Interaction updated.
- Dashboard hierarchy and spacing: section titles outside panels, bullet + caption inside, panels in a row share a height; Layout adaptation adds equal-height rows and `auto-fit` for short grids (about-page half-empty row, product-detail void).
- Progress and menus (states): n-of-m as a block meter (one block per item); header dropdowns are marker menus.
- Frame budget: inline figures and the newsletter take 2px frames; Verification counts frames.
- Never: one building centred in the hero beside the text window; marker plus bullet on one chip (Badge: marker takes the bullet's slot); 32px titles inside panels; clipped placeholders (Navigation and Text field: one-word placeholder under `breakpoint.sm`).
- Motion: "exactly one sprite bobs or swaps" in every scene (commerce had none); clouds get a `color.art.far` underside so they read on day bands.
- Budget: compressed rules, Never, Color use, Imagery, Applying table (Section break and FAQ rows folded into existing sections), instructions and component Do/Don't lines; agent.md 7,454 words (lint count), down from 8,106 after the additions.

## 0.1.0-rc.3 (2026-10-14)

Answers critic-1 on rc.2 (all 4, signature 3; 3.86); every promptFix applied, rc.2 fixes kept.

- Prop mass (signature, spec gap): recipe step 3 caps sky at 40% of the height (banner 8-unit bands, far ridge tops y 40 to 52; strip y 14 to 20), props at least 4 units wide and 16 to 32 tall in a banner (10 to 20 in a strip), focal group 24 to 40 (strip 16 to 24); 1-unit poles, cables and antennas are details, not props. Demo replaced: 5×9 lamp on 16-unit bands → 10×16 kiosk on 8-unit bands, ridge tops 40 to 52. Step 7 and Verification: silhouettes cover at least a third of the lower half; no bare stretch over a quarter of the width. Evidence: dashboard projects banner vs reference p2-i2/p2-i3.
- Readable lights (signature, spec gap): step 5 lights at least 2×2 units (4×4 CSS px at `size.unit`, 8×8 at the hero); lit windows and signs count; new `light()` helper (one rect, so a light never blinks in halves); stars no longer count. Verification: at least 3 lit points on props, each visibly 4px or more.
- Ground strip spread (signature): sprites at least 6 units wide, one per quarter, 120 units apart, one in the central 180 for 390px (the critic's "none in the central 160 under a sidebar" was not adopted: it would leave the 390px crop empty). `.ground{overflow-x:clip}`; instructions step 3 no longer sets `html, body{overflow-x:clip}`; Never: clipping on html or body; Verification: document no wider than the viewport.
- n-of-m meter (states): moved into rule 9 with the bare-text example; Verification line; removed from the Dashboard row.
- Contents-list marker: marker Where and Navigation contents list mark the first heading `aria-current="location"` on load.
- Header switches (consistency): `.tool` CSS rule in Navigation; Button tool variant transparent, no frame (the old "fill or transparent" caused the drift).
- Equal-height voids (spacing): Layout adaptation sizes content, never stretches an empty window, no interior over `space.64` empty; new Never line.
- Shell sidebar (polish): runs from the header to the ground strip; Settings row says full-height sidebar.
- Section after a window (hierarchy): Spacing adds the `space.48` to `space.64` gap, never under `space.40`.
- Budget: removed the component Do / Don't lines, merged Interaction bullets, Shape and depth into one line, shorter Never subjects list, Toast row (covered by the component), trimmed type and icon notes; agent.md 7,471 words (from 7,808 after the additions).


## 0.1.0-rc.4 (2026-10-14)

Fourth iteration, approved by the user beyond the usual three; final candidate. Answers critic-1 on rc.3 (fidelity 4, consistency 4, hierarchy 3, spacing 4, states 4, polish 4, signature 3; 3.71) and the failed dashboard accessibility gate (axe `definition-list`); every promptFix applied. Compared with rc.2 critic-1 (3.86) to keep what rc.2 did better: its blog hero (multi-storey buildings with window grids, a round moon, a dithered near ground) and commerce strip (taller shopfronts with doors, a striped stall, lamps) are now written into the recipe.

- Meter markup (gate failure, spec gap): Game-window chrome shows the `dd` placement (`<dd><span>2 of 6 complete</span><span class="meter" role="meter" …>`), `td` and `li` placements and `span` for phrasing-only parents; Never: a meter directly in a `dl` group, `ul` or `tr`; Verification: axe scan with no `definition-list`, `list` or `listitem` violations. Table spec: meter inside its `td`.
- Sky meets ridge (signature, spec bug): `sky(w,bottom,bands)` now takes a bottom edge, called with the far ridge's largest top y + 2 (`lowest()`), so the bands always reach under the ridge; demo bands no longer fixed at 8 units. Far tops 40 to 52 → 28 to 36% of the height (y 36 to 46 at 128 units; strip 14 to 20 → 14 to 18), keeping visible sky under 40%.
- Irregular ridges (signature): new `rng()` and `tops()` (runs 4 to 16, steps 2 to 8, a seed per scene); `ridge()` takes [run, top] pairs; step 3 and Ongoing development: never reuse the demo's seed or numbers, never one repeating period; Never and Verification lines. Rendered the demo in node to check: 68 runs, tops 36 to 46, sky bottom 48.
- Moon (signature, spec gap): new `disc()` and optional `moon()` (10-unit stepped disc, two craters in `far`, checkered ring halo 2 units outside); `.glint` and `.halo` art classes; Never: square moon or sun. Not required.
- Textured edges (rc.2 strength): new `edge()` checkers the top 2 units of the far ridge (with the last sky band) and the near ground (with `far`).
- Facades and shopfronts (signature): step 4 requires detail on walls wider than 12 units and a door, lit window and awning or sign on shopfronts, no per-pixel noise; strip props 12 to 20 tall, at most twice as wide as tall, half taller than wide; world list names multi-storey buildings with window grids and striped stalls; Store row in Applying the concept.
- Ground sprites (signature): one sprite 20 to 24 units (40 to 48px), the others 14 to 24, never all at the minimum.
- Inline figure (signature): new Figure placement, sky bands, ridge and ground fill the frame, subject at least half the width, no flat fill over 40%.
- Gold out of the header (hierarchy, spec gap + agent decision): rule 4, Color use, Button use and Navigation header say the header, search and navigation never use gold; a screen without a content commit has none; Never and Verification lines.
- Dashboard section titles (hierarchy, agent mistake): Verification line; Dashboard row and Card panel note.
- Meter maximum (states, spec gap): rule 9, Block meter, Card KPI tile and Verification: only against a real limit, target or count; lower-is-better metrics without a target show the delta only.
- Highlighted option on open (states, open since rc.2): Navigation dropdowns and Select open with the current or first option focused and highlighted; Verification line.
- Budget: shorter code comments, world list, ground-strip paragraph, Applying rows, Layout and Verification lines; removed the Galmuri alternative sentence, the duplicate stretched-panel Never line, the Day colour line, the table-scroll layout line and empty-state example strings. agent.md 7,473 words (lint count), from 8,250 after the additions. Validate: 0 errors, 0 warnings.
- Revision in place, before generation (detail density, signature): rc.3 scenes were helper skeletons only (bands, ridges, boxes) while the reference hero (`raw/svg/p1-i1.svg`, ~94 paths of hand-placed 1-unit runs) and `illustrations/p2-i2.png` carry single stars, lit window pixels, texture and highlights. Pixel stage step 6 (new): a hand-typed detail list via new `dot()` (entries of 1 unit or 2 to 6-unit runs, never from a loop or `rng()`): hero 120+, banner 60+, strip or figure 30+, vignette 15+; every kind present: 12+ stars (strip 6) in the top two bands at three levels (new `.star-dim` class, `.star`, a bright `.star` with 4 dim arms), lit window pixels and sign glyphs, texture runs, edge `.hi`/`.shade` units, 1 to 3 bits of small life; 3+ entries per prop; repeated variants differ by 4+ units. Demo code adds a short `detail` list drawn last; step 3 forbids reusing the demo's detail list; step 4 "no per-pixel noise" → "no random speckle".
- Self-review loop (agent-neutral): Pixel stage step 7 (replaces the old fill check, which it keeps): render each scene alone at 2× or more (temporary page or the component on a blank screen, `image-rendering:pixelated`), list three concrete differences from the recipe and the step 6 counts, fix, look again, two rounds minimum, then in place at 1440px and 390px. Verification: each scene passed two rounds and meets the counts; the report lists each scene's count and fixes. The old step 6 (`aria-hidden`, nothing meaningful only in the art) moved into Accessibility. Verification's "never change code or config to review" → "never change app code or config to pass a check", so the temporary render page is not read as forbidden.
- Budget for the additions (no rc.4 fix dropped): Typography table → prose; Interaction rewritten as Hover / Press / Disclosures; Button Use folded into Variants; component "Keyboard and screen readers" headings → "Accessibility"; shorter Why clauses on rules 1, 2, 4, 8, 10; shorter Pixel stage What, Where, Figure and step 3; ground-strip paragraph points to the CSS; removed duplicates ("never all at the minimum", Color use gold line, "no gap under the sky" in step 7, "the document is no wider than the viewport", "Never mix two pixel faces"). agent.md 7,489 words (lint count), from 7,819 after the additions. Validate: 0 errors, 0 warnings.

## 0.1.0-rc.5 (2026-10-15)

Fifth iteration, approved by the user beyond rc.4. Answers critic-1 on rc.4 (all 4, signature 3; 3.86); every promptFix applied, written as composition rules any agent can follow. Kept from rc.4: the blog hero's ingredients (window grids, lit windows, a landmark, small life, three star levels, round moon), the step 7 detail pass and the two-round review by eye. Compared the agents' banner and strip crops (`showcase/runs/night-cartridge/0.1.0-rc.4/*/20261014-221142/drawings/`) with `reference/illustrations/p2-i2.png`, `p2-i3.png` and `raw/svg/p1-i1.svg`: the reference has one focal subject with props stepping in scale and 3 to 4 graded ridge and cloud layers; the agents strung 15 to 17 equal props on one baseline over one flat ridge filling ~45% of the height.

- Focal composition (signature, spec gap): Pixel stage step 4 (new) "Compose, never line up": `row()` removed, because a count and an exclusion zone still produce a row; props are placed by hand with `put()`. Focal group 2 to 4 sprites, 28 to 40 units (strip 20 to 26), base y 110 to 118 in front of the ground, centre 60 to 100 units off the scene centre (on a third at 1440px) with its nearest sprite still in the central 180 units (hero 90) for 390px; supporting props 4 to 8 (strip 3 to 6), 12 to 24 tall (strip 12 to 18), 4+ shorter than the focal group, 3+ heights, smaller farther out, gaps 4 to 60 with a 40+ gap each side; at most 12 props (strip 5 to 9). The critic's "central 180 units" for the focal group was adapted to the user's "off-centre on a third" while keeping the 390px crop. Step 8 adds the squint test. Rule 8 and Never: a catalogue row.
- Graded layers (signature, spec gap): step 3 now haze ridge (new `.haze` class = `color.art.far` 50% into `color.art.sky6`, tops y 36 to 46), far ridge (tops y 66 to 76) and near ground (tops y 100 to 106, from 108 to 112), each its own seed, `edge()` with the layer behind; no flat tone over 25% of the height in any column (32 units; strip 12). No new token: the haze is a stated mix of two existing tokens. Rendered the new demo in a browser: three graded bands, sky bottom 48, kiosk at `at(near,150)+2`.
- Night tone (signature, spec gap): step 5 and the scene CSS: `--wall` 55% in the dark theme (both `[data-theme="dark"]` and the `prefers-color-scheme` fallback, matching tokens.css), `.base`, `.hi` and `.shade` mix the toned wall directly (nested `color-mix`, so it works however `--base` is set); lights, signs, stars and moon stay full.
- Hero Window clear (agent mistake against rule 8): Hero placement and Verification.
- Vignette content (spec gap): Vignette placement, Empty state component and Applying row: a small scene with a focal pair spanning half the width.
- Strip numbers, duplicates, ground sprite height (agent mistakes the spec already forbade): moved into Verification as reported counts (props, focal lead, every variant used twice and its 4+ unit difference, strip width ÷ height, tallest flat run, tallest ground sprite with poles and lamps excluded); strip props get "an awning, sign, shelf or person above".
- Product detail columns (spacing, spec gap): Store row of Applying the concept.
- Budget: agent.md 7,486 words (validate's count), from 7,981 after the additions. Ranges in the Pixel stage written with en dashes; shorter rules 2, 3, 4, 6, 7, 9; Never drops the chip/panel-title/placeholder line (in Verification and the Card, Badge, Navigation specs) and the "one building centred beside the Window" subject (covered by the focal group and Window rules); Applying, Navigation, Button, Badge, Empty state, Typography, Color use (syntax mention), New project step 3 and 4, and Verification tightened. No earlier fix dropped.

## 0.1.0-rc.6 (2026-10-15)

Sixth iteration, approved by the user beyond rc.5. Answers critic-1 on rc.5 (all 4, signature 3; 3.86); every promptFix applied, written as composition rules any agent can follow. Kept from rc.5: focal groups, three graded ridges, night-toned walls, the clear hero Window, vignettes as small scenes, product-detail column balance; kept from rc.4: the dense hero detail pass (120+ entries). Scale checked against `reference/illustrations/p2-i2.png`, `p2-i3.png` (figure and trees about 40 to 50% of the banner height, crossing ridge layers, tree clusters with open snowfield between) and `p1-i1.png` (hill with path and tufts under the cabin).

- Banner scale (signature, spec gap): Pixel stage step 4: focal lead 28–40 → 48–64 units (38–50% of 128), 4+ taller than any other prop; supporting props 12–24 → 20–36; 2+ tall verticals in a hero or banner (≤8 wide, ≤44 tall) topping the far ridge by 4+ at their column (`at(far,x)`). Strip numbers unchanged (lead 20–26, supporting 12–18). Step 8: in place a banner lead is 96px or taller (the critic's "100px" became 96px = 48 units × `size.unit`, so it matches the 48-unit minimum); props only in the bottom third → scale up; at 1x in dark every strip prop shows its outline and a lit point (user: strips readable at 1x).
- Consistency of the numbers, checked one by one: banner lead base y 110–118 → top y 46–70, above the far ridge (tops 66–76) and into the haze band, and never above the sky bottom (≤48); the critic's "crossing the haze ridge line" is impossible with 48–64 at base 110+ (it needs 64–82), so the lead reaches the haze band and the tall verticals cross the far ridge; a 44-unit vertical at base 102–108 tops out at y 58–64, 2–18 above the far ridge, so "4+ at its column" is reachable; lead ≥48 always ≥4 over verticals ≤44 and ≥12 over block props ≤36; strip lead 20 forces supporting ≤16, inside 12–18. Hero: under `breakpoint.lg` the stage (`size.heroSm`, 320px) shows only y 48–128 of the 4px-unit scene, so the hero lead is 40–52 units (160–208px, about a third of `size.hero`, like the reference cabin), standing on the rise (base y 86–100), with walls and figures below y 48 and only a roof peak, mast or tree above — the critic's 48–64 for the hero would crop the subject on phones. Clusters: 60–160 open ground stays under a quarter of the banner (180); the "every quarter has a prop" check now excludes the area under the hero Window (it contradicted "only sky, ridges and ground under the Window"). Prop totals: focal 2–4 + 1–2 clusters of 2–4 supporting = within 12 (strip 5–9).
- Clusters (signature, spec gap): step 4 "gaps 4–60, 40+ each side of the focal group" → the focal group plus 1 or 2 clusters of 2–4 supporting props, gaps 2–10 or overlaps inside a cluster, 60–160 units of open ground between (details only: tufts, a fence, a pole). The critic's "no three consecutive gaps within 10 units" was changed to "within 4 units (overlaps count negative)": every three gaps inside a 4-prop cluster (2–10 each) are always within 8 of each other, so the 10-unit version would fail every valid cluster. Scope stated: step 4 applies to hero, banner and strip (vignettes and figures keep their placement rules). Rule 8 and Never: evenly spaced props.
- Hero landform (signature, spec gap; rc.5 regression): Hero placement: a rise 8–16 units under the focal group built with a new `rise(t,x0,x1,h)` helper (tested in node: plateau lifted 12 units with 2-unit steps, tops 88–94 over near tops 100–106), 1.5–3× the group's width, the group standing on it; a path of 2-unit steps in `.far` runs; 25+ hand-placed tufts and stones counted in the hero's 120 detail entries (the rc.4 density is kept, not reduced).
- No identical copies (agent mistake the spec already forbade): "two identical props in one scene" in Never; Verification requires a per-scene variant table `variant | x positions | what differs (4+ units)`; a scene that repeats a variant without the table fails. Verification also asks for the gaps between props left to right, the lead's height and margin, tall verticals and the hero's rise and path.
- Budget: agent.md 7,489 words (validate's count), from 7,789 after the additions. Verification's scene report refers to the Pixel stage numbers instead of repeating them; Button and Card states point to Interaction; RPG marker What/Where, the Applying rows for dashboard, store and empty state, the Empty state anatomy, the meter `dl` example (only the `dd`), the world list, step 2's y-value line, step 8's examples, rule 1, 3, 5 and 8 wording, code comments, and the New project VERSION example shortened. No earlier fix dropped: each removed phrase is still stated in its component spec, Spacing or the Pixel stage. Validate: 0 errors, 0 warnings.

## 2026-10-15 — update: dark only (1.1.0)

Goal: Night Cartridge becomes a dark-only system. The light "day" theme was derived (the reference is
dark-only) from the reference's cream text color, was never judged against anything, and its yellowish
parchment ground doesn't suit pixel art. The user also wants one dark-only system in the catalogue.
Change: remove semantic.light.json, the day palette and day scene ramp, and every mention of the day theme;
`tags.appearance: ["dark"]`; tokens.css then sets the night values on :root with no OS switch.

1.1.0-rc.2: answers critic-1 on rc.1 (all 4, signature 3; 3.86; regression from generation variance and a spec gap, not the
dark-only change). Strip limited to store grid, cart, dashboard and settings; product detail, article and about take the
Banner (Pixel stage + Store row); Never: the same scene on two screens; product sprites 40–50% of the picture window and
recognisable by outline; charts: bars ≤40% of slot, 12px y-axis with 3–5 values, never outweighing KPIs; hero rise gets a
1-unit `.haze` rim (no new token: the critic's `color.scene.rim` does not exist); settings form and scene window share
one content width. Theme untouched.

## 2026-10-17 — update: leftovers from the 1.1.0 review (1.2.0)

Goal: fix the regressions the 1.1.0-rc.2 critique listed against the published version
(`showcase/runs/night-cartridge/1.1.0-rc.2/critic-1.json`), so none remains:
- Blog hero lead lost its identity (generic brick block, unreadable fake-letter sign; the one tall element is a
  clock tower cut off by the right edge) — the lead must carry its subject's defining features and a real sign.
- Blog hero on mobile starts at the roof line with no sky — the 390px crop must show the whole lead with sky.
- Product page sprite ~30% of its window — the 40–50% rule applies to the detail page too.
- Sweater sleeves drawn as separate bars with a gap; blog newsletter title shrank to a 16px label; commerce
  mobile header hides the store name; hero hill barely separates from the ground; dashboard mobile table cuts
  its last column with no scroll cue.

1.2.0-rc.1 (2026-10-18): answers critic-1 on 1.1.0-rc.2 (all 4; eight promptFixes), each as a checkable rule plus a
Verification line. Dark only and everything else from 1.1.0 kept.
- Hero lead identity (signature regression): Pixel stage step 4 — the lead shows 3+ defining features of 2+ units per
  world (post office: envelope plate, flagpole, mail slot; shop; server hut; workshop), never a plain window-grid block;
  signs are a pictogram, real 3×5-unit letters (one real word, ≤4) or plain. Never adjusted ("text inside art" now
  excepts a sign's real letters, forbids letter-like marks). The critic's "never by letters" was widened to the user's
  "real readable glyphs or none".
- Tall vertical cut by the edge: step 4 — wholly inside the 1440px crop, 4+ units in (hero x 64–416; banner in a
  `size.container` Window x 42–678, computed from 1296px − 8px frame = 644 units centred on 360).
- Mobile hero framing: the old crop (bottom-aligned y 48–128) cannot show sky at all (sky ends near y 48), so the crop is
  now stated and moved: `size.heroSm` shows y 24–104 (scene translated down 24 units = 96px) and is centred on the lead
  via `--lx` (x `--lx`±48 at 390px). Lead ≤80 units wide, base y 86–100, top y ≥40 = the critic's 16 units of sky;
  consistent with the hero lead height 40–52 (e.g. base 96, height 48, top 48). New CSS line in the stage block, placed
  after `.stage--hero` so the cascade keeps it.
- Hero rim at 1x (carried): computed contrast on `color.art.near`: `.haze` mix ≈1.8:1 (why rc.2's rim vanished),
  `color.art.sky6` 3.0:1. Rim → continuous `.sky-6` line over a `.haze` line; path → 3+ `.haze` steps 4–8×2 units.
  No new token.
- Product detail sprite size: Imagery, Missing images — 40–50% of the window width in grids and on product detail at
  every width, at an integer unit via `round(down,50cqi/var(--w),1px)*var(--w)`; Card grid and Store rows point to it.
- Sweater sleeves: one connected silhouette, touching parts share a unit edge, no background gap; Verification asks
  for one 4-connected region.
- Newsletter title: Typography — standalone sections open with a `title` h2 (panels in an h2 group keep captions).
- Store header name on mobile: Navigation — the name never hides at any width, in any app.
- Mobile table (carried): Table → Small screens: only `data-pin` columns (first + one or two), the rest
  `display:none`, one-line ellipsis cells, `.sub` lines hidden, every row `size.row`; replaces "scroll or stack".
- Budget: agent.md 7,491 words (validate's count), from 7,949 after the additions. Block-meter paragraph shortened
  (the `dd` markup example dropped, rule kept), Verification bullets merged, code comments and the cloud drift example
  trimmed, duplicates of rule 3 (Pixel type Limits), Shape and depth, Color use (dark only), Card panel note and
  Existing project's native-inputs line (still in Checkbox and Select) shortened. Validate: 0 errors, 0 warnings.

1.2.0-rc.2 (2026-10-18): answers critic-1 on 1.2.0-rc.1 (seven 4s; ten promptFixes plus its PARTLY / worse items).
- Grid and detail sprites under 40% (worse; agent sized the svg box, not the drawing): Imagery — the drawn silhouette
  spans 40–50% of the window's inner width, viewBox cropped tight to the ink, and `--w` ≤ smallest window ÷ 8 px so
  `round(down,50cqi/w)` gives a unit of 4+ px and stays ≥ 40% (k/(k+1)·50% with k ≥ 4). Verification measures the ink
  at 1440px and 390px and the report states each percentage.
- Cuffs and hem below an outline row: parts touch the body fill directly, no outline row between.
- Key ring read as a magnifier: key or tag hangs to one side, never a ring above a straight bar.
- "TH" mark in the settings workshop: Signs — one pictogram, one real word or plain; no 1–2-glyph marks, no letter-like
  bars anywhere; the workshop's tool rack defined as hammer, wrench and saw on a board.
- Tower hugging the frame: verticals 12+ units in (hero x 72–408, banner x 50–670), not both in the outer 10%.
- Starved mobile name column: first pinned column `width:100%;max-width:0` with ellipsis, others `width:1%`
  (shrink to content); `table-layout:fixed` dropped since it defeats shrink-to-content; 16+ characters at 390px or pin
  one column fewer.
- Frameless mobile hero Window (regression): hero placement keeps four frame sides inside the gutter.
- Clamped summaries and square mobile pictures (regression): Card — up to 2 lines; 4:3 under `breakpoint.sm`.
- Avatar copy vs image (carried): initials shown where copy promises them; copy never changed.
- Hero path straight down: steps sideways in one direction, a diagonal from a bottom corner.
- Same banner on both product pages and mobile lead pushed to the frame: step 1 — each product or article page takes its
  focal group or crop from its item; Banner — `--lx` centring under `breakpoint.lg` (new CSS rule).
- Chart outweighing KPIs (carried): new token `size.chart` 240px, bars mixed 55% into `color.surface.subtle`; Layout's
  "chart grows into its panel" capped at it.
- Error icon reading as a padlock (low confidence): Text field gives the "!" rows.
- Budget: 7,485 words (validate's count) from 7,915 after the additions; only true duplicates trimmed (listed in the
  changelog). Tabs hover conflict with Interaction fixed on the way.

1.2.0-rc.3 (2026-10-18): answers critic-1 on 1.2.0-rc.2 (six 4s, signature 3; 3.86; 14 of 19 fixed). The five items
that survived two rounds of prose become measurable procedures, each with a measured check in Verification, per the
critic's promptFixes. Dark only and every other rule kept.
- (1) Grid sprites 32–37% (carried twice): Imagery → Missing images is now five numbered steps. Tight box: viewBox =
  ink bounds (first and last column and row each hold a pixel), `--w` 14–20. Size: product grid
  `repeat(auto-fill,minmax(236px,1fr))`, at most 5 columns at 1440px, windows 190px+ inner (1248px content, 5 columns:
  236.8px cards − 40px padding − 4px frame ≈ 193px). The formula then gives 42–44% at 190px, about 45% at 390px and
  about 49% on the 526px detail window. Verification: a required `sprite | ink px | window px | %` table for every grid
  and detail sprite at 1440px and 390px, every row 40–50%; "checked by eye" fails; a missing required table fails.
- (2) Cuffs and hem behind an outline row, ear-like shoulders (carried twice): step 3 One silhouette, `ol` only around
  the outside, joints fill against fill, collar a 1-row dip with no bumps, plus an 18×13 sweater unit grid (rows
  checked: 18 wide; cuff row 9 and hem row 11 sit straight under fill; every edge column and row holds a pixel).
- (3) Key ring as a magnifier (carried twice): the key (6×6 bow with a 2×2 hole, 2-thick shaft 8–10 long, 2–3 teeth)
  is the largest part; the ring is 1 unit and at most 6 across, through the bow's corner; never a big ring with a tag.
- (4) "TIF" on the workshop (carried twice): step 4 "No letter-like marks". Free-standing 1-unit verticals 2–6 tall
  (alone or in 2–4s), or a horizontal run touching one, are forbidden on walls, boards and plates; verticals only edge
  a door, window or wall. This was written so it does not ban siding or brick runs. Tool board: 2–3 filled tools 4+
  units each (hammer 4×2 head on a 2×4 handle, wrench 4×4 jaw, saw 6×3 blade), a gear plate, or plain. Verification
  adds a squint test.
- (5) Hero verticals in the outer 10%, a stall cut by the edge: tall verticals' x spans sit inside 12–88% of the
  1440px crop: hero x 104–376 (crop 60–420, 360 units), banner x 116–604 (crop 38–682, 644 units). One stands within
  40 units of the focal group. Crop edges: no prop crosses x 60/420 (banner 38/682) or the scene's ends, and at most
  one prop per side sits in the outer 10% (hero <96 or >384, banner <102 or >618). The critic's "≤396" was tightened
  to the user's 12–88%.
- (6) New outline recipes in step 4 for the tote (a handle loop at ¼–¾ of the top, corners cut, fill joined; not a
  shackle or a slot), the coat (open lapels, buttons, sleeves; not a book), the duffel (a barrel with end caps and one
  arch; not a toaster) and the skillet (`disc()` pan 60%+ of the width, handle 30–40%), plus a name test at 1x. Step 1:
  the hero's lead and focal group appear only in the hero (critic other-issue 3).
- Budget: 7,490 words (validate passes), down from 8,144 after the additions. The cuts:
  - Verification's per-screen list drops checks that were stable for two or more rounds and are still rules elsewhere:
    card titles flush (Card), chip marker or bullet (Badge), n-of-m meter (rule 9), contents list on load, menus
    highlighted and placeholders (Navigation, Select), sidebar to the ground strip (Layout), ruled dashboard h2s
    (Card, Applying).
  - Still-frame checks that restate step 3 and the Ground strip are gone; the hero rim and 390px checks were kept in
    shorter form.
  - Further true duplicates removed:
    - Never: the meter's invented maximum (rule 9) and "each screen has its own focal group" (step 1).
    - Hero: "under it only sky…" (Never: no prop under the hero Window).
    - Strip: the "only for…" list (Applying).
    - Stepped motion What/Limits (rules 6 and 7).
    - Component focus and one-frame lines (Interaction, Motion).
    - Empty state "reduced motion: still" (global).
    - Table "meter inside its td" (Block meter).
    - Interaction's focus offsets (the marker CSS).
    - JS comments.
  - Wording was tightened in the remaining sections.
- Validate: 0 errors, 0 warnings.

1.2.0-rc.4 (2026-10-18): answers critic-1 on 1.2.0-rc.3 (seven 4s, 4.0, bar met). Every promptFix applied; rc.3's
procedures, checks and rules kept; only true duplicates cut. Dark only unchanged.
- (1) Identical article banners, about reusing the lead mirrored (MEDIUM, regression vs 1.1.0): step 1 now says every
  scene has its own lead and focal group; each strip, the about page and every item of one type take a different lead
  sprite (another subject or outline, not mirrored) in another arrangement; recolouring or relighting is not a
  different scene. Verification: banners of one type and about differ in lead sprite and arrangement (mirrored,
  recoloured or relit fails); the report lists each banner's lead and focal group.
- (2) Dashboard n-of-m meter lost after its check was cut: restored in Verification per-screen ("every 'Showing n of m'
  or 'n of m on' count has its block meter") and written into rule 9 ("every n-of-m count (Showing n of m)").
- (3) Coat reads as "M"/trousers; tote and duffel twins: step 4 gets an 18×22 coat unit grid (one body block, sleeves
  outside, 2-row V collar dip, `hi` button column, fronts never part; checked 18 wide, one 4-connected region); tote
  body 1.2–1.5× as wide as tall; set-mates differ in silhouette at 1x; the name test adds "a letter" and "its set-mate".
- (4) Spec bug: `.btn-gold` border `--color-action-primary-edge` (undefined) → `--color-action-primary`. Every
  `var(--…)` in dist/agent.md code blocks checked against dist/tokens.css: all token variables defined; the rest are
  spec-set properties (`--base`, `--lx`, `--hue`, `--cur-*`, `--o`, `--d`, `--i`, `--w`, `--bob`, `--dc`), and the
  undocumented ones (`--from`, `--to`, `--n`, `--dx`, `--dy`, `--tone`) are now named per instance.
- (5) Rare-event frames about 137ms vs the 250ms minimum: `nc-rare` travel starts at 90% (was 95%): 14000ms × 9.9% ÷ 5
  = about 277ms per frame.
- (6) Hammer/wrench read as T/Y: dropped. Workshop plates are a gear (8×8+, 2-unit teeth, 2×2 hole), a saw blade 6×3
  or plain; the workshop lead's feature is "a gear plate"; Verification checks it.
- (7) Header switches per route, avatar styles per app, chart top band, card min width: Navigation "the same set on
  every route of the app" (Pixel body on every route of an app with long prose or dense tables); Avatars one treatment,
  hued initials, never monochrome; Charts "the panel caption sits at its top padding, the plot right under it"; Layout
  card grids `minmax(200px,1fr)` "exactly"; Verification per-screen adds switches and avatars.
- (8) Sprite table skipped: moved into a report the agent writes last in a fixed order (sprite table, variant table,
  per-scene numbers with each banner's lead, files and decisions); a report missing a part fails, and an app without
  item pictures must write "Sprite table: no item sprites", so no app can skip it silently.
- Budget: 7,497 words (validate's count), 0 errors, 0 warnings. Cuts were duplicates only: one-frame state lines in
  Dialog, Toast, Tabs, Checkbox, Select (Motion); Card focus/press and loading (Interaction, Motion); Table touch rows
  (Accessibility); Pixel stage reduced-motion line and Stepped motion limits list (rule 7); Imagery chart height cap
  (Layout); Empty state's error recipe (Applying); marker Where list (rule 5); hero crop restatement (step 4); Text
  field "frame unchanged" (contradicted Interaction); shorter Color use surfaces, hue order and New project step 3.

1.2.0-rc.5 (2026-10-18): answers critic-1 on 1.2.0-rc.4 (3.86; all eight promptFixes). Rules go into recipe code where
possible, since the evaluation now judges three samples per app. Dark only and every earlier rule kept.
- (1) Process, third round (agents cannot measure the render): Verification "every reported number is measured on the
  render" → numbers are computed from code: sprite rows by a new `pct()` (ink px = floor(window ÷ 2 ÷ `--w`) × `--w`;
  window px from the CSS: 1440 (1248−4×16)÷5 − 40 padding − 4 frame = 192px, 390 358−40−4 = 314px), scene numbers from
  the `put()`, `path()`, `dot()`, `light()` coordinates, each computation shown. The ten rules close with "the report
  opens with the sprite and variant tables, computed from code; a missing part fails it".
- (2) Tote as a padlock (regression): new tote recipe and a 20×27 unit grid (checked: 20 wide, 27 tall, one
  4-connected region): body w÷h 0.8–1.0 (20 wide × 21 tall body), sides step 1 unit in at mid-height, 1-unit `hi`
  straps from cols 4/15 meeting in an arch 12 wide (60%), background between straps and body; never a 2-unit squared
  loop or a box under a hollow arch. Set-mates: tote tallest bag, duffel lowest. Name test: "padlock".
- (3) Grid sprites at 38–40%: every grid and detail sprite 19–23 units wide; a new `item()` trims empty edge rows and
  columns so the viewBox is always the ink (the rc.4 misses were 18-unit ink in 20-unit boxes). Computed with
  floor(W/2/w)·w: at 192px 19→49%, 20→42%, 21→44%, 22→46%, 23→48%; at 314px 44–49%; at 608px detail 47–50%. Sweater
  and coat grids widened 18 → 20 by doubling the two centre columns (still one region each); key shaft 11–14 long.
- (4) Blog grid in 6 cramped columns (spec bug): "Card grids exactly minmax(200px,1fr)" → `.tiles` (200px) only for an
  icon, a title and one line; `.cards` for anything with a summary:
  `minmax(min(100%,max(320px,(100% − 2·gap)/3)),1fr)`, so 3 columns at 1440 (1248px content → 405px each), 2 at 1024,
  1 at 390, never 4+; one width per card kind on every route; Verification checks summary cards.
- (5a) Hero path: new `path(doorX,doorBaseY)` — 6×2 steps, 4 right per 2 down (run 2× rise) to the bottom edge, end x =
  doorX+2×(128−doorBaseY)+2 must be in 366–416 (the 1440 crop's bottom-right quarter; the left corner is under the
  Window). Consistency at 1440: lead centre 300–340 (60–100 off centre 240), door base 86–100 → e.g. 320/96 ends at
  386. Verification reads the end from the arguments.
- (5b) Sparse store strip: step 3 — far ridge carries 4+ `roof()`/`tree()`/rack silhouettes per 360 units, 30–90 apart,
  never bare noise (new helpers); step 4 — no propless stretch over 160 units, crop edges included.
- (5c) Dashboard panels uneven: Layout `.panels` (grid, `align-items:stretch`), bottoms level; grow the shorter (plot up
  to `size.chart`, more rows) or trim the longer (5–8 activity items + View all). Verification already checks it.
- (5d) Hero spacing conflict (blog agent): computed at 1440 — content x 96px → unit 84; Window 464px → x 84–200; props
  from 216; crop 60–420, so 204 units for the focal group (lead ≤80) and clusters, which cannot fit two 60–160 gaps.
  Now: x 216–420 holds the focal group, both verticals and one cluster 16–60 units away; a second cluster may sit at
  x 424–476 (seen at 1920, not counted at 1440). Verticals x 216–376; step 8's quarter check runs on x 216–420.
- Budget: 7,493 words (validate's count), 0 errors, 0 warnings. Duplicate cuts only: Never's meter-in-dl line (Block
  meter states it), Verification's banner line (merged into report part 3), hero letter-mark check (step 4), "one
  marker per list" (marker limits), Applying cells restating Table, Empty state, Motion; "Dense screens shed art"
  merged into Applying's opening; Pixel type font names (tokens); compact table pipes and one `const` per group in the
  demo code; tighter wording.

1.2.0-rc.6 (2026-10-18): answers critic-1 on 1.2.0-rc.5 (3.86; seven of eight promptFixes plus the process note). Dark
only and every earlier rule kept; only true duplicates cut.
- (1) Tote read as a bucket or padlock in 3 of 3 (spec bug: every agent copied the 20×27 grid). New 23×21 grid, built and
  checked by script: one 4-connected region (400 cells), 21 visible columns, rendered at 4px and 12px units on the
  near-black window. It reads as a tote: two separate 6×4 `hi` handle loops with background inside and 3 columns between
  them, body 19 visible on top widening to 21 at mid-height (w÷h about 1.3), `hi` rim, `shade` hem, a patch pocket with
  a lit top edge, an inset `shade` base row. A first draft (narrow 5×5 loops, two flare steps, hollow `shade` pocket) read
  as a plug or a radio and was dropped. The rule names what it must not be (one arch over the bag, sides narrowing
  downward, taller than wide); name test adds bucket and pail; set-mates: duffel low and wide, tote two-handled.
- (2) Visible ink 37.5% while pct() said 42% (3 of 3): sprite width counts visible units only (never `ol`). `item()`
  sets `--v`; unit = floor(window ÷ 2 ÷ `--v`); CSS width = unit × `--w`; `pct(name, v, win)` adds a visible-units
  column. Tested in node on the shipped grids: tote v21 → 84/192 = 44%, 147/314 = 47%, 294/602 = 49%; sweater and coat
  (widened to 22 columns, 20 visible; coat collar kept centred) → 80/192 = 42%, 140/314 = 45%, 300/602 = 50%. For any
  v in 19–23: 41.7–49.5% at 192px, 44–49% at 314px.
- (3) Blog summaries cut at 2 lines (3 of 3, worse than published): Card shows the whole summary in `.cards`, clamping
  only past 4 lines; 2 lines stay for `.tiles` and product cards.
- (4) Banner leads 93–95px (2 of 3): step 4 counts the lead in visible units from its topmost non-`ol` unit; banner unit
  = 2px at every width, so 48 units = 96px floor, aim 52–60 (104–120px), top at y ≤ 70; report part 3 states height in
  units and px.
- (5) Commerce category icons lost (2 of 3): Applying store row — product card category labels carry their 12px hue
  icon, never a bare bullet.
- (6) Every blog lead a post office (2 of 3): step 1 — the emblem lead is the hero's or first strip's alone; other scenes
  take other subjects (blog: press house, mail depot, reading room, newsstand), never an envelope plate on two leads.
- (7) Settings ~450px empty band (2 of 3): Layout — a form window wider than 720px puts short fields in two `.fields`
  columns (new CSS, one column under 600px), long ones across both, no column ending `space.64`+ above the others.
- (8) Blog per-scene report skipped (2 of 3): report part 3 says "not written" fails it.
- Budget: 7,479 words (validate's count), 0 errors, 0 warnings. True duplicates cut: Verification lines restating other
  sections (hero, gold button, 4px frames, panels, summary cards, newsletter titles, header switches, avatars, 390px header and tables, "!" icon,
  stems, two step 8 rounds), the ten rules' report line, step 8's banner-lead check, step 5's `.base` mix, "key ring and
  pan as wide as the bags", Navigation dropdown keyboard (points to Select), settings row's aside clause; tighter wording.

1.2.0-rc.7 (2026-10-18): answers critic-2 on 1.2.0-rc.6 (three-sample confirm passed, seven 4s; its four optional
promptFixes). Dark only and every earlier rule kept; only true duplicates cut, no Verification check removed.
- (A) Tote sides stepped outward at two-thirds height in 3 of 3 (spec-caused: every agent copied the grid; read as a
  cooler or lunch box). New 23×21 grid with straight sides, 21 visible from rim to hem (w÷h about 1.4), same two 6×4
  handle loops, rim, pocket and inset base row; checked by script as one 4-connected region (413 cells), 21 visible
  columns. Rule allows 1 unit narrower per side toward the top, never wider; Never clause and name test add cooler
  and lunch box.
- (C) Product-card summaries clamped at 2 lines in 3 of 3 (worse than published): Card shows them whole up to 3 lines,
  clamped past 3; 2 lines stay for `.tiles`.
- (B) One banner building per category in 2 of 3, with a 'COAT' sign over the sweater: Applying store row — each product
  banner's lead is a building no other product has, its sign word names that product or trade (WOOL, IRON), never a
  sibling or category word; a repeated type changes roof, sign and colour.
- (D) Report tables missing because agents cannot run code (3 of 3, process): Verification's numbers line allows report
  parts 1 and 3 computed by hand from grid and scene constants, marked "by hand".
- Budget: 7,498 words (validate's count), 0 errors, 0 warnings. True duplicates cut: pct() table-row sentence, "21–25
  columns with the ring", "(Showing n of m)" in rule 9, "focus ring never removed" in Accessibility, the Card grid
  row's card anatomy, "hue bars on cards and KPI tiles", Pixel type's body-switch clause in What, "sit on a 16px
  grid", the tote's "body taller than wide" (w÷h says it).

1.2.0-rc.8 (2026-10-18): generalization pass, built on 1.2.0-rc.6 (passed its three-sample evaluation), not on rc.7.
Answers the `prose.overfit` lint (the package named demo-store products) and one measured defect that recurred in every
evaluated sample. Tokens, the ten rules, the Never list and every measured number are unchanged; no generate or
evaluate run.
- (1) Overfit lint, products: Imagery steps 3–5 dropped the sweater, coat and tote grids and the duffel, skillet and
  key-ring outlines. Each became the general principle behind it: one 4-connected silhouette, attached parts joined by
  fill and free-hanging parts kept 1 unit off the body (from the sweater/coat sleeve and collar rules); solid defining
  parts 2+ units thick, the naming part 30–60% of the width, the real width ÷ height kept within ±0.2 (skillet
  handle, duffel arch and proportions); top-down round objects as a `disc()` 60%+ wide (skillet); loops 1-unit runs
  with 4×3+ background inside, two handles separate and 3+ columns apart (tote); a ring at most 6 across and never the
  largest part, so it never reads as a magnifier (key ring); set-mates differ in silhouette at 1x (duffel vs tote).
  Verification's "the tote two-handled" became "set-mates told apart by silhouette at 1x".
- (2) Overfit, apps and screens: Pixel stage step 1's four demo worlds (server yard, market street, post-office street,
  workshop yard) and their emblem and lead lists became a rule for deriving a world from any domain, with non-demo
  examples (booking product: station square; fitness tracker: training ground) and an abstract-product fallback
  (messaging tool: telegraph office). Step 4's per-world lead features and workshop plate rule became one example and a
  general "a pictogram whose silhouette is a letter is replaced by a closed shape". Applying rows lost their world
  names ("Store grid" became "Catalogue grid"); the footer newsletter, the settings photo, "posts, projects" and the
  marker label "Overview" became kinds (sign-up or contact form, image field, articles/records/listings, "Home").
  The docs and landing holdout apps were not used as examples.
- (3) Control heights 4px apart next to each other in every sample (email input + subscribe, save + reset): new Layout
  rule, controls sharing a row are all `size.control` (40px) frame included; the gold button joins at `size.control`,
  `size.controlLg` only when it stands alone, `size.controlSm` only for all-small rows. New `.controls` CSS; root block
  adds `box-sizing:border-box` (the 4px matches two 2px frames added to a content-box height; not confirmed in the run DOM). Button, Text field and
  Dialog point to it; Verification measures computed heights.
- Not carried from rc.7: its store-row sign-word rule (named demo trades) and the tote grid fix (the grid is gone).
- Budget: bundle about 16,000 tokens (characters ÷ 4, whitespace collapsed), under 20,000. validate: 0 errors, 0
  warnings.

1.2.0-rc.9 (2026-10-18): built on 1.2.0-rc.8 (generalization kept). Answers the two spec-caused majors of the rc.8
screen (critic-1.json, 1 of 1 sample). No generate or evaluate run.
- (Major 1) Garment sleeves drawn as separate bars with a background gap, sweater and coat sharing one outline; caused
  by rc.8's Imagery step 3 ("free-hanging parts ... keep a 1-unit background gap"). General rule now: parts attached in
  the real object (sleeve, collar, arm, leg, strap, handle, spout, lid) touch the body fill against fill along the
  attachment and angle away from it (1 unit out every 1–3 rows, far end 2+ units farther from the centre line); a
  background gap only where the real object is open (loop or ring inside, a handle's or strap's opening, between legs
  below where they join). Set-mates differ in outline in at least two of length, w ÷ h (0.2+), opening, hem, part
  count, never only in hue or an inner detail. Name test adds gate and table. The critic's "garments are one solid
  shape" wording is folded into the general attached-part rule rather than naming garments alone.
- (Major 2) Item-card summaries clamped at 2 lines (rc.6 wording inherited by rc.8): carried rc.7's fix in general
  terms — whole up to 3 lines on item cards, clamped past 3; 2 lines only in `.tiles`; a clamp never cuts a summary
  that would fit in one more line. "Product card" anatomy renamed "Item card (product, listing)".
- Carried from rc.7, generalized: the detail-page banner rule moved into Pixel stage step 1 for any set of detail
  pages (item, article, record): own lead building, own sign word, never a sibling's or the category's; a repeated
  building type changes roof, sign and colour (rc.7's store-trade examples dropped). Verification's "by hand" numbers
  line. Not carried: rc.7's tote grid (named a demo product).
- Variance, left alone: per-category vs per-item store banners (minor, reference does per-category; now covered by the
  general rule), empty-state title size, key ring and tea-towel name-test misses, headstone-like strip props, user menu
  focus, password form width (all minor).
