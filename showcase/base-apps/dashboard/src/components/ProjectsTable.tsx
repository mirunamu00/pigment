import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { projects, type Project, type ProjectStatus } from '../data/projects';
import StatusPill from './StatusPill';

type StatusFilter = 'all' | ProjectStatus;
type SortKey = 'name' | 'owner' | 'status' | 'budget' | 'dueDate';
type SortDirection = 'ascending' | 'descending';

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'done', label: 'Done' },
];

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Project' },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status' },
  { key: 'budget', label: 'Budget' },
  { key: 'dueDate', label: 'Due date' },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export function formatDate(iso: string): string {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

function compare(a: Project, b: Project, key: SortKey): number {
  const left = a[key];
  const right = b[key];
  if (typeof left === 'number' && typeof right === 'number') return left - right;
  return String(left).localeCompare(String(right));
}

interface ProjectsTableProps {
  heading: string;
  initialQuery?: string;
}

export default function ProjectsTable({ heading, initialQuery = '' }: ProjectsTableProps) {
  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState(initialQuery);
  const [sortKey, setSortKey] = useState<SortKey>('dueDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('ascending');

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = projects.filter((project) => {
      const matchesStatus = status === 'all' || project.status === status;
      const matchesQuery =
        term === '' ||
        project.name.toLowerCase().includes(term) ||
        project.owner.toLowerCase().includes(term) ||
        project.client.toLowerCase().includes(term);
      return matchesStatus && matchesQuery;
    });
    const sorted = [...filtered].sort((a, b) => compare(a, b, sortKey));
    return sortDirection === 'ascending' ? sorted : sorted.reverse();
  }, [status, query, sortKey, sortDirection]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDirection((direction) => (direction === 'ascending' ? 'descending' : 'ascending'));
    } else {
      setSortKey(key);
      setSortDirection('ascending');
    }
  }

  function clearFilters() {
    setStatus('all');
    setQuery('');
  }

  return (
    <section className="panel" aria-labelledby="projects-table-heading">
      <div className="panel-header">
        <h2 id="projects-table-heading">{heading}</h2>
        <p className="muted" data-testid="result-count" aria-live="polite">
          Showing {rows.length} of {projects.length} projects
        </p>
      </div>

      <div className="toolbar">
        <div className="segmented" role="group" aria-label="Filter by status">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className="segmented-button"
              aria-pressed={status === filter.value}
              onClick={() => setStatus(filter.value)}
              data-testid={`status-filter-${filter.value}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="field-inline">
          <label htmlFor="project-filter">Filter projects</label>
          <input
            id="project-filter"
            type="search"
            className="input"
            placeholder="Name, owner or team"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            data-testid="project-search"
          />
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="empty-state" data-testid="projects-empty">
          <h3>No projects match your filters</h3>
          <p className="muted">Try a different search term or status.</p>
          <button type="button" className="button" onClick={clearFilters} data-testid="clear-filters">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table" data-testid="projects-table">
            <thead>
              <tr>
                {COLUMNS.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={sortKey === column.key ? sortDirection : 'none'}
                    data-testid={`column-${column.key}`}
                  >
                    <button
                      type="button"
                      className="sort-button"
                      onClick={() => toggleSort(column.key)}
                      data-testid={`sort-${column.key}`}
                    >
                      {column.label}
                      <span className="sort-indicator" aria-hidden="true">
                        {sortKey === column.key ? (sortDirection === 'ascending' ? '▲' : '▼') : ''}
                      </span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((project) => (
                <tr key={project.id} data-testid="project-row">
                  <td>
                    <Link to={`/projects/${project.id}`} data-testid="project-link">
                      {project.name}
                    </Link>
                    <div className="muted small">{project.client}</div>
                  </td>
                  <td>{project.owner}</td>
                  <td>
                    <StatusPill status={project.status} />
                  </td>
                  <td className="numeric">{currency.format(project.budget)}</td>
                  <td>{formatDate(project.dueDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
