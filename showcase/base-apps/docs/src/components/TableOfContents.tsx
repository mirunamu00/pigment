import Inline from './Inline';

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

export default function TableOfContents({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <nav className="toc" aria-labelledby="toc-heading" data-testid="toc">
      <h2 id="toc-heading" className="toc-heading">
        On this page
      </h2>
      <ul className="toc-list">
        {entries.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? 'toc-item toc-item-nested' : 'toc-item'}>
            <a href={`#${entry.id}`} className="toc-link" data-testid="toc-link">
              <Inline text={entry.text} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
