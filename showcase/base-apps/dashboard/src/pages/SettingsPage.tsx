import { Link } from 'react-router';

export default function SettingsPage() {
  return (
    <>
      <div className="page-header">
        <h1>Settings</h1>
      </div>
      <section className="panel empty-state" data-testid="settings-placeholder">
        <h2>Workspace settings are coming soon</h2>
        <p className="muted">
          Notification rules, integrations and access control will live here. For now, ask a workspace admin to make
          changes.
        </p>
        <Link to="/">Back to overview</Link>
      </section>
    </>
  );
}
