import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./chrome";

const SECTIONS = [
  {
    title: "Start",
    links: [
      { href: "/docs", label: "Overview" },
      { href: "/connect", label: "Connect an agent" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/docs/new-project", label: "New project" },
      { href: "/docs/existing-project", label: "Existing project" },
      { href: "/docs/ongoing", label: "Ongoing development" },
    ],
  },
  {
    title: "Reference",
    links: [
      { href: "/docs/package", label: "Package format" },
      { href: "/connect", label: "MCP tools" },
      { href: "/api/v1/design-systems", label: "HTTP API" },
    ],
  },
];

export function DocsShell({ current, toc, children }: { current: string; toc?: Array<{ id: string; label: string }>; children: ReactNode }) {
  return (
    <>
      <SiteHeader active="docs" />
      <div className="page docs">
        <nav aria-label="Docs" className="docs-nav">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <p className="eyebrow">{s.title}</p>
              {s.links.map((l) => (
                <Link key={l.href + l.label} href={l.href} aria-current={l.href === current ? "page" : undefined}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <article className="docs-article">{children}</article>
        {toc && toc.length > 0 && (
          <aside aria-label="On this page" className="docs-toc">
            <span className="eyebrow" style={{ fontSize: 11.5, color: "var(--ink-4)" }}>
              On this page
            </span>
            {toc.map((t) => (
              <a key={t.id} href={`#${t.id}`}>
                {t.label}
              </a>
            ))}
          </aside>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
