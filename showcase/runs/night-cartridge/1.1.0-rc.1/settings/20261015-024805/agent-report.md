I've applied Night Cartridge to all four settings screens and the not-found page. `npm run build` and `npm run typecheck` pass, and the final snapshot run reports no sideways scroll at 1440px or 390px. I couldn't run the smoke tests (`npm run test:e2e` isn't one of the commands I was allowed). I kept every route, behaviour, label, form field, `data-testid` and ARIA attribute, and checked the test selectors by hand.

**What changed**
- **Tokens and root setup:** `src/styles/tokens.css` is a verbatim copy of the package's `tokens.css`. `src/styles/base.css` now holds the spec's root rules, pixel type, the 4px gold focus ring and the art classes. The NeoDunggeunmo font loads from the spec's link. The app is dark only, so the light and dark snapshots look the same.
- **Signature pieces, built as reusable parts:**
  - **Scenes:** the recipe helpers are in `src/art/pixel.ts`. The scene world is a workshop yard with seven different props (`src/art/sprites.ts`, `src/art/scenes.ts`). The strip scene's skylines pass the flat-tone check on every column.
  - **Other pieces:** the ▶ marker, pixel icons, hashed pixel avatars, block meters, the "Animation on/off" header switch (saved between visits), and the page-title window with its strip (`components/Pixel.tsx`, `Scenes.tsx`, `MotionSwitch.tsx`).
  - **Motion:** stars twinkle, lights blink out of sync, a cloud drifts, the mechanic's hammer swaps two frames, and a shooting light appears every 14s. All of it freezes on frame 1 under reduced motion or with the Animation switch off.
- **Shell:** sticky header with the dither rule below it. The sidebar is a marker menu with a coloured bullet per section and runs down to the grass strip. Under 1024px it becomes a 4-column top menu, and a 2×2 grid under 600px.
- **Profile:** the form sits in a window with a gold Save button. The bio count has a 16-block meter. Invalid fields get a red frame and a nudge, and errors show a pixel warning icon.
- **Notifications:** each group is a window with a title bar. The switches are square pixel switches with an On/Off word, and the whole row is clickable. "3 of 6" has a 6-block meter.
- **Security:** both sections are windows and Update password is the gold button. The current session row carries the marker, and Revoke is a small red danger button.
- **Billing:** the current plan card has a gold frame and marker, with 48px prices. Payment method is a window and invoices use the table style. The dialog has a title bar, a close button and the gold confirm.
- **Not found:** the pixel vignette with all lights off and one blinking beacon.
- **Also added:** `design-system/` (VERSION, components.md) and the pointer line in `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply or had to work around**
- **Flat-tone rule:** no pair of independent seeds over the full skyline ranges keeps every column under the 12-unit limit. I used narrower ranges inside the spec's (haze 16–18, far 27–30, near 39–41), which can't break the rule.
- **Commits:** the spec wants one commit per screen, but `git` wasn't among the allowed commands, so nothing is committed.
- **Leftover file:** `src/pages/LabPage.tsx` is now an empty file. Its route is gone, but I couldn't delete the file without `rm`, so please remove it.
- **Pixel body switch:** not added, and only the pixel font is loaded. These screens have no long prose or dense tables.
- **Menu marker blink:** I dropped it (the spec only says it "may" blink). With it on, the marker was missing from every snapshot.

**Decisions I made myself**
- Not found has no retry action, so it gets a framed "Go to profile settings" button with the marker instead of a gold "Retry".
- Billing has no main commit on the page itself, so its only gold button is the dialog's confirm. Notifications has no gold button at all.
- To stay within three 4px frames per screen, Plans and Invoices sit under dithered headings rather than in windows.
- I didn't add `role="alert"` to field errors. Focus already moves to the invalid field, so screen readers would announce the error twice.
- Invoice dates now display as `YYYY.MM.DD`. The underlying data is unchanged.
- Avatars are 8×8 pixel sprites. The initials text stays in place, because the test checks for it.
- On phones each strip shifts 130px so the main workshop scene stays centred.