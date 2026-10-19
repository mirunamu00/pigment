I've applied margin-notes@1.2.0-rc.1 to every screen: Profile, Notifications, Security, Billing, the not-found page and the shared shell. The build passes, all 8 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in light or dark. I went through the final screenshots of every page and checked against the spec.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied unchanged into `src/styles/`. The top of `base.css` maps the old variable names onto the new tokens. Five old names clashed with token names (`--space-4/6/8`, `--font-size-h1/h2`), so those now take the token values. The four fonts load from Google Fonts with `display=swap`. Dark mode follows the system setting, and `data-theme` on the page overrides it.
- **Reusable pieces:**
  - The watercolor filters, rendered once at the app root.
  - Bloom, tape and pencil note, each built to its recipe.
  - A toast that confirms every save and submit.
  - Success badges for the "Saved", "Password updated" and similar messages.
  - Field errors with an alert icon, plus a "2 fields need attention" callout at the top of a form submitted with errors.
- **Shell:** one page container that starts at 40px on desktop. The 220px sidebar carries the one pencil note allowed on settings screens ("pick a section"). Below 860px it becomes a menu opened from the header, which closes on Escape, an outside click or navigation.
- **Screens:**
  - Profile gets a fixed Save bar on mobile.
  - Security's password card shrinks to fit the form.
  - Both tables turn into one block per row on mobile.
  - Dates, amounts and invoice numbers use the monospace font.
  - The current plan card is lifted with a neutral "Current plan" badge.
  - The dialog is centered, has a close button, closes on a backdrop click, and opens with the focus ring on Cancel.
  - The not-found page is the full empty state: tape, bloom, and a note beside its button.
- **Documentation:** `design-system/` (VERSION, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but git isn't among the commands I'm allowed to run, so all changes are uncommitted. `npm install` also created a `package-lock.json`.
- **Little motion to show:** the spec defines the signature elements as static, and these settings screens may not use the serif word, bloom band or tape. The motion that exists (switch slide, color changes, dialog and toast fade-in) stops under reduced motion.
- **No update date:** the spec gives none, so VERSION records the version and today's date.
- **Interaction states not in the full run:** `pigment-snap.mjs` only screenshots URLs, so the error, saved, dialog and keyboard-focus states weren't in the full run. I checked them on a temporary page, which I've removed.

**Decisions I made**
- **Toasts are hidden from screen readers.** The test needs exactly one status region per page, and each page's existing status message already announces the same text.
- **"Revoke" is a small secondary button, not red.** The spec reserves the red fill for confirming a destructive action.
- **The not-found heading is 22px**, the spec's empty-state title size, since it sits inside the empty-state card.
- **Password strength uses a colored dot** next to plain text, so the level isn't shown by a colored word alone.
- **The "Current plan" badge has a thin outline** because in dark mode its background is the same color as the lifted card.
- **Smaller choices:**
  - The avatar is a 64px circle.
  - Sections are spaced 56px apart.
  - The Plans section has no card frame of its own, to avoid cards inside a card.
  - Mobile table rows use 20px side padding to line up with the card.

All of these are listed in `design-system/components.md`.