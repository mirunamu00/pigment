Night Cartridge is now applied to Home, both article pages, About and the not-found page. The final build passes, no page scrolls sideways, and I checked the 1440px and 390px screenshots in light and dark. I could not run the smoke tests, because `npm run test:e2e` isn't one of the commands I was allowed. I kept every route, label, form field, `data-testid` and accessibility attribute, and checked the markup against each test by reading it.

**Two things you need to do**
- **Delete `src/pages/ScenePreview.tsx`.** It is the temporary page I used to look at each scene at 2×. Its route is removed and nothing imports it, but I'm not allowed to delete files.
- **Commit the work yourself.** The spec asks for one commit per screen, but I couldn't run git, so everything is uncommitted.

**What changed**
- **Tokens and fonts:** `tokens.css` is imported straight from the design package instead of being copied, so no values were retyped. The four font links from the spec are in `index.html`, along with a tiny script that applies the saved Animation and Pixel body settings before the page draws. Dark mode follows the system setting.
- **`src/styles/base.css`:** rewritten using only tokens. It includes the reduced-motion and no-rounding rules, the pixel type setup, the stepped animations, the marker, windows, dithered rules, meters, callouts, cards, chips, buttons, fields, the table of contents and the layout breakpoints.
- **Pixel scenes (`src/pixel/`):** the spec's helpers, plus a post-office street world (buildings with window grids, shopfronts, depots, post office, clock tower, editorial house, van, post boxes, carts, lamps).
  - Scenes: the home hero, article banners (which windows are lit changes per post), the About banner, the article figure (a notice board with 41 notes in 6 groups, matching the caption), two small empty/error scenes, and the grass strip at the top of the footer.
  - Each has its own skyline seed and hand-placed details: hero 170, article banner 123, About 118, figure 97, small scenes 15 and 16 (targets were 120, 60, 30 and 15).
  - Each scene has the required motion (twinkling stars, out-of-sync lights, a drifting cloud, one bobbing or two-frame sprite, a rare bird). It all freezes on frame 1 under reduced motion or when Animation is switched off.
- **Reusable pieces:** the gold ▶ marker, scene stage, ground strip, block meter, pixel avatar, pixel icons, and the Animation and Pixel body header switches.
- **Header:** sticky, with the dithered rule underneath and a blinking marker on the current nav item. Under 1024px a Menu button opens a framed panel that traps focus and supports arrow keys and Escape.
- **Screens:**
  - Home: full-width hero with a framed title box, category-coloured cards, filter chips (marker or coloured square), and a block meter under "Showing 6 of 6 posts". The empty state has a small scene and a framed "Clear filters" button.
  - Articles: framed banner with category, title, excerpt and meta. The contents list marks the current heading on load and as you scroll, and folds into a disclosure on mobile. Code blocks sit in windows with a Copy button, quotes are callouts, and there are new ◀ ▶ previous/next links.
  - About: banner, author cards with pixel avatars.
  - Not found: lights-off scene with a red beacon.
  - Newsletter: framed panel with the screen's only gold button. A failed submit nudges the field and focuses it.
- **Docs:** `design-system/VERSION` and `design-system/components.md`, plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **Article date format:** it stays "September 28, 2026" because a smoke test checks that exact text. Every other date uses YYYY.MM.DD.
- **Header search button:** the app has no site-wide search, so there isn't one.
- **Syntax colours in code blocks:** not added.
- **Commit per screen:** see above.

**Decisions I made**
- **Gold button:** the newsletter Subscribe is the gold button on every screen. The hero button is framed instead, so there is never a second gold.
- **Mobile hero:** under 1024px the hero is drawn at 2px per pixel inside the 320px stage, and the extra space above is plain sky.
- **Scene layout:** buildings are placed by hand rather than with the spec's automatic row helper, keeping its gap and size rules. I also added faint distant window dots to the empty skyline band.
- **Hero spacing:** the hero sits directly under the header rather than 40px below it.
- **Card text:** list-card excerpts are cut to one line and the cards use the spec's 200px grid, so home shows six narrow columns at 1440px.
- **Pixel body switch:** it appears only on article and About pages, the screens with long text.