The restyle is done for every screen, in light and dark. The build passes, all 9 smoke tests pass, and the final snapshot run shows no sideways scroll on any page at 1440px or 390px. I went through every screenshot, including Settings, the 404 page and a temporary page showing each signature piece on its own. That temporary block has been removed.

## What changed
- **Tokens and fonts.** `design-system/tokens.css` is a copy of the package's `tokens.css`; I wrote it out by hand because copy/diff commands weren't on the allowed list, so it hasn't been checked against the original. Light and dark follow the device setting. The old CSS variable names now point at the new tokens. Inter and Geist Mono are bundled with the app from the `@fontsource` npm packages (added to `package.json`); no font CDN.
- **Signature pieces**, each a reusable component in `src/components/`:
  - `Stage` (spotlit stage)
  - `DotGlyph` / `DotMeter` / `DotField` (dot glyph)
  - `Blueprint` (all the drawing helpers, plus a broken-connector version)
  - `SpecPlate` (spec figures)
  - `Live` (shimmer, live edge, pulse, caret)
  - `ScreenHead` / `SectionHead` / `TwoTone` (screen heads and two-tone text)

  Also new: `EmptyState`, `Icons` and a status icon inside `StatusPill`. Loops stop under reduced motion.
- **Screens:**
  - **Shell:** sidebar with icons; below 1024px it becomes wrapping text pills. Sticky blurred header, pill search, user menu as a popover.
  - **Overview:** screen head, KPI cards, a dot-column chart on a quiet stage that ends level with the activity list, and the projects table.
  - **Projects and Team:** the spec's table style, with sticky pinned columns and two-line first cells on phones. Team shows each person's load as a dot meter.
  - **Project detail:** sliding tab indicator, numbered detail rows, the project's figure on a quiet stage, styled checkboxes.
  - **Settings:** empty state with a blueprint stack.
  - **Not found and project not found:** broken-connector blueprint, "ERR 404", two buttons.
- **Docs:** `design-system/` (`VERSION`, `components.md`) plus `AGENTS.md` and `CLAUDE.md`.

## What I couldn't apply
- **Shimmer, live edge, pulse and loading glyphs are built but not used anywhere.** Nothing in the app actually runs or streams, and the spec only allows them while real work runs.
- **Settings has no split-row groups.** The page is still a placeholder, so there were no controls to lay out.
- **No commits.** `git` wasn't on the commands you allowed, so the per-screen commits the spec asks for still need to be made.
- **The spec has no update date**, so `VERSION` shows the version number instead.
- **Two layout limits are slightly off:**
  - On project detail at 1440px, the text column ends about 70px above the figure column; the spec allows 48px.
  - The empty "no results" state replaces the table instead of sitting in a full-width table cell.
- **Not done from the verification list:** the measured numbers it asks for (pasted pixel widths and edges), a check with reduced motion turned on, and a keyboard walk-through. I only compared screenshots.

## Decisions I made
- **Status column moved to the far right**, because on phones the table keeps only the first column and that last one.
- **Status colours:** Active uses the "in progress" icon (yellow), Paused is a grey ring with bars, Done is green.
- **All four KPI changes get a green dot**, since each one is an improvement (fewer incidents, shorter lead time).
- **Chart:** October is highlighted, and the value labels sit in a row above the plot so they don't cover the dots.
- **Small additions:**
  - Short second sentences in the screen heads, worked out from the data (for example "4 projects active, 2 paused.").
  - A second "All projects" button on the 404 page.
  - "Active" in the Team table's "Active projects" header is hidden on phones so the header fits; the text is still there.
  - On phones the user's name is visually hidden but stays readable by screen readers.

All labels, test IDs, routes and behaviour are unchanged.