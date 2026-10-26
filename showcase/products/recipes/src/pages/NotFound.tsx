import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { Photo } from '../components/ui';
import { useTitle } from '../useTitle';

export default function NotFound() {
  useTitle('Page not found — Panful');
  return (
    <div className="page not-found">
      <div className="card nf-card">
        <Photo name="herbs-chopping" className="nf-photo" />
        <div className="nf-body">
          <p className="eyebrow">Error 404</p>
          <h1>This page has gone off the menu</h1>
          <p className="muted">The link may be old, or the recipe may have been retired. Try searching, or head back to today’s plan.</p>
          <div className="btn-row">
            <Link to="/" className="btn btn-primary" data-testid="notfound-home">
              <Icon name="home" size={18} /> Back to Today
            </Link>
            <Link to="/recipes" className="btn btn-secondary">
              Browse recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
