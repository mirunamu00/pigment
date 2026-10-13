import { useState } from 'react';
import ConfirmDialog from '../components/ConfirmDialog';
import { initialPlanId, invoices, paymentMethod, plans, type Plan, type PlanId } from '../data/billing';

export default function BillingPage() {
  const [currentPlanId, setCurrentPlanId] = useState<PlanId>(initialPlanId);
  const [pendingPlan, setPendingPlan] = useState<Plan | null>(null);
  const [message, setMessage] = useState('');

  const currentPlan = plans.find((plan) => plan.id === currentPlanId) ?? plans[0];

  function confirmChange() {
    if (!pendingPlan) return;
    setCurrentPlanId(pendingPlan.id);
    setMessage(`Your plan is now ${pendingPlan.name}.`);
    setPendingPlan(null);
  }

  return (
    <>
      <div className="page-header">
        <h1>Billing</h1>
        <p className="muted">
          You are on the <strong data-testid="current-plan-name">{currentPlan.name}</strong> plan.
        </p>
      </div>

      <section className="panel" aria-labelledby="plans-heading">
        <h2 id="plans-heading">Plans</h2>
        <ul className="plan-grid">
          {plans.map((plan) => {
            const isCurrent = plan.id === currentPlanId;
            return (
              <li
                key={plan.id}
                className={isCurrent ? 'card plan-card plan-card-current' : 'card plan-card'}
                data-testid={`plan-card-${plan.id}`}
                data-current={isCurrent ? 'true' : 'false'}
                aria-current={isCurrent ? 'true' : undefined}
              >
                <h3>{plan.name}</h3>
                <p className="plan-price">
                  <span className="plan-amount">{plan.price}</span> <span className="muted small">{plan.period}</span>
                </p>
                <ul className="feature-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <svg className="icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
                        <path d="M3 8.5l3 3l7-7" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {isCurrent ? (
                  <p className="pill pill-current" data-testid="current-plan-badge">
                    Current plan
                  </p>
                ) : (
                  <button
                    type="button"
                    className="button"
                    onClick={() => setPendingPlan(plan)}
                    data-testid={`choose-plan-${plan.id}`}
                  >
                    Switch to {plan.name}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <p role="status" className="status-message" data-testid="plan-status">
          {message}
        </p>
      </section>

      <section className="panel" aria-labelledby="payment-heading">
        <h2 id="payment-heading">Payment method</h2>
        <div className="payment-method" data-testid="payment-method">
          <svg className="card-icon" viewBox="0 0 32 22" width="32" height="22" aria-hidden="true" focusable="false">
            <rect x="1" y="1" width="30" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <rect x="1" y="6" width="30" height="4" fill="currentColor" />
          </svg>
          <span>
            {paymentMethod.brand} ending in {paymentMethod.last4}
          </span>
          <span className="muted small">Expires {paymentMethod.expires}</span>
        </div>
      </section>

      <section className="panel" aria-labelledby="invoices-heading">
        <h2 id="invoices-heading">Invoices</h2>
        <div className="table-wrap">
          <table className="table" data-testid="invoices-table">
            <thead>
              <tr>
                <th scope="col">Invoice</th>
                <th scope="col">Date</th>
                <th scope="col" className="numeric">
                  Amount
                </th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} data-testid="invoice-row">
                  <td>{invoice.id}</td>
                  <td>{invoice.date}</td>
                  <td className="numeric">{invoice.amount}</td>
                  <td>
                    <span className={invoice.status === 'Paid' ? 'pill pill-paid' : 'pill pill-due'}>
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ConfirmDialog
        open={pendingPlan !== null}
        title={pendingPlan ? `Switch to the ${pendingPlan.name} plan?` : 'Change plan'}
        confirmLabel="Confirm change"
        onConfirm={confirmChange}
        onCancel={() => setPendingPlan(null)}
        testId="plan-dialog"
      >
        {pendingPlan && (
          <p>
            You will move from {currentPlan.name} to {pendingPlan.name} ({pendingPlan.price} {pendingPlan.period}).
            The change takes effect on your next invoice.
          </p>
        )}
      </ConfirmDialog>
    </>
  );
}
