import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router';
import { findGroup, pagePath, searchPages } from '../data/docs';

export default function SearchBox() {
  const inputId = useId();
  const resultsId = `${inputId}-results`;
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const trimmed = query.trim();
  const results = searchPages(query);
  const showPanel = open && trimmed.length > 0;

  // Leaving the page closes the panel and clears the query.
  useEffect(() => {
    setQuery('');
    setOpen(false);
  }, [location.pathname]);

  // Clicking anywhere outside the search closes the panel.
  useEffect(() => {
    if (!showPanel) return;
    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [showPanel]);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setQuery('');
      setOpen(false);
    }
  }

  return (
    <div className="search" role="search" ref={containerRef} data-testid="search">
      <label htmlFor={inputId} className="visually-hidden">
        Search docs
      </label>
      <input
        id={inputId}
        type="search"
        className="input search-input"
        placeholder="Search docs"
        autoComplete="off"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        aria-controls={showPanel ? resultsId : undefined}
        data-testid="doc-search"
      />
      {showPanel && (
        <div id={resultsId} className="search-panel" data-testid="search-panel">
          <p className="search-count muted small" role="status" data-testid="search-count">
            {results.length === 1 ? '1 result' : `${results.length} results`}
          </p>
          {results.length > 0 ? (
            <ul className="search-results" data-testid="search-results">
              {results.map((page) => (
                <li key={pagePath(page)}>
                  <Link to={pagePath(page)} className="search-result" data-testid="search-result">
                    <span className="search-result-title">{page.title}</span>
                    <span className="search-result-group muted small">{findGroup(page.group).label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="search-empty" data-testid="search-empty">
              No results for “{trimmed}”. Try a shorter or different word.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
