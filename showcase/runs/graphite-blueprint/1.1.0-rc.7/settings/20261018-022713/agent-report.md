I've restyled the app to Graphite Blueprint 1.1.0-rc.7. The build passes, all 8 smoke tests pass, and `pigment-snap` reports no sideways scroll at 1440px or 390px in light or dark. I opened every screenshot, plus the not-found page and a temporary page showing each signature piece on its own, and they match the specification.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's tokens. The old CSS variables in `src/styles/base.css` now point at the new tokens. Light and dark follow the device setting. Inter and Geist Mono load from two npm font packages, with no font CDN.
- **Signature pieces** are reusable, in `src/design/` and `src/styles/signature.css`: the spotlit stage, dot glyph and dot meter, isometric blueprints, spec plate, live dot / shimmer / caret, and the screen and section heads. Their animation works and stops on its resting frame under reduced motion.
- **Shell:** a sticky translucent header, and a sidebar with icons and mono group labels. Below 1024px the sidebar becomes a wrapping row of text-only pills.
- **Every screen** has a screen head (mono label, h1, two-tone summary). Each section is a split row: number, title and description on the left, controls on the right.
  - **Profile:** a live preview of the profile card on a quiet stage, a one-column form, and an error banner above the actions when a save fails.
  - **Notifications:** spec switches with hairlines between rows, and the count as a mono label.
  - **Security:** a dot meter for password strength, the spec table with a pinned actions column on small screens, and a pulsing dot beside "Active now".
  - **Billing:** plan cards with 1-, 2- and 3-slab tier drawings that lift on hover, the "Current plan" badge, status icons for invoices, and the restyled dialog (a bottom sheet on phones).
  - **Not found:** the error empty state with a broken-connector drawing, "ERR 404", and two buttons.
- No route, label, form field, `data-testid` or accessibility attribute was removed. `design-system/` (VERSION, tokens, components.md), `AGENTS.md` and `CLAUDE.md` are added.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but git isn't in the commands I was allowed to run, so all changes are uncommitted.
- **Leftover file:** `src/pages/ReviewPage.tsx` is now an empty placeholder. It was the temporary review page; its route is gone, but I couldn't delete the file without a disallowed command. Please delete it.
- **Spec plate:** built but unused, because this app has no products, posts or missing images.
- **Not used because nothing fits:** loading states, toasts and the button loading state, since nothing in the app makes a real request.
- **Tap targets:** controls below 768px aren't all padded to 44px. Only stacked form buttons and dialog buttons are.

**Decisions I made**
- The spec gives no update date, so `VERSION` uses 2026-10-17, the date in the package's `manifest.json`.
- Inter is registered under the family name the tokens expect, instead of the package's own name.
- The header avatar uses the 32px profile size.
- Plans are separate bordered cards, not a hairline grid, so the current plan can show its stronger border. The grid is three columns, or one when narrow, so the three cards never split two plus one.
- On desktop the pinned table column has no vertical divider; it only sticks and gets the divider while the table can scroll (640–767px).
- **Copy I wrote:**
  - Group descriptions.
  - Second sentences in the screen-head summaries.
  - The "FIG 0.1 Profile card" caption.
  - The not-found "Go back" button and its second sentence.
  - The "Change plan" label in the dialog.
  - "N fields need attention" on the error banner.
- Fieldset legends float so they can sit in the left column; the group names ("Email", "Push notifications") are unchanged.
- To screenshot single paths from this shell, I had to write them as `//settings/...` because Git Bash rewrites a leading `/` into a Windows path.