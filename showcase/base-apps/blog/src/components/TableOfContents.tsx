import type { Block } from '../data/posts';

type Heading = Extract<Block, { type: 'heading' }>;

export default function TableOfContents({ blocks }: { blocks: Block[] }) {
  const headings = blocks.filter((block): block is Heading => block.type === 'heading');
  if (headings.length === 0) return null;

  return (
    <nav className="toc" aria-labelledby="toc-heading" data-testid="toc">
      <h2 id="toc-heading" className="toc-heading">
        On this page
      </h2>
      <ol className="toc-list">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'toc-item toc-item-nested' : 'toc-item'}>
            <a href={`#${heading.id}`} className="toc-link" data-testid="toc-link">
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
