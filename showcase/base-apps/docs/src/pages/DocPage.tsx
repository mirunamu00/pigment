import { Link, useParams } from 'react-router';
import DocBody from '../components/DocBody';
import Feedback from '../components/Feedback';
import Pager from '../components/Pager';
import TableOfContents from '../components/TableOfContents';
import { findGroup, findPage, getAdjacentPages, getHeadings, pagePath, pagesInGroup } from '../data/docs';

export default function DocPage() {
  const { group, slug } = useParams();
  const page = findPage(group, slug);

  if (!page) {
    return (
      <div className="empty-state" data-testid="doc-not-found">
        <h1>Page not found</h1>
        <p className="muted">There is no documentation page at “{`${group}/${slug}`}”. It may have been renamed.</p>
        <Link to="/">Back to the docs home</Link>
      </div>
    );
  }

  const pageGroup = findGroup(page.group);
  const { prev, next } = getAdjacentPages(page);
  const toc = getHeadings(page.body).map(({ id, text, level }) => ({ id, text, level }));

  return (
    <article className="doc-article" data-testid="doc-article">
      <nav aria-label="Breadcrumb" className="breadcrumb" data-testid="breadcrumb">
        <ol>
          <li>
            <Link to="/">Docs</Link>
          </li>
          <li>
            <Link to={pagePath(pagesInGroup(page.group)[0])}>{pageGroup.label}</Link>
          </li>
          <li aria-current="page">{page.title}</li>
        </ol>
      </nav>
      <header className="doc-header">
        <h1 data-testid="doc-title">{page.title}</h1>
        <p className="lead muted" data-testid="doc-description">
          {page.description}
        </p>
      </header>
      <aside className="doc-aside">
        <TableOfContents entries={toc} />
      </aside>
      <DocBody blocks={page.body} />
      <Feedback key={pagePath(page)} />
      <Pager prev={prev} next={next} />
    </article>
  );
}
