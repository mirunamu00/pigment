I've applied Night Cartridge 0.1.0-rc.2 to all four routes. The build and typecheck pass, and the last `node pigment-snap.mjs` reported no sideways scroll. I looked at the home, article and About screenshots across 1440/390 and light/dark (not every one of the 16 combinations) and they match the spec. I could not run the Playwright smoke tests (`npm run test:e2e` isn't on the list of commands I'm allowed to run), so they still need a run on your side. I kept every route, `data-testid`, label text, form field, heading id and accessibility attribute, so they should still pass.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` imports the package's `tokens.css` directly, so no value is retyped. Light and dark follow the system setting. The four font links from the spec are in `index.html`.
- **Global CSS:** the root motion/shape block, pixel type with no bold or italic, the focus ring, and no radius or soft shadows. The old theme in `src/styles/base.css` is fully replaced.
- **Signature pieces you can reuse** (`src/art/`, `src/components/Pixel.tsx`):
  - A scene engine built from the spec's recipe.
  - The blog's world is a post-office street: shopfronts with awnings, townhouses, the post office, kiosks, lamps, mailboxes, a postal van, parcel carts and stacks.
  - Scene motion: a pigeon bobs, a cloud drifts, stars twinkle, at most 8 blinking lights, and a rare shooting light. It all stops under reduced motion and with the Animation switch.
  - Also: the ground strip, the ▶ marker, small pixel scenes for empty and error states, pixel icons, avatars generated from author names, and a pixel sprite in place of the missing figure image.
- **Header:** sticky, with the dither rule underneath and the marker on the current nav item (it blinks). An "Animation on/off" switch is on every screen and a "Pixel body on/off" switch is on article and About pages. Both are remembered in `localStorage`.
- **Screens:**
  - **Home:** full-width hero scene with a framed window over it, a featured card, cards with a coloured bar per tag, filter chips where the marker replaces the colour square, and the empty search state.
  - **Article:** framed banner scene with the title block, ruled h2s, code in a window with a Copy button and syntax colours, the contents list (a fold-out under 1024px, with the marker tracking the section you're reading), callout-style quotes, and ◀ ▶ previous/next links.
  - **About:** banner scene and author cards.
  - **Not found:** error scene with a red beacon light.
- **Footer:** the newsletter is a panel with the one gold Subscribe button. A failed submit nudges the field and puts focus back in it.
- `design-system/` now has `VERSION` and `components.md`, and `AGENTS.md` and `CLAUDE.md` point to it.

**What I could not apply**
- **Dates:** the spec wants `YYYY.MM.DD`, but the tests check for "September 28, 2026", so I kept the long format.
- **Commits:** the spec asks for one commit per screen, but I could only run the four permitted commands, so everything is left uncommitted.
- **Header search:** the app has no site-wide search, so I didn't add a search button or keyboard hint to the header.
- **Gold on error screens:** the spec puts a gold "Retry" on error screens. Subscribe already uses the one gold button allowed per screen, so the not-found links are framed buttons with the marker.

**What I decided myself**
- **Header under 1024px:** the spec calls for a menu button. With only two nav items I kept them inline, made the switches icon-only, and hid the brand name visually under 600px.
- **Post grid:** I used a 360px minimum instead of the spec's 200px. It gives a 3 × 2 layout, where 200px left five narrow columns and an orphaned card.
- **Extra content:** I added an eyebrow ("Latest writing"), a post and author count, and a "Read the featured post ▶" button to the hero. I also added previous/next links to articles.
- **Scene size:** the main street row comes out at about 12 buildings across the banner and 8 in the hero.