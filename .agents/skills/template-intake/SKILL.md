---
name: template-intake
description: Create a new Pigment design system from a reference website through capture, analysis, authoring, evaluation and approved publication. For changes to a published system, use template-update.
---

# Template intake in Codex

Read `.claude/skills/template-intake/SKILL.md` from the repository root and follow its pipeline.
That file is the maintained workflow; resolve its repository paths from the root.

Use the project custom agents `reference-analyst` and `prompt-author` for the corresponding delegated
stages. If the host cannot select custom agents, give a fresh subagent the matching
`.codex/agents/<name>.toml` instructions and only the inputs that role needs. In particular, do not
give the prompt author base-app source or a hand-written demo-specific fix list. If subagents are
unavailable, report that limitation before proceeding with a stage that requires isolation.

Keep the analysis approval, screen direction approval and final publication approval with the user.
Run reviews only through `pnpm harness review`; do not start `design-critic` manually or replace
the harness-generated reviewers with Codex subagents. The review command currently uses Claude CLI.
Leave generation on the workflow's default agent unless the user requests the experimental Codex backend.

Use Codex image-viewing tools to inspect evidence. Show the actual images or artifact links at checkpoints.
For long commands, use the host's background process/session support and report progress.
