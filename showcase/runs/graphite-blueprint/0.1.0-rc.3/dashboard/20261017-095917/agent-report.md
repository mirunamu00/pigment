I've restyled the whole app to graphite-blueprint 0.1.0-rc.3, in both light and dark (it follows the device setting). The build passes, all 9 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I checked the screenshots of every page, plus Settings and the 404 page, which aren't in the default set.

**What changed**
- **Tokens and fonts:** `tokens.css` and `tokens.json` are copied unchanged into `design-system/`, with `VERSION` and `components.md`. Inter and Geist Mono load from Google Fonts. `AGENTS.md` and `CLAUDE.md` now point to `design-system/`.
- **Root styles:** `src/styles/base.css` is rewritten onto the tokens. It has the global focus outline, the reduced-motion block, and hover styles only for mouse pointers.
- **Signature pieces,** built to their recipes as reusable parts in `src/design/`:
  - the stage (lit and quiet)
  - the dot glyph with all six patterns, plus the dot meter and dot field
  - the isometric blueprint: a slab stack, a broken connector, and a connected pair with marching dashes
  - the spec plate with `specKinds`
  - the shimmer, live edge, pulse and caret classes
  - the screen head and mono labels

  Every loop stops on a readable frame under reduced motion.
- **Shell:** a grey sidebar with icons and a mono group label, which becomes a scrolling pill row below 1024px. The header is sticky and blurred, with a pill search field, and the user menu opens as a raised popover.
- **Overview:** screen head, KPI cards with mono labels and status dots, and the throughput chart redrawn as dot columns on a quiet stage that ends level with the activity list. Activity rows have small avatars and mono timestamps.
- **Projects table:** mono column heads, status icon plus word, segmented filter pills, and a 48px empty glyph with "NO RESULTS" when nothing matches. On phones the table scrolls inside itself with the status column pinned, and Owner moves under the project name.
- **Project detail:** breadcrumb, screen head with a status badge, tabs with a sliding indicator, a hairline details grid, a spec plate for the project, styled checkboxes and progress bar, and the files table.
- **Team:** 32px avatars, a dot meter for active projects, and the same phone treatment (pinned last column, Location moves under the name).
- **Settings:** an empty state with a dimmed slab-stack drawing.
- **Not found and project not found:** a broken-connector drawing on a quiet stage with "ERR 404" and two buttons.

Before the screens, I looked at each piece on its own at 2x on a temporary route, which I then deleted. That check led to two fixes: the sidebar background now runs the full page height, and the chart keeps its track dots clear of the value labels.

**What I couldn't apply**
- **Motion signatures:** the scan, rise and core loops, shimmer, live edge and pulse are built but not placed anywhere. Nothing in the app does real background work or streams data, and the spec forbids fake working states.
- **Split-row settings groups and the closing statement over the dot field:** neither fits. Settings is still a "coming soon" placeholder, and the closing statement is for content pages.
- **Separate commits per screen:** the spec asks for them, but I made no commits because you didn't ask for any. Everything is uncommitted in the working tree.

**Decisions I made myself**
- **Status icons:** Active shows as "in progress" (amber half ring), Paused as a grey ring with two bars, and Done as a green check.
- **KPI dots:** all four are green, because every change shown is an improvement.
- **Column order:** Status moved to the last column of the projects table so it can be the pinned column on phones. No test depends on column order.
- **Due dates and file dates:** mono, but in the secondary grey rather than the faintest tertiary grey, because the spec says not to use tertiary for anything essential.
- **Avatar sizes:** 32px in the team table, since people are what that table is about, and 16px elsewhere.
- **Detail values:** shown at 20px weight 510; the spec doesn't give a size for them.
- **New copy and buttons:** I wrote short mono labels and one-line summaries for each screen head. I added a second button to the not-found states ("View projects", and "Go to overview" on project not found), because the spec's error state has two. All existing labels, test ids and accessibility attributes are unchanged.