Inkleaf 1.1.0-rc.3 is now applied to every screen: Profile, Notifications, Security, Billing and the not-found page. The build, typecheck and all 8 smoke tests pass. Nothing scrolls sideways at 1440px or 390px, in light or dark. I looked at every screenshot and fixed what was wrong: cards touching each other, extra space under empty status lines, and one drawing whose two clasps looked like a heart.

Some states only appear after an interaction (form errors, the plan dialog, the open mobile menu). Their structure is covered by the smoke tests, but I didn't screenshot them, so how they look is untested.

## What changed
- **Tokens and fonts.** `design-system/tokens.css` is a word-for-word copy of the spec's tokens file. `src/styles/base.css` was rewritten to use only those tokens, and dark mode follows the system setting. The fonts are bundled with the app through `@fontsource` packages (I added these to `package.json`) rather than loaded from Google, because a failed font request would log a console error and break a smoke test.
- **Reusable signature pieces in `src/ink/`:**
  - the brush filters, mounted once at the app root;
  - the hand-drawn pictogram: one strip of frames that steps through once and holds, can "boil" while work is pending, and plays once per session in page headers;
  - the pastel stage with wandering lines;
  - the heading that fades in word by word;
  - the "working" glyph and the breathing dot;
  - the button styles (rings instead of borders), the shared page header, and cards that rise into view on a route's first visit.
  - All motion stops under `prefers-reduced-motion: reduce`.
- **Screens:**
  - Each product screen has the standard header: a small drawing, the fading-in h1 and the lede.
  - **Profile and Security** forms: restyled fields, select and textarea; a "N fields need attention" alert after a failed submit; a check-circle beside "Saved" and "Password updated".
  - **Notifications:** settings cards with serif group titles and switches built to the spec.
  - **Billing:** the plan cards sit on a sage stage, each with its own drawing, a check-circle list, a full-width button and a "Current plan" badge. The invoices table shows status badges.
  - **Security sessions table:** a breathing dot next to "Active now"; Revoke is now a small secondary button.
  - Both tables stack into label/value rows on phones.
  - The dialog has a slide-in and fading backdrop.
  - Below 992px the sidebar becomes a header menu button that opens a sheet.
  - Every route, label, `data-testid`, ARIA attribute and native input is unchanged.
- **Drawings:** eight new subjects, half with hands, each hand in a different pose. They are mirror, megaphone, key, coin purse, teacup, teapot, picnic basket and compass, all listed in `design-system/components.md`. I checked them enlarged on a temporary route, which I then removed.
- **Docs:** `design-system/` (`VERSION`, tokens, `components.md`), plus pointer lines in new `AGENTS.md` and `CLAUDE.md`.

## What I couldn't apply
- **One commit per screen:** git wasn't among the commands I was allowed to run, so nothing is committed.
- **The working glyph** is built but appears nowhere. Every save in this app is instant, and the spec forbids adding fake delays to show a working state.
- **Security has two `role="status"` regions**, against the spec's limit of one per screen. They were already there and the tests depend on them, so I kept both.
- **Below-fold content in the screenshots:** cards rise into view and drawings play only when scrolled to. The screenshot tool never scrolls, so the billing invoices card looks blank and some drawings show only their first stroke. On a real page they appear as you scroll.
- **The dialog's closing animation** is missing; the native `<dialog>` closes instantly.
- **`tokens.json`** wasn't copied into `design-system/`; `components.md` points to it in `design-packages/`.

## Decisions I made
- **Offer cards on a stage:** the three plan cards share one stage even though each is narrower than the 60% width the spec asks for a card on a stage. The spec explicitly lists offer cards on stages.
- **Additions:**
  - a "Settings" group label in the sidebar;
  - the notification count as a badge in the header's action slot;
  - a "Go back" button on the not-found page, to give it the two actions the spec asks for;
  - the profile photo placeholder kept larger than the standard 40px avatar.
- **Status colors:** the password strength hint shows its color only as a dot, since the spec allows status colors only in badge text, dots, field errors and stat changes.
- **Page width:** content is capped at the spec's container width, with forms limited to 560px inside full-width cards.
- **Not-found drawing:** a compass, standing for "this page has moved".