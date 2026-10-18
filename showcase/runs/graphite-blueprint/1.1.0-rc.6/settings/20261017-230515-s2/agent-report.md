I've applied Graphite Blueprint 1.1.0-rc.6 to all four settings screens and the not-found page, in light and dark. The build passes, all 8 smoke tests pass, and the final snapshot run reports no sideways scroll at 1440px or 390px. I checked every screenshot in both widths and both themes, plus the dialog and each signature element on its own at 2x.

## What changed
- **Tokens and fonts:** `tokens.css` is copied unchanged into `src/styles/`. Dark mode follows the device setting. The old CSS variable names now point at the new tokens. Inter and Geist Mono are bundled with the app from npm font packages, with no font CDN; those two packages are the only new dependencies. I rewrote `base.css` with the spec's root setup, focus ring, reduced-motion rules and every component.
- **Signature elements:** all six are built from their recipes as reusable pieces in `src/components/signature/` and `src/styles/signature.css`.
- **Every screen:** a header with a mono label, the page title and a two-tone summary. Each settings group is a split row: a `01 / 02` counter, title and description on the left, controls on the right, with hairlines between groups. The sidebar uses the spec's style and becomes wrapping pill tabs under 1024px.
- **Profile:** a live preview of the member card on a quiet stage, captioned FIG 0.1. A single-column form with a chevron select and a mono character counter. A failed save shows a "2 fields need attention" banner above the buttons. A check icon appears next to "Saved".
- **Notifications:** the switches follow the spec, and the "3 of 6" count is a mono label.
- **Security:**
  - The password strength shows a five-dot meter.
  - The sessions table follows the spec. On mobile it shows only the first column and the Revoke column, with location and time as a second line.
  - "Active now" has a pulsing dot, and an empty state appears when no other devices remain.
- **Billing:**
  - Plans are in a hairline grid with 1, 2 and 3 slab drawings that lift on hover.
  - The invoices table has status icons, with Status pinned on mobile.
  - The dialog is a bottom sheet on phones, with the primary button first.
- **Not found:** a drawing of a broken connector on a quiet stage, "ERR 404", and two buttons.
- **Docs:** `design-system/` (version, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line. I added a temporary review route while checking the pieces and have removed it.

## Not applied
- **Spec plates, shimmer, live edge, caret, toast and running loading glyphs** are built but not placed. The app has no products, posts or real background work to attach them to.
- **No commits.** The spec asks for one commit per screen, but I didn't commit anything, so everything is uncommitted in the working tree.

## My own decisions
- The profile preview repeats the user's own data, which the stage rule normally forbids for sample text. I treated a live preview of the user's own data as acceptable.
- I added text to the summaries and descriptions, such as "Sign out anything you don't recognise." All existing labels and test text are unchanged.
- I added a "Go back" button on the not-found page as the second button the spec calls for.
- Avatars are 48px in the profile photo row and 24px in the header.
- The strength levels from 1 to 5 are my own mapping.
- "Due" invoices use the in-progress status icon.
- The split rows stack below 1280px wide.
- Revoke is a bordered button, as the spec specifies for table row actions, rather than the old red style.
- Small buttons and the mobile tabs get an invisible 44px touch area.
- Indigo can appear more than three times on Notifications when more than three switches are on, because checked switches are always indigo.
- The pinned table column keeps its recipe's left hairline even at desktop widths where nothing scrolls.