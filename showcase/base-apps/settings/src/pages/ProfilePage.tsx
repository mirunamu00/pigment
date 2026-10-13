import { useState, type ChangeEvent, type FormEvent } from 'react';
import { BIO_MAX_LENGTH, currentUser, initialProfile, timeZones, type Profile } from '../data/account';

type ProfileErrors = Partial<Record<keyof Profile, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(profile: Profile): ProfileErrors {
  const errors: ProfileErrors = {};
  if (!profile.fullName.trim()) errors.fullName = 'Enter your full name.';
  if (!profile.email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL_PATTERN.test(profile.email.trim())) errors.email = 'Enter a valid email address, like name@example.com.';
  if (!profile.timeZone) errors.timeZone = 'Choose a time zone.';
  if (profile.bio.length > BIO_MAX_LENGTH) errors.bio = `Keep your bio under ${BIO_MAX_LENGTH} characters.`;
  return errors;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [saved, setSaved] = useState(false);

  function update(field: keyof Profile) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setProfile((current) => ({ ...current, [field]: event.target.value }));
      setSaved(false);
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(profile);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setSaved(false);
      document.getElementById(`profile-${firstInvalid}`)?.focus();
      return;
    }
    setSaved(true);
  }

  function handleReset() {
    setProfile(initialProfile);
    setErrors({});
    setSaved(false);
  }

  const initials =
    profile.fullName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || currentUser.initials;

  return (
    <>
      <div className="page-header">
        <h1>Profile</h1>
        <p className="muted">This information is shown to people in your workspace.</p>
      </div>

      <form className="panel form" noValidate onSubmit={handleSubmit} data-testid="profile-form">
        <div className="avatar-row">
          <span className="avatar avatar-large" data-testid="profile-avatar" aria-hidden="true">
            {initials}
          </span>
          <div>
            <p className="field-label">Profile photo</p>
            <p className="muted small">A placeholder with your initials is shown until you upload a photo.</p>
            <button type="button" className="button" data-testid="change-photo">
              <svg className="icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
                <path
                  d="M4 7h3l2-2h6l2 2h3v12H4z M12 10a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Change photo</span>
            </button>
          </div>
        </div>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="profile-fullName" className="field-label">
              Full name
            </label>
            <input
              id="profile-fullName"
              type="text"
              className="input"
              autoComplete="name"
              value={profile.fullName}
              onChange={update('fullName')}
              aria-invalid={errors.fullName ? true : undefined}
              aria-describedby={errors.fullName ? 'profile-fullName-error' : undefined}
              data-testid="profile-name"
            />
            {errors.fullName && (
              <p id="profile-fullName-error" className="field-error" data-testid="error-name">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="profile-email" className="field-label">
              Email
            </label>
            <input
              id="profile-email"
              type="email"
              className="input"
              autoComplete="email"
              value={profile.email}
              onChange={update('email')}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'profile-email-error' : undefined}
              data-testid="profile-email"
            />
            {errors.email && (
              <p id="profile-email-error" className="field-error" data-testid="error-email">
                {errors.email}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="profile-jobTitle" className="field-label">
              Job title <span className="muted small">(optional)</span>
            </label>
            <input
              id="profile-jobTitle"
              type="text"
              className="input"
              autoComplete="organization-title"
              value={profile.jobTitle}
              onChange={update('jobTitle')}
              data-testid="profile-job-title"
            />
          </div>

          <div className="field">
            <label htmlFor="profile-timeZone" className="field-label">
              Time zone
            </label>
            <select
              id="profile-timeZone"
              className="input"
              value={profile.timeZone}
              onChange={update('timeZone')}
              aria-invalid={errors.timeZone ? true : undefined}
              aria-describedby={errors.timeZone ? 'profile-timeZone-error' : undefined}
              data-testid="profile-timezone"
            >
              <option value="">Select a time zone</option>
              {timeZones.map((zone) => (
                <option key={zone.value} value={zone.value}>
                  {zone.label}
                </option>
              ))}
            </select>
            {errors.timeZone && (
              <p id="profile-timeZone-error" className="field-error" data-testid="error-timezone">
                {errors.timeZone}
              </p>
            )}
          </div>

          <div className="field field-wide">
            <label htmlFor="profile-bio" className="field-label">
              Bio
            </label>
            <textarea
              id="profile-bio"
              className="input textarea"
              rows={4}
              value={profile.bio}
              onChange={update('bio')}
              aria-invalid={errors.bio ? true : undefined}
              aria-describedby={errors.bio ? 'profile-bio-hint profile-bio-error' : 'profile-bio-hint'}
              data-testid="profile-bio"
            />
            <p id="profile-bio-hint" className="muted small" data-testid="bio-count">
              {profile.bio.length} / {BIO_MAX_LENGTH} characters
            </p>
            {errors.bio && (
              <p id="profile-bio-error" className="field-error" data-testid="error-bio">
                {errors.bio}
              </p>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="button button-primary" data-testid="profile-save">
            Save changes
          </button>
          <button type="button" className="button" onClick={handleReset} data-testid="profile-reset">
            Reset
          </button>
          <p role="status" className="status-message" data-testid="profile-status">
            {saved ? 'Saved' : ''}
          </p>
        </div>
      </form>
    </>
  );
}
