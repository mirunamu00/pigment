import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { contrastRatio, getComponents, getHistory, getManifest, getScreens, getTokens, listTemplates, type TemplateSummary } from "@pigment/content";
import { ApplyPanel } from "@/components/apply-panel";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { DemoViewer } from "@/components/demo-viewer";
import { Bloom } from "@/components/details";
import { pageMeta } from "@/lib/meta";

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
  return t ? pageMeta(`${t.name} design system`, t.description, `/s/${t.id}`) : {};
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

/** Changelog text with `backticks` rendered as code. */
function inlineCode(text: string) {
  return text.split(/(`[^`]+`)/).map((part, i) => (part.startsWith("`") && part.endsWith("`") ? <code key={i}>{part.slice(1, -1)}</code> : part));
}

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
  const history = getHistory(id);
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
              <span className="badge-version">Updated {summary.updated}</span>
            </div>
            <p className="detail-head__desc">{manifest.description}</p>
            <p className="meta" style={{ marginTop: 12 }}>
              {manifest.tags.tone} · {manifest.tags.corners} corners · {manifest.tags.density} · {manifest.tags.appearance.join(" and ")} ·
              code {manifest.license.code}
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <a href={`/s/${id}/agent.md`} download={`${id}-agent.md`} className="btn btn--lg">
              agent.md
            </a>
            <a href="#apply" className="btn btn--primary btn--lg">
              Apply this system
            </a>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-main">
            <section aria-labelledby="demos-h">
              <DemoViewer id={id} shots={summary.shots} screens={getScreens(id, summary.version)} light={summary.swatches[1] ?? "#eeeeee"} dark={String(tokens.dark?.["color.surface.default"] ?? "#111111")} />
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
                <h2 id="log-h">Changelog</h2>
                <span className="meta">Your project keeps its own copy</span>
              </div>
              <p className="changelog__intro">
                Applying a system copies its tokens and rules into your project&apos;s <code>design-system/</code> folder, and every
                later screen is built from that copy. Updates here never restyle a project on their own — ask your agent to
                update and it applies only what changed since your copy.
              </p>
              <ol className="changelog">
                {history.map((entry, i) => (
                  <li key={entry.date + i} className="changelog__item">
                    <div className="changelog__head">
                      <span className="mono changelog__num">{entry.date}</span>
                      {i === 0 && <span className="status-pill">current</span>}
                    </div>
                    {entry.summary && <p className="changelog__summary">{inlineCode(entry.summary)}</p>}
                    {entry.changes.length > 0 && (
                      <details className="changelog__changes">
                        <summary>Details ({entry.changes.length})</summary>
                        <ul>
                          {entry.changes.map((c, j) => (
                            <li key={j}>{inlineCode(c)}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside id="apply" aria-labelledby="apply-h" className="detail-aside">
            <Bloom size={560} style={{ left: -90, top: -70 }} />
            <ApplyPanel id={id} name={manifest.name} />
          </aside>
        </div>

        <div className="mobile-apply">
          <a href={`/s/${id}/agent.md`} download={`${id}-agent.md`} className="btn" aria-label="Download agent.md" style={{ width: 52, padding: 0 }}>
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
