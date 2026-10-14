I've restyled every screen of Northwind Ops with inkleaf@1.0.0, in light and dark. The build passes, and the last `node pigment-snap.mjs` run found nothing scrolling sideways at 1440px or 390px. I did **not** run the smoke tests, because `npm run test:e2e` isn't one of the commands you allowed. I checked each test against the code by reading through it, and every route, label, form field, `data-testid` and accessibility attribute is kept.

**What changed**
- **Tokens and root setup:** `design-system/tokens.css` is an exact copy of the package file. Dark mode follows the system setting unless `[data-theme]` overrides it. `src/styles/base.css` is rewritten using token variables only, plus the spec's focus outline and reduced-motion rules.
- **Fonts:** I bundled the three fonts locally with `@fontsource` packages (added to `package.json`, then `npm install`). Loading them from Google instead would log a console error whenever the network is unavailable, which would fail the "no console errors" smoke test.
- **Signature elements**, each built as a reusable piece in `src/design/`:
  - Brush filters, rendered once at the app root.
  - Hand-drawn pictograms that step in once (header drawings play once per session) and hold their final frame.
  - Pastel stages with wandering lines.
  - Headings that fade in word by word, while their text and accessible name stay the same.
  - The working glyph, breathing dot and check-circle.
  - The ring-style buttons and the shared screen header.
  - Blocks that slide up into view on a page's first visit.
  - Stage-coloured avatars.
  - All motion stops under reduced-motion.
- **Shell:** full-width header with the product name, search with its own clear button, and an account menu. The sidebar shows from 992px; below that, a menu button opens a sheet of the same links. Under 834px the search moves to a second header row.
- **Overview:**
  - Drawing in the header.
  - Stat cards coloured by meaning, so fewer incidents shows as good news.
  - The chart sits on a sage stage and is now drawn at real pixel size, so its labels stay readable on mobile.
  - Activity panel.
  - Projects table with filter chips, breathing dots on Active badges, and a sieve drawing when nothing matches. Under 834px the table stacks into labelled rows with a "Sort by" select.
- **Projects, project detail, team:** header drawings. Detail gets underline tabs and restyled checkboxes. Team gets avatar tiles and a table that scrolls inside its own box on mobile.
- **Settings and not-found:** Settings has a header drawing and a placeholder card with its own drawing. Not-found (and project-not-found) use a flashlight drawing on a small apricot stage, a serif heading and two actions.
- **Docs:** `design-system/VERSION` and `components.md` (where each element is used, each drawing's subject and its one-word test), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **No per-screen commits.** Git wasn't in the allowed commands, so all changes are uncommitted in the working tree.
- **The working glyph is built but unused.** The app makes no requests, and the spec forbids adding fake delays to show it.
- **Some screens weren't screenshot-reviewed:** Settings, not-found, the menus, the empty state, and blocks below the fold. The snapshot tool doesn't capture those routes or scroll the page. Because of that, the Overview table and the mobile activity panel show as blank areas in the full-page screenshots — they appear when scrolled into view, as the spec requires. I didn't change the code to make them show up in screenshots, since the spec forbids changing code or motion for review.
- **The tool can't emulate reduced motion,** so I couldn't review screens that way. The CSS for it is in place.
- **Drawings were checked only at their normal size;** I had no way to view them zoomed to 200%.

**Decisions I made**
- I chose eight drawing subjects: lighthouse, clipboard, parcel tag, hard hat, wrench, flashlight, sieve, trowel. Four show a hand, which meets the spec's minimum of half. The small header drawings are mostly the object alone, because the spec's stroke limit for them leaves no room for a hand.
- The not-found stage is about 160px wide, sized so the 128px drawing fills enough of it. Its line weight is 0.8 rather than 0.6 so lines land in the spec's thickness targets.
- Not-found pages got a second action ("View projects" / "Go to overview"), as the spec asks for two.
- I added a small clear (×) button to both search fields.
- The task progress bar has a light track with an ink fill, which the spec doesn't cover.
- Panel h2s don't fade in (only h1s and empty-state titles do), and there's no stage on the detail page, since it has no chart or media to put on one.