---
name: template-update
description: Revise an already published Pigment design system through new candidates, evaluation, user approval and a public changelog. For a new system, use template-intake.
---

# Template update in Codex

Read `.claude/skills/template-update/SKILL.md` from the repository root and follow its workflow.
Read `.agents/skills/template-intake/SKILL.md` for the Codex delegation, evidence and review adaptations
when entering the shared evaluation stages.

Delegate authoring to the project `prompt-author` custom agent, using its generated author brief and
the approved general goal. If custom-agent selection is unavailable, supply
`.codex/agents/prompt-author.toml` to a fresh subagent. Keep base-app source out of its context.
If isolated delegation is unavailable, report the limitation before authoring.

Preserve published versions and all user approval checkpoints. Run reviews through the harness using
the current session's provider/model as described in the intake adapter; do not substitute a manually
started critic or another provider/model after an execution error.
