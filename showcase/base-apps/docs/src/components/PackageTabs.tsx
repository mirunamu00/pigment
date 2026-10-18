import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { PACKAGE_MANAGERS, type PackageManager } from '../data/docs';
import CodeBlock from './CodeBlock';

export default function PackageTabs({ label, commands }: { label: string; commands: Record<PackageManager, string> }) {
  const baseId = useId();
  const [selected, setSelected] = useState<PackageManager>('npm');
  const tabRefs = useRef<Partial<Record<PackageManager, HTMLButtonElement | null>>>({});

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = PACKAGE_MANAGERS.indexOf(selected);
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % PACKAGE_MANAGERS.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + PACKAGE_MANAGERS.length) % PACKAGE_MANAGERS.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = PACKAGE_MANAGERS.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    const next = PACKAGE_MANAGERS[nextIndex];
    setSelected(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="tabs" data-testid="pm-tabs">
      <div className="tab-list" role="tablist" aria-label={label} onKeyDown={handleKeyDown}>
        {PACKAGE_MANAGERS.map((manager) => {
          const isSelected = manager === selected;
          return (
            <button
              key={manager}
              ref={(element) => {
                tabRefs.current[manager] = element;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${manager}`}
              className="tab"
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${manager}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(manager)}
              data-testid={`pm-tab-${manager}`}
            >
              {manager}
            </button>
          );
        })}
      </div>
      {PACKAGE_MANAGERS.map((manager) => (
        <div
          key={manager}
          role="tabpanel"
          id={`${baseId}-panel-${manager}`}
          className="tab-panel"
          aria-labelledby={`${baseId}-tab-${manager}`}
          hidden={manager !== selected}
          data-testid={`pm-panel-${manager}`}
        >
          <CodeBlock code={commands[manager]} language="bash" />
        </div>
      ))}
    </div>
  );
}
