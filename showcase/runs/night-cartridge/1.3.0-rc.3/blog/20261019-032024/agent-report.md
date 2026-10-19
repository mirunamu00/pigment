Night Cartridge is applied to all four routes and the 404 page. The build passes, all 9 smoke tests pass, nothing scrolls sideways at 1440px or 390px, and I checked the screenshots against the spec. Two things are left for you: deleting a temporary file, and the commits (both below).

**What changed**
- **Tokens and root setup:** `design-system/tokens.css` imports the package's `tokens.css` unchanged (so nothing is retyped) and sets the dark colour scheme. The fonts load from the spec's links in `index.html`. `base.css` is rewritten with the spec's root block, pixel type, focus ring, marker, window chrome, stepped motion and layout.
- **Signature pieces, all reusable:** `PixelScene`, `GroundStrip`, `Marker`, `Window`, `DitherRule`, `Callout`, `HueBullet`, `Avatar`, a set of pixel icons, and the Animation and Pixel body header switches (saved between visits). All motion stops under reduced motion or when Animation is off.
- **The scene world, "Press Row":** a printing quarter at night, with its own sprites and scenes in `src/art/`:
  - Home: the hero, led by the print house.
  - Articles: a shared banner, led by the news pavilion.
  - About: a banner led by the post office.
  - Article figures: a delivery-truck scene.
  - Small framed scenes for the empty-search state and the 404 (lights off, one red beacon).
  - Every screen: the ground strip along the footer.
- **Screens:**
  - Header and footer: sticky header with the dither rule and the blinking marker, a search button with the `/` shortcut, a mobile menu that keeps focus inside it, and the ground strip.
  - Home: hero window, colour-coded cards, filter chips, and the empty state.
  - Articles: banner window, ruled h2s, a code window with a Copy button, quote callouts, a scroll-tracking contents list (a disclosure on narrow screens), and newer/older links.
  - About: avatars and author cards.
  - 404: a window with its small scene.
- **Newsletter:** a 2px-framed panel with the gold button. A failed submit nudges the email field once and focuses it.
- **Docs:** `design-system/` (VERSION and `components.md`, which records the world, the scene per screen and each category's hue), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**Scene numbers (computed in code, read from a temporary review page)**
- **Hero:** the print house is 48 units tall (top y48, base y96, centre x313). Its path ends at x380, inside the required 366–416. Gaps between props left to right are 2, 19, −2, 3, 7, 24. The mast and tree clear the far ridge by 12 and 11 units. 124 hand-placed details, 5 lights.
- **390px crop:** visible area is x 264–362, y 24–104. The lead is whole, with 24 units of sky above it.
- **Article banner:** the pavilion is 56 units (112px), top y58. Gaps are 2, 4, 151, 2, 2, 8, 66, 2, 6. 67 details, 7 lights.
- **About banner:** the post office is 54 units (108px). Gaps are 2, 92, 3, −2, 3, 102, 2, 8, 2. 69 details, 8 lights.
- **Smaller scenes:** the figure has 33 details and 3 lights; each small scene has 17 details.
- **Sprite table:** there are no item sprites, because the blog has no product images. No sprite repeats within a scene.

**Could not apply**
- **Light mode:** the spec defines dark only, so the light and dark screenshots are identical.
- **Dates:** they stay as "September 28, 2026" instead of `YYYY.MM.DD`, because a test checks that exact text.
- **Block meter:** not used, since nothing in a blog has a real, fixed maximum.
- **Code colouring:** code blocks are plain text; I didn't add syntax colouring.
- **Commits and file deletion:** `git` and deleting files aren't among the commands I was allowed, so there are no per-screen commits. The temporary review page `src/pages/ArtReview.tsx` is no longer routed but still exists; please delete it.
- **Hero between 1024px and 1440px:** the hero window overlaps some props, because the spec only fixes the layout at 1440px.

**Decisions I made**
- **Gold button:** Subscribe is gold on every screen, because it is the app's only real commit. "Read the featured post" in the hero is a framed button with a ▶.
- **Header search:** a button (and the `/` key) that jumps to the post search on Home, since the site has no global search.
- **New elements:** prev/next labels are "Newer post ◀" and "Older post ▶" by date. The hero and About title blocks got short eyebrow and meta lines.
- **Category hues and icons:** engineering cyan (gear), design violet (pen nib), writing blue (pencil), process amber (steps), remote work green (house).
- **Author cards:** they show the full bio rather than a 4-line clamp, because each bio fits in five lines.
- **Figure size:** article figures use 6px pixels (120×48 units), so the truck fills half the frame; the spec doesn't set a figure size.