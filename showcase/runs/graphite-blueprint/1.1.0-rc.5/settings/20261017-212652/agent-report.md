I've applied Graphite Blueprint 1.1.0-rc.5 to all four settings screens and the not-found page, in light and dark. The build passes, all 8 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I checked every screenshot against the spec and fixed what was off. Nothing is committed: you didn't ask for commits, so the spec's one-commit-per-screen step was skipped.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is an exact copy of the package's `tokens.css`. Light and dark follow the device setting. Inter and Geist Mono are self-hosted from two `@fontsource` packages added to `package.json`; no font CDN.
- **Base styles:** `src/styles/base.css` is rewritten on the spec's tokens. The old variable names that didn't clash with token names point at the tokens. Old names like `--space-2` and `--font-size-h1` meant different values in the tokens, so I dropped them.
- **Signature pieces:** each one is a reusable piece in `src/signature/`, with its CSS copied unchanged from the recipes into `src/styles/signature.css`. I viewed them on a temporary route at 2x and they match their recipes. That route is removed.
- **Shell:** a sticky translucent header, and a sidebar with a mono "SETTINGS" label and icons. Below 1024px the sidebar becomes wrapping text pills.
- **Every screen:** a header with a mono label, the h1 and a two-tone summary, then settings groups laid out as split rows ("01 / 02" counter, title and description left, controls right).
- **Profile:** one-column form with a native select and chevron, a mono character counter, a "N fields need attention" error banner above the actions, and a done glyph that becomes a check on "Saved".
- **Notifications:** a quiet stage previewing an inbox (inert, sample text only), 28×16 switches with 44px tap areas, and the count shown as a mono label.
- **Security:** a 5-dot strength meter, a live pulse on the current session, and a 48px empty glyph when only this device is left. The sessions table follows the spec's table rules, including the 390px layout (first and pinned columns only).
- **Billing:** plan cards in a hairline grid with 1, 2 and 3 stacked slabs (Free, Pro, Business) that lift on hover; a payment card; the invoices table with status icons; and the dialog restyled with a mono caption and a bottom sheet on phones.
- **Not found:** the error empty state, with a broken-connector drawing on a quiet stage, "ERR 404" and two pills.
- **Docs:** `design-system/` (VERSION and `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

Every route, `data-testid`, form field, ARIA attribute and test-checked text is unchanged. All animations stop under reduced motion.

**What I couldn't apply**
- The spec plate, working shimmer, live edge and the lit landing stage are built but not placed anywhere. The app has no products, posts, running jobs or landing sections to use them.
- The Security screen still has two status regions (password and sessions), against the spec's one per screen. The tests depend on both.
- The spec asks to review pieces on an edited existing page. You asked for a temporary route, so I used one.

**Decisions I made myself**
- **Snapshot workaround:** `node pigment-snap.mjs /path` failed in both shells here. PowerShell refused to parse it, and Git Bash rewrote the paths into Windows paths. So I briefly listed the review page and a missing page in `pigment.app.json`, ran the full snapshot, and reverted the file. It shows no diff now.
- **Avatars:** 24px in the header (the spec doesn't size it), 32px on Profile, and single letters in the 16px preview avatars so the initials fit.
- **Summary copy:** I shortened Profile's second sentence to "Save to apply." On Security, the original sentence is split into two tones and the device count is a separate mono line.
- **Invented copy:** I wrote the group descriptions, the Billing line "Invoices are issued on the 1st of each month.", the "No other sessions" empty text and a "Go back" button on the not-found page.
- **Status colours:** "Due" invoices use the half-filled warning icon. Strength dots go danger → warning → success.
- **Hover lift:** plan cards lift their slabs with a CSS hover rule rather than a script toggling a class.
- **`design-system/VERSION`:** the package gives no update date, so I used today's date.