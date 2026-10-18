import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { CURRENT_VERSION, REPOSITORY_URL, TOOL_NAME } from '../data/site';
import SearchBox from './SearchBox';
import Sidebar from './Sidebar';

export default function Layout() {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // When the page changes, close the drawer and jump to the requested heading (if any) or to the top.
  // In-page hash links (table of contents) scroll natively and are not affected.
  useEffect(() => {
    setNavOpen(false);
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [location.pathname]);

  // Escape closes the drawer and returns focus to the menu button.
  useEffect(() => {
    if (!navOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setNavOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navOpen]);

  function closeNav() {
    setNavOpen(false);
    menuButtonRef.current?.focus();
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-header-inner">
          <button
            ref={menuButtonRef}
            type="button"
            className="button menu-button"
            aria-expanded={navOpen}
            aria-controls="docs-sidebar"
            onClick={() => setNavOpen((open) => !open)}
            data-testid="menu-button"
          >
            Menu
          </button>
          <div className="brand-group">
            <Link to="/" className="brand" data-testid="brand-link">
              <svg className="brand-mark" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                <path d="M4 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M12 18h8" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span>{TOOL_NAME}</span>
            </Link>
            <span className="version-label" data-testid="version-label">
              {CURRENT_VERSION}
            </span>
          </div>
          <SearchBox />
          <nav aria-label="Primary" className="header-nav" data-testid="primary-nav">
            <ul className="nav-list">
              <li>
                <NavLink to="/changelog" className="nav-link" data-testid="nav-changelog">
                  Changelog
                </NavLink>
              </li>
              <li>
                <a href={REPOSITORY_URL} className="nav-link" data-testid="nav-repository">
                  Repository
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="docs-shell">
        <Sidebar open={navOpen} onClose={closeNav} />
        {navOpen && <div className="drawer-backdrop" aria-hidden="true" onClick={closeNav} data-testid="drawer-backdrop" />}
        <main id="main-content" className="content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <p className="muted small">
            {TOOL_NAME} is open source under the MIT license. These docs describe {CURRENT_VERSION}.
          </p>
        </div>
      </footer>
    </div>
  );
}
