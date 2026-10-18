import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import SiteFooter from './SiteFooter';
import { BRAND, NAV_ITEMS } from '../data/site';

function isActive(to: string, pathname: string) {
  return !to.includes('#') && pathname === to;
}

export default function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // On navigation: close the mobile menu, then jump to the requested section (if any) or to the top.
  // Section links (/#features) are router links, so the browser does not scroll to them by itself.
  useEffect(() => {
    setMenuOpen(false);
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash, location.key]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header" data-testid="site-header">
        <div className="container site-header-inner">
          <Link to="/" className="brand" data-testid="brand-link">
            <svg className="brand-mark" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
              <path d="M6 3h12M6 21h12M7 3c0 5 10 7 10 12v6M17 3c0 5-10 7-10 12v6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>{BRAND}</span>
          </Link>

          <nav aria-label="Primary" className="primary-nav" data-testid="primary-nav">
            <ul className="nav-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    className={isActive(item.to, location.pathname) ? 'nav-link active' : 'nav-link'}
                    aria-current={isActive(item.to, location.pathname) ? 'page' : undefined}
                    data-testid={`nav-${item.id}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <Link to="/signup" className="button button-primary" data-testid="header-signup">
              Sign up
            </Link>
            <button
              type="button"
              className="button menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
              data-testid="menu-toggle"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-nav" aria-label="Mobile" className="mobile-nav" data-testid="mobile-nav">
            <ul className="mobile-nav-list container">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    className={isActive(item.to, location.pathname) ? 'mobile-nav-link active' : 'mobile-nav-link'}
                    aria-current={isActive(item.to, location.pathname) ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                    data-testid={`mobile-nav-${item.id}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main id="main-content" className="content" tabIndex={-1}>
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
}
