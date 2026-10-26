Morning Shapes is applied to every screen: Profile, Notifications, Security, Billing, the not-found page and the change-plan dialog. The build passes, all 8 smoke tests pass, and no page scrolls sideways. I checked the screenshots at 1440px and 390px in light and dark and fixed what was wrong: the sessions table pushed the phone page sideways, the cream header bands ran into the cream sidebar, the dialog's close button was too wide and covered the title on phones, and the payment panel had empty space at the bottom. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the spec's `tokens.css`. Dark mode follows the system setting. The old CSS variables in `base.css` still work and now point at the new tokens. Figtree and DM Mono come from two `@fontsource` packages I added to `package.json`, so the fonts load from the app itself, not over the network.
- **Reusable pieces** (in `src/components/ms/` and `src/styles/morning-shapes.css`):
  - the colored header band with its curved bottom edge;
  - the flat shape kit (shapes with a darker crescent, stars, clouds, two-color discs) and round "plates" holding small pictures;
  - a drawing for each band and the error drawing;
  - breathing glyphs, a three-dot loader and the vignette;
  - every pill and circle button style, and a crescent avatar with initials;
  - the fade-in script, which also pauses glyphs that are off-screen.
- **Screens:**
  - Each one opens with a cream header band (the spec's settings rule), each with its own drawing: a name badge, a bell, a padlock and a wallet.
  - Settings groups are cream panels with a plate beside the title.
  - Inputs, switches, tables, badges and the dialog follow the component specs, with a bottom sheet on phones.
  - The current plan is the screen's one orange card, marked with a check.
  - The not-found page uses the error drawing and an ink "Go to profile settings" button.
- **Motion:** one star per header band drifts slowly, plates fade in, one breathing glyph appears next to "No other devices are signed in." on Security, and pills, switches and the dialog animate quickly. All of it stops under `prefers-reduced-motion: reduce`.
- **Docs:** `design-system/` now has `VERSION` and `components.md`, and `AGENTS.md` and `CLAUDE.md` hold the one-line pointer to it.

**What I could not apply**
- **One commit per screen:** git isn't among the commands I was allowed to run, so nothing is committed.
- **Glyph motion:** the spec keeps settings icons still and allows only one drifting shape per screen, so the single breathing glyph on Security is the only one that loops.
- **The marketing-only pieces:** confetti, vignettes, the loader and the closing band are built but not used, because no screen here calls for them.

**Decisions I made myself** (also listed in `components.md`)
- **Colors per section:** settings areas use cream header bands, so each section's own color shows only in its nav dot, plates and drawing: Profile yellow, Notifications blue, Security green, Billing orange.
- **Sidebar:** it is white rather than cream, so the cream bands stand out from it.
- **Phone navigation:** the sidebar becomes a wrapping row of nav pills under a 64px top bar, with the user's name hidden visually but still read by screen readers.
- **Fade-in:** only plates visible when the page loads fade in. Ones further down are shown as they are, so full-page screenshots and printing never miss them.
- **Plan buttons:** "Switch to …" buttons are ink, not blue. The "Current plan" badge on the orange card is white with ink text so it reads in both light and dark.
- **Additions:**
  - a close button on the dialog, as the spec asks;
  - a dropdown arrow on the time zone menu;
  - a sticky first column in tables on phones;
  - scroll areas around the tables that keyboard users can reach.
- **Plain checks:** a temporary route to check the dialog, now removed.