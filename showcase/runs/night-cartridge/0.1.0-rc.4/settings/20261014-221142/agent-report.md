Night Cartridge is applied to every screen. The build and typecheck pass, the final snap run shows no sideways scroll on any page, and I checked the screenshots at 1440px and 390px in light and dark. I could not run the Playwright smoke tests because `npm run test:e2e` isn't one of the allowed commands. I kept every route, label, form field, `data-testid`, ARIA attribute and validation behaviour, so they should still pass.

**What changed**
- **Tokens and type:** the app imports the package's `dist/tokens.css` directly, so no values are retyped. The NeoDunggeunmo pixel font loads from the link in the spec. The spec's root setup is in place: square corners, no transitions, the 4px gold focus ring, and motion that stops under `prefers-reduced-motion` or when the Animation switch is off.
- **Pixel art (`src/art/`):** the helpers from the spec's recipe, a workshop-yard set of sprites, and these scenes:
  - One strip per settings screen. Each has its own skyline seed and its own prop in one slot: a switch panel, an alarm bell, a safe or stacked crates.
  - A ground strip on every screen.
  - An error vignette with a red beacon for the not-found page.

  Each scene has its own hand-placed detail pixels (well over the 30 the spec asks for per strip): stars, lit windows, a roof sign, siding, a cat and smoke. The moving parts are blinking lights, twinkling stars, a drifting cloud, one generator fan swapping two frames and a rare bird, all in stepped motion. I reviewed the scenes at 2× on a temporary route, then in place.
- **Reusable pieces (`src/components/pixel.tsx`):** the scene components, a `PageStage` window (strip plus title block), the ▶ marker, pixel icons, pixel avatars generated from the user's name, a block meter, and the Animation on/off switch in the header (remembered between visits). The dialog is now a game window with a title bar, a close button and a gold confirm.
- **Screens:**
  - **Layout:** sticky header with the dithered rule. The sidebar is a marker menu with a coloured icon per section, runs down to the ground strip, and becomes a top menu below 1024px.
  - **Profile:** form window with a pixel avatar, a gold "Save changes" button and a meter showing bio length out of 160.
  - **Notifications:** switches styled per the spec, settings groups as windows, and the "3 of 6" count now has a 6-block meter.
  - **Security:** password window with a 3-level strength meter, and the sessions table restyled.
  - **Billing:** colour-coded plan cards, with the current plan framed and marked. The gold button appears only inside the plan dialog.
  - **Not found:** window with the vignette and a gold link.
- **Docs:** `design-system/` (`VERSION`, `components.md`) plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **No commits:** git isn't an allowed command, so there are no per-screen commits and no review stop.
- **Temporary file left behind:** I removed the review route, but couldn't delete its file, so `src/pages/ArtReview.tsx` is now an empty stub you can delete.
- **Header search and top nav:** the app has neither, and I didn't invent them.
- **Pixel body switch:** not added, because no screen has long prose or dense tables.
- **Dialog screenshot:** the snap tool can't open the dialog, so I didn't look at it.

**Decisions I made**
- **Steady sidebar marker:** the spec allows the current-page marker to blink. Its "off" frame kept landing in screenshots, so I made it steady.
- **No marker on table rows:** the sessions and invoices tables have no selectable rows, so the marker space stays empty and status uses small coloured squares instead. Putting a marker next to the "This device" square would also break the spec's rule against both on one row.
- **Colours:** sections are cyan/violet/blue/amber, Email/Push are green/pink, and the Free/Pro/Business plans are teal/orange/blue.
- **Added text:** I added two pieces of visible text: a "Public profile" title bar on the profile form and a "Settings" label over the sidebar.
- **Date format:** invoice dates display as YYYY.MM.DD; the underlying data is unchanged.
- **Narrow forms:** the profile and password form windows are capped at the spec's 560px form width rather than stretching full width.