Apply design system night-cartridge@0.1.0-rc.4 to this project.

The complete specification is in `design-packages/night-cartridge-0.1.0-rc.4/dist/agent.md`, with exact values in
`tokens.css` and `tokens.json` in the same folder. Read agent.md fully before changing anything, and
follow its "Existing project" section.

This is an unattended run: the plan and the first restyled screen are pre-approved, so do not stop to
ask — go through every screen. Constraints that still apply:

- Preserve every route, behavior, label text, form field, `data-testid` and accessibility attribute.
  The project's smoke tests must keep passing.
- Do not add UI libraries or CSS frameworks. Keep the existing React + CSS setup; load web fonts only as
  the specification allows.
- Support both light and dark appearance if the specification defines both.
- Do not change files under `design-packages/` or `tests/`.
- If the specification has Signature elements and Applying the concept, they are part of the restyle, not
  extras: build each signature element to its recipe as a reusable piece, and give every screen the elements
  its context calls for — dashboards, forms, settings and tables included. Their motion must work and must
  stop under `prefers-reduced-motion: reduce`.

You may run exactly these commands, from the project root and without a `cd` prefix: `npm install`,
`npm run build`, `npm run typecheck`, `node pigment-snap.mjs`.

`node pigment-snap.mjs` builds the app and writes screenshots of every page to `.snaps/` at 1440px and
390px wide, light and dark, and lists any page that scrolls sideways. `node pigment-snap.mjs /some/path`
screenshots only the paths you name, which need not be existing pages: when the specification asks you to
look at a piece on its own (larger, or on a blank page), add a temporary route for it, snap it, and remove the
route before you finish. Use it: after the main restyle,
run it, open every PNG, compare what you see with the specification (especially mobile and dark), fix
what is wrong, and run it again. Finish only when the build passes, nothing scrolls sideways and the
screenshots match the specification. End with a short report: what you changed,
anything in the specification you could not apply, and anything you had to decide yourself.
