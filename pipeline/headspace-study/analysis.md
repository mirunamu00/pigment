# headspace-study — reference analysis

Reference: https://www.headspace.com/ · captured 2026-10-26 · 150 pages surveyed, 16 captured in depth.
Paths below are relative to `pipeline/headspace-study/`. `crops/` files are first-screen and close-up crops
cut from the captured screenshots (the home and hub screenshots are 1856–8256px wide because carousels
overflow; the crops keep the 1440px viewport).

## Character

A sunny, toy-like wellness language: warm white and cream pages broken by full-bleed bands of flat, saturated
color — yolk yellow, bright blue, tangerine, night navy — whose edges curve like a horizon, each topic owning one
color. Its voice is a family of flat geometric shapes (circles, crescents, blobs, clouds, four-point sparkles)
shaded with a single darker crescent, scattered as confetti around headings and set as round spot pictograms
beside list items, with small glyphs that loop slowly as if breathing. Everything you touch is a soft, chunky pill
in warm ink or blue that sits on a 2px ledge and sinks when pressed, set in a friendly bold grotesque with tight
tracking.

Keywords: sunny color fields · arched bands · flat geometric shapes · crescent shading · breathing glyphs · chunky
pills · warm cream · friendly bold sans. Tone: playful.

What you would lose by changing one thing:
- Tint the fields into pastels → it becomes a generic calm-wellness template; the reference's confidence is
  full-strength color next to warm white.
- Square the buttons or give them blurred shadows → the toy-like tactility (round pill, hard 2px ledge, 2px sink)
  disappears.
- Draw the shapes with outlines or gradients → it turns into generic flat-icon or 3D-blob illustration; the
  crescent-shaded flat primitive is the look.
- Speed up the glyphs or make them bounce → the "breathing" calm becomes playful noise.

## Site survey

150 of 2838 known pages surveyed (`reference/survey.json`; stopped at the page budget, last new feature on page
130). Page types: home; topic hubs (/sleep, /meditation, /mindfulness, /mental-health); service landings
(/online-therapy, /coaching, /app, /work, /enterprise → a separately built organizations site); content library
(/content, /content/topics/*); article index and articles (1118 + 1332 known — collections, sampled 5 each); about,
press, teachers; plans and gifting; legal/policy pages in ~20 locales.

| Share | Features (`reference/capture-report.md`) | Reading |
| --- | --- | --- |
| Site-wide | svg:icon 98%, ui:input 88%, ui:form 87%, motion:animation 64%, large image 49%, card grid 41% | Icons are solid glyphs; the input/form is the newsletter footer on every page; the animation is the staggered fade-in reveal |
| Common | carousel 36%, table 29%, sticky header 26%, dialog 26% | Tables only on legal pages; dialogs are almost all the third-party cookie banner (noise) |
| Occasional | Lottie 11%, svg:illustration 11%, disclosure 11%, banded sections 8%, transition 8% | Lottie and illustrations sit on the hero-level pages (home, therapy, app, AI companion, science, topics) — few pages, but the most important screens |
| One-off | logo wall 5%, quote 2%, autoplay video 2%, loop/rotate/svg motion 2%, divider 1%, current-page marker 1%, code block 1% | loop/rotate = an unused rotate keyframe (player spinner) on three sleep articles; code block = an address block on a legal page |

Noise excluded: the most frequent button styles (149 pages: 2px-radius blue/cream 13px buttons) are the cookie
banner, not the design. Four /content/topics pages are mostly other people's imagery (capture report).

## Signature elements

Candidates found, ranked by distinctiveness × reach:

1. Saturated color fields with arched band edges and per-topic color — first and last screen of most pages. High.
2. Flat geometric shape kit (crescent shading, sparkles, two-color discs, spot plates) — every brand page. High.
3. Breathing glyphs (slow looping scale/rotate, strong ease-in-out) — top of the home page, Lottie pages. High
   distinctiveness, moderate reach.
4. Chunky pills on a hard 2px ledge that sink when pressed; dot-prefixed active tab — site-wide. Medium-high (pills
   are common; the ledge + sink + dot tab are not).
5. Product vignettes building on color panels — hero of every product line. Medium.
6. Arc draw-on in the closing band (67px strokes, trim path) — one Lottie (`raw/lottie/p1-l15.json`), folded into
   motion patterns rather than a signature.
7. Mascot faces (closed-eye smiles, eye pairs) — the most recognizable, but brand characters: must not carry over.
8. Soft blurred gradient clouds — newer one-off on therapy pages; kept as an optional background layer only.

No notes were given in the intake, so there is nothing to reconcile.

### 1. Sunny color fields with arched edges

- **What:** whole sections in one flat saturated color — yellow #ffce00, blue #0061ef, night navy #050726,
  tangerine #ff7300, green #02873e — on a white/cream page. Hero bands end in a shallow convex arc (≈50–80px sag over
  1440px), closing bands start with a concave arc, night bands use a soft wave. Each topic owns a color everywhere
  (meditation yellow, mindfulness blue, sleep navy/violet, focus green).
- **Evidence:** `reference/crops/p13-desktop-first-screen.png`, `reference/crops/p1-faq-arched-cta-band.png`,
  `reference/crops/p9-night-hero.png`, `reference/screenshots/p14-desktop-light.png`,
  `reference/crops/p3-color-stat-tiles.png`, `styles.json#backgroundArea` (yellow 1.85%, blue 1.66%, green 0.53%,
  navy 0.49% — small area, but always the first/last screen).
- **Frequency:** hero band on 6 of 16 captured pages (all hubs and services), arched closing band or arched cream
  footer on every brand page, color panels in carousels/library, stat tiles on 3 pages.
- **Recipe:** tokens `--field-yellow/blue/orange/green/pink/night`, each with a paired on-color (ink on yellow and
  pink; white on blue, orange ≥24px bold, green, navy). One field per screen region: full-bleed band (padding
  64–96px) or contained panel (radius 24px). Curve the edge with an SVG path in the band color
  (`M0,0 H1440 V20 Q720,110 0,20 Z`, scaled) or `clip-path: ellipse(75% 100% at 50% 0)`; mirror for closing bands.
  Inside: on-color text, white/cream pills (blue pill only on non-blue fields), flat shapes in other palette hues.
  Never tint, never gradient; cream #f9f4f2 is the only quiet field.
- **Motion:** static; content inside fades in (500ms ease-out, 100ms stagger).
- **Application map:** hero/page header (band + arched edge) · dashboard (row of 3–4 color stat tiles) · app shell
  (category color as dot or active pill) · settings (cream panels; color only on a plan/danger header) · table
  (category dot or filled tag per row) · empty state (24px-radius color panel + shape + pill) · pricing (navy band,
  violet selected plan) · closing/footer (yellow concave band, cream arched footer) · onboarding (step panel in the
  chosen topic's color).
- **Limits:** one saturated field per viewport; never behind more than ~3 lines of text, inputs or tables; arched
  edges only on full-bleed bands; check contrast (white on #ff7300 only ≥24px bold).

### 2. Flat geometric shape kit with crescent shading and sparkle confetti

- **What:** circles (33–133px), crescents, rounded blobs, flat-bottomed clouds, hexagons, pills, four-point concave
  sparkles (16–43px) and dots, flat fills only, volume from one darker crescent of the same hue; two-color discs
  (hue B covering 50–70% of hue A); portraits set inside saturated discs with a second-color crescent peeking out.
- **Evidence:** `reference/crops/p1-floating-shapes-testimonials.png`, `reference/crops/p13-spot-pictogram-grid.png`,
  `reference/screenshots/p16-desktop-light.png` (crescent-shaded sphere and shape mosaic), `reference/screenshots/p13-desktop-light.png`,
  `reference/illustrations/p1-g9.png`, `reference/raw/lottie/p1-l9.json` (a sun/cloud built from 4 filled layers).
- **Frequency:** confetti headings (home, therapy), spot-pictogram grids (8 of 16 captured), sparkles in every
  hero, photo-in-disc (coaching, about, organizations); article and library covers across thousands of pages use the
  same style.
- **Recipe:** inline SVG, fills only. Disc + crescent: circle in hue A, plus a path = disc minus an offset disc
  (offset 12–18% of r to the upper-left) in hue A darkened ≈8% lightness, covering the lower-right 25–35%.
  Two-color disc: rounded polygon in hue B clipped to the disc. Sparkle: `M12 0 Q12 12 24 12 Q12 12 12 24 Q12 12 0 12
  Q12 12 12 0Z`, rotated 0–20°. Cloud: three circles on a pill base, white/cream or sky blue, a lighter second cloud
  overlapping. Spot plate: 110px cream (or saturated) circle with a 2–3 primitive pictogram at 60–70%. Max 3 hues per
  piece + optional single ink round-cap stroke (10–15% of width, #141313). Compose asymmetrically; ≥24px from text.
- **Motion:** entry fade 0 → 1, 500ms ease-out, 100ms stagger in reading order (`motion.json` p1 animations 2–9);
  optional idle drift on one shape (±4px, ±10°, 5–8s, cubic-bezier(0.75,0,0.25,1), alternate).
- **Application map:** section headings (4–6 shapes) · feature lists/settings groups (56–110px spot plates) · empty
  state (one 160–220px composition) · error (grey disc + lavender crescent + rain cloud, no sad face) · loading
  (disc whose crescent rotates) · dashboard (32–48px plates on tiles, one sparkle per card) · avatars (initials in a
  disc with a crescent) · success toast (24px sparkle or green disc + tick) · onboarding (full compositions).
- **Limits:** never over text, data or inputs; max one composition per card and 6 confetti shapes per heading; no
  faces; no outlines; no gradients (blurred cloud backgrounds excepted).

### 3. Breathing glyphs

- **What:** 58px glyphs — fat zigzag stroke, crescent + sparkle, spiral, dot in a ring, two overlapping bubbles —
  looping forever on 5–8.7s cycles: scale 100 → 87% with rotate 0 → 15° → 0 → -35° (spiral), front bubble 100 →
  148% twice, sparkle orbiting 360° in 1.67s, dots popping 0 → 100 → 0% in 1s with 67ms stagger. Tweened Lottie,
  strokes 6.9–9px on 58px with round caps.
- **Evidence:** `reference/crops/p1-topic-rows-glyphs.png`, `reference/raw/lottie/p1-l4.json` (zigzag, stroke 9,
  round cap), `p1-l5.json` (moon/star/dots), `p1-l6.json` (spiral), `p1-l8.json` (bubbles),
  `reference/illustrations/p1-g5.png`, `p1-g7.png`. Easing measured: cubic-bezier(0.75, 0, 0.25, 1) on every glyph key.
- **Frequency:** six glyphs at the top of the home page; marquee glyphs; Lottie pages (11% of surveyed, the hero-level ones).
- **Recipe:** 48–64px SVG; stroke glyphs = one path, stroke-width 15% of the box, round caps/joins, one hue; fill
  glyphs = 2–3 flat shapes. CSS: `transform-box: fill-box; transform-origin: center; animation: breathe 6s
  cubic-bezier(.75,0,.25,1) infinite` with keyframes 0/50/100% `scale(1) rotate(0)`, 25% `scale(.87) rotate(15deg)`,
  75% `scale(.87) rotate(-35deg)`. Variants: pulse (1 → 1.48, 8s), orbit (360° in 1.7s then rest), pop (dots, 1s,
  67ms stagger). Different durations per glyph (5, 6, 7.3, 8s).
- **Motion:** as above, infinite; reduced motion → rest frame.
- **Application map:** category lists/nav cards (one glyph per row) · dashboard (one glyph in the greeting card) ·
  loading (pop dots or breathing disc instead of a spinner) · empty state (64–96px) · choice tiles in forms/onboarding
  (breathe only when hovered/selected) · success toast (one orbit, no loop) · promo marquee · settings (static glyph
  as section icon).
- **Limits:** ≤6 looping at once, ≤64px, only in choice lists and headers; never in tables, inputs or next to
  changing numbers; pause off-screen and under reduced motion.

### 4. Chunky pills on a ledge

- **What:** every action is a pill (32px/999px radius; circles 50%) in warm ink #2d2c2b, blue #0061ef or cream
  #f9f4f2, bold 16–18px label at -0.03em, hard ledge `0 2px 0 rgba(65,61,69,.2)`; hover darkens one step, press moves
  it down 2px and the ledge disappears. Active filter tab = ink pill with a white dot before the label.
- **Evidence:** `reference/interactions/p4-button-5.png` (press: transform 0 → 1.995px, shadow alpha → 0),
  `reference/components/p1-button-variants.png`, `reference/interactions/p1-button-6.png`, `styles.json#shadow`
  (ledge = 55.6% of shadows), `styles.json#transition` (150ms cubic-bezier(0.32,0.94,0.6,1) = 83.5%),
  `reference/crops/p7-form-panel-and-dot-tabs.png`.
- **Frequency:** ink pills on 129–131/150 pages, circle buttons 136/150.
- **Recipe:** height 40/48/56px, padding 0 20–32px, `border: 2px solid transparent`, `font: 700 16px/1.15`,
  `letter-spacing: -0.03em`, ledge shadow, transition 150ms cubic-bezier(.32,.94,.6,1) on background, color,
  border, shadow, transform; hover ink → #141313, cream → #e2ded9; `:active { transform: translateY(2px);
  box-shadow: 0 2px 0 rgba(65,61,69,0) }`; `:focus-visible { outline: 2px solid #0040ea; outline-offset: 2px }`.
  Variants: blue (one conversion action per region), cream, on-color (white), outline, circle (48px), mega
  (closing CTA, 48–80px label). Tab pill: cream inactive; active ink + 10px white `::before` dot.
- **Motion:** 150ms darken; 2px press. Reduced motion: same states, no transition.
- **Application map:** forms (submit ink/blue, secondary cream) · tables (32px cream circle row actions, pill
  filters) · dashboard (pill segmented ranges, blue create) · settings (ink save, cream destructive with red label,
  pill switches) · dialogs (cream cancel + ink confirm) · empty/error (one ink pill) · navigation (header CTA) ·
  pagination (48px cream circles, active ink).
- **Limits:** one blue pill per region; no square buttons; no blurred button shadows; labels ≤3 words, sentence case.

### 5. Product vignettes on color

- **What:** legible fragments of the product — a user bubble and a "thinking…" bubble that fills with the reply, a
  search field typing a query, a glass chip with avatar + name + check — floating over a saturated panel or photo
  and building in sequence on entry.
- **Evidence:** `reference/motion/p1-v1.png` (bubble enters at ~40% opacity, then text), `reference/motion/p1-v2.png`
  (typing), `reference/raw/lottie/p1-l1.json` (750ms segments, cubic-bezier(0.48,0.04,0.52,0.96)),
  `reference/illustrations/p7-i1.png`, `reference/screenshots/p3-desktop-light.png`.
- **Frequency:** home carousel (5 panels), therapy, coaching and organizations heroes.
- **Recipe:** in a 24px-radius color panel, 1–3 real components: white cards radius 16px, padding 16×20px, 10px
  status dot (blue = person, orange = system) + 14px/700 name + 16px text; search pill 56px with caret; glass chip
  `rgba(20,19,19,.45)` + `backdrop-filter: blur(8px)`, 32px avatar, 14px/700 name, small check badge. Offset
  diagonally with 10–20% overlap.
- **Motion:** once on entry: opacity 0 → .4 → 1, translateY 8px → 0, 750ms cubic-bezier(.48,.04,.52,.96), 300–600ms
  between fragments; typing 60–80ms per character.
- **Application map:** hero · empty state (ghost of the future screen at 40%) · onboarding · feature tour · loading
  (the "thinking" bubble with popping dots) · dashboard activity card · help answers as bubbles.
- **Limits:** one per screen; real-sized (≥14px) text; no device mockups inside product screens.

## Color

Measured in `reference/styles.json` (painted area) and CSS variables.

| Role | Hex | Evidence |
| --- | --- | --- |
| Page | #ffffff | backgroundArea 80.97% |
| Cream surface (cards, panels, footer, inactive pills) | #f9f4f2 | 10.06%, `--2ndary-warm-grey-100` |
| Cream 2 | #faf6f4 | 0.48%, section band p13 |
| Warm grey 200 (input border, hover) | #e2ded9 | `--wary-grey-200`, p1-button-2 |
| Warm grey 300 (rules, border hover) | #c6c1b9 | borderColor 26.2% |
| Ink (text, dark pill) | #2d2c2b | textColor 78.1%, `--primary-warm-grey-700` |
| Ink 2 (icons, footer bar) | #44423f | textColor 6.0%, borderColor 28.9% |
| Ink pressed | #141313 | p1-button-5 hover |
| Muted | #4b4c4d | textColor 4.4% |
| Action blue | #0061ef | `--secondary-blue`, 1.66% |
| Focus blue | #0040ea | `--primary-blue`, focus outline |
| Yellow | #ffce00 | `--yellow`, 1.85% |
| Light yellow | #ffe14f | `--extended-yellow-100` |
| Tangerine | #ff7300 | `--primary-orange-200` |
| Sky blue | #00a4ff | Lottie strokes/fills |
| Leaf green | #02873e | checkmarks, stat tile |
| Pink | #ffa1cc | 0.37%, sparkles |
| Lavender | #ad85d1 | Lottie moon |
| Night violet | #5432a5 | selected plan, tags |
| Night navy | #050726 | sleep bands |
| Night indigo | #201f52 | panels on night |
| Deep purple | #3b197f | night covers |

- **How much:** one saturated field dominates a marketing screen (≈15–35% of it); reading pages drop to blue
  CTA/links and orange bullets (<3%). Neutrals are always warm — no cool greys, no pure black.
- **Stacking:** white page → cream panel/card (flat, no border) → white input or card inside cream → saturated
  field as its own band; on a saturated field, white/cream cards and pills.
- **Topic coding:** meditation yellow, mindfulness blue, sleep navy/violet, focus green, kids blue, therapy cream
  + blue (`screenshots/p9`, `p10`, `p11`, `p14`).
- **Dark appearance:** none on the site. Derived from the night palette (see Theming).

## Typography

- **Family:** Headspace Apercu (custom Apercu, Colophon; 93.8% of text) → **Figtree** (OFL; DM Sans fallback).
  Apercu Mono (one footnote) → DM Mono.
- **Weights:** 400 (72.9%), 500 (15.2%), 700 (11.5%). Headings always 700; body 400; feature copy and labels 500.
- **Tracking:** headings and button labels -0.03em (-1.92px at 64, -1.2px at 40, -0.54px at 18); body normal;
  uppercase eyebrows +0.18em (organizations site only).
- **Casing:** sentence case everywhere.

| Role | Size / line | Weight | Tracking |
| --- | --- | --- | --- |
| Mega CTA label | 80 / 1.0 | 700 | -0.03em |
| Display | 64 / 72 | 700 | -0.03em |
| h2 | 40 / 48 | 700 | -0.03em |
| h3 | 32 / 36.8 | 700 | -0.03em |
| h4 card title | 24 / 32 | 700 | -0.025em |
| Item title | 20 / 24 | 700 | -0.03em |
| Lead / article body | 20 / 30 | 400 | -0.01em |
| Body medium | 18 / 26 | 500 | -0.01em |
| Body | 16 / 24 | 400 | normal |
| Button lg / md | 18 / 21.6, 16 / 18.4 | 700 | -0.03em |
| Label | 14 / 18 | 500 | -0.01em |
| Eyebrow | 14 | 700 | +0.18em, uppercase |
| Footer link | 12 / 13.8 | 500 | -0.01em |

Line length: articles 780px column at 20px (~75 characters); FAQ 888px; hero leads ~480px. Big headings break into
two balanced lines, centered on section openers, left-aligned in two-column heroes.

## Spacing and layout

- Base 4px, rhythm 8: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128 (`styles.json#spacing`: 16px 16.5%, 4px 14.1%,
  24px 12.6%).
- Sections: 64–128px vertical padding (`structure.json` paddingY). Cards: 32–48px padding, 24px gaps.
- Container 1360px (inner 1344) with 48px gutters; 12 columns; two-column hero/feature splits in 1160px; reading/FAQ
  column 888px; card rows of 3 or 4.
- Density: airy marketing bands around compact modules (topic rows 76px tall, FAQ rows 80px pitch). Template
  density: regular.
- Breakpoints: 768, 1024, 1440 (48/64/90rem). Phones stack bands, center hero text, keep pills at size
  (`screenshots/p10-mobile-light.png`).
- Header: fixed 80px white (static on articles), shadow after scroll; 58px yellow announcement bar above.

## Section and UI patterns

| Pattern | How often | Evidence |
| --- | --- | --- |
| Saturated hero band, arched bottom, two columns (headline + checklist + pill / mockup or blob photo + clouds + sparkles) | 6/16 captured (all hubs and services) | `crops/p13-desktop-first-screen.png`, `crops/p10-desktop-first-screen.png` |
| Closing color band with concave arched top and one mega pill (or plan block) | 6/16; cream arched footer on all | `crops/p1-faq-arched-cta-band.png` |
| Confetti heading + 3 cream testimonial cards | home, therapy | `crops/p1-floating-shapes-testimonials.png` |
| Spot-pictogram feature grid (3 or 6, 110px plates) | 8/16 | `crops/p13-spot-pictogram-grid.png` |
| Topic rows with looping glyphs (3×2) | home | `crops/p1-topic-rows-glyphs.png` |
| Pill-tab carousel of 24px-radius color panels + dot pagination | 36% of surveyed pages | `screenshots/p1-desktop-light.png` |
| Category-colored library panels with 3 cover cards | /content, article index | `screenshots/p14-desktop-light.png` |
| Color stat tiles (4, 8px radius) | 3/16 | `crops/p3-color-stat-tiles.png` |
| FAQ list (888px, plus icons, warm rules), optional category pills | every service page | `crops/p1-faq-arched-cta-band.png` |
| Newsletter footer on cream arch + dark bottom bar | every brand page | `components/p1-light-footer-1.png` |
| Logo wall, single-tint, marquee | 5% | `screenshots/p7-desktop-light.png` |
| Thin yellow marquee of a phrase + glyphs | home | `motion/p1-v5.png` |
| Stepper (numbered circles) beside a phone mockup | therapy, coaching | `screenshots/p7-desktop-light.png` |

Rhythm: white → color band → white → cream band → white → color band → cream footer. Bands alternate; two
saturated bands never touch.

## Shape, borders and depth

- Radii: circles 50% (27.7% of radii), pills 32px (15.2%), panels 24px, cards 16px, inputs/plan cards 12px, topic
  rows/stat tiles 8px (19.3%). Full-bleed bands are square at the sides but curved at top/bottom.
- Borders: 2px warm grey (#e2ded9) on inputs and topic rows (46.6% of borders are 2px); 1px #c6c1b9 rules on FAQ and
  tables; transparent 2px borders on pills so outline variants keep size.
- Depth: almost flat. Cards and panels separate by tone (cream on white), not shadow. The only recurring shadow is
  the hard 2px pill ledge; the header gets `0 5px 10px rgba(0,0,0,.07)` when scrolled; floating chips
  `0 2px 4px rgba(20,19,19,.2)`.

## Surfaces and backgrounds

- White page (81%) with cream #f9f4f2 panels, cards and the footer (10%).
- Saturated bands (yellow, blue, navy) at the top and bottom of pages; color panels (24px radius) inside carousels
  and the library.
- Night surfaces: navy #050726 band, indigo #201f52 panels, deep-purple illustrations, soft darker blobs as
  background shapes (`crops/p9-night-hero.png`).
- Textures: none. Gradients: only a sky photo band on home and blurred pink/orange cloud shapes on therapy pages.
- Photos are always framed by color (disc, blob, rounded rectangle); never edge-to-edge bands.

## Components

- **Pill buttons:** ink (primary), blue (conversion), cream/white (secondary), outline (on blue bands), mega
  (closing CTA); sizes 40/48/56px. States in Interaction.
- **Filter pills/tabs:** 48px, cream inactive, ink active with white dot; optional colored mini-icons.
- **Circle buttons:** 48px cream with chevron (carousel), ink with play triangle (media), 32px back-to-top.
- **Topic row:** white, 2px #e2ded9 border, 8px radius, label + glyph + chevron.
- **Header/nav:** fixed 80px, 16px links, blue pill CTA; announcement bar; article header with more links; mobile
  logo + pill + hamburger.
- **Cards:** cream testimonial (16px radius, 48px padding, quote 24px, attribution 14px at the bottom); info card
  with bullet links; cover card (flat illustration, title under or over a dark gradient, white tag pill).
- **Inputs/selects:** white, 1–2px warm-grey border, 12px radius, 56px tall, labels above.
- **Plan selector:** violet selected card with white check and a white "best value" tab; white unselected.
- **Disclosure:** FAQ row with plus icon and 1px rule.
- **Stepper:** numbered 32px circles (active blue).
- **Audio bar:** 56px circular play, thin track with a yellow knob.
- **Tables:** legal only — plain 1px borders, bold first column.
- **Tags:** white 12px/700 on covers, yellow offer pill, glass chips on photos.
- **Footer:** cream arch, newsletter field + ink pill, six link columns, dark bar with round social icons and a
  white-outlined language pill.

## Interaction

| Element | Hover | Press | Focus-visible | Evidence |
| --- | --- | --- | --- | --- |
| Pill (ink/blue/cream) | one step darker bg (ink → #141313, cream → #e5e7ec/#e2ded9), 150ms cubic-bezier(0.32,0.94,0.6,1) | translateY 2px, ledge shadow → 0; cream → #d2d5de | 2px solid #0040ea | `interactions/p4-button-5.png`, `p1-button-5.png`, `p1-button-6.png` |
| Topic row | border #e2ded9 → #c6c1b9, 300ms ease | same | outline | `interactions/p1-button-2.png` |
| Nav link | weight 400 → 700, instant | — | 1px outline, 1px offset | `interactions/p1-nav-link-9.png` |
| Outline pill (organizations) | ink → blue label + border, 200ms | same | 1px outline, 5px offset | `interactions/p3-button-4.png` |
| FAQ disclosure | none | — | outline | `interactions/p1-disclosure-1.png`; open: instant, no animation |
| Cards | none (whole card is a link) | — | outline | `interactions/p1-card-12.png` |

The radius 50% → 32px "change" in `interactions.json` is the same pill measured two ways, not a morph.
Derived for the template: inputs get a 2px #0061ef border on focus; checkbox/radio selected = ink fill.

## Motion

Two speeds: UI is small and quick (150ms, 2px), illustration is slow and organic (500ms fades, 5–9s breaths).

| Pattern | Trigger | From → to | Duration / delay | Easing | Where |
| --- | --- | --- | --- | --- | --- |
| Confetti fade-in | scroll | opacity 0 → 1 | 500ms; 0/100/…/500ms stagger, cards at 500/1000ms | ease-out | heading shapes, testimonials (`motion/p1-m2.png`, `p1-m5.png`) |
| Panel fade-in | scroll | opacity 0 → 1 | 750ms | ease-out | photo collage in blue band (`motion/p1-m1.png`) |
| Avatar pops | scroll | opacity 0 → 1 | 500ms; 500/800/1100/1400ms | ease-out | avatars on sky band |
| Breathing glyph | loop | scale 1 → .87/1.48, rotate ±15–35°, dots pop | 5–8.7s cycles, infinite | cubic-bezier(0.75,0,0.25,1) | topic rows (`raw/lottie/p1-l4..l8`) |
| UI vignette | scroll, once | bubble 0 → .4 → 1, text swaps; typing | 750ms segments; scene 4–6s | cubic-bezier(0.48,0.04,0.52,0.96) | carousel panels (`motion/p1-v1.png`, `p1-v2.png`) |
| Arc draw-on + cloud drift | scroll, once | 67px strokes trim 14% → 91–93%; clouds slide in | 4s, 200ms stagger; clouds 2.2–6.8s | cubic-bezier(0.75,0,0.25,1) | yellow closing band (`raw/lottie/p1-l15.json`) |
| Rating fill | scroll | mask 0 → 100% | 1383ms | cubic-bezier(0.66,0,0.34,1) | stars (`raw/lottie/p1-l14.json`) |
| Marquee | loop | translateX continuous | ~16s glyph loops | linear | yellow phrase band, logo wall |
| Pill hover/press | hover/press | darken; 2px sink | 150ms | cubic-bezier(0.32,0.94,0.6,1) | all pills |
| Header shadow | scroll | none → 0 5px 10px rgba(0,0,0,.07) | instant | — | header |

- Duration scale: 150 · 300 · 500 · 750 · 1000 · 1333 · 4000 · 5000–8700 (loops).
- Easing scale: snap cubic-bezier(0.32,0.94,0.6,1); reveal ease-out; breathe cubic-bezier(0.75,0,0.25,1); vignette
  cubic-bezier(0.48,0.04,0.52,0.96); slide cubic-bezier(0.66,0,0.34,1).
- Nothing bounces or overshoots; travel is tiny.
- Reduced motion: the reference has no reduced-motion rules (with reduced motion the Lottie scenes simply don't
  render — the closing band is an empty yellow field in `screenshots/p1-desktop-light.png`). Template: rest frames
  for all shapes/glyphs/vignettes, instant reveals, marquees stopped, hover colors kept, press offset without
  transition.
- Evidence gaps: the sleep-article loop/rotate (survey) was not running in the deep capture; the FAQ open has no
  animation to measure.

## Illustration, icons and media

- **Illustration style:** flat vector primitives, no outlines; 2–3 saturated hues per object side by side; volume
  via one darker same-hue crescent; sparkles (four-point concave), dots and small flowers as confetti; clouds with
  flat bottoms; sparse centered compositions on a single field. Line work = a single thick round-cap stroke
  (10–15% of object size) in #141313 (`raw/lottie/p1-l1.json`, stroke 10, round cap; `p1-l15.json` 11.42px round
  cap). Lottie construction: shape layers mostly filled outlines, trim paths only for draw-on arcs, tweened at
  30–60fps (0% cel frames).
- **Icons:** solid filled glyphs, one color, rounded terminals — 16px plus/chevrons (#44423f), 24px white or ink,
  32px chevron in a cream square; social glyphs in 24px ink circles; green solid checkmarks
  (`icons/p7-icons.png`, `inventory.json`). Strokes appear on only 2 icons.
- **Photography:** warm natural-light portraits, smiling, cropped into discs, blobs (with an offset colored edge)
  or 16px rounded rectangles, overlaid with glass UI chips; phone mockups in black bezels, tilted ±8° on night bands.
- **Video:** autoplay muted loops of teachers in cards (library), a phone demo (organizations).
- **Mascots (excluded):** closed-eye smiling faces on shapes, eye pairs in the marquee.

## Theming

- Mechanism: none — no prefers-color-scheme rules, no toggle, no theme selectors (`reference/theme.json`).
- The sleep section is a content-driven night palette and the basis for a derived dark appearance:
  page #050726, raised panel #201f52, selected/active #5432a5, cards on night white or #2a2966 (derived), text
  #ffffff and #c9c6e0 (derived muted), action blue stays #0061ef but pills on night are white with ink labels,
  accents yellow #ffce00 and pink #ffa1cc, borders rgba(255,255,255,.16) (derived). Bands get wave edges; shapes keep
  their hues (`crops/p9-night-hero.png`).

## Writing style

- Sentence case for headings, buttons, tabs and nav; uppercase only for small eyebrows.
- Warm, plain, second person; reassuring, not clinical. Buttons 1–3 words, verb first. Headings are short phrases
  without terminal periods; questions used as section headings. Benefits as green-tick checklists; superscript
  footnote markers for claims. (Style only — no copy carries over.)

## Coverage

| Area | Status | Note |
| --- | --- | --- |
| color | observed | histograms + variables; topic coding |
| typography | observed | one family 400/500/700; Figtree substitute |
| spacing | observed | 4/8 rhythm, 64–128 sections |
| layout-grid | observed | 1360, 12 col, 888 reading |
| section-patterns | observed | 13 patterns with frequency |
| shape | observed | pills, 24/16/12/8 radii, arched bands |
| borders | observed | 2px warm grey, 1px rules |
| elevation | observed | 2px ledge, header shadow; flat cards |
| surfaces-and-backgrounds | observed | white/cream, color bands, night bands |
| buttons | observed | 7 variants, states measured |
| links | observed | blue underlined inline, bold-on-hover nav |
| navigation | observed | header, article header, mobile, footer |
| forms | observed | newsletter, selects, plan selector; validation derived |
| cards | observed | testimonial, info, cover, stat, plan |
| disclosure | observed | FAQ |
| tabs | observed | pill tabs with dot |
| tables-and-data | observed | legal tables; product tables derived |
| feedback | derived | no toasts/alerts/validation on site |
| overlays | observed | cookie banner (noise) + mobile menu; modal styling derived |
| iconography | observed | solid filled glyphs |
| illustration | observed | flat shape kit; mascots excluded |
| media | observed | Lottie, photos, videos, mockups |
| motion-load | observed | none beyond Lottie start |
| motion-scroll | observed | staggered fades, vignettes, draw-on |
| motion-hover-and-press | observed | 150ms darken, 2px sink |
| motion-loop | observed | breathing glyphs, marquee |
| theming | derived | dark from night palette |
| responsive | observed | 16 mobile captures |
| accessibility | observed | blue focus ring, native details; no reduced motion; orange contrast |
| writing-style | observed | sentence case, warm, short |

## What the reference does not show

All derived from the character; flagged as derived.

- **Dashboards:** white canvas, cream 16px-radius cards with no borders or shadows; a top row of 3–4 color stat tiles
  (8px radius, eyebrow 14px/700, 48–64px/700 number, 16px caption) using category colors; charts in flat palette hues
  with round line caps (3px), no gradients, bars with 8px top radius; one breathing glyph in the greeting card.
- **Dense tables:** white body, 14–16px rows 52px tall, 1px #e2ded9 row rules, header row 14px/700 in #44423f on
  cream #f9f4f2, category shown as a 10px colored dot or small filled tag pill; selected row cream; row actions as
  32px cream circle buttons; no zebra in saturated colors.
- **Forms:** labels 16px/500 above, inputs 56px, 12px radius, 2px #e2ded9 border, focus 2px #0061ef border + no glow;
  errors: border and 14px message in a derived red #d93a26 (warm, not pink) with a small solid alert glyph; success
  as a green #02873e tick. Checkboxes 24px, 6px radius, ink fill with white tick; radios ink dot; switches pill-shaped
  48×28 with the ledge, on = ink (or category color).
- **Feedback/toasts:** cream or ink pill-shaped toasts (radius 999px, 48px tall) with a 24px sparkle/tick shape,
  bottom-center, fade 150ms; inline alerts as cream panels with a colored 6px dot.
- **Empty states:** a 24px-radius panel in the section's color (or cream) with one flat composition (disc + crescent
  + cloud + 2 sparkles), 24px/700 title, 16px line, one ink pill.
- **Error pages:** cream band, grey disc with lavender crescent and a small rain cloud, plain heading, ink pill home.
- **Loading:** pop dots (3 dots scale 0 → 1 → 0, 1s, 67ms stagger) or a breathing disc; skeletons in cream #f9f4f2 with
  12–16px radii, no shimmer gradient (opacity pulse .6 → 1, 1.2s).
- **Dialogs:** white, 24px radius, 32px padding, scrim rgba(20,19,19,.4), footer cream + ink pills; enter opacity +
  translateY 8px, 150ms snap easing.
- **Dark mode:** derived from the night palette (Theming).

## Must not carry over

- Names: Headspace, Headspace Health, Ginger, Headspace XR, product and character names, feature names.
- Logo: orange dot + lowercase wordmark; no single-dot logo marks.
- Mascots: closed-eye smiling faces on shapes, eye pairs, the orange smiling sphere, the face mosaic — no faces on
  any shape. Substitute: abstract shapes, crescents, sparkles, one round-cap line gesture.
- Fonts: Apercu family (proprietary) → Figtree; Apercu Mono → DM Mono.
- Artwork: Lottie scenes, covers, sleep illustrations, photography, app screenshots, partner/insurer logos.
- Copy: headlines, marquee phrase, mega-CTA phrase, testimonials, stats and claims.

## Proposed template

**Name:** Morning Shapes

**Tags:** tone playful · density regular · light (+ derived night) · flat geometric illustration · pill buttons ·
color-coded sections · slow looping glyphs

**Ten defining rules**

1. Warm white and cream carry the page; saturated color appears as whole flat fields — one per viewport — never as tints.
2. Give every area of the product its own saturated hue and keep it everywhere that area appears.
3. Full-bleed bands curve at their edges (convex arc below a hero, concave arc above a closing band, wave on night).
4. Every action is a round pill or circle with a bold label, a hard 2px ledge, a one-step darker hover and a 2px sink on press (150ms, cubic-bezier(0.32,0.94,0.6,1)).
5. One blue pill per region marks the conversion action; ink pills do everything else; the active tab is an ink pill with a small white dot.
6. Illustrate only with flat primitives — circles, crescents, blobs, clouds, four-point sparkles — max three hues, volume from one darker crescent, no outlines, no faces.
7. Scatter 4–6 shapes around section openers and put small spot pictograms in round plates beside list items; never over text, data or inputs.
8. Small glyphs breathe: slow scale/rotate loops of 5–9s on cubic-bezier(0.75,0,0.25,1), at most six on screen, still under reduced motion.
9. Depth by tone, not shadow: cream cards on white, white cards on cream, color fields as their own layer.
10. Type is one friendly bold grotesque: 700 headings at -0.03em, 16–20px body, sentence case, short verb-first buttons.
