# Pigment

Agent-ready design system templates. A gallery site where people pick a design system and hand a
version-pinned prompt to their coding agent; an MCP server and static API that serve the same specs;
and the harness that turns a reference website into a tested, published template.

Planning: `docs/planning/` (the v0.2 spec). Approved visual design: the "Pigment — design exploration"
canvas (gallery, detail, compare, MCP, docs, mobile, interface kit).

## Layout

| Path | What |
| --- | --- |
| `apps/web` | Next.js site (static), static JSON API under `/api/v1`, package downloads |
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

## Adding a template

Use the `template-intake` skill. It runs the whole pipeline and stops twice for the user: after the
analysis, and before publishing. Never publish without the user's explicit approval.

## Rules

- Templates are derived design languages, never clones: no reference logos, names, copy, imagery or
  proprietary fonts. Follow `docs/harness/prompt-writing-rules.md`.
- Published template versions are immutable (`content/published.json` holds their hashes). Fix by
  publishing a new version.
- Gallery screenshots are unedited agent output. Never retouch or hand-pick across runs without saying so.
- The platform UI follows the interface kit: ink and paper, no brand color; watercolor bloom, tape and
  pencil notes only at the edges and never inside a template preview.
- Base apps: restyle-safe means every `data-testid`, route and behavior is preserved. Their smoke tests
  are the contract.
