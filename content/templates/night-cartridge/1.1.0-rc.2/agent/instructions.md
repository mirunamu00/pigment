## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json`); never retype values. The system is dark only: tokens.css sets the night values on `:root`; add `color-scheme: dark` there. Never add a light theme or a theme switch; an app that must support light is not a fit for this system.
3. Load the fonts (Pixel type links) and set up the root: the motion and shape block from Signature elements, the type base, global `:focus-visible`, the `.dither` rule under the header.
4. Build the signature elements first, as reusable pieces: `PixelScene` (the helpers, art classes, placements and per-scene detail lists), `GroundStrip`, `Marker`, `Window`, `DitherRule`, `BlockMeter`, `Callout`, the stepped keyframes and both header switches. Pick the app's world; draw 3+ prop variants, focal and ground sprites and icons before any screen.
5. Build the components with every state; place the signature elements per Applying the concept.
6. Create `design-system/` with `VERSION` (system id and update date), the tokens, and `components.md`: the app's world, scenes by screen, the hue of each category.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, components, routes and tests; propose a migration plan (what changes, what stays) and wait for approval.
2. Map the tokens onto existing variables; a brand action colour becomes `color.action.primary`; remove radius, soft shadows and transition utilities as you restyle. The app becomes dark only: remove any light theme and theme switch.
3. Build the signature elements, then restyle one screen as a sample (header with dither and marker, scene window, ground strip, a marker list) and wait for review.
4. Continue screen by screen, one commit each. No fake loading states or extra `role="status"` regions.
5. Preserve routes, logic, API contracts, form fields, validation, test ids, text used by tests and accessibility attributes. Keep native inputs (visually replaced).
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; semantic tokens and existing components, no hard-coded values.
- Every new screen follows Applying the concept; new scenes stay in the app's world with a new crop, prop and skyline seed.
- Uncovered needs: compose from tokens and note it in `components.md`; for conflicting requests (rounding, gradients, bold, smooth motion) present options.

## Verification

- Build and tests pass; no raw colours, sizes or radii outside the token files. An axe scan of every screen: no violations, no `definition-list`, `list` or `listitem` errors.
- Reduced motion: scenes, meters and labels complete on frame 1, nothing runs; with motion, lights blink out of sync and travel jumps 4px per step. Never change app code or config to pass a check.
- Each screen at 1440px and 390px: no sideways scroll; focal group visible at 390px; crisp edges; 16px and 48px type with solid 2px stems. Tab through: the gold ring always visible; one marker per list.
- Scenes passed two step 8 rounds or more. Report per scene, against the Pixel stage numbers: detail entries by kind (hero tufts and stones); prop count; the lead's height and margin over the next prop; the gaps between props left to right; tall verticals over the far ridge; the hero's rise and path; strip props' width ÷ height; the tallest flat-tone run; the fixes made. Required: a variant table `variant | x positions | what differs (4+ units)`; a scene repeating a variant without it fails.
- Still frames at 1440px: three graded layers, no gap under the sky, new ridges, detailed walls, a round moon if any; nothing under the hero Window; walls toned; vignettes and figures full small scenes; the tallest ground-strip sprite 20–24 units.
- Per screen: one gold button at most, in the content; at most 3 four-sided 4px frames; card titles flush with their icon; a chip has marker or bullet, not both; every "n of m" has a real-maximum meter; the contents list marked on load; panels in a row end level; the sidebar reaches the ground strip; no placeholder clipped at 390px.
- Dashboard panel groups each have a 32/40 h2 on the dither rule outside them. Dropdowns and custom selects open with the current or first option highlighted, before any key.
- Walk the ten rules and the Never list. Report files changed, what you could not apply, and your decisions.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and signature pieces are separate commits, reverted last.
