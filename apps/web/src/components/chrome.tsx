import Link from "next/link";

const NAV = [
  { href: "/", label: "Systems", key: "systems" },
  { href: "/compare", label: "Compare", key: "compare" },
  { href: "/docs", label: "Docs", key: "docs" },
  { href: "/connect", label: "MCP", key: "mcp" },
] as const;

export type NavKey = (typeof NAV)[number]["key"];

function Logo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" width={24} height={24} style={{ overflow: "visible" }}>
      <g filter="url(#wcs)">
        <circle cx="20" cy="20" r="14" fill="var(--ink)" />
        <circle cx="27" cy="13" r="6" fill="var(--ink)" opacity={0.6} />
      </g>
    </svg>
  );
}

export function SiteHeader({ active }: { active?: NavKey }) {
  return (
    <header className="site-header">
      <div className="page site-header__inner">
        <div className="site-header__left">
          <Link href="/" className="wordmark">
            <Logo />
            Pigment
          </Link>
          <nav aria-label="Primary" className="site-nav">
            {NAV.map((item) => (
              <Link key={item.key} href={item.href} aria-current={active === item.key ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="site-header__right">
          {active === "mcp" ? (
            <Link href="/" className="btn hide-sm">
              Browse systems
            </Link>
          ) : (
            <Link href="/connect" className="btn btn--primary hide-sm">
              Connect an agent
            </Link>
          )}
          <details className="menu">
            <summary aria-label="Menu">
              <svg aria-hidden="true" viewBox="0 0 16 16" width={18} height={18}>
                <path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
              </svg>
            </summary>
            <nav aria-label="Mobile" className="menu__sheet">
              {NAV.map((item) => (
                <Link key={item.key} href={item.href} aria-current={active === item.key ? "page" : undefined}>
                  {item.label}
                </Link>
              ))}
              <Link href="/connect">Connect an agent</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page site-footer__inner">
        <p className="site-footer__tagline serif">No happy accidents.</p>
        <nav aria-label="Footer">
          <Link href="/docs">Docs</Link>
          <Link href="/connect">MCP reference</Link>
          <a href="/api/v1/design-systems">API</a>
          <span className="meta">© 2026 [Company]</span>
        </nav>
      </div>
    </footer>
  );
}
