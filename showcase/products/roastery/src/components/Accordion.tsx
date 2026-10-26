import { useId, useState, type ReactNode } from 'react';
import { PlusIcon } from './Icons';

export interface QA {
  q: string;
  a: ReactNode;
}

export default function Accordion({ items }: { items: QA[] }) {
  const id = useId();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`accordion-item${isOpen ? ' open' : ''}`}>
            <h3>
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                data-testid="faq-toggle"
              >
                <span>{item.q}</span>
                <PlusIcon className="accordion-icon" />
              </button>
            </h3>
            <div id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-b${i}`} hidden={!isOpen} className="accordion-panel">
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
