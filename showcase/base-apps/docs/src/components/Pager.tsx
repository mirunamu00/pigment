import { Link } from 'react-router';
import { pagePath, type DocPage } from '../data/docs';

export default function Pager({ prev, next }: { prev?: DocPage; next?: DocPage }) {
  if (!prev && !next) return null;

  return (
    <nav className="pager" aria-label="Previous and next pages" data-testid="pager">
      {prev ? (
        <Link to={pagePath(prev)} className="pager-link pager-prev" rel="prev" data-testid="pager-prev">
          <span className="pager-label">Previous</span>
          <span className="pager-title">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link to={pagePath(next)} className="pager-link pager-next" rel="next" data-testid="pager-next">
          <span className="pager-label">Next</span>
          <span className="pager-title">{next.title}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
