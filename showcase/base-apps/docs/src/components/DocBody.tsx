import type { Block } from '../data/docs';
import Callout from './Callout';
import CodeBlock from './CodeBlock';
import Inline from './Inline';
import PackageTabs from './PackageTabs';
import ParamsTable from './ParamsTable';

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case 'heading': {
      const Tag = block.level === 2 ? 'h2' : 'h3';
      return (
        <Tag key={index} id={block.id} className="doc-heading" data-testid="doc-heading">
          <Inline text={block.text} />
        </Tag>
      );
    }
    case 'paragraph':
      return (
        <p key={index} data-testid="doc-paragraph">
          <Inline text={block.text} />
        </p>
      );
    case 'code':
      return <CodeBlock key={index} code={block.code} language={block.language} />;
    case 'callout':
      return <Callout key={index} variant={block.variant} title={block.title} text={block.text} />;
    case 'params':
      return <ParamsTable key={index} label={block.label} rows={block.rows} />;
    case 'steps':
      return (
        <ol key={index} className="steps" data-testid="steps-list">
          {block.items.map((item) => (
            <li key={item} className="step">
              <Inline text={item} />
            </li>
          ))}
        </ol>
      );
    case 'list':
      return (
        <ul key={index} className="doc-list" data-testid="doc-list">
          {block.items.map((item) => (
            <li key={item}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case 'tabs':
      return <PackageTabs key={index} label={block.label} commands={block.commands} />;
  }
}

export default function DocBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="doc-body" data-testid="doc-body">
      {blocks.map(renderBlock)}
    </div>
  );
}
