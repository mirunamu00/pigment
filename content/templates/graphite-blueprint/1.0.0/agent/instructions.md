## New project

1. Inspect the stack; propose an installation plan and wait for approval. Ask which appearances the product supports. Both: tokens.css follows the device setting; a theme switch sets `data-theme` on `html` only if the product has or asks for one. One: dark (`<html data-theme="dark">`, `color-scheme: dark`) unless the user asks for light.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json` into the theme); never retype values.
3. Load Inter (variable, weights 400, 510 and 590) and Geist Mono 400 with `font-display:swap`. Root: body `color.surface.default`, `color.text.body`, sans `font.size.body`, `font.lineHeight.body`, `font.tracking.body`; headings primary; `pre, code, kbd, samp` mono; global `:focus-visible`; the reduced-motion block; `html, body{overflow-x:clip}`.
4. Build the six signature elements first, as reusable pieces: `Stage` (lit and quiet), `DotGlyph` (with its pattern data), dot field and dot meter, `Blueprint` (`slab`, `link`), `SpecPlate` (with `specKinds`), shimmer, live edge, pulse and caret classes, `Opener`, `ScreenHead` and `.mono-label`. Review them (Verification) before any screen.
5. Build the components with every state; place the signature elements per Applying the concept.
6. Create `design-system/` with `VERSION` (system id and the spec's update date, e.g. `graphite-blueprint, updated 2026-01-31`), the tokens, and `components.md`: conventions, where each signature element is used, each blueprint's subject by screen.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, components, routes and tests; propose a migration plan (what changes, what stays) and wait for approval. Ask about appearances as in New project.
2. Map the tokens onto the existing variables (alias old names so nothing breaks mid-migration). A brand action color becomes `color.action.primary` (the inverse pill), never the accent.
3. Build the signature elements, restyle one representative screen with them in place as a sample, and wait for review.
4. Continue screen by screen, one commit each. Spinners become dot glyphs; missing images become spec plates. Never add delays, fake loading or working states, or a second `role="status"` region.
5. Preserve routes, logic, API contracts, form fields and validation, test ids, text used by tests and accessibility attributes. Restyle existing markup; keep native inputs. 
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; use semantic tokens and existing components; no hard-coded colors, sizes, radii, shadows or durations.
- Every new screen gets the signature elements its context calls for in Applying the concept; a screen without them is unfinished. 
- Uncovered needs: compose from tokens and note it in `components.md`. Conflicting requests (colored primary, spinner, bold headings): present options.

## Verification

- Build and tests pass; no raw colors, sizes or radii outside the token files.
- Review loop, two rounds or more: render each signature piece alone at 2x in dark and light (on a temporary route, removed before you finish, never committed); compare with its recipe: stage light peaking at the top edge and gone by 62%; 0.5px slab strokes, tight vertices (about 8%), faces hiding what is behind; distinct lit and unlit dots on a 3-unit pitch; plate figures centered, caption bottom-left. Note at least three differences, fix, render again.
- Then each screen at 1440px and 390px, dark and light: no sideways scroll; at most 3 indigo uses; status and row actions visible; no bare `serif` or `monospace` text; frames at most two deep; captions name the item; every badge, chip and count (cart count too) legible at 2x; columns of a row end within 48px of each other (1440px); no table cell cut mid-letter at rest (390px).
- Reduced motion (emulate the media feature): nothing loops, every glyph shows its rest frame, every block is final.
- Tab through every screen: the indigo outline is always visible. Click each checkbox, radio and switch on the box itself, not its label. Run the project's end-to-end tests if the command exists; otherwise report they were not run.
- Walk the ten rules and the Never list. Report files changed, what you could not apply, and your decisions.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and the signature pieces are separate commits, reverted last.
