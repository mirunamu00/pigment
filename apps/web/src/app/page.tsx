import Link from "next/link";
import { listTemplates, type TemplateSummary } from "@pigment/content";
import { MCP_URL, SITE_URL } from "@pigment/content/prompts";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { Bloom, Note } from "@/components/details";
import { Gallery } from "@/components/gallery";

export const dynamic = "force-static";

function loadTemplates(): TemplateSummary[] {
  try {
    return listTemplates();
  } catch {
    return [];
  }
}

export default function HomePage() {
  const templates = loadTemplates();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pigment",
    url: SITE_URL,
    description: "Design systems that Claude Code, Codex and any MCP client can apply to new and existing codebases.",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader active="systems" />
      <main className="page gallery-page">
        <div className="gallery-intro">
          <div style={{ maxWidth: 760 }}>
            <h1 className="gallery-intro__title">
              Design systems your coding agent can&nbsp;apply.
            </h1>
            <p className="gallery-intro__sub">
              Each one is shown on real products and tested before release. Claude Code, Codex and any MCP client can apply it.
              {templates.length > 0 && " Pick one below."}
            </p>
          </div>
          <Link href="/connect" className="btn btn--cmd">
            <span className="prompt-sign">$</span>claude mcp add pigment
          </Link>
          {templates.length > 0 && (
            <Note arrow="down-left" arrowFirst style={{ left: 790, bottom: -6 }}>
              <span style={{ paddingBottom: 30, display: "block" }}>unedited agent output</span>
            </Note>
          )}
        </div>

        <div className="gallery-stage">
          <Bloom size={760} strength={0.34} style={{ right: -180, top: 240 }} />
          <Gallery templates={templates} />
        </div>
      </main>

      <section id="how" className="page how">
        <div className="how__text">
          <h2 className="how__title">
            Set up once. Every new screen follows.
          </h2>
          <ol className="how__steps">
            <li>
              <span className="mono">01</span>Connect the MCP server once.
            </li>
            <li>
              <span className="mono">02</span>Ask your agent to apply a system.
            </li>
            <li>
              <span className="mono">03</span>Every new screen stays on-system.
            </li>
          </ol>
          <p className="meta" style={{ marginTop: 28 }}>
            No MCP? Every system also has a plain spec URL.
          </p>
        </div>
        <div className="how__code">
          <div className="code-panel">
            <div className="code-panel__tabs" aria-hidden="true">
              <span>Claude Code</span>
              <span>Codex</span>
              <span>Cursor</span>
              <span>Other MCP clients</span>
            </div>
            <pre className="code" style={{ borderRadius: 0 }}>
              <span className="c"># 1 · connect once</span>
              {"\n"}claude mcp add --transport http pigment <span className="s">{MCP_URL}</span>
              {"\n\n"}
              <span className="c"># 2 · ask your agent</span>
              {"\n"}› Apply the Pigment design system <span className="s">&lt;system&gt;</span> to this project.
              {"\n"}  Preserve routes, logic and tests. Show a plan first.
              {"\n\n"}
              <span className="c"># 3 · your agent reads the spec</span>
              {"\n"}get_design_system(<span className="s">&quot;&lt;system&gt;&quot;</span>)
            </pre>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
