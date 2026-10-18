Night Cartridge is applied to every screen. The build passes, all 9 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I looked at every screenshot, the mobile ones included. Controls that share a row all measure 40px. Nothing is committed: you didn't ask for commits, so all changes are in the working tree. The spec suggests one commit per screen, so I can split them that way if you want.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied unchanged into `src/styles/`. The four font links from the spec are in `index.html`. `base.css` is rewritten using tokens only, starting with the spec's root block. The old radius, soft shadows and transitions are gone.
- **Light and dark:** the spec defines dark only and says there is no light theme or theme switch. So the light screenshots are identical to the dark ones.
- **Scene engine (`src/art/`):** the spec's drawing helpers ported to TypeScript, a small canvas that adds the outline, highlight and shade to each sprite automatically, and a composer. The composer builds each scene in the spec's layer order and reports its numbers.
- **The world:** the blog's world is a printing quarter at night, with nine lead buildings, each with its own sign word:
  - print house (INK) on the home hero
  - type foundry (TYPE), newsstand (NEWS), signal house (FLAG), post office (MAIL), clock tower (TIME), gallery (ART) and telegraph office (WIRE), one per article banner
  - bookshop (BOOK) on About
  - three in-article figure scenes, three small scenes for the empty and error states, and the grass strip at the top of every footer
- **Reusable pieces:** pixel stage, small scene, figure, ground strip, marker, dither rule, block meter, callout, pixel icons and the two header switches. "Animation" sets `data-motion` and "Pixel body" sets `data-body` on `<html>`; both are saved per browser. All looping motion runs in steps and stops under reduced motion or when Animation is off; scenes then show their first frame.
- **Screens:**
  - Home: hero with its window; featured and post cards with category colour bars; filter chips with the marker; a block meter under "Showing n of m"; the empty state.
  - Article: banner window with title block, dithered h2s, code window with a Copy button, quote callout, contents list with a moving current marker (a disclosure on small screens), and ◀ ▶ previous/next links.
  - About: banner, author cards with pixel-initial avatars.
  - Not found and post not found: an error window with the lights-off scene and a red beacon.
  - Footer: the sign-up panel, whose Subscribe is the gold button.
  - Small screens: the header switches to a Menu button.
- **Kept as they were:** all routes, `data-testid`s, labels, form behaviour and accessibility attributes.
- **Added:** `design-system/` (version file, tokens and `components.md` describing the world, which scene goes where, and category colours), plus `AGENTS.md` and `CLAUDE.md` with the pointer line. The temporary review route used for the scene checks has been removed.

**Scene numbers (computed by the composer)**
- **Hero:** lead 47 units tall, base y 88, top y 41; path ends at x 402; 122 details; 8 lights.
- **Banners:** leads are 51–60 units tall (102–120px), each with 70+ details and 5–6 lights. Every tall vertical is 44 units or less and clears the far ridge by 4.
- **Figures, small scenes and footer:** figures have 31–34 details, the small scenes 15–18.

**Could not apply**
- **Date format:** dates stay as "September 28, 2026", not YYYY.MM.DD, because the smoke tests check that exact text.
- **Header search:** there is no header search button. The app has no site-wide search; the home page search field covers it.
- **Retry button:** the error screens use a framed "Go to the home page" button instead of a gold Retry. There is nothing to retry, and Subscribe already holds the screen's one gold button.
- **Item-sprite table:** not applicable, since the app has no product grids. The full sprite-variant table and per-scene write-up from the spec's report format are not written here; `components.md` covers the world and scenes.
- **Accessibility scan:** no automated accessibility check was run. It isn't among the commands I was allowed to use.

**Decisions I made**
- **Gold button:** the footer Subscribe is the gold button, because it's the only commit on any screen.
- **Article tags:** they are badges with a colour bullet; on articles they form the category line above the title.
- **Tall verticals:** the composer moves them up to 24 units sideways to stay within the 44-unit height limit.
- **New copy:** small additions in the hero (eyebrow, meta line), on About (meta line) and the Copy/Copied button.
- **Fonts:** they load from the spec's CDN links, so the pixel typeface needs a network connection. It loaded fine during tests and screenshots.