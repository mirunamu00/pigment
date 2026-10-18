import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { COMPANY_SIZES, EMAIL_PATTERN, PASSWORD_MIN_LENGTH } from '../data/signup';

interface Values {
  name: string;
  email: string;
  size: string;
  password: string;
  terms: boolean;
}

type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const FIELD_ORDER: Field[] = ['name', 'email', 'size', 'password', 'terms'];

const INITIAL: Values = { name: '', email: '', size: '', password: '', terms: false };

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'Enter your name.';
  const email = values.email.trim();
  if (!email) errors.email = 'Enter your work email.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address, like name@company.com.';
  if (!values.size) errors.size = 'Choose your company size.';
  if (!values.password) errors.password = 'Create a password.';
  else if (values.password.length < PASSWORD_MIN_LENGTH || !/\d/.test(values.password))
    errors.password = `Use at least ${PASSWORD_MIN_LENGTH} characters, including a number.`;
  if (!values.terms) errors.terms = 'Accept the terms to continue.';
  return errors;
}

export default function SignupPage() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [doneEmail, setDoneEmail] = useState<string | null>(null);
  const fieldRefs = useRef<Partial<Record<Field, HTMLInputElement | HTMLSelectElement | null>>>({});

  function update<K extends Field>(field: K, value: Values[K]) {
    const next = { ...values, [field]: value };
    setValues(next);
    // After the first submit, errors follow the input so a fixed field clears its message.
    if (submitted) setErrors(validate(next));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }
    setDoneEmail(values.email.trim());
  }

  function errorProps(field: Field) {
    return {
      'aria-invalid': errors[field] ? true : undefined,
      'aria-describedby': errors[field] ? `signup-${field}-error` : undefined,
    } as const;
  }

  function fieldError(field: Field) {
    if (!errors[field]) return null;
    return (
      <p id={`signup-${field}-error`} className="form-error" data-testid={`signup-${field}-error`}>
        {errors[field]}
      </p>
    );
  }

  return (
    <section className="section signup-section" aria-labelledby="signup-title">
      <div className="container signup-inner">
        <div className="signup-intro">
          <p className="eyebrow">Free for 14 days</p>
          <h1 id="signup-title">Create your Hourglade account</h1>
          <p className="muted">Set up your first booking page in a few minutes. No card needed.</p>
          <ul className="check-list">
            <li>Unlimited booking pages during the trial</li>
            <li>Invite your whole team</li>
            <li>Cancel any time</li>
          </ul>
        </div>

        <div className="signup-card">
          {doneEmail ? (
            <div className="signup-success" role="status" data-testid="signup-success">
              <h2>Check your inbox</h2>
              <p>
                We sent a confirmation link to <strong data-testid="signup-success-email">{doneEmail}</strong>. Open it
                to finish setting up your account.
              </p>
              <Link to="/" className="button" data-testid="signup-success-home">
                Back to the home page
              </Link>
            </div>
          ) : (
            <form className="signup-form" noValidate onSubmit={handleSubmit} data-testid="signup-form">
              <div className="field">
                <label htmlFor="signup-name" className="field-label">
                  Full name
                </label>
                <input
                  id="signup-name"
                  ref={(el) => {
                    fieldRefs.current.name = el;
                  }}
                  type="text"
                  name="name"
                  autoComplete="name"
                  className="input"
                  value={values.name}
                  onChange={(event) => update('name', event.target.value)}
                  {...errorProps('name')}
                  data-testid="signup-name"
                />
                {fieldError('name')}
              </div>

              <div className="field">
                <label htmlFor="signup-email" className="field-label">
                  Work email
                </label>
                <input
                  id="signup-email"
                  ref={(el) => {
                    fieldRefs.current.email = el;
                  }}
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="input"
                  placeholder="name@company.com"
                  value={values.email}
                  onChange={(event) => update('email', event.target.value)}
                  {...errorProps('email')}
                  data-testid="signup-email"
                />
                {fieldError('email')}
              </div>

              <div className="field">
                <label htmlFor="signup-size" className="field-label">
                  Company size
                </label>
                <select
                  id="signup-size"
                  ref={(el) => {
                    fieldRefs.current.size = el;
                  }}
                  name="size"
                  className="input select"
                  value={values.size}
                  onChange={(event) => update('size', event.target.value)}
                  {...errorProps('size')}
                  data-testid="signup-size"
                >
                  <option value="">Choose a size</option>
                  {COMPANY_SIZES.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
                {fieldError('size')}
              </div>

              <div className="field">
                <label htmlFor="signup-password" className="field-label">
                  Password
                </label>
                <div className="field-row">
                  <input
                    id="signup-password"
                    ref={(el) => {
                      fieldRefs.current.password = el;
                    }}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="new-password"
                    className="input"
                    value={values.password}
                    onChange={(event) => update('password', event.target.value)}
                    aria-invalid={errors.password ? true : undefined}
                    aria-describedby={errors.password ? 'signup-password-hint signup-password-error' : 'signup-password-hint'}
                    data-testid="signup-password"
                  />
                  <button
                    type="button"
                    className="button"
                    aria-pressed={showPassword}
                    aria-controls="signup-password"
                    onClick={() => setShowPassword((shown) => !shown)}
                    data-testid="signup-password-toggle"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                    <span className="visually-hidden"> password</span>
                  </button>
                </div>
                <p id="signup-password-hint" className="muted small field-hint">
                  At least {PASSWORD_MIN_LENGTH} characters, including a number.
                </p>
                {fieldError('password')}
              </div>

              <div className="field">
                <div className="checkbox-row">
                  <input
                    id="signup-terms"
                    ref={(el) => {
                      fieldRefs.current.terms = el;
                    }}
                    type="checkbox"
                    name="terms"
                    className="checkbox"
                    checked={values.terms}
                    onChange={(event) => update('terms', event.target.checked)}
                    {...errorProps('terms')}
                    data-testid="signup-terms"
                  />
                  <label htmlFor="signup-terms">I agree to the terms of service and the privacy policy.</label>
                </div>
                {fieldError('terms')}
              </div>

              <button type="submit" className="button button-primary button-large" data-testid="signup-submit">
                Create account
              </button>
              <p className="muted small">
                Want to look around first? <Link to="/pricing" data-testid="signup-pricing-link">
                  Compare plans
                </Link>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
