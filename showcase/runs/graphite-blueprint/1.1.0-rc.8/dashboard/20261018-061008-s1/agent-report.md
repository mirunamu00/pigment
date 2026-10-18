I applied graphite-blueprint 1.1.0-rc.8 to all six screens, in both light and dark. The build passes, all 9 smoke tests pass, and the final screenshot run reports no sideways scroll at 1440px or 390px in either theme. I checked every PNG; the last round of fixes was the user menu crowding the search field on mobile, the sidebar background stopping at the viewport height, chart value labels sitting on the dots, and the 404 stage not spanning the page.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package's `tokens.css`. I wrote it out by hand rather than copying the file, because `cp` and `diff` weren't among the commands I was allowed to run, and I didn't compare it against the original afterwards. It is imported first. The old CSS variable names in `src/styles/base.css` now point at the new tokens. Inter and Geist Mono are self-hosted from two npm font packages I added to `package.json`. Light and dark follow the device setting.
- **Signature elements** are reusable pieces in `src/components/signature/`, with their CSS in `src/styles/signature.css`: stage, dot glyph and dot meter, blueprint, spec plate, shimmer/live edge/pulse/caret, and screen heads.
- **Screens:**
  - Every screen opens with a screen head: mono label, h1, and a two-tone summary.
  - **Overview:** KPI cards; a dot-column chart on a quiet stage, level with the activity card; the table restyled.
  - **Projects:** the table with sorting chevrons, status icons and a pinned column, plus the empty-state glyph.
  - **Project detail:** breadcrumb, screen head with the mono id and a status badge, a sliding tab indicator, a wide spec plate captioned "FIG 01 · WAVE" beside numbered key-value rows, accent checkboxes, and the files table.
  - **Team:** a dot meter for each person's project load.
  - **Settings:** an empty state with a blueprint stack.
  - **Not found / unknown project:** the error variant, with a broken-connector blueprint on a quiet stage.
- **Motion:** the chart columns scale in, the tab indicator slides and the menu fades in. Everything stops under reduced motion.
- I viewed the signature pieces on a temporary route in both themes, then removed it. `App.tsx` is back to its original content.
- I added `design-system/` (`VERSION`, `components.md`) and `AGENTS.md`/`CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but git wasn't in the allowed commands, so everything is uncommitted.
- **Shimmer, live edge, pulse and running glyphs** are built but not on any screen. Nothing in this mock app actually runs, and the spec forbids faking a working state.
- **44px touch targets:** controls keep the spec's 28–32px pill sizes.
- **Measurements:** I didn't do the spec's getBoundingClientRect measurements. My checks were visual only.

**Decisions I made**
- **Pinned column moved last:** Status in the projects table and Size in the files table now sit at the end, so the sticky column works while the table scrolls. Column labels are unchanged.
- **Status icons:** "Active" uses the in-progress icon (yellow half ring). "Paused" uses the idle grey, because the spec gives that icon no colour.
- **KPI dots:** they show whether a change is good, so falling incidents and lead time get a green dot. The old styling coloured every decrease red.
- **Avatars:** I used 24px in the user button, a size between the spec's 16px and 32px. The user's name is hidden visually under 640px but stays in the button's accessible name.
- **Filter label:** "Filter projects" stays visible beside the search pill rather than above it.
- **Status filter:** styled as segmented pills, keeping its `aria-pressed` buttons.
- **Checkbox tick:** an inline SVG with a fixed `#FFFFFF`, since the spec's "on accent" colour is white in both themes.
- **Not-found pages:** each has a second pill, "View projects" or "Go to overview", because the error variant calls for two.
- **Plate caption:** uses the figure kind, which follows the spec's own fallback.