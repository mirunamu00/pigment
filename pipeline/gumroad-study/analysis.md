# gumroad-study

Reference: https://gumroad.com/, captured 2026-10-19, 84 pages surveyed, 16 captured in depth (desktop 1440, mobile 390, light and dark). Paths below are under `pipeline/gumroad-study/reference/`. `S:` = `styles.json`, `shot:` = `screenshots/`. Noise excluded: seller product covers and listing text on marketplace pages (third-party content), the GitHub star badge counts.

## Character

A flat, black-outlined, bubblegum-pink maker's marketplace: every control is a 1 px black rectangle with a 4 px corner that physically lifts off the page on hover, leaving a hard offset shadow behind it. Warm off-white paper, pure black ink and one hot pink carry the interface, while category pages flood their header with a single saturated color and the home hero floats big flat pink 3D coins. The voice is plain and confident, in one regular-weight geometric grotesk with slightly tight tracking; nothing is soft, blurred or gradient.

Keywords: hard-outline, offset-shadow, bubblegum-pink, flat-color, paper-and-ink, category-color-bands, sticker-illustration, regular-weight-grotesk. Tone tag: **playful**.

What you would lose by changing one thing: soften the shadow and the lift becomes generic hover polish; round the 4 px corners and it turns friendly-SaaS; make the pink a gradient or a pastel and the stickers and CTAs lose their loudness; bold the headings and the plain voice is gone.

## Site survey

84 of 531 known pages surveyed (robots respected, collections sampled); saturation at page 54 (`capture-report.md`). Page types: home, /discover, /blog, /pricing, /features, /about, /gumclaw, nine category roots (/3d, /design, /films, ...), their subcategories and item-level collections (/blog/*/*, /help/*/*, /3d/*/*).

- Site-wide: icons 99%, inputs 99%, forms 98%, logo/tag wall 94%, card grid 88%, choice, disclosure and tabs 83%, breadcrumb and current-page marker 82%.
- One-offs: large image 14%, animation 10%, loop 8%, Lottie 2%, marquee 2%, carousel 2%, banded sections 1% (/small-bets only).
- Captured in depth: p1 home, p3 /small-bets, p4 /discover, and category pages p2, p5-p16, which are one template with a different header color. Blog, help, pricing, features and about were surveyed but not captured, so their layout is not evidenced.

## Signature elements

Candidates, ranked by distinctiveness times reach: (1) hard-lift buttons with a solid offset shadow (every CTA); (2) flat pink black-outlined sticker and coin illustration with parallax (home hero, tag wall, mascot); (3) category color-flood header bands (about 75 pages); (4) outline-on-demand pill tabs and chips (83%). Rejected as signature: the carousel (2%), the marquee as a standalone (home only, but it carries the stickers in 2), the dark newsletter footer (generic), seller imagery (third party).

### 1. Hard-lift buttons

- **What:** flat fill, 1 px black border, 4 px radius. Hover: `translate -4px -4px` plus `box-shadow 4px 4px 0 0 #000` (hero CTA: -8px with a backing plate); press returns to 0; dark uses white at 25-35%. 150 ms `cubic-bezier(.4,0,.2,1)`.
- **Evidence:** `interactions/p9-button-4.png`, `interactions.json` (p2, p9, p1), `components/p2-button-variants.png`, `theme.json`.
- **Frequency:** CTAs on about 90% of pages (pink 79, black 73, outline 74).
- **Recipe:** border 1px ink; radius 4px; padding 12px 16px; `transition: transform, translate, box-shadow 150ms`; `:hover {translate:-4px -4px; box-shadow:4px 4px 0 0 var(--ink)}`; `:active {translate:0 0; box-shadow:none}`; hero CTA in a relative wrapper with an ink pseudo-plate; secondary buttons flip fill to accent on hover; dark shadow `rgba(255,255,255,.35)`.
- **Motion:** hover 150 ms out, press 150 ms back. Reduced motion: no translate or shadow, color/border change only.
- **Application map:** landing hero CTA (8 px plate); form submit and cancel; dashboard toolbar icon buttons (2 px); settings save row; data-table row actions (2 px, never whole rows); empty-state button; error page return button; whole-card lift in a grid.
- **Limits:** one lifted element per hover, no blur, never on inputs, table cells or sticky bars, keep 4 px clearance against clipping.

### 2. Flat pink sticker illustration

- **What:** flat shapes in pink and category colors, heavy black outline, extruded rim for 3D coins, no gradients; hero coins 200-250 px tilted and cropped; 25-32 px stickers in the tag wall.
- **Evidence:** `shot:p1-desktop-light.png`, `motion/p1-m2.png` (parallax), `motion/p1-m1.png` (marquee with stickers), `motion.json` lottieFiles (8 s, 24 fps, trim paths, strokes 3-15, caps round/square/butt), `shot:p3-desktop-light.png`.
- **Frequency:** home, about mascot, small-bets logo; tiny on others. Hero-level on 2-3 pages.
- **Recipe:** inline SVG; ellipse in accent with 2-3 px ink stroke; duplicate offset 12-16 px for the rim and join with two ink lines; one heavy glyph on the face; fills only from roles; parallax wrapper `translateY(0 -> -50%)` on scroll; mascot uses `stroke-dasharray` draw-on 8 s then fills fade.
- **Motion:** parallax linear, scroll bound; marquee 60 s linear infinite; Lottie draw-on 8 s.
- **Application map:** marketing hero, empty state, onboarding step, loading, error, dashboard tile, settings header, tag list.
- **Limits:** hero scale once per page and never behind data or forms; at most 5 large shapes; dense screens one 32-48 px sticker or none; reduced motion = static.

### 3. Category color-flood headers

- **What:** full-width header band in one saturated flat color (#23a094, #ffc900, #90a8ed, #f1f333, #dc341e) with a 1 px black rule, white search, pill tabs with a white current pill.
- **Evidence:** `shot:p9-desktop-light.png`, `shot:p2-desktop-light.png`, `structure.json` (headers p2, p5-p16).
- **Frequency:** 13 of 16 captured, about 75 of 84 surveyed. Parent and child share the color (p2 and p13 teal).
- **Recipe:** one role color per section, band padding 32px 64px, content 1312 px, white 48 px search, current pill white with ink border, title and chips below; color never on cards.
- **Motion:** static.
- **Application map:** dashboard workspaces, settings, wizard steps, data-table pages, empty states, error (red), detail pages, mobile collapsed band.
- **Limits:** one band color per screen, ink text only, not on card or body fills.

### 4. Outline-on-demand pill tabs and chips

- **What:** 9999 px radius pills, transparent border at rest, black 1 px border on hover, white fill when selected; black filled pill for the current page in the home header.
- **Evidence:** `shot:p4-desktop-light.png`, `interactions/p2-tab-2.png`, `motion/p1-m1.png`, `shot:p1-desktop-light.png`.
- **Frequency:** tabs 83%, current marker 82%.
- **Recipe:** `padding 8px 12px; border 1px solid transparent; radius 9999px`; `:hover` and `[aria-current]` border ink, selected background white.
- **Motion:** instant border change, no sliding indicator.
- **Application map:** primary nav, table filter bar, settings sub-nav, option choice, time-range selector, empty-state suggestions, status pill.
- **Limits:** navigation and tags only; never for primary actions; about 12 per row.

Compared with notes: none were given. Found beyond the obvious palette: the lift mechanics, the category color rule, and the sticker parallax.

## Color

| Role | Hex | Evidence |
| --- | --- | --- |
| Ink, borders, primary fill | #000000 | S: backgroundArea 26.4%, borderColor 49.8% |
| Paper ground | #f4f4f0 | backgroundArea 25.6% |
| White surface | #ffffff | 20.7% |
| Dark card | #242423 | 23.9% |
| Brand pink | #ff90e8 | 0.96% area, 79 pages' main button |
| Yellow, lime, teal, periwinkle, red | #ffc900, #f1f333, #23a094, #90a8ed, #dc341e | `structure.json` header backgrounds |
| Dark text, hairline | #dddddd | textColor 28.8% |
| Secondary text | 50% ink (#808080 flat) | textColor 6.5% |

Pink at most once as a button per viewport plus small tags. Category colors only on the header band. Surfaces stack paper, white card with 1 px ink border. Dark: #000 ground, #242423 cards, pink replaces black as primary fill, white hard shadows at 25-35%.

## Typography

ABC Favorit (proprietary, 400/700) -> DM Sans or Figtree (OFL). Weight 400 on 96% of text. Scale: 96/96, 72/72, 48/60, 30/36, 24/32, 20/28 (display -0.4px tracking), 16/22 body and buttons, 14/18.2 captions. Sentence case, no uppercase. Hero headline centered, paragraphs about 60 ch (20 px lead centered within 740 px on the hero).

## Spacing and layout

Base 4 px; scale 4, 8, 12, 16, 24, 32, 48, 64, 96 (S: spacing 8 px 29%, 16 px 28%, 12 px 19%, 4 px 16%). Content widths 1152 (home), 1280 (landing), 1312 (marketplace, 64 px side padding). 12-column grid; product grid 3 columns with 312 px filter column; 96 px section padding on banded landing. Breakpoints 40/48/64/80/96rem. Marketplace dense, marketing airy.

## Section and UI patterns

Hero with floating coins (home only); category color band header (about 75 pages); product card grid (88%); featured carousel with 1 / 8 counter (2%); tag wall marquee (home, tag wall feature 94%); full-bleed color bands (/small-bets only: white, pink, black/yellow halves, 96 px padding); dark newsletter footer (all marketplace pages). Evidence: `shot:p1-desktop-light.png`, `shot:p4-desktop-light.png`, `shot:p3-desktop-light.png`, `structure.json`.

## Shape, borders and depth

Radii: 4 px (57%) buttons and inputs; 9999 px (35%) pills; 8 px (7%) cards; 16 and 24 px panels. Borders 1 px solid black on 53% of boxes; dark uses rgba(221,221,221,.35) hairlines. No blurred shadows anywhere (S: shadow 100% none at rest); depth is border plus the hard 4 px offset on hover.

## Surfaces and backgrounds

Paper #f4f4f0 page, white cards, black footer and dark ground, #242423 dark cards, flat full-width color bands (category colors, pink, yellow). No textures, gradients or translucency. Seller covers sit square inside a 1 px border.

## Components

- Buttons: pink (0 24px padding), black (12px 16px), outline (transparent), pill tab, icon-in-square search button, arrow-only back button; all 4 px radius except pills. Evidence `components/p1-button-variants.png`, `components/p2-button-variants.png`.
- Links: underlined 50% black, darken to black on hover; nav links plain, current link a black filled pill.
- Navigation: 80 px white header with wordmark, outlined star badge, links, a hard vertical rule, Log in, full-height black Start selling block; marketplace band header with pill row and breadcrumb.
- Cards: white, 1 px ink border, 1:1 image, title, seller, pink arrow-shaped price tag, star rating.
- Inputs: 48 px, 1 px ink border, 4 px radius, 50% placeholder; focus pink 2 px ring.
- Disclosure: details rows divided by 1 px rules, chevron.
- Tabs: pill tabs; sort tabs.
- Breadcrumb: 82% of pages, text with chevrons.
- Tables: none observed; derived below.

## Interaction

- Button/CTA: hover translate -4 -4 and 4 4 0 shadow in 150 ms; press back to 0; focus native 1 px auto outline, offset 1 px.
- Link: 50% to 100% black; focus outline.
- Input: hover none; focus 2 px pink ring and pink border (`interactions.json` p1).
- Disclosure: open animates margin and chevron rotation 200 ms ease-out.
- Tab: hover border transparent to black instantly.

## Motion

Scale: 100 / 150 / 200 ms, easings `cubic-bezier(.4,0,.2,1)` (85.6%), `cubic-bezier(0,0,.2,1)` (13.3%), linear. Patterns: hard lift (hover), fill flip (hover), link darken, tab outline, disclosure open (200 ms), input focus ring, tag marquee (loop, 60 s linear, translateX 0 to -50% to 0), hero parallax (scroll, translateY 0 to -50%), mascot Lottie draw-on (load, 8 s, 24 fps). No scroll fade-ins, no load choreography. Reduced motion: stylesheet has both no-preference and reduce rules; template removes translate/shadow, marquee and parallax, shows Lottie end frame. Evidence `motion/p1-m1.png`, `motion/p1-m2.png`, `motion.json`.

## Illustration, icons and media

Illustration: flat vector, black outline, hard color fills, extruded-rim coins, stickers with offset contour, mascot Lottie (mixed strokes and fills, trim paths, colors #000, #ff90e8, #f1f333, #ff8f00; `motion.json` lottieFiles). Icons: 24 px outline at 2 px stroke, plus filled social glyphs 14-25 px (`icons/p1-icons.png`). Photography: third-party covers, square, no filter; carousel on 2% of pages.

## Theming

prefers-color-scheme only, no toggle (`theme.json`). Dark: black ground, #242423 surfaces, #ddd text, pink fills the primary button, white wordmark by invert, white 25-35% hard shadows. Evidence `shot:p1-desktop-dark.png`, `shot:p9-desktop-dark.png`.

## Writing style

Sentence case; short declarative headlines; one-sentence subline of 15-25 words; one to three word buttons; second person; concrete numbers; ellipsis in placeholders; no emojis in chrome.

## Coverage

| Area | Status | Note |
| --- | --- | --- |
| color | observed | Ink, paper, pink, five category colors |
| typography | observed | One grotesk, weight 400 |
| spacing | observed | 4 px base |
| layout-grid | observed | 1152/1280/1312 widths, 3-col grid |
| section-patterns | observed | Hero, band header, grid, carousel, bands, footer |
| shape | observed | 4 px, pill, 8 px |
| borders | observed | 1 px ink |
| elevation | observed | Hard offset shadow on hover only |
| surfaces-and-backgrounds | observed | Flat paper, white, black, bands |
| buttons | observed | Pink, black, outline, icon |
| links | observed | Underline, darken |
| navigation | observed | Home header, band nav, breadcrumbs |
| forms | observed | Search and email; validation derived |
| cards | observed | Product and hero cards |
| disclosure | observed | details, 200 ms |
| tabs | observed | Pill tabs |
| tables-and-data | derived | None in survey |
| feedback | derived | None captured |
| overlays | derived | None captured |
| iconography | observed | Outline plus glyphs |
| illustration | observed | Coins, stickers, mascot |
| media | observed | Covers, carousel |
| motion-load | observed | Lottie draw-on only |
| motion-scroll | observed | Parallax |
| motion-hover-and-press | observed | Hard lift |
| motion-loop | observed | Marquee |
| theming | observed | prefers-color-scheme |
| responsive | observed | Tailwind breakpoints |
| accessibility | observed | Focus outlines, forced-colors query |
| writing-style | observed | Sentence case |

## What the reference does not show

All derived from the character. Tables: 1 px ink outer border, 1 px #ddd row rules, no zebra, header row on paper with 14 px text, row actions as small lift buttons, sticky header with ink bottom rule. Validation: error is a 1 px red (#dc341e) border with ink message text and a small outlined sticker icon; success a pink check-circle. Toasts: white 1 px ink card with 4 px hard shadow, bottom left, 4 px radius, slides in 150 ms. Modals: white panel, 1 px ink border, 8 px radius, hard 8 px black shadow on a 50% black scrim. Loading: a coin sticker rotating or outline draw-on, never a spinner or skeleton shimmer. Empty and error: one 120-160 px sticker, one sentence, one pink button. Dense dashboards: no hero art, color band only for section identity.

## Must not carry over

The Gumroad wordmark and G coin, the mascot, Small Bets logo sticker and tag stickers, the product names (Gumclaw, Discover), headline copy, seller artwork, ABC Favorit (use DM Sans or Figtree, OFL), and the exact brand pink as an identity (use own hue or pair only with own artwork).

## Proposed template

**Name:** Hardlift

**Tags:** tone playful · corners sharp (4 px) · density regular · appearance light, dark · keywords: hard outline, offset shadow, flat color, paper and ink, category bands, sticker art.

**Ten defining rules**

1. Ground is warm paper (#f4f4f0), text and borders pure ink; white only for raised cards; dark is black with #242423 cards.
2. Every control and card has a 1 px solid ink border; buttons and inputs are 4 px radius, pills 9999 px.
3. No blurred shadow, gradient or translucency exists; depth is flat except the hover offset shadow.
4. Hover lifts a button -4 px up-left and shows a solid 4 px ink shadow in 150 ms; press returns it flush; hero CTA lifts 8 px over a plate.
5. One loud accent pink for the main CTA, price tags and focus ring, at most one pink action per viewport; inputs focus with a 2 px pink ring.
6. Each section owns one saturated flat color (teal, yellow, periwinkle, lime, red) that floods only its header band.
7. Type is one geometric grotesk at weight 400, tracking -0.4 px on 18 px and larger, sentence case, 16/22 body.
8. Navigation and filters are outline-on-demand pills; the current one is filled.
9. Illustration is flat sticker art with heavy ink outline and no gradient; hero shapes are oversized, tilted, cropped and drift in parallax; dense screens get one small sticker.
10. Motion is mechanical: 150 ms standard ease, 200 ms disclosures, slow linear loops (60 s marquee), no bounces or fade-ins, all of it off under reduced motion.
