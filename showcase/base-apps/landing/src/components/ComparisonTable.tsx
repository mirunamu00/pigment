import { COMPARISON_ROWS, PLANS } from '../data/pricing';

export default function ComparisonTable() {
  return (
    <div className="table-scroll">
      <table className="comparison-table" data-testid="comparison-table">
        <caption className="visually-hidden">Features included in each plan</caption>
        <thead>
          <tr data-testid="comparison-header">
            <th scope="col">Feature</th>
            {PLANS.map((plan) => (
              <th key={plan.id} scope="col">
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map((row) => (
            <tr key={row.feature} data-testid="comparison-row">
              <th scope="row">{row.feature}</th>
              {PLANS.map((plan) => {
                const included = row.plans[plan.id];
                return (
                  <td
                    key={plan.id}
                    className={included ? 'cell-included' : 'cell-excluded'}
                    data-testid="comparison-cell"
                    data-included={included}
                  >
                    <span aria-hidden="true">{included ? '✓' : '—'}</span>
                    <span className="visually-hidden">{included ? 'Included' : 'Not included'}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
