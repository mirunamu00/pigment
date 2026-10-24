## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json` into the existing theme); never retype values. Dark follows `prefers-color-scheme` unless `[data-theme]` overrides it.
3. Load Source Serif 4 400/500, Instrument Sans 400/500, JetBrains Mono 400 (`font-display: swap`). Root: the brush filters, global `:focus-visible`, the reduced-motion block, `html, body { overflow-x: clip }`, body in `color.surface.default`, `color.text.primary`, sans `font.size.body`.
4. Build the signature elements first, as reusable pieces: pictogram (frames from stroke data, play once, boil), stage and plate, write-in heading, working glyph with dot and caret, ring-control classes.
5. Build the components in list order with every state; place the signature elements as Applying the concept says, drawing an original subject for every pictogram.
6. Create `design-system/` with `VERSION` (system id and the update date the spec states, e.g. `inkleaf, updated 2026-01-31`), the tokens, and `components.md`: conventions, where each signature element is used, and the pictogram subjects already drawn.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, global styles, shared components, routes and tests; list what changes and what must be preserved.
2. Propose a migration plan and wait for approval.
3. Map the tokens onto existing variables, aliasing old names; a brand action color becomes `color.action.primary`, never the accent.
4. Build the signature elements, then restyle one representative screen as a sample — header pictogram, written-in h1 and, where Applying the concept allows, its stage — and wait for review.
5. Continue screen by screen, one commit each. Keep the information structure. Placeholder images become plates; spinners become the glyph.
6. Preserve routes, business logic, API contracts, form fields and validation, test ids, text used by tests (split headings keep their exact text), accessibility attributes. Restyle existing markup; never replace native inputs.
7. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; use semantic tokens and existing components, never hard-coded values.
- Every new screen gets the signature elements its context calls for; a screen without them is unfinished. New pictograms get new subjects.
- Uncovered needs: compose from tokens and note it in `components.md`. Conflicting requests (a bright brand color, a spinner, bold headings): present options.

## Verification

- Build and tests pass; no raw colors, sizes or radii outside the token files.
- Each screen at 1440px and 390px, light and dark: no sideways scroll; statuses and row actions visible.
- Tab through every screen: focus visible everywhere. Click every checkbox, radio and switch: each toggles.
- Pictograms are original, step in on entering view and hold; at most one large per viewport, one accent fill per page; at most one stage per viewport on dense screens; h1s write in once; the glyph runs only while working.
- Reduced motion: final frames, whole headings, still loops, everything readable.
- Walk the ten rules and the Never list. Report files changed, what you could not apply, and decisions you made.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and signature pieces are separate commits; revert them last to restore the previous look.
