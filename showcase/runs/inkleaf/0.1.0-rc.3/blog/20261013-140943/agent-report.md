I've restyled every screen to Inkleaf 0.1.0-rc.3, in light and dark. The build and typecheck pass, and `node pigment-snap.mjs` reports no sideways scroll at 1440px or 390px.

**Testing:**
- I couldn't run the smoke tests themselves, because `npx playwright test` isn't one of the commands I was allowed. I kept every `data-testid`, route, heading id, label text and accessibility attribute, but please run them once.
- In the final screenshots, anything below the fold is blank. That's the spec's "block rise": blocks start hidden and appear when they scroll into view, and the screenshot tool doesn't scroll. To check those areas, I added a temporary style that forced everything into its final state, took screenshots of every page, mobile and dark, then removed it and took the final set.
- The two not-found screens aren't in the screenshot routes, so I haven't looked at them.

**What changed**
- **Tokens and setup:** a verbatim copy of `tokens.css` is in `design-system/` and loads first. Dark mode follows the system setting. Fonts load from Google Fonts in `index.html`. `src/styles/base.css` is rewritten to use only the tokens, plus the reduced-motion block and focus outline from the spec.
- **Signature pieces** (in `src/components/ink/`), all reusable and all frozen under reduced motion:
  - The hand-drawn pictogram, with 11 original drawings, 6 of them with a hand.
  - Pastel stages and plates.
  - Headings that fade in word by word.
  - The working glyph, breathing dot and check-circle icon.
  - The button and input styles.
- **Home:** a pen drawing above the h1 (the page's one accent colour). The featured post sits beside a drawing stage. The "More posts" heading is above the filter chips (left) and search (right), with a 3/2/1-column grid of post cards, each with its category drawing. The empty search result gets its own drawing.
- **Article:** the post's drawing on a stage, and the inline figure is now a stage showing a faded board preview. The table of contents is a sticky side column on wide screens and a collapsed "On this page" disclosure below 992px. Pull quotes are serif and related posts are cards.
- **About:** a centred heading, an open-book drawing opening "Why we write", and author cards with coloured initial tiles.
- **Not found and post not found:** a lost-key drawing on an apricot stage, a serif h1 and two actions.
- **Newsletter:** an envelope drawing that changes to a mailbox on success, a check-circle with the confirmation text, and the error shown as a red outline and message. The input and button stack on mobile.
- I added `design-system/` (`VERSION`, `tokens.css`, `components.md`) and the pointer line in `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **Post titles stay in Title Case:** the data uses it and the tests match the exact text, though the spec forbids title-case headings.
- **The working glyph and breathing dot are built but unused:** the newsletter submit is synchronous and there are no running jobs. The spec says the glyph only shows during real requests, so subscribing goes straight to the confirmation.
- **The empty-state title doesn't name the filter**, because that would change label text.
- **No commits were made**, so the spec's one-commit-per-screen rollback isn't set up yet. Everything is uncommitted in the working tree.

**Decisions I made**
- The brand's small logo icon is removed (the spec says no invented logo).
- The "Search posts" label is visually hidden but its text is kept. I added a "Clear search" button inside the field, as the spec's search field has one.
- The not-found pages gain a second action, "Read about us", since the spec asks for two.
- Plate colours rotate by position in the grid (sage, lilac, apricot) so neighbours never match. Each tag has one drawing.
- I moved the table of contents inside the `<article>` so it can sit after the header and stage on mobile.
- Article body headings (h2/h3) stay static, while page h1s, section h2s and the empty-state title fade in.