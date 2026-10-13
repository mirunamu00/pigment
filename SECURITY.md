# Security

## Reporting a vulnerability

Please report security problems **privately** through GitHub:
[Report a vulnerability](https://github.com/mirunamu00/pigment/security/advisories/new). Don't open a
public issue.

Include what is affected, how to reproduce it and what an attacker could do. You'll get a first reply
within a week; once a fix ships, the advisory is published and you're credited unless you'd rather not be.

## Scope

| In scope | |
| --- | --- |
| pigmentui.com | The site, the HTTP API under `/api/v1`, spec URLs |
| `pigmentui.com/mcp` | The remote MCP server |
| `pigment-mcp` on npm | The latest release |
| This repository | The harness and the CI workflows |

The design systems themselves are text and token files served read-only; a design system that leads an
agent to produce insecure code (for example, a component spec that drops form validation) is a bug —
report it with the design system feedback form.
