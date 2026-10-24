All four settings screens and the not-found page now use Graphite Blueprint, in light and dark. The build passes, all 8 smoke tests pass, and the final screenshot run found no page that scrolls sideways at 1440px or 390px.

**What changed**
- **Tokens and base:** `design-system/tokens.css` is a copy of the package's `tokens.css`, imported from `src/styles/base.css`, which I rewrote. Dark or light follows the device setting. The old variable names still exist and point at the new tokens. Inter and Geist Mono load from Google Fonts. Under reduced motion every loop stops on a readable frame.
- **Signature pieces** (`src/signature/`, styles in `signature.css`): the stage, dot glyph with dot meter and dot field, isometric blueprint, spec plate, shimmer / live edge / pulse / caret, and the screen header and section opener. I checked them on a temporary review page in both themes against the recipes; they matched.
- **Shell:** sticky blurred header. The sidebar has a mono group label, icons and a tinted current row. Below 1024px it becomes a pill row that scrolls sideways inside itself.
- **Every screen:** a header with a mono label ("Account · 01 / 04"), the h1, and a two-tone summary. Settings sit in split rows: title and description on the left, controls on the right from 1280px, stacked below that.
- **Profile:** a quiet stage shows a live preview of the member card. A failed save now shows a "2 fields need attention" banner. Save and Reset stack full width on mobile.
- **Notifications:** 28×16 switches with mono per-group counts ("2 / 3 ON").
- **Security:** the password-strength hint has a dot meter. In the sessions table, "Active now" has a pulse and the Revoke column stays pinned on mobile. With no other sessions, an empty state shows the 48px empty glyph.
- **Billing:** each plan card has 1–3 stacked slabs by tier, which lift on hover, and a "Current plan" badge. Invoice IDs and dates are mono, and status uses icons. The dialog has a mono "Plan change" label, a bordered Cancel and an inverse Confirm, and becomes a bottom sheet on phones.
- **Not found:** two slabs joined by a broken connector on a quiet stage, then "ERR 404", the heading and two buttons.
- I also added `design-system/` (VERSION, tokens, `components.md`), `AGENTS.md` and `CLAUDE.md`. Every route, label, test id and accessibility attribute is unchanged.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but git wasn't among the commands I was allowed to run. Everything is uncommitted on `main`.
- **Leftover file:** I also couldn't delete files. The review route is removed, but `src/pages/PiecesPage.tsx` is left as an empty stub; please delete it.
- **Unused spec plate:** the spec plate is built but used nowhere, because nothing in this app is a missing image.
- **No working-state motion:** there is no shimmer, live edge or running glyph, because the app has no async work and the spec forbids faking it.
- **No dialog check:** the snapshot tool only captured page routes, so I didn't screenshot the open dialog or the error states.

**What I decided myself**
- I wrote short new copy:
  - Group descriptions on every screen.
  - Summary sentences such as "Changes apply after you save." and "1 invoice is due."
  - "New sign-ins show up here." in the sessions empty state.
- The not-found page has a second button, "Security settings".
- Avatars are 24px in the header and 48px on the profile photo row (the spec says 32px for profiles).
- Plans are bordered cards, not a hairline grid.
- An invoice that is "Due" shows the empty-ring status icon.
- The current session's "Active now" counts as live, so it gets the pulse.
- The not-found page has no screen header; it uses the error empty state instead.