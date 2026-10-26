import { useEffect, useState, type FormEvent } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import { sections } from '../data/stories';
import { CloseIcon, MenuIcon, SearchIcon } from './Icons';
import { Logo } from './Logo';

const navItems = [
  ...sections.map((s) => ({ to: `/section/${s.id}`, label: s.name })),
  { to: '/events', label: 'Listings' },
  { to: '/about', label: 'About' },
];

function SearchForm({ testid, id, onDone }: { testid: string; id: string; onDone?: () => void }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    onDone?.();
  };
  return (
    <form className="search-form" role="search" onSubmit={submit}>
      <label htmlFor={id} className="visually-hidden">
        Search Halfpenny
      </label>
      <input
        id={id}
        type="search"
        placeholder="Search stories"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        data-testid={testid}
      />
      <button type="submit" className="search-form__button" aria-label="Search">
        <SearchIcon />
      </button>
    </form>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname, location.search]);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
  }, [open]);

  return (
    <header className="masthead">
      <div className="topbar">
        <div className="container topbar__inner">
          <p className="topbar__date">
            Monday 26 October 2026 <span aria-hidden>·</span> Issue No. 48
          </p>
          <ul className="topbar__links">
            <li>
              <Link to="/events">This weekend</Link>
            </li>
            <li>
              <Link to="/newsletters">Newsletters</Link>
            </li>
            <li>
              <Link to="/sign-in">Sign in</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container masthead__main">
        <div className="masthead__search">
          <SearchForm testid="search-input" id="masthead-search" />
        </div>
        <div className="masthead__brand">
          <Logo />
          <p className="masthead__tagline">The city, closely read — food, design, music and neighbourhoods in Calder</p>
        </div>
        <div className="masthead__actions">
          <Link to="/about#membership" className="button button--primary" data-testid="subscribe-button">
            Subscribe
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <nav className="section-nav" aria-label="Sections">
        <div className="container">
          <ul className="section-nav__list">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="section-nav__link" data-testid={`nav-${item.label.toLowerCase()}`}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} hidden={!open} data-testid="mobile-menu">
        <SearchForm testid="mobile-search-input" id="mobile-search" onDone={() => setOpen(false)} />
        <ul className="mobile-menu__list">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className="mobile-menu__link">
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link to="/about#membership" className="button button--primary button--block">
          Become a member
        </Link>
        <ul className="mobile-menu__meta">
          <li>
            <Link to="/newsletters">Newsletters</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign in</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
