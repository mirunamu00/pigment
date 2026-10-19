I've restyled every screen (Home, Pricing, Customers, Sign up, 404, plus the header and footer) with Inkleaf, in light and dark. The build passes, all 15 smoke tests pass, and the final snapshot run shows no page scrolling sideways at 1440px or 390px. I went through the screenshots at both widths in light and dark, using temporary page slices for the tall mobile captures; those routes are removed now.

**What changed**
- **Tokens and root:** `base.css` imports the package's `tokens.css` as is, so no values were retyped. The old variables are gone, and colors, spacing and type now come from the tokens. Fonts load from Google Fonts. The global focus outline, reduced-motion block and `overflow-x: clip` are in place.
- **Signature pieces, in `src/inkleaf/`:**
  - The brush filters, mounted once.
  - A cel-strip `Pictogram` that steps through once and holds, can boil, and shows the final frame under reduced motion.
  - A `Stage` with wandering lines, plus the drawing-stage and plate styles.
  - `WriteIn` headings.
  - The working glyph and breathing dot.
  - The ring-control button styles and icons.
- **17 original drawings:** 9 show a hand, and no pose is used more than 3 times. Subjects and one-word tests are listed in `design-system/components.md`. Section openers use the large size, the six feature cards and three plan cards the medium size, the sign-up page gets a header drawing and a confirmation drawing, and the 404 has a map on an apricot stage. I redrew three after review: a deck chair that read as a bird is now a hammock, a calendar that read as a face, and a tangled plug hand.
- **Screens:**
  - The hero is a sage stage holding a ghosted week-view card, which keeps its `role="img"` and label.
  - Plan cards sit on a lilac stage, and the billing toggle is a segmented control with a sliding pill.
  - The comparison table uses check-circles and thin crosses, in a scrollable region.
  - FAQ answers open with a disclosure animation and the "+" rotates.
  - The industry filters are stone chips that turn ink when selected.
  - Sign-up form fields, select and checkbox follow the spec.
  - The footer is a dark band, the header sticky.
- Added `design-system/` (`VERSION`, `components.md`), `CLAUDE.md` and `AGENTS.md`.

**What I couldn't apply**
- **No commits:** git wasn't in my allowed commands, so there are no per-screen commits. Everything is uncommitted on `main`.
- **Files to delete:** I couldn't delete files either. `src/pages/TempDrawings.tsx` and `TempParts.tsx` are now empty stubs that nothing uses, and `src/components/IconPlaceholder.tsx` is unused. Please delete all three.
- **Working glyph unused:** it's built but not shown anywhere, because every submit here is synchronous and the spec forbids adding fake delays.
- **No accent fill:** the hero is a stage with UI rather than a drawing, so no page uses the accent color.
- **Hand fingers:** at medium size the fingers read as single lines rather than visibly hollow tubes.

**Decisions I made myself**
- **Motion timing (please check):** blocks, h2s and drawings below the fold get their hidden starting state at the first scroll, while still out of view, rather than on mount. A visitor sees the same motion. A page that's never scrolled, like a full-page screenshot, print or no script, shows everything finished. With the spec's literal on-mount approach, those screenshots came out blank below the fold. This applies to everyone and doesn't detect automation.
- **Footer theme:** the footer carries `data-theme="dark"` so its field, button and error text keep enough contrast on the dark band. Its background stays the page's dark-band color.
- **Nav breakpoint:** the menu now collapses below 992px, per the spec, instead of 720px. It still collapses below 720px as the README requires.
- **Other choices:**
  - Every plan card has a full-width primary button, and "Most popular" is an outline badge.
  - The sign-up form gained a "N fields need attention" alert above the submit button.
  - The 404 gained a second action, "Compare plans".
  - The header logo icon is removed; the spec asks for the product name as text only.
  - Footer column headings are sentence case, not uppercase.
  - Step numbers show as "01", "02", "03".

The screenshots are in `.snaps/`; any pictogram that looks half-drawn there was caught during its one-second play.