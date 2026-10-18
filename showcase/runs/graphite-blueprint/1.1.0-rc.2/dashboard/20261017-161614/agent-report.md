Graphite Blueprint 1.1.0-rc.2 is now applied to every screen, in light and dark. The build passes, all 9 smoke tests pass, and the final screenshot run found no sideways scroll at 1440px or 390px.

## What changed
- **Tokens and fonts:** the package's `tokens.css` is imported as-is in `src/main.tsx`, not copied. Light is the default and dark follows the device setting. The old variable names still work and now point to the new tokens. Inter and Geist Mono are self-hosted (two new npm packages), so no font is fetched from the web.
- **Signature elements, built as reusable pieces:**
  - The recipe code lives in `src/signature/*.ts`, the components in `src/components/signature/`, and the recipe CSS in `src/styles/signature.css`.
  - The pieces are: stage (quiet and lit), dot glyph, dot meter, dot field, blueprint, spec plate, screen head and two-tone text, section opener, the shimmer/pulse/caret classes, and the global reduced-motion block.
  - Also new: 14px status icons, 16px line icons, and empty-state and error-state components.
- **Screens:**
  - **Every screen** has the new screen header: a mono label, the title, and a two-tone summary.
  - **Overview:**
    - KPI cards show a green or red dot for the change.
    - The chart is redrawn as dot columns on a quiet stage, with the current month highlighted. It ends level with the activity list beside it.
    - The activity list has avatars and mono timestamps.
    - The table has mono column heads, status icons with the word, filter chips and a search pill. On phones it shows only the name and status columns.
    - The empty filter result shows the 48px empty glyph.
  - **Projects:** the same table under its own header.
  - **Project detail:**
    - The status shows as a badge, and the tab underline slides between tabs.
    - The project's spec figure sits on a quiet stage with a FIG caption.
    - Tasks use the new checkboxes and a thin progress bar, and Files uses the new table.
  - **Team:** a dot meter shows each person's active projects. On phones only the number shows.
  - **Settings:** a full-screen empty state with a stacked blueprint.
  - **Not found and project not found:** a broken-connector blueprint on a quiet stage, "ERR 404", and two buttons.
- **Docs:** `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

## How I checked it
- **Every page:** I opened the screenshots at both widths in light and dark.
- **Uncaptured pages:** Settings and the two not-found pages aren't in the capture list, so I snapped them by path.
- **Signature pieces:** I checked them alone on a temporary review route. The blueprint figures measure 273px wide at the large size (the spec asks for at least 240), 145px at medium and 87px at small.
- **Motion:** loops and the chart entry use CSS animations, and the spec's global reduced-motion block stops them. I did not emulate reduced motion to watch it happen.

## What I couldn't apply
- **No commits.** Git wasn't in the commands I was allowed, so all changes are uncommitted in the working tree, not one commit per screen.
- **One leftover file:** I couldn't delete files with the allowed commands. `src/pages/ReviewPage.tsx` is now an empty stub that nothing imports; please delete it.
- **No working-state effects.** Shimmer, live edge, pulse and the button loading glyph exist as classes, but nothing in this app runs async work, and the spec allows them only while something really runs.
- **No settings groups.** Settings is still a placeholder, so there are no real controls to lay out as split rows.

## Decisions I made myself
- **Avatars** are 20px in rows and 24px in the header, not the spec's 16px, because two initials don't fit legibly in 16px.
- **KPI dots** treat a falling number as good for open incidents and lead time, so all four show green.
- **Activity rows** start with the person's avatar rather than a status icon, since the data has no status per event.
- **Detail figure caption:** the label inside the figure reads "No. 01 · Internal Platform", so it doesn't clash with the "FIG 0.1" caption below.
- **Pinned column on phones:** project status in Projects, file size in Files, the number in Team.
- **New copy:**
  - The mono header labels.
  - A summary line for Settings ("Workspace configuration for Northwind Ops.").
  - A second button on both not-found pages: "View projects" on the not-found page, "Go to overview" when a project isn't found.