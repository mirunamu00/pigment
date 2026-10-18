I've applied graphite-blueprint 1.1.0-rc.8 to all six screens: Overview, Projects, Project detail, Team, Settings and Not found. The build passes, all 9 smoke tests pass, and the final screenshot run (1440px and 390px, light and dark) reports no sideways scroll. I made no git commits because git wasn't one of the commands I was allowed to run, so the spec's "one commit per screen" step is still open.

**What changed**
- **Foundation:** the design package's `tokens.css` is imported unedited through `design-system/tokens.css`. Old variable names now point at the new tokens. Inter and Geist Mono are self-hosted from npm font packages (no font CDN). Light and dark follow the device setting, and there's a global reduced-motion rule plus a global focus outline.
- **Signature pieces**, as reusable components in `src/components/ds/`:
  - **Spotlit stage** (`Stage.tsx`): Overview's deployments chart sits on a quiet stage, level with the activity list beside it.
  - **Dot-matrix glyph and dot meter** (`DotGlyph.tsx`): the loading indicator, the 48px empty glyph in the projects empty state, and dot meters for each person's active projects on Team.
  - **Isometric blueprint** (`Blueprint.tsx`): a slab stack on Settings, and a broken connector ending in a small red point on both "not found" states.
  - **Spec plate** (`SpecPlate.tsx`): each project's detail page leads with a wide figure keyed to its id, captioned like `FIG 01 · WAVE`, beside numbered `01`–`04` detail rows.
  - **Shimmer and live indicators:** the loading word shimmers.
  - **Screen head** (`ScreenHead.tsx`): every screen gets a mono label, the h1 and a two-tone summary line.
- **Components:** pill buttons, search fields, native checkboxes styled to spec, status icon plus word, badges, segmented filter pills, and tabs whose indicator slides. Tables follow the spec, and on phones they show only the first column and the pinned one. The user menu is now a popover, and the header is sticky with a blur.
- **Chart:** bars are drawn as columns of dots with a staggered entry animation.
- **Motion:** every animation stops under `prefers-reduced-motion: reduce`.
- **Docs:** added `design-system/` (VERSION, tokens, components.md) and `AGENTS.md` / `CLAUDE.md` pointing to it.

I reviewed the signature pieces on their own on a temporary page and route, then deleted both.

**What I couldn't apply**
- **Few live loops:** nothing in this app is genuinely running or streaming, so the scan glyph and shimmer only appear if a page takes over 300ms to load. The live dot and pulse exist as components but aren't placed anywhere, and no blueprint connector animates (a broken connection is static by spec). Inventing activity would break the spec's "only while something really runs" rule.
- **Settings has no real settings,** so the settings-group layout and plan slabs had nothing to apply to; I treated the page as an empty state.
- **The spec has no update date,** so `design-system/VERSION` records the version number instead.
- **The 16px avatar size didn't fit.** Two initials overflow a 16px circle, so row avatars are 20px.

**Decisions I made myself**
- Pages now load as separate chunks, which gives the route-loading glyph a real job. Behaviour is otherwise unchanged.
- I moved the pinned column to the end of each table:
  - **Projects:** Status is now last.
  - **Files:** column order is name, last updated, then size.
  - **Team:** the last header shows "PROJECTS" on phones and keeps the full "Active projects" for screen readers.
- KPI change dots are coloured by whether the change is good: up is good for deployments and uptime, down is good for incidents and lead time. Before, every "down" was red.
- I added a second button to the error pages because the spec asks for two ("View projects" on Not found, "Go to overview" on project not found). I also wrote short new copy for the screen-head labels and the Settings summary.
- The light-gradient token uses the self-hosted font's registered name, "Inter Variable", put in front of the token's font list.
- On touch screens, controls get an invisible extension to reach 44px tall instead of extra visible padding.

To check: in screenshots the chart's dot columns look slanted at the top. That's the staggered entry animation being caught mid-way; the finished bars are flat.