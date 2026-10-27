Build this with the installed design system morning-shapes.
Follow design-system/agent.md - its rules, Applying the concept and component specs - and use its semantic tokens and the project's existing components. Don't hard-code new style values.
If the spec doesn't cover something, ask me with options before deciding.

Build these screens of the product: a "Today" screen at / with the team's habits for today, check-ins and current streaks; and a "New goal" screen at /goals/new with a form to create a goal (name, owner, cadence, target date) that validates its fields.
List every screen you build in `pigment.app.json` under `routes` (`{ "path": "/goals", "name": "Goals",
"capture": true }`), with fixed paths a browser can open directly.

This is an unattended run: do not stop to ask; where you would ask, choose and say so in your report. You may run
exactly these commands, from the project root and without a `cd` prefix: `npm install`, `npm run build`,
`npm run typecheck`, `node pigment-snap.mjs`. `node pigment-snap.mjs` builds the app and writes screenshots of every
page in `pigment.app.json` to `.snaps/` at 1440px and 390px, light and dark; look at them and fix what is wrong
before you finish. End with a short report: what you built and which parts of the project's design system you used.
