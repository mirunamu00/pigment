I've restyled the app with Night Cartridge across all four settings screens and the not-found page. The build, typecheck and all 8 smoke tests pass, and the final snap shows no sideways scroll at 1440px or 390px. I haven't committed anything; the spec suggests one commit per screen, so tell me if you want that history created.

I reviewed every screenshot plus a temporary page showing each scene on its own at 4×, which I've since removed. That review led to two fixes: a smaller cloud in the not-found scene, and a sidebar marker that wasn't showing.

## Sprite and variant tables (from code)

**Sprite table:** no item sprites. The app has no product images.

**Variant table** (left x of each prop; no variant appears twice in one scene; all sprites are drawn in `src/art/sprites.ts`):

| variant | x positions | what differs |
|---|---|---|
| workshop hall 38×24 (lead) | Profile 271 | saw-tooth roof with glazing, open bay with bench, gear plate |
| relay house 26×25 (lead) | Notifications 419 | bell tower, switch panel, framed door |
| tool store 32×23 (lead) | Security 284 | roll-up shutter, saw-blade sign, door lamp, keypad |
| depot 30×26 (lead) | Billing 415 | jib crane, lit sign reading "DOCK", loading bay of crates |
| workbench 16×13 | Profile 311, Billing 251 | shelf with a lamp above |
| cable reel 14×14 | Profile 253, Notif 554, Security 162, ground 150 | round, blinking hub |
| switch cabinet 8×16 | Profile 130, Security 462, ground 560 | LEDs, meter window |
| tool chest 12×14 | Notif 448, Billing 449 | drawers on wheels |
| generator 14×12 | Profile 474, Notif 236, Security 475, Billing 552 | gauge, exhaust stack |
| crates 13×15 | Profile 455, Security 140, Billing 397 | stacked, with a lantern |
| drum 8×12 | Profile 118, Notif 540, Security 330, Billing 540 | hoops, lit label |
| locker 8×17 | Notif 253, Security 318, Billing 240 | vents, status light |
| hoist 14×18 / 14×22 | Notif 398 / ground 352 | A-frame, lamp, hook block |

## Scene numbers

Each screen has its own strip scene (720×48 units, drawn at 2px per unit). At 1440px the scene window shows units 86–634, so I checked the layout rules against that crop.

| Screen | Lead height | Gaps between props, left to right | Hand-placed details | Blinking lights | Moving piece |
|---|---|---|---|---|---|
| Profile | 24 | 4, 115, 4, 2, 128, 6 | 53 | 4 | smoke |
| Notifications | 25 | 3, 137, 7, 3, 80, 6 | 49 | 4 | bell |
| Security | 23 | 9, 108, 2, 4, 124, 5 | 51 | 5 | flag |
| Billing | 26 | 3, 130, 5, 4, 79, 4 | 45 | 3 | perched bird |

- **Shared rules:** every lead is at least 6 units taller than the tallest other prop. Each scene has three or four other props of 12–18 units, a fence in its empty outer quarter, at least 9 skyline shapes, a drifting cloud, twinkling stars and a rare shooting light.
- **Not-found vignette:** a dead switch cabinet plus a sign reading "LOST". The lights are off apart from one beacon, with 19 hand-placed details.
- **Hero numbers (rise, path end):** don't apply, because there's no hero.
- **Mobile crop:** the lead is centred at 390px on every screen.

## What changed
- **Tokens and fonts:** `tokens.css` is copied verbatim into `src/styles/`. `base.css` is rewritten against the tokens: no rounding, hard shadow only on the gold buttons and the dialog, instant feedback, stepped animation that stops under reduced motion and when the Animation switch is off. The four web fonts the spec names are loaded in `index.html`.
- **New pieces:** the pixel-art helpers and scenes in `src/art/`, plus reusable components for the scenes, ground strip, marker, windows, block meters, callout, pixel icons and coloured-initial avatars. The header has the Animation and Pixel body switches, which are remembered between visits.
- **Screens:**
  - Each settings screen has its scene window with the title below it.
  - Groups sit in titled windows, with no more than three 4px frames per screen.
  - The sidebar is a marker menu that becomes a top grid on narrow screens.
  - Tables show only pinned columns on phones.
  - There's one gold button per screen: Save, Update password, and the dialog's Confirm on Billing.
  - Errors show a "!" icon and shake once on each failed submit.
  - New block meters: "3 of 6 notifications on", bio length, and password strength.
  - Invoice dates now read `2026.10.01`.
- **Docs:** `design-system/` (VERSION, components.md), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

## What I couldn't apply
- **Light mode:** the spec says dark only, so the "light" screenshots are dark too.
- **Accessibility scan:** not run, since it isn't one of the commands I'm allowed to use.
- **Two status regions on Security:** the spec wants one per screen, but both are original and tied to tests, so I kept them.
- **Revoke has no confirmation:** the spec wants destructive actions confirmed in a dialog, but the tests expect the row to disappear immediately.
- **Font versions:** the font links use `@latest`, exactly as the spec writes them.

## Decisions I made
- **Sidebar marker doesn't blink:** the spec only says it "may", and the marker was missing in every snap while the blink was on.
- **Header:** I left out search and header nav items because the app has neither. I kept the signed-in user; on phones its name and the switch labels are hidden visually but still read out.
- **Not-found button:** it keeps the "Go to profile settings" link, styled gold, rather than the spec's "Retry".
- **New text:**
  - "Profile details" window title.
  - Password tips beside the password form.
  - A Close (×) button on the dialog.
  - On/Off words next to each switch.
- **Reduced motion:** two-frame animations were reworked so only frame 1 shows when motion is off. The spec's own version would show both frames on top of each other.