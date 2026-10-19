The margin-notes 1.2.0-rc.1 restyle is applied to every screen. The build passes, all 10 smoke tests pass, and the final snapshot run reports no page scrolling sideways. I checked the screenshots of every capture route plus Settings, the 404 page and the unknown-project page at 1440px and 390px, light and dark, and fixed what was wrong: the page-header gutter, the menu button showing on desktop, the stacked table's first cell, the Team table on mobile, and the spacing on Settings.

**What changed**
- **Tokens and setup:** `design-system/tokens.css` is a copy of the package's `tokens.css`; I checked that both files have the same 292 variables. `src/styles/base.css` is rewritten on those tokens, with old variable names aliased to the new ones where they don't clash. Fonts load from Google Fonts with `display=swap`. Light and dark both work, following the system setting or `data-theme`.
- **Header:** with only 4 sections the spec calls for a header rather than a sidebar, so the brand and nav moved from the sidebar into the header. Under 860px, a 44px menu button opens a sheet with the global search first, then the links; Escape, a click outside or a route change closes it.
- **Shared pieces:** the button, input, segmented-control, checkbox, tab, card, table and badge styles all follow the spec. Tables with a status column stack into one block per row on mobile; the others scroll sideways with a "Scroll sideways" hint (`useScrollHint`). The chart now draws real 28px-max bars, the current month in full ink, the rest faded, mono labels and 4 gridlines. The Refresh button keeps its width while loading and shows a spinner.
- **Studio details:** the watercolor bloom, tape, pencil note and serif word with its brush stroke are reusable components in `src/components/Studio.tsx`, and the shared filters render once at the app root.
  - Overview, Projects and Team each get a bloom behind the page header and a pencil note on the lead sentence.
  - The 404 and unknown-project pages get the empty-state bloom, one strip of tape and a note on their button.
  - Project detail and Settings get none, as the spec requires.
  - Motion is limited to color changes, the menus fading in with a 4px rise, and the spinner. All of it stops under `prefers-reduced-motion: reduce`. The studio details themselves are static by design, so they have no motion of their own.
- **Docs:** `design-system/` now has `VERSION`, the tokens and `components.md`. I added `AGENTS.md` and `CLAUDE.md` with the pointer line.

All `data-testid`s, routes, label text and accessibility attributes are kept.

**What I could not apply**
- **Serif word and brush stroke:** every page title is one word ("Overview", "Projects", "Team"), and the spec needs at least two. I wasn't allowed to change label text, so neither appears on any real screen. I built and checked them on a temporary route instead.
- **Tape on a pinned card:** the dashboard has no pinned or featured item, so nothing qualified.
- **One commit per screen, as the spec asks:** I could only run the five commands you listed, so nothing is committed. For the same reason I couldn't delete the leftover file from that temporary route: `src/pages/StudioPreview.tsx` now contains only `export {}`. The route itself is removed, and the file is safe to delete.

**What I decided myself**
- On the Projects page, the table heading "All projects" would repeat the h1, which the spec forbids. I kept the heading for screen readers but hid it visually, so "Showing n of 8 projects" acts as the table's title.
- Refresh stays a secondary button. Making it primary would have brought in the fixed mobile action bar, which seemed too much for a refresh.
- Settings uses the empty-state panel but without bloom, tape or note, because the spec's settings rule forbids them.
- The table's filter field is 40px tall to match the status filter beside it, rather than the 32px toolbar height.
- The project-detail tab panels are capped at the article width (720px) plus padding.
- The status colors are: active is "success", paused is "warning", done is neutral.