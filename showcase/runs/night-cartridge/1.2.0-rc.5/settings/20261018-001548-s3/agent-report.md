I've applied Night Cartridge 1.2.0-rc.5 to the profile, notifications, security and billing screens and the not-found page. The build passes, all 8 smoke tests pass, and the final screenshots show no sideways scrolling at 1440px or 390px.

The spec only defines a dark look and says there is no light theme or theme switch, so the "light" screenshots are dark too.

**Sprite table:** no item sprites. The app has no product grids, so the item-sprite rules don't apply.

**Variant table**

| variant | x positions (units) | what differs (4+ units) |
|---|---|---|
| workbench, 14 → 30 wide | 514, 159, 499, 164 | 16 units longer; colour changes per scene |
| generator, 12 → 20 / 14 wide | 484, 192, 470 (20 wide); 383 (14 wide) | 8 or 2 units wider |
| switch panel / powered-down panel | 318, 555, 306, 196 / not-found | lit screen vs. off |

No prop appears twice in one scene.

**Scenes** (all positions are typed by hand in `src/art/scenes.ts`)

| Screen | Lead, height | Features of the lead | Gaps between props, left to right |
|---|---|---|---|
| Profile | long hall, 24 tall | saw-tooth roof, open bay with a workbench, lit gear sign | 6, 109, 2, 6, 158, 10, 10 |
| Notifications | signal shop, 26 tall | bell tower, monitors in the bay, gear sign | 8, 3, 9, 159, 2, 6, 88, 6 |
| Security | workshop with a lean-to, 22 tall | lit window grid, gear sign, open bay | 7, 99, 2, 6, 156, 9, 3, 10 |
| Billing | counter shop, 22 tall | chimney with smoke, lit sales hatch, saw-blade sign | 10, 2, 10, 158, 6, 4, 87, 7 |
| Not found | small 48×48 scene | unlit gear sign, powered-down panel, one red warning light | — |

- **Detail counts per strip:** 7–8 lights, 9–10 stars plus one sparkle, and 50+ hand-placed details (the strip minimum is 30).
- **Motion in each scene:** twinkling stars, lights blinking out of sync, a drifting cloud, one moving thing (a bobbing bird or cat, or a two-frame swap of smoke or sound waves), and a rare shooting star or bird.
- **Stopping motion:** it all stops under `prefers-reduced-motion` and with the header's Animation switch.
- **Review:** I checked each scene alone at 2× on a temporary page, then in place at both widths. That temporary page and route are removed.

**What changed**
- **Setup:** the tokens are copied into `design-system/tokens.css`, the specified web fonts are linked in `index.html`, and `src/styles/base.css` is rewritten around them.
- **Pixel art:** the spec's drawing code, the sprites and the scenes are in `src/art/`.
- **Reusable pieces:** the scene window, small scene, ground strip, ▶ marker, dither rule, block meter, callout, pixel icons and the two header switches (Animation and Pixel body, both remembered per viewer).
- **Every screen:**
  - header with the dithered rule underneath
  - sidebar menu with the ▶ marker (a top menu under 1024px)
  - its own scene with the page title under it
  - titled windows
  - ground strip at the bottom
- **Gold button:** at most one per screen. Profile "Save changes", Security "Update password", Billing only on the dialog's "Confirm change", none on Notifications. Not-found uses gold on "Go to profile settings", following the spec's error-page guidance.
- **Meters:** block meters for the "n of 6 notifications on" count, the bio length and password strength.
- **Forms and tables:** field errors show a "!" icon and shake once on a failed submit, the tables are restyled with the columns kept on mobile chosen deliberately, and the dialog is now a game window with a hard shadow and a close button.
- **Docs:** `design-system/` (VERSION, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md`, as the spec asks.

All routes, labels, form fields, `data-testid`s and accessibility attributes are kept.

**What I couldn't apply**
- **No light theme:** the spec is dark-only.
- **No header search or header nav items:** the app has no search, and the sidebar already is the navigation.
- **No danger zone:** the app has no destructive account action. Revoke buttons use the danger style, but revoking still happens without a confirmation dialog, because the tests expect it to be immediate.
- **Two status regions on Security:** the spec allows one per screen, but the tests rely on both.
- **No meter-blink:** the spec lets the sidebar's current-item marker blink, but in the screenshots it kept landing on the hidden frame, so I left it steady.
- **Not checked:** I didn't run an accessibility audit, and I didn't screenshot the dialog or error states.
- **No commits:** the spec asks for one commit per screen, but you didn't ask me to commit, so everything is uncommitted on `main`.
- **Network for fonts:** the fonts load from jsdelivr and Google Fonts using the spec's `@latest` links. The console-error test passed here, but it will fail anywhere those sites can't be reached.

**What I decided myself**
- **Window titles:** they use the 16px dialog-title size, and the page's 32px heading sits under the scene.
- **Plan cards:** they're narrower than the spec's 320px minimum (260px) so all three fit on one row.
- **Billing frames:** the payment and invoice windows have thin frames, to stay within three thick frames per screen.
- **Added copy:** I added a "Public profile" window title and a "Settings" label above the sidebar menu. I also added a strong-password tip next to the password form, because the spec wants that space filled.
- **Display tweaks:**
  - invoice dates show as YYYY.MM.DD (the data is unchanged)
  - the "This device" badge shows only its coloured square on phones
  - the current session row carries the ▶ marker