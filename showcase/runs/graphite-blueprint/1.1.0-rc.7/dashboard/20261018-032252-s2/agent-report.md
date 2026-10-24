Every screen now uses Graphite Blueprint 1.1.0-rc.7 in both light and dark. The build passes, all 9 smoke tests pass, and the screenshot tool reports no page wider than the viewport at 1440px or 390px. I looked at every screenshot in both widths and both modes.

## What I changed

- **Tokens and fonts:** the spec's `tokens.css` is copied exactly into `design-system/tokens.css`. The old variable names in `base.css` now point to the new tokens, and the old link blue became the dark/light "inverse" button, not the indigo accent. I added two npm font packages (`@fontsource-variable/inter` and `@fontsource/geist-mono`), so the fonts are served from the app, not a font CDN. Light and dark follow the device setting. The root setup and the reduced-motion block follow the spec.
- **Signature elements**, each built once and reused, in `src/components/signature/`: the spotlit stage, the dot glyph (plus the dot meter and dot field), the isometric blueprint, the spec plate, the live elements (shimmer, pulse, caret, live edge), and the screen and section heads. I rendered them all on a temporary page in light and dark and they matched the recipes; that route and file are removed.
- **Screens:**
  - **App shell:** sidebar with mono group label and icons, which becomes wrapping text pills below 1024px. The top bar is sticky and blurred, with a pill search and a popover user menu.
  - **Overview:** screen head, KPI cards with mono labels, and the chart redrawn as dot columns on a quiet stage. The chart is level with the activity list beside it. The uptime KPI's dot pulses.
  - **Projects table:** hairline table with mono head, a sort chevron only on the sorted column, and segmented filter pills. Below 640px it shows only the name (with client underneath) and status. The no-results state shows the 48px empty glyph.
  - **Project detail:** the project's spec figure on a quiet stage with a `FIG 01 · $240K BUDGET` caption, numbered detail rows, and text tabs with a sliding underline.
  - **Team:** each person's active-project count shows as a dot meter beside the number.
  - **Settings:** an empty state with a two-slab blueprint whose connector animates.
  - **Not found and project not found:** the error variant, with a broken-connector blueprint on a quiet stage, "ERR 404" and two buttons.
- **Docs:** `design-system/` has `VERSION`, `tokens.css` and `components.md`, which records where each element is used and my decisions. `AGENTS.md` and `CLAUDE.md` contain the pointer line.

Every route, `data-testid`, label text and accessibility attribute is kept.

## What I couldn't apply

- **No commits.** The spec asks for one commit per screen, but `git` wasn't on the list of commands you allowed, so everything is uncommitted in the working tree.
- **No looping glyphs or shimmer on screen.** Nothing in this app loads or runs asynchronously, and the spec forbids showing a working state without real work. The components are built and tested; the motion you'll see is the uptime pulse, the Settings connector, the chart's entry animation, the tab underline and hover/press states. All of it stops under reduced motion, but I checked that in the CSS only; the screenshot tool can't emulate reduced motion.
- **Not done:** the spec's pixel-measurement report and a manual Tab-through pass. Landing-page pieces (lit hero stage, openers, row of three blueprints, closing statement) have no page in this app to go on.

## Decisions I made

- I moved the Status column to the end of the Projects table and Size to the end of the Files table, because the spec puts the pinned column last.
- Team's last column heading reads "Active projects" on wider screens and "Load" on phones; screen readers always hear "Active projects".
- The pinned column's sticky edge and its thin left border only appear where the table can scroll sideways, so desktop tables have no vertical lines.
- I added short screen-head labels ("Dashboard · Oct 2026", "Portfolio", "Directory", "Workspace", or the project id), one Settings summary line, and a second "View projects" button on the 404 page.
- KPI change dots are green when the change is good, so a drop in incidents or lead time counts as good.
- Settings uses the two-slab blueprint (for its future integrations) rather than the spec's default stack drawing.
- The detail rows are numbered with CSS rather than extra markup, which keeps the details list valid HTML.