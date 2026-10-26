import { Link } from 'react-router';
import { StoryCard } from '../components/StoryCard';
import { latest } from '../data/stories';
import { useTitle } from '../useTitle';

export function NotFound() {
  useTitle('Page not found');
  return (
    <div className="container page-pad">
      <div className="not-found">
        <p className="kicker">Error 404</p>
        <h1 className="display">This page has gone to press without us</h1>
        <p className="lede">
          The link may be old, or the story may have moved. Try the front page, search, or one of the latest stories below.
        </p>
        <div className="button-row">
          <Link to="/" className="button button--primary">
            Back to the front page
          </Link>
          <Link to="/search" className="button button--secondary">
            Search stories
          </Link>
        </div>
      </div>
      <h2 className="rule-heading">Latest stories</h2>
      <div className="grid grid--3">
        {latest.slice(0, 3).map((s) => (
          <StoryCard key={s.slug} story={s} />
        ))}
      </div>
    </div>
  );
}
