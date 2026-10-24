## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json` into the theme); never retype values. Night (dark) follows `prefers-color-scheme` unless `[data-theme]` overrides it; design night first.
3. Load the fonts (the links in Pixel type) and set up the root: the three-line motion and shape block from Signature elements, the type base, global `:focus-visible`, `html, body{overflow-x:clip}`, the `.dither` rule under the header.
4. Build the signature elements first, as reusable pieces: `PixelScene` (`sky`, `ridge`, `sprite`, `row`, art classes, the four sizes), `GroundStrip`, `Marker`, `Window`, `DitherRule`, `BlockMeter`, `Callout`, the stepped keyframes and both header switches. Pick the app's world and draw at least 3 prop variants, the focal sprites, ground sprites and icons before any screen.
5. Build the components with every state; place the signature elements per Applying the concept.
6. Create `design-system/` with `VERSION` (system id and update date, e.g. `night-cartridge, updated 2026-01-31`), the tokens, and `components.md`: conventions, the app's world, scenes and sprites by screen, the hue of each category.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, components, routes and tests; propose a migration plan (what changes, what stays) and wait for approval.
2. Map the tokens onto existing variables; a brand action colour becomes `color.action.primary`; remove radius, soft shadows and transition utilities as you restyle.
3. Build the signature elements, then restyle one representative screen as a sample (header with dither and marker, its scene window, ground strip, one marker list) and wait for review.
4. Continue screen by screen, one commit each. Never add delays, fake loading states or `role="status"` regions the screen did not have. Missing images become sprites; spinners become the ellipsis or a meter; the two header switches are expected.
5. Preserve routes, logic, API contracts, form fields, validation, test ids, text used by tests and accessibility attributes. Restyle existing markup; keep native inputs (visually replaced, still the real element).
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; semantic tokens and existing components, no hard-coded values.
- Every new screen gets the signature elements its context calls for; a screen without the marker, the dither header, a scene and the ground strip is unfinished. New scenes stay in the app's world with a new crop or prop.
- Uncovered needs: compose from tokens, note it in `components.md`; conflicting requests (rounding, gradients, spinners, bold, smooth motion): present options.

## Verification

- Build and tests pass; no raw colours, sizes or radii outside the token files.
- Under reduced motion every scene, light, meter and label is complete on frame 1 and nothing runs; with motion, lights blink out of sync, travel jumps 4px per step, nothing tweens. Never change code or config to review.
- Each screen at 1440px and 390px, light and dark: no sideways scroll; focal sprite visible at 390px; art never behind text or data; crisp edges. Tab through: the gold ring always visible; one marker per list.
- Type at 1440px: 16px body and 48px display show solid 2px-wide stems; thin or blurry stems mean the wrong face, smoothing left on, or a size off the grid.
- Scenes, each still frame at 1440px: 3 depth layers; no more than half the width bare bands; 6 to 12 props, no variant three times in a row; count the lights: 3 to 8; at 200% every wall and roof has its outline, top-left highlight and bottom-right shade. Ground strip: visibly checkered grass, dotted dirt edge, 2 to 4 sprites each 24 to 48px tall.
- Per screen: one gold button, one scene plus the ground strip, count the four-sided 4px frames (at most 3; figures and newsletter are 2px), no rounding, no bold, only the pixel faces. Card titles flush with their icon; a chip shows marker or bullet, not both; panels in a row end level; no placeholder clipped at 390px.
- Walk the ten rules and the Never list. Report files changed, what you could not apply, and your decisions.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and signature pieces are separate commits, reverted last.
