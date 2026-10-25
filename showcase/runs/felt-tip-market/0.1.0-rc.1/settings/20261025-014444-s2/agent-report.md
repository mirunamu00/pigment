Felt-tip Market is now applied to every screen: Profile, Notifications, Security, Billing and the not-found page. The build passes, all 8 smoke tests pass, and no page scrolls sideways. I checked every screen at 1440px and 390px, in light and dark, plus the open plan dialog and the sticker kit on temporary routes. Measured sizes match the spec: top bar 80px, nav pills 40px, controls 48px, header band padding 24/32px.

**Two things for you to do:**
- **Delete `src/pages/KitPreview.tsx`.** It held the temporary preview routes. The routes are gone and nothing imports the file, but deleting a file wasn't one of the commands you allowed.
- **Nothing is committed.** The spec asks for one commit per screen, but git wasn't on the allowed command list, so everything is uncommitted on `main`.

**What changed**
- **Tokens:** copied unchanged from `dist/tokens.css` into `design-system/tokens.css` and imported first. Light and dark follow the system setting, and `data-theme` can force either. The old variable names in `base.css` still work and now point at the new tokens. Space Grotesk and JetBrains Mono load from Google Fonts in `index.html`.
- **Reusable signature pieces:** `src/styles/felt-tip.css` holds the lift-and-slam, plate stack, bands, ink box, pills, dashed empty box and price flag, built from the spec's recipes. The React pieces are `HeaderBand`, `PlateStack`, `PriceFlag` and a sticker kit (ID card, key, curled invoice slip, disc token, envelope, plus a "done" word badge and a rocking loading sticker). Scroll drift and rocking stop under reduced motion.
- **Shell:** white top bar with a mark and the signed-in user, a sidebar of pill links (filled pill for the current page), and a black footer. On mobile the sidebar becomes a scrolling pill row.
- **Footer:** has a headline, links, and a "Find a setting" white input with the pink arrow button. It really works: it matches keywords like "password" or "invoice" and opens that section.
- **Each screen** opens on a header band in its area's color with a breadcrumb. Profile = lemon, plus one ID-card sticker as the overview screen. Notifications = periwinkle, with the "N of 6 on" count in a price flag. Security = teal. Billing = marigold.
- **Billing:**
  - The current plan has a 2px pink border and a pink check disc.
  - Plan prices and each invoice amount sit in price flags.
  - Invoice and session tables have ink frames, a paper header row and ruled rows.
  - Invoice and session statuses are outline pills with a colored dot.
- **Forms:** focus shows the pink band plus the ring. Errors get a 2px red border and a "!" disc, and the error text stays black.
- **Dialog:** ruled header and footer, a close button, a fixed hard shadow and an 8px drop-in. On phones it becomes a bottom sheet with full-width buttons.
- **Not-found page:** one lemon band filling the content area, two tumbling stickers, and a plate-stack "Go to profile settings" button.
- **Kept intact:** all routes, labels, form fields, `data-testid`s and accessibility attributes. I added a few accessibility attributes: a breadcrumb `nav`, labelled focusable regions around the tables, and a close button in the dialog.
- **Docs:** `design-system/` has `VERSION` and `components.md` (area-to-band map, sticker subjects, where each piece is used). `AGENTS.md` and `CLAUDE.md` point to it.

**Spec items I couldn't fully apply**
- **No search box in the header bands:** there is nothing to search, so the search lives in the footer instead.
- **Word badge and loading sticker are built but not shown anywhere:** no screen has a success step or a whole-screen loading state.
- **The sessions empty state has no action:** there's no sensible one for "No other devices are signed in."
- **A few raw values remain:** small offsets (2px, 3px), text widths (`28ch`, `14em`) and the sticker size clamp copied from the spec's own recipe.

**Decisions I made myself**
- **Sidebar style:** the settings section links are filled pills, per the Navigation spec, rather than the underlined links the Settings guidance mentions.
- **Revoke buttons** are small outline buttons, not the red "danger" style, because they act immediately without a confirmation step.
- **Pink budget on Billing:** it uses pink in the flag, the selected border and the buttons (dialog confirm plus footer arrow). I didn't count the input focus band, which only appears briefly, toward the three-role limit.
- **Focus ring on bands** stays black in dark mode, because the bands keep their light colors.
- **Footer hover shadow** uses the night shadow color so button lifts are visible on black.
- **Success messages** like "Saved" show as an outline pill with a teal dot rather than a toast.