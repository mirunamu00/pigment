import { useSearchParams } from 'react-router';
import ProjectsTable from '../components/ProjectsTable';

export default function ProjectsPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  return (
    <>
      <div className="page-header">
        <h1>Projects</h1>
        <p className="muted">Every initiative tracked by the operations team.</p>
      </div>
      {/* Re-mount when the global search changes so the table picks up the new query. */}
      <ProjectsTable key={initialQuery} heading="All projects" initialQuery={initialQuery} />
    </>
  );
}
