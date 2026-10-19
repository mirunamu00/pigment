I've applied Hardlift 0.1.0-rc.6 to every screen. The build and type check pass, all 10 smoke tests pass, and nothing scrolls sideways. I checked screenshots at 1440px and 390px in light and dark for every page, plus settings, the 404 page, project not found, the filtered-to-empty table, and a temporary page for the busy and open-menu states.

**Before you merge, delete `src/pages/TempStatesPage.tsx`.** It was the temporary preview page. I removed its route and import, but none of the commands I'm allowed to run can delete a file.

**What changed**
- **Tokens:** `src/styles/tokens.css` is an exact copy of the package's `tokens.css`, imported from `base.css`. The old variable names still work as aliases, with one exception (see below). Dark mode follows the system setting, and `data-theme` can force either theme. DM Sans loads from Google Fonts with the spec's fallback fonts.
- **Shared pieces:**
  - The lift button classes and a lifting card class, following the spec's recipe.
  - `PageBand`, the colored page-header band.
  - The pill styles, with selected and current-page states.
  - `Sticker`: five original drawings (coin, tag, star, arrow, folder) and a small turning coin for loading.
  - Outline icons, and `StatusPill` as an icon-plus-word status badge.
- **Screens:**
  - **Section colors:** Overview is teal and has a small coin sticker. Projects and project detail are yellow, Team is periwinkle, Settings is lime, and both not-found pages are red.
  - **Header and nav:** the top bar is 80px with the search box and its button joined. Sidebar links are pills, and the current page is filled in ink.
  - **Overview:** the KPI cards have outlines and a trend arrow. The chart bars are ink.
  - **Tables:** each sits in one outlined box with a 2px ink rule under the header. Under 768px each row becomes a stacked block with labels.
  - **Empty and error states** each have a sticker and one pink button.
  - **Refresh while loading** keeps its ink fill and shows the turning coin and "Refreshing…".
  - **Motion:** all lifts and the coin stop under reduced motion.
- **Docs:** `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**What I couldn't apply**
- **No commits:** git isn't in the allowed commands, so there are no commits, one per screen or otherwise. Everything is uncommitted in the working tree.
- **No `tokens.json` copy:** `design-system/` points to the installed `tokens.css` and leaves `tokens.json` in the package.
- **Elements the screens have nothing to attach to:** I didn't add a time-range pill filter, table row actions, a settings sub-nav or a save row. Building them would have meant inventing features.
- **Some fixed layout sizes:** sidebar width, search width and avatar size are fixed pixel values, because the tokens have nothing for them.

**Decisions I made myself**
- **Kept the sidebar:** the spec's navigation is a top header, but the app's existing structure is a left sidebar, so I kept it. On phones it becomes a scrolling strip of pills instead of a menu dialog.
- **Removed two old aliases:** the old `--space-4` and `--space-8` mean 16px and 32px, while Hardlift uses those names for 4px and 8px. Keeping both broke every spacing value, so the old meanings are gone.
- **Panel headings:** headings inside cards are 24px rather than the 30px h2 size.
- **Status colors:** Active is blue with a play icon, Paused is amber with a pause icon, and Done is green with a check.
- **Loading cards:** while loading, the KPI cards show their label and "Loading..." instead of grey placeholder blocks, and the only animation is the coin in the Refresh button. The disabled attribute stays because the tests check for it, but the button keeps its normal look.
- **Page gutters:** side padding is 64px on wide screens, 32px from 768 to 1279px, and 16px on phones.
- **Breadcrumb:** it sits above the band on the plain page background.
- **Sticker colors:** I kept the second band colors out of stickers, apart from the coin's yellow rim, which the spec's recipe draws that way.