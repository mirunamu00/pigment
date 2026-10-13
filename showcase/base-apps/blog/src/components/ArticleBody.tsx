import type { Block } from '../data/posts';
import ImagePlaceholder from './ImagePlaceholder';

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case 'heading':
      return block.level === 2 ? (
        <h2 key={index} id={block.id} className="body-heading" data-testid="body-heading">
          {block.text}
        </h2>
      ) : (
        <h3 key={index} id={block.id} className="body-heading" data-testid="body-heading">
          {block.text}
        </h3>
      );
    case 'paragraph':
      return (
        <p key={index} data-testid="body-paragraph">
          {block.text}
        </p>
      );
    case 'quote':
      return (
        <figure key={index} className="body-quote">
          <blockquote data-testid="body-quote">
            <p>{block.text}</p>
          </blockquote>
          {block.cite && <figcaption className="muted small">{block.cite}</figcaption>}
        </figure>
      );
    case 'code':
      return (
        <pre key={index} className="code-block" data-testid="body-code" data-language={block.language}>
          <code>{block.code}</code>
        </pre>
      );
    case 'list': {
      const items = block.items.map((item) => <li key={item}>{item}</li>);
      return block.ordered ? (
        <ol key={index} className="body-list" data-testid="body-ordered-list">
          {items}
        </ol>
      ) : (
        <ul key={index} className="body-list" data-testid="body-unordered-list">
          {items}
        </ul>
      );
    }
    case 'figure':
      return (
        <figure key={index} className="body-figure" data-testid="body-figure">
          <ImagePlaceholder alt={block.alt} />
          <figcaption className="muted small" data-testid="figure-caption">
            {block.caption}
          </figcaption>
        </figure>
      );
  }
}

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="article-body" data-testid="article-body">
      {blocks.map(renderBlock)}
    </div>
  );
}
