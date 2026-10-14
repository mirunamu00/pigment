The restyle is done. The build passes, and nothing scrolls sideways at 1440px or 390px in light or dark. I reviewed every screenshot, including mobile and dark.

I couldn't run the smoke tests, because `npm run test:e2e` isn't one of the commands you allowed. I checked each test by reading it against the new markup: every route, `data-testid`, label, form field, ARIA attribute, heading text and accessible name is preserved. One risk remains: fonts load from Google Fonts, so a test run with no network would log failed font requests as console errors and fail the "no console errors" test.

**What changed**
- **Tokens and root:** `design-system/tokens.css` is a verbatim copy of the package tokens. Dark mode follows the system setting. The fonts, brush filters, warm focus outline and global reduced-motion block are in place, and there are no raw colors left in `src/`.
- **Signature pieces in `src/ink/`:**
  - **Pictogram:** a stepped strip that plays once at 30% in view and holds; it shows the final frame for plates and under reduced motion.
  - **Stage and plate:** with the four-color rotation and a new set of wandering lines per stage.
  - **Write-in heading:** for h1s on load, and for section h2s and the empty-state title when they scroll into view.
  - **Working glyph and breathing dot.**
  - **Ring-control buttons and chips.**
  - **Block rise:** for blocks below the fold.
- **Drawings:** 13 original subjects, each a stroke-by-stroke animation strip (9 to 14 strokes). Seven hold the object in a hand whose wrist leaves the frame; the hands come from one shared helper. Each post has its own drawing, which appears both on its card and on its article page.
- **Home:** a masthead with the pen drawing (the page's one accent fill) and the written-in h1. The featured post sits on a sage drawing stage, 7 of 12 columns. Filter chips and search share one toolbar row, posts are cards with drawing plates, and the empty search shows the net drawing.
- **Article:** written-in h1 and the post's drawing on a stage. The table of contents sits beside the text on wide screens and becomes a collapsed "On this page" disclosure below 992px. Quotes are serif pull quotes, code sits in a tonal band, and related posts are cards.
- **About:** the newspaper masthead, the lamp opening "Why we write", and author cards with colored initial tiles.
- **Not found:** the ink bottle on an apricot stage, a serif h1 and two actions. The unknown-post page uses the same layout.
- **Newsletter (bottom of every page):** a one-column form that stacks on mobile; success shows the mailbox drawing and a check-circle line.
- **Docs:** `design-system/` (`VERSION`, `components.md` with each drawing's subject by screen), plus new `AGENTS.md` and `CLAUDE.md` pointer files.

**What I couldn't apply**
- **One commit per screen:** git isn't among the allowed commands, so nothing is committed.
- **Figures:** the spec says to omit figures that have no image, but the tests require them. They now show as faded placeholder cards on a stage instead.
- **Working glyph and breathing dot:** built, but not used anywhere, because every action in the app is instant.
- **Full-page screenshots:** in the normal captures, sections below the fold are still mid-animation, which is how the spec says they should behave. To check final layouts, I made one review build that forced final states and showed the not-found, empty and subscribed screens, then reverted it completely.

**Decisions I made myself**
- **"Featured" label:** sentence-case sans text, because the spec bans all-caps headings.
- **Brand mark:** I removed the small icon, so the header shows the product name in serif text only.
- **Prose headings:** article body headings stay static; only section headings write in.
- **Search:** the label is visually hidden (still read by screen readers) as in the toolbar pattern, and the field gets its own clear button.
- **Not-found stage size:** the drawing stage is 320px wide.
- **Masthead spacing:** top padding is 96px, 64px on mobile.
- **Card colors:** they rotate by position in the list, so neighbors never match.