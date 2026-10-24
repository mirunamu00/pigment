<div align="center">

<a href="https://pigmentui.com"><img src="docs/assets/banner.png" alt="Pigment — give your agent a palette, not a prompt." width="100%" /></a>

<h3>Design systems your coding agent can actually follow.</h3>

<p>
  <a href="https://pigmentui.com"><img alt="Website" src="https://img.shields.io/badge/website-pigmentui.com-0e0e0c?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/pigment-mcp"><img alt="npm" src="https://img.shields.io/npm/v/pigment-mcp?style=flat-square&label=pigment-mcp&color=0e0e0c" /></a>
  <a href="https://github.com/mirunamu00/pigment/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/mirunamu00/pigment/ci.yml?branch=main&style=flat-square&label=CI" /></a>
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-0e0e0c?style=flat-square" /></a>
  <img alt="MCP" src="https://img.shields.io/badge/MCP-ready-0e0e0c?style=flat-square" />
</p>

<p>
  <a href="https://pigmentui.com"><b>Browse systems</b></a> ·
  <a href="https://pigmentui.com/connect">Connect an agent</a> ·
  <a href="https://pigmentui.com/docs">Docs</a> ·
  <a href="https://www.npmjs.com/package/pigment-mcp">npm</a>
</p>

</div>

<br />

Coding agents ship working screens that drift apart: every request fills the gaps with the model's own
defaults. **Pigment** gives your agent a complete design system — exact tokens, component
states and decision rules — so every screen it builds, today or next month, looks like it belongs.

## Quick start

**1 · Connect once**

```bash
claude mcp add --transport http pigment https://pigmentui.com/mcp
```

**2 · Just ask**

> Apply the Pigment design system margin-notes to this project.

That's it. Your agent copies the system into your project's `design-system/` folder and builds every new screen
from that copy — updates to the system never restyle your project unless you ask for them.

<details>
<summary><b>Codex, Cursor and other MCP clients</b></summary>

<br />

Remote (nothing to install) — point your client at `https://pigmentui.com/mcp`.

Local, with the specs bundled in the package:

```json
{
  "mcpServers": {
    "pigment": { "command": "npx", "args": ["-y", "pigment-mcp"] }
  }
}
```

</details>

<details>
<summary><b>No MCP?</b></summary>

<br />

Every system page on [pigmentui.com](https://pigmentui.com) has a ready-made prompt to copy into any
agent and a plain spec URL (`/s/<id>/agent.md`) — the whole spec in one file, which you can also download
for offline setups.

</details>

## The gallery

Every screenshot is a real coding agent restyling the same four neutral apps with one system —
unedited output, cropped to the first screen. Four systems so far:

<table>
  <tr>
    <td width="50%"><img src="docs/assets/margin-notes-dashboard-light.png" alt="Dashboard restyled with Margin Notes" /></td>
    <td width="50%"><img src="docs/assets/inkleaf-dashboard-light.png" alt="Dashboard restyled with Inkleaf" /></td>
  </tr>
  <tr>
    <td width="50%" valign="top"><b><a href="https://pigmentui.com/s/margin-notes">Margin Notes</a></b> — warm paper, near-black ink, hairlines; the only color is a watercolor wash kept to the margins.</td>
    <td width="50%" valign="top"><b><a href="https://pigmentui.com/s/inkleaf">Inkleaf</a></b> — warm ink on cream paper, a text serif, hand-drawn ink pictograms and pastel stages that hold product UI.</td>
  </tr>
  <tr>
    <td width="50%"><img src="docs/assets/night-cartridge-blog-dark.png" alt="Blog restyled with Night Cartridge" /></td>
    <td width="50%"><img src="docs/assets/graphite-blueprint-commerce-dark.png" alt="Store restyled with Graphite Blueprint" /></td>
  </tr>
  <tr>
    <td width="50%" valign="top"><b><a href="https://pigmentui.com/s/night-cartridge">Night Cartridge</a></b> — a 16-bit console booted as a product: night-blue ground, pixel type, small scenes that move in stepped frames. Dark only.</td>
    <td width="50%" valign="top"><b><a href="https://pigmentui.com/s/graphite-blueprint">Graphite Blueprint</a></b> — a near-black instrument panel: graphite greys, hairlines, one indigo, real UI on spotlit stages.</td>
  </tr>
</table>

## Why it works

| Principle | What it means |
| --- | --- |
| **Measured, not adjectival** | Every rule carries a value: color, type, spacing, radius, elevation and motion — light and dark. |
| **Rules, not page templates** | Decision rules for any product. A system is tested on four demo apps but never written for them: a lint flags rules that name a demo app's screens, data or copy. |
| **Proven before publishing** | Every system — and every update — is applied by an agent to four reference apps, then to two more of a different shape (a landing page and a docs site) that never steer the design. Three samples, gated on builds, tests, accessibility and design adherence, then reviewed against the reference. |
| **Yours to keep** | Your project keeps its own copy. Updates come with a dated changelog and land only when you ask. |

## What your agent gets

| You get | What it is |
| --- | --- |
| `agent.md` | One document: character, defining rules, tokens, components, how to apply |
| `tokens.css` · `tokens.json` | Exact values, light and dark — copied, never retyped |
| MCP tools | `list_design_systems` · `get_design_system` · `get_tokens` · `get_component_spec` · `get_installation_guide` · `get_changelog` · `get_references` |
| HTTP API | [`/api/v1/design-systems`](https://pigmentui.com/api/v1/design-systems) — the same specs as JSON |

## How systems are made

Templates aren't drawn by hand. A reference site goes through a reproducible pipeline, with a person
approving the analysis and the final result:

```
reference ─▶ capture & measure ─▶ analysis ─▶ design prompt ─▶ validate
          ─▶ agent applies it to 4 apps ─▶ evaluate ─▶ critic review ─▶ iterate ─▶ publish
                   screen on one sample, confirm on three plus two holdout apps
```

The critic grades what it finds as blocker, major or minor. A candidate passes with no blocker and no major
the prompt causes; minors are listed, never chased. Revisions are written from a generated brief as general
principles — the author never reads the demo apps.

Systems are **derived design languages, never clones** — no logos, names, copy, imagery or proprietary
fonts carry over. Details in [`docs/harness/`](docs/harness/README.md).

<details>
<summary><b>Development</b></summary>

<br />

Requires Node 22+ and pnpm.

```bash
pnpm install
npx playwright install chromium   # once: capture, screenshots, e2e tests
pnpm dev                          # http://localhost:3000
```

```bash
pnpm typecheck
pnpm test             # harness, content, MCP server, site e2e
pnpm check:content    # systems valid, published versions untouched
```

Adding a system: `pnpm harness --help`, or the `template-intake` skill in Claude Code, which runs the
whole pipeline and stops for approval after the analysis and before publishing.

| Path | What |
| --- | --- |
| `apps/web` | The site: gallery, docs, `/api/v1`, `/mcp`, downloads |
| `packages/mcp` | MCP server — the site's `/mcp` route and the `pigment-mcp` npm package |
| `packages/harness` | `pnpm harness` — capture → prompt → demo runs → evaluation → publish |
| `packages/content` · `packages/schema` | Read-only content access and the data contracts |
| `content/templates` | The systems themselves |
| `showcase/base-apps` | The four neutral apps every system is tested on, and two holdout apps (landing, docs) used only to confirm |

| Variable | Default | |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://pigmentui.com` | prompts, spec links |
| `NEXT_PUBLIC_MCP_URL` | `<site>/mcp` | connect snippets |
| `PIGMENT_CONTENT_DIR` | `<repo>/content` | site, API and MCP server |
| `PIGMENT_WORKDIR` | `<os tmp>/pigment-runs` | where agents restyle base-app copies |

Changes reach `main` only through pull requests with a green CI — see [`CONTRIBUTING.md`](CONTRIBUTING.md).
Merging deploys the site (Vercel) and publishes a new `pigment-mcp` version when
`packages/mcp/package.json` changes, via npm trusted publishing. See [`docs/deploy.md`](docs/deploy.md).

</details>

## Contributing

Bug reports, feedback on how agents apply a system, and suggestions for new systems are welcome as
[issues](https://github.com/mirunamu00/pigment/issues/new/choose). Code changes go through pull requests —
see [`CONTRIBUTING.md`](CONTRIBUTING.md), the [code of conduct](CODE_OF_CONDUCT.md) and the
[security policy](SECURITY.md).

## License

[MIT](LICENSE) © 2026 [mirunamu00](https://github.com/mirunamu00)
