I've applied Morning Shapes to every screen in the project. The build and typecheck pass, all 8 smoke tests pass, and no page scrolls sideways in the final screenshots. I checked Profile, Notifications, Security, Billing and the not-found page at 1440px and 390px, in light and dark. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied unchanged into `src/styles/` and follows the system light/dark setting. The old variable names in `base.css` still work and point at the new tokens. Figtree and DM Mono load from Google Fonts in `index.html`.
- **Signature elements, built as reusable pieces:**
  - `morning-shapes.css`: color fields with arced edges (top, closing and header bands, plus panels), every button style, tabs and circles, breathing glyphs, the loading dots, choice rows and the fade-in.
  - `shapes.tsx`: the flat shapes with their darker crescent, sparkles, a different header cluster per area, 7 small pictogram plates, the error-page composition and the initials avatar.
  - `Glyph.tsx`, `HeaderBand.tsx`, and `useMotionObserver.ts` (fades plates in on first view and pauses glyphs off-screen).
  - All motion stops under `prefers-reduced-motion: reduce`.
- **App shell:** white top bar with the product name, shadow after 8px of scroll, and a colored dot on each nav item. The selected item is a dark pill with a white dot.
- **Each screen:**
  - Every page opens with a header band that has an arched bottom edge and its own shape cluster.
  - Settings groups sit in cream panels with a pictogram plate beside each title.
  - Inputs, select, switches, tables, status badges and dialog all follow the spec. Plan cards are white, and the current plan is a violet card with a check disc. Revoke is a cream pill with a red label. The dialog is a bottom sheet on phones.
  - The not-found page is a cream band rising from the bottom, with the rain-cloud composition and a dark pill linking home.
- **Handover files:** `design-system/` holds the version, the tokens and `components.md`. `AGENTS.md` and `CLAUDE.md` point to it.

**What I couldn't apply**
- **One commit per screen:** git isn't among the commands I was allowed to run, so nothing is committed. All changes are uncommitted in the working tree.
- **Phone menu:** the spec's 64px top row with a menu button would hide the section nav. On tablets and phones the sidebar becomes a horizontally scrolling row of pills instead.
- **Things the app doesn't have:** toasts, loading states and choice tiles. The loading dots and choice row are built but unused.

**Decisions I made**
- **Colors per area:** Profile yellow, Notifications blue, Security green, Billing orange. Because every screen is a settings screen, the header bands are cream, as the spec's Settings row says. The area color shows in the cluster, nav dot, plates and avatar. That's why there's no saturated band on these pages.
- **Sidebar is white, not cream:** a cream sidebar would merge into the cream header bands.
- **Plates are white:** a cream plate would vanish on the cream panels.
- **Secondary pills inside cream panels** use the white fill for the same reason.
- **Looping glyph:** settings group icons are supposed to stay still, so the only looping glyph is beside "No other devices are signed in." The rain cloud on the not-found page is the one shape that drifts.
- **Fade-in:** shapes stay visible until they fade in, rather than starting hidden. Otherwise plates further down the page were blank in full-page screenshots.
- **Existing text kept as-is:** "Go to profile settings" (four words, over the spec's 1–3) and the "Account Settings" title case stay because label text had to be preserved.
- **Additions:**
  - A Close circle in the dialog.
  - Labelled, keyboard-focusable scroll frames around the two tables.
  - Notification switches follow the system's switch style, but they stay `<input role="switch">` elements.

The temporary preview route I used to inspect the dialog, glyphs and plates has been removed.