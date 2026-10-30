# Agents

Project instructions live in `CLAUDE.md`; they apply to every coding agent working in this repository.
The template pipeline is documented in `docs/harness/README.md`.

## Codex

Project skills are discovered in `.agents/skills/`; invoke them with `$template-intake`,
`$template-update`, `$hyperframes`, `$hyperframes-cli` or `$hyperframes-registry`.
Their Codex entrypoints read the maintained workflows in `.claude/skills/`, including the upstream
HyperFrames resources, so updating those sources also updates what Codex follows.
Resolve a source document's relative links from its own directory.

Project custom agents live in `.codex/agents/*.toml`: `reference-analyst`, `prompt-author` and
`design-critic`. Delegate the analysis and authoring stages as directed by the template skills;
keep the author's context free of base-app source. The critic is a role reference only:
candidate reviews must run through `pnpm harness review`. Generation and review must use the current
host and its current model. Pass `--agent`, `--model`, and the current Codex `--reasoning-effort`
explicitly, or hand them off with `PIGMENT_AGENT`, `PIGMENT_MODEL`, `PIGMENT_REASONING_EFFORT`.
Never assume a child CLI's personal default matches the chat. Missing model or ambiguous host means
stop before launching a provider; do not switch provider/model after a limit or other error.

When changing a shared workflow, edit its `.claude/` source; change the Codex adapter only for
Codex-specific behavior. These adapters are project-owned files, not installations tracked by
the external `skills` CLI. See `docs/harness/README.md` for invocation and maintenance details.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
