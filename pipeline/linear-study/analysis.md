# linear-study — reference analysis

Reference: the submitted domain (98 pages surveyed, 16 captured in depth). No user notes; the concept below
was found from the evidence. Paths are relative to `pipeline/linear-study/`. Screenshot files are named
`*-light.png` by the capture tool, but they show the site's default appearance, which is **dark**
(`reference/theme.json`: `html[data-theme="dark"]` on every first-party page). Real light-mode shots are the
`*-toggled.png` files.

**Noise excluded throughout:** p4 (`join-slack`) redirected to a third-party chat-service invite page
(`reference/screenshots/p4-desktop-light.png`). Its fonts, CSS variables (every `--dt_*`/`--font-family-*` in
`styles.json cssVariables`), checkbox form, facepile bounce animation and cookie banner are not the site.
Customer logos and brand-colored quote cards are third-party marks.

## Character

A near-black instrument panel: a #08090A ground covering 83% of the painted area (`styles.json
backgroundArea`), five lifted greys, hairline 1px white-alpha edges and an Inter-style sans at weight 510
with tight negative tracking — and the hero of every page is the product's own UI, set on a dim, spotlit
stage that fades into the dark (`reference/screenshots/p6-desktop-light.png`). The machine's states are told
in a private visual dialect: 5×5 dot-matrix glyphs that step through frames (`reference/motion/p5-v2.png`),
a shimmer sweeping across "working" text (`reference/motion/p1-m3.png`), isometric 0.5px hairline
blueprints with mono "FIG 0.n" captions and marching dashes (`reference/motion/p6-v3.png`). Color is almost
absent — one indigo for focus and selection, status glyphs in yellow/green/orange/red at 16px — so the
whole site reads as precise, quiet and engineered.

Keywords: near-black, hairline, spotlit product stage, dot-matrix status, isometric blueprint, mono captions,
quiet precision, pill controls.

What you would lose by changing one thing: replace the spotlit real-UI stages with illustrations or photos
and the site becomes any dark SaaS template — the stages are where the product proves itself, and every other
layer (grey ladder, hairlines, mono captions, dot glyphs) is tuned to make that UI look like a precision
instrument. Second most fragile: swap the dot-matrix glyph for a spinner and the system loses its voice for
"the machine is working".

## Site survey

- 98 of 1,112 known pages surveyed (robots respected, 1,028 sitemap URLs); stopped at **saturation** — the
  last new feature appeared on page 56 (`reference/capture-report.md`, `reference/survey.json`).
- Page types: home/product overview, feature landing pages (build, coding sessions, agents, intake, insights,
  asks, ai), pricing, customers index + stories, now (news) + press + articles, changelog + entries, legacy
  release pages, docs, developer API docs, learn/enablement guides, contact + support + sales, careers, about,
  method, quality, enterprise, startups, integrations, settings help pages.
- **Site-wide:** svg icons 95%, blurred sticky header 70%, card grid 70%.
- **Common:** illustrations 44%, large (product) images 35%, CSS animation 34%, disclosure 34%, video 30%,
  breadcrumb 28%, hairline line drawings 20%, transitions 20%, loops 19%, current-page marker 19%, **theme
  toggle 19% — docs/developers/learn/enablement only**.
- **Occasional:** autoplay video 15%, inputs 14%, marquee 12%, logo wall 11%, quotes 11%, badges 10%,
  carousel 10%, svg motion 9%, code blocks 9%, tables 7%, canvas 7%, scroll reveal 6%.
- **One-offs:** forms 4% (contact/sales, enterprise, startups — not deep-captured; the fourth was the
  third-party invite page), draw-on 3% (build, readme, diffs), rotate 3% (method, fm, a 2020 release page),
  tabs 1% (a docs page), choice 1% (third-party page).
- Two eras coexist: the current language (all 2025–26 pages) and a legacy 2020 release page (p3) with
  saturated gradient frames, a blurred blob morph and wide-tracked titles
  (`reference/screenshots/p3-desktop-light.png`). The legacy page is a one-off and is excluded from the template.

## Signature elements

Candidates found, ranked by distinctiveness × reach:

1. **Spotlit product stage** — real UI on a radial-lit dark panel, fading at its edges. Hero + most sections
   of every product page; no default agent UI does this (it would use a screenshot in a browser frame or an
   illustration).
2. **Dot-matrix status glyph** — 5×5 dots stepping through frames (`steps(1)`), 75–100+ animated dots per
   agent page; the dot vocabulary repeats in charts, thumbnails and a canvas dot field. Highly distinctive.
3. **Isometric hairline blueprint** — 0.5px rounded-vertex isometric slabs, "FIG 0.n" mono captions,
   marching dashes. 20% line drawings / 44% illustrations, section openers on home.
4. **Working shimmer and live edges** — shimmer text, sweeping badge border, pulse ring, stepped caret.
   Distinctive as a family; it is how every "agent at work" moment is told.
5. **Split opener with two-tone voice and mono figures** — a typographic composition that opens every
   section. Less unique alone, but it carries the voice to screens with no imagery.

Rejected as signature: the grey-ladder palette and pill buttons (tokens, not concept — covered in Color and
Components); the logo wall and quote cards (third-party marks); the hero chip-field video on feature pages
(recorded footage, one per page, rebuilt only as a stage variant); the legacy gradient frames and 20s blob
morph (p3, one-off); the perspective card stack that settles on scroll (one page — kept as a stage motion).

### 1. Spotlit product stage

- **What:** the main image is the product's own interface rendered in HTML at true scale, inside a 1344px-wide
  panel (8px radius — corner measured over 4–5px on `p6-desktop-light.png`; 1px rgba(255,255,255,0.05)
  edge). The panel ground carries a cool-grey radial light from its top (feature pages) or bottom (home hero)
  edge: #7A7F83 at the edge center, #45494A at the corners, back to #08090A about 600px away (pixel samples
  of `p6-desktop-light.png` rows 1225–1900; `p1-desktop-light.png` rows 900–1290). The UI window inside
  (#0F1011, raised-panel shadow) is inset about 56px and fades to the ground toward the right and/or bottom
  edge; secondary windows overlap at 50–80% opacity with blur. A 15px/510 caption + two grey lines sit
  bottom-left inside the panel.
- **Evidence:** `reference/screenshots/p6-desktop-light.png`, `reference/screenshots/p1-desktop-light.png`,
  `reference/illustrations/p6-i3.png`, `reference/illustrations/p6-i4.png`, `reference/illustrations/p6-i7.png`,
  `reference/screenshots/p5-desktop-light.png`.
- **Frequency:** hero of home and every product feature page plus 4–7 sections per feature page (p6: 7);
  large images 35% and video 30% of the survey are mostly this; docs embed the same dark UI shots even in
  light mode (`reference/screenshots/p2-desktop-toggled.png`).
- **Recipe:**

  ```css
  .stage { position: relative; overflow: hidden; border-radius: 8px;
    border: 1px solid var(--border-subtle);
    background: radial-gradient(120% 70% at 50% 0%, var(--stage-light) 0%, var(--stage-mid) 22%, var(--bg-page) 62%); }
  .stage[data-light="below"] { /* same gradient 'at 50% 100%' */ }
  .stage-window { margin: 56px 56px 0; background: var(--bg-panel); border-radius: 8px 8px 0 0;
    box-shadow: var(--elevation-raised);
    mask-image: linear-gradient(to right, #000 70%, transparent), linear-gradient(to bottom, #000 75%, transparent);
    mask-composite: intersect; }
  .stage-ghost { opacity: .5; filter: blur(2px); transform: translate(32px, 24px); }
  ```

  Dark tokens: stage-light #7A7F83, stage-mid #45494A. Content is original UI of the product being built
  (lists, details, charts) — never a screenshot of the reference. Light (**derived**): stage ground #F3F4F5,
  light peak #FFFFFF, window #FAFAFA with the soft-stack shadow — or keep the stage dark inside a light page,
  exactly as the reference's docs do.
- **Motion:** the frame is static; its content may live (rows fade in 300ms, caret blinks, dot glyphs loop).
  Feature pages also settle a perspective stack of cards on scroll: 700ms
  `cubic-bezier(0.645,0.045,0.355,1)`, translateY(16px) scale(1.05) blur(2px) → translateY(-32px) scale(0.9)
  blur(0) (`reference/motion.json` p6 reveals). Reduced motion: final state, no blur.
- **Application map:**

  | Context | Use |
  | --- | --- |
  | Marketing hero | Full-width stage under the headline, lit from below, showing the core screen |
  | Dashboard | Page header shows the key chart in a 240px mini-stage, light from top at 60% |
  | Settings | Preview stage beside appearance/notification settings showing the live result |
  | Onboarding / tour | Each step is a stage; the relevant UI region stays, the rest fades by mask |
  | Empty state | 360×200 stage with one ghosted sample row, one sentence, one pill button |
  | Docs / help | UI screenshots framed as stages, dark even in light mode |
  | Pricing | One stage above the comparison table showing the feature that differs |
  | Error / 404 | Dim stage (light at 30%) with one faded window outlining the missing object |

- **Limits:** one lit stage per viewport; never behind text, forms or tables (stages contain UI; they are not
  backgrounds); dense screens get at most a 200–240px mini-stage; light peak never brighter than #7A7F83 on dark.

### 2. Dot-matrix status glyph

- **What:** a 5×5 grid of circles (16px glyph: 2px dots on a 3px pitch; a 96px loader in sandbox blocks)
  whose dots switch between opacity 0.3 and 1 in discrete frames — a bouncing pixel ("pong"), rising and
  draining columns ("upDown"), a pulsing core ("agent"), an hourglass, one-shot "empty" and "blowOut". Used
  instead of spinners for "the machine is working"; its dots reappear as scatter-chart marks
  (`reference/motion/p1-v2.png`), blog thumbnails (`reference/screenshots/p11-desktop-light.png`) and a canvas
  dot field behind the closing CTA (p5, 1440×676).
- **Evidence:** `reference/motion/p5-v2.png`, `reference/motion/p5-v3.png`, `reference/motion/p1-v1.png`,
  `reference/motion.json` (p1 `grid-dot-*-upDown` 2800ms, `-pong` 1600ms, `-agent` 3200ms; p5 `-hourglass`
  600ms, `-pong` 960ms, `-empty-once` 200ms, `-blowOut-once` 1080ms; all `steps(1)`), `reference/icons/p1-icons.png`
  (16px glyph, 25 shapes, `inventory.json` icon 688).
- **Frequency:** 75 animated dots on home (3 loaders), 100+ on coding sessions; svg motion 9% and loops 19%
  are mostly these.
- **Recipe:**

  ```html
  <svg viewBox="0 0 15 15" class="dots" data-pattern="pong"><!-- 25 × <circle r="1" cx="1.5+3i" cy="1.5+3j"/> --></svg>
  ```
  ```css
  .dots circle { fill: currentColor; opacity: .3; animation-timing-function: steps(1); animation-iteration-count: infinite; }
  /* one @keyframes per dot, generated from a frame table: frame k → opacity 1 (lit) or .3 */
  ```

  Author each pattern as data (`frames: string[]` of 25-char masks) and generate keyframes: N = 8–14 equal
  frames. Patterns: pong 960–1600ms, rise 2800ms, agent 3200ms, hourglass 600ms; one-shots intro 200ms and
  outro 1080ms. Color currentColor = text.body (#D0D6E0 dark, #282A30 light). Sizes 12/16/24/48/96px — scale
  the viewBox, never the dot count. Done: all 25 lit 400ms, then swap to a check glyph.
- **Motion:** loop, `steps(1)`, durations above; reduced motion freezes on a designed static frame (center
  column lit = working, all lit = done).
- **Application map:** inline loading (16px, pong, replaces spinners); table status column for syncing rows
  (12px); dashboard widget refresh (12px rise; chart points scale in 420ms); pressed submit button (12px glyph
  replaces the trailing arrow); empty state (48px frozen sparse frame); error (48px frozen X in status.danger at
  0.8); background-job toast (16px agent loop → green check); section break / closing CTA (faint dot field, 1px
  dots, 12px pitch, opacity 0.08–0.15).
- **Limits:** at most 3 animated glyphs visible, only for real in-progress work; never larger than 96px; dot
  fields ≤ 0.15 opacity and never behind text under 24px.

### 3. Isometric hairline blueprint

- **What:** isometric slabs and boxes with rounded vertices, drawn in 0.5px strokes — near/top edges #D0D6E0,
  hidden/inner seams #2E2E32–#3E3E44 with round caps — faces filled with the ground #08090A so stacked
  shapes occlude each other, a soft drop shadow under each slab, dashed construction lines and chevrons for
  flow, a tiny 5×5 dot grid or striped disc as a top-face mark. Each sits on a near-black panel with a 12px
  mono uppercase "FIG 0.n" caption top-left and a 15px/510 title + grey description below
  (`reference/raw/svg/p1-i3.svg`: 17 shapes, strokes #D0D6E0 ×4, #2E2E32 ×6, #3E3E44 ×2, all 0.5px).
- **Evidence:** `reference/illustrations/p1-i3.png`, `reference/illustrations/p1-i4.png`,
  `reference/illustrations/p1-i5.png`, `reference/motion/p6-v3.png`, `reference/motion/p1-v1.png`,
  `reference/raw/svg/p1-i3.svg`, `reference/raw/svg/p1-i5.svg`.
- **Frequency:** line drawings 20%, illustrations 44%; the home page's first content section opens with
  three; feature pages use one per automation/integration section; draw-on 3%.
- **Recipe:** SVG, root `fill="none"`, `stroke-width: .5` (`vector-effect: non-scaling-stroke` below 160px).
  2:1 isometric. A slab top is a rhombus with every vertex rounded by an arc of about 7–8% of the slab width;
  sides drop 16–120px. Paint order per slab: shadow copy (fill bg.page, `drop-shadow(0 8px 12px #08090A)` +
  `drop-shadow(0 0 68px #08090A)`), body (fill bg.page, stroke line.front), back seam (stroke line.back,
  `stroke-linecap: round`). Stack slabs 16–17px apart for layered "systems"; join two slabs with dashed 1px
  connectors (`stroke-dasharray: 2 4`) and 3 chevrons per flow direction. Tokens: line.front = text.body,
  line.back = #2E2E32 / border.ring, marks = text.tertiary; caption mono 12px uppercase text.tertiary.
  Subjects are abstract system parts of the product being built (layers, stacks, ports, blocks) — no logos.
  Light (**derived**): faces #FFFFFF, front edges #3C4149, back seams #D6D7DA, shadow rgba(0,0,0,0.06).
- **Motion:** connectors march — `stroke-dashoffset: 0 → -8px` (straight) / `-6px` (isometric), 1000ms
  `linear`, infinite, opposing flows reversed; chevrons translate 0 → 48px over 2500ms `linear` inside a fade
  mask (`reference/motion.json` p6 `J1CkbW_offset`, `J1CkbW_move`). Slabs lift apart up to 32px on scroll-in
  or hover (`--purpose-lift: 31.667px` in `p1-i5.svg`), staggered 0–120ms, 700ms
  `cubic-bezier(0.645,0.045,0.355,1)`. Reduced motion: static, slabs at rest.
- **Application map:** marketing section opener (row of 3 captioned blueprints, 260–300px); settings →
  integrations (two slabs with marching connector, stops when disconnected); empty state (120–160px dimmed slab
  stack + mono caption + one button); onboarding (one slab added per completed step); docs architecture
  diagrams with mono callouts; error/outage (broken, still connector with a status.danger point); dashboard
  first-run widget (80–96px, static); pricing tier headers (1–4 slabs by tier).
- **Limits:** max 3 per screen, one animated; min 80px wide; never in table cells, fields or buttons; no color
  fills — one status-colored point at most.

### 4. Working shimmer and live edges

- **What:** a highlight band sweeps across "Thinking…"-style status text (`translateX(0) → translateX(100%)`
  over 0–75% of 2400ms, `linear`, then a pause — `reference/motion/p1-m3.png`); status badges carry a gradient
  border that slides (`background-position-x: 0 → 120px`, 2000ms ease, infinite — `reference/motion/p1-m1.png`);
  live dots pulse a ring (scale 0.375 → 1, opacity 0.7 → 0 by 60%, 2000ms; the dot flashes brightness 1 → 1.6 at
  8% — `reference/motion.json` p9); carets blink in hard steps (1250ms). New conversation turns fade in 300ms
  (`reference/motion/p1-m4.png`).
- **Evidence:** `reference/motion/p1-m3.png`, `reference/motion/p1-m1.png`, `reference/motion/p1-m4.png`,
  `reference/screenshots/p9-desktop-light.png`.
- **Frequency:** every agent conversation mock on home and feature pages; the system-status dot on contact.
- **Recipe:**

  ```css
  .shimmer { position: relative; color: var(--text-secondary); }
  .shimmer::after { content: attr(data-text); position: absolute; inset: 0; color: var(--text-primary);
    mask-image: linear-gradient(90deg, transparent 0 30%, #000 50%, transparent 70% 100%);
    mask-size: 250% 100%; animation: sweep 2400ms linear infinite; }
  @keyframes sweep { 0% { mask-position: 100% 0 } 75%, 100% { mask-position: -150% 0 } }
  .live-edge { border: 1px solid transparent;
    background: linear-gradient(var(--bg-raised), var(--bg-raised)) padding-box,
      linear-gradient(90deg, var(--border-solid), var(--text-secondary), var(--border-solid)) border-box;
    background-size: auto, 120px 100%; animation: edge 2000ms ease infinite; }
  @keyframes edge { to { background-position: 0 0, 120px 50% } }
  .pulse::after { animation: ring 2000ms ease infinite; } /* scale(.375)/.7 → scale(1)/0 at 60% */
  ```
- **Motion:** loops as above; reduced motion removes shimmer, sweep and pulse (text stays text.secondary, edge
  stays border.solid, dot stays), caret stays visible.
- **Application map:** assistant panel (thinking/tool lines shimmer, finished lines fade in 300ms and stop);
  table (live edge on the status badge of a processing row, never the row text); dashboard ("Live" pulse dot by
  real-time widgets, grey when stale); form (async "Checking…" helper line); skeleton loading (bars bg.raised
  with the 2400ms sweep at 6% white); settings → system status (green pulse "Operational", orange static
  dot for incidents); toast (headline shimmers until done, then a check).
- **Limits:** only for genuinely in-progress/live states — never headings, CTAs, static labels; max 2
  shimmering lines and 1 sweeping edge per screen.

### 5. Split opener with two-tone voice and mono figures

- **What:** every section opens with a full-width hairline, then a 48px/510 (-0.022em) two-line headline in
  the left half and, from the 50% line, a 24px/400 #D0D6E0 description with a small grey link ending in "+"
  or an arrow. Statements set a bright lead sentence (#F7F8F8) continuing in grey (#8A8F98) at the same size.
  12px mono uppercase labels number figures ("FIG 0.1"), caption diagrams, date timelines and list items
  ("01. CHAT").
- **Evidence:** `reference/screenshots/p1-desktop-light.png`, `reference/screenshots/p6-desktop-light.png`,
  `reference/screenshots/p5-desktop-light.png`, `reference/screenshots/p8-desktop-light.png`,
  `reference/screenshots/p11-desktop-light.png`.
- **Frequency:** 4 split openers on home, 7 on the build page; two-tone statements on home, coding sessions
  (×3), customers; mono captions on home, feature pages, changelog strips.
- **Recipe:** section `border-top: 1px solid var(--border-subtle)`, `padding-top: 160px` (96px mobile); grid of
  2 equal columns, gap 32px; h2 48px/1.0, 510, -0.022em, text.primary, `text-wrap: balance`, ≤ 2 lines; p
  24px/1.33, 400, -0.012em, text.body, max 30ch; 32px gap; link 15px text.secondary + " +"/"→". Two-tone:
  `<p><b>Lead.</b> continuation…</p>` where `b` keeps the paragraph's weight and only changes color to
  text.primary. Mono label: 12px/1.4 uppercase, text.tertiary, zero-padded numbers. Below 720px: stack,
  headline 32px, description 17px.
- **Motion:** static — the reference never fades text up on scroll (only one 1000ms delayed opacity fade on a
  small hero link, `reference/motion.json` p1).
- **Application map:** marketing sections (split opener; centered 72px closing variant); settings (each group:
  15px/510 title left, 13px description right, hairline above); dashboard header (24px title left, two-tone
  one-line summary right); data table (mono column headers/timestamps, two-tone caption); empty state (mono
  caption + two-tone 17px sentence); docs/changelog (mono dates on a dot timeline); long forms (split section
  headers, mono step counter "02 / 04").
- **Limits:** mono only for labels, numbers, dates, code, captions; two-tone once per section, 1–3 sentences;
  one 48px+ headline per viewport.

## Color

Measured from `styles.json` (dark default) and pixel histograms of the toggled docs screenshots (light).

| Role | Dark | Light | Evidence |
| --- | --- | --- | --- |
| bg.page | #08090A | #FFFFFF | backgroundArea 83.37%; theme.json bodyAfter |
| bg.panel (sidebar, stage, mock) | #0F1011 | #FAFAFA | backgroundArea 3.21%; p10 toggled 40% |
| bg.card / search | #141516 | #FAFAFA | p10 pixels; p11 search |
| bg.raised (code, menus) | #1C1C1F | #F9F8F9 | backgroundArea; p7 toggled 19% |
| bg.hover | #232326 | (derived) #F1F1F2 | interactions p1 |
| bg.press | #28282C | (derived) #EAEAEB | interactions p7 |
| text.primary | #F7F8F8 | #282A30 | textColor 18.3% / p10 toggled |
| text.body | #D0D6E0 | #3C4149 | textColor 51.2% / 5.6% |
| text.secondary | #8A8F98 | #6F6E77 | textColor 16.2% / p10 toggled |
| text.tertiary | #62666D | (derived) #8A8F98 | icons, captions |
| border.subtle | rgba(255,255,255,0.05) | #EEEEEE | borderColor 26.4% |
| border.default | rgba(255,255,255,0.08) | #E9E8EA | borderColor 13.2%; header |
| border.solid | #34343A | #DCDBDD | hover card border; light card ring |
| border.ring | #3E3E44 | rgba(0,0,0,0.08) | shadow 23.9% |
| accent (focus, selection, switch) | #5E6AD2 | #5E6AD2 | focus outline rgb(94,105,209) |
| accent.bright (focus on raised) | #7170FF | — | p14 focus |
| inverse CTA bg / hover | #E5E5E6 / #FFFFFF | #282A30 / #08090A | button styles 19 pages |
| status.progress | #F0BF00 | #F0BF00 | icon fill |
| status.done | #27A644 | #27A644 | rgba(39,166,68,.07) tint |
| status.urgent | #FC7840 | #FC7840 | icon fill, p5 fill transition |
| status.danger | #EB5757 | #EB5757 | p1-i9 stroke, timeline dot |
| data.teal / data.blue | #00B8CC / #21B3FF | same | p1-i2 fills ×200 / p1-i7 stroke |
| stage.light / stage.mid | #7A7F83 / #45494A | (derived) #FFFFFF / #F3F4F5 | p6 pixel samples |

- **Accent budget:** indigo only on focus rings, the selected nav row, switches/checkboxes and at most one
  primary icon button (e.g. a send button) — ≤ 3 uses per screen. Primary CTAs are the inverse pill, never
  indigo. Status hues only as 14–16px glyphs, 6px dots, chart marks or a 7% tint behind diff lines.
- **Surfaces stack** by lightening the grey one step per level: page #08090A → panel #0F1011 → card #141516 →
  raised #1C1C1F → hover #232326 → press #28282C. Each level adds a 1px white-alpha edge, never a big shadow.
- **Dark appearance** is the identity (see Theming). **Light appearance is thin:** observed only on the docs
  family (19% of pages) — prose, sidebars, cards, code, tables — never with stages, blueprints or dot glyphs.
  Light values for those are **derived** and marked in the table.
- Customer quote cards in brand hues (lime #E4F222, pastel blue gradients) are third-party brand color and do
  not belong to the palette.

## Typography

| Role | Observed | Substitute | Why |
| --- | --- | --- | --- |
| Sans (all text) | Inter Variable (95% of text; weights 400, 510, 590) | Inter variable (OFL 1.1) | Already OFL; the variable build is needed for 510/590. Do not name the Apple-proprietary display face in the fallback chain |
| Mono (captions, code, dates) | Berkeley Mono (commercial, 4%) | Geist Mono (OFL 1.1); alt JetBrains Mono (OFL) | Proprietary; Geist Mono has the closest compact grotesque mono build |

Scale by role (`inventory.json typography`, `styles.json fontSize/lineHeight/letterSpacing`):

| Role | Size / line | Weight | Tracking |
| --- | --- | --- | --- |
| display (closing CTA, feature hero) | 72 / 72 | 510 | -1.584px (-0.022em) |
| h1 home hero | 64 / 64–68 | 510 | -1.408px |
| h2 section / page title | 48 / 48 | 510 | -1.056px |
| docs h1 | 32 / 36 | 590 | -0.704px |
| lead / section description | 24 / 31.92 | 400 | -0.288px |
| docs h2 | 24 / 31.92 | 590 | -0.288px |
| h3 | 20 / 26.6 | 590 | -0.24px |
| article prose | 17 / 27.2 | 400 | normal |
| body | 15 / 24 | 400 | -0.165px (46.9% of all text) |
| docs body / sidebar | 14 / 21 | 400–510 | -0.182px |
| UI small (nav, buttons, meta, footer) | 13 / 19.5 | 400–510 | -0.13px |
| mono caption | 12 / 16.8 | 400 | normal, UPPERCASE |

Rules: headings 510 (marketing) or 590 (docs/product), never 700; tracking ≈ -0.022em at 32px+, -0.011em at
13–24px; sentence case; display lines broken by hand into 2 short lines; prose measure 60–75 characters (docs
column ≈650px at 15px); body is #D0D6E0, not white.

## Spacing and layout

- **Base unit 4px**, rhythm 8px, frequent 6px half-step (spacing histogram: 8px 25%, 6px 15%, 16px 9%, 32px
  6%, 12px 5%, 4px 5%, 20px 4%, 24px 4%). Scale: 2, 4, 6, 8, 12, 16, 20, 24, 32, 48, 56, 64, 96, 128, 160.
- **Section spacing:** about 160px from a section's top hairline to its headline (166px measured on
  `p1-desktop-light.png`), 96–128px from heading block to stage; 96px on mobile.
- **Grid:** marketing frame 1344px in a 1440 viewport (48px margin), text inset to 80px from the viewport
  edge; split openers at 50%; card grids 3–4 columns divided by 1px hairlines; footer 6 columns
  (`structure.json`). Docs: 280px sidebar | ≈650px prose (frame 1160) | ≈200px TOC.
- **Density:** "airy frame, dense content" — 160px between marketing sections, but product UI inside stages
  and the docs shell use 28–32px rows and 6–8px gaps.
- **Breakpoints:** 1280, 1024, 768, 640, 600 (`styles.json mediaQueries`); hover effects gated by
  `(hover: hover) and (pointer: fine)`.

## Section and UI patterns

| Pattern | How often | Evidence |
| --- | --- | --- |
| Split section opener (hairline, headline left, description + link right) | every feature section, 4–7 per long page | `reference/screenshots/p1-desktop-light.png`, `p6-desktop-light.png` |
| Spotlit product stage | hero + most sections of product pages | `reference/screenshots/p6-desktop-light.png` |
| Hairline-divided card grid (blog, customers, pricing tiers) | 70% of pages | `reference/screenshots/p11-desktop-light.png`, `p8-desktop-light.png` |
| Feature link index ("Features" label + two columns of "+" links) | 4× on home | `reference/screenshots/p1-desktop-light.png` |
| Two-tone statement paragraph | home, coding sessions ×3, customers | `reference/screenshots/p5-desktop-light.png` |
| Mono figure captions / numbered lists | home, feature pages, changelog strips | `reference/screenshots/p5-desktop-light.png` |
| Dot timeline (horizontal strip; vertical in changelog) | home, now, changelog | `reference/screenshots/p15-desktop-light.png` |
| Logo wall + stat row (3 big numbers with hairlines) | 11% / customers, pricing | `reference/screenshots/p12-desktop-light.png` |
| Centered closing CTA (72px statement + 2 pills, optional dot field) | every marketing page | `reference/screenshots/p12-desktop-light.png` |
| Docs shell (sidebar groups, breadcrumb bar, TOC with 2px active bar) | ≈25% of survey | `reference/screenshots/p2-desktop-light.png` |
| Pricing comparison table | pricing | `reference/screenshots/p12-desktop-light.png` |

No banded sections: the ground never changes color between sections; hairlines alone separate them. Hero is
left-aligned on home/feature pages (headline at x=80), centered only on single-message pages and closers.

## Shape, borders and depth

- **Radii:** pill 9999px for every button, nav hover, chip, search field (43% of radii); 8px panels, cards,
  stages, code, menus (19%); 6px small controls; 5px chips in product UI; 4px inline code/checkbox; 12px
  contact cards/popovers; 16px rare. Nothing rounder than 16px except full pills.
- **Borders:** 1px (75%), white-alpha 0.05 (subtle) / 0.08 (default) on dark; solid #34343A for hover; 0.5px
  in illustrations and inset highlights; 2px only for the TOC active bar.
- **Depth = tone + ring, not shadow:** ring `0 0 0 1px #3E3E44` (24% of shadows); raised `inset 0 0 0 1px
  rgba(255,255,255,.03), inset 0 1px 0 rgba(255,255,255,.04), 0 0 0 1px rgba(0,0,0,.6), 0 4px 4px rgba(0,0,0,.1)`
  (15%); popover `-5px 12px 28px rgba(0,0,0,.4)`; light: `0 0 0 1px rgba(0,0,0,.08), 0 1px 4px -1px
  rgba(0,0,0,.09)`. The 1px top inner highlight is what makes dark panels look machined.

## Surfaces and backgrounds

- One flat ground (#08090A) for the whole page; no section bands, no textures, no page gradients.
- Light appears only as a **local radial light inside stages** (#7A7F83 → #08090A) and as the hero light
  bleeding below the home mock.
- Dot fields: a canvas of faint dots behind the closing CTA (p5, 1440×676) and dot grids in thumbnails.
- Thumbnails/media: 8px radius on #0F1011; photography desaturated or B/W.
- Header: #08090A → transparent with `backdrop-filter: blur(20px)` once scrolled, hairline bottom.

## Components

- **Buttons** (`reference/components/p12-button-variants.png`, `capture-report.md` button styles):
  - *Inverse primary pill* — #E5E5E6 bg, #08090A text, h32 (13px/510, 0 12px) / h40 (0 14–16px) / h44 (16px, 0
    20px); hover #FFFFFF; press scale 0.971. One per view.
  - *Dark secondary pill* — rgba(255,255,255,0.05) bg, #F7F8F8 text, hover #191A1B; bordered variant #08090A
    bg, #8A8F98 text, 1px #1C1C1F, hover #232326 + text #F7F8F8.
  - *Ghost nav pill* — transparent, #8A8F98 13px, h32, hover rgba(255,255,255,0.08) + #F7F8F8 (62 pages).
  - *Text/arrow link* — 13–15px #8A8F98 + "→" or "+" (20 pages; radius 8px, padding 0 2px).
  - *Icon button* — 28–32px, 16px glyph #62666D, hover tint.
- **Links:** prose links #F7F8F8 with underline #62666D → #F7F8F8 on hover.
- **Navigation:** fixed 72px blurred header (logo, 6 ghost pills, divider, "Log in" ghost, inverse "Sign up");
  docs sidebar rows 28–32px with 16px icons, active rgba(255,255,255,0.05); breadcrumb "Group / Page"; TOC with
  2px active bar; footer 6 columns of 13px #8A8F98 links under 13px/510 #F7F8F8 group titles.
- **Cards:** docs link card (rgba(255,255,255,.05), 8px, icon top, title + 2 lines at bottom, ≈140px tall);
  contact card (#0F1011, 12px, glow ::before on hover); content card in hairline grids (no box); quote card.
- **Inputs:** search pill (#141516, h32–36, 16px icon); composer (raised panel, 8px, toolbar of 20px icons,
  indigo send button); settings rows with switch (indigo on) and select chips (#1C1C1F, 6px)
  (`reference/illustrations/p6-i11.png`).
- **Disclosure:** full-width rows, hairline separators, chevron; 180ms slide.
- **Tabs:** text tabs with moving indicator (350ms spring); segmented pills inside product UI.
- **Badges/chips:** 20–24px, 12px, 6px colored dot + label, hairline; agent badge with sweeping border.
- **Tables:** comparison table (rows ≈44px, hairline column rules, check-in-circle / ×); data lists with status
  rings, priority bars, IDs, 16px avatars, right-aligned dates.
- **Code block:** #1C1C1F / #F9F8F9, 8px, 13px mono, copy button; diffs with 7% red/green tints.
- **Menu/popover:** #1C1C1F, 8px, inset ring #23252A, 28–32px rows, section labels 12px #62666D.

## Interaction

| Element | Hover | Focus-visible | Press | Open |
| --- | --- | --- | --- | --- |
| Ghost nav pill | #8A8F98→#F7F8F8, bg→rgba(255,255,255,.08), 100ms ease | 1px solid #5E6AD2, offset 2px | + outline #F7F8F8 | — |
| Inverse pill | #E5E5E6→#FFFFFF | same ring | scale(0.971), outline #08090A | — |
| Secondary/bordered button | bg→#232326/#191A1B, text+icon→#F7F8F8 | same ring | bg #28282C, scale(0.971) | — |
| Sidebar row | bg rgba(255,255,255,.02–.03) | ring (offset -2px inside sidebar) | outline #D0D6E0 | — |
| Docs link card | bg→#232326, border→#34343A | ring | outline #F7F8F8 | — |
| Glow card | ::before opacity 0→0.5 | ring | ::before 1 | — |
| Media/quote card | filter brightness(1.03) | ring | same | — |
| Text link | underline color #62666D→#F7F8F8 | ring | — | — |
| Tab | #8A8F98→#D0D6E0 | text #F7F8F8 + ring | selects | indicator 350ms spring |
| Disclosure trigger | text→#F7F8F8, bg→#232326, 160ms quad-out | ring | — | panel 180ms ease-out-quad, chevron 120ms |
| Icon button on raised panel | brightness(1.3) | 2px #7170FF offset 2px | brightness(1.6) | — |

Evidence: `reference/interactions/p1-button-2.png`, `reference/interactions/p10-card-6.png`,
`reference/interactions/p2-tab-2.png`, `reference/interactions/p9-card-5.png`, `reference/interactions.json`.
Press feedback is always the same 0.971 scale (≈3%); focus is always the 1px indigo ring offset 2px.

## Motion

| Pattern | Trigger | From → to | Duration / easing | Iterations | Where |
| --- | --- | --- | --- | --- | --- |
| Hover tint | hover | bg/text one step lighter | 100ms ease (38% of transitions); 160ms `cubic-bezier(.25,.46,.45,.94)` | 1 | buttons, rows |
| Press shrink | press | scale 1 → 0.971 | 100ms quad-out | 1 | all buttons |
| Disclosure | open | height 0 → auto; chevron rotate | 180ms quad-out; 120ms `cubic-bezier(.455,.03,.515,.955)` | 1 | accordions |
| Tab indicator | state | position/width | 350ms spring (`linear()` approximation) | 1 | docs tabs |
| Chat turn in | state | opacity 0 → 1 | 300ms spring/ease-out; 150ms status; 500ms `cubic-bezier(.16,1,.3,1)` | 1 | conversation mocks |
| Send group arm | state | opacity 0.2 → 1 | 800ms `cubic-bezier(.22,1,.36,1)` | 1 | composer |
| Hero link fade | load | opacity 0 → 1 | 1000ms, delay 2000ms | 1 | home hero |
| Chart dots | scroll | scale 0.4→1, opacity 0→1 | 420ms quad-out, staggered | 1 | scatter chart |
| Stack settle | scroll | translateY(16)/scale(1.05)/blur(2) → translateY(-32)/scale(.9)/blur(0) | 700ms `cubic-bezier(.645,.045,.355,1)` | 1 | feature page |
| Dot matrix | loop | per-dot opacity 0.3 ↔ 1 | 600–3200ms `steps(1)` | ∞ | status glyphs |
| Shimmer | loop | band translateX 0 → 100% (0–75%) | 2400ms `linear` | ∞ | working text |
| Border sweep | loop | background-position-x 0 → 120px | 2000ms ease | ∞ | agent badge |
| Marching dashes | loop | stroke-dashoffset 0 → -8 / -6px | 1000ms `linear` | ∞ | blueprints |
| Chevron flow | loop | translate 0 → 48px | 2500ms `linear` | ∞ | blueprints |
| Caret | loop | opacity 1 ↔ 0 | 1250ms `steps(1)` (1200ms visibility variant) | ∞ | composer |
| Status pulse | loop | ring scale .375→1, opacity .7→0 | 2000ms ease | ∞ | live dot |

Frame sheets: `reference/motion/p1-m1.png`, `p1-m3.png`, `p1-m4.png`, `p1-v1.png`, `p1-v2.png`, `p5-v1.png`,
`p5-v2.png`, `p6-v1.png`, `p6-v3.png`. Several CSS sheets (p1-m1, p1-m3) are too small to read the change by
eye; values come from `motion.json` keyframes.

- **Duration scale:** 100 · 160 · 250 · 300 · 420 · 700 · 1000 (state/entry) and 600 · 960 · 1250 · 1600 ·
  2000 · 2400 · 2500 · 2800 · 3200 (loops).
- **Easing scale:** `ease` (micro), `cubic-bezier(0.25,0.46,0.45,0.94)` (quad-out, default UI),
  `cubic-bezier(0.645,0.045,0.355,1)` (scroll settle), `cubic-bezier(0.16,1,0.3,1)` / `cubic-bezier(0.22,1,0.36,1)`
  (entries), `steps(1)` (machine loops), `linear` (dashes, shimmer).
- **Reduced motion:** the reference gates loops with `(prefers-reduced-motion: no-preference)` (status pulse,
  disclosure slide, chevron), removes chart transitions and hides a decorative chip column under `reduce`
  (`motion.json reducedMotionRules`). The template: loops stop (dot glyphs freeze on a designed frame), shimmer
  and sweeps removed, scroll settle snaps to final, press scale dropped, color changes kept.
- **Not captured / gaps:** the hero chip-field on feature pages is a video (`p6-v1.png`); the 3% `rotate` and
  the `marquee` (logo row on mobile and some feature pages) were seen in the survey but not frame-captured on a
  current page — the only captured rotation is the legacy p3 icon (`p3-m1.png`, excluded).

## Illustration, icons and media

- **Illustration:** isometric hairline blueprints (signature 3): 0.5px strokes, round caps on seams, miter on
  outlines, fills = ground color, soft drop shadow, rounded vertices, no color, no wobble, mono "FIG" captions
  (`reference/illustrations/p1-i3.png`, `p1-i4.png`, `p1-i5.png`, `reference/raw/svg/p1-i3.svg`). News thumbnails
  use the same monochrome generative vocabulary — helices of dots, hairline fans, dot matrices, ellipse
  orbits — grey on #0F1011 (`reference/screenshots/p11-desktop-light.png`). Small drawings cropped at 33–95px
  (`illustrations/*-g*.png`) are almost all third-party customer logos and the site's own mark — none carry over.
- **Icons:** 16px grid (20px in composers), mostly solid fills of simple geometry, some 1.5px strokes with butt
  caps (`inventory.json`); idle #62666D/#8A8F98, active #F7F8F8. Status rings: empty ring = todo, half-filled
  yellow = in progress, green check-in-circle = done, orange/red = urgent/bug; priority = 3 ascending bars;
  6px label dots (`reference/icons/p1-icons.png`).
- **Media:** product UI as video (autoplay, muted, loop, 15%) or live HTML; B/W/desaturated photography only
  on customer/press pages; 16:9 at 8px radius.

## Theming

- **Mechanism: toggle (docs family) + fixed dark elsewhere.** Every first-party page sets
  `html[data-theme="dark"]` + `color-scheme: dark`; the one `prefers-color-scheme` rule belongs to an embedded
  tweet widget (`reference/theme.json`). Docs, developers, learn and enablement pages have a sun/moon "Toggle
  theme" icon button; it flips the body from rgb(8,9,10) to rgb(255,255,255)
  (`reference/screenshots/p2-desktop-toggled.png`, `p7-desktop-toggled.png`, `p10-desktop-toggled.png`).
- **What changes in light:** page #FFFFFF, sidebar/cards #FAFAFA, code #F9F8F9, borders #EEEEEE/#E9E8EA,
  text #282A30 / #3C4149 / #6F6E77, inverse CTA becomes a dark pill, focus stays indigo, product screenshots
  stay dark. Radii, type and spacing do not change.
- **Appearance recommendation: both, dark default.** Evidence for dark-first: 83% of painted area is #08090A,
  all marketing/product/pricing/customer/changelog pages are dark with no switch. Evidence that light is real
  but thin: it exists on 19% of surveyed pages, exactly the dense documentation screens (sidebars, tables,
  code, cards) the template must serve — so a light mode is grounded for product screens. Its versions of the
  stage, blueprint and dot glyph are **derived** (values in Color, marked). If the user prefers a
  single-appearance system, dark-only is the faithful choice; light-only would contradict the evidence.

Key colors to judge:

| | Page | Panel | Raised | Border | Text | Body | Secondary | Accent | CTA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dark (observed) | #08090A | #0F1011 | #1C1C1F | rgba(255,255,255,.08) | #F7F8F8 | #D0D6E0 | #8A8F98 | #5E6AD2 | #E5E5E6 |
| Light (docs observed; stage/blueprint derived) | #FFFFFF | #FAFAFA | #F9F8F9 | #E9E8EA | #282A30 | #3C4149 | #6F6E77 | #5E6AD2 | #282A30 |

## Writing style

- Sentence case for headings, nav and buttons ("Get started", "Contact sales", "Log in"); UPPERCASE only in
  mono labels.
- Short declaratives with product verbs (plan, build, ship, review); few adjectives; no exclamation marks,
  no emoji. Display headlines split into two short lines, often full sentences ending in a period;
  two-sentence closers. Descriptions 2–3 lines (≈20–30 words). Links say what they open and end in "→" or "+".
  Precise numbers ("2.0x", "0.10s"). Mono dates in strips. Em dashes in descriptions.

## Coverage

| Area | Status | Note |
| --- | --- | --- |
| color | observed | styles.json histograms + toggled docs pixels |
| typography | observed | inventory.json roles; Inter 95%, proprietary mono 4% |
| spacing | observed | spacing histogram; section gaps measured |
| layout-grid | observed | structure.json 1344 / 1160 |
| section-patterns | observed | openers, stages, hairline grids, timelines, closers |
| shape | observed | pill 43%, 8px 19% |
| borders | observed | 1px white-alpha hairlines; 0.5px drawings |
| elevation | observed | ring + inset highlight; few soft drops |
| surfaces-and-backgrounds | observed | grey ladder, local stage light, dot fields |
| buttons | observed | button variants + interactions |
| links | observed | underline-color hover; arrow/plus links |
| navigation | observed | blurred fixed header, docs sidebar, breadcrumb, TOC |
| forms | observed | inputs 14% (search, composer, settings mock); full form anatomy, validation, errors **derived** (form pages 4%, not deep-captured) |
| cards | observed | 70% card grids |
| disclosure | observed | 34%; 180ms slide |
| tabs | observed | docs tabs + segmented pills |
| tables-and-data | observed | pricing table, docs tables, mocks, chart |
| feedback | derived | only pulse dot, status glyphs, diff tints seen; toasts/banners/inline errors derived |
| overlays | derived | menus seen in mocks; dialogs/sheets derived |
| iconography | observed | 95%; 16px fills + status rings |
| illustration | observed | isometric hairline blueprints, generative thumbnails |
| media | observed | product images/video, canvas dot field |
| motion-load | observed | hero link fade, chat turns |
| motion-scroll | observed | stack settle, chart dots, blueprint lift |
| motion-hover-and-press | observed | 100–160ms tints, scale 0.971 |
| motion-loop | observed | dot matrix, shimmer, sweeps, dashes, caret, pulse; marquee/rotate seen in survey only |
| theming | observed | toggle on docs family; fixed dark elsewhere |
| responsive | observed | mobile shots; 5 breakpoints |
| accessibility | observed | 1px indigo focus ring everywhere, reduced-motion gating; #62666D on #08090A ≈3.4:1 — meta only |
| writing-style | observed | sentence case, mono captions |

## What the reference does not show

All **derived** from the character (hairlines, grey ladder, one indigo, status glyphs, dot vocabulary):

- **Form fields:** h32 (dense) / h36 (default) inputs, bg #141516 (dark) / #FFFFFF with #E9E8EA border
  (light), 1px border.subtle, 6px radius (pills only for search), 13–14px text, label 13px/510 text.body above
  with 6px gap, helper 12px text.secondary. Focus: border #5E6AD2 + the 1px ring offset 2px. Error: border
  #EB5757, 12px helper in #EB5757 with a 12px status glyph; no red fill. Disabled: opacity 0.5, no hover.
- **Checkbox/radio/switch:** 14px box, 4px radius (circle for radio), border #34343A, checked fill #5E6AD2
  with white 1.5px check; switch 28×16 pill, on = indigo (seen in mocks).
- **Select / combobox / menu:** trigger like a secondary button with chevron; menu = popover spec in
  Components.
- **Dialog:** raised panel #0F1011, 12px radius, ring + popover shadow, 24px padding, title 20px/590, footer
  right-aligned pills (inverse primary + ghost); scrim rgba(8,9,10,0.7) with blur(4px); enter 160ms quad-out
  opacity + scale 0.98 → 1.
- **Toast:** bottom-right, #1C1C1F, 8px, ring, 13px text, leading 16px status glyph or dot-matrix while in
  progress; 300ms fade.
- **Banners / inline alerts:** full-width hairline box, 6px status dot + 13px text, tint at 7% of the status
  hue max.
- **Dense data table:** rows 32px (compact) / 40px, header 12px mono uppercase text.tertiary, hairline row
  dividers rgba(255,255,255,0.05), no zebra, hover row rgba(255,255,255,0.02), selected row
  rgba(94,106,210,0.12) with a 2px indigo left bar; numbers tabular.
- **Empty / error / loading states:** combine signatures 2, 3 and 5 as in their application maps.
- **Pagination, steppers, avatars stack, tooltips:** tooltip #1C1C1F, 6px, 12px text, 100ms fade, no arrow.

## Must not carry over

- **Names:** Linear, linear.app, Linear Pulse, Linear Method, Linear Asks, Linear Insights, and product names
  seen on the site (Agent, MCP, Diffs, Triage Intelligence, Cycles, Initiatives as branded features). The
  template name and prose must not use the word at all.
- **Logo and marks:** the circle cut by parallel diagonal stripes, and any glyph built from parallel diagonal
  lines in a circle/rounded square.
- **Third-party marks:** all customer/partner logos (OpenAI, Vercel, Salesforce, Figma, Cursor, Coinbase,
  Ramp, Oscar, Brex, Opendoor, Automattic, Cars24, Scale, Boom, Dandelion Chocolate, Sierra, Anthropic/Claude,
  ChatGPT, GitHub, GitLab, Slack…) and their brand colors on quote cards (lime #E4F222 etc.).
- **Fonts:** Berkeley Mono (commercial) → **Geist Mono** (OFL; alt JetBrains Mono). Inter is OFL and may stay;
  do not name the Apple display face from the fallback chain.
- **Artwork:** the specific isometric drawings (striped disc on a slab, the octocat slab pair, cube cluster,
  fin comb), news thumbnails, the chip-field hero video, the legacy gradient app icon — describe the style,
  never trace.
- **Copy and mock content:** headlines, taglines, issue IDs (ENG-/DRV-/MWT-), people's names, code samples.
- **The third-party invite page (p4)** in full.

## Proposed template

**Name:** Graphite Blueprint (alternatives: Night Instrument, Hairline Console).

**Tags:** tone `technical`; corners `tight` (8px panels, pill controls); density `regular` (airy frame, dense
content); appearance `["dark", "light"]` with dark default (light partly derived); keywords: near-black,
hairline, spotlit stage, dot-matrix, isometric, mono captions, quiet precision.

**Ten defining rules:**

1. The ground is #08090A on dark (#FFFFFF on light) under at least 80% of every screen; depth comes from five
   grey steps (#0F1011 → #28282C), never from color.
2. Text has four steps — #F7F8F8 headings, #D0D6E0 body, #8A8F98 meta, #62666D tertiary; body is never pure
   white and tertiary is never used for essential content.
3. One indigo (#5E6AD2) for focus rings, selection and switches only, ≤ 3 uses per screen; the primary CTA is
   the inverse pill; status hues live only in 16px glyphs, 6px dots and chart marks.
4. Every edge is a hairline — 1px white-alpha 0.05/0.08 (0.5px in drawings); elevation is a ring plus a 1px
   top inner highlight, never a shadow blurrier than 28px.
5. Controls are pills (9999px; h32, 13px/510); panels are 8px; nothing between is rounder than 16px; press
   always scales to 0.971 and focus is always a 1px indigo ring offset 2px.
6. Headings use the sans at 510–590 with -0.022em tracking, sentence case, broken into ≤ 2 short lines; body
   15/24 at -0.011em; mono (12px uppercase) only for captions, numbers, dates and code.
7. Show the product: the main image of any screen is real UI on a spotlit stage that fades into the ground —
   one lit stage per viewport, never stock imagery.
8. Machine states speak in the 5×5 dot matrix and the shimmer — frame-stepped `steps(1)` loops, never spinners
   — and only while something is really in progress.
9. Explanations are drawn as isometric 0.5px hairline blueprints with "FIG 0.n" mono captions and marching
   dashes; no fills, no characters, one status point at most.
10. Sections open with a hairline and a split opener (headline left, 24px description right) or a two-tone
    statement; state changes take 100–160ms, entries 300–700ms, and every loop stops under reduced motion.
