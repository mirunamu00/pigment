I've applied Night Cartridge to the whole blog. The last `node pigment-snap.mjs` run passed: the build and typecheck succeed and no page scrolls sideways. I opened the screenshots for every route at 1440px and 390px, light and dark, and fixed the one problem I saw (shell `#` comments in code blocks weren't coloured as comments). I could not run the Playwright smoke tests, because `npm run test:e2e` isn't one of the commands I was allowed to use. Every route, `data-testid`, label text, heading id, form behaviour and accessibility attribute the tests depend on is unchanged, but the tests still need to be run once.

**What I changed**
- **Tokens and root setup:** `design-system/tokens.css` is a copy of the package file, imported in `src/main.tsx`. `src/styles/base.css` is rewritten to use only the tokens, and includes the spec's motion/shape block, the pixel type settings, the 4px gold focus ring and press offsets. Fonts load in `index.html` from the four links the spec gives. Light and dark follow the system setting.
- **Signature pieces, each reusable:**
  - The art engine is in `src/art/`. The app's world is a post-office street: townhouses, shops, a depot, a kiosk, parcels, mailboxes, and a post office with a mail van as the focal group.
  - `src/components/pixel.tsx` holds the hero, banner, ground strip, small framed scene for empty/error states, RPG marker, game window, dither rule, block meter, callout, pixel icons, brand mark and generated avatars.
  - Lights blink out of sync, stars twinkle, one cloud layer drifts, the post-office flag bobs, a rare shooting light crosses the sky, and the menu marker blinks. All of it stops under reduced motion or when the header's Animation switch is off.
- **Header:** sticky, with the dither rule, the marker on the current nav item, a Search button (and the `/` key) that focuses the post search, and the Animation and Pixel body switches, both saved between visits. Under 1024px it becomes a menu button that opens a framed menu; Escape closes it and focus stays inside while it's open.
- **Home:** full-width scene with the title window over its left third (below the scene on mobile). Cards have a hue bar and icon per category, with the marker appearing on hover or focus. Filter chips swap their hue bullet for the marker when selected. "Showing n of m posts" has a block meter. The empty search result shows a small framed scene with one light and a "Clear filters" button with the marker.
- **Article:** banner window with a title block, dithered h2s, code in windows with a Copy button and syntax colours, quotes as callouts, and the missing-image placeholder drawn as a sorting-room sprite. The contents list follows your scroll position (first heading marked on load) and becomes a disclosure on small screens. I added ◀ newer / older ▶ post links.
- **About:** banner window, dithered h2s, neutral author cards with generated avatars.
- **Not found:** framed window with a small scene showing the lamp off and a red beacon.
- **Footer:** ground strip with four sprites, and the newsletter as a 2px-framed panel. Its error state focuses the field and nudges it once; success shows as a callout.
- **Docs:** `design-system/VERSION`, `design-system/components.md`, and the pointer line in new `AGENTS.md` and `CLAUDE.md`.

**What I could not apply**
- **Date format:** the spec wants `YYYY.MM.DD`, but the tests check for "September 28, 2026", so I kept the long format.
- **Commits:** the spec asks for one commit per screen, but git wasn't in my allowed commands, so nothing is committed.
- **Font smoothing off** has no effect in Chrome on Windows.
- **Font links use `@latest`** because that's how the spec gives them. Pages will log console errors if the CDN can't be reached, which would trip the "no console errors" smoke test in an offline environment.

**Decisions I made**
- **One gold button per screen:** "Subscribe" in the footer is gold on every screen. The hero button ("Read the featured post ▶") and the error-page links are framed buttons.
- **Card grid width:** cards are at least 320px wide instead of the spec's 200px, so the six posts form two rows of three.
- **Pixel body switch** appears only on the article and About pages, which have long prose.
- **Category colours:** engineering cyan, design violet, writing blue, process amber, remote work green. A card takes the colour of its first tag.
- **Figure art:** the sorting-room scene has some empty space above the cabinet. It's within the spec but could be filled further.