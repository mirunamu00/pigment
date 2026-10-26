import { useSearchParams } from 'react-router';
import { SearchIcon } from '../components/Icons';
import { StoryCard } from '../components/StoryCard';
import { latest, sectionById } from '../data/stories';
import { useTitle } from '../useTitle';

const suggestions = ['bakery', 'records', 'Upper Weir', 'Tanner Street', 'review'];

export function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  useTitle(q ? `Search: ${q}` : 'Search');

  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const results = terms.length
    ? latest.filter((s) => {
        const hay = [s.title, s.dek, s.author, s.kind, sectionById(s.section)?.name ?? '', s.caption].join(' ').toLowerCase();
        return terms.every((t) => hay.includes(t));
      })
    : [];

  const setQ = (value: string) => setParams(value ? { q: value } : {}, { replace: true });

  return (
    <div className="container page-pad search-page">
      <p className="kicker">Search</p>
      <h1 className="display display--small">Search the magazine</h1>
      <form className="search-page__form" role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-page-input" className="visually-hidden">
          Search stories
        </label>
        <SearchIcon size={22} />
        <input
          id="search-page-input"
          type="search"
          value={q}
          placeholder="Try a place, a dish, a writer…"
          onChange={(e) => setQ(e.target.value)}
          autoComplete="off"
          data-testid="search-page-input"
        />
      </form>
      <div className="search-page__suggest">
        <span>Popular:</span>
        {suggestions.map((s) => (
          <button key={s} type="button" className="chip chip--small" onClick={() => setQ(s)}>
            {s}
          </button>
        ))}
      </div>

      <p className="search-page__count" aria-live="polite" data-testid="search-count">
        {terms.length === 0
          ? `Search ${latest.length} stories from this autumn.`
          : `${results.length} ${results.length === 1 ? 'story matches' : 'stories match'} “${q}”`}
      </p>

      {terms.length > 0 && results.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state__title">No stories match “{q}”.</p>
          <p>Check the spelling, try a broader word, or browse a section from the menu.</p>
        </div>
      ) : null}

      <ul className="story-list">
        {(terms.length ? results : latest.slice(0, 4)).map((s) => (
          <li key={s.slug}>
            <StoryCard story={s} variant="row" />
          </li>
        ))}
      </ul>
    </div>
  );
}
