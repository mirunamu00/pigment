import { useRef, useState, type KeyboardEvent } from 'react';
import { Link, useParams } from 'react-router';
import StatusPill from '../components/StatusPill';
import { formatDate } from '../components/ProjectsTable';
import { findProject, type Project, type Task } from '../data/projects';

type TabId = 'overview' | 'tasks' | 'files';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'files', label: 'Files' },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = findProject(id);

  if (!project) {
    return (
      <div className="empty-state" data-testid="project-not-found">
        <h1>Project not found</h1>
        <p className="muted">There is no project with the id “{id}”.</p>
        <Link to="/projects">Back to all projects</Link>
      </div>
    );
  }

  return <ProjectDetail key={project.id} project={project} />;
}

function ProjectDetail({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [tasks, setTasks] = useState<Task[]>(() => project.tasks.map((task) => ({ ...task })));
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ overview: null, tasks: null, files: null });

  const completed = tasks.filter((task) => task.done).length;

  function toggleTask(taskId: string) {
    setTasks((current) => current.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)));
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % TABS.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = TABS.length - 1;
    else return;
    event.preventDefault();
    const nextTab = TABS[next].id;
    setActiveTab(nextTab);
    tabRefs.current[nextTab]?.focus();
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <ol>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li aria-current="page">{project.name}</li>
        </ol>
      </nav>

      <div className="page-header page-header-row">
        <div>
          <h1 data-testid="project-title">{project.name}</h1>
          <p className="muted">
            {project.client} · Owned by {project.owner}
          </p>
        </div>
        <StatusPill status={project.status} />
      </div>

      <div className="tabs" role="tablist" aria-label="Project sections">
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[tab.id] = element;
            }}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            className="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
            data-testid={`tab-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <section id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" className="panel" data-testid="panel-overview">
          <p>{project.description}</p>
          <dl className="details">
            <div>
              <dt>Budget</dt>
              <dd>{currency.format(project.budget)}</dd>
            </div>
            <div>
              <dt>Due date</dt>
              <dd>{formatDate(project.dueDate)}</dd>
            </div>
            <div>
              <dt>Tasks</dt>
              <dd>
                {completed} of {tasks.length} complete
              </dd>
            </div>
            <div>
              <dt>Files</dt>
              <dd>{project.files.length}</dd>
            </div>
          </dl>
        </section>
      )}

      {activeTab === 'tasks' && (
        <section id="panel-tasks" role="tabpanel" aria-labelledby="tab-tasks" className="panel" data-testid="panel-tasks">
          <div className="progress-row">
            <p data-testid="task-progress" aria-live="polite">
              {completed} of {tasks.length} tasks complete
            </p>
            <progress className="progress" max={tasks.length} value={completed} aria-label="Task completion" />
          </div>
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className={task.done ? 'task task-done' : 'task'} data-testid="task-item">
                <input
                  id={`task-${task.id}`}
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  data-testid={`task-checkbox-${task.id}`}
                />
                <label htmlFor={`task-${task.id}`}>{task.title}</label>
                <span className="muted small">{task.assignee}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === 'files' && (
        <section id="panel-files" role="tabpanel" aria-labelledby="tab-files" className="panel" data-testid="panel-files">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">File name</th>
                <th scope="col">Size</th>
                <th scope="col">Last updated</th>
              </tr>
            </thead>
            <tbody>
              {project.files.map((file) => (
                <tr key={file.id} data-testid="file-row">
                  <td>{file.name}</td>
                  <td>{file.size}</td>
                  <td>{formatDate(file.updated)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}
