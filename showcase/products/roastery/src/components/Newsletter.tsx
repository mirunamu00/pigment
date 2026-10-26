import { useId, useState, type FormEvent } from 'react';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter() {
  const id = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');

  function submit(e: FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!v) {
      setStatus('error');
      setMessage('Enter your email address to sign up.');
    } else if (!EMAIL.test(v)) {
      setStatus('error');
      setMessage('That doesn’t look like an email address. Try something like name@example.co.uk.');
    } else {
      setStatus('success');
      setMessage(`Thanks — you’re on the list. The next Roast Letter goes out on Thursday.`);
      setEmail('');
    }
  }

  return (
    <form className="newsletter" onSubmit={submit} noValidate>
      <label htmlFor={`${id}-email`} className="newsletter-label">
        Email address
      </label>
      <div className="newsletter-row">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.co.uk"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          aria-invalid={status === 'error'}
          aria-describedby={`${id}-msg`}
          data-testid="newsletter-email"
        />
        <button type="submit" className="button" data-testid="newsletter-submit">
          Sign up
        </button>
      </div>
      <p
        id={`${id}-msg`}
        className={`field-message ${status}`}
        role={status === 'error' ? 'alert' : 'status'}
        data-testid="newsletter-message"
      >
        {status === 'idle' ? 'One email a fortnight. Unsubscribe in one click.' : message}
      </p>
    </form>
  );
}
