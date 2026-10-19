I've applied graphite-blueprint@1.2.0-rc.1 to every screen. The build passes, all 8 smoke tests pass, and no page scrolls sideways at 1440px or 390px in light or dark. I looked at every screenshot and fixed what was wrong before the final pass. Nothing is committed: git isn't on the list of commands I was allowed to run, so the spec's one-commit-per-screen step is left for you.

**What changed**
- **Tokens, fonts, root:** `tokens.css` is copied unchanged. Inter (variable) and Geist Mono are self-hosted through two `@fontsource` packages added to `package.json`. The root setup, 1px indigo focus outline and reduced-motion block follow the spec. The old style variables now point at the tokens.
- **Light and dark:** both are supported and follow the device setting.
- **Signature elements:** each is a reusable piece in `src/signature/`, with the CSS copied from the spec into `src/styles/signature.css`:
  - stage
  - dot glyph and dot meter
  - blueprint drawings: stack, connected pair, broken connector
  - spec plate
  - shimmer, live edge, pulse, caret
  - screen head and section head
- **Shell:** sticky translucent header; sidebar with icons that becomes wrapping text pills below 1024px; restyled buttons, fields, switches, tables, badges and the dialog (including a bottom sheet on phones).
- **Profile:** a live profile-card preview on a quiet stage, one-column fields, an error banner above the actions on a failed submit, and a mono character counter.
- **Notifications:** sections laid out as split rows; the "3 of 6 notifications on" count is the mono label above the heading.
- **Security:** a dot meter beside the password strength, an error banner, the sessions table with a live pulse on "Active now", and an empty state with the empty glyph when no other devices remain.
- **Billing:** plan cards in a hairline grid, each with a small stack drawing of 1, 2 or 3 slabs for its tier; a spec plate on the payment card; the invoices table with mono IDs and dates, right-aligned amounts and status badges.
- **Not found:** the error empty state: broken-connector drawing on a quiet stage, "ERR 404", two buttons.
- **Docs:** `design-system/` (VERSION, tokens, `components.md`), plus one-line `AGENTS.md` and `CLAUDE.md` pointers.

**Measured at 1440px:**
- Each settings section ends 48px above the next rule.
- Right-aligned headers end exactly where their cells do (Amount 1153/1153, Status 1312/1312).
- The plan drawings fill 91% of their box; the spec asks for at least 85%.

I reviewed the signature pieces on a temporary route and removed it.

**Not applied**
- **Shimmer, live edge and running glyphs:** nothing in this app actually runs, and the spec forbids faking a working state.
- **Lit landing stage and three-drawing row:** these belong to landing pages, and this app has none.
- **The spec's update date:** the spec gives none, so `VERSION` says so.

**Decisions I made**
- **Labels and copy:**
  - mono labels above each heading: "Workspace profile", "4 active sessions", "5 invoices"
  - a short second sentence in some screen summaries
  - section titles and descriptions
  - a "Go back" button as the 404's second action
- **Profile preview:** treated as the "live preview beside the controls" use of a quiet stage. It repeats your name and bio and is hidden from screen readers.
- **Billing layout:** the card grid's column count follows the width of the content area rather than the viewport, because the cards sit in the narrower controls column. Plan drawings share a fixed-height box so names and prices line up across cards.
- **Table pin column:** its divider line and fade appear only below 768px, where the table can scroll. On desktop it would look like a vertical rule, which the spec forbids.
- **Small details:**
  - the header avatar is 24px, between the spec's 16px and 32px sizes
  - switches get a larger invisible hit area on the switch itself, with no overlay on the label
  - the live pulse beside "Active now" counts as a live state
  - old variable names that clashed with token names (`--space-*`, `--font-size-h1/h2`) now take the token values