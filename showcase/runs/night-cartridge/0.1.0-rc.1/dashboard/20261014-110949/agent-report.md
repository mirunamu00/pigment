I've restyled every screen with Night Cartridge. The build and typecheck pass, `node pigment-snap.mjs` reports no sideways scrolling, and the final screenshots (1440px and 390px, light and dark) match the spec. I could not run the smoke tests (`npm run test:e2e`) because it isn't one of the commands I was allowed to use. Every `data-testid`, route, label, ARIA attribute and piece of logic the tests rely on is unchanged, but that is unconfirmed until you run it.

**What I changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of `dist/tokens.css`, loaded first in `src/main.tsx`. Light and dark follow the system setting. `index.html` loads the three font stylesheets the spec lists and restores the two header switches before the page first draws.
- **Signature pieces (`src/pixel/`):** the drawing helpers from the spec's recipe plus `StripWindow`, `Vignette`, `GroundStrip`, `Marker`, `Window`, `DitherRule`, `BlockMeter`, `Bullet`, `Avatar` (a mirrored sprite made from the person's name), fill-only pixel icons, and the Animation and Pixel body switches. Both switches are saved in localStorage.
- **The world:** a server yard at night. Two racks with blinking lights and a fan that swaps frames, a cable pole with one live light, a drifting cloud, twinkling stars and a rare shooting light. Each screen swaps one prop: dish, crates, mast, vending machine, workbench.
- **`src/styles/base.css`, fully rewritten:** the spec's motion and shape rules, pixel type, the gold focus ring, and the RPG marker on the sidebar, filter chips, tabs, sorted headers, user menu and forward links. All animation stops under reduced motion or when the Animation switch is off.
- **Screens:**
  - **Every screen:** a strip window at the top, the dither rule under the header, and the ground strip at the bottom.
  - **Overview:** KPI tiles with hue bars, 48px numbers and block meters; the bar chart rebuilt as flat square HTML bars; activity list with hue bullets and dotted rules.
  - **Tables:** status shown as a coloured square plus the word; on mobile, tables scroll inside their own box.
  - **Project detail:** framed tabs, pixel checkboxes (still the real inputs), and a block meter in place of `<progress>`.
  - **Empty states and not-found:** a small framed scene with one light, or with the lights off and a red beacon.
- **Docs:** `design-system/VERSION`, `design-system/components.md` (the world, a scene per screen, hue assignments), and new `AGENTS.md` and `CLAUDE.md` with the pointer line.

**Not applied**
- **No commits:** git wasn't among the allowed commands, so the "one commit per screen" step wasn't done. Everything is uncommitted in the working tree.
- **Settings:** the spec's section menu and grouped windows have nothing to show yet, so the placeholder became an empty state with a small scene.
- **Not-found screens:** they aren't in the snapshot routes, so I never saw them rendered.
- **Media queries:** they use 600px and 1024px directly, because CSS variables can't be used inside `@media`.

**Decisions I made**
- **Gold button:** Overview, Projects, Team and Settings have no main commit action, so they have no gold button. The not-found screens use gold for their only action instead of a "Retry".
- **KPI meters:** each meter uses numbers already on its tile. Incidents 3 of 5 (5 on Monday), lead time 2.4 of 3.0 days (last month), uptime 99.94 of 100. Deployments is shown against the six-month peak, so its meter is full.
- **Hues:** each project gets one hue in the spec's order (Apollo cyan through Support Routing teal). Each KPI gets its own; deployments shares blue with the chart.
- **Dates:** shown as YYYY.MM.DD, as the spec asks.
- **Project detail eyebrow:** shows "Project" with the hue bullet. The client name is already in the line below.
- **Small labels I added:** an "All projects ▶" link in the Overview window, the switch labels, and pixel icons on nav items. KPI delta colours keep the original rule (up is green, down is red), so falling incidents still show red.
- **Sidebar marker blink:** I removed it. It's optional in the spec, and the screenshots kept catching it in its hidden half, so the current item looked unmarked.
- **Project detail scene:** it uses the strip, not the taller banner, because I treated it as a product screen rather than a content page.