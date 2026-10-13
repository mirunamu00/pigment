The settings app now uses margin-notes@0.1.0-rc.3. On the final run of `node pigment-snap.mjs` the build passed (typecheck included) and no page scrolls sideways. I checked the screenshots at 1440px and 390px, light and dark. I couldn't run the smoke tests themselves (`npm run test:e2e` isn't one of the allowed commands). I didn't change or remove any route, label, form field, `data-testid` or accessibility attribute, so they should still pass.

**What I changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of `dist/tokens.css`, imported in `src/main.tsx`. `index.html` loads Geist, Geist Mono and Caveat from Google Fonts. Light and dark follow the system setting, with `data-theme` overriding it.
- **Old variables:** I removed the old ones in `src/styles/base.css` instead of aliasing them. Several old names (`--space-4`, `--font-size-h1`, …) are also token names with different values, so aliasing would have broken the tokens. The stylesheet now uses semantic tokens throughout.
- **Shared parts:**
  - `Layout.tsx` has the 40px-gutter container, a 72px header (60px on mobile), and a 220px sidebar with a mono "Settings" eyebrow. The filter SVG (`StudioFilters.tsx`) is mounted once here.
  - `ConfirmDialog.tsx` follows the spec, with a ghost close button and actions stacked full-width on mobile.
  - A new `FormErrorSummary` callout ("2 fields need attention") appears on the Profile and password forms after a submit with errors.
- **Screens:**
  - **Profile:** new controls and error states, and a save bar on mobile.
  - **Notifications:** new cards and 36×20 switches.
  - **Security:** both tables (here and on Billing) keep their markup but turn into one block per row on mobile, with roles and `data-label` added.
  - **Billing:** the current plan card is raised, with an ink badge. Paid and Due show as status badges with a dot. Invoice IDs, dates and amounts are monospace.
  - **Not found:** an empty-state panel with the watercolor bloom and a pencil note.
- **Docs:** I added `design-system/VERSION`, `design-system/components.md`, and `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **One commit per screen:** git isn't in the allowed commands, so everything is uncommitted in the working tree.
- **Mobile save bar in screenshots:** the bar is sticky, so in the full-page captures it shows at the bottom of the first screen, on top of the form fields. It sits correctly at the bottom when you actually scroll.
- **Not checked:** the not-found page isn't in the captured routes, so I haven't seen its bloom and note rendered. I also didn't capture the dialog or error states.
- **Not added:** a dialog exit animation (the native `<dialog>` closes instantly) and a mobile menu button (four short links fit at 390px).

**Decisions I made**
- **Pencil note:** the spec puts the sidebar note at `--note-x: calc(100% - 32px)`. That would run across the content column, so I moved it to 16px from the list's left edge, inside the sidebar.
- **Section nav:** I kept the existing sidebar even though there are only 4 sections, because the note's target is the section nav list. On mobile it becomes a row of 44px links.
- **Revoke buttons:** they're small secondary buttons, not danger buttons. The spec reserves danger for confirming a destructive action.
- **Save bar:** it's sticky inside the form card rather than fixed to the screen, so it doesn't need the extra page padding the spec mentions.
- **Section layout:** headings sit above their card or table, so the plan cards and table frames aren't nested inside another card.
- **No serif word or tape** anywhere, as the spec says for settings apps. Instrument Serif isn't loaded.
- **Not covered by the spec:** I styled avatars and password-strength colours from the tokens.