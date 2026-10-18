import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import BarChart from '../components/BarChart';
import ProjectsTable from '../components/ProjectsTable';
import { deploymentsByMonth, kpis, recentActivity } from '../data/metrics';
import { projects } from '../data/projects';

/** How long a refresh of the metrics takes (mock data: the delay only shows the loading state). */
const REFRESH_MS = 1500;

export default function OverviewPage() {
  const [loading, setLoading] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  function refresh() {
    setLoading(true);
    timer.current = window.setTimeout(() => setLoading(false), REFRESH_MS);
  }

  return (
    <>
      <div className="page-header page-header-row">
        <div>
          <h1>Overview</h1>
          <p className="muted">Delivery health across all teams for October 2026.</p>
        </div>
        <button type="button" className="button" data-testid="refresh-metrics" onClick={refresh} disabled={loading}>
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      <section aria-label="Key metrics" aria-busy={loading} className="kpi-grid" data-testid="kpi-grid">
        {loading
          ? kpis.map((kpi) => (
              <article key={kpi.id} className="card kpi-card kpi-card-loading" data-testid="kpi-card-loading" aria-hidden="true">
                <span className="skeleton skeleton-label" />
                <span className="skeleton skeleton-value" />
                <span className="skeleton skeleton-change" />
              </article>
            ))
          : kpis.map((kpi) => (
              <article key={kpi.id} className="card kpi-card" data-testid="kpi-card">
                <h2 className="kpi-label">{kpi.label}</h2>
                <p className="kpi-value">{kpi.value}</p>
                <p className={`kpi-change kpi-change-${kpi.trend}`}>{kpi.change}</p>
              </article>
            ))}
      </section>

      <div className="two-column">
        <section className="panel" aria-labelledby="throughput-heading">
          <h2 id="throughput-heading">Deployment throughput</h2>
          <BarChart title="Production deployments per month" data={deploymentsByMonth} />
        </section>

        <section className="panel" aria-labelledby="activity-heading">
          <h2 id="activity-heading">Recent activity</h2>
          <ul className="activity-list" data-testid="activity-list">
            {recentActivity.map((item) => {
              const project = projects.find((p) => p.name === item.target);
              return (
                <li key={item.id} className="activity-item" data-testid="activity-item">
                  <p>
                    <strong>{item.actor}</strong> {item.action}{' '}
                    {project ? <Link to={`/projects/${project.id}`}>{item.target}</Link> : item.target}
                  </p>
                  <p className="muted small">{item.time}</p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <ProjectsTable heading="Projects" />
    </>
  );
}
