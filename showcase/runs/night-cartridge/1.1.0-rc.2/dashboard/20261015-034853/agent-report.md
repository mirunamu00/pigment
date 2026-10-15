I've restyled every screen to Night Cartridge 1.1.0-rc.2. The build and typecheck pass, and the final full snapshot run shows no sideways scrolling on any page. The Playwright smoke tests could not be run, because `npm run test:e2e` isn't one of the commands I'm allowed to run. I kept every route, label, form field, `data-testid` and ARIA attribute the tests rely on, but nothing has actually exercised them.

**What changed**
- **Theme:** the spec defines only a night theme and forbids a light one, so the app is now dark only. Your "light" and "dark" screenshots are therefore identical, on purpose.
- **Tokens and fonts:** the tokens are copied unchanged into `design-system/tokens.css`. The four font links come from the spec and load from CDNs.
- **Root rules:** the stylesheet (`src/styles/base.css`) has the spec's root rules: no radius, no transitions, a 4px gold focus ring, and the reduced-motion and Animation-off kill switches.
- **Pixel art (`src/art/`):** the spec's helpers, a server-yard prop library and one scene per screen, each with its own seeds, focal group and hand-typed details.
  - Overview, Projects, Team and Settings each get a Strip; Settings uses the workshop corner of the yard.
  - Project detail gets the Banner.
  - The empty table, the 404 and "project not found" get Vignettes; the error ones have their lights off and a red beacon.
  - Every screen ends with the ground strip.
  - Stars twinkle, lights blink out of sync, a cloud drifts, one sprite per scene bobs or swaps frames, and a rare shooting light crosses the sky. All of it freezes on the first frame under reduced motion or Animation off.
- **Reusable pieces (`src/components/pixel.tsx`):** the scene window, vignette, ground strip, marker, dither rule, window, block meter, callout, pixel icons, avatars made from each name, and the two header switches (Animation and Pixel body), both remembered per browser.
- **Screens:**
  - **Header and nav:** the header sits on a dithered rule, and the sidebar nav marks the current page with the blinking marker.
  - **User menu:** opens with its first option highlighted, moves with the arrow keys, and Escape closes it and returns focus.
  - **Overview:** KPI tiles have hue bars; uptime gets a 10-block meter against its real 100% maximum.
  - **Tables:** filter chips with status bullets, sort markers, a marker in the row gutter, and status bullets in cells.
  - **Project detail:** marker tabs; the "2 of 6" task counts are now block meters.
- I checked the scenes twice in a temporary review route (2× and 8× zooms plus a flat-colour measurement), then removed the route.
- **Docs:** `design-system/` has `VERSION` and `components.md` (scenes by screen, hue per category, local decisions), and `CLAUDE.md` / `AGENTS.md` carry the pointer line.

**What I couldn't apply**
- No git commits, so not one commit per screen as the spec asks; git isn't in the allowed commands. For the same reason I couldn't delete the leftover `src/pages/ArtReviewPage.tsx`; it's an empty stub and safe to delete.
- The spec asks for a sidebar section menu and a danger zone on Settings, but the page is still a "coming soon" placeholder, so there are no sections to list.
- No keyboard-hint chip on search, because the app has no search shortcut.
- The font links use `@latest` from CDNs, exactly as the spec gives them. If a test environment has no network, the failed font loads could log console errors that the "no console errors" test would catch.

**Decisions I made myself**
- I kept the existing sidebar layout and moved the brand into the header. Under 1024px the sidebar becomes a wrapping top menu.
- Under 600px the header search moves to a second row instead of collapsing to an icon, so search keeps working on phones.
- Table pages (Projects, Team) also get a Strip scene. The spec says data tables get "no art" but also that every screen gets one scene; I followed the second.
- Dates now read `2026.12.15`, per the spec. Sorting still uses the underlying dates.
- The delta colour follows whether the change is good, so falling incidents and lead time show green.
- With 8 clients and 4 KPI kinds sharing 8 hues, some categories share a hue across the two kinds.
- Avatars replace the initials. They were hidden from screen readers anyway, and names are unchanged.
- Strip ridges are clamped per column so no layer shows a flat run of one colour over the spec's limit. Racks and trees in the distant ridge are kept low enough to stay inside it.