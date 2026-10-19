## New project

1. Inspect the stack; propose an installation plan and wait for approval. Ask which appearances the product supports. Both: tokens.css follows the device; a theme switch sets `data-theme` on `html` only if the product has or asks for one. One: dark (`<html data-theme="dark">`, `color-scheme: dark`) unless the user asks for light.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json` into the theme).
3. Self-host Inter (variable, weights 400, 510 and 590) and Geist Mono 400 (the npm font packages or local files, `@font-face` with `font-display:swap`); never a font CDN. Root: body `color.surface.default`, `color.text.body`, sans `font.size.body`, `font.lineHeight.body`, `font.tracking.body`; headings primary, `text-wrap:balance`; `p, li{text-wrap:pretty}`; `fieldset{margin:0;padding:0;border:0;min-width:0} legend{padding:0}`; `pre, code, kbd, samp` mono; global `:focus-visible`; the reduced-motion block; `html, body{overflow-x:clip}`.
4. Build the six signature elements first, as reusable pieces, one per recipe with all its helpers (`pair`, `blueprint`, `specKinds`, dot meter, `ScreenHead`, `.mono-label`). Review them (Verification) before any screen.
5. Build the components with every state; give each screen the signature elements of its closest context in Applying the concept, at that strength, using the parts the screen really has.
6. Create `design-system/` with `VERSION` (`graphite-blueprint, updated <the spec's update date>`), the tokens, and `components.md`: conventions, where each signature element is used, each blueprint's subject by screen.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, components, routes and tests; propose a migration plan and wait for approval. Ask about appearances as in New project.
2. Map the tokens onto the existing variables (aliasing old names). A brand action color becomes `color.action.primary` (the inverse pill), never the accent. Fonts and root setup as in New project step 3.
3. Build the signature elements, restyle one representative screen with them as a sample, and wait for review.
4. Continue screen by screen, one commit each.
5. Preserve routes, logic, API contracts, form fields and validation, test ids, text used by tests and accessibility attributes. Restyle existing markup; keep native inputs.
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; use semantic tokens and existing components; no hard-coded colors, sizes, radii, shadows or durations.
- Every new screen takes the signature elements of its closest context in Applying the concept, at that row's strength. A row says which elements and how strongly, never which parts a screen must have: add no panel, block or section to match it. A screen with none of the elements is unfinished.
- Uncovered needs: compose from tokens and note it in `components.md`. Conflicting requests (colored primary, spinner, bold headings): present options.

## Verification

- Build passes; run the project's unit and end-to-end tests if they exist, else report they were not run.
- Review loop, two rounds or more: render each signature piece alone at 2x, dark and light, in a temporarily edited existing page (never a new file); compare with its recipe (light falloff, 0.5px strokes, vertex rounding, hidden faces, lit and unlit dots, caption position), note three or more differences, fix, render again.
- Each screen at 1440px and 390px, dark and light: no sideways scroll; status and row actions visible; no bare `serif` or `monospace` text; each plate caption carries an attribute no label beside it shows; every badge, chip and count legible at 2x; columns of a row end within 48px of each other (1440px).
- At 390px: every nav item fully visible; a closing statement at most 2 lines; tables show only the first and the pinned column, no stray glyph, no word cut except by an ellipsis, equal rows, a badged row's second line uncut.
- Measure at 1440px and 390px and paste the numbers with the method (a browser's `getBoundingClientRect()`, or pixels ÷ 2 in a native-size 2x screenshot; never computed from CSS): each `.bp-fig` width against Signature 3 → Limits; each right-aligned head's right x (numbers, pin) beside its cells' (equal); each settings section's last visible block to the next rule, status regions empty (48); a long-form page's main blocks, header brand to footer (one left x).
- Check: blueprint-row captions and titles level; section prose beside or under its opener, no phrase or link twice in a section; every first viewport has one large headline; long-form pages put h1, meta and lead plate before the contents list; every pin head readable; no two hairlines with nothing between, no plate caption ending in an ellipsis, no "+" on a link; a failed submit focuses the first invalid field, a banner within one viewport of it; everywhere in the product, counts, result lines and a closing's label are the same uppercase `.mono-label`; a page that ends in one final action closes with it as the page close, a page without one has none; each closing sentence one line at 1440px, one tone per sentence.
- Reduced motion (emulated): nothing loops, glyphs show their rest frame, every block is final.
- Tab through every screen: the indigo outline always visible. Click each checkbox, radio and switch on the box, not its label.
- Walk the ten rules and the Never list. Check the diff: no review edit, page or script remains. Report files changed, what you could not apply, and your decisions.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and the signature pieces are separate commits, reverted last.
