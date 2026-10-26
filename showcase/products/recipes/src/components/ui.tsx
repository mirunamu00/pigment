import { useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router';
import photos from '../../photos.json';
import { useStore } from '../store';
import { getRecipe, totalTime, type Recipe } from '../data/recipes';
import { minutes } from '../format';
import { Icon, Star } from './Icon';

type PhotoMeta = (typeof photos)[number];
const BY_NAME: Record<string, PhotoMeta> = Object.fromEntries(
  photos.map((p) => [p.file.replace('/photos/', '').replace('.jpg', ''), p]),
);

export function Photo({ name, className }: { name: string; className?: string }) {
  const p = BY_NAME[name];
  if (!p) return null;
  return <img className={className} src={p.file} alt={p.alt} width={p.width} height={p.height} />;
}

export function SaveButton({ slug, className = '' }: { slug: string; className?: string }) {
  const { saved, toggleSave } = useStore();
  const on = saved.includes(slug);
  const r = getRecipe(slug);
  return (
    <button
      type="button"
      className={`save-btn ${on ? 'is-on' : ''} ${className}`}
      aria-pressed={on}
      aria-label={on ? `Remove ${r?.title} from saved` : `Save ${r?.title}`}
      data-testid={`save-${slug}`}
      onClick={(e) => {
        e.preventDefault();
        toggleSave(slug);
      }}
    >
      <Icon name="heart" size={18} filled={on} />
    </button>
  );
}

const DIET_LABEL: Record<string, string> = { vegetarian: 'Vegetarian', vegan: 'Vegan', pescatarian: 'Pescatarian' };

export function dietBadge(r: Recipe) {
  if (r.diets.includes('vegan')) return 'Vegan';
  if (r.diets[0]) return DIET_LABEL[r.diets[0]];
  return null;
}

export function RecipeCard({ recipe, compact }: { recipe: Recipe; compact?: boolean }) {
  const badge = dietBadge(recipe);
  return (
    <article className={`recipe-card ${compact ? 'is-compact' : ''}`} data-testid={`recipe-card-${recipe.slug}`}>
      <div className="recipe-card-media">
        <Photo name={recipe.photo} />
        {badge && <span className="badge badge-diet">{badge}</span>}
        <SaveButton slug={recipe.slug} className="on-photo" />
      </div>
      <div className="recipe-card-body">
        <h3 className="recipe-card-title">
          <Link to={`/recipes/${recipe.slug}`} className="stretched">
            {recipe.title}
          </Link>
        </h3>
        <div className="recipe-card-meta">
          <span className="meta-item">
            <Icon name="clock" size={15} />
            {minutes(totalTime(recipe))}
          </span>
          <span className="meta-item">
            <span className="star-one">
              <Star size={14} />
            </span>
            {recipe.rating.toFixed(1)}
            <span className="muted">({recipe.ratings.toLocaleString('en-GB')})</span>
          </span>
        </div>
        {!compact && (
          <div className="recipe-card-tags">
            {recipe.tags.slice(0, 2).map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function Stepper({
  value,
  min,
  max,
  onChange,
  label,
  testid,
  unit,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  label: string;
  testid: string;
  unit?: string;
}) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button type="button" className="stepper-btn" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease ${label.toLowerCase()}`} data-testid={`${testid}-decrease`}>
        <Icon name="minus" size={16} />
      </button>
      <output className="stepper-value" aria-live="polite" data-testid={`${testid}-value`}>
        {value}
        {unit && <span className="stepper-unit"> {unit}</span>}
      </output>
      <button type="button" className="stepper-btn" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase ${label.toLowerCase()}`} data-testid={`${testid}-increase`}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}

export function Switch({
  checked,
  onChange,
  label,
  description,
  testid,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
  testid: string;
  id: string;
}) {
  return (
    <div className="switch-row">
      <div className="switch-text">
        <label htmlFor={id} className="switch-label">
          {label}
        </label>
        {description && (
          <p className="switch-desc" id={`${id}-desc`}>
            {description}
          </p>
        )}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={description ? `${id}-desc` : undefined}
        className="switch"
        data-testid={testid}
        onClick={() => onChange(!checked)}
      >
        <span className="switch-thumb" />
      </button>
    </div>
  );
}

export function Modal({ title, onClose, children, footer, testid }: { title: string; onClose: () => void; children: ReactNode; footer?: ReactNode; testid?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const first = ref.current?.querySelector<HTMLElement>('input, button:not(.modal-close), [tabindex="0"]');
    first?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close.current();
    document.addEventListener('keydown', onKey);
    document.body.classList.add('has-modal');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('has-modal');
      prev?.focus();
    };
  }, []);
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={ref} data-testid={testid}>
        <header className="modal-head">
          <h2 id="modal-title">{title}</h2>
          <button type="button" className="icon-btn modal-close" onClick={onClose} aria-label="Close" data-testid="modal-close">
            <Icon name="x" />
          </button>
        </header>
        <div className="modal-body">{children}</div>
        {footer && <footer className="modal-foot">{footer}</footer>}
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, children, action }: { icon: Parameters<typeof Icon>[0]['name']; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="empty" data-testid="empty-state">
      <span className="empty-icon">
        <Icon name={icon} size={26} />
      </span>
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {action}
    </div>
  );
}

export function Toasts() {
  const { toasts, dismiss } = useStore();
  return (
    <div className="toasts" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <div key={t.id} className="toast" role="status" data-testid="toast">
          <span className="toast-icon">
            <Icon name="check" size={16} />
          </span>
          <span className="toast-msg">{t.message}</span>
          {t.action && (
            <Link to={t.action.to} className="toast-action" onClick={() => dismiss(t.id)}>
              {t.action.label}
            </Link>
          )}
          <button type="button" className="toast-close" onClick={() => dismiss(t.id)} aria-label="Dismiss notification">
            <Icon name="x" size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export function PageHeader({ eyebrow, title, children, actions }: { eyebrow?: string; title: string; children?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {children && <p className="page-sub">{children}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  );
}
