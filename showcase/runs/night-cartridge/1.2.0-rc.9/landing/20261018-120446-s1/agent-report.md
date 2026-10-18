I've restyled every screen (Home, Pricing, Customers, Sign up and 404) with Night Cartridge 1.2.0-rc.9. The build passes, all 15 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I compared the screenshots against the spec and fixed what was off. Every route, behaviour, label text, form field, `data-testid` and accessibility attribute is unchanged.

**What changed**
- **Tokens and type:** `design-system/tokens.css` is an exact copy of the spec's tokens and is the only source of values. The fonts are the four links the spec gives, in `index.html`. The spec defines a dark theme only, so there is no light mode: the light and dark screenshots are identical.
- **Pixel scenes:** the whole app is set in one world, a town square at night where appointments are kept.
  - **Home:** a full-width hero with the text in a window on the left. The main building is a clock tower with an attached hall, next to a week board showing open and booked slots, so the hero's existing image label still describes what's drawn.
  - **Pricing, Customers, Sign up:** each opens with a thin scene strip in a window, built around its own building (booking office, town hall, post office).
  - **404:** a small square scene with the lamp out and a blinking red beacon.
  - **Footer:** every screen gets the grass ground strip.
  - **Motion:** stars twinkle, lights blink, clouds drift, a flag or smoke moves, and a shooting light passes every 14 seconds. All of it stops under reduced motion and under the new header switch.
- **Reusable pieces:** in `src/components/pixel.tsx` there are components for the scene, ground strip, ▶ marker, window, dithered rule, block meter, callout, pixel icons and avatars. The header has two switches, Animation and Pixel body, each saved between visits.
- **Per screen:**
  - **Header:** the ▶ marker blinks on the current nav item.
  - **Feature and story cards:** a coloured top bar and a pixel icon per category.
  - **Comparison table:** pixel check marks, and on phones only the pinned columns show.
  - **FAQ:** collapsible items with ▶/▼ markers.
  - **Filters:** filter chips, with a block meter beside "Showing n of m".
  - **Rating:** a 20-block meter under the 4.8/5 rating.
  - **Gold button:** only the page's main action is gold, once per screen; the header "Sign up" is outlined.
  - **Forms:** errors shake briefly with a pixel "!" icon, the checkbox is a pixel square, and the select has a ▼ marker.
- **Docs:** `design-system/` has `VERSION`, the tokens and `components.md` (the world, the scene on each screen, the colour for each category). I added `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **Commits:** none. The spec asks for one commit per screen, but git wasn't among the commands I was allowed to run.
- **Leftover files:** for the same reason I couldn't delete three unused files: `src/pages/SceneReview.tsx` (my temporary review page, already removed from the routes), `IconPlaceholder.tsx` and `ImagePlaceholder.tsx`. They still compile but nothing uses them, so please delete them.
- **Spec conflicts:** a few scene rules can't all hold at once, so these are knowingly off:
  - **Hero right edge:** the second group of props has to sit past x 424 while the first must end by 420, so the gap between them can't reach the required 60.
  - **Hero colour band:** the ridge depths the recipe sets leave the band between the two back ridges up to about 40 units tall, over the 32-unit limit for one flat colour.
  - **Hero detail count:** I hand-placed about 120 details, right at the minimum.
- **Strip heights:** strip skies come out at 19 of 48 units, just under the 40% cap. Strip main buildings are 23–26 units tall; the customers one is right at the 26 maximum.
- **Mobile menu:** it doesn't trap keyboard focus as the spec asks, because that would change existing behaviour.
- **Checks not run:** I didn't run an axe accessibility audit, since it isn't among the allowed commands.
- **Report numbers:** the spec wants a full set of numbers for each scene. I put the key ones on the temporary review page and in the summary below, not as a separate full report.

**Decisions I made**
- **No search:** the app has no search, so the header has no search button.
- **Plan buttons:** all three plan buttons are 48px tall so the cards end level.
- **Phone table:** shows Feature, Team and Business; Starter stays in the page but hidden.
- **Touch screens:** every button and field that shares a row grows to 44px together, so rows stay level.
- **Sign-up layout:** the benefits list is a panel that stays in view beside the form, so the left column doesn't end far above the form.
- **Neutral colours:** the stats tiles and testimonials have no category, so they use neutral rules instead of colours.
- **Menu breakpoint:** the menu button takes over below 1024px (the spec's breakpoint), which still covers the original sub-720px menu.

**Key scene numbers**
- **Hero building:** 45 units tall (180px), base at y 94, top at y 49. The path from its door ends at x 366, the low edge of the required 366–416.
- **Hero tall props:** after the fixes, the poplar rises 5 units above the ridge behind it and the street clock 4. Both are at least 4 units shorter than the building.
- **No item sprites:** there are no product images, so there is no sprite table.