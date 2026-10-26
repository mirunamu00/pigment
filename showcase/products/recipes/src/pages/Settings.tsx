import { useState, type FormEvent } from 'react';
import { Icon } from '../components/Icon';
import { PageHeader, Stepper, Switch } from '../components/ui';
import { useStore, type Settings as S } from '../store';
import { useTitle } from '../useTitle';

const DIETS: { id: string; label: string; desc: string }[] = [
  { id: 'vegetarian', label: 'Vegetarian', desc: 'No meat or fish in suggestions and plans.' },
  { id: 'vegan', label: 'Vegan', desc: 'No animal products at all.' },
  { id: 'pescatarian', label: 'Pescatarian', desc: 'Fish and seafood, but no meat.' },
  { id: 'gluten-free', label: 'Gluten-free', desc: 'Hide recipes with wheat, barley or rye.' },
  { id: 'dairy-free', label: 'Dairy-free', desc: 'Hide recipes with milk, cheese or butter.' },
  { id: 'nut-free', label: 'Nut-free', desc: 'Always flag and exclude recipes containing nuts.' },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Settings() {
  useTitle('Settings — Panful');
  const { settings, saveSettings } = useStore();
  const [form, setForm] = useState<S>(settings);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');

  const set = <K extends keyof S>(k: K, v: S[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setStatus('idle');
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Enter your name.';
    if (!form.email.trim()) next.email = 'Enter an email address.';
    else if (!EMAIL.test(form.email.trim())) next.email = 'Enter an email address in the format name@example.co.uk.';
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus('error');
      document.getElementById(next.name ? 'set-name' : 'set-email')?.focus();
      return;
    }
    saveSettings(form);
    setStatus('saved');
  };

  const people = form.adults + form.children;
  const errorCount = Object.keys(errors).length;

  return (
    <div className="page settings">
      <PageHeader eyebrow="Account" title="Settings">
        Your household, diet and units shape every recipe, plan and shopping list in Panful.
      </PageHeader>

      <form onSubmit={onSubmit} noValidate className="settings-form">
        {status === 'saved' && (
          <div className="banner banner-success" role="status" data-testid="settings-success">
            <Icon name="check" size={18} />
            <div>
              <strong>Settings saved.</strong> Your plan and recipes now serve {people} {people === 1 ? 'person' : 'people'}.
            </div>
          </div>
        )}
        {status === 'error' && (
          <div className="banner banner-error" role="alert" data-testid="settings-error">
            <Icon name="alert" size={18} />
            <div>
              <strong>
                There {errorCount === 1 ? 'is a problem' : `are ${errorCount} problems`} with your settings.
              </strong>{' '}
              Fix the highlighted {errorCount === 1 ? 'field' : 'fields'} and save again.
            </div>
          </div>
        )}

        <section className="card settings-section" aria-labelledby="sec-profile">
          <div className="settings-intro">
            <h2 id="sec-profile">Profile</h2>
            <p className="muted small">Shown to people in your household.</p>
          </div>
          <div className="settings-fields">
            <div className="profile-row">
              <span className="avatar avatar-lg a1" aria-hidden="true">
                {form.name
                  .split(' ')
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((x) => x[0]?.toUpperCase())
                  .join('') || '?'}
              </span>
              <div>
                <p className="profile-name">{form.name || 'Your name'}</p>
                <p className="muted small">Member since March 2024 · Panful Plus</p>
              </div>
            </div>
            <div className="field-row">
              <div className={`field ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="set-name" className="field-label">
                  Full name
                </label>
                <input id="set-name" type="text" value={form.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'set-name-error' : undefined} autoComplete="name" data-testid="settings-name" />
                {errors.name && (
                  <p className="field-error" id="set-name-error">
                    <Icon name="alert" size={16} /> {errors.name}
                  </p>
                )}
              </div>
              <div className={`field ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="set-email" className="field-label">
                  Email
                </label>
                <input id="set-email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'set-email-error' : 'set-email-hint'} autoComplete="email" data-testid="settings-email" />
                {errors.email ? (
                  <p className="field-error" id="set-email-error" data-testid="settings-email-error">
                    <Icon name="alert" size={16} /> {errors.email}
                  </p>
                ) : (
                  <p className="field-hint" id="set-email-hint">
                    We send your weekly plan here.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="card settings-section" aria-labelledby="sec-household">
          <div className="settings-intro">
            <h2 id="sec-household">Household</h2>
            <p className="muted small">Recipes are scaled to this many people by default.</p>
          </div>
          <div className="settings-fields">
            <div className="field">
              <label htmlFor="set-household" className="field-label">
                Household name
              </label>
              <input id="set-household" type="text" value={form.household} onChange={(e) => set('household', e.target.value)} data-testid="settings-household" />
            </div>
            <div className="counter-row">
              <div>
                <p className="counter-label">Adults</p>
                <p className="muted small">13 and over</p>
              </div>
              <Stepper value={form.adults} min={1} max={8} onChange={(v) => set('adults', v)} label="Adults" testid="adults" />
            </div>
            <div className="counter-row">
              <div>
                <p className="counter-label">Children</p>
                <p className="muted small">Under 13 — counted as a half portion</p>
              </div>
              <Stepper value={form.children} min={0} max={8} onChange={(v) => set('children', v)} label="Children" testid="children" />
            </div>
          </div>
        </section>

        <section className="card settings-section" aria-labelledby="sec-diet">
          <div className="settings-intro">
            <h2 id="sec-diet">Dietary preferences</h2>
            <p className="muted small">Applied to suggestions, the recipe browser and generated plans.</p>
          </div>
          <div className="settings-fields">
            <div className="switch-list">
              {DIETS.map((d) => (
                <Switch
                  key={d.id}
                  id={`diet-${d.id}`}
                  label={d.label}
                  description={d.desc}
                  checked={!!form.diets[d.id]}
                  onChange={(v) => set('diets', { ...form.diets, [d.id]: v })}
                  testid={`diet-${d.id}`}
                />
              ))}
            </div>
            <div className="field">
              <label htmlFor="set-allergies" className="field-label">
                Allergies and dislikes <span className="optional">optional</span>
              </label>
              <textarea id="set-allergies" rows={2} value={form.allergies} onChange={(e) => set('allergies', e.target.value)} data-testid="settings-allergies" />
            </div>
          </div>
        </section>

        <section className="card settings-section" aria-labelledby="sec-units">
          <div className="settings-intro">
            <h2 id="sec-units">Units &amp; measures</h2>
            <p className="muted small">How quantities and oven temperatures are shown.</p>
          </div>
          <div className="settings-fields">
            <fieldset className="fieldset">
              <legend className="field-label">Measurements</legend>
              <div className="radio-cards">
                {(
                  [
                    ['metric', 'Metric', 'grams, millilitres'],
                    ['imperial', 'Imperial', 'ounces, pounds, fl oz'],
                  ] as const
                ).map(([id, label, hint]) => (
                  <label key={id} className={`radio-card ${form.units === id ? 'is-on' : ''}`}>
                    <input type="radio" name="units" value={id} checked={form.units === id} onChange={() => set('units', id)} data-testid={`units-${id}`} />
                    <span className="radio-dot" aria-hidden="true" />
                    <span>
                      <strong>{label}</strong>
                      <span className="muted small">{hint}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="field-label">Oven</legend>
              <div className="radio-cards">
                {(
                  [
                    ['fan', 'Fan oven', 'temperatures 20°C lower'],
                    ['conventional', 'Conventional', 'top and bottom heat'],
                  ] as const
                ).map(([id, label, hint]) => (
                  <label key={id} className={`radio-card ${form.oven === id ? 'is-on' : ''}`}>
                    <input type="radio" name="oven" value={id} checked={form.oven === id} onChange={() => set('oven', id)} data-testid={`oven-${id}`} />
                    <span className="radio-dot" aria-hidden="true" />
                    <span>
                      <strong>{label}</strong>
                      <span className="muted small">{hint}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </section>

        <section className="card settings-section" aria-labelledby="sec-notify">
          <div className="settings-intro">
            <h2 id="sec-notify">Notifications</h2>
            <p className="muted small">Push notifications on your phone and emails.</p>
          </div>
          <div className="settings-fields">
            <div className="switch-list">
              <Switch id="n-tonight" label="Tonight’s dinner reminder" description="A nudge with what’s for dinner and what to defrost." checked={form.notify.tonight} onChange={(v) => set('notify', { ...form.notify, tonight: v })} testid="notify-tonight" />
              <div className="field field-inline">
                <label htmlFor="set-time" className="field-label">
                  Remind me at
                </label>
                <div className="select-wrap">
                  <select id="set-time" value={form.reminderTime} onChange={(e) => set('reminderTime', e.target.value)} disabled={!form.notify.tonight} data-testid="settings-reminder-time">
                    {['15:00', '16:00', '17:00', '18:00'].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevronDown" size={16} />
                </div>
              </div>
              <Switch id="n-weekly" label="Weekly plan ready" description="Sunday morning email with next week’s plan." checked={form.notify.weekly} onChange={(v) => set('notify', { ...form.notify, weekly: v })} testid="notify-weekly" />
              <Switch id="n-shopping" label="Shopping list changes" description="When someone in your household edits the list." checked={form.notify.shopping} onChange={(v) => set('notify', { ...form.notify, shopping: v })} testid="notify-shopping" />
              <Switch id="n-new" label="New recipes" description="Our pick of the week’s new recipes, once a week." checked={form.notify.newRecipes} onChange={(v) => set('notify', { ...form.notify, newRecipes: v })} testid="notify-new" />
            </div>
          </div>
        </section>

        <div className="save-bar">
          {status === 'saved' ? (
            <p className="saved-inline" role="status">
              <Icon name="check" size={16} /> All changes saved
            </p>
          ) : status === 'error' ? (
            <p className="error-inline">
              <Icon name="alert" size={16} /> Not saved — check the form above
            </p>
          ) : (
            <p className="muted small">Changes apply to everyone in {form.household || 'your household'}.</p>
          )}
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setForm(settings);
                setErrors({});
                setStatus('idle');
              }}
              data-testid="settings-reset"
            >
              Discard changes
            </button>
            <button type="submit" className="btn btn-primary" data-testid="settings-save">
              Save settings
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
