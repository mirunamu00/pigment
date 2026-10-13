import { useState } from 'react';
import { Link } from 'react-router';
import PostCard from '../components/PostCard';
import PostMeta from '../components/PostMeta';
import TagChip from '../components/TagChip';
import { getFeaturedPost, posts, TAGS, type TagId } from '../data/posts';

type TagFilter = TagId | 'all';

export default function HomePage() {
  const featured = getFeaturedPost();
  const listPosts = posts.filter((post) => post.slug !== featured.slug);
  const [activeTag, setActiveTag] = useState<TagFilter>('all');
  const [query, setQuery] = useState('');

  const term = query.trim().toLowerCase();
  const visible = listPosts.filter(
    (post) =>
      (activeTag === 'all' || post.tags.includes(activeTag)) &&
      (!term || post.title.toLowerCase().includes(term) || post.excerpt.toLowerCase().includes(term)),
  );

  function clearFilters() {
    setActiveTag('all');
    setQuery('');
  }

  const filterOptions: { id: TagFilter; label: string }[] = [{ id: 'all', label: 'All' }, ...TAGS];

  return (
    <>
      <div className="page-header">
        <h1>Field Notes</h1>
        <p className="muted">Essays on building software, writing clearly and working well together.</p>
      </div>

      <section className="featured" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="section-label">
          Featured
        </h2>
        <article className="featured-post" data-testid="featured-post">
          <h3 className="featured-title">
            <Link to={`/posts/${featured.slug}`} data-testid="featured-post-link">
              {featured.title}
            </Link>
          </h3>
          <PostMeta post={featured} />
          <p className="featured-excerpt">{featured.excerpt}</p>
          <ul className="tag-list" aria-label="Tags">
            {featured.tags.map((tag) => (
              <li key={tag}>
                <TagChip tag={tag} />
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="post-list-section" aria-labelledby="posts-heading">
        <h2 id="posts-heading">More posts</h2>

        <div className="filter-bar">
          <div className="field">
            <label htmlFor="post-search" className="field-label">
              Search posts
            </label>
            <input
              id="post-search"
              type="search"
              className="input"
              placeholder="Search by title or summary"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              data-testid="post-search"
            />
          </div>
          <div role="group" aria-label="Filter by tag" className="tag-filter" data-testid="tag-filter">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className="button tag-filter-button"
                aria-pressed={activeTag === option.id}
                onClick={() => setActiveTag(option.id)}
                data-testid={`tag-filter-${option.id}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <p className="muted small" aria-live="polite" data-testid="result-count">
          Showing {visible.length} of {listPosts.length} posts
        </p>

        {visible.length > 0 ? (
          <ul className="post-list">
            {visible.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state" data-testid="posts-empty">
            <h3>No posts match these filters</h3>
            <p className="muted">Try a different tag or a shorter search.</p>
            <button type="button" className="button" onClick={clearFilters} data-testid="clear-filters">
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
