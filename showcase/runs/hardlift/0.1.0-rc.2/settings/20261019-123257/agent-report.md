I've applied Hardlift 0.1.0-rc.2 to every screen: Profile, Notifications, Security, Billing and the not-found page, in light and dark. The build passes, all 8 smoke tests pass, and the final `node pigment-snap.mjs` run reports no sideways scrolling at 1440px or 390px. I opened the screenshots for each page, plus a temporary preview route for error fields, the confirmation card, the dialog, the stickers and the loading coin. I've removed that route.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied unchanged into `src/styles/`. The old CSS variable names (`--color-text`, `--radius`, …) now point at the new tokens. DM Sans and the Korean fallback font (Noto Sans KR) load from Google Fonts in `index.html`.
- **Signature elements** are in `src/styles/signature.css`, plus a few small components:
  - **Lifting buttons:** pink, ink and outline buttons that lift 4px on hover. Small and table-row buttons lift 2px. Hero and linked-card versions are built but nothing uses them yet.
  - **Header band:** `PageBand` puts each page's h1 on a full-width teal band; the not-found page gets the red band.
  - **Pill navigation:** the settings menu is a vertical list of pills on desktop and a scrolling strip under the band on mobile.
  - **Stickers:** a coin, key and signpost in `Sticker.tsx`. The loading-coin and draw-on animations stop under reduced motion.
- **Per screen:**
  - **Profile:** a form card with a pink Save and an outline Reset, select chevron, error lines with an icon, and one summary line at the top after a failed save.
  - **Notifications:** outlined cards and 48×28 switches with a visible On/Off word next to each.
  - **Security:** the password form card, then a sessions table with 44px rows and 2px-lift Revoke buttons. Its empty state has a small key sticker.
  - **Billing:** plan cards with pink price tags, a thicker border on the current plan, a small coin sticker by the heading, and status badges with an icon plus a word. The confirm dialog has the hard shadow and a close button.
  - **Not found:** red band, 160px signpost sticker, one sentence, and a pink return button.
- `design-system/` holds `VERSION`, the token copies and `components.md`, which explains where each piece is used and how to reuse it. `AGENTS.md` and `CLAUDE.md` contain the one-line pointer.

**What I couldn't apply**
- **One commit per screen:** git isn't one of the commands I was allowed to run, so everything is uncommitted in the working tree. `npm install` also created a `package-lock.json`.
- **Fixed bottom-left toasts:** the app's existing status messages (e.g. "Saved") stay where they were, inside each save row. They look like the spec's toast (raised card, ink border, hard shadow, pink check, slide-up entry) but aren't fixed to the corner and don't auto-dismiss. That keeps them tied to their forms and leaves the tested behaviour unchanged.
- **No uses yet:** there's no landing hero, tag list or loading state in this app. The drift, scrolling tag strip and hero button pieces are built but not used anywhere.
- **Hover not screenshotted:** the snapshots can't capture hover, so I checked the lift effects in the CSS rather than in screenshots.

**Decisions I made**
- **Where the h1 sits:** the band's h1 is rendered just above the settings menu so the band can span the full width, which puts it outside `<main>`. Tests and routes are unaffected.
- **Band colour:** the whole settings area uses teal, and avatar placeholders and sticker fills follow it, so no screen shows two band colours.
- **Stickers on settings screens:** the spec contradicts itself here (settings: "band and lift only" vs "a settings header may have one small sticker"). I left stickers off the form screens and used one small sticker only on Billing and in the sessions empty state.
- **Old spacing names:** `--space-4` and `--space-8` used to mean 16px and 32px. They now follow the token scale (4px and 8px), because aliasing them would break the tokens.
- **Additions:**
  - an error summary line on the profile and password forms
  - a dialog close button
  - On/Off text next to each switch

  All labels, test ids and behaviour are unchanged.