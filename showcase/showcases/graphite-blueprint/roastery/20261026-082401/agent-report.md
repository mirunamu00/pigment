I've redesigned every page in Graphite Blueprint, but I couldn't finish verifying it: the build is currently failing because of a file lock on this machine, not because of the code.

**Verification status**
- **What passed:** one full `node pigment-snap.mjs` run built cleanly and reported no sideways scroll on any page. I reviewed the 1440px Home (light), Product (dark), Subscribe (light) and About (light) screenshots against the spec, and they match.
- **Mobile and dark:** the 390px Home dark screenshot was too small to read, and I didn't open the remaining 1440px and 390px light/dark screenshots before the build broke. So mobile and dark are only partly checked.
- **What broke:** a later measuring run failed with "connection refused", probably leaving a preview server running. Since then every `npm run build` stops before compiling, with esbuild reporting "Cannot read directory … being used by another process". I'm only allowed four commands, so I couldn't stop that process.
- **What's unverified:** after the first good build I made two changes. I narrowed the link-underline rule, which had wrongly underlined the header nav and footer links, and I rewrote the two closing statements. `npm run typecheck` passes with them, but neither change has been built or screenshotted. Once the lock clears, run `node pigment-snap.mjs` again.
- **Not run:** there are no automated tests.

**What changed**
- **Foundation:** `tokens.css` is imported as-is from the design package (not copied into `src/`). Inter and Geist Mono are now self-hosted through two added npm font packages, and the Google Fonts link is gone. Light and dark follow the device setting. I also added the global focus outline and the reduced-motion rules.
- **Signature pieces** (`src/components/system.tsx`):
  - **Lit stage:** the Home hero shows the subscription plan builder at true scale, settling into place when it scrolls into view. Quiet stages hold the product photo and the 404 drawing.
  - **Dot glyph:** a running glyph in the hero demo, and the still "empty" glyph for the empty shop results and the empty bag.
  - **Dot meters:** roast level, review ratings and the free-delivery meter in the bag.
  - **Blueprints:** a three-drawing row for the subscription steps on Home, with marching connectors and slabs that lift once in view. Stacks of 1–3 slabs mark the plan cards, and a broken connector ends in a red point on the 404.
  - **Spec plates:** wide lead plates on the legal pages.
  - **Openers and closings:** split openers and two-tone statements throughout.
  - **Motion:** everything that moves stops under reduced motion.
- **Pages:**
  - **Header and footer:** a sticky blurred header with pill nav, a cart count and a mobile sheet. The footer has hairline columns.
  - **Content:** every content section now opens with a split opener above a hairline grid of photo cards.
  - **Shop:** filter chips and a mono "SHOWING n OF 10" count.
  - **Product:** segmented size picker and a sliding tab indicator.
  - **Subscribe:** numbered app sections and plan choice cards.
  - **Legal:** each page now has a contents rail.
  - **Page closes:** the closing blocks on Home and Shop are now centred statements over the dot field.
  - **Kept:** all routes, behaviour, copy, `data-testid`s and ARIA attributes. The newsletter now moves focus to the field and shows an error banner on a failed submit.

**Decisions I made**
- **Photos:**
  - **Kept with meaning:** every coffee keeps its own photo.
  - **Moved:** the Home hero photo (cooling tray) now sits in the "Inside the roastery" grid, and the Subscribe header photo is a captioned lead image.
  - **Dropped:** the 404 photo is replaced by the broken-connector drawing.
- **Copy I added:** I wrote short descriptions where an opener needed one and the product had none:
  - "Four of the ten on the roaster now, picked for the season."
  - "Six of them, from Leeds to Belfast, in their own words."
  - "The four coffees closest to this one in roast."
  - "Roasting, buying, the bar and every bag that leaves the building."
  - the one-line descriptions for the two Subscribe steps
  - the "Your plan" badge
  - the hero demo's sample text
- **Closing statements:** they are "30% off. First bag." on Home and "Wholesale? Talk to us." on Shop. They're that short so each sentence fits one line at 48px on a 390px screen. The original headings became the mono label above each statement, and no other copy was removed.
- **No hairline under some edges:** hairline grids have no bottom edge, and tables and FAQ rows draw their lines on top. Otherwise two hairlines would face each other across empty space before the next section.
- **Small size deviations:** the Shop closing's long secondary line is set at 17px, because at 24px it can't fit one line. The newsletter button is 36px tall so it lines up with the field.

**Not applied**
- The spec's one-commit-per-screen steps, because this isn't a git repository.
- The `design-system/` folder and the AGENTS.md/CLAUDE.md pointer lines.
- Working shimmer and live edges. Nothing in the product actually runs in the background, and the spec forbids faking a working state.