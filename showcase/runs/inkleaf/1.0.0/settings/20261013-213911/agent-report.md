I've restyled every screen in Account Settings (Profile, Notifications, Security, Billing and Not found) to Inkleaf, in light and dark. `npm run build` passes, including the typecheck. The last `node pigment-snap.mjs` run reported no sideways scroll at 1440px or 390px in either theme. I looked at the screenshots at both widths and fixed what was off, then re-ran it. I could not run the smoke tests (`npm run test:e2e` isn't one of the commands I'm allowed to run), so they are unverified. Every `data-testid`, route, label text, form field and accessibility attribute the tests use is still in place.

**What changed**
- **Tokens and root:** `design-system/tokens.css` is an exact copy of the package file, loaded before `src/styles/base.css`. That stylesheet now uses only token variables. The three fonts load from Google Fonts in `index.html`, and the brush filters are inserted once in `src/main.tsx`. Focus outline, reduced-motion handling and dark mode follow the spec.
- **Signature elements, built as reusable pieces in `src/components/`:**
  - Hand-drawn pictogram (`Picto.tsx`), drawn as one stepped animation that plays once and holds.
  - Pastel stage with drifting lines (`Stage.tsx`).
  - Headings that fade in word by word (`WriteIn.tsx`).
  - The "working" glyph and the breathing dot (`Working.tsx`).
  - The button, input and switch styles.
  - Blocks below the fold rise into view on a page's first visit (in `Layout.tsx`).
  - All motion stops under reduced motion.
- **Drawings:** 8 original drawings, 4 of them with a hand:
  - **Page headers:** camera, handbell, umbrella and wallet.
  - **Plan cards:** pencil, sticky note and hourglass.
  - **Not found:** a folded map on an apricot stage.
- **Shell:** sticky header with the product name in serif and the user's avatar. A 240px sidebar from 992px up; below that it becomes a menu button that opens a list of links (closes on Escape and when you change page).
- **Screens:**
  - Each page header has its drawing beside the heading, and the intro line sits below.
  - Forms show a "N fields need attention" alert after a failed save.
  - Native inputs are restyled, not replaced.
  - The plan cards sit on a lilac stage.
  - The two tables turn into labelled stacked rows on mobile.
  - Status badges use outline plus a colored dot.
  - Success messages get a check-circle.
  - The dialog is restyled with an opening animation.
- **Docs:** `design-system/` (VERSION, tokens, `components.md` with each drawing's subject and its one-word name at 48px), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**What I couldn't apply**
- **No commits.** The spec wants one commit per screen, but git isn't among the allowed commands. All changes are uncommitted in the working tree.
- **No "working" glyph on any screen.** Every action in the app happens instantly and the spec forbids fake delays, so it never shows. The component exists for when real requests arrive.
- **Security keeps two `role="status"` regions.** The spec wants one per screen, but the tests rely on both.
- **`tokens.json` was not copied** into `design-system/`; it is still in the package folder.
- **The dialog's close isn't animated.**
- **Not found has no screenshot** because the snapshot script doesn't capture that route, so I haven't seen it rendered.

**Things in the screenshots that look wrong but follow the spec**
- On Billing, the Invoices card is missing from the full-page shots. It sits below the fold and is only revealed when scrolled into view, and the script never scrolls.
- On Billing mobile, the Business plan drawing shows only its first stroke for the same reason.
- Headings may show partly faded in if the shot lands during their entrance.

**Decisions I made myself**
- Subjects for all 8 drawings. The small header drawings don't include hands because they only have room for 5 to 7 strokes; the larger ones do.
- The profile avatar is a 64px tile, colored from the user's name.
- On Not found, the drawing stage is capped at 256px wide so the drawing doesn't outweigh the heading, and I added a second action, "Go back".
- Plan cards stack in one column below 1200px wide.
- Password strength is shown as a colored dot next to plain grey text.
- Small "Revoke" buttons keep a 44px tap area without looking bigger.
- I added count captions to the tables ("4 devices", "5 invoices").
- If Google Fonts can't be reached, Chrome logs a failed request as a console error. The "no console errors" smoke test would then fail, so the tests need network access.