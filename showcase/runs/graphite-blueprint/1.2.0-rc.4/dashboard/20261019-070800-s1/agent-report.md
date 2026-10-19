I restyled the Northwind Ops dashboard with Graphite Blueprint 1.2.0-rc.4. The build passes, all 10 smoke tests pass, and the final screenshot run shows no page scrolling sideways at 1440px or 390px, in light or dark. Light and dark follow the device setting; there's no theme switch.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is an exact copy of the package tokens. The old CSS variable names in `base.css` now point to the new tokens. Inter and Geist Mono are self-hosted from two npm font packages (`@fontsource-variable/inter`, `@fontsource/geist-mono`), the only new dependencies. Global setup, a visible focus ring everywhere and the reduced-motion block are in place.
- **Signature pieces:** each is reusable, in `src/signature/` with styles in `src/styles/signature.css`.
  - the spotlit stage
  - the dot glyph and dot meter
  - the blueprint drawings, including a broken-connector version for error pages
  - the spec plate
  - the shimmer, live edge, pulse and caret
  - the screen head with mono label and two-tone summary

  I looked at each one enlarged on a temporary page in light and dark. The only fix needed was keeping plate captions on one line. The temporary page is removed.
- **Screens:**
  - **App shell:** sidebar with icons, and a sticky blurred header with a pill search. Below 1024px the sidebar becomes wrapping text pills.
  - **Overview:** metric cards; the throughput chart as dot columns on a quiet stage, lined up with the activity panel; the refresh button shows a 12px scan glyph while it runs.
  - **Projects table:** mono column heads, status icon plus word, filter chips, sort chevron on the sorted column only. At 390px it shows only the name and status columns. The empty result shows the 48px empty glyph.
  - **Project detail:** breadcrumb, mono ID above the name, status badge, sliding tab indicator, indigo checkboxes, and a spec plate on a quiet stage (caption `FIG 01 · 4 PEOPLE`).
  - **Team:** table with 16px avatars; the active-projects number stays visible on mobile.
  - **Settings placeholder:** empty state with a blueprint stack.
  - **Both not-found pages:** "ERR 404" with the broken-connector drawing on a stage.
- **Docs:** `design-system/` (`VERSION`, `components.md`, a pointer to the tokens) and `AGENTS.md` / `CLAUDE.md` with the pointer line.
- **Measured:** right-aligned table heads end exactly on their cells' right edge: 1408px at desktop, 370px on mobile.

**What I couldn't apply**
- **Refresh delay:** the spec forbids artificial delays to show a working state, but the 1.5s refresh delay is existing behavior the tests depend on, so I kept it.
- **No commits:** the spec asks for one commit per screen, but git wasn't among the commands I was allowed to run. Everything is uncommitted.
- **Shimmer, live edge and pulse are built but not placed:** nothing in the app actually runs or streams.
- **No version date:** the package gives no release date for `VERSION`, so I wrote the date I applied it.
- **Touch targets:** filter chips and nav pills are 32px tall, not padded out to 44px.

**Decisions I made**
- **Column order:** in the projects table, Status moved to the last column, because the spec's pinned column has to sit at the right edge. In the files table, Size is the pinned column and is now last.
- **Pinned column rule:** its left rule and fade only show between 640 and 767px, where the table can scroll. Elsewhere it would be a vertical rule, which tables shouldn't have.
- **Mono labels:** I picked short labels above each title: "OCT 2026", "OPERATIONS", "DIRECTORY", "WORKSPACE", and "PROJECT · id". The empty states got "NO RESULTS" and "NOT CONFIGURED".
- **Two-tone summaries:** I kept the existing summary text and split each sentence into a primary part and a secondary part, rather than rewriting it.
- **Metric dots:** green for an upward change, grey for a downward one. The data doesn't say which direction is good, and before this the downward changes showed in red.
- **Avatars:** the header avatar is 24px, a size the spec doesn't name. Row avatars use 7px initials, because the spec's 11px doesn't fit two letters in 16px.
- **Plate caption:** "4 PEOPLE" counts the distinct people assigned to tasks, a fact that isn't shown anywhere else on the page.
- **Settings:** I treated the placeholder as a full-screen empty state, since it has no controls to lay out as settings rows.