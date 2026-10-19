Hardlift is applied to every screen. The build passes, all 10 smoke tests pass, and nothing scrolls sideways. I checked the screenshots at 1440px and 390px in light and dark, including Settings and both not-found pages, which aren't in the default capture list.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is a copy of the package's `tokens.css`. Dark mode follows the system setting, and `data-theme` can override it. DM Sans (regular and bold) loads from Google Fonts in `index.html`. The old variable names in `base.css` now point to the new tokens.
- **Signature elements, built as reusable pieces:**
  - **Lifting buttons:** pink, ink, outline, icon and small versions, plus a raised one for the user-menu trigger so it never turns pink.
  - **Color bands:** a `Band` component that holds each page's title, meta line, breadcrumb, actions and pill tabs. Each section has its own color: Overview teal, Projects and project detail periwinkle, Team yellow, Settings lime, error pages red.
  - **Pills:** sidebar navigation, status filters, project tabs and the settings sub-nav.
  - **Stickers:** five original drawings, each used once, plus a turning coin for loading.
  - **Icons:** a 24px outline icon set.
  - **Motion:** lifts, the coin turn and the menu chevron all stop under reduced motion.
- **Screens:**
  - **Shell:** 80px raised top bar, a search box with a joined square icon button, a raised user menu with the hard shadow, and pill navigation in the sidebar.
  - **Overview:** teal band with an ink Refresh button. While loading, the button and the four metric cards show the turning coin instead of grey skeleton bars. Metric cards are outlined, the chart is outlined with the latest month in ink, and the throughput card has one 32px sticker.
  - **Tables:** bordered box, a 2px ink rule under the header, thin row rules, 2px-lift row actions, and a sticky first column with sideways scrolling inside the box on mobile.
  - **Status badges:** an icon plus the word, never color alone.
  - **Empty table:** one sticker and one pink "Clear filters" button.
  - **Project detail:** breadcrumb and tabs sit inside the band; checkboxes and the progress bar are restyled.
  - **Settings and error pages:** a 160px sticker, one sentence and one pink button.
- **Docs:** `design-system/VERSION`, `design-system/components.md`, and a one-line pointer in `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **Commits:** none were made. `git` wasn't among the commands I was allowed to run, so the one-commit-per-screen and rollback steps are left to you. All changes are uncommitted on `main`.
- **Time-range pills (dashboard), a settings save row, and file-table row actions:** the app has none of these features, so I didn't invent them.
- **Hero, toast and dialog:** none exist in the app.
- **Mobile menu dialog:** on mobile the navigation is a sideways-scrolling pill strip instead of the dialog the spec describes.
- **Tokens in `design-system/`:** the folder points to `src/styles/tokens.css` rather than holding a second copy.

**Decisions I made**
- **Old spacing variable names:** the old `--space-4` (16px) and `--space-8` (32px) clashed with hardlift's own names (4px and 8px). This doubled every pill and row height until I removed those two old names.
- **Which button is pink:** Refresh is ink, so on Overview the only pink button is "Clear filters", and only when the table is empty.
- **Search button:** the top-bar submit is now an icon button. "Search" is still in the markup as hidden text, so its accessible name is unchanged.
- **Trend lines:** the metric cards use a neutral arrow and the text. The old red/green coloring was dropped, because "down" is good news for incidents and lead time.
- **Chart:** I rebuilt it from plain HTML boxes so its labels stay readable at 390px. It keeps the same `data-testid` values and its screen-reader summary.
- **Added row actions:** I added icon actions to two tables: an "Open" link per project and an "Email" link per team member. Both repeat existing links.
- **Settings sub-nav:** it has a single "Workspace" pill.
- **`VERSION` date:** the spec gives no update date, so the file says "applied 2026-10-19".
- **Links:** they use the spec's grey underlined style, including project names in the tables.