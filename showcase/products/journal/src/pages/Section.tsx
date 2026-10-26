import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Img } from '../components/Img';
import { NewsletterForm } from '../components/Newsletter';
import { Kicker, Meta, StoryCard } from '../components/StoryCard';
import { sectionById, sections, storiesIn, storyHref, type Kind } from '../data/stories';
import { useTitle } from '../useTitle';
import { NotFound } from './NotFound';

const PAGE = 6;

function plural(kind: Kind) {
  return kind.endsWith('y') ? kind.slice(0, -1) + 'ies' : kind + 's';
}

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-');
}

export function SectionPage() {
  const { id = '' } = useParams();
  const section = sectionById(id);
  const [filter, setFilter] = useState<Kind | 'All'>('All');
  const [count, setCount] = useState(PAGE);
  useTitle(section?.name ?? 'Page not found');

  useEffect(() => {
    setFilter('All');
    setCount(PAGE);
  }, [id]);

  if (!section) return <NotFound />;

  const all = storiesIn(section.id);
  const [featured, ...rest] = all;
  const kinds = Array.from(new Set(rest.map((s) => s.kind)));
  const filtered = filter === 'All' ? rest : rest.filter((s) => s.kind === filter);
  const visible = filtered.slice(0, count);
  const popular = [...all].sort((a, b) => b.read - a.read).slice(0, 4);
  const others = sections.filter((s) => s.id !== section.id);

  const choose = (k: Kind | 'All') => {
    setFilter(k);
    setCount(PAGE);
  };

  return (
    <>
      <header className="section-header">
        <div className="container">
          <p className="kicker">Section</p>
          <h1 className="section-header__title">{section.name}</h1>
          <p className="section-header__intro">{section.intro}</p>
          <p className="meta">
            <span>
              Edited by <span className="meta__author">{section.editor}</span>
            </span>
            <span aria-hidden>·</span>
            <span>{all.length} stories this autumn</span>
          </p>
        </div>
      </header>

      <div className="container">
        <article className="featured">
          <Link to={storyHref(featured)} className="featured__media" tabIndex={-1} aria-hidden>
            <Img name={featured.photo} />
          </Link>
          <div className="featured__body">
            <p className="featured__label">Featured</p>
            <Kicker story={featured} showSection={false} />
            <h2 className="featured__title">
              <Link to={storyHref(featured)}>{featured.title}</Link>
            </h2>
            <p className="featured__dek">{featured.dek}</p>
            <Meta story={featured} />
          </div>
        </article>

        <div className="section-layout">
          <section aria-labelledby="all-stories-heading">
            <div className="list-head">
              <h2 id="all-stories-heading" className="list-head__title">
                All {section.name.toLowerCase()} stories
              </h2>
              <div className="chips" role="group" aria-label="Filter by type">
                {(['All', ...kinds] as Array<Kind | 'All'>).map((k) => (
                  <button
                    key={k}
                    type="button"
                    className="chip"
                    aria-pressed={filter === k}
                    onClick={() => choose(k)}
                    data-testid={`filter-${slugify(k === 'All' ? 'all' : plural(k))}`}
                  >
                    {k === 'All' ? 'All' : plural(k)}
                    <span className="chip__count">{k === 'All' ? rest.length : rest.filter((s) => s.kind === k).length}</span>
                  </button>
                ))}
              </div>
            </div>

            <ul className="story-list" aria-live="polite">
              {visible.map((s) => (
                <li key={s.slug}>
                  <StoryCard story={s} variant="row" showSection={false} />
                </li>
              ))}
            </ul>

            <div className="load-more">
              <p className="load-more__count" data-testid="results-count">
                Showing {visible.length} of {filtered.length} {filter === 'All' ? 'stories' : plural(filter).toLowerCase()}
              </p>
              {visible.length < filtered.length ? (
                <button type="button" className="button button--secondary" onClick={() => setCount((c) => c + PAGE)} data-testid="load-more">
                  Load more stories
                </button>
              ) : (
                <p className="load-more__end">You’ve reached the end — older stories are in the archive.</p>
              )}
            </div>
          </section>

          <aside className="section-aside">
            <div className="aside-block">
              <h2 className="rail-heading">Most read in {section.name}</h2>
              <ol className="mini-ranked">
                {popular.map((s, i) => (
                  <li key={s.slug}>
                    <span className="mini-ranked__num">{i + 1}</span>
                    <Link to={storyHref(s)}>{s.title}</Link>
                  </li>
                ))}
              </ol>
            </div>
            <div className="aside-block aside-block--tinted">
              <h2 className="aside-block__title">Get the Weekender</h2>
              <p>The best of {section.name.toLowerCase()} and everything else on in Calder, every Thursday.</p>
              <NewsletterForm testPrefix="aside-newsletter" variant="footer" />
            </div>
            <div className="aside-block">
              <h2 className="rail-heading">Other sections</h2>
              <ul className="aside-links">
                {others.map((s) => (
                  <li key={s.id}>
                    <Link to={`/section/${s.id}`}>{s.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
