I've applied Morning Shapes to all five screens: Profile, Notifications, Security, Billing and the not-found page. The build passes, all 8 smoke tests pass, and nothing scrolls sideways. I checked every screenshot at 1440px and 390px in light and dark, plus the change-plan dialog on a temporary route that I've since removed.

**What I changed**
- **Tokens:** copied unchanged into `design-system/tokens.css`. The app's old variable names are kept as aliases in `src/styles/base.css`. Dark mode follows the system setting, and `data-theme` on the root forces a mode.
- **Fonts:** Figtree and DM Mono are bundled with the app through the `@fontsource` packages (the only addition to `package.json`). I didn't link Google Fonts, because a failed request when offline would log a console error and break the "no console errors" test.
- **Reusable pieces in `src/design/` and `src/styles/morning-shapes.css`:**
  - colour bands with their curved edges, including the compact header band
  - the shape kit (crescent-shaded discs and shapes, sparkles, clouds, round "plates" holding small drawings)
  - breathing glyphs and the three-dot loader
  - every pill and circle button variant, and the tab pill
  - the product-fragment illustration ("vignette")
  - a helper that fades pieces in on first view and pauses glyph animation off-screen
- **Every settings screen:**
  - a cream header band with a curved bottom edge and a shape cluster drawn for that area: name badge, bell, padlock, wallet
  - groups shown as cream panels with a 56px plate next to each title: envelope, speech bubble, key, screen, podium, bank card, receipt
  - pill buttons with the 2px ledge that sink when pressed, the specified switches, inputs and select
  - tables in a white frame with a sticky first column on phones, and status badges with coloured dots
- **Billing:** plans are cream option cards. The current plan is the page's one saturated field (orange) with an ink check disc.
- **Dialog:** white, with a cream footer (cream Cancel, ink Confirm); it becomes a bottom sheet on phones.
- **Not-found page:** a cream band with a rising edge, the error drawing (stone moon with a lavender crescent, rain cloud) and an ink pill linking home.
- **Motion:** one sparkle per screen drifts slowly. The "no other devices" empty state has a breathing glyph. The scrolled top bar gets its shadow. Everything stops under reduced motion.
- **Docs:** added `design-system/VERSION`, `design-system/components.md` (hue map, drawings, where each piece is used), `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **No blue pill and no vignette on any screen.** The vignette is built but unused, because no screen is a front page or onboarding. Nothing here is a conversion action, so there's no blue pill.
- **No close circle on the dialog.** I left it out so the dialog's buttons stay the same; Escape and Cancel still close it.
- **The empty sessions row has no ink pill.** There's no real action to offer there.
- **No phone menu button.** On phones the sidebar becomes a horizontally scrolling row of nav pills, so the nav stays visible (one test needs it visible), and the current area's pill scrolls into view.
- **No per-screen commits.** You didn't ask me to commit, so everything is uncommitted in the working tree.

**What I decided myself**
- **Hues and bands:** Profile is yellow, Notifications blue, Security green, Billing orange. All header bands are cream because the whole app is "Settings". Each area's hue appears on its nav dot, cluster, plates, avatar and the selected plan card.
- **Header band height:** the band's minimum height is measured against the content column rather than the full viewport, because the sidebar takes part of the width.
- **Contrast fixes on cream panels:** plates there are white, and cream secondary buttons use the raised surface colour. Otherwise both would disappear into the cream.
- **Fade-in only for what's visible on arrival:** pieces already below the fold appear without animating, so nothing can be left hidden.
- **"Current plan" badge:** white with an ink label in both light and dark.
- **Plan buttons:** "Switch to …" uses ink pills; Revoke is a cream pill with a red label.