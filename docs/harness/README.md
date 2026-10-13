# Template harness

How a reference site becomes a published Pigment template. Every stage leaves files behind,
so any stage can be re-run, reviewed or handed to a different agent.

```
reference URL
   │  1. intake     pnpm harness intake <slug> <url...>        → pipeline/<slug>/intake.json
   │  2. capture    pnpm harness capture <slug>                → pipeline/<slug>/reference/  (screenshots, styles.json)
   │  3. analyze    reference-analyst agent                    → pipeline/<slug>/analysis.md + analysis.json
   │  4. author     prompt-author agent                        → content/templates/<id>/<version>/  (the design prompt package)
   │  5. validate   pnpm harness validate <id>@<version>       → schema, required tokens, contrast, prompt lint
   │  6. generate   pnpm harness generate <id>@<version>       → showcase/runs/<id>/<version>/<app>/<runId>/  (agent restyles each base app)
   │  7. evaluate   pnpm harness evaluate <id>@<version>       → gates: build, e2e, a11y, token adherence, reference similarity
   │               design-critic agent                         → scores + concrete prompt fixes
   │  8. iterate    back to 4 with the fixes (max 3 iterations, each recorded)
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
| `pipeline/<slug>/` | Work area for one reference submission: intake, capture, analysis, iteration log |
| `content/templates/<id>/<version>/` | The product: the design prompt package (manifest, tokens, principles, components, agent instructions) |
| `content/_template/` | Skeleton copied by `pnpm harness scaffold` |
| `showcase/base-apps/` | The four neutral apps every template is applied to (dashboard, commerce, blog, settings) |
| `showcase/runs/` | Agent outputs per template version and app, with screenshots and reports |
| `packages/harness/` | The CLI behind every `pnpm harness` command |
| `packages/schema/` | Data contracts (zod + emitted JSON Schema) |
| `docs/harness/` | The rules: prompt writing, evaluation rubric, analysis guide |

## Rules that never bend

- A template is a **derived design language**, never a clone. No logos, brand names, copied copy, copied
  illustrations or proprietary fonts from the reference. See `prompt-writing-rules.md` → Provenance.
- Published versions are **immutable**. Fixes ship as a new version ([`updating.md`](updating.md)).
- Versions are **internal**. Everything people and agents see is the current system, its update date and
  a dated changelog.
- Screenshots in the gallery are **unedited agent output** from the standard prompt.
- A template is published only after a **human approves** the evaluation report.
