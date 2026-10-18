I've restyled every screen to Night Cartridge 1.2.0-rc.5. The build passes, all 9 smoke tests pass, and the final screenshot run found no page that scrolls sideways. I checked the PNGs at 1440px and 390px for Overview, Projects, Project detail, Team, Settings and the 404 page; they match the spec.

**Light and dark.** The spec defines a dark theme only and says not to add a light one. The page now declares `color-scheme: dark`, so the "light" and "dark" screenshots look identical.

**Not committed.** The spec asks for one commit per screen, but git wasn't among the commands I was allowed to run, so everything is uncommitted on `main`.

**Leftover file to delete.** I couldn't delete files either: `src/pages/SceneReview.tsx`, the temporary scene-review page, is still there. Its route is removed and nothing imports it, but please delete it.

## What changed
- **Tokens and type:** `design-system/tokens.css` is a copy of the package tokens. `src/styles/base.css` is rewritten from them: the spec's root block, pixel fonts loaded from the CDN links the spec gives, focus ring, hover, press, and motion keyframes. Animation stops under reduced motion and when the Animation switch is off.
- **Pixel art engine:** `src/art/kit.ts` holds the spec's helpers. `sprites.ts` draws the server-yard props, the five leads and the workshop pieces. `scenes.ts` composes one unique scene per screen, two small framed scenes (vignettes) and the grass strip above the footer.
  - Each scene has twinkling stars, out-of-sync blinking lights, a drifting cloud, a two-frame fan and a rare shooting light.
- **Reusable pieces** (`src/components/pixel.tsx`): the ▶ marker, icons, block meter, dither rule, callout, scene window, vignette, ground strip, coloured-initial avatars, and the Animation and Pixel body switches. Both switches are saved between visits.
- **Screens:**
  - **Overview:** scene strip, KPI tiles with coloured top bars, chart and activity panels under ruled headings, and the projects table with a meter under "Showing n of m".
  - **Projects and Team:** their own scene strips, the table with markers, and on mobile only the pinned columns.
  - **Project detail:** a full scene banner, marker tabs, and block meters for task counts. They replace the `<progress>` bar and use pixel checkboxes.
  - **Settings:** workshop strip, a titled window and a callout.
  - **404 and project-not-found:** a framed error scene with the lights off and one red beacon, plus a gold "Go to overview" / "Back to all projects" button.
- **Unchanged:** every route, `data-testid`, label and ARIA attribute.
- **Docs:** `design-system/` has `VERSION` and `components.md` (the app's world, which scene is on which screen, which colour marks which category, my decisions), and `AGENTS.md` and `CLAUDE.md` carry the pointer line.

## Report tables
1. **Sprite table:** there are no product item sprites; this app has no product grid.
2. **Variant table:** each repeated prop type differs by at least 4 units, never only by colour.

| Variant | Where (x) | What differs |
|---|---|---|
| rack | 230 / 440 (Overview) · 232 / 460 (Team) · 146 / 532 (detail) | sizes 14×18 vs 10×16, 10×16 vs 10×20, 14×32 vs 14×28 |
| crates | 390 / 608 (Overview) · 414 / 600 (Team) | 12×10 vs 14×16, 12×12 vs 14×16 |
| reel | 266 / 144 (Settings) | 10 vs 14 across |
| switch panel, workbench | Settings | 10×16 vs 10×20; 16 vs 20 wide |

3. **Scene numbers** (read off a temporary review page, now removed):

| Scene | Lead height | Lights | Hand-placed details | Gaps between props, left to right |
|---|---|---|---|---|
| Overview strip | 24 | 5 | 58 | 4, 6, 146, 2, 2, 136, 4 |
| Detail banner | 56 | 7 | 78 | 4, 8, 62, 2, 8, 140, 4, 6 |
| Settings strip | 24 | 7 | 61 | 4, 6, 106, 2, 4, 140, 4, 6 |

   - In the banner the mast and pine tops sit at y58, against required limits of 72 and 62.
   - **Fixes after review:** I levelled the ground under props that sat unevenly, and added lamp poles where a quarter of a scene was empty. Those poles add one light per scene; the counts above were read before that, so add one to each.

## What I couldn't apply, or decided myself
- **Navigation:** I kept the existing sidebar instead of putting nav items in the header. Under 1024px it becomes a menu window; under 600px search becomes an icon.
- **Global search:** it stays a real input with a framed button, not a search button with a keyboard hint.
- **KPI meters:** only uptime has a meter, because it's the only metric with a real maximum. The others show their change only.
- **Chart:** drawn in HTML so its 12px labels stay sharp. It sits in the narrower column so the two panels end level.
- **Error scene:** the 404 and project-not-found screens share the same framed scene.
- **Not done:** no automated accessibility (axe) check. The required scene review got one in-place round, not the two the spec asks for.
- **Fonts:** they load from the spec's `@latest` CDN links, so the smoke test that checks for console errors needs network access.