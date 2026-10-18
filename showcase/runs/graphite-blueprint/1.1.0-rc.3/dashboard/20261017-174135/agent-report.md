Graphite Blueprint is now applied to every screen, in light and dark. The build passes, all 9 smoke tests pass, and the last full `pigment-snap` run found no sideways scroll. Routes, behavior, test ids, label text used by tests, and accessibility attributes are unchanged; `design-packages/` and `tests/` were not touched.

**What changed**
- **Setup:** I copied `tokens.css` in unchanged, and old variable names now point at the new tokens. Inter and Geist Mono are self-hosted from two font packages added to `package.json`; there are no other new dependencies. Light or dark follows the device setting. Root setup follows the spec, including the reduced-motion block.
- **Signature pieces:** each one is a reusable component in `src/components/signature/`, built to its recipe: stage, dot glyph and dot meter, blueprint, spec plate, shimmer/pulse/caret/live edge, and the screen and section headers. I checked them on a temporary route at 2x in both modes, then removed that route.
- **Shell:** a 240px sidebar with icons and mono group label. Below 1024px it becomes a row of text-only pills that wrap. The top bar is sticky and blurred, with a pill search and a ghost user-menu button; the menu opens as a popover.
- **Overview:** screen header, KPI cards, and the dot-column chart on a quiet stage that ends level with the activity list. Activity rows have status icons and mono timestamps. The projects table has mono column heads, status icon plus word, a filter pill row, and a 48px empty glyph for no results.
- **Projects / Team / Project detail:** each has a screen header. On Team, each person's active-project count gets a dot meter beside the number. Project detail has breadcrumbs, a status badge, text tabs with a sliding indicator, numbered mono details, 14px accent checkboxes and a restyled files table. Under 640px, tables show only the first and pinned columns.
- **Settings / Not found:** Settings shows a dimmed blueprint stack as its empty state. Page-not-found and project-not-found show a broken-connector blueprint on a quiet stage, `ERR 404`, and two pills.
- **Docs:** `design-system/` (VERSION, tokens, `components.md`) plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **Running glyphs, shimmer, pulse, live edge and spec plates aren't placed anywhere.** They're built, but the app has no real async work, streaming data or missing images, and the spec forbids faking a working state.
- **No commits.** The spec asks for one commit per screen, but I wasn't asked to commit, so everything is uncommitted on `main`.
- **No update date for VERSION.** The package doesn't state one, so I used today's date.
- **Not screenshotted:** the no-results empty state. Passing `?q=` through the snap tool got mangled by the shell and the capture showed the not-found page instead. The smoke tests confirm the empty state renders and works, but I haven't seen it.
- **Not measured:** blueprint widths weren't checked with `getBoundingClientRect`. From the CSS, the not-found drawing is about 273px at 1440px and about 230px at 390px; the Settings stack is about 146px.

**Decisions I made**
- I moved Status to the last column of the projects table and Size to the last column of the files table, because the column that stays pinned on phones has to be the last one.
- The Team load column's visible head is now "Projects", with "Active projects" kept for screen readers.
- The pinned column only sticks and shows its divider below 768px, so wide tables have no vertical rule.
- Row avatars are 20px instead of the spec's 16px, because two-letter initials didn't fit.
- KPI change dots are green for up and blue for down, because the data doesn't say which direction is good.
- In the chart, the current month (October) is the one highlighted column.
- On Settings I added a one-line summary in the header ("Workspace configuration. Managed by admins for now."). On the error pages I added a second pill ("All projects" / "Overview"), since the error state calls for two.