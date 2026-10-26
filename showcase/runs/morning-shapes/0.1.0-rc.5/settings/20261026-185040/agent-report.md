I've applied morning-shapes@0.1.0-rc.5 to every screen. The build passes, all 8 smoke tests pass, and the last full screenshot run reported no sideways scrolling. I checked the screenshots of each screen at 1440px and 390px, in light and dark. Every route, label text, form field, `data-testid` and accessibility attribute is unchanged.

**What changed**
- **Tokens:** `tokens.css` is imported straight from `design-packages/` instead of copied, so it can't drift. The app's old CSS variable names point at the new tokens, so nothing that used them breaks. Dark mode follows the system setting, and `data-theme` on the page root forces light or dark. Figtree and DM Mono load from Google Fonts in `index.html`.
- **Reusable signature pieces:**
  - **CSS** (`src/styles/morning.css`): hue classes, color bands with the bulging arc (sag, rise, header band, panel), confetti, breathing glyphs, choice rows, the loading dots, every pill variant, tabs, the vignette and the toast.
  - **Components** (`src/components/ms/`): the header band and rising band, the flat shape kit (crescent-shaded discs and shapes, sparkles, clouds, spot plates), glyphs, the toast and the vignette.
  - **Motion:** all of it stops under `prefers-reduced-motion: reduce`, and glyphs pause when off screen.
- **Shell:**
  - **Top bar:** the sidebar moved into an 80px top bar, which gets a shadow once you scroll. Each section's link has a dot in its hue, and the current section is bold. On phones it becomes one 64px row with a menu button. The open menu keeps keyboard focus inside it and closes on Escape.
  - **Footer:** a new cream footer with a rising arc and a dark bottom bar.
- **Screens:**
  - **Every screen** opens with a cream header band with an arc, a title, and a shape scene drawn for that section: a name badge, a bell, a padlock, a wallet.
  - **Panels:** groups of settings sit on cream panels, each with a small round picture by its title (envelope, speech bubbles, key, screen, medal, card, receipt).
  - **Controls:** buttons are pills that sink when pressed, switches follow the spec, and the time zone select has a solid chevron. Inputs are 56px with 2px borders and show errors with an alert icon.
  - **Tables:** framed, with the first column fixed while the table scrolls sideways on phones. Invoice and session statuses are badges with a colored dot.
  - **Billing:** the current plan is a full orange card with a check disc.
  - **Confirmations:** changing plan and signing out a device now show a dark pill toast with a sparkle for 5 seconds. Saving a form shows "Saved" in green with a tick next to the button.
  - **Plan dialog:** white with a cream footer and a close button; on phones it becomes a bottom sheet.
  - **Not-found page:** a cream band with the error picture (a stone disc and a raining cloud, gently drifting) and a pill linking home.
- **Docs:** I added `design-system/` (`VERSION` and `components.md`) plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**What I couldn't apply**
- **Not used on any screen:** the vignette, confetti, choice rows, loading dots and tabs are built but unused. These screens have no front page, onboarding, option tiles, loading state or tabs.
- **No signup field in the footer:** that would mean inventing a feature.
- **One commit per screen:** I made no commits, since you didn't ask for any. Everything is uncommitted in the working tree.
- **Header-band scenes are a little under size:** at 1440px they render about 300–330px wide, while the spec calls anything under 360px a "sticker". The bands are only as tall as their text, and the scene's height follows the band.
- **Fonts need network access:** if Google Fonts can't be reached, the font falls back to the next one in the list, and the browser will probably log a load error. That could fail the "no console errors" test offline.
- **"Go to profile settings" keeps its four words** (the spec wants 1–3), because existing label text had to stay.

**What I decided myself**
- **Cream header bands:** the spec's Settings guidance and rule 2 both make settings cream. The four sections still get their own hues for the nav dot, the band scene and accents: Profile yellow, Notifications blue, Security green, Billing orange.
- **Top-bar navigation instead of a sidebar:** a cream band next to a cream sidebar would merge into one shape.
- **An "Account settings" eyebrow on each band**, to bring the bands closer to the 200–260px height the spec asks for.
- **Panels:** cream pills show white inside cream panels so they stay visible, and plan cards are white on the cream panel.
- **Layout widths:** settings content uses the 888px reading width, left-aligned with the band text. Billing uses the 1160px width so the three plan cards fit.
- **No blue pill anywhere:** no screen has a sign-up, buy or create action.
- **Session sign-out:** "Revoke" stays a small labelled pill with red text rather than an icon-only circle, so its visible name is kept.

I added a temporary route to screenshot the dialog on its own and removed it before finishing.