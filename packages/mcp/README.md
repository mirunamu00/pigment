<a href="https://pigmentui.com"><img src="https://pigmentui.com/opengraph-image" alt="Pigment — design systems your coding agent can apply." width="100%" /></a>

# pigment-mcp

MCP server for [Pigment](https://pigmentui.com) design systems. Your coding agent (Claude Code, Codex,
Cursor or any MCP client) reads tokens, rules, component specs and installation guides while it works.

Every design system ships inside this package, so it works offline. New systems and updates arrive with new
package releases.

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

> Apply the Pigment design system margin-notes to this project.

Or run the `apply` prompt (Claude Code: `/mcp__pigment__apply`), which adds the working agreement: audit first,
propose a plan, restyle one sample screen, then report build and visual checks.

## Tools

| Tool | Returns |
| --- | --- |
| `list_design_systems` | Systems with tags and when each was last updated (`tone?`, `appearance?`) |
| `get_design_system` | The full spec of a system: rules, token tables, setup, verification |
| `get_tokens` | `tokens.css` or `tokens.json`, to copy verbatim |
| `get_component_spec` | One component: anatomy, variants, states, accessibility, token mapping |
| `get_installation_guide` | Steps and approval points for `new`, `existing` or `ongoing` |
| `get_changelog` | What changed, by date — to update a project that already has the system |
| `get_references` | Realistic products before and after the system: every page, desktop and mobile, light and dark |

Requires Node 22+.

## License

[MIT](https://github.com/mirunamu00/pigment/blob/main/LICENSE) © 2026 [mirunamu00](https://github.com/mirunamu00) · [Source](https://github.com/mirunamu00/pigment) · [pigmentui.com](https://pigmentui.com)
