import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { Icon, Stars } from '../components/Icon';
import { Photo, RecipeCard, SaveButton, Stepper, dietBadge } from '../components/ui';
import { DAYS, MEALS, slotLabel, type Day, type Meal } from '../data/household';
import { RECIPES, getRecipe, type Recipe } from '../data/recipes';
import { ingredientLine, minutes } from '../format';
import { useStore } from '../store';
import { useTitle } from '../useTitle';
import NotFound from './NotFound';

const RI = { kcal: 2000, fat: 70, saturates: 20, carbs: 260, sugars: 90, protein: 50, salt: 6 } as const;
const NUTRI_ROWS: { key: keyof Recipe['nutrition']; label: string; unit: string; indent?: boolean }[] = [
  { key: 'kcal', label: 'Energy', unit: 'kcal' },
  { key: 'fat', label: 'Fat', unit: 'g' },
  { key: 'saturates', label: 'of which saturates', unit: 'g', indent: true },
  { key: 'carbs', label: 'Carbohydrate', unit: 'g' },
  { key: 'sugars', label: 'of which sugars', unit: 'g', indent: true },
  { key: 'fibre', label: 'Fibre', unit: 'g' },
  { key: 'protein', label: 'Protein', unit: 'g' },
  { key: 'salt', label: 'Salt', unit: 'g' },
];

function AddToPlan({ recipe }: { recipe: Recipe }) {
  const { plan, setSlot, toast } = useStore();
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState<Day>('wed');
  const [meal, setMeal] = useState<Meal>('lunch');
  const wrap = useRef<HTMLDivElement>(null);
  const key = `${day}-${meal}`;
  const occupied = getRecipe(plan[key] ?? '');

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="popover-wrap" ref={wrap}>
      <button type="button" className="btn btn-primary btn-lg" aria-expanded={open} aria-controls="plan-popover" onClick={() => setOpen((o) => !o)} data-testid="add-to-plan">
        <Icon name="calendar" size={18} /> Add to plan
      </button>
      {open && (
        <div className="popover" id="plan-popover" role="dialog" aria-label="Add to meal plan">
          <p className="popover-title">Add to this week</p>
          <div className="day-picker" role="radiogroup" aria-label="Day">
            {DAYS.map((d) => {
              const busy = !!plan[`${d.id}-${meal}`];
              return (
                <button
                  key={d.id}
                  type="button"
                  role="radio"
                  aria-checked={day === d.id}
                  className={`day-btn ${day === d.id ? 'is-on' : ''}`}
                  onClick={() => setDay(d.id)}
                  data-testid={`plan-day-${d.id}`}
                >
                  <span>{d.short}</span>
                  <strong>{d.date}</strong>
                  <span className={`day-dot ${busy ? 'is-busy' : ''}`} aria-label={busy ? 'planned' : 'free'} />
                </button>
              );
            })}
          </div>
          <div className="segmented segmented-sm" role="radiogroup" aria-label="Meal">
            {MEALS.map((m) => (
              <button key={m.id} type="button" role="radio" aria-checked={meal === m.id} className="segmented-btn" onClick={() => setMeal(m.id)} data-testid={`plan-meal-${m.id}`}>
                {m.label}
              </button>
            ))}
          </div>
          <p className={`popover-note ${occupied ? 'is-warn' : ''}`}>
            {occupied ? (
              <>
                <Icon name="swap" size={16} /> Replaces {occupied.title.toLowerCase()}
              </>
            ) : (
              <>
                <Icon name="check" size={16} /> {slotLabel(key)} is free
              </>
            )}
          </p>
          <button
            type="button"
            className="btn btn-primary btn-block"
            data-testid="plan-confirm"
            onClick={() => {
              setSlot(key, recipe.slug);
              setOpen(false);
              toast(`Added to ${slotLabel(key)}`, { label: 'View plan', to: '/plan' });
            }}
          >
            Add to {slotLabel(key)}
          </button>
        </div>
      )}
    </div>
  );
}

export default function RecipeDetail() {
  const { slug = '' } = useParams();
  const recipe = getRecipe(slug);
  const [params] = useSearchParams();
  const { settings, toast } = useStore();
  const [servings, setServings] = useState(recipe?.servings ?? 4);
  const [checked, setChecked] = useState<number[]>([]);
  const [cookMode, setCookMode] = useState(params.get('cook') === '1');
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState<'method' | 'notes' | 'reviews'>('method');
  const [note, setNote] = useState('');
  useTitle(recipe ? `${recipe.title} — Panful` : 'Recipe not found — Panful');

  useEffect(() => {
    setServings(recipe?.servings ?? 4);
    setChecked([]);
    setStep(0);
    setCookMode(params.get('cook') === '1');
    setTab('method');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!recipe) return <NotFound />;
  const scale = servings / recipe.servings;
  const related = RECIPES.filter((r) => r.slug !== recipe.slug)
    .map((r) => ({ r, score: (r.cuisine === recipe.cuisine ? 2 : 0) + r.diets.filter((d) => recipe.diets.includes(d)).length + (r.course === recipe.course ? 1 : 0) }))
    .sort((a, b) => b.score - a.score || b.r.popularity - a.r.popularity)
    .slice(0, 4)
    .map((x) => x.r);
  const reviews = recipe.reviews ?? [];
  const dist = [5, 4, 3, 2, 1].map((s) => {
    const share = s === 5 ? 0.78 : s === 4 ? 0.16 : s === 3 ? 0.04 : s === 2 ? 0.01 : 0.01;
    return { s, n: Math.round(recipe.ratings * share) };
  });
  const toggleCook = () => {
    setCookMode((c) => !c);
    setTab('method');
  };
  const badge = dietBadge(recipe);

  return (
    <div className={`page recipe ${cookMode ? 'is-cooking' : ''}`}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            <Link to={`/recipes`}>{recipe.cuisine}</Link>
          </li>
          <li aria-current="page">{recipe.title}</li>
        </ol>
      </nav>

      <section className="recipe-hero">
        <div className="recipe-hero-media">
          <Photo name={recipe.photo} />
        </div>
        <div className="recipe-hero-body">
          <div className="tag-row">
            {badge && <span className="badge badge-diet static">{badge}</span>}
            {recipe.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <h1 className="recipe-title">{recipe.title}</h1>
          <a href="#reviews-panel" className="rating-row" onClick={() => setTab('reviews')}>
            <Stars rating={recipe.rating} size={18} />
            <span>
              <strong>{recipe.rating.toFixed(1)}</strong> <span className="muted">· {recipe.ratings.toLocaleString('en-GB')} ratings</span>
            </span>
          </a>
          <p className="recipe-summary">{recipe.summary}</p>
          <p className="byline">
            <span className="avatar avatar-xs a2" aria-hidden="true">
              {recipe.author
                .split(' ')
                .map((x) => x[0])
                .join('')}
            </span>
            <span>
              Recipe by <strong>{recipe.author}</strong>, Panful test kitchen
            </span>
          </p>
          <dl className="meta-grid">
            <div>
              <dt>Prep</dt>
              <dd>{minutes(recipe.prep)}</dd>
            </div>
            <div>
              <dt>Cook</dt>
              <dd>{recipe.cook ? minutes(recipe.cook) : 'No cook'}</dd>
            </div>
            <div>
              <dt>Serves</dt>
              <dd>{recipe.servings}</dd>
            </div>
            <div>
              <dt>Difficulty</dt>
              <dd>{recipe.difficulty}</dd>
            </div>
          </dl>
          <div className="btn-row">
            <AddToPlan recipe={recipe} />
            <button type="button" className={`btn btn-secondary btn-lg ${cookMode ? 'is-active' : ''}`} aria-pressed={cookMode} onClick={toggleCook} data-testid="cook-mode-hero">
              <Icon name="flame" size={18} /> {cookMode ? 'Cooking now' : 'Cook mode'}
            </button>
            <SaveButton slug={recipe.slug} className="btn-icon-lg" />
          </div>
        </div>
      </section>

      <div className="recipe-layout">
        <aside className="recipe-aside">
          <section className="card ingredients" aria-labelledby="ing-title">
            <div className="card-head">
              <h2 id="ing-title" className="card-title-lg">
                Ingredients
              </h2>
              <span className="muted small">
                {checked.length}/{recipe.ingredients.length} ready
              </span>
            </div>
            <div className="servings-row">
              <span id="servings-label">
                <strong>Servings</strong>
                <span className="muted small">
                  {scale === 1 ? 'Original recipe' : `Scaled ×${parseFloat(scale.toFixed(2))}`}
                </span>
              </span>
              <Stepper value={servings} min={1} max={12} onChange={setServings} label="Servings" testid="servings" />
            </div>
            <ul className="checklist">
              {recipe.ingredients.map((ing, i) => {
                const line = ingredientLine(ing, scale, settings.units);
                const on = checked.includes(i);
                return (
                  <li key={i}>
                    <label className={`check-row ${on ? 'is-checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => setChecked((c) => (on ? c.filter((x) => x !== i) : [...c, i]))}
                        data-testid={`ingredient-${i}`}
                      />
                      <span className="checkbox" aria-hidden="true">
                        <Icon name="check" size={14} />
                      </span>
                      <span className="check-text">
                        <span className="qty">{line.qty}</span> {line.name}
                        {line.note && <span className="note">, {line.note}</span>}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              className="btn btn-secondary btn-block"
              data-testid="add-ingredients-to-list"
              onClick={() => toast(`${recipe.ingredients.length - checked.length} ingredients added to your shopping list`, { label: 'Open list', to: '/shopping' })}
            >
              <Icon name="basket" size={18} /> Add unticked to shopping list
            </button>
          </section>

          <section className="card nutrition" aria-labelledby="nut-title">
            <h2 id="nut-title" className="card-title-lg">
              Nutrition <span className="muted small">per serving</span>
            </h2>
            <table className="nutri-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Nutrient</span>
                  </th>
                  <th scope="col">Amount</th>
                  <th scope="col">
                    <abbr title="Reference intake">RI</abbr>
                  </th>
                </tr>
              </thead>
              <tbody>
                {NUTRI_ROWS.map((row) => {
                  const v = recipe.nutrition[row.key];
                  const ri = row.key in RI ? Math.round((v / RI[row.key as keyof typeof RI]) * 100) : null;
                  return (
                    <tr key={row.key} className={row.indent ? 'indent' : ''}>
                      <th scope="row">{row.label}</th>
                      <td>
                        {v}
                        {row.unit === 'kcal' ? ' kcal' : ' g'}
                      </td>
                      <td className="muted">{ri !== null ? `${ri}%` : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </aside>

        <section className="recipe-main card">
          <div className="tabs" role="tablist" aria-label="Recipe sections">
            {(
              [
                ['method', 'Method'],
                ['notes', 'Notes'],
                ['reviews', `Reviews (${reviews.length})`],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={tab === id}
                aria-controls={`${id}-panel`}
                className="tab"
                onClick={() => setTab(id)}
                data-testid={`tab-${id}`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'method' && (
            <div role="tabpanel" id="method-panel" aria-labelledby="tab-method" className="tab-panel">
              <div className={`cook-bar ${cookMode ? 'is-on' : ''}`}>
                <div>
                  <p className="cook-bar-title">
                    <Icon name="flame" size={18} /> Cook mode
                  </p>
                  <p className="muted small">{cookMode ? 'Your screen stays on. Tap a step to jump to it.' : 'Step-by-step view with large text that keeps your screen awake.'}</p>
                </div>
                <button type="button" role="switch" aria-checked={cookMode} aria-label="Cook mode" className="switch" onClick={toggleCook} data-testid="cook-mode">
                  <span className="switch-thumb" />
                </button>
              </div>
              {cookMode && (
                <div className="cook-progress">
                  <span>
                    Step <strong>{step + 1}</strong> of {recipe.steps.length}
                  </span>
                  <div className="progress">
                    <span style={{ width: `${((step + 1) / recipe.steps.length) * 100}%` }} />
                  </div>
                </div>
              )}
              <ol className="steps">
                {recipe.steps.map((s, i) => {
                  const state = !cookMode ? '' : i === step ? 'is-current' : i < step ? 'is-done' : 'is-later';
                  return (
                    <li key={i} className={`step ${state}`} aria-current={cookMode && i === step ? 'step' : undefined}>
                      <button type="button" className="step-btn" onClick={() => cookMode && setStep(i)} disabled={!cookMode} data-testid={`step-${i}`} tabIndex={cookMode ? 0 : -1}>
                        <span className="step-num" aria-hidden="true">
                          {cookMode && i < step ? <Icon name="check" size={16} /> : i + 1}
                        </span>
                        <span className="step-text">
                          <span className="sr-only">Step {i + 1}: </span>
                          {s}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              {cookMode && (
                <div className="cook-nav">
                  <button type="button" className="btn btn-secondary" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} data-testid="prev-step">
                    <Icon name="chevronLeft" size={18} /> Previous
                  </button>
                  {step < recipe.steps.length - 1 ? (
                    <button type="button" className="btn btn-primary" onClick={() => setStep((s) => s + 1)} data-testid="next-step">
                      Next step <Icon name="chevronRight" size={18} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-testid="finish-cooking"
                      onClick={() => {
                        setCookMode(false);
                        setStep(0);
                        toast('Nice one — logged as cooked tonight. 15 meals this month!');
                      }}
                    >
                      <Icon name="check" size={18} /> Done — mark as cooked
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {tab === 'notes' && (
            <div role="tabpanel" id="notes-panel" aria-labelledby="tab-notes" className="tab-panel">
              <h3 className="panel-title">From the test kitchen</h3>
              {recipe.notes?.length ? (
                <ul className="notes-list">
                  {recipe.notes.map((x) => (
                    <li key={x}>
                      <Icon name="info" size={18} />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">No extra notes for this one — it’s straightforward.</p>
              )}
              <form
                className="field note-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  toast(note.trim() ? 'Your note is saved to this recipe' : 'Note cleared');
                }}
              >
                <label htmlFor="my-note" className="field-label">
                  Your notes
                </label>
                <p className="field-hint" id="my-note-hint">
                  Only your household can see these.
                </p>
                <textarea id="my-note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} aria-describedby="my-note-hint" placeholder="e.g. Used 1 tin of chickpeas and a sweet potato — worked well." data-testid="notes-input" />
                <div>
                  <button type="submit" className="btn btn-secondary" data-testid="notes-save">
                    Save note
                  </button>
                </div>
              </form>
            </div>
          )}

          {tab === 'reviews' && (
            <div role="tabpanel" id="reviews-panel" aria-labelledby="tab-reviews" className="tab-panel">
              <div className="review-summary">
                <div className="review-score">
                  <p className="big-score">{recipe.rating.toFixed(1)}</p>
                  <Stars rating={recipe.rating} size={18} />
                  <p className="muted small">{recipe.ratings.toLocaleString('en-GB')} ratings</p>
                </div>
                <ul className="dist" aria-label="Rating distribution">
                  {dist.map((d) => (
                    <li key={d.s}>
                      <span>{d.s} star</span>
                      <span className="dist-bar">
                        <span style={{ width: `${(d.n / recipe.ratings) * 100}%` }} />
                      </span>
                      <span className="muted">{d.n.toLocaleString('en-GB')}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {reviews.length ? (
                <ul className="reviews">
                  {reviews.map((r) => (
                    <li key={r.name} className="review">
                      <div className="review-head">
                        <span className="avatar avatar-sm a3" aria-hidden="true">
                          {r.name[0]}
                        </span>
                        <div>
                          <p className="review-name">{r.name}</p>
                          <p className="muted small">{r.date}</p>
                        </div>
                        <span className="review-stars" aria-label={`${r.rating} out of 5 stars`}>
                          <Stars rating={r.rating} />
                        </span>
                      </div>
                      <p>{r.text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">No written reviews yet. Cook it and tell us how it went.</p>
              )}
            </div>
          )}
        </section>
      </div>

      <section className="section" aria-labelledby="related-title">
        <div className="section-head">
          <h2 id="related-title">You might also like</h2>
          <Link to="/recipes" className="text-link">
            Browse all <Icon name="chevronRight" size={16} />
          </Link>
        </div>
        <div className="card-grid cols-4">
          {related.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      </section>
    </div>
  );
}
