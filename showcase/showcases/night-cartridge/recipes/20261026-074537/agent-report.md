The Night Cartridge redesign is done on every page, desktop and mobile. The build and typecheck pass, and the last full `node pigment-snap.mjs` run reported no sideways scrolling. I looked at the screenshots of every page at 1440px and 390px; the four interactive states I could capture as URLs are below.

**Light and dark.** The specification is dark-only, so there is no light theme. The "light" and "dark" screenshots are the same dark UI.

**What I changed**
- **Base:** the night-blue colours, the pixel fonts (loaded from the CDN links the spec allows), no rounded corners, no soft shadows, no transitions. Focus shows the 4px gold ring.
- **Header:** the old sidebar and bottom tab bar are replaced by a sticky header with a dithered rule under it. The current page has the blinking ▶ marker. On the right are the search box, the "Animation on/off" and "Pixel body on/off" switches (both remembered between visits), notifications and your avatar. Under 1024px the nav moves into a Menu window.
- **Footer:** the household card and the Panful Plus line moved here, under a grass "ground strip" with three small pixel props.
- **Pixel scenes (new code):** I built a pixel-art world for the app, a village food lane at night. Each kind of page has its own scene, and they move in stepped frames: twinkling stars, blinking lights, chimney smoke, a drifting cloud, an occasional bird. All of it stops under reduced motion or when Animation is off.
  - Today: a full-width scene of the cookhouse, with the greeting and "Start cooking" (the one gold button) in a window over it.
  - Recipe pages: a bakery banner.
  - Recipes, Meal plan, Shopping, Settings: a short strip scene above the page title (market stall, barn, grocer's, greenhouse).
  - Empty results, empty shopping list and the 404 page: a small framed scene.
- **Components:** all redrawn in the system: framed buttons, filter chips (cuisine chips get a colour square), tabs, checkboxes, switches, ◀ ▶ quantity steppers, the nutrition table, dialogs and toasts. Progress bars, the monthly goal ring and star ratings became block meters, and the weekly chart is flat square bars. All icons are pixel icons.
- **Colour:** each cuisine has one colour, shown as the top bar of its recipe cards and plan slots.
- **Kept:** every route, feature, piece of copy, `data-testid` and accessibility attribute. Recipe photos stay with their recipes in 2px-framed picture windows.
- **Design-system docs:** `design-system/` (version file, verbatim token copy, `components.md` describing the world and scenes), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**What I couldn't apply**
- **404 photo:** I dropped the decorative herbs photo from the 404 page; the error image is now the small pixel scene. That photo didn't belong to a recipe; every other photo is kept.
- **Search box:** the spec wants a search button, and under 1024px just an icon. I kept a real input because it filters the recipe list as you type. Under 1024px it sits on its own row in the header.
- **Settings groups:** these use a 2px frame instead of the heavy 4px window frame. The spec allows at most three heavy frames per screen, and Settings has five groups.
- **Settings sidebar:** it runs from the header to the end of the content, not all the way down to the grass strip.
- **Dates and placeholder:** review dates stay as "18 October 2026" rather than the spec's `YYYY.MM.DD`. The search placeholder keeps its original wording instead of just "Search".
- **Scene numbers:** some were checked by eye in zoomed renders rather than counted, notably the spacing between props and whether the tall props rise above the back ridge.

**Decisions I made myself**
- **Start cooking:** this button moved from the "Tonight" card into the greeting window at the top of Today.
- **Gold buttons:** on recipe pages the gold button turns plain while its "Add to plan" popover is open, and the popover's confirm becomes the gold one.
- **Small meters:** I added a smaller meter size for rating scores and the rating distribution, where full-size blocks don't fit.
- **Added text:** I added a few short captions to balance the Meal plan stat tiles, and On/Off words beside switches.

**Report items the spec asks for**
1. **Item sprites:** none. Every recipe has a photo, so no sprite substitutes were needed.
2. **Repeated props in one scene:** Shopping strip has a crate stack at x 128 (tall, violet) and x 380 (short, amber), differing by 4 units in height and in colour. Hero and banner have no repeats.
3. **Per scene** (heights are measured from the topmost lit pixel to the base):

| Scene | Lead and features | Lead height | Other numbers |
|---|---|---|---|
| Hero | Cookhouse at x 268–337, base y 96. Chimney with smoke, pot on the hob in the kitchen window, pot sign, door awning, herb box | 47 units = 188px | Door path ends at x 372; about 129 detail pixels |
| Banner | Bakery at x 246–309, base 112. Dome oven with fire, chimney, BAKE sign, loaves in the window, awning | 55 units = 110px | 74 detail pixels |
| Strips | Stall, barn, grocer's, greenhouse | about 21–26 units each | About 40 detail pixels each |
| Small scenes | Lamp and basket, trolley and tree, barrier and sign | — | 16 detail pixels each |

4. **Files changed:** `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`, all of `src/components/` and `src/pages/`. New: `src/art/`, `src/components/Art.tsx`, `design-system/`, `AGENTS.md`, `CLAUDE.md`.

**One thing for you:** `src/pages/Review.tsx` is a leftover stub from a temporary scene-review page. I couldn't delete it with the commands I'm allowed to run, so it's emptied to `export {}` and is safe to delete.