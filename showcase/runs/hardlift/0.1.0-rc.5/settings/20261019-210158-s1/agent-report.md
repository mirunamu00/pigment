Hardlift 0.1.0-rc.5 is now applied to every screen: Profile, Notifications, Security, Billing and the not-found page. The build passes, all 8 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in light or dark. I checked every screenshot against the spec, and also snapped the dialog, toast, form-error and empty-table states through a temporary route that I removed afterwards.

**What changed**
- **Tokens and font:** `tokens.css` is copied unchanged into `src/styles/`, and DM Sans (regular and bold) loads from Google Fonts. Dark mode follows the system setting, using the dark values the tokens file already defines. The old CSS variable names still work as aliases of the new tokens.
- **Signature elements**, built as reusable pieces in `src/styles/signature.css`:
  - **Lift buttons:** buttons, row actions and the toast and dialog close buttons lift on hover and stay still under reduced motion.
  - **Color bands:** a `PageBand` component, one color per section — Profile teal, Notifications yellow, Security periwinkle, Billing lime, red for the not-found page.
  - **Pills:** the settings sub-nav is a vertical pill list on desktop and a scrolling pill strip on phones. The notifications count is a status pill in the band.
  - **Stickers:** a `Sticker` component with four drawings: a payment card on Billing, a laptop when no other devices are signed in, a 160px signpost on the not-found page, and a turning coin for loading.
- **Components** (`src/styles/components.css`):
  - Fields have the pink focus halo and errors show an icon plus text.
  - The select has a custom chevron and the switches follow the spec's 48×28 size.
  - Status badges pair an icon with a word, and prices are pink tags.
  - Tables sit in a bordered box and turn into stacked blocks on phones.
  - The dialog has the large hard shadow and slides up 8px.
- **Pink actions:** each screen has at most one pink button.
- **Docs:** `design-system/` (VERSION, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md`, each with the one-line pointer.
- **Preserved:** all routes, labels, `data-testid`s and ARIA attributes. Additions only: a "Close" button on the dialog, a "Dismiss" button on toasts, and a `data-label` on each table cell.

**What I couldn't apply**
- **One commit per screen:** git isn't in the commands I was allowed to run, so all changes are uncommitted.
- **Breadcrumb, search field and hero:** the settings screens have nothing for them to show, so I left them out. The coin loader is built but nothing in the app loads.
- **VERSION date:** the spec doesn't give an update date, so `VERSION` records the date it was applied (2026-10-20).

**Decisions I made myself**
- **Layout:** the band runs full width under the header, and the sub-nav and page content sit below it.
- **Stickers:** the spec's sticker section suggests one in a settings header, but its "Applying the concept" table says settings and page headers get none. I followed the table, so stickers appear only in the empty state, the payment card and the error page.
- **Confirmation messages:** "Saved", "Password updated" and the session and plan messages now appear as bottom-left toasts. Their status element always stays on the page so tests and screen readers still find the text. A toast hides after 5 seconds or on Escape.
- **Error summary:** following the spec, a one-line error summary now appears at the top of the Profile and password forms when a submit has errors.
- **Retired variables:** the old `--space-1…8` names clashed with the token scale (the old `--space-4` was 16px, the new one is 4px), so I removed them. Layout sizes the tokens don't cover (80px header, 240px sidebar, 480px dialog, 420px toast) are named variables at the top of `base.css`.
- **Padding and rules:** form cards use 24px padding rather than the spec's 16px. Plan cards keep 16px. Sections are separated by ink rules instead of being wrapped in cards, which avoids cards inside cards.
- **Stickers in dark mode:** glyphs drawn on a pink sticker face stay black in dark mode, because the spec's light outline color had too little contrast on pink.