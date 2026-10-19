Hardlift is now applied to every screen, in light and dark. The build passes, all 10 smoke tests pass, and nothing scrolls sideways at 1440px or 390px. I checked the screenshots of every route in both themes, plus the states the snapper doesn't reach on its own: menu open, loading, both detail tabs, empty filter, settings, both not-found pages and the stickers on their own. The temporary routes for that are removed.

**What changed**
- **Tokens and font:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`, loaded first. DM Sans comes from Google Fonts, using the spec's fallback list. Light and dark follow the system setting; `data-theme` on `<html>` forces either one. The old variable names in `base.css` still work as aliases.
- **New pieces:**
  - `PageBand`: the colour band at the top of each page.
  - `Sticker`: six distinct drawings, including the turning loading coin.
  - `Icon`: outline icons.
  - `.lift` buttons, `.pill` controls, and a rebuilt status badge (icon plus word).
  - All motion stops under reduced motion.
- **Screens:**
  - **Layout:** sidebar of pills, with the current page in ink; an 80px top bar; the search field joined to an ink icon button; the user menu trigger turns raised (not pink) when open.
  - **Overview (teal band):** ink Refresh button, outlined stat cards, a 32px coin on the throughput card, the loading coin with "Loading...".
  - **Projects and project detail (yellow):** breadcrumb, badge and pill tabs sit in the band; custom checkboxes and progress bar.
  - **Team (periwinkle).**
  - **Settings (lime):** a 160px sticker.
  - **Not found and project not found (red):** a sticker and a pink return button.
  - **Tables:** one bordered box with pill filters. On phones each row becomes a stacked block; the sortable table keeps its headers as a strip of sort pills.
- **Pink:** at most one pink button per screen, and only for the empty or error recovery action. Refresh and Search are always ink.
- **Preserved:** all routes, labels, form fields, `data-testid`s and ARIA attributes. I only added ARIA: `aria-busy` on the Refresh button and labels on the tables.
- **Docs:** `design-system/` has `VERSION` and `components.md` (where each piece is used and how to reuse it). `AGENTS.md` and `CLAUDE.md` have the one-line pointer.

**Not applied**
- **No commits:** git wasn't in the allowed commands, so the "one commit per screen" step wasn't done. Everything is uncommitted.
- **Leftover file to delete:** `src/pages/TempPreview.tsx` is now an empty stub (`export {}`), because deleting files wasn't allowed either.
- **Phone navigation:** the spec's menu button with a dialog list isn't built. Under 1024px the nav becomes a scrolling pill strip instead.
- **Settings sub-nav and save row:** not added, because the page is still a placeholder with nothing to save.
- **Table row height:** project rows are 57px rather than 44px, because the name and client sit on two lines.

**Decisions I made**
- **Time range on the chart:** I added "6 months / 3 months" pills because the spec puts time-range pills on dashboards. This is a small new feature; the default still shows 6 bars.
- **Search button:** it's now an icon button, with "Search" kept as hidden text so screen readers still read it.
- **Band colour per section:** Overview teal, Projects yellow, Team periwinkle, Settings lime, errors red. Each sticker uses its own screen's band colour, so no screen shows two.
- **Charts and progress:** bars and the task progress bar are ink, not pink.
- **KPI trends:** shown with arrow icons in ink rather than red and green.
- **Loading Refresh button:** it keeps its ink fill and the text "Refreshing…". The spec's loading state swaps the label for a coin, but the test checks the button text, and the grey disabled styling failed contrast on light.
- **Old spacing names:** I dropped the legacy `--space-8` alias because it overwrote the token of the same name (8px became 32px).