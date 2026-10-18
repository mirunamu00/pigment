Graphite Blueprint 1.1.0-rc.6 is applied to every screen, in both light and dark. The build passes, all 9 smoke tests pass, and the final screenshots show no sideways scroll at 1440px or 390px. Nothing is committed: git wasn't on the list of commands I could run, so the spec's "one commit per screen" step is left for you.

## What changed
- **Tokens and fonts:** `design-system/tokens.css` is an unchanged copy of the package's `tokens.css`, and the page follows the device's light/dark setting. The old variable names in `base.css` now point at the new tokens. Inter and Geist Mono are self-hosted from npm font packages (`@fontsource-variable/inter`, `@fontsource/geist-mono`), with no font CDN.
- **Signature elements:** all six are reusable pieces in `src/signature/`, with their CSS copied from the recipes into `src/styles/signature.css`. I rendered each one on its own at 2x in light and dark through a temporary route, compared it with its recipe, and then removed that route and the other review edits.
- **Screens:**
  - **Shell:** sidebar with 16px icons. Below 1024px it becomes text-only nav pills that wrap. The header is sticky and blurred, and has a search pill and a user menu that opens with the spec's animation.
  - **Overview:** KPI cards, a dot-column chart on a quiet stage that ends level with the activity list, and the projects table.
  - **Projects table:**
    - Built to the table spec: mono column heads, a 12px sort chevron shown only on the sorted column, and a status icon plus word.
    - Below 640px only the project and the pinned status column show.
    - Its empty state uses the 48px empty glyph.
  - **Project detail:** breadcrumb, status badge, tabs with a sliding underline, numbered detail rows, a spec plate on a quiet stage, styled checkboxes and progress bar.
  - **Team:** a dot meter beside each person's project count.
  - **Settings:** a split settings row with a blueprint stack whose slabs lift on hover.
  - **Page not found and unknown project:** the broken-connector blueprint on a quiet stage, `ERR 404`, and two buttons.
- **Motion:** chart columns, the scan glyph, the shimmer, the menu, the tab underline and the blueprint lift all animate. Under `prefers-reduced-motion` they show their resting frame.
- **Also added:** `design-system/VERSION`, `design-system/components.md` (where each piece is used, plus my decisions), and `AGENTS.md` / `CLAUDE.md` with the pointer line.

All routes, `data-testid`s, labels, ARIA attributes and behaviour are kept.

## What I could not apply
- **Live edge, pulse and caret** are built but not used anywhere. The spec says to show them only while something really runs, and nothing in this app streams data or runs jobs.
- **Landing-page pieces** (lit hero stage, row of three blueprints, closing statement, content openers) are built where reusable, but this app has no landing or content pages to put them on.
- **Version date:** the spec gives no update date, so `VERSION` records today's date and says so.

## Decisions I made
- **Lazy-loaded routes:** I made the secondary screens load on demand. That gives the scan glyph and "Loading" shimmer something real to show while a screen loads, and it only appears after 300ms.
- **Column order:**
  - In the projects table, Status moved to the last column so it can be the pinned column on small screens.
  - In the files table, Size moved to the last column for the same reason.
  - The Team table's pinned head reads "PROJECTS" on mobile; "Active" is kept for screen readers.
- **KPI cards** are separate bordered cards, not the hairline card grid, following the spec's "KPI card" wording.
- **Colours the spec leaves open:**
  - A KPI that went up gets a green dot and one that went down gets a blue dot. Every current "down" is an improvement, so red would be wrong.
  - Paused projects use the idle grey ring icon.
- **16px avatars** show one initial, because two letters at the spec's font size don't fit; the 24px avatar in the header shows two.
- **Placeholder copy:** I added short second sentences to page summaries, worked out from the data (for example "186 deployments, 3 open incidents."). I also wrote the settings figure's title and caption and the second button on the 404 pages ("View projects", "Go to overview").
- **Pinned-column divider:** the pinned column's sticky edge and vertical line only appear below 768px, where the table can scroll. At desktop width they would just be a vertical rule.