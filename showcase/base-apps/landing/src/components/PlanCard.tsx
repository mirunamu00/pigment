import { Link } from 'react-router';
import type { BillingPeriod, Plan } from '../data/pricing';

interface Props {
  plan: Plan;
  period: BillingPeriod;
}

export default function PlanCard({ plan, period }: Props) {
  const price = plan.price[period];
  const headingId = `plan-${plan.id}-heading`;
  return (
    <article
      className={plan.popular ? 'plan-card plan-card-popular' : 'plan-card'}
      aria-labelledby={headingId}
      data-testid="plan-card"
      data-plan={plan.id}
    >
      <div className="plan-card-header">
        <h2 id={headingId} className="plan-name" data-testid="plan-name">
          {plan.name}
        </h2>
        {plan.popular && (
          <span className="badge" data-testid="plan-popular">
            Most popular
          </span>
        )}
      </div>
      <p className="muted">{plan.description}</p>
      <p className="plan-price-line">
        <span className="plan-price" data-testid="plan-price">
          ${price}
        </span>{' '}
        <span className="muted small">per user / month</span>
      </p>
      <p className="muted small plan-billed" data-testid="plan-billed">
        {period === 'yearly' ? `$${price * 12} per user, billed yearly` : 'Billed monthly, cancel any time'}
      </p>
      <ul className="plan-features">
        {plan.features.map((feature) => (
          <li key={feature} data-testid="plan-feature">
            {feature}
          </li>
        ))}
      </ul>
      <Link
        to="/signup"
        className={plan.popular ? 'button button-primary plan-cta' : 'button plan-cta'}
        data-testid="plan-cta"
      >
        {plan.cta}
      </Link>
    </article>
  );
}
