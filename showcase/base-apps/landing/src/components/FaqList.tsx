import { useId, useState } from 'react';
import type { FaqItem } from '../data/faq';

export default function FaqList({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<string[]>([]);

  function toggle(id: string) {
    setOpenIds((current) => (current.includes(id) ? current.filter((openId) => openId !== id) : [...current, id]));
  }

  return (
    <ul className="faq-list" data-testid="faq-list">
      {items.map((item) => {
        const open = openIds.includes(item.id);
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <li key={item.id} className="faq-item" data-testid="faq-item">
            <h3 className="faq-question">
              <button
                id={buttonId}
                type="button"
                className="faq-toggle"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                data-testid="faq-toggle"
              >
                <span>{item.question}</span>
                <span className="faq-indicator" aria-hidden="true">
                  {open ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq-panel"
              hidden={!open}
              data-testid="faq-panel"
            >
              <p>{item.answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
