I've applied inkleaf@1.0.0 to every screen: home, article pages, the reference page, changelog and both not-found states. The build passes, all 16 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in light or dark.

**One thing to know before opening `.snaps/`:** in the snap tool's own screenshots, content further down each page looks blank and the hero pencil is half drawn. That is the spec's reveal-on-scroll and frame-by-frame drawing being caught mid-animation, because the tool screenshots instantly and doesn't scroll or turn on reduced motion. To check the finished states, I added a temporary route that showed the real screens fully drawn and revealed, plus a large view of every drawing. I reviewed those at both widths and both themes, then deleted them.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's file. Light and dark follow the system setting. Fonts load from Google Fonts with `display=swap`.
- **Signature pieces,** built as reusable parts in `src/inkleaf/`: the hand-drawn pictogram with the brush filters, the pastel stage, the word-by-word heading, the written-loop working glyph with breathing dot and check-circle, the scroll reveal, and the ring buttons. All motion stops under reduced motion.
- **Drawings:** eight original subjects, all in `drawings.ts`:
  - **Home:** a pencil in the hero with the accent fill, a stopwatch, map, plug and lantern on the four section cards, and a shoe opening "Quick start".
  - **Doc pages:** each group's drawing beside the h1, simplified.
  - **Changelog:** an hourglass.
  - **Not found:** a telescope on an apricot stage, with two actions.
  
  Four of the eight show a hand, each in a different pose.
- **Components:** restyled the header, sidebar and mobile drawer, search with a clear button, code blocks, segmented tabs with a sliding pill, callouts, tables, keyboard keys, steps, feedback, the previous/next cards, and the changelog tags (now outline badges with a status dot).
- **Kept intact:** every route, label, `data-testid`, ARIA attribute and behaviour. I only added things: a "Clear search" button, a scrollable labelled region around each table, an "On this page" toggle on narrow screens, and an "Open the changelog" link on the not-found pages.
- **Docs and pointers:** `design-system/` (VERSION, tokens, `components.md` with the one-word name for each drawing) and pointer lines in `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **One commit per screen:** `git` wasn't among the commands I was allowed to run, so nothing is committed.
- **Working glyph and breathing dot:** they're built but not used anywhere, because the site makes no network requests and the spec forbids faking a wait.
- **Search "No results":** it stays text only, since the spec doesn't allow drawings inside a dropdown.

**Decisions I made myself** (also listed in `components.md`)
- **Doc, changelog and 404 headers** use the spec's product-screen layout and h1 size; the home uses the larger hero sizing.
- **Article text** stays at 17px rather than the spec's 20px, because these are dense reference pages.
- **Callouts** are tinted bands with the status colour only on the icon.
- **Changelog tags:** Added is green, Fixed is blue, Changed is amber.
- **Feedback "thanks"** uses the check-circle and words rather than a large confirmation drawing.
- **Breakpoints:** the sidebar becomes a drawer below 992px (it was 900px). The table of contents sits beside the article from 1200px, below the spec's 992px, because the sidebar takes up the width; under that it's a collapsed "On this page" toggle.
- **Mobile header:** the brand and version stack so the header stays at two rows.
- **Brand mark:** I removed the small terminal icon next to "Ferrule", since the spec asks for the product name as plain serif text with no logo.