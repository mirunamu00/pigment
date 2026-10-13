import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import NewsletterForm from './NewsletterForm';

const NAV_ITEMS = [
  { to: '/', label: 'Home', testId: 'nav-home', end: true },
  { to: '/about', label: 'About', testId: 'nav-about', end: false },
];

export default function Layout() {
  const location = useLocation();

  // When the page changes, jump to the requested heading (if any) or to the top.
  // In-page hash links (table of contents) scroll natively and are not affected.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container site-header-inner">
          <Link to="/" className="brand" data-testid="brand-link">
            <svg className="brand-mark" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
              <path d="M4 4h12l4 4v12H4z" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M8 11h8M8 15h6" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>Field Notes</span>
          </Link>
          <nav aria-label="Primary" data-testid="primary-nav">
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
        </div>
      </header>

      <main id="main-content" className="container content" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer-inner">
          <NewsletterForm />
          <p className="muted small">
            Field Notes is written by a small product team. Opinions are our own and change as we learn.
          </p>
        </div>
      </footer>
    </div>
  );
}
