I've applied felt-tip-market 0.1.0-rc.3 to all four settings screens and the not-found page. The build and typecheck pass, all 8 smoke tests pass, and the last snapshot run found no page that scrolls sideways. I looked at the screenshots at 1440px and 390px, in light and dark, and fixed what was wrong:
- **Security scrolled sideways on phones:** a hidden "Revoke …" label inside the scrolling table was widening the page.
- **Payment method row:** it was cramped on phones.
- **Notification rows on phones:** they were inset instead of running edge to edge.
- **Section links on phones:** they now scroll so the current page's link is always visible.

The snap tool only screenshots pages as they load. I checked the dialog, input errors, the "Saved" pill, the empty state and the plate stack on temporary preview pages, then removed them. Hover and press can't be screenshotted, so the lift-and-slam motion is checked only by reading the CSS, not seen running.

## What changed
- **Tokens:** an exact copy of the spec's `tokens.css` is in `design-system/tokens.css` and loaded first. The app's old variable names still work, pointing at the new tokens. Space Grotesk and JetBrains Mono load from Google Fonts. Light and dark both work, following the system setting or `data-theme`.
- **Reusable pieces** (`src/styles/felt-tip.css`, `src/components/felt-tip.tsx`):
  - lift and slam, and the plate stack
  - poster bands and the area header band
  - ink boxes, ruled groups, pills and the dashed empty box
  - status pills, the notched price flag and the pink check disc
  - all motion stops under reduced motion
- **Sticker kit** (`src/components/stickers/`): a key, an envelope, a phone and a disc token, each built thick (back, side strip, face, inner lines), plus the word badge and the rocking loading sticker.
- **Layout:** white top bar (black in dark) with your name in a block at the right edge. The left column has underlined section links, with the current one as a filled pill; on phones it becomes a scrolling row.
- **Screens** (one band colour per area, in nav order):
  - **Profile (lemon):** one white form panel with 48px fields, pink save button, ink check on errors. The avatar is a dashed box holding the initials.
  - **Notifications (periwinkle):** the "3 of 6 notifications on" count is a price flag in the band. Settings sit in ruled rows with the spec's switches.
  - **Security (teal):** password strength is a status pill whose dot shows the level. Sessions are in an ink-framed table with lifting Revoke buttons. When no other device is left, an empty-state box shows the phone sticker.
  - **Billing (marigold):** each plan is a card, and the current one gets the pink border and check disc. Every price and invoice amount gets a flag. The dialog has a hard shadow, ruled header and footer, a new Close button, and becomes a bottom sheet on phones.
  - **Not found:** a full-height lemon band with a 96px headline, two tilted stickers (key and envelope), and the plate stack behind "Go to profile settings".
- **Docs:** `design-system/VERSION` and `components.md`, plus the one-line pointer in `AGENTS.md` and `CLAUDE.md`.

Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

## What I couldn't apply
- **One commit per screen:** git wasn't among the commands I was allowed to run, so nothing is committed. The changes are uncommitted in the working tree.
- **No date for VERSION:** the spec states no update date, so I used today's date (2026-10-25).
- **Elements with nothing to attach to:** this app has no toasts, tabs, search, charts or loading states. The word badge and loading sticker exist but aren't used on any screen.
- **Fonts need internet:** they load from Google Fonts. Offline, the app falls back to system fonts, and the console-error test could fail because the font request fails.

## Decisions I made myself
- **No header-band stickers:** the spec's Settings row calls for a "quiet header band" and puts band stickers only on overview screens. So the only stickers are in the Security empty state and on the not-found page.
- **Section links:** the spec says settings use "underlined section links", while its sidebar spec uses pills. I combined them: underlined links, with the current page shown as the filled pill.
- **Flags on counts and on every invoice row:** the notifications count is a flag, since the spec allows flags for counts. Every invoice row gets a flag rather than one in the whole table.
- **Small additions:**
  - a breadcrumb ("Account settings / …") in each band
  - a Close button in the dialog
  - the table scroll areas are now focusable regions with labels
  - the "This device" and "Current plan" labels became status pills
- **Leftover fixed sizes:** these values are written straight into the CSS rather than taken from tokens: the 240px sidebar, 80px/64px top bar, 480px dialog and 72px avatar (spec numbers that have no token), plus the price flag's 2px notch inset and the visually-hidden helper's 1px values.