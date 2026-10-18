Every screen of the settings app now uses Night Cartridge 1.2.0-rc.8. The build passes, all 8 smoke tests pass, and the final screenshot run (1440px and 390px) shows nothing scrolling sideways. Every route, label, form field, `data-testid` and accessibility attribute is kept. The spec is dark only, so light and dark screenshots look the same and there is no theme switch.

**What changed**
- **Tokens and root setup:** `tokens.css` is copied as-is into `src/styles/tokens.css`. `base.css` is rewritten from the spec (no rounded corners, no transitions, the motion kill switches, one pixel typeface at one weight, the 4px gold focus ring). The four font links from the spec are in `index.html`.
- **Reusable pieces:** the scene engine (`src/art/*`) uses the recipe's helpers. `src/components/pixel.tsx` holds the pixel icons, the ▶ marker, the strip-in-a-window with its title block, the vignette, the ground strip, hue bullets, block meters, the Animation and Pixel body header switches (saved between visits), and the error nudge.
- **The scene world, "Registry Row":** the civic street of a small town at night. Each screen's scene is led by a different building: the registry hall (Profile), the post office (Notifications), the watch house (Security) and the counting house (Billing). Not found gets a small framed scene with the lights off and one red warning light. Every screen ends in the ground strip.
- **Shell:** sticky header with the dithered rule under it. The sidebar is a marker menu with hue bullets and dotted separators; below 1024px it becomes a top menu.
- **Profile:** form in a window, gold "Save changes" and "Reset" at the same 40px height, pixel "!" errors, a 2-frame shake on invalid fields, and a pixel-initials avatar coloured from the name.
- **Notifications:** each group is a titled window. The switches are square and the whole row is clickable. "3 of 6" has a 6-block meter.
- **Security:** password window with a strength meter. The sessions table marks the current device with the marker and pins its columns on mobile; "Revoke" buttons are small danger buttons.
- **Billing:** plan cards with 48px prices; the current plan has a gold frame and the marker. Invoices are a table with status bullets, dates shown as YYYY.MM.DD. The dialog is a window with a hard shadow, a close button and the gold confirm.
- **Not found:** the vignette, the message, and a gold "Go to profile settings".
- **Docs:** `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**Scene numbers** (computed from the code on a temporary review page, now removed)

| Scene | Lead | Lead height | Gaps between props (left to right) | Lights | Details |
|---|---|---|---|---|---|
| Profile | registry hall: clock tower, columned portico, lit door, flag | 25 units = 50px | 6, 107, 3, 4, 142, 7, 4, 9 | 5 | 12 stars + 26 dots |
| Notifications | post office: bell turret, POST sign, awning, letter slot | 25 units | 5, 9, 4, 155, 4, 3, 81, 6 | 5 | 12 + 26 |
| Security | watch house: lantern tower, grilled window, studded door | 25 units | 4, 9, 7, 154, 3, 2, 74, 5 | 6 | 12 + 26 |
| Billing | counting house: BANK sign, vault door, teller windows, chimney | 25 units | similar spacing; one cluster moved 8 units after the review | 5 | 12 + 26 |
| Not found | fallen signpost and empty cart | 22 units | 2 | 1 warning light | 16 |

- **Focal groups:** 3 sprites each, centred 62–75 units off the scene centre, standing in front at y 45.
- **Supporting props:** 6 per strip, no prop repeated within a scene.
- **Motion:** each strip has twinkling stars, lights blinking out of sync, a drifting cloud, a shooting light every 14s, and one moving sprite (flag, bell, lantern or chimney smoke). All of it stops under reduced motion and with the Animation switch off.
- **Item sprites:** none.

**What I could not apply**
- **No git commits.** The spec asks for one commit per screen, but git wasn't among the commands I was allowed to run.
- **One empty file to delete.** `src/pages/ArtReview.tsx` was the temporary review page. I couldn't delete files, so it is emptied to `export {};` and nothing uses it.
- **No search in the header.** The app has no search feature.
- **No danger zone.** The app has no settings that need one.
- **"Revoke" is not confirmed in a dialog.** The tests expect it to act immediately.
- **The dialog focuses Cancel, not the confirm button.** A test requires this.
- **Security has two status regions.** The spec says one per screen; both carry tests.
- **The Billing scene's crop-edge check is approximate.** I moved its left cluster away from the 1440px crop edge after the review, and those final numbers were not recomputed.
- **Web fonts load from the CDN.** If it is unreachable offline, the "no console errors" test could fail.

**Decisions I made myself**
- **Gold placement:** Billing has no gold button on the page; gold appears only on the dialog's confirm.
- **Heavy frames, three per screen at most:** secondary groups (sessions, payment method) use a 2px frame to stay within the spec's limit.
- **Sidebar marker doesn't blink:** the spec makes the blink optional, and in screenshots it left the marker invisible.
- **Mobile tables:** the "This device" badge shrinks to its bullet so the device name fits.
- **Added content:** a "Public profile" window title, the On/Off word beside each switch, and a password strength meter next to the existing hint.