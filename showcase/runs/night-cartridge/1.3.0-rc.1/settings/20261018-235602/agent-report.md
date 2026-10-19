Night Cartridge 1.3.0-rc.1 is applied to every screen: Profile, Notifications, Security, Billing, the change-plan dialog and the not-found page. The build passes, all 8 smoke tests pass, and the final snapshot run found no page that scrolls sideways at 1440px or 390px. I checked every screenshot, the dialog and the not-found page, and looked at each scene on its own at 4× through a temporary route, which I've since removed.

**Nothing is committed.** The spec asks for one commit per screen, but this run only allows the npm and node commands you listed, so git was blocked. All changes are in the working tree.

## What changed
- **Tokens and fonts:** `src/styles/tokens.css` is a verbatim copy of the package tokens, imported first. `index.html` loads the four font stylesheets the spec lists and sets dark mode.
- **Root and look (`src/styles/base.css`, rewritten):**
  - The required root block (no rounded corners, no transitions, reduced-motion and Animation-off rules) and the pixel type base.
  - The ▶ marker, the 4px focus ring, press offsets and the gold button.
  - Framed windows, dithered rules, dotted separators, hue bullets, block meters and callouts.
  - Scene and ground-strip CSS, every stepped animation, and the layout below 1024px and 600px.
- **App world, "Registry Row":** the civic quarter where a town kept its residents' papers. Each section gets a strip scene with its own lead building: a registry hall for Profile, a post office with a POST sign for Notifications, a gatehouse vault for Security, and a counting house with a BANK sign for Billing.
  - Each scene has 5–6 yard props in clusters, 6–7 lights, and over 30 hand-placed details.
  - Motion: stars twinkle, lights blink, a cloud drifts, and one sprite swaps frames or bobs (flag, bell, pennant, chimney smoke). A rare bird crosses.
  - The footer ground strip shows a pillar box, a clock tower and a tree.
  - The not-found page has a small scene: a blank notice board and an unlit lamp, with one red beacon.
  - The code is in `src/art/`, and the reusable React pieces are in `src/components/pixel.tsx`.
- **Shell:** a sticky header with a pixel gear mark, the Animation and Pixel body switches (saved between visits), and the avatar. The sidebar is a ▶ marker menu and becomes a top menu below 1024px. The ground strip sits at the bottom of every screen.
- **Screens:**
  - **Profile:** form in a window, gold Save, fields shaking once on error with the "!" icon.
  - **Notifications:** a 12-block meter beside "3 of 6 notifications on", and square pixel switches with an On/Off word.
  - **Security:** a password-strength meter; the sessions table marks the current session with ▶ and shows only Device and the Revoke buttons on phones.
  - **Billing:** plan cards with a hue top bar, icon and 48px price; the current plan is gold-framed with the marker; the dialog is a framed window with a gold Confirm.
- **Docs:** `design-system/VERSION`, `design-system/components.md` (the world, a scene per screen, the hues), and the pointer line in new `AGENTS.md` and `CLAUDE.md`.

Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

## What I couldn't apply
- **Light mode:** the spec defines dark only and forbids a light theme, so the "light" screenshots are dark too.
- **Header nav items and search button:** the app has no other sections and no search, so I didn't add placeholders. The settings menu stays in the sidebar.
- **Danger zone:** the app has no destructive section. The Revoke buttons use the danger style.
- **Tokens in `design-system/`:** I couldn't copy the file there, so `components.md` points to `src/styles/tokens.css` instead.
- **Report numbers worked out by hand:** with no script runner, the scene counts in `components.md` (lead heights 24–26 units, i.e. 48–52px; prop gaps; light and detail counts) come from the placement constants, not from running code.
- **Not checked:** I didn't run an axe accessibility scan, since it isn't in the allowed commands.

## Decisions I made
- **Sidebar marker is steady:** I dropped the optional blink because snapshots kept catching it in the hidden frame.
- **Gold placement:** Profile Save, Security Update password, Billing's dialog Confirm, and the not-found link. Notifications has no main save, so it has no gold.
- **Frame limit:** to stay within three 4px-framed regions per screen, Billing's plans are plain cards and Payment method gets the window.
- **Hues:** sections take cyan, violet, blue and amber. Plans continue the order: Free green, Pro pink, Business orange.
- **Password meter:** I added it, treating weak / fair / strong as a fixed three-step maximum.
- **Dates:** invoice dates show as `2026.10.01`, formatted on screen; the mock data is unchanged.
- **Phone layout:** on phones the "This device" badge is hidden (the ▶ still marks that row), and the header switch labels are screen-reader-only.
- **Dialog close button:** the dialog has a new × button that cancels, like Cancel and Escape.