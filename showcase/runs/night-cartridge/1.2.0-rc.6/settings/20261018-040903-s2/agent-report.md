I've applied Night Cartridge 1.2.0-rc.6 to every screen: Profile, Notifications, Security, Billing and the not-found page. The build passes, all 8 smoke tests pass, and the final screenshot run at 1440px and 390px shows no page scrolling sideways. Routes, behaviour, labels, form fields, `data-testid`s and accessibility attributes are unchanged.

## What changed
- **Tokens and root setup.** `design-system/tokens.css` is a verbatim copy of the spec's tokens. The four font stylesheets the spec lists load from `index.html`. `src/styles/base.css` was rewritten using only the spec's tokens. It covers the reduced-motion and Animation-off rules, the pixel type, the 4px gold focus ring, the ▶ marker, game windows, dithered rules, dotted separators, hue bullets, block meters, the stage and ground CSS, and the stepped animations. Radius, soft shadows, transitions and the old light theme are gone.
- **Pixel art, in `src/art/`.** The spec's helpers are ported to TypeScript, plus a small builder for drawing sprites. The app's world is a workshop yard, and each screen has its own strip scene with a different lead building:
  - Profile: the workshop, with saw-tooth roof, open bay and gear plate.
  - Notifications: a signal house, with a swinging bell, antenna mast and LED switchboard.
  - Security: a tool lock-up, with floodlamp, roll shutter, barred window and keypad.
  - Billing: a pay counter, with a "PAY" sign, striped awning and serving hatch.

  There are also two small square scenes: one for "no other sessions" and one for not-found (lights off, one blinking warning light). Every page has the ground strip in the footer. Stars twinkle, lights blink, a cloud drifts, one figure bobs or the bell swings, and a bird crosses now and then. All of it stops under reduced motion or when the Animation switch is off.
- **Reusable pieces, in `src/components/pixel.tsx`.** The scene window, small scene, ground strip, marker, bullet, window, block meter, pixel icons, avatars (initials on a colour picked from the name) and the two header switches (Animation, Pixel body).
- **Screens.**
  - Header: sticky, with the dithered rule below it.
  - Sidebar: a marker menu that runs down to the ground strip; below 1024px it becomes a top menu.
  - Profile: the form is in a window with the gold Save button, and invalid fields shake once when you submit with errors.
  - Notifications: square switches with an On/Off word, and a 6-block meter for "n of 6 on".
  - Security: a 12-block strength meter and a marker on the current session. On mobile the sessions table shows only the device and Revoke columns.
  - Billing: three plan cards with the current one framed in gold and marked; the gold button moves into the confirm dialog.
- **Docs.** `design-system/` now has `VERSION`, the tokens and `components.md` (scenes by screen, hues, pieces). `AGENTS.md` and `CLAUDE.md` contain the pointer line.

## What I couldn't apply
- **One commit per screen:** git isn't among the commands I'm allowed to run, so everything is uncommitted.
- **Two leftover files:** I removed the temporary review routes, but can't delete files. `src/pages/ArtReview.tsx` and `src/pages/StateReview.tsx` now hold only `export {}`; please delete them.
- **Light appearance:** the spec is dark-only, so the "light" screenshots also show the dark theme.
- **Header search and nav items:** there's no search feature to wire up, and the sidebar is the navigation, so I left both out.
- **Confirm before Revoke:** the spec wants destructive actions confirmed in a dialog, but the tests expect Revoke to act immediately, so I kept that.
- **One status region per screen:** Security keeps its two existing status regions, because the tests read both.
- **Date format:** the data's dates stay as they are rather than the spec's `YYYY.MM.DD`, to avoid changing content.
- **Full numeric report:** the spec asks for a sprite table and per-scene numbers worked out by running code. I can't run scripts, so the key figures are in `components.md` and the code instead. There are no product sprites, so there is no sprite table.

## Decisions I made
- **Content width:** the content column is 1296px wide with the sidebar outside it, so the three plan cards fit in a row. I then moved props in three scenes to keep the spacing rules at 1440px.
- **Frame weights:** only the scene window, the main form or plans window, and the dialog get 4px frames. Other settings windows get 2px, to stay within the spec's limit of three 4px frames per screen.
- **Strip ridge heights:** I used tighter heights inside the spec's ranges, so the sky stays at 40% or less and no flat band gets too tall.
- **Nav marker:** I dropped the optional blink on the current-item marker. It kept landing in its off phase in screenshots; now it's always visible.
- **Strength meter:** password strength is shown as a 0–3 score on 12 blocks, without the large number above it.
- **Not-found button:** "Go to profile settings" stays as the label of the gold button, in place of the spec's "Retry".