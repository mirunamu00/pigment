# Template harness

How a reference site becomes a published Pigment template. Every stage leaves files behind,
so any stage can be re-run, reviewed or handed to a different agent.

```
reference URL
   │  1. intake     pnpm harness intake <slug> <domain|url...> → pipeline/<slug>/intake.json
   │  2. capture    pnpm harness capture <slug>                → pipeline/<slug>/reference/  (site survey, screenshots, motion, interactions, illustrations)
   │  3. analyze    reference-analyst agent                    → pipeline/<slug>/analysis.md + analysis.json
   │               pnpm harness check-analysis <slug>         → every audit area, evidence, survey consistency
   │  4. author     prompt-author agent                        → content/templates/<id>/<version>/  (the design prompt package)
   │  5. validate   pnpm harness validate <id>@<version>       → schema, required tokens, contrast, prompt lint
   │  6. generate   pnpm harness generate <id>@<version>       → showcase/runs/<id>/<version>/<app>/<runId>/  (agent restyles each base app; one sample to screen, two more + holdout apps to confirm; refuses after a pass)
   │               pnpm harness reshoot <id>@<version>        → capture the latest runs again after the capture code changes (no agent run)
   │  7. evaluate   pnpm harness evaluate <id>@<version> [--samples 3] → agent finished and app builds (the only gates); every other check reported as evidence
   │               pnpm harness review <id>@<version>          → quality against the reference (0–5) over every screen × sample; only prompt-induced defects count; incomplete coverage = no verdict
   │               pnpm harness direction <id>@<version>      → the user approves the screen's direction against the reference (review-*/direction.html) before the confirm
   │               pnpm harness evaluate|review --holdout      → the holdout check, only after the main apps passed the confirm
   │               pnpm harness calibrate                      → the review on candidates the user already judged (showcase/calibration.json): does it agree?
   │  8. iterate    pnpm harness author-brief <id>@<rc> --next <rc+1> → the author's generated assignment, then back to 4 (at most 4 candidates, each recorded; stop at the first candidate that passes the holdout check)
   │  9. approve    the user reviews screenshots + report      (human gate)
   ├ 10. publish    pnpm harness publish <id>@<version>        → frozen version, registry
   └ 11. showcase   pnpm harness showcase <id>@<version>       → the system applied to the showcase products, exported to apps/web/public/products (what the site shows)
     check     pnpm harness flow <id>@<version>           → the new-project path: one session sets the system up in an empty project, a fresh one builds screens from what the project kept (showcase/flows/)
```

In Claude Code (`/template-intake`) and Codex (`$template-intake`), the `template-intake` skill walks
through the pipeline. It stops after the analysis (step 3), for direction approval after the first
passing screen, and before publishing (step 9).

**Changing a system that is already published** follows the same steps from 4 on, starting from the
published version: see [`updating.md`](updating.md) (the `template-update` skill).

## Codex setup and maintenance

Codex discovers project skills under `.agents/skills/` and custom agents under `.codex/agents/`.
The skills are small Codex adapters over the existing `.claude/skills/` workflows and resources;
the agents read the corresponding `.claude/agents/` role documents. No global installation is needed.
If new skills do not appear in an existing session, restart Codex in this repository.

Use `$template-intake` for a new system, `$template-update` for a published system, and
`$hyperframes`, `$hyperframes-cli` and `$hyperframes-registry` for films. The analysis and authoring
stages use isolated subagents; hosts without custom-agent selection can pass the matching TOML's
instructions to a fresh subagent. A host without subagents must report the isolation limitation.

The harness execution backend is selected for each command. Generation and review use the active host
and explicitly supplied current model; there is no Claude or Opus default. The `design-critic` custom
agent does not replace `pnpm harness review` or its generated prompts.

Update shared instructions and upstream HyperFrames resources in `.claude/`; the Codex adapters
read those files on invocation. Keep Codex-specific adaptations in `.agents/skills/` and
`.codex/agents/`. The adapters themselves are maintained in Git, not by `npx skills update`.
Do not install another copy of the same skill name into `.agents/skills/` without reconciling the adapter.

Discovery formats: [Codex skills](https://learn.chatgpt.com/docs/build-skills) and
[custom agents](https://learn.chatgpt.com/docs/agent-configuration/subagents).

## Agent and model selection

All agent-backed commands (`generate`, `review`, `calibrate`, `showcase`, `flow`) share runtime selection.
Inside Codex, the harness locates the nearest running Codex executable in its parent process chain
instead of using a potentially older `codex` on PATH. This covers IDE-bundled and desktop executables
without storing machine-specific paths in the repository. If discovery is unavailable, supply the current
executable's absolute path through process-scoped `PIGMENT_CODEX_BIN`; discovery failure stops execution.
Outside a Codex session, an explicitly selected Codex backend uses PATH unless this override is supplied.
An unambiguous `CODEX_THREAD_ID` or `CLAUDECODE` environment identifies the active host. The host must
pass its current model; launching a child CLI does not inherit the chat's model. No personal CLI config
is read to guess it. If the host is unknown/ambiguous or the model is missing, the command fails before
starting an agent. Running from a plain terminal requires an explicit provider and model.

```sh
# Substitute the actual current session values; these are placeholders, not default models.
pnpm harness generate <id>@<candidate> --agent codex --model <current-model> --reasoning-effort <current-effort>
pnpm harness review <id>@<candidate> --agent codex --model <current-model> --reasoning-effort <current-effort>
pnpm harness generate <id>@<candidate> --agent claude --model <current-model>
pnpm harness review <id>@<candidate> --agent claude --model <current-model>
```

For a command process, the host may hand off `PIGMENT_AGENT`, `PIGMENT_MODEL` and, for Codex,
`PIGMENT_REASONING_EFFORT`. Do not commit a person's current model as a repository default. An explicit
provider switch must include its own model rather than reusing model/effort settings from the old host.
Provider limits/errors fail the run; there is no automatic provider or model fallback.

Every command prints the provider/model before execution. Generation records requested and reported
models in `run.json`/`agent-meta.json`; reviews record selection in `execution.json`/`review.json`.
Changing models changes evaluation conditions: compare records and recalibrate before treating different
review models as interchangeable. Review prompts, coverage checks and verdict rules remain harness-owned.

Codex uses JSONL output and explicit `--model`. Generation preserves the active host's built-in writable
permission profile (`:workspace` or `:danger-full-access`); a read-only or unknown custom host profile is
rejected rather than silently increased. Without an active Codex host, generation uses a named workspace
profile with dependency-install network access. Reviews always use `:read-only`, regardless of host access.
Sandboxed Windows calls use the CLI's initialized elevated sandbox. Windows generation stages the public
Node/npm distribution in ignored `.cache/harness-tools` and uses standard `.cmd` shims, so private fnm/nvm
paths and PowerShell's script policy do not hide npm. Its npm cache stays under the work copy's node_modules.
It ignores personal config so it cannot silently import a different execution setup.
A failed or incomplete turn is never accepted as a finished run, even
if it emitted partial text; generation that changes no project files is also an execution failure. Claude likewise
receives explicit `--model` and retains its generation/read-only tool restrictions.

If a review was interrupted, run `pnpm harness review <ref> --resume` with the same runtime options.
It revalidates saved unit answers and reruns only unfinished units and the lead reviewer. Reuse requires
an identical plan and provider/model/effort, plus matching hashes of the prompts and evidence. For older
records without hashes, every input must predate the saved plan; the first resume then records hashes.
Changed inputs require a fresh review. Prior lead-attempt logs are preserved.
An explicit provider usage/quota exhaustion stops immediate retries and defers queued units; completed
answers stay available for the next resume. Transient rate or connection errors retain the bounded retry.

## Folders

| Path | What lives there |
| --- | --- |
| `pipeline/<slug>/` | Work area for one reference submission: intake, capture, analysis, iteration log. Reference images stay local (gitignored); the measured JSON is kept |
| `content/templates/<id>/<version>/` | The product: the design prompt package (manifest, tokens, principles, components, agent instructions) |
| `content/_template/` | Skeleton copied by `pnpm harness scaffold` |
| `showcase/base-apps/` | The four neutral apps every template is applied to (dashboard, commerce, blog, settings), and the holdout apps used only to confirm (`"holdout": true`) |
| `showcase/runs/` | Per template version and app: the evaluation, critic and run records, agent reports and patches (kept in git). Screenshots, motion frames and drawing crops stay local. Base-app runs are the test only and are never shown on the site |
| `showcase/products/` | The three showcase products (a coffee shop, a magazine, a recipe app): realistic sites with their own house design and CC0 photos. Every published system is applied to them by `pnpm harness showcase`; that is what the site and MCP `get_references` show |
| `showcase/starter/` | An empty React project for `pnpm harness flow` |
| `showcase/flows/` | Flow runs: the setup checks (spec kept in `design-system/agent.md`, pointers in CLAUDE.md and AGENTS.md), both sessions' prompts and reports; images local |
| `showcase/showcases/` | Showcase runs per system and product (records kept, images local); `_original/` holds the products as they are. The site gets WebP copies in `apps/web/public/products/` |
| `packages/harness/` | The CLI behind every `pnpm harness` command |
| `packages/schema/` | Data contracts (zod + emitted JSON Schema) |
| `docs/harness/` | The rules: prompt writing, evaluation rubric, analysis guide, and the audits that shaped them |

## Rules that never bend

- The demo apps are the **test, not the target**. A template is handed to agents for products we have never
  seen; every fix is the general principle behind a finding, and the author never reads the demo apps. See
  `prompt-writing-rules.md` → Generalize.
- A template is a **derived design language**, never a clone. No logos, brand names, copied copy, copied
  illustrations or proprietary fonts from the reference. See `prompt-writing-rules.md` → Provenance.
- Published versions are **immutable**. Fixes ship as a new version ([`updating.md`](updating.md)).
- Versions are **internal**. Everything people and agents see is the current system, its update date and
  a dated changelog.
- Screenshots in the gallery are **unedited agent output** from the standard prompt, on the showcase products.
- Showcases are **never scored, reviewed or used to change a template**: the base apps are the test.
- A template is published only after a **human approves** the evaluation report.
