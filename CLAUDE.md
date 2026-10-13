# Pigment

Agent-ready design system templates. A gallery site where people pick a design system and hand a
ready-made prompt to their coding agent; an MCP server and static API that serve the same specs;
and the harness that turns a reference website into a tested, published template.

Planning: `docs/planning/` (the v0.2 spec). Approved visual design: the "Pigment — design exploration"
canvas (gallery, detail, compare, MCP, docs, mobile, interface kit).

## Layout

| Path | What |
| --- | --- |
| `apps/web` | Next.js site (static), static JSON API under `/api/v1`, spec URLs and the `/mcp` route |
| `packages/schema` | zod contracts + emitted JSON Schema. Change contracts here first |
| `packages/content` | Reads `content/` for the site and the MCP server |
| `packages/harness` | `pnpm harness <command>` — the template pipeline |
| `packages/mcp` | MCP server: stdio CLI published to npm with a content snapshot, and the site's `/mcp` route. Deploy steps: `docs/deploy.md` |
| `content/templates/<id>/<version>/` | Template packages (the product). `content/_template/` is the skeleton |
| `showcase/base-apps/` | The four neutral apps every template is tested on |
| `pipeline/<slug>/` | Work area for one reference submission |
| `docs/harness/` | Pipeline, prompt-writing rules, evaluation rubric, analysis guide |

## Commands

- `pnpm install` · `pnpm build` · `pnpm typecheck` · `pnpm test`
- `pnpm dev` — the site
- `pnpm harness --help` — pipeline commands; `pnpm check:content` before committing content

## Adding or updating a template

- New system: the `template-intake` skill. It runs the whole pipeline and stops twice for the user: after
  the analysis, and before publishing.
- Change to a published system: the `template-update` skill (`docs/harness/updating.md`). It re-runs the
  pipeline on a new internal version and stops before publishing.
- Never publish without the user's explicit approval. The changelog entry of a final version is public
  (system page, MCP `get_changelog`): plain summary, concrete bullets, no version numbers — validate lints it.

## Rules

- Templates are derived design languages, never clones: no reference logos, names, copy, imagery or
  proprietary fonts. Follow `docs/harness/prompt-writing-rules.md`.
- Published template versions are immutable (`content/published.json` holds their hashes). Fix by
  publishing a new version.
- Versions are internal. The site, API, MCP tools and prompts always serve the current system and never
  show a version number; people and agents see the update date and a dated changelog
  (`getHistory`). Old versioned spec URLs stay only so shared links keep working. The harness still builds a zip per
  version for the record, but the site doesn't serve it: agent.md is the offline format.
- Gallery screenshots are unedited agent output. Never retouch or hand-pick across runs without saying so.
- The platform UI follows the interface kit: ink and paper, no brand color; watercolor bloom, tape and
  pencil notes only at the edges and never inside a template preview.
- Base apps: restyle-safe means every `data-testid`, route and behavior is preserved. Their smoke tests
  are the contract.
