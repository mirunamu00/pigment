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
- One saturated field per viewport, fields `space.8` apart and never one hue; cream header band above a large item cover; no field behind a table, form fields or long text; field text in `color.onField.*`.
- Header bands as tall as their text (about 200–260px desktop), art in the trailing 40% and no taller; action screens show the first control, primary action and feedback in the first desktop viewport; on phones no field exceeds one screen, stat tiles stay 2×2 or a scrolling row.
- Header-band art: 4–5 pieces, the lead picturing the screen's subject, no sample copied, a different lead per area; on phones in the corner. Empty states show art, never sample records. A hero vignette is one anchor, at most two chips, star and cloud touching it.
- Every full-bleed band has its arc (sag, rise or night wave); panels are `radius.xl`, unarched.
- Every product screen except dashboards opens with a header band in its area's hue, which also marks its nav dot, tags and empty state.
- Every button, tab and filter is a pill or circle on the ledge (darker on hover, sinks 2px on press); one blue pill per region; selected tab ink with a white dot.
- Shapes are flat (three hues, one crescent, no outlines, gradients or faces), never over text, data or inputs or inside tables, forms, dialogs or toasts.
- At most six glyphs loop, each on its own cycle, none above `size.glyphLg`, none in tables or by changing numbers; paused off-screen.
- An item without an image has a cover in its category hue whose pictogram names its subject, never a grey box or picture icon; neighbouring covers and plates differ. Item images stay next to the title on phones.
- Cards and option cards have no borders or shadows; no selected item on a field of a neighbouring hue; `color.field.night` is navy in dark.
- Focus is visible on every interactive element; text meets the contrast rules in this document.
- With reduced motion, glyphs rest and reveals and vignettes show their final state.
- No raw color, size or radius values were introduced outside the token files.
- Report: files changed, anything in this document you could not apply, decisions you made yourself.

## Rollback

- Each screen is its own commit, so any step can be reverted alone.
- Token installation is a separate commit; reverting it restores the previous look once the screen commits are reverted.
- The shape kit and glyphs are their own commit; they are `aria-hidden`, so removing them leaves every screen working.
