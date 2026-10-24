I've applied Night Cartridge 1.3.0-rc.3 to all four settings screens and the not-found page. The build passes, all 8 smoke tests pass, and nothing scrolls sideways at 1440px or 390px. I checked every screenshot against the specification, desktop and mobile.

**Two things to do by hand**, because only the listed commands were allowed:
- Delete `src/pages/ScenePreview.tsx`. It was a temporary page for viewing the scenes at 4×. Its route is already removed, so the file is unused.
- Make the commits. The spec asks for one commit per screen, but git wasn't an allowed command, so all changes are uncommitted on `main`.

**What changed**
- **Root setup:** I copied the tokens into `design-system/tokens.css` and loaded the specified pixel fonts in `index.html`. Radius, soft shadows, transitions and the old light theme are gone. The site is dark only, because the spec defines no light theme. The "light" screenshots are therefore dark too.
- **Reusable pieces:** the ▶ marker, game windows, dithered rules, dotted separators, hue bullets and bars, block meters, the pixel scene engine, the ground strip and the stepped animations. The header has the Animation and Pixel body switches, and both are remembered between visits. All motion stops under `prefers-reduced-motion` and when Animation is switched off; scenes then show their first frame.
- **Scene world:** the app's world is a town-hall square at night. The lead building is a registry hall with a clock face, columns, lit windows and a lit sign. The sign shows a different word per section: USER, MAIL, LOCK or BILL. Around it are a photo-ID booth, a news stall, a post box, a vault house with a gear-wheel door, a guard booth, a poster pillar and a phone box. Stars twinkle, lights blink, a flag waves, a cloud drifts and a shooting star passes now and then.
- **Every screen** has the sticky header with its dithered rule, the sidebar menu with the marker, the scene strip in a window with the page title below it, and the ground strip at the bottom. Below 1024px the sidebar becomes a menu at the top.
- **Profile:** the form sits in a window, with a two-column layout and an initials avatar. There's a gold Save button and a framed Reset. Errors show a "!" icon and the field nudges. A block meter shows the bio length against its 160-character limit.
- **Notifications:** each group is a titled window with pixel switches, an On/Off word, and the whole row clickable. A 12-block meter shows how many notifications are on.
- **Security:** headings sit on dithered rules, and the password form is in a window with a gold submit. The sessions table follows the spec's table style. The current device's row carries the marker. On mobile only the Device and Revoke columns show.
- **Billing:** the plans are cards with a coloured top bar, an icon and 48px prices. The current plan has a gold frame and the marker. The payment method is in a framed panel. Invoice dates now show as `2026.10.01`. The gold button on this screen is the confirm button in the change-plan dialog.
- **Not found:** a small scene of a closed road (lights off, one red beacon) in a window, with the "Go to profile settings" link styled as the gold button.
- **Docs:** `design-system/` holds `VERSION`, `tokens.css` and `components.md` (the world, scenes and colour assignments). `AGENTS.md` and `CLAUDE.md` contain the pointer line.

**Spec items I couldn't apply**
- **Danger zone:** the app has no destructive section, so there's nothing to frame. I didn't invent one. Revoke is a red framed button but has no confirmation dialog, because the tests expect it to act at once.
- **One status region per screen:** Security keeps two `role="status"` regions (password and sessions), because the tests use both.
- **Dialog focus:** the dialog still focuses Cancel when it opens, as the tests require; the spec says the confirm button.
- **Search box:** there's no search in the app, so the header has none.
- **The spec's report tables** (sprite, variant and per-scene numbers) aren't written up. The scene positions and sizes are in `src/art/scenes.ts`.

**Decisions I made**
- The sidebar stops just above the ground strip's open area rather than running into it.
- Only the scene window, one main group and the dialog get the thick 4px frame, to stay within the limit of three per screen. Secondary panels and tables get 2px frames.
- Colour assignments: sections are cyan, violet, blue and amber; plans are green, pink and orange.
- I added a few new labels: the window titles "Public profile" and "Card on file", the "Settings · …" line above each page title, and On/Off words next to the switches.
- The sidebar marker stays still instead of blinking, so it's always visible. The spec allows either.
- On phones the "This device" badge is hidden in the sessions table; the current row is still marked with the ▶ marker.