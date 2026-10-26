Set up design system felt-tip-market in this codebase, then build the product below with it.

The complete specification is in `design-packages/felt-tip-market/dist/agent.md`, with exact values in `tokens.css` and
`tokens.json` in the same folder. Read agent.md fully before building anything, and follow its "New project"
section.

The product:

A small-batch coffee roaster that ships freshly roasted beans on a subscription. Build its marketing site: a home page that explains the offer, how the subscription works, this month's coffees, what subscribers say and common questions; and a plans page where people compare the three plans and pick one.

This is a new, empty React + Vite + React Router project. Write the product's own copy and content; there are
no image files and no network access. This is an unattended run: the installation plan is pre-approved, so do
not stop to ask. The product supports both light and dark appearance and follows the system setting.
Constraints that still apply:

- Do not add UI libraries or CSS frameworks. Keep React + CSS; load web fonts only as the specification allows.
- Do not change files under `design-packages/`.
- List every page you built in `pigment.app.json` under `routes` (`{ "path": "/plans", "name": "Plans",
  "capture": true }`), with fixed paths a browser can open directly. Those pages are what gets screenshotted.
- If the specification has Signature elements and Applying the concept, they are part of the build, not
  extras. Their motion must work and must stop under `prefers-reduced-motion: reduce`.

You may run exactly these commands, from the project root and without a `cd` prefix: `npm install`,
`npm run build`, `npm run typecheck`, `node pigment-snap.mjs`.

`node pigment-snap.mjs` builds the app and writes screenshots of every page in `pigment.app.json` to
`.snaps/` at 1440px and 390px wide, light and dark, and lists any page that scrolls sideways.
`node pigment-snap.mjs /some/path` screenshots only the paths you name. `node pigment-snap.mjs --measure
/some/path "<css selector>"` prints the measured box, spacing, type and borders of the matching elements (add
`--mobile` or `--dark`). Use it: after building, run it, open every PNG, compare what you see with the
specification (especially mobile and dark), fix what is wrong, and run it again. Finish only when the build
passes, nothing scrolls sideways and the screenshots match the specification. End with a short report: what
you built, anything in the specification you could not apply, and anything you had to decide yourself.
