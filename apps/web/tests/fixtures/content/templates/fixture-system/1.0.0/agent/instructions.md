## New project

1. Inspect the framework, styling approach and component structure. Propose an installation plan and wait for approval.
2. Install the tokens: copy `dist/tokens.css` into the project's global styles (or map `dist/tokens.json` into the theme system the project already uses). Do not retype values.
3. Load the fonts listed in the manifest with their fallbacks, including the CJK fallback.
4. Build the base components in the order of the component list, each with every specified state.
5. Create `design-system/` in the repository with `VERSION`, the tokens, and a short `components.md` describing the conventions you established.
6. Add one line to `AGENTS.md` and `CLAUDE.md` (create them if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit: styling approach, global styles, shared components, routes, tests. List what the change would touch and what must be preserved.
2. Propose a migration plan and wait for approval.
3. Map the tokens onto the project's existing variables or theme. Keep existing variable names working (alias them) so nothing breaks mid-migration.
4. Restyle one representative screen as a sample and wait for review.
5. Continue screen by screen, one commit per screen. Adapt to the existing information structure; never force a layout from a reference image.
6. Preserve: routes, business logic, API contracts, form fields and validation, test ids, labels used by tests, accessibility attributes.
7. Finish with the `design-system/` folder and the `AGENTS.md` / `CLAUDE.md` pointer described under New project.

## Ongoing development

- Before building UI, read `design-system/`. Use semantic tokens and existing components; do not hard-code colors, sizes, radii or shadows.
- If a need is not covered by the system, compose from existing tokens, then note it in `design-system/components.md`.
- If a request conflicts with the system, present the options instead of deciding silently.

## Verification

- The project builds and its tests pass.
- Every screen was checked at 1440px and 390px wide, in light and dark if both are defined.
- Focus is visible on every interactive element; text meets the contrast rules in this document.
- No raw color, size or radius values were introduced outside the token files.
- Report: files changed, anything in this document you could not apply, decisions you made yourself.

## Rollback

- Each screen is its own commit, so any step can be reverted alone.
- Token installation is a separate commit; reverting it restores the previous look once the screen commits are reverted.
