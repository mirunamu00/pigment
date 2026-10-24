I've applied Graphite Blueprint 1.2.0-rc.1 to every screen. The build passes, all 10 smoke tests pass, and no page scrolls sideways at 1440px or 390px in light or dark. I didn't make any commits, because `git` isn't among the commands you allowed, so everything is uncommitted in the working tree.

## What I changed
- **Foundation:**
  - `design-system/tokens.css` is a verbatim copy of the spec's tokens and is loaded first.
  - The old variables in `src/styles/base.css` now point at the new tokens.
  - Inter and Geist Mono are self-hosted from two npm font packages added to `package.json`. No font CDN is used.
  - Light and dark follow the device setting.
  - Every animation stops under reduced motion, using the spec's block.
- **Signature elements**, each a reusable piece in `src/design/`: the stage, the dot glyph (all six patterns and the dot meter), the blueprints, the spec plate, the shimmer and live pieces, and the screen head. Their recipe CSS is in `src/styles/signature.css`.
- **Screens:**
  - **Overview:** the deployments chart is now dot columns (October highlighted) on a quiet stage, level with the activity card. The metric cards have mono labels and status dots. While refreshing, the button shows a 12px scan glyph and the cards show static grey bars.
  - **Projects table (Overview and Projects):** mono column heads and dates, status shown as icon plus word, filter as a segmented pill, and a dot glyph in the "no results" state.
  - **Project detail:** client as a mono label over the name, a status badge, the project's generated plate (`NO. 01 · ACTIVE`) on a quiet stage, a sliding tab underline, and restyled checkboxes, progress bar and files table.
  - **Team:** table with small avatars.
  - **Settings:** an empty state with a three-layer blueprint.
  - **Not found and unknown project:** a broken-connector blueprint on a quiet stage, `ERR 404`, and two buttons.
  - **Shell:** a 240px sidebar that becomes wrapping pills below 1024px, a sticky blurred header with a pill search, and a popover user menu.
- **Docs:** `design-system/VERSION`, `design-system/components.md`, `AGENTS.md` and `CLAUDE.md`.

**Measurements** (on-screen boxes from `pigment-snap --measure`):
- Overview chart and activity panels both end at y=738.
- Project detail text column and stage both end at y=610.
- Right-aligned table heads end at the same x as their cells: Budget at 1035, Status at 1408.
- The Settings blueprint drawing fills 145 of its 160px (91%); on mobile the Not found drawing fills 193 of 212px (91%). The spec requires at least 85%.

I also checked each signature piece on its own in both themes by temporarily editing the Not found page, and that edit is removed.

## What I couldn't apply
- **A stray file:** `src/design/Blueprint.tsx` is now an empty stub you can delete. On Windows it clashed by letter case with `blueprint.ts`, and I can't delete files with the allowed commands.
- **Unused signature pieces:** the shimmer, live edge, pulse, lit stages, section openers and dot field are built but not used. Nothing in this app streams or runs in the background, and the spec says to use them only while something really runs.
- **Built-in delay:** the 1.5s mock refresh delay stays because the tests depend on it. The spec forbids artificial delays.

## Decisions I made
- I moved the Status, Size and Active projects columns to the right edge so they can be the pinned column on small screens. On phones the Team head reads "Projects"; its full text is still "Active projects".
- Small wording changes:
  - The detail summary now reads "Owned by … Due …", with the client moved into the label above the name.
  - I added a second button, "View projects" or "Go to overview", to the error pages.
  - The loading label is still "Refreshing…" (the spec's style would drop the ellipsis).
- I kept the existing red/green colouring of the KPI changes, even though falling incidents and lead time are good news shown in red.
- Avatar sizes: 24px in the header (the spec only gives 16 and 32) and 7.5px initials in the 16px table avatars so they fit.
- Spacing:
  - Quiet stages keep 20px padding on all sides on mobile; the recipe would drop the bottom padding.
  - The thin divider beside the pinned column only appears between 640 and 768px.
  - I used 2026-10-19 (the package changelog date) as the "updated" date, since the spec doesn't give one.