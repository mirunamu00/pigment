I've applied Morning Shapes 0.1.0-rc.5 to all four settings screens, the not-found page, the dialog and the app shell. The build passes, all 8 smoke tests pass, and nothing scrolls sideways. I checked every screenshot at 1440px and 390px, light and dark. I also checked the not-found page and the plan dialog open, using a temporary route that I removed afterwards.

**What changed**
- **Tokens and fonts:** `src/main.tsx` imports `tokens.css` straight from the design package, so the values are the originals rather than a retyped copy. Dark mode follows the system setting, and `data-theme` on the page root can force light or dark. The old variable names in `src/styles/base.css` still work as aliases. Figtree and DM Mono load from Google Fonts in `index.html`.
- **Reusable pieces:**
  - `src/components/ms/Field.tsx` has the header band (cream, curved bottom edge, illustration on the right) and the rising band used by the footer and error page.
  - `src/components/ms/Art.tsx` has the shapes, with the darker crescent shading built in:
    - an illustration cluster for each screen: name badge, bell, padlock, wallet;
    - the not-found illustration;
    - small round "plates" with pictograms: key, devices, envelope, speech bubble, medal, card, receipt;
    - a slowly breathing glyph, ticks and a check disc.
  - `src/styles/morning.css` holds the color classes, bands, every pill variant, and all the motion.
- **Screens:**
  - Each screen opens with a cream header band about 214px tall, with its illustration in the top corner on phones.
  - Settings groups sit on cream panels with a plate beside each title. Inputs and selects follow the spec, and errors show an alert glyph. Saved messages show a green tick.
  - Switches are pill tracks that sink when pressed. Tables sit in rounded frames, and on phones the first column stays put while the rest scrolls. Status badges have colored dots.
  - Plans are cream option cards. The current plan is the one orange card on the page, with a check disc. Revoke is a cream pill with a red label.
  - The dialog has a cream footer and a round close button, and becomes a bottom sheet on phones. The top bar gets a shadow once you scroll.
  - I added a cream footer with a dark bottom bar.
- **Motion:** one star per screen drifts slowly, plates fade in once, and the "No other devices" message has a breathing glyph that pauses off-screen. Pills and switches sink on press. All of this stops under reduced motion.
- I also added `design-system/` (`VERSION` and `components.md`) and the one-line pointers in `AGENTS.md` and `CLAUDE.md`.

Every route, label, form field, `data-testid` and accessibility attribute is kept. Additions are only decorative `aria-hidden` art, a "Close" button in the dialog, and labelled scroll regions around the tables.

**What I couldn't apply**
- **One commit per screen:** nothing is committed, because I only commit when asked. All changes are in the working tree.
- **Phone menu:** the spec puts nav links in a menu behind a button on phones. I made the sidebar a row of pill tabs that scrolls on its own, so the nav stays visible.
- **Toasts:** "Signed out of …" and "Your plan is now …" stay as inline status text with a tick. Turning them into toasts that disappear after 5 seconds would change behaviour.
- **Labels over three words:** "Go to profile settings", "Switch to Business" and "Update password" (that one is two words) were kept as written. The longer ones break the 1–3 word rule.
- **Raw values:** the dialog's 560px maximum width (stated in the spec but not a token) and the 3px switch-knob inset are written directly. The small tick, alert and chevron icons are inline SVG masks.

**Decisions I made**
- **Section colours:** the spec gives settings areas a cream header band, so all bands are cream. Each section still owns a colour in navigation order for its nav dot and illustration: Profile yellow, Notifications blue, Security green, Billing orange.
- **Sidebar:** it's white rather than cream so it doesn't merge with the cream bands.
- **Plans:** the Plans section sits on white so the cream plan cards stand out. Only the plan one tier above the current one gets the blue pill; the other switch buttons are dark.
- **Not-found page:** the band also curves at the bottom, so it doesn't end in a straight edge above the footer.
- **Profile picture:** it's 112px on desktop and 56px on phones.