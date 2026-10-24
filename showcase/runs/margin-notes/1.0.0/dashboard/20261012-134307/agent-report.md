Margin Notes is now applied to every screen, in light and dark. The build and typecheck pass, and `pigment-snap` reports no sideways scroll on any page. I opened all 16 screenshots and fixed what was wrong. I could not run the smoke tests themselves because Playwright isn't among the commands I was allowed to run. Every `data-testid`, route, label and accessibility attribute the tests use is unchanged, but that is not the same as a passing run.

**What I changed**
- **Tokens and fonts:** `design-system/tokens.css` re-exports the package's `tokens.css`, so no value was retyped. Fonts are self-hosted through Fontsource npm packages: Geist, Geist Mono and Caveat, with `font-display: swap`. The three watercolor filter SVGs are in `index.html`.
- **Stylesheet:** `src/styles/base.css` is rewritten using tokens only. The old variable names are kept as aliases where they don't clash with token names.
- **Shell:** with only 4 sections, the sidebar becomes a single header across the shared page container. On mobile the header shows the product name, the user avatar and a 44px menu button. That button opens a sheet with search first, then the nav links, and Escape closes it.
- **Overview:** watercolor bloom behind the header, the pencil note "this month so far" on "October 2026", stat cards, and the projects table.
- **Chart:** redrawn so bars stay at most 28px, past months are faint and the current month is full ink, with mono labels.
- **Projects table:**
  - Fixed column widths, mono numbers and dates, and status badges with a dot.
  - On mobile each row becomes a stacked block, and a strip of sort chips replaces the hidden column headers.
- **Team and Files tables:** on mobile they scroll sideways inside their card with a faded edge and a "Scroll sideways" hint.
- **Project detail:** the status badge sits right after the h1, with ink-underline tabs, key/value rows, styled checkboxes and a progress bar.
- **Empty states:** panels follow the spec, and the Settings placeholder has one strip of tape.
- **Hand-off files:** I added `design-system/` (`VERSION`, `tokens.css`, `components.md`) and the pointer line in `AGENTS.md` and `CLAUDE.md`.

**What I could not apply**
- **Commits:** the spec asks for one commit per screen, but git wasn't an allowed command, so all changes are uncommitted in the working tree.
- **Mobile sort controls:** the spec wants a radio group; the status filter keeps `aria-pressed` buttons because the tests check that attribute.
- **Studio details:** no serif word (the dashboard isn't on the per-app list). Tape appears only on the Settings placeholder, because the app has no pinned cards.

**Decisions I made myself**
- **"All projects" heading:** it repeats the h1 on the Projects page, so it is now visible to screen readers only. The text itself is unchanged.
- **Status colours:** Active is success (green), Paused is warning (ochre), Done is neutral.
- **Stat-card change lines:** these use a neutral colour with an up or down arrow instead of green and red.
- **Detail panels** are capped at 8 grid columns (896px).
- **Small new markup:** I added classes, `role` and `data-label` attributes, the menu button, and a small `TableScroll` wrapper. The not-found links are now styled as buttons.
- **Bloom clipping:** `overflow-x: clip` sits on the app shell, because on `html` alone the bloom still widened the full-page screenshots.
- **Team table:** it is set at least 780px wide so names don't break mid-word on mobile.
- **Placeholder screens:** the spec's empty-state bloom and pencil note are left off them to keep the decorations rare.
- **Not-found pages:** their h1 is sized like an empty-state title.