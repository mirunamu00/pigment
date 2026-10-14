I've applied Inkleaf to every screen. The build and typecheck pass, nothing scrolls sideways at 390px, and the last screenshot run (all four captured routes at 1440 and 390, light and dark) matches the spec. I couldn't run the smoke tests themselves (`npm run test:e2e` isn't one of the commands I was allowed), so test-passing is a goal I preserved for, not something I checked.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`, loaded first, so dark mode works from the system setting or `[data-theme]`. The three fonts load from Google Fonts in `index.html`. I rewrote `src/styles/base.css` to use tokens only, and added `src/styles/ink.css` with the signature recipes and the global reduced-motion block.
- **Signature pieces** (reusable, in `src/components/ink/`):
  - **Pictograms:** the brush filters plus a pictogram component that draws as one stepped strip, plays once and holds. Header drawings play once per session. Under reduced motion they show the final frame.
  - **Other pieces:** the pastel stage (also as a drawing stage), the write-in heading, the working glyph with breathing dot and check-circle, the ring-control buttons and chips, and block rise.
- **Eight new drawings:** clipboard, pencil, mug and key in a hand (the four 48px headers), a folder (the fifth header), plus a magnifying glass, a lost mitten and an hourglass. Half include a hand. I checked each at 48px and redrew three whose hands read as hooks.
- **Shell:** sticky header with the serif product name, ring-control search and an account menu with avatar. Sidebar from 992px; below that, a menu button opens a sheet of rows.
- **Screens:**
  - **Overview:** stat cards, the main chart in a raised card on a sage stage, activity list, and the table card with chips, a search with its own clear button, and stacked rows on mobile with a native "Sort by" select.
  - **Project detail:** breadcrumb and status badge in the header, underline tabs, panels that rise on tab change, and the spec's checkboxes.
  - **Team:** avatar tiles; the table scrolls inside a labelled region on mobile.
  - **Settings:** the "coming soon" message as a first-run empty state on a lilac stage over ghosted cards.
  - **Not found** (both kinds): the lost mitten on an apricot stage, a serif h1 and two actions.
- Every route, label, `data-testid` and ARIA attribute is kept. `design-system/` (VERSION, tokens, `components.md`), `AGENTS.md` and `CLAUDE.md` are added.

**What I couldn't apply or verify**
- **No commits:** the spec asks for one commit per screen, but `git` wasn't among the allowed commands. Everything is uncommitted on `main`.
- **Working glyph not placed:** it's built, but the app makes no real network requests, and the spec forbids artificial delays.
- **Leftover file:** `src/pages/DrawingsPreview.tsx` was a temporary preview page I used to check the drawings. It's no longer routed, but I couldn't delete it with the allowed commands. Please remove it.
- **Font risk for the console-error test:** if the test machine is offline, the Google Fonts requests will log console errors and that smoke test will fail. Fonts loaded fine here.
- **Settings fix unchecked:** on desktop, the ghost cards were painting over the empty-state card. I fixed it after Settings was removed from the screenshot list again, so that fix hasn't been seen in a screenshot.

**Decisions I made myself**
- Blocks rise on a route's first render, not on scroll. I read this from the spec's "product screens" line; scroll-triggered rise also left blocks below the fold invisible.
- **Status badges:** Active is green with a breathing dot, Paused is amber, Done is neutral.
- **Stat changes are colored by meaning:** fewer incidents and shorter lead time count as good.
- **Write-in scope:** only h1s and empty-state titles write in; panel titles stay still.
- **Stat-card columns:** four from 992px, two from 834px, one below, because the large values don't fit two across at 390px.
- **Settings stage on mobile:** under 834px I dropped it, since it would become taller than square.
- **Chart:** redrawn in HTML instead of SVG so its labels stay readable on phones.
- **Small additions:** a "Workspace" label above the nav, and a second action on the not-found pages.