# gumroad-study — reference analysis

Source: https://gumroad.com/ (domain only, no notes). Evidence lives under `pipeline/gumroad-study/reference/`. Full-page captures reach the footer on every page (home 7935px, pricing 5917px, features 9476px, small-bets 6138px, ping 3901px, help 7535px).

## Character

A loud, cheerful storefront drawn with a black felt-tip. Every surface is a flat field of paper (#F4F4F0), white, or one saturated poster color: pink #FF90E8, lemon #F1F333, marigold #FFC900, periwinkle #90A8ED or teal #23A094. They are held together by 1px pure-black hairlines and 4px corners, with no gradients and no soft shadows. Its objects are chunky ink-outlined stickers (thick tilted coins, curling receipts, die-cut word badges on a solid black offset slab) and flat cartoon vignettes, scattered around huge friendly grotesk headlines (72–96px, weight 500, sentence case) that talk about money in plain words. Long pages alternate color | black split bands, then end on a pink closing band and a black footer. Things respond physically: hover pops a button up and to the left so a hard black offset shadow, or a stack of colored plates, shows underneath, and a press slams it flat again.

Keywords: ink hairlines · poster color blocks · sticker objects · hard offset shadow · stacked-plate hover · friendly grotesk · pill current marker · paper ground.

What you lose by changing one thing:
- Soft shadows instead of the hard offset: it becomes any SaaS.
- Grey borders on product boxes: the drawn, printed feel goes.
- Gradients on the bands: it stops looking like a poster.
- Shaded illustrations: it looks like stock art.

## Site survey

- 111 of 556 known pages surveyed. The survey stopped at saturation: the last new feature turned up on page 84.
- Page types:
  - home and about
  - pricing and features
  - small-bets
  - the marketplace (89 pages share one layout)
  - help index and help article
  - developer docs (widgets, ping, api)
  - settings, prohibited and blog
- **Site-wide:**
  - svg:icon 98%
  - ui:input 98% and ui:form 97% (the header search and the footer subscribe form)
  - layout:logo-wall 95%: the footer's row of social glyphs, not client logos
  - layout:card-grid 88%
  - ui:choice, ui:disclosure and ui:tabs 82%
  - ui:breadcrumb and ui:current-page-marker 80%
  - The pink button is on 105 pages; the black and outline buttons on 94; the pill tabs on 90.
- **One-offs:**
  - motion 5% (home and about)
  - Lottie 2%, carousel 2%, code blocks 2%
  - banded sections 1% by the detector, but visibly on every long marketing page
  - table 1% (ping)
- **Noise:** the marketplace grids are creators' covers (imageShare about 0.3). Only their chrome counts as design.
- **Remaining gaps:**
  - The Lottie mascot was never filmed (`motion.json` visual is empty).
  - The sticker art is SVG images, so no markup was captured.
  - No modal, toast or error state was opened.
  - The pricing FAQ was captured closed only.

## Signature elements

### 1. Lift-and-slam hard shadow

**What it is.** Clickable things behave like paper cutouts.
- At rest: a 1px #000 border and no shadow.
- On hover: the element moves −4px −4px and a `4px 4px 0 0 #000` shadow appears, over 150ms with `cubic-bezier(0.4,0,0.2,1)`.
- On press: it moves back to 0 and the shadow goes.

Marketing CTAs use the **plate stack**: the button jumps −8px −8px over two plates of the same size, each with a 1px black border and 4px radius. One is lemon #F1F333 at −4px, the other red #DC341E at 0.

**Evidence:** `reference/interactions/p10-button-2.png`, `p5-button-3.png`, `p1-nav-link-3.png`, `p1-button-2.png`, and `interactions.json`.

**Frequency:** every page. The pink button is on 105 of 111 pages; the plate stack is on every marketing CTA and the footer's arrow button. The full captures show the same vocabulary at rest in illustrations: UI mockups, app tiles and stickers sit on a solid black offset slab (p1, p3, p6). The hard offset is the site's only notion of depth.

**Recipe:**
1. `.btn { border:1px solid ink; radius:4px; transition: translate 150ms, box-shadow 150ms cubic-bezier(.4,0,.2,1) }`
2. `:hover { translate:-4px -4px; box-shadow:4px 4px 0 0 ink }`
3. `:active { translate:0; box-shadow:none }`
4. In dark, the shadow is `rgba(255,255,255,.35)`.
5. Plate stack: wrap the button in a relative inline-block with two `aria-hidden` absolute siblings at `inset:0`, each with the button's radius and a 1px ink border. Plate A is lemon, plate B is red.
6. On wrapper hover, move the button −8px and plate A −4px.
7. Never make a plate pink.

**Motion:** described above. Under reduced motion, swap the shadow instantly with no translate.

**Application map:**

| Context | Use |
| --- | --- |
| Hero | Plate stack on the one primary CTA |
| Dashboard | Linked tiles lift 4px |
| Data table | Toolbar and row actions lift; rows don't |
| Form | Submit lifts; inputs never do |
| Settings | Option cards and save lift |
| Empty state | The single "create" button may use the plate stack |
| Error | "Try again" with the plate stack |
| Pricing | Plan cards lift |
| Dialog / toast | Static 4px ink shadow |

**Limits:**
- At most one plate stack per screen.
- Never on inputs, tabs, nav pills or table rows.
- Never any blur.

### 2. Ink-outlined sticker objects

**What it is.** Three registers of the same drawing.
- **Objects:** big, flat, 3D-extruded everyday objects.
  - Coins with a thick rim, curling receipts, tools.
  - An even ~2px black outline that also draws inner edges.
  - One flat saturated fill each, rotated 15–60°, cropped by the viewport, ringed around a headline.
  - They drift up on scroll.
- **Die-cut word badges:** a blob, starburst or rounded rectangle in one band color, holding a tall condensed hand-lettered word that has its own ink outline in a second band color. Currency-symbol cut-outs belong here too. Each sits on a solid black slab offset 6–10px down and right.
- **Flat cartoon vignettes:** circle-cropped scenes in 3–4 band colors with ink outlines, captioned by white speech-bubble pills that overlap the edge.

**Evidence:** `reference/screenshots/p1-desktop-light.png`, `p2-desktop-light.png`, `p3-desktop-light.png`, `p6-desktop-light.png`, `reference/motion/p1-m2.png`, `p2-m1.png`, and `motion.json` (`parallax-scroll`).

**Frequency:** every brand-designed marketing page, hero and below:
- the heroes
- every color half of the checkerboard bands (features ×4, pricing, small-bets ×2)
- the process ribbons (3 pages)
- the tag marquee
- the home vignette cards

**Recipe:**
1. Draw original inline SVGs of objects from the product's own domain.
2. Front face plus an offset copy 8–16px down and right for the rim, joined by tangents; 1–3 inner strokes.
3. Ink stroke at about 1% of the object's size, round joins and caps.
4. One band-color fill, no shading.
5. An absolute `aria-hidden`, `pointer-events:none` layer behind the content: 4–6 objects, rotated and 20–40% off-canvas.
6. The fill must differ from the band it sits on.
7. Drift: `animation-timeline: scroll(root)`, translateY 0 → −50%.
8. **Badge:** a die-cut shape in a band color, a condensed word with an ink outline in a second color, and a solid ink copy of the shape offset 8px/8px beneath.
9. **Vignette:** a circle clip of a flat scene in 3–4 band colors with ink outlines, and a white 1px-ink caption pill overlapping its edge.

**Motion:** scroll-linked drift only. Static under reduced motion.

**Application map:**

| Context | Use |
| --- | --- |
| Hero | 4–6 stickers |
| Empty state | One 120–160px sticker or badge of the missing thing |
| Error / 404 | Two tumbling stickers |
| Onboarding / success | One badge ("done"-type word) on its slab |
| Dashboard | One 64–96px sticker in the welcome band only |
| Settings / form | None inside; at most one in the header band |
| Pricing | Coin-type stickers around the plan band |
| Loading (derived) | A sticker rocking ±8° in 600ms steps |

**Limits:**
- At most 6 per hero and 1–2 on product screens.
- Never over text, controls or data.
- Always an ink outline.

### 3. Hard-seamed poster color bands

**What it is.** Sections are single flat saturated fields meeting at 1px #000 rules.
- Some are split 50/50.
- Long pages alternate the split like a checkerboard (color | black, then black | color). The color half holds stickers or an illustrated UI mockup; the black half holds 48px headings in a band color (periwinkle or marigold) over 20px white text.
- Long marketing pages close with a full pink band (72px headline + white outline button) before the black footer.
- App headers are bands colored by category (teal for 3D, lemon for music).

**Evidence:** `reference/screenshots/p2-desktop-light.png`, `p3-desktop-light.png`, `p6-desktop-light.png`, `p5-desktop-light.png`, `p9-desktop-light.png`, `structure.json`.

**Frequency:**
- the opening band on all 89 marketplace pages
- checkerboard rows on features (4), pricing (1) and small-bets (2)
- the pink closing band on pricing, features and small-bets
- the black footer on every page

**Recipe:**
1. Full-bleed `<section>`s, one band token each, 1px ink rules at every seam.
2. Padding 64–128px on marketing, 24–32px on app headers.
3. Split band: a 2-column grid that stacks on mobile.
4. Checkerboard: swap the black side on each row. The black half uses band-colored 48px headings and white text.
5. Close long pages with one pink band.
6. Each product area owns one band color, so color means "where you are".
7. Dark mode leaves the bands unchanged.

**Motion:** static.

**Application map:**

| Context | Use |
| --- | --- |
| App header | Band in the section's color over a paper body |
| Dashboard | Header band; optionally one split band for two key numbers |
| Settings | Quiet header band (lemon or periwinkle) |
| Pricing | Split band, one fee per half |
| Feature / onboarding tour | Checkerboard rows |
| Data table | No band inside |
| Form / checkout | Narrow title band |
| Footer | Black band, with a pink closing band above it on long pages |
| Error | A full-viewport single band |

**Limits:**
- One band color per product screen; up to three on marketing pages (plus black).
- Never two bands of the same color adjacent.
- No gradients.
- Band-colored text only as headings on a black half.

### 4. Ink hairline frame with pill markers

**What it is.** Structure is drawn, not shaded.
- White boxes with a 1px pure-black border and 4px corners, on paper.
- Groups are one box divided by 1px black rules; empty states are a dashed box.
- Pills mark position: the filled black pill is the current nav item; 1px outline pills (40px tall) are the current tab or chip.
- The ping table confirms the data case: one 1px black box, a paper header row with 16px bold labels, white rows about 55px tall divided by 1px black rules, a mono key column, no zebra.

**Evidence:** `reference/screenshots/p10-desktop-light.png`, `p8-desktop-light.png`, `p12-desktop-light.png`, `p7-desktop-light.png`, `reference/interactions/p5-disclosure-1.png`, `p5-tab-2.png`, `styles.json`.

**Frequency:** site-wide (border 1px 77.5%, #000 49%, 4px radius 61.7%, pills 33.8%).

**Recipe:**
1. Paper body; white surfaces with `1px solid ink`, `radius 4px`, no shadow.
2. Groups use `divide-y` with 1px ink rules, rows 56px.
3. Tables: a paper header row and 1px ink row rules, no zebra.
4. Pills: 40px tall, radius 9999, transparent border; the current one gets an ink border, and the primary nav's current pill is ink-filled.
5. Empty: `1px dashed ink`.
6. Dark: #000 surfaces on #242423, borders at white 35%.

**Motion:** the pill outline appears instantly on hover; chevrons rotate over 200ms with `cubic-bezier(0,0,0.2,1)`.

**Application map:**

| Context | Use |
| --- | --- |
| Dashboard | Framed tiles |
| Data table | The ping table recipe |
| Form | 48px bordered inputs with a pink focus ring |
| Settings | Underlined section links + bordered panels; selected option with a 2px pink border |
| Tabs | Outline pills |
| Empty | Dashed box |
| Navigation | 1px rule under the header |
| Help / FAQ | 160px tile grid, or the FAQ rule list |

**Limits:**
- Product borders are always 1px ink. The only exception on the site is the #919191 hairline of the 24px marketing showcase cards.
- No soft shadows.
- 4px or less on product components.

### 5. Notched pink price flag

**What it is.** A pink label with a 1px black border and a swallowtail notch on its right end. It holds a 16px price, with the old price struck through first. It sits bottom-left on product cards with a star rating opposite. The marketing illustrations reuse it inside drawn product cards and plan pickers (p1, p3), so it reads as the brand's price mark.

**Evidence:** `reference/components/p5-light-card-1.png`, `reference/screenshots/p5-desktop-light.png`, `p3-desktop-light.png`.

**Frequency:** every product card on the 89 marketplace pages, plus the marketing mockups.

**Recipe:**
1. 28px tall, padding `0 20px 0 8px`, pink fill.
2. Notch: `clip-path: polygon(0 0,100% 0,calc(100% - 12px) 50%,100% 100%,0 100%)`, or an SVG path with a 1px ink stroke.
3. Tabular numbers.
4. The same in dark mode.

**Motion:** static.

**Application map:**

| Context | Use |
| --- | --- |
| Catalog card | Price |
| Table | One amount cell |
| Dashboard | Headline number |
| Billing | Plan price |
| Form | Live total |
| Toast | "New" or amount marker |

**Limits:**
- One per card or row.
- Only for money, counts or "new".

### Not a signature

- **Lottie mascot** (`raw/lottie/p1-l1.json`): 8s at 24fps, tweened, never filmed. Its drawing matches the cartoon vignettes.
- **Tag marquee:** a home-page one-off.

## Color

| Role | Hex | Measured | Use |
| --- | --- | --- | --- |
| Ink | #000000 | text 47%, border 49% | Text, borders, black button, outlines, slabs, footer |
| Paper | #F4F4F0 | bodyBackground | App, docs and help ground; home; table header row |
| Surface | #FFFFFF | bg 32% | Cards, panels, inputs |
| Pink (action) | #FF90E8 | bg 1.7% | Primary button, flag, focus, selected, closing band |
| Lemon | #F1F333 | `structure.json` | Band, plate A, stickers |
| Marigold | #FFC900 | `structure.json` | Band, highlighter, black-half headings |
| Periwinkle | #90A8ED | bg 0.57% | Split band, black-half headings |
| Teal | #23A094 | `structure.json` | Category band, split band |
| Red | #DC341E | bg 0.05% | Plate B, stickers |
| Orange | #FF8F00 | lottie | Mascot only |
| Muted text | #00000080 | text 1.7% | Helper text |
| Code well | #DDDDDD | p8 | Code ground |
| Showcase hairline | #919191 | pixel sample p1 | 24px marketing cards only |
| Chart bar | #E5E5E5 | p3 mockup | Bars in drawn dashboards |
| Dark ground | #242423 | bg 4.1% | App pages in dark |
| Dark text | #DDDDDD | text 40% | |
| Dark hairline | #DDDDDD59 | border 44.75% | |
| Dark hard shadow | #FFFFFF59 | `theme.json` | |

**How color is used.**
- Chrome is ink, paper and white. Color comes as whole flat fields.
- Colored text appears only:
  - as band-colored headings on the black half of a split band, with white body (p2, p3, p6);
  - as a marigold highlighter block behind bold phrases in quotes (p6).
  It never appears on paper or white.
- Pink appears 1–3 times per screen.
- Drawn dashboards (p1, p3) show the brand's data styling: big plain numbers with a small round dot legend (grey, dark grey, pink), and a pink line with dot markers over light-grey bars with dark caps.

**Dark appearance.**
- Chrome inverts: #000 on marketing, #242423 with #000 cards on app pages.
- Black CTAs turn pink, and the current nav pill turns white.
- Bands and stickers are unchanged.

## Typography

**Families.**
- **Observed:** ABC Favorit (Dinamo, proprietary) at 400/500/700; system monospace for code.
- **Substitutes:** **Space Grotesk** (OFL), with DM Sans as the fallback, and **JetBrains Mono**.
- Hand-lettered condensed words exist only inside sticker artwork, not as a UI font.

**Scale** (`inventory.json`):

| Role | Size / line height | Weight | Tracking |
| --- | --- | --- | --- |
| Mega stat | 192 / 172.8 | 500 | −0.4px |
| Hero | 96 / 86.4–96 | 500 | −0.4px |
| Section display | 72 / 72 | 500 | −0.4px |
| Section heading, black-half heading | 48 / 48–60 | 500 | −0.4px |
| Statement | 36 / 40 | 500 | −0.4px |
| FAQ question, fee figure | 30 / 36 | 400 | −0.4px |
| Article title | 30 / 36 | 700 | — |
| Lead | 24 / 32 | 400 | −0.4px |
| App title | 24 / 32 | 400 | — |
| Card title | 20 / 26 | 400 | — |
| Help group heading | 20 / 26 | 600 | — |
| Body | 16 / 22 | 400 | — |
| Prose | 16 / 28 | 400 | — |
| Meta | 14 / 18–20 | 400 | — |

**Voice.**
- Sentence case, no uppercase labels.
- Eyebrows are 16–20px plain words above section headings.

## Spacing and layout

**Spacing.**
- Base unit 4px. The scale is 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Sizes: controls 48px, pills 40px, filter rows 56px, table rows about 55px, FAQ rows about 177px, help tiles 160px.
- Bands use 96–128px of padding.

**Content widths:** 1152px marketing, 1216px pricing, 1312px marketplace, 1376px docs and help, 1024px article and table column.

**Page structures.**
- Marketing pages are long stacks:
  - hero band
  - centered intro on white (eyebrow + 72px heading + 24px lead)
  - checkerboard split bands
  - FAQ
  - pink closing band
  - black footer
- The help index repeats a 20px/600 heading over a 4-up tile grid about 8 times.
- Docs use a 1/4 link sidebar with 3/4 stacked panels.

**Density, breakpoints and mobile.**
- Density is regular.
- Breakpoints at 640, 768, 1024, 1280 and 1536px.
- On mobile, the showcase cards stack full width with 24px radius; bands stack.

## Section and UI patterns

- **Sticker-strewn color hero.** It opens every marketing page.
- **Hard-seamed color bands.** Pricing and small-bets, plus the openers of every marketplace page.
- **Checkerboard split bands.** Color halves hold an illustration; black halves hold band-colored headings over white text. On features (4 rows), pricing and small-bets.
- **Process ribbon.** A giant pink or marigold pill with an inner rule inset 32px, a loop of step labels joined by arrow lines, and lemon sticker icons or a character inside. On features, small-bets and home.
- **Showcase card mosaic with comic vignettes.** 24px cards with #919191 hairlines; 48px titles; UI mockups on black slabs or circle-cropped scenes with speech-bubble captions. On home and about.
- **Giant stat.** One 192px figure with a 24px caption. On home and about.
- **Testimonials:**
  - speech bubbles with avatars (home)
  - a masonry of square black boxes with marigold highlighter phrases (small-bets)
  - a photo cut-out on an ink-outlined blob in a pink band with a carousel (features)
- **FAQ rule list.** A 72px heading; full-width rows with 1px black rules, a plus glyph on the left, 30px questions at a ~220px indent. On pricing.
- **Pink closing band.** On pricing, features and small-bets.
- **Illustrated landscape strip.** A full-bleed scene before the footer. On home and about.
- **Category-colored app header.** On the marketplace.
- **Hairline filter stack + card grid.** On the marketplace.
- **Docs and help panels.**
- **Black subscribe footer.** On every page.

## Shape, borders and depth

**Radii:**
- 4px: controls, cards, panels, the table (61.7%).
- 9999px: pills (33.8%).
- 24px: marketing showcase cards and testimonial bubbles; bubbles keep one square corner toward the speaker.
- 16px: secondary tiles.
- Ribbon radius: half its height.

**Borders:**
- 1px #000 on everything in the product.
- #919191 1px only on the 24px marketing cards.
- Dashed for empty states; pink for selected and focus.

**Depth:**
- No shadow at rest on UI.
- Hover: a hard `4px 4px 0` shadow, or the plate stack.
- Illustrated objects and mockups sit on a static solid black slab offset 6–10px.
- Dark: the shadow is white at 35%.

## Surfaces and backgrounds

- **Grounds:** paper for app and home; white for marketing intros and FAQ.
- **Bands:** flat bands and split bands, a pink closing band, a black footer.
- **Illustration-only colored regions:** circle vignettes, organic blobs behind photo cut-outs, the landscape strip.
- **None:** no textures, gradients or blur.
- **Code wells:** #DDDDDD; table header rows are paper.

## Components

- **Buttons:**
  - Pink primary; black (pink in dark); outline.
  - White outline button on pink bands.
  - Square icon buttons; header blocks; pills.
  - States: hover lift, press flat, focus outline.
- **Links:** underlined ink.
- **Navigation:** marketing header with the pill current marker and edge CTA block; app band header; breadcrumb.
- **Cards:**
  - Product cards, 4px with black border.
  - Help tiles.
  - Marketing showcase cards, 24px with #919191 border and 32px padding.
- **Testimonial bubble.**
- **Inputs:** 48px, black border, pink focus. Checkboxes, toggle, select.
- **Option card:** pink when selected.
- **Disclosure:** filter rows with a chevron; FAQ rows with a plus glyph (closed only).
- **Tabs:** outline pills.
- **Price flag.**
- **Empty state:** a dashed box.
- **Code panel** and inline code chips.
- **Data table** (p7):
  - one 1px black box, 4px radius
  - a paper header row with 16px bold labels
  - about 55px white rows with 1px black rules
  - a 14px mono key column and inline code chips
  - no zebra, no hover
- **Speech-bubble caption:** a white 1px-ink pill overlapping an illustration.
- **Carousel controls:** bare arrows; outline-circle dots with the current one filled; hover to opacity .7.

## Interaction

| Element | Hover | Press | Focus-visible | Open |
| --- | --- | --- | --- | --- |
| App buttons | −4px + `4px 4px 0 #000`, 150ms `cubic-bezier(.4,0,.2,1)` | Flat | 1px outline, offset 1px | — |
| Marketing CTA | −8px over lemon and red plates | Stays lifted | Outline | — |
| Pill tabs | Black outline appears, 0ms | Navigates | Outline | Current keeps the outline |
| Inputs | None | — | Pink ring `0 0 0 1–2px #FF90E8` | — |
| Disclosure | None | Toggles | Outline | Chevron rotates, 200ms `cubic-bezier(0,0,.2,1)` |
| Muted links | 50% black → black | — | Outline | — |
| Carousel | Opacity .7 | .7 | — | — |

Evidence: `reference/interactions/*.png`, `interactions.json`.

## Motion

| Pattern | Trigger | From → to | Duration / easing | Where |
| --- | --- | --- | --- | --- |
| Hard-shadow lift | Hover / press | −4px + shadow, then flat | 150ms `cubic-bezier(.4,0,.2,1)` | Buttons, cards |
| Plate lift | Hover | Button −8px, plate −4px | 150ms | Marketing CTAs |
| Sticker drift | Scroll | translateY 0 → −50% | Scroll timeline | Heroes (`motion/p1-m2.png`, `p2-m1.png`) |
| Tag marquee | Loop | 0 → −50% → 0 | 60s linear (20s mobile) | Home (`motion/p1-m1.png`) |
| Disclosure | Open | Chevron + margin | 200ms `cubic-bezier(0,0,.2,1)` | Filters, API |
| Pill outline | Hover | Border appears | 0ms | Tabs |
| Mascot | Loop | Rig, blink, tilt | 8000ms, 24fps | Home, about (raw file only) |

- **Not present:** the full captures show no entrance animations, fades, reveals or spinners. The checkerboard illustrations and vignettes are static.
- **Reduced motion:** marquee only under `no-preference`; `motion-reduce:animate-none` and `motion-reduce:transition-none`. The template turns off drift and marquee and swaps the shadow instantly.

## Illustration, icons and media

**Illustration** (three registers, one drawing):
1. Flat ink stickers: an even ~2px outline, one flat fill, thick extrusions, tilted and cropped.
2. Die-cut word badges and currency cut-outs: tall condensed hand-lettered words, two band colors, each on a solid black slab offset 6–10px.
3. Flat cartoon scenes:
   - circle vignettes, a full-bleed landscape, a photo cut-out on an organic blob
   - lumpy-headed characters with rubber-hose limbs
   - 3–4 band colors plus a deep red, ink outlines, no shading
   - comic speech bubbles in hand-lettered caps

Also:
- UI mockups drawn in the same style: browser chrome with three colored dots, black offset slab, pink flags, dot-legend stats, pink line over grey bars.
- All art files are SVG images, so no markup was captured.

**Icons:**
- Solid black glyphs at 16–24px with 2px round-cap line icons.
- Pink check circles; filled black check circles in lists (small-bets).
- Plus glyphs in the FAQ.

**Media:**
- No brand photography except cut-out portraits on blobs (features).
- Marketplace covers are noise.

## Theming

- **Mechanism:** `prefers-color-scheme` only, no toggle (`theme.json`).
- **Dark:**
  - #000 or #242423 grounds and #000 cards.
  - #DDDDDD text and white-35% hairlines.
  - Pink CTAs and a white current pill.
  - A white-35% hard shadow.
  - Bands, stickers, flags and the focus ring are unchanged.
- Evidence: `screenshots/p1-desktop-dark.png`, `p2-desktop-dark.png`, `p10-desktop-dark.png`, `p12-desktop-dark.png`.

## Writing style

- Sentence case; plain, upbeat second person; short headlines, often with money figures.
- Two-part sentences split across paired vignettes ("Instead of…" / "…do this!").
- Eyebrows are plain words; buttons are 1–2 word verbs; arrow-only buttons use a text arrow.
- Testimonials emphasize one phrase in bold with a highlighter.
- Style only, never the reference's lines.

## Coverage

| Area | Status | Note |
| --- | --- | --- |
| color | observed | Ink, paper, white + bands + pink; band-colored headings on black halves |
| typography | observed | One grotesk |
| spacing | observed | 4px base |
| layout-grid | observed | 12-col, 1024–1376px |
| section-patterns | observed | Hero, bands, checkerboard, ribbon, mosaic, giant stat, testimonials, FAQ, closing band, footer |
| shape | observed | 4 / pill / 24px |
| borders | observed | 1px black; #919191 on showcase cards only |
| elevation | observed | Hard offset on hover; static slab under illustrations |
| surfaces-and-backgrounds | observed | Paper, white, bands |
| buttons | observed | All variants |
| links | observed | Underlined |
| navigation | observed | Pills, band header, breadcrumb |
| forms | observed | Inputs, toggle, option cards |
| cards | observed | Product, help, showcase, testimonial |
| disclosure | observed | Filters, API, FAQ (closed only) |
| tabs | observed | Pills |
| tables-and-data | observed | Ping table in full; drawn dashboards on p1/p3 |
| feedback | derived | Only empty states seen |
| overlays | derived | No modal opened |
| iconography | observed | Solid glyphs |
| illustration | observed | Stickers, badges, vignettes, landscape |
| media | observed | SVG art, Lottie; covers are noise |
| motion-load | absent | None captured |
| motion-scroll | observed | Sticker drift |
| motion-hover-and-press | observed | Lift and slam |
| motion-loop | observed | Marquee, mascot |
| theming | observed | prefers-color-scheme |
| responsive | observed | Mobile captures |
| accessibility | observed | Reduced-motion rules, focus rings |
| writing-style | observed | Sentence case |

## What the reference does not show

All derived from the character.

- **Data table:** follow the ping table. Add a 2px pink left edge on the selected row, right-aligned tabular numbers, and one pink-flag money cell per row.
- **Dashboard:**
  - Header band.
  - Stat row: big 48px numbers with small round dot legends.
  - Charts: a pink line with dot markers over light-grey bars with dark caps, inside 1px ink panels.
  - Only one illustrated element: a sticker in the band.
- **Form validation:**
  - Error: a 2px #DC341E border plus a 14px ink message with a small red-filled ink-outlined icon.
  - Success: a lemon chip with an ink border.
- **Toast:** a white 1px ink panel with a static `4px 4px 0` ink shadow; slides 8px over 150ms.
- **Modal / menu:** the same panel over an `rgba(0,0,0,.4)` scrim; 40px menu rows with a paper hover.
- **Loading:** dashed paper skeleton blocks, or a rocking sticker; no shimmer or spinner.
- **Error page:** a full-viewport band, a 72–96px sentence, two stickers, and a plate-stack CTA.
- **Settings:** underlined links on the left; bordered panels on the right; pink selected cards.
- **Status pills:** outline pills with a band-color dot.
- **FAQ open state:** the answer at 16–20px under the question at the same indent; the plus glyph rotates 45°. Derived, since only the closed state was captured.

## Must not carry over

- The Gumroad name, wordmark and "G" coin mark.
- ABC Favorit. Use Space Grotesk / DM Sans and JetBrains Mono instead.
- All artwork:
  - the G-coins, receipts and tool stickers
  - the hand-lettered sticker words
  - the small-bets logo
  - the blob-headed cartoon characters, their scenes and the landscape
  - the product mockups and marquee icons
  - the mascot
- All copy.
- Creators' covers, photos and avatars.
- Only the techniques carry over.

## Proposed template

**Name:** **Felt-tip Market**.

**Tags:**
- tone: playful
- corners: tight
- density: regular
- appearance: light, dark
- keywords: ink hairlines, poster bands, sticker objects, hard shadow, stacked plates, grotesk

**The ten defining rules:**
1. *(Reworded.)* Every border on a product surface is 1px pure ink (#000; white at 35% in dark). There are no soft shadows anywhere. The only softer hairline (#919191) belongs to large 24px marketing showcase cards.
2. Ground is paper #F4F4F0. Surfaces are white boxes with an ink hairline and 4px corners; pills are only for "where you are" and chips.
3. *(Reworded.)* Color comes as whole flat fields: bands, split bands, stickers, flags. The palette is marigold, lemon, periwinkle, teal and pink, with black text. Band-colored text appears only as headings on the black half of a split band. Never gradients or tints.
4. Each area of the product owns one band color, used for its header band. On a product screen, one band at most.
5. Pink #FF90E8 is the single action color: the primary button, focus ring, selected border and price flag, 1–3 times per screen.
6. Hover lifts by −4px with a hard `4px 4px 0` ink shadow over 150ms; press slams it flat. The main CTA may use the stacked lemon and red plates once per screen.
7. Illustration is flat ink drawing: stickers, die-cut badges on a black slab, flat vignettes. Each uses one fill per shape and an even ink outline. They sit behind headings and in empty and error states, never over data.
8. Type is one friendly grotesk: display at 96, 72 or 48 with weight 500 and −0.4px tracking; UI at 16/22 weight 400. Sentence case everywhere.
9. Motion is physical and sparse: lift, slam, scroll-linked sticker drift, an occasional marquee. No fades, reveals or spinners, and all of it is off under reduced motion.
10. Dark mode inverts only the chrome, turns the black CTAs pink, and keeps the bands and stickers as they are.
