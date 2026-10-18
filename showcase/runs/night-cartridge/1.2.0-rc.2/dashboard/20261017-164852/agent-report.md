I've applied Night Cartridge 1.2.0-rc.2 to all six screens. The build passes, all 9 smoke tests pass, and the last full `node pigment-snap.mjs` run reported no sideways scrolling. Every route, label, form field, `data-testid` and ARIA attribute is unchanged.

The spec is dark-only, so I removed the old light theme. There's no light mode or theme switch, and the light and dark screenshots look the same.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is a verbatim copy of the spec's token file. `index.html` loads the four web fonts the spec lists, and nothing else.
- **Base rules:** `src/styles/nc.css` holds the spec's global rules: square corners everywhere, no transitions, pixel type, focus ring, and animation that stops under reduced motion or when the Animation switch is off.
- **Reusable pieces** (`src/components/nc.tsx`, `src/scene/`):
  - the ▶ selection marker, game windows and dithered rules
  - block meters, pixel icons and initials avatars
  - a pixel-art scene in a window above each page title, plus the grass ground strip at the bottom of every screen
  - a small framed scene for empty and error states
  - sprites for a server yard and a workshop yard, with blinking lights, twinkling stars, a drifting cloud, a fan that swaps frames and a rare shooting star
- **Header:** the 4px dither rule below it, Animation and Pixel body switches (both saved between visits), and a user menu that opens with the first option highlighted and supports the arrow keys and Escape.
- **Overview:** each KPI tile has a coloured top bar and a 48px number. The chart is rebuilt with flat bars and dotted gridlines. Section headings sit on dithered rules.
- **Projects table:** a marker appears on the hovered row. Sort headers show up/down markers, status filters are chips, and "Showing n of m" has a block meter. Below 600px only the key columns show.
- **Project detail:** a large banner that differs per project. Which side the hut stands on depends on the project, and its lit windows depend on status. Below the banner are framed tabs, meters for task counts and pixel checkboxes.
- **Team, Settings, not-found pages:** each has its own scene. The not-found pages show a small scene with the lights off and a red beacon, and the "Go to overview" / "Back to all projects" link is the gold button.
- **Docs:** `design-system/` (VERSION and `components.md`, which records the art world, the scene for each screen and the colour for each category), plus `AGENTS.md` and `CLAUDE.md` pointers.

I reviewed the scenes alone at 2× on a temporary page and changed them after the first look: masts and coolers were blending into the hills, so I gave them colours. I also changed the activity list so the chart panel no longer leaves a large empty area beside it. The temporary page is removed.

**What I couldn't apply**
- **Settings menu:** the spec wants a sidebar menu of settings sections, but the page is still a "coming soon" placeholder with no sections. It gets the workshop scene and a framed group instead.
- **Tokens folder:** `design-system/` points to `src/styles/tokens.css` instead of keeping a second copy.
- **Commits:** I made none. The spec asks for one commit per screen, but your git rules say to commit only when asked, so everything is uncommitted. That includes the `package-lock.json` that `npm install` created.
- **Scene checks:** I checked the spec's scene counts and spacing as I placed things. I didn't produce the full scene-by-scene report the spec asks for.
- **Font links:** the URLs use `@latest`, exactly as the spec gives them, so the fonts aren't pinned to a version.

**Decisions I made**
- I kept the sidebar for navigation. Under 1024px it becomes a wrapping row of menu items, a 2×2 grid on phones.
- Search stays a real text box with a framed "Search" button. On phones it moves to a second header row. I left out the keyboard-shortcut hint because the app has no shortcut.
- Only the uptime tile has a meter, because it's the only figure with a real maximum (100%). The spec forbids meters with made-up maximums.
- Dates now show as YYYY.MM.DD, per the spec. Sorting is unchanged.
- The chart is built in HTML and CSS rather than as a scaled SVG, so its 12px labels stay crisp.
- On the project detail page, the status badge serves as the category line above the title.