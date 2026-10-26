I've redesigned Halfpenny in Night Cartridge across every page. The final run of `node pigment-snap.mjs` passes: the build and typecheck succeed, there's no sideways scroll on any page at 1440px or 390px, and I checked the screenshots page by page, including mobile. The run before that failed with a Node error I didn't capture; the rerun with no code changes was clean.

## What changed
- **World and art** (`src/art/`): I built the pixel scenes around "Printworks Yard at night", taken from the magazine's address.
  - **Front page:** a full-width hero led by the printworks (clock, sawtooth roof, chimney smoke, the lit loading door and a stepped path), with the lead story in a framed window over it.
  - **Stories:** a banner led by a news kiosk. Its signboard shows a word per section: FOOD, FORM (design), DISC (music), HOME (neighbourhoods).
  - **About:** a banner led by a reading room.
  - **Short scene strips:** the news van on section fronts, a gig venue on Listings, a street map board on Search, the post office on the footer pages.
  - **Small scenes:** three for the 404, empty Listings and empty Search; the 404 one has its lights off and one beacon.
  - **Footer:** a grass strip on every page.
  - **Motion:** twinkling stars, blinking lights, a drifting cloud, a bobbing or two-frame sprite, and a rare bird or shooting star. It all stops under reduced motion and under the new header "Animation on/off" switch, which is remembered between visits.
- **Header and footer:** the header is new, with the ▶ marker on the current section, the dithered rule, a search field with a "/" shortcut, the Animation switch and a "Pixel body" switch (swaps long text to a readable font). Below 1280px it collapses to a menu window that keeps keyboard focus inside it.
- **Every page** was recomposed per the spec. Story pages gained a contents list that follows your scroll, a block meter for review ratings, and older/newer links. About now has number tiles, initial-letter avatars, and plan cards where the chosen plan is marked. Listings gained a filter switch and an empty state.
- **Gold buttons:** one per screen, only where there's a real commit (newsletter sign-up, choosing the Member plan, the 404's "Back to the front page"). Story, Listings and Search have none.
- **Photos:** every one stays with its story or event, in a 2px frame with its caption and credit.
- **Kept:** all routes, copy, data, `data-testid`s and accessibility attributes. The newsletter field now nudges on error and takes focus.
- **Setup:** the fonts load from the links the spec gives; the old CSS is replaced; tokens are imported straight from the package file. I added `design-system/` (version file, tokens, `components.md`) and `AGENTS.md`/`CLAUDE.md`.

## What I couldn't apply
- **Light mode:** the spec is dark-only, so both screenshot schemes are dark.
- **Navigation size:** the spec allows 3–5 nav items; I kept all six because each has a test id.
- **Dates:** I kept the magazine's written dates ("24 October 2026") instead of YYYY.MM.DD, because the copy had to stay.
- **Scene numbers:** each scene computes its spans, heights and gaps and I reviewed them on a temporary page. A few targets don't fit inside the hero window's constraints. The hero's lead building sits 54 units off-centre instead of the 60–100 the spec asks, and its ground is a flat area wider than the spec's limit. The banners and strips mostly conform. I didn't produce the spec's full sprite and variant tables.
- **Untested states:** I couldn't click through the interaction states (open mobile menu, filters, newsletter errors) in a browser, so those are checked in code only.

## Decisions I made
- The nav collapses into the menu below 1280px rather than the spec's 1024px, because it doesn't fit before that. Switch labels are 12px for the same reason.
- I added a few labels: "Read the story", the older/newer link labels, the contents list title and a "Sign up" heading.
- Category colours: food cyan, design violet, music blue, neighbourhoods amber, then markets, talks, exhibitions and film. Music and Food events share their section's colour.

**One thing to clean up:** I'm not allowed to delete files, so `src/pages/ArtReview.tsx` and `src/pages/Slices.tsx` are left as empty placeholders (my temporary review pages). They're no longer linked from the app; please delete them.