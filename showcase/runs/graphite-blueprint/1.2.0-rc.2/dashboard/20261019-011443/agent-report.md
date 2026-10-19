Graphite Blueprint 1.2.0-rc.2 is applied to every screen in light and dark. The build passes and all 10 smoke tests pass. I compared the final screenshots with the spec at 1440px and 390px in both themes, and no page scrolls sideways.

**What I changed**
- **Tokens and fonts:** `src/styles/tokens.css` is a verbatim copy of the package's token file, and it follows the device's light/dark setting. The old CSS variable names in `base.css` now point at the new tokens. Inter and Geist Mono are self-hosted through two new font packages added to `package.json` (`@fontsource-variable/inter`, `@fontsource/geist-mono`), so there's no font CDN. The global setup includes keyboard focus outlines, the reduced-motion block and clipping of sideways overflow.
- **Signature elements:** each is a reusable piece in `src/design/`, with its CSS copied from the recipe into `src/styles/signature.css`. They are the spotlit stage, the dot glyphs and dot meter, the isometric blueprints, the spec plate, the shimmer / live dot / caret / live edge, and the screen head, section head and opener. There is also a shared empty state and an icon set. Before removing the temporary review route, I looked at each piece alone in both themes.
- **Screens:**
  - **Overview:** screen head, metric cards, and the throughput chart on a quiet stage with its bars drawn as dot columns. The latest month is highlighted, and the chart columns animate in on first view. The activity panel's bottom edge lines up with the chart's. While refreshing, the button shows a 12px scan glyph and a shimmering "Refreshing metrics" status line appears.
  - **Projects and Team:** tables to the spec, with mono head labels, dates in mono, status icon plus word, and right-aligned numbers. On narrow screens one column stays pinned; at 390px only the first and pinned columns show. Head and cell right edges match, both ending at x 1020 (measured with `getBoundingClientRect`).
  - **Project detail:** a spec plate on a quiet stage captioned `FIG 01 · 4 PEOPLE`, the project's mono meta over its name, tabs with a sliding indicator, custom checkboxes, and a styled files table.
  - **Settings:** an empty state with a three-slab blueprint stack.
  - **Not found and unknown project:** a broken-connector blueprint on a quiet stage, `ERR 404`, and two pill buttons.
  - **Layout:** a 240px sidebar that turns into wrapping text-only nav pills below 1024px, a sticky blurred top bar, a pill search field and a popover user menu.
- **Docs:** `design-system/` (`VERSION`, `components.md`) plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

All routes, labels, form fields, `data-testid`s and accessibility attributes are preserved.

**Could not apply**
- **Artificial loading delay:** the spec forbids delays that exist only to show a working state, but the 1500ms refresh delay is what the smoke tests check, so I kept it.
- **No commits:** the spec asks for one commit per screen, but git wasn't among the commands I was allowed to run. All changes are uncommitted.
- **Tokens in `design-system/`:** the token file lives in `src/styles/tokens.css` and is referenced from `components.md`, not copied into `design-system/`.
- **Page close and dot field:** not used, because no page ends in a final action.

**Decisions I made**
- **Column order:** Status moved to the last column in the projects table, and Size to last in the files table, so the pinned column sits at the right edge.
- **Team narrow screens:** below 640px the "Active projects" heading is hidden from view and each value shows its unit ("2 projects").
- **Metrics:** shown as separate cards rather than a hairline grid. A hairline grid would have put a second rule right under the screen head's rule, which the spec forbids.
- **KPI change dots:** up is green and down is red, keeping the original colour logic even though fewer incidents is good news.
- **Status icons:** active uses the in-progress icon, paused the ring with two bars, done the check.
- **Plate caption:** uses the number of people assigned to tasks, the only attribute not already shown on the screen.
- **Font name:** the variable Inter registers as "Inter Variable", so I put that name in front of the token's font list.
- **Pinned column scope:** it only sticks below 768px, so no vertical rule appears on desktop.
- **Labels kept as-is:** "Refreshing…" stays as written, and the header avatar is 16px, matching the size the spec gives for rows.