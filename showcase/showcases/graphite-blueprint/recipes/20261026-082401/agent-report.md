I've redesigned Panful in Graphite Blueprint on every page. The final build is currently failing because of something outside the project, so my last few edits and the 404 page haven't been checked in screenshots.

**Verification status**
- Type-checking passes, and the build passed before the last few edits.
- The last full screenshot run (1440 and 390 px, light and dark) reported no sideways scroll. I compared the Today, Recipes, Recipe detail, Plan, Shopping and Settings screenshots with the spec.
- Since then I made two small CSS fixes (a doubled "·" in the recipe tag line and the spacing inside the tonight's-dinner card) and added docs files. Those edits haven't been rebuilt or screenshotted.
- **Why the build fails:** `vite build` stops with `Cannot read directory "../../../../..": The process cannot access the file because it is being used by another process`. Some process is holding a folder above the project. It started after I tried running the build through Bash, which hit the same error, so those runs probably left something running. I'm limited to the four allowed commands, so I couldn't find or stop it. Once the lock clears, `node pigment-snap.mjs` should be run again.
- **Not verified in screenshots:** the 404 page (it isn't one of the captured routes, and passing a path to `pigment-snap.mjs` failed in both shells), the dialogs and pop-ups, and the reduced-motion behaviour.

**What changed**
- **Foundation:** the spec's colour and spacing values are imported straight from `design-packages/.../tokens.css`, and appearance follows the device's light/dark setting. Inter and Geist Mono are now loaded from npm packages instead of the Google Fonts link (added to `package.json`). `src/styles.css` was rewritten with graphite surfaces, hairline edges, pill buttons, 1px indigo focus outlines, hover effects only for mouse users, and the reduced-motion rules.
- **Shell:** the sidebar follows the spec, and the product name is shown as text. Below 1024px the bottom tab bar becomes a row of wrapping pills under the header, with the same test ids.
- **Every screen** opens with a mono label and title on the left and a two-tone summary with the actions on the right. Counts and result lines are uppercase mono labels. Status is a 6px dot plus a word, and indigo appears only on checked controls, the current cook-mode step and focus.
- **Today:** the tonight's-dinner card keeps its photo. The monthly-cooking chart is drawn as columns of dots on a dimly lit panel ("quiet stage"). Week, use-it-up and saved recipes are shown in grids divided by thin lines.
- **Recipes:** filter pills, a two-option All/Saved switch, and photo cards in a line grid. The no-results state uses the spec's line drawing of stacked layers.
- **Recipe detail:** the photo sits on a quiet stage with a "FIG 1.0" caption. Tabs have a sliding underline and arrow-key support, and cook mode marks the current step with an indigo bar. Nutrition is a proper table, and the rating breakdown is drawn in dots.
- **Plan, Shopping, Settings:** the figures are in a line grid. A failed submit shows a "fields need attention" banner directly above the buttons. Settings sections are numbered "01 / 05" with the title on the left and controls on the right.
- **404:** a drawing of a broken connection with one red point, on a quiet stage.
- **New files:** `design-system/` (version and notes on where each element is used), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**Spec items I didn't apply**
- No running dot animations, shimmer or live indicators: nothing in the app actually runs in the background, and the spec allows them only while work is running.
- No placeholder drawings for missing images, because every recipe has a photo.
- No lit hero stage, row of three drawings or page-closing statement: there's no landing page, and no page ends in a single final action.

**Decisions I made**
- The 404 page now uses the spec's broken-connector drawing instead of the herbs-chopping photo, which was decoration rather than content. All recipe, tip and store photos stay with their content.
- On Settings, the top error banner keeps `role="alert"` and the new banner above the buttons has no role, so the error isn't announced twice.
- I added a few labels: "Household" in the sidebar, "Meal plan" above dialog titles, a "No results"-style caption in empty states, and a full stop at the end of empty-state titles. All other copy is unchanged, including the toast "…15 meals this month!", even though the spec avoids exclamation marks.
- Step numbers now show as "01"; they are hidden from screen readers.
- The spec has two blocks that would both set the design tokens on page load. I imported its `tokens.css` directly rather than copying it into the project; if that package folder moves, the import breaks.