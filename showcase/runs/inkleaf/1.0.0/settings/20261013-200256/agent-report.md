Inkleaf 1.0.0 is applied to all five screens (Profile, Notifications, Security, Billing, Not found). The build passes and the final `node pigment-snap.mjs` run shows no page scrolling sideways at 1440px or 390px, in light or dark. I could not run the smoke tests, because `npm run test:e2e` isn't one of the commands I was allowed to use. Instead I kept every route, label, form field, `data-testid`, ARIA attribute and existing `role="status"` region, and checked the changes against each assertion in `tests/smoke.spec.ts`.

**Read this before looking at the screenshots:** the parts of each page below the first screen are blank in them. That's not a bug. The spec says blocks below the fold start hidden on a route's first visit and rise in when you scroll to them. It also says not to special-case screenshots, so I didn't. The snap tool takes full-page shots without scrolling, so the Billing invoices and payment cards, the Security sessions table and the second Notifications group come out empty. For the same reason, two plan drawings on mobile show only their first stroke. You can see all of these in the desktop shots where they fit on screen. They're also fully visible without scripts or with reduced motion.

**What I changed**
- **Tokens and fonts:** `tokens.css` is imported unchanged from `design-packages/` in `src/main.tsx`, and `src/styles/base.css` is rewritten to use only token variables. Dark mode follows the system setting, and a `data-theme` attribute overrides it. The three fonts load from Google Fonts in `index.html`.
- **Reusable signature pieces** (`src/components/ink/`):
  - brush filters, rendered once at the app root
  - the hand-drawn pictogram, which draws itself once (once per session for page headers)
  - the pastel stage with wandering lines
  - headings that fade in word by word
  - the working glyph and breathing dot
  - the check-circle icon and avatar colour rule
  - the ring-style buttons
  - `PageHeader`, which every screen uses
  - the below-the-fold rise, which is in `Layout`
- **Screens:**
  - **Shell:** 72px sticky header with a serif product name; 240px sidebar with icons, which becomes a 2-column grid below 992px.
  - **Profile:** restyled form, a "N fields need attention" alert when saving fails, and a check-circle next to "Saved".
  - **Notifications:** serif group titles and the spec's switches.
  - **Security:** password strength shown as a coloured dot, and a sessions table that stacks on mobile, with a breathing dot on the current session.
  - **Billing:** plan cards on a lilac stage, each with its own drawing (they stack on mobile), status badges for invoices, and the dialog restyled.
  - **Not found:** an apricot stage with a compass drawing and two actions.
- **Drawings:** eight original ones, half with a hand: pen nib, handbell, door key, price tag, hourglass, desk lamp, telescope and compass.
- **Added files:** `design-system/` (`VERSION` and `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **One commit per screen:** git isn't one of the allowed commands, so nothing is committed.
- **Glyph in the save button:** every save in the app finishes instantly, and the spec forbids fake delays, so it never appears. The component exists for later use.
- **Self-hosted fonts:** I couldn't download font files. If the test machine is offline, the Google Fonts request will fail and log a console error, which would break the "no console errors" test.
- **Footer:** the app had none, so I didn't add one.

**Decisions I made myself**
- **Extra status regions kept:** Security already had two `role="status"` regions and Billing had one. I left them all, since tests depend on them.
- **Smaller visual choices:**
  - the profile photo placeholder is 64px instead of 40px
  - the "Plans" heading sits above the stage, not inside it
  - panel headings don't fade in; only the h1s and the not-found title do
  - Revoke is now a small secondary button, because a row action isn't a confirmation
- **Additions:**
  - session and invoice counts in the table headers
  - a "Go back" button on the not-found page (the spec asks for two actions)
- **Not-found stage size:** about 160px wide, so the 128px drawing keeps the spec's ink-to-stage ratio.
- **Switch thumb:** when off, it has a slightly stronger outline, because in dark mode the spec's colours made it nearly invisible.