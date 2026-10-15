Night Cartridge is applied to every screen. The final `node pigment-snap.mjs` run built cleanly (typecheck plus Vite) and reported no sideways scroll on any page, at 1440px and 390px, light and dark. I couldn't run the Playwright smoke tests, since `npm run test:e2e` isn't one of the commands I was allowed. I kept every `data-testid`, ARIA attribute, form field, route and label the tests check, but that is unverified. I also couldn't make one commit per screen as the spec asks, because git isn't among the allowed commands, so everything is uncommitted in the working tree.

**What changed**
- **Tokens and root setup:** `dist/tokens.css` is copied unchanged to `design-system/tokens.css`. The fonts load from the exact links in the spec. The root CSS from the spec is in place: pixel type with smoothing off, no radius or transitions, and motion that freezes under reduced motion or when the Animation switch is off.
- **Pixel art (`src/art/`):**
  - **Scene helpers:** copied from the spec, plus three small additions.
  - **The app's world:** a server yard with 9 hand-drawn props. The main group in the strip is a dish, a tall rack and a small rack with a fan.
  - **Three scenes:** a strip at the top of each screen, a small square scene for the empty and error states (the error version has its lights off and one blinking red beacon), and the ground strip along the footer.
  - **Motion:** stars twinkle, lights blink out of step, a cloud drifts, the fan swaps between two frames, and a shooting light passes now and then.
  - **Icons:** pixel icons built the same way.
- **Reusable pieces (`src/components/pixel.tsx`):** the marker, icons, the scene window that holds the strip above the page title, the small square scene, the ground strip, window, dither rule, block meter, callout and a pixel avatar generated from each person's name.
- **Shell:** sticky header with the dither rule underneath, search, the Animation and Pixel body switches (saved per browser), and a user dropdown that opens with the first option highlighted, moves with the arrow keys and returns focus on Escape. The sidebar nav uses the marker and runs down to the ground strip; under 1024px it becomes a row of links above the content.
- **Screens:**
  - **Overview:** metric tiles with a coloured top bar and 48px numbers; a chart made of flat bars; each panel group has its 32px heading on the dither rule outside the panel.
  - **Projects table:** filter chips with status-coloured squares, a marker on the hovered row, up/down markers on the sorted column, and status labels with coloured squares.
  - **Project detail:** marker tabs, and block meters for "n of m" tasks (one in the details list, one replacing the old progress bar), plus pixel checkboxes.
  - **Team:** avatars in the table rows.
  - **Settings:** a titled window with an info callout.
  - **Not-found pages:** the error scene and a gold button.
- I added `design-system/` (`VERSION`, `components.md`) and the pointer line in `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply or left out**
- `src/pages/ArtReviewPage.tsx` is still in the project. I removed its temporary route, but deleting a file wasn't among the allowed commands, so please delete it.
- I dropped the optional blink on the main nav's "you are here" marker: it made the marker invisible in half the screenshots.
- No header nav items. Navigation stays in the sidebar, which the spec allows as a shell layout.
- Settings has no section menu, because the page has only one placeholder section.
- Scene review: I did one round of review at 4× on a temporary page, then checked every scene in place at both widths. That is short of the two zoomed rounds the spec asks for, and I didn't produce the full per-scene count report.

**Decisions I made myself**
- **Team gets a scene:** the spec says data tables get no art, but also that every screen has one scene. I followed "every screen" and gave Team a strip.
- **Strip instead of banner on project detail:** it's a product screen inside a dashboard, so I used the smaller strip rather than the taller banner.
- **Screens differ by crop and lights:** each screen shows a different slice of the same scene with different lights on (listed in `components.md`).
- **Colours:** Deployments cyan, uptime violet, incidents blue, lead time amber, people green. Active is the success colour, Paused warning, Done info.
- **KPI changes:** the change line is coloured by whether it's an improvement, so falling incidents and falling lead time show green.
- **Uptime meter:** only uptime has a block meter, against its real 100% maximum. The other metrics have no real maximum, so they show only the change.
- **Dates:** now `YYYY.MM.DD`, as the spec requires (previously "Dec 15, 2026").
- **Gold buttons:** used only on the not-found pages ("Go to overview", "Back to all projects"). No other screen has a main action to commit.
- **Mobile header:** the switch labels and your name in the user button are hidden visually on small screens but still read by screen readers.
- **Font risk:** the fonts load from external CDNs, so the "no console errors" smoke test could fail if those can't be reached during testing.