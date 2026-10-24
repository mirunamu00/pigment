## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json`); add `color-scheme: dark` on `:root`.
3. Load the fonts (Pixel type links); set up the root block, type base, `:focus-visible` and header `.dither` (Signature elements).
4. Build the signature elements first, as reusable pieces: `PixelScene`, `GroundStrip`, `Marker`, `Window`, `DitherRule`, `BlockMeter`, `Callout`, the stepped keyframes and both header switches. Derive the app's world from its domain (Pixel stage step 1); draw 3+ prop variants, focal, ground and item sprites and icons before any screen.
5. Build the components with every state; place the signature elements per Applying the concept.
6. Create `design-system/` with `VERSION` (system id and update date), the tokens, and `components.md`: the app's world and its subjects, scenes by screen, the hue of each category.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, components, routes and tests; propose a migration plan (what changes, what stays); wait for approval.
2. Map the tokens onto existing variables (a brand action colour becomes `color.action.primary`); remove radius, soft shadows, transitions, any light theme and theme switch as you restyle.
3. Build the signature elements, restyle one screen as a sample (header with dither and marker, scene window, ground strip, a marker list), wait for review.
4. Continue screen by screen, one commit each.
5. Preserve routes, logic, API contracts, form fields, validation, test ids, text used by tests and accessibility attributes.
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; semantic tokens and existing components, no hard-coded values.
- Every new screen follows Applying the concept; new scenes follow Pixel stage step 1.
- Uncovered needs: compose from tokens and note it in `components.md`; for conflicting requests (rounding, gradients, bold, smooth motion) present options.

## Verification

- Build and tests pass; no raw colours, sizes or radii outside the token files; axe: no violations on any screen. Never change app code or config to pass a check.
- Reduced motion and the Animation switch: frame 1 complete, nothing runs (rule 7).
- Each screen at 1440px and 390px: no sideways scroll; crisp edges; tabbing always shows the gold ring.
- Numbers come from code, never by eye: scene numbers from your `put()`, `path()`, `dot()` and `light()` coordinates; show each computation. With no code runner, compute them by hand from those scene constants (lead units × unit px) and mark them "by hand".
- Item sprites pass Imagery's missing-image steps: one outline around one connected shape, attached parts touching the body and angling away from it, set-mates told apart by outline at 1x, ink about half the window.
- Controls sharing a row measure the same computed height (`size.control`; table row actions all `size.controlSm`), at 1440px and 390px.
- Progress against a real, fixed maximum has its block meter; search and filter result counts stay caption text.
- Walk the ten rules and the Never list. Write the report last; missing a part fails it: (1) variant table `variant | x positions | what differs (4+ units)`; (2) per scene ("not written" fails it), the numbers steps 3, 4 and 7 set (details by kind, lead height in units and px (banners 96+), gaps left to right, verticals' x spans, the hero's path end), its lead's subject, features and signs (per step 1), its focal group, and fixes; (3) files changed, what you could not apply, decisions.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and signature pieces are separate commits, reverted last.
