import Link from "next/link";

const NAV = [
  { href: "/", label: "Systems", key: "systems" },
  { href: "/compare", label: "Compare", key: "compare" },
  { href: "/docs", label: "Docs", key: "docs" },
  { href: "/connect", label: "MCP", key: "mcp" },
] as const;

export type NavKey = (typeof NAV)[number]["key"];

// The mark is the favicon itself (src/app/icon.svg): one watercolor bloom of four pigments.
function Logo() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/icon.svg" alt="" aria-hidden="true" width={26} height={26} />;
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

const REPO = "https://github.com/mirunamu00/pigment";
const AUTHOR = "https://github.com/mirunamu00";

const FOOTER_LINKS: Array<{ title: string; links: Array<{ label: string; href: string; external?: boolean }> }> = [
  {
    title: "Product",
    links: [
      { label: "Design systems", href: "/" },
      { label: "Compare", href: "/compare" },
      { label: "Connect an agent", href: "/connect" },
      { label: "Docs", href: "/docs" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "MCP server", href: "/connect" },
      { label: "HTTP API", href: "/api/v1/design-systems" },
      { label: "npm · pigment-mcp", href: "https://www.npmjs.com/package/pigment-mcp", external: true },
      { label: "Spec and API", href: "/docs/package" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Source on GitHub", href: REPO, external: true },
      { label: "Report an issue", href: `${REPO}/issues`, external: true },
      { label: "Releases", href: `${REPO}/tags`, external: true },
      { label: "MIT License", href: `${REPO}/blob/main/LICENSE`, external: true },
    ],
  },
];

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width={16} height={16} fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page site-footer__inner">
        <div className="site-footer__brand">
          <Link href="/" className="wordmark">
            <Logo />
            Pigment
          </Link>
          <p className="site-footer__about">
            Design systems your coding agent can apply. Each is copied into your project, so every later screen follows the same
            rules.
          </p>
          <a className="site-footer__gh" href={REPO} target="_blank" rel="noreferrer">
            <GitHubIcon />
            mirunamu00/pigment
          </a>
        </div>
        <nav aria-label="Footer" className="site-footer__cols">
          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="site-footer__col">
              <p className="site-footer__title">{col.title}</p>
              {col.links.map((l) =>
                l.external ? (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.label} href={l.href}>
                    {l.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="page site-footer__base">
        <span>
          © 2026{" "}
          <a href={AUTHOR} target="_blank" rel="noreferrer">
            mirunamu00
          </a>{" "}
          · Released under the{" "}
          <a href={`${REPO}/blob/main/LICENSE`} target="_blank" rel="noreferrer">
            MIT License
          </a>
        </span>
        <span>Derived design languages, never clones. Gallery screenshots are unedited agent output.</span>
      </div>
    </footer>
  );
}
