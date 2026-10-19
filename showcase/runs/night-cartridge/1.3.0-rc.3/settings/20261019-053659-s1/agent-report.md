Night Cartridge is now applied to every screen: Profile, Notifications, Security, Billing and the not-found page. The build passes, all 8 smoke tests pass, and the final snapshot run reports no sideways scrolling at 1440px or 390px. The spec is dark-only, so the light and dark screenshots look the same. I didn't commit; the spec suggests one commit per screen, but you didn't ask for commits.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`. The pixel fonts are loaded from the links the spec gives, in `index.html`. The old light palette, radius, soft shadows and transitions are gone.
- **Art (`src/art/`):** the spec's scene helpers ported to TypeScript, plus a sprite builder that adds the outline, highlight and shade to every object.
  - **The app's world is "Account Square", a town's civic quarter at night.** Each settings section gets its own main building in the shared strip scene: a registry office for Profile, a post office with a swinging bell for Notifications, a gatehouse for Security, and a counting house with chimney smoke for Billing.
  - Around them sit eight yard props, the ground strip with three sprites, and a 48×48 scene for the not-found page (lights off, one red beacon).
  - All motion uses stepped frames and stops under `prefers-reduced-motion` or when the header's Animation switch is off.
- **Reusable pieces (`src/components/pixel.tsx`, `HeaderSwitches.tsx`, `FieldError.tsx`):** framed windows, dither rules, the gold ▶ marker, block meters, callouts, initials avatars, pixel icons, the scene pieces, and the Animation and Pixel body switches (saved between visits).
- **Screens:**
  - Each page opens with a framed scene above its title.
  - The left menu uses the marker and becomes a top menu below 1024px.
  - The forms have one gold submit each, errors that shake once and an inline "!" message.
  - The switches are square, with an On/Off word, and the whole row toggles.
  - Notifications shows a block meter for "3 of 6 on"; the password field has a 3-step strength meter.
  - Tables follow the spec, including the reduced-column mobile layout. Plan cards have hue bars and the current plan is framed in gold.
  - The dialog has a title bar, a close button and the gold confirm.
- **Docs:** `design-system/VERSION`, `design-system/components.md` (the world, scenes per screen, hue assignments) and `AGENTS.md` / `CLAUDE.md` pointer lines.

All routes, labels, form fields, `data-testid`s and accessibility attributes are unchanged. The two review routes I added have been removed from `App.tsx`.

**Spec items I couldn't apply**
- **Header nav items and search:** the app has no search, and duplicating the sidebar links in the header would create duplicate test ids. The header has the brand, both switches and the user.
- **Danger zone:** there are no destructive account settings to put in one.
- **One status region per screen:** Security keeps its two `role="status"` regions because the tests use both.
- **Blinking nav marker:** the spec makes this optional and I left it out so it isn't hidden in screenshots.

**Decisions I made**
- The Notifications count is shown as a block meter, since it's items enabled out of a fixed set.
- Plans continue the fixed hue order after the four sections (green, pink, orange).
- The newest invoice gets the table marker.
- Invoice dates display as `YYYY.MM.DD`; the data itself is unchanged.
- Each scene window has a small "Account" label above the title, and the Profile form window has a "Personal details" title bar. Both are new text.
- The sidebar runs full height from the header to the ground strip.

**Report numbers**
- **Item sprites:** none.
- **Variants:** every prop is unique; nothing is repeated.
- **Main buildings:** each is 23 units tall (46px) at x 258, base y 45. Each has 2–3 steady lit windows, plus 4 blinking lights on props.
- **Main group:** conifer at x 244–255, building, post box at x 304–313. Its centre is x 279, 81 units off the scene centre.
- **Gaps, left to right:** 100 (from the scene's crop edge at x 38), 3, 73, 2, 2–6, 70, 3, 111, 4, 121.
- **Detail dots:** 73–75 per strip and 15 in the not-found scene.
- **Ground strip:** sprites at x 236, 396 and 556, 160 apart.

**Two leftovers to delete:** my allowed commands can't delete files, so the review pages `src/pages/ArtReview.tsx` and `src/pages/StatesReview.tsx` still exist. They're no longer routed.