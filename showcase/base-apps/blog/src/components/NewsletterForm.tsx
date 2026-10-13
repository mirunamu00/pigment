import { useId, useState, type FormEvent } from 'react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
  const baseId = useId();
  const headingId = `${baseId}-heading`;
  const inputId = `${baseId}-email`;
  const errorId = `${baseId}-error`;
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value) {
      setError('Enter your email address.');
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError('Enter a valid email address, like name@example.com.');
      return;
    }
    setError(null);
    setSubscribedEmail(value);
    setEmail('');
  }

  return (
    <section className="newsletter" aria-labelledby={headingId} data-testid="newsletter">
      <h2 id={headingId}>Subscribe to the newsletter</h2>
      <p className="muted">One email when a new post goes up. Never more than twice a month.</p>
      {subscribedEmail ? (
        <p className="form-success" role="status" data-testid="newsletter-success">
          Thanks for subscribing. New posts will arrive at {subscribedEmail}.
        </p>
      ) : (
        <form className="newsletter-form" noValidate onSubmit={handleSubmit} data-testid="newsletter-form">
          <label htmlFor={inputId} className="field-label">
            Email address
          </label>
          <div className="field-row">
            <input
              id={inputId}
              type="email"
              name="email"
              autoComplete="email"
              className="input"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              data-testid="newsletter-email"
            />
            <button type="submit" className="button button-primary" data-testid="newsletter-submit">
              Subscribe
            </button>
          </div>
          {error && (
            <p id={errorId} className="form-error" role="alert" data-testid="newsletter-error">
              {error}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
