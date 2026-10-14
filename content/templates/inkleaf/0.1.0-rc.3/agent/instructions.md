## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json` into the theme); never retype values. Dark follows `prefers-color-scheme` unless `[data-theme]` overrides it.
3. Load Source Serif 4 400/500, Instrument Sans 400/500, JetBrains Mono 400 (`font-display: swap`). Root: the brush filters, global `:focus-visible`, the reduced-motion block, `html, body { overflow-x: clip }`, body `color.surface.default`, `color.text.primary`, sans `font.size.body`.
4. Build the signature elements first, as reusable pieces: pictogram (stepped strip, play once, boil), stage, drawing stage and plate, write-in heading, working glyph and breathing dot, ring-control classes.
5. Build the components with every state; place the signature elements per Applying the concept.
6. Create `design-system/` with `VERSION` (system id and the spec's update date, e.g. `inkleaf, updated 2026-01-31`), the tokens, and `components.md`: conventions, where each signature element is used, the pictogram subjects drawn.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, components, routes and tests; propose a migration plan (what changes, what stays) and wait for approval.
2. Map the tokens onto existing variables; a brand action color becomes `color.action.primary`, never the accent.
3. Build the signature elements, then restyle one representative screen as a sample (header pictogram, written-in h1, its stage where allowed) and wait for review.
4. Continue screen by screen, one commit each. Never add delays, toasts or `role="status"` regions the screen did not have. Missing images become plates with drawings; spinners become the glyph.
5. Preserve routes, logic, API contracts, form fields, validation, test ids, text used by tests and accessibility attributes. Restyle existing markup; never replace native inputs.
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; semantic tokens and existing components, no hard-coded values.
- Every new screen gets the signature elements its context calls for; a screen without them is unfinished. New pictograms get new subjects.
- Uncovered needs: compose from tokens and note it in `components.md`; conflicting requests (brand color, spinner, bold headings): present options.

## Verification

- Build and tests pass; no raw colors, sizes or radii outside the token files.
- Each screen at 1440px and 390px, light and dark: no sideways scroll; statuses and row actions visible; product headers identical; panel rows share edges; at 390px every button label is vertically centered.
- Every stage and plate holds content, never a flat color block or an icon alone; stages 16:9 to 1:1; the blog home featured post is a drawing stage.
- Tab through every screen (focus always visible); click every checkbox, radio and switch (each toggles).
- Pictograms: original subjects; each passes the 48px silhouette test; at least half per app include a hand; each steps in as one strip (never blank) and holds. h1s write in once; the glyph runs only during real requests; no code checks for automation.
- Reduced motion: final frames, whole headings, still loops, everything readable.
- Walk the ten rules and the Never list. Report files changed, what you could not apply, and your decisions.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and signature pieces are separate commits, reverted last.
