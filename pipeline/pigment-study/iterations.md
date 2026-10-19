# pigment-study — iteration log

One entry per authoring iteration: what changed in the package, why, and which gate or critic note it answers.

## margin-notes@0.1.0-rc.1 — iteration 1 (2026-10-12)

What changed: first authoring of the package from the scaffold, based on the approved analysis
(name "Margin Notes"; tags editorial / soft / regular / light+dark with dark derived; ten rules and
studio-detail placement as approved).

- manifest: description, tags and keywords, four OFL font families (Geist body and heading, Geist Mono,
  Instrument Serif and Caveat as accents) with fallbacks and CJK fallbacks, provenance (5 reference URLs,
  capturedAt, analysis path).
- tokens: raw colors moved to a `palette.*` group so the bundle's color tables list only semantic `color.*`
  tokens; semantic `color.*`, `elevation.*` and `opacity.*` per mode; "night paper" dark mode; derived
  warning, status tints, danger hover, night text and border steps (all contrast-checked); decor and code
  colors; radii 5 to 20 plus 999; pixel-named spacing scale; `size.*`; font tracking; shadows; motion
  120/180ms; breakpoints 860/1200/1440.
- principles: ten rules (rule plus why), Never list, shared component states, and "Studio details in a
  product" with the placement table, one line per app type, and copyable recipes (filter chain, bloom,
  tape, pencil note, serif word and swash).
- components: all 12 required components specified, plus segmented-control, chip, media-frame, code-block,
  callout and empty-state.
- instructions: setup notes (fonts, theme, filter SVG at the root, detail limits) and the five sections.

Gates answered: validate went from 14 skeleton errors to 0. The bundle budget was first exceeded
(8,913 words, then 7,271 after the harness dropped the CSS-variable column). It was brought to 5,916 by:
moving the repeated focus, disabled, loading and error states into a shared section; compressing component
specs to one-liners; one line per app type; and removing duplication between the rules, Never and Color use.
No critic notes yet; this is the first iteration.

## margin-notes@0.1.0-rc.2 — iteration 2 (2026-10-12)

Answers critic-1 on rc.1 (`showcase/runs/margin-notes/0.1.0-rc.1/critic-1.json`: fidelity 3, consistency 4,
hierarchy 3.5, spacing 3.5, states 3, polish 2.5; all automated gates passed). Every promptFix applied:

| Change | Answers |
| --- | --- |
| Bloom recipe rebuilt: full-bleed `.bloom-band` with `overflow-x: clip`, no `overflow: hidden` ancestor, radial `mask-image` feathering every edge, box (500 x 320) inside a 320px-min band; leaves only through the viewport's right edge | promptFix 1 (bloom clipped into a rectangle on blog, commerce, dashboard) |
| Dark: `mn-wash-night` filter (blur only), CSS switch on `prefers-color-scheme` and `[data-theme]`; dark `opacity.bloom` 0.3 | promptFix 3 (muddy dark stain) |
| Below 1200px the bloom is 176 x 112, behind the h1 only, lead pushed below it; empty-state placement given | promptFix 4 (mobile bloom over lead text) |
| Rule 6: serif word never a whole title, only in 2+ word titles, per-app list, none in settings; Never line | promptFix 2 (one-word serif titles on dashboard and settings) |
| Rule 8 plus Text field: explicit `height`, `box-sizing`, flex rules; Verification check | promptFix 5 (20px search pills) |
| Navigation mobile spec; Layout rule for navs with more than 3 links; `scrollWidth` check | promptFix 6 (dashboard nav off-screen) |
| Table Mobile: overflow wrapper up to 4 columns, stacked rows from 5; `min-width: 0` rule | promptFix 7 (settings security 1010px capture, squeezed dashboard tables) |
| Media frame "no asset" state; Never line on illustrated placeholders | promptFix 8 (mountain clip-art vs bare icon) |
| Switch off border and checkbox border `color.text.tertiary` (3:1); Accessibility line | promptFix 9 (invisible off switch) |
| Typography: object h1 at `h1Article` 44; no repeated h2; badge next to the title | promptFix 10 (56px product names, "Projects"/"All projects", floating badge) |
| Rule 7 mono rule explicit; spec rows with mono values | promptFix 11 (uneven mono) |
| Sticky bar page bottom padding `calc(76px + space.16)` | promptFix 12 |
| Card rows `align-items: start`; featured cards span columns | promptFix 13 and the spacing note (dead space, fixed 880px card) |
| Rule 9 and Never now require hover, focus-visible, disabled, error; Verification lists code-checkable rules for agents that cannot render | promptFix 14 and the states note |
| One concrete pencil-note placement per app type | critic note "no pencil notes appear in any app" |
| Product name as text only, no icon | cross-app note (blog-only brand icon) |

Budget: the fixes took the bundle to 6,624 words. Brought to 5,989 by removing component Do/Don't lines (folded into
states or Never), compressing rules and instructions, dropping the swash rim, the alternate pencil arrow, the second
tape clip-path, the unavailable badge variant and two typography rows. Validate: 0 errors, 0 warnings.
Not addressed in the package: capturing focus, hover, error and empty states in the screenshot set is a harness change
(promptFix 14, second half).

## margin-notes@0.1.0-rc.3 — iteration 3 (2026-10-12)

Answers critic-1 on rc.2 (`showcase/runs/margin-notes/0.1.0-rc.2/critic-1.json`: fidelity 4, consistency 4, hierarchy 3.5,
rhythm 3.5, states 3.5, polish 3.5, avg 3.67; all automated gates passed). Every spec promptFix applied:

| Change | Answers |
| --- | --- |
| Header band sizes to content (no min-height, padding `space.64`/`space.40`); bloom `top: 0; right: -120px; width: 520px; height: 100%; min-height: 200px` with a radial mask; Verification: lead to first content at most `space.64` | promptFix 1; note "header band dead space" (dashboard, commerce, blog) |
| `color.decor.hatch` token (light `#c2bcb0` 1.52:1, dark `#4a4840` 1.59:1 on tray); hatch every 12px; Verification line | promptFix 2; note "hatch invisible in light" |
| Table Mobile: stack any table with status/action column or more than 4 columns (label/value pairs, actions full width, CSS on the same markup with ARIA roles); other tables scroll with edge fade and "Scroll sideways" hint; Verification: every status and row action visible at 390px | promptFix 3; note "mobile overflow moved into table frames" (team, security, billing) |
| Stacked rows keep the active sort key; sort chips list only shown keys | promptFix 4; mobile note "sorted by an invisible key" |
| Pencil-note anchoring recipe (`.note-anchor`, `--beside`/`--above`/`--below`, tip 6 to 12px from target, 220 x 48px free area) and one named target per app; notes from `breakpoint.lg` | promptFix 5; note "arrows point at nothing" (blog, dashboard) |
| Switch off thumb `color.text.tertiary` (4.6:1), on thumb `color.text.onAction` | promptFix 6; note "dark off thumb vanishes" |
| `color.surface.lifted` for pinned cards, empty states, dialogs, menus; `shadow.pinnedNight` ring `#4a4840` plus top highlight | promptFix 7; note "dark pinned lift invisible" |
| `mn-wash-night` rebuilt: ragged second displacement, half-alpha wash, darker rim at 1.4x; dark `opacity.bloom` 0.45 | promptFix 8; note "dark bloom reads as a glow" |
| Chart rule: bars max 28px, gaps 1.5x, past periods at `opacity.chartRest`, current in ink; labels mono caption; Never line | promptFix 9; note "ink slabs outweigh the KPIs" |
| Stat cards: one-line eyebrow with ellipsis, shared height, value `clamp(28px, 3vw, 40px)` | promptFix 10; mobile note "186 sits 14px lower" |
| Global search in the menu sheet on mobile, never between header and h1 | promptFix 11; mobile note "search row above the h1" |
| One container in every app (40px edge at 1440); narrower content left-aligned with the h1; settings forms max 8 columns; Verification line | promptFix 12; spacing note (blog 1280, settings 960, 400px password fields) |
| Article prose spacing (paragraphs `space.16`, blocks `space.24`, h2 `space.48`/`space.12`) | promptFix 13; note "code block 8px under paragraph" |
| Empty state on the h1's axis (left under a left-aligned h1) | promptFix 14; note "cart two axes" |
| Rule 7 rewritten as an exact list (table headers sans, only digits mono in mixed values, dimensions mono) | promptFix 15; mono note |
| Shared states expanded: field error message plus form summary; dialog scrim, lifted panel, actions; toast placement and action; Verification now names focus, hover, error, dialog and toast checks | promptFix 16 (spec half) and the request to fully specify the newly captured states |

Budget: the fixes took the bundle to 6,857 words. Brought to 5,971 by removing unused or duplicate tokens (23 table rows
across modes), the featured and light code variants, the media label, the display type row, and by compressing
components, rules and instructions. Validate: 0 errors, 0 warnings.
Not addressed in the package: the screenshot capture of focus, hover, error, dialog and toast states is a harness change
(promptFix 16, first half).

## margin-notes@1.0.0 — iteration 4 (2026-10-12)

This is a fourth authoring pass, beyond the three-iteration guideline, done on the user's instruction to finish
autonomously. It goes straight to the release version (`1.0.0`, status draft, a fresh copy of rc.3) so that the
published screenshots come from the published version itself rather than from a release candidate.

Answers critic-1 on rc.3 (`showcase/runs/margin-notes/0.1.0-rc.3/critic-1.json`: fidelity 4, consistency 4, hierarchy 4,
rhythm 4, states 3.5, polish 3.5, avg 3.83) and the failed functional-preservation gate (commerce: "In stock only"
checkbox not clickable because the decorative box sat over the native input). Every spec promptFix applied; nothing the
critic confirmed fixed in rc.3 was removed (header band, stacked mobile tables, dark switch and lift, light chart,
container width, code spacing, empty-state alignment).

| Change | Answers |
| --- | --- |
| Checkbox: the native input is the visible box (`appearance: none`, class `check`, full CSS for checked, indeterminate, radio); legacy drawn boxes get `pointer-events: none` under an `opacity: 0` input with `z-index: 1`. Switch: the input or `<button role="switch">` is the track, thumb is `::before`. Never: a decorative layer that intercepts clicks. Verification: mouse-click every checkbox, radio and switch | Failed gate (commerce smoke); promptFix 1; states note (7) |
| Tokens `color.surface.selected` (light `#ffffff`, dark `#38362f`) and `color.border.selected` (dark `#8f8b81`, 4.6:1 on the track); segment selected = fill plus inset ring; rule 9; Verification dark line | promptFix 2; states note (1) |
| `color.decor.hatch` light `#d4cfc4` (1.25:1), dark `#3f3d37` (1.34:1), 10px pitch, range 1.15 to 1.35:1; 3:2 frames in grids of 3+ asset-less frames; Never: hatch louder than text | promptFix 3; note "hatch overshot" |
| Linked-card hover: 1px `color.text.tertiary` ring plus title underline | promptFix 4; states note (2) |
| Search: hide `::-webkit-search-cancel-button`/decoration; own clear button spec (24px ghost, `aria-label`); select `appearance: none`; Never: browser-default chrome | promptFix 5; states note (3) |
| Header links as `size.controlSm` padded boxes; inline links `padding: 0 2px; outline-offset: 3px` | promptFix 6; states note (4) |
| Success state: toast, or a success badge with check icon and `role="status"` for in-place text; Never: bare colored word | promptFix 7; states note (5), cross-app note |
| Dialog: exact centering CSS (native `<dialog>` and custom scrim), width `min(size.dialog, 100vw - space.32)`, never top-aligned or a bottom sheet; initial focus with visible ring | promptFix 8; states note (6) |
| Never: h2/card title/lead repeating the h1 ("Projects" / "All projects"); functional table-card titles | promptFix 9; hierarchy note |
| Rule 2 and Badge: state markers are neutral badges, a marker rendered as a button is styled as the badge; Never: marker shaped like a button | promptFix 10; hierarchy note (billing) |
| Article TOC: right rail from `breakpoint.lg`, else a closed `<details>` after the meta line; nothing between breadcrumb and h1 | promptFix 11; hierarchy note (article mobile) |
| Cards: `align-items: start`, span only the columns content fills, forms in 2 field columns or a narrower card; Never: card more than 30% empty | promptFix 12; spacing note |
| Mobile action bar `position: fixed` full width, never sticky inside a card | promptFix 13; spacing and polish notes |
| Rule 7: numbers inside sentences and status lines stay sans | promptFix 14; mono note |
| Chip strip: selected chip scrolled into view, 24px edge fade | promptFix 15; mobile tables note |
| Table `table-layout: fixed` with column widths | promptFix 16; polish note |
| Badge after inline text: `margin-left: space.8` | promptFix 17; spacing note ("This device") |
| Serif allowed in blog post titles, not product/project/record pages; notes must restate their target (per-app wording; store note no longer fixed text); settings note `--note-x: space.16` inside the sidebar | promptFix 18; contradictions (a), (b), (c) |
| Headings `text-wrap: balance` | polish note (one-word second line) |

Budget: the fixes took the bundle to 6,859 words. Brought to 5,993 by writing shadow colors as 8-digit hex, removing
unused tokens (`color.action.disabled`, `color.code.ring`, `font.size.display`, `font.tracking.normal`,
`size.rowCompact`), comma-grouping the filter matrices, turning the switch CSS into exact prose, dropping the unused
`note--above` variant and the swash table row, and compressing rules, components and instructions. Validate: 0 errors,
0 warnings.
Not addressed in the package (harness, promptFix 19): state captures that frame their subject, mobile state captures,
and the commerce 828px-wide mobile capture anomaly.

## margin-notes@1.2.0-rc.1 — generalize for any product (2026-10-19)

Goal: the package is written for any product, not for the harness's demo apps. Answers every item of
`pipeline/pigment-study/overfit-review-2026-10-19.md` (verdict on 1.1.0: structurally fitted). Tokens, components,
recipes and the design language are unchanged; the studio details still reach every kind of screen they did before,
now placed by screen moment instead of by app. Authored without reading the demo apps.

| # | Before (1.1.0) | After |
| --- | --- | --- |
| 1 | Studio details: "Per app, one note each" — Dashboard, Store, Blog, Settings bullets with demo copy, a featured card "spans columns 1 to 8", a note sized for "the 220px sidebar" | Placement by screen moment: home, index or collection screen (bloom, serif word in the h1, swash once per product on the top-level home header, note on the lead); pinned or featured item (tape plus `elevation.pinned`, note on its eyebrow if the screen has no lead note); editorial title (serif allowed); settings and form screens (no bloom, serif or tape; a `.note--below` on the section navigation if there is one, `--note-x` keeps it in a narrow column); record-detail, checkout and data-dense screens (none). Details table rows name these screen kinds |
| 2 | Rule 6: serif word "only in a title of 2 or more words on the per-app list"; table "Titles on the per-app list" | Rule 6 and table: in a page h1 of 2+ words on a home, index or collection screen, or an editorial title; never on settings, form, checkout or record-detail screens |
| 3 | Note examples from demo copy ("made for every day", "October 2026 … this month so far"); recipe "Two to six words" | Recipe uses placeholders (`{target phrase}`, `{2 to 4 words restating it}`); the note restates whatever its target says, 2 to 4 words |
| 4 | Featured post card spans columns 1 to 8, taped | A pinned or featured item (tape plus `elevation.pinned`) spans the columns its content needs, never a fixed span |
| 5 | "Projects" / "All projects"; "8 projects"; "Showing 0 of 6 posts"; "Current plan", "This device"; badge count "e.g. cart"; "Saved"; empty state "cart" | "Orders" / "All orders"; "{n} items"; "a result count in a sentence"; a state marker tags the current or selected item next to its name (rule 2, Badge); "e.g. unread items"; "a saved or sent confirmation"; "list" |
| 6 | Charts: "past periods … at `opacity.chartRest`, the current one full" | The emphasized mark (current or selected) is full `color.text.primary`, the others at `opacity.chartRest`, in any chart |
| 7 | "blogs add 1 pull-quote per article" | A long-form article may add 1 serif pull-quote |
| 8 | Media frame "same in every app"; ratios "4:3 products, 16:10 screenshots, 3:2 posts" | "same in every product"; default ratios by image kind: 4:3 object photos, 16:10 screenshots and interface captures, 3:2 cover and editorial images |
| 9 | Instructions: `VERSION` (`margin-notes@1.0.0`) | `VERSION` (`margin-notes, updated <the spec's update date>`); `components.md` records where each studio detail sits by screen moment |
| — | Also generalized: Typography "Object h1: product, project, post, record"; same-height card rows "(products, stats, plans)"; "One container in every app" | "record detail (one item, person, order or article)"; "(catalog items, stats, pricing tiers)"; "on every screen" |

Not applied: nothing; every review item had a general form. Validate: see below; bundle rebuilt.
