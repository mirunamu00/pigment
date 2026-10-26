import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { useCart } from '../cart';
import { ROAST_CALENDAR } from '../data/coffees';
import { BagIcon, CloseIcon, LogoMark, MenuIcon } from './Icons';

const NAV = [
  { to: '/shop', label: 'Shop coffee' },
  { to: '/subscribe', label: 'Subscriptions' },
  { to: '/about', label: 'Our story' },
  { to: '/about#visit', label: 'Visit the roastery' },
];

function navMatchesHash(to: string, hash: string): boolean {
  const i = to.indexOf('#');
  const linkHash = i === -1 ? '' : to.slice(i);
  return linkHash === '' ? hash !== '#visit' : linkHash === hash;
}

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Kiln Street Coffee, home">
      <LogoMark />
      <span className="logo-text">
        <span className="logo-name">Kiln Street</span>
        <span className="logo-sub">Coffee Roasters</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const { count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <div className="announcement">
        <p>
          <span className="ann-long">Roasted every Monday &amp; Thursday</span><span className="ann-short">Roasted Mon &amp; Thu</span><span className="announcement-extra"> · Next roast {ROAST_CALENDAR.next}</span> · <strong>Free UK delivery over £30</strong>
        </p>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <button
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
            data-testid="mobile-menu-toggle"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <Logo />
          <nav className="main-nav" aria-label="Main">
            <ul>
              {NAV.map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    end={n.to === '/about'}
                    className={({ isActive }) => (isActive && navMatchesHash(n.to, location.hash) ? 'active' : '')}
                    data-testid={`nav-${n.to.replace(/[/#]/g, '-').replace(/^-/, '')}`}
                  >
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-actions">
            <Link to="/subscribe" className="button button-small button-outline header-cta">
              Start a subscription
            </Link>
            <button
              type="button"
              className="icon-button cart-button"
              onClick={() => setOpen(true)}
              aria-label={`Bag, ${count} ${count === 1 ? 'item' : 'items'}`}
              data-testid="cart-button"
            >
              <BagIcon width={22} height={22} />
              <span className={`cart-count${count > 0 ? ' has-items' : ''}`} data-testid="cart-count" aria-hidden="true">
                {count}
              </span>
            </button>
          </div>
        </div>
        <div id="mobile-nav" className={`mobile-nav${menuOpen ? ' open' : ''}`} hidden={!menuOpen} data-testid="mobile-nav">
          <nav aria-label="Mobile">
            <ul>
              <li>
                <NavLink to="/" end>
                  Home
                </NavLink>
              </li>
              {NAV.map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    end={n.to === '/about'}
                    className={({ isActive }) => (isActive && navMatchesHash(n.to, location.hash) ? 'active' : '')}
                  >
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link to="/subscribe" className="button button-block">
              Start a subscription
            </Link>
            <p className="mobile-nav-note">Roastery bar open Tue–Sat, 8am–3pm · 61 Kiln Street, Sheffield</p>
          </nav>
        </div>
      </header>
    </>
  );
}
