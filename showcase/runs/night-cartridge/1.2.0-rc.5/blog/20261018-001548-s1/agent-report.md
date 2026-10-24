I applied Night Cartridge 1.2.0-rc.5 to all four pages and every empty and error state. The build passes, all 9 smoke tests pass, the final full snapshot reports no sideways scrolling, and I checked the screenshots against the spec, mobile and dark included. The spec defines only a dark appearance, so the light screenshots show the same dark page and there is no theme switch.

Nothing is committed: the spec asks for one commit per screen, but git wasn't among the commands I was allowed to run.

**Sprite table:** no item sprites (the blog has no product grids).

**Variant table** (repeated props differ in shape, not just colour):

| variant | where it's placed (units) | what differs |
|---|---|---|
| parcels 16×20 vs parcel tower 14×26 | shipping 313, release notes 600, flags 432, … | 6 units taller, different stacking |
| pillar box 10×22 vs big pillar 14×28 | banners vs vignettes | 4+ wider, 6 taller |
| pine 8×40 / poplar 6×42 / telegraph pole 8×44 | the tall verticals in every scene | different outlines |

**Scene numbers.** These were read from code on a temporary review page, which I've since removed:

| scene | lead (height) | detail dots | lights | tall verticals: units above the far ridge | other numbers |
|---|---|---|---|---|---|
| Hero | post office (48) | 125 | 7 | 4 and 20 | path ends at x 368 (needs 366–416); lead base y 94, top y 46 |
| Shipping | sorting depot (50) | 104 | 8 | 11 and 8 | |
| Release notes | telegraph office (60) | 90 | 6 | 6 and 6 | |
| Feature flags | stamp works (52) | 98 | 7 | 8 and 4 | |
| Smaller PRs | coach station (48) | 99 | 5 | 14 and 4 | |
| Time zones | clock tower (64) | 102 | 8 | 16 and 8 | |
| Empty states | letter hall (58) | 102 | 8 | 15 and 10 | |
| Quiet month | post house (49) | 105 | 5 | 10 and 4 | |
| About | press house (62) | 101 | 8 | 8 and 15 | |

- Every lead is 4+ units taller than any other prop.
- Every scene's largest flat area is within the spec's 32-unit limit.
- Vignettes have 17 detail dots each; the three article figures have 36–37.
- After that review I fixed three things: the "Designing empty states" banner had copied another banner's left cluster, the post house lead was 1 unit too short, and the mail sacks were nearly invisible.

**What changed**
- **Tokens:** `design-system/tokens.css` imports the package's tokens unchanged. Fonts load as the spec allows.
- **Stylesheet:** `src/styles/base.css` was rewritten around the spec's recipes. The old light theme, rounded corners and soft styling are gone.
- **Pixel art:** a small engine, sprite library and composer live in `src/art/`. They produce the home hero, eight different banners (one per article plus About), three vignettes, three article figures and the footer ground strip.
- **Reusable pieces:** the marker, scene, figure, ground strip, block meter, callout, pixel icons and the Animation and Pixel body switches. Both switches persist, and all motion stops under reduced motion or with Animation off.
- **Screens:**
  - **Home:** hero window, category cards with hue bars, filter chips with marker selection, and a block meter beside "Showing n of m posts".
  - **Articles:** banner window with title block, ruled headings, code windows with a Copy button, quote callouts, a contents list that tracks scrolling (and collapses to a disclosure on small screens), and previous/next links.
  - **About:** banner window and hued initial avatars.
  - **Errors and empty search:** a vignette in a message window.
  - **Header:** collapses to a menu on narrow screens.
  - **Newsletter:** the input nudges once and takes focus on error.
- **Docs:** `design-system/` (VERSION, tokens, components.md) plus the pointer line in new `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **Date format:** article dates stay "September 28, 2026" rather than YYYY.MM.DD, because the smoke tests check that exact text.
- **Gold "Retry" on error screens:** a missing page can't be retried, so the 404 and post-not-found screens keep their existing link, styled as a framed button.

**Decisions I made**
- **Gold button:** the newsletter Subscribe is the app's only real commit, so it's the one gold button on every screen, even though it sits in the footer.
- **Header search:** it jumps to and focuses the home search field, and `/` does the same.
- **About category:** shown as "Publication" in teal, the next free hue.
- **Contents heading:** "On this page" is a small 12px label rather than a 32px heading.
- **Dependencies:** `npm install` created `package-lock.json`.