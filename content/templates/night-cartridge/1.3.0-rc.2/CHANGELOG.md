# Changelog

## 1.3.0-rc.2

Internal candidate. Restores the measured size band for item sprites that rc.1 had softened to "about half the window".

- Imagery, missing images, step 3: "ink about half the window" → visible ink spans 40–50% of the `.pic` window's inner
  width at the grid's narrowest and widest window and on the detail page, 19–23 visible units; an item taller than wide
  gets more rows, never fewer columns, and its height is never capped. A generic `pct()` computes the check from the
  code and flags rows to redraw.
- Verification: the sprite table (`sprite | visible units | ink px | window px | %`, every row 40–50%) is back as report
  part (1); the sprite line names the 19–23 unit width and the tall-item rule.

## 1.3.0-rc.1

Generalization candidate, built on the published system. Every rule fitted to the test apps is now the general rule
behind it, so the package serves any product. Design language, tokens, the signature recipes and the 1.2.0 drawing fixes
(attached parts touch the body and angle away; set-mates differ in outline) are kept.

- Imagery, missing images: the object catalogue (pan handle, sleeves, two fronts, lid on pot, ring vs magnifier, disc
  from above), the name-test list of past misreads, the grid arithmetic ("(1248−4×16)÷5", "192px inner",
  "minmax(236px,1fr), at most 5 columns") and `pct()` → five short steps: one silhouette (attached parts touch the
  body and angle away from it; background only where the real object is open), 2–3 defining parts, 19–23 visible
  units with ink about half the window via `item()` and `.pic`, set-mates differ in outline, a name test from the
  outline alone.
- Item grids: per-Imagery arithmetic → `.items`, auto-fill, 240px+.
- Rule 9 and block meter: "every n-of-m count (Showing n of m)", "counts (n of m, m ≤ 20): a block per item, 2 of 6"
  → progress against a real, fixed maximum (quota, steps done, capacity, items enabled out of a set) is a block
  meter; search and filter result counts stay caption text. KPI tiles carry a meter only with a real maximum.
- Pixel stage step 1: "each detail page in a set gets its own Banner lead … no sibling's page uses" → each kind of
  screen has its own scene; detail pages of one kind share their kind's Banner or vary it by category (a lead or sign
  word per category), never a scene per record. Never list: "the same scene on two kinds of screen".
- Panels: "grow the shorter (plot up to `size.chart`, more list rows) or trim the longer (5–8 activity items)",
  `2fr 1fr` → balance by adding to the shorter or trimming the longer ("View all"); widths follow content (`.wide`
  takes two shares, flex-wrap at 320px). `size.chart` moves to Charts as the plot's maximum height.
- Two-column layouts: the catalogue row's "picture window sticky or as tall as the purchase column" → a general
  Layout rule: the shorter column sticks or grows, neither ending 160px+ above the other. Catalogue row renamed
  "Catalogue, listing and cart"; totals in a Window and steppers kept as general cart guidance.
- Small standalone forms: "a footer sign-up or contact form" → a small standalone form outside the main content is a
  2px-framed `color.surface.subtle` panel with a section heading, never a full Window; Typography no longer names the
  footer.
- KPI tiles: "4/2/1 columns" → `.kpis`, one row of `--n` tiles that wraps evenly (`--n-md`), one column under
  `breakpoint.sm`.
- Card: clamp lengths stated as one rule per card kind; "(plan, option)" and "(product, listing)" → kinds; item card
  "price" → value. Layout: "image field (avatar, cover)" → "image field".
- Verification: the sprite report table and `pct()` dropped; "Every Showing n of m count has its block meter" → the
  real-maximum rule; report renumbered (variant table, per scene, files).

## 1.2.0

Scenes and drawings now read at a glance and fit any product. The scene world is derived from your product's own
domain, every screen and every detail page gets a scene of its own, and item drawings fill their picture and read by
their outline alone. Controls side by side share one height, and three recipe values that pointed at nothing now work.

- Scenes: the world comes from the product's domain (the place its work would happen, at night, with 4 to 6 kinds of
  building), not from a fixed set. The hero's lead building shows 3 or more defining features and a real sign (one
  word of at most 4 letters, a pictogram or nothing), never letter-like marks. Every screen and every detail page has
  its own lead and arrangement; a mirrored, recoloured or relit scene does not count as a new one.
- Hero on phones: the crop centres on the lead building with sky above it; the hill gets a lit rim and a stepped path.
- Item drawings: the visible ink fills 40 to 50% of its picture window, in grids and on detail pages alike; one outline
  around one connected shape; attached parts (sleeves, handles, straps, legs) join the body and angle away from it;
  items of one category differ in outline, not only in colour; every drawing passes a name test at 1x.
- Controls: buttons and fields in one row share `size.control` (40px), frame included; the large gold button stands
  alone on its row.
- Cards: item summaries show whole up to 3 lines (tiles keep 2).
- Recipes: the gold button's border uses a defined token, and the per-instance values of the rare blink and of the
  callout accent are stated, so none of them silently drops out.

## 1.2.0-rc.9

Ninth candidate of the leftovers update, built on the eighth. Attached parts of drawn items (sleeves, handles, legs,
straps) touch the body and angle away from it again instead of hanging beside it as separate bars, items of one
category differ in outline, item-card summaries show whole up to 3 lines, and every detail page gets its own banner
lead and sign. Tokens, the ten rules and the generalization of the eighth candidate are unchanged.

- Imagery step 3, attached parts: "parts that hang free in the real object (sleeves beside a body, two legs, a handle
  loop) are joined only where they attach and keep a 1-unit background gap along the rest of their length" → a part
  attached in the real object (sleeve, collar, arm, leg, strap, handle, spout, lid) touches the body fill against fill
  along its whole attachment and angles away from it, stepping out 1 unit every 1–3 rows so its far end is 2+ units
  farther from the centre line than its joint; never a straight bar parallel to the body (reads as a gate or a table).
  A 1+-unit background gap only where the real object is open: inside a loop or ring, a handle's or strap's opening,
  between two legs below where they join.
- Imagery step 4, set-mates: "differ in silhouette at 1x (width ÷ height, handle count, outline), not only in hue" →
  differ in outline, never only in hue or an inner detail; at least two of length, width ÷ height (by 0.2+), opening,
  hem or part count differ. Step 5's name test adds gate and table, and "straight bars hanging beside a body" to the
  usual causes. Verification: set-mates told apart by outline, attached parts touching the body.
- Card: item-card summaries "at 2 lines" → whole up to 3 lines, clamped past 3; 2 lines only in `.tiles`; a clamp never
  cuts a summary that would fit in one more line. "Product card" anatomy → "Item card (product, listing)".
- Pixel stage step 1: each detail page in a set (an item, an article, a record) gets its own Banner lead, a building or
  structure no sibling's page uses, its sign word naming that item or its trade, never a sibling's word or the
  category's; a repeated building type changes roof, sign and colour. Applying's item-detail row points to it.
- Verification, numbers: with no code runner, the reported numbers are computed by hand from the grid and scene
  constants (visible units × unit px ÷ window px; lead units × unit px) and marked "by hand".

## 1.2.0-rc.8

Eighth candidate of the leftovers update, built on the sixth. The package no longer names the test apps' products,
screens or worlds: every rule written around one of them is now the general principle behind it, so scenes and item
sprites work for any product. Side-by-side controls get one shared height. Tokens, the ten rules and every measured
number are unchanged.

- Pixel stage step 1: "one world per app: dashboard = server yard, store = market street, blog = post-office street,
  settings = workshop yard" and the per-world emblem and lead lists → a rule to derive the world from any product's
  domain (the place its work would happen, at night: 4–6 kinds of building or structure with 3+ domain-only features
  each), with two outside examples (a booking product as a station square, a fitness tracker as a training ground) and a
  fallback for abstract products (the place people did the same work before software);
  the world and its subjects are written in `components.md` first. The emblem lead stays the hero's or first strip's
  alone; "never an envelope plate on two leads" → "never the same sign pictogram on two leads".
- Pixel stage step 4: the four worlds' lead features → one example (station house: clock face, platform canopy,
  timetable board); sign pictograms are 8×8+ units with a closed outline; "workshop plates, never hammers or
  wrenches" → "a pictogram whose silhouette is a letter (hammer T, wrench Y, pin I) becomes a closed shape or is left
  out". Step 3: rack silhouettes → domain silhouettes; step 5: shopfront → building front.
- Imagery steps 3–5: the sweater, coat and tote grids and the duffel, skillet and key-ring outlines → general rules:
  one 4-connected silhouette, attached parts joined by fill, separate parts keep a 1-unit background gap; 2–3
  defining parts at 2+ units thick, the naming part 30–60% of the width, the real width ÷ height kept within ±0.2;
  top-down round objects as a `disc()` 60%+ wide; loops are 1-unit runs with 4×3+ units of background inside, two
  handles two separate loops 3+ columns apart; a ring is at most 6 units across and never the largest part
  (magnifier); set-mates differ in silhouette at 1x, not only in hue. Name test keeps the misread list.
- Layout adaptation, new rule: controls sharing a row (input + submit, submit + cancel or reset, toolbars, dialog
  actions) are all `size.control` high, frame included; the gold button joins at `size.control`; `size.controlLg` only
  for a gold button alone on its row; `size.controlSm` only for all-small rows (table row actions). New `.controls`
  CSS; the root block adds `box-sizing:border-box`. Button, Text field and Dialog point to it; Verification checks
  equal computed heights.
- Instance words generalized: footer newsletter → footer sign-up or contact form; "the photo" in wide forms → an image
  field; Applying rows drop their world names and "Store grid" → "Catalogue grid"; card examples "posts, projects" →
  "articles, records, listings"; the marker markup label → "Home"; Verification's tote check → set-mates told apart
  by silhouette.

## 1.2.0-rc.6

Sixth candidate of the leftovers update. The tote finally reads as a tote, item sprites are sized by the ink you can
see, post summaries show in full again, and banner leads, store category icons, blog scene subjects and the settings
form get rules that close the last gaps. Dark only and every earlier rule are unchanged.

- Imagery step 4, tote: the 20×27 grid (a tall box under one arch, read as a bucket or padlock) → a 23×21 grid with two
  separate 6×4 `hi` handle loops, background inside each and between them, a body wider than tall (w ÷ h 1.2–1.4) that
  widens toward the base, a `hi` rim, a patch pocket and an inset `shade` base row. Never one arch spanning the bag,
  sides stepping in, or a body taller than wide. Set-mates: "tote tallest, duffel lowest" → "duffel low and wide, tote
  two-handled". The name test adds bucket and pail.
- Imagery steps 1–2: sprite width counts visible units only (`hi`, `base`, `shade`, lights; never `ol`, invisible on the
  near-black window): 19–23 visible units (21–25 columns with the ring). `item()` sets a new `--v` (visible columns); the
  unit is floor(window ÷ 2 ÷ `--v`); `pct(name, --v, window)` reports visible ink, and the sprite table gains a
  "visible units" column. The sweater and coat grids are 22 columns, 20 visible (were 20 and 18).
- Card: summaries "clamped at 2 lines" → whole in `.cards` (320px+), clamped only past 4 lines; 2 lines stay for `.tiles`
  and product cards.
- Pixel stage step 4: the lead height counts visible units from its topmost non-`ol` unit; a banner unit is 2px at every
  width, so 48 units = 96px is the floor and 52–60 units (104–120px) the aim, its top at y ≤ 70. The per-scene report
  states lead height as units × unit px.
- Pixel stage step 1: the world's emblem lead (post office, shop, server hut, workshop) belongs to the hero or the first
  strip only; banners, about and later strips take other subjects of the same world (blog: press house, mail depot,
  reading room, newsstand), never an envelope plate on two leads. Merged with the "own lead per scene" sentence.
- Applying, store row: each product card's category label carries its 12px hue icon, never a bare bullet.
- Layout, forms: a form window wider than 720px lays short fields in two `.fields` columns (new CSS; one column under
  600px), long fields across both, no column ending `space.64`+ above the others.
- Verification, report part 3: lead height in units and px (banners 96+); "not written" fails it. The ten rules' closing
  line about the report is removed (Verification says it).
- Budget, true duplicates removed: the Verification lines that restated other sections (hero rim and path end, one gold
  button, three 4px frames, panels level, summary cards, newsletter titles, header switches, avatars, 390px header and tables, the "!" icon, 16/48px
  stems, focal group at 390px, two step 8 rounds); step 8's banner-lead check (step 4 has it); the `.base` mix in step 5
  (the CSS has it); "key ring and pan as wide as the bags" (every sprite is 19–23 visible units); the dropdown keyboard
  behaviour in Navigation (points to Select); the settings row's "helper aside fills the rest" (Layout's two-column
  rule replaces it); tighter wording in step 4 and the hero bullet.

## 1.2.0-rc.5

Fifth candidate of the leftovers update. The numbers an agent reports now come from its code instead of the render, the
tote can no longer be drawn as a padlock, every item sprite is drawn wide enough to stay at 40–50% of its window, post
cards get their room back, and the hero path, the store strip and dashboard panels get rules that can be checked.
Dark only and every earlier rule are unchanged.

- Verification: "every reported number is measured on the render" → numbers are computed from code: sprite rows by a
  new `pct()` helper (ink px = drawn columns × the unit the `--w` formula gives; window px from the CSS, 192px at 1440
  and 314px at 390), scene numbers from the `put()`, `path()`, `dot()` and `light()` coordinates, each computation shown.
  The ten rules close with "the report opens with the sprite and variant tables, computed from code".
- Imagery step 1: sprite width 14–20 units → every grid and detail sprite 19–23 units wide (the key ring and the pan as
  wide as the bags; key shaft 8–10 → 11–14 long); a new `item()` helper trims empty edge rows and columns so the viewBox
  is always the ink. The sweater and coat examples are 20 units wide (were 18).
- Imagery step 4, tote: body 1.2–1.5× as wide as tall with a 2-unit handle loop → body w ÷ h 0.8–1.0, sides stepping 1
  unit inward toward the bottom, two 1-unit straps from ¼ and ¾ of the top meeting in a soft arch half the body width or
  more, never a 2-unit squared loop or a box under a hollow arch; a 20×27 unit-grid example. Set-mates: the tote is the
  tallest bag, the duffel the lowest. The name test says "padlock" (was "lock").
- Layout: card grids "exactly minmax(200px,1fr)" → by content: `.tiles` (200px) only for an icon, a title and one line;
  `.cards` for anything with a summary, 320px+ and at most 3 columns; one width per card kind on every route.
  Verification checks post and project cards.
- Layout: side-by-side panels share one height (`.panels`, `align-items:stretch`), bottoms level; grow the shorter or
  trim the longer.
- Hero: the Window is 464px at the content's left edge (x 84–200), props from x 216 (was "a Window over its left third");
  tall verticals x 216–376 (was 104–376). The path is a new `path()` helper: steps 4 right per 2 down from the lead's door
  to the bottom edge, ending in x 366–416 (was "diagonal from a bottom corner"). Clusters: x 216–420 holds the focal
  group, both verticals and one cluster 16–60 units away; a second cluster may sit at x 424–476 (seen at 1920, not
  counted at 1440), which resolves the open-ground conflict at 1440.
- Pixel stage step 3: the far ridge carries 4+ roof, tree or rack silhouettes per 360 units (new `roof()` and `tree()`
  helpers), never a bare noise band; step 4: no stretch without a prop over 160 units, crop edges included.
- Budget: duplicates removed or merged: the Never line on meters in `dl`/`ul`/`tr` (Block meter says where meters sit),
  the separate banner check in Verification (merged into the per-scene report line), the hero's letter-mark check
  (step 4), "one marker per list" (marker limits), Applying rows that restated the Table, Empty state and Motion
  sections, "Dense screens shed art" (merged into Applying's opening), the Pixel type font names (in the tokens);
  tighter wording elsewhere; the demo scene code uses one declaration per group.

## 1.2.0-rc.4

Fourth candidate of the leftovers update. Each scene now has to be its own (two articles or two products no longer
share one recoloured scene), the result-count meter is checked again, the coat and the bags get silhouettes that read at
1x, and the gold button no longer points at a missing token. Dark only and every earlier rule are unchanged.

- Pixel stage step 1: "screens differ by crop, props or lit lights" → every scene has its own lead and focal group;
  each strip, the about page and every item of one type (articles, products, projects) takes a different lead sprite
  (another subject or outline, not mirrored) in another arrangement; recolouring or relighting is not a different
  scene. Verification: banners of items of one type and the about page differ in lead sprite and arrangement
  (mirrored, recoloured or relit fails), and the report lists each banner's lead and focal group.
- Rule 9: "n-of-m progress" → "every n-of-m count (Showing n of m)" is a block meter; Verification restores the check
  that every "Showing n of m" or "n of m on" count has its block meter.
- Imagery step 4: the coat is now an 18×22 unit grid (one body block, sleeves outside it, a 2-row V collar dip, a `hi`
  button column, fronts never parted below the collar); the tote body is 1.2–1.5× as wide as tall (was "wider than
  tall"); set-mates differ in silhouette at 1x, not only in hue; the name test adds "a letter" and "its set-mate".
- `.btn-gold`: border `var(--color-action-primary-edge)` (undefined since the dark-only update) →
  `var(--color-action-primary)`. Every `var(--…)` in the code blocks is now a token or a property the spec sets
  (`--from`, `--to`, `--n`, `--dx`, `--dy`, `--tone` documented per instance).
- `nc-rare`: travel starts at 90% (was 95%), so its 5 frames last about 277ms (were about 137ms), inside the
  250ms loop-frame minimum.
- Pixel stage step 4: the workshop's tool board (hammer, wrench, saw) → a workshop plate: a gear (8×8+ units, 2-unit
  teeth, 2×2 hole), a saw blade 6×3, or plain; never hammers or wrenches. The lead feature "a tool board" → "a gear
  plate"; Verification's "every tool 4×4+" → "workshop plates are a gear, a saw or plain".
- Navigation: the header's switches are the same set on every route of the app; the Pixel body switch sits on every
  route of an app with long prose or dense tables (was "screens with").
- Imagery, Avatars: a hashed mirrored sprite, or initials where copy promises them → one treatment in every app:
  1–2 initials in `color.text.strong` on a name-hashed `color.hue.*` mixed 55% into `color.art.sky1`; never
  monochrome identicons.
- Imagery, Charts: the panel caption sits at its top padding with the plot right under it. Layout: card grids use
  `repeat(auto-fit,minmax(200px,1fr))` exactly.
- Verification: the sprite table moved into a report the agent writes last, in a fixed order (sprite table, variant
  table, per-scene numbers with each banner's lead, files and decisions); a report missing a part fails, and an app
  without item pictures writes "Sprite table: no item sprites". Per-screen checks add header switches and avatars the
  same on every route.
- Budget: true duplicates removed: one-frame lines in Dialog, Toast and Tabs (Motion), Card's focus and press line
  (Interaction), Table's touch rows (Accessibility), the Pixel stage reduced-motion line (rule 7), the Stepped motion
  limits list (rule 7), the chart height cap in Imagery (Layout), Text field's "frame unchanged" (it contradicted
  Interaction), the marker Where list (rule 5), a 1440px crop restatement (step 4), Card's loading and Checkbox's
  one-frame lines (Motion), Empty state's error recipe (Applying the concept, Error).

## 1.2.0-rc.3

Third candidate of the leftovers update. The five drawing problems that survived two rounds of prose (grid sprites
under 40%, cuffs and hems behind an outline row, a magnifier-like key ring, letter-like marks on the workshop wall,
hero verticals at the frame) are now measurable procedures with a measured check, plus outline recipes for the tote,
coat, duffel and skillet. Dark only is unchanged.

- Imagery, Missing images: prose → five numbered steps. Tight box: the viewBox is the ink's bounds (first and last
  column and row each hold a pixel), `--w` 14–20 units. Size: product grids `repeat(auto-fill,minmax(236px,1fr))`, at
  most 5 columns at 1440px (was 6), picture windows 190px+ inner. One silhouette: `ol` only around the outside, joints
  fill against fill, collar a 1-row dip with no shoulder bumps, with an 18×13 sweater unit grid. Outlines: tote (handle
  loop at ¼–¾ of the top, corners cut, fill joined; not a shackle), coat (open lapels, buttons, sleeves), duffel
  (barrel with end caps and one arch), skillet (`disc()` pan 60%+ of the width, handle 30–40%), key ring (the key is
  the largest part: bow, shaft, teeth; ring at most 6 units; never a big ring with a tag). Name test at 1x.
- Pixel stage step 4: "no bars that read as letters" → free-standing 1-unit verticals 2–6 tall (alone or in 2–4s) or
  a horizontal run touching one are forbidden on walls, boards and plates; verticals only edge a door, window or wall.
  The workshop's "board of hammer, wrench and saw" → a tool board of 2–3 filled tools 4+ units each (hammer, wrench,
  saw sizes given), a gear plate, or plain.
- Pixel stage step 4: tall verticals "12+ units in (hero x 72–408, banner x 50–670), never both in the outer 10%" →
  x spans inside 12–88% of the 1440px crop (hero x 104–376, banner x 116–604), one within 40 units of the focal group;
  new Crop edges rule: no prop crosses the 1440px crop (hero x 60/420, banner 38/682) or the scene's ends, at most one
  prop per side in the outer 10%.
- Pixel stage step 1: the hero's lead and focal group appear only in the hero; banners and strips use another lead
  variant.
- Verification: every reported number measured ("checked by eye" fails); a required table `sprite | ink px | window px
  | %` for every grid and detail sprite at 1440px and 390px, every row 40–50%; vertical x spans, outer-10% props and
  crop crossings reported per scene; squint test for letter-like parts and 4×4 tools; banners never reuse the hero's
  group; a missing required table fails.
- Budget: Verification's per-screen list keeps only checks not stable for two rounds (the dropped ones are still rules
  in Card, Badge, Navigation, Select, Layout and rule 9); duplicates of the marker CSS, Interaction and Motion
  removed from component states; wording tightened elsewhere. No rule removed.

## 1.2.0-rc.2

Second candidate of the leftovers update. Answers critic-1 on rc.1: product sprites measured by their svg box instead
of their drawing, loose garment cuffs, a magnifier-like key ring, letter-like marks beside signs, verticals hugging the
frame, a starved name column in small tables, a frameless mobile hero Window, clamped card summaries and square mobile
pictures, and the carried avatar, chart and error-icon notes. Dark only is unchanged.

- Imagery, Missing images: "fills 40–50% of its window's width" → the drawn silhouette (outline included) spans 40–50%
  of the window's inner width; the viewBox is cropped tight to the ink; `--w` is at most the smallest window ÷ 8 px
  (162px: 20 units) so the rounded unit never drops under 40%. Parts (sleeves, cuffs, hems, ribbing, straps) touch the
  body's fill directly, no outline row between. Key ring: a key or tag hangs to one side, never a ring above a straight
  bar.
- Pixel stage step 4, Signs: each plate is exactly one pictogram, one real word or plain; no 1–2-glyph mark beside it
  and no bars that read as letters anywhere; the workshop's rack is a board of hammer, wrench and saw.
- Pixel stage step 4: tall verticals "4+ units in (hero x 64–416, banner x 42–678)" → 12+ units in (hero x 72–408,
  banner x 50–670), never both in the outer 10% of the width.
- Hero: the path's steps go 2–4 units sideways in one direction, a diagonal from a bottom corner; under
  `breakpoint.lg` the Window below the stage keeps its four-sided frame inside the gutter.
- Banner: under `breakpoint.lg` the crop centres the focal group (`--lx`, new CSS rule beside the hero's); each product
  or article page takes its own focal group or crop from its item (step 1).
- Table, Small screens: the first pinned column (`data-pin="first"`) takes the remaining width (`width:100%;max-width:0`) and shows 16+
  characters at 390px, the others shrink to content (`width:1%`); `table-layout:fixed` removed.
- Card: description "one line" → up to 2 lines (`-webkit-line-clamp:2`), never cut to 1 where there is room; product
  picture windows `aspect-ratio:4/3` under `breakpoint.sm`.
- Imagery, Avatars: where copy promises initials, the placeholder shows 1–2 pixel initials on a hashed hue square;
  never change the copy.
- Charts: new token `size.chart` (240px) caps the plot height; bars mixed 55% into `color.surface.subtle`. Layout and
  the Dashboard row point to it.
- Text field: the error icon is a 6×6-unit "!" (rows given), never a triangle or padlock shape.
- Verification: sprite ink measured (not the svg box) at both widths with each percentage reported; verticals 12+ units
  in; signs by kind; diagonal path; framed mobile hero Window; centred focal group at 390px; product pages differ;
  table first column 16+ characters; "!" at 1x; promised initials shown.
- Budget: duplicates trimmed (rule 3's bold/tracking, rule 8's "behind text", rule 9's window spec, Never's flat wall,
  the Strip's Banner list, press offsets in RPG Limits and Interaction, chrome's cards line, component hover lines now
  "per Interaction", the gold button spec now `.btn-gold`, a few code comments). Tabs hover now follows Interaction
  (`color.text.strong`). No rule removed.

## 1.2.0-rc.1

First candidate of the update that clears the leftovers from the 1.1.0 review (critic-1 on 1.1.0-rc.2). Every
regression and open issue it listed becomes a checkable rule plus a Verification line. Dark only is unchanged.

- Pixel stage, step 4: the lead names its world by 3+ defining features of 2+ units (post office: envelope plate,
  flagpole, mail slot; shop, server hut and workshop lists), never a plain window-grid block. Signs: a pictogram,
  real 3×5-unit letters (one real word, ≤4 letters) or a plain plate. Never: "text inside art" → text in art except
  a sign's real 3×5 letters, never letter-like marks; a lead without its features.
- Pixel stage, step 4: tall verticals sit wholly inside the 1440px crop, 4+ units in (hero x 64–416, banner x 42–678).
- Hero placement: under `breakpoint.lg` the crop window was "y 48–128, walls below y 48" → a fixed window y 24–104
  centred on the lead (`--lx`, new CSS line in the stage block), x `--lx`±48 at 390px; the lead ≤80 units wide, base
  y 86–100, top at y ≥40, so 16+ units of sky show above it; 2+ stars in y 26–34.
- Hero rise rim: "1-unit `.haze` dots" → a continuous 1-unit `.sky-6` line over a 1-unit `.haze` line (`.haze` on the
  near ground is about 1.8:1, `color.art.sky6` 3:1); path: "2-unit `.far` steps" → 3+ `.haze` steps 4–8×2 units.
- Imagery, Missing images: the 40–50% width rule now covers product detail at every width, at an integer unit
  scaled by a container-query `round()` line, never a fixed size; sprites are one connected silhouette (touching
  parts share a unit edge, no background gap inside the outline). Card grid and Store rows point to it.
- Typography: standalone sections (newsletter, contact, footer ones too) open with a `title` h2, never a 16px label.
- Navigation: the product name never hides at any width, in any app.
- Table: under `breakpoint.sm` "scrolls in its wrapper or stacks as cards" → only `data-pin` columns show (first +
  one or two), the rest `display:none`; one-line cells with ellipsis, `.sub` lines hidden, every row `size.row`.
- Verification: lead subject, features and signs; tall verticals' x spans; the 390px hero with 64px+ sky; the rim at
  1x; product sprite ratio 0.40–0.50 on grid and detail at both widths and one 4-connected region; section titles
  32px; header name at 390px; mobile tables pinned-only, one-line, equal rows.
- Budget: shorter block-meter paragraph (the `dd` markup example dropped, the rule kept), hero and table wording,
  code comments, Verification merged into fewer bullets, duplicates of rule 3 and Shape trimmed; no rule removed.

## 1.1.0

Night Cartridge is now dark only, like the console it comes from. The light day theme is gone: apps stay on
the night palette whatever the device setting, with no theme switch. Product pages get their own scene, and
product drawings are easier to recognise.

- Appearance: the day theme is removed (its palette, sky colours and token file); `tokens.css` sets the night
  values on `:root` with `color-scheme: dark`, and never follows the device setting. Remove any light theme or
  theme switch the app had.
- Scenes: the short strip is only for store grids, carts, dashboards and settings; product detail, article and
  about pages take the banner. Two screens never show the same scene.
- Product drawings fill 40 to 50% of their picture window and read by outline alone (a pan is round with a rim
  and handle).
- Charts: bars at most 40% of their slot, a 12px axis with 3 to 5 values, never heavier than the KPI numbers.
- The hero's hill gets a lit top edge; on settings, forms share one width with the scene window above them.

## 1.1.0-rc.2

Second candidate of the dark-only update. Answers critic-1 on rc.1 (product detail took the strip and repeated the
store scene; product sprites shrank). Nothing about the theme changes.

- Pixel stage, Strip: "for product screens" → only for store grid, cart, dashboard and settings screens; never on
  product detail, article or about pages, which take the Banner. Applying the concept, Store grid and cart row:
  product detail is not a store-grid screen and takes the Banner row.
- Never: the same scene on two different screens (same props at the same x; each screen has its own focal group).
- Applying the concept, Card grid: product sprites fill 40–50% of the picture window's width and read by outline
  alone (a pan round with a rim and handle, a key ring a loop with a fob).
- Imagery, Charts: bars at most 40% of their slot width, a 12px y-axis with 3–5 values; Dashboard row: the chart never
  outweighs the KPI numbers.
- Hero placement: a 1-unit lit rim (`.haze`) along the rise's top edge.
- Applying the concept, Settings row: form windows and the scene window share one content width, or a helper aside
  fills the space.

## 1.1.0-rc.1

Night Cartridge becomes dark only. The derived parchment day theme is removed; tokens.css sets the night values
on `:root` with no system or attribute switch, and nothing else in the design changes.

- Tokens: `semantic.light.json` deleted; the day primitives removed (`palette.day.*`, `palette.gold.deep`,
  `palette.scrim.day`, the `*Day` status, hue and syntax colours, the day scene ramp `palette.art.daySky1`…`daySky6`,
  `dayFar`, `dayNear`, `beaconOffDay`).
- `color.action.primaryEdge` removed (it equalled the gold fill at night); the gold button's 2px border is now
  `color.action.primary`.
- Manifest: appearance `light, dark` → `dark`; keyword `dark-first` → `dark-only`; the day theme dropped from the
  derived list in the provenance notes.
- Pixel stage: walls always mix `--base` 55% into `color.art.sky1`; the `--wall` variable and its theme switch are gone.
  Never: "a square moon or sun" → "a square moon"; "full-hue walls at night" → "full-hue walls".
- Color use: new first line, dark only. Agent instructions: tokens on `:root` with `color-scheme: dark`, never a light
  theme or theme switch (an app that must support light is not a fit); existing projects remove theirs; Verification
  checks each screen once instead of in light and dark.

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
