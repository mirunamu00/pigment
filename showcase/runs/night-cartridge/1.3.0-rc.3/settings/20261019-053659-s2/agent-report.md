I've restyled all five screens (Profile, Notifications, Security, Billing, Not found) to night-cartridge@1.3.0-rc.3. The build passes and all 8 smoke tests pass. The last snapshot run reported no sideways scroll at 1440 or 390, and I looked at each page at both widths. The spec defines dark only and says "no light theme or theme switch", so the app is dark-only and the "light" screenshots are the same as the dark ones.

**Two things you need to act on**
- **Delete two leftover files:** `src/pages/ReviewPage.tsx` and `src/pages/ReviewDialog.tsx`. These were the temporary review pages. I removed their routes, but deleting files wasn't one of the commands I was allowed to run.
- **Nothing is committed.** The spec asks for one commit per screen, but git wasn't in the allowed command list either.

**What changed**
- **Tokens and setup:** `design-system/tokens.css` is a copy of `dist/tokens.css` (same 193 variables). `src/styles/base.css` is rewritten on top of it with the spec's root rules. `index.html` loads the four web fonts from the spec.
- **Reusable pieces in `src/components/`:**
  - A port of the spec's scene helpers, with the sprites and scenes built on them (`pixel/`).
  - The scene window, vignette and ground strip.
  - The marker, block meter, callout, pixel icons and avatar.
  - The Animation and Pixel body header switches, which are remembered between visits.
  - The dialog, rebuilt as a game window.
- **The scene world is "Registry Square at night"** (written up in `design-system/components.md`). Each settings section gets its own lead building in a shared strip:
  - Profile: a registry hall with a clock face.
  - Notifications: a post office with an envelope sign.
  - Security: a gatehouse with a shield sign.
  - Billing: a counting house with a scales sign.
  - Not found: a vignette with its lights off and one red beacon, plus a gold "Go to profile settings" link.
  - Every screen: the ground strip with three sprites.
  - The animations (twinkling stars, blinking lights, a drifting cloud, a bobbing cat, a rare shooting star) stop under `prefers-reduced-motion` and when the Animation switch is off.
- **Per screen:**
  - **Sidebar:** marker menu with hue bullets.
  - **Main forms:** Profile and Security are framed windows with a gold submit and a nudge on errors.
  - **New progress meters** (the spec requires one wherever there's a fixed maximum): bio length out of 160, password strength, and notifications on out of 6.
  - **Notifications:** pixel switches.
  - **Billing:** plan cards with hue bars and the current plan marked; invoice dates shown as YYYY.MM.DD.
  - **Tables:** both tables show only their key columns on phones.
  - Every route, label, test id and accessibility attribute is kept.

**What I couldn't apply**
- No danger zone on Settings: the app has no destructive account action, so I didn't invent one.
- No header search or header nav items: the app has no search, and the nav lives in the sidebar (copying it would duplicate test ids).
- The full report the spec asks for (sprite table, variant table, per-scene numbers) isn't written up. The app has no item images, so there are no item sprites. I checked the scene numbers in code and on the temporary review page instead:
  - Lead heights are 23–24 units.
  - Each strip has 6–7 lights and 48 hand-placed details; the vignette has 15.

**Decisions I made**
- The four settings strips share one layout and differ only in their lead building and sign, which the spec allows for screens of one kind.
- The spec measures where props may sit from a 1440px-wide view. I measured from the scene window's real visible width instead (units 118–602), because the sidebar makes the window narrower.
- Plan cards use a 240px-minimum grid so all three plans fit on one row.
- To stay within three thick 4px frames per screen, other section windows use a 2px frame.
- On phones, the "This device" badge shrinks to its bullet so the device name fits (the text stays available to screen readers).
- The sidebar's current marker blinks as the spec allows, so a few screenshots catch it in its off frame. I measured it to confirm it's there.