---
name: hyperframes
description: Create, edit, animate or render HTML videos with HyperFrames, including the Pigment home and README films.
---

# HyperFrames in Codex

Read `.claude/skills/hyperframes/SKILL.md` from the repository root and follow it.
The full upstream skill, scripts, references and assets stay in that directory. Resolve relative
links and script paths from the source file's directory, not this adapter directory.

Treat `/hyperframes-cli` and `/hyperframes-registry` as the Codex skills `$hyperframes-cli` and
`$hyperframes-registry`. Other slash-prefixed skill names denote dependencies, not shell commands:
check availability before using them and report a missing dependency when needed.
Use the host's browser and image tools for previews and snapshot inspection, and its process/session
support for background commands. These are standalone repository skills, not a HyperFrames plugin install.
