I've restyled Field Notes with night-cartridge@1.2.0-rc.3 on every screen. The smoke tests pass (9/9), the build passes, and no page scrolls sideways at 1440px or 390px. The spec defines a dark theme only, so the site is dark-only and has no theme switch.

**Two things to finish by hand.** The command allowlist didn't let me run `rm` or `git`:
- **Delete `src/pages/SceneReview.tsx`.** It's the temporary close-up review page for the scenes. Its route is already gone and nothing imports it.
- **Nothing is committed.** The spec asks for one commit per screen, but I couldn't run git, so all changes are uncommitted in the working tree.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`, loaded from `src/main.tsx`. `index.html` loads the four font stylesheets the spec lists and restores the two header switches before the page first draws. `src/styles/base.css` is rewritten and uses token values only. It covers the reduced-motion and square-corner rules, the pixel font setup, the stepped animations, the scene and ground CSS, the ▶ marker, the window frames and the components.
- **Reusable pieces:**
  - `src/pixel/` holds the spec's scene helpers in TypeScript and the sprites for the blog's world, a post-office street (two post-office leads, pillar boxes, carts, a van, houses, a shop, a kiosk, trees, a mast, lamps, a bench, a signpost, a notice board).
  - The scenes are a home hero, an article banner, an about banner, two small vignettes (empty and error), the article figure and the footer's ground strip.
  - `src/components/pixel/` holds the scene container, ground strip, vignette, marker, dithered rule, block meter, window and the pixel icons. `HeaderTools.tsx` has the "Animation on/off" and "Pixel body on/off" switches, which are saved between visits.
- **Every screen:** sticky header with the dithered rule and the blinking marker on the current nav item. Under 1024px the nav moves into a menu button, and the menu traps focus and closes on Escape. The footer has the ground strip and the newsletter panel. "Subscribe" is the only gold button. A failed submit nudges the field, focuses it and shows the "!" icon.
- **Home:** full-width hero with a window holding the 48px title; post cards coloured by tag; filter chips with colour squares; a search field with a pixel magnifier; a block meter beside the "Showing n of m" count; and a vignette in the no-results state.
- **Article:** a banner window with the title block. Each article lights different windows and paints the van in its first tag's colour. It also has dithered h2s, code windows with a Copy button, the figure scene replacing the placeholder image, and a contents list that tracks the current heading and becomes a collapsible section on small screens. I added Previous/Next links between posts.
- **About:** its own banner scene, and author initials on a colour square chosen from the name.
- **Not found and post not found:** the error vignette (lights off, one blinking red beacon) and a window with the message.
- **Docs:** I added `design-system/` (`VERSION` and `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

All routes, labels, form fields, `data-testid`s and accessibility attributes are unchanged.

**What I couldn't apply**
- **Date format:** article dates stay "September 28, 2026" because the tests check that exact text. The new text I added uses 2026.09.28.
- **Header search and global search:** the app has neither, so there's no search button in the header.
- **Nav length:** the spec wants 3–5 nav items; there are still only Home and About.
- **Hero layout rules:** a few can't all be met at 1440px with the window covering the left third. The 60–160-unit open ground between prop groups, and the rule that one tall tree or mast sits within 40 units of the main buildings while another sits in a group, are only partly met.
- **Error-page gold "Retry":** a 404 has nothing to retry, so the home link is a normal framed button.
- **Unchecked items:** I didn't run an accessibility audit (axe) or produce the spec's measurement tables (variant table, sprite-size table). Missing images are shown as a scene, so the sprite-size table wouldn't apply anyway.
- **Font links:** they use the spec's `@latest` CDN addresses as written.

**What I decided myself**
- **Gold button:** I made the footer's "Subscribe" gold, since it's the only real commit on any screen.
- **Hero button:** "Read the featured post ▶" is a framed link, not gold.
- **Card grids:** cards are at least 320px wide instead of the spec's 200px, so you get three readable columns instead of 5+1.
- **Missing gold-border token:** the spec's gold-button border colour isn't in the token set, so it falls back to the gold fill colour.
- **Scene changes after review:** I looked at the scenes zoomed in on a temporary page and fixed what read wrong. The trees became pines, wheels are darker, the envelope signs read more clearly, and a street band across the hero's foreground keeps any flat area under 32 units tall.
- **About banner:** it reuses the article banners' post-office building on the left, with different neighbours and skyline.