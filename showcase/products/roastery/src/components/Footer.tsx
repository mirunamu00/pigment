import { Link } from 'react-router';
import { LogoMark } from './Icons';
import Newsletter from './Newsletter';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-signup">
            <h2 className="footer-title">The Roast Letter</h2>
            <p>
              New arrivals before they hit the shop, brew notes from the bar, and the odd subscriber-only lot. Every other
              Thursday.
            </p>
            <Newsletter />
          </div>
          <div className="footer-cols">
            <div>
              <h3>Shop</h3>
              <ul>
                <li>
                  <Link to="/shop">All coffees</Link>
                </li>
                <li>
                  <Link to="/shop/furnace-house-blend">Furnace House Blend</Link>
                </li>
                <li>
                  <Link to="/shop/las-nubes-decaf">Decaf</Link>
                </li>
                <li>
                  <Link to="/subscribe">Subscriptions</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Kiln Street</h3>
              <ul>
                <li>
                  <Link to="/about">Our story</Link>
                </li>
                <li>
                  <Link to="/about#sourcing">How we source</Link>
                </li>
                <li>
                  <Link to="/about#visit">Visit the roastery</Link>
                </li>
                <li>
                  <a href="mailto:wholesale@kilnstreet.coffee">Wholesale</a>
                </li>
              </ul>
            </div>
            <div>
              <h3>Help</h3>
              <ul>
                <li>
                  <Link to="/shipping">Delivery &amp; returns</Link>
                </li>
                <li>
                  <Link to="/subscribe#subscription-faq">Subscription FAQ</Link>
                </li>
                <li>
                  <a href="mailto:hello@kilnstreet.coffee">hello@kilnstreet.coffee</a>
                </li>
                <li>
                  <a href="tel:+441142790416">0114 279 0416</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-brand">
            <LogoMark size={28} />
            <p>© 2026 Kiln Street Coffee Ltd · Registered in England no. 11847203 · 61 Kiln Street, Sheffield S3 8RQ</p>
          </div>
          <nav aria-label="Legal" className="legal-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms of sale</Link>
            <Link to="/cookies">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
