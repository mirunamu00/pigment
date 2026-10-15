I've restyled all four settings screens and the not-found page with Night Cartridge, and the build passes. Nothing scrolls sideways at 1440px or 390px. I haven't run the smoke tests: `npm run test:e2e` isn't on the list of commands I was allowed. Every `data-testid`, route, label, ARIA attribute, form field and behaviour the tests check is unchanged, but run `npm run test:e2e` once to confirm.

**What changed**
- **Foundation:** `src/styles/tokens.css` is a copy of the spec's tokens. `base.css` is rewritten on top of them with the spec's root setup (no radius, no transitions, stops for reduced motion and the Animation switch) and the pixel font. The old light theme and its variables are gone.
- **Reusable pieces:**
  - `src/art/` holds the scene helpers, a set of workshop-yard sprites (shed, gatehouse, parts counter, switch tower, panel, workbench, cable reel, crates, generator, mast, drum, cart, worker, signpost) and one scene per screen.
  - `src/components/pixel.tsx` holds the pixel icons, the ▶ marker, the scene window, vignette, ground strip, block meter, the avatar (a pixel sprite generated from the name) and the Animation on/off switch, which is remembered between visits.
- **Shell:** a sticky header with the dithered rule and the Animation switch. The sidebar is a full-height section menu with the ▶ marker and section colours; under 1024px it becomes a top menu. The grass ground strip runs along the bottom of every screen.
- **Profile, Notifications, Security, Billing:** each has its own scene strip (a different crop of the workshop yard) above its title block, and its groups sit in game windows with title bars.
  - Profile and Security have the one gold button (Save changes, Update password).
  - Notifications now has a 6-block meter for the "3 of 6" count and square on/off switches.
  - Security has a password-strength meter and a ▶ on this device's session row.
  - On Billing, the plan cards have colour bars, the current plan has the ▶ and a gold frame, and gold appears only in the change-plan dialog. Invoice dates show as YYYY.MM.DD and statuses as coloured squares.
- **Not found:** a small scene with its lights off and one blinking red beacon, inside a window.
- **Motion:** stars twinkle, lights blink out of step, a cloud drifts, one figure bobs and a shooting star passes every 14s. All of it stops under reduced motion or with Animation off.
- **Docs:** added `design-system/` (version, the world, scenes per screen, colour assignments) plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**What I couldn't apply**
- **Light mode:** the spec is dark only, so there is no light theme. The "light" screenshots are identical to the dark ones.
- **One commit per screen:** git wasn't among the allowed commands, so nothing is committed.
- **Leftover file:** I couldn't delete files either. `src/pages/ArtDebugPage.tsx` is an empty module from the temporary scene-review page; its route is removed and it's safe to delete.
- **Two status regions on Security:** the spec wants one per screen, but both are tested, so both stay.
- **No danger zone:** the settings layout calls for one, but the app has nothing that belongs in it.
- **No header links or search:** the app has neither, and the sidebar serves as the main menu.

**Decisions I made**
- **Ridge ranges:** no random seed met the spec's limit on how tall a flat band of colour can be, so I narrowed the ridges to sub-ranges of the spec's own bands.
- **Frame weight:** to stay within three 4px frames per screen, secondary group windows use a 2px frame. On Notifications both groups share one window.
- **Gold on not found:** the "Go to profile settings" link is gold, standing in for the spec's gold "Retry".
- **Revoke buttons:** they're ordinary framed buttons, not danger buttons, because the spec's danger style assumes a confirm dialog and adding one would change behaviour.
- **Added meters:** a 16-block meter for bio length against the 160-character limit, and a 12-block meter for password strength against its top level.
- **Fonts:** only the pixel fonts (NeoDunggeunmo and its code variant) are loaded; there's no long prose, so the readable-body switch and its fonts are left out.
- **Nav marker blink:** the sidebar marker never showed in screenshots while it blinked (the blink is optional in the spec), so it's steady now.
- **Ground strip spacing:** I replaced its top margin with bottom padding so the sidebar reaches the grass.
- **Small additions:** I added a "Public profile" heading on Profile, a "Close" button in the dialog, and a short password-tips panel beside the password form.
- **Profile at 390px:** the crates at the right edge of the scene are slightly clipped; the shed and figure stay in view.
- **Invoices at 390px:** the table scrolls inside its window rather than the page.