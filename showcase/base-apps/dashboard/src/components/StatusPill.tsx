import { STATUS_LABELS, type ProjectStatus } from '../data/projects';

export default function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span className={`pill pill-${status}`} data-testid="status-pill">
      {STATUS_LABELS[status]}
    </span>
  );
}
