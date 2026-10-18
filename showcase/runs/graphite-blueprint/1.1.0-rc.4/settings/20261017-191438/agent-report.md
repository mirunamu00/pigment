I've applied graphite-blueprint 1.1.0-rc.4 to every screen. The build, typecheck and all 8 smoke tests pass. `node pigment-snap.mjs` reports no sideways scroll on any page at 1440px or 390px, in light or dark. Dark and light both follow the device setting.

## What changed
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css` (all 340 values, checked), and the app imports it. The old CSS variable names now point at the new tokens. I added two font packages, `@fontsource-variable/inter` and `@fontsource/geist-mono`, so Inter and Geist Mono are bundled with the app rather than loaded from a font CDN, as the spec requires.
- **Signature elements:** all six are built as reusable pieces following their recipes: `src/design/signatures.tsx` and `src/styles/signatures.css`. Every loop stops under reduced motion through the spec's global block.
- **App shell:** a sticky translucent header, a sidebar with mono group label and 16px icons, and the current page marked. Below 1024px the sidebar becomes a row of text-only pills that wrap.
- **Every screen:**
  - Each opens with a screen head: mono label, h1 and a two-tone summary.
  - Settings groups are split rows with a mono "01 / 03" counter, 48px apart.
  - **Profile:** a quiet stage previews the member card live from the form. A failed save shows a "2 fields need attention" banner.
  - **Notifications:** the switches are restyled, with mono on-counts per group.
  - **Security:** a dot meter shows password strength, a live pulse sits beside "Active now", and the sessions table keeps only the device and Revoke columns on mobile.
  - **Billing:** plans sit in a hairline grid, each with a 1, 2 or 3-slab drawing for its tier. Invoices show status icons.
  - **Not found:** a broken-connector drawing on a quiet stage, "ERR 404" and two buttons.
  - **Dialog:** a centered panel with open and close animation; on mobile it becomes a bottom sheet with the primary action first.
- **Kept unchanged:** every route, label, field, `data-testid` and accessibility attribute. Native inputs are untouched.
- **Docs:** `design-system/` has `VERSION` and `components.md`, and `AGENTS.md` and `CLAUDE.md` point to it.
- **Review:** I checked each piece by itself at 2x on a temporary route, then removed the route. Blueprint widths measured in the browser: the large size is 91% of its svg (about 273px), the small one 87px, the medium one 145px.

## What I couldn't apply
- **No commits, one per screen or otherwise:** `git` isn't among the commands I was allowed to run, so everything is uncommitted.
- **No update date for `VERSION`:** the spec doesn't give one, so the file says so.
- **No running-work elements on screen:** the lit stage, spec plates, running dot loops, shimmer, live edge, caret, opener and dot field are built but not used. The app has no product images, no content sections and no real async work, and the spec forbids faking a working state.
- **Banner opening the form:** when the first invalid field is more than a screen above the banner, the spec says the banner "also opens the form". The wording is unclear and I didn't implement it. Focus still moves to the first invalid field.
- **Error-state screenshots:** the snap tool captures pages, not interactions, so the validation errors and the open dialog were checked through the tests plus one temporary snap, now reverted.

## Decisions I made
- An invoice marked "Due" uses the half-ring warning icon.
- Invoice IDs are in mono, in the primary text color.
- The pinned column's edge only shows below 768px, so full-width tables have no vertical line.
- The 404 block is 480px wide instead of 360px, so the drawing fits.
- The header avatar is 16px and the profile preview avatar is 32px.
- Strength dots light 1 for weak, 3 for fair and 5 for strong.
- I added a "Go back" button as the 404 page's second button.
- I wrote short new descriptions for the group headings, such as "The card charged for each invoice."
- Revoke is a bordered pill with grey text, not red, because the spec lets only danger messages color text.