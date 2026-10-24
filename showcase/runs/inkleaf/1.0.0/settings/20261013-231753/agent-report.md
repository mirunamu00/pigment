All four settings screens are restyled to inkleaf in light and dark. The final `node pigment-snap.mjs` run built cleanly and nothing scrolls sideways at 390px or 1440px. Typecheck passes. I could not run the Playwright smoke tests, because `npm run test:e2e` isn't one of the commands I was allowed. Every `data-testid`, route, label text, form field and ARIA attribute is unchanged, so they should pass, but that is unverified. Also, the spec asks for one commit per screen, but git wasn't an allowed command either, so all changes are uncommitted in the working tree.

**What changed**
- **Tokens and root setup:** `tokens.css` is imported unchanged from `design-packages/` at the top of `src/styles/base.css`, so the values are never retyped. Fonts load from Google Fonts in `index.html`. The root has the brush filters, the warm focus outline, the reduced-motion block and `overflow-x: clip`.
- **Signature pieces (`src/ink/`):**
  - A pictogram component with the stepped frame strip and play-once logic. Header drawings play once per session.
  - The pastel stage with wandering lines, and the word-by-word heading.
  - The written-loop glyph, the breathing dot and the check-circle, plus the button, input and switch control styles.
  - A block-rise hook, and eight original drawings. Four of them show hands, one in each pose (Present, Pinch, Grip, Point).
- **Shell:** a sticky 72px header with the serif product name, and a 240px sidebar with icons. Below 992px the sidebar becomes a menu button that opens a sheet; Escape closes it.
- **Every screen:** the shared header (small drawing, written-in h1, lede) and cards with 1px rings.
  - **Profile:** restyled form, select with a chevron, "Saved" with a check.
  - **Notifications:** serif group titles and the spec's switches.
  - **Security:** strength hint with a status dot, and a sessions table that stacks on mobile. "Active now" gets a breathing dot.
  - **Billing:** plan cards on a lilac stage, each with its own drawing; an invoices table with status badges.
  - **Dialog and not-found:** the confirm dialog is restyled; the not-found page has a map drawing on an apricot stage.
- **Docs:** `design-system/` (VERSION and `components.md`, which lists each drawing's subject and one-word name), plus `CLAUDE.md` and `AGENTS.md` pointing to it.

**What I couldn't apply**
- The working glyph is built but never appears. Every action in this app is synchronous, and the spec forbids faking a pending state.
- The not-found page isn't one of the captured routes, so it has no screenshots. I checked its drawing on screen only by temporarily placing it on Billing, then removed it.

**Decisions I made myself**
- **Block rise:** the spec hides below-the-fold blocks until they scroll into view. Full-page captures showed those panels as blank areas, so only blocks on screen at load now rise; the rest render final. Drawings that start below the fold likewise show their final frame instead of sitting on their first stroke.
- **Plan cards:** three cards sit side by side on the stage. I read the "raised card spans 60% of the stage" rule as covering a single card. "Current plan" is an outline badge at button height.
- **Additions:**
  - "N fields need attention" (an alert, per the text-field spec) appears when a form submit fails.
  - Count captions on the table cards: "4 sessions", "5 invoices".
  - A "Go back" button on not-found, so it has the two actions the spec asks for.
- **Smaller calls:** the profile photo placeholder is 64px, where the spec's avatar is 40px. Revoke is a small secondary button rather than a danger button. Form cards span the full width, with the fields capped at the 560px form width.