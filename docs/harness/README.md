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
   │               pnpm harness evaluate|review --holdout      → the holdout check, only after the main apps passed the confirm
   │  8. iterate    pnpm harness author-brief <id>@<rc> --next <rc+1> → the author's generated assignment, then back to 4 (at most 4 candidates, each recorded; stop at the first candidate that passes the holdout check)
   │  9. approve    the user reviews screenshots + report      (human gate)
   └ 10. publish    pnpm harness publish <id>@<version>        → frozen version, registry, gallery assets
```

In Claude Code, the `template-intake` skill walks through all of it and stops at the two human checkpoints:
after the analysis (step 3) and before publishing (step 9).

**Changing a system that is already published** follows the same steps from 4 on, starting from the
published version: see [`updating.md`](updating.md) (the `template-update` skill).

## Folders

| Path | What lives there |
| --- | --- |
| `pipeline/<slug>/` | Work area for one reference submission: intake, capture, analysis, iteration log. Reference images stay local (gitignored); the measured JSON is kept |
| `content/templates/<id>/<version>/` | The product: the design prompt package (manifest, tokens, principles, components, agent instructions) |
| `content/_template/` | Skeleton copied by `pnpm harness scaffold` |
| `showcase/base-apps/` | The four neutral apps every template is applied to (dashboard, commerce, blog, settings), and the holdout apps used only to confirm (`"holdout": true`) |
| `showcase/runs/` | Per template version and app: the evaluation, critic and run records, agent reports and patches (kept in git). Screenshots, motion frames and drawing crops stay local; the gallery copies what it shows into `apps/web/public/showcase` |
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
- Screenshots in the gallery are **unedited agent output** from the standard prompt.
- A template is published only after a **human approves** the evaluation report.
