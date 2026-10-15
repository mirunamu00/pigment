The restyle is applied to every screen. The build passes, and the final full screenshot run shows no sideways scroll on any page at 1440px or 390px, in light or dark. I could not run the Playwright smoke tests, because `npm run test:e2e` isn't among the commands I was allowed. Every `data-testid`, route, label, test-checked text, `role="status"` region and existing aria attribute is unchanged, but the tests themselves have not been run. Nothing is committed yet, so the spec's "one commit per screen" is not done; I can split it into those commits if you want.

**What I changed**
- **Tokens:** `base.css` imports `dist/tokens.css` straight from the design package, so no value is retyped. Light and dark follow the system setting. The old colour variables are gone, along with every radius, soft shadow and transition. The pixel fonts load from the spec's CDN links.
- **Signature pieces (reusable):**
  - The spec's scene helpers, typed, in `src/components/pixel/`.
  - The app's world is a **workshop yard**: 10 hand-drawn props (cabinet, bench, reel, panel, crates, compressor, rack, radio, safe, ticket machine) plus 3 sprites for the ground strip.
  - Built from those: a 720×48 strip per screen (each screen gets its own skyline seeds, swapped prop and light pattern), the ground strip on every page, and an error vignette with a beacon.
  - In `src/components/chrome.tsx`: the marker, window, dither rule, bullets, block meter, callout, scene window, and the "Animation on/off" header switch (saved between visits, sets `data-motion`).
  - All the spec's stepped motion is in: twinkling stars, out-of-sync blinking lights, a drifting cloud, a fan that swaps two frames, a rare bird and the beacon. All of it stops under reduced motion or when Animation is off.
- **Screens:**
  - **Shell:** a sticky header with the dither rule, and a full-height sidebar with markers and section colours that becomes a top menu below 1024px.
  - **Profile:** a form window with one gold Save button and a nudge on errors. The bio has a 20-block meter against its 160-character limit, and the avatar is a pixel sprite generated from the name.
  - **Notifications:** two group windows with pixel switches, and a 6-block meter for "n of 6 on".
  - **Security:** a password form window, a callout, and a sessions table with a marker on the current device.
  - **Billing:** a Plans window with colour-barred cards, a dialog styled as a window with the gold confirm, status bullets, and dates shown as YYYY.MM.DD.
  - **Not found:** the error vignette inside a window, with a gold link back to Profile.
- **Scenes:** I reviewed them on their own at 2.5× over two rounds, using a temporary route that I have since removed. Round 1 caught that each cluster had its taller prop standing farther out; I swapped the order.
- **Bug found by the screenshots:** the hidden "Actions" table header escaped the table's scroll box and made Security 150px too wide on mobile. Fixed.
- Added `design-system/` (VERSION and `components.md`) and the pointer line in `AGENTS.md` and `CLAUDE.md`.

**Not applied**
- **Header nav and search:** the app has neither; its four sections live in the sidebar.
- **Pixel body switch:** there is no long prose or dense table to switch.
- **Hero, banner, figures, dashboard pieces:** no screen in this app calls for them.
- **Readable font links:** not loaded, since nothing uses them.
- **Verification checks:** I did no axe accessibility scan and no keyboard walk-through.

**My own decisions**
- **Steady sidebar marker:** the spec allows the current-section marker to blink, but in the screenshots it was always caught in its "off" frame, so I made it steady.
- **Avatar initials:** they stay as a small caption under the sprite. A test checks for them and the page text promises them, and the spec forbids text on top of art.
- **Gold buttons:**
  - Notifications has none, because its changes apply immediately.
  - Billing's only gold button is inside the plan dialog.
  - Not found uses a gold link back to Profile instead of "Retry", since there is nothing to retry.
- **Window count:** non-window sections (payment, invoices, sessions) sit under ruled headings, so no screen has more than three 4px frames.
- **Colours:** plans got green, pink and orange, after the four section colours.
- **Dialog close button:** I added a framed × to the dialog's title bar. Cancel still gets focus first, as the test expects.
- **Error alerts:** field errors now also carry `role="alert"`, as the spec asks.