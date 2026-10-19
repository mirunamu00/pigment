I've applied Graphite Blueprint to all five screens (Profile, Notifications, Security, Billing and Not found) in light and dark, and on desktop and mobile. The build passes, all 8 smoke tests pass, and no page scrolls sideways at 390px or 1440px. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

**What I changed**
- **Tokens and fonts:**
  - `design-system/tokens.css` is an exact copy of the spec's `tokens.css`, so light and dark follow the device setting.
  - The old CSS variable names in `base.css` now point to the new tokens.
  - Inter and Geist Mono are self-hosted. I added `@fontsource-variable/inter` and `@fontsource/geist-mono` to `package.json` and ran `npm install`; no font CDN.
- **Signature pieces, each reusable** (`src/design/recipes.ts`, `Signature.tsx`, `ui.tsx`, `src/styles/signature.css`): the stage, dot glyphs and dot meter, blueprints, spec plates, the shimmer/pulse/caret styles, the split opener, the screen header and the settings section. I checked each one on its own in a temporary `/__review` route, light and dark, then removed the route.
- **Layout:** a sticky 64px blurred header and a 240px sidebar with icons. Below 1024px the sidebar becomes a row of text-only nav pills that wraps.
- **Every screen:**
  - A screen header: small "ACCOUNT" label, title, and a two-tone summary on the right.
  - Settings sections as split rows numbered "01 / 02": title and description on the left, controls on the right.
  - Form fields stop at 560px wide; everything else reaches the column's right edge.
- **Profile:** a live preview card of your profile on a quiet stage that updates as you type, single-column fields, and a "N fields need attention" banner on a failed save.
- **Notifications:** spec switches, with the on-count as a small mono label.
- **Security:** a 3-dot password-strength meter and the error banner. The sessions table uses mono timestamps, a "This device" badge, a pinned "Revoke" column, and a two-line first cell on mobile. An empty-state glyph shows once the other sessions are revoked.
- **Billing:**
  - Plans are in a hairline grid, each with a small stacked blueprint (1, 2 or 3 slabs by tier), and the current plan has a stronger border and a badge.
  - Invoices show 14px status icons.
  - The change-plan dialog follows the spec and opens as a bottom sheet on mobile.
- **Not found:** a broken-connector blueprint on a quiet stage, "ERR 404", and an inverse pill button.
- I also added `design-system/` (`VERSION`, `components.md`) plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **One commit per screen:** `git` isn't among the commands I was allowed to run, so nothing is committed.
- **Unused pieces:** the spec plate and the shimmer/live-edge/pulse styles are built but appear on no screen. Every item already has its own visual and nothing runs in the background, and the spec only allows them while work really runs.
- **Dialog close:** there is no closing animation, because the native `<dialog>` closes instantly. Opening does fade and scale in.
- **Not found:** it has one button rather than the two the spec's error state calls for. I didn't invent a second destination.
- **Focus in the dialog:** it goes to Cancel, because the tests require that.
- **Not seen in screenshots:** the snapshot tool only captures pages, so the error banner, the open dialog and the saved state were checked by the tests but not by eye.
- **Update date:** the spec gives none, so `VERSION` says so.

**Decisions I made myself**
- **Settings column widths:** 1fr for the title and description, 2fr for the controls, so the three plan cards fit side by side.
- **Plan grid columns:** it drops to one column when its column is under 560px wide, instead of 2 columns below 1024px. Two columns would leave the third plan alone.
- **Quiet stages on mobile:** they keep even 24px padding. The recipe's mobile rule would otherwise remove the bottom padding.
- **Copy and avatar:**
  - New text:
    - Short section descriptions.
    - Second halves of some summaries, e.g. "Payment details and past invoices are below."
    - "New sign-ins will appear here." in the sessions empty state.
    - "Pick a section from the menu." on Not found.
  - "Due" invoices use the warning half-ring icon.
  - The header avatar is 24px.
- **Table header line:** a table that opens a settings section has no top border, to avoid two lines with nothing between them.