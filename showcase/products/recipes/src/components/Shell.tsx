import { useEffect, useState, type FormEvent } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router';
import { useStore } from '../store';
import { Icon, Logo, type IconName } from './Icon';
import { Toasts } from './ui';

const NAV: { to: string; label: string; id: string; icon: IconName }[] = [
  { to: '/', label: 'Today', id: 'today', icon: 'home' },
  { to: '/recipes', label: 'Recipes', id: 'recipes', icon: 'book' },
  { to: '/plan', label: 'Meal plan', id: 'plan', icon: 'calendar' },
  { to: '/shopping', label: 'Shopping', id: 'shopping', icon: 'basket' },
  { to: '/settings', label: 'Settings', id: 'settings', icon: 'settings' },
];

function SearchBox() {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const onRecipes = location.pathname === '/recipes';
  const [q, setQ] = useState(onRecipes ? (params.get('q') ?? '') : '');

  useEffect(() => {
    if (!onRecipes) setQ('');
    else setQ(params.get('q') ?? '');
  }, [onRecipes, params]);

  const go = (value: string, replace: boolean) => {
    const next = new URLSearchParams(onRecipes ? params : undefined);
    if (value) next.set('q', value);
    else next.delete('q');
    const s = next.toString();
    navigate(`/recipes${s ? `?${s}` : ''}`, { replace });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    go(q.trim(), false);
  };

  return (
    <form className="search" role="search" onSubmit={onSubmit}>
      <label htmlFor="global-search" className="sr-only">
        Search recipes
      </label>
      <Icon name="search" size={18} className="search-icon" />
      <input
        id="global-search"
        type="search"
        placeholder="Search recipes, ingredients, cuisines…"
        value={q}
        data-testid="search-input"
        autoComplete="off"
        onChange={(e) => {
          setQ(e.target.value);
          if (onRecipes) go(e.target.value, true);
        }}
      />
      <kbd className="search-kbd" aria-hidden="true">
        /
      </kbd>
    </form>
  );
}

export function Shell() {
  const { shopping, plan } = useStore();
  const left = shopping.filter((i) => !i.checked).length;
  const planned = Object.keys(plan).length;
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const badge = (id: string) => (id === 'shopping' ? left : id === 'plan' ? planned : null);

  return (
    <div className="app">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <aside className="sidebar" aria-label="Primary">
        <div className="sidebar-inner">
        <Link to="/" className="sidebar-logo" aria-label="Panful — Today">
          <Logo />
        </Link>
        <nav className="sidebar-nav" aria-label="Main">
          <ul>
            {NAV.map((n) => (
              <li key={n.id}>
                <NavLink to={n.to} end={n.to === '/'} className="nav-link" data-testid={`nav-${n.id}`}>
                  <Icon name={n.icon} />
                  <span>{n.label}</span>
                  {badge(n.id) ? (
                    <span className="nav-count" aria-label={n.id === 'shopping' ? `${left} items left` : `${planned} meals planned`}>
                      {badge(n.id)}
                    </span>
                  ) : null}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-foot">
          <div className="household-card">
            <div className="avatars" aria-hidden="true">
              <span className="avatar avatar-sm a1">HR</span>
              <span className="avatar avatar-sm a2">TR</span>
              <span className="avatar avatar-sm a3">IR</span>
            </div>
            <p className="household-name">The Reid household</p>
            <p className="household-meta">2 adults · 1 child · nut-free</p>
            <Link to="/settings" className="text-link small">
              Manage household
            </Link>
          </div>
          <p className="plan-pill">
            <Icon name="sparkle" size={14} /> Panful Plus · renews 3 Dec
          </p>
        </div>
        </div>
      </aside>

      <div className="main-col">
        <header className="topbar">
          <Link to="/" className="topbar-logo" aria-label="Panful — Today">
            <Logo />
          </Link>
          <SearchBox />
          <div className="topbar-actions">
            <button type="button" className="icon-btn has-dot" aria-label="Notifications, 2 unread" data-testid="notifications">
              <Icon name="bell" />
            </button>
            <Link to="/settings" className="avatar avatar-btn" aria-label="Hannah Reid — account settings" data-testid="account-avatar">
              HR
            </Link>
          </div>
        </header>
        <main id="main" className="main" tabIndex={-1}>
          <Outlet />
        </main>
        <footer className="app-foot">
          <span>© 2026 Panful Kitchen Ltd</span>
          <span>Nutrition is per serving and approximate. Reference intakes are for an average adult (8,400 kJ / 2,000 kcal).</span>
        </footer>
      </div>

      <nav className="tabbar" aria-label="Main">
        {NAV.map((n) => (
          <NavLink key={n.id} to={n.to} end={n.to === '/'} className="tab-link" data-testid={`mobile-nav-${n.id}`}>
            <span className="tab-icon">
              <Icon name={n.icon} size={22} />
              {n.id === 'shopping' && left > 0 && <span className="tab-count">{left}</span>}
            </span>
            <span>{n.id === 'plan' ? 'Plan' : n.label}</span>
          </NavLink>
        ))}
      </nav>
      <Toasts />
    </div>
  );
}
