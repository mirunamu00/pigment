## New project

1. Inspect the framework, styling approach and component structure. Propose an installation plan, including the area-to-hue map (rule 2), and wait for approval.
2. Install the tokens: copy `dist/tokens.css` into the project's global styles (or map `dist/tokens.json` into the theme system the project already uses). Do not retype values. Dark mode follows `prefers-color-scheme`; `data-theme="dark"` or `"light"` on the root forces a mode.
3. Load Figtree (400, 500, 700) and DM Mono (400) with their fallbacks, including the CJK fallback. Set `font.family.sans` and `color.text.primary` on the body and `color.surface.default` on the page.
4. Build the signature elements first, as reusable pieces: hue classes and field bands (sag, rise, header band with its cluster, panel, night wave); the shape kit (crescent disc, two-color disc, sparkle, cloud, spot plate, confetti, item cover) with 6–10 original pictograms, each of a subject noun from this product; breathing glyphs, the pop-dots loader and the choice row; every pill variant, tab pill and circle; the vignette; the reveal helper. Then the Interaction states.
5. Build the base components in the order of the component list, each with every specified state. Place the signature elements as Applying the concept says.
6. Create `design-system/` with `VERSION` (system id and update date, e.g. `morning-shapes, updated 2026-01-31`), the tokens, and a short `components.md` of your conventions: the area-to-hue map, the pictogram subjects, where each signature element is used.
7. Add one line to `AGENTS.md` and `CLAUDE.md` (create them if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit: styling approach, global styles, shared components, routes, tests. List what the change would touch and what must be preserved.
2. Propose a migration plan, including the area-to-hue map, and wait for approval.
3. Map the tokens onto the project's existing variables or theme. Keep existing variable names working (alias them) so nothing breaks mid-migration.
4. Build the signature elements as reusable pieces, then restyle one representative screen as a sample (area header band with its arc, pills on the ledge, shapes or a glyph as Applying the concept places them) and wait for review.
5. Continue screen by screen, one commit per screen. Adapt to the existing information structure; never force a layout from a reference image.
6. Preserve: routes, business logic, API contracts, form fields and validation, test ids, labels used by tests, accessibility attributes.
7. Finish with the `design-system/` folder and the `AGENTS.md` / `CLAUDE.md` pointer described under New project.

## Ongoing development

- Before building UI, read `design-system/`. Use semantic tokens and existing components; do not hard-code colors, sizes, radii or shadows.
- Every new screen gets the signature elements its context calls for in Applying the concept — a new screen without them is unfinished. A new top-level area takes the next hue in the map.
- New pictograms and compositions follow the shape-kit rules (flat, at most three hues, one crescent, no outlines, no faces); reuse the kit before drawing more.
- If a need is not covered by the system, compose from existing tokens, then note it in `design-system/components.md`.
- If a request conflicts with the system, present the options instead of deciding silently.

## Verification

- The project builds and its tests pass.
- Every screen was checked at 1440px and 390px wide, in light and dark.
- One saturated field per viewport; fields at least `space.8` apart and never the same hue; a detail screen with a large item cover has a cream header band; no field behind a table, form fields or long text; field text uses its `color.onField.*` token.
- Header-band art: 4–5 pieces filling about 42% of the band on desktop, its lead picturing the screen's subject, no sample copied, a different lead per area; on phones 72–96px in the band's corner, never a row of their own. Empty states show art, never sample records.
- Every full-bleed band has its arc (sag below a top band, rise above a closing band or footer, wave on night); panels are `radius.xl` and unarched.
- Every product screen except dashboards opens with a header band in its area's hue; the same hue marks that area's nav dot, tags and empty state.
- Every button, tab and filter is a pill or circle on the ledge (darker on hover, sinks 2px on press); one blue pill per region; the selected tab is ink with a white dot.
- Shapes are flat (three hues, one crescent, no outlines, gradients or faces), never over text, data or inputs, never inside tables, forms, dialogs or toasts.
- At most six glyphs loop at once, each on a different cycle, none larger than `size.glyphLg`, none in tables or next to changing numbers; they pause off-screen.
- No item without an image shows a grey box or a picture icon: it has a cover in its category hue whose pictogram names its subject; no two neighbouring covers or plates share one drawing. Images that picture the item stay next to its title on phones.
- Cards, option cards included, have no borders or shadows; a selected item never sits on a field of a neighbouring hue; `color.field.night` is navy in dark.
- Focus is visible on every interactive element; text meets the contrast rules in this document.
- With reduced motion, glyphs rest, reveals and vignettes show their final state, every screen stays readable.
- No raw color, size or radius values were introduced outside the token files.
- Report: files changed, anything in this document you could not apply, decisions you made yourself.

## Rollback

- Each screen is its own commit, so any step can be reverted alone.
- Token installation is a separate commit; reverting it restores the previous look once the screen commits are reverted.
- The shape kit and glyphs are their own commit; they are `aria-hidden`, so removing them leaves every screen working.
