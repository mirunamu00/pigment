I've applied Inkleaf 1.1.0-rc.3 to all four routes (Home, both Article pages, About) and to Not found. The build and typecheck pass, all 9 smoke tests pass, and no page scrolls sideways at 1440 or 390, light or dark.

**One thing to know before opening `.snaps/`:** the snap tool takes full-page shots without scrolling. Content that starts below the fold therefore appears blank: the h2s, plates, figures and newsletter. That is correct behaviour — the spec has those blocks rise and write in when they scroll into view. Drawings that are still playing appear part-drawn. To check the finished state, I added a temporary `/review/*` route that shows the real pages with all motion finished, as under reduced motion, plus a sheet of every drawing. I reviewed all of it at both widths and in both themes, fixed what was wrong, and removed the route from `App.tsx`.

**Cleanup needed:** `src/Review.tsx` and `src/review.css` are still on disk. Nothing imports them, but the commands I was allowed to run can't delete files, so please remove them.

**What changed**
- **Tokens and fonts:** the tokens are an unedited copy in `design-system/tokens.css`, and the old variables in `base.css` now point at them. Dark mode follows the system setting. The three fonts load from Google Fonts. `base.css` is rewritten.
- **Signature pieces** (`src/inkleaf/`):
  - the pictogram engine built from the recipe's brush filters, hairpin finger and frame strip (draws once, holds the last frame, stops under reduced motion);
  - pastel stages, 4:3 drawing stages and plates;
  - headings that fade in word by word;
  - the working glyph, breathing dot and check-circle;
  - the button and input styles, and the block rise on scroll.
- **12 original drawings:** a pen (accent fill), a swatch fan, megaphone, flag, scissors, alarm clock, empty box, mug, pencil, postcard, folded map and sieve. Six include a hand, and no pose is used more than twice. Each post keeps the same drawing and colour on its card and its page.
- **Home:** large pen drawing next to the h1, the featured post beside its drawing stage, a search field with its own clear button, tag chips, cards with a plate each (2 columns on mobile), and a drawn empty state.
- **Article:** the post's drawing as the lead image. The contents list sits beside the text on desktop and becomes a collapsed disclosure on mobile. The three image placeholders are now wireframe-style previews shaped like their captions: a grid of six groups, two panels side by side, and three steps joined by lines.
- **About:** a pencil drawing opens "Why we write", and the author cards have coloured initial tiles.
- **Not found:** a map drawing, a large heading and two actions.
- **Newsletter:** stacks to full width on mobile; success shows the postcard drawing plus a check-circle.
- **Docs:** `design-system/` (version, tokens, `components.md` with each drawing's subject and one word), plus `AGENTS.md` and `CLAUDE.md` pointing to it. Every route, label, `data-testid` and accessibility attribute is preserved.

**What I couldn't apply**
- **Title case:** the spec wants sentence-case headings, but post titles stay title case because the tests check their exact text.
- **Working glyph:** it is built but used nowhere. Nothing in the app waits on a request, and the spec forbids adding artificial delays.
- **One commit per screen:** not done, since git wasn't among the commands I was allowed to run.

**Decisions I made**
- **Article pages:** the post's drawing on its stage is the main image, with no separate small drawing above the title.
- **Logo:** I removed the small icon next to "Field Notes" in the header, following "no invented logo".
- **Data:** I added a `preview` field to the three figure entries in `posts.ts` to choose each preview's shape.
- **Small additions:** a second link on the Not found pages ("About Field Notes"). The newsletter field now gets focus after a failed submit. An odd last card spans the full row on mobile.
- **Version date:** the spec has no update date, so `VERSION` uses the reference capture date, 2026-10-13.