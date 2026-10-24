Graphite Blueprint 1.1.0-rc.6 is now applied to every screen, in light and dark. The build passes, all 9 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I checked every screenshot against the spec in both widths and themes.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied unchanged to `design-system/tokens.css`. Light is the default and dark follows the device; I didn't add a theme switch because the product has none. The old variable names at the top of `src/styles/base.css` now point at the new tokens. Inter and Geist Mono are self-hosted from two font packages I added (`@fontsource-variable/inter`, `@fontsource/geist-mono`), with no font CDN.
- **Signature pieces, built as reusable parts:**
  - the stage (normal and quiet) and the screen head with its two-tone summary
  - the dot glyph (all six patterns) and the dot meter
  - the isometric blueprint helpers, plus a "broken connection" drawing ending in one red point
  - the spec plate with its eight generated figures
  - shimmer, live edge, pulse and caret, as styles only
  - the global reduced-motion block, so every loop stops on its resting frame
- **Screens:**
  - **Overview:** KPI cards in a hairline grid; the deployments chart redrawn as dot columns on a quiet stage, ending level with the activity card; the projects table restyled to the spec.
  - **Projects:** the same table under its own screen head.
  - **Project detail:** text tabs with a sliding indicator, details rows numbered in mono, the project's spec figure on a quiet stage, styled checkboxes and progress bar, and a files table.
  - **Team:** each person's active-project count shown as a dot meter beside the number.
  - **Settings:** an empty state with a blueprint stack.
  - **Not found and project not found:** the error variant with the broken-connection drawing and two buttons.
- **Shell:** sidebar with icons; below 1024px it becomes wrapping text pills. Sticky blurred top bar, pill search fields and the popover user menu.
- **Docs:** `design-system/VERSION` and `components.md` (conventions, where each piece is used, and my decisions), plus `AGENTS.md` and `CLAUDE.md` with the pointer line. README updated.

All routes, labels, form fields, `data-testid`s and ARIA attributes are kept. I made two structural changes: the Projects table's Status column moved to the last position, and pages other than Overview now load on demand.

**What I couldn't apply**
- **No commits.** The spec wants one commit per screen, but git wasn't among the commands I was allowed to run. Everything is uncommitted in the working tree.
- **An alias file I couldn't delete.** `blueprint.ts` and `Blueprint.tsx` collide on Windows because names ignore case. Without `rm` or `mv`, I moved the component into `blueprint.ts` and left `Blueprint.tsx` as a two-line re-export.
- **Shimmer, live edge and pulse don't appear anywhere.** The spec allows them only while something really runs, and nothing in this app streams or runs in the background. They're ready as styles for when something does.
- **Dot-glyph loops are rarely seen.** The only real working state is route loading, which shows the scan glyph after 300ms while a page's code loads. That is usually too fast to notice.
- **Not checked in screenshots:** the Tasks and Files tabs, the open user menu and the focus outlines, because the snapshot tool only captures pages as they first load. The tests cover their behaviour.
- **The spec's measured-numbers report:** I checked alignment by eye against the 48px tolerance instead of measuring each element.

**Decisions I made myself**
- KPI change dots are green when the change is an improvement; open incidents and lead time count as improving when they fall.
- Avatar initials in the 16px circles are 7px instead of the spec's 11px. At 11px they spilled outside the circle.
- The sticky pinned-column styling only applies below 768px, where the table actually scrolls. On desktop it would read as a vertical rule, which the spec forbids.
- Mono labels over the page titles ("Dashboard · Oct 2026", "Portfolio", "Directory", "Workspace", the project id), and new summary copy for Settings.
- On touch screens, controls get an invisible hit area that brings them to 44px tall.
- The temporary review block I used to check the signature pieces on their own is removed.