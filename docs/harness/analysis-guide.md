# Reference analysis guide

How the `reference-analyst` turns a captured site into `analysis.md` + `analysis.json`. The goal is the
whole design language — what the site looks like, how it moves, how it responds and what concept runs
through every page — so the template can carry that concept into any product. A palette alone is a
failed analysis.

## What capture gives you

`pnpm harness capture <slug>` works from a domain or a few pages:

1. **Survey** — opens as many of the site's pages as allowed (robots.txt respected, default up to 150, one
   locale, collections sampled) and records the features each one uses: motion kinds, line drawings,
   illustrations, disclosures, tabs, forms, tables, card grids, logo walls, theme toggles, button styles.
   Result: `survey.json` and the frequency table in `capture-report.md`.
2. **Selection** — picks pages for the deep capture so every surveyed feature is covered at least once.
3. **Static capture** per page — full-page screenshots (desktop 1440, mobile 390; light and dark when the
   site follows prefers-color-scheme) with reduced motion, component crops, measured styles.
4. **Deep capture** per page, motion allowed — running animations with keyframes and timing, frame
   sequences, scroll reveals, hover/press/focus/open states, illustration and icon inventory with stroke
   data, button variants, section structure, header behavior on scroll, theme mechanism (and the theme
   toggle, tried once).

`capture-report.md` indexes all of it.

## analysis.md structure

Sections in this order (`check-analysis` enforces it). Every claim cites evidence.

| Section | Must contain |
| --- | --- |
| `## Character` | Three sentences; 3–8 keywords; what you would lose by changing one thing |
| `## Site survey` | Pages surveyed, page types, the features that are site-wide vs. one-off (from the frequency table) |
| `## Signature elements` | 2–5 elements. Each: what (measured), evidence, frequency, recipe, motion, application map (≥ 6 contexts incl. product screens), limits |
| `## Color` | Roles with measured hex, how much accent per screen, surfaces and how they stack, dark appearance |
| `## Typography` | Families (observed → substitute), scale by role, weights, tracking, casing, line length |
| `## Spacing and layout` | Base unit, scale, section spacing, grid and content width, density, breakpoints |
| `## Section and UI patterns` | Recurring compositions: hero, section rhythm and banding, card grids, logo walls, FAQ blocks, feature rows, footers — how often each occurs |
| `## Shape, borders and depth` | Radii by role, border widths and colors, shadow vs. border vs. tone for elevation |
| `## Surfaces and backgrounds` | Page and section backgrounds, bands, textures, gradients, image treatment as background |
| `## Components` | Buttons (every variant, with its use), links, nav, cards, inputs, disclosures, tabs, badges, tables… anatomy and states |
| `## Interaction` | Per element type: what hover, press, focus-visible and open change, by how much, how fast |
| `## Motion` | Every motion pattern: trigger, from → to, duration, easing, iterations, where; durations and easings as a scale; reduced-motion behavior |
| `## Illustration, icons and media` | Illustration style (stroke weight, caps, roughness, fills, colors by role, composition), icon grid and stroke, photo/video treatment |
| `## Theming` | Mechanism (prefers-color-scheme, toggle, both, none), what changes in dark |
| `## Writing style` | Casing, tone, punctuation of headings and buttons — style only, never copy |
| `## Coverage` | Every audit area: observed, derived or absent, with a note |
| `## What the reference does not show` | Gaps the template must still specify, derived from the character |
| `## Must not carry over` | Brand names, logos, artwork, proprietary fonts, distinctive marks, copy — and substitutes |
| `## Proposed template` | Name (original), tags, the ten defining rules |

## Signature elements

The part that makes or breaks the template. A signature element is something people would recognize the
site by: a drawing style, a motion habit, a texture, a recurring composition, an interaction quirk.

- **Recipe** — enough for an agent to build an original one from nothing: construction (markup, layers),
  technique (e.g. `stroke-dasharray`/`stroke-dashoffset` draw-on, `transform-origin` rotation, SVG filter),
  stroke widths, caps, colors and sizes by token role. Never the reference's artwork.
- **Motion** — trigger, keyframes from → to, duration, delay, easing, iterations; what it does under
  reduced motion.
- **Application map** — where it goes in any product, not just where the site uses it: page header, hero,
  section break, card grid, FAQ/help, form, settings, dashboard, data table, empty state, error, loading,
  toast. Dense screens get less, never nothing.
- **Limits** — how many per screen, where never, what it must not cover (data, controls).

## Coverage areas

`color`, `typography`, `spacing`, `layout-grid`, `section-patterns`, `shape`, `borders`, `elevation`,
`surfaces-and-backgrounds`, `buttons`, `links`, `navigation`, `forms`, `cards`, `disclosure`, `tabs`,
`tables-and-data`, `feedback`, `overlays`, `iconography`, `illustration`, `media`, `motion-load`,
`motion-scroll`, `motion-hover-and-press`, `motion-loop`, `theming`, `responsive`, `accessibility`,
`writing-style`. A feature the survey found cannot be marked absent.

## Check

`pnpm harness check-analysis <slug>` validates `analysis.json` against the schema, requires every audit
area once, checks that evidence files exist and that nothing the survey found is called absent, checks
the sections of `analysis.md`, and warns on thin recipes and short application maps. It sets the intake
status to `analyzed` when it passes.

## Checkpoint

The analysis is shown to the user before authoring starts: the character, the survey summary, every
signature element with an evidence image, the motion and interaction patterns, the ten defining rules,
the proposed name. The user confirms or corrects.
