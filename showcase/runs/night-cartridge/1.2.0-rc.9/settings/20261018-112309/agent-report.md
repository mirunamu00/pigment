The app is restyled to Night Cartridge 1.2.0-rc.9 on every screen. The build passes, all 8 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I looked through all the screenshots, including mobile.

**What changed**
- **Base setup:** the tokens file is copied as-is into `src/styles/tokens.css`. `base.css` is rewritten using only tokens and the spec's own recipes: the root block, pixel type, focus ring, marker, window chrome, scene CSS, stepped motion and layout classes. The fonts load from the spec's links.
- **Reusable pieces:**
  - The spec's scene-drawing helpers, ported to TypeScript, plus a sprite builder that adds the outline and the top-left light / bottom-right shade (`src/art/pixel.ts`).
  - The scene, vignette, ground strip and icon components (`Pixel.tsx`).
  - Marker, dithered rule, window, block meter, callout, avatar and the scene window (`Chrome.tsx`).
  - The Animation and Pixel body header switches (`ToolSwitches.tsx`), saved between visits.
- **The world:** a "Registry Quarter", the town square where residents' records are kept. Each screen has its own lead building with its own sign:

  | Screen | Lead building | Sign |
  | --- | --- | --- |
  | Profile | Registry Hall | HALL |
  | Notifications | Post House | POST |
  | Security | Watch House | KEYS |
  | Billing | Counting House | PAY |
  | Not found | signpost with a red beacon, lamp off (small vignette) | LOST |

  Every screen also gets the grass ground strip along the bottom. In the scenes, stars twinkle, lights blink, a cloud drifts, one small creature bobs and a rare shooting star or bird passes. All of it freezes on the first frame under reduced motion or when the Animation switch is off.
- **Screens:**
  - **Layout:** sticky header with the dithered rule, and a full-height sidebar with the gold ▶ marker.
  - **Profile:** form in a window, gold Save button, a shake on invalid fields, and a "!" icon on errors.
  - **Notifications:** square pixel switches with an On/Off word, and a 6-block meter for "n of 6 on".
  - **Security:** password strength meter and a sessions table with the marker on "This device".
  - **Billing:** plan cards with coloured top bars and icons, the current plan marked, and the dialog as a window with a close button and gold confirm.
  - **Not found:** the vignette and a gold "Go to profile settings" link.
- **Docs:** `design-system/` (`VERSION` and `components.md` describing the world, scenes, colours and decisions), plus the pointer line in `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **Light mode:** the spec says dark only, so the light and dark screenshots are the same and there is no theme switch.
- **No commits:** git wasn't on my allowed command list, so I made no per-screen commits.
- **Leftover file:** `src/pages/ScenesReview.tsx` is still in the repo; I couldn't delete files with my allowed commands. Its routes are removed and nothing imports it, so please delete it.
- **Not built:** there's no header search (the app has no search feature) and no danger zone (the app has none).
- **Two status regions on Security:** the spec allows one per screen, but I kept the original two so behaviour doesn't change.
- **Font dependency:** fonts load from CDN `@latest` links as the spec gives them. Offline, the text falls back to system fonts.
- **Scene numbers:** these came from a temporary review route that computes them in code: lead heights of 23–26 units (46–52px), focal groups 70–79 units off centre, 53–56 hand-placed details per strip. I counted the lights per scene by hand (6–7 each). I didn't write the full per-scene report tables the spec asks for, and there are no item sprites.

**Decisions I made**
- **Navigation:** the nav stays in the sidebar. Under 1024px it becomes an always-visible top menu (two columns on phones) rather than a menu button, which keeps the nav visible for the tests.
- **Section headings:** each settings group opens with a large heading on a dithered rule above its window. To stay within three heavy frames per screen, the tables have no frame and Billing frames only the payment method.
- **Meters:** the Bio character count and password strength meters sit next to their captions, rather than under a 48px number.
- **Nav marker:** the marker stays steady instead of blinking (the blink is optional), so it always shows in screenshots.
- **Dates:** invoice dates display as `YYYY.MM.DD`.