I've applied Graphite Blueprint 0.1.0-rc.2 to all six routes. The build passes, the 9 smoke tests pass, nothing scrolls sideways, and I checked every screenshot at 1440px and 390px in light and dark. Every route, label, form field, `data-testid` and accessibility attribute is unchanged. The changes are **not committed**: git isn't among the commands you allowed and the commit call was declined. The work is in the working tree, ready to commit in four parts (tokens, signature pieces, screens, docs).

**What changed**
- **Tokens and root:** `tokens.css` is copied unedited into `src/styles/`. The old variables in `base.css` now point at the new tokens, so nothing broke mid-way. Light and dark follow the device setting. Inter and Geist Mono load from Google Fonts. Reduced motion is handled globally, and `overflow-x: clip` is set.
- **Signature pieces** (in `src/components/signature/` and `signature.css`, built from the spec's recipes):
  - Lit and quiet stage, with figure captions.
  - Dot glyph with all six patterns, dot meter and dot field.
  - Isometric blueprint pieces (slab, connector, a layer stack, a broken route).
  - Spec plate, plus the shimmer, live edge, pulse and caret styles.
  - Screen header and section opener.
  - Status icons and dots, empty state.
- **Shell:** a 240px sidebar with icons, which becomes a scrolling pill row under 1024px. A sticky blurred header with a pill search. The user menu is now a popover.
- **Overview:** screen header, KPI cards with mono labels and coloured status dots, and the throughput chart redrawn as dot columns on a quiet stage (still readable by screen readers). Activity has mono timestamps. The table has mono headers, status icons, filter chips and hairline rows.
- **Projects and Team:** screen headers and tables with no outer box. Under 768px, cells don't wrap and the Status column stays pinned while the table scrolls inside its wrapper. Team shows a dot meter for active projects.
- **Project detail:** breadcrumb, header with a status badge, and tabs with a sliding underline. The overview tab shows a figure generated from the project id on a quiet stage, with a "FIG 01" caption. Task checkboxes are still native inputs, now styled.
- **Empty filter results, Settings, not-found and unknown project:** proper empty states (dot glyph, dimmed layer stack, or a broken-connector drawing with "ERR 404" and two buttons).
- **Docs:** added `design-system/` (`VERSION`, tokens, `components.md`), plus `CLAUDE.md` and `AGENTS.md` pointing to it.

**What I couldn't apply**
- **Running animations aren't used anywhere.** The app has no real background work, and the spec forbids motion for work that isn't happening. That covers the animated dot glyphs, shimmer, live edge, pulse and caret. They're built, and I checked them on a temporary page, but no screen shows them. The temporary page is removed.
- **No lit stage, opener or dot field.** The app has no landing or content sections, which is where the spec puts them.
- **Settings stays a placeholder.** There are no real settings, so it's an empty state rather than the spec's grouped settings rows.

**Decisions I made**
- **Avatars are 24px, not the spec's 16px.** Two initials at 11px don't fit in 16px.
- **On narrow screens (under 640px), KPI values drop from 32px to 24px** so values like "2.4 days" fit in two columns.
- **KPI dot colours come from a small mapping I added.** For incidents and lead time, a falling number counts as good.
- **The latest month (Oct) is the chart's one highlighted column.**
- **The error-page drawing sits directly on the stage,** with no window frame around it.
- **I added two links to the error pages.** The spec's error state needs two buttons, so the 404 page also links to "All projects" and the unknown-project page to "Go to overview". All existing link text is kept.
- **New wording is limited to labels and summaries:**
  - Short mono labels in the screen headers ("Dashboard · Oct 2026", "PRJ-01").
  - A one-line Settings summary.
  - The detail figure caption ("Runs for the … group").
  - Empty-state labels ("No results", "Not yet available").

  Existing sentences were only split into two tones, with their text unchanged.