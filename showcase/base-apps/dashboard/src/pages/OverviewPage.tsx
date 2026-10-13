import { Link } from 'react-router';
import BarChart from '../components/BarChart';
import ProjectsTable from '../components/ProjectsTable';
import { deploymentsByMonth, kpis, recentActivity } from '../data/metrics';
import { projects } from '../data/projects';

export default function OverviewPage() {
  return (
    <>
      <div className="page-header">
        <h1>Overview</h1>
        <p className="muted">Delivery health across all teams for October 2026.</p>
      </div>

      <section aria-label="Key metrics" className="kpi-grid" data-testid="kpi-grid">
        {kpis.map((kpi) => (
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
