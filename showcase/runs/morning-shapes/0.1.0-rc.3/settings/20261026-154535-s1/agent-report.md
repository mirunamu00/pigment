Morning Shapes 0.1.0-rc.3 is applied to every screen: Profile, Notifications, Security, Billing and the not-found page, in light and dark at 1440px and 390px. The final build passes, all 8 smoke tests pass, and no page scrolls sideways. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

**What changed**
- **Tokens:** `design-system/tokens.css` is a copy of `dist/tokens.css`, imported at the top of `src/styles/base.css`. The old variable names in `base.css` still work, pointing at the new tokens. Dark mode follows the system setting, or `data-theme` on the root.
- **Fonts:** Figtree (400/500/700) and DM Mono (400) are served from the app itself through two new font packages in `package.json`, so no font is loaded from the web.
- **Signature elements** are reusable pieces in `src/styles/morning-shapes.css` and `src/design/`:
  - colour bands with curved edges, and a compact header band at the top of each screen;
  - flat shapes shaded with one darker crescent, with seven small pictograms (envelope, bell, padlock, laptop, plan tiers, card, invoice) and the error-page picture;
  - breathing glyphs, a loading-dots indicator and the choice row;
  - every pill variant, tab pill and circle button, plus badges;
  - the vignette style and the fade-in helper.
- **Screens, following the spec's Settings, Form, Table, Dialog and Error rows:**
  - Each screen opens with a cream header band, curved bottom edge and its own shape cluster: sun, speech bubble, hexagon or tilted card.
  - Settings groups are cream panels with a small pictogram plate beside each title.
  - Main buttons are dark ink pills with a hard 2px edge that sinks when pressed; secondary ones are cream. "Revoke" is a cream pill with a red label.
  - Switches, inputs and selects follow the spec.
  - Tables have a framed white body, a sticky first column on phones and status badges with a coloured dot.
  - The current plan card turns violet with a check disc.
  - The dialog has a cream footer and close circle, and becomes a bottom sheet on phones.
  - The not-found page is a cream band with a rising arc, the error picture and a pill link home.
- **Motion:** one slowly drifting sparkle per header cluster, a breathing moon glyph when no other sessions are signed in, pill-press feedback, a dialog fade-up, and the top bar's shadow after 8px of scroll. All of it stops under `prefers-reduced-motion`.
- I also added `design-system/VERSION`, `design-system/components.md`, `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but `git` wasn't among the commands I was allowed to run. Everything is uncommitted on `main`.
- **Leftover file to delete:** `src/pages/PreviewPage.tsx` is from the temporary review route I used to check the dialog and error states. I couldn't delete it (`rm` wasn't allowed), so it's an empty placeholder; the route is already removed.
- **Empty sessions panel has no button:** the spec wants one pill on an empty state, but there's no sensible action there, so it's just the sentence and the glyph.
- **No phone menu button:** the spec's phone top bar has one, but this app has no top-bar links to put in it. The section pills scroll sideways in their own row instead.

**Decisions I made**
- **Section colours:** the whole app counts as a settings area, so every header band is cream as the spec says. Each section still gets a colour for its nav dot, cluster and empty state: Profile yellow, Notifications blue, Security green, Billing orange.
- **White sidebar:** the spec suggests a cream sidebar, but it merged into the cream header bands, so I made it white.
- **Visibility inside cream panels:** cream pills and plate backgrounds use the white raised surface there. In cream they disappeared against the panel.
- **Sparkle colours:** pink, yellow or blue rather than violet, which vanished on the dark-mode band.
- **Fade-in only in the first view:** plates and art lower down the page are simply shown. Otherwise they stayed invisible in full-page screenshots until scrolled to.
- **Additions:** All / Due / Paid filter pills on Invoices (All is the default, so all five rows show), and a close circle in the dialog. The spec calls for both.
- **Status line stays in place when empty:** the smoke tests look up the status region while it's empty, so it stays on the page with only its tick hidden.