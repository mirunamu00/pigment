import { Link } from 'react-router';
import { Icon, Stars } from '../components/Icon';
import { Photo, RecipeCard, SaveButton } from '../components/ui';
import { DAYS, PANTRY, STATS, TODAY, TODAY_LABEL, USER } from '../data/household';
import { getRecipe, totalTime } from '../data/recipes';
import { minutes, plural } from '../format';
import { useStore } from '../store';
import { useTitle } from '../useTitle';

export default function Today() {
  useTitle('Today — Panful');
  const { plan, saved, shopping } = useStore();
  const tonight = getRecipe(plan[`${TODAY}-dinner`] ?? '') ?? getRecipe('chickpea-spinach-curry')!;
  const left = shopping.filter((i) => !i.checked).length;
  const pct = Math.round((STATS.cookedThisMonth / STATS.goal) * 100);
  const maxWeek = Math.max(...STATS.weeks.map((w) => w.value));
  const have = tonight.ingredients.length - 3;

  return (
    <div className="page today">
      <header className="today-head">
        <div>
          <p className="eyebrow">{TODAY_LABEL}</p>
          <h1>Good afternoon, {USER.first}</h1>
          <p className="page-sub">
            Dinner tonight takes {minutes(totalTime(tonight))}. You have {plural(Object.keys(plan).length, 'meal')} planned this week and{' '}
            {plural(left, 'item')} left to buy.
          </p>
        </div>
        <div className="page-actions">
          <Link to="/plan" className="btn btn-secondary">
            <Icon name="calendar" size={18} /> Open meal plan
          </Link>
        </div>
      </header>

      <div className="today-grid">
        <section className="card tonight" aria-labelledby="tonight-title">
          <div className="tonight-media">
            <Photo name={tonight.photo} />
            <span className="badge badge-onphoto">
              <Icon name="flame" size={14} /> Tonight · 6:30 pm
            </span>
          </div>
          <div className="tonight-body">
            <p className="eyebrow">Tonight’s dinner</p>
            <h2 id="tonight-title" className="tonight-title">
              <Link to={`/recipes/${tonight.slug}`}>{tonight.title}</Link>
            </h2>
            <div className="rating-row">
              <Stars rating={tonight.rating} />
              <span>
                {tonight.rating.toFixed(1)} <span className="muted">· {tonight.ratings.toLocaleString('en-GB')} ratings</span>
              </span>
            </div>
            <ul className="facts">
              <li>
                <Icon name="clock" size={18} />
                <span>
                  <strong>{minutes(totalTime(tonight))}</strong> total
                </span>
              </li>
              <li>
                <Icon name="users" size={18} />
                <span>
                  Serves <strong>3</strong> + leftovers
                </span>
              </li>
              <li>
                <Icon name="leaf" size={18} />
                <span>
                  <strong>Vegan</strong>, nut-free
                </span>
              </li>
            </ul>
            <div className="pantry-meter">
              <div className="pantry-meter-top">
                <span>
                  You have <strong>{have}</strong> of {tonight.ingredients.length} ingredients
                </span>
                <Link to="/shopping" className="text-link small">
                  3 on your list
                </Link>
              </div>
              <div className="progress" role="progressbar" aria-label="Ingredients in stock" aria-valuenow={have} aria-valuemin={0} aria-valuemax={tonight.ingredients.length}>
                <span style={{ width: `${(have / tonight.ingredients.length) * 100}%` }} />
              </div>
            </div>
            <div className="btn-row">
              <Link to={`/recipes/${tonight.slug}?cook=1`} className="btn btn-primary btn-lg" data-testid="start-cooking">
                <Icon name="play" size={18} /> Start cooking
              </Link>
              <SaveButton slug={tonight.slug} className="btn-icon-lg" />
            </div>
          </div>
        </section>

        <div className="today-side">
          <section className="card stat-card" aria-labelledby="stat-title">
            <div className="stat-top">
              <div>
                <h2 id="stat-title" className="card-title">
                  Cooked at home in October
                </h2>
                <p className="stat-number">
                  {STATS.cookedThisMonth}
                  <span> / {STATS.goal} meals</span>
                </p>
              </div>
              <div className="ring" style={{ ['--pct' as string]: pct }} role="img" aria-label={`${pct}% of your monthly goal`}>
                <span>{pct}%</span>
              </div>
            </div>
            <div className="bars" aria-hidden="true">
              {STATS.weeks.map((w) => (
                <div key={w.label} className="bar-col">
                  <span className="bar" style={{ height: `${(w.value / maxWeek) * 100}%` }}>
                    <em>{w.value}</em>
                  </span>
                  <span className="bar-label">{w.label}</span>
                </div>
              ))}
            </div>
            <p className="stat-foot">
              <Icon name="sparkle" size={16} />
              <span>
                About <strong>{STATS.savedOnFood}</strong> saved on takeaways this month
              </span>
            </p>
          </section>

          <section className="card list-card" aria-labelledby="list-title">
            <div className="list-card-head">
              <span className="list-card-icon">
                <Icon name="basket" />
              </span>
              <div>
                <h2 id="list-title" className="card-title">
                  Shopping list
                </h2>
                <p className="muted small">
                  {plural(left, 'item')} left · {shopping.length - left} picked up
                </p>
              </div>
            </div>
            <Link to="/shopping" className="btn btn-secondary btn-block">
              Open list <Icon name="arrowRight" size={16} />
            </Link>
          </section>
        </div>
      </div>

      <section className="section" aria-labelledby="week-title">
        <div className="section-head">
          <h2 id="week-title">This week</h2>
          <Link to="/plan" className="text-link">
            Edit plan <Icon name="chevronRight" size={16} />
          </Link>
        </div>
        <ol className="week-strip">
          {DAYS.map((d) => {
            const r = getRecipe(plan[`${d.id}-dinner`] ?? '');
            const isToday = d.id === TODAY;
            return (
              <li key={d.id} className={`week-day ${isToday ? 'is-today' : ''}`} data-testid={`week-day-${d.id}`}>
                <p className="week-day-label">
                  <span>{d.short}</span> <span className="week-date">{d.date}</span>
                  {isToday && <span className="today-dot">Today</span>}
                </p>
                {r ? (
                  <Link to={`/recipes/${r.slug}`} className="week-meal">
                    <Photo name={r.photo} />
                    <span className="week-meal-title">{r.title}</span>
                  </Link>
                ) : (
                  <Link to="/plan" className="week-meal week-empty">
                    <span className="week-empty-box">
                      <Icon name="plus" size={20} />
                    </span>
                    <span className="week-meal-title">Plan dinner</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="section" aria-labelledby="useup-title">
        <div className="section-head">
          <div>
            <h2 id="useup-title">Use it up</h2>
            <p className="muted">Ideas for what’s already in your fridge, so nothing goes in the bin.</p>
          </div>
        </div>
        <div className="useup-grid">
          {PANTRY.map((p) => {
            const r = getRecipe(p.recipes[0])!;
            const alt = getRecipe(p.recipes[1]);
            return (
              <article key={p.name} className="card useup">
                <div className="useup-media">
                  <Photo name={r.photo} />
                </div>
                <div className="useup-body">
                  <p className={`pill pill-${p.urgency}`}>
                    <span className="pill-dot" aria-hidden="true" />
                    {p.name} · {p.detail}
                  </p>
                  <h3>
                    <Link to={`/recipes/${r.slug}`} className="stretched">
                      {r.title}
                    </Link>
                  </h3>
                  <p className="muted small">
                    {minutes(totalTime(r))} · or try {alt?.title.toLowerCase()}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" aria-labelledby="saved-title">
        <div className="section-head">
          <h2 id="saved-title">Recently saved</h2>
          <Link to="/recipes?saved=1" className="text-link">
            All saved <Icon name="chevronRight" size={16} />
          </Link>
        </div>
        <div className="card-grid cols-4">
          {saved
            .slice(0, 4)
            .map((s) => getRecipe(s))
            .filter((r) => r !== undefined)
            .map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
        </div>
      </section>
    </div>
  );
}
