import { useState, type FormEvent } from 'react';
import { initialSessions, type Session } from '../data/sessions';

interface PasswordForm {
  current: string;
  next: string;
  confirm: string;
}

type PasswordErrors = Partial<Record<keyof PasswordForm, string>>;

const EMPTY_FORM: PasswordForm = { current: '', next: '', confirm: '' };
const MIN_LENGTH = 8;

function strengthOf(password: string): { label: string; level: 'none' | 'weak' | 'fair' | 'strong' } {
  if (!password) return { label: `Use at least ${MIN_LENGTH} characters.`, level: 'none' };
  if (password.length < MIN_LENGTH) return { label: 'Too short', level: 'weak' };
  let variety = 0;
  if (/[a-z]/.test(password)) variety += 1;
  if (/[A-Z]/.test(password)) variety += 1;
  if (/\d/.test(password)) variety += 1;
  if (/[^A-Za-z0-9]/.test(password)) variety += 1;
  if (variety >= 3 && password.length >= 12) return { label: 'Strong', level: 'strong' };
  if (variety >= 2) return { label: 'Fair', level: 'fair' };
  return { label: 'Weak', level: 'weak' };
}

function validate(form: PasswordForm): PasswordErrors {
  const errors: PasswordErrors = {};
  if (!form.current) errors.current = 'Enter your current password.';
  if (form.next.length < MIN_LENGTH) errors.next = `New password must be at least ${MIN_LENGTH} characters.`;
  else if (form.next === form.current) errors.next = 'New password must be different from your current password.';
  if (!form.confirm) errors.confirm = 'Confirm your new password.';
  else if (form.confirm !== form.next) errors.confirm = 'Passwords do not match.';
  return errors;
}

const FIELDS: { key: keyof PasswordForm; label: string; autoComplete: string; testId: string }[] = [
  { key: 'current', label: 'Current password', autoComplete: 'current-password', testId: 'password-current' },
  { key: 'next', label: 'New password', autoComplete: 'new-password', testId: 'password-new' },
  { key: 'confirm', label: 'Confirm new password', autoComplete: 'new-password', testId: 'password-confirm' },
];

export default function SecurityPage() {
  const [form, setForm] = useState<PasswordForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [updated, setUpdated] = useState(false);
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [sessionMessage, setSessionMessage] = useState('');

  const strength = strengthOf(form.next);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    const firstInvalid = FIELDS.find((field) => nextErrors[field.key]);
    if (firstInvalid) {
      setUpdated(false);
      document.getElementById(`password-${firstInvalid.key}`)?.focus();
      return;
    }
    setForm(EMPTY_FORM);
    setUpdated(true);
  }

  function revoke(session: Session) {
    setSessions((current) => current.filter((item) => item.id !== session.id));
    setSessionMessage(`Signed out of ${session.device}.`);
  }

  return (
    <>
      <div className="page-header">
        <h1>Security</h1>
        <p className="muted">Manage your password and the devices signed in to your account.</p>
      </div>

      <section className="panel" aria-labelledby="password-heading">
        <h2 id="password-heading">Change password</h2>
        <form className="form" noValidate onSubmit={handleSubmit} data-testid="password-form">
          <div className="form-stack">
            {FIELDS.map((field) => {
              const id = `password-${field.key}`;
              const describedBy = [
                field.key === 'next' ? 'password-strength' : null,
                errors[field.key] ? `${id}-error` : null,
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <div className="field" key={field.key}>
                  <label htmlFor={id} className="field-label">
                    {field.label}
                  </label>
                  <input
                    id={id}
                    type="password"
                    className="input"
                    autoComplete={field.autoComplete}
                    value={form[field.key]}
                    onChange={(event) => {
                      setForm((current) => ({ ...current, [field.key]: event.target.value }));
                      setUpdated(false);
                    }}
                    aria-invalid={errors[field.key] ? true : undefined}
                    aria-describedby={describedBy || undefined}
                    data-testid={field.testId}
                  />
                  {field.key === 'next' && (
                    <p
                      id="password-strength"
                      className={`strength strength-${strength.level} small`}
                      data-testid="password-strength"
                      data-level={strength.level}
                    >
                      {strength.level === 'none' ? strength.label : `Strength: ${strength.label}`}
                    </p>
                  )}
                  {errors[field.key] && (
                    <p id={`${id}-error`} className="field-error" data-testid={`error-${field.testId}`}>
                      {errors[field.key]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="form-actions">
            <button type="submit" className="button button-primary" data-testid="password-submit">
              Update password
            </button>
            <p role="status" className="status-message" data-testid="password-status">
              {updated ? 'Password updated' : ''}
            </p>
          </div>
        </form>
      </section>

      <section className="panel" aria-labelledby="sessions-heading">
        <h2 id="sessions-heading">Active sessions</h2>
        <p className="muted small">Revoke a session to sign that device out immediately.</p>
        <div className="table-wrap">
          <table className="table" data-testid="sessions-table">
            <thead>
              <tr>
                <th scope="col">Device</th>
                <th scope="col">Location</th>
                <th scope="col">Last active</th>
                <th scope="col">
                  <span className="visually-hidden">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id} data-testid="session-row">
                  <td>
                    {session.device}
                    {session.current && (
                      <span className="pill pill-neutral small" data-testid="current-session">
                        This device
                      </span>
                    )}
                  </td>
                  <td>{session.location}</td>
                  <td>{session.lastActive}</td>
                  <td className="cell-actions">
                    {!session.current && (
                      <button
                        type="button"
                        className="button button-danger"
                        onClick={() => revoke(session)}
                        data-testid={`revoke-${session.id}`}
                      >
                        Revoke<span className="visually-hidden"> {session.device}</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sessions.length === 1 && (
          <p className="muted small" data-testid="sessions-empty">
            No other devices are signed in.
          </p>
        )}
        <p role="status" className="status-message" data-testid="sessions-status">
          {sessionMessage}
        </p>
      </section>
    </>
  );
}
