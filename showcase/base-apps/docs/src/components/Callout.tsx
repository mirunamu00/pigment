import type { CalloutVariant } from '../data/docs';
import Inline from './Inline';

const ICON_LABELS: Record<CalloutVariant, string> = {
  note: 'i',
  warning: '!',
  danger: '×',
};

const VARIANT_NAMES: Record<CalloutVariant, string> = {
  note: 'Note',
  warning: 'Warning',
  danger: 'Danger',
};

export default function Callout({ variant, title, text }: { variant: CalloutVariant; title: string; text: string }) {
  return (
    <aside
      className={`callout callout-${variant}`}
      role="note"
      aria-label={`${VARIANT_NAMES[variant]}: ${title}`}
      data-variant={variant}
      data-testid="callout"
    >
      <span className="callout-icon" aria-hidden="true">
        {ICON_LABELS[variant]}
      </span>
      <div className="callout-content">
        <p className="callout-title" data-testid="callout-title">
          {title}
        </p>
        <p className="callout-text">
          <Inline text={text} />
        </p>
      </div>
    </aside>
  );
}
