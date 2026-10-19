graphite-blueprint 1.2.0-rc.2 is now applied to every screen: Profile, Notifications, Security, Billing and the not-found page, in light and dark. The build passes and all 8 smoke tests pass. The final `node pigment-snap.mjs` run shows no sideways scroll at 1440px or 390px. I compared every screenshot against the spec, mobile and dark included.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package tokens; the old CSS variable names now point at them. Light is the default and dark follows the device setting. I added two font packages, `@fontsource-variable/inter` and `@fontsource/geist-mono`, so the fonts are self-hosted with no font CDN, as the spec requires.
- **Signature elements**, each built as a reusable piece in `src/design/` with its CSS in `src/styles/signature.css`: the spotlit stage, the dot glyph and dot meter, the isometric blueprint helpers, the spec plate, shimmer and pulse, and the screen header and split-row section header. All motion stops under reduced motion. I rendered every piece on its own, light and dark, on a temporary block in the not-found page, then removed it.
- **Layout:** a sticky translucent header, and a sidebar with icons that becomes wrapping text-only pills under 1024px.
- **Every screen** has a screen header and its settings sections as split rows: title and description on the left, controls on the right. On top of that:
  - **Profile:** a live preview of your workspace card above the fields, which updates as you type. Fields are one column.
  - **Profile and Security forms:** a failed submit shows a banner ("2 fields need attention") above the buttons.
  - **Security:** the password strength has a 3-dot meter. The sessions table has a pulsing dot beside "Active now". When only this device is left, an empty-state row appears.
  - **Billing:** the plans are cards with a drawn stack of 1, 2 or 3 layers for Free, Pro and Business. The invoices table puts IDs and dates in the monospace font and shows status as an icon plus the word.
  - **Dialog:** restyled to the spec, with open and close animation. On phones it becomes a bottom sheet.
  - **Not found:** the spec's error state, a drawing of a broken connection with a small red point, plus "ERR 404".
- Checked numbers: the gap from each section's last block to the next divider is 48px. The right-aligned column headings line up exactly with their cells. The plan drawings fill 91% of their box (the spec asks for at least 85%).
- `design-system/` now has `VERSION`, the tokens and `components.md`, and I added the pointer line to `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **Commits:** the spec asks for one commit per screen, but git isn't among the commands I was allowed to run. Everything is uncommitted in the working tree.
- **Unused pieces:** the spec plate, shimmer, live edge and the animated glyph loops are built but appear nowhere. Nothing in this app has a missing image or really runs work, and the spec forbids faking it.
- **Screenshots of interactive states:** the snapshot tool can't capture states like the open dialog or the error banner. The smoke tests cover their behavior, but I didn't look at them in a screenshot.

**Decisions I made myself**
- **New copy:** the section titles and descriptions the split rows needed, such as "Details" and "The card charged for each invoice", plus the `Settings / 0n` labels.
- **Badges:** the "This device" badge and the "Current plan" badge, which replaced the old pill, use a green dot.
- **Invoice status:** "Due" uses the in-progress (half-filled, amber) icon. On phones the invoice's second line shows the amount rather than the date.
- **Table divider:** the spec's vertical line beside the pinned column only shows between 640px and 767px, where the table scrolls. On wider screens it would be a vertical rule, which the spec forbids.
- **Avatars:** they follow the spec's 32px size, which makes the profile photo small.
- **Not found:** it has one button rather than the spec's two, because the page only has one real action.
- **Settings sections:** the left column takes 4 of 12 columns (3 of 12 under 1280px) so the three plan cards fit.

The screenshots are in `.snaps/`.