I've applied graphite-blueprint@1.2.0-rc.5 to every screen. The build passes, all 10 smoke tests pass, and nothing scrolls sideways at 1440px or 390px. I checked every screenshot in light and dark, plus `/settings` and the two not-found pages.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied unchanged into `src/styles/` and follows the device's light/dark setting. The old variable names now point at the new tokens. Inter and Geist Mono are bundled from npm packages I added to `package.json` (`@fontsource-variable/inter`, `@fontsource/geist-mono`), not loaded from a font CDN. The root setup, focus ring and reduced-motion block follow the spec.
- **Signature elements:** each one is a reusable piece in `src/components/signature/`, with the recipe CSS copied as-is into `src/styles/signature.css`:
  - stage and figure caption
  - dot glyph and dot meter
  - blueprint helpers, including a broken pair for error pages
  - spec plate
  - shimmer, live edge, pulse and caret
  - screen head and two-tone text
  - status icons
- **App shell:** a 240px sidebar that becomes wrapping text pills under 1024px, a sticky blurred header with a pill search field, and a popover user menu.
- **Overview:** a screen head, metric cards, the chart on a quiet stage drawn as dot columns at true scale (captioned FIG 0.1), and the activity panel ending level with it. Refresh shows a 16px scan glyph and a shimmering "Refreshing metrics" status line after 300ms.
- **Projects table and Team:** borderless tables with mono headers. Status shows as a 14px icon plus the word, and the sort chevron appears only on the sorted column. Under 640px only the first column and one pinned column show. The empty filter result shows the empty glyph and a two-tone sentence.
- **Project detail:** the project id as a mono label above the name, a status badge, tabs with a sliding indicator, restyled checkboxes, and a spec plate on a quiet stage captioned `FIG 01 · 4 PEOPLE`.
- **Settings and not found:** Settings shows a blueprint stack as its empty state. Both not-found pages show the broken-connector blueprint on a quiet stage with "ERR 404".
- **Also added:** `design-system/` (version, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` containing the pointer line.

I reviewed the signature pieces on a temporary route in light and dark and fixed one problem: the error glyph was tinting its unlit dots red. That route is removed.

**Not applied**
- **One commit per screen:** I made no commits. The changes are uncommitted on `main`.
- **Live edge, pulse and caret:** built, but nothing in the app is actually streaming or running, so the spec's "only while something really runs" rule leaves them unused.
- **Dot meter:** active-project counts stay plain numbers, as the spec says for ordinary counts.
- **Two pills on the error state:** the not-found pages keep their single existing link rather than gaining a second action.
- **44px touch targets:** controls stay at the spec's 32px sizes.

**Decisions I made myself**
- **Mono labels on screen heads:** "OCT 2026", "PORTFOLIO", "DIRECTORY", "WORKSPACE", and the project id on detail.
- **Metric change dots:** green or red depending on whether the change is good for that metric. Fewer incidents and shorter lead time count as good, so all four are green now.
- **Plate caption:** uses the number of distinct people assigned to tasks, the only attribute not already shown on that screen.
- **Status icons:** active uses the in-progress icon in amber, paused uses the ring with two bars in grey.
- **Sizes:** the header avatar is 24px, which the spec doesn't cover.
- **Team table on phones:** the pinned "Active projects" column hides its header from view (screen readers still get it) and shows "2 projects".
- **Settings:** treated as an empty state, since it has no controls.
- **Refresh delay:** kept the 1.5s mock delay because tests depend on it, even though the spec forbids artificial delays.