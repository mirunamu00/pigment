import { useId, useState, type FormEvent } from 'react';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Props {
  /** Prefix for the data-testids: "newsletter" gives newsletter-email, newsletter-submit, newsletter-message. */
  testPrefix: string;
  variant: 'band' | 'footer';
}

export function NewsletterForm({ testPrefix, variant }: Props) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setStatus('error');
      setMessage('Enter your email address to get the Weekender.');
    } else if (!EMAIL.test(value)) {
      setStatus('error');
      setMessage('That doesn’t look like a full email address — try something like name@example.com.');
    } else {
      setStatus('success');
      setMessage(`Thanks — we’ve sent a confirmation link to ${value}. Your first Weekender arrives on Thursday.`);
    }
  };

  return (
    <form className={`newsletter-form newsletter-form--${variant}`} onSubmit={submit} noValidate>
      <label htmlFor={`${id}-email`} className={variant === 'band' ? 'visually-hidden' : 'newsletter-form__label'}>
        Email address
      </label>
      <div className="newsletter-form__row">
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          aria-invalid={status === 'error'}
          aria-describedby={`${id}-msg`}
          className={status === 'error' ? 'is-invalid' : undefined}
          data-testid={`${testPrefix}-email`}
        />
        <button type="submit" className="button button--primary" data-testid={`${testPrefix}-submit`}>
          Sign up
        </button>
      </div>
      <p
        id={`${id}-msg`}
        className={`newsletter-form__message is-${status}`}
        role={status === 'error' ? 'alert' : 'status'}
        data-testid={`${testPrefix}-message`}
      >
        {status === 'idle' ? (variant === 'band' ? 'Free, every Thursday. Unsubscribe in one click.' : '') : message}
      </p>
    </form>
  );
}

export function NewsletterBand() {
  return (
    <section className="newsletter-band" aria-labelledby="newsletter-band-title">
      <div className="container newsletter-band__inner">
        <div>
          <p className="kicker">The Weekender</p>
          <h2 id="newsletter-band-title" className="newsletter-band__title">
            Four days of Calder, in your inbox every Thursday
          </h2>
          <p className="newsletter-band__text">
            Our listings editor’s pick of the weekend: what’s on, what’s new, what’s worth queuing for. Read by 21,000
            people across the city.
          </p>
        </div>
        <NewsletterForm testPrefix="newsletter" variant="band" />
      </div>
    </section>
  );
}
