import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { DocsShell } from "@/components/docs-shell";

export const metadata: Metadata = pageMeta("Package format", "What is inside a Pigment design system package: agent.md, tokens, component specs, principles and installation guides.", "/docs/package");

export default function PackageReference() {
  return (
    <DocsShell current="/docs/package">
      <p className="meta">Reference / Package format</p>
      <h1>Package format</h1>
      <p className="lead">Every system is a folder with a manifest, tokens in the W3C design tokens format, rules, component specs and agent instructions.</p>

      <h2 id="tree">Layout</h2>
      <pre className="code code--light">{`<system>/
├── manifest.json            id, name, tags, fonts, licenses
├── tokens/
│   ├── primitives.json      raw values (DTCG)
│   ├── semantic.light.json  roles → primitives
│   └── semantic.dark.json
├── principles/visual-language.md
├── components/              index.json + one spec per component
├── agent/instructions.md    new · existing · ongoing · verification · rollback
├── CHANGELOG.md
└── dist/
    ├── agent.md             the single document agents read
    ├── tokens.css           CSS variables, light and dark
    └── tokens.json          resolved values per mode`}</pre>

      <h2 id="api">HTTP API</h2>
      <pre className="code code--light">{`GET /api/v1/design-systems
GET /api/v1/design-systems/:id
GET /api/v1/design-systems/:id/tokens
GET /api/v1/design-systems/:id/components/:name
GET /api/v1/design-systems/:id/guides/:mode     new | existing | ongoing
GET /s/:id/agent.md
GET /download/:id`}</pre>
      <p>
        Every endpoint serves the current system. Errors return{" "}
        <span className="mono">{`{ "error": { "code", "message" } }`}</span> with codes unknown_template, invalid_component,
        unavailable_artifact and invalid_mode.
      </p>
    </DocsShell>
  );
}
