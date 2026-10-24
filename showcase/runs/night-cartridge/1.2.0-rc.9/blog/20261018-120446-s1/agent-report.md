I've restyled every screen in Night Cartridge 1.2.0-rc.9. The build passes, all 9 smoke tests pass, and the final screenshots show no page scrolling sideways at 1440px or 390px. The menu-button fix and the removal of the temporary review route were checked in that final run.

**What changed**
- **Tokens and setup:** `tokens.css` is copied as-is into `src/styles/`. The fonts load from the spec's links, and the spec's root CSS is in place: no radius, no transitions, everything stops under reduced motion or when the Animation switch is off. The old variables, radii and transitions are gone.
- **Reusable pieces** (`src/components/pixel.tsx` and others): pixel scene, ground strip, vignette, ▶ marker, dither rule, block meter, callout, pixel icons, code window (with a copy button), contents list (scroll-tracking marker, collapsible under 1024px), and the Animation / Pixel body switches (remembered between visits).
- **Pixel art** (`src/art/`): I ported the spec's scene helpers and added a small grid that adds the outline, highlight and shade to each sprite. The world is "Press Row", a night street in a small-town press quarter:
  - Home hero: a print house with an INK sign.
  - Each of the 7 articles has its own banner building: TYPE, NOTE, FLAG, POST, TIME, SIGN, BELL.
  - About: a reading room (READ).
  - Three figure scenes inside articles, an empty-search vignette, a not-found vignette (lights off, one red beacon), and the grass strip on every footer.
  - Every scene has twinkling stars, blinking lights, a drifting cloud, one moving sprite and a rare shooting star.
- **Screens:**
  - **Header** (every page): dithered rule, marker on the current nav item, search button with a "/" shortcut, both switches. Under 1024px they move into a menu that traps focus.
  - **Home:** hero window, a featured card, filter chips with category-colour bullets, and a block meter under "Showing n of m".
  - **Articles:** banner window, ruled headings, code windows, quote callouts, contents list, previous/next links.
  - **About:** banner and author squares in a colour picked from the name.
  - **Not found:** vignette plus message window.
  - **Footer:** newsletter in a framed panel with the only gold button, a nudge and a "!" icon on error.
- `design-system/VERSION`, `design-system/components.md`, `AGENTS.md` and `CLAUDE.md` are added.

**What I couldn't apply**
- **Light mode:** the spec defines dark only, so there is no light theme. The light and dark screenshots are identical.
- **Date format:** the article page keeps "September 28, 2026" because a smoke test checks that exact text. Cards use the spec's YYYY.MM.DD.
- **Commits:** I didn't make the spec's one-commit-per-screen history; everything is uncommitted in the working tree.
- **Stray empty file:** `src/pages/ArtReview.tsx` held the temporary review page. It's now empty and no route uses it, but deleting it needs a command outside the ones you allowed. Please remove it.
- **The spec's closing report tables** (sprite table, variant table, per-scene numbers) aren't written up. The scene composer calculates the numbers, and I checked them on the review page:
  - Hero: lead 50 units tall, path end 369, details 120+ after I added more.
  - Banners: leads 52–60 units (104–120px), 70+ details each.
  - Gaps and tall-prop clearances were inside the spec's limits.

  There are no item sprites, so the sprite table would be empty.
- **Not run:** I didn't run an accessibility audit (axe); it isn't one of the allowed commands.

**Decisions I made**
- The footer Subscribe button is the gold one, because it's the only form submit on any screen. The hero's "Read the featured post" is a normal framed button.
- Category colours: Engineering cyan, Design violet, Writing blue, Process amber, Remote work green; About uses teal.
- I added a few small things the spec doesn't cover, all noted in `components.md`:
  - a second colour for roofs and awnings
  - staggered twinkle timing
  - a mast shape for the far ridge
  - a light syntax highlighter in code blocks
- Article figures are 180×72-unit scenes at 4px per unit, halved to 2px on phones, and they keep their alt text.