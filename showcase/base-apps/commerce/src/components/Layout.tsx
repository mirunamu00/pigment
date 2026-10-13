import { Link, NavLink, Outlet } from 'react-router';
import { useCart } from '../cart/CartContext';
import { CartIcon } from './Icons';

const NAV_ITEMS = [
  { to: '/', label: 'Shop', testId: 'nav-shop', end: true },
  { to: '/cart', label: 'Cart', testId: 'nav-cart', end: false },
];

export default function Layout() {
  const { itemCount } = useCart();
  const itemLabel = itemCount === 1 ? '1 item' : `${itemCount} items`;

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link to="/" className="brand" data-testid="brand-link">
          Fieldhouse Supply
        </Link>
        <nav aria-label="Primary" className="site-nav" data-testid="primary-nav">
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
        <Link to="/cart" className="button cart-button" aria-label={`Cart, ${itemLabel}`} data-testid="cart-button">
          <CartIcon />
          <span className="cart-button-label" aria-hidden="true">
            Cart
          </span>
          <span className="badge" aria-hidden="true" data-testid="cart-count">
            {itemCount}
          </span>
        </Link>
      </header>

      <main id="main-content" className="content" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <p className="muted small">Fieldhouse Supply · Free shipping on orders over $100 · Returns within 30 days</p>
      </footer>
    </div>
  );
}
