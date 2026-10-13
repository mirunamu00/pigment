import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { contrastRatio, getComponents, getManifest, getTokens, listTemplates, registry, type TemplateSummary } from "@pigment/content";
import { ApplyPanel } from "@/components/apply-panel";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { DemoViewer } from "@/components/demo-viewer";
import { Bloom } from "@/components/details";

export const dynamicParams = false;

function safeList(): TemplateSummary[] {
  try {
    return listTemplates();
  } catch {
    return [];
  }
}

export function generateStaticParams() {
  // Next requires at least one param for a static dynamic route; an empty gallery renders only the 404.
  const list = safeList();
  return list.length ? list.map((t) => ({ id: t.id })) : [{ id: "_none" }];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const t = safeList().find((x) => x.id === id);
  return t ? { title: t.name, description: t.description } : {};
}

const SEMANTIC_ORDER = [
  "color.surface.default",
  "color.surface.subtle",
  "color.surface.raised",
  "color.border.default",
  "color.border.strong",
  "color.text.primary",
  "color.text.secondary",
  "color.action.primary",
  "color.action.primaryHover",
  "color.focus.ring",
  "color.status.success",
  "color.status.warning",
  "color.status.danger",
  "color.status.info",
];

function grade(ratio: number, path: string): string {
  if (path.startsWith("color.surface") || path.startsWith("color.border")) return "—";
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA large";
  return "fail";
}

export default async function SystemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const summary = safeList().find((t) => t.id === id);
  if (!summary) notFound();
  const { version } = summary;
  const manifest = getManifest(id, version);
  const tokens = getTokens(id, version);
  const light = (tokens.light ?? tokens.dark ?? {}) as Record<string, unknown>;
  const surface = String(light["color.surface.default"] ?? "#ffffff");
  const colors = SEMANTIC_ORDER.filter((p) => typeof light[p] === "string").map((p) => {
    const hex = String(light[p]);
    return { path: p.replace(/^color\./, ""), hex, grade: grade(contrastRatio(hex, surface), p) };
  });
  const sizes = Object.entries(light)
    .filter(([p]) => p.startsWith("font.size."))
    .map(([p, v]) => ({ name: p.replace("font.size.", ""), value: String(v) }))
    .sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
  const radii = Object.entries(light)
    .filter(([p]) => p.startsWith("radius."))
    .map(([p, v]) => ({ name: p.replace("radius.", ""), value: String(v) }));
  const spaces = Object.entries(light)
    .filter(([p]) => p.startsWith("space."))
    .map(([, v]) => String(v));
  const components = getComponents(id, version).components;
  const versions = registry().templates.find((t) => t.id === id)?.versions ?? [];
  const bodyFont = manifest.fonts.find((f) => f.role === "body") ?? manifest.fonts[0]!;
  const headingFont = manifest.fonts.find((f) => f.role === "heading" || f.role === "display") ?? bodyFont;

  return (
    <>
      <SiteHeader active="systems" />
      <div className="page">
        <nav aria-label="Breadcrumb" className="crumbs">
          <Link href="/">Systems</Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: "var(--ink)" }}>{manifest.name}</span>
        </nav>

        <div className="detail-head">
          <div>
            <div className="detail-head__title">
              <h1>{manifest.name}</h1>
              <span className="badge-version">v{version} · pinned</span>
            </div>
            <p className="detail-head__desc">{manifest.description}</p>
            <p className="meta" style={{ marginTop: 12 }}>
              {manifest.tags.tone} · {manifest.tags.corners} corners · {manifest.tags.density} · {manifest.tags.appearance.join(" and ")} ·
              code {manifest.license.code}
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <a href={`/download/${id}/${version}`} className="btn btn--lg">
              Package
            </a>
            <a href="#apply" className="btn btn--primary btn--lg">
              Apply this system
            </a>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-main">
            <section aria-labelledby="demos-h">
              <DemoViewer id={id} version={version} shots={summary.shots} light={summary.swatches[1] ?? "#eeeeee"} dark={String(tokens.dark?.["color.surface.default"] ?? "#111111")} />
            </section>

            <section aria-labelledby="color-h">
              <div className="section-head">
                <h2 id="color-h">Color</h2>
                <span className="meta">Semantic tokens · contrast against surface.default</span>
              </div>
              <div className="tin">
                <div className="tin__grid">
                  {colors.map((c) => (
                    <div key={c.path} className="tin__well">
                      <span className="tin__paint" style={{ background: c.hex }} />
                      <span className="tin__meta">
                        <span>{c.path}</span>
                        <span>
                          <span>{c.hex}</span>
                          <span>{c.grade}</span>
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section aria-labelledby="type-h">
              <div className="section-head">
                <h2 id="type-h">Type and shape</h2>
                <span className="meta">
                  {headingFont.family} · {bodyFont.family}
                </span>
              </div>
              <div className="spec-rows">
                {sizes.slice(0, 5).map((s) => (
                  <div key={s.name}>
                    <span className="mono">
                      font.size.{s.name} · {s.value}
                    </span>
                    <span style={{ fontSize: s.value, lineHeight: 1.15, fontFamily: `"${headingFont.family}", ${headingFont.fallback}`, overflowWrap: "anywhere" }}>
                      {manifest.name}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 28, paddingTop: 22 }}>
                {radii.map((r) => (
                  <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 56, height: 40, borderRadius: r.value, background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--line-3)" }} />
                    <span className="mono meta">
                      radius.{r.name}
                      <br />
                      {r.value}
                    </span>
                  </div>
                ))}
                <span className="mono meta" style={{ alignSelf: "center" }}>
                  space · {spaces.join(" ")}
                </span>
              </div>
            </section>

            <section aria-labelledby="comp-h">
              <div className="section-head">
                <h2 id="comp-h">Components</h2>
                <span className="meta">
                  {components.filter((c) => c.status === "specified").length} fully specified · {components.length} listed
                </span>
              </div>
              <div className="spec-rows">
                {components.map((c) => (
                  <div key={c.name}>
                    <span className="mono">
                      {c.category} / {c.name}
                    </span>
                    <span style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                      <span className={`status-pill status-pill--${c.status}`}>{c.status === "unsupported" ? "not specified" : c.status}</span>
                      <span className="meta">{c.states.join(" · ")}</span>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="log-h">
              <div className="section-head">
                <h2 id="log-h">Versions</h2>
              </div>
              <div className="spec-rows">
                {[...versions].reverse().map((v) => (
                  <div key={v.version}>
                    <span className="mono">{v.version}</span>
                    <span className="meta">
                      {v.status}
                      {v.publishedAt ? ` · ${v.publishedAt.slice(0, 10)}` : ""}
                      {v.version === version ? " · current" : ""}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside id="apply" aria-labelledby="apply-h" className="detail-aside">
            <Bloom size={560} style={{ left: -90, top: -70 }} />
            <ApplyPanel id={id} version={version} name={manifest.name} />
          </aside>
        </div>

        <div className="mobile-apply">
          <a href={`/download/${id}/${version}`} className="btn" aria-label="Download package" style={{ width: 52, padding: 0 }}>
            <svg aria-hidden="true" viewBox="0 0 16 16" width={16} height={16}>
              <path d="M8 2v8M4.5 6.5L8 10l3.5-3.5M3 13h10" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#apply" className="btn btn--primary" style={{ flex: 1 }}>
            Apply this system
          </a>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
