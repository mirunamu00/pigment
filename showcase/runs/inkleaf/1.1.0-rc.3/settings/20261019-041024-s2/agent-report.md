I've applied Inkleaf 1.1.0-rc.3 to all four settings screens and the not-found page. The build passes, all 8 smoke tests pass, no page scrolls sideways at 1440px or 390px in light or dark, and I opened the screenshots and fixed what didn't match the spec.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package file and is imported at the root, so dark mode follows the system setting. Fonts are Source Serif 4, Instrument Sans and JetBrains Mono from Google Fonts. The root also gets the warm focus outline, the reduced-motion rules and the paper background.
- **Signature pieces (`src/ink/`), each reusable:**
  - Hand-drawn pictograms, built from the spec's frame-strip recipe. They play once when they come into view and show the final frame under reduced motion.
  - The pastel stage with faint wandering lines.
  - Headings that fade in word by word, keeping the same text and accessible name.
  - The "working" loop and breathing dot.
  - The check-circle, and the button styles drawn with rings instead of borders.
  - A shared screen header and the panels that rise into view on a route's first visit.
- **Shell:** a sticky 72px header and a 240px sidebar. Below 992px the sidebar folds into a menu button that opens a sheet; it closes on Escape or when you navigate.
- **Screens:** every screen has a small drawing beside a written-in h1, with the lede underneath.
  - **Profile:** restyled form, avatar tile, select with a chevron, "Saved" with a check-circle.
  - **Notifications:** switches redrawn to spec (the native input is kept).
  - **Security:** form, plus a sessions table that stacks into labelled rows on phones; "Active now" has a breathing dot.
  - **Billing:** the three plans are offer cards on a sage stage, each with its own drawing; invoices use status badges.
  - **Not found:** a large drawing, the h1 and two actions.
- **Docs:** `design-system/VERSION`, `components.md` (each drawing's subject and one-word reading) and the pointer lines in `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **One commit per screen:** git wasn't among the commands I was allowed to run, so nothing is committed.
- **A leftover file:** `src/pages/InkReview.tsx` is now an empty stub from a temporary review route. All temporary routes are gone from the app, but deleting the file was also outside the allowed commands, so please delete it.
- **The working loop never appears:** every action is instant, and the spec forbids adding delays to show a waiting state. It's built but unused.
- **Pictogram checks I could only do by eye:** the stroke-count and ink-weight rules are approximate.
- **Screenshot artifacts, not page bugs:**
  - Panels below the fold (such as Invoices) are blank in the full-page snaps because they only rise into view on scroll. I checked them through the temporary routes, which render the pages without that motion.
  - Some drawings were caught mid-animation.

**Decisions I made**
- **Drawing subjects:** name badge (Profile), ear trumpet (Notifications), key (Security), rubber stamp (Billing), mug / teapot / picnic basket (the three plans), folded map (not found). Four of the eight show a hand, each in a different pose, as the spec requires.
- **Small additions:**
  - an "N fields need attention" alert on failed submits;
  - session and invoice counts in the card headers;
  - a "Go back" button on not-found, since the spec asks for two actions there;
  - icons in the sidebar.
- **Sessions note:** "No other devices are signed in." stays a plain note rather than a full empty state with a drawing. The table still has the current device, and one more drawing would have broken the spec's rules on how many drawings show hands.
- **Widths:** the content column is capped at about 950px and form cards at the spec's form width plus padding.
- **Revoke buttons:** small secondary buttons, because the spec reserves the danger style for confirming a destructive action.
- **Avatar:** the profile one is 80px (the spec only defines 40px); the header one has slightly tighter corners than the spec's avatar shape.