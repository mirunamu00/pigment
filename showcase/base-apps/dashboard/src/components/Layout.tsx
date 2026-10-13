import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { currentUser } from '../data/team';

const NAV_ITEMS = [
  { to: '/', label: 'Overview', testId: 'nav-overview', end: true },
  { to: '/projects', label: 'Projects', testId: 'nav-projects', end: false },
  { to: '/team', label: 'Team', testId: 'nav-team', end: false },
  { to: '/settings', label: 'Settings', testId: 'nav-settings', end: false },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the user menu when the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false);
    }
    function onPointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    navigate(term ? `/projects?q=${encodeURIComponent(term)}` : '/projects');
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <aside className="sidebar">
        <div className="brand">Northwind Ops</div>
        <nav aria-label="Primary" data-testid="sidebar-nav">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className="nav-link" data-testid={item.testId}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <form role="search" className="topbar-search" onSubmit={handleSearch}>
            <label htmlFor="global-search" className="visually-hidden">
              Search projects
            </label>
            <input
              id="global-search"
              type="search"
              className="input"
              placeholder="Search projects…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              data-testid="global-search"
            />
            <button type="submit" className="button" data-testid="global-search-submit">
              Search
            </button>
          </form>

          <div className="user-menu" ref={menuRef}>
            <button
              type="button"
              className="button user-menu-button"
              aria-expanded={menuOpen}
              aria-controls="user-menu-panel"
              onClick={() => setMenuOpen((open) => !open)}
              data-testid="user-menu-button"
            >
              <span className="avatar" aria-hidden="true">
                {currentUser.initials}
              </span>
              <span>{currentUser.name}</span>
            </button>
            {menuOpen && (
              <div id="user-menu-panel" className="user-menu-panel" data-testid="user-menu">
                <p className="user-menu-email">{currentUser.email}</p>
                <ul className="user-menu-list">
                  <li>
                    <Link to="/settings" className="user-menu-link">
                      Account settings
                    </Link>
                  </li>
                  <li>
                    <Link to="/team" className="user-menu-link">
                      My team
                    </Link>
                  </li>
                  <li>
                    <button type="button" className="link-button" onClick={() => setMenuOpen(false)}>
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <main id="main-content" className="content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
