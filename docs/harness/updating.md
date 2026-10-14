# Updating a published system

How a published system gets fixed or improved. A published version never changes, so every update is a
new version that goes through the same pipeline as a new system — authored, applied to the four base apps,
evaluated, reviewed by the critic and approved by a person.

In Claude Code, the `template-update` skill runs this and stops for approval before publishing.

## What people see

Nothing about versions. The site, the API, the MCP tools and the prompts always serve the current system;
what people and agents see is the **update date** and a **dated changelog** (the system page, and the MCP
`get_changelog` tool). Version numbers stay internal — they name folders and keep each release immutable,
with its gallery screenshots attached.

Projects that already use a system are never changed by an update. They keep the copy in their
`design-system/` folder, and `design-system/VERSION` says which system and which date it came from
(`margin-notes, updated 2026-10-12`). When someone asks their agent to update, the agent reads the
changelog and applies only the entries dated after that date. That is why changelog bullets must be
concrete enough to apply (see [Changelog](#changelog)).

## Pick the next version

| Change | Next version | Example |
| --- | --- | --- |
| Wording and clarity only — no value, rule or visual change | patch | 1.0.0 → 1.0.1 |
| Anything that changes how screens look or behave: token values, rules, components added or changed | minor | 1.0.0 → 1.1.0 |
| A different character | don't — make a new system (new id) | |

Candidates are `<next>-rc.1`, `-rc.2`, …; only the final version is published.

## Steps

1. **Write down the goal.** Append a section to `pipeline/<slug>/iterations.md` (the slug is in the
   manifest's `provenance.analysis`): the date, what should change and why — user feedback, a bug in an
   agent's output, a missing component.
2. **Scaffold a candidate from the current version.**
   `pnpm harness scaffold <id>@<next>-rc.1 --name "<Name>" --from <id>@<current>`
3. **Author.** The `prompt-author` agent makes the change and adds a `## <next>-rc.1` changelog entry
   (candidate entries are internal; notes about scores and gates are fine there).
4. **Validate and bundle** until clean: `pnpm harness validate <id>@<next>-rc.1`, `pnpm harness bundle …`.
5. **Generate, evaluate, critic** — same as for a new system (`docs/harness/README.md` steps 6–7). The
   critic also compares with the current version's runs (`showcase/runs/<id>/<current>/`): an update must
   not make any app worse.
6. **Iterate** with new candidates (`--from <id>@<next>-rc.<n-1>`), at most three.
7. **Approval (stop here).** Show the person the current and the candidate screenshots side by side, the gate
   table, the critic scores and the draft public changelog entry. Wait for an explicit yes.
8. **Final version.**
   - `pnpm harness scaffold <id>@<next> --name "<Name>" --from <id>@<last-rc>`
   - Write the `## <next>` entry in the public format below. It covers **everything since the current
     published version**, not just the last candidate.
   - `generate` + `evaluate` + critic on the final version — the gallery screenshots must come from the
     published version itself.
   - `pnpm harness publish <id>@<next> --approved-by "<name>"`
9. **Open a pull request** from a `fix/<id>-<topic>` branch (`CONTRIBUTING.md`) and merge it once CI is
   green. The rest is automatic:
   - Vercel deploys the site: the new date, changelog entry and screenshots appear.
   - `publish` bumped `packages/mcp/package.json`, so CI releases a new `pigment-mcp` with the update
     bundled (npm trusted publishing; see `docs/deploy.md`).

### Metadata only: a new name or description

When only the manifest's `name` or `description` changes, nothing an agent builds from has changed, so
the apps are not generated again:

1. `pnpm harness scaffold <id>@<next> --name "<New name>" --from <id>@<current>` (edit `description` in the
   manifest if that is what changes) and write the public `## <next>` entry.
2. Validate, then after the person's yes:
   `pnpm harness publish <id>@<next> --approved-by "<name>" --carry-from <current>`. It reuses the current
   version's evaluation and screenshots, and refuses if any token, principle, component or instruction
   file differs — then it is a design change and takes the full steps above.

The `id` never changes: shared links, spec URLs and MCP calls keep working. A system made from this
platform's own design may carry its brand in the name (`ownBrand: true` in its `intake.json`); its prose
still never mentions it.

## Changelog

`CHANGELOG.md` accumulates: the newest entry on top, older ones kept below. The entry of a final version
is public and has a fixed shape — `pnpm harness validate` checks it.

```markdown
## 1.1.0

Tables are denser and buttons have a softer corner. Dark surfaces are slightly warmer.

- `radius.md` 8px → 10px; buttons, inputs and selects follow it.
- `size.rowDefault` 44px → 40px for table rows; headers keep 44px.
- New component `pagination`: anatomy, states and token mapping in components/pagination.md.
```

- **Opening paragraph** — what people will notice, in one to three plain sentences. The system page shows
  it under the publish date.
- **Bullets** — one change each, concrete enough for an agent to apply to a project that already has the
  system: name the token, component or rule, and the old and new value.
- **No version numbers, candidate names or pipeline notes** (critic, gates, scores, iterations) — people
  only see dates, and those notes belong in `pipeline/<slug>/iterations.md`. **[lint]**
- **No date** — it comes from publishing.
- Text after the opening paragraph that isn't a bullet is not shown; don't rely on it.

## Never

- Edit a published folder. `pnpm check:content` (and CI) fail on any changed byte.
- Delete an old version. Its screenshots and old shared spec links still point at it.
- Publish without the person's approval of the screenshots and the changelog entry.
