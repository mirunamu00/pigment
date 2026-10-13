import { NavLink, Outlet } from 'react-router';
import { currentUser } from '../data/account';

const SECTIONS = [
  { to: '/settings/profile', label: 'Profile', testId: 'nav-profile' },
  { to: '/settings/notifications', label: 'Notifications', testId: 'nav-notifications' },
  { to: '/settings/security', label: 'Security', testId: 'nav-security' },
  { to: '/settings/billing', label: 'Billing', testId: 'nav-billing' },
];

export default function Layout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="topbar">
        <div className="brand">Account Settings</div>
        <div className="person" data-testid="current-user">
          <span className="avatar avatar-small" aria-hidden="true">
            {currentUser.initials}
          </span>
          <span>{currentUser.name}</span>
        </div>
      </header>

      <div className="settings-layout">
        <aside className="sidebar">
          <nav aria-label="Settings sections" data-testid="settings-nav">
            <ul className="nav-list">
              {SECTIONS.map((section) => (
                <li key={section.to}>
                  <NavLink to={section.to} className="nav-link" data-testid={section.testId}>
                    {section.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main id="main-content" className="content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
