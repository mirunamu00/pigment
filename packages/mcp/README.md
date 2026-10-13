# pigment-mcp

MCP server for [Pigment](https://pigmentui.com) design systems. Your coding agent (Claude Code, Codex,
Cursor or any MCP client) reads tokens, rules, component specs and installation guides for a pinned
version while it works.

Every published design system ships inside this package, so it works offline and a version never changes
under you. New systems arrive with new package versions.

## Connect

Claude Code:

```bash
claude mcp add pigment -- npx -y pigment-mcp
```

Other clients (JSON config):

```json
{
  "mcpServers": {
    "pigment": { "command": "npx", "args": ["-y", "pigment-mcp"] }
  }
}
```

Prefer nothing to install? The same server runs remotely: `claude mcp add --transport http pigment https://pigmentui.com/mcp`.

## Use

Start a new session and just ask:

> Apply the Pigment design system margin-notes@1.0.0 to this project.

Or run the `apply` prompt (Claude Code: `/mcp__pigment__apply`), which adds the working agreement: audit first,
propose a plan, restyle one sample screen, then report build and visual checks.

## Tools

| Tool | Returns |
| --- | --- |
| `list_design_systems` | Published systems with tags and versions (`tone?`, `appearance?`) |
| `get_design_system` | The full spec of one pinned version: rules, token tables, setup, verification |
| `get_tokens` | `tokens.css` or `tokens.json`, to copy verbatim |
| `get_component_spec` | One component: anatomy, variants, states, accessibility, token mapping |
| `get_installation_guide` | Steps and approval points for `new`, `existing` or `ongoing` |
| `get_references` | Screenshots of four reference apps restyled with the system |

Requires Node 22+.
