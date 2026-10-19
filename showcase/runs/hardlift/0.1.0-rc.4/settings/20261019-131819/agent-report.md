I've restyled every screen (Profile, Notifications, Security, Billing and the not-found page) with Hardlift, in light and dark. The build and typecheck pass, all 8 smoke tests pass, and nothing scrolls sideways at 1440px or 390px. I opened the screenshots of every page in both widths and themes and compared them with the spec.

**What changed**
- **Tokens:** `design-system/tokens.css` is an unchanged copy of the package file, and the app imports it. Dark mode follows the system setting. The old variable names in `base.css` still work as aliases of the new tokens. The DM Sans font loads from Google Fonts, with the spec's fallback fonts after it.
- **Signature elements** are reusable pieces in `src/styles/hardlift.css`:
  - **Lift buttons:** pink, ink and outline variants, small buttons, and 2px icon buttons. Under reduced motion only the color changes.
  - **Outline pills** for the section navigation.
  - **Teal color band** at the top of every settings page, in `PageBand.tsx`. It holds the breadcrumb, the title, a short intro line and the section pills; on mobile the pills become a scrolling strip.
  - **Stickers** in `Sticker.tsx`: a 32px coin in the top bar, a 160px tag on the not-found page, and a turning loading coin that stops under reduced motion.
- **Screens:**
  - **Forms:** outlined 48px inputs with the pink focus ring, a styled time-zone dropdown, error lines with an alert icon, and a one-line error summary at the top of each form.
  - **Buttons:** one pink save button per form and outline buttons for the others.
  - **Notifications:** switches built to the spec, with a visible On/Off word next to each.
  - **Tables:** bordered boxes with 44px rows that scroll inside the box on mobile. Statuses show an icon and a word.
  - **Billing:** pink price tags, and the current plan has a thicker border.
  - **Dialog:** hard shadow, rises 8px when it opens, and has a close button.
  - **Not-found page:** red band, the tag sticker, one sentence and a return button.
- **Docs:** I added `design-system/` (`VERSION`, `tokens.css`, `components.md`) and the one-line pointer in new `AGENTS.md` and `CLAUDE.md` files.
- Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

**What I couldn't do**
- **No per-screen commits.** `git` wasn't in the commands I was allowed to run, so all changes are uncommitted.
- **One leftover file to delete:** `src/pages/ReviewPage.tsx`. It was the temporary review route; I removed the route but couldn't delete the file, so it's an empty stub. Please delete it.
- **No `tokens.json` copy.** `design-system/` has only `tokens.css`; `components.md` points to the package for the JSON.
- **No update date.** The spec doesn't give one, so `VERSION` records today's date as the date it was applied.
- **Hover not checked live.** The screenshot tool can't hover, so the lift is checked in the CSS but not seen on screen. The dialog and the "Saved" message I did check on a temporary page.
- **No live dark/light toggle.** Dark mode follows only the system setting; the app has no switch for it.

**Decisions I made**
- **Section navigation moved into the band**, as a row of pills that becomes a scrolling strip on mobile. The old sidebar is gone, and the navigation now sits inside `main`.
- **One color for the whole area:** all settings pages share teal. The content column is capped at 8 of 12 grid columns so forms don't stretch across a wide screen.
- **Confirmations stay in place.** "Saved" and the other status messages are styled like the spec's toast (raised card, hard shadow, slides up) but stay in the page, because the app keeps that text until the next edit.
- **No nested cards.** Plans, Sessions and Invoices sit on the page background rather than inside a card. Form cards use 24px padding instead of the standard 16px.
- **Two old variable names were dropped.** The old `--space-4` and `--space-8` aliases clash with Hardlift tokens of the same name (4px and 8px). Keeping them made every gap far too large.
- **The not-found page has two stickers:** the top-bar coin plus the large tag.
- **The large sticker's outline is light in dark mode**, because the recipe draws it in the text color, which flips.