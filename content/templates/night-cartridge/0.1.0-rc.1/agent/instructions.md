## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json` into the theme); never retype values. Night (dark) follows `prefers-color-scheme` unless `[data-theme]` overrides it; design and review night first, it is the canonical look.
3. Load the fonts (the links in Pixel type) and set up the root: the three-line motion and shape block from Signature elements, the type base, global `:focus-visible`, `html, body{overflow-x:clip}`, the `.dither` rule under the header.
4. Build the signature elements first, as reusable pieces: `PixelScene` (with `sky`, `ridge`, `sprite`, the art classes and the hero/banner/strip/vignette sizes), `GroundStrip`, `Marker` (four directions), `Window`, `DitherRule`, `BlockMeter`, `Callout`, the stepped keyframes, the Animation switch and the Pixel body switch. Pick the app's world (one place) and draw its scenes, sprites and pixel icons before any screen.
5. Build the components with every state; place the signature elements per Applying the concept.
6. Create `design-system/` with `VERSION` (system id and the spec's update date, e.g. `night-cartridge, updated 2026-01-31`), the tokens, and `components.md`: conventions, the app's world, each scene and sprite by screen, the hue assigned to each category or entity kind.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, components, routes and tests; propose a migration plan (what changes, what stays) and wait for approval.
2. Map the tokens onto existing variables; a brand action colour becomes `color.action.primary`; remove radius, soft shadows and transition utilities as you restyle.
3. Build the signature elements, then restyle one representative screen as a sample (header with dither and marker, its scene window, ground strip, one marker list) and wait for review.
4. Continue screen by screen, one commit each. Never add delays, fake loading states or `role="status"` regions the screen did not have. Missing images become pixel sprites (Imagery); spinners become the ellipsis or a meter. Adding the Animation and Pixel body switches to the header is expected.
5. Preserve routes, logic, API contracts, form fields, validation, test ids, text used by tests and accessibility attributes. Restyle existing markup; keep native inputs (visually replaced, still the real element).
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; semantic tokens and existing components, no hard-coded values.
- Every new screen gets the signature elements its context calls for; a screen without the marker, the dither header, a scene and the ground strip is unfinished. New scenes stay in the app's world with a new crop or prop.
- Uncovered needs: compose from tokens and note it in `components.md`; conflicting requests (rounded corners, a brand gradient, a spinner, bold headings, smooth animation): present options.

## Verification

- Build and tests pass; no raw colours, sizes or radii outside the token files.
- Review under reduced-motion emulation: every scene, light, meter and label is complete and readable on frame 1, and no animation runs. Then review with motion allowed: lights blink out of sync, travel jumps 4px per step, nothing tweens. Never change code, motion or config to review.
- Each screen at 1440px and 390px, light and dark: no sideways scroll; the scene's focal sprite visible at 390px; art never behind text or data; pixel edges crisp (integer scale, `crispEdges`).
- Tab through every screen: the gold ring always visible; one marker per list on the current item.
- Per screen: one gold button, one scene plus the ground strip, at most 3 four-sided windows, no rounding, no bold, only the pixel faces (plus the readable body when switched).
- Walk the ten rules and the Never list (scenes original, from the app's world). Report files changed, what you could not apply, and your decisions.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and signature pieces are separate commits, reverted last.
