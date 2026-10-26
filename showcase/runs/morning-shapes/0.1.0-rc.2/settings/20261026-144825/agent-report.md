I've applied Morning Shapes 0.1.0-rc.2 to all four settings screens and the not-found page, in light and dark. The build passes, all 8 smoke tests pass, and the final snapshot run shows no page scrolling sideways at 1440px or 390px. I compared the screenshots with the spec. On the last pass I opened only Billing (desktop, light); each other screen and mode was checked on an earlier pass, and the fixes since were small CSS tweaks. Nothing was committed: the "one commit per screen" step from the spec is left for you.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`. The old variable names at the top of `base.css` now point to the new tokens, so nothing that used them breaks. Figtree and DM Mono are bundled with the app through two new font packages (`@fontsource/figtree`, `@fontsource/dm-mono`), so the page makes no font requests to other sites.
- **Reusable pieces** in `src/components/kit/` and `src/styles/kit.css`:
  - colour bands with curved edges, including the compact page-header band;
  - the flat shape kit, with 7 small pictures on round plates: envelope, bell, padlock, laptop, stairs, card, receipt;
  - four different shape groups for the header bands, and the error-page picture;
  - breathing glyphs and the three-dot loader;
  - every button style, the toast, the vignette;
  - a small motion helper: fade-in on first view, glyph animations pause off-screen, top-bar shadow on scroll.
- **Screens:**
  - Every screen opens with a coloured header band, and every settings group is a cream panel with a picture plate beside its title.
  - All buttons are pills on a ledge. Inputs, the select and the switches follow the spec.
  - Tables have a framed, scrollable layout with a sticky first column on phones, status badges and code-style invoice numbers.
  - The current plan card is violet with a check mark. The dialog is white with a cream footer and becomes a bottom sheet on phones.
  - Revoking a session or changing plan shows a toast; profile and password saves show "Saved" in green with a tick.
  - The not-found page uses the cream band with the error picture.
- **Motion:** the header-band sparkle drifts slowly, the glyph next to "No other devices are signed in." breathes, and buttons sink when pressed. All of it stops under reduced motion.
- **Docs:** I added `design-system/VERSION`, `design-system/components.md` (hue map, picture subjects, where each element is used), plus `AGENTS.md` and `CLAUDE.md`.

All routes, labels, form fields, `data-testid`s and accessibility attributes are unchanged. The few additions:
- a "Close" circle button in the dialog;
- the two table frames can now be focused with the keyboard and are labelled by their section headings, as the spec asks for scrolling tables.

**Spec items I couldn't fully apply**
- **Not used on any screen:** the vignette, confetti, the three-dot loader and choice rows are built but unused. This app has no hero, onboarding, loading state or option tiles to put them in.
- **Dialog closing animation:** the browser's built-in dialog closes instantly, so there's no reverse animation on close.
- **Toasts:** they don't stack if two appear at once. Each page has at most one, so this never happens today.
- **Leftover file:** `src/pages/PreviewPage.tsx` is an empty file from the temporary preview route. I couldn't delete it with the commands I was allowed, so please delete it.

**Decisions I made myself**
- **Colour per section:** the spec says settings areas should be cream. But this whole app *is* settings, and all-cream would make the sidebar dots invisible. So I treated the four sections as the app's main areas: Profile yellow, Notifications blue, Security green, Billing orange. The not-found page is cream.
- **Plate colour:** plates turn white inside cream panels, because a cream plate on a cream panel disappears.
- **Phone headers:** the shape group sits below the header text instead of beside it, so the shapes never overlap the text.
- **Fade-in:** only plates visible when the page loads fade in. Plates further down are shown straight away, so they're never missing in full-page screenshots.
- **Sidebar:** below 1024px wide it becomes a horizontally scrolling row of pills.
- **Switches** use the default ink "on" colour rather than each section's colour.
- **Spec sizes with no token:** the 44px tap area, switch dimensions, dialog and toast widths, and 5-second toast duration are named once at the top of `base.css`.