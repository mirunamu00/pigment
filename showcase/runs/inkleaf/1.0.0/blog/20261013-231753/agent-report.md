I've restyled every screen of Field Notes with Inkleaf 1.0.0. `npm run typecheck` and `npm run build` pass, and `node pigment-snap.mjs` reports no sideways scroll at 1440px or 390px, in light or dark. I couldn't run the smoke tests because `npm run test:e2e` isn't one of the commands I was allowed. I kept every route, label, form field, `data-testid`, heading id and accessibility attribute.

**One thing to know before you open the screenshots:** below-the-fold content looks blank in them. That includes the post cards, the "More posts", "Related posts" and "The authors" headings, the authors cards, the article figures and the newsletter. This is how the spec's motion works: those blocks and headings fade in when you scroll to them, and the snapshot tool takes one full-page shot without scrolling. The spec says to review with reduced motion turned on, and the snapshot tool doesn't do that, so I couldn't see those parts. I checked their styles by reading the code. Drawings near the top were also caught partway through drawing themselves in.

**What I changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the spec's file and is imported by `src/styles/base.css`, which I rewrote. Fonts load from Google Fonts in `index.html`. Dark mode follows the system setting.
- **Signature pieces, in `src/design/`:**
  - the hand-drawn pictograms and the shared brush filters
  - the pastel stage with wandering lines, plus the drawing stage and the plate
  - headings that fade in word by word
  - the "working" glyph, breathing dot and check-circle
  - the button styles
  - the fade-in for blocks below the fold

  All motion stops under `prefers-reduced-motion: reduce`.
- **12 original drawings,** 6 of them with hands, using three poses twice each. Each post has its own drawing, shown on its card, on the home page's featured stage and on its article page.
- **Home:** a notebook drawing over the h1, the featured post on a sage stage beside its text, a search field with an icon and clear button, filter chips, a 3/2/1-column card grid, and an empty state with a lantern drawing.
- **Article:** breadcrumb, the post's drawing on a stage, contents beside the text on wide screens and a collapsed "On this page" toggle on narrow ones, styled prose, quote and code, and related-post cards.
- **About:** a fountain-pen drawing opens "Why we write"; author cards with coloured initial tiles.
- **Newsletter:** the form stacks on mobile, and success shows a mailbox drawing and a check mark.
- **Not found:** a compass drawing on an apricot stage, with two actions.
- **Docs:** `design-system/VERSION`, `design-system/components.md` (where each piece is used, and each drawing's subject and one-word name), `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **Article figures:** the spec says to omit figures without an image, but the tests need them. Each one is now a faded mock-up on a lilac stage, keeping its alt text.
- **One commit per screen:** git wasn't in the allowed commands, so nothing is committed.
- **`tokens.json`:** not copied into `design-system/`; the app only uses the CSS.
- **Breakpoints:** they're written as plain numbers in the media queries, because CSS variables can't be used there.
- **Drawings I couldn't check:** the post-card drawings, lantern, mailbox and compass never appear in a screenshot, and the visible ones were caught mid-drawing. The notebook in the home header partly reads as a flag on a pole at small size. Final frames are unchecked.

**Decisions I made myself**
- **Brand logo:** I removed the small brand logo icon, because the spec says the product name is plain serif text.
- **"Featured" heading:** kept as a small sans label in normal case, since the spec's label style is uppercase and headings can't be all-caps.
- **Article headings:** headings inside article text don't fade in.
- **About page:** the "Why we write" drawing is left-aligned rather than centred.
- **Newsletter:** a failed submit now moves focus to the email field.
- **Fan drawing:** I tilted the colour-swatch fan so it doesn't read as a shell.
- **Contents list:** I moved it inside the article so it can sit right after the drawing on mobile.