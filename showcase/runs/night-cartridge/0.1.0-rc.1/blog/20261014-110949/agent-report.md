I've applied Night Cartridge to all four routes, plus the not-found and empty states. The final `node pigment-snap.mjs` run built cleanly (typecheck included) and reported no sideways scroll. I reviewed the home, article and about screenshots against the spec, covering desktop and mobile in both light and dark. I couldn't run the Playwright smoke tests because that command isn't on my allowed list. I preserved every route, label, `data-testid`, form field and ARIA attribute the tests rely on.

**What changed**
- **Tokens and fonts:** `tokens.css` is imported straight from the design package in `src/main.tsx` rather than copied, so no value is retyped. The Galmuri, Pretendard and Geist Mono font links are in `index.html`, along with a small script that applies the saved Animation and Pixel body switches before the page draws. Light and dark follow the system colour scheme.
- **Root setup:** `src/styles/base.css` is rewritten with the spec's three-line motion and shape block, the pixel type base, the gold focus ring, and the marker, window, dither, meter, callout, stage, ground strip and stepped-animation rules.
- **Reusable pieces** in `src/pixel/`: `PixelScene` (hero and banner), `Vignette`, `GroundStrip`, `Marker` (four directions), `PixelIcon`, `Avatar` (an 8×8 mirrored sprite generated from the author's name), `Window`, `DitherRule`, `BlockMeter`, `Callout`, and the Animation and Pixel body switches. The scene helpers follow the spec's recipe.
- **The world:** one post office on a night street. It has an orange stepped roof, a lit writing desk with a lamp, book shelves, a sign with an envelope, a lantern, an antenna light and a blue mailbox as the focal sprite. The moving parts are a pigeon that bobs, one drifting cloud, twinkling stars and an occasional shooting light. All motion is stepped and stops under reduced motion or when Animation is off. Error screens turn the lights off and show one beacon.
- **Header (every screen):** sticky, with the dither rule below, a pixel envelope mark, nav items with the gold marker (the current one blinks), and the two switches. Below 1024px these collapse into a "Menu" window; Escape closes it and focus stays inside while it's open.
- **Home:** hero scene with a window over its left third (it stacks under the scene on smaller screens). Cards have a coloured top bar and icon per tag, tag chips have coloured squares, and the selected filter chip shows the marker. The search field has a pixel magnifier, and the empty state has a vignette and a "Clear filters" button.
- **Article:** banner window holding the category, title, lede and meta; h2s sit on dithered rules. Code blocks are windows with a language label and a Copy button, and the missing image is now a pixel sprite of the inventory board. The contents list marks the heading you're reading and becomes a disclosure on small screens. Older/Newer post links and related-post cards follow.
- **About:** banner window, the prose section, and author cards with pixel avatars.
- **Not found and post not found:** a window with the lights-off vignette.
- **Footer:** the ground strip with three sprites (parcels, a cat, a mailbox), and the newsletter form in a window with the gold Subscribe button. A failed submit shakes the field once and moves focus to it; errors show a warning icon, and success shows a framed confirmation with a check icon.
- **Docs:** `design-system/` contains `VERSION` and `components.md` (conventions, the world, the scene on each screen, the colour per tag), and `AGENTS.md` and `CLAUDE.md` contain the pointer line.

**What I couldn't apply**
- **Commits:** I made no commits (the spec asks for one commit per screen) because git isn't one of the commands I'm allowed to run. All changes are uncommitted in the working tree.
- **Dates:** they stay as "September 28, 2026" rather than the spec's `2026.09.28`, because the smoke tests check that exact text.
- **Not used:** block meters, the loading ellipsis, the strip scene and keyboard-shortcut hints. The blog has no scores, loading, product screens or shortcuts that would call for them. `BlockMeter` is built but not used on any screen.
- **Font links:** the spec's links have no version pins. Pages will log errors if those CDNs can't be reached, which could make the "no console errors" smoke test fail offline.

**Decisions I made**
- **Home card grid:** columns are at least 360px wide instead of the spec's 200px, because the excerpts are long. This gives 3 columns at 1440px and 1 on mobile.
- **Colours:** each tag gets a fixed colour (engineering cyan, design violet, writing blue, process amber, remote work green). A post card uses its first tag's colour, and each author's card uses their avatar's colour.
- **Gold button:** Subscribe stays the one gold button on every screen. On not-found I used a framed "Go to the home page" button instead of the spec's gold "Retry", since there's nothing to retry.
- **Additions:**
  - an eyebrow, a framed "Read the featured post ▶" button and a meta line in the hero window
  - the post excerpt as the article's lede
  - Older/Newer post navigation
  - a "Contents" toggle for the contents list on small screens
- **Small-screen header:** a mark plus a Menu button. There's no search icon because the app has no search page.
- **Pixel body switch:** it's on every screen rather than only on long-prose pages, so its saved setting always has a visible control.
- **Window frames:** the spec allows at most three per screen, and an article can reach four (banner, code, newsletter, plus a second code block if a post had two). None of the current posts has more than one code block.