import { MAX_QUANTITY } from '../data/products';

interface QuantityStepperProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  /** Prefix for data-testid values: `${testIdPrefix}-decrement` etc. */
  testIdPrefix: string;
  hideLabel?: boolean;
  /** Used in the button labels, e.g. "Increase quantity of Canvas Field Tote". */
  itemName?: string;
}

export default function QuantityStepper({ id, label, value, onChange, testIdPrefix, hideLabel, itemName }: QuantityStepperProps) {
  const suffix = itemName ? ` of ${itemName}` : '';

  function set(next: number) {
    if (Number.isNaN(next)) return;
    onChange(Math.min(MAX_QUANTITY, Math.max(1, next)));
  }

  return (
    <div className="stepper">
      <label htmlFor={id} className={hideLabel ? 'visually-hidden' : 'field-label'}>
        {label}
      </label>
      <div className="stepper-controls">
        <button
          type="button"
          className="button stepper-button"
          aria-label={`Decrease quantity${suffix}`}
          disabled={value <= 1}
          onClick={() => set(value - 1)}
          data-testid={`${testIdPrefix}-decrement`}
        >
          −
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={1}
          max={MAX_QUANTITY}
          className="input stepper-input"
          value={value}
          onChange={(event) => set(Number.parseInt(event.target.value, 10))}
          data-testid={`${testIdPrefix}-input`}
        />
        <button
          type="button"
          className="button stepper-button"
          aria-label={`Increase quantity${suffix}`}
          disabled={value >= MAX_QUANTITY}
          onClick={() => set(value + 1)}
          data-testid={`${testIdPrefix}-increment`}
        >
          +
        </button>
      </div>
    </div>
  );
}
