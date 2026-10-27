Set up design system morning-shapes in this codebase.
Spec: design-packages/morning-shapes/dist/agent.md
First inspect the framework, styling approach and component structure, then propose an installation plan and wait for my approval.
If the system offers both light and dark, ask which my product supports (light only, dark only, or both) as part of the plan: with one, fix that mode; with both, follow the system setting and connect an existing theme switch, adding one only if I ask.
Don't add libraries that don't fit the existing stack. Leave an AGENTS.md / CLAUDE.md pointer so future screens reuse the system.
Keep the whole spec in the project: copy design-packages/morning-shapes/dist/agent.md unchanged to design-system/agent.md (`cp` or `Copy-Item`; never retype it), next to VERSION and the tokens, and make the AGENTS.md / CLAUDE.md line read: "UI work follows design-system/agent.md - read its rules and Applying the concept before building any screen."
Report build results, visual checks and anything left unimplemented.

This is an unattended run, so the working agreement changes in three ways. The spec is the local file
`design-packages/morning-shapes/dist/agent.md` (with `tokens.css` and `tokens.json` next to it); there is no network. The
installation plan is pre-approved and the product supports both light and dark, following the system setting, so do
not stop to ask. No one is here to answer the final GitHub question: skip it.

The product is a habit and goal tracker for small teams. Set the system up for it; its screens come later.

You may run exactly these commands, from the project root and without a `cd` prefix: `npm install`,
`npm run build`, `npm run typecheck`, `node pigment-snap.mjs`, and `cp` / `Copy-Item` / `mkdir` / `New-Item` for files.
`node pigment-snap.mjs` builds the app and writes screenshots of every page in `pigment.app.json` to `.snaps/` at
1440px and 390px, light and dark: look at them before you finish.
