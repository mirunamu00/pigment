I've applied graphite-blueprint 1.2.0-rc.4 to all four settings screens, the shared shell, the plan-change dialog and the not-found page, in both light and dark. The build passes, all 8 smoke tests pass, and the final snapshot run reports no sideways scroll at 1440px or 390px in either appearance. I looked at every screenshot.

**What I changed**
- **Tokens and fonts:** the tokens file is copied into `design-system/tokens.css`, and the app's old CSS variable names now point at the new tokens. Light and dark follow the device setting. Inter and Geist Mono are self-hosted from npm font packages I added to `package.json`. The global reduced-motion rule and `overflow-x: clip` are in place.
- **Signature pieces:** each one is a reusable component in `src/design/`, built from its recipe: the dot glyph and dot meter, blueprints, spec plate, quiet stage with its FIG caption, screen head, settings section row, live pulse and icons.
- **Shell:** sticky 64px translucent header; a 240px sidebar with a mono "SETTINGS" label and icons. Below 1024px the sidebar becomes text-only pill tabs that wrap.
- **Every screen** opens with a mono label, a 590-weight title and a two-tone summary, then sections split into title/description on the left and controls on the right, each numbered "01 / 02" and so on.
  - **Profile:** a live preview of your profile card on a quiet stage, captioned FIG 0.1. A failed save shows a "N fields need attention" banner and focuses the first bad field.
  - **Notifications:** the count is a mono label, and switches are drawn to spec with a 44px touch area.
  - **Security:** the error banner, a 5-dot password strength meter, and a sessions table with a "This device" badge and a pulsing dot beside "Active now".
  - **Billing:** plan cards in a hairline grid, each with a small blueprint stack (1, 2 and 3 slabs by tier), plus the payment card and the invoices table. The dialog is restyled and becomes a bottom sheet on phones.
  - **Not found:** a broken-connection blueprint ending in a red point on a quiet stage, "ERR 404", and two buttons.
- **Status messages** ("Saved", "Password updated" and the others) briefly show the all-lit dot frame, then a check icon. The text is unchanged.

**Measured at 1440px:** form fields and switch lists stop at 560px. Cards, the plan grid and tables all end at the same right edge (x=1312). Sections close 48px above each dividing line. Right-aligned table headings line up with their cells. Each blueprint drawing fills 91% of its box. All routes, labels, test ids and accessibility attributes are kept.

**What I could not do**
- I ran no `git` commands, since they weren't on your allowed list, so there are none of the per-screen commits the spec asks for.
- The temporary review page file `src/pages/ReviewPage.tsx` still exists. Its route and import are removed, but deleting the file needs a command outside your list. Please delete it.
- I couldn't emulate reduced motion with the snapshot tool. The CSS handles it and the done check skips its delay, but I didn't see it working in a screenshot.
- The error states (profile errors, password mismatch) weren't screenshotted either. I saw the dialog only on the review page.
- The spec plate is built but not used, because nothing in this app is missing an image. No page ends in a final action like sign-up, so none gets a closing statement.

**Decisions I made myself** (also recorded in `design-system/components.md`)
- Both avatars are 32px.
- The left/right section columns are 1:2 and stack into one column below 768px.
- The header brand is indented 20px so it lines up with the sidebar text.
- An unpaid "Due" invoice uses the in-progress status icon.
- The section descriptions are short new copy I wrote, and so are the bold lead-ins in the screen summaries: "Your profile.", "Plan changes apply from your next invoice." For Security I bolded the existing words "Manage your password" rather than add text, so it stays on one line.
- I added a "Go back" button on the not-found page, because the spec's error state calls for two buttons.
- The `VERSION` file is dated 2026-10-19, since the package doesn't state an update date.
- I added `AGENTS.md` and `CLAUDE.md`, each pointing to `design-system/`.