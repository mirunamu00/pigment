I've restyled all four settings screens and the not-found page to Graphite Blueprint, in light and dark. The build passes, all 8 smoke tests pass, and no page scrolls sideways at 1440px or 390px, in light or dark. I went through every screenshot and fixed what was off. The temporary review view I used to check the signature pieces has been removed.

## What changed
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package's `tokens.css`, typed out by hand rather than copied with a command. Check it against the package once. Light and dark follow the device setting, since the app has no theme switch. Inter and Geist Mono load from two font packages I added to `package.json`; there are no other new dependencies.
- **Old style variables:** the old names now point at the new tokens. Seven old names clashed with token names (`--space-2/4/6/8`, `--font-size-h1/h2/small`), so I removed the old versions and the spec's values apply.
- **Signature elements:** each is a reusable piece in `src/design/`, with the recipe CSS kept as written in `src/styles/signature.css`. The pieces are the stage, the dot glyph and dot meter, the blueprint helpers (including a broken-connector variant for error states), the spec plate, the live dot and shimmer, and the screen and section heads.
- **Every screen:**
  - A screen head (mono label, title, two-tone summary).
  - Numbered section heads per group, with hairlines between groups.
  - Buttons are pills, with a 44px tap area.
  - The global focus ring and the reduced-motion block apply everywhere.
- **Profile:**
  - A quiet stage showing a live preview of the member card.
  - Fields in one column.
  - A "N fields need attention" banner above the actions after a failed save.
- **Notifications:** switches redrawn to the spec's size, keeping the native input.
- **Security:**
  - A dot meter beside the password strength.
  - The sessions table: Revoke pinned at the right, the badge inline, two-line rows on phones.
  - A pulsing live dot beside "Active now".
  - An empty state once only this device is left.
- **Billing:**
  - Plan cards on a hairline grid with 1-, 2- and 3-slab tier drawings.
  - The payment card, and the invoices table with status icons.
  - The dialog restyled with an open/close transition, full width at the bottom on phones.
- **Not found:** the error layout, with a broken-connector drawing on a quiet stage, "ERR 404", and two buttons.
- **Docs:** `design-system/VERSION` and `components.md`, plus `AGENTS.md` and `CLAUDE.md` pointing to them.

## What I couldn't apply
- **No commits:** the spec asks for one commit per screen, but git wasn't among the commands I was allowed, so everything is uncommitted.
- **Spec plate not placed:** no settings screen needs a stand-in image. It's built and was checked on the review view.
- **No running dot glyph or shimmer in the app:** nothing in the app actually loads or syncs, and the spec forbids faking a delay. I checked their animation on the review view instead.
- **`tokens.json` not copied:** `components.md` points to the package copy.
- **Measurements:** I didn't paste the measured element widths the spec asks for; I checked layout from the screenshots only. The reduced-motion and keyboard-focus checks weren't run in a browser either; I checked those in the CSS.
- **No release date:** the spec doesn't give one, so `VERSION` uses the package's capture date, 2026-10-17.

## Decisions I made
- **Copy:** each screen summary got a second, factual sentence for the two-tone style, and each section got a one-line description. All original labels and test text are unchanged.
- **Not-found page:** the second button is "Go back", which returns to the previous page.
- **Small choices:**
  - The "Due" invoice status uses the half-ring warning icon.
  - Avatars are 32px in the header and preview, 48px in the photo editor.
  - Plan cards use a hairline grid; the current plan gets a darker border and its "Current plan" badge.
  - The 44px tap areas come from each button's own invisible extension, not from padding.
  - The time-zone select is wrapped in a span so it can show the chevron.
- **Snapshot tool:** Git Bash turns `/settings/...` arguments into Windows paths, and the PowerShell tool wouldn't start. I passed paths as `//settings/...`, which the tool reads correctly.