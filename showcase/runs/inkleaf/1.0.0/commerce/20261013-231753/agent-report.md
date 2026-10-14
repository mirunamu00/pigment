I've applied Inkleaf 1.0.0 to all four captured routes and both not-found screens. The build and typecheck pass, and the last snapshot run shows no sideways scroll at 1440px or 390px, light or dark. I could not run the smoke tests, because `npm run test:e2e` isn't one of the commands I was allowed. Every `data-testid`, route, label text, form field and accessibility attribute is preserved, and I checked the markup against each assertion in `tests/smoke.spec.ts` by reading it.

## What changed
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`. Light and dark both work: dark follows the system setting unless `data-theme` overrides it. The three fonts load from Google Fonts with `display=swap`.
- **Signature pieces (in `src/inkleaf/`):**
  - the brush filters and frame clip, mounted once in `Layout`
  - the cel-drawn pictogram: one frame per stroke plus three boil frames, stepping in once when 30% is in view and holding the last frame
  - hands built from `finger()` in the four poses
  - stage, drawing stage and plate, with each product keeping the same colour on every screen
  - write-in headings
  - working glyph, breathing dot and check-circle
  - ring-control buttons and chips
  - block rise (once per route, header drop-in, lede rise)

  All of this motion stops under `prefers-reduced-motion`, and without script everything shows in its final state.
- **Screens:**
  - **Every screen** gets the same header: a small drawing (plays once per session), a written-in h1 and the lede.
  - **Shop:** chips, a styled checkbox and select, product cards with plates showing each product's own drawing, and a drawn empty state.
  - **Product detail:** the product's drawing on a 4:3 stage, styled radios and stepper, and a check-circle on the "Added" message.
  - **Cart:** items, then the order summary in a sticky side card from 992px, then checkout. The confirmation has a drawing and a check-circle "Order placed" line.
  - **Not found:** a drawing on a small apricot stage, a serif h1 and two actions.
- **Drawings:** 18 original ones, 9 with hands, no pose used more than three times. Subjects, the one-word test and poses are listed in `design-system/components.md`.
- **Docs:** `design-system/` (`VERSION`, `components.md`, tokens) and the pointer line in new `AGENTS.md` and `CLAUDE.md` files.

## What I could not apply
- **One commit per screen:** git isn't one of the allowed commands, so everything is uncommitted in the working tree.
- **Working glyph and breathing dot:** they're built but appear nowhere, because the store makes no async requests. Adding a fake delay to show them is forbidden.
- **Header drawing hands:** at 48px the hands on the tag and basket read as a fish tail and a fork, so the three header drawings have none. I added hands to the tote and mug instead, to keep half of all drawings with a hand.
- **Snapshots:** they show product cards below the fold blank, and some drawings caught mid-draw. That's the spec's rise and stepped motion, not a bug. I also couldn't capture the checkout errors, filled cart or confirmation, since the snapshot tool only loads each route fresh.
- **Not checked:** the 200% zoom and keyboard-tab walkthroughs in the spec's verification list.

## Decisions I made
- **New text:** I added an "Order summary" heading, a "View cart" second action on not-found, an "Order placed" success line, and an "N fields need attention" alert on a failed checkout.
- **Not-found stage:** it's a small 16:9 stage sized so the 128px drawing fills 92% of its height. The spec asks for both a 128px drawing and an apricot stage, which otherwise conflict.
- **Header spacing:** on the detail page the breadcrumb sits above the header, and the header's top padding drops to 16px there.
- **Image labels:** the product drawings keep their original "product photo placeholder" labels, since accessibility attributes had to be preserved.
- **`VERSION` date:** the spec has no update date, so I used the date it was applied (2026-10-14).