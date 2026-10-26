Morning Shapes 0.1.0-rc.5 is now applied to every screen: Profile, Notifications, Security, Billing and the not-found page. The build passes, all 8 smoke tests pass, and the final snapshot run reports no page scrolling sideways at 1440px or 390px. I opened the screenshots in light and dark and fixed what didn't match. I also checked the dialog, the error-field styling and the shapes up close on a temporary page.

## What changed
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package's `tokens.css`, and the app loads it. Light and dark both work: dark follows the system setting, and `data-theme` forces either one. The old variable names at the top of `base.css` still work and point to the new tokens. Figtree and DM Mono are bundled with the app (two font packages added to `package.json`), so nothing loads from the network.
- **Reusable signature pieces:**
  - `HeaderBand.tsx`: header band with the curved bottom edge.
  - `art.tsx`: crescent-shaded shapes, sparkles, clouds, small round "plate" pictures, one shape cluster per section, and the error-page picture.
  - `Glyph.tsx`: breathing glyphs that pause off-screen, plus a loading-dots indicator.
  - All pill and circle button styles, with the 2px ledge.
- **Every screen:**
  - A cream header band whose cluster pictures the section: a name badge, a bell, a padlock, a wallet.
  - A small picture next to each settings group title: envelope, speech bubble, key, laptop, medal, card, receipt.
  - Ink pill buttons for main actions and cream ones for secondary.
  - Restyled 56px inputs, the select with a chevron, 48×28 switches and framed tables.
  - Plan cards with the current plan as one orange card with a check disc.
  - Success messages as a green tick plus text.
  - The dialog with a cream footer; it becomes a bottom sheet on phones.
  - A cream footer with a curved top edge.
- **Motion:** one star drifts slowly on each screen, the small pictures fade in once, and a breathing glyph shows in the "no other devices" state. All of it stops under reduced motion.
- `design-system/` now has `VERSION`, the tokens and `components.md`. `AGENTS.md` and `CLAUDE.md` each have the one-line pointer to it.
- Every route, label, form field, `data-testid` and accessibility attribute is kept. Two small additions: a "Close" circle button in the dialog, and the table scroll areas can now be focused and have a label.

## What I couldn't apply
- **No per-screen commits or branch.** git isn't in the allowed commands, so all changes are uncommitted in the working tree.
- **A leftover file.** I couldn't delete the temporary review page either. Its route is removed and `src/pages/PreviewPage.tsx` is now just `export {};`, so please delete it.
- **Not relevant to this app:** the product vignette, confetti and the large closing button, which the spec places on marketing pages.
- **Pieces built but not shown anywhere:** the loading dots (the app has no loading states) and the empty-state button (there's no sensible action for "no other devices").
- **The menu circle on phones.** On phones the section links become a sideways-scrolling row of pills instead.
- **Revoke stays a labelled pill.** The spec suggests small round icon buttons for table actions, but I kept the visible "Revoke" text.
- **Header band height.** The Profile band measures about 190px including its curve, a bit under the spec's "about 200–260px". That's simply the spec's padding around a title and one line of text.

## Decisions I made
- **Colors.** All header bands are cream, because the spec's Settings guidance asks for that. Each section still gets its own color on the nav dot, its picture and the small plates: Profile yellow, Notifications blue, Security green, Billing orange. The avatar uses the Profile yellow.
- **Layout.**
  - The sidebar is white rather than cream, so it doesn't merge with the cream header band.
  - Below 1024px the sidebar becomes a row of pills under the top bar.
  - The header band spans the full content column to the right of the sidebar.
- **Footer.** The spec says every app gets one. I added a cream footer with section links and a "Signed in as …" bar. Its one-line description ("Your profile, notifications, security and billing in one place.") is new text I wrote. The footer is the same cream as the header bands, which the spec technically discourages, but they're never on screen together.
- **Smaller choices.** All plan buttons are ink rather than blue, since no single one is the clear purchase action. Password strength shows as a colored dot with the text, because the spec forbids yellow text. Invoice IDs use the monospace font.