I've restyled the Account Settings app (Profile, Notifications, Security, Billing and the not-found page) to Night Cartridge 0.1.0-rc.2, in light and dark. The final `node pigment-snap.mjs` run built cleanly and reported no sideways scroll on any page. I checked desktop and mobile captures of every page, light and dark included. The smoke tests were not run, because playwright isn't one of the commands I'm allowed to use. Every route, label, form field, `data-testid` and accessibility attribute is unchanged, and the tests' role and name queries still find their targets.

**What changed**
- **Tokens and fonts:** `src/styles/base.css` imports the package's `tokens.css` unchanged and uses only those tokens. The four font links from the spec are in `index.html`. The spec's motion-and-shape root block is in place, so every animation stops under `prefers-reduced-motion` or when Animation is switched off.
- **Reusable pieces** (`src/pixel/art.ts`, `src/components/pixel.tsx`, `src/components/HeaderSwitches.tsx`):
  - the scene helpers from the spec, plus pixel props for a workshop-yard world
  - the scene strip in a window, the ground strip, and the error vignette (all lights off, one beacon)
  - the ▶ marker, block meter, callout, pixel icons and hashed-sprite avatars
  - the Animation and Pixel body header switches, which set `data-motion` / `data-body` and are saved in `localStorage`
- **Shell:** sticky header with the dithered rule, a pixel logo mark and the two switches. The sidebar is a marker menu with pixel icons in each section's colour and dotted separators. Under 1024px it becomes a top menu. Every page ends with the ground strip.
- **Each settings page** has a scene strip with its own focal prop and lights, and its sections are windows with title bars.
  - **Profile:** photo column beside the fields, the gold Save button, a pixel warning icon on errors and a one-shot nudge, and a custom select arrow.
  - **Notifications:** square switches with an on/off word (the whole row is clickable), and a block meter under "3 of 6".
  - **Security:** a password-strength meter, the current session marked in the table's left edge, and small framed danger Revoke buttons. The table scrolls inside its own frame on mobile.
  - **Billing:** plan cards with colour bars and icons, the current plan marked with the marker and a gold frame, and status bullets on invoices. The dialog is a window with a close button and the gold confirm.
- `design-system/` (`VERSION`, `components.md`) and pointer lines in `AGENTS.md` and `CLAUDE.md`.

**Not applied**
- **One commit per screen:** git isn't among the allowed commands, so everything is uncommitted in the working tree.
- **Tokens in `design-system/`:** for the same reason I couldn't copy the token files there. It points at the package file instead.
- **Dates:** invoice dates are still in "Oct 1, 2026" format, not `YYYY.MM.DD`, because they are data I left alone.
- **Revoke:** it still acts immediately instead of asking in a dialog, since the tests expect that.
- **Breakpoints in CSS:** media queries use literal 600px and 1024px, because custom properties can't be read inside `@media`.
- **Callout:** it's built but no screen currently needs one.

**Decisions I made**
- **Frame limit:** the spec allows at most three 4px frames per screen. On Billing, Payment method and Invoices therefore use 2px-framed windows.
- **Gold buttons:** Notifications has none, because there is no commit action. On Billing the gold moves into the dialog. On not-found it's the "Go to profile settings" link.
- **Colours:** sections are cyan, violet, blue and amber; plans are green, pink and orange.
- **Profile avatar:** the box shows a pixel sprite with the initials as a small caption underneath. The test reads the initials from that element, and the page text says initials are shown.
- **Header switches:** I added both on all screens, which the spec's "Existing project" section expects.
- **Sidebar marker:** I made it still rather than blinking, because a blink left it invisible in half the screenshots.
- **Plan prices:** shown at 32px, not the 48px display size.

One cleanup for you: I accidentally created an empty stray file, `src/pages/_tmp.txt`, and none of my allowed commands can delete it. Please remove it.