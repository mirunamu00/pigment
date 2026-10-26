The redesign is done on every page: Today, Recipes, the recipe page, Meal plan, Shopping, Settings and the 404 page. The build and typecheck pass, nothing scrolls sideways, and I checked the screenshots at 1440px and 390px in light and dark. Beyond the normal routes I also screenshotted the "no results" empty state (via `/recipes?q=zzzz`). I did not screenshot the other interaction states in `pigment.app.json`, such as the open dialogs, cook mode or the form errors; they're styled but untested visually. In the Settings full-page shots the sticky save bar shows up mid-page. That's just how a sticky bar looks in a long capture; in the browser it sits at the bottom of the screen.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` imports the package's `tokens.css` as-is, so the values aren't retyped. Light and dark both come from the tokens. The old variable names (`--bg`, `--ink`, …) still work as aliases. Fonts are Figtree and DM Mono.
- **Area colours:** Today is yellow, Recipes blue, Meal plan green, Shopping orange, and Settings cream as a utility area. Each colour shows on its nav dot, header band and tags.
- **New pieces in `src/components/shapes.tsx`:**
  - colour bands with curved edges, and a header band at the top of each product screen with its own illustration (cookbook, pot, calendar, carrier bag, house);
  - 11 small round illustrations (spot plates) and three larger pictures for empty, finished and error states;
  - three slowly moving glyphs (a sun by the Today greeting, a list on the shopping card, a flame for cook mode);
  - pill buttons that sink 2px when pressed;
  - a scene with the pans photo and two labels on a yellow panel on Meal plan.
- **Icons** are now solid shapes instead of outlines. The star ratings no longer use a gradient.
- **Pages:**
  - Today is a dashboard: greeting, a moving glyph, four stat tiles in the area colours, and a blue "Start cooking" button.
  - The recipe page has a cream header band, and the photo sits on a blue offset edge.
  - Filters, tabs and segmented controls are pills, with a dot on the selected one.
  - Dialogs are white with a cream footer and become bottom sheets on phones. Notifications are dark pills with a sparkle.
  - The 404 page is a cream band with the error picture.
  - The footer is a cream band with a curved top edge and a dark bottom bar.
- **Kept intact:** every route, `data-testid`, ARIA attribute, piece of copy and photo, and all behaviour.
- **Also added:** `design-system/VERSION`, `design-system/components.md` (the colour map, illustration subjects and decisions), and `AGENTS.md` / `CLAUDE.md` pointing to it.

**What I couldn't apply**
- There's no front page, closing call-to-action band, onboarding or loading state, so the full hero, the large closing button, the onboarding steps and the loading dots aren't used.
- The footer has no link columns or signup field because the product has neither. I also didn't add links that would duplicate the nav labels and could confuse tests.
- The favicon is an image link in `index.html` and can't read the design tokens, so it's the one place with raw colour values.

**What I decided myself**
- **Phone navigation:** I kept the bottom tab bar instead of the spec's menu button, because it's an existing feature with its own test ids. The selected tab shows a dark pill around its icon and an area-colour dot.
- **Settings dot:** cream doesn't show on the cream sidebar, so the Settings nav dot uses the darker border colour.
- **No fade on product screens:** the spot plates and the photo scene are drawn immediately. In full-page screenshots, anything below the first screen would otherwise stay invisible. Only the 404 picture fades in.
- **Unit and oven choices** are bordered tiles with a radio circle but no glyph, because no glyph honestly pictures "metric" or "fan oven".
- **Fade-in hook:** I added one to `Shell.tsx`, and the top bar gets a shadow once you scroll past 8px.
- **Phone recipe page:** the Add to plan, Cook mode and Save buttons move up to sit right after the photo, so the main action stays near the top.