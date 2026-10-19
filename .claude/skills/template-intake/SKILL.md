---
name: template-intake
description: Turn a reference website into a tested Pigment design system template — capture, analysis, design prompt authoring, demo generation on the four base apps, evaluation, iteration and (after user approval) publishing. Use when the user submits a site they like, asks to add a template, or asks to iterate on a template candidate. To change a system that is already published, use template-update.
---

# Template intake

**The demo apps are the test, not the target.** A template is handed to people's own agents for products we
have never seen. The base apps are where problems show up; a rule written for one of their screens, data or copy
(even in generic words) makes the template worse for everyone else. Every fix is the general principle it is
missing; the prompt-author gets its assignment from `pnpm harness author-brief` and never reads the base apps.

Runs the pipeline in `docs/harness/README.md`. Read that file, `docs/harness/prompt-writing-rules.md`
and `docs/harness/evaluation-rubric.md` before starting. Every stage writes files; resume from whatever
already exists in `pipeline/<slug>/`.

## 0. Intake

- Choose a slug (`<reference>-study`). A domain is enough (`example.com`); pages the user names are kept
  as seeds and their locale (e.g. `/ko/`) is followed. Tracking parameters are stripped.
- The user doesn't explain the site and you don't ask. Finding what makes it distinctive is the
  pipeline's job (survey → deep capture → analyst). Never write notes on the user's behalf: a guess
  steers the analysis toward the guess. Pass `--notes` only with the user's own words, when they offered
  them.
- Find the brand terms yourself from the site (company, product and model names) — no need to ask.
- `pnpm harness intake <slug> <domain-or-urls...> --brand <terms...>` (add `--notes "<their words>"` only
  when they gave some)

## 1. Capture

`pnpm harness capture <slug>` surveys the site until it stops finding anything new (robots.txt respected;
after 20 pages without a new feature it opens only page types it hasn't seen, then stops; at most 150 pages), then captures the pages that
together cover every surveyed feature (`--deep`, default 16): screenshots,
motion with frame sequences, interactions, illustrations, structure, theme. It takes a while — run it in
the background and report progress. If pages block automation or show a cookie wall, tell the user and
continue with what worked. Read `reference/capture-report.md` before delegating.

## 2. Analysis — delegate to the `reference-analyst` agent

Give it the slug. It decides from the evidence what makes the site distinctive and audits the whole
design language — signature elements, motion, interaction, patterns, not just the theme. The user's
notes, if any, are a hint it checks, never the scope. It writes `pipeline/<slug>/analysis.json`, and runs
`pnpm harness check-analysis <slug>` until it passes. Subagents may be blocked from writing
report-style files: if it returns the analysis.md content in its message instead, save it yourself to
`pipeline/<slug>/analysis.md` and set `intake.json` status to `analyzed`. The same applies to the
design-critic's JSON.

**Checkpoint 1 (stop here):** show the user the character summary, the survey (pages, page types,
site-wide features), every signature element with an evidence image (motion frame sheets included), the
motion and interaction patterns, the proposed template name and tags, the ten defining rules, the gaps it
will fill by derivation, and what will not be carried over. Wait for approval or corrections.

Anything the analysis derives rather than measures (a light mode for a dark-only reference, a palette
step, a font substitute) is shown as a rendered swatch, never only in words: `check-analysis` writes
`pipeline/<slug>/derived-swatches.png` (and `.html`) — show it at the checkpoint.

## 3. Authoring — delegate to the `prompt-author` agent

- First iteration: `pnpm harness scaffold <id>@0.1.0-rc.1 --name "<Name>"`, then the author fills the
  package from the analysis.
- Later iterations: `pnpm harness scaffold <id>@0.1.0-rc.<n> --name "<Name>" --from <id>@0.1.0-rc.<n-1>`,
  and the author applies the fixes from the last evaluation. Scaffold refuses a new candidate once one has
  passed, and past the fourth: those are the user's call (rubric → "When to stop").
- The author runs `pnpm harness validate` and `pnpm harness bundle` until validation is clean.

## 4–6. Screen, confirm, holdout check

Three stages, in order; the harness refuses them out of order (rubric → "Stages"). Run each generation in the
background and report progress; never queue a second generation behind the first. Once per machine first:
`pnpm harness baseline`.

1. **Screen** (one sample of the four main apps): `pnpm harness generate <id>@<rc>`, then
   `pnpm harness evaluate <id>@<rc>`, then `pnpm harness review <id>@<rc>`.
2. **Confirm** (only after a passing screen; two more samples, plus one run of each holdout app):
   `pnpm harness generate <id>@<rc> --samples 2 --holdout`, then `pnpm harness evaluate <id>@<rc> --samples 3`,
   then `pnpm harness review <id>@<rc>`.
3. **Holdout check** (only after a passing confirm): `pnpm harness evaluate <id>@<rc> --holdout`, then
   `pnpm harness review <id>@<rc> --holdout`. The holdout runs were made with the confirm; they are judged only
   now, so a candidate that failed on the main apps never learns from them.

`review` is the critic: the harness builds the checklist and comparison sheets, runs the reviewers and a lead
reviewer, checks that every item was answered, and merges the verdict. Never write, edit or extend a reviewer
prompt, never edit a critic file, and never review by delegating to an agent yourself. If you disagree with a
severity, change it only with `pnpm harness critic <ref> <file> --override "<phrase>=<severity>=<reason>"`, which
is recorded in the report. A review that ends "incomplete" gives no verdict: run it again; do not pass it.

On `fail` (any stage): scaffold the next rc from this one, run `pnpm harness author-brief <id>@<rc> --next
<next-rc>` and give the prompt-author that file's content verbatim — never a hand-written list of what the demo
screens got wrong. On a pass of the holdout check: stop and go to step 7; minors go to the user as a list.
At most four candidates (scaffold enforces it) — then stop and report the failure analysis.

## 7. Approval and publish

**Checkpoint 2 (stop here):** show the user `review-<n>.html` (screenshots of all four apps, desktop and
mobile, light and dark), the reference screenshots, the gate table, the review's findings and coverage, and the iteration
log, and the critic's minors as a list of known flaws. Only on explicit approval:

1. `pnpm harness scaffold <id>@<final> --name "<Name>" --from <id>@<last-rc>` (e.g. 1.0.0), and write the
   public `## <final>` changelog entry: what the system is, in plain words, with no version numbers or
   pipeline notes (`docs/harness/updating.md` → Changelog). Show it to the user with the screenshots.
2. `pnpm harness publish <id>@<final> --approved-by "<user's name>" --carry-from <last-rc>`: the final version
   is the last candidate's design, so it ships on that candidate's passing evaluation and screenshots
   (another run of the same prompt adds a sample, not proof). Publish refuses if any design file differs —
   then generate, evaluate and critic the final version and publish without `--carry-from`.
3. Set `status` in `pipeline/<slug>/intake.json` to `published`.
4. Commit on a `feat/<id>` branch and open a PR (`CONTRIBUTING.md`); merge when the user asks and CI is green.

Report what was published and where the gallery assets are.
