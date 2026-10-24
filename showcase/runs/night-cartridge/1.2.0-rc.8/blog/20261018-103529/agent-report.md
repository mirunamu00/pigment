I've restyled every screen of Field Notes with Night Cartridge 1.2.0-rc.8. The build passes, all 9 smoke tests pass, and the final snapshot run shows no page scrolling sideways. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

## What changed
- **Foundation:** the tokens are copied unchanged into `design-system/tokens.css` and imported by a rewritten `src/styles/base.css`. Fonts load through the specification's four links in `index.html`. The old light theme, rounded corners, soft shadows and transitions are gone.
- **Theme:** the specification is dark only, so there is no light theme. In the light snapshots the pages look the same as in dark.
- **Reusable pieces:** the marker, scene stage, dither patterns, vignette, ground strip, window, dither rule, block meter and callout are in `components/pixel.tsx`. The pixel icons are in `Icon.tsx`. The Animation and Pixel body switches (saved between visits) are in `HeaderTools.tsx`.
- **Scene engine:** `src/art/pixel.ts` has the specification's drawing helpers plus a sprite builder that adds the outline, highlight and shade automatically. `src/art/sprites.ts` and `src/art/scenes.ts` hold the scene world.
- **Scene world:** "Press Row", a printers' street at night. It has nine buildings, each used once: the print house leads the home hero, each of the seven posts gets its own banner building, and the library leads the About banner. There are also 13 yard props, 4 tall verticals, 3 article figures, 3 vignettes (empty search, not found, post not found) and the ground strip. All scene motion is stepped and freezes on the first frame under reduced motion or when Animation is switched off.
- **Screens:**
  - **Header:** sticky with the dither rule and a blinking marker on the current page. It has a Search button with a `/` shortcut, the two switches, and a menu that keeps focus inside it on small screens.
  - **Home:** the hero with its Window, hue-coded cards, filter chips with hue bullets, and a block meter under "Showing n of m". The empty state shows a vignette.
  - **Article:** a banner Window with the title below it, dithered headings, code windows with a Copy button, the quote as a callout, and pixel-scene figures. The contents list marks the current heading as you scroll and folds into a disclosure on small screens. Previous/next links and related cards follow.
  - **About:** a banner, avatars, and a per-author post-count meter.
  - **Not found pages:** a vignette with a red warning light, plus a Window with the message.
  - **Footer:** the newsletter form in a framed panel, with a gold Subscribe button and a 2px nudge on error.
- **Checks:** I reviewed every scene at 2× on a temporary page and fixed the faults it showed. Stray detail pixels now only draw on their own sprite. I redrew the radio mast, which read like a fork. I moved two trees that weren't 4 units clear of the far ridge. All leads are now 55–59 units tall (110–118px), the hero path ends at x 409, and every row of controls measures 40px. That review route is removed.
- **Docs:** I created `design-system/` (VERSION, tokens, `components.md` with the world, the scenes per screen and the tag hues), `AGENTS.md` and `CLAUDE.md`.

## What I couldn't apply
- **Commits:** the specification asks for one commit per screen, but `git` wasn't among the commands I was allowed to run, so everything is uncommitted.
- **Leftover file:** for the same reason I couldn't delete `src/pages/ReviewPage.tsx`. It's now an unused stub and can be deleted.
- **Date format:** dates stay "September 28, 2026" rather than `YYYY.MM.DD`, because the tests check that exact text.
- **Navigation size:** the header has 2 items, not 3–5, because the app only has two top-level routes.
- **Not-found button:** there's no gold "Retry", since there's no request to retry. The page has a framed "Go to the home page" link.
- **Not checked:** I didn't run an accessibility (axe) audit. The sprite-size table doesn't apply because there are no item sprites.

## Decisions I made
- **Gold button:** Subscribe is the one gold button on every screen, because it's the only real commit in the app. The hero button is a framed "Browse the posts ▶" link.
- **Figures:** they use 4px pixels (180×60 units, 720×240px) and keep their alt text as the accessible name.
- **Header Search:** it focuses the post search on the home page, or goes there first from other pages.
- **Newsletter helper text:** I added "Required. We only use it to send new posts." so the field says it's required in words.
- **Second animation frame:** it's hidden when motion is off, so the scene rests on frame 1.