import { useState } from 'react';
import BillingToggle from '../components/BillingToggle';
import ComparisonTable from '../components/ComparisonTable';
import CtaBand from '../components/CtaBand';
import FaqList from '../components/FaqList';
import PlanCard from '../components/PlanCard';
import { PRICING_FAQ_ITEMS } from '../data/faq';
import { PLANS, type BillingPeriod } from '../data/pricing';

export default function PricingPage() {
  const [period, setPeriod] = useState<BillingPeriod>('monthly');

  return (
    <>
      <section className="section page-hero" aria-labelledby="pricing-title">
        <div className="container">
          <div className="section-header section-header-center">
            <p className="eyebrow">Pricing</p>
            <h1 id="pricing-title">Simple pricing for every team</h1>
            <p className="muted">Every plan includes a 14-day trial. Pay per person who can be booked.</p>
          </div>
          <BillingToggle value={period} onChange={setPeriod} />
          <div className="plan-grid" data-testid="plan-grid">
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} period={period} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="compare-heading" data-testid="compare">
        <div className="container">
          <h2 id="compare-heading">Compare plans</h2>
          <ComparisonTable />
        </div>
      </section>

      <section className="section section-muted" aria-labelledby="pricing-faq-heading" data-testid="pricing-faq">
        <div className="container container-narrow">
          <h2 id="pricing-faq-heading">Billing questions</h2>
          <FaqList items={PRICING_FAQ_ITEMS} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
