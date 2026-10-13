import type { Metadata } from "next";
import { DocsShell } from "@/components/docs-shell";

export const metadata: Metadata = { title: "Package format" };

export default function PackageReference() {
  return (
    <DocsShell current="/docs/package">
      <p className="meta">Reference / Package format</p>
      <h1>Package format</h1>
      <p className="lead">Every version is a folder with a manifest, tokens in the W3C design tokens format, rules, component specs and agent instructions.</p>

      <h2 id="tree">Layout</h2>
      <pre className="code code--light">{`<system>-<version>/
├── manifest.json            id, version, tags, fonts, licenses
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
GET /api/v1/design-systems/:id/:version
GET /api/v1/design-systems/:id/:version/tokens
GET /api/v1/design-systems/:id/:version/components/:name
GET /api/v1/design-systems/:id/:version/guides/:mode     new | existing | ongoing
GET /s/:id/:version/agent.md
GET /download/:id/:version`}</pre>
      <p>
        <span className="mono">:version</span> accepts <span className="mono">latest</span>. Errors return{" "}
        <span className="mono">{`{ "error": { "code", "message" } }`}</span> with codes unknown_template, unknown_version, invalid_component,
        unavailable_artifact and invalid_mode.
      </p>
    </DocsShell>
  );
}
