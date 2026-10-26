import { Link } from 'react-router';
import Img from '../components/Img';
import { useTitle } from '../useTitle';

export default function NotFound() {
  useTitle('Page not found — Kiln Street Coffee');
  return (
    <section className="section not-found" data-testid="not-found">
      <div className="container not-found-inner">
        <div>
          <p className="eyebrow">Error 404</p>
          <h1>This page has been roasted a little too dark</h1>
          <p className="lede">
            We couldn’t find what you were looking for. It may have sold out, or the link may be out of date.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="button">
              Shop coffee
            </Link>
            <Link to="/" className="button button-outline">
              Back to home
            </Link>
          </div>
        </div>
        <Img name="beans-dark" className="not-found-photo" />
      </div>
    </section>
  );
}
