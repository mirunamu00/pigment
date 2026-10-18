import type { Param } from '../data/docs';
import Inline from './Inline';

export default function ParamsTable({ label, rows }: { label: string; rows: Param[] }) {
  return (
    <div className="table-wrap">
      <table className="params-table" data-testid="params-table">
        <caption className="visually-hidden">{label}</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} data-testid="param-row">
              <td>
                <code className="inline-code param-name">{row.name}</code>
              </td>
              <td>
                <code className="param-type">{row.type}</code>
              </td>
              <td>
                <code className="param-default">{row.default}</code>
              </td>
              <td>
                <Inline text={row.description} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
