import { Link } from 'react-router';
import { authors } from '../data/authors';
import { posts } from '../data/posts';

export default function AboutPage() {
  return (
    <>
      <div className="page-header">
        <h1>About Field Notes</h1>
        <p className="muted">A small publication about the unglamorous parts of making software.</p>
      </div>

      <section className="prose" aria-labelledby="about-why-heading">
        <h2 id="about-why-heading">Why we write</h2>
        <p>
          Field Notes started as an internal wiki page where we collected things we wished someone had told us sooner.
          Over time the page grew long enough that colleagues at other companies started asking for the link, so we
          turned it into this blog.
        </p>
        <p>
          We publish about twice a month. Posts are written by the people doing the work, edited lightly, and kept
          practical. If a post does not change how at least one reader works next week, we have not done our job.
        </p>
        <p>
          So far we have published {posts.length} posts. Start with the <Link to="/">latest writing</Link>, or
          subscribe below to get new posts by email.
        </p>
      </section>

      <section className="authors" aria-labelledby="about-authors-heading">
        <h2 id="about-authors-heading">The authors</h2>
        <ul className="author-list">
          {authors.map((author) => (
            <li key={author.id}>
              <article className="author-card" data-testid="author-card">
                <span className="avatar" aria-hidden="true">
                  {author.initials}
                </span>
                <div>
                  <h3>{author.name}</h3>
                  <p className="muted small">{author.role}</p>
                  <p>{author.bio}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
