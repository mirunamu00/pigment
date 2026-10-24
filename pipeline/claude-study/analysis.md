# claude-study — reference analysis

Reference: https://claude.com/ (69 pages surveyed, 16 captured in depth). No user notes; the concept below
was found from the evidence. Paths are relative to `pipeline/claude-study/`.

## Character

Near-black ink on warm cream paper, text-serif headlines in sentence case, a quiet sans for everything else,
and almost no color: an unhurried, editorial calm. Its voice comes from hand-drawn brush-ink pictograms —
hands, sprouts, tools, globes — that open nearly every section and play once at 12 fps, redrawn frame by
frame as if sketched in front of you (`reference/motion/p3-v1.png`, `reference/motion/p7-v1.png`). Product UI is
never shown bare; it sits on muted pastel stages with faint wandering lines, and everything settles with
long, soft-landing 750–1000 ms easing.

Keywords: warm paper, ink pictograms, cel animation, editorial serif, quiet accent, pastel stages, slow settle, hand motif.

What you would lose by changing one thing: swap the 12 fps hand-drawn pictograms for clean vector icons and
the site becomes a generic beige SaaS page — the drawings are the only place personality lives; every other
layer is deliberately silent so they can speak.

## Site survey

- 69 of 2,637 known pages surveyed (robots respected, 3,917 sitemap URLs); stopped at saturation — last new
  feature on page 18 (`reference/capture-report.md`). The home URL redirected to the product's login page
  (`reference/screenshots/p1-desktop-light.png`), so the home capture shows a login + plans + FAQ page.
- Page types: product, platform/API, pricing, marketplace hub + directory, solutions, customers, resources,
  blog, docs, community/events, download, forms (contact sales), partners/programs, single landing pages.
- Site-wide (≥80%): icons 96%, sticky header 94%, **illustrations 94%**, dialog 93% (mostly the third-party
  cookie banner — noise), card grids 91%, transitions 91%, logo walls 87%, CSS animation 86%, **scroll
  reveals 86%**, current-page marker 81%.
- Common: badges 68%, **Lottie 59%**, breadcrumb/sub-nav 55%, disclosures 54%, inputs 48%.
- Occasional: carousel 32%, forms 30%, quotes 29%, video 28%, banded sections 26%, tabs 25%, large images 22%.
- One-offs: loops 7%, theme toggle 7% (inside product demos), code block 6%, svg motion 6%, canvas 4%,
  choice 4%, table 3%, marquee 3%, rotate 1%, draw-on 1%.

## Signature elements

Candidates found, ranked by distinctiveness × reach: (1) cel-animated brush-ink pictograms (94%/59%,
heros + every section opener — no default UI has this); (2) pastel stages with tone-on-tone wandering lines
behind product UI (every product surface); (3) serif headlines that fade in word by word on warm paper
(86% reveals); (4) hand-timed stepped status glyphs / breathing dots / carets (few, but the only loops and the
model for "working" states); (5) ink-and-paper ring controls with clay focus (60+ pages; less unique alone).
Rejected as signature: logo walls (generic, third-party marks), cookie dialog (third-party), tile flip in the
marketplace hero (1 page), numbered feature trios (nice but common).

### 1. Cel-drawn ink pictograms

- **What:** brush-weight ink (#141413) drawings built as *filled outlines* (no strokes, no trim paths) with
  uneven, marker-like weight and wobbly joins, plus exactly one flat fill — sand #e3dacc / stone #dedcd1, or clay
  #d97757 at hero scale. Every Lottie is 1200×1200, 12 fps, 100% frame-by-frame (each precomp layer shows for one
  frame), 1.3–9.8 s, two fill colors (`reference/motion.json` → `lottieFiles`; raw structure:
  `comp_mark` with `Mark_000…` layers each `ip n → op n+1`). Sizes: 96 px section openers, 64 px in cards,
  416–432 px heros.
- **Evidence:** `reference/motion/p3-v1.png` (sprout grows from a mound), `reference/motion/p6-v1.png` (blocks drop and a
  hand places one), `reference/motion/p7-v1.png` (hand catches a dot that becomes a clay globe),
  `reference/illustrations/p10-i5.png`, `reference/illustrations/p3-i2.png`, all 130 crops in `reference/illustrations/`.
- **Frequency:** illustrations on 94% of pages, Lottie on 59%; 4–12 per content page (p3 and p6: 11 each).
- **Recipe:** 1200 artboard; ink layer = closed filled paths tracing a 28–40-unit marker line (≈2.5 px at 96 px)
  with ±25% thickness variation, blunt rounded ends, slight overshoot at joins; fill layer under it, one flat
  shape slightly off-register. Subject = one everyday object, often with a simple noodle-fingered hand holding,
  placing or pointing. Animate as 12–48 separate hand-redrawn drawings (one `<g>` per frame, or one Lottie
  precomp per frame) stepped with `steps(N, jump-none)` at 83 ms/frame; order: first contour → object → fill →
  2–4 "boil" settle frames; start via IntersectionObserver at 30%; play once and hold. Dark: ink → #faf9f5,
  sand → #5e5d59, clay unchanged (`reference/screenshots/p6-desktop-dark.png`). Draw new subjects; never trace.
- **Motion:** in-view, once; discrete frames, no tween; reduced motion = final frame.
- **Application map:** section opener (96 px over every h2) · hero (416 px, the only clay fill) · dashboard
  (40–48 px static in title row/welcome card) · settings (48 px per group) · empty state (96–128 px, plays once) ·
  error/404 (hand searching/dropping) · loading (loop last 4 boil frames) · onboarding step headers (64 px) ·
  pricing cards (motif grows by tier) · FAQ (question-mark opener).
- **Limits:** one per section, ≤1 large piece per screen, ≤1 clay-filled per page; never in tables, fields,
  buttons or dense rows; no scattering.

### 2. Pastel stage with wandering lines

- **What:** product UI on a 24–32 px radius panel in cactus #bcd1ca, heather #cbcadb, peach #ebc9b7, sky
  #6a9bcc or clay, with 3–6 faint tone-on-tone freehand lines (lighter than the panel, ~6–10 px) running off
  the edges; sometimes 2–3 stacked trays in different pastels; white UI on top with 0 4px 24px 5% shadow.
- **Evidence:** `reference/motion/p10-v4.png` (cactus stage), `reference/motion/p2-m1.png` (heather→peach trays in a demo),
  `reference/screenshots/p2-desktop-light.png` (sage stage with peach/heather trays), `reference/screenshots/p3-desktop-dark.png` (clay/sand/sky cards).
- **Frequency:** every product surface on p2, p3, p8, p9, p10, p14 (`IllustratedBackground`/`MediaStage` targets in `motion.json`).
- **Recipe:** container radius 24 (32 hero), one pastel ground, overflow hidden, 48–64 px padding; absolutely
  positioned SVG with smooth freehand open paths, `stroke: color-mix(in srgb, var(--stage) 70%, white)`,
  width 6–10, round caps, opacity .6; content cards above with the raised shadow; optional tray layers 12–24 px
  above at 90% width in a second pastel; rotate pastels down the page.
- **Motion:** rises with block reveal (20 px, 750 ms power2-out); demo trays slide on step change; lines static.
- **Application map:** hero showcase · onboarding previews · one dashboard highlight card · empty state with
  ghosted skeleton · integration detail · article feature image · upgrade dialog header · error page.
- **Limits:** ≤1 per viewport on dense screens; never behind text or fields; never the page background; no gradients.

### 3. Serif headline that writes itself in

- **What:** text serif headings (400 hero / 500 section, line-height 1.1–1.2, sentence case, no period),
  revealed word by word: opacity 0 → 1, 1000 ms `cubic-bezier(0.25,1,0.5,1)`, ~29–40 ms stagger per word; lede and
  blocks rise 10–20 px over 750 ms.
- **Evidence:** `reference/motion.json` → `reveals` (delays 0.0286 s, 0.0571 s … on `AnimatedHeading` spans),
  `reference/screenshots/p7-desktop-light.png`, `reference/screenshots/p6-desktop-light.png`, header entrance `reference/motion/p1-m1.png`.
- **Frequency:** reveals on 86% of pages; serif headings on every page.
- **Recipe:** Source Serif 4 at 72/64/52/36/25/19 px; max 30ch, `text-wrap: balance`; split into word spans
  (aria-label on the heading); `.w{opacity:0;transition:opacity 1000ms cubic-bezier(.25,1,.5,1) calc(var(--i)*35ms)}`.
  Underlined serif words may act as inline selectors inside a sentence heading (`reference/screenshots/p2-desktop-light.png`).
- **Motion:** in-view once; reduced motion = instant.
- **Application map:** page title · section h2s · dashboard greeting (one) · settings group titles (static) ·
  empty-state title · dialog title (static) · table group headers (static) · plan names.
- **Limits:** word fade only on h1/h2 and empty-state titles; never body, numbers or tables; never bold or caps.

### 4. Hand-timed status glyphs

- **What:** "working" shown with stepped, hand-made loops: a 16 px clay glyph cycling 84 drawn poses
  (`steps(84, jump-none)`, 5040 ms), a breathing dot (opacity .3→1→.3, 1200 ms ease-in-out), a `steps(1)` caret (1000–1100 ms).
- **Evidence:** `reference/motion/p3-m1.png`, `reference/motion/p3-m2.png`, `reference/motion/p2-m1.png`.
- **Frequency:** loops on 7% of pages, all inside product demos — the only loops on the site.
- **Recipe:** design an original glyph (not a star burst — that is the brand mark), sprite of 24–84 poses, overflow
  hidden, translate with steps(); 6 px muted dot breathing; 1 px ink caret; pair glyph with a 12–15 px muted gerund label.
- **Motion:** infinite while the state lasts, snaps to a static check when done; reduced motion = static pose.
- **Application map:** loading labels · running jobs in dashboards · empty prompt/command inputs · table status
  column · background-task toast · assistant/chat panel.
- **Limits:** one glyph per screen; never decorative.

### 5. Ink-and-paper ring controls

- **What:** ink #141413 primary buttons and paper buttons with a 1 px #d1cfc5 ring drawn as box-shadow; hover
  thickens the ring to 2 px (primary: `0 0 0 2px #141413`) and muted text turns ink; focus = 2 px solid #c46849
  outline, 2–4 px offset everywhere.
- **Evidence:** `reference/interactions/p1-button-8.png`, `reference/interactions/p1-button-7.png`,
  `reference/components/p3-button-variants.png`, `reference/survey.json` → `buttonStyles`.
- **Frequency:** ink and paper styles on 58–64 of 69 pages; clay focus on every captured control.
- **Recipe/motion/limits:** see Components and Interaction; color 100 ms, ring 200 ms ease-in-out; press scale .985;
  no pastel-filled buttons; clay fill only for a prompt's send square.
- **Application map:** forms · settings save bar · table row actions · dashboard filter chips · dialogs · header CTAs.

## Color

| Role | Hex | Evidence |
| --- | --- | --- |
| Paper (page) | #faf9f5 | `--color-gray-050`, 34.9% area |
| Paper-2 / hover | #f5f4ed | `--theme-background-secondary` |
| Band | #f0eee6 | `--theme-background-tertiary` |
| Raised (cards, white sections) | #ffffff | 7.2% area |
| Ink | #141413 | `--theme-foreground-primary`, primary button |
| Ink secondary | #30302e | nav text |
| Muted | #5e5d59 | 15.9% text |
| Subtle | #87867f | meta, footer links |
| Hairline | #e8e6dc · ring #d1cfc5 · strong #b0aea5 | border tokens |
| Stone button | #e8e6dc | `--theme-button-secondary-bg` |
| Pictogram fill | #e3dacc (sand), #dedcd1 (stone) | Lottie fills |
| Accent clay | #d97757 · interactive #c6613f · focus #c46849 | `--color-clay*`, focus |
| Stage pastels | cactus #bcd1ca, heather #cbcadb, peach #ebc9b7, sky #6a9bcc | `--color-*` |
| Deep pastels (avatars) | mineral #629987, plum #827dbd | inverse brand tokens |
| Error | #bf4d43 | `--color-error` |
| Dark | bg #141413, raised #1f1e1d / #262624, border #30302e, text #faf9f5, muted #b0aea5 | dark captures |

Accent per screen: clay is ~0.1% of painted area (`styles.json` backgroundArea 0.09%) — focus rings, one send
square, one hero pictogram fill. Pastels only as stages and initials avatars. Surfaces stack paper → band/paper-2
→ white card with 1 px hairline. The area histogram shows 45% #141413 because dark captures are counted;
light pages are paper-dominant with an ink footer and closing band.

## Typography

| Role | Observed | Substitute (OFL) |
| --- | --- | --- |
| Display/headings | anthropicSerif (proprietary text serif) | Source Serif 4 (display opsz); alt Newsreader |
| UI/body | anthropicSans (proprietary humanist-geometric) | Instrument Sans; alt Hanken Grotesk |
| Code | anthropicMono | JetBrains Mono |

Scale (`styles.json` cssVariables, `inventory.json` typography): display 72/1.1/400 · h1 64/1.1/400 · section h2
52/1.2/500 · h3 36/1.3 · plan names 32/1.1 · feature titles 25/1.2/500 · small serif titles and FAQ questions
19/1.2/500 · lede 23/1.5 · body-1 20/1.6 · body-2 17/1.6 (most used, 35%) · UI 15/1.6 · caption 12/1.6 +0.12 px ·
micro 10 px uppercase for table heads. Weights: 400 (88%), 500 (11%); nothing bold. Tracking normal. Measures:
headline 30ch, body 60ch. Serif for headings, plan names, quotes, FAQ questions, table group heads, avatar
initials; sans for everything functional; mono for commands.

## Spacing and layout

Base 4 px; scale 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128, 192 (`--sp-*`). Section spacing 96
(main) / 128 (lg); hero top 192. Container 1440 max, 1312 content, margins clamp 32→64, 12-col grid, 16 px
gutter, gaps 16/24/32/48. Density airy. Breakpoints 568 / 834 / 992 / 1200 / 1600 px. Header fixed 84 px + 45 px
sub-nav; unchanged on scroll (`reference/structure.json`). Mobile: single column, hamburger, pictogram above the
headline (`reference/screenshots/p15-mobile-light.png`).

## Section and UI patterns

- **Section opener** — centered 96 px pictogram, serif h2 52 px, 23 px muted lede, one CTA; 4–12 per page.
- **Split hero** — eyebrow, 64–72 px serif, lede, ink + secondary buttons; right: 416–432 px pictogram or stage.
- **Pastel stage** — product UI on a pastel panel with wandering lines (signature 2).
- **Numbered feature trio** — hairline-topped columns, "01/02/03", 19 px serif title, muted body (p2).
- **Logo wall** — 87% of pages; small serif label over a 4-col grid of customer marks.
- **Plan/model card row** — white 16 px cards with 64 px pictogram, serif name, ink full-width button, checklist.
- **FAQ** — question-mark pictogram, serif heading, 660 px hairline list with "+".
- **Quote** — 16 px-radius photo + 32 px serif pull quote with hanging quote mark; arrow buttons (carousel 32%).
- **Banded sections** — paper / white / band with hairline seams (26% explicit).
- **Ink close** — #141413 CTA band and a 4–5 column dark footer with a prompt-style input.

## Shape, borders and depth

Radii: 4 badges · 6 chips · 8 buttons/inputs (34% of radii) · 12 tab tracks/small cards · 16 cards (15%) ·
24 stages/dialog (10%) · 32 hero stages · full for avatars/dots. Borders 1 px (79%) in #e8e6dc / #d1cfc5, drawn as
box-shadow rings so hover can thicken to 2 px without layout shift. Elevation by tone and rings, not shadow:
card hover 0 4px 20px rgba(0,0,0,.04); floating fragments 0 4px 24px rgba(0,0,0,.05); overlays 0 12px 32px rgba(0,0,0,.16).

## Surfaces and backgrounds

Paper #faf9f5 ground; white sections and cards; band #f0eee6 for alternating sections and tab tracks; ink
#141413 for closing band and footer (and `.theme-dark` sections in light mode). No gradients, textures or
noise; the only "texture" is the hand-drawn line work on pastel stages. Photos are small, warm, candid, 16 px
radius; videos are muted autoplay loops on stages (`reference/motion.json` videos).

## Components

- **Buttons:** ink primary (8 px, 8×16, 15–17 px/500); secondary paper with 1 px ring; tertiary stone #e8e6dc;
  clay send square (prompt inputs only); ghost on dark; paper inverse on dark; small 12 px stone chips
  (`reference/components/p3-button-variants.png`).
- **Header + sub-nav:** wordmark, hover dropdowns with flipping chevron, ring + ink CTAs; 45 px sub-nav with
  breadcrumb label left and "explore" menu or section tabs right, current item in ink (`reference/screenshots/p4-desktop-light.png`).
- **Cards:** white, 16 px, 1 px hairline, 32 px padding; pictogram top-left in plan cards.
- **Segmented tabs:** #f0eee6 track, white selected pill with small icon (`reference/interactions/p5-tab-4.png`).
- **FAQ disclosure:** hairline rows, serif question, "+".
- **Inputs:** white, 1 px hairline, 8–12 px radius, 16 px search icon; dark prompt input with clay send.
- **Tables:** 53 px rows, hairlines, filled ink check-circle vs thin muted ×, 4 px outlined limit badge, serif
  group headers with collapse dash (`reference/screenshots/p5-desktop-light.png`); event list with 10 px uppercase heads and
  40 px pastel initials tiles in serif (`reference/screenshots/p7-desktop-light.png`).
- **Badges:** 4 px radius, 12 px, stone or outline.
- **Code/install field:** mono command, clay keyword, copy icon; terminal frames #141413 with three dots.
- **Footer:** dark, 12 px #87867f link columns, mobile groups as 12 px-radius rows.

## Interaction

| Element | Hover | Focus-visible | Press / open |
| --- | --- | --- | --- |
| Ink primary | ring 0→2 px ink, 200 ms ease-in-out | 2 px #c46849, offset 4 | ring held |
| Secondary ring | text #5e5d59→#141413 (100 ms), ring 1→2 px | clay, offset 4 | same |
| Paper chip | bg → #f5f4ed | clay, offset 2 | scale .985, 100 ms |
| Ghost on dark | bg → #262624 | clay | — |
| Nav dropdown | color → ink 500 ms expo-out, chevron 180°, menu opens | clay, offset 2 | menu fades 180 ms |
| Nav / text link | underline appears; footer #87867f → #faf9f5 | clay, offset 2 | — |
| Card | 0 4px 20px 4% shadow, or transparent → white + hairline | clay | — |
| Tab | #4d4c48 → ink | (not focusable in capture; derived clay) | pill slides 250 ms; cards raise 16 px / 400 ms |
| FAQ | none | clay | answer settles 250 ms quart-out |
| Input | none | outline, offset 2 | — |

Evidence: `reference/interactions/p1-button-8.png`, `p1-button-7.png`, `p1-button-9.png`, `p2-button-6.png`,
`p4-card-15.png`, `p1-tab-3.png`, `p1-disclosure-1.png`, `p1-input-15.png`, diffs in `reference/interactions.json`.

## Motion

| Pattern | Trigger | From → to | Duration / easing |
| --- | --- | --- | --- |
| Header slide | load | translateY −20 px, 0 → 0, 1 | 1000 ms power2-out (`reference/motion/p1-m1.png`) |
| Heading word fade | scroll | each word 0 → 1, ~35 ms stagger | 1000 ms power2-out |
| Block rise | scroll | 0 → 1, translateY 10/20 → 0, stagger 100 ms | 750 ms power2-out |
| Cel pictogram | scroll | blank → drawn, discrete frames | 12 fps, 1.3–9.8 s, once |
| Connector draw | scroll | stroke-dashoffset 1 → 0 | 900 ms ease (`reference/motion/p2-v3.png`) |
| Tile flip cycle | loop | rotateX −58° / 32% / .9 → 0 → 58° / −32% / 1.04 | 700 ms quart-out (`reference/motion/p4-m2.png`) |
| Card raise | state change | translateY 16, 0 → 0, 1 | 400 ms power2-out (`reference/motion/p3-m5.png`) |
| Caret | loop | opacity 1/0 | 1000–1100 ms steps(1) |
| Breathing dot | loop | .3 → 1 → .3 | 1200 ms ease-in-out |
| Stepped glyph | loop | sprite 0 → −98.8% | 5040 ms steps(84) |
| Control hover | hover | color, ring | 100 / 200 ms ease-in-out |
| Disclosure | open | opacity + transform | 180–250 ms quart-out |

Duration scale: 100, 160, 200, 250, 300, 400, 500, 700, 750, 900, 1000, 1200 ms. Easings: power2-out
`cubic-bezier(0.25,1,0.5,1)` (default), quart-out `(0.165,0.84,0.44,1)`, expo-out `(0.19,1,0.22,1)`, ease-in-out
for hovers, steps() for hand-made loops. Reduced motion (reference): global 0.01 ms durations, 1 iteration,
page-transition overlay hidden. Template: same, pictograms show the final frame, carets steady.

## Illustration, icons and media

- **Illustration:** see signature 1 — brush-ink filled outlines, uneven weight, wobble, one flat fill (sand/stone;
  clay only at hero scale), single object (often with a hand) centered on empty paper at ~60% of the box,
  12 fps cel animation. The static SVG fallbacks keep the same two-layer construction (`reference/raw/svg/p14-i2.svg`:
  3 paths, ink #141413 + paper/fill). One tweened 60 fps Lottie (p15, thin 2 px strokes) is the exception.
- **Icons:** 782 icons; 20 px (327) and 16 px (261) thin glyphs rendered as fills, single color; 16 px filled
  ink check-circles in lists; app icons 24–32 px on 8 px tiles (`reference/icons/p3-icons.png`).
- **Media:** muted looping autoplay videos and screenshots on pastel stages; small warm candid photos at 16 px
  radius; one canvas photo tile mosaic in a hero (`reference/motion/p2-v2.png`).

## Theming

prefers-color-scheme (3–23 rules per page), no site toggle (`reference/theme.json`). Per-section themes via
`.theme-main/.theme-accent/.theme-neutral/.theme-dark` and `[data-theme]`, each remapping the same 53
variables. Dark: ground #141413, raised #1f1e1d/#262624, borders #30302e, text #faf9f5, muted #b0aea5;
primary inverts to paper; pictogram ink becomes paper, sand fill becomes warm gray, clay stays
(`reference/screenshots/p6-desktop-dark.png`, `reference/screenshots/p1-desktop-dark.png`).

## Writing style

Sentence case everywhere; headings 3–7 words, plain claims or invitations, no trailing period; ledes one or two
calm sentences; buttons verb-first, 2–3 words; "01/02/03" labels on feature trios; no exclamation marks, no
hype punctuation. Style only — no copy carries over.

## Coverage

| Area | Status | Note |
| --- | --- | --- |
| color | observed | full token set |
| typography | observed | 3 families, full scale |
| spacing | observed | 4 px tokens |
| layout-grid | observed | 12-col, 1312 px |
| section-patterns | observed | 10 patterns |
| shape | observed | radius tokens |
| borders | observed | rings |
| elevation | observed | rings + soft shadows |
| surfaces-and-backgrounds | observed | banding, stages |
| buttons | observed | 6 variants |
| links | observed | underline, footer |
| navigation | observed | header, sub-nav, footer |
| forms | observed | inputs, contact form; validation derived |
| cards | observed | 91% |
| disclosure | observed | FAQ, menus |
| tabs | observed | segmented |
| tables-and-data | observed | comparison + events table; dashboards derived |
| feedback | derived | no toasts/alerts on site |
| overlays | observed | search dialog, menus; modal layout derived |
| iconography | observed | 16/20 px glyphs |
| illustration | observed | cel pictograms |
| media | observed | Lottie, video, canvas, images |
| motion-load | observed | header slide |
| motion-scroll | observed | word fade, rise, pictograms, draw-on |
| motion-hover-and-press | observed | ring, scale |
| motion-loop | observed | glyph, dot, caret, tile flip, marquee |
| theming | observed | prefers-color-scheme + section themes |
| responsive | observed | mobile captures |
| accessibility | observed | clay focus, reduced motion |
| writing-style | observed | sentence case |

## What the reference does not show

All derived from the character, flagged as derived:

- **Form validation:** error text 13 px #bf4d43 under the field, field ring turns #bf4d43 (1 → 2 px on focus),
  no red fills; success = small ink check-circle, never green floods.
- **Toasts/alerts:** white card, 12 px radius, 1 px hairline, overlay shadow, 15 px sans, optional 24 px static
  pictogram; enters with 20 px rise over 400 ms power2-out; error variant uses an #bf4d43 left 2 px rule.
- **Dense tables/dashboards:** 44 px rows at 14–15 px, hairline dividers, serif only for group headers, numbers
  in sans tabular-nums; status via breathing dot / check-circle; charts in ink with one pastel series highlight
  (cactus) and stone for the rest, no gridline color.
- **Empty states:** 96–128 px pictogram (plays once) + serif one-liner + muted line + ink button, centered,
  optionally on a small heather stage.
- **Errors/404:** pictogram of a hand searching or a dropped object, serif title, secondary + primary actions.
- **Loading:** stepped glyph + gerund label; skeletons in #f0eee6 with no shimmer (or a slow 1200 ms opacity breathe).
- **Modals:** 24 px radius, white, overlay shadow, scrim rgba(20,20,19,.4), serif 25 px title, ink confirm + ring cancel; fade + 8 px rise 250 ms quart-out.
- **Checkbox/radio/switch:** ink when on, white with 1 px ring when off (switch track #f0eee6 per `--theme-switch-bg`).

## Must not carry over

- Names: Claude, Anthropic, Opus, Sonnet, Haiku, Fable, Claude Code — not in copy, tokens, class names or the template name.
- The radiating spark/asterisk logomark (and its stepped spin), the serif wordmark, the footer lettermark.
- Every pictogram, Lottie and SVG artwork (sprout, toolbox, hands with blocks/globe, plant tiers, gauge, etc.) — learn the style, draw new subjects.
- Proprietary fonts anthropicSans / anthropicSerif / anthropicMono → Instrument Sans / Source Serif 4 / JetBrains Mono (OFL).
- Palette token names (clay, cactus, heather, peach, plum, mineral) — rename by role.
- Customer logos, quotes, photos, product screenshots, videos and all copy; the cookie banner (third-party noise).

## Proposed template

**Name:** Inkleaf

**Tags:** tone editorial · corners soft · density airy · appearance light, dark · keywords: warm paper, ink
pictograms, cel animation, editorial serif, quiet accent, pastel stages.

**Ten defining rules**

1. The ground is warm paper (#faf9f5) and text is warm ink (#141413); white is only for raised cards and alternate bands.
2. Color is a whisper: one warm clay accent for focus rings, a prompt's send square and at most one hero drawing fill — never on headers, links or main buttons.
3. Headings are a text serif at 400–500, sentence case, 1.1–1.2 leading; everything functional is a quiet sans at 15–17 px.
4. Every section opens with a centered 96 px hand-drawn pictogram above its serif heading (64 px in cards, 40–48 px in dense screens).
5. Pictograms are brush-ink filled outlines with uneven weight and one flat fill, redrawn frame by frame at 12 fps when they enter view, played once, then held.
6. Product UI is always staged on a soft pastel panel (24–32 px radius) with faint tone-on-tone wandering lines.
7. Motion settles slowly: 750–1000 ms `cubic-bezier(0.25,1,0.5,1)`, 10–20 px rises, headings fade in word by word; nothing bounces.
8. Depth comes from 1 px warm rings and tonal banding; hover thickens a ring to 2 px; card hover is a 4% shadow at most.
9. Every focusable element shows a 2 px clay outline with 2–4 px offset; "working" is a stepped hand-drawn glyph, a breathing dot or a caret — never a spinner.
10. Leave room: 96–128 px between sections, 1312 px content, 60ch text, hairline-separated lists and numbered trios.
