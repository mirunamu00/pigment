I've restyled every screen in Graphite Blueprint 1.1.0-rc.8: Profile, Notifications, Security, Billing and the not-found page. The build passes, all 8 smoke tests pass, and the final screenshot run shows no sideways scroll at 1440px or 390px in light or dark. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

## What changed
- **Foundation:**
  - The token file is copied unchanged to `design-system/tokens.css`. Light and dark follow the device setting, with no theme switch.
  - Inter and Geist Mono are self-hosted from two npm font packages (`@fontsource-variable/inter`, `@fontsource/geist-mono`). These are the only dependencies I added.
  - The old CSS variable names now point at the design tokens.
  - The root setup and the reduced-motion block follow the spec.
- **Signature elements**, each built to its recipe as a reusable piece in `src/signature/`: the lit stage (`Stage.tsx`), dot glyph and dot meter (`DotGlyph.tsx`), blueprints (`blueprint.tsx`), spec plate (`SpecPlate.tsx`), shimmer and live dot (`Live.tsx`), and the screen/section heads (`Heads.tsx`). I checked them on their own on a temporary page in light and dark, then removed that page.
- **Shell:** sticky see-through header, 240px sidebar with icons. Below 1024px the sidebar becomes wrapping text pills, so all four sections show at 390px.
- **Every screen:** a screen head (mono label, h1, two-tone summary) and numbered "01 / 02" section heads split across the page width, with hairlines between groups.
  - **Profile:** a live preview of the profile card on a quiet stage above the fields, one-column form, error banner shown when a save fails.
  - **Notifications:** restyled switches. The section head sits inside each group's legend, so each group keeps its "Email" / "Push notifications" name.
  - **Security:** password strength shown as a dot meter, sessions table, a pulsing dot beside "Active now", and an empty state when no other devices are signed in.
  - **Billing:** plan cards in a hairline grid, each with a stack of slabs for its tier (1, 2 or 3) that lifts on hover. Invoices table with status icons. The dialog becomes a bottom sheet on phones.
  - **Not found:** an error state with a broken connector between two slabs, "ERR 404", and two buttons.
- **Docs:** `design-system/` (VERSION, tokens, `components.md`) and the one-line pointer in `AGENTS.md` and `CLAUDE.md`.

## What I couldn't apply
- **One commit per screen:** git wasn't among the commands I was allowed to run, so nothing is committed. All changes are in the working tree.
- **Spec plate:** built but not used anywhere. No screen in this app is a product, post or record, so none calls for one.
- **Running glyphs, shimmer and live edges:** not used on any screen. The spec allows them only while something really runs, and this app makes no real requests.
- **Measured checks:** I didn't take the `getBoundingClientRect()` measurements the spec's verification step asks for; I only compared screenshots by eye.
- **Not reviewed in screenshots:** the "No other sessions" empty state, keyboard-focus rings on real pages, and reduced motion.

## Decisions I made
- The section head layout ("split rows") puts the title on the left and the description from the middle of the page; the controls sit below, with forms 560px wide and tables full width.
- The profile preview repeats your own field values (name, job title, bio). The spec says a stage's sample text should appear nowhere else; I treated a live preview of your inputs as an exception.
- The header avatar is 24px, a size the spec doesn't give.
- On the password meter, "Too short" lights 1 of 5 dots, Weak 2, Fair 3 and Strong 5, in the matching status colour.
- On the invoices table, Due uses the half-filled warning icon and Paid the green check.
- On touch screens, buttons and nav pills grow to at least 44px tall.
- On the not-found page, the broken-connector drawing sits directly on the quiet stage rather than inside a window.
- I wrote new copy where a summary or section needed a second line. Examples: "Check both after a sign-in you do not recognize.", "Compare tiers and switch at any time.", "Charged on the first of each month." I also added a "Go back" button so the not-found page has its two buttons.
- The VERSION file uses today's date (2026-10-18), because the package doesn't state a release date.