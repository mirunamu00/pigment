{{prompt}}

Build these screens of the product: {{screens}}
List every screen you build in `pigment.app.json` under `routes` (`{ "path": "/goals", "name": "Goals",
"capture": true }`), with fixed paths a browser can open directly.

This is an unattended run: do not stop to ask; where you would ask, choose and say so in your report. You may run
exactly these commands, from the project root and without a `cd` prefix: `npm install`, `npm run build`,
`npm run typecheck`, `node pigment-snap.mjs`. `node pigment-snap.mjs` builds the app and writes screenshots of every
page in `pigment.app.json` to `.snaps/` at 1440px and 390px, light and dark; look at them and fix what is wrong
before you finish. End with a short report: what you built and which parts of the project's design system you used.
