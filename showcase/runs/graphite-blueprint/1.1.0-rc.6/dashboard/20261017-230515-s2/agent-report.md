Graphite Blueprint 1.1.0-rc.6 is now applied to every screen. The build passes, all 9 smoke tests pass, and the final screenshots (1440px and 390px, light and dark) match the spec with nothing scrolling sideways. Light and dark follow the device setting; I didn't add a theme switch because the app never had one.

## What changed
- **Tokens and fonts:** `tokens.css` is copied unchanged into `design-system/tokens.css` and loaded first. The old variable names in `base.css` now point to the new tokens. Inter and Geist Mono are bundled from the `@fontsource` npm packages, so no font CDN is used. The base page setup, the global focus outline and the reduced-motion rules follow the spec.
- **Signature elements**, each a reusable piece in `src/design/` with its recipe CSS in `src/styles/signature.css`:
  - spotlit stage, quiet and lit
  - dot glyph with all six patterns, plus the dot meter
  - isometric blueprints: stack, pair, and a new broken-connector pair for error pages
  - spec plate with all eight figure kinds
  - shimmer, live edge, pulse, caret and fade-in
  - screen head, section head, two-tone text and mono labels
- **Screens:**
  - **App shell:** sidebar with icons and the current page highlighted. Below 1024px it becomes pill links that wrap. The header is sticky and blurred, with a pill search box and the user menu as a popover.
  - **Overview:** KPI cards, and the chart rebuilt as dot columns on a quiet stage. It sits level with the activity list.
  - **Projects table:** segmented status filter, table with status icons, sort chevron only on the sorted column, Status pinned on the right. On mobile only the first and pinned columns show. Empty results show the dot glyph.
  - **Team:** a dot meter shows each person's project load.
  - **Project detail:** numbered detail rows, the project's spec figure on a quiet stage, a sliding tab indicator, accent checkboxes, and a dot row for task progress.
  - **Settings:** a split row with a blueprint stack as the "coming soon" state.
  - **404 and project-not-found:** a broken-connector blueprint on a quiet stage, an "ERR 404" label and two buttons.
- **Docs:** `design-system/` now holds `VERSION`, the tokens and `components.md`, which says where each piece is used. New `AGENTS.md` and `CLAUDE.md` point to it.

Every route, `data-testid`, label text and ARIA attribute is kept. The temporary review route I used to inspect the signature pieces has been removed.

## What I couldn't apply
- **No commits.** The spec asks for one commit per screen, but `git` wasn't among the commands I was allowed to run, so all changes are uncommitted in the working tree.
- **The shimmer, live edge and pulse, and the looping glyph animations, aren't on any screen.** Nothing in the app actually runs or streams, and the spec allows them only while work really happens. They're built and I checked them on the review route.
- **The lit stage, split openers and blueprint rows aren't on any screen.** They're for landing and content pages, which this app doesn't have.
- **No 44px touch targets.** Buttons stay at 32px.
- **Only `tokens.css` was copied into `design-system/`, not `tokens.json`.**
- **I didn't paste measured numbers.** The spec wants `getBoundingClientRect` readings; I could only judge alignment from the screenshots.

## Decisions I made
- **Column order:** Status in the projects table and Size in the files table moved to the last column, because the pinned column has to be last to stick on the right.
- **Team "Active projects" column:** its heading is now screen-reader-only. Each cell instead shows a dot meter and "2 projects", as the spec allows.
- **KPI dots:** I added a `sentiment` field to the KPI data so the dot is green for good news. Fewer incidents counts as good even though the number went down.
- **Project detail:** I treated a project like the spec's product detail, with a generated figure captioned "FIG 01 · $240K BUDGET". Its header label is "PROJECT 01".
- **Avatars:** 16px row avatars show one initial, because two letters at 11px don't fit.
- **Filter track:** the segmented filter got a hairline border; otherwise its track is invisible on white.
- **Hidden progress bar:** the native `<progress>` on the Tasks tab is still there for screen readers but hidden visually; the dot row replaces it.
- **New copy:** I added short mono labels above each heading (e.g. "DASHBOARD · OCT 2026"), a one-line summary on Settings, and a second button on error pages ("View projects" / "Go to overview").