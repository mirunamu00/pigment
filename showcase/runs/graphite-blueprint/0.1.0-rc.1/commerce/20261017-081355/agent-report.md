I've restyled every screen with Graphite Blueprint, in light and dark. The final `node pigment-snap.mjs` run built cleanly, found no sideways scroll, and I looked at the screenshots of each screen against the spec. **I could not run the smoke tests:** `npm run test:e2e` isn't one of the commands I was allowed. Every `data-testid`, route, label, form field and ARIA attribute is kept and the cart logic is unchanged, but nothing has checked that the tests pass.

**What changed**
- **Tokens and setup:** `src/styles/tokens.css` is an exact copy of `dist/tokens.css`. The old variables in `base.css` now point at the new tokens. Light or dark follows the device setting. Inter and Geist Mono load from Google Fonts with `display=swap`. Focus outlines, hover rules and the reduced-motion block are set as the spec says.
- **The six signature pieces**, each a reusable component in `src/components/signature/`, built to the spec's recipes:
  - the stage (lit and quiet) with its caption
  - the dot glyph with all its patterns, plus the dot meter and dot field
  - the blueprint drawings: geometry in `blueprint.ts`, components in `BlueprintDrawing.tsx`
  - the spec plate
  - the shimmer, live edge, pulse and caret styles
  - the opener, screen head and section head

  I checked each one on its own on a temporary route in both themes, then removed the route.
- **Screens:**
  - **Header:** sticky see-through bar, pill nav links, and the cart as an icon button with its count badge.
  - **Footer (every page):** a centred two-tone statement over the dot field.
  - **Product grid:** split header with a "→" link, filter chips, a styled checkbox and select, and a hairline grid of cards. Each card has a spec plate picked from the product's slug.
  - **Grid with no results:** the 48px empty dot glyph, "NO RESULTS", and a secondary pill.
  - **Product detail:** the spec figure on a quiet stage with a FIG caption, size/colour options as segmented pills, a pill-shaped quantity stepper, and a success banner after Add to cart.
  - **Cart:** screen head, "01 / 02" and "02 / 02" section headers, a summary card, and the spec's "N fields need attention" alert on a failed submit.
  - **Empty cart:** a dimmed stack drawing that lifts on hover.
  - **Order confirmation:** a joined-parts drawing and a two-tone sentence.
  - **Page not found / product not found:** a broken-connector drawing on a quiet stage, "ERR 404", and two pills.
- **Docs:** `design-system/` (`VERSION`, `components.md`) and the pointer line in new `AGENTS.md` and `CLAUDE.md` files.

**What I couldn't apply**
- **No commits.** The spec asks for one commit per screen, but git wasn't in the allowed commands, so everything is uncommitted.
- **One leftover file:** on Windows, `Blueprint.tsx` and `blueprint.ts` count as the same module, so I moved the components to `BlueprintDrawing.tsx`. I couldn't delete the old `Blueprint.tsx`; it's now an empty stub and safe to delete.
- **Looping motion isn't used on any screen:** the running dot glyphs, shimmer, live edge, pulse, caret and the stage's entry animation are built but unused. Everything in this app happens instantly and nothing streams, and the spec forbids fake working states. The motion you will see is the blueprint lift on hover and the success banner fading in; both stop under reduced motion.
- **No lit stage:** there's no landing page, so only quiet stages appear.

**Decisions I made myself**
- **Store header:** the grid page uses the split header with smaller top spacing than the spec's (64px instead of 160px), since this is a store page, not a content section.
- **New text:** I added a few short lines: mono labels ("CATALOG · 11 GOODS", "ORDER PLACED"), the "Browse in-stock goods →" link (goes to `/?stock=in`), FIG captions, and the cart's "N items in your cart." summary.
- **Header:** there's no inverse pill in the header because the store has no main header action. The cart button's "Cart" text is hidden visually but stays in the page.
- **Plate numbers:** "FIG nn" comes from each product's position in the catalogue.
- **Footer dot field:** hidden under 640px, so it never sits under the text.
- **Review routes:** to see the filled cart, form errors and confirmation, I used temporary routes that fill the cart automatically. They're removed.