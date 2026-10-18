Graphite Blueprint is now applied to every screen: Overview, Projects, Project detail, Team, Settings and both not-found states. The build passes, all 9 smoke tests pass, and the final screenshot run (1440px and 390px, light and dark) shows no sideways scroll. Every route, `data-testid`, label text, form field and ARIA attribute is kept.

**What changed**
- **Tokens and fonts:** I copied the package's `tokens.css` into `design-system/tokens.css`. The old CSS variable names now point at the new tokens. Inter and Geist Mono load from two npm font packages added to `package.json` (no font CDN). Light and dark follow the device setting.
- **Signature pieces:** each one is a reusable component in `src/design/`, with its recipe CSS in `src/styles/signature.css`:
  - `Stage` (spotlit and quiet)
  - `DotGlyph` and `DotMeter`
  - blueprint functions plus a broken-connector drawing for errors
  - `SpecPlate`
  - shimmer, live edge, pulse and caret styles
  - `ScreenHead`, `TwoTone`, `SectionHead`, empty and error states, status icons

  The spinning and moving parts stop on a readable frame under reduced motion. I checked every piece on its own in both themes on a temporary route, which I then removed.
- **Shell:** graphite sidebar with mono group label and icons, which becomes wrapping text-only pills on narrow screens. The header is sticky and blurred, with a pill search. The user menu opens as a popover.
- **Overview:** each screen now opens with a header (mono label, title, two-tone summary). The KPI cards have mono labels and a pulsing dot on uptime. The deployments chart is now dot columns on a quiet stage and ends level with the activity list. Projects table:
  - status filter as segmented pills
  - status shown as an icon plus the word
  - mono dates and right-aligned numbers
  - on phones only the first column and the status column show
  - the empty-results state uses the dot glyph
- **Project detail:** sliding tab indicator, numbered detail rows, restyled native checkboxes and progress bar, and the files table with a pinned size column.
- **Team:** a dot meter sits beside each active-project count.
- **Settings and not-found:** the Settings placeholder shows a blueprint stack. Both not-found pages show the broken-connector drawing on a quiet stage with "ERR 404".
- **Docs:** I added `design-system/VERSION` and `components.md`, plus `AGENTS.md` and `CLAUDE.md` pointing to them.

**What I couldn't apply**
- **One commit per screen:** git wasn't in the allowed commands, so nothing is committed.
- **Measuring blueprint widths in the browser:** the spec asks for real measured numbers, and I had no way to run that measurement. By construction the drawing fills 91% of its box, about 273px at 300px and about 146px at 160px.
- **Spec plates:** the component is built and checked, but no screen shows item images, so it isn't used anywhere.
- **Running glyphs, shimmer and live edge:** nothing in this mock-data app actually runs, and the spec only allows them while something does. So only the still "empty" glyph appears on a screen.
- **16px row avatars:** they follow the spec size, but two-letter initials at 11px are cramped in them.

**Decisions I made myself**
- **Status column moved to the end** of the projects table. The spec pins a column to the right edge on small screens, and Status is the column it calls for, so it has to be last.
- **KPI change dot:** green for an "up" trend, neutral grey for "down". The data doesn't say whether a change is good or bad, and fewer incidents shouldn't show red.
- **Current month highlighted** in the chart, with a small "OCT · CURRENT" legend.
- **Pulsing dot on the uptime card**, treating uptime as a "system operational" signal.
- **Avatar sizes:** 24px in the header and activity list, between the spec's 16px and 32px sizes.
- **Pinned column scope:** it only sticks to the right edge on screens narrower than 768px, so wide screens get no vertical line.
- **Error states are 480px wide** rather than 360px, so the stage fits a full-size drawing.
- **New text on the Settings header:** "Workspace configuration. Managed by admins for now." The original page had no summary line, so this wording is mine.
- **New links on the not-found pages:** "View projects" on the main one and "Go to overview" on project-not-found, to give the error state its two buttons.