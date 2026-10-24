I've restyled the Field Notes blog with Night Cartridge 1.2.0-rc.5 across every screen: home, both articles, about and the not-found pages. The build and typecheck pass, all 9 smoke tests pass, and `pigment-snap` shows nothing scrolling sideways. I looked at the PNGs at 1440px and 390px.

The specification is dark only and has no light theme. So the "light" and "dark" snapshots are the same, and there is no theme switch.

**What I changed**
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package tokens, imported by a rewritten `src/styles/base.css`. Fonts load from the links the spec gives. I removed rounded corners, soft shadows and transitions.
- **Reusable pieces:**
  - The scene helpers, sprites and every scene are under `src/pixel/`. `stage.ts` records the numbers the report needs.
  - `components/pixel/Pixel.tsx` holds the stage, vignette, figure, ground strip, the ▶ marker, dither rule, block meter, callout, hue bullet and hued-initial avatars.
  - The pixel icons are in `components/pixel/icons.tsx`.
  - The two header switches (Animation, Pixel body) are in `components/HeaderTools.tsx`. They are saved per viewer and work through `data-motion` / `data-body`.
- **Scenes:** the world is a post-office street at night. Each screen has its own lead building:
  - The hero has a post office. Each of the 7 articles and the About page has its own building (sorting depot, clock tower, telegraph office and so on).
  - There are 3 small vignettes (empty search results, page not found, post not found) and 3 inline article figures that replace the image placeholders.
  - The ground strip sits above the footer on every screen.
  - Motion is stepped: stars twinkle, lights blink out of sync, a cloud drifts, a flag swaps frames, and a bird crosses now and then. It all stops under `prefers-reduced-motion` and when the Animation switch is off.
- **Screens:**
  - **Header:** sticky with the dither rule, a blinking marker on the current nav item, a Search button with a `/` shortcut, and a mobile menu that keeps focus inside it while open.
  - **Home:** hero with a window, filter chips with hue bullets, a block meter for "Showing n of m", hue cards, and the vignette for empty results.
  - **Articles:** a banner window with the title block, ruled headings, code windows with a Copy button, quotes as callouts, a contents list that tracks the heading you're reading (a disclosure on mobile), and ◀ ▶ previous/next links.
  - **About:** a banner and avatars.
  - **Errors:** a window with a vignette.
  - **Newsletter:** a framed panel with the gold Subscribe button and a nudge on error.
- All routes, labels, `data-testid`s and ARIA attributes are kept.
- I added `design-system/VERSION`, `design-system/components.md`, `AGENTS.md` and `CLAUDE.md`, as the spec asks. The temporary scene-review route is removed.
- Nothing is committed yet. The spec asks for one commit per screen, but you didn't ask me to commit, so the changes are still uncommitted.

**What I could not apply, or only partly**
- The spec's verification tables (sprite table, variant table, numbers for each scene) are not written out. From code: there are no item sprites. The hero path ends at x 385 (allowed range 366–416), the hero lead's base is at y 95 and it is 48 units tall, and each scene has 6–8 lights. The verticals rise 5 units above the far ridge.
- I did not run the axe accessibility check; it isn't among the commands I'm allowed to run.
- The detail dots are typed by hand, but ground tufts take their height from the ground line, and the figure timeline's stones are placed by a loop. In places the far ridge and near ground are probably taller than the 32-unit flat-tone limit.
- The article date stays "September 28, 2026" because a test checks that exact text. Cards use the spec's `YYYY.MM.DD`.
- Font stylesheets load from `@latest` URLs, exactly as the spec writes them.

**Decisions I made myself**
- **Gold button:** the newsletter Subscribe is the gold button. It is the only commit action on every screen, so the hero's "Read the post ▶" is a plain framed button.
- **Hero window:** below 1280px (not 1024px) the hero window moves under the scene. Between 1024 and 1279px it would otherwise cover the buildings. Above that width, the scene is anchored to the content's left edge.
- **"Featured" label:** it stays an `<h2>` but is styled as a small caption inside the hero window.
- **Added text:** the newsletter now has a helper line, "Required. We only use it to send new posts.", because the spec wants "required" in words. The hero has the eyebrow "Essays from a small product team".
- **Search button:** it focuses the post search on Home, and from any other page it navigates there first.