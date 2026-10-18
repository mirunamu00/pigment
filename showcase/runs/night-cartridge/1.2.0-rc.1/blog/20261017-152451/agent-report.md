I restyled the blog with Night Cartridge 1.2.0-rc.1 on every screen. The build and typecheck pass, all 9 smoke tests pass, and the final snaps show no page scrolling sideways at 1440px or 390px. Nothing is committed: git isn't one of the commands I was allowed to run, so the spec's one-commit-per-screen step is still open and all changes are in the working tree.

**What changed**
- **Foundation:** the tokens are imported unchanged from the design package at the top of `src/styles/base.css`. The pixel fonts load from the spec's links in `index.html`. I added the root rules for motion and square corners, the gold focus ring, and replaced every old style.
- **Reusable pieces** (`src/components/pixel/`): the ▶ marker, game windows, dither rules, block meter, callout, hue bullet, scene stage, footer ground strip, pixel avatars, 24px and 12px pixel icons, and the two header switches ("Animation on/off" and "Pixel body on/off"). Both switches are saved between visits.
- **Pixel art** (`src/art/`): the blog's world is a post-office street. Each scene has its own lead building, and the details are placed by hand. Scene motion is stepped: stars twinkle, lights blink out of sync, a cloud drifts, a flag flaps, and a bird or shooting star crosses now and then. All of it stops under reduced motion or when the Animation switch is off.
- **Home:** a full-width scene with the title window over its left third, a featured card, and post cards with a coloured bar per category. The tag filters became chips that show the marker when selected. The "Showing 6 of 6 posts" count now has a 6-block meter, and the empty search state has a small scene.
- **Article:** a framed banner scene with category, title, summary and author line. Headings sit on dithered rules, the quote is a callout, and code is in a window with a Copy button. The figure is now a framed pixel scene that keeps its alt text. The contents list marks the current heading as you scroll and folds into a disclosure on narrow screens. I added previous/next links at the bottom.
- **About and not found:** About has its own banner scene and author cards with pixel avatars. Not found shows a scene with its lamp off and one red beacon, inside a window.
- **Header and footer:** the header is sticky with a dither rule and a blinking marker on the current page; under 1024px the links move into a Menu button. The footer has the grass strip with its own small scene and the newsletter in a framed panel. A failed newsletter submit now focuses the field and nudges it once, with a warning icon on the error.
- **Docs:** I added `design-system/` (`VERSION`, `components.md`), `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **Light appearance:** the spec is dark only, so there is no light theme. The light and dark screenshots are identical.
- **Dates:** the spec wants `YYYY.MM.DD`, but the smoke tests check "September 28, 2026", so I kept that format.
- **Unique scenes per screen:** the two captured articles and About each have their own scene. The four other posts reuse the two article scenes mirrored and with different ridgelines, so their lead buildings repeat.
- **Header search, syntax colours and the axe check:** the app has no site-wide search, so I didn't add one. Code blocks have no syntax colours. I didn't run an axe accessibility check.

**Decisions I made**
- **Gold button:** the only gold button is the newsletter's Subscribe, since it's the app's one real submit. The hero's "Read the featured post" is a framed button.
- **Card grid:** it follows the spec's 200px minimum but tops out at three columns, to avoid a lone sixth card on its own row.
- **Banners on narrow screens:** below 1024px they recentre on their lead building, the way the spec has the hero do.
- **Pixel body switch:** it only appears on article pages.
- **Scene checking:** I couldn't run ad-hoc scripts, so the skyline limits are enforced in the scene code. I checked the scenes with a temporary close-up route, which is now removed. That review caught supporting buildings sinking into uneven ground, which I fixed.

`npm install` also created a `package-lock.json`, which is untracked.