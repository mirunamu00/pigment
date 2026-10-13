import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section className="empty-state" data-testid="not-found">
      <h1>Page not found</h1>
      <p className="muted">The settings page you are looking for does not exist or has moved.</p>
      <Link to="/settings/profile">Go to profile settings</Link>
    </section>
  );
}
