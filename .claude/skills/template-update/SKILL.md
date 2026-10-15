---
name: template-update
description: Change a Pigment design system that is already published — fix a rule, change tokens, add or change a component — as a new internal version that is re-applied to the four base apps, evaluated, approved and published with a public changelog entry. Use when the user asks to fix, update, improve or extend an existing system. For a brand-new system, use template-intake.
---

# Template update

Runs `docs/harness/updating.md`. Read it first, with `docs/harness/prompt-writing-rules.md` and
`docs/harness/evaluation-rubric.md`. Talk to the user about the change and its dates, never about version
numbers — those are internal.

## 1. Goal

- Find the system: `content/registry.json` (`latest` is the current published version) and its
  `manifest.provenance.analysis` for the pipeline slug.
- Pin down what should change and why. Append it to `pipeline/<slug>/iterations.md` with today's date.
- Pick the next version (patch for wording only, minor for anything visible — `updating.md` has the
  table). If the change would give the system a different character, stop and suggest a new system.

## 2. Candidates

- `pnpm harness scaffold <id>@<next>-rc.1 --name "<Name>" --from <id>@<current>`
- Delegate to `prompt-author` with the goal; it edits, adds a `## <next>-rc.1` changelog entry and loops
  on `pnpm harness validate` / `bundle`.
- `pnpm harness generate <id>@<next>-rc.1` (background, report progress), `pnpm harness evaluate`, then
  the `design-critic` agent with the published version's runs for comparison, then `pnpm harness critic`.
- On `fail`, iterate from the last candidate (`--from <id>@<next>-rc.<n-1>`), at most three times.

## 3. Approval (stop here)

Show the user: the published and the candidate screenshots side by side for all four apps, the gate
table, the critic scores (and anything that got worse), and the **draft public changelog entry** —
an opening paragraph of what people will notice plus concrete bullets. Wait for an explicit yes.

## 4. Publish

1. `pnpm harness scaffold <id>@<next> --name "<Name>" --from <id>@<last-rc>`
2. Write the final `## <next>` entry in the public format, covering everything since the published
   version; `pnpm harness validate` must pass (it lints the entry).
3. `pnpm harness publish <id>@<next> --approved-by "<user's name>" --carry-from <last-rc>` — it reuses the
   last candidate's passing evaluation and screenshots and refuses if any design file differs (then
   generate, evaluate and critic the final version and publish without it). This also bumps the MCP package.
4. Work on a `fix/<id>-<topic>` branch and open a PR (`CONTRIBUTING.md`); merge when the user asks and CI
   is green. Merging deploys the site; CI releases `pigment-mcp`.

Report in plain words: what changed, the date it will show, and that projects already using the system
keep their copy until they ask their agent to update.
