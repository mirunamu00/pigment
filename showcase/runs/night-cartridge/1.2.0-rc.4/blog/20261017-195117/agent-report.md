I've restyled all four screens and the error/empty states to night-cartridge@1.2.0-rc.4. The build and typecheck pass, all 9 smoke tests pass, and the last `pigment-snap` run found no page that scrolls sideways. I opened the final screenshots of Home (desktop and mobile), the featured article (desktop), the release-notes article (mobile) and About (desktop) and they match the spec. I looked at the other article page, a few banners and the error vignette on their own at 2× before removing the temporary review route. I didn't commit anything, because git wasn't in the list of commands I was allowed to run.

**What changed**
- **Tokens and base styles:** `design-system/tokens.css` is a copy of the package tokens. I rewrote `src/styles/base.css` around it with the spec's root block (no rounding, no transitions, reduced motion stops everything, the Animation switch freezes scenes), pixel type, the focus ring, the RPG ▶ marker, game windows, dithered rules, dotted separators, hue bars, block meters, callouts and the stepped animations.
- **Fonts:** the four stylesheet links from the spec go in `index.html`, plus a small script that applies the two header switches before the page first draws.
- **Pixel art engine (`src/art/`):** the spec's helper functions, a sprite canvas that adds the outline, highlight and shade automatically, and a scene builder that draws layers in the spec's order and reports the numbers used for review.
- **Scenes:** the world is a post-office street at night.
  - Home hero: the main post office on a rise, with a Window over the left third.
  - A different banner for each of the 7 articles and for About, each with its own lead building (parcel depot, press house, signal post, parcel lockers, clock tower, pillar-box kiosk, telegraph office, editors' house).
  - Three inline figures inside articles.
  - An empty-state vignette and an error vignette (lights off, one beacon).
  - The ground strip along the top of the footer on every page.
  - Motion: stars twinkle, lights blink out of sync, a cloud drifts, flags swap frames, a pigeon bobs and a bird occasionally flies past. All of it stops under reduced motion and with the Animation switch off.
- **Shell:**
  - Sticky header with the dither rule and the blinking ▶ on the current nav item.
  - A framed Search button (with a `/` shortcut).
  - Animation and Pixel body switches that persist across visits.
  - Below 1024px, a Menu button opens a menu that keeps focus inside until closed.
- **Screens:**
  - **Home:** hue-coded cards, filter chips with hue bullets, and a block meter under "Showing n of 6 posts".
  - **Article:** banner window with the title block, dithered h2s, code windows with a Copy button, quotes as callouts, a contents list that marks the current heading (a disclosure on small screens), and ◀ ▶ previous/next links.
  - **About:** banner window and hued initials avatars.
  - **Errors:** the error screen is a Window with the vignette and a gold button home.
- **Docs:** `design-system/` (VERSION, tokens, `components.md`) and pointer lines in `AGENTS.md` and `CLAUDE.md`.

Every route, label, form field, `data-testid` and accessibility attribute is preserved. The temporary scene-review route is removed.

**What I couldn't apply**
- **Light theme:** the spec is dark only, so the light screenshots are also dark.
- **Date format:** the tests check for "September 28, 2026", so dates are not in the spec's `YYYY.MM.DD` form.
- **Hero layout:** the spec's rules for open ground between prop clusters can't all fit between the Window and the 1440px crop edge. One cluster is only visible at 1920px wide, and the cluster next to the Window sits closer than 60 units to the main group.
- **Smaller misses:**
  - In the featured-article banner, the poplar's top is 2 units above the far ridge instead of 4.
  - There is no syntax colouring in code blocks.
  - `design-system/tokens.json` points to the package file rather than copying it.
- **Report tables:** I didn't produce the per-scene numbers report the spec's Verification section asks for. What I did check: the featured banner has 73 hand-placed details and 6 lights, the feature-flags banner has 72 details and 5 lights, and the hero has 121 details and 6 lights. The blog has no product sprites, so there is no sprite table.

**Decisions I made**
- **Gold buttons:** gold is only used for the Home hero's "Read the featured post" and the error screens' way home. The footer's Subscribe is a framed button, since the footer isn't page content. The article and About pages have no gold button.
- **Empty state:** I kept both existing lines of text, though the spec asks for one sentence.
- **Flag frames:** they rest on frame 1, so a frozen scene never shows both frames at once.
- **Search:** the header Search button and `/` both focus the search field on Home.