---
name: template-update
description: Change a Pigment design system that is already published — fix a rule, change tokens, add or change a component — as a new internal version that is re-applied to the four base apps, evaluated, approved and published with a public changelog entry, then shown on the showcase products. Use when the user asks to fix, update, improve or extend an existing system. For a brand-new system, use template-intake.
---

# Template update

**The demo apps are the test, not the target.** A template is handed to people's own agents for products we
have never seen. The base apps are where problems show up; a rule written for one of their screens, data or copy
(even in generic words) makes the template worse for everyone else. Every fix is the general principle it is
missing; the prompt-author gets its assignment from `pnpm harness author-brief` and never reads the base apps.

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
- Delegate to `prompt-author` with the goal, stated as a general change (what should hold for any product), never
  as a list of demo screens; it edits, adds a `## <next>-rc.1` changelog entry and loops
  on `pnpm harness validate` / `bundle`.
- Then the three stages of `template-intake` steps 4–6, on `<id>@<next>-rc.<n>`: screen (`generate`,
  `evaluate`, `review`, then the user's direction check and `direction --approved-by`), confirm (`generate --samples 2 --holdout`, `evaluate --samples 3`, `review`), holdout
  check (`evaluate --holdout`, `review --holdout`). `review` compares with the published version on its own.
  Never write or extend reviewer prompts or edit critic files; severity changes only via `critic --override`.
- On `fail`, scaffold the next candidate from the last one (`--from <id>@<next>-rc.<n-1>`), run
  `pnpm harness author-brief <id>@<next>-rc.<n-1> --next <next>-rc.<n>` and give the prompt-author that file's
  content verbatim; scaffold stops at four candidates. After a passing holdout check, stop: the remaining gaps go
  to the user as a list.

## 3. Approval (stop here)

Show the user: the published and the candidate screenshots side by side for all four apps, the gate
table, the review's findings and coverage (and anything that got worse), and the **draft public changelog entry** —
an opening paragraph of what people will notice plus concrete bullets. Wait for an explicit yes.

## 4. Publish

1. `pnpm harness scaffold <id>@<next> --name "<Name>" --from <id>@<last-rc>`
2. Write the final `## <next>` entry in the public format, covering everything since the published
   version; `pnpm harness validate` must pass (it lints the entry).
3. `pnpm harness publish <id>@<next> --approved-by "<user's name>" --carry-from <last-rc>` — it reuses the
   last candidate's passing evaluation and screenshots and refuses if any design file differs (then
   generate, evaluate and critic the final version and publish without it). This also bumps the MCP package.
4. `pnpm harness showcase <id>@<next>`: the new version applied to the showcase products, which replaces what
   the site shows of the system (`pnpm check:content` fails until it is there). Show the user the result.
5. Work on a `fix/<id>-<topic>` branch and open a PR (`CONTRIBUTING.md`); merge when the user asks and CI
   is green. Merging deploys the site; CI releases `pigment-mcp`.

Report in plain words: what changed, the date it will show, and that projects already using the system
keep their copy until they ask their agent to update.
