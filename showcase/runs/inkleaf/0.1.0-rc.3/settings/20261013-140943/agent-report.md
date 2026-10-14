Inkleaf is applied to all four settings screens, the not-found page, the plan dialog and the app shell, in light and dark. The final `node pigment-snap.mjs` run built cleanly with no sideways scroll at 1440px or 390px. I could not run the Playwright smoke tests (`npm run test:e2e` isn't one of the four commands I was allowed). Every route, label, form field, `data-testid`, `role` and aria attribute the tests use is preserved, but they still need a run on your side.

One thing will look wrong in the final screenshots: panels below the fold are invisible. The spec says those blocks start hidden and rise when 15% scrolls into view, and a full-page capture never scrolls. To check them, I turned the rise off temporarily for the review runs (all passes, dark and 390px included), then put it back for the final run.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` and `tokens.json` are copied verbatim, and `tokens.css` is imported once. Fonts load from Google Fonts with `display=swap`. I rewrote `base.css` on the semantic tokens; there are no raw hex colors left in `src`. The old brand blue became `color.action.primary`.
- **Signature pieces** (in `src/components/ink/`):
  - The three brush filters, once at the app root.
  - The `Pictogram` cel strip: plays once in view, can boil, and product headers play once per session.
  - The pastel `Stage` with its drawing-stage variant.
  - The `WriteIn` heading, the working glyph, the breathing dot and the check-circle.
  - The `.btn` ring controls and the block-rise hook.
  - All motion stops under `prefers-reduced-motion`.
- **Drawings:** eight original pictograms, four with hands. I checked each one at 48px and redrew three that didn't read (the handbell's hand, the pencil, the briefcase hand).
- **Shell:** sticky 72px header with a serif product name; the 240px sidebar becomes an underline tab strip below 992px.
- **Every screen** gets a small drawing beside a written-in h1, with the lede below.
  - **Profile:** the form card, a select chevron and "Saved" with a check-circle.
  - **Notifications:** spec switches with a sibling thumb, plus serif group titles.
  - **Security:** stacked tables on mobile, small secondary Revoke buttons, and a breathing dot on "Active now".
  - **Billing:** plans on a lilac stage, each card with its own drawing, a full-width primary button and a "Current plan" badge.
  - **Not found:** an apricot drawing stage with a lost mitten and two actions.
- `design-system/VERSION` and `components.md` are added (conventions, where each piece is used, the subjects drawn), plus the pointer line in `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **Working glyph:** built but never shown. Every action here finishes instantly and the spec forbids fake delays, so there is never a real pending request.
- **One commit per screen:** not done, because git isn't among the allowed commands. All changes are uncommitted.
- **Leftover file:** `src/components/ink/TempGallery.tsx` came from the drawing check. I emptied it but couldn't delete it with the allowed commands; please delete it.
- **Dialog close:** opening animates, but closing is instant, because the native `dialog.close()` gives no exit hook.

**Decisions I made myself**
- **Plans below 1200px:** the cards become a horizontal strip that snaps card by card inside the stage. Three stacked cards would make the stage far taller than the 1:1 limit.
- **Form alert:** I added the spec's `role="alert"` "N fields need attention" line on failed submits. It's separate from the status regions, so the status checks are unaffected.
- **Not-found:** I added a "Go back" button as the second action.
- **"Active now":** I treated it as a running item, so it gets the breathing dot.
- **Smaller calls:**
  - The profile avatar is 64px rather than the 40px list size.
  - The password strength hint shows a colored dot beside plain text, instead of colored text.
  - The "Plans" heading sits above the stage rather than inside a card.