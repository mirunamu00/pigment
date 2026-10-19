The restyle is finished. The build passes, all 15 smoke tests pass, and the final screenshot run reports no sideways scroll at 1440px or 390px, light or dark.

**One thing to know before opening `.snaps/`:** the full-page screenshots never scroll, so anything below the first screen is still in its "before it scrolls into view" state: headings hidden, blocks not yet risen, drawings on their first stroke. The spec asks for exactly that behaviour (script hides blocks until they come into view). To review the finished look I temporarily forced the reduced-motion path and enlarged the drawings for one snapshot run, checked every page in that state, then reverted both changes before the final run.

**What changed**
- **Setup:** the package's `tokens.css` is imported unchanged in `src/styles/base.css`, and `base.css` is rewritten so every value comes from a token. Light and dark both work. The three spec fonts load from Google Fonts in `index.html`.
- **Signature pieces, in `src/inkleaf/`, each reusable:**
  - Brush filters and frame clip, mounted once in `Layout`.
  - The hand-drawn pictogram (plays once when it comes into view, then holds), plus a hand builder for the four poses.
  - 25 original drawings; 13 include hands.
  - The pastel stage with wandering lines, and plates for card images.
  - The heading that fades in word by word.
  - The working glyph and breathing dot.
  - The ring-style buttons, the block-rise motion, the ghosted preview, the avatar and icons.
  - All motion stops under `prefers-reduced-motion`.
- **Screens:**
  - **Home:** the hero image is now a ghosted team-calendar week on a stage, with its `role="img"` and label kept. Each section opens with a drawing, the six feature cards each have their own drawing, steps are numbered 01–03, and testimonials have initial avatars.
  - **Pricing:** the plan cards sit on a stage, the Monthly/Yearly toggle has a sliding pill, and the comparison table shows check-circles and thin crosses (the hidden "✓/—" text stays, so the tests still read it).
  - **Customers:** every story card has a plate with that company's own drawing, and the industry filters are chips.
  - **Sign up:** fields, select and checkbox follow the spec. A failed submit adds "N fields need attention", and the confirmation has its own drawing.
  - **404:** a large drawing and two actions.
  - **Shared:** a sticky header, the call-to-action band with a drawing, and the footer as a dark band.
- **Docs:** `design-system/VERSION`, `design-system/components.md` (conventions, where each piece is used, every drawing's subject and one-word test), and `AGENTS.md` / `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **No commits.** The spec wants one commit per screen, but git isn't in the commands I was allowed to run, so everything is uncommitted in the working tree.
- **One unused file left behind.** `src/components/IconPlaceholder.tsx` is no longer used; I couldn't delete it with the allowed commands.
- **The working glyph is never shown.** Every action on this site completes instantly, and the spec forbids fake loading states.
- **FAQ answers close instantly.** They open with the spec's motion, but closing can't animate because the panels use the `hidden` attribute, which I kept.

**Decisions I made**
- **Mobile menu below 992px, not 720px.** The spec collapses more than three header links at that width. It still works below 720px, so the tests pass.
- **Stats aren't cards.** They're three plain figures over hairlines, with the value one size smaller on phones so all three fit in a row.
- **Phone layouts:** feature and testimonial cards take a full row each because they hold paragraphs, and the comparison table fits the screen instead of scrolling.
- **Added content:**
  - A second "See pricing" button on the 404 page.
  - A label on the table's scroll region.
  - The "fields need attention" alert on sign-up.
- **Removed and restyled:** the invented hourglass logo mark is gone (the brand name is now serif text), and footer headings are serif rather than uppercase.
- **Drawing subjects are my choices.** For example: a bell for booking pages, a stopwatch for sign-up, an hourglass for the 404. They read correctly at full size, but some of the small 64px ones (the stamp and the reminder string) are approximate and worth a human look.