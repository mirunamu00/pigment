# Pigment

**Give your agent a palette, not a prompt.**

Pigment is a gallery of versioned, agent-ready design systems. Pick one, hand your coding agent
(Claude Code, Codex, Cursor or any MCP client) a version-pinned prompt, and every screen it builds —
in a new project or an existing one — follows the same design language.

> Status: live at https://pigmentui.com · `npx -y pigment-mcp` · remote MCP at https://pigmentui.com/mcp

---

## Why

AI coding agents ship working screens that drift apart visually: each request fills the gaps with the
model's own defaults. One-off "make it look like X" prompts don't survive the next feature.

A Pigment system closes the gaps instead of describing a mood:

- **Measured, not adjectival.** Every rule carries a value: tokens for color, type, spacing, radius,
  elevation and motion — light and dark.
- **Rules an agent can apply anywhere.** Not page templates: decision rules that fit a dashboard, a store,
  a blog and a settings page alike.
- **Complete or honestly incomplete.** Components ship with every state specified, or are explicitly
  marked as not specified.
- **Proven on real apps.** Every version is applied by an agent to four reference apps before it is
  published. The gallery shows that output, unedited.
- **Pinned versions.** Published versions never change, so a project keeps the design it installed.

## How it works

```
Pick a system ──▶ copy a version-pinned prompt ──▶ your agent reads the spec
                                                    (MCP · spec URL · offline zip)
                                                          │
                     design-system/ + AGENTS.md pointer ◀─┘  every future screen stays on-system
```

Each system is delivered as:

| Artifact | What it is |
| --- | --- |
| `agent.md` | One document an agent reads: character, the defining rules, tokens, components, how to apply |
| `tokens.css` / `tokens.json` | Exact values, light and dark — copied, never retyped |
| Package (`.zip`) | Everything above for offline or air-gapped use |
| HTTP API | `/api/v1/design-systems/...` — list, manifest, tokens, component specs, guides |
| MCP server | The same specs as tools your agent calls while it works — remote (`<site>/mcp`) or `npx -y pigment-mcp` |

## The template harness

Templates are not drawn by hand. A reference site goes through a reproducible pipeline, with a human
approving the analysis and the final result:

```
reference site ─▶ capture & measure ─▶ analysis ─▶ design prompt package ─▶ validate
      ─▶ agent applies it to 4 base apps ─▶ evaluate ─▶ critic review ─▶ iterate ─▶ publish
```

- **Capture** screenshots every page at desktop and mobile, light and dark, and measures computed styles
  weighted by how much of the screen they cover.
- **Validate** enforces the prompt-writing rules: required tokens, WCAG contrast, no raw values in prose,
  agent-neutral wording, no reference brand terms, a size budget.
- **Generate** runs a coding agent headless, outside the repo, on four neutral base apps (dashboard,
  store, blog, settings) — the agent can screenshot its own work to check it.
- **Evaluate** gates on build, the base apps' smoke tests (functional preservation), console errors,
  accessibility (axe), horizontal overflow, and color / font / radius adherence to the template.
- **Critic** — an independent agent scores fidelity, consistency, hierarchy, rhythm, states and polish,
  and turns every weakness into a concrete fix for the next iteration.

Details: [`docs/harness/`](docs/harness/README.md).

## Repository

```
apps/web               Next.js site: gallery, system detail, compare, MCP guide, docs, /api/v1, /mcp, downloads
packages/schema        Data contracts (zod) + emitted JSON Schema
packages/content       Read-only access to published systems, shared by the site and the MCP server
packages/mcp           MCP server: six read-only tools + an apply prompt; stdio CLI (npm) and the site's /mcp route
packages/harness       `pnpm harness` — capture → prompt → demo runs → evaluation → publish
content/templates      The systems (the product); content/_template is the skeleton
showcase/base-apps     Four neutral apps every system is tested on, each with smoke tests
docs/harness           Pipeline, prompt-writing rules, evaluation rubric, analysis guide
```

## Getting started

Requires Node 22+ and pnpm.

```bash
pnpm install
npx playwright install chromium   # once: capture, screenshots, e2e tests
pnpm dev                          # http://localhost:3000
```

Checks:

```bash
pnpm typecheck
pnpm --filter @pigment/harness test     # harness unit tests
pnpm --filter @pigment/mcp test         # MCP tools over in-memory and stdio clients
pnpm --filter @pigment/web test         # site e2e against fixture content
pnpm check:content                      # systems valid, published versions untouched
```

## Adding a system

```bash
pnpm harness intake <slug> <url...> --brand <names-to-exclude>
pnpm harness capture <slug>
# analysis and authoring are done by agents (see .claude/agents), then:
pnpm harness validate <id>@<version>
pnpm harness baseline                   # once per machine
pnpm harness generate <id>@<version>
pnpm harness evaluate <id>@<version>
pnpm harness critic   <id>@<version> <critic.json>
pnpm harness publish  <id>@<version> --approved-by "<name>"
```

In Claude Code, the `template-intake` skill runs the whole pipeline and stops for approval after the
analysis and before publishing.

**Systems are derived design languages, never clones.** No logos, names, copy, imagery or proprietary
fonts are carried over from a reference. See
[`docs/harness/prompt-writing-rules.md`](docs/harness/prompt-writing-rules.md).

## Configuration

| Variable | Default | Used by |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://pigmentui.com` | prompts, spec links |
| `NEXT_PUBLIC_MCP_URL` | `<site>/mcp` | connect snippets |
| `PIGMENT_CONTENT_DIR` | `<repo>/content` | site, API and MCP server (tests use fixtures; the npm package uses its bundled snapshot) |
| `PIGMENT_WORKDIR` | `<os tmp>/pigment-runs` | where agents restyle base-app copies, outside the repo |

## Roadmap

- [x] Gallery, detail, compare, docs and MCP guide (desktop and mobile)
- [x] Static HTTP API and offline packages
- [x] Template harness with automated gates and critic review
- [x] First published system (Margin Notes 1.0.0)
- [x] MCP server (remote and `npx`), CI and the npm release workflow
- [x] Hosted at https://pigmentui.com, `pigment-mcp` on npm
- [ ] Live demo apps

## License

Not decided yet. Until a license is added, all rights are reserved.
