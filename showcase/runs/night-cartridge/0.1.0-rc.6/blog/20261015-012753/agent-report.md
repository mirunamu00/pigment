I've applied night-cartridge@0.1.0-rc.6 to every screen. The typecheck and build pass, and the final snapshot run reports no sideways scroll on any page at 1440px or 390px, in light or dark. I didn't run the Playwright smoke tests, because `npx playwright test` isn't one of the commands I'm allowed. Every `data-testid`, label, route, ARIA attribute and the exact text the tests check is preserved.

## What changed
- **Tokens and fonts:** `design-system/tokens.css` imports the package's `dist/tokens.css` rather than retyping it. The four font links from the spec are in `index.html`. Light and dark follow the system setting.
- **Base styles:** `src/styles/base.css` is fully rewritten. `src/styles/art.css` holds the spec's root block (no radius, no transitions, motion stops under reduced motion), the stepped animations, the ▶ marker, game windows, dithered rules, hue bars, bullets, block meters and callouts.
- **Pixel scenes:**
  - The world is a post-office street. The helpers are in `src/art/pixel.ts`, the sprites in `src/art/sprites.ts` and the scenes in `src/art/scenes.ts`.
  - The scenes are a home hero with a Window over its left third, an article/About banner (each screen has different lit windows), two small square scenes (empty results; not found with the lights off and one red beacon), a prose figure that keeps `role="img"`, and the ground strip at the top of every footer.
  - Motion: stars twinkle, lights blink out of sync, a cloud drifts, a flag swaps between two frames, and a bird crosses rarely. All of it stops under reduced motion or with the Animation switch off.
- **Header:**
  - Brand mark, then nav items with the ▶ marker on the current page (it blinks).
  - A framed Search button with a `/` shortcut; both jump to the home page's post search.
  - An "Animation on/off" switch on every screen and "Pixel body on/off" on articles and About. Both are remembered.
  - Under 1024px the header collapses to a search icon and a Menu button. The menu traps focus, supports arrow keys, and closes with Escape.
- **Home:**
  - The hero, a featured card, and post cards with a hue bar and icon per category.
  - Filter chips show a hue bullet, or the ▶ marker when selected.
  - The search field has a pixel magnifier, and "Showing n of m" has a block meter under it.
  - When no posts match, a small scene appears with a framed "Clear filters" button.
- **Article:**
  - A banner Window carrying the category, h1, lede, meta and tags.
  - Dithered h2s, quotes as callouts, and code in a window with a Copy button.
  - A sticky contents list that marks the heading you're reading; it becomes a disclosure on mobile.
  - New ◀ ▶ previous/next links.
- **About:** a banner Window, dithered h2s, and author cards with 8×8 pixel avatars generated from each name.
- **Newsletter:** a framed panel with the gold Subscribe button. On error the field turns red, shakes once and gets focus; the error has a warning icon. Success shows as a callout.
- **Docs:** `design-system/` (`VERSION`, `components.md`) and the pointer line in `AGENTS.md` and `CLAUDE.md`.

## What I couldn't apply
- **One commit per screen:** git isn't among the allowed commands, so all changes are uncommitted.
- **Leftover file:** the temporary scene-review route is gone, but I couldn't delete its file; `src/pages/ArtReview.tsx` is an empty stub you can remove.
- **Dates:** they stay "September 28, 2026" because the smoke tests check that format; the spec wants `YYYY.MM.DD`.
- **Unverified scene numbers:** I couldn't run a script to measure the scenes, so the per-column flat-tone limit and the full count report weren't checked. The scenes were reviewed by eye in two rounds at 2×, in light and dark.
- **Offline test risk:** the web fonts load from CDNs, so a test run without network access would log console errors.
- **No accessibility scan:** I didn't run an axe check.

## Decisions I made
- **Gold button:** Subscribe is the single gold button on every screen. The hero's "Read the featured post" and the error pages' links are framed buttons, because the blog has no other real commit and a 404 has nothing to "Retry".
- **Card grid:** it keeps the spec's `minmax(200px, 1fr)` but caps at three columns, so six posts end in level rows instead of leaving one orphan card.
- **Mobile crops:** under 1024px the hero shifts its crop so the post office stays in view. The 390px banner shows the post office at its left edge.
- **Article layout:** the contents list moved inside `<article>` so the banner can span the full width while the h1 stays inside the article, as the tests require.
- **Newsletter helper:** I added the text "Required. We only use it to send new posts.", linked to the field only while there's no error.
- **Avatars:** the initials (which screen readers already skipped) are replaced by the pixel avatar.