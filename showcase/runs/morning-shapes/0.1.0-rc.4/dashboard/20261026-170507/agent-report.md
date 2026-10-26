Morning Shapes 0.1.0‑rc.4 is now applied to every screen. The build passes, all 10 smoke tests pass, and the final snapshot run reports no page that scrolls sideways. I reviewed the screenshots for every route at 1440px and 390px in light and dark, plus Settings, both error pages and the "no matching projects" state. That last state was checked on a temporary route, which I have since removed.

## What changed
- **Tokens:** `design-system/tokens.css` is an exact copy of the package file (all 359 variables match), loaded first. The project's old variable names still work as aliases in `src/styles/base.css`. Figtree and DM Mono load from Google Fonts in `index.html`.
- **Reusable pieces:** these are in `src/components/ms/`, styled by `src/styles/morning.css`.
  - Color bands with curved edges (sagging, rising and wave), the compact header band with its art cluster, and panels.
  - The shape kit: shaded discs, two‑color discs, sparkles, clouds, spot plates, confetti and item covers.
  - Breathing glyphs that pause off‑screen, and the three‑dot loader.
  - Every pill variant: tabs and filters with the selected dot, circle buttons, and the loading state.
  - The vignette and a fade‑in helper.
  - All original drawings are in `art.tsx`. Every loop, fade and build stops under `prefers-reduced-motion: reduce`.
- **Colors per area:** Overview is yellow, Projects (list and detail) blue, Team green, and Settings and error pages cream.
- **Shell:** cream sidebar with a colored dot per area (the current page is an ink pill), white 80px top bar with a pill search box that gets its shadow after 8px of scroll, a menu with the floating shadow, and a cream footer with a rising curve over a dark bottom bar.
- **Overview:** white greeting header ("Welcome back, Jordan") with one breathing crescent glyph and an ink Refresh pill (three dots while loading, width kept). The four KPI cards are colored stat tiles with small pictograms, and they are the screen's one saturated field. The bar chart uses flat yellow bars, and the other panels are cream.
- **Projects, project detail and Team:** each opens with a header band in its area color and its own drawing (a folder, a clipboard, two people).
  - Filters and tabs are cream pills; the selected one is ink with a dot.
  - Tables sit in a white frame with status badges and a sticky first column on phones.
  - Checkboxes and the progress bar are restyled.
- **Settings:** cream header band (two switches) and a cream panel with a calendar drawing.
- **Error pages:** the not‑found page and an unknown project share a cream band rising from below, the error drawing, and an ink pill home.
- I also added `design-system/VERSION`, `design-system/components.md`, `AGENTS.md` and `CLAUDE.md`.

Every route, label, form field, `data-testid` and ARIA attribute is kept.

## What I could not apply
- **One commit per screen:** `git` wasn't among the commands I was allowed to run, so all changes are uncommitted.
- **Footer signup field and icon row:** this is an internal tool with nothing to sign up for or link to. The footer has a link column and one round "back to top" button instead.
- **Vignette and confetti:** both are built but not used anywhere, because the spec only calls for them on front pages, marketing sections and onboarding.
- **Phone navigation:** the spec wants one 64px row with a menu button. I kept the existing sidebar links and made them a scrollable pill row on phones, because a hamburger menu would change how navigation behaves.
- **Two cream areas on error pages:** the cream error band and the cream footer are both required by the spec. I separated them with 64px of white, but strictly they share a color.

## Decisions I made myself
- **Header band height:** the recipe sizes it from the viewport width, which made bands far too tall next to the sidebar. I size it from the band's own width instead.
- **Settings nav dot:** a cream dot would vanish on the cream sidebar, so it is drawn in the spec's stone color.
- **Chart:** it is built in HTML instead of SVG so its labels stay at least 14px on phones. Its single series uses Overview's yellow.
- **Status badges:** active is blue, paused yellow, done green.
- **Search box sizes:** the top‑bar search is 48px tall to match the top‑bar pills. The table filter uses the spec's 56px.
- **Row actions:** each project row gets an added cream circle "Open" link, as the spec asks for on data tables.
- **New copy:**
  - The greeting "Welcome back, Jordan".
  - The Settings line "Workspace preferences for Northwind Ops."
  - The footer tagline.
  - The "Loading metrics" status text.
- **Raw values:** a few sizes are not tokens: the stat‑tile minimum height (168px), the chart heights, the checkbox tick, and the 640px minimum table width that makes tables scroll on phones.