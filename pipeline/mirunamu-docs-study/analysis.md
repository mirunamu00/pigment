# mirunamu-docs-study

Reference: a Korean-language developer documentation site (personal tech notes), captured 2026-10-14. 14 pages
surveyed of 55 known (sitemap exhausted, robots respected), 7 captured in depth at desktop 1440 and mobile 390.
The site is **dark-only**: every page has `class="dark"` on the root and `color-scheme: dark`
(`reference/theme.json`), so all screenshots named `*-light.png` actually show the dark appearance.

Evidence keys: `shot:` = `reference/screenshots/`, `crop:` = `reference/components/`, `ix:` = `reference/interactions/`,
`mo:` = `reference/motion/`, `ill:` = `reference/illustrations/`, `S:` = `reference/styles.json` key,
`M:` = `reference/motion.json`, `I:` = `reference/interactions.json`, `inv:` = `reference/inventory.json`.
Brand terms (the site's name, its owner handle, the logo) are never repeated below except where the provenance
section has to name what must not carry over.

**Noise excluded:** the GitHub mark in the header, third-party sonner toast keyframes (`swipe-out-*`, loaded but
unused, `M: p2.keyframeRules`), and recharts' internal SVG on the vitals page (counted as `svg:line-drawing` by the
survey; it is a chart, not a drawing).

## Character

A 16-bit console game booted up as a documentation site: a night-blue ground, cream text in a single pixel
typeface for both Hangul and Latin, and hard-edged "game windows" (4px frame, 0 radius, hard black drop shadow)
that hold the content. Every page opens on a small living pixel diorama — a moonlit cabin, a snowy ridge, a strip
of grass with a sprite walking along it — whose stars, LEDs, smoke and snowflakes move only in **stepped**
frames (`steps(1)`…`steps(360)`, never tweened), while the UI itself reacts instantly (0 ms transitions) with an
RPG menu cursor ▶, a gold focus ring and buttons that physically drop 2–4px when pressed. Beneath the costume the
reading surface is calm and dense: 720px prose, 16px type on 28px lines, tables and code blocks with no art inside.

Keywords: 16-bit, pixel-grid, night-console, stepped-motion, rpg-cursor, game-window, hangul-pixel-type, dithered.
Tone tag: **playful** (with a technical, documentation-grade reading surface).

What you would lose by changing one thing:
- Switch the animation timing to `ease` and the scene stops being a game and becomes a parallax gimmick; every
  keyframe on the site uses `steps(n)` (`M: p1.animations[*].easing`, `M: p2.animations[*].easing`).
- Give anything a border radius or a blurred shadow and the pixel grid breaks; `S: radius` is empty and the only
  shadow is `rgb(0,0,0) 4px 4px 0px 0px` (`S: shadow`, 100%).
- Swap the pixel font for a normal sans and the Hangul loses its bitmap voice — 100% of text is weight 400 in a
  pixel face (`S: fontFamily`, `S: fontWeight`).
- Drop the ▶ cursor and hover becomes a generic background tint; the cursor is what makes menus read as a game menu
  (`ix: p1-card-8.png`, `ix: p1-nav-link-6.png`).

## Site survey

- **Pages:** 14 surveyed of 55 known (`reference/survey.json`, `stoppedBy: exhausted`); 7 captured in depth.
- **Page types:** home (1), docs index `/docs` (1), category index `/docs/*` (10 known, 5 surveyed), article
  `/docs/*/*` (41 known, 5 surveyed), about `/about` (1), metrics dashboard `/vitals` (1).

Site-wide (share ≥ 70%):

| Feature | Share | What it actually is here |
| --- | --- | --- |
| layout:sticky-header | 100% | 68px header (64px bar + 4px dithered rule), never changes on scroll (`reference/structure.json` `afterScroll`) |
| svg:icon | 100% | 24×24 and 12×12 pixel icons, fill only, no strokes (`reference/icons/*.png`) |
| ui:current-page-marker | 93% | the gold pixel ▶ cursor beside the current nav item / sidebar item / TOC item |
| motion:animation / loop / marquee | 86% | stepped ambient loops in the page's pixel scene (snow fall, cloud drift, twinkle, idle bob) |
| svg:illustration | 86% | pixel-art scenes built from 1×1 rect paths (`reference/raw/svg/p1-i1.svg`, `p2-i2.svg`) |
| layout:logo-wall | 71% | false positive for a logo wall: a row of repeated small SVGs — pixel conifer sprites in the banner and footer ground strip, and the category icon list in the sidebar. No third-party logos exist. |

Mid-frequency: ui:table 43%, ui:code-block 36%, ui:disclosure 36%, ui:quote 36% — all inside articles.
One-offs: card-grid 21% (home categories, about tech stack, vitals metric cards), motion:svg 14% (home hero and
about avatar), ui:badge 14% (filter chips on `/docs`), ui:theme-toggle 14% (actually the "pixel body font"
on/off switch in the article header, not a color theme toggle — see Theming), svg:line-drawing 7% (recharts bars
on `/vitals`), ui:tabs 7% (file tabs above code blocks).

The pixel scene, the stepped loops, the cursor and the pixel type are site-wide; the template is built on those.

## Signature elements

Ranked candidates (distinctiveness × coverage): (1) living low-res pixel diorama at the top and bottom of every
page — no default UI has it, 86% of pages; (2) stepped `steps(n)` motion everywhere — unique timing habit, every
animation on the site; (3) RPG menu cursor ▶ + instant, physical interaction — 93% current-marker share plus every
interactive element; (4) game-window chrome: 4px frames, hard shadow, dithered rules, block meters, 4px colored
top bars — every page; (5) pixel typeface for Hangul and Latin at integer sizes — 100% of text. Lesser candidates
not promoted: the 8-hue category color system (folded into 4), the walking sprite in the footer (folded into 1),
the header "animation on/off" switch (folded into 2).

### 1. The living pixel stage (diorama)

- **What:** a low-resolution scene drawn on a coarse grid and scaled up by an integer factor: the home hero is a
  488×130-unit SVG drawn at 4× (1952×520 px, `inv: p1.svgs[0]`, viewBox `0 0 488 130`); article and category
  banners are 720×128 at 2× (`reference/raw/svg/p2-i3.svg` viewBox `0 0 720 20` drawn at 1440×40). Every shape is
  a filled rect path (`M156 0h1v1h-1z…`), no strokes (`inv: p1.svgs[0].strokes` is empty, 94 fills). Sky is
  horizontal colour bands (`--art-sky-1…9`: `#002 #204 #426 #648 #848 #a46 #c64 #e84 #ea4`) joined by 2px
  checkerboard dither rows (`ill: p2-g3.png`, zoom of the banner). Silhouettes are stepped polylines
  (`M0 128V56H8V64H16V56…` in `reference/raw/svg/p2-i2.svg`). Small sprites (16×40 to 80×80 px) sit on it:
  conifers, a cloud, a moon with a dithered halo, a small seated figure with a laptop (`ill: p2-g2.png`).
  Three placements: **hero scene** (home, full-bleed 520px, a game "dialog window" overlaid on the left,
  `shot: p1-desktop-light.png`), **banner window** (top of every article and category page, 256px scene inside a
  4px `#888898` frame with the title block below it on `#101018`, `shot: p7-desktop-light.png`), **ground strip**
  (every page's footer: 32px grass band `--art-grass #4a2` with lighter checker texture and a 6px dirt edge
  `--art-dirt #642`, trees, a coin and a walking sprite standing on it, `crop: p1-light-footer-1.png`).
- **Evidence:** `reference/screenshots/p1-desktop-light.png`, `reference/motion/p1-v1.png`,
  `reference/motion/p2-m1.png`, `reference/illustrations/p2-g2.png`, `reference/raw/svg/p1-i1.svg`,
  `reference/raw/svg/p2-i2.svg`, `reference/styles.json#cssVariables` (`--art-*`).
- **Frequency:** scene or banner on 12/14 surveyed pages (`svg:illustration` 86%); ground strip on all 7 captured
  pages; the `/docs` index and `/vitals` dashboard carry only the ground strip.
- **Recipe (original instance):**
  1. Pick a pixel unit: 4px for a full-bleed hero, 2px for a banner or card art, 2px for icons. Author the SVG at
     1 unit = 1 viewBox unit and scale with `width/height` (e.g. viewBox `0 0 360 64` drawn at 1440×256 for 4×).
     Set `shape-rendering="crispEdges"` on the SVG and `image-rendering: pixelated` on any raster.
  2. Draw only filled axis-aligned shapes: `<path d="M x y h w v h h -w z">` runs or `<rect>`s on integer
     coordinates. No strokes, no curves, no gradients, no opacity blending inside the art (except the dither
     overlays below).
  3. Sky/ground = 4–9 flat horizontal bands from a ramp of 3-digit hex colors (12-bit, e.g. `#013 #124 #236 #358`);
     join neighbouring bands with a one-unit checkerboard row of both colours (dithering). Horizons and hills are
     stepped polylines whose step height is 4–8 units.
  4. Silhouette layer(s) one value darker than the band behind; distant objects as flat shapes, near objects with
     one highlight colour (top-left) and one shadow colour (bottom-right) — never more than 3 tones per object.
  5. 1–2 small "hero" sprites (12–20 units tall) with a 1-unit near-black outline (`#101018`), plus 3–6 single-unit
     lights (stars, windows, LEDs, a lamp) that will blink. Choose subjects from the product's own world (a
     server rack, a mailbox, a greenhouse, a lighthouse), never the reference's cabin-and-poplar scene or its
     figure.
  6. Frame: banners sit inside a game window — 4px solid `line-strong` border, contents on `surface.window`
     (#101018), title block below the art in the same frame. Hero scenes run full-bleed with the window
     floating over the left third.
  7. Ground strip footer: a 32px band of the ground colour with a 2px checker texture in a lighter value, 6px edge
     band below, 2–4 sprites standing on it; `pointer-events: none`, `aria-hidden="true"`.
- **Motion:** stepped ambient loops on single-unit parts (see signature 2): stars `opacity 1 → .35 → 1` at
  `steps(1)` 2400ms; LEDs `opacity 1 ↔ .15` at 900/1400/2300ms with negative delays so they never sync; chimney
  smoke `translate(0,0) → (-16px,-36px)` + fade over 5000ms `steps(10)`; snow layer `translateY(0 → 128px)` 6000ms
  `steps(32)` (a 2×-tall tiled layer, so the loop is seamless, `mo: p2-m1.png`); cloud drift
  `translateX(-80px → 720px)` 120000ms `steps(200)` (`mo: p2-v7.png`); far cloud band `translateX(0 → -1440px)`
  300000ms `steps(360)` (`mo: p1-m3.png`); a meteor that appears for 4% of a 14000ms cycle and jumps 16px per step
  (`mo: p1-m2.png`); the footer sprite is an animated image (`mo: p5-v1.png`, swapped for a still under reduced
  motion via `.sprite-anim`/`.sprite-still`).
- **Application map:**
  - Marketing/landing hero → full-bleed 4× scene with a game window holding the headline and two buttons.
  - Page header of any content page (article, product detail, project) → 2× banner window, 192–256px tall, title
    block below the art in the same frame.
  - Dashboard → no scene at the top; a 96–128px banner window only on the overview page, or just the ground strip
    in the footer. Data panels stay art-free.
  - Settings → ground strip footer only; optionally a 64px-tall vignette (one sprite, one light) at the top of the
    settings landing page.
  - Form / onboarding → a narrow 2× vignette above the first step whose single sprite changes pose per step
    (sitting → standing → waving); 160px max.
  - Empty state → a 96×96 px (48-unit at 2×) still vignette: one object + one blinking light, centered over the
    message.
  - Error / 404 → the same scene at night with lights off except one red blinking beacon (`#f85858`-like,
    2000ms `steps(1)`), message in a game window below.
  - Loading → the ground strip with a sprite walking in place (2–4 frame cycle, `steps(1)`), or a block meter
    (signature 4); never a spinner.
  - Data table → none inside; the page may keep its banner and footer strip.
  - Toast / notification → no scene; a 12×12 pixel icon only.
- **Limits:** one scene per screen (hero *or* banner), plus the footer ground strip. Never behind text, controls,
  charts or table rows; never inside cards in a list. Max 2 moving sprites and ~8 blinking single-unit lights per
  scene. All art `aria-hidden`; nothing meaningful lives only in the art. Reduced motion: every loop stops on its
  first frame, animated images swap to stills. Never reuse the reference's cabin, poplar tree, figure or walking
  character.

### 2. Stepped motion (frames, not tweens)

- **What:** every CSS animation on the site uses a `steps()` timing function — `steps(1)` for blinks, swaps and
  bobs, `steps(10)`–`steps(360)` for travel — so movement happens in whole-pixel jumps like a console running at a
  low frame rate (`M: p1.animations[*].easing`, all 14 on the home page; `M: p2/p4/p7.animations`). UI transitions
  are `transition-duration: 0s` on every captured element (`I: *.base.transitionDuration`, `S: transition` empty):
  states switch on the next frame.
- **Evidence:** `reference/motion.json`, `reference/motion/p1-m1.png` (idle bob), `reference/motion/p1-m2.png`
  (meteor), `reference/motion/p2-m1.png` (snow), `reference/motion/p1-m3.png` (drift),
  `reference/interactions.json` (`transitionDuration: 0s`).
- **Frequency:** 12/14 pages animate (86%); every animation on every captured page is stepped; every interactive
  element switches instantly.
- **Recipe:**
  - Motion tokens: `--step-blink: steps(1)`, travel `steps(N)` where N = distance in px ÷ pixel unit (e.g.
    800px at 4px units → `steps(200)`; the reference's cloud drift is exactly 800px / 200 steps).
  - Keyframes only change `opacity`, `transform: translate()` in whole-unit multiples, `transform: scale()` for
    sparkle, or swap a background colour — never rotate by fractional degrees, never blur.
  - Idle bob for any sprite/avatar: `@keyframes idle { 50% { transform: translateY(-4px) } }`, 1000ms,
    `steps(1)`, infinite (`mo: p1-m1.png`).
  - Blinks: `@keyframes blink { 50% { opacity: .15 } }`, durations chosen from 900/1400/2300ms with negative
    delays so neighbours desync.
  - Sparkle: `scale(1) → scale(.34) → scale(1)` at 70%/85% of 3200ms, `steps(1)`.
  - Rare events: a long cycle (14000ms) with the visible part compressed into the last 4% (meteor), so the scene
    has a surprise without constant motion.
  - UI: `transition: none` on buttons, links, cards, rows, tabs, disclosures. If an agent framework adds default
    transitions, override them.
  - Provide a header switch "Animation on/off" (pause glyph + label) that sets `animation-play-state: paused` on
    the stage and swaps animated images for stills; persist the choice.
- **Motion:** as above — triggers are `loop` (ambient) and `state-change` (instant UI swap); there are no load,
  scroll or reveal animations (`M: *.reveals` empty).
- **Application map:**
  - Hero / banner scene → ambient stepped loops (signature 1).
  - Avatar / profile card → idle bob 4px, 1000ms `steps(1)`.
  - Dashboard live status → a 6px square status light that blinks `steps(1)` 900ms only while a job is running;
    static when done.
  - Loading → block meter filling one block per step (`steps(blocks)`), or a 3-frame "…" that swaps with
    `steps(1)` at 400ms per frame.
  - Form validation → error message appears instantly; the field frame shakes 2 frames (`translateX(2px)` →
    `0`, `steps(1)`, 120ms × 2 — derived, the reference has an unused `pixel-nudge` keyframe of exactly
    `translate(2px)`, `M: p2.keyframeRules`).
  - Settings toggles → instant swap of the switch thumb from one end to the other (no slide).
  - Toast → appears and disappears in one frame; optional 2-step drop (`translateY(-8px → 0)` `steps(2)` 100ms).
  - Tables → no motion at all.
- **Limits:** no `ease`, `ease-in-out`, cubic-bezier or spring anywhere. No scroll-driven or entrance animations.
  Loops only in art and status lights, never on text, buttons or data. Under `prefers-reduced-motion: reduce`
  every animation and transition is removed (`M: p1.reducedMotionRules`) and animated images are replaced by stills.

### 3. The RPG menu cursor and physical, instant interaction

- **What:** a 4×7-unit pixel triangle ▶ drawn at 2px per unit (8×14px), filled with the gold accent `#d8a848`,
  with a bevel — the top-left edge lit by white at 45% opacity, the bottom-left edge shaded by black at 40%
  (`S: cssVariables --cur-right-shape / --cur-right-shade`, also left/up/down variants). It marks the current item
  in the header nav, the sidebar, and the table of contents, and appears in front of a card title on hover
  (`ix: p1-card-8.png`). Disclosures and folder rows use the down/right variants as their chevrons
  (`ix: p2-disclosure-2.png`). Pressing a control moves it physically: header buttons `translate: 2px 2px`; the
  gold primary button drops 4px into its own hard shadow, which disappears (`boxShadow 4px 4px 0 #000 → none`,
  `transform → translate(4px,4px)`, `ix: p1-button-3.png`); code copy buttons move 2px. Focus is a 4px solid gold
  outline offset 3px (rows: offset −4px, inside) (`I: *.focus`).
- **Evidence:** `reference/interactions/p1-card-8.png`, `reference/interactions/p1-nav-link-6.png`,
  `reference/interactions/p1-button-3.png`, `reference/interactions/p2-disclosure-2.png`,
  `reference/styles.json#cssVariables`, `reference/interactions.json`.
- **Frequency:** current-page marker on 13/14 pages (93%); press offset on every button captured on all 7 pages;
  the same focus ring on every interactive element captured (56 interactions).
- **Recipe:**
  - Build the cursor as a CSS mask so it takes `currentColor`: `mask: var(--cur-right-shape)` where the shape is an
    inline SVG `viewBox="0 0 4 7" shape-rendering="crispEdges"` made of 1-unit rows (1,2,3,4,3,2,1 wide). Layer a
    second element with the shade SVG (white .45 on the upper diagonal, black .4 on the lower diagonal). Size 8×14px
    (2px units); 6×10px variant for 12px contexts. Make left/up/down variants by rotating the row data, not CSS
    rotation.
  - Placement: absolutely positioned 8px left of the label, vertically centred; reserve the space so labels never
    shift. Colour `accent` (gold) for current/selected, `text-hi` for hover-preview on cards.
  - States (all `transition: none`):
    - hover: background `#282838` (`sel`) on rows, nav items and ghost buttons; cards go from `#202028` to
      `#282838` and show the cursor before the title; text links switch colour to `text-hi`.
    - press: `translate: 2px 2px` for bordered/ghost controls; filled buttons with the hard shadow move 4px and
      lose the shadow.
    - focus-visible: `outline: 4px solid accent; outline-offset: 3px` (rows and full-width summaries: `-4px`).
    - current: cursor ▶ visible + `text-hi`; in the sidebar also a `sel` background.
    - open (disclosure): chevron swaps right → down cursor in one frame; summary background `#28303c`-ish tint with a
      4px cyan left bar (`ix: p2-disclosure-2.png` open state).
- **Motion:** instant state change, no transition; optional 2-frame blink of the cursor (`opacity 1 ↔ 0`
  `steps(1)` 1000ms) only on the single "you are here" item in a menu — derived, the reference's cursor is static.
- **Application map:**
  - Navigation (top bar, sidebar, TOC) → cursor marks the current item.
  - Card grid / list rows → cursor appears in front of the title on hover and focus.
  - Dashboard → selected filter, selected time range and the row being inspected show the cursor; hover rows get
    the `sel` background.
  - Data table → the selected row has the cursor in a fixed 16px leading gutter; sortable header shows up/down
    cursor variants for sort direction.
  - Forms → radio and select options render as a menu list with the cursor on the chosen item; the focused field
    has the gold 4px ring.
  - Settings → each section list is a game menu: cursor on the active section; toggles flip instantly.
  - Disclosure / FAQ → right/down cursor as the chevron.
  - Empty state → the single call-to-action button has the cursor before its label.
  - Error → "Retry" as the focused primary button with the cursor.
- **Limits:** exactly one cursor per menu or list (current *or* hover-preview, never both visible in the same list
  — when hovering, the current one stays and the preview appears on the hovered row only if it is a card grid).
  Never as decoration on headings. Press offsets never exceed 4px; nothing else moves on hover.

### 4. Game-window chrome: hard frames, hard shadow, dithered rules, block meters

- **What:**
  - **Window frame:** 4px solid `#888898` border, `#101018` interior, 0 radius — the home hero dialog and every
    article/category banner (`shot: p1-desktop-light.png`, `shot: p7-desktop-light.png`).
  - **Code window:** the same 4px `#888898` frame around code blocks, a 40px title bar on `#202028` with the
    language label and a 2px-bordered "copy" button, code on `#101018` with line numbers (`crop: p2-light-code-1.png`).
  - **Hard shadow:** the only shadow is `4px 4px 0 0 #000`, used on the gold primary button (`S: shadow`).
  - **Dithered rules:** the header's bottom edge is a 4px band of 2px checker (`#303040` on the ground,
    zoomed from `shot: p2-desktop-light.png`); article H2s sit on a 4px-tall zigzag checker rule of 2px cells in
    `#686878`; sidebar list separators are 2px dots every 6px in `#686878`. No 1px hairline under headings.
  - **Category colour bars:** each category owns one of 8 saturated hues
    (`#44ccee #cc88ee #66aaee #eeaa22 #44cc66 #ee88cc #ee8844 #44ccaa`, `S: borderColor`); a card shows it as a 4px
    top border, lists show it as a 6px square bullet, and its 24px pixel icon uses it as fill
    (`crop: p1-light-card-1.png`).
  - **Block meter:** scores are shown as a row of 20 separate 12×16px blocks with 4px gaps in the success green
    `#88b888` (`shot: p3-desktop-light.png`, metric cards) — an HP bar, not a smooth progress bar.
  - **Callouts:** 4px left bar in the semantic colour, 24px pixel icon, title in the semantic colour, body on
    `#202028` (`shot: p2-desktop-light.png`, the warning callout).
- **Evidence:** `reference/components/p2-light-code-1.png`, `reference/components/p1-light-card-1.png`,
  `reference/screenshots/p3-desktop-light.png`, `reference/screenshots/p7-desktop-light.png`,
  `reference/styles.json` (`shadow`, `borderWidth`, `borderColor`, `radius`).
- **Frequency:** header rule on 14/14 pages; window frame on 12/14 (every banner and the home hero); code windows
  on 5 (36%); colour bars on home, docs index, vitals, about; block meter on `/vitals`.
- **Recipe:**
  - Border widths are only 2px (controls, small buttons, inputs) and 4px (windows, card top bars, callout bars,
    active tab top) — `S: borderWidth` 0/2/4px only. Radius 0 everywhere.
  - Window = `border: 4px solid var(--line-strong); background: var(--surface-window)`; optional title bar 40px on
    `surface` separated by a 2px `line` rule.
  - Dither rule: `background: repeating-conic-gradient(var(--line) 0 25%, transparent 0 50%) 0 0 / 4px 4px` on a 4px
    tall element (two rows of 2px checks), or an inline SVG pattern with `shape-rendering: crispEdges`. Zigzag
    heading rule = the same checker in `line-ui` colour, 4px tall, full content width, 12px below the heading.
  - Dotted separator: `background: linear-gradient(90deg, var(--line-ui) 2px, transparent 2px) 0 0 / 6px 2px`.
  - Block meter: N blocks (10–20), each a flat rectangle (12×16px at 16px text size) with 4px gaps; filled blocks
    in the status colour, empty blocks `sel`; value text in 48px pixel numerals above it.
  - Category colours: hold an 8-hue set; each entity gets one hue for its top bar, bullet and icon fill. Never
    use these hues for text runs or backgrounds.
- **Motion:** static; block meters fill by stepping one block per frame when data arrives (derived, `steps(N)`
  over N × 40ms).
- **Application map:**
  - Dashboard → KPI cards with a 4px coloured top bar, 6px square legend bullets, 48px pixel numerals, block meters
    for scores/quotas; charts use flat bars with square ends, no rounded corners, no gradients
    (`shot: p3-desktop-light.png`).
  - Data table → header row on `surface`, 2px `line` rules between rows (`crop: p2-light-table-1.png`), status as
    6px square bullet + label.
  - Forms → inputs are 2px `line-ui` framed boxes on `surface-window`, 40px tall; the submit is the gold button
    with the hard shadow.
  - Settings → each group in a window frame with a title bar; danger zone in a window whose frame is `danger`.
  - Modal / dialog → a window frame (4px) with title bar, centred, with the hard 4px shadow; scrim `#101018` at 80%.
  - Empty state → a window frame containing the vignette and one sentence.
  - Error → callout with 4px `danger` left bar and pixel warning icon.
  - Loading → block meter.
  - Code / logs → code window.
- **Limits:** one gold hard-shadow button per screen. Window frames for at most 2–3 major regions per screen
  (hero/banner, code, a dialog) — ordinary cards use `surface` + top bar, not the 4px frame on all sides. No blurred
  shadows, no glass, no gradients outside the art.

### 5. Pixel type for Hangul and Latin

- **What:** one pixel typeface family sets everything — headings, body, buttons, nav, tables — at weight 400 only
  (`S: fontWeight` 100% 400), sizes 16px (98%), 32px, 48px and rarely 12px (`S: fontSize`), letter-spacing normal.
  Line-heights 24px and 28px for 16px text, 40px for 32px, 56px for 48px (`S: lineHeight`). A matching pixel mono
  sets code (26% of text, `S: fontFamily`). The observed families are an OFL pixel Korean font and its code
  variant (credited in the site footer, `crop: p1-light-footer-1.png`). Hangul is drawn on the same bitmap grid as
  Latin, so mixed Korean/English lines keep one rhythm (`shot: p2-desktop-light.png`). Emphasis is by colour
  (`text` `#d0c8c0` → `text-hi` `#f0e8d8`), never by weight. An article-header switch lets readers turn the pixel
  body off ("pixel body on/off") while headings stay pixel; the about page credits Geist Mono for code when it is
  off.
- **Evidence:** `reference/styles.json` (`fontFamily`, `fontSize`, `fontWeight`, `lineHeight`),
  `reference/inventory.json` (`typography` per page), `reference/screenshots/p2-desktop-light.png`,
  `reference/screenshots/p6-desktop-light.png`.
- **Frequency:** 100% of text on every page.
- **Recipe:**
  - Primary: an OFL pixel font with full Hangul coverage — **Galmuri11** (OFL 1.1) for UI and body; Galmuri Mono or
    Galmuri11 for code. Size only at integer multiples of the font's design size (Galmuri11: 12px design grid → use
    12/24/36/48; if the template keeps a 16px base use a 16px-grid pixel font such as NeoDunggeunmo, which is OFL and
    may be used, or DungGeunMo, also OFL). Set `-webkit-font-smoothing: none; font-smooth: never;` so edges stay hard.
  - Scale: caption 12/18, body 16/28 (prose) and 16/24 (UI, tables, lists), h3 16/24 in `text-hi`, h2 32/40, h1
    article 32/40, h1 page/hero 48/56, display numerals 48/56. Weight 400 always; `letter-spacing: normal`
    (pixel fonts are already spaced on the grid; tracking would break it).
  - Hangul: `word-break: keep-all` so Korean wraps at word boundaries (derived: not measurable from the capture, but
    the screenshots never split a Korean word, `shot: p2-mobile-light.png`); `line-break: strict`. Keep the 28px
    line height for prose — Hangul syllable blocks fill the em box and need the extra leading. Fallback stack
    `"Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif` exactly as observed.
  - Readability switch: offer "pixel body on/off". Off swaps prose and table cells to a readable OFL sans
    (Pretendard or Noto Sans KR) at the same 16/28; headings, nav, buttons and numerals stay pixel.
  - Emphasis: `text-hi` colour for strong/emphasis; inline code on a dark gold highlight `#383010` with `text-hi`.
- **Motion:** static.
- **Application map:**
  - Dashboard numerals → 48px pixel numerals with unit in 16px.
  - Data table → 16/24 pixel text; switch to the readable sans when "pixel body" is off.
  - Form labels and helper text → 16/24 pixel; error text in `danger`.
  - Settings → section titles 32/40, options 16/24.
  - Empty / error messages → 16/28, one or two sentences, `text-muted`.
  - Toast → 16/24.
  - Marketing hero → 48/56 headline, 16/28 lead.
- **Limits:** never bold, never italic (no pixel italic exists), never sizes between the integer steps (no 14, 18,
  20, 24 for the 16-grid face). Long prose (> 2 screens) must offer the readable body switch.

## Color

Measured roles. Shares from `S: backgroundArea`, `S: textColor`, `S: borderColor`; names from `S: cssVariables`.
Contrast on `#181820` (WCAG 2.x). **Every UI colour has channels that are multiples of 8** (e.g. 24/24/32,
216/168/72) — a 15-bit console palette; the art uses 3-digit hex (12-bit). The template keeps both quantizations.

| Role | Hex | Evidence | Contrast on bg |
| --- | --- | --- | --- |
| bg (page ground) | `#181820` | 66.35% of bg area; `--bg` | — |
| surface (cards, sidebar, code title bar) | `#202028` | 16.51%; `--surface` | — |
| surface.window (window interior, code body) | `#101018` | 16.18%; `--raised` | — |
| sel (hover / selected row) | `#282838` | `--sel`; `I: hover backgroundColor` | — |
| tint (secondary button fill) | `#282830` | `--tint`; header search button | — |
| line (rules, table rows, header dither) | `#303040` | 74.94% of borders; `--line` | 1.36 |
| line-ui (control borders, H2 dither, dots) | `#686878` | 3.41%; `--line-ui` | 3.23 |
| line-strong (window frame) | `#888898` | 15.98%; `--line-strong` | 5.06 |
| text (body) | `#d0c8c0` | 43.43% of text; `--text` | 10.67 |
| text-hi (headings, emphasis, current) | `#f0e8d8` | 16.55%; `--text-hi` | 14.48 |
| text-muted (meta, inactive) | `#a0a0a8` | 18.65%; `--text-muted` | 6.80 |
| accent (gold: primary, cursor, focus) | `#d8a848` | `--pt`, `--ring`; 0.01% of area | 8.08 |
| on-accent | `#181820` | `--pt-ink` | 8.08 on gold |
| link | `#98b0c8` | `--link`; 2.59% | 7.88 |
| code highlight (inline code bg) | `#383010` | `--code-hl` | — |
| info | `#88a8c8` | `--info` | — |
| warning | `#d8b070` | `--warning`; callout bar | — |
| danger | `#e08880` | `--danger`; outline button | 6.72 |
| success | `#88b888` | `--success`; block meter | 7.78 |
| tip | `#b8a0d0` | `--tip` | — |
| category hues (bars, bullets, icons) | `#44ccee #cc88ee #66aaee #eeaa22 #44cc66 #ee88cc #ee8844 #44ccaa` | `S: borderColor` 0.28–1.48% each | — |
| syntax | kw `#b898c8`, type `#d8b870`, fn `#88b8c0`, lit `#d89878`, str `#a8c088`, comment `#808088` | `--syn-*` | comment 4.50 |
| art ground | grass `#44aa22`, grass-hi `#88cc44`, dirt `#664422` | `--art-grass*`, `--art-dirt` | — |

**Accent budget:** gold appears as at most one filled button per screen (home only, 1 of 14 pages has it,
`reference/survey.json` buttonStyles), plus the cursor ▶ and the focus ring. Area share 0.01%. The category hues
together stay under ~6% of border area. Text is never pure white; ground is never pure black (only the hard
shadow is `#000`).

**Surface stacking:** `bg #181820` → `surface #202028` (cards, panels, sidebar) → `sel #282838` (hover/selected).
Windows go *darker*, not lighter: `#101018` inside a 4px `#888898` frame — the frame, not a lighter fill, lifts them.

**Dark appearance:** the reference is dark-only. A **light ("day") appearance is derived** for the template, same
quantization (multiples of 8), same roles:

| Role | Dark (observed) | Light (derived) | Light contrast |
| --- | --- | --- | --- |
| bg | `#181820` | `#e8e0d0` (parchment) | — |
| surface | `#202028` | `#f0e8d8` | — |
| surface.window | `#101018` | `#f8f0e0` | — |
| sel | `#282838` | `#d8d0c0` | — |
| line | `#303040` | `#c8c0b0` | — |
| line-ui | `#686878` | `#888090` | — |
| line-strong (frame) | `#888898` | `#383040` | 9.61 |
| text | `#d0c8c0` | `#383040` | 9.61 |
| text-hi | `#f0e8d8` | `#181820` | 13.45 |
| text-muted | `#a0a0a8` | `#605870` | 5.12 |
| accent fill | `#d8a848` | `#d8a848` (fill, ink `#181820` 8.08) | — |
| accent as text/cursor on light | `#d8a848` | `#705000` | 5.64 |
| link | `#98b0c8` | `#385880` | 5.57 |
| danger | `#e08880` | `#983830` | 5.44 |
| success | `#88b888` | `#306030` | 5.63 |
| hard shadow | `#000000` | `#383040` | — |

The light scene art switches to a daytime ramp (sky `#8ce`→`#cef`, ground unchanged), stars/LEDs become clouds/
birds; dithered rules use `line-ui` on parchment.

## Typography

| Role | Observed | Substitute | Reason |
| --- | --- | --- | --- |
| UI + headings + body | `pixelFont` = an OFL Korean pixel font (credited in the footer), fallback `"Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif` (`S: fontFamily` 73.85%) | **Galmuri11** (OFL 1.1) — or NeoDunggeunmo / DungGeunMo (both OFL) when a 16px grid is wanted | pixel Hangul + Latin on one grid; Galmuri keeps the genre without copying the reference's exact face |
| Code | `pixelCodeFont` (the code variant of the same family), fallback `ui-monospace` (26.06%) | **Galmuri Mono** (OFL) | pixel mono with Hangul for comments |
| Readable body (switch off) | Geist Mono credited for code when pixel body is off (`shot: p6-desktop-light.png`, fonts section) | Pretendard (OFL) for prose, Geist Mono (OFL) for code | reader comfort for long text |

Scale (all weight 400, letter-spacing normal, `inv: *.typography`):

| Role | Size / line-height | Colour |
| --- | --- | --- |
| hero / page h1 | 48 / 56 | text-hi |
| article h1, h2 | 32 / 40 | text-hi |
| h3, card title (UI) | 16 / 24 | text-hi |
| card title (home category) | 32 / 40 (shown at ~26px rendered in cards — `crop: p1-light-card-1.png`; treat as 32) | text-hi |
| body prose | 16 / 28 | text |
| UI body, table cells, nav, buttons | 16 / 24 | text / text-muted |
| small meta, dates, counts | 12 / 18–24 (0.16% of text) | text-muted |
| display numerals (metrics) | 48 / 56 | text-hi |

Casing: Latin product terms keep their native case; no uppercase transforms anywhere (`text-transform: none`).
Line length: prose column 720px ≈ 45 Hangul syllables or ~80 Latin characters per line at 16px. Numbers use the
pixel numerals with a slashed zero (`shot: p1-desktop-light.png`, dates).

## Spacing and layout

- **Base unit 4px**, matching the pixel unit; measured spacing (`S: spacing`) is dominated by 8 (24%), 12, 4, 20,
  2, 16, 10, 6, 14 — all multiples of 2, almost all of 4. Template scale: `2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64`.
- **Section spacing:** 64px vertical padding between home sections (`reference/structure.json` p1 sections
  `paddingY: 64px`); article body starts 40px under the header, 48px bottom.
- **Header:** sticky, 64px bar + 4px dithered rule = 68px (`structure.json header.height`), background `bg`, no
  blur, unchanged on scroll.
- **Widths:** wide pages (home, vitals) 1302px max content (`maxContentWidth`); article and docs index 720–740px
  prose column; about 880px. Docs layout = 3 columns: left sidebar 272px content (288px panel on `surface` with a
  right edge), article 720px, right "on this page" TOC ~200px with a 2px left rule (`shot: p2-desktop-light.png`).
- **Grids:** home categories 5 columns × 2 rows, 16px gaps, cards ~210px wide (`structure.json` p1 section 2,
  `columns: 5`); latest/recommended lists 2 columns; vitals 3-column then 2:1 split rows.
- **Density:** regular — prose is airy (28px lines), lists and tables compact (42px rows, 2px rules).
- **Breakpoints:** `(max-width: 600px)` (`S: mediaQueries`) and a ~1024px break where the top nav and sidebars
  collapse (nav is `hidden lg:block`, `I: p1 nav-link target`). Mobile 390: header shows logo, a search icon
  and a hamburger; the home hero stacks the scene above the dialog window; the article banner keeps its frame at
  full width; the TOC becomes a disclosure "on this page" (`shot: p2-mobile-light.png`, `shot: p1-mobile-light.png`).
- Touch: `(hover: none) and (pointer: coarse)` rules exist and rows carry a `touch-row` class (larger hit areas).

## Section and UI patterns

| Pattern | Description | Frequency |
| --- | --- | --- |
| Scene hero + dialog window | full-bleed 520px pixel scene; a window (4px frame, `#101018`) floats on the left with eyebrow, 48px title, 2-line lead, gold primary + framed ghost button, and a meta line (counts · date) | home only (`shot: p1-desktop-light.png`) |
| Banner window page header | 2× scene (256px) inside a 4px frame; below it, in the same frame: category bullet + name, 32px title, lead, meta (date · read time · series n/m), hashtag row | every article and category page (10/14 surveyed) |
| Category card grid | 5×2 cards, each `surface`, 4px top bar in category hue, 24px pixel icon, 32px name, one-line description, meta "n docs · m min" | home; 3-column version on about and vitals |
| Dated list | rows: mono date · coloured square + category · title · read time right-aligned; 2px `line` rules | home, docs index, category index (`shot: p5-desktop-light.png`) |
| Section heading with meta | 32px title + inline 12–16px muted meta ("10 categories · 41 docs") + underlined text link right-aligned | home, docs index |
| Docs three-column | sidebar tree with category icons and counts, article, TOC with cursor on current heading | all articles |
| Article body | H2 32px on zigzag dither rule; prose 16/28; tables; code windows; callouts; disclosures for troubleshooting; prev/next pair with 2px top rules and ◀ ▶ cursors; related list; author line | articles |
| Profile card | `surface` panel: 80px pixel avatar on a sunset-band tile (idle bob), name 32px, role line, one sentence, two underlined links | home, about |
| Metric dashboard | colour-barred cards, 48px numerals, block meters, flat horizontal bar chart with square legend, timeline list | `/vitals` |
| Ground-strip footer | 32px grass band with sprites, then a 2-column footer: site line left, underlined links right, credit lines below | all pages |

There are no bands of alternating background colour: all sections share `bg`; separation comes from spacing (64px)
and frames.

## Shape, borders and depth

- **Radius:** 0 for everything (`S: radius` empty, `--radius: 0`). Circles exist only as pixel-drawn shapes in art.
- **Border widths:** 0 / 2 / 4px only (`S: borderWidth` 72.74 / 11.64 / 15.62%).
  - 2px `line-ui` `#686878`: ghost buttons, search field, copy button, active tab sides, outline danger button
    (2px `#e08880`).
  - 4px `line-strong` `#888898`: windows (hero dialog, banner, code).
  - 4px hue: card top bars, callout/quote left bars, active-code-tab top.
  - 2px `line` `#303040`: table row rules, list rules, prev/next top rules, TOC left rule.
- **Elevation:** no blur shadows. Depth is (a) the darker window interior inside a light frame, (b) one hard
  `4px 4px 0 #000` offset shadow on the gold primary button, (c) the `sel` tint on hover. Pressing removes the
  shadow and moves the element by its offset.

## Surfaces and backgrounds

- Page ground flat `#181820` on every page; no gradients, no noise, no images behind content.
- Panels: sidebar and cards `#202028`; windows and code bodies `#101018`.
- Texture lives only in the art and the rules: 2px checker dither (header rule, heading rule, sky band joins,
  grass texture) and 2px dotted separators.
- The scene is the only "background image", and it is SVG built from rects, rendered crisp at integer scale.
- Inline code: `#383010` dark gold block behind `text-hi` mono (`shot: p2-desktop-light.png`).

## Components

- **Buttons** (`reference/components/p1-button-variants.png`, `p2-button-variants.png`, `reference/survey.json`
  buttonStyles):
  - *Primary (gold)* — `#d8a848` fill, `#181820` text, 48px tall, 20px side padding, hard `4px 4px 0 #000`, label +
    pixel ▶ glyph. Press: shadow off, moves 4px. One per screen.
  - *Framed ghost* — transparent, 2px `#686878`, `text` colour, 48px (hero) / 40px; icon + label + kbd chip.
  - *Header tool button (search)* — `#282830` fill, 2px `#686878`, muted text, 40px, kbd hint "Ctrl K" right.
  - *Text tool button* — transparent, `text`, 40px, 10px padding, hover `sel` bg (animation/pixel-body switches,
    each a 24px pixel icon + label + state word).
  - *Copy button* — 2px `#686878`, muted, 28px tall, icon + label; press 2px.
  - *Outline danger* — 2px `#e08880` border and text, 12px padding (vitals "clear records").
  - *Row button* (sidebar category) — full-width, cursor ▶ chevron, icon, label, count right.
- **Links:** prose and footer links `#98b0c8` with a 2px underline in `line-ui` offset ~4px (`shot: p1-desktop-light.png`
  "view all"); hover → `text-hi`. Breadcrumb/nav links muted, hover → `text-hi` + underline offset 4px.
- **Navigation:** header = logo mark + site name, a 4-item text nav with ▶ on current, search button, tool
  switches, external icon. Sidebar = category tree with disclosure cursors, colour icons and counts; article
  entries as 6px-bullet items separated by dotted rules; current item `sel` background + cursor. TOC = list with
  cursor on current heading, nested items indented 16px.
- **Cards:** `surface`, 4px hue top bar, 16–20px padding, no frame on the other sides; hover `sel` + cursor before
  title; press same; focus 4px gold ring.
- **Disclosure (accordion):** row on `surface` with 4px `line-ui` left bar and right-cursor; hover `sel` + bar turns
  cyan `#44ccee`; open: down-cursor, bar cyan, summary tint, body below on `surface` (`ix: p2-disclosure-2.png`).
  Folder tree uses `<details>` rows with 12px pixel folder/file icons (`shot: p2-desktop-light.png`).
- **Tabs (code file tabs):** tabs above a code window; active tab = 4px `#888898` frame on three sides joining the
  window, `text-hi`; inactive muted, hover `sel` + `text` (`ix: p2-tab-3.png`).
- **Badges / filter chips:** text chips with a 6px square colour bullet; the active chip on `sel` with `text-hi`
  (`crop: p5-light-badge-1.png`). Hashtags as plain muted `#tag` text.
- **Tables:** header row text-hi 16px, 2px `#888898`-ish rule under header, 2px `line` rules between rows, no
  zebra, no vertical rules, cell padding ~12px (`crop: p2-light-table-1.png`).
- **Code block:** see signature 4; line numbers in `#808088`, syntax colours from `--syn-*`.
- **Callouts and quotes:** 4px left bar (warning gold `#d8b070`, success green, info blue, neutral grey for the
  "environment" quote), 24px pixel icon, title in bar colour (`crop: p2-light-quote-1.png`).
- **Metric card:** label row (6px bullet + code), description, 48px numeral, status line, block meter, three
  stat columns (avg / p75 / count).
- **Prev/next:** two columns, 2px `line-strong` top rule, ◀/▶ cursor + muted "previous/next" label, title in
  `text`.

## Interaction

All captured transitions are `0s` (`I: *.base.transitionDuration`). Values from `reference/interactions.json`.

| Element | Hover | Press | Focus-visible | Open |
| --- | --- | --- | --- | --- |
| Gold primary button (`ix: p1-button-3.png`) | none | shadow `4px 4px 0 #000 → none`, `translate(4px,4px)` | 4px solid `#d8a848` outline, offset 3px | — |
| Framed / tool buttons (`ix: p1-button-1.png`, `ix: p1-button-2.png`) | text `#a0a0a8 → #d0c8c0` or bg `transparent → #282838` | `translate: 2px 2px` | gold 4px, offset 3px | — |
| Copy button (`ix: p2-button-8.png`) | bg `#282838`, text → `#d0c8c0` | `translate(2px,2px)` | gold 4px | — |
| Nav link (`ix: p1-nav-link-6.png`) | bg `#282838` | — | gold 4px ring around item incl. cursor | — |
| Breadcrumb link (`ix: p2-nav-link-11.png`) | text → `#f0e8d8`, underline, offset 4px | — | gold 4px | — |
| Text link (`ix: p1-text-link-7.png`) | `#98b0c8 → #f0e8d8` (text + underline) | — | gold 4px | — |
| Category card (`ix: p1-card-8.png`) | bg `#202028 → #282838`, ▶ cursor before title | same as hover | gold 4px around card | — |
| Disclosure summary (`ix: p2-disclosure-2.png`) | bg `#282838`, left bar → cyan | — | gold 4px, offset −4px (inside) | chevron right → down, instant; no animation (`I: open.animations` empty) |
| Code tab (`ix: p2-tab-3.png`) | bg `#282838`, text `#a0a0a8 → #d0c8c0` | — | not focusable (roving tabindex) | panel swaps instantly |

Speed: 0ms. Distance: press offsets 2px (bordered) or 4px (shadowed). Nothing scales, fades or glows on hover.

## Motion

Scale: durations 500, 900, 1000, 1400, 2000, 2300, 2400, 3100, 3200, 4000, 5000, 6000, 14000, 120000, 300000ms;
easings `steps(1)`, `steps(10)`, `steps(32)`, `steps(200)`, `steps(360)` — no continuous easing anywhere; UI
transitions 0ms.

| Pattern | Trigger | Target | Duration / easing | From → to | Evidence |
| --- | --- | --- | --- | --- | --- |
| idle bob | loop | avatar sprite (80×80) | 1000ms `steps(1)` ∞ | `translateY(0) → (-4px) → 0` | `mo: p1-m1.png`, `mo: p6-m1.png` |
| star twinkle | loop | 4×4 star | 2400ms `steps(1)` | opacity `1 → .35 (60%) → 1 (80%)` | `M: p1 hs-b-twinkle` |
| sparkle | loop | 12×12 star | 3200ms `steps(1)`, delay −600ms | `scale(1) → .34 (70%) → 1 (85%)` | `M: p1 hs-b-twinkle2` |
| LED blink | loop | three 4×4 lights | 900 / 1400 (−500 delay) / 2300ms `steps(1)` | opacity `1 ↔ .15` | `M: p1 hs-b-led` |
| fan | loop | two 16×8 / 8×16 paths | 500ms `steps(1)` | alternate opacity 1/0 (2-frame spin) | `M: p1 hs-b-fan-a/b` |
| beacon | loop | 4×4 light | 2000ms `steps(1)` | bg `#f85858 ↔ #2c1830` | `M: p1 hs-b-beacon` |
| lantern flicker | loop | 4×4 light | 3100ms `steps(1)` | `#f8e8a0 → #f8c860 (40%) → #f8e8a0 (55%)` | `M: p1 hs-b-lantern` |
| smoke | loop | 8×4 puffs | 5000ms `steps(10)` | `translate(0,0) .9 → (-16,-36) 0` | `M: p1 hs-b-smoke` |
| glow | loop | 32×4 / 24×3 screen glow | 4000ms `steps(1)` | opacity `0 → .35 → 0` | `M: p1 hs-b-glow`, `M: p2 pixel-screen-glow` |
| meteor | loop | 32×16 | 14000ms `steps(1)` | hidden until 95.6%, then 16px/8px jumps per 1% | `mo: p1-m2.png` |
| far cloud drift | loop | 5760px band | 300000ms `steps(360)` | `translateX(0 → -1440px)` (4px per step) | `mo: p1-m3.png` |
| snow fall | loop | 1440×256 tiled snow | 6000ms `steps(32)` | `translateY(0 → 128px)` (4px per step) | `mo: p2-m1.png` |
| cloud drift | loop | 48×16 cloud | 120000ms `steps(200)`, delay −10000ms | `translateX(-80 → 720px)` (4px per step) | `mo: p2-m2.png`, `mo: p2-v7.png` |
| walking sprite | loop | 112×43 animated image in footer | image-driven (~2.5s cycle) | frame swap | `mo: p5-v1.png` |
| UI state swap | state-change | all controls | 0ms | instant | `reference/interactions.json` |

Unused but shipped keyframes confirm the vocabulary: `pixel-nudge` `translate(2px)`, `pixel-drift-wide`,
`pixel-twinkle` (`M: p3.keyframeRules`).

Note how travel is always quantized to the pixel unit: 800px / 200 steps = 4px, 1440px / 360 = 4px,
128px / 32 = 4px. **Rule: steps = distance ÷ pixel unit.**

**Load / scroll:** none. No entrance animations, no scroll reveals (`M: *.reveals` empty), header static on scroll.

**Reduced motion:** the reference sets `animation: none; transition: none` on everything and swaps `.sprite-anim`
images for `.sprite-still` (`M: p1.reducedMotionRules`); it also has a header "animation on/off" switch. The
template does both: honour the media query and provide the switch (persisted), stopping all loops on frame 1.

## Illustration, icons and media

- **Illustration style:** pixel art, filled rects only (`inv: *.svgs[*].strokes` empty, `linecaps` empty), integer
  scale (4× hero, 2× banners/sprites), 12-bit colour ramps, 1-unit dark outline on characters only, 2-tone shading
  (top-left highlight, bottom-right shade), checker dithering between bands and for halos (moon), stepped hills.
  Built by reuse: one scene layer (`#hs-b-l`) is mirrored/clipped with `<use>` to extend it left and right
  (`reference/raw/svg/p1-i2.svg`, `p1-i3.svg`), trees placed via `<use href="#tree">` at many x positions
  (`reference/raw/svg/p2-i3.svg`). Small drawings (`ill: *-g*.png`): conifers 24×60 / 16×40 in green on dark or
  snowy variants, a moon 52×52 with dither halo, a cloud 72×24, a seated figure 48×51, an 80×80 avatar on a
  sunset-band tile, and 36×36 / 24×24 category icons.
- **Icons:** 24×24 (UI and category) and 12×12 (file tree, chevrons) pixel icons, fill-only, drawn on a 2px grid
  (12×12 units at 24px), one flat colour each (category hue or `text-muted`), no outline weight variation
  (`reference/icons/p2-icons.png`, `p5-icons.png`). Glyphs: search, pause, font-switch, warning triangle, check,
  folder, file, chevron, and per-category emblems (code brackets, stacked layers, boxed letters, flask, server,
  wave, globe, box, cube).
- **Media:** animated pixel GIF/WebP sprites (coin, walking character, sparkle, star) from a third-party GIF
  library, scaled at whole multiples, each with a still PNG for reduced motion (`mo: p5-v1.png`, `mo: p6-v2.png`,
  about-page credits table). No photographs, no video. Charts (recharts) are restyled flat: square-ended bars, no
  gridlines, square legend bullets (`shot: p3-desktop-light.png`).

## Theming

- **Mechanism: none (dark-only).** `<html class="dark">`, `color-scheme: dark` on all 7 pages; one
  `prefers-color-scheme` rule is a lightningcss compile artifact (`--lightningcss-dark: initial`), not a light theme;
  `supportsDark: false`, no toggles, no theme selectors (`reference/theme.json`).
- The survey's `ui:theme-toggle` hit (2 pages) is the **"pixel body font" on/off switch** in the article header
  (`shot: p4-desktop-light.png`, icon "A" + label + state), plus the global "animation on/off" switch. Both are
  reader preferences, not colour themes; the template keeps them.
- **Template:** dark ("night") is the default and canonical appearance; a light ("day") appearance is derived
  (table in Color) and exposed via `prefers-color-scheme` + a `[data-theme]` toggle. Scene art swaps its sky ramp;
  quantization and all shapes stay identical.

## Writing style

Style only, never copy.
- Korean UI and prose, polite declarative endings (`-합니다` in docs, softer `-해요` in the site intro); technical
  nouns stay in their original Latin form and case.
- Headings are short noun phrases without punctuation; sections are numbered in series titles with "(n)" and an em
  dash before the subtitle.
- Buttons: noun + verb ("view docs ▶" shape), the ▶ pixel glyph trailing on forward actions; switches read
  "label + state word" (e.g. "animation on").
- Meta lines join items with a middle dot "·" and use units after numbers (count + unit, minutes for read time);
  dates as `YYYY.MM.DD` in the pixel numerals.
- Keyboard hints as kbd chips ("Ctrl K"). Empty states are one plain sentence ("Not measured yet." shape) in muted
  text (`shot: p3-desktop-light.png`).
- No exclamation marks, no emoji in the UI.

## Coverage

| Area | Status | Note |
| --- | --- | --- |
| color | observed | full token set in `S: cssVariables`; light appearance derived |
| typography | observed | one pixel family + pixel mono, 400 only, 12/16/32/48 |
| spacing | observed | 4px base, `S: spacing` |
| layout-grid | observed | 1302 wide / 720 prose / 3-column docs, `structure.json` |
| section-patterns | observed | hero, banner window, card grid, dated list, docs 3-col, footer strip |
| shape | observed | radius 0 everywhere |
| borders | observed | 0/2/4px only; dithered and dotted rules |
| elevation | observed | hard 4px shadow + frames; no blur |
| surfaces-and-backgrounds | observed | flat night ground, darker windows, dither textures in art only |
| buttons | observed | 7 variants (`p2-button-variants.png`) |
| links | observed | link blue, underline, hover → text-hi |
| navigation | observed | header, sidebar tree, TOC, breadcrumbs, prev/next, mobile hamburger |
| forms | derived | no form fields on the site (search is a button opening a dialog that wasn't captured); inputs derived from the framed search button |
| cards | observed | category, metric, profile cards |
| disclosure | observed | accordion + file tree `<details>` |
| tabs | observed | code file tabs (1 page) |
| tables-and-data | observed | markdown tables, dated lists, metric cards, bar chart, block meters |
| feedback | observed | callouts (warning/success/info) and empty-state sentences observed; toasts derived (sonner present, unused) |
| overlays | derived | search dialog (Ctrl K) not captured; modals derived as window frames with hard shadow |
| iconography | observed | 24/12px pixel icons, fill only |
| illustration | observed | pixel scenes and sprites |
| media | observed | animated pixel sprites (GIF/WebP) with still fallbacks; no photo/video |
| motion-load | absent | no entrance or load animations on any page (`M: *.reveals` empty, no load keyframes) — template keeps none |
| motion-scroll | absent | no scroll reveals or scroll-linked effects; header static on scroll |
| motion-hover-and-press | observed | instant swaps, 2/4px press offsets |
| motion-loop | observed | stepped ambient loops (86% of pages) |
| theming | derived | dark-only reference; the surveyed "toggle" is a font/animation preference; light theme derived |
| responsive | observed | 390 and 1440 captures; 600px and ~1024px breaks |
| accessibility | observed | 4px gold focus ring on every control, reduced-motion handling, animation switch, readable-body switch; muted text ≥ 6.8:1; comment colour 4.5:1 |
| writing-style | observed | Korean polite declarative, middle-dot meta, kbd hints |

## What the reference does not show

Derived from the character; flagged as derived in `analysis.json`.

- **Light appearance** — "day" palette in Color: parchment ground `#e8e0d0`, ink `#383040`, frames `#383040`,
  same 8-step quantization, gold stays as fill, gold text darkens to `#705000`.
- **Form fields** — 40px tall, 2px `line-ui` frame, `surface-window` fill, 12px padding, pixel text 16/24, label
  above in `text-hi` 16/24, helper 12px muted. Focus: gold 4px ring offset 3px (no glow). Error: frame turns `danger`,
  12px pixel warning icon + message in `danger`, 2-frame 2px nudge. Checkbox = 16px square, 2px frame, checked
  shows a pixel check (2px units) in gold; radio = pixel diamond or square-in-square (no circles). Select = framed
  box with down-cursor; the list opens as a window with the ▶ cursor on the highlighted option. Switch = 32×16
  two-cell track that flips instantly.
- **Overlays** — dialog: window frame 4px `line-strong`, 40px title bar, hard `4px 4px 0 #000` shadow, scrim
  `#101018` at 80%, opens and closes in one frame. Popover/menu: same frame at 2px, cursor list. Tooltip: 2px
  frame, `surface-window`, 12px text, no arrow or a 4×4 pixel notch.
- **Toasts** — window frame 2px, 6px status bullet + message, appear instantly at bottom-right, auto-hide
  without fade.
- **Dense data** — tables 16/24 pixel (or readable body), 40px rows, 2px rules, numbers right-aligned in pixel
  numerals, selected row with the cursor gutter; pagination as ◀ 1 2 3 ▶ with the current page in a 2px frame.
- **Empty states** — small still vignette (≤ 96px) + one sentence + one framed button.
- **Error pages** — scene with lights off and a red blinking beacon, message window, primary "retry".
- **Loading** — block meter or 3-frame "…" stepping; skeletons as `sel` blocks with no shimmer.
- **Charts beyond bars** — line charts as stepped (`step-after`) lines 2px thick with square 6px points; areas as
  flat fills with a checker dither edge; no smoothing, no gradients.

## Must not carry over

- **Names and marks:** the site name and the owner handle (brand terms listed in `intake.json`), the poplar-tree
  logo mark in the header, the owner's real name and company on the profile card, the GitHub/npm links.
- **Artwork:** the moonlit cabin scene, the snowy-ridge banner, the poplar trees as a motif (the tree *is* the
  brand), the green-capped seated figure and avatar, the scene's specific compositions and palettes as drawn. The
  template must ship its own scenes and sprites.
- **Third-party sprites:** the coin, sparkle, star and walking-character GIFs come from a GIF library (credited by
  ID in the footer) — not reusable; replace with original sprites.
- **Fonts:** the observed pixel Korean font and its code variant are SIL OFL 1.1 (credited in the footer), so they
  are not proprietary; the template still defaults to **Galmuri11 / Galmuri Mono (OFL)** to avoid an identical
  voice, with NeoDunggeunmo/DungGeunMo (OFL) as allowed alternatives; Geist Mono (OFL) and Pretendard (OFL) for
  the readable body switch.
- **Copy:** all Korean headings, intro sentences, category names and descriptions, article titles, credits text.
- **Category icon set:** the specific framework emblems (boxed TS/JS letters, React-like brackets) — draw new
  category glyphs for the product's own domains.

## Proposed template

**Name:** *Night Cartridge* — a night-console pixel system with stepped motion.

**Tags:** tone `playful`, density `regular`; keywords `pixel-art`, `16-bit`, `dark-first`, `stepped-motion`,
`rpg-cursor`, `hard-edge`, `hangul-pixel-type`, `dithered`.

**The ten defining rules:**

1. **Everything sits on the pixel grid.** Radius 0, borders only 2px or 4px, art drawn in filled rects at integer
   scale (2× or 4×) with `shape-rendering: crispEdges` / `image-rendering: pixelated`; no blur, no gradients
   outside dithered bands.
2. **Quantized colour.** Every UI colour has channels in multiples of 8; scene art uses 3-digit (12-bit) hex.
   Night ground `#181820`, panels `#202028`, windows `#101018`, warm cream text `#d0c8c0`/`#f0e8d8` — never pure
   white or pure black (except the hard shadow).
3. **One pixel typeface, one weight.** Hangul and Latin on the same bitmap grid, weight 400, sizes 16/32/48 (12 for
   meta), line-height 28 for prose and 24 for UI, no tracking, no bold — emphasis by colour; offer a readable-body
   switch for long text.
4. **Gold is the player.** `#d8a848` marks the single primary action (with a hard `4px 4px 0 #000` shadow), the
   ▶ cursor and the 4px focus ring — nothing else.
5. **Selection is an RPG cursor.** A beveled 4×7-unit ▶ marks current and hovered items in menus, lists, cards,
   tables and settings; disclosures use its down/right forms as chevrons.
6. **Instant, physical response.** Transitions are 0ms; hover swaps to `#282838`; press moves the control 2px (or
   4px into its shadow, which disappears); focus is `4px solid gold, offset 3px`.
7. **Motion is stepped.** Every animation uses `steps(n)` with n = distance ÷ pixel unit; loops are small (4px bob,
   blinking single-unit lights, slow drifts) and live only in art and status lights; no entrance or scroll
   animation; reduced motion and an "animation off" switch freeze everything on frame 1.
8. **One living stage per screen.** A pixel diorama as the hero or a framed banner at the top, a ground strip at the
   bottom — never behind data, controls or text; dense screens get only the strip.
9. **Game-window chrome.** Major regions are windows: 4px `#888898` frame, darker interior, optional 40px title
   bar; headings sit on a dithered checker rule, separators are 2px dots, scores are block meters, not smooth bars.
10. **Hue identifies, never decorates.** Entities get one of 8 saturated hues used as a 4px top bar, a 6px square
    bullet and a pixel-icon fill; text and backgrounds stay neutral.
