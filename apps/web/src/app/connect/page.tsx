import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { ConnectView } from "@/components/connect-view";
import { Bloom } from "@/components/details";

export const metadata: Metadata = pageMeta("Connect an agent", "Connect Claude Code, Codex, Cursor or any MCP client to Pigment — remote or with npx pigment-mcp — and let the agent read design system specs as tools.", "/connect");
export const dynamic = "force-static";

const TOOLS = [
  { name: "list_design_systems", desc: "Browse systems with their tags and latest stable version.", args: "tone?  appearance?" },
  { name: "get_design_system", desc: "Tokens, visual principles and application rules for one pinned version.", args: "id  version" },
  { name: "get_tokens", desc: "tokens.css or tokens.json, light and dark — copied into the project, never retyped.", args: "id  version  format?: css | json" },
  { name: "get_component_spec", desc: "Variants, states, accessibility and token mapping for one component.", args: "id  version  component" },
  { name: "get_references", desc: "Screenshots of the four reference apps restyled with this version.", args: "id  version  app?" },
  { name: "get_installation_guide", desc: "Steps, approval points and checks for your scenario.", args: "id  version  mode: new | existing | ongoing" },
];

export default function ConnectPage() {
  return (
    <>
      <SiteHeader active="mcp" />
      <main className="page" style={{ paddingTop: 56 }}>
        <div style={{ maxWidth: 780 }}>
          <p className="eyebrow">MCP server</p>
          <h1 style={{ margin: 0, fontSize: "clamp(38px, 5vw, 56px)", lineHeight: 1, fontWeight: 600, letterSpacing: "-0.045em" }}>
            Connect an agent <span className="serif">once</span>.
          </h1>
          <p style={{ margin: "18px 0 0", fontSize: 17, color: "var(--ink-2)" }}>
            One server for every MCP client. It only reads specs — it never writes to your project. Your agent does the editing, with your permissions.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 56, alignItems: "flex-start", paddingTop: 40 }}>
          <div style={{ flex: "999 1 640px", minWidth: 0 }}>
            <ConnectView />
            <p className="muted" style={{ marginTop: 20, fontSize: 13.5 }}>
              No MCP at all? Every system also ships as a single spec URL and a downloadable package. <Link href="/docs">See the guide</Link>
            </p>
          </div>
          <aside style={{ flex: "1 1 420px", minWidth: 0, position: "relative", display: "flex", flexDirection: "column", gap: 20 }}>
            <Bloom size={540} style={{ right: -140, top: -80 }} />
            <section aria-labelledby="tools-h" className="panel panel--pinned">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <h2 id="tools-h" style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>
                  Tools
                </h2>
                <span className="mono" style={{ fontSize: 11.5, padding: "3px 8px", borderRadius: 6, background: "var(--well)" }}>
                  read-only
                </span>
              </div>
              {TOOLS.map((t) => (
                <div key={t.name} className="tool">
                  <span className="mono" style={{ fontSize: 13, fontWeight: 500 }}>
                    {t.name}
                  </span>
                  <span style={{ fontSize: 13.5, color: "var(--ink-2)" }}>{t.desc}</span>
                  <span className="mono meta" style={{ fontSize: 11.5 }}>
                    {t.args}
                  </span>
                </div>
              ))}
              <p className="meta" style={{ margin: "14px 0 0" }}>
                Plus one prompt, <span className="mono">apply</span> — in Claude Code <span className="mono">/mcp__pigment__apply</span> — that adds the plan-first working agreement.
              </p>
            </section>
            <section aria-labelledby="verify-h" className="panel" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h2 id="verify-h" style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>
                Check the connection
              </h2>
              <p style={{ margin: 0, fontSize: 14 }}>Ask your agent:</p>
              <p style={{ margin: 0, padding: "12px 14px", borderRadius: 10, background: "var(--tin-well)", fontSize: 14 }}>
                “List the Pigment design systems.”
              </p>
              <p className="meta" style={{ margin: 0 }}>
                It should call <span className="mono">list_design_systems</span> and return each system with its latest stable version.
              </p>
            </section>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
