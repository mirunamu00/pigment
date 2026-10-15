The Night Cartridge restyle is applied to every screen: Home, Article, About and both not-found states, in light and dark. The final `npm run typecheck` and `node pigment-snap.mjs` both passed, and no page scrolls sideways at 1440px or 390px. **I could not run the smoke tests** (`npm run test:e2e` isn't one of the four commands I was allowed). I kept every route, label text, `data-testid`, heading id, `aria-*` attribute and behavior they rely on, and kept the existing date format because a test checks "September 28, 2026". They still need a run to confirm.

**What changed**
- **Tokens and fonts:** `src/styles/base.css` now imports the package's `tokens.css` directly instead of a retyped copy, then sets up the root motion/shape rules, the pixel type and the focus ring. The four font links from the spec are in `index.html`. The old radius, shadow and transition styles are gone.
- **Pixel scenes (`src/pixel/`):** one world built from the spec's recipe, a post-office street (post office with clock tower, annex, apartment block, houses, a shop, pillar post boxes, a mail van, parcel carts, lamps). It is used as:
  - the Home hero, with the welcome window over its left third;
  - a banner window at the top of articles, and a variant on About with different skyline, lights and one swapped prop;
  - the inline article image (a notice board with six clusters of notes);
  - a small scene in the empty search result, and a lights-off version with a red beacon on not-found pages;
  - the ground strip at the top of the footer on every page.

  Stars twinkle, lamps blink out of sync, a cloud drifts, a flag bobs and a shooting star passes now and then. All of it stops under `prefers-reduced-motion` and when the new header "Animation" switch is off.
- **Reusable pieces:** the scene stage, ground strip, ▶ marker, dither rule, block meter, callout, pixel icons and hashed avatars are in `src/components/pixel.tsx`. The Animation and "Pixel body" header switches are saved in the browser.
- **Screens:**
  - Header: sticky, with the dither rule under it and the marker on the current nav item.
  - Home: cards carry a coloured bar per category, filter chips carry a bullet or the marker, and a 6-block meter sits next to "Showing n of m".
  - Articles: code sits in a window with a Copy button, the quote is a callout, and there are previous/next links. The contents list highlights the heading you are reading and becomes a collapsible section under 1024px.
  - Newsletter: shakes once and focuses the field on an error.
- **Docs:** `design-system/` (version, the world, scenes by screen, category colours) plus `AGENTS.md` and `CLAUDE.md` pointer lines.

**Could not apply**
- **No commits.** The spec asks for one commit per screen, but git wasn't in the allowed commands.
- **Leftover file to delete:** `src/pages/ScenesReview.tsx`. It held the temporary scene-review page, whose route is removed. I couldn't delete files, so it is now an empty stub.
- **Dates** stay "September 28, 2026" rather than the spec's `YYYY.MM.DD`, because the tests check that text.
- **No header search button**, since the app has no site-wide search. **No syntax highlighting** in code blocks, since the posts' code has nothing to colour by.
- **Pixel art rules:** a few columns of the background ridges may still run slightly over the "no flat colour over 25% of the height" limit. Hand-placed texture breaks up most of each ridge, but not every column. I checked the scenes in two enlarged review rounds rather than by measuring every column.

**Decisions I made**
- **Mobile header:** the two nav links stay inline at every width instead of a menu button. Under 600px the header switches become icon-only buttons and keep their text as the screen-reader label.
- **Mobile hero:** under 1024px the hero art is drawn at 2px per unit in a 256px band. The spec's 320px height can't hold this scene at a whole-number scale. On narrow screens each scene shifts so the main buildings stay in view.
- **Hero window width:** it shrinks between 1024px and 1440px so no building sits under it.
- **Gold button:** only Home ("Read the featured post") and the not-found link use it. Newsletter "Subscribe" is a plain framed button because it's in the footer, not page content.
- **Card grid:** I kept the spec's 200px minimum column. At 1440px the six posts fall into 5 + 1 columns. A 320px minimum would give a tidier 3 × 2 if you prefer that.
- **New text:** I added a hero tagline ("The unglamorous parts of making software"), a "Required." helper under the email field, and the post excerpt as the article intro.