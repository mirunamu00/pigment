import type { BillingPeriod } from '../data/pricing';
import { YEARLY_DISCOUNT_PERCENT } from '../data/pricing';

const OPTIONS: { id: BillingPeriod; label: string }[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' },
];

interface Props {
  value: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
}

export default function BillingToggle({ value, onChange }: Props) {
  return (
    <div className="billing-toggle-wrap">
      <div role="group" aria-label="Billing period" className="billing-toggle" data-testid="billing-toggle">
        {OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            className="button billing-option"
            aria-pressed={value === option.id}
            onClick={() => onChange(option.id)}
            data-testid={`billing-${option.id}`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="muted small" aria-live="polite" data-testid="billing-note">
        {value === 'yearly'
          ? `Billed yearly. You save ${YEARLY_DISCOUNT_PERCENT}%.`
          : `Billed monthly. Switch to yearly to save ${YEARLY_DISCOUNT_PERCENT}%.`}
      </p>
    </div>
  );
}
