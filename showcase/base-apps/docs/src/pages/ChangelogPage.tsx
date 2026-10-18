import Inline from '../components/Inline';
import TableOfContents from '../components/TableOfContents';
import { CHANGE_LABELS, releases } from '../data/changelog';
import { formatDate, TOOL_NAME } from '../data/site';

export default function ChangelogPage() {
  const toc = releases.map((release) => ({ id: release.id, text: release.version, level: 2 as const }));

  return (
    <article className="doc-article changelog" data-testid="changelog">
      <header className="doc-header">
        <h1>Changelog</h1>
        <p className="lead muted">Every {TOOL_NAME} release, newest first.</p>
      </header>
      <aside className="doc-aside">
        <TableOfContents entries={toc} />
      </aside>
      <ol className="release-list">
        {releases.map((release) => (
          <li key={release.id} className="release" data-testid="release">
            <h2 id={release.id} className="release-version doc-heading" data-testid="release-version">
              {release.version}
            </h2>
            <p className="release-meta muted small">
              Released{' '}
              <time dateTime={release.date} data-testid="release-date">
                {formatDate(release.date)}
              </time>
            </p>
            <p>{release.summary}</p>
            <ul className="change-list">
              {release.changes.map((change) => (
                <li key={change.text} className="change-item" data-testid="change-item">
                  <span className={`change-badge change-badge-${change.type}`} data-type={change.type} data-testid="change-badge">
                    {CHANGE_LABELS[change.type]}
                  </span>
                  <span className="change-text">
                    <Inline text={change.text} />
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </article>
  );
}
