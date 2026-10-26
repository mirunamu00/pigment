Apply design system margin-notes to this project.

The complete specification is in `design-packages/margin-notes/dist/agent.md`, with exact values in `tokens.css` and
`tokens.json` in the same folder. Read agent.md fully before changing anything, and follow its "Existing
project" section.

This is a live product with its own house design. The goal is the product as it would look if its team had
adopted this design system: a full redesign in the system, not a recolor of the current layout. Layout,
components and page composition may change wherever the specification calls for it.

This is an unattended run: the plan and the first restyled screen are pre-approved, so do not stop to ask — go
through every page. Constraints that still apply:

- Keep the product: every page and route, every feature and interaction, all copy and data, every
  `data-testid` and accessibility attribute. Nothing may stop working.
- The photos in `public/photos/` are the product's own content. Keep every one where it carries meaning (a
  coffee's photo stays with that coffee) and present them as the specification says photos are presented.
- Do not add UI libraries or CSS frameworks. Keep React + CSS; load web fonts only as the specification allows.
- Support both light and dark appearance if the specification defines both.
- Do not change files under `design-packages/`, `public/photos/` or `pigment.app.json`.
- If the specification has Signature elements and Applying the concept, they are part of the redesign, not
  extras. Their motion must work and must stop under `prefers-reduced-motion: reduce`.

You may run exactly these commands, from the project root and without a `cd` prefix: `npm install`,
`npm run build`, `npm run typecheck`, `node pigment-snap.mjs`.

`node pigment-snap.mjs` builds the app and writes screenshots of every page to `.snaps/` at 1440px and 390px
wide, light and dark, and lists any page that scrolls sideways. `node pigment-snap.mjs /some/path` screenshots
only the paths you name. `node pigment-snap.mjs --measure /some/path "<css selector>"` prints the measured box,
spacing, type and borders of the matching elements (add `--mobile` or `--dark`). Use it: after the redesign,
run it, open every PNG, compare what you see with the specification (especially mobile and dark), fix what is
wrong, and run it again. Finish only when the build passes, nothing scrolls sideways and the screenshots match
the specification. End with a short report: what you changed, anything in the specification you could not
apply, and anything you had to decide yourself.
